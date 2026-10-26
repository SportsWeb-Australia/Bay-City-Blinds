// Shared by the browser form (src/components/LeadFormShort.tsx) and the server
// (src/lib/leadHandler.js) so both always agree on what is valid. Pure functions only.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// value (what the form posts) -> label (what Jackson reads in the notification)
export const PROPERTY_TYPES = { 'new-build': 'New build', 'existing-home': 'Existing home' };
export const CONTACT_PREFS = { call: 'Call', text: 'Text', email: 'Email' };

// Own-property checks, so untrusted input like "constructor" can never pass as a key.
const has = (map, key) => Object.prototype.hasOwnProperty.call(map, key);
export const isPropertyType = (v) => has(PROPERTY_TYPES, v);
export const isContactPref = (v) => has(CONTACT_PREFS, v);

// Returns the mobile in canonical local form (04XXXXXXXX) or null if it isn't an
// Australian mobile. Accepts spaces, dashes, dots, brackets and the +61 / 61 prefixes,
// including the common "+61 (0)4…" habit of keeping the trunk zero.
export function normalizeAuMobile(input) {
  const s = String(input ?? '').replace(/[\s\-.()]/g, '');
  let rest;
  if (/^\+?61/.test(s)) rest = s.replace(/^\+?61/, '').replace(/^0/, '');
  else if (s.startsWith('0')) rest = s.slice(1);
  else return null;
  return /^4\d{8}$/.test(rest) ? `0${rest}` : null;
}

// "0412 345 678" — for display in notifications.
export function formatAuMobile(canonical) {
  return canonical.replace(/^(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3');
}
