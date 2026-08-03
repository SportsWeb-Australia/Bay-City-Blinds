// Central business + SEO data. In production this is the layer the B1
// "SEO & Pages" editor writes to (Supabase). Keeping it as a typed module
// means the whole site stays editable from one place.

export const site = {
  name: 'Bay City Blinds',
  legalName: 'Bay City Blinds',
  url: 'https://baycityblinds.com.au',
  phone: '0430 161 383',
  phoneHref: 'tel:+61430161383',
  smsHref: 'sms:+61430161383',
  email: 'baycityblinds@gmail.com',
  abn: '32 865 543 322',
  founded: '2020',
  ratingValue: '5.0',
  reviewCount: '72',
  priceRange: '$$',
  geo: { lat: -38.1499, lng: 144.3617 },
  addressLocality: 'Geelong',
  addressRegion: 'VIC',
  postalCode: '3220',
  serviceRadiusMetres: 60000,
  ogImage: '/images/og-image.png',
  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '08:00', closes: '18:00' },
  ],
} as const;

// Suburbs used across schema + service-area sections
export const serviceAreas = [
  'Geelong','Armstrong Creek','Surf Coast','Bellarine Peninsula','Lara',
  'Werribee','Tarneit','Point Cook','Williamstown','Footscray',
];
