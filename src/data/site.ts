// Central business + SEO data. In production this is the layer the B1
// "SEO & Pages" editor writes to (Supabase). Keeping it as a typed module
// means the whole site stays editable from one place.

export const site = {
  name: 'Bay City Blinds',
  legalName: 'Bay City Blinds',
  url: 'https://baycityblinds.com.au',
  // ⚠️ PLACEHOLDERS — replace with Jackson's real details before launch
  phone: '04XX XXX XXX',
  phoneHref: 'tel:0400000000',
  smsHref: 'sms:0400000000',
  email: 'hello@baycityblinds.com.au',
  abn: '00 000 000 000',
  founded: '2020',
  ratingValue: '5.0',
  reviewCount: '42',
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
