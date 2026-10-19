import { test, expect } from '@playwright/test';
import { ageForms, lastSubmission } from './helpers';

test('inscription : erreurs claires puis confirmation, avec la campagne d’origine', async ({ page }) => {
  await page.goto('/q/moi'); // arrive comme depuis la micro-affiche « personnes 50+ »
  await expect(page).toHaveURL(/utm_campaign=micro-affiche-personnes/);
  const form = page.locator('#form-individu');

  await form.getByRole('button', { name: 'Envoyer mon profil' }).click();
  await expect(form.locator('[data-error-for="prenom"]')).toHaveText('Ce champ est nécessaire.');
  await expect(form.locator('[data-error-for="objectifs"]')).toContainText('Cochez au moins');
  await expect(form.locator('[data-error-for="consent"]')).not.toBeEmpty();
  await expect(form.getByLabel(/Votre prénom/)).toBeFocused();
  await expect(form.getByLabel(/Votre prénom/)).toHaveAttribute('aria-invalid', 'true');

  await form.getByLabel(/Votre prénom/).fill('Christine');
  await form.getByLabel(/Votre canton/).selectOption('Vaud');
  await form.getByLabel(/^E-mail/).fill('pas-un-email');
  await form.getByLabel(/Un emploi/).check();
  await form.getByLabel(/Votre expérience, en quelques mots/).fill('Logistique, formation d’apprentis.');
  await form.getByLabel(/J’accepte que Xperienced/).check();
  await form.getByRole('button', { name: 'Envoyer mon profil' }).click();
  await expect(form.locator('[data-error-for="email"]')).toContainText('ne semble pas valide');

  await form.getByLabel(/^E-mail/).fill('christine@exemple.ch');
  await ageForms(page);
  await form.getByRole('button', { name: 'Envoyer mon profil' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Merci, c’est noté.' })).toBeVisible();

  const s = await lastSubmission();
  expect(s.kind).toBe('individu');
  expect(s.data.prenom).toBe('Christine');
  expect(s.data.objectifs).toEqual(['emploi']);
  expect(s.meta.utm_campaign).toBe('micro-affiche-personnes');
});

test('le choix « par téléphone » rend le numéro obligatoire', async ({ page }) => {
  await page.goto('/');
  const form = page.locator('#form-individu');
  await form.getByLabel('Par téléphone').check();
  await expect(form.getByLabel(/Téléphone/)).toHaveAttribute('required', '');
  await expect(form.getByLabel(/^E-mail/)).not.toHaveAttribute('required', '');
});

test('les types de mandats et les autres options pré-remplissent le formulaire', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Ça m’intéresse.*Missions courtes/ }).click();
  const form = page.locator('#form-individu');
  await expect(form.getByLabel(/Mission courte/)).toBeChecked();
  await expect(form.getByLabel(/Un emploi salarié/)).not.toBeChecked();
  await page.getByRole('link', { name: 'Je cherche un emploi salarié ou du bénévolat' }).click();
  await expect(form.getByLabel(/Un emploi salarié/)).toBeChecked();
  await expect(form.getByLabel(/Du bénévolat/)).toBeChecked();
  await expect(form.getByLabel(/Mission courte/)).not.toBeChecked();
});

test('les deux portes d’entrée mènent aux bons formulaires', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mandats').getByRole('link', { name: /Je cherche un mandat/ }).click();
  await expect(page).toHaveURL(/#inscription$/);
  await page.locator('#mandats').getByRole('link', { name: /Je propose un mandat/ }).click();
  await expect(page).toHaveURL(/#proposer$/);
  await expect(page.locator('#form-opportunite')).toBeInViewport();
});

test('mandant : proposition de mandat, préremplie depuis « Devenir partenaire »', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Devenir partenaire' }).first().click();
  const form = page.locator('#form-opportunite');
  await expect(form.getByLabel(/^Vous êtes/)).toHaveValue('association');
  await expect(form.getByLabel(/Type de besoin/)).toHaveValue('partenariat');

  await form.getByLabel(/^Vous êtes/).selectOption('particulier');
  await form.getByLabel(/Type de besoin/).selectOption('administratif');
  await form.getByLabel(/Nom de l’entreprise/).fill('Particulier');
  await form.getByLabel(/Personne de contact/).fill('Jean Exemple');
  await form.getByLabel(/^E-mail/).fill('jean@exemple.ch');
  await form.getByLabel(/honoraires \(mandat indépendant\)/).check();
  await form.getByLabel(/Description du mandat/).fill('Classer et numériser dix ans de documents administratifs.');
  await form.getByLabel(/^Lieu/).fill('Genève');
  await form.getByLabel(/J’accepte que Xperienced/).check();
  await form.getByRole('button', { name: 'Proposer ce mandat' }).click();
  await expect(form.locator('[data-error-for="cadre_ok"]')).toContainText('cadre');
  await form.getByLabel(/J’ai pris connaissance du/).check();
  await ageForms(page);
  await form.getByRole('button', { name: 'Proposer ce mandat' }).click();
  await expect(page.getByText('Merci pour votre proposition.')).toBeVisible();
  const s = await lastSubmission();
  expect(s.kind).toBe('opportunite');
  expect(s.data.type_org).toBe('particulier');
  expect(s.data.statut).toBe('honoraires');
  expect(s.data.cadre_ok).toBe(true);
});

