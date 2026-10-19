# Checklist de lancement

## ✅ Prêt

- Page d’accueil complète en français (10 sections), page de campagne `/expire`, page de confirmation `/merci`, page 404.
- Quatre parcours d’inscription : personnes 50+, organisations (emploi, mission, bénévolat, mentorat, partenariat), soutien, mur de l’expérience. Validation en français, messages d’erreur accessibles, confirmation claire, fonctionnement même sans JavaScript.
- Protection anti-robots (champ piège, délai minimum, limite d’envois par adresse IP).
- Le site **refuse honnêtement** les envois tant qu’aucune réception n’est configurée en production (aucune fausse confirmation).
- Liens QR traçables (`/q/<code>`), mémorisation de la campagne d’origine jointe à chaque inscription, liens de recommandation traçables, bouton de partage.
- Kit d’affiches imprimables `/affiches` (7 affiches A4 avec QR codes).
- SEO : titre, description, balises de partage (Open Graph), image de partage, plan du site, robots.txt, données structurées FAQ, structure de titres logique.
- Accessibilité : contrôles automatiques WCAG 2.1 AA réussis, navigation au clavier, lien d’évitement, focus visible, textes ≥ 17 px, animations désactivées si « réduire les animations » est activé.
- Mobile : vérifié de 320 px à 1440 px, sans défilement horizontal.
- Tests automatiques (Playwright). Déploiement GitHub → Vercel prêt (détection automatique) ; Render possible en alternative (`render.yaml`).
- Kit de lancement : `docs/KIT-DE-LANCEMENT.md`.

## ✍️ À compléter avec des informations réelles (dans `src/config/site.ts` et `src/content/fr.ts`)

- [ ] Nom juridique de l’association, adresse du siège, e-mail de contact.
- [ ] Personne responsable de la protection des données.
- [ ] Région(s) où Xperienced est réellement active (ne pas suggérer une couverture inexistante).
- [ ] Liens des réseaux sociaux (seuls ceux qui existent).
- [ ] Politique de confidentialité : prestataires effectivement utilisés, pays de traitement et garanties, durée de conservation, date de mise à jour. **Faire relire** par une personne compétente (voir `docs/PROTECTION-DES-DONNEES.md`).
- [ ] Mentions légales : forme juridique, IDE éventuel, hébergeur, responsable du contenu.
- [ ] Informations de don, uniquement si un compte existe.
- [ ] Plus tard : vraies histoires et vraies phrases du mur, **avec accord écrit**.

Tant que ces éléments manquent, le site affiche « [À compléter] » et un bandeau sur les pages légales : c’est volontaire.

## ⚙️ À configurer avant de rendre le site public

- [ ] **Hébergement** : importer le dépôt dans Vercel (voir README, section 4) et choisir la branche de production.
- [ ] **Offre Vercel** : l’offre gratuite (Hobby) est réservée à un usage non commercial ; confirmer auprès de Vercel qu’elle convient à l’association, sinon passer à Pro.
- [ ] **`SITE_URL`** : l’adresse publique définitive (sur Vercel, `https://<projet>.vercel.app` par défaut). À fixer avant d’imprimer les affiches : les QR codes en dépendent, et changer d’adresse ensuite rendrait les affiches imprimées inutilisables.
- [ ] **Réception des formulaires** : `FORM_WEBHOOK_URL` (+ `FORM_WEBHOOK_SECRET`) et/ou `RESEND_API_KEY` + `NOTIFY_EMAIL_TO`. Puis faire un envoi test de chaque formulaire et vérifier sa réception.
- [ ] **Mesure d’audience** (facultatif) : `PUBLIC_PLAUSIBLE_DOMAIN` ou `PUBLIC_UMAMI_WEBSITE_ID`, puis redéployer.
- [ ] **Nom de domaine** (facultatif, ~CHF 15–25/an) : l’ajouter dans Vercel, puis mettre à jour `SITE_URL` et redéployer. Idéalement **avant** d’imprimer les affiches.
- [ ] Imprimer les affiches depuis `/affiches` **après** avoir défini `SITE_URL`, et scanner chaque QR code avec un téléphone avant de les distribuer.
- [ ] Obtenir l’autorisation de chaque lieu d’affichage.
