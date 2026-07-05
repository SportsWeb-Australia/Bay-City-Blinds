// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Static output = every page is pre-rendered to full HTML at build time.
// Crawlers + AI bots receive complete <title>, meta and JSON-LD — no JS required.
// To move to on-demand/ISR rendering (for the B1 SEO editor writing to Supabase),
// switch to `output: 'server'` + the Vercel adapter and add revalidation.
export default defineConfig({
  site: 'https://baycityblinds.com.au',
  output: 'static',
  integrations: [react(), sitemap()],
});
