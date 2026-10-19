/**
 * Définition et validation des formulaires (utilisé côté serveur ; le
 * navigateur applique les mêmes règles via les attributs HTML).
 * On ne collecte que le strict nécessaire (principe de minimisation, nLPD).
 */

export type FormKind = 'individu' | 'opportunite' | 'soutien' | 'mur';
export const FORM_KINDS: FormKind[] = ['individu', 'opportunite', 'soutien', 'mur'];

export const CANTONS = [
  'Argovie', 'Appenzell Rhodes-Intérieures', 'Appenzell Rhodes-Extérieures', 'Berne',
  'Bâle-Campagne', 'Bâle-Ville', 'Fribourg', 'Genève', 'Glaris', 'Grisons', 'Jura',
  'Lucerne', 'Neuchâtel', 'Nidwald', 'Obwald', 'Saint-Gall', 'Schaffhouse', 'Soleure',
  'Schwytz', 'Thurgovie', 'Tessin', 'Uri', 'Vaud', 'Valais', 'Zoug', 'Zurich',
];
export const OTHER_LOCATIONS = ['Hors de Suisse', 'Je préfère ne pas le préciser'];

/** Ce que recherchent les personnes 50+. Les mandats d'abord ; emploi et bénévolat restent des options distinctes. */
export const MANDATS = {
  conseil: 'Mandat de conseil ou d’expertise',
  mission: 'Mission courte (renfort, remplacement, lancement)',
  administratif: 'Soutien administratif',
  mentorat: 'Mentorat, formation, transmission',
  projet: 'Projet (piloter ou contribuer)',
} as const;
export const AUTRES = {
  emploi: 'Un emploi salarié (fixe ou temps partiel)',
  benevolat: 'Du bénévolat (non rémunéré)',
} as const;
export const OBJECTIFS = { ...MANDATS, ...AUTRES } as const;

export const SITUATIONS = {
  independant: 'Déjà indépendant·e (affilié·e à une caisse AVS)',
  salarie: 'Salarié·e',
  'sans-emploi': 'Sans emploi / au chômage',
  retraite: 'À la retraite',
  autre: 'Autre / je préfère ne pas le préciser',
} as const;

export const DISPONIBILITES = {
  ponctuel: 'Ponctuellement',
  'heures-semaine': 'Quelques heures par semaine',
  'temps-partiel': 'Temps partiel',
  'plein-temps': 'Temps plein',
  'a-discuter': 'À discuter',
} as const;

export const TYPES_ORG = {
  entreprise: 'Entreprise',
  particulier: 'Particulier',
  association: 'Association ou organisation à but non lucratif',
  commune: 'Commune ou collectivité publique',
  institution: 'Institution sociale, fondation ou école',
  autre: 'Autre',
} as const;

export const TYPES_OPPORTUNITE = {
  conseil: 'Mandat : conseil ou expertise',
  mission: 'Mandat : mission courte',
  administratif: 'Mandat : soutien administratif',
  mentorat: 'Mandat : mentorat ou formation',
  projet: 'Mandat : projet',
  emploi: 'Emploi salarié (option distincte)',
  benevolat: 'Bénévolat (option distincte)',
  partenariat: 'Partenariat avec Xperienced',
} as const;

export const STATUTS = {
  honoraires: 'Rémunéré : honoraires (mandat indépendant)',
  salaire: 'Rémunéré : salaire (emploi)',
  'non-remunere': 'Non rémunéré (bénévolat)',
  'a-definir': 'À définir ensemble',
} as const;

export const FACONS_SOUTIEN = {
  benevole: 'Donner un coup de main à l’équipe Xperienced',
  ambassadeur: 'Relayer : afficher, partager, présenter Xperienced autour de moi',
  competences: 'Offrir une compétence (graphisme, juridique, communication, informatique…)',
  lieu: 'Accueillir une affiche ou un événement dans mon lieu',
  financement: 'Soutenir financièrement ou via une fondation',
  autre: 'Autre chose',
} as const;

export const SOURCES = {
  affiche: 'Une affiche ou un QR code',
  proche: 'Un proche, un ami, un collègue',
  reseaux: 'Les réseaux sociaux',
  presse: 'Un article ou un média',
  association: 'Une association ou une institution',
  evenement: 'Un événement',
  autre: 'Autre',
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s./-]{8,24}$/;

type Errors = Record<string, string>;
type Data = Record<string, string | string[] | boolean>;
export type Result =
  | { ok: true; kind: FormKind; data: Data; meta: Record<string, string> }
  | { ok: false; errors: Errors; spam?: boolean };

