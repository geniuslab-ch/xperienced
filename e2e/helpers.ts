import { readFile } from 'node:fs/promises';
import type { Page } from '@playwright/test';

/** Le formulaire refuse les envois faits en moins de 3 s (anti-robots) : on simule un humain. */
export async function ageForms(page: Page) {
  await page.evaluate(() => document.querySelectorAll<HTMLInputElement>('input[name="ts"]').forEach((i) => (i.value = String(Date.now() - 10_000))));
}

export async function lastSubmission(): Promise<any> {
  const raw = await readFile('.data/submissions.jsonl', 'utf8').catch(() => '');
  const lines = raw.trim().split('\n').filter(Boolean);
  return lines.length ? JSON.parse(lines[lines.length - 1]) : null;
}
