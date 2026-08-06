// Products, location pages, reviews and FAQs.
// Each location has UNIQUE copy — that's what makes suburb pages rank
// instead of reading as thin duplicates.

export type Product = { slug: string; name: string; blurb: string; long: string; gradient: string; category: 'indoor' | 'outdoor'; heroImage?: string; youtubeId?: string; features?: { h: string; p: string }[] };
export const products: Product[] = [
  { slug: 'roller-blinds', name: 'Roller Blinds', gradient: 'g1', category: 'indoor', heroImage: '/photos/photo-46.webp',
    blurb: 'Blockout, light-filter & sunscreen. The easy, clean-lined favourite.',
    long: 'Made-to-measure roller blinds in blockout, light-filter and sunscreen fabrics. The most popular, best-value choice for bedrooms, living areas and offices, with clean lines, simple operation and a huge range of colours.',
    features: [
      { h: 'Three fabric types, one clean look', p: 'Blockout for full privacy and dark rooms, light-filter for soft daytime glow, or sunscreen to see out while cutting glare and UV.' },
      { h: 'Best value, fastest turnaround', p: 'Simple mechanism and huge colour range make roller blinds the most budget-friendly made-to-measure option, without looking budget.' },
      { h: 'Suits almost any window', p: 'Low profile and compact when open, so they work in tight reveals, sliding doors and large glazing alike.' },
    ] },
  { slug: 'honeycomb-blinds', name: 'Honeycomb Blinds', gradient: 'g2', category: 'indoor',
    blurb: 'Cellular design that insulates as well as it looks. Great for energy efficiency.',
    long: 'Honeycomb (cellular) blinds trap air in their pleated cells for genuine insulation, keeping rooms cooler in summer and warmer in winter, on top of clean, modern looks. A smart pick for bedrooms, living areas and north-facing windows.',
    features: [
      { h: 'Real thermal insulation', p: 'The honeycomb cell structure traps a layer of air against the glass, cutting heat transfer more effectively than a flat blind.' },
      { h: 'Lower energy bills', p: 'Less heat gain in summer and less heat loss in winter means your heating and cooling doesn’t have to work as hard.' },
      { h: 'Soft, modern look', p: 'Clean pleated lines suit contemporary interiors and layer well with sheers or curtains if you want extra softness.' },
    ] },
  { slug: 'venetian-blinds', name: 'Venetian Blinds', gradient: 'g3', category: 'indoor', heroImage: '/photos/photo-venetian-real.webp',
    blurb: 'Timber & aluminium. Precise light control with a premium feel.',
    long: 'Timber and aluminium Venetian blinds give you precise light and privacy control with a premium finish. Timber suits living and dining rooms; aluminium is perfect for kitchens, bathrooms and wet areas.',
    features: [
      { h: 'Tilt control, not just up and down', p: 'Angle the slats to let light in while keeping privacy, something roller and panel blinds simply can’t do.' },
      { h: 'Timber or aluminium, by room', p: 'Timber for warmth in living and dining areas; moisture-resistant aluminium for kitchens, bathrooms and wet areas.' },
      { h: 'A premium, timeless finish', p: 'Venetians read as a step up from roller blinds and suit homes going for a classic or hotel-style look.' },
    ] },
  { slug: 'plantation-shutters', name: 'Plantation Shutters', gradient: 'g4', category: 'indoor', heroImage: '/photos/photo-10.webp',
    blurb: 'The premium, adds-value option. Timeless and built to last.',
    long: 'Plantation shutters are the premium window furnishing, timeless, durable and known to add value to your home. Available in timber and PVC, they handle light, privacy and insulation beautifully.',
    features: [
      { h: 'Adds real value to your home', p: 'Plantation shutters are widely recognised by buyers and agents as a premium, permanent fixture, not just a window covering.' },
      { h: 'Built to last', p: 'Solid timber or PVC construction handles daily use for decades with minimal maintenance, unlike fabric options that fade or wear.' },
      { h: 'Insulation and light control in one', p: 'Adjustable louvres manage light and airflow while adding a genuine layer of thermal insulation to the window.' },
    ] },
  { slug: 'curtains', name: 'Curtains', gradient: 'g5', category: 'indoor', heroImage: '/curtains-hero.webp',
    blurb: 'Sheers, blockout and layered looks, made to measure for any window.',
    long: 'Made-to-measure curtains and sheers, from soft, light-diffusing sheers to full blockout, or a layered look combining both. Perfect for bedrooms, lounges and creating a cosy, finished feel.' },
  { slug: 'outdoor-screens', name: 'Zipscreen', gradient: 'g6', category: 'outdoor', heroImage: '/photos/photo-53.webp',
    blurb: 'Extend the alfresco season with shade, privacy and weather protection.',
    long: 'Outdoor blinds and Zipscreens extend your alfresco season with shade, privacy and weather protection. Turn a patio or deck into a usable, comfortable room most of the year.',
    features: [
      { h: 'A room you can actually use', p: 'Shade and wind protection turn a patio or deck into space you use most of the year, not just the warmest months.' },
      { h: 'Zip-track means no flapping', p: 'The fabric locks into a side track, so it stays put in wind instead of billowing like an open-sided outdoor blind.' },
      { h: 'Privacy without losing the outlook', p: 'Screen fabrics cut down what neighbours or the street can see while still letting you see out.' },
    ] },
  { slug: 'roller-shutters', name: 'Roller Shutters', gradient: 'g1', category: 'outdoor', heroImage: '/photos/photo-63.webp',
    blurb: 'Security, insulation and light control for windows and doors.',
    long: 'Roller shutters add security, noise reduction and insulation to windows and doors, with the convenience of rolling fully out of sight when open. A durable, low-maintenance option for homes across Geelong.',
    features: [
      { h: 'A genuine security layer', p: 'Solid rolled construction makes windows and doors far harder to force compared to blinds or curtains alone.' },
      { h: 'Noise and heat control', p: 'Closed shutters cut outside noise and add real insulation, useful on busy roads or west-facing windows.' },
      { h: 'Out of sight when open', p: 'Rolls fully away into a compact housing, so it doesn’t change the look of the window when not in use.' },
    ] },
  { slug: 'traditional-awnings', name: 'Traditional Awnings', gradient: 'g4', category: 'outdoor',
    blurb: 'Classic fixed shade for windows, entries and outdoor areas.',
    long: 'Traditional fixed awnings give windows and entries reliable shade and weather protection year-round, with a classic look that suits heritage and modern homes alike.',
    features: [
      { h: 'Set-and-forget shade', p: 'A fixed awning protects the window or entry every day without needing to be opened or closed like a retractable option.' },
      { h: 'Classic street-facing look', p: 'Suits heritage-style homes especially well, adding character to a facade rather than just function.' },
      { h: 'Weather protection year-round', p: 'Keeps rain off entries and reduces direct sun on windows behind it, in every season, not just summer.' },
    ] },
  { slug: 'folding-arm-awnings', name: 'Folding Arm Awnings', gradient: 'g6', category: 'outdoor', youtubeId: 'jfVLsh113OY',
    blurb: 'Retractable shade that extends your outdoor living space on demand.',
    long: 'Folding arm awnings retract at the touch of a button, giving you shade over a patio or deck exactly when you want it and full sun the rest of the time. A great way to extend outdoor living.',
    features: [
      { h: 'Shade on demand', p: 'Extend it for shade over a deck or patio, then retract it fully when you want open sun, unlike a fixed awning.' },
      { h: 'Motorisation-friendly', p: 'Pairs naturally with a motor for one-touch or app control, so you’re not winding a manual arm out each time.' },
      { h: 'Protects outdoor furniture too', p: 'Shields furniture, decking and flooring from UV fading and rain when extended, extending their life as well as your comfort.' },
    ] },
];

