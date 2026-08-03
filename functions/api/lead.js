// Cloudflare Pages Function — POST /api/lead
// Thin platform wrapper; the real logic lives in src/lib/leadHandler.js so it's
// shared with the Vercel Edge Function (api/lead.js) that runs on the current host.
import { handleLead } from '../../src/lib/leadHandler.js';

export async function onRequestPost({ request, env }) {
  return handleLead(request, env);
}
