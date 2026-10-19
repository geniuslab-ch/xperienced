import { test, expect } from '@playwright/test';
import { ageForms } from './helpers';

const SITE = 'http://127.0.0.1:4332';
const MOCK = 'http://127.0.0.1:4340';
const inserts = async (request: any, table: string) =>
  ((await (await request.get(`${MOCK}/__requests`)).json()) as any[]).filter((r) => r.url === `/rest/v1/${table}`);

test('les formulaires sont enregistrés dans Supabase avec la clé secrète, côté serveur', async ({ page, request }) => {
  const secretSeenByBrowser: string[] = [];
  page.on('request', (r) => r.headers().apikey && secretSeenByBrowser.push(r.url()));

  await page.goto(`${SITE}/q/moi`);
  const form = page.locator('#form-individu');
  await form.getByLabel(/Votre prénom/).fill('Christine');
  await form.getByLabel(/Votre canton/).selectOption('Genève');
  await form.getByLabel(/^E-mail/).fill('christine@exemple.ch');
  await form.getByLabel(/Soutien administratif/).check();
  await form.getByLabel(/Un emploi salarié/).check();
  await form.getByLabel(/Votre expérience, en quelques mots/).fill('Logistique.');
  await form.getByLabel(/Votre situation actuelle/).selectOption('retraite');
  await form.getByLabel(/J’accepte que Xperienced/).check();
  await ageForms(page);
  await form.getByRole('button', { name: 'Envoyer mon profil' }).click();
  await expect(page.getByText('Merci, c’est noté.')).toBeVisible();

  const [row] = (await inserts(request, 'candidats')).slice(-1);
  expect(row.apikey).toBe('test-secret');
  expect(row.prefer).toBe('return=minimal');
  expect(row.body).toMatchObject({
    prenom: 'Christine',
    region: 'Genève',
    objectifs: ['administratif', 'emploi'],
    situation: 'retraite',
    telephone: null,
    consent: true,
    utm_campaign: 'micro-affiche-personnes',
  });
  expect(row.body.public_id).toMatch(/^[0-9a-f]{8}$/);
  expect(secretSeenByBrowser).toEqual([]);

  const scans = await inserts(request, 'qr_scans');
  expect(scans.at(-1)?.body).toEqual({ code: 'moi', campagne: 'micro-affiche-personnes' });
});

test('chaque formulaire va dans sa table', async ({ request }) => {
  const post = (fields: Record<string, string>) =>
    request.post(`${SITE}/api/submit`, { headers: { accept: 'application/json' }, multipart: { ...fields, consent: 'oui', ts: '1' } });
  expect((await post({ kind: 'soutien', nom: 'Fondation', email: 'f@exemple.ch', facons: 'financement' })).status()).toBe(200);
  expect((await post({ kind: 'mur', phrase: 'Écouter.', publication: 'oui' })).status()).toBe(200);
  expect((await post({
    kind: 'opportunite', type_org: 'entreprise', organisation: 'PME', contact_nom: 'A', email: 'a@exemple.ch',
    type_opportunite: 'conseil', description: 'Audit', lieu: 'Lausanne', statut: 'honoraires', cadre_ok: 'oui',
  })).status()).toBe(200);
  expect((await inserts(request, 'soutiens')).at(-1).body.facons).toEqual(['financement']);
  expect((await inserts(request, 'mur')).at(-1).body.publication).toBe(true);
  expect((await inserts(request, 'mandats_proposes')).at(-1).body.statut).toBe('honoraires');
});
