import { useState } from 'react';

// Interactive lead form (React island). Hydrated on load with client:load.
// On submit, POST to a Zoho Forms endpoint or Zoho CRM webhook to fire the
// B1 automation blueprint (create Lead -> notify Jackson -> confirm SMS/email).
export default function LeadForm({ defaultSuburb = '' }: { defaultSuburb?: string }) {
  const [done, setDone] = useState(false);
  const [suburb, setSuburb] = useState(defaultSuburb);
  const [contact, setContact] = useState('call');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(Business1): fetch('https://forms.zohopublic.com.au/…', { method:'POST', body:new FormData(e.target as HTMLFormElement) })
    setDone(true);
  }

  const two: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem' };

  return (
    <div className="lead-card">
      <span className="flag">Free — no obligation</span>
      {!done ? (
        <form onSubmit={submit} noValidate>
          <h3>Book your free measure &amp; quote</h3>
          <p className="small">Tell us where you are and Jackson will be in touch to lock in a time. Usually within 1 business day.</p>
          <div style={two}>
            <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="First name" required autoComplete="given-name" /></div>
            <div className="field"><label htmlFor="phone">Mobile</label><input id="phone" name="phone" type="tel" placeholder="04XX XXX XXX" required autoComplete="tel" /></div>
          </div>
          <div style={two}>
            <div className="field"><label htmlFor="email">Email <span className="opt">(for your written quote)</span></label><input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" /></div>
            <div className="field"><label htmlFor="suburb">Suburb</label>
              <input id="suburb" name="suburb" type="text" placeholder="e.g. Armstrong Creek" value={suburb} onChange={(e) => setSuburb(e.target.value)} required />
            </div>
          </div>
          <div style={two}>
            <div className="field"><label htmlFor="service">I'm after</label>
              <select id="service" name="service">
                <option>Roller blinds</option><option>Roman blinds</option><option>Venetian blinds</option>
                <option>Plantation shutters</option><option>Curtains</option><option>Outdoor / zip screens</option>
                <option>A few different things</option><option>Not sure yet — need advice</option>
              </select>
            </div>
            <div className="field"><label htmlFor="besttime">Best time for a visit</label>
              <select id="besttime" name="besttime">
                <option>Whatever suits Jackson</option><option>Weekday — daytime</option>
                <option>Weekday — evening</option><option>Weekend</option>
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
          <button className="btn btn-primary btn-lg" type="submit" style={{ width: '100%', marginTop: '1rem' }}>Get my free quote →</button>
          <div className="assure">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
            Your details stay private. No spam, ever.
          </div>
        </form>
      ) : (
        <div className="form-ok show">
          <div className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
          <h3>Nice one — request received!</h3>
          <p className="small">{contact === 'text' ? 'Jackson will text you shortly to sort a time that suits.' : 'Jackson will give you a call shortly to sort a time that suits.'} Talk soon.</p>
        </div>
      )}
    </div>
  );
}
