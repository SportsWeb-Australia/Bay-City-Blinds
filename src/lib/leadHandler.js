// Shared /api/lead handler — pure Web Fetch API (Request/Response, formData()) so it
// runs unchanged on both hosts: Cloudflare Pages Functions (functions/api/lead.js) and
// Vercel Edge Functions (api/lead.js). Only the thin wrapper files differ per platform.
//
// Emails the enquiry to Jackson via ZeptoMail, with an optional auto-reply to the
// customer if they gave an email address. No CRM or SMS integration yet — those are
// later additions (Zoho CRM / B1-Supabase once that schema exists).
//
// Secrets required (set as env vars on whichever platform is live):
//   ZEPTOMAIL_TOKEN (encrypted secret — never in source, never client-side)
// Non-sensitive vars (see wrangler.toml [vars]):
//   ZEPTOMAIL_FROM, ZEPTOMAIL_TO, ZEPTOMAIL_API_URL
// Optional: MOCK_PROVIDERS=true to short-circuit ZeptoMail with a canned success for
// local testing before real secrets exist. Never set MOCK_PROVIDERS in production.

// Two form versions post here (see src/data/forms.ts):
//   formVersion=short   the shortened form: name, mobile, email, suburb, property type
//                       (new build / existing home) are required; address, best time,
//                       how-heard and notes are no longer asked or required.
//   anything else       the preserved legacy form (and any older cached page): original
//                       rules, including a required address.
import { EMAIL_RE, PROPERTY_TYPES, CONTACT_PREFS, isPropertyType, isContactPref, normalizeAuMobile, formatAuMobile } from './leadValidation.js';

const CALL_TIMEOUT_MS = 8000;
const NOTES_MAX_LEN = 2000;
const MIN_FILL_TIME_MS = 1500; // reject submissions faster than a human could plausibly fill the form

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function required(fields, body) {
  return fields.filter((f) => !body.get(f) || !String(body.get(f)).trim());
}

function isSpam(body) {
  // Honeypot: a field real users never see or fill; bots that auto-fill every input trip it.
  if ((body.get('website') || '').trim()) return true;
  // Fill-time heuristic: submissions faster than this are almost certainly scripted.
  const loadedAt = Number(body.get('formLoadedAt'));
  if (loadedAt && Date.now() - loadedAt < MIN_FILL_TIME_MS) return true;
  return false;
}

const isShort = (body) => String(body.get('formVersion') || '') === 'short';

