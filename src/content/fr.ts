/**
 * TEXTES DU SITE — FRANÇAIS (Suisse romande)
 *
 * Pour modifier un texte : changez uniquement ce qui se trouve entre les
 * guillemets ou les apostrophes typographiques. Gardez la ponctuation autour.
 * Les mots entre *astérisques* s'affichent en italique accentué (style « manuscrit »).
 *
 * Règle d'or : ne rien écrire qui ne soit pas vrai aujourd'hui
 * (pas de faux chiffres, pas de faux partenaires, pas de mandats inventés,
 * pas de promesse de mandat ou d'emploi).
 */
const content = {
  meta: {
    title: 'Xperienced · Mandats et missions rémunérées pour les 50 ans et plus, en Suisse romande',
    description:
      'L’expérience n’a pas de date de péremption. Xperienced met en relation des professionnel·le·s de 50 ans et plus avec les entreprises, associations et particuliers qui ont besoin de leur expérience : conseil, missions courtes, soutien administratif, mentorat, projets.',
    ogImageAlt: 'Un CV tamponné « EXPIRÉ », le tampon barré. Texte : L’expérience n’a pas de date de péremption.',
  },

  nav: [
    { href: '#mandats', label: 'Les mandats' },
    { href: '#comment', label: 'Comment ça marche' },
    { href: '#mandants', label: 'Proposer un mandat' },
    { href: '#cadre', label: 'Cadre' },
    { href: '#faq', label: 'FAQ' },
  ],
  navCta: 'Je cherche un mandat',

  hero: {
    eyebrow: 'Mandats et missions rémunérées · 50+ · Suisse romande',
    titleBefore: 'L’expérience n’a pas de date de',
    titleAccent: 'péremption',
    lead:
      'Conseil, missions courtes, soutien administratif, mentorat, projets : Xperienced relie les professionnel·le·s de 50 ans et plus aux entreprises, associations et particuliers qui ont besoin de leur expérience.',
    primary: 'Je cherche un mandat',
    secondary: 'Je propose un mandat',
    micro: 'Gratuit pour les personnes de 50 ans et plus. Une jeune initiative associative suisse.',
    cardLabel: 'Profil fictif, à titre d’illustration',
  },

  ticker: [
    'Vous n’êtes pas dépassé·e. Vous êtes expérimenté·e.',
    'Trois semaines de renfort. Trente ans de métier.',
    'Votre CV a de l’histoire. Et encore de l’avenir.',
    'L’expérience ne prend pas sa retraite.',
    'Un besoin ponctuel ? Quelqu’un l’a déjà résolu cent fois.',
  ],

  paths: {
    kicker: 'Deux portes d’entrée',
    title: 'Un mandat à *prendre* ? Un mandat à *confier* ?',
    seeker: {
      label: 'Pour les personnes de 50 ans et plus',
      title: 'Je cherche un mandat',
      text: 'Vous avez des années de métier et l’envie de les mettre au service de missions concrètes, rémunérées, à votre rythme.',
      points: ['Gratuit pour vous', 'Pas de CV pour commencer', 'Vous choisissez vos missions'],
      cta: 'Je cherche un mandat',
    },
    giver: {
      label: 'Pour les entreprises, associations et particuliers',
      title: 'Je propose un mandat',
      text: 'Un besoin ponctuel, un projet, un coup de main expérimenté ? Décrivez-le : nous cherchons qui pourrait y répondre.',
      points: ['Sans engagement', 'Missions courtes ou projets', 'Rémunération présentée clairement'],
      cta: 'Je propose un mandat',
    },
    typesTitle: 'Les mandats que nous voulons rendre possibles',
    types: [
      { id: 'conseil', title: 'Conseil et expertise', text: 'Un regard expérimenté sur une question précise : organisation, finances, technique, qualité, stratégie.' },
      { id: 'mission', title: 'Missions courtes', text: 'Un renfort de quelques jours ou semaines pour un pic d’activité, une absence ou un lancement.' },
      { id: 'administratif', title: 'Soutien administratif', text: 'Mettre de l’ordre, structurer, rédiger, gérer un dossier ou une démarche.' },
      { id: 'mentorat', title: 'Mentorat et transmission', text: 'Accompagner une équipe, un·e apprenti·e, un·e entrepreneur·e qui démarre.' },
      { id: 'projet', title: 'Projets', text: 'Piloter ou contribuer à un projet défini, avec un début, une fin et un résultat attendu.' },
    ],
    othersTitle: 'Vous cherchez autre chose ?',
    others: [
      { id: 'emploi', label: 'Un emploi salarié', text: 'Fixe ou à temps partiel : une option distincte, que vous pouvez aussi cocher.' },
      { id: 'benevolat', label: 'Du bénévolat', text: 'Non rémunéré, pour une association ou un projet local.' },
    ],
  },

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
      'Beaucoup de personnes de plus de 50 ans ont des compétences solides, des réseaux et du recul. Beaucoup d’entreprises, d’associations et de particuliers ont, eux, des besoins ponctuels qu’une personne expérimentée réglerait vite et bien.',
      'Les deux se croisent rarement. Un mandat bien défini est souvent la porte d’entrée la plus simple : une mission claire, une durée claire, une rémunération claire.',
    ],
    closing: 'Xperienced veut créer ces ponts : une mission, une connexion à la fois.',
    cta: 'Faire partie du mouvement',
  },

  how: {
    kicker: 'Comment ça marche',
    title: 'Simple, humain, *sans* paperasse.',
    steps: [
      {
        title: 'Chacun se présente.',
        text: 'Les personnes de 50 ans et plus décrivent leur expérience et les mandats qui les intéressent. Les mandants décrivent leur besoin, la durée et la rémunération envisagée.',
      },
      {
        title: 'Nous cherchons les bonnes correspondances.',
        text: 'Nous comparons les besoins et les profils que nous réunissons progressivement, et nous contactons les personnes concernées.',
      },
      {
        title: 'Vous vous rencontrez, vous décidez.',
        text: 'Avec l’accord de chacun, nous mettons les deux parties en relation. Le contrat se conclut ensuite directement entre elles.',
      },
    ],
    honesty:
      'Soyons clairs : Xperienced est une jeune initiative qui construit son réseau pas à pas. Aucun mandat n’est garanti, et nous ne publions que des besoins réellement proposés. Xperienced n’emploie pas les personnes et ne conclut pas les contrats à leur place.',
  },

  employers: {
    kicker: 'Pour les mandants',
    title: 'Un besoin précis ? Confiez-le à quelqu’un qui l’a déjà *résolu*.',
    lead:
      'Entreprises, associations, communes ou particuliers : une personne expérimentée peut être opérationnelle vite, sur une mission bien définie.',
    benefits: [
      { title: 'Opérationnel·le vite', text: 'Des réflexes métier déjà acquis, peu de temps d’adaptation.' },
      { title: 'Juste le temps nécessaire', text: 'Quelques jours, quelques semaines, un projet : sans engagement au-delà du besoin.' },
      { title: 'Transmission', text: 'Le savoir-faire reste chez vous : documenté, expliqué, transmis.' },
      { title: 'Regard extérieur', text: 'Le recul de quelqu’un qui a vu d’autres organisations.' },
      { title: 'Entre générations', text: 'Une collaboration qui enrichit aussi vos équipes plus jeunes.' },
    ],
    exampleTitle: 'Exemples de besoins',
    examples: [
      'Structurer la comptabilité d’une petite association',
      'Trois semaines de renfort pour un pic d’activité',
      'Préparer un dossier de demande de fonds',
      'Mentorer une jeune entrepreneure pendant six mois',
      'Accompagner une démarche administrative complexe',
    ],
    examplesNote: 'Exemples pour illustrer le type de besoins : ce ne sont pas des mandats disponibles.',
    cta: 'Je propose un mandat',
    formTitle: 'Je propose un mandat',
    formLead: 'Décrivez votre besoin en quelques lignes. Nous revenons vers vous pour en parler, sans engagement.',
  },

  cadre: {
    kicker: 'Un cadre clair',
    title: 'Un vrai mandat, c’est une vraie *indépendance*.',
    lead:
      'En Suisse, ce n’est pas le mot « mandat » qui compte, mais la réalité de la mission. Les caisses de compensation AVS et les tribunaux regardent comment le travail se déroule réellement.',
    mandatTitle: 'Plutôt un mandat indépendant',
    mandat: [
      'Un résultat ou une prestation définie, pas un poste',
      'Liberté d’organiser son temps et sa méthode',
      'Plusieurs clients, ou la possibilité d’en avoir',
      'Facturation d’honoraires, propre matériel, risque économique assumé',
    ],
    emploiTitle: 'Plutôt un emploi salarié',
    emploi: [
      'Horaires et instructions fixés par le donneur d’ordre',
      'Intégration durable dans une équipe, un seul « client »',
      'Travail à exécuter personnellement, sous contrôle',
      'Aide régulière au domicile d’un particulier (ménage, jardin, soins…)',
    ],
    consequence:
      'Dans ce second cas, c’est un emploi : le mandant devient employeur et doit verser les cotisations sociales. Nous le présentons alors comme tel, en option « emploi salarié ».',
    checksTitle: 'À vérifier selon votre situation',
    checks: [
      'Statut d’indépendant·e : il est reconnu par votre caisse de compensation AVS, au cas par cas.',
      'Au chômage : tout revenu, y compris un mandat, se déclare à votre caisse de chômage.',
      'À la retraite : l’activité reste possible ; des cotisations AVS sont dues au-delà d’une franchise annuelle.',
      'Sans nationalité suisse ou UE/AELE : le permis doit autoriser l’activité exercée.',
    ],
    note: 'Ces repères ne remplacent pas un conseil personnalisé : renseignez-vous auprès de votre caisse AVS, de votre caisse de chômage ou d’un·e spécialiste.',
  },

  associations: {
    kicker: 'Associations, communes et partenaires',
    title: 'Vous portez un projet local ? L’*expérience* est disponible.',
    lead:
      'Associations, communes, institutions : proposez un mandat rémunéré, un poste salarié ou une activité bénévole. Chaque proposition est présentée telle qu’elle est. Pas de dossier interminable : un formulaire court, puis une discussion.',
    items: ['Mandats rémunérés', 'Projets communautaires', 'Mentorat', 'Postes salariés', 'Bénévolat'],
    cta: 'Devenir partenaire',
    support: 'Fondation, commune, entreprise ou particulier : vous voulez soutenir le projet ?',
    supportCta: 'Soutenir Xperienced',
  },

  wall: {
    kicker: 'Le mur de l’expérience',
    title: 'Une expérience. Des possibilités. Une suite à *écrire*.',
    lead:
      'Ici viendront les histoires de mandats réussis. Elles n’existent pas encore : nous ne les inventerons pas. En attendant, nous commençons par une question.',
    question: 'Qu’est-ce que vos années d’expérience vous ont appris ?',
    examplesLabel: 'Exemples pour vous inspirer (rédigés par l’équipe, pas des témoignages)',
    examples: [
      'Écouter jusqu’au bout avant de répondre.',
      'Un problème bien posé est à moitié résolu.',
      'Un client qui se plaint est un client qui tient encore à vous.',
    ],
    scenarioLabel: 'Scénario illustratif · personnages fictifs',
    scenario: {
      name: 'Imaginons Christine, 58 ans',
      text: 'Ancienne cheffe d’entrepôt, Christine propose son expérience en organisation logistique. Une PME de la région a besoin, pour six semaines, de quelqu’un pour réorganiser son stock avant un déménagement. Christine fixe ses honoraires, organise son travail, et repart avec une mission réussie et une nouvelle référence.',
      note: 'Ce récit est imaginé pour montrer le type de mandat que nous voulons rendre possible. Les vraies histoires viendront, avec l’accord des personnes concernées.',
    },
    formTitle: 'Votre phrase sur le mur',
    formLead: 'Une phrase suffit. Nous la publierons seulement avec votre accord explicite, après relecture.',
  },

  join: {
    kicker: 'Rejoindre le mouvement',
    title: 'Et si le prochain mandat commençait *avec vous* ?',
    pathways: [
      { label: 'Je cherche un mandat', href: '#inscription', form: 'individu' },
      { label: 'Je propose un mandat', href: '#proposer', form: 'opportunite' },
      { label: 'Je cherche un emploi salarié ou du bénévolat', href: '#inscription', form: 'individu', preset: 'autres' },
      { label: 'Je veux soutenir l’initiative ou devenir partenaire', href: '#soutenir', form: 'soutien' },
    ],
    referralTitle: 'Vous connaissez quelqu’un qui a encore beaucoup à apporter ?',
    referralText: 'Transmettez-lui Xperienced. Une simple mise en relation peut ouvrir une nouvelle porte.',
    shareCta: 'Partager Xperienced',
    shareText: 'L’expérience n’a pas de date de péremption. Xperienced met en relation les 50 ans et plus avec des mandats rémunérés :',
    copied: 'Lien copié. Il ne reste plus qu’à le coller dans un message.',
  },

  faq: {
    kicker: 'Questions fréquentes',
    title: 'Vos questions, nos réponses *honnêtes*.',
    items: [
      {
        q: 'À qui s’adresse Xperienced ?',
        a: 'Aux personnes de 50 ans et plus qui veulent mettre leur expérience au service de mandats et de missions rémunérées, et aux entreprises, associations, communes et particuliers qui ont un besoin ponctuel ou un projet. Nous commençons par la Suisse romande.',
      },
      {
        q: 'Quels types de mandats ?',
        a: 'Conseil et expertise, missions courtes, soutien administratif, mentorat et transmission, projets. Le réseau est en construction : nous ne publions que des besoins réellement proposés par des mandants.',
      },
      {
        q: 'Et si je cherche un emploi salarié ou du bénévolat ?',
        a: 'C’est possible : ce sont des options distinctes que vous pouvez cocher dans le formulaire. Nous les présentons toujours séparément des mandats, pour que chacun sache de quoi il s’agit.',
      },
      {
        q: 'Est-ce que l’inscription est gratuite ?',
        a: 'Oui. Pour les personnes de 50 ans et plus, Xperienced est gratuit : aucun frais ne vous sera demandé, ni à l’inscription, ni lors d’une mise en relation.',
      },
      {
        q: 'Dois-je être indépendant·e pour accepter un mandat ?',
        a: 'Un mandat suppose en principe une activité indépendante, reconnue au cas par cas par votre caisse de compensation AVS. Si une mission ressemble à un emploi (horaires imposés, instructions, intégration durable), c’est un emploi salarié, avec cotisations à la charge de l’employeur. En cas de doute, renseignez-vous auprès de votre caisse AVS avant de commencer.',
      },
      {
        q: 'Je suis au chômage ou à la retraite : puis-je accepter un mandat ?',
        a: 'Souvent oui, avec quelques règles. Au chômage, tout revenu doit être déclaré à votre caisse de chômage, qui vous dira comment il est pris en compte. À la retraite, vous pouvez continuer une activité ; des cotisations AVS restent dues au-delà d’une franchise annuelle. Renseignez-vous auprès de votre caisse avant d’accepter.',
      },
      {
        q: 'Xperienced est-il un employeur ou une agence de placement ?',
        a: 'Non. Xperienced n’emploie pas les personnes, ne loue pas de personnel et ne conclut pas les contrats : il met en relation, avec l’accord de chacun. Le contrat (mandat ou contrat de travail) est conclu directement entre la personne et le mandant.',
      },
      {
        q: 'Est-ce que Xperienced garantit un mandat ?',
        a: 'Non, et nous préférons le dire clairement. Nous faisons de notre mieux pour vous mettre en relation lorsqu’un besoin correspond à votre profil, mais nous ne pouvons rien garantir.',
      },
      {
        q: 'Comment proposer un mandat ?',
        a: 'Avec le formulaire « Je propose un mandat » : votre besoin, la durée, le lieu et la rémunération envisagée. Nous reprenons contact pour en parler. Chaque proposition est présentée telle qu’elle est : mandat rémunéré, emploi salarié ou bénévolat.',
      },
      {
        q: 'Comment mes informations personnelles sont-elles utilisées ?',
        a: 'Uniquement pour vous recontacter et chercher des mandats qui vous correspondent. Nous demandons le minimum, nous ne vendons rien et ne transmettons vos coordonnées à un mandant qu’avec votre accord. Tous les détails figurent dans notre politique de confidentialité.',
      },
    ],
  },

  final: {
    title: 'L’expérience ne demande pas la permission de *continuer*.',
    text: 'Un mandat à prendre, un mandat à confier : commençons par une connexion.',
    cta: 'Je cherche un mandat',
    secondary: 'Je propose un mandat',
  },

  forms: {
    individuKicker: 'Je cherche un mandat · 50 ans et plus',
    individuTitle: 'Parlez-nous de votre expérience',
    individuLead: 'Trois minutes, pas de CV, aucun engagement. Juste de quoi savoir quels mandats pourraient vous correspondre.',
    individuPromises: [
      'Gratuit pour vous, sans frais cachés',
      'Pas de CV à fournir pour commencer',
      'Vos coordonnées ne sont transmises à aucun mandant sans votre accord',
    ],
    soutienTitle: 'Soutenir Xperienced',
    soutienLead: 'Du temps, une compétence, un lieu, un réseau ou un soutien financier : chaque coup de main compte.',
    required: 'obligatoire',
    optional: 'facultatif',
    submit: {
      individu: 'Envoyer mon profil',
      opportunite: 'Proposer ce mandat',
      soutien: 'Envoyer ma proposition',
      mur: 'Ajouter ma phrase',
    },
    sending: 'Envoi en cours…',
    success: {
      individu: {
        title: 'Merci, c’est noté.',
        text: 'Votre profil nous est bien parvenu. Nous vous recontacterons par le moyen que vous avez choisi. Ce n’est pas une promesse de mandat, mais c’est un vrai premier pas.',
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