// Curtain styles — sub-pages linked from the Curtains nav dropdown and shown
// as a grid on the main /blinds/curtains page.
export type CurtainStyle = { slug: string; name: string; blurb: string; long: string; gradient: string; heroImage?: string; features?: { h: string; p: string }[]; sideFeatures?: { h: string; p: string }[]; youtubeId?: string };
export const curtainStyles: CurtainStyle[] = [
  { slug: 'sheers', name: 'Sheers', gradient: 'g5', heroImage: '/photos/photo-3.webp', youtubeId: 'yYrW-xqhUl4',
    blurb: 'Soft, light-diffusing fabric that keeps rooms bright while softening the view in.',
    long: 'Sheer curtains let natural light flood in while softening the view in during the day, a gentle, airy layer that finishes a room without blocking it out. Popular on their own in living and dining areas, or layered behind a blockout curtain for the best of both.',
    sideFeatures: [
      { h: 'Softens without blocking', p: 'Diffuses harsh sun and cuts glare during the day while keeping the room bright, unlike a blockout curtain drawn shut.' },
      { h: 'Daytime privacy', p: 'Softens the view in from outside while you can still see out, ideal for street-facing windows.' },
      { h: 'Layers well', p: 'Pair with a blockout curtain on the same track for soft daytime light and full darkness at night.' },
    ] },
  { slug: 'blockouts', name: 'Blockouts', gradient: 'g1',
    blurb: 'Full light and heat block, indoors or outdoors, with a clean, tailored finish.',
    long: 'Blockout treatments come in two forms: indoor blockout curtains, and outdoor blockout blinds. Both are made to measure and finished with a U-channel side track, a neat, framed edge that blends into the window or door frame and closes off the light gaps a loose curtain edge always leaves. That makes them a genuine option for shift workers and young parents who need a room properly dark at any hour, day or night.',
    sideFeatures: [
      { h: 'A neat, framed finish', p: 'The U-channel side track blends into the window or door frame instead of sitting as a visible add-on.' },
      { h: 'No light gaps', p: 'Locks into the side channel, closing off the edge gaps that let light creep in around a loose curtain.' },
      { h: 'Built for shift workers & young families', p: 'Genuinely dark rooms at any hour, whether that’s daytime sleep after a night shift or an early bedtime.' },
    ],
    features: [
      { h: 'Indoor blockouts', p: 'Full light and heat block for bedrooms, nurseries and media rooms, with the U-channel keeping light from creeping in around the sides.' },
      { h: 'Outdoor blockouts', p: 'Better insulation, increased security and real noise reduction on top of light control, and because they sit outside the glass line, they free up internal room space that bulky indoor curtains can eat into.' },
    ] },
  { slug: 'light-filter', name: 'Light Filter', gradient: 'g2',
    blurb: 'The in-between option: softens harsh sun without full blockout.',
    long: 'Light-filter curtains sit between sheers and blockout, cutting glare and harsh direct sun while still letting soft, diffused light through. A versatile everyday choice for living areas that get strong afternoon or western sun.',
    sideFeatures: [
      { h: 'Cuts glare, keeps light', p: 'Softens harsh direct sun without shutting the room out, unlike a full blockout curtain.' },
      { h: 'Everyday living-area pick', p: 'The most-used option for lounges and living rooms that get strong afternoon or western sun.' },
      { h: 'Middle ground, real flexibility', p: 'Sits between sheers and blockout, so you get glare control most days without losing natural light.' },
    ] },
  { slug: 'pelmet-boxes', name: 'Pelmet Boxes', gradient: 'g4',
    blurb: 'Completes the look, traps heat, and hides the track and any blinds when they’re rolled up.',
    long: 'A pelmet box conceals the curtain track and heading above the window for a neat, tailored, hotel-style finish that completes the look of the room. It’s also genuinely energy efficient, trapping heat that would otherwise escape over the top of the curtain, and it hides any blind sitting behind it when rolled up. Made to measure in timber or fabric, with a scalloped or straight-cut edge to suit your style.',
    sideFeatures: [
      { h: 'Completes the look', p: 'Hides the curtain track and heading for a tailored, hotel-style finish instead of exposed hardware.' },
      { h: 'Traps heat', p: 'Stops warm air escaping out the top of the curtain, a genuine energy-efficiency upgrade, not just cosmetic.' },
      { h: 'Hides blinds when rolled up', p: 'Conceals a roller or Venetian blind sitting behind it when it’s fully raised, for a cleaner window top.' },
    ] },
];