test('soutien et mur de l’expérience', async ({ page }) => {
  await page.goto('/');
  const support = page.locator('#form-soutien');
  await support.getByLabel(/Nom ou organisation/).fill('Fondation Exemple');
  await support.getByLabel(/^E-mail/).fill('contact@exemple.ch');
  await support.getByLabel(/Relayer/).check();
  await support.getByLabel(/J’accepte que Xperienced/).check();
  await ageForms(page);
  await support.getByRole('button', { name: 'Envoyer ma proposition' }).click();
  await expect(page.getByText('Merci de votre soutien !')).toBeVisible();

  const wall = page.locator('#form-mur');
  await wall.getByLabel(/Ce que l’expérience m’a appris/).fill('Écouter avant de répondre.');
  await wall.getByLabel(/J’accepte que Xperienced traite/).check();
  await wall.getByRole('button', { name: 'Ajouter ma phrase' }).click();
  await expect(wall.locator('[data-error-for="publication"]')).toContainText('Sans votre accord');
  await wall.getByLabel(/J’accepte que ma phrase/).check();
  await ageForms(page);
  await wall.getByRole('button', { name: 'Ajouter ma phrase' }).click();
  await expect(page.getByText('Merci pour cette phrase.')).toBeVisible();
  expect((await lastSubmission()).kind).toBe('mur');
});

test('sans JavaScript, le formulaire fonctionne et mène à la page de confirmation', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL: 'http://127.0.0.1:4330' });
  const page = await ctx.newPage();
  await page.goto('/');
  const form = page.locator('#form-soutien');
  await form.getByLabel(/Nom ou organisation/).fill('Sans JS');
  await form.getByLabel(/^E-mail/).fill('sansjs@exemple.ch');
  await form.getByLabel(/Relayer/).check();
  await form.getByLabel(/J’accepte que Xperienced/).check();
  await form.getByRole('button', { name: 'Envoyer ma proposition' }).click();
  await expect(page).toHaveURL(/\/merci\?type=soutien/);
  expect((await lastSubmission()).data.nom).toBe('Sans JS');
  await ctx.close();
});

test('un robot (champ caché rempli) n’est pas enregistré', async ({ request }) => {
  const before = await lastSubmission();
  const res = await request.post('/api/submit', {
    headers: { accept: 'application/json', origin: 'http://127.0.0.1:4330' },
    multipart: { kind: 'soutien', nom: 'Bot', email: 'bot@exemple.ch', facons: 'autre', consent: 'oui', website: 'http://spam', ts: '1' },
  });
  expect(res.status()).toBe(200);
  expect((await lastSubmission())?.id).toBe(before?.id);
});

test('en production sans intégration configurée, le site ne prétend pas avoir reçu la demande', async ({ page }) => {
  await page.goto('http://127.0.0.1:4331/');
  const form = page.locator('#form-soutien');
  await form.getByLabel(/Nom ou organisation/).fill('Test');
  await form.getByLabel(/^E-mail/).fill('test@exemple.ch');
  await form.getByLabel(/Relayer/).check();
  await form.getByLabel(/J’accepte que Xperienced/).check();
  await ageForms(page);
  await form.getByRole('button', { name: 'Envoyer ma proposition' }).click();
  await expect(form.locator('[data-form-status]')).toContainText('pas encore activé');
  await expect(page.getByText('Merci de votre soutien !')).toHaveCount(0);
});
