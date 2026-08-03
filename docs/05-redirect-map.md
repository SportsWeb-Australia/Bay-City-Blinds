# Bay City Blinds Redirect Map

Use this file if replacing or rebuilding an existing website.

## Redirect Rules

Use 301 redirects for permanently moved pages.

Redirect each old URL to the closest matching new URL.

Do not redirect every page to the homepage unless there is no relevant replacement.

Avoid redirect chains.

## Redirect Table

**Status: PARTIAL.** These map the old URLs already on file from the site audit. Implemented in
`public/_redirects` (Cloudflare Pages redirects). Full audit (below) still pending.

| Old URL | New URL | Redirect Type | Priority | Notes |
|---|---|---|---|---|
| / | / | 301 if needed | High | Homepage |
| /about-us/ | /about | 301 | High | About page |
| /products/ | /blinds | 301 | High | Product hub |
| /gallery/ | /#gallery | 301 | Medium | Gallery section |
| /faq | /#faq | 301 | Medium | FAQ section |
| /contact/ | /free-measure-quote | 301 | High | Contact/free quote |
| /area-we-serve/ | /#areas | 301 | Medium | Service areas section |
| /tag/blog/ | / | 301 | Low | Blog tag archive, no direct replacement |
| 2× legacy blog posts | TBD | 301 | Low | Targets unknown until content is pulled |

## To Complete

Claude must audit the existing Bay City Blinds URL structure before launch and complete this map
properly — pull the real old-site URL list (via Claude in Chrome, the old site's sitemap.xml, or
Google Search Console if Carson gets access from Jackson) and confirm the 2 legacy blog post URLs
and their replacement targets.