import { useState } from 'react';
import { faqs } from '../data/content';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <div className={`qa ${open === i ? 'open' : ''}`} key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {f.q}
            <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg></span>
          </button>
          <div className="ans" style={{ maxHeight: open === i ? '260px' : '0' }}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
