// Shared /api/lead handler — pure Web Fetch API (Request/Response, formData()) so it
// runs unchanged on both hosts: Cloudflare Pages Functions (functions/api/lead.js) and
// Vercel Edge Functions (api/lead.js). Only the thin wrapper files differ per platform.
//
// Emails the enquiry to Jackson via ZeptoMail, with an optional auto-reply to the
// customer if they gave an email address. No CRM or SMS integration yet — those are
// later additions (Zoho CRM / B1-Supabase once that schema exists).
//
// Secrets required (set as env vars on whichever platform is live):
//   ZEPTOMAIL_TOKEN, ZEPTOMAIL_FROM_ADDRESS, JACKSON_NOTIFY_EMAIL
// Optional: MOCK_PROVIDERS=true to short-circuit ZeptoMail with a canned success for
// local testing before real secrets exist. Never set MOCK_PROVIDERS in production.

const CALL_TIMEOUT_MS = 8000;

function required(fields, body) {
  return fields.filter((f) => !body.get(f) || !String(body.get(f)).trim());
}

function normalizeLead(body, request) {
  return {
    name: (body.get('name') || '').trim(),
    phone: (body.get('phone') || '').trim(),
    email: (body.get('email') || '').trim(),
    suburb: (body.get('suburb') || '').trim(),
    service: (body.get('service') || '').trim(),
    besttime: (body.get('besttime') || '').trim(),
    contact: (body.get('contact') || '').trim(),
    notes: (body.get('notes') || '').trim(),
    page: request.headers.get('referer') || '',
  };
}

async function sendZeptoMail({ to, subject, html }, env) {
  if (env.MOCK_PROVIDERS === 'true') return { ok: true };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS);
  try {
    const res = await fetch('https://api.zeptomail.com.au/v1.1/email', {
      method: 'POST',
      headers: { Authorization: env.ZEPTOMAIL_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: { address: env.ZEPTOMAIL_FROM_ADDRESS },
        to: [{ email_address: { address: to } }],
        subject,
        htmlbody: html,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`ZeptoMail send failed: ${res.status} ${await res.text()}`);
    return { ok: true };
  } catch (err) {
    console.error(`[lead] ZeptoMail -> ${to} failed:`, err.message || err);
    return { ok: false, error: err.message || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

function customerEmailHtml(lead) {
  return `<p>Hi ${lead.name || 'there'},</p>
<p>Thanks for reaching out to Bay City Blinds — Jackson's got your enquiry and will be in touch within 1 business day.</p>
<p>What you told us: ${lead.service || 'window furnishings'} in ${lead.suburb || 'your area'}.</p>
<p>Talk soon,<br/>Bay City Blinds</p>`;
}

function jacksonEmailHtml(lead) {
  return `<p>New website lead:</p>
<ul>
<li>Name: ${lead.name}</li>
<li>Phone: ${lead.phone}</li>
<li>Email: ${lead.email || '—'}</li>
<li>Suburb: ${lead.suburb}</li>
<li>Service: ${lead.service}</li>
<li>Best time: ${lead.besttime || '—'}</li>
<li>Contact preference: ${lead.contact || '—'}</li>
<li>Notes: ${lead.notes || '—'}</li>
<li>Page: ${lead.page}</li>
</ul>`;
}

export async function handleLead(request, env) {
  let body;
  try {
    body = await request.formData();
  } catch {
    return Response.json({ success: false, error: 'Invalid form submission' }, { status: 400 });
  }

  const missing = required(['name', 'phone', 'suburb'], body);
  if (missing.length) {
    return Response.json({ success: false, error: `Missing required field(s): ${missing.join(', ')}` }, { status: 400 });
  }

  const lead = normalizeLead(body, request);
  const warnings = [];

  const jacksonEmailRes = await sendZeptoMail(
    { to: env.JACKSON_NOTIFY_EMAIL, subject: `New lead: ${lead.name} (${lead.suburb})`, html: jacksonEmailHtml(lead) },
    env
  );
  if (!jacksonEmailRes.ok) {
    // Jackson's notification is the whole point of this endpoint right now — if it fails,
    // tell the user so they fall back to calling/texting directly rather than assuming it worked.
    warnings.push('jackson_email_failed');
    return Response.json({ success: false, warnings }, { status: 502 });
  }

  if (lead.email) {
    const customerEmailRes = await sendZeptoMail(
      { to: lead.email, subject: 'Thanks for your enquiry — Bay City Blinds', html: customerEmailHtml(lead) },
      env
    );
    if (!customerEmailRes.ok) warnings.push('customer_email_failed');
  }

  return Response.json({ success: true, warnings: warnings.length ? warnings : undefined });
}
