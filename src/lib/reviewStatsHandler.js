// GET /api/review-stats — live Google rating + review count for the business profile.
// Shared by the Cloudflare Pages Function (functions/api/review-stats.js) and the
// Vercel Edge Function (api/review-stats.js). Pure Fetch API, no node: built-ins.
//
// Secrets (server-only, never PUBLIC_):
//   GOOGLE_PLACES_API_KEY  key restricted to "Places API (New)" only
//   GOOGLE_PLACE_ID        the business's Place ID
//
// The page ships with a static fallback count (src/data/site.ts) and the client script
// only swaps it when this endpoint returns a validated response, so a missing key,
// an outage or a bad payload leaves the page showing the last known-good number.

const CALL_TIMEOUT_MS = 6000;
const json = (body, status, cache) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache },
  });

export async function handleReviewStats(env, fetchImpl = fetch) {
  const key = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return json({ error: 'not_configured' }, 503, 'no-store');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CALL_TIMEOUT_MS);
  try {
    const res = await fetchImpl(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount' },
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error('[review-stats] Places API', res.status);
      return json({ error: 'upstream_error' }, 502, 'no-store');
    }
    const data = await res.json();
    const rating = Number(data.rating);
    const count = Number(data.userRatingCount);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5 || !Number.isInteger(count) || count < 1) {
      console.error('[review-stats] unexpected payload', JSON.stringify(data));
      return json({ error: 'bad_payload' }, 502, 'no-store');
    }
    return json(
      { rating: rating.toFixed(1), count, source: 'google-places', fetchedAt: new Date().toISOString() },
      200,
      // Browsers 1h, edge 6h: new reviews show within a few hours and the Places API is hit
      // a handful of times a day, not per visitor.
      'public, max-age=3600, s-maxage=21600',
    );
  } catch (err) {
    console.error('[review-stats] fetch failed:', err.message || err);
    return json({ error: 'upstream_error' }, 502, 'no-store');
  } finally {
    clearTimeout(timer);
  }
}