function str(fd: FormData, key: string, max = 200): string {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function list(fd: FormData, key: string, allowed: readonly string[]): string[] {
  return fd
    .getAll(key)
    .filter((v): v is string => typeof v === 'string')
    .filter((v) => allowed.includes(v));
}
function oneOf(value: string, allowed: readonly string[]): boolean {
  return allowed.includes(value);
}

const M = {
  required: 'Ce champ est nécessaire.',
  email: 'Cette adresse e-mail ne semble pas valide.',
  phone: 'Ce numéro ne semble pas valide (ex. 079 123 45 67).',
  choice: 'Veuillez choisir une option.',
  atLeastOne: 'Cochez au moins une possibilité.',
  consent: 'Votre accord est nécessaire pour que nous puissions traiter votre demande.',
};

export function validate(fd: FormData): Result {
  // Pièges anti-robots : champ caché rempli, ou formulaire envoyé en moins de 3 secondes.
  if (str(fd, 'website')) return { ok: false, errors: {}, spam: true };
  const ts = Number(str(fd, 'ts'));
  if (ts && Date.now() - ts < 3000) return { ok: false, errors: {}, spam: true };

  const kind = str(fd, 'kind') as FormKind;
  if (!FORM_KINDS.includes(kind)) return { ok: false, errors: { form: 'Formulaire inconnu.' } };

  const e: Errors = {};
  const d: Data = {};

  if (kind === 'individu') {
    d.prenom = str(fd, 'prenom', 60);
    if (!d.prenom) e.prenom = M.required;
    d.contact_pref = str(fd, 'contact_pref', 20);
    if (!oneOf(d.contact_pref, ['email', 'telephone'])) e.contact_pref = M.choice;
    d.email = str(fd, 'email', 120);
    d.telephone = str(fd, 'telephone', 30);
    if (d.contact_pref === 'email' && !d.email) e.email = M.required;
    if (d.contact_pref === 'telephone' && !d.telephone) e.telephone = M.required;
    if (d.email && !EMAIL_RE.test(d.email)) e.email = M.email;
    if (d.telephone && !PHONE_RE.test(d.telephone)) e.telephone = M.phone;
    d.region = str(fd, 'region', 60);
    if (!oneOf(d.region, [...CANTONS, ...OTHER_LOCATIONS])) e.region = M.choice;
    d.objectifs = list(fd, 'objectifs', Object.keys(OBJECTIFS));
    if (!d.objectifs.length) e.objectifs = M.atLeastOne;
    d.situation = str(fd, 'situation', 30);
    if (d.situation && !oneOf(d.situation, Object.keys(SITUATIONS))) d.situation = '';
    d.competences = str(fd, 'competences', 800);
    if (!d.competences) e.competences = M.required;
    d.disponibilite = str(fd, 'disponibilite', 30);
    if (d.disponibilite && !oneOf(d.disponibilite, Object.keys(DISPONIBILITES))) d.disponibilite = '';
  }

  if (kind === 'opportunite') {
    d.organisation = str(fd, 'organisation', 120);
    if (!d.organisation) e.organisation = M.required;
    d.type_org = str(fd, 'type_org', 30);
    if (!oneOf(d.type_org, Object.keys(TYPES_ORG))) e.type_org = M.choice;
    d.contact_nom = str(fd, 'contact_nom', 100);
    if (!d.contact_nom) e.contact_nom = M.required;
    d.email = str(fd, 'email', 120);
    if (!d.email) e.email = M.required;
    else if (!EMAIL_RE.test(d.email)) e.email = M.email;
    d.telephone = str(fd, 'telephone', 30);
    if (d.telephone && !PHONE_RE.test(d.telephone)) e.telephone = M.phone;
    d.type_opportunite = str(fd, 'type_opportunite', 30);
    if (!oneOf(d.type_opportunite, Object.keys(TYPES_OPPORTUNITE))) e.type_opportunite = M.choice;
    d.statut = str(fd, 'statut', 30);
    if (!oneOf(d.statut, Object.keys(STATUTS))) e.statut = M.choice;
    d.description = str(fd, 'description', 1500);
    if (!d.description) e.description = M.required;
    d.competences = str(fd, 'competences', 600);
    d.lieu = str(fd, 'lieu', 120);
    if (!d.lieu) e.lieu = M.required;
    d.distance = fd.get('distance') === 'oui';
    d.engagement = str(fd, 'engagement', 200);
    d.remuneration = str(fd, 'remuneration', 200);
    d.infos = str(fd, 'infos', 1000);
    d.cadre_ok = fd.get('cadre_ok') === 'oui';
    if (!d.cadre_ok) e.cadre_ok = 'Merci de confirmer avoir pris connaissance du cadre.';
  }

  if (kind === 'soutien') {
    d.nom = str(fd, 'nom', 100);
    if (!d.nom) e.nom = M.required;
    d.email = str(fd, 'email', 120);
    if (!d.email) e.email = M.required;
    else if (!EMAIL_RE.test(d.email)) e.email = M.email;
    d.facons = list(fd, 'facons', Object.keys(FACONS_SOUTIEN));
    if (!d.facons.length) e.facons = M.atLeastOne;
    d.message = str(fd, 'message', 1000);
  }

  if (kind === 'mur') {
    d.phrase = str(fd, 'phrase', 280);
    if (!d.phrase) e.phrase = M.required;
    d.signature = str(fd, 'signature', 80);
    d.email = str(fd, 'email', 120);
    if (d.email && !EMAIL_RE.test(d.email)) e.email = M.email;
    d.publication = fd.get('publication') === 'oui';
    if (!d.publication) e.publication = 'Sans votre accord, nous ne pouvons pas publier votre phrase.';
  }

  if (kind !== 'mur') {
    d.source = str(fd, 'source', 30);
    if (d.source && !oneOf(d.source, Object.keys(SOURCES))) d.source = '';
  }

  if (fd.get('consent') !== 'oui') e.consent = M.consent;
  d.consent = fd.get('consent') === 'oui';

  if (Object.keys(e).length) return { ok: false, errors: e };

  // Attribution (campagne, QR code, recommandation) — aucune donnée personnelle.
  const meta: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'ref', 'landing']) {
    const v = str(fd, k, 80).replace(/[^\w\-./#:]/g, '');
    if (v) meta[k] = v;
  }
  return { ok: true, kind, data: d, meta };
}

export const KIND_LABELS: Record<FormKind, string> = {
  individu: 'Inscription personne 50+ (cherche un mandat)',
  opportunite: 'Proposition de mandat (mandant)',
  soutien: 'Proposition de soutien',
  mur: 'Contribution au mur de l’expérience',
};
