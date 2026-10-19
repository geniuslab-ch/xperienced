# Kit de lancement Xperienced — guérilla marketing à CHF 0–500

> **Positionnement : « Mandats et missions rémunérées ».** Message central : *L’expérience n’a pas de date de péremption.*
> Deux appels à l’action partout : **« Je cherche un mandat »** (personnes 50+) et **« Je propose un mandat »** (entreprises, associations, particuliers). L’emploi salarié et le bénévolat restent des options distinctes.
>
> **L’idée centrale : faire remarquer à la société l’expérience qu’elle a appris à ne plus voir.**
> On ne demande pas d’être « gentil avec les seniors ». On révèle ce que tout le monde rate.

Règles du jeu, valables pour tout ce kit :

- **Jamais d’affichage sans autorisation** : pas d’autocollants sauvages, pas de vandalisme, pas d’intrusion. On affiche chez des partenaires qui ont dit oui.
- **Jamais de fausse promesse** : on ne promet ni mandat, ni emploi, ni placement, ni rémunération. On n’annonce jamais de mandats disponibles qui n’existent pas.
- **Jamais de raccourci juridique** : un « mandat » doit être une vraie activité indépendante. Ne pas présenter un emploi déguisé comme un mandat (voir `docs/CADRE-JURIDIQUE-MANDATS.md`). On parle de « connexions » et d’« opportunités qui se construisent ».
- **Jamais de faux témoignage** : les situations imaginées portent la mention « Situation fictive ». Les vraies histoires ne sont publiées qu’avec un accord écrit.
- **Pas de chiffres inventés** : si une statistique est utilisée, elle vient d’une source officielle citée (OFS, SECO…) et vérifiée le jour même.
- **Pas d’opposition entre générations** : le message n’est jamais « les jeunes contre les vieux », mais « ensemble, avec l’expérience ».

---

## Les 5 campagnes en un coup d’œil

| # | Campagne | Public | Exécution | Appel à l’action | Coût estimé | Indicateur clé |
|---|----------|--------|-----------|------------------|-------------|----------------|
| 1 | **Le CV expiré** — « EXPIRÉ ? Selon qui ? » | Grand public, personnes 50+ | Affiche A3/A4 + page dédiée `/expire` (QR `/q/cv`) ; version réseaux (carrousel) | « Découvrez ce qui reste possible. » | CHF 60–120 (impression 40 A3 + 100 A4) | Scans `/q/cv` ; inscriptions avec `utm_campaign=cv-expire` |
| 2 | **Le candidat invisible** | Grand public, employeurs | Série de 3 affiches typographiques « Situation fictive » + posts LinkedIn | « Changeons la suite. » | CHF 30–60 | Scans `/q/candidat` ; partages LinkedIn ; demandes employeurs |
| 3 | **L’échange d’expérience** — « J’ai 30 ans d’expérience. Que voulez-vous apprendre ? » | Jeunes, PME, personnes 50+ | Table installée 2 h dans un lieu partenaire (café, bibliothèque, marché avec autorisation) ; vidéos courtes | « Partager mon savoir-faire. » | CHF 0–80 (pancarte, café offert) | Nombre d’échanges ; vidéos publiées ; inscriptions « mentorat » |
| 4 | **Micro-affiches QR** (3 versions) | 4a personnes 50+ · 4b employeurs · 4c associations | Format A5/A4 dans commerces, cafés, coworkings, bibliothèques, centres communautaires partenaires | « Découvrez Xperienced. » / « Trouver des talents expérimentés. » / « Proposer une activité. » | CHF 40–80 | Scans par code et par lieu ; coût par demande qualifiée |
| 5 | **Le mur de l’expérience** — « Qu’est-ce que vos années d’expérience vous ont appris ? » | Tous | Mur physique (grande feuille + post-it) lors des événements + formulaire en ligne `#mur` | « Écrire ma phrase. » | CHF 0–30 | Phrases reçues ; phrases publiées avec accord ; partages |

Toutes les affiches sont prêtes à imprimer sur **`/affiches`** (A4, QR codes inclus). Pour chaque nouveau lieu, créez un code dédié dans `src/config/campaigns.ts` (ex. `moi-bibliotheque-nyon`) : un lieu = un code = une mesure.

---

## A. Cinq concepts d’affiches

