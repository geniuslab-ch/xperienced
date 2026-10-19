import { defineConfig, devices } from '@playwright/test';

// Deux serveurs : l'un « développement » (les envois sont écrits dans .data/),
// l'autre « production sans configuration » (le site doit refuser honnêtement).
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4330', contextOptions: { reducedMotion: 'reduce' } },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /responsive|navigation/ },
  ],
  webServer: [
    {
      command: 'npm run build && PORT=4330 HOST=127.0.0.1 node dist/server/entry.mjs',
      url: 'http://127.0.0.1:4330/api/health',
      reuseExistingServer: false,
      timeout: 120_000,
      env: { NODE_ENV: 'test' },
    },
    {
      command: 'PORT=4331 HOST=127.0.0.1 node dist/server/entry.mjs',
      url: 'http://127.0.0.1:4331/api/health',
      reuseExistingServer: false,
      timeout: 120_000,
      env: { NODE_ENV: 'production', FORM_WEBHOOK_URL: '', RESEND_API_KEY: '' },
    },
  ],
});
