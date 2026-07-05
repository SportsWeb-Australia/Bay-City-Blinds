// Products, location pages, reviews and FAQs.
// Each location has UNIQUE copy — that's what makes suburb pages rank
// instead of reading as thin duplicates.

export type Product = { slug: string; name: string; blurb: string; long: string; gradient: string };
export const products: Product[] = [
  { slug: 'roller-blinds', name: 'Roller Blinds', gradient: 'g1',
    blurb: 'Blockout, light-filter & sunscreen. The easy, clean-lined favourite.',
    long: 'Made-to-measure roller blinds in blockout, light-filter and sunscreen fabrics. The most popular, best-value choice for bedrooms, living areas and offices — clean lines, simple operation, and a huge range of colours.' },
  { slug: 'roman-blinds', name: 'Roman Blinds', gradient: 'g2',
    blurb: 'Soft, elegant folds that warm up living rooms and bedrooms.',
    long: 'Roman blinds add softness and warmth with their signature folds. A beautiful fit for living rooms, bedrooms and formal spaces where you want a more tailored, decorative look.' },
  { slug: 'venetian-blinds', name: 'Venetian Blinds', gradient: 'g3',
    blurb: 'Timber & aluminium. Precise light control with a premium feel.',
    long: 'Timber and aluminium Venetian blinds give you precise light and privacy control with a premium finish. Timber suits living and dining rooms; aluminium is perfect for kitchens, bathrooms and wet areas.' },
  { slug: 'plantation-shutters', name: 'Plantation Shutters', gradient: 'g4',
    blurb: 'The premium, adds-value option. Timeless and built to last.',
    long: 'Plantation shutters are the premium window furnishing — timeless, durable and known to add value to your home. Available in timber and PVC, they handle light, privacy and insulation beautifully.' },
  { slug: 'curtains', name: 'Curtains', gradient: 'g5',
    blurb: 'Sheers, blockout & layered looks — made to measure for any window.',
    long: 'Made-to-measure curtains and sheers — from soft, light-diffusing sheers to full blockout, or a layered look combining both. Perfect for bedrooms, lounges and creating a cosy, finished feel.' },
  { slug: 'outdoor-screens', name: 'Outdoor & Zip Screens', gradient: 'g6',
    blurb: 'Extend the alfresco season — shade, privacy & weather protection.',
    long: 'Outdoor and zip-track screens extend your alfresco season with shade, privacy and weather protection. Turn a patio or deck into a usable, comfortable room most of the year.' },
];

export type Location = { slug: string; name: string; region: string; intro: string; nearby: string };
export const locations: Location[] = [
  { slug: 'blinds-geelong', name: 'Geelong', region: 'Geelong & suburbs',
    intro: 'Bay City Blinds is proudly Geelong owned and run since 2020. Jackson brings the mobile showroom to homes right across Geelong and its suburbs — from Highton and Belmont to Newtown and beyond.',
    nearby: 'Highton, Belmont, Newtown, Grovedale, Waurn Ponds' },
  { slug: 'blinds-armstrong-creek', name: 'Armstrong Creek', region: 'Armstrong Creek',
    intro: 'New home in Armstrong Creek? Bay City Blinds is a favourite with the growing estates here. Jackson comes to you with samples so you can fit out the whole house without dragging the family to a showroom.',
    nearby: 'Charlemont, Mount Duneed, Warralily, Grovedale' },
  { slug: 'blinds-surf-coast', name: 'Surf Coast', region: 'Surf Coast',
    intro: 'From Torquay to Jan Juc, the Surf Coast light and coastal glare make the right blinds essential. Jackson visits Surf Coast homes with the full sample range and honest, fixed quotes.',
    nearby: 'Torquay, Jan Juc, Anglesea, Bells Beach' },
  { slug: 'blinds-bellarine', name: 'Bellarine Peninsula', region: 'Bellarine Peninsula',
    intro: 'Across the Bellarine — Ocean Grove, Barwon Heads, Drysdale and beyond — Bay City Blinds brings the showroom to your door. Quality blinds and shutters measured and installed by a genuine local.',
    nearby: 'Ocean Grove, Barwon Heads, Drysdale, Portarlington, Leopold' },
  { slug: 'blinds-lara', name: 'Lara', region: 'Lara',
    intro: 'Lara homeowners love not having to travel for a measure and quote. Jackson comes to you, day, evening or weekend, with samples and clear pricing on the spot.',
    nearby: 'Lara, Corio, Norlane, Little River' },
  { slug: 'blinds-werribee', name: 'Werribee', region: 'Werribee',
    intro: 'Bay City Blinds services Werribee and Melbourne\u2019s west with the same friendly, mobile approach. Made-to-measure blinds, shutters and curtains without the showroom trip.',
    nearby: 'Werribee, Hoppers Crossing, Wyndham Vale, Manor Lakes' },
  { slug: 'blinds-tarneit', name: 'Tarneit', region: 'Tarneit',
    intro: 'Fitting out a new build in Tarneit? Jackson brings the mobile showroom to you and quotes the whole home clearly, so you know exactly what you\u2019re getting before you commit.',
    nearby: 'Tarneit, Truganina, Hoppers Crossing, Wyndham Vale' },
  { slug: 'blinds-point-cook', name: 'Point Cook', region: 'Point Cook',
    intro: 'Point Cook families choose Bay City Blinds for convenient, in-home service. See real samples against your own walls and light, and get a fixed price with no pressure.',
    nearby: 'Point Cook, Williams Landing, Sanctuary Lakes, Altona Meadows' },
  { slug: 'blinds-williamstown', name: 'Williamstown', region: 'Williamstown',
    intro: 'From heritage homes to new apartments, Williamstown windows deserve the right treatment. Jackson visits with the full range and honest advice, room by room.',
    nearby: 'Williamstown, Newport, Spotswood, Altona' },
  { slug: 'blinds-footscray', name: 'Footscray', region: 'Footscray',
    intro: 'Bay City Blinds brings its mobile showroom to Footscray and the inner west. Local, friendly service with quality made-to-measure blinds, shutters and curtains.',
    nearby: 'Footscray, Seddon, Yarraville, West Footscray' },
];

