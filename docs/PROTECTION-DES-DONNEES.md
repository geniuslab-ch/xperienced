# Protection des données — notes pour l’association

> Ce document n’est pas un avis juridique. Il résume ce qui a été mis en place techniquement et ce qui reste à vérifier. Faites relire la politique de confidentialité par une personne compétente avant la mise en ligne publique.

## Cadre

La **loi fédérale sur la protection des données (LPD)** révisée est en vigueur depuis le **1er septembre 2023**, avec son ordonnance (OPDo). Points pertinents pour Xperienced (à vérifier sur les sources officielles, qui peuvent évoluer) :

- **Devoir d’informer (art. 19 LPD)** : au moment de la collecte, indiquer au minimum l’identité et les coordonnées du responsable, la finalité du traitement, les destinataires ou catégories de destinataires et, en cas de communication à l’étranger, le pays et les garanties prévues. → C’est le rôle de la page `/confidentialite` (champs « [À compléter] » à remplir).
- **Proportionnalité / minimisation** : ne collecter que le nécessaire. → Les formulaires ne demandent ni CV, ni date de naissance, ni adresse complète ; seul le prénom est demandé aux particuliers.
- **Sécurité des données** : mesures techniques et organisationnelles adaptées. → HTTPS, pas de base de données exposée, secrets dans les variables d’environnement ; côté association : accès restreint à la feuille ou à la boîte e-mail, validation en deux étapes.
- **Stockage** : les formulaires sont enregistrés dans Supabase, région eu-west-1 (Irlande, UE — pays reconnu comme offrant une protection adéquate) et peuvent être copiés par e-mail dans la messagerie Infomaniak (Suisse). Accepter le DPA de Supabase. Le site est hébergé par Vercel (fonctions exécutées à Francfort, sans stockage des formulaires) : accepter l’accord de traitement des données (DPA) de Vercel dans son tableau de bord.
- **Communication à l’étranger** : Vercel ou Render (hébergement), et, si vous les activez, Resend (e-mails) et Google (Sheets) sont des sociétés américaines. Vérifier, pour chaque prestataire, le lieu de traitement et la base du transfert (pays reconnu comme adéquat par le Conseil fédéral, certification au Swiss-U.S. Data Privacy Framework, clauses contractuelles types…), et le mentionner dans la politique. Une alternative suisse (ex. hébergeur ou outil de formulaires en Suisse) simplifie cette question.
- **Droits des personnes** : accès, rectification, suppression, opposition. → Prévoir une adresse de contact et une procédure simple (répondre dans les 30 jours).
- **Registre des activités de traitement** : les entreprises de moins de 250 personnes en sont en principe dispensées lorsque le risque est faible ; à vérifier pour votre cas.
- **Données sensibles** : la santé, notamment, est une donnée sensible. Les formulaires n’en demandent pas et invitent à ne pas en transmettre.

## Ce que fait le site

- Une case de consentement obligatoire, reliée à la politique de confidentialité, sur chaque formulaire.
- Un **accord distinct et explicite** pour publier une phrase sur le mur de l’expérience.
- Aucune transmission de coordonnées à un employeur ou une association **sans accord préalable** de la personne (engagement écrit sur le site : à respecter dans la pratique).
- Pas de cookie. L’origine de la visite (campagne) est mémorisée dans le navigateur le temps de la session uniquement.
- Les journaux du serveur ne contiennent **aucune donnée personnelle** : seulement le type de formulaire, un identifiant aléatoire et la campagne.
- Mesure d’audience optionnelle, avec des outils sans cookie (Plausible, Umami).

## Sources officielles à consulter

- Préposé fédéral à la protection des données et à la transparence (PFPDT) : https://www.edoeb.admin.ch
- Texte de la LPD (RS 235.1) : https://www.fedlex.admin.ch/eli/cc/2022/491/fr
