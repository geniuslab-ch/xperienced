/** Mesure d'audience et attribution des campagnes (sans cookie). */
type Props = Record<string, string>;
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    umami?: { track: (event: string, data?: Props) => void };
    dataLayer?: unknown[];
  }
}

/** Envoie un événement à l'outil de mesure configuré (s'il y en a un). */
export function track(event: string, props: Props = {}) {
  const attribution = getAttribution();
  const all = { ...props, ...(attribution.utm_campaign ? { campaign: attribution.utm_campaign } : {}) };
  try {
    window.plausible?.(event, { props: all });
    window.umami?.track(event, all);
    (window.dataLayer ||= []).push({ event, ...all });
  } catch {
    /* la mesure ne doit jamais casser le site */
  }
}

/* ---------- Attribution : d'où vient la personne (QR, partage, réseaux…) ---------- */
const ATTR_KEY = 'xp-attribution';
const ATTR_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'ref'] as const;

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}');
  } catch {
    return {};
  }
}

export function captureAttribution() {
  const params = new URLSearchParams(location.search);
  const found: Record<string, string> = {};
  for (const k of ATTR_FIELDS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 80);
  }
  if (Object.keys(found).length) {
    found.landing = location.pathname;
    try {
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(found));
    } catch {
      /* navigation privée : tant pis */
    }
  }
}

