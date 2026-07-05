import { useState } from 'react';

// Interactive lead form (React island). Hydrated on load with client:load.
// On submit, POST to a Zoho Forms endpoint or Zoho CRM webhook to fire the
// B1 automation blueprint (create Lead -> notify Jackson -> confirm SMS/email).
export default function LeadForm({ defaultSuburb = '' }: { defaultSuburb?: string }) {
  const [done, setDone] = useState(false);
  const [suburb, setSuburb] = useState(defaultSuburb);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(Business1): fetch('https://forms.zohopublic.com.au/…', { method:'POST', body:new FormData(e.target) })
    setDone(true);
  }

  return (
    <div className="lead-card">
      <span className="flag">Free — no obligation</span>
      {!done ? (
        <form onSubmit={submit} noValidate>
          <h3>Book your free measure &amp; quote</h3>
          <p className="small">Tell us where you are and Jackson will call to lock in a time. Usually within 1 business day.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem' }}>
            <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" type="text" placeholder="First name" required /></div>
            <div className="field"><label htmlFor="phone">Mobile</label><input id="phone" name="phone" type="tel" placeholder="04XX XXX XXX" required /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.7rem' }}>
            <div className="field"><label htmlFor="suburb">Suburb</label>
              <input id="suburb" name="suburb" type="text" placeholder="e.g. Armstrong Creek" value={suburb} onChange={(e) => setSuburb(e.target.value)} required />
            </div>
            <div className="field"><label htmlFor="service">I'm after</label>
              <select id="service" name="service">
                <option>Roller blinds</option><option>Roman blinds</option><option>Venetian blinds</option>
                <option>Plantation shutters</option><option>Curtains</option><option>Outdoor / zip screens</option>
                <option>Not sure yet — need advice</option>
              </select>
            </div>
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
          <h3>Nice one — you're booked in!</h3>
          <p className="small">Jackson will give you a call shortly to confirm a time that suits. Talk soon.</p>
        </div>
      )}
    </div>
  );
}
