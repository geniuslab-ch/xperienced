# Cadre juridique des mandats — points à faire vérifier avant le lancement

> **Ce document n’est pas un avis juridique.** Il liste les questions que le modèle « mandats et missions rémunérées » soulève en droit suisse, pour qu’une personne compétente (avocat·e, fiduciaire, caisse de compensation AVS, office cantonal de l’emploi de Genève) les vérifie **avant** de rendre le site public. Les sources consultées sont citées ; elles peuvent avoir évolué.

## Le principe à retenir

**Appeler une mission « mandat » ne change pas sa nature juridique.** En Suisse, ce sont les conditions réelles qui comptent :

- en **droit des assurances sociales**, la caisse de compensation AVS décide au cas par cas si une activité est indépendante ou salariée, selon la réalité économique et non selon le contrat ;
- en **droit civil**, un contrat de travail (art. 319 ss CO) peut exister même si les parties ont écrit « mandat » (art. 394 ss CO), dès qu’il y a notamment un lien de subordination, une intégration dans l’organisation et une rémunération liée au temps.

Indices retenus par les caisses AVS (source : WEKA, caisses de compensation) : travailler pour un seul mandant est généralement considéré comme une activité salariée ; le droit de donner des instructions, l’obligation d’exécuter personnellement, l’obligation de présence et la clause de non-concurrence indiquent une subordination. Pour d’anciens collaborateurs devenus « freelances », l’OFAS applique des exigences plus strictes. En cas de requalification, les cotisations paritaires sont réclamées après coup — au mandant, devenu employeur.

**Ce que fait le site :** une section « Un cadre clair » explique la différence ; l’emploi salarié et le bénévolat sont des options distinctes ; le formulaire « Je propose un mandat » distingue « honoraires (mandat indépendant) » et « salaire (emploi) » et demande au mandant de confirmer avoir pris connaissance du cadre.

## Points à vérifier

| # | Question | Pourquoi c’est important | Auprès de qui |
|---|----------|--------------------------|---------------|
| 1 | **Xperienced fait-il du « placement privé » au sens de la LSE ?** | Le placement privé exercé **régulièrement et contre rémunération** exige une autorisation cantonale (et du SECO pour le placement transfrontalier). Selon l’État de Genève, la régularité est retenue dès qu’une démarche manifeste la volonté d’offrir ses services, ou à partir de 10 placements en 12 mois. Aujourd’hui le service est gratuit pour les personnes 50+ ; **si Xperienced facture un jour les mandants (commission, abonnement, frais), une autorisation sera probablement nécessaire**, même pour des emplois proposés en option. Le placement de mandats indépendants (hors contrat de travail) est-il concerné ? À faire confirmer. | Office cantonal de l’emploi (OCE) Genève, service du placement privé ; SECO |
| 2 | **Location de services** | Si Xperienced devait un jour employer des personnes pour les mettre à disposition de mandants, ce serait de la location de services (autorisation, caution, CCT). **Le modèle actuel l’exclut** : le contrat est conclu directement entre la personne et le mandant. Ne pas facturer les missions « via » Xperienced sans avis juridique. | OCE Genève, SECO |
| 3 | **Statut d’indépendant des personnes 50+** | Une personne qui n’est pas reconnue indépendante par sa caisse AVS ne peut pas facturer des honoraires sans risque de requalification. Le statut ne peut être demandé que pour une activité déjà exercée. Que conseiller concrètement à une personne qui commence ? | Caisse cantonale genevoise de compensation (CCGC), fiduciaire |
| 4 | **Responsabilité du mandant** | En cas de requalification en emploi, le mandant doit les cotisations sociales (AVS/AI/APG/AC, éventuellement LAA, LPP). Faut-il un modèle de contrat de mandat, ou une fiche d’information à remettre aux mandants ? | Avocat·e ou fiduciaire |
| 5 | **Particuliers** | L’aide régulière au domicile d’un particulier (ménage, jardinage, garde, soins) est en règle générale un **emploi** : le particulier devient employeur (cotisations, assurance accidents). Le site le signale ; à Genève, il existe un dispositif simplifié pour les employeurs domestiques (Chèque service) — à vérifier et à mentionner si pertinent. Faut-il exclure certains types de besoins des particuliers ? | CCGC, Chèque service Genève |
| 6 | **Personnes au chômage** | Tout revenu (salaire ou honoraires) doit être déclaré à la caisse de chômage ; une activité indépendante peut influencer l’aptitude au placement et le droit aux indemnités. Le site le dit sans entrer dans le détail : formulation à faire valider. | Caisse de chômage, OCE |
| 7 | **Personnes à la retraite** | Les retraité·e·s actifs/actives cotisent à l’AVS au-delà d’une franchise de CHF 16 800 par an (CHF 1 400 par mois), inchangée en 2026 selon BDO, avec possibilité d’y renoncer depuis 2024. Le site mentionne « une franchise annuelle » sans montant : à confirmer avant d’afficher un chiffre. | Caisse AVS |
| 8 | **Permis de travail** | Les personnes sans nationalité suisse ou UE/AELE doivent avoir un permis qui autorise l’activité (salariée ou indépendante). | Office cantonal de la population et des migrations (OCPM) |
| 9 | **TVA, impôts** | Les honoraires sont des revenus imposables ; la TVA devient obligatoire au-delà d’un certain chiffre d’affaires. Information à donner aux personnes, pas à gérer par Xperienced. | Administration fiscale, AFC |
| 10 | **Forme juridique de Xperienced** | Association au sens des art. 60 ss CC ? Inscription au registre du commerce (obligatoire seulement si l’association exerce une activité commerciale) ? Utile aussi pour les points 1 et 2. | Registre du commerce de Genève |
| 11 | **Protection des données** | Les formulaires sont enregistrés dans Supabase. Confirmer la région du projet (Zurich = Suisse ; sinon autre pays), accepter le DPA de Supabase et de Vercel, et compléter la politique de confidentialité. Voir `docs/PROTECTION-DES-DONNEES.md`. | Délégué·e ou conseil en protection des données |

## Formulations du site à faire relire

- Section « Un cadre clair » (`src/content/fr.ts`, bloc `cadre`).
- FAQ : « Dois-je être indépendant·e… », « Je suis au chômage ou à la retraite… », « Xperienced est-il un employeur ou une agence de placement ? ».
- Case à cocher du formulaire « Je propose un mandat » (`src/components/forms/OpportunityForm.astro`).

## Sources consultées (octobre 2026)

- État de Genève, présentation du placement privé : https://www.ge.ch/document/39359/telecharger
- Canton de Fribourg, le placement privé : https://www.fr.ch/travail-et-entreprises/entreprises/le-placement-prive
- SECO, directives LSE : https://www.secoalv.admin.ch/dam/secoalv/fr/dokumente/publikationen/arbeitsvermittlung-personalverleih/weisungen-avg/pav_weisungen_avg_f.pdf.download.pdf/pav_weisungen_avg_f.pdf
- WEKA, assurances sociales et indépendance : https://www.weka.ch/themes/ressources-humaines/assurances-sociales/assurances-et-cotisations/article/assurances-sociales-et-independance-cotisations/
- WEKA, contrôle AVS et rappels de cotisations : https://www.weka.ch/themes/ressources-humaines/assurances-sociales/assurances-et-cotisations/article/controle-avs-comment-eviter-les-rappels-de-cotisations/
- BDO, contributions et prestations 2026 : https://asc.bdo.ch/getmedia/6345031e-e276-40d0-a564-af524f65c640/Contributions-et-prestations-2026.pdf
