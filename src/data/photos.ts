// Photo manifest — maps site slots to numbered photos in /public/photos/.
// To change any image: open the photo picker, find the number, edit here.
export const photoMap = {
  'roller-blinds': 46, // confirmed: two roller blinds, clean indoor shot
  'roman-blinds': 43, // confirmed: fabric roman blind above kitchen window
  'venetian-blinds': 52, // ⚠️ NOT a genuine venetian blind photo — no true venetian shot exists in this
                         // library (every horizontal-slat shot found is actually plantation shutters).
                         // Get a real venetian blind photo from Jackson before launch.
  'plantation-shutters': 10, // confirmed: two full plantation shutter windows, bright bedroom
  'curtains': 1,
  'outdoor-screens': 53,
  'gallery-1': 12,
  'gallery-2': 13,
  'gallery-3': 15,
  'gallery-4': 16,
  'gallery-5': 18,
  'gallery-6': 19,
  'journey-1': 23,
  'journey-2': 24,
  'journey-3': 26,
  'journey-4': 27,
  'journey-5': 28,
  'journey-6': 29,
} as const;
export const photo = (slot: keyof typeof photoMap) => `/photos/photo-${photoMap[slot]}.webp`;
