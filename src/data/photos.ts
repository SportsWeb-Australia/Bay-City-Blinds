// Photo manifest — maps site slots to numbered photos in /public/photos/.
// To change any image: open the photo picker, find the number, edit here.
export const photoMap = {
  'roller-blinds': 46, // confirmed: two roller blinds, clean indoor shot
  'roman-blinds': 43, // confirmed: fabric roman blind above kitchen window
  'venetian-blinds': 'venetian-real', // real venetian blind photo supplied by Jackson
  'plantation-shutters': 10, // confirmed: two full plantation shutter windows, bright bedroom
  'curtains': 'curtains-real', // real curtains photo supplied by Jackson
  'outdoor-screens': 53,
  'gallery-1': 31, // indoor: plantation shutters, bedroom (different room to product card photo)
  'gallery-2': 63, // outdoor: roller shutters, brick house exterior
  'gallery-3': 43, // indoor: roman blind, kitchen window
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
