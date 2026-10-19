/**
 * Informations sur l'association.
 *
 * ⚠️ Tout ce qui vaut `null` est encore inconnu : le site affiche alors un
 * texte « [À compléter] » bien visible plutôt que d'inventer une information.
 * Remplacez `null` par la vraie valeur entre guillemets, par exemple :
 *   contactEmail: 'bonjour@xperienced.ch',
 */
export const site = {
  name: 'Xperienced',

  /** Nom juridique exact (ex. « Association Xperienced »), tel qu'inscrit dans les statuts. */
  legalName: 'Xperienced' as string | null,

  /** Adresse postale du siège (rue, NPA, localité). */
  address: 'Genève (GE), Suisse' as string | null,

  /** Adresse e-mail de contact publique. */
  contactEmail: null as string | null,

  /** Personne responsable du traitement des données (nom ou fonction), pour la politique de confidentialité. */
  privacyContact: 'N. Schärer' as string | null,

  /**
   * Région(s) où Xperienced est réellement active. Ne mentionnez que des
   * régions où vous pouvez effectivement accompagner des personnes.
   */
  activeRegion: null as string | null,

  /**
   * Région du projet Supabase où sont enregistrés les formulaires, telle qu'indiquée dans
   * Supabase › Project Settings › General (ex. 'Zurich, Suisse' ou 'Francfort, Allemagne').
   * Tant que la valeur est `null`, la politique de confidentialité affiche « [À confirmer] »
   * et le bas de page n'annonce pas « Données stockées en Suisse ».
   */
  supabaseRegion: null as string | null,

  /** Informations de don (IBAN, TWINT…). Laisser `null` tant qu'aucun compte n'existe : la mention n'apparaît alors pas. */
  donation: null as string | null,

  /**
   * Réseaux sociaux : ne renseigner que les comptes existants. Tant qu'aucun n'est
   * renseigné, la rubrique n'apparaît pas dans le bas de page.
   */
  social: {
    instagram: null as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
  },

  /** Langues prévues. `ready: false` = affichée comme « bientôt », sans lien. */
  languages: <{ code: string; label: string; name: string; ready: boolean }[]>[
    { code: 'fr', label: 'FR', name: 'Français', ready: true },
    { code: 'de', label: 'DE', name: 'Deutsch', ready: false },
    { code: 'it', label: 'IT', name: 'Italiano', ready: false },
  ],
} as const;

export const TODO = '[À compléter]';

/** Renvoie la valeur ou le marqueur « [À compléter] ». */
export function orTodo(value: string | null | undefined, label?: string): string {
  return value ?? (label ? `[À compléter : ${label}]` : TODO);
}
