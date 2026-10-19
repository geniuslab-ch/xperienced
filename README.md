# Xperienced

**L’expérience n’a pas de date de péremption.**

Site de lancement de Xperienced, initiative associative suisse qui aide les personnes de 50 ans et plus à trouver un emploi, une mission, une activité qui a du sens et du lien social, et qui connecte entreprises, associations et partenaires à leur expérience.

- 🇫🇷 Français (Suisse romande) d’abord, architecture prête pour l’allemand et l’italien.
- 💸 Conçu pour coûter CHF 0 par mois au démarrage (GitHub + Vercel, outils gratuits).
- 📣 Pensé pour la guérilla marketing : affiches à QR codes traçables, page de campagne, partage et recommandation, mur de l’expérience.

Documents utiles :

| Document | Contenu |
|----------|---------|
| [`docs/CHECKLIST-LANCEMENT.md`](docs/CHECKLIST-LANCEMENT.md) | Ce qui est prêt, ce qui manque, ce qu’il faut configurer |
| [`docs/KIT-DE-LANCEMENT.md`](docs/KIT-DE-LANCEMENT.md) | Affiches, posts, scripts vidéo, e-mail employeurs, pitch presse, plan sur 30 jours, tableau de bord |
| [`docs/PROTECTION-DES-DONNEES.md`](docs/PROTECTION-DES-DONNEES.md) | Notes LPD et points à vérifier |
| [`docs/google-sheets-webhook.gs`](docs/google-sheets-webhook.gs) | Recevoir les formulaires dans Google Sheets (gratuit) |

---

## 1. Modifier les textes (sans être développeur·se)

Tout se fait directement sur GitHub : ouvrez le fichier, cliquez sur le crayon ✏️, modifiez, puis « Commit changes ». Vercel remet le site à jour automatiquement en 1–2 minutes.

| Je veux changer… | Fichier |
|------------------|---------|
| Les textes de la page (titres, paragraphes, FAQ, boutons) | `src/content/fr.ts` |
| Nom légal, adresse, e-mail, réseaux sociaux, informations de don | `src/config/site.ts` |
| Les phrases publiées sur le mur de l’expérience | `src/content/wall.ts` |
| Les affiches (titres, messages) | `src/content/posters.ts` |
| Les liens de suivi des QR codes (un par lieu) | `src/config/campaigns.ts` |
| La politique de confidentialité / les mentions légales | `src/pages/confidentialite.astro`, `src/pages/mentions-legales.astro` |
| Les couleurs | Variables en haut de `src/styles/global.css` |

Règles simples :

- Ne modifiez que le texte **entre guillemets**. Gardez les virgules à la fin des lignes.
- Un mot entre `*astérisques*` s’affiche en italique orange (style « manuscrit »).
- Les espaces avant `?`, `!`, `:` et dans les « guillemets » sont gérés automatiquement.
- Ce qui vaut `null` dans `site.ts` s’affiche « [À compléter] » : remplacez `null` par `'votre texte'` (avec les apostrophes droites).
- **Ne publiez jamais** de faux témoignage, faux chiffre ou faux partenaire. Les personnages illustratifs restent signalés comme fictifs.

---

## 2. Comment le site est construit

