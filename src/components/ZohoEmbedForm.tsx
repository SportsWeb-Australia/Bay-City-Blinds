import { useEffect, useRef } from 'react';

export type ZohoFormConfig = {
  divId: string;
  formSrc: string;
  height: string;
  ariaLabel: string;
  allowCamera?: boolean;
};

// Jackson's live Zoho forms, embedded exactly per Zoho's own snippet (iframe +
// postMessage resize listener). Ported from vanilla JS into a React effect so it
// mounts once per page load. Don't hand-edit a form's divId/formSrc without a fresh
// snippet from Zoho — they're tied together.
export const ZOHO_FULL_FORM: ZohoFormConfig = {
  divId: 'zf_div_fg65Ex1X3z9xYdHrVc-P9evlT4I63sV87ckOmvjQgRQ',
  formSrc: 'https://forms.zohopublic.com.au/sportsweb1/form/GetYourFreeQuote/formperma/fg65Ex1X3z9xYdHrVc-P9evlT4I63sV87ckOmvjQgRQ?zf_rszfm=1&zf_enablecamera=true',
  height: '1628px',
  ariaLabel: 'Book your free measure & quote',
  allowCamera: true,
};

export const ZOHO_QUICK_FORM: ZohoFormConfig = {
  divId: 'zf_div__weevNWsUZ8hh9XIhyYHihn8nyjR7gPsgXOu1mo1xZY',
  formSrc: 'https://forms.zohopublic.com.au/sportsweb1/form/Bookyourfreemeasurequote/formperma/_weevNWsUZ8hh9XIhyYHihn8nyjR7gPsgXOu1mo1xZY?zf_rszfm=1',
  height: '834px',
  ariaLabel: 'Book your free measure & quote',
};

export default function ZohoEmbedForm({ config }: { config: ZohoFormConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current || !containerRef.current) return;
    injected.current = true;

    let ifrmSrc = config.formSrc;
    try {
      const w = window as any;
      if (typeof w.ZFAdvLead !== 'undefined' && typeof w.zfutm_zfAdvLead !== 'undefined') {
        for (const p of w.ZFAdvLead.utmPNameArr) {
          const key = w.ZFAdvLead.isSameDomian && w.ZFAdvLead.utmcustPNameArr.indexOf(p) === -1 ? `zf_${p}` : p;
          const val = w.zfutm_zfAdvLead.zfautm_gC_enc(p);
          if (val) ifrmSrc += (ifrmSrc.includes('?') ? '&' : '?') + `${key}=${val}`;
        }
      }
      if (typeof w.ZFLead !== 'undefined' && typeof w.zfutm_zfLead !== 'undefined') {
        for (const p of w.ZFLead.utmPNameArr) {
          const val = w.zfutm_zfLead.zfutm_gC_enc(p);
          if (val) ifrmSrc += (ifrmSrc.includes('?') ? '&' : '?') + `${p}=${val}`;
        }
      }
      if (!/[?&]referrername=/.test(ifrmSrc)) {
        let rfr = window.location.href;
        try {
          rfr = window.self !== window.top ? window.top!.location.href : (/^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr) ? rfr : '');
        } catch { /* cross-origin top frame, ignore */ }
        if (rfr) {
          if (rfr.length > 1800) {
            const qi = rfr.indexOf('?');
            rfr = qi > -1 ? rfr.substring(0, qi) : rfr.substring(0, 1800);
            if (rfr.length > 1800) rfr = rfr.substring(0, 1800);
          }
          ifrmSrc += (ifrmSrc.includes('?') ? '&' : '?') + `referrername=${encodeURIComponent(rfr)}`;
        }
      }
    } catch { /* tracking is best-effort, never block the form */ }

    const iframe = document.createElement('iframe');
    iframe.src = ifrmSrc;
    iframe.style.border = 'none';
    iframe.style.height = config.height;
    iframe.style.width = '100%';
    iframe.style.transition = 'all 0.5s ease';
    iframe.setAttribute('aria-label', config.ariaLabel);
    if (config.allowCamera) iframe.setAttribute('allow', 'camera;');
    containerRef.current.appendChild(iframe);

    function onMessage(event: MessageEvent) {
      const evntData = event.data;
      if (!evntData || evntData.constructor !== String) return;
      const parts = evntData.split('|');
      if (parts.length !== 2 && parts.length !== 3) return;
      const perma = parts[0];
      const newHeight = `${parseInt(parts[1], 10) + 15}px`;
      const frame = containerRef.current?.querySelector('iframe');
      if (!frame || !frame.src.includes('formperma') || !frame.src.includes(perma)) return;
      const prevHeight = frame.style.height;
      if (parts.length === 3) {
        frame.scrollIntoView();
        if (prevHeight !== newHeight) setTimeout(() => { frame.style.height = newHeight; }, 500);
      } else if (prevHeight !== newHeight) {
        frame.style.height = newHeight;
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [config]);

  return <div id={config.divId} ref={containerRef} />;
}
