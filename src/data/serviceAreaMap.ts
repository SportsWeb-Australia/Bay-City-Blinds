// Service-area map data. Coordinates are hand-picked approximations tracing the
// land-based service corridor (not surveyed boundaries) — edit freely to refine
// the shape. Keep them out of Port Phillip Bay / Corio Bay water.
//
// Ordering matters: each array must trace the outer perimeter of its region in a
// single consistent direction (no jumping back and forth) or the polygon will
// self-intersect and render as a malformed, pinched shape.

export type LatLng = { lat: number; lng: number };

// Greater Geelong, Surf Coast and Bellarine Peninsula — one wide outer ring,
// traced clockwise from Anglesea: north-west inland through Winchelsea,
// Inverleigh and Bannockburn, across to Lara, then along the Bellarine's bay
// side out to the tip (Portarlington -> Indented Head -> St Leonards ->
// Queenscliff -> Point Lonsdale), back along the ocean side (Ocean Grove ->
// Barwon Heads -> Torquay -> Jan Juc), closing back to Anglesea. Geelong
// itself (Highton, Belmont, Newtown, Corio etc.) sits inside this ring —
// deliberately a wide sweep instead of tracing every inner suburb, so it
// can't pinch/self-intersect the way a tightly-detailed edge can.
export const geelongBellarineSurfCoastBoundary: LatLng[] = [
  { lat: -38.402, lng: 144.191 }, // Anglesea
  { lat: -38.243, lng: 143.988 }, // Winchelsea
  { lat: -38.096, lng: 144.037 }, // Inverleigh
  { lat: -38.048, lng: 144.166 }, // Bannockburn
  { lat: -38.028, lng: 144.428 }, // Lara
  { lat: -38.05, lng: 144.50 },   // inland north of Bellarine, avoiding Corio Bay
  { lat: -38.169, lng: 144.556 }, // Drysdale
  { lat: -38.114, lng: 144.649 }, // Portarlington
  { lat: -38.155, lng: 144.703 }, // Indented Head
  { lat: -38.180, lng: 144.708 }, // St Leonards
  { lat: -38.268, lng: 144.657 }, // Queenscliff (Bellarine tip)
  { lat: -38.286, lng: 144.612 }, // Point Lonsdale (Bellarine tip)
  { lat: -38.268, lng: 144.52 },  // Ocean Grove
  { lat: -38.267, lng: 144.49 },  // Barwon Heads
  { lat: -38.30, lng: 144.40 },   // coast back toward Torquay
  { lat: -38.339, lng: 144.322 }, // Torquay
  { lat: -38.352, lng: 144.298 }, // Jan Juc
];

// Western Melbourne — Lara through Little River and Wyndham Vale to Werribee,
// Tarneit and Point Cook, stopping at Williamstown/Altona rather than pushing
// on to Footscray/inner Melbourne.
export const westernMelbourneBoundary: LatLng[] = [
  { lat: -38.028, lng: 144.428 }, // Lara (connects to the Geelong polygon)
  { lat: -37.946, lng: 144.535 }, // Little River
  { lat: -37.906, lng: 144.652 }, // Wyndham Vale
  { lat: -37.90, lng: 144.663 },  // Werribee
  { lat: -37.833, lng: 144.687 }, // Tarneit
  { lat: -37.80, lng: 144.75 },   // north of Point Cook
  { lat: -37.867, lng: 144.90 },  // Williamstown (northernmost point, coast)
  { lat: -37.93, lng: 144.75 },   // Point Cook foreshore
  { lat: -37.98, lng: 144.68 },   // Werribee South
  { lat: -38.00, lng: 144.55 },   // south inland edge back to Lara
];

export const baseMarker = { lat: -38.1499, lng: 144.3617, label: 'Bay City Blinds — Geelong' };