### 1. « EXPIRÉ ? Selon qui ? »
- **Public :** grand public et personnes 50+
- **Titre :** EXPIRÉ ? Selon qui ?
- **Message :** Votre expérience n’a pas de date de péremption.
- **QR :** Découvrez ce qui reste possible. → `/q/cv`
- **Visuel :** un CV tamponné « EXPIRÉ », le tampon barré d’un trait orange, recouvert d’un tampon « EXPÉRIMENTÉ ».

### 2. « 25 ans d’expérience. 0 réponse. »
- **Public :** grand public, employeurs
- **Titre :** 25 ans d’expérience. 0 réponse.
- **Message :** Et si le problème n’était pas son CV ?
- **QR :** Changeons la suite. → `/q/candidat`
- **Mention obligatoire :** Situation fictive.

### 3. « Un besoin ponctuel ? Quelqu’un l’a déjà résolu cent fois. »
- **Public :** mandants — PME, commerces, associations, particuliers
- **Titre :** Un besoin ponctuel ? Quelqu’un l’a déjà résolu cent fois.
- **Message :** Confiez un mandat à une personne de 50 ans et plus. Sans engagement.
- **QR :** Je propose un mandat. → `/q/talents`
- **Variante réseaux :** « Votre prochain meilleur collaborateur a peut-être simplement 58 ans. » (mention « Situation fictive »).

### 4. « Vous avez encore beaucoup à apporter. »
- **Public :** personnes 50+
- **Titre :** Vous avez encore beaucoup à apporter.
- **Message :** Conseil, missions, mentorat : proposez votre expérience en mandat.
- **QR :** Je cherche un mandat. → `/q/moi`

### 5. « Votre projet cherche des forces vives ? »
- **Public :** associations, communes, projets locaux
- **Titre :** Votre projet cherche des forces vives ?
- **Message :** Des personnes expérimentées ont envie de s’engager près de chez vous.
- **QR :** Proposer une activité. → `/q/asso`

Bonus prêts à imprimer : « J’ai 30 ans d’expérience. Que voulez-vous apprendre ? » (`/q/echange`) et « Qu’est-ce que vos années d’expérience vous ont appris ? » (`/q/mur`).

---

## B. Dix publications pour les réseaux sociaux

> Ton : un mouvement, pas une pub. Phrases courtes. Une idée par post. Toujours un lien ou une invitation.
> Hashtags suggérés (2–3 max) : #Xperienced #LexpérienceNaPasDeDateDePéremption #SuisseRomande

**1 · Instagram / Facebook — carrousel « Le CV expiré »**
Visuel 1 : CV tamponné « EXPIRÉ ». Visuel 2 : le tampon barré. Visuel 3 : « EXPÉRIMENTÉ ».
> Qui a décidé qu’une expérience avait une date de péremption ?
> Pas nous. Xperienced, c’est une jeune initiative associative en Suisse romande pour que les compétences des 50 ans et plus trouvent leur prochaine utilité : un emploi, une mission, un engagement, une transmission.
> Premier pas → lien en bio.

**2 · LinkedIn — pour les employeurs**
> Un audit de vos processus, trois semaines de renfort, un dossier de financement à monter, un mentor pour une jeune équipe ?
> Quelqu’un l’a déjà fait cent fois. Il ou elle a peut-être 58 ans et cherche justement un mandat.
> Xperienced met en relation des professionnel·le·s de 50 ans et plus avec des entreprises, associations et particuliers, autour de mandats rémunérés. On démarre, on est honnêtes sur notre taille, et on cherche nos premiers mandants.
> Un besoin, même petit ? Décrivez-le en 3 minutes → « Je propose un mandat » : [lien]