export const reviews = [
  { stars: 5, quote: 'Jackson came out to Armstrong Creek, brought all the samples and made it so easy. Blinds look amazing and the quote was exactly what he said.', name: 'Sarah M.', suburb: 'Armstrong Creek', initials: 'SM' },
  { stars: 5, quote: 'Loved not having to drag the kids to a showroom. Friendly, on time, and the plantation shutters are gorgeous. Highly recommend to anyone in Geelong.', name: 'David T.', suburb: 'Highton', initials: 'DT' },
  { stars: 5, quote: 'Great local business. Honest pricing, quality blinds and a really tidy install. Will be using Bay City Blinds again for the rest of the house.', name: 'Kylie L.', suburb: 'Ocean Grove', initials: 'KL' },
];

export const faqs = [
  { q: 'How much does a free measure and quote cost?', a: 'It\u2019s completely free with no obligation. Jackson visits your home across Geelong and surrounds, measures your windows, shows you samples and provides a clear written quote \u2014 you\u2019re never locked in.' },
  { q: 'What areas do you service?', a: 'We cover Geelong and all its suburbs, Armstrong Creek, the Surf Coast, the Bellarine Peninsula, Lara, plus Werribee, Tarneit, Point Cook, Williamstown and Footscray in Melbourne\u2019s west. Not sure if you\u2019re in range? Just ask.' },
  { q: 'What types of blinds do you offer?', a: 'Roller blinds (blockout, light-filter, sunscreen), Roman blinds, timber and aluminium Venetians, plantation shutters, made-to-measure curtains and sheers, plus outdoor and zip-track screens \u2014 all from trusted suppliers.' },
  { q: 'How long does it take to get my blinds?', a: 'Because everything is made to measure, lead times vary by product \u2014 Jackson will give you a realistic timeframe with your quote. Most jobs are measured within a day or two of enquiring.' },
  { q: 'Are you insured and do the blinds come with a warranty?', a: 'Yes. Bay City Blinds is fully insured, and our made-to-measure products are covered by manufacturer warranties. You\u2019ll get the details in writing with your quote.' },
  { q: 'Do I have to visit a showroom?', a: 'Nope \u2014 that\u2019s our whole point of difference. We\u2019re a mobile showroom, so Jackson brings the samples and expertise to your home at a time that suits you, including evenings and weekends.' },
];

export const gallery = [
  { prod: 'Roller blinds', sub: 'Armstrong Creek' },
  { prod: 'Plantation shutters', sub: 'Ocean Grove' },
  { prod: 'Curtains', sub: 'Highton' },
  { prod: 'Venetian blinds', sub: 'Torquay' },
  { prod: 'Roman blinds', sub: 'Lara' },
  { prod: 'Outdoor screens', sub: 'Point Cook' },
];
