import { useId, useRef, useState } from 'react';
import { site } from '../data/site';
import { SERVICE_OPTIONS } from '../data/forms';
import { EMAIL_RE, PROPERTY_TYPES, CONTACT_PREFS, normalizeAuMobile } from '../lib/leadValidation.js';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Values = {
  firstName: string; lastName: string; phone: string; email: string; suburb: string;
  propertyType: string; service: string; contactPreference: string;
};
type Errors = Partial<Record<'firstName' | 'lastName' | 'phone' | 'email' | 'suburb' | 'propertyType', string>>;

// Shortened quote / measure enquiry form. Submits to /api/lead (src/lib/leadHandler.js).
// The original form is preserved in ./legacy/LeadFormLegacy.tsx and is selected via
// LEAD_FORM_VERSION in src/data/forms.ts — see docs/legacy-form/README.md.
const REQUIRED_ORDER: (keyof Errors)[] = ['firstName', 'lastName', 'phone', 'email', 'suburb', 'propertyType'];

function validateField(name: keyof Errors, v: Values): string {
  const t = (s: string) => s.trim();
  switch (name) {
    case 'firstName': return t(v.firstName) ? '' : 'Please enter your first name.';
    case 'lastName': return t(v.lastName) ? '' : 'Please enter your last name.';
    case 'phone':
      if (!t(v.phone)) return 'Please enter your mobile number.';
      return normalizeAuMobile(v.phone) ? '' : 'Please enter an Australian mobile, e.g. 0412 345 678 or +61 412 345 678.';
    case 'email':
      if (!t(v.email)) return 'Please enter your email address.';
      return EMAIL_RE.test(t(v.email)) ? '' : 'Please enter a valid email address, e.g. name@example.com.';
    case 'suburb': return t(v.suburb) ? '' : 'Please enter your suburb.';
    case 'propertyType': return v.propertyType ? '' : 'Please choose new build or existing home.';
  }
}

function validateAll(v: Values): Errors {
  const errs: Errors = {};
  for (const n of REQUIRED_ORDER) {
    const m = validateField(n, v);
    if (m) errs[n] = m;
  }
  return errs;
}

