/**
 * TEXTES DU SITE — FRANÇAIS (Suisse romande)
 *
 * Pour modifier un texte : changez uniquement ce qui se trouve entre les
 * guillemets ou les apostrophes typographiques. Gardez la ponctuation autour.
 * Les mots entre *astérisques* s'affichent en italique accentué (style « manuscrit »).
 *
 * Règle d'or : ne rien écrire qui ne soit pas vrai aujourd'hui
 * (pas de faux chiffres, pas de faux partenaires, pas de promesse d'emploi).
 */
const content = {
  meta: {
    title: 'Xperienced · Emploi, missions et activités après 50 ans en Suisse romande',
    description:
      'L’expérience n’a pas de date de péremption. Xperienced, initiative associative suisse, aide les personnes de 50 ans et plus à trouver un emploi, une mission, du bénévolat ou une activité qui a du sens, et à créer du lien.',
    ogImageAlt: 'Un CV tamponné « EXPIRÉ », le tampon barré. Texte : L’expérience n’a pas de date de péremption.',
  },

  nav: [
    { href: '#question', label: 'Pourquoi' },
    { href: '#comment', label: 'Comment ça marche' },
    { href: '#entreprises', label: 'Entreprises' },
    { href: '#associations', label: 'Associations' },
    { href: '#faq', label: 'FAQ' },
  ],
  navCta: 'Je m’inscris',

  hero: {
    eyebrow: 'Une initiative associative suisse',
    titleBefore: 'L’expérience n’a pas de date de',
    titleAccent: 'péremption',
    lead:
      'Un emploi, une mission, un projet ou une nouvelle activité : Xperienced aide les personnes de 50 ans et plus à trouver de nouvelles façons de partager leurs compétences, de rester actives et de créer du lien.',
    primary: 'Trouver ma prochaine opportunité',
    secondary: 'Je cherche des talents expérimentés',
    micro: 'Un premier pas suffit. Parlons de ce qui vous correspond.',
    cardLabel: 'Profil fictif, à titre d’illustration',
  },

  ticker: [
    'Vous n’êtes pas dépassé·e. Vous êtes expérimenté·e.',
    'La Suisse a encore besoin de vous.',
    'Votre CV a de l’histoire. Et encore de l’avenir.',
    'L’expérience ne prend pas sa retraite.',
    '50 ans et plus. Des compétences, des envies, des choses à transmettre.',
  ],

  question: {
    kicker: 'La question qui dérange',
    title: 'Depuis quand l’expérience est-elle devenue un *défaut* ?',
    leftLabel: 'Ce que raconte le parcours',
    left: [
      '31 ans de métier',
      '3 crises traversées sans fermer boutique',
      '40 apprenti·e·s formé·e·s',
      '4 langues, dont le patois du fournisseur',
      'Sait calmer un client furieux en 5 minutes',
    ],
    rightLabel: 'Ce que l’on retient parfois',
    right: 'Né en 1968.',
    note: 'Parcours fictif, imaginé pour illustrer.',
    body: [
      'Beaucoup de personnes de plus de 50 ans ont des compétences solides, des réseaux, du recul et une vraie envie de contribuer. Pourtant, trouver l’opportunité qui leur correspond reste souvent difficile : un CV écarté trop vite, un projet qui ne trouve pas sa porte d’entrée, une retraite qui arrive avant l’envie de s’arrêter.',
      'Le problème n’est pas l’âge. C’est que l’expérience ne trouve pas toujours le chemin vers celles et ceux qui en ont besoin.',
    ],
    closing: 'Xperienced veut créer des ponts entre celles et ceux qui ont de l’expérience et ceux qui peuvent en bénéficier.',
    cta: 'Faire partie du mouvement',
  },

  paths: {
    kicker: 'Trois façons d’y aller',
    title: 'Et vous, quelle est la *suite* ?',
    cards: [
      {
        id: 'emploi',
        number: '01',
        title: 'Trouver un emploi ou une mission',
        text: 'Travail à temps partiel, missions ponctuelles, conseil, mentorat rémunéré : pour celles et ceux qui veulent (re)travailler à leur façon.',
        tags: ['Temps partiel', 'Missions', 'Conseil', 'Reconversion'],
        cta: 'Je cherche du travail',
        objectifs: ['emploi', 'mission'],
      },
      {
        id: 'activite',
        number: '02',
        title: 'Retrouver une activité qui a du sens',
        text: 'Bénévolat, projets de quartier, associations locales, activités créatives : pour rester actif·ve, rencontrer du monde et se sentir utile.',
        tags: ['Bénévolat', 'Projets locaux', 'Rencontres', 'Culture'],
        cta: 'Je cherche une activité',
        objectifs: ['benevolat', 'activites'],
      },
      {
        id: 'partager',
        number: '03',
        title: 'Partager mon expérience',
        text: 'Mentorer un·e jeune, transmettre un savoir-faire, aider une PME ou une association : votre expérience peut changer la trajectoire de quelqu’un.',
        tags: ['Mentorat', 'Transmission', 'Intergénérationnel'],
        cta: 'Partager mes compétences',
        objectifs: ['mentorat'],
      },
    ],
  },

  how: {
    kicker: 'Comment ça marche',
    title: 'Simple, humain, *sans* paperasse.',
    steps: [
      {
        title: 'Vous nous parlez de vous.',
        text: 'Votre expérience, vos envies, ce que vous aimeriez faire ensuite. Pas besoin de CV pour commencer : quelques lignes suffisent.',
      },
      {
        title: 'Nous explorons les possibilités.',
        text: 'Nous regardons ce qui pourrait vous correspondre parmi les opportunités, les contacts et les partenaires que nous réunissons progressivement.',
      },
      {
        title: 'Nous créons de nouvelles connexions.',
        text: 'Lorsqu’une piste pertinente existe, nous vous mettons en relation avec l’organisation ou la personne concernée.',
      },
    ],
    honesty:
      'Soyons clairs : Xperienced est une jeune initiative qui construit son réseau pas à pas. S’inscrire ne garantit ni un emploi ni une activité, mais c’est le moyen d’être là quand une opportunité qui vous ressemble apparaît.',
  },

  employers: {
    kicker: 'Pour les entreprises',
    title: 'Vous cherchez des compétences ? Ne passez pas à côté de l’*expérience*.',
    lead:
      'Une personne expérimentée, c’est souvent quelqu’un qui a déjà vu le problème que vous découvrez. Et qui sait aussi le transmettre.',
    benefits: [
      { title: 'Opérationnel·le rapidement', text: 'Des réflexes métier déjà acquis, moins de temps de formation.' },
      { title: 'Transmission des savoirs', text: 'Les savoir-faire restent dans l’entreprise au lieu de partir avec les départs.' },
      { title: 'Mentorat et intégration', text: 'Un appui précieux pour accompagner les apprenti·e·s et les nouvelles recrues.' },
      { title: 'Expertise flexible', text: 'Temps partiel, mission ou mandat : selon vos besoins et ceux de la personne.' },
      { title: 'Équipes plus riches', text: 'Des regards différents, une collaboration entre générations.' },
    ],
    exampleTitle: 'Exemples de besoins',
    examples: [
      'Un renfort de trois mois pour un pic d’activité',
      'Quelqu’un pour structurer la comptabilité d’une petite structure',
      'Un·e mentor pour vos apprenti·e·s',
      'Une personne de confiance pour l’accueil, deux jours par semaine',
    ],
    cta: 'Proposer une opportunité',
    formTitle: 'J’ai besoin de talents expérimentés',
    formLead: 'Décrivez votre besoin en quelques lignes. Nous revenons vers vous pour en parler, sans engagement.',
  },

  associations: {
    kicker: 'Pour les associations et partenaires locaux',
    title: 'Vous avez une activité à partager. Nous avons peut-être les *personnes* qu’il vous faut.',
    lead:
      'Associations, communes, institutions, entreprises locales : proposez une activité, une mission ou un projet. Pas de dossier interminable : un formulaire court, puis une discussion.',
    items: ['Activités', 'Bénévolat', 'Mentorat', 'Échange de savoir-faire', 'Projets communautaires', 'Offres d’emploi'],
    cta: 'Devenir partenaire',
    support: 'Fondation, commune, entreprise ou particulier : vous voulez soutenir le projet ?',
    supportCta: 'Soutenir Xperienced',
  },

  wall: {
    kicker: 'Le mur de l’expérience',
    title: 'Une expérience. Des possibilités. Une suite à *écrire*.',
    lead:
      'Ici viendront les histoires de personnes qui ont trouvé une mission, un emploi, un projet ou une nouvelle bande de copains. Elles n’existent pas encore : nous ne les inventerons pas. En attendant, nous commençons par une question.',
    question: 'Qu’est-ce que vos années d’expérience vous ont appris ?',
    examplesLabel: 'Exemples pour vous inspirer (rédigés par l’équipe, pas des témoignages)',
    examples: [
      'Écouter jusqu’au bout avant de répondre.',
      'Un problème bien posé est à moitié résolu.',
      'Un client qui se plaint est un client qui tient encore à vous.',
    ],
    scenarioLabel: 'Scénario illustratif · personnage fictif',
    scenario: {
      name: 'Imaginons Marc, 57 ans',
      text: 'Ancien chef d’atelier, Marc pense que sa vie professionnelle est derrière lui. Il s’inscrit, parle de son savoir-faire en mécanique et de son envie de transmettre. Quelques semaines plus tard, un atelier de réparation associatif cherche quelqu’un pour animer des après-midi « on répare ensemble ». Ce n’est pas un poste à plein temps. C’est une porte qui s’ouvre.',
      note: 'Ce récit est imaginé pour montrer le type de connexion que nous voulons créer. Les vraies histoires viendront, avec l’accord des personnes concernées.',
    },
    formTitle: 'Votre phrase sur le mur',
    formLead: 'Une phrase suffit. Nous la publierons seulement avec votre accord explicite, après relecture.',
  },

  join: {
    kicker: 'Rejoindre le mouvement',
    title: 'Et si la prochaine opportunité commençait *avec vous* ?',
    pathways: [
      { label: 'Je cherche une opportunité', href: '#inscription', form: 'individu' },
      { label: 'Je propose une opportunité', href: '#proposer', form: 'opportunite' },
      { label: 'Je veux aider ou soutenir l’initiative', href: '#soutenir', form: 'soutien' },
      { label: 'Je veux devenir partenaire', href: '#proposer', form: 'opportunite', preset: 'partenariat' },
    ],
    referralTitle: 'Vous connaissez quelqu’un qui a encore beaucoup à apporter ?',
    referralText: 'Transmettez-lui Xperienced. Une simple mise en relation peut ouvrir une nouvelle porte.',
    shareCta: 'Partager Xperienced',
    shareText: 'L’expérience n’a pas de date de péremption. Je pense que Xperienced pourrait t’intéresser :',
    copied: 'Lien copié. Il ne reste plus qu’à le coller dans un message.',
  },

  faq: {
    kicker: 'Questions fréquentes',
    title: 'Vos questions, nos réponses *honnêtes*.',
    items: [
      {
        q: 'À qui s’adresse Xperienced ?',
        a: 'Aux personnes de 50 ans et plus qui cherchent un emploi, une mission, une reconversion, une activité bénévole ou simplement l’occasion de rester actives et de rencontrer du monde. Et aussi aux entreprises, associations, communes et institutions qui ont besoin de leur expérience.',
      },
      {
        q: 'Quels types d’opportunités puis-je trouver ?',
        a: 'Nous travaillons sur trois familles : le travail rémunéré (temps partiel, missions, conseil, mentorat), les activités qui ont du sens (bénévolat, projets locaux, associations) et le lien social (rencontres, partage de savoir-faire). Le réseau est en construction : les opportunités concrètes dépendent des partenaires qui nous rejoignent.',
      },
      {
        q: 'Est-ce uniquement pour retrouver un emploi ?',
        a: 'Non. Beaucoup de personnes cherchent autre chose : transmettre, s’engager, apprendre, rencontrer. Vous indiquez vous-même ce que vous recherchez, et vous pouvez changer d’avis.',
      },
      {
        q: 'Est-ce que l’inscription est gratuite ?',
        a: 'Oui. Pour les personnes qui cherchent un emploi, une mission ou une activité, Xperienced est gratuit : aucun frais ne vous sera demandé, ni à l’inscription, ni lors d’une mise en relation.',
      },
      {
        q: 'Est-ce que Xperienced garantit un emploi ?',
        a: 'Non, et nous préférons le dire clairement. Xperienced est une jeune initiative associative qui crée des connexions. Nous ne pouvons pas garantir un emploi, une mission ou une activité, mais nous faisons de notre mieux pour vous mettre en relation lorsqu’une piste pertinente existe.',
      },
      {
        q: 'Comment une entreprise peut-elle proposer une opportunité ?',
        a: 'En remplissant le formulaire « Proposer une opportunité » : quelques informations sur le besoin, le lieu, le type d’engagement et la rémunération (ou non). Nous reprenons contact pour en parler. Chaque opportunité est présentée telle qu’elle est : rémunérée, bénévole ou à définir.',
      },
      {
        q: 'Comment devenir partenaire ?',
        a: 'Associations, communes, institutions, entreprises ou fondations : choisissez « Partenariat » dans le formulaire pour les organisations, ou écrivez-nous via « Soutenir Xperienced ». Une discussion simple suffit pour commencer.',
      },
      {
        q: 'Comment mes informations personnelles sont-elles utilisées ?',
        a: 'Uniquement pour vous recontacter et chercher des opportunités qui vous correspondent. Elles sont stockées en Suisse, chez Infomaniak. Nous demandons le minimum, nous ne vendons rien et ne transmettons vos coordonnées à une organisation qu’avec votre accord. Tous les détails figurent dans notre politique de confidentialité.',
      },
    ],
  },

  final: {
    title: 'L’expérience ne demande pas la permission de *continuer*.',
    text: 'Rejoignez Xperienced et contribuons ensemble à créer davantage de possibilités.',
    cta: 'Faire le premier pas',
  },

  forms: {
    individuTitle: 'Parlez-nous de vous',
    individuLead: 'Trois minutes, pas de CV, aucun engagement. Juste de quoi faire connaissance.',
    soutienTitle: 'Soutenir Xperienced',
    soutienLead: 'Du temps, une compétence, un lieu, un réseau ou un soutien financier : chaque coup de main compte.',
    required: 'obligatoire',
    optional: 'facultatif',
    submit: {
      individu: 'Envoyer mon profil',
      opportunite: 'Proposer cette opportunité',
      soutien: 'Envoyer ma proposition',
      mur: 'Ajouter ma phrase',
    },
    sending: 'Envoi en cours…',
    success: {
      individu: {
        title: 'Merci, c’est noté.',
        text: 'Votre profil nous est bien parvenu. Nous vous recontacterons par le moyen que vous avez choisi. Ce n’est pas une promesse d’emploi, mais c’est un vrai premier pas.',
      },
      opportunite: {
        title: 'Merci pour votre proposition.',
        text: 'Elle nous est bien parvenue. Nous reprenons contact rapidement pour en discuter.',
      },
      soutien: {
        title: 'Merci de votre soutien !',
        text: 'Votre message nous est bien parvenu. Nous revenons vers vous très vite.',
      },
      mur: {
        title: 'Merci pour cette phrase.',
        text: 'Elle sera relue avant toute publication. Vous pouvez retirer votre accord à tout moment en nous écrivant.',
      },
    },
    errors: {
      invalid: 'Certains champs sont à compléter. Ils sont signalés ci-dessus.',
      not_configured:
        'Le formulaire n’est pas encore activé : votre demande n’a pas été envoyée. Merci de réessayer bientôt.',
      delivery_failed: 'Un problème technique a empêché l’envoi. Votre demande n’a pas été transmise : merci de réessayer dans quelques minutes.',
      rate_limited: 'Trop d’envois en peu de temps. Merci de réessayer dans quelques minutes.',
      network: 'Connexion impossible. Vérifiez votre connexion internet et réessayez.',
    },
    consent:
      'J’accepte que Xperienced utilise ces informations pour me recontacter et traiter ma demande, conformément à la',
    consentLink: 'politique de confidentialité',
  },

  footer: {
    tagline: 'L’expérience n’a pas de date de péremption.',
    privacy: 'Confidentialité',
    legal: 'Mentions légales',
    posters: 'Kit affiches',
    languages: 'Langue',
    soon: 'bientôt',
  },
};

/**
 * Typographie française : espace fine insécable avant ? ! : ; et à l'intérieur des « guillemets »,
 * pour éviter qu'un point d'interrogation se retrouve seul en début de ligne.
 */
export function typo<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(/ ([?!:;»])/g, '\u202F$1').replace(/« /g, '«\u202F') as T;
  }
  if (Array.isArray(value)) return value.map(typo) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typo(v)])) as T;
  }
  return value;
}

export const fr = typo(content);
export type Content = typeof fr;
