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
