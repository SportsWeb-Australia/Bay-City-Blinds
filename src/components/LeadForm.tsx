import { useState } from 'react';
import { site } from '../data/site';
import ZohoEmbedForm from './ZohoEmbedForm';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Interactive lead form (React island). Hydrated on load with client:load.
// 'full' variant embeds Jackson's live Zoho form (ZohoEmbedForm) directly, so submissions
// land in his real CRM/automation today. 'quick' variant (suburb pages) is still our
// custom mini-form posting to functions/api/lead.js — pending a short Zoho form from
// Carson to replace it the same way. See HANDOVER for the Zoho pipeline decision.
export default function LeadForm({ defaultSuburb = '', variant = 'full' }: { defaultSuburb?: string; variant?: 'full' | 'quick' }) {
  const [status, setStatus] = useState<Status>('idle');
  const [suburb, setSuburb] = useState(defaultSuburb);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: new FormData(e.currentTarget) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', { form_variant: variant });
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const errorBlock = (
    <div className="form-ok show" role="alert">
      <h3>Something went wrong submitting online</h3>
      <p className="small">No worries, call or text Jackson directly and he'll sort it out.</p>
      <div className="trust-chips" style={{ marginTop: '.8rem' }}>
        <a className="chip" href={site.phoneHref}>📞 Call {site.phone}</a>
        <a className="chip" href={site.smsHref}>💬 Text {site.phone}</a>
      </div>
    </div>
  );

  if (variant === 'quick') {
    if (status === 'success') {
      return (
        <div className="od-quick-ok" role="status">
          <span className="tick-sm">✓</span> Nice one, request received! Jackson will be in touch within 1 business day.
        </div>
      );
    }
    if (status === 'error') return errorBlock;
    return (
      <form className="od-quick" onSubmit={submit} noValidate aria-label="Quick free quote form">
        <div className="fd"><label htmlFor="qname">Your name</label><input id="qname" name="name" type="text" placeholder="First name" required autoComplete="given-name" /></div>
        <div className="fd"><label htmlFor="qphone">Mobile</label><input id="qphone" name="phone" type="tel" placeholder="04XX XXX XXX" required autoComplete="tel" /></div>
        <div className="fd"><label htmlFor="qsuburb">Suburb</label><input id="qsuburb" name="suburb" type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} required /></div>
        <div className="fd"><label htmlFor="qservice">I'm after</label>
          <select id="qservice" name="service">
            <option>Roller blinds</option><option>Roman blinds</option><option>Venetian blinds</option>
            <option>Plantation shutters</option><option>Curtains</option><option>Outdoor / zip screens</option>
            <option>A few different things</option><option>Not sure yet</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Free quote →'}
        </button>
      </form>
    );
  }

  return (
    <div className="lead-card">
      <span className="flag">Free, no obligation</span>
      <h3>Book your free measure &amp; quote</h3>
      <p className="small">Tell us where you are and Jackson will be in touch to lock in a time. Usually within 1 business day.</p>
      <ZohoEmbedForm />
      <div className="assure">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
        Your details stay private. No spam, ever.
      </div>
    </div>
  );
}
