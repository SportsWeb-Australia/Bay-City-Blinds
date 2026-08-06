// Cloudflare Pages Function — POST /api/review
// Thin platform wrapper; the real logic lives in src/lib/reviewHandler.js so it's
// shared with the Vercel Edge Function (api/review.js) that runs on the current host.
import { handleReview } from '../../src/lib/reviewHandler.js';

export async function onRequestPost({ request, env }) {
  return handleReview(request, env);
}
