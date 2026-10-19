import { test, expect } from '@playwright/test';

test('navigation : menu (mobile) ou liens (desktop) mènent aux sections', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const toggle = page.getByRole('button', { name: 'Menu' });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page.locator('#menu').getByRole('link', { name: 'Proposer un mandat' }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page.getByRole('navigation', { name: 'Navigation principale' }).getByRole('link', { name: 'Proposer un mandat' }).click();
  }
  await expect(page).toHaveURL(/#mandants$/);
  await expect(page.locator('#mandants')).toBeInViewport();
});

test('le lien d’évitement permet d’aller directement au contenu', async ({ page, isMobile }) => {
  test.skip(isMobile, 'clavier');
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
});

test('la FAQ s’ouvre au clavier', async ({ page, isMobile }) => {
  test.skip(isMobile, 'clavier');
  await page.goto('/');
  const first = page.locator('#faq summary').first();
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#faq details').first()).toHaveAttribute('open', '');
});

test('le bouton « Copier le lien » produit un lien de recommandation traçable', async ({ page, context, isMobile }) => {
  test.skip(isMobile, 'presse-papiers');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copier le lien' }).click();
  await expect(page.locator('[data-share-status]')).toContainText('Lien copié');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('utm_source=recommandation');
  expect(copied).toContain('ref=ami');
  await expect(page.locator('[data-share-channel="whatsapp"]')).toHaveAttribute('href', /wa\.me\/\?text=/);
});
