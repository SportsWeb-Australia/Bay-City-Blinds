// Service-area map data. Coordinates are hand-picked approximations tracing the
// land-based service corridor (not surveyed boundaries) — edit freely to refine
// the shape. Keep them out of Port Phillip Bay / Corio Bay water.

export type LatLng = { lat: number; lng: number };

// Greater Geelong, Surf Coast and Bellarine Peninsula — one connected land loop:
// Winchelsea (inland west) -> Mount Duneed/Armstrong Creek/Highton -> Geelong ->
// Lara (north) -> across the Bellarine spine (Drysdale/Portarlington) -> around
// the peninsula tip (St Leonards/Queenscliff/Point Lonsdale) -> Ocean Grove/
// Barwon Heads on the coast -> back along the coast through Torquay/Jan Juc to
// Anglesea, then inland to close the loop at Winchelsea.
export const geelongBellarineSurfCoastBoundary: LatLng[] = [
  { lat: -38.243, lng: 143.988 }, // Winchelsea (inland west)
  { lat: -38.25, lng: 144.30 },   // Mount Duneed
  { lat: -38.21, lng: 144.33 },   // Armstrong Creek
  { lat: -38.19, lng: 144.31 },   // Highton
  { lat: -38.155, lng: 144.315 }, // west Geelong edge
  { lat: -38.10, lng: 144.35 },   // north Geelong / Corio
  { lat: -38.028, lng: 144.428 }, // Lara
  { lat: -38.06, lng: 144.50 },   // inland north of Bellarine, avoiding Corio Bay
  { lat: -38.10, lng: 144.60 },   // toward Drysdale
  { lat: -38.114, lng: 144.649 }, // Portarlington
  { lat: -38.183, lng: 144.552 }, // Drysdale
  { lat: -38.245, lng: 144.565 }, // St Leonards / eastern Bellarine
  { lat: -38.267, lng: 144.658 }, // Queenscliff (Bellarine tip)
  { lat: -38.286, lng: 144.611 }, // Point Lonsdale (Bellarine tip)
  { lat: -38.268, lng: 144.52 },  // Ocean Grove
  { lat: -38.267, lng: 144.49 },  // Barwon Heads
  { lat: -38.30, lng: 144.40 },   // coast back toward Torquay
  { lat: -38.339, lng: 144.322 }, // Torquay
  { lat: -38.352, lng: 144.298 }, // Jan Juc
  { lat: -38.402, lng: 144.191 }, // Anglesea
];

// Western Melbourne corridor — Lara up to Footscray, then hugging the Port
// Phillip Bay coastline back down through Altona, Point Cook and Werribee South.
export const westernMelbourneBoundary: LatLng[] = [
  { lat: -38.028, lng: 144.428 }, // Lara (connects to the Geelong polygon)
  { lat: -37.96, lng: 144.55 },   // inland corridor point
  { lat: -37.90, lng: 144.663 },  // Werribee
  { lat: -37.833, lng: 144.687 }, // Tarneit
  { lat: -37.80, lng: 144.75 },   // north of Point Cook
  { lat: -37.867, lng: 144.895 }, // Williamstown
  { lat: -37.799, lng: 144.899 }, // Footscray (up to here)
  { lat: -37.815, lng: 144.885 }, // across to the coast
  { lat: -37.87, lng: 144.83 },   // Altona, down the coast
  { lat: -37.925, lng: 144.76 },  // Point Cook foreshore
  { lat: -37.97, lng: 144.70 },   // Werribee South
  { lat: -38.00, lng: 144.55 },   // south inland edge back to Lara
];

export const baseMarker = { lat: -38.1499, lng: 144.3617, label: 'Bay City Blinds — Geelong' };

export const hubMarkers: { position: LatLng; title: string; blurb: string }[] = [
  { position: { lat: -38.1499, lng: 144.3617 }, title: 'Geelong', blurb: 'Custom blinds, shutters and window furnishings across Geelong and all suburbs.' },
  { position: { lat: -38.243, lng: 143.988 }, title: 'Winchelsea', blurb: 'Custom blinds, shutters and window furnishings for Winchelsea and surrounds.' },
  // Surf Coast, coast-hugging south to north
  { position: { lat: -38.402, lng: 144.191 }, title: 'Anglesea', blurb: 'Custom blinds, shutters and window furnishings across Anglesea and the Surf Coast.' },
  { position: { lat: -38.352, lng: 144.298 }, title: 'Jan Juc', blurb: 'Custom blinds, shutters and window furnishings across Jan Juc and the Surf Coast.' },
  { position: { lat: -38.339, lng: 144.322 }, title: 'Torquay and Surf Coast', blurb: 'Custom blinds, shutters and window furnishings available across the Surf Coast.' },
  // Bellarine Peninsula, coastline all the way round the tip
  { position: { lat: -38.267, lng: 144.49 }, title: 'Barwon Heads', blurb: 'Custom blinds, shutters and window furnishings for Barwon Heads and surrounds.' },
  { position: { lat: -38.268, lng: 144.52 }, title: 'Ocean Grove and the Bellarine', blurb: 'Custom blinds, shutters and window furnishings across the Bellarine Peninsula.' },
  { position: { lat: -38.286, lng: 144.611 }, title: 'Point Lonsdale', blurb: 'Custom blinds, shutters and window furnishings for Point Lonsdale and surrounds.' },
  { position: { lat: -38.267, lng: 144.658 }, title: 'Queenscliff', blurb: 'Custom blinds, shutters and window furnishings for Queenscliff and the Bellarine tip.' },
  { position: { lat: -38.245, lng: 144.565 }, title: 'St Leonards', blurb: 'Custom blinds, shutters and window furnishings for St Leonards and the eastern Bellarine.' },
  { position: { lat: -38.183, lng: 144.552 }, title: 'Drysdale', blurb: 'Custom blinds, shutters and window furnishings for Drysdale and surrounds.' },
  { position: { lat: -38.114, lng: 144.649 }, title: 'Portarlington', blurb: 'Custom blinds, shutters and window furnishings for Portarlington and the Bellarine coast.' },
  { position: { lat: -38.028, lng: 144.428 }, title: 'Lara', blurb: 'Custom blinds, shutters and window furnishings for Lara and surrounds.' },
  // Melbourne's west, coast-hugging up to Footscray and back down Port Phillip Bay
  { position: { lat: -37.90, lng: 144.663 }, title: 'Werribee', blurb: 'Custom blinds, shutters and window furnishings for Werribee and Melbourne’s west.' },
  { position: { lat: -37.925, lng: 144.76 }, title: 'Point Cook', blurb: 'Custom blinds, shutters and window furnishings for Point Cook and surrounds.' },
  { position: { lat: -37.87, lng: 144.83 }, title: 'Altona', blurb: 'Custom blinds, shutters and window furnishings for Altona and surrounds.' },
  { position: { lat: -37.867, lng: 144.895 }, title: 'Williamstown', blurb: 'Custom blinds, shutters and window furnishings for Williamstown and surrounds.' },
  { position: { lat: -37.799, lng: 144.899 }, title: 'Footscray', blurb: 'Custom blinds, shutters and window furnishings for Footscray and the inner west.' },
];
