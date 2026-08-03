// Service-area map data. Coordinates are hand-picked approximations tracing the
// land-based service corridor (not surveyed boundaries) — edit freely to refine
// the shape. Keep them out of Port Phillip Bay / Corio Bay water.
//
// Ordering matters: each array must trace the outer perimeter of its region in a
// single consistent direction (no jumping back and forth) or the polygon will
// self-intersect and render as a malformed, pinched shape.

export type LatLng = { lat: number; lng: number };

// Greater Geelong, Surf Coast and Bellarine Peninsula — one connected land loop,
// traced clockwise from Winchelsea: south through Mount Duneed/Armstrong Creek,
// east through Belmont/Whittington (so central + east Geelong, including
// Newtown/Manifold Heights/Herne Hill in the enclosed area, are actually inside
// the fill, not just Waurn Ponds), north to Corio, across to Lara, along the
// Bellarine's bay side out to the tip (Portarlington -> Indented Head ->
// St Leonards -> Queenscliff -> Point Lonsdale), back along the ocean side
// (Ocean Grove -> Barwon Heads -> Torquay -> Jan Juc -> Anglesea), closing back
// to Winchelsea.
export const geelongBellarineSurfCoastBoundary: LatLng[] = [
  { lat: -38.243, lng: 143.988 }, // Winchelsea (inland west)
  { lat: -38.265, lng: 144.31 },  // Mount Duneed
  { lat: -38.225, lng: 144.345 }, // Armstrong Creek
  { lat: -38.195, lng: 144.375 }, // Belmont / Marshall
  { lat: -38.16, lng: 144.385 },  // Whittington
  { lat: -38.10, lng: 144.37 },   // north-east Geelong, staying on land
  { lat: -38.085, lng: 144.35 },  // Corio
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
  { lat: -38.402, lng: 144.191 }, // Anglesea
];

// Western Melbourne — a simple, safely non-self-intersecting hexagon that
// contains Werribee, Tarneit, Point Cook, Altona, Williamstown and Footscray,
// connecting to the Geelong polygon at Lara.
export const westernMelbourneBoundary: LatLng[] = [
  { lat: -38.028, lng: 144.428 }, // Lara (connects to the Geelong polygon)
  { lat: -37.86, lng: 144.60 },   // inland corridor, north of Werribee/Tarneit
  { lat: -37.80, lng: 144.75 },   // Truganina / north of Point Cook
  { lat: -37.80, lng: 144.90 },   // Footscray (northernmost point)
  { lat: -37.867, lng: 144.90 },  // Williamstown (coast)
  { lat: -37.93, lng: 144.75 },   // Point Cook foreshore
  { lat: -37.98, lng: 144.68 },   // Werribee South
  { lat: -38.00, lng: 144.55 },   // south inland edge back to Lara
];

export const baseMarker = { lat: -38.1499, lng: 144.3617, label: 'Bay City Blinds — Geelong' };

export const hubMarkers: { position: LatLng; title: string; blurb: string }[] = [
  { position: { lat: -38.1499, lng: 144.3617 }, title: 'Geelong', blurb: 'Custom blinds, shutters and window furnishings across Geelong and all suburbs.' },
  { position: { lat: -38.243, lng: 143.988 }, title: 'Winchelsea', blurb: 'Custom blinds, shutters and window furnishings for Winchelsea and surrounds.' },
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
  { position: { lat: -37.90, lng: 144.663 }, title: 'Werribee', blurb: 'Custom blinds, shutters and window furnishings for Werribee and Melbourne’s west.' },
  { position: { lat: -37.93, lng: 144.75 }, title: 'Point Cook', blurb: 'Custom blinds, shutters and window furnishings for Point Cook and surrounds.' },
  { position: { lat: -37.868, lng: 144.83 }, title: 'Altona', blurb: 'Custom blinds, shutters and window furnishings for Altona and surrounds.' },
  { position: { lat: -37.867, lng: 144.90 }, title: 'Williamstown', blurb: 'Custom blinds, shutters and window furnishings for Williamstown and surrounds.' },
  { position: { lat: -37.80, lng: 144.90 }, title: 'Footscray', blurb: 'Custom blinds, shutters and window furnishings for Footscray and the inner west.' },
];
