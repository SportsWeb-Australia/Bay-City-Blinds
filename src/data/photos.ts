// Photo manifest for the homepage category tiles (CategorySelect.astro) and
// the gallery/journey image slots (Gallery.astro, Process.astro) ONLY.
//
// This is NOT where product photos live — that's heroImage on each product
// in content.ts, used directly by both the product pages and the grid cards
// (Products.astro). Adding a product slug here again is exactly the mistake
// that caused grid cards to silently show a placeholder despite heroImage
// being set correctly (two disconnected photo sources drifting out of sync).
// If a product needs a different photo, edit heroImage in content.ts.
export const photoMap = {
  'plantation-shutters': 10, // CategorySelect "Indoor" tile — confirmed: two full plantation shutter windows, bright bedroom
  'outdoor-screens': 53, // CategorySelect "Outdoor" tile
  'gallery-1': 31, // indoor: plantation shutters, bedroom (different room to product card photo)
  'gallery-2': 63, // outdoor: roller shutters, brick house exterior
  'gallery-3': 'venetian-real', // real venetian blind photo (was the roman blind photo — product discontinued)
  'gallery-4': 57, // outdoor: screens, corner brick house
  'gallery-5': 46, // indoor: roller blinds, kitchen/living
  'gallery-6': 59, // outdoor: screens down, alfresco dining
  'gallery-7': 3, // indoor: sheer curtains, bay window living room
  'gallery-8': 68, // outdoor: roller shutters, brick porch
  'journey-1': 23,
  'journey-2': 24,
  'journey-3': 26,
  'journey-4': 27,
  'journey-5': 28,
  'journey-6': 29,
} as const;
export const photo = (slot: keyof typeof photoMap) => `/photos/photo-${photoMap[slot]}.webp`;