**3 · Instagram Reel / TikTok — question de rue**
Texte à l’écran : « On a demandé : qu’est-ce que 30 ans de métier vous ont appris ? »
> Une phrase. Des décennies derrière. Et vous, qu’est-ce que l’expérience vous a appris ? Écrivez-la sur notre mur → [lien #mur]

**4 · Facebook — pour les proches**
> Votre maman, votre oncle, votre voisin vient de perdre son poste à 57 ans. Ou part à la retraite sans en avoir envie.
> Transmettez-lui Xperienced. Une simple mise en relation peut ouvrir une nouvelle porte. [lien]

**5 · LinkedIn — manifeste**
> Nous ne demandons pas à la société d’être plus gentille avec les plus de 50 ans.
> Nous lui montrons ce qu’elle rate.
> Des savoir-faire qui partent à la retraite trop tôt. Des mentors que personne n’appelle. Des PME qui cherchent « quelqu’un d’expérimenté » sans savoir où regarder.
> Xperienced crée ces ponts. Une connexion à la fois.

**6 · Instagram — citation du mur (uniquement avec accord écrit)**
Visuel : la phrase en grand, prénom + âge + ville si l’auteur·e l’a accepté.
> « [phrase réelle reçue via le mur] » — [signature choisie]
> Le mur de l’expérience grandit. Ajoutez la vôtre → [lien #mur]

**7 · TikTok / Reel — « 30 secondes de savoir-faire »**
Une personne 50+ montre un geste utile (réparer une chaise, négocier un prix, plier une chemise sans fer).
> Ce savoir-faire existe. Il cherche quelqu’un à qui être transmis. #Xperienced

**8 · Facebook / Instagram — événement local**
> Samedi [date], [lieu partenaire], de 10 h à 12 h : « J’ai 30 ans d’expérience. Que voulez-vous apprendre ? »
> Venez poser votre question. Repartez avec une réponse — et peut-être une rencontre. Gratuit.

**9 · LinkedIn — appel aux associations**
> Associations, communes, institutions de Suisse romande : vous avez des projets qui manquent de bras, de têtes et d’expérience ?
> Nous rencontrons des personnes de 50 ans et plus qui ont envie de s’engager. Proposez une activité en 3 minutes : [lien #associations]

**10 · Instagram story — sondage**
> Sondage : « À 55 ans, on est… » ☐ dépassé ☐ expérimenté
> Écran suivant : « Bonne réponse. 😉 L’expérience n’a pas de date de péremption. » + lien.

---

## C. Trois scripts vidéo (15–30 secondes)

### Vidéo 1 — « Le tampon » (20 s)
- **0–2 s (accroche) :** gros plan, une main tamponne « EXPIRÉ » sur un CV. Bruit sec. Texte : « EXPIRÉ ? »
- **2–8 s :** on découvre le CV : « 31 ans de métier · 40 apprentis formés · 4 langues ». Texte : « Selon qui ? »
- **8–14 s :** un feutre orange barre le tampon. Un nouveau tampon : « EXPÉRIMENTÉ ».
- **14–20 s :** texte : « L’expérience n’a pas de date de péremption. » Logo + « xperienced… » (URL) + « CV fictif ».
- **Tournage :** un téléphone, une table, un vrai tampon (CHF 15). Aucun visage nécessaire.

### Vidéo 2 — « Que voulez-vous apprendre ? » (30 s)
- **0–2 s :** une personne de 60 ans face caméra : « J’ai 30 ans d’expérience. Qu’est-ce que vous voulez apprendre ? »
- **2–22 s :** trois réponses rapides à des questions de passant·e·s (avec leur accord) : négocier un loyer, réparer un vélo, réussir un entretien.
- **22–30 s :** texte : « L’expérience se partage. » + « Rejoignez le mouvement » + URL.
- **Tournage :** lors de l’activation « Échange d’expérience ». Formulaire d’accord à l’image signé par chaque personne filmée.

### Vidéo 3 — « Le recruteur » (15 s) — pour LinkedIn
- **0–2 s :** texte plein écran : « Vous cherchez quelqu’un d’expérimenté ? »
- **2–9 s :** un tri de CV sur un bureau ; une main écarte un CV marqué « Né en 1966 ». Arrêt sur image. Texte : « Vous venez peut-être de le rater. »
- **9–15 s :** texte : « Xperienced — des talents expérimentés, une connexion à la fois. » + URL. Mention « Situation fictive ».

---

## D. E-mail aux mandants (entreprises, associations)

**Objet :** Un besoin ponctuel ? Une piste expérimentée (sans engagement)

> Bonjour [Prénom],
>
> Je m’appelle [Prénom Nom] et je lance avec quelques personnes **Xperienced**, une jeune initiative associative en Suisse romande. Notre but : connecter des personnes de 50 ans et plus, qui ont de l’expérience et l’envie de l’utiliser, avec des organisations qui en ont besoin.
>
> Je vous écris parce que [raison précise : un projet que vous lancez / un pic d’activité / vos apprentis à accompagner].
>
> Notre offre principale : des **mandats et missions rémunérées** confiés à des professionnel·le·s de 50 ans et plus — conseil, renfort de quelques semaines, soutien administratif, mentorat, projet défini.
>
> Pour être transparent : nous démarrons. Notre réseau se construit en ce moment et nous ne pouvons rien garantir. Le contrat se conclut directement entre vous et la personne ; si la mission s’exerce en réalité comme un emploi (horaires, instructions, intégration durable), nous la présentons comme un emploi salarié.
>
> Décrire un mandat prend environ 3 minutes : [lien vers /#proposer]
> Ou, plus simple : répondez à cet e-mail et proposez-moi 15 minutes d’échange.
>
> Merci pour votre attention,
> [Prénom Nom]
> [Fonction] — Xperienced
> [Téléphone] · [site]

*Conseil : 10 e-mails personnalisés valent mieux que 200 envois groupés. Commencez par des entreprises de votre réseau proche.*

---

## E. Communiqué / pitch pour la presse locale

**Objet :** « EXPIRÉ ? Selon qui ? » — une initiative romande veut rendre visible l’expérience des 50 ans et plus

> Bonjour [Prénom],
>
> À [ville], une petite initiative associative, **Xperienced**, lance cette semaine une campagne d’affiches inhabituelle : un CV tamponné « EXPIRÉ »… dont le tampon est barré.
>
> L’idée : rappeler que l’expérience n’a pas de date de péremption. Xperienced veut créer des ponts entre des personnes de 50 ans et plus — en recherche d’emploi, en reconversion, à la retraite ou simplement en quête d’une activité qui a du sens — et les entreprises, associations et communes qui ont besoin de leurs compétences.
>
> Ce qui pourrait intéresser vos lecteurs :
> - **Une campagne participative** : le « mur de l’expérience », où chacun·e peut écrire en une phrase ce que ses années de métier lui ont appris ;
> - **Une activation publique** le [date] à [lieu] : « J’ai 30 ans d’expérience. Que voulez-vous apprendre ? » ;
> - **Une démarche honnête** : l’association démarre, ne promet pas d’emploi et construit son réseau pas à pas, avec des partenaires locaux.
>
> [Prénom Nom], fondateur·rice, est disponible pour un entretien. Des personnes ayant participé aux premières activités pourront témoigner si elles le souhaitent.
>
> Contact : [téléphone] · [e-mail] · [site]

*À ne pas faire : citer des statistiques non vérifiées. Si le journaliste demande des chiffres sur l’emploi des 50+, renvoyer vers les sources officielles (Office fédéral de la statistique, SECO) plutôt que d’improviser.*

---

## F. Mécanisme de recommandation

Ce qui est déjà en place sur le site :

1. **Bouton « Partager Xperienced »** (section « Rejoindre le mouvement ») : partage natif sur mobile, WhatsApp, e-mail, LinkedIn, Facebook, ou « Copier le lien ».
2. **Liens traçables** : chaque lien partagé contient `utm_source=recommandation&ref=ami&utm_campaign=<canal>`. Toute inscription faite après ce clic est marquée comme venant d’une recommandation.
3. **Question « Comment avez-vous connu Xperienced ? »** dans chaque formulaire (réponse « Un proche, un ami, un collègue »), pour les recommandations de bouche-à-oreille non traçables.

À faire vivre humainement :

- **Pour les participant·e·s :** dans chaque e-mail de suivi, une ligne : « Vous connaissez quelqu’un qui a encore beaucoup à apporter ? Transférez-lui ce message. »
- **Pour les familles :** post n° 4 ci-dessus, à épingler sur Facebook.
- **Pour les entreprises et associations partenaires :** leur proposer une micro-affiche avec leur propre code (ex. `asso-ludotheque-morges`) — elles voient l’effet de leur relais, vous aussi.
- **Remerciement visible :** avec leur accord, remercier publiquement les lieux partenaires (« Merci au café X d’accueillir notre affiche »). C’est gratuit et ça donne envie à d’autres.

---

## G. Plan de lancement sur 30 jours (budget max. CHF 500)

> Priorité absolue : **les premiers mandats réels**. Sans mandants, les inscriptions de personnes 50+ restent sans suite. Visez d’abord 10 conversations avec des mandants (PME, associations, communes de votre entourage), avant de multiplier les affiches pour les personnes 50+.

**Avant le jour 1 :** remplir les informations de l’association (voir `docs/CHECKLIST-LANCEMENT.md`), activer la réception des formulaires, faire un envoi test de chaque formulaire.

### Semaine 1 — Fondations et premiers alliés (CHF ~60)
- Publier le site ; partager le lien à 30 personnes de votre entourage avec un message personnel (pas un message groupé).
- Créer les comptes Instagram, LinkedIn (page), Facebook. Publier les posts 5 (manifeste) et 1 (CV expiré).
- Lister 20 lieux possibles pour les affiches (cafés, bibliothèques, coworkings, centres de quartier, commerces) ; en visiter 10 en personne, avec une affiche à la main.
- Contacter 5 associations locales (bénévolat, réparation, jardins, entraide) pour un café.
- Achat : impression de 20 affiches A4 + 50 micro-affiches A5 (CHF 40–60 en reprographie).

### Semaine 2 — Affiches et entreprises (CHF ~120)
- Poser les affiches **uniquement** dans les lieux qui ont accepté, chacun avec son code QR propre.
- Envoyer 10 e-mails employeurs personnalisés (modèle D), relancer une fois après 5 jours.
- Publier les posts 2 (LinkedIn employeurs) et 9 (associations).
- Tourner la vidéo 1 (« Le tampon »). Achat : tampon personnalisé + feutres (CHF 20–40).
- Impression complémentaire de 20 affiches A3 pour les lieux les plus fréquentés (CHF ~60).

### Semaine 3 — Activation publique (CHF ~120)
- Organiser l’« Échange d’expérience » (2 h, lieu partenaire, autorisation obtenue) avec 3–5 personnes 50+ volontaires.
- Installer le mur de l’expérience physique au même endroit (grande feuille, post-it, formulaire d’accord pour la publication).
- Envoyer le pitch presse (E) à 3–5 médias locaux 5 jours avant l’événement.
- Filmer la vidéo 2. Publier posts 3, 7, 8.
- Achat : pancarte, post-it, café/croissants pour les participant·e·s (CHF 80–120).

### Semaine 4 — Mesurer, remercier, transformer (CHF ~100 réserve)
- Remplir le tableau de bord (H) ; retirer ou déplacer les affiches qui ne génèrent aucun scan.
- Recontacter **chaque** personne inscrite (c’est la promesse la plus importante).
- Publier les premières phrases du mur (avec accord), post 6. Remercier publiquement les lieux partenaires.
- Faire un bilan : quelles campagnes génèrent des inscriptions et des partenariats réels ? Doubler la mise sur celles-là.
- Réserve (CHF ~100) : réimpression des affiches qui fonctionnent, ou petit événement de remerciement.

**Total : CHF 300–500.** Aucune publicité payante n’est nécessaire pour démarrer.

---

## H. Tableau de bord de mesure

Modèle prêt à copier dans un tableur : `docs/tableau-de-bord.csv`. À remplir chaque lundi.

| Indicateur | Où le trouver | Pourquoi c’est important |
|------------|---------------|--------------------------|
| **Scans QR par campagne** | Onglet `qr_scan` de la feuille Google (une ligne par scan, avec le code), ou la mesure d’audience filtrée par `utm_campaign`. | Savoir quelles affiches et quels lieux fonctionnent |
| **Visiteurs uniques** | Plausible / Umami (si activé) | Ordre de grandeur de l’audience |
| **Inscriptions individuelles** | Onglet `individu` de la feuille Google (ou e-mails reçus) | Le cœur de la mission |
| **Demandes employeurs** | Onglet `opportunite`, type d’organisation « Entreprise » | Le nerf de la guerre : sans opportunités, pas de connexions |
| **Demandes partenaires** | Onglet `opportunite` (association, commune, institution, partenariat) + onglet `soutien` | Solidité du réseau local |
| **Opportunités confirmées** | Colonne `statut` = « confirmée » (à remplir à la main) | Ce qui existe vraiment, pas ce qui est espéré |
| **Mises en relation réussies** | Colonne `statut` = « mise en relation » puis « réussie » (après suivi) | Le seul vrai indicateur d’impact |
| **Coût par demande qualifiée** | Dépenses de la semaine ÷ (inscriptions + demandes employeurs + partenaires jugées pertinentes) | Garder le budget efficace |
| **Inscriptions via recommandation** | Colonnes `ref=ami` / `utm_source=recommandation` ou réponse « Un proche » | Mesure de l’effet « mouvement » |

Indicateurs à **ne pas** sur-interpréter : likes, abonné·e·s, vues de vidéos. Ils ne servent que s’ils mènent à des inscriptions et à des connexions.
