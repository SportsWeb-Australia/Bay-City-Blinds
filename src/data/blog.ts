// Tips & Advice articles. Keep genuinely useful and specific to Geelong —
// no invented stats or testimonials. Each article should link back to at
// least one real product page.

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  category: string;
  heroImage: string;
  excerpt: string;
  sections: { h: string; p: string[] }[];
};

export const articles: Article[] = [
  {
    slug: 'plantation-shutters-home-value-geelong',
    title: 'Plantation Shutters: Do They Really Add Home Value in Geelong?',
    description: 'Thinking of listing your Geelong home this spring? Here’s an honest look at why plantation shutters are one of the few window furnishings buyers and agents actually notice.',
    date: '2026-08-17',
    category: 'Buying Guide',
    heroImage: '/photos/photo-10.webp',
    excerpt: 'Spring listing season is coming up around Geelong. Of everything you could spend on before a sale, plantation shutters are one of the few window upgrades that genuinely gets noticed.',
    sections: [
      {
        h: 'Why shutters read differently to buyers than blinds or curtains',
        p: [
          'Most window furnishings are treated by buyers and agents as personal taste, something the new owner will probably replace anyway. Plantation shutters are different. Because they’re a permanent, built-in fixture rather than a soft furnishing, they get valued more like joinery than decor, closer to how buyers think about a good kitchen bench or built-in wardrobes.',
          'That’s not marketing spin, it’s simply how they’re installed: fitted directly to the window frame or reveal, not hung on a track that comes down with the old owner’s belongings.',
        ],
      },
      {
        h: 'What actually makes the difference at inspection',
        p: [
          'A run of matching <a href="/blinds/plantation-shutters">plantation shutters</a> through a living area or main bedroom presents as finished and considered, especially compared to a mismatched mix of old blinds and curtains room to room, which is one of the more common things we see in homes going to market around Geelong.',
          'Timber and PVC shutters also hold up visibly better than fabric options in listing photos and open-for-inspection walkthroughs, no sun-faded fabric, no bent slats, no dated pattern doing the home any favours.',
        ],
      },
      {
        h: 'Where it’s worth prioritising if you’re on a budget',
        p: [
          'If a full-house shutter upgrade isn’t realistic before listing, focus on the rooms buyers spend the most time in during an inspection: the main living area and the master bedroom. Kitchens and bathrooms matter less for this specific decision since <a href="/blinds/roller-blinds">roller blinds</a> are still the norm and expected there.',
        ],
      },
      {
        h: 'If you’re not selling, they’re still worth it',
        p: [
          'Even if a sale isn’t on the horizon, shutters are worth considering simply because they last. Solid timber or PVC construction handles daily use for decades with minimal maintenance, unlike fabric options that fade or wear, so the “adds value” case holds up whether you’re preparing to sell in six months or just want something you won’t be replacing again in five years.',
        ],
      },
    ],
  },
  {
    slug: 'spring-clean-window-furnishings-geelong',
    title: 'Spring Clean Checklist: Refreshing Your Blinds, Shutters & Curtains',
    description: 'A practical spring checklist for cleaning and assessing your Geelong home’s blinds, shutters and curtains, and knowing when it’s time to replace rather than clean.',
    date: '2026-08-24',
    category: 'Seasonal Guide',
    heroImage: '/photos/photo-46.webp',
    excerpt: 'Spring cleaning always seems to skip the windows themselves. Here’s a room-by-room way to work through blinds, shutters and curtains, and how to tell when it’s time to replace rather than clean.',
    sections: [
      {
        h: 'Start with a dust-down, not a deep clean',
        p: [
          'Before anything else, a simple vacuum with a brush attachment or a microfibre dust wand over every blind, shutter louvre and curtain hem removes most of what’s built up over winter, closed windows and heaters running both add more dust than people expect. Do this room by room rather than all at once, it’s a lot less to tackle in one go.',
        ],
      },
      {
        h: 'Roller and honeycomb blinds',
        p: [
          '<a href="/blinds/roller-blinds">Roller blinds</a> generally just need a wipe with a barely damp cloth, fully wet cleaning can warp the fabric or the roller tube. <a href="/blinds/honeycomb-blinds">Honeycomb blinds</a> are trickier since the pleated cells collect dust, a handheld vacuum on low suction with a brush head works better than wiping, which can crush the cells.',
        ],
      },
      {
        h: 'Venetians and plantation shutters',
        p: [
          '<a href="/blinds/venetian-blinds">Venetian blinds</a>, aluminium especially, are the easiest to clean properly. Close the slats, wipe one direction, then reverse and wipe the other. <a href="/blinds/plantation-shutters">Plantation shutters</a> take the same approach on each louvre, and it’s worth checking the tilt rod and hinges move freely while you’re there, a light silicone spray sorts most stiff hinges.',
        ],
      },
      {
        h: 'Curtains',
        p: [
          'Check the care label before anything else, some fabrics are dry-clean only. A lot of made-to-measure curtains can be taken down and gently machine washed on a delicate cycle, but check first, and always re-hang while still slightly damp to avoid the hem needing re-ironing.',
        ],
      },
      {
        h: 'When it’s time to replace rather than clean',
        p: [
          'Fabric that’s visibly sun-faded on one side, a roller mechanism that’s stopped tracking straight, or shutter louvres that won’t hold their angle any more, these are all signs a clean won’t fix. If you’re only going to properly address one or two rooms this spring, it’s usually the room that gets the most direct sun, that’s where fabric and mechanisms wear fastest.',
        ],
      },
    ],
  },
  {
    slug: 'winter-insulation-blinds-geelong',
    title: 'Winter Insulation: How the Right Blinds Cut Heat Loss in Geelong Homes',
    description: 'Still weeks of Geelong winter left. Here’s how honeycomb blinds, curtains and pelmet boxes genuinely help keep heat in and cold out, and where they make the biggest difference.',
    date: '2026-08-10',
    category: 'Seasonal Guide',
    heroImage: '/photos/honeycomb-blinds.webp',
    excerpt: 'With winter still biting across Geelong and the Bellarine, your windows are one of the biggest places a home loses heat. Here’s what actually helps, and what’s just marketing.',
    sections: [
      {
        h: 'Why windows matter more than people think',
        p: [
          'In a typical Geelong home, glass is one of the least insulated parts of the building envelope, especially in older weatherboard and brick-veneer homes around Newtown, Geelong West and the older parts of Highton. A single pane of glass does very little to slow heat moving from a warm room to the cold night air outside.',
          'That heat loss happens two ways: direct conduction through the glass itself, and draughts around a loose-fitting frame or an uncovered window entirely. The right window furnishings can genuinely help with both, but not all of them help equally.',
        ],
      },
      {
        h: 'Honeycomb blinds: the most effective everyday option',
        p: [
          '<a href="/blinds/honeycomb-blinds">Honeycomb (cellular) blinds</a> are built from pleated cells that trap a still layer of air against the glass. That trapped air is the actual insulation, similar in principle to double glazing, just far cheaper to retrofit. It’s the reason we point most Geelong clients who are asking specifically about winter comfort toward honeycomb over a standard roller blind.',
          'They work well in bedrooms and living areas with a lot of glass, and because they come in blockout, light-filter and translucent fabrics, you’re not choosing between insulation and how the room looks.',
        ],
      },
      {
        h: 'Curtains and pelmet boxes: the classic combination',
        p: [
          'A well-made curtain, especially a floor-length blockout curtain, adds a genuine layer of insulation on top of whatever is on the window itself. The gap this leaves at the top, where the curtain track sits, is usually where most of the benefit leaks straight back out.',
          'That’s what a <a href="/curtains/pelmet-boxes">pelmet box</a> is for. It boxes in the top of the curtain, stopping warm air rising and escaping over the header rail. It’s a small addition that makes a real difference, and it tidies up the look of the window at the same time.',
        ],
      },
      {
        h: 'What doesn’t help much',
        p: [
          'A bare aluminium <a href="/blinds/venetian-blinds">Venetian blind</a> or a lightweight sunscreen <a href="/blinds/roller-blinds">roller blind</a> fabric looks tidy but does very little for heat retention, they’re built for light and privacy control, not insulation. If winter comfort is the main goal for a particular room, we’ll usually steer you toward honeycomb or a curtain-and-pelmet combination instead.',
        ],
      },
      {
        h: 'A simple way to think about it room by room',
        p: [
          'Bedrooms and living areas where you want warmth and don’t need to see out at night: honeycomb blinds, or curtains with a pelmet box, are the strongest options.',
          'Kitchens and bathrooms: aluminium Venetians still make sense for moisture and practicality, insulation is a secondary concern in those rooms anyway.',
          'Living areas with large glass sliding doors: a heavier blockout curtain across the whole width, closed at night, makes a noticeable difference to how quickly a room cools once the heating goes off.',
        ],
      },
    ],
  },
];
