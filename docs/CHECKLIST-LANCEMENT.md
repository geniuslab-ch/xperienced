# Checklist de lancement

## ✅ Prêt

- Positionnement « Mandats et missions rémunérées » : accroche, navigation, deux portes d’entrée « Je cherche un mandat » / « Je propose un mandat », 5 types de mandats, emploi salarié et bénévolat en options distinctes.
- Section « Un cadre clair » (mandat indépendant ou emploi) + FAQ honnête (statut, chômage, retraite, rôle de Xperienced).
- Formulaires : personnes 50+ (types de mandats, situation), mandants (entreprise, association, commune, particulier ; honoraires / salaire / bénévolat ; confirmation du cadre obligatoire), soutien, mur de l’expérience.
- **Enregistrement dans Supabase** (une table par formulaire + scans QR), côté serveur uniquement, testé avec un faux serveur Supabase. Notification e-mail Infomaniak en option.
- Le site refuse honnêtement les envois tant qu’aucun canal n’est configuré (aucune fausse confirmation).
- QR codes traçables, affiches à jour (`/affiches`), page de campagne `/expire`, partage et recommandation.
- Mentions légales, confidentialité, bas de page (Xperienced, Genève, N. Schärer), réseaux sociaux masqués.
- SEO, accessibilité WCAG 2.1 AA (tests automatiques), mobile 320–1440 px, une cinquantaine de tests automatiques.

## ⚙️ À configurer (avant de rendre public)

- [ ] **Supabase** : exécuter `supabase/schema.sql` dans le SQL Editor ; ajouter `SUPABASE_SECRET_KEY` dans Vercel ; redéployer ; vérifier `/api/health` → `"supabase": true` ; tester chaque formulaire.
- [ ] **Région Supabase** : la noter dans `supabaseRegion` (`src/config/site.ts`). Tant qu’elle manque, la politique de confidentialité affiche « [À confirmer] ».
- [ ] **Notifications** (recommandé) : variables `SMTP_*` + `NOTIFY_EMAIL_TO` (messagerie Infomaniak).
- [ ] **DPA** : accepter les accords de traitement des données de Supabase et de Vercel.
- [ ] **Vercel** : branche de production, offre Hobby (usage non commercial) à confirmer ou passer à Pro.
- [ ] **Adresse définitive** (`SITE_URL` / domaine) **avant** d’imprimer les affiches ; scanner chaque QR code.

## ⚖️ À faire vérifier juridiquement (voir `docs/CADRE-JURIDIQUE-MANDATS.md`)

- [ ] **LSE / placement privé** : autorisation nécessaire ? Surtout si Xperienced facture un jour les mandants.
- [ ] **Indépendance** : comment orienter les personnes qui ne sont pas encore reconnues indépendantes par leur caisse AVS.
- [ ] **Particuliers** : aide au domicile = en principe emploi (cotisations) ; règles et dispositifs genevois.
- [ ] **Chômage et retraite** : formulations du site à valider (franchise AVS, déclaration des gains).
- [ ] **Forme juridique** de Xperienced (statuts, éventuelle inscription au registre du commerce).
- [ ] Relecture de la section « Un cadre clair », de la FAQ et de la case à cocher du formulaire mandant.

## ✍️ Informations encore manquantes

- [ ] Adresse e-mail de contact publique (sinon, contact via le formulaire).
- [ ] Durée de conservation des données (24 mois par défaut) à confirmer.
- [ ] Liens réseaux sociaux (la rubrique réapparaît automatiquement).
- [ ] Plus tard : vrais mandats, vraies histoires, vraies phrases du mur — **jamais inventés**, toujours avec accord écrit.

## Rappels

- Ne publier que des mandats réellement proposés, décrits tels qu’ils sont (rémunération, durée, nature).
- Afficher uniquement avec l’autorisation des lieux.
- Recontacter chaque inscrit·e : c’est la promesse la plus importante.
