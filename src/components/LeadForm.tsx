import { LEAD_FORM_VERSION } from '../data/forms';
import LeadFormShort from './LeadFormShort';
import LeadFormLegacy from './legacy/LeadFormLegacy';

// Every quote / measure enquiry form on the site renders through this one component, so
// they can never drift apart. Which version shows is controlled by LEAD_FORM_VERSION in
// src/data/forms.ts ('short' | 'legacy'). To restore the original form, see
// docs/legacy-form/README.md.
type Props = { defaultSuburb?: string; variant?: 'full' | 'quick' };

export default function LeadForm(props: Props) {
  return LEAD_FORM_VERSION === 'legacy' ? <LeadFormLegacy {...props} /> : <LeadFormShort {...props} />;
}
