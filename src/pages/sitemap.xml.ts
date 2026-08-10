import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { products, locations, curtainStyles, securityStyles } from '../data/content';
import { articles } from '../data/blog';

const staticPaths = ['/', '/blinds', '/indoor', '/outdoor', '/motorised', '/security', '/free-measure-quote', '/about', '/reviews', '/tips'];

export const GET: APIRoute = () => {
  const urls = [
    ...staticPaths,
    ...products.map((p) => `/blinds/${p.slug}`),
    ...curtainStyles.map((s) => `/curtains/${s.slug}`),
    ...securityStyles.map((s) => `/security/${s.slug}`),
    ...articles.map((a) => `/tips/${a.slug}`),
    ...locations.map((l) => `/${l.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site.url).href}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
