// Cloudflare Pages Function — POST /api/lead
//
// Receives the enquiry form, creates a Zoho CRM Lead, then fires customer + Jackson
// notifications via ZeptoMail (email) and ClickSend (SMS). See docs/04-business-one-integration.md
// for the field spec and HANDOVER-bay-city-blinds.md §11 for the auto-reply requirements.
//
// Secrets required (Cloudflare Pages env vars, never in the repo):
//   ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN
//   ZEPTOMAIL_TOKEN, ZEPTOMAIL_FROM_ADDRESS
//   CLICKSEND_USERNAME, CLICKSEND_API_KEY
//   JACKSON_MOBILE (E.164, e.g. +61...), JACKSON_NOTIFY_EMAIL
// Optional: MOCK_PROVIDERS=true to short-circuit all three providers with canned
// responses for local testing (`wrangler pages dev dist`) before real secrets exist.
// Never set MOCK_PROVIDERS in the production Pages environment.

const CALL_TIMEOUT_MS = 8000;

async function withTimeout(fn, label) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS);
  try {
    return await fn(controller.signal);
  } catch (err) {
    console.error(`[lead] ${label} failed:`, err.message || err);
    return { ok: false, error: err.message || String(err) };
  } finally {
    clearTimeout(timer);
  }
}

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
    source: new URL(request.url).origin,
    page: request.headers.get('referer') || '',
  };
}

// ---------- Zoho CRM ----------

async function getZohoAccessToken(env, signal) {
  const params = new URLSearchParams({
    refresh_token: env.ZOHO_REFRESH_TOKEN,
    client_id: env.ZOHO_CLIENT_ID,
    client_secret: env.ZOHO_CLIENT_SECRET,
    grant_type: 'refresh_token',
  });
  const res = await fetch(`https://accounts.zoho.com.au/oauth/v2/token?${params}`, { method: 'POST', signal });
  if (!res.ok) throw new Error(`Zoho token refresh failed: ${res.status}`);
  const data = await res.json();
  if (!data.access_token) throw new Error('Zoho token refresh returned no access_token');
  return data.access_token;
}

async function createZohoLead(lead, env) {
  if (env.MOCK_PROVIDERS === 'true') {
    return { ok: true, leadId: 'MOCK-LEAD-ID' };
  }
  return withTimeout(async (signal) => {
    const token = await getZohoAccessToken(env, signal);
    const [firstName, ...rest] = lead.name.split(' ');
    const payload = {
      data: [{
        First_Name: firstName || lead.name,
        Last_Name: rest.join(' ') || firstName || lead.name,
        Phone: lead.phone,
        Email: lead.email || undefined,
        Lead_Source: 'Website - baycityblinds.com.au',
        Description: `Suburb: ${lead.suburb}\nService: ${lead.service}\nBest time: ${lead.besttime}\nContact pref: ${lead.contact}\nPage: ${lead.page}`,
      }],
    };
    const res = await fetch('https://www.zohoapis.com.au/crm/v8/Leads', {
      method: 'POST',
      headers: { Authorization: `Zoho-oauthtoken ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
    const data = await res.json();
    const result = data?.data?.[0];
    if (!res.ok || result?.status !== 'success') {
      throw new Error(`Zoho lead create failed: ${JSON.stringify(data)}`);
    }
    return { ok: true, leadId: result.details.id };
  }, 'Zoho lead create');
}

// ---------- ZeptoMail ----------

async function sendZeptoMail({ to, subject, html }, env) {
  if (env.MOCK_PROVIDERS === 'true') return { ok: true };
  return withTimeout(async (signal) => {
    const res = await fetch('https://api.zeptomail.com.au/v1.1/email', {
      method: 'POST',
      headers: { Authorization: env.ZEPTOMAIL_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: { address: env.ZEPTOMAIL_FROM_ADDRESS },
        to: [{ email_address: { address: to } }],
        subject,
        htmlbody: html,
      }),
      signal,
    });
    if (!res.ok) throw new Error(`ZeptoMail send failed: ${res.status} ${await res.text()}`);
    return { ok: true };
  }, `ZeptoMail -> ${to}`);
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
<li>Best time: ${lead.besttime}</li>
<li>Contact preference: ${lead.contact}</li>
</ul>`;
}

// ---------- ClickSend ----------

async function sendClickSendSms({ to, message }, env) {
  if (env.MOCK_PROVIDERS === 'true') return { ok: true };
  return withTimeout(async (signal) => {
    const auth = btoa(`${env.CLICKSEND_USERNAME}:${env.CLICKSEND_API_KEY}`);
    const res = await fetch('https://rest.clicksend.com/v3/sms/send', {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ to, body: message, source: 'baycityblinds.com.au' }] }),
      signal,
    });
    if (!res.ok) throw new Error(`ClickSend send failed: ${res.status} ${await res.text()}`);
    return { ok: true };
  }, `ClickSend -> ${to}`);
}

// ---------- Handler ----------

export async function onRequestPost({ request, env }) {
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

  const zoho = await createZohoLead(lead, env);

  const notifyJackson = () => Promise.all([
    sendZeptoMail({ to: env.JACKSON_NOTIFY_EMAIL, subject: `New lead: ${lead.name} (${lead.suburb})`, html: jacksonEmailHtml(lead) }, env),
    env.JACKSON_MOBILE ? sendClickSendSms({ to: env.JACKSON_MOBILE, message: `New Bay City Blinds lead: ${lead.name}, ${lead.phone}, ${lead.suburb}, ${lead.service}` }, env) : Promise.resolve({ ok: true }),
  ]);

  if (!zoho.ok) {
    // Critical failure: the lead wasn't captured in the CRM. Still try to alert Jackson
    // directly with the raw form data so the enquiry isn't silently lost.
    await notifyJackson();
    warnings.push('zoho_lead_create_failed');
    return Response.json({ success: false, warnings }, { status: 502 });
  }

  const [jacksonEmailRes, jacksonSmsRes, customerEmailRes, customerSmsRes] = await Promise.all([
    sendZeptoMail({ to: env.JACKSON_NOTIFY_EMAIL, subject: `New lead: ${lead.name} (${lead.suburb})`, html: jacksonEmailHtml(lead) }, env),
    env.JACKSON_MOBILE ? sendClickSendSms({ to: env.JACKSON_MOBILE, message: `New Bay City Blinds lead: ${lead.name}, ${lead.phone}, ${lead.suburb}, ${lead.service}` }, env) : Promise.resolve({ ok: true }),
    lead.email ? sendZeptoMail({ to: lead.email, subject: 'Thanks for your enquiry — Bay City Blinds', html: customerEmailHtml(lead) }, env) : Promise.resolve({ ok: true }),
    sendClickSendSms({ to: lead.phone, message: `Thanks ${lead.name || ''}! Jackson from Bay City Blinds got your enquiry and will be in touch within 1 business day.` }, env),
  ]);

  // Soft failures (notification channels) don't block the user-facing success state —
  // the lead is already safely in Zoho. Log which channel failed so Carson can spot-check.
  if (!jacksonEmailRes.ok) warnings.push('jackson_email_failed');
  if (!jacksonSmsRes.ok) warnings.push('jackson_sms_failed');
  if (!customerEmailRes.ok) warnings.push('customer_email_failed');
  if (!customerSmsRes.ok) warnings.push('customer_sms_failed');

  return Response.json({ success: true, leadId: zoho.leadId, warnings: warnings.length ? warnings : undefined });
}
