import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`aucun défilement horizontal à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/expire', '/confidentialite']) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

test('les boutons principaux sont assez grands pour être touchés (≥ 44 px)', async ({ page }) => {
  await page.goto('/');
  const sizes = await page.$$eval('.btn', (els) =>
    els.filter((e) => (e as HTMLElement).offsetParent).map((e) => e.getBoundingClientRect().height),
  );
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(44);
});
