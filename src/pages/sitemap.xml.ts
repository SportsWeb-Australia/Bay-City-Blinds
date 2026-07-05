import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { products, locations } from '../data/content';

const staticPaths = ['/', '/blinds', '/free-measure-quote', '/about', '/reviews'];

export const GET: APIRoute = () => {
  const urls = [
    ...staticPaths,
    ...products.map((p) => `/blinds/${p.slug}`),
    ...locations.map((l) => `/${l.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${new URL(u, site.url).href}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
