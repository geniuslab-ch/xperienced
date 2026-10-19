/**
 * Liens de suivi des campagnes (QR codes, affiches, réseaux, presse).
 *
 * Chaque affiche imprimée pointe vers une adresse courte : https://VOTRE-SITE/q/<code>
 * Le serveur enregistre la visite dans ses journaux (« qr_scan »), puis redirige
 * vers la bonne page en ajoutant les paramètres UTM. Ces paramètres sont ensuite
 * mémorisés et joints à toute inscription : on sait ainsi quelle affiche a
 * produit quelle inscription.
 *
 * Pour un nouvel emplacement (ex. le café du Marché à Morges), dupliquez une
 * ligne et changez le code, par exemple `cv-morges-cafe`. Un code = un lieu
 * = une mesure.
 */
export type Campaign = {
  code: string;
  /** Page de destination (chemin + ancre éventuelle). */
  target: string;
  utm_campaign: string;
  utm_medium: 'qr' | 'social' | 'email' | 'press' | 'event';
  utm_source: string;
  /** Description interne (non affichée sur le site public). */
  label: string;
};

export const campaigns: Campaign[] = [
  {
    code: 'cv',
    target: '/expire',
    utm_campaign: 'cv-expire',
    utm_medium: 'qr',
    utm_source: 'affiche',
    label: 'Campagne 1 · Le CV expiré (affiche principale)',
  },
  {
    code: 'candidat',
    target: '/#question',
    utm_campaign: 'candidat-invisible',
    utm_medium: 'qr',
    utm_source: 'affiche',
    label: 'Campagne 2 · Le candidat invisible',
  },
  {
    code: 'echange',
    target: '/#partager',
    utm_campaign: 'echange-experience',
    utm_medium: 'qr',
    utm_source: 'evenement',
    label: "Campagne 3 · L'échange d'expérience",
  },
  {
    code: 'moi',
    target: '/#inscription',
    utm_campaign: 'micro-affiche-personnes',
    utm_medium: 'qr',
    utm_source: 'affiche',
    label: 'Campagne 4a · Micro-affiche pour les personnes 50+',
  },
  {
    code: 'talents',
    target: '/#entreprises',
    utm_campaign: 'micro-affiche-employeurs',
    utm_medium: 'qr',
    utm_source: 'affiche',
    label: 'Campagne 4b · Micro-affiche pour les employeurs',
  },
  {
    code: 'asso',
    target: '/#associations',
    utm_campaign: 'micro-affiche-associations',
    utm_medium: 'qr',
    utm_source: 'affiche',
    label: 'Campagne 4c · Micro-affiche pour les associations',
  },
  {
    code: 'mur',
    target: '/#mur',
    utm_campaign: 'mur-experience',
    utm_medium: 'qr',
    utm_source: 'mur',
    label: "Campagne 5 · Le mur de l'expérience",
  },
];

export function findCampaign(code: string): Campaign | undefined {
  return campaigns.find((c) => c.code === code.toLowerCase());
}

export function campaignUrl(c: Campaign, base: URL | string): string {
  const [path, hash] = c.target.split('#');
  const url = new URL(path || '/', base);
  url.searchParams.set('utm_source', c.utm_source);
  url.searchParams.set('utm_medium', c.utm_medium);
  url.searchParams.set('utm_campaign', c.utm_campaign);
  if (hash) url.hash = hash;
  return url.toString();
}
