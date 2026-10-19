// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// URL publique du site (utilisée pour le SEO, les QR codes et les liens de partage).
// À définir dans l'environnement : SITE_URL=https://www.xperienced.ch (exemple)
const site = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site,
  // Les pages sont pré-générées (rapides, statiques) ; seuls /api/* et /q/* tournent côté serveur.
  output: 'static',
  adapter: node({ mode: 'standalone', bodySizeLimit: 64 * 1024 }),
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