export default function LeadFormShort({ defaultSuburb = '', variant = 'full' }: { defaultSuburb?: string; variant?: 'full' | 'quick' }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [status, setStatus] = useState<Status>('idle');
  const [values, setValues] = useState<Values>({
    firstName: '', lastName: '', phone: '', email: '', suburb: defaultSuburb,
    propertyType: '', service: '', contactPreference: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loadedAt] = useState(() => Date.now());
  const formName = variant === 'quick' ? 'quick_quote' : 'free_measure_quote';

  // GA4: fire once when the visitor first meaningfully interacts with the form
  // (never repeatedly as they move between fields).
  const startedRef = useRef(false);
  function trackFormStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    console.log('[Analytics] quote_form_start fired'); // TEMP diagnostic, remove once confirmed
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'quote_form_start', { form_name: formName, page_path: window.location.pathname });
    }
  }

  function setValue(name: keyof Values, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once an error is showing for a field, re-check it as the visitor types so it clears
    // the moment the value becomes valid (never nags a field they haven't left yet).
    if (name in errors) {
      const m = validateField(name as keyof Errors, next);
      setErrors((e) => {
        const n = { ...e };
        if (m) n[name as keyof Errors] = m; else delete n[name as keyof Errors];
        return n;
      });
    }
  }

  function checkOnBlur(name: keyof Errors) {
    const m = validateField(name, values);
    setErrors((e) => {
      const n = { ...e };
      if (m) n[name] = m; else delete n[name];
      return n;
    });
  }

  function focusField(name: keyof Errors) {
    const el = name === 'propertyType'
      ? (document.querySelector(`input[name="propertyType"]`) as HTMLElement | null)
      : document.getElementById(id(name));
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' }); // clear the sticky header
    el.focus({ preventScroll: true });
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateAll(values);
    setErrors(errs);
    const first = REQUIRED_ORDER.find((n) => errs[n]);
    if (first) { focusField(first); return; }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', { method: 'POST', body: new FormData(e.currentTarget) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        console.log('[Analytics] generate_lead fired'); // TEMP diagnostic, remove once confirmed
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', { form_name: formName, page_path: window.location.pathname });
        }
        // Google Ads conversion for a completed quote request. Fires only after the
        // lead is confirmed created, so Ads counts real leads rather than submit clicks.
        if (typeof window !== 'undefined') {
          (window as any).gadsConversion?.((window as any).GADS?.leadLabel);
        }
      } else {
        setStatus('error'); // form stays mounted, so everything they typed is kept
      }
    } catch {
      setStatus('error');
    }
  }

  const Req = () => (<><span className="lf-req" aria-hidden="true">*</span><span className="lf-sr"> (required)</span></>);
  const Opt = () => <span className="lf-opt"> (optional)</span>;
  const err = (n: keyof Errors) => errors[n];
  const errP = (n: keyof Errors) => err(n) ? <p className="lf-error" id={id(`${n}-err`)}>{err(n)}</p> : null;
  const fieldProps = (n: keyof Errors) => ({
    'aria-invalid': err(n) ? true : undefined,
    'aria-describedby': err(n) ? id(`${n}-err`) : undefined,
  });

  const cardClass = `lead-card lf${variant === 'quick' ? ' lf--quick' : ''}`;

  if (status === 'success') {
    return variant === 'quick' ? (
      <div className="od-quick-ok" role="status">
        <span className="tick-sm">✓</span> Nice one, request received! Jackson will be in touch within 1 business day.
      </div>
    ) : (
      <div className={cardClass}>
        <span className="flag">Free, no obligation</span>
        <div className="form-ok show" role="status">
          <div className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg></div>
          <h3>Nice one, request received!</h3>
          <p className="small">Jackson or one of his team will be in contact with you shortly. Talk soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <span className="flag">Free, no obligation</span>
      <form noValidate onSubmit={submit} onFocus={trackFormStart} aria-labelledby={id('title')}>
        {/* Honeypot: hidden from real users, catches bots that auto-fill every field. */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor={id('website')}>Website</label>
          <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="formLoadedAt" value={loadedAt} />
        <input type="hidden" name="formVariant" value={variant} />
        <input type="hidden" name="formVersion" value="short" />

        <h3 id={id('title')}>Request your free measure &amp; quote</h3>
        <p className="small">Leave your details and Jackson will be in touch within one business day to arrange a time. Free, with no obligation.</p>
        <p className="lf-note"><span aria-hidden="true">*</span> Required</p>

        <div className="lf-row">
          <div className={`field${err('firstName') ? ' is-invalid' : ''}`}>
            <label htmlFor={id('firstName')}>First name<Req /></label>
            <input id={id('firstName')} name="firstName" type="text" autoComplete="given-name" autoCapitalize="words"
              value={values.firstName} onChange={(e) => setValue('firstName', e.target.value)} onBlur={() => checkOnBlur('firstName')} {...fieldProps('firstName')} />
            {errP('firstName')}
          </div>
          <div className={`field${err('lastName') ? ' is-invalid' : ''}`}>
            <label htmlFor={id('lastName')}>Last name<Req /></label>
            <input id={id('lastName')} name="lastName" type="text" autoComplete="family-name" autoCapitalize="words"
              value={values.lastName} onChange={(e) => setValue('lastName', e.target.value)} onBlur={() => checkOnBlur('lastName')} {...fieldProps('lastName')} />
            {errP('lastName')}
          </div>
        </div>

        <div className={`field${err('phone') ? ' is-invalid' : ''}`}>
          <label htmlFor={id('phone')}>Mobile<Req /></label>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0412 345 678"
            value={values.phone} onChange={(e) => setValue('phone', e.target.value)} onBlur={() => checkOnBlur('phone')} {...fieldProps('phone')} />
          {errP('phone')}
        </div>

        <div className={`field${err('email') ? ' is-invalid' : ''}`}>
          <label htmlFor={id('email')}>Email<Req /></label>
          <input id={id('email')} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="off" spellCheck={false} placeholder="you@email.com"
            value={values.email} onChange={(e) => setValue('email', e.target.value)} onBlur={() => checkOnBlur('email')} {...fieldProps('email')} />
          {errP('email')}
        </div>

        <div className={`field${err('suburb') ? ' is-invalid' : ''}`}>
          <label htmlFor={id('suburb')}>Suburb<Req /></label>
          <input id={id('suburb')} name="suburb" type="text" autoComplete="address-level2" autoCapitalize="words" placeholder="e.g. Armstrong Creek"
            value={values.suburb} onChange={(e) => setValue('suburb', e.target.value)} onBlur={() => checkOnBlur('suburb')} {...fieldProps('suburb')} />
          {errP('suburb')}
        </div>

        <fieldset className={`lf-group${err('propertyType') ? ' is-invalid' : ''}`} aria-describedby={err('propertyType') ? id('propertyType-err') : undefined}>
          <legend>Is this for a new build or an existing home?<Req /></legend>
          <div className="lf-choices">
            {Object.entries(PROPERTY_TYPES).map(([val, label]) => (
              <label key={val} className={`lf-choice${values.propertyType === val ? ' on' : ''}`}>
                <input type="radio" name="propertyType" value={val} checked={values.propertyType === val}
                  onChange={() => setValue('propertyType', val)} aria-required="true" />
                {label}
              </label>
            ))}
          </div>
          {errP('propertyType')}
        </fieldset>

        <div className="field">
          <label htmlFor={id('service')}>What are you interested in?<Opt /></label>
          <select id={id('service')} name="service" value={values.service} onChange={(e) => setValue('service', e.target.value)}>
            <option value="">Select an option</option>
            {SERVICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <fieldset className="lf-group">
          <legend>How would you prefer us to contact you?<Opt /></legend>
          <div className="lf-choices lf-choices--3">
            {Object.entries(CONTACT_PREFS).map(([val, label]) => (
              <label key={val} className={`lf-choice${values.contactPreference === val ? ' on' : ''}`}>
                {/* Re-clicking the selected option clears it, so an optional choice can be undone. */}
                <input type="radio" name="contactPreference" value={val} checked={values.contactPreference === val}
                  onChange={() => setValue('contactPreference', val)}
                  onClick={(e) => { if (values.contactPreference === e.currentTarget.value) setValue('contactPreference', ''); }} />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="lf-reassure">We’ll use your mobile and email to arrange your free measure and send your quote.</p>

        {status === 'error' && (
          <div className="lf-fail" role="alert">
            <b>Something went wrong submitting online.</b> Your details are still here, so you can try again, or call or text Jackson directly and he’ll sort it out.
            <div className="trust-chips" style={{ marginTop: '.6rem' }}>
              <a className="chip" href={site.phoneHref}>📞 Call {site.phone}</a>
              <a className="chip" href={site.smsHref}>💬 Text {site.phone}</a>
            </div>
          </div>
        )}

        <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Request my free quote'}
        </button>
        <div className="assure">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
          Your details stay private. No spam, ever.
        </div>
      </form>
    </div>
  );
}
