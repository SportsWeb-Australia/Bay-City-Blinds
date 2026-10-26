// Cloudflare Pages Function — GET /api/review-stats
// Thin platform wrapper; logic lives in src/lib/reviewStatsHandler.js (shared with Vercel).
import { handleReviewStats } from '../../src/lib/reviewStatsHandler.js';

export async function onRequestGet({ env }) {
  return handleReviewStats(env);
}
