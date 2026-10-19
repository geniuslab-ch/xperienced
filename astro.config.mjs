// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

// URL publique du site (utilisée pour le SEO, les QR codes et les liens de partage).
// À définir dans l'environnement : SITE_URL=https://www.xperienced.ch (exemple).
// Sur Vercel, à défaut, l'adresse de production du projet est utilisée automatiquement.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4321';

// Hébergement : Vercel (détecté automatiquement pendant le build Vercel) ou serveur Node
// autonome (développement, tests, Render ou tout autre hébergeur Node).
const adapter = process.env.VERCEL
  ? vercel()
  : node({ mode: 'standalone', bodySizeLimit: 64 * 1024 });

export default defineConfig({
  site,
  // Les pages sont pré-générées (rapides, statiques) ; seuls /api/* et /q/* tournent côté serveur.
  output: 'static',
  adapter,
  trailingSlash: 'ignore',
  i18n: {
    // Le français (Suisse romande) est la langue par défaut, servie à la racine.
    // Pour ajouter l'allemand ou l'italien : ajouter 'de' / 'it' ici, créer src/content/de.ts
    // et src/pages/de/index.astro (voir README, section « Ajouter une langue »).
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  // Pas de session ni de cookie d'authentification : la vérification d'origine (CSRF) n'apporte rien ici
  // et peut bloquer les envois derrière le proxy HTTPS de l'hébergeur.
  security: { checkOrigin: false },
});
