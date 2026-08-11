# Bay City Blinds Redirect Map

**Status: COMPLETE.** Built from the real old site's sitemap.xml files
(page-sitemap.xml, post-sitemap.xml, product-sitemap.xml) on 2026-08-11,
not guessed. Implemented in `public/_redirects` (Cloudflare Pages redirects).

## What the old site actually was

`baycityblinds.com.au` was a WordPress + WooCommerce site (Bridge theme).
Alongside real business content it was still carrying a large amount of
leftover theme demo content that was never cleaned up:

- 23 `/portfolio/portfolio-*/` demo portfolio layout pages
- 20 `/shortcodes/*/` theme shortcode demo pages
- 19 `/product/*/` fake WooCommerce demo products (hoodies, sunglasses, beanies — a stock fashion-store demo import, nothing to do with blinds)

None of that is redirected — it was never real content with search
visibility or backlinks worth preserving.

## What's redirected

- Core pages (About, Contact, FAQ, Gallery, Pricing, Team, History) →
  closest equivalent on the new site.
- Product/category pages → matching `/blinds/[product]` page, or `/blinds`
  where there's no direct equivalent (e.g. discontinued Roman blinds,
  vertical blinds, bamboo blinds — none of these are offered on the new
  site).
- WooCommerce shop pages (`/shop/`, `/cart/`, `/checkout/`, `/my-account/`)
  → `/blinds`, since there's no e-commerce on the new site.
- **31 real blog posts** → `/tips` (the new hub). The old site had a
  genuine, actively-maintained blog with topics like "Cost of Plantation
  Shutters in Geelong" and "Blockout vs Sunscreen Roller Blinds" — far more
  than the "2 legacy posts" originally assumed before this audit. None of
  them have a matching article on the new site yet, so all 31 route to the
  `/tips` hub for now rather than 404ing.

## Worth doing next (content opportunity, not a redirect fix)

A meaningful number of those 31 old posts closely match topics already on
the new site's Tips & Advice content calendar (see chat history /
handover notes). Rebuilding the strongest of these as real `/tips/[slug]`
articles — reusing the good topic ideas, written fresh — would let us
retarget their specific old URLs individually instead of bulk-routing
everything to the hub, recovering more of whatever ranking equity those
pages built up. Not urgent, but flagged so it doesn't get lost.

## Full table

See `public/_redirects` for the authoritative, complete list (64 rules).