export const hubMarkers: { position: LatLng; title: string; blurb: string }[] = [
  { position: { lat: -38.1499, lng: 144.3617 }, title: 'Geelong', blurb: 'Custom blinds, shutters and window furnishings across Geelong and all suburbs.' },
  { position: { lat: -38.243, lng: 143.988 }, title: 'Winchelsea', blurb: 'Custom blinds, shutters and window furnishings for Winchelsea and surrounds.' },
  { position: { lat: -38.096, lng: 144.037 }, title: 'Inverleigh', blurb: 'Custom blinds, shutters and window furnishings for Inverleigh and surrounds.' },
  { position: { lat: -38.048, lng: 144.166 }, title: 'Bannockburn', blurb: 'Custom blinds, shutters and window furnishings for Bannockburn and surrounds.' },
  { position: { lat: -38.195, lng: 144.375 }, title: 'Belmont', blurb: 'Custom blinds, shutters and window furnishings for Belmont and surrounds.' },
  // Surf Coast, coast-hugging south to north
  { position: { lat: -38.402, lng: 144.191 }, title: 'Anglesea', blurb: 'Custom blinds, shutters and window furnishings across Anglesea and the Surf Coast.' },
  { position: { lat: -38.352, lng: 144.298 }, title: 'Jan Juc', blurb: 'Custom blinds, shutters and window furnishings across Jan Juc and the Surf Coast.' },
  { position: { lat: -38.339, lng: 144.322 }, title: 'Torquay and Surf Coast', blurb: 'Custom blinds, shutters and window furnishings available across the Surf Coast.' },
  { position: { lat: -38.31, lng: 144.38 }, title: 'Breamlea', blurb: 'Custom blinds, shutters and window furnishings for Breamlea and surrounds.' },
  // Bellarine Peninsula, coastline all the way round the tip
  { position: { lat: -38.267, lng: 144.49 }, title: 'Barwon Heads', blurb: 'Custom blinds, shutters and window furnishings for Barwon Heads and surrounds.' },
  { position: { lat: -38.268, lng: 144.52 }, title: 'Ocean Grove and the Bellarine', blurb: 'Custom blinds, shutters and window furnishings across the Bellarine Peninsula.' },
  { position: { lat: -38.286, lng: 144.612 }, title: 'Point Lonsdale', blurb: 'Custom blinds, shutters and window furnishings for Point Lonsdale and surrounds.' },
  { position: { lat: -38.268, lng: 144.657 }, title: 'Queenscliff', blurb: 'Custom blinds, shutters and window furnishings for Queenscliff and the Bellarine tip.' },
  { position: { lat: -38.220, lng: 144.68 }, title: 'Swan Bay', blurb: 'Custom blinds, shutters and window furnishings for Swan Bay and surrounds.' },
  { position: { lat: -38.180, lng: 144.708 }, title: 'St Leonards', blurb: 'Custom blinds, shutters and window furnishings for St Leonards and the eastern Bellarine.' },
  { position: { lat: -38.155, lng: 144.703 }, title: 'Indented Head', blurb: 'Custom blinds, shutters and window furnishings for Indented Head and surrounds.' },
  { position: { lat: -38.169, lng: 144.556 }, title: 'Drysdale', blurb: 'Custom blinds, shutters and window furnishings for Drysdale and surrounds.' },
  { position: { lat: -38.114, lng: 144.649 }, title: 'Portarlington', blurb: 'Custom blinds, shutters and window furnishings for Portarlington and the Bellarine coast.' },
  { position: { lat: -38.028, lng: 144.428 }, title: 'Lara', blurb: 'Custom blinds, shutters and window furnishings for Lara and surrounds.' },
  // Melbourne's west
  { position: { lat: -37.946, lng: 144.535 }, title: 'Little River', blurb: 'Custom blinds, shutters and window furnishings for Little River and surrounds.' },
  { position: { lat: -37.906, lng: 144.652 }, title: 'Wyndham Vale', blurb: 'Custom blinds, shutters and window furnishings for Wyndham Vale and surrounds.' },
  { position: { lat: -37.90, lng: 144.663 }, title: 'Werribee', blurb: 'Custom blinds, shutters and window furnishings for Werribee and Melbourne’s west.' },
  { position: { lat: -37.93, lng: 144.75 }, title: 'Point Cook', blurb: 'Custom blinds, shutters and window furnishings for Point Cook and surrounds.' },
  { position: { lat: -37.868, lng: 144.83 }, title: 'Altona', blurb: 'Custom blinds, shutters and window furnishings for Altona and surrounds.' },
  { position: { lat: -37.867, lng: 144.90 }, title: 'Williamstown', blurb: 'Custom blinds, shutters and window furnishings for Williamstown and surrounds.' },
];
