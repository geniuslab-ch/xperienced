import { defineConfig, devices } from '@playwright/test';

// Serveurs de test : « développement » (envois écrits dans .data/), « production sans
// configuration » (le site doit refuser honnêtement) et « production + Supabase » (faux Supabase).
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
    {
      command: 'node e2e/mock-supabase.mjs',
      url: 'http://127.0.0.1:4340/__requests',
      reuseExistingServer: false,
    },
    {
      command: 'PORT=4332 HOST=127.0.0.1 node dist/server/entry.mjs',
      url: 'http://127.0.0.1:4332/api/health',
      reuseExistingServer: false,
      timeout: 120_000,
      env: { NODE_ENV: 'production', SUPABASE_URL: 'http://127.0.0.1:4340', SUPABASE_SECRET_KEY: 'test-secret' },
    },
  ],
});