function normalizeLead(body, request) {
  const firstName = (body.get('firstName') || '').trim();
  const lastName = (body.get('lastName') || '').trim();
  const email = (body.get('email') || '').trim();
  return {
    firstName,
    lastName,
    name: [firstName, lastName].filter(Boolean).join(' '),
    phone: (body.get('phone') || '').trim(),
    email: email && EMAIL_RE.test(email) ? email : '',
    formVersion: isShort(body) ? 'short' : 'legacy',
    propertyType: isPropertyType(String(body.get('propertyType'))) ? String(body.get('propertyType')) : '',
    address: (body.get('address') || '').trim(),
    suburb: (body.get('suburb') || '').trim(),
    service: (body.get('service') || '').trim(),
    besttime: (body.get('besttime') || '').trim(),
    // short form posts contactPreference (call|text|email); legacy posts contact (call|text)
    contact: (() => {
      const v = String(body.get('contactPreference') || body.get('contact') || '').trim().toLowerCase();
      return isContactPref(v) ? v : '';
    })(),
    howHeard: (body.get('howHeard') || '').trim(),
    notes: (body.get('notes') || '').trim().slice(0, NOTES_MAX_LEN),
    formVariant: (body.get('formVariant') || 'full').trim(),
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
    console.error(`[lead] ZeptoMail -> ${to} failed:`, err.message || err);
    return { ok: false, error: err.message || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

function customerEmailHtml(lead) {
  const name = escapeHtml(lead.name || 'there');
  return `<p>Hi ${name},</p>
<p>Thanks for reaching out to us at Bay City Blinds. We have your enquiry and Jackson or one of his team will be in touch shortly.</p>
<p>Kind Regards,<br/>Jackson and the team at Bay City Blinds<br/>0430 161 383</p>`;
}

function jacksonEmailHtml(lead) {
  const cell = (label, value) => `<tr><td style="padding:4px 12px 4px 0;color:#5C7A82;white-space:nowrap">${label}</td><td style="padding:4px 0"><b>${value || '—'}</b></td></tr>`;
  // Only show the optional / legacy-only rows when they actually have something in them,
  // so a short-form enquiry isn't a wall of dashes.
  const optional = (label, value) => (value ? cell(label, escapeHtml(value)) : '');
  const property = PROPERTY_TYPES[lead.propertyType]
    ? `<p style="font-family:sans-serif;font-size:15px;margin:0 0 10px"><span style="display:inline-block;padding:4px 12px;border-radius:6px;font-weight:700;color:#fff;background:${lead.propertyType === 'new-build' ? '#0B6C7E' : '#5C4A9A'}">${PROPERTY_TYPES[lead.propertyType].toUpperCase()}</span></p>`
    : '';
  return `<p>New website enquiry:</p>
${property}<table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px">
${cell('Name', escapeHtml(lead.name))}
${cell('Mobile', escapeHtml(lead.phone))}
${cell('Email', lead.email ? escapeHtml(lead.email) : '')}
${cell('Suburb', escapeHtml(lead.suburb))}
${lead.propertyType ? cell('Property', PROPERTY_TYPES[lead.propertyType] || '') : ''}
${cell('Interested in', escapeHtml(lead.service))}
${cell('Contact preference', CONTACT_PREFS[lead.contact] || '')}
${optional('Address', lead.address)}
${optional('Best time', lead.besttime)}
${optional('How they heard about us', lead.howHeard)}
${optional('Message', lead.notes)}
${cell('Page/form source', escapeHtml(`${lead.page} (${lead.formVariant} form, ${lead.formVersion} version)`))}
</table>`;
}

export async function handleLead(request, env) {
  let body;
  try {
    body = await request.formData();
  } catch {
    return Response.json({ success: false, error: 'Invalid form submission' }, { status: 400 });
  }

  if (isSpam(body)) {
    // Pretend success — don't tip off bots that they were caught, don't send any email.
    return Response.json({ success: true });
  }

  const short = isShort(body);
  // Short form: address is no longer asked, so it is no longer required. Legacy form keeps
  // its original required list exactly.
  const requiredFields = short
    ? ['firstName', 'lastName', 'phone', 'email', 'suburb', 'propertyType']
    : ['firstName', 'lastName', 'phone', 'email', 'address', 'suburb'];
  const missing = required(requiredFields, body);
  if (missing.length) {
    return Response.json({ success: false, error: `Missing required field(s): ${missing.join(', ')}` }, { status: 400 });
  }
  if (!EMAIL_RE.test(String(body.get('email')).trim())) {
    return Response.json({ success: false, error: 'Please enter a valid email address' }, { status: 400 });
  }
  if (short) {
    if (!isPropertyType(String(body.get('propertyType')))) {
      return Response.json({ success: false, error: 'Please choose new build or existing home' }, { status: 400 });
    }
    const mobile = normalizeAuMobile(body.get('phone'));
    if (!mobile) {
      return Response.json({ success: false, error: 'Please enter an Australian mobile number' }, { status: 400 });
    }
    body.set('phone', formatAuMobile(mobile)); // tidy, consistent format in Jackson's inbox
  }

  const lead = normalizeLead(body, request);
  const warnings = [];

  const jacksonEmailRes = await sendZeptoMail(
    {
      to: env.ZEPTOMAIL_TO,
      subject: `New Website Enquiry – ${lead.name}`,
      html: jacksonEmailHtml(lead),
      replyTo: lead.email || undefined,
    },
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
