# Bay City Blinds — Claude Project Instructions

This project is the Astro website build for Bay City Blinds.

The goal is to create a premium, professional, mobile-first, SEO-ready, lead-generation website for a local Geelong blinds business.

Do not treat this website as a brochure. Treat it as a Business One lead-generation and client-acquisition system.

## Non-Negotiables

- The website must look high-end, professional, local, trustworthy, and polished.
- The website must generate qualified leads.
- The website must be mobile-first.
- The website must be Astro-compatible.
- The website must be fast, crawlable, and search-engine friendly.
- Important content must be server-rendered where possible.
- Do not hide important SEO content behind client-side JavaScript.
- Do not create generic AI-looking layouts.
- Do not drift away from the approved design direction.
- Do not make major design changes without first explaining the reason.
- Do not overwrite the original strategy unless asked.

## Design Direction

The design should feel bright, clean, premium, local, practical, and trustworthy.

The site should draw inspiration from high-quality blinds/shutters/curtains websites such as Wynstan, Hillarys, and Shutterly Fabulous, but must not copy them.

The site should emphasise:
- mobile showroom convenience
- free measure and quote
- local Geelong service
- real people behind the business
- Jackson as the owner
- Tim as the carpenter/installer
- trust, reviews, quality, and service
- easy enquiry

## Astro Rules

Use Astro components for static sections.

Only use React/client-side islands where genuine interactivity is needed.

Prefer reusable components:
- HeroSection.astro
- TrustBar.astro
- ServiceCards.astro
- ProcessSteps.astro
- TestimonialSection.astro
- GallerySection.astro
- FAQSection.astro
- CTASection.astro
- LocationGrid.astro
- Footer.astro
- Header.astro

Keep code clean, reusable, responsive, and easy to extend.

## SEO Rules

Every important page must consider:
- title tag
- meta description
- canonical URL
- Open Graph tags
- headings
- internal links
- image alt text
- schema
- sitemap
- robots.txt
- 301 redirects
- 404 page
- local SEO
- suburb/service relevance

For local SEO, structure content around:
- blinds Geelong
- curtains Geelong
- shutters Geelong
- outdoor blinds Geelong
- free measure and quote
- mobile showroom
- service areas and suburbs
- reviews
- FAQs
- installation process

## Business One Integration Rules

Every lead capture point must be mapped to the Business One workflow.

Capture where appropriate:
- name
- phone
- email
- suburb
- service interest
- preferred contact method
- timeframe
- message
- lead source
- campaign source
- consent

Prepare for:
- Zoho Forms
- Zoho CRM
- Zoho Bookings
- Zoho Campaigns
- Zoho Desk
- Google Analytics
- Search Console
- call tracking
- email/SMS follow-up
- sales pipeline follow-up

## Workflow Rules

Before making major code changes:
1. Read this file.
2. Read every file inside /docs.
3. Summarise the current direction.
4. Identify any conflicts.
5. Propose a plan.
6. Wait for approval before large changes.

After making major changes:
1. Explain what changed.
2. Explain why.
3. List files changed.
4. Identify anything that still needs testing.
5. Update the relevant docs if the project direction changed.

## Design Drift Rule

If the design starts moving away from the approved direction, stop.

Compare the current version against the design reference.

Restore the lost traits rather than inventing a new direction.