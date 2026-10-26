// Vercel Edge Function — GET /api/review-stats
// Thin platform wrapper; logic lives in src/lib/reviewStatsHandler.js (shared with Cloudflare).
import { handleReviewStats } from '../src/lib/reviewStatsHandler.js';

export const config = { runtime: 'edge' };

export default async function handler() {
  return handleReviewStats(process.env);
}
