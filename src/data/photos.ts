// Photo manifest — maps site slots to numbered photos in /public/photos/.
// To change any image: open the photo picker, find the number, edit here.
export const photoMap = {
  'roller-blinds': 50,
  'roman-blinds': 55,
  'venetian-blinds': 52,
  'plantation-shutters': 53,
  'curtains': 1,
  'outdoor-screens': 2,
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
