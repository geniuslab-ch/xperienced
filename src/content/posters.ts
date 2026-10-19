import { typo } from './fr';

/**
 * Affiches de la campagne (page imprimable /affiches).
 * `code` renvoie au lien de suivi défini dans src/config/campaigns.ts.
 * `fiction: true` ajoute la mention « Situation fictive » sur l'affiche.
 */
export type Poster = {
  code: string;
  audience: string;
  theme: 'ink' | 'accent' | 'ivory' | 'lime';
  headline: string;
  sub: string;
  qr: string;
  fiction?: boolean;
  stamp?: boolean;
};

export const posters: Poster[] = typo([
  {
    code: 'cv',
    audience: 'Grand public et personnes 50+',
    theme: 'ivory',
    headline: 'EXPIRÉ ? Selon qui ?',
    sub: 'Votre expérience n’a pas de date de péremption.',
    qr: 'Découvrez ce qui reste possible.',
    stamp: true,
  },
  {
    code: 'candidat',
    audience: 'Grand public et employeurs',
    theme: 'ink',
    headline: '25 ans d’expérience. 0 réponse.',
    sub: 'Et si le problème n’était pas son CV ?',
    qr: 'Changeons la suite.',
    fiction: true,
  },
  {
    code: 'talents',
    audience: 'Mandants : entreprises, associations, particuliers',
    theme: 'accent',
    headline: 'Un besoin ponctuel ? Quelqu’un l’a déjà résolu cent fois.',
    sub: 'Confiez un mandat à une personne de 50 ans et plus. Sans engagement.',
    qr: 'Je propose un mandat.',
  },
  {
    code: 'moi',
    audience: 'Personnes 50+',
    theme: 'lime',
    headline: 'Vous avez encore beaucoup à apporter.',
    sub: 'Conseil, missions, mentorat : proposez votre expérience en mandat.',
    qr: 'Je cherche un mandat.',
  },
  {
    code: 'asso',
    audience: 'Associations, communes, projets locaux',
    theme: 'ivory',
    headline: 'Votre projet cherche des forces vives ?',
    sub: 'Des personnes expérimentées prêtes à s’engager près de chez vous, en mandat ou en bénévolat.',
    qr: 'Proposer une activité.',
  },
  {
    code: 'echange',
    audience: 'Événement « Échange d’expérience »',
    theme: 'ink',
    headline: 'J’ai 30 ans d’expérience. Que voulez-vous apprendre ?',
    sub: 'Négocier, réparer, gérer, cuisiner, rebondir : posez votre question, repartez avec une réponse.',
    qr: 'Partager mon savoir-faire.',
  },
  {
    code: 'mur',
    audience: 'Mur de l’expérience (lieux partenaires, événements)',
    theme: 'accent',
    headline: 'Qu’est-ce que vos années d’expérience vous ont appris ?',
    sub: 'Une phrase. La vôtre. Elle pourrait aider quelqu’un.',
    qr: 'Écrire ma phrase.',
  },
]);