// Security styles — sub-pages linked from the Security nav dropdown and
// shown as a grid on the main /security page.
export type SecurityStyle = { slug: string; name: string; blurb: string; long: string; gradient: string; heroImage?: string; sideFeatures?: { h: string; p: string }[] };
export const securityStyles: SecurityStyle[] = [
  { slug: 'security-doors', name: 'Security Doors', gradient: 'g1',
    blurb: 'Tough, made-to-measure doors that don’t compromise on style.',
    long: 'Made-to-measure security doors add a genuine layer of protection at your entry points without turning your front door into a cage. Choose from a range of grille and mesh styles to match your home’s look, front and back.',
    sideFeatures: [
      { h: 'A real deterrent at the door', p: 'Solid, made-to-measure construction at the entry points burglars actually target, front and back.' },
      { h: 'Doesn’t look like a cage', p: 'Grille and mesh styles chosen to suit your home, not bolted on as an obvious afterthought.' },
      { h: 'Stays useful every day', p: 'Ventilate and let light in with the door secured, not just a barrier you only close when you leave.' },
    ] },
  { slug: 'security-shutters', name: 'Security Shutters', gradient: 'g6',
    blurb: 'Roller shutters built for break-in resistance, noise and insulation.',
    long: 'Security-rated roller shutters combine everyday light and privacy control with real break-in resistance, plus the bonus of noise reduction and insulation. A smart upgrade for ground-floor windows and doors.',
    sideFeatures: [
      { h: 'Break-in resistance', p: 'Solid rolled construction makes ground-floor windows and doors far harder to force than blinds or curtains alone.' },
      { h: 'Noise and heat control', p: 'Closed shutters cut outside noise and add real insulation, on top of the security benefit.' },
      { h: 'Everyday light control too', p: 'Not just a lock-up measure, adjust them daily for light and privacy like a standard shutter.' },
    ] },
];

