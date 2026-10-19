-- =============================================================================
-- Xperienced — tables Supabase pour les formulaires du site
--
-- À exécuter UNE fois : Supabase › SQL Editor › New query › coller ce fichier › Run.
-- (Ré-exécutable sans risque : « if not exists ».)
--
-- Sécurité : la sécurité au niveau des lignes (RLS) est activée SANS aucune règle
-- publique. Personne ne peut lire ni écrire ces tables avec la clé publique (anon).
-- Seul le serveur du site, avec la clé secrète (variable SUPABASE_SECRET_KEY,
-- jamais envoyée au navigateur), peut y insérer des lignes.
-- Les noms de colonnes correspondent aux champs des formulaires (src/lib/forms.ts).
-- =============================================================================

-- Personnes de 50 ans et plus qui cherchent un mandat (formulaire « Je cherche un mandat »)
create table if not exists public.candidats (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  public_id     text,
  suivi         text not null default 'nouveau',   -- à mettre à jour à la main : contacté, mis en relation…
  prenom        text not null,
  contact_pref  text,
  email         text,
  telephone     text,
  region        text,
  objectifs     text[],                             -- conseil, mission, administratif, mentorat, projet, emploi, benevolat
  competences   text,
  situation     text,
  disponibilite text,
  source        text,
  consent       boolean not null default false,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  ref           text,
  landing       text
);

-- Mandats proposés par des entreprises, associations, communes ou particuliers
create table if not exists public.mandats_proposes (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  public_id        text,
  suivi            text not null default 'nouveau', -- à vérifier, confirmé, pourvu, abandonné…
  type_org         text,
  organisation     text not null,
  contact_nom      text,
  email            text,
  telephone        text,
  type_opportunite text,
  description      text,
  competences      text,
  lieu             text,
  engagement       text,
  statut           text,                            -- honoraires, salaire, non-remunere, a-definir
  remuneration     text,
  distance         boolean,
  infos            text,
  cadre_ok         boolean not null default false,
  source           text,
  consent          boolean not null default false,
  utm_source       text,
  utm_medium       text,
  utm_campaign     text,
  ref              text,
  landing          text
);

-- Propositions de soutien et de partenariat
create table if not exists public.soutiens (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  public_id    text,
  suivi        text not null default 'nouveau',
  nom          text not null,
  email        text,
  facons       text[],
  message      text,
  source       text,
  consent      boolean not null default false,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  ref          text,
  landing      text
);

-- Mur de l'expérience (à publier seulement si publication = true, après relecture)
create table if not exists public.mur (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  public_id    text,
  publie       boolean not null default false,      -- cocher après relecture et publication sur le site
  phrase       text not null,
  signature    text,
  email        text,
  publication  boolean not null default false,      -- accord de publication donné par l'auteur·e
  consent      boolean not null default false,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  ref          text,
  landing      text
);

-- Scans des QR codes des affiches (aucune donnée personnelle)
create table if not exists public.qr_scans (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  code       text not null,
  campagne   text
);

alter table public.candidats        enable row level security;
alter table public.mandats_proposes enable row level security;
alter table public.soutiens         enable row level security;
alter table public.mur              enable row level security;
alter table public.qr_scans         enable row level security;

-- Vue pratique pour le tableau de bord : nombre de scans par affiche et par semaine.
create or replace view public.qr_scans_par_semaine
with (security_invoker = true) as
  select date_trunc('week', created_at)::date as semaine, code, campagne, count(*) as scans
  from public.qr_scans
  group by 1, 2, 3
  order by 1 desc, 4 desc;
