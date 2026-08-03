import { useEffect, useRef, useState } from 'react';
import { geelongBellarineSurfCoastBoundary, westernMelbourneBoundary, baseMarker, hubMarkers } from '../data/serviceAreaMap';

// Loads the Google Maps JS API once (even if this component mounts more than once)
// and reuses the same script/promise across calls.
let mapsLoader: Promise<void> | null = null;
function loadGoogleMaps(apiKey: string): Promise<void> {
  if ((window as any).google?.maps) return Promise.resolve();
  if (mapsLoader) return mapsLoader;
  mapsLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });
  return mapsLoader;
}

const TEAL_DEEP = '#0B6C7E';
const TEAL = '#25C9DD';

export default function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('[ServiceAreaMap] PUBLIC_GOOGLE_MAPS_API_KEY is not set — showing fallback.');
      setStatus('error');
      return;
    }
    if (!containerRef.current) return;

    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        const g = (window as any).google;
        const map = new g.maps.Map(containerRef.current, {
          center: baseMarker,
          zoom: 9,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'greedy',
        });

        const bounds = new g.maps.LatLngBounds();
        const addPolygon = (path: { lat: number; lng: number }[]) => {
          new g.maps.Polygon({
            paths: path,
            strokeColor: TEAL_DEEP,
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: TEAL,
            fillOpacity: 0.18,
            map,
          });
          path.forEach((p) => bounds.extend(p));
        };
        addPolygon(geelongBellarineSurfCoastBoundary);
        addPolygon(westernMelbourneBoundary);

        new g.maps.Marker({
          position: baseMarker,
          map,
          title: baseMarker.label,
          icon: {
            path: g.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: TEAL_DEEP,
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        });

        const infoWindow = new g.maps.InfoWindow();
        hubMarkers.forEach((hub) => {
          const marker = new g.maps.Marker({
            position: hub.position,
            map,
            title: hub.title,
            icon: {
              path: g.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: TEAL,
              fillOpacity: 1,
              strokeColor: TEAL_DEEP,
              strokeWeight: 1.5,
            },
          });
          marker.addListener('click', () => {
            infoWindow.setContent(`<div style="font-family:Inter,sans-serif;max-width:220px"><b>${hub.title}</b><p style="margin:.3rem 0 0;font-size:.85rem;color:#456">${hub.blurb}</p></div>`);
            infoWindow.open({ map, anchor: marker });
          });
        });

        map.fitBounds(bounds);
        // fitBounds can over-zoom on narrow (mobile) viewports; nudge back out a touch.
        g.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const isMobile = window.innerWidth < 640;
          if (isMobile) map.setZoom(Math.max(map.getZoom() - 1, 7));
        });

        setStatus('ready');
      })
      .catch((err) => {
        console.error('[ServiceAreaMap]', err);
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  if (status === 'error') {
    return (
      <div className="map-fallback" role="img" aria-label="Bay City Blinds service area covering Geelong, the Bellarine Peninsula, Surf Coast and Melbourne's western suburbs">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={TEAL_DEEP} strokeWidth="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="10" r="3" /></svg>
        <p><b>Geelong · Bellarine · Surf Coast · Melbourne's west</b></p>
        <p className="small">The interactive map couldn't load — Jackson still services your area. Get in touch to confirm.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: 380 }}
      aria-label="Bay City Blinds service area covering Geelong, the Bellarine Peninsula, Surf Coast and Melbourne's western suburbs"
    >
      {status === 'loading' && <div className="map-loading">Loading map…</div>}
    </div>
  );
}
