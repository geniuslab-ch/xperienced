import { test, expect } from '@playwright/test';

test('la page d’accueil se charge sans erreur et porte le message principal', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('L’expérience n’a pas de date de');
  await expect(page).toHaveTitle(/Xperienced/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /50 ans/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr-CH');
  expect(errors).toEqual([]);
});

test('chaque lien interne (#ancre) pointe vers une section existante', async ({ page }) => {
  await page.goto('/');
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')]
      .map((a) => new URL(a.href))
      .filter((u) => u.pathname === '/' && u.hash)
      .map((u) => u.hash.slice(1))
      .filter((id) => !document.getElementById(id)),
  );
  expect(missing).toEqual([]);
});

for (const path of ['/', '/expire', '/confidentialite', '/mentions-legales', '/affiches', '/merci', '/sitemap.xml', '/robots.txt', '/og.png', '/favicon.svg']) {
  test(`${path} répond 200`, async ({ request }) => {
    expect((await request.get(path)).status()).toBe(200);
  });
}

test('une page inconnue renvoie 404', async ({ request }) => {
  expect((await request.get('/nexiste-pas')).status()).toBe(404);
});

test('les pages internes ne sont pas indexées', async ({ page }) => {
  for (const path of ['/affiches', '/merci']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  }
});

test('les QR codes redirigent avec les paramètres de campagne', async ({ request }) => {
  const res = await request.get('/q/cv', { maxRedirects: 0 });
  expect(res.status()).toBe(302);
  expect(res.headers().location).toBe('/expire?utm_source=affiche&utm_medium=qr&utm_campaign=cv-expire');
  const unknown = await request.get('/q/inconnu', { maxRedirects: 0 });
  expect(unknown.headers().location).toBe('/');
});

test('le point de santé n’expose aucun secret', async ({ request }) => {
  const body = await (await request.get('/api/health')).json();
  expect(body.ok).toBe(true);
  expect(Object.values(body.forms).every((v) => typeof v === 'boolean')).toBe(true);
});

test('les affiches contiennent un QR code par campagne', async ({ page }) => {
  await page.goto('/affiches');
  expect(await page.locator('.qr svg').count()).toBeGreaterThanOrEqual(7);
});
