// Vercel Edge Function — POST /api/lead
// Thin platform wrapper; the real logic lives in src/lib/leadHandler.js so it's
// shared with the Cloudflare Pages Function (functions/api/lead.js) for whenever the
// site migrates hosts. This is the one that actually runs today since the site is
// currently live on Vercel.
import { handleLead } from '../src/lib/leadHandler.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  return handleLead(request, process.env);
}