export type Location = { slug: string; name: string; region: string; intro: string; nearby: string };
export const locations: Location[] = [
  { slug: 'blinds-geelong', name: 'Geelong', region: 'Geelong & suburbs',
    intro: 'Bay City Blinds is proudly Geelong owned and run since 2020. Jackson brings the mobile showroom to homes right across Geelong and its suburbs, from Highton and Belmont to Newtown and beyond.',
    nearby: 'Highton, Belmont, Newtown, Grovedale, Waurn Ponds' },
  { slug: 'blinds-armstrong-creek', name: 'Armstrong Creek', region: 'Armstrong Creek',
    intro: 'New home in Armstrong Creek? Bay City Blinds is a favourite with the growing estates here. Jackson comes to you with samples so you can fit out the whole house without dragging the family to a showroom.',
    nearby: 'Charlemont, Mount Duneed, Warralily, Grovedale' },
  { slug: 'blinds-surf-coast', name: 'Surf Coast', region: 'Surf Coast',
    intro: 'From Torquay to Jan Juc, the Surf Coast light and coastal glare make the right blinds essential. Jackson visits Surf Coast homes with the full sample range and honest, fixed quotes.',
    nearby: 'Torquay, Jan Juc, Anglesea, Bells Beach' },
  { slug: 'blinds-bellarine', name: 'Bellarine Peninsula', region: 'Bellarine Peninsula',
    intro: 'Across the Bellarine, including Ocean Grove, Barwon Heads, Drysdale and beyond, Bay City Blinds brings the showroom to your door. Quality blinds and shutters measured and installed by a genuine local.',
    nearby: 'Ocean Grove, Barwon Heads, Drysdale, Portarlington, Leopold' },
  { slug: 'blinds-lara', name: 'Lara', region: 'Lara',
    intro: 'Lara homeowners love not having to travel for a measure and quote. Jackson comes to you, day, evening or weekend, with samples and clear pricing on the spot.',
    nearby: 'Lara, Corio, Norlane, Little River' },
  { slug: 'blinds-west-melbourne', name: 'West Melbourne', region: "Melbourne's West",
    intro: 'Bay City Blinds also covers Melbourne’s west, from Werribee through to Footscray. Jackson brings the mobile showroom to you, with the same made-to-measure range, honest fixed quotes and tidy install as every Geelong job.',
    nearby: 'Werribee, Tarneit, Point Cook, Williamstown, Footscray' },
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
  { q: 'Is there any pressure or obligation to go ahead?', a: 'None at all. Jackson or a member of his team visits your home across Geelong and surrounds, measures your windows, shows you samples and provides a clear written quote, with no pressure and no obligation. You decide if and when to go ahead, in your own time.' },
  { q: 'What areas do you service?', a: 'We cover Geelong and all its suburbs, Armstrong Creek, the Surf Coast, the Bellarine Peninsula, Lara, plus Werribee, Tarneit, Point Cook, Williamstown and Footscray in Melbourne\u2019s west. Not sure if you\u2019re in range? Just ask.' },
  { q: 'What types of blinds do you offer?', a: 'Roller blinds (blockout, light-filter, sunscreen), honeycomb blinds, timber and aluminium Venetians, plantation shutters, made-to-measure curtains and sheers, plus outdoor blinds and Zipscreens, roller shutters and awnings, all from trusted suppliers.' },
  { q: 'How long does it take to get my blinds?', a: 'Because everything is made to measure, lead times vary by product, Jackson will give you a realistic timeframe with your quote. Most jobs are measured within a day or two of enquiring.' },
  { q: 'Are you insured and do the blinds come with a warranty?', a: 'Yes. Bay City Blinds is fully insured, and our made-to-measure products are covered by manufacturer warranties. You\u2019ll get the details in writing with your quote.' },
  { q: 'Do I have to visit a showroom?', a: 'Nope, that\u2019s our whole point of difference. We\u2019re a mobile showroom, so Jackson brings the samples and expertise to your home at a time that suits you, including evenings and weekends.' },
];

export const gallery = [
  { prod: 'Plantation shutters', sub: 'Highton' },
  { prod: 'Outdoor roller shutters', sub: 'Ocean Grove' },
  { prod: 'Venetian blinds', sub: 'Newtown' },
  { prod: 'Outdoor screens', sub: 'Torquay' },
  { prod: 'Roller blinds', sub: 'Lara' },
  { prod: 'Outdoor screens', sub: 'Point Cook' },
  { prod: 'Sheer curtains', sub: 'Armstrong Creek' },
  { prod: 'Outdoor screens', sub: 'Bellarine' },
];
