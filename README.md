# Bay City Blinds — Astro lead-gen site

Built by **Business1**. Static-rendered for SEO, with React islands for the interactive bits.

## Why Astro (not a plain Vite/React SPA)

Every page is pre-rendered to **complete HTML at build time**, so Google, Bing, the
social scrapers and AI crawlers all receive the real `<title>`, meta description and
JSON-LD schema **without running any JavaScript**. The only JS that ships is for two
small interactive "islands" — the lead form and the FAQ accordion — which don't affect
crawlability. This is the correct rendering model for an SEO-critical marketing site.
(A logged-in app like the B1 dashboard is the opposite case — CSR React/Vite is right there.)

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> ./dist (static)
npm run preview
```

## Deploy (your usual flow)

Push to GitHub → import the repo in Vercel. Astro is auto-detected; no adapter needed
for static output. `sitemap-index.xml` and `robots.txt` are generated/served automatically.
Point `baycityblinds.com.au` at Vercel (web records only — leave MX/mail untouched).

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | Business NAP + SEO defaults (**replace placeholders**) |
| `src/data/content.ts` | Products, locations (unique per-suburb copy), reviews, FAQs |
| `src/data/schema.ts` | JSON-LD builders (LocalBusiness, Service, FAQPage, Breadcrumb) |
| `src/components/BaseHead.astro` | Per-page meta + JSON-LD, server-rendered |
| `src/components/LeadForm.tsx` | React island — quote form (wire to Zoho) |
| `src/components/Faq.tsx` | React island — FAQ accordion |
| `src/pages/[location].astro` | Auto-generates one page per service area via `getStaticPaths` |
| `src/pages/blinds/[product].astro` | Auto-generates one page per product |

## To finish before launch

- Replace placeholders in `src/data/site.ts` (phone, email, ABN, real rating/review count).
- Hero photo is `public/jackson.webp` (the new image). Swap for a final pro shot when ready.
- Placeholder images live in `public/images/` (product tiles, gallery, og-image). They are branded SVGs labelled "SAMPLE" — replace each with a real photo of the same name (e.g. `roller-blinds.svg` -> `roller-blinds.jpg`, then update the `.svg` refs).
- Wire `LeadForm.tsx` submit to a Zoho Forms endpoint or Zoho CRM webhook (marked with a TODO).
- Add real Google reviews to `content.ts`.

## Next step: make it editable from the B1 platform

`src/data/*` is the seam. Point those reads at **Supabase** (`site_pages`, `site_seo_defaults`)
and switch `astro.config.mjs` to `output: 'server'` with the Vercel adapter so the B1
"SEO & Pages" editor can update titles/descriptions/schema and trigger on-demand revalidation —
edits go live in seconds, and crawlers still get fully-rendered HTML.
