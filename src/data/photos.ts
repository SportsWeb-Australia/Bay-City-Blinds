// Photo manifest — maps site slots to numbered photos in /public/photos/.
// To change any image: open the photo picker, find the number, edit here. That's it.
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
} as const;
export const photo = (slot: keyof typeof photoMap) => `/photos/photo-${photoMap[slot]}.webp`;
