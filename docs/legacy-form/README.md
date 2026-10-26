# Legacy quote form — preserved original

On the day the shortened quote form went live, the original (long) form was kept
untouched so it can be brought back.

## What is preserved

| What | Where |
|---|---|
| Original form component (fields, validation, styling hooks, submit logic, analytics) | `src/components/legacy/LeadFormLegacy.tsx` — verbatim copy; only the `site` import path changed |
| Original form CSS (`.od-quick`, `.form-row-2`, `.field-highlight`, `.seg`…) | `src/styles/global.css` — left in place, not deleted |
| Original backend handler, as it was before the change | `docs/legacy-form/leadHandler.before-short-form.js.txt` (reference only, not imported) |
| Original backend rules | still live in `src/lib/leadHandler.js`: any post **without** `formVersion=short` (the legacy form, or an old cached page) keeps the original rules — address required, no mobile-format check, original email layout content |

There is no database. Enquiries are emailed (ZeptoMail) and nothing is stored, so there
are no records or fields to migrate or lose.

## The switch

`src/data/forms.ts`:

```ts
export const LEAD_FORM_VERSION: 'short' | 'legacy' = 'short';
```

Every quote/measure form on the site renders through `src/components/LeadForm.tsx`,
which reads this one setting.

## Restore the original form — exact steps

1. Open `src/data/forms.ts`.
2. Change `'short'` to `'legacy'` on the `LEAD_FORM_VERSION` line.
3. `npm run build`
4. Deploy as usual (`npx wrangler pages deploy dist --project-name bay-city-blinds`),
   after the usual live-vs-local parity check.
5. Hard-refresh a page. The old form (address, best time, how-did-you-hear, notes) is back
   on all pages. No backend change or env var is needed.

To go back to the short form, set it to `'short'` and repeat steps 3–5.
