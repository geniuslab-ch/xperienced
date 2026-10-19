-- =============================================================================
-- OPTION — à n'utiliser QUE si vous ne pouvez pas utiliser la clé secrète.
--
-- Par défaut (schema.sql), seules les requêtes faites avec la clé SECRÈTE
-- (sb_secret_…) peuvent écrire. Ce fichier autorise aussi la clé PUBLIQUE
-- (sb_publishable_…) à AJOUTER des lignes — jamais à les lire, les modifier ni
-- les supprimer.
--
-- Inconvénient : la clé publique n'est pas secrète. N'importe qui pourrait
-- ajouter des lignes directement dans vos tables, sans passer par les contrôles
-- du site (anti-robots, limite d'envois). Les règles ci-dessous limitent ce
-- risque (consentement obligatoire, textes de longueur raisonnable), sans
-- l'éliminer. La clé secrète reste la solution recommandée.
--
-- Pour revenir en arrière : drop policy "insert_public" on public.<table>;
-- =============================================================================

create policy "insert_public" on public.candidats for insert to anon
  with check (consent and length(prenom) <= 60 and length(coalesce(competences, '')) <= 800);

create policy "insert_public" on public.mandats_proposes for insert to anon
  with check (consent and cadre_ok and length(organisation) <= 120 and length(coalesce(description, '')) <= 1500);

create policy "insert_public" on public.soutiens for insert to anon
  with check (consent and length(nom) <= 100 and length(coalesce(message, '')) <= 1000);

create policy "insert_public" on public.mur for insert to anon
  with check (consent and publication and publie = false and length(phrase) <= 280);

create policy "insert_public" on public.qr_scans for insert to anon
  with check (length(code) <= 40);

grant insert on public.candidats, public.mandats_proposes, public.soutiens, public.mur, public.qr_scans to anon;
