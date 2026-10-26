// ONE switch for every quote / measure enquiry form on the site.
//
//   'short'  = the shortened form (src/components/LeadFormShort.tsx)
//   'legacy' = the original form, preserved untouched (src/components/legacy/LeadFormLegacy.tsx)
//
// To restore the original form everywhere: change the value below to 'legacy',
// rebuild and deploy. See docs/legacy-form/README.md. No backend change is needed —
// /api/lead serves both versions.
export const LEAD_FORM_VERSION: 'short' | 'legacy' = 'short';

// "What are you interested in?" — the existing product options (unchanged from the
// original form) plus "Not sure yet", which is the original form's catch-all.
export const SERVICE_OPTIONS = [
  'Roller blinds', 'Honeycomb blinds', 'Venetian blinds',
  'Plantation shutters', 'Blockout blinds', 'Pelmet boxes',
  'Curtains', 'Zipscreen', 'Roller shutters',
  'Awnings', 'Security doors', 'Security shutters',
  'Repair or service',
  'A few different things', 'Not sure yet',
];
