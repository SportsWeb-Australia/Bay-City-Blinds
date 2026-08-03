import ZohoEmbedForm, { ZOHO_FULL_FORM, ZOHO_QUICK_FORM } from './ZohoEmbedForm';

// Interactive lead form (React island). Hydrated on load with client:load.
// Both variants embed Jackson's live Zoho forms directly (see ZohoEmbedForm), so
// submissions land in his real CRM/automation. 'full' = the detailed form (hero,
// /free-measure-quote, product pages). 'quick' = the short form (suburb pages).
export default function LeadForm({ variant = 'full' }: { defaultSuburb?: string; variant?: 'full' | 'quick' }) {
  if (variant === 'quick') {
    return (
      <div className="lead-card lead-card-slim">
        <span className="flag">Free, no obligation</span>
        <ZohoEmbedForm config={ZOHO_QUICK_FORM} />
      </div>
    );
  }

  return (
    <div className="lead-card lead-card-slim">
      <span className="flag">Free, no obligation</span>
      <ZohoEmbedForm config={ZOHO_FULL_FORM} />
      <div className="assure">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>
        Your details stay private. No spam, ever.
      </div>
    </div>
  );
}