- **[Astro](https://astro.build)** : les pages sont générées à l’avance (rapides, bien référencées).
- Une **petite partie serveur** (fonction Vercel via `@astrojs/vercel`, ou serveur Node via `@astrojs/node` ailleurs) ne gère que trois choses : `/api/submit` (formulaires), `/q/<code>` (QR codes) et `/api/health` (état du service).
- Aucune base de données, aucun framework JavaScript côté navigateur : moins de 10 Ko de script.
- Polices auto-hébergées (pas d’appel à Google Fonts).

```
src/
  content/fr.ts          ← tous les textes du site
  config/site.ts         ← informations de l'association
  config/campaigns.ts    ← liens QR traçables
  components/sections/   ← une section de page = un fichier
  components/forms/      ← formulaires et champs accessibles
  lib/forms.ts           ← règles de validation (serveur)
  lib/delivery.ts        ← envoi vers webhook / e-mail
  pages/                 ← pages et routes (/, /expire, /affiches, /api/…, /q/…)
  scripts/               ← comportement côté navigateur (formulaires, partage, mesure)
  styles/global.css      ← design system (couleurs, typographie, boutons, champs)
e2e/                     ← tests automatiques
docs/                    ← kit de lancement, checklist, protection des données
```

---

## 3. Lancer le site sur son ordinateur

Prérequis : [Node.js 22](https://nodejs.org) (version 22.22 ou plus récente).

```bash
npm install
npm run dev          # http://localhost:4321
```

En développement, les formulaires envoyés sont enregistrés dans `.data/submissions.jsonl` (fichier ignoré par Git).

Autres commandes :

```bash
npm run build        # construit le site dans dist/
npm start            # lance la version construite
npm run check        # vérifie le code (types)
npm test             # tests automatiques (Playwright : pages, formulaires, mobile, accessibilité)
npm run images       # régénère public/og.png (site lancé sur le port 4321)
```

---

## 4. Mettre en ligne avec GitHub + Vercel (recommandé)

Chaque modification poussée sur GitHub est mise en ligne automatiquement par Vercel.

1. Créez un compte sur [vercel.com](https://vercel.com) avec **« Continue with GitHub »**.
2. **Add New… › Project**, puis **Import** le dépôt `geniuslab-ch/xperienced` (autorisez l’application Vercel sur l’organisation GitHub si on vous le demande).
3. Vercel reconnaît Astro tout seul : ne changez ni la commande de build ni le dossier de sortie.
4. Avant de cliquer sur **Deploy**, ouvrez **Environment Variables** et ajoutez au moins un canal de réception des formulaires (voir le tableau ci-dessous). `SITE_URL` est facultatif : sans lui, l’adresse `https://<projet>.vercel.app` est utilisée.
5. **Deploy**. Le site est en ligne en 1–2 minutes.
6. Branche : tant que le travail n’est pas fusionné dans `main`, allez dans *Settings › Git › Production Branch* et indiquez `claude/wizardly-turing-zpjbc9` (ou fusionnez d’abord dans `main`). Les autres branches obtiennent automatiquement une adresse de prévisualisation.
7. Vérifiez `https://VOTRE-SITE/api/health` : `"webhook": true` ou `"email": true` doit apparaître. Envoyez un formulaire de test de chaque type.

**Nom de domaine :** *Settings › Domains* dans Vercel, puis définissez `SITE_URL=https://www.votre-domaine.ch` et redéployez (*Deployments › … › Redeploy*). Les variables `SITE_URL` et `PUBLIC_…` sont lues au moment du build : **redéployez après chaque modification**.

**Offre gratuite (Hobby) :** Vercel la réserve à un usage personnel et non commercial ; demander des dons n’est pas considéré comme commercial. Le statut d’une association qui met en relation des personnes et des employeurs n’est pas explicitement couvert : en cas de doute, posez la question au support Vercel ou passez à l’offre Pro. Pas de mise en veille : les QR codes répondent immédiatement.

**Région :** `vercel.json` fait tourner les formulaires à Francfort (`fra1`), au plus près de la Suisse.

**Mesure d’audience :** vous pouvez aussi activer *Analytics* dans le tableau de bord Vercel (sans cookie), en plus ou à la place de Plausible/Umami — dans ce cas, mentionnez-le dans la politique de confidentialité.

### Alternative : Render

Le fichier `render.yaml` permet aussi de déployer sur [Render](https://render.com) (*New › Blueprint*, choisir le dépôt, renseigner les variables). L’offre gratuite de Render se met en veille après une période sans visite : la visite suivante peut prendre jusqu’à une minute. Le même code fonctionne sur les deux : l’hébergeur est détecté au moment du build.

### Variables d’environnement

| Variable | Obligatoire | Rôle |
|----------|-------------|------|
| `SITE_URL` | Oui sur Render, facultatif sur Vercel | Adresse publique (SEO, liens de partage, QR codes). Sur Vercel, l’adresse de production du projet est utilisée par défaut |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` + `NOTIFY_EMAIL_TO` | **Recommandé** | E-mail via la messagerie Infomaniak (données en Suisse) |
| `FORM_WEBHOOK_URL` | Option (hors Suisse) | Reçoit chaque formulaire en JSON (Google Sheets, Make, n8n, Zapier, CRM…) |
| `FORM_WEBHOOK_SECRET` | Recommandé avec le webhook | Secret partagé, transmis dans l’en-tête `X-Xperienced-Secret` et dans le champ `secret` |
| `RESEND_API_KEY` + `NOTIFY_EMAIL_TO` | Option (hors Suisse) | E-mail à l’équipe pour chaque envoi (Resend, offre gratuite) |
| `NOTIFY_EMAIL_FROM` | Avec Resend | Expéditeur sur un domaine vérifié dans Resend |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Non | Active Plausible (mesure sans cookie, payant) |
| `PUBLIC_UMAMI_WEBSITE_ID` | Non | Active Umami (mesure sans cookie, offre gratuite disponible) |

Les variables `PUBLIC_…` et `SITE_URL` sont lues **au moment du build** : redéployez après les avoir modifiées. Aucun secret n’est jamais envoyé au navigateur. Ne commitez jamais de fichier `.env`.

---

## 5. Recevoir les formulaires

**Tant qu’aucun canal n’est configuré en production, le site affiche « Le formulaire n’est pas encore activé : votre demande n’a pas été envoyée ».** Il ne fait jamais croire qu’une demande a été reçue.

**Choix retenu : messagerie Infomaniak (données stockées en Suisse).** C’est ce qu’annoncent la politique de confidentialité, les mentions légales et le bas de page.

1. Dans Infomaniak, créez (ou choisissez) une adresse e-mail, par ex. `formulaires@votre-domaine.ch`.
2. Dans Vercel, *Settings › Environment Variables*, ajoutez :
   - `SMTP_HOST` = `mail.infomaniak.com`
   - `SMTP_PORT` = `465`
   - `SMTP_USER` = l’adresse e-mail Infomaniak
   - `SMTP_PASS` = son mot de passe (ou un mot de passe d’application si la double authentification est activée)
   - `NOTIFY_EMAIL_TO` = la ou les boîtes qui reçoivent les formulaires
3. Redéployez, vérifiez `/api/health` (`"smtp": true`) et envoyez un formulaire de test de chaque type.

Chaque formulaire arrive alors par e-mail dans votre messagerie Infomaniak, avec l’adresse de la personne en « Répondre à ».

> ⚠️ Les autres options ci-dessous stockent les données **hors de Suisse** (Google, Resend : États-Unis). Si vous les activez, la mention « données stockées en Suisse » devient fausse : mettez d’abord à jour `src/pages/confidentialite.astro`, `src/pages/mentions-legales.astro` et le bas de page.

Autres options :

1. **Google Sheets (gratuit)** : suivez les instructions en tête de [`docs/google-sheets-webhook.gs`](docs/google-sheets-webhook.gs). Chaque formulaire arrive dans un onglet, avec une colonne `statut` pour le suivi.
2. **E-mail via Resend** : créez un compte, vérifiez votre domaine, créez une clé API, renseignez `RESEND_API_KEY`, `NOTIFY_EMAIL_TO` et `NOTIFY_EMAIL_FROM`.
3. **Les deux** : recommandé (tableur pour le suivi + e-mail pour réagir vite). Une demande est acceptée si au moins un canal l’a bien reçue.
4. **Outil d’automatisation ou CRM** (Make, n8n, Zapier, Brevo…) : utilisez son URL de webhook dans `FORM_WEBHOOK_URL`.

Format JSON envoyé au webhook :

```json
{
  "id": "a1b2c3d4",
  "kind": "individu | opportunite | soutien | mur",
  "received_at": "2026-10-19T08:00:00.000Z",
  "data": { "prenom": "…", "email": "…", "objectifs": ["emploi"], "consent": true },
  "meta": { "utm_campaign": "cv-expire", "utm_source": "affiche", "landing": "/expire" },
  "secret": "…"
}
```

Pensez à indiquer les outils réellement utilisés dans la politique de confidentialité.

---

## 6. QR codes, affiches et mesure

- Chaque affiche pointe vers une adresse courte `https://VOTRE-SITE/q/<code>`, définie dans `src/config/campaigns.ts`.
- À chaque scan, le serveur redirige vers la bonne page avec les paramètres UTM et :
  - si un webhook est configuré, l’envoie aussi (par ex. onglet **`qr_scan`** d’une feuille Google — aucune donnée personnelle, seulement le code, la campagne et la date) ;
  - écrit aussi `{"event":"qr_scan","code":"cv",…}` dans les journaux de l’hébergeur (Vercel : *Logs* ; Render : *Logs*). Ces journaux gratuits ne sont conservés que peu de temps.
- Relevez les chiffres chaque semaine dans le tableau de bord (`docs/tableau-de-bord.csv`).
- La campagne d’origine est jointe à chaque formulaire (`meta.utm_campaign`) : on sait quelle affiche a produit quelle inscription.
- Chaque envoi réussi écrit aussi `{"event":"form_submitted","kind":…,"utm_campaign":…}` dans les journaux, sans donnée personnelle.
- Si Plausible ou Umami est activé, les événements `CTA` (clic sur un bouton, avec son identifiant), `Formulaire commencé`, `Inscription`, `Erreur formulaire` et `Partage` sont envoyés automatiquement.

**Imprimer les affiches :** ouvrez `https://VOTRE-SITE/affiches` (page non référencée), cliquez sur « Imprimer les affiches » (A4 portrait, marges « aucune », graphiques d’arrière-plan activés). Les QR codes utilisent `SITE_URL` : vérifiez-la avant d’imprimer et scannez chaque affiche avec un téléphone.

**Nouveau lieu d’affichage :** dupliquez une ligne dans `campaigns.ts` avec un code unique (ex. `moi-cafe-du-marche`), ajoutez une affiche correspondante dans `posters.ts`, et redéployez.

---

## 7. Ajouter une langue (allemand, italien)

L’architecture est prête, mais **aucune traduction automatique n’a été publiée** : chaque langue doit être rédigée ou relue par une personne de langue maternelle.

1. Copiez `src/content/fr.ts` en `src/content/de.ts` et traduisez les textes.
2. Créez `src/pages/de/index.astro` sur le modèle de `src/pages/index.astro`, en important `de` au lieu de `fr` (les sections prendront alors le contenu en paramètre : petite adaptation à prévoir par un·e développeur·se).
3. Ajoutez `'de'` dans `locales` (`astro.config.mjs`), passez `ready: true` pour `de` dans `src/config/site.ts`, et ajoutez `/de/` dans `src/pages/sitemap.xml.ts`.

---

## 8. Qualité

- `npm test` vérifie : pages et liens, ancres internes, redirections QR, formulaires (erreurs, succès, sans JavaScript, robots, refus honnête si non configuré), navigation clavier et mobile, absence de défilement horizontal de 320 à 1440 px, taille des boutons, accessibilité WCAG 2.1 AA (axe).
- GitHub Actions lance ces vérifications à chaque modification (`.github/workflows/ci.yml`).
