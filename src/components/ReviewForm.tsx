import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Testimonial form for customers without a Google account, reached via the
// /review QR-code page. Submits to /api/review, which emails the testimonial
// to Carson and Jackson so it can still be used on the site.
export default function ReviewForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [rating, setRating] = useState(5);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/review', { method: 'POST', body: new FormData(e.currentTarget) });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-ok show">
        <div className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
        <h3>Thanks for the feedback!</h3>
        <p className="small">Your testimonial has been sent through. Jackson really appreciates you taking the time.</p>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="form-ok show" role="alert">
        <h3>Something went wrong submitting online</h3>
        <p className="small">No worries, you can text your feedback straight to Jackson instead.</p>
      </div>
    );
  }

  return (
    <form className="lead-card" onSubmit={submit} noValidate>
      <h3>Leave your feedback</h3>
      <p className="small">No Google account needed, tell us how it went and we’ll add it to the site.</p>
      <div className="field">
        <label>Your rating</label>
        <div className="star-picker" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={n <= rating ? 'on' : ''}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => setRating(n)}
            >★</button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>
      <div className="field">
        <label htmlFor="rname">Your name</label>
        <input id="rname" name="name" type="text" placeholder="Full name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="rsuburb">Suburb <span className="opt">(optional)</span></label>
        <input id="rsuburb" name="suburb" type="text" placeholder="e.g. Armstrong Creek" />
      </div>
      <div className="field">
        <label htmlFor="rquote">Your feedback</label>
        <textarea id="rquote" name="quote" rows={4} placeholder="Tell us about your experience with Bay City Blinds" required></textarea>
      </div>
      <div className="field">
        <label htmlFor="remail">Email <span className="opt">(optional, in case we need to check anything)</span></label>
        <input id="remail" name="email" type="email" placeholder="you@email.com" autoComplete="email" />
      </div>
      <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'submitting'} style={{ width: '100%', marginTop: '1rem' }}>
        {status === 'submitting' ? 'Sending…' : 'Submit feedback →'}
      </button>
    </form>
  );
}
