import { useState } from 'react';
import { site } from '../data/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Interactive lead form (React island). Hydrated on load with client:load.
// Submits to the Cloudflare Pages Function at /api/lead, which creates a Zoho CRM
// lead and fires ZeptoMail/ClickSend auto-replies. See functions/api/lead.js.
export default function LeadForm({ defaultSuburb = '', variant = 'full' }: { defaultSuburb?: string; variant?: 'full' | 'quick' }) {
  const [status, setStatus] = useState<Status>('idle');
  const [suburb, setSuburb] = useState(defaultSuburb);
  const [contact, setContact] = useState('call');

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
        <div className="fd"><label htmlFor="qfirstname">First name</label><input id="qfirstname" name="firstName" type="text" placeholder="First name" required autoComplete="given-name" /></div>
        <div className="fd"><label htmlFor="qlastname">Last name</label><input id="qlastname" name="lastName" type="text" placeholder="Last name" required autoComplete="family-name" /></div>
        <div className="fd"><label htmlFor="qphone">Mobile</label><input id="qphone" name="phone" type="tel" placeholder="04XX XXX XXX" required autoComplete="tel" /></div>
        <div className="fd"><label htmlFor="qsuburb">Suburb</label><input id="qsuburb" name="suburb" type="text" value={suburb} onChange={(e) => setSuburb(e.target.value)} required /></div>
        <div className="fd"><label htmlFor="qservice">I'm after</label>
          <select id="qservice" name="service">
            <option>Roller blinds</option><option>Honeycomb blinds</option><option>Venetian blinds</option>
            <option>Plantation shutters</option><option>Curtains</option><option>Outdoor / zip screens</option>
            <option>Roller shutters</option><option>Awnings</option>
            <option>A few different things</option><option>Not sure yet</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Free quote →'}
        </button>
      </form>
    );
  }

  const two: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem' };

  return (
    <div className="lead-card">
      <span className="flag">Free, no obligation</span>
      {status === 'success' ? (
        <div className="form-ok show">
          <div className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
          <h3>Nice one, request received!</h3>
          <p className="small">{contact === 'text' ? 'Jackson will text you shortly to sort a time that suits.' : 'Jackson will give you a call shortly to sort a time that suits.'} Talk soon.</p>
        </div>
      ) : status === 'error' ? errorBlock : (
        <form onSubmit={submit} noValidate>
          <h3>Book your free measure &amp; quote</h3>
          <p className="small">Tell us where you are and Jackson will be in touch to lock in a time. Usually within 1 business day.</p>
          <div style={two}>
            <div className="field"><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" type="text" placeholder="First name" required autoComplete="given-name" /></div>
            <div className="field"><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" type="text" placeholder="Last name" required autoComplete="family-name" /></div>
          </div>
          <div style={two}>
            <div className="field"><label htmlFor="phone">Mobile</label><input id="phone" name="phone" type="tel" placeholder="04XX XXX XXX" required autoComplete="tel" /></div>
            <div className="field"><label htmlFor="email">Email <span className="opt">(for your written quote)</span></label><input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" /></div>
          </div>
          <div style={two}>
            <div className="field"><label htmlFor="suburb">Suburb</label>
              <input id="suburb" name="suburb" type="text" placeholder="e.g. Armstrong Creek" value={suburb} onChange={(e) => setSuburb(e.target.value)} required />
            </div>
            <div className="field"><label htmlFor="service">I'm after</label>
              <select id="service" name="service">
                <option>Roller blinds</option><option>Honeycomb blinds</option><option>Venetian blinds</option>
                <option>Plantation shutters</option><option>Curtains</option><option>Outdoor / zip screens</option>
                <option>Roller shutters</option><option>Awnings</option>
                <option>A few different things</option><option>Not sure yet, need advice</option>
              </select>
            </div>
          </div>
          <div style={two}>
            <div className="field"><label htmlFor="besttime">Best time for a visit</label>
              <select id="besttime" name="besttime">
                <option>Whatever suits Jackson</option><option>Weekday, daytime</option>
                <option>Weekday, evening</option><option>Weekend</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label>How should we get back to you?</label>
            <div className="seg" role="radiogroup" aria-label="Contact preference">
              <label className={contact === 'call' ? 'on' : ''}><input type="radio" name="contact" value="call" checked={contact === 'call'} onChange={() => setContact('call')} />📞 Call me</label>
              <label className={contact === 'text' ? 'on' : ''}><input type="radio" name="contact" value="text" checked={contact === 'text'} onChange={() => setContact('text')} />💬 Text me</label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="notes">Anything else? <span className="opt">(optional)</span></label>
            <textarea id="notes" name="notes" rows={2} placeholder="e.g. 5 windows + 2 sliding doors, new build in Warralily"></textarea>
          </div>
          <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'submitting'} style={{ width: '100%', marginTop: '1rem' }}>
            {status === 'submitting' ? 'Sending…' : 'Get my free quote →'}
          </button>
          <div className="assure">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
            Your details stay private. No spam, ever.
          </div>
        </form>
      )}
    </div>
  );
}
