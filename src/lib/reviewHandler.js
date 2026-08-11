// Shared /api/review handler — pure Web Fetch API, mirrors leadHandler.js so it
// runs unchanged on both hosts: Cloudflare Pages Functions (functions/api/review.js)
// and Vercel Edge Functions (api/review.js).
//
// For customers without a Google account, who land on /review from the QR code
// Jackson shares, and can't leave a Google review. Their testimonial is emailed to
// both Carson and Jackson so it can still be used on the site.
//
// Secrets required: ZEPTOMAIL_TOKEN (encrypted secret).
// Non-sensitive vars (see wrangler.toml [vars]): ZEPTOMAIL_FROM, ZEPTOMAIL_API_URL
// Optional: MOCK_PROVIDERS=true for local testing before real secrets exist.

const CALL_TIMEOUT_MS = 8000;
const QUOTE_MAX_LEN = 2000;
const MIN_FILL_TIME_MS = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFY_ADDRESSES = ['carson@clicksportsmedia.com', 'jackson@baycityblinds.com.au'];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function required(fields, body) {
  return fields.filter((f) => !body.get(f) || !String(body.get(f)).trim());
}

function isSpam(body) {
  if ((body.get('website') || '').trim()) return true;
  const loadedAt = Number(body.get('formLoadedAt'));
  if (loadedAt && Date.now() - loadedAt < MIN_FILL_TIME_MS) return true;
  return false;
}

function normalizeReview(body, request) {
  const email = (body.get('email') || '').trim();
  return {
    name: (body.get('name') || '').trim(),
    suburb: (body.get('suburb') || '').trim(),
    rating: (body.get('rating') || '').trim(),
    quote: (body.get('quote') || '').trim().slice(0, QUOTE_MAX_LEN),
    email: email && EMAIL_RE.test(email) ? email : '',
    page: request.headers.get('referer') || '',
  };
}

async function sendZeptoMail({ to, subject, html, replyTo }, env) {
  if (env.MOCK_PROVIDERS === 'true') return { ok: true };
  const apiUrl = env.ZEPTOMAIL_API_URL || 'https://api.zeptomail.com.au/v1.1/email';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS);
  try {
    const payload = {
      from: { address: env.ZEPTOMAIL_FROM, name: 'Bay City Blinds' },
      to: [{ email_address: { address: to } }],
      subject,
      htmlbody: html,
    };
    if (replyTo) payload.reply_to = [{ address: replyTo }];
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { Authorization: env.ZEPTOMAIL_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`ZeptoMail send failed: ${res.status} ${await res.text()}`);
    return { ok: true };
  } catch (err) {
    console.error(`[review] ZeptoMail -> ${to} failed:`, err.message || err);
    return { ok: false, error: err.message || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

function notifyEmailHtml(review) {
  const stars = '★'.repeat(Number(review.rating) || 0) + '☆'.repeat(5 - (Number(review.rating) || 0));
  return `<p>New testimonial submitted via the /review QR code page (no Google account):</p>
<ul>
<li>Name: ${escapeHtml(review.name)}</li>
<li>Suburb: ${review.suburb ? escapeHtml(review.suburb) : '—'}</li>
<li>Rating: ${stars} (${escapeHtml(review.rating || '—')}/5)</li>
<li>Email: ${review.email ? escapeHtml(review.email) : '—'}</li>
</ul>
<blockquote>"${escapeHtml(review.quote)}"</blockquote>`;
}

export async function handleReview(request, env) {
  let body;
  try {
    body = await request.formData();
  } catch {
    return Response.json({ success: false, error: 'Invalid form submission' }, { status: 400 });
  }

  if (isSpam(body)) {
    return Response.json({ success: true });
  }

  const missing = required(['name', 'rating', 'quote'], body);
  if (missing.length) {
    return Response.json({ success: false, error: `Missing required field(s): ${missing.join(', ')}` }, { status: 400 });
  }

  const review = normalizeReview(body, request);
  const html = notifyEmailHtml(review);
  const subject = `New testimonial: ${review.name} (${review.rating}★)`;

  const results = await Promise.all(
    NOTIFY_ADDRESSES.map((to) => sendZeptoMail({ to, subject, html, replyTo: review.email || undefined }, env))
  );
  const allFailed = results.every((r) => !r.ok);
  if (allFailed) {
    return Response.json({ success: false, warnings: ['notify_email_failed'] }, { status: 502 });
  }

  const warnings = results.some((r) => !r.ok) ? ['partial_notify_failed'] : undefined;
  return Response.json({ success: true, warnings });
}
