// Vercel Edge Function — POST /api/review
// Thin platform wrapper; the real logic lives in src/lib/reviewHandler.js so it's
// shared with the Cloudflare Pages Function (functions/api/review.js).
import { handleReview } from '../src/lib/reviewHandler.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  return handleReview(request, process.env);
}
