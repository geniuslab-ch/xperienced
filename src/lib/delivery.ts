/**
 * Transmission des formulaires.
 *
 * Deux canaux, activés par des variables d'environnement (jamais dans le code) :
 *  1. FORM_WEBHOOK_URL  → envoi JSON vers un webhook (Google Sheets via Apps Script,
 *     Make, n8n, Zapier, un CRM…). Optionnel : FORM_WEBHOOK_SECRET, transmis dans
 *     l'en-tête « X-Xperienced-Secret » pour que le destinataire vérifie l'origine.
 *  2. RESEND_API_KEY + NOTIFY_EMAIL_TO (+ NOTIFY_EMAIL_FROM) → e-mail de notification
 *     à l'équipe via Resend.
 *
 * Si aucun canal n'est configuré :
 *  - en développement, les envois sont écrits dans .data/submissions.jsonl ;
 *  - en production, le serveur répond honnêtement « non configuré » (503) :
 *    le site ne fait jamais croire qu'une demande a été reçue.
 */
import { appendFile, mkdir } from 'node:fs/promises';
import { KIND_LABELS, type FormKind } from './forms';

export type Submission = {
  id: string;
  kind: FormKind;
  received_at: string;
  data: Record<string, unknown>;
  meta: Record<string, string>;
};

const env = (k: string) => process.env[k]?.trim() || '';

export function channels() {
  return {
    webhook: Boolean(env('FORM_WEBHOOK_URL')),
    email: Boolean(env('RESEND_API_KEY') && env('NOTIFY_EMAIL_TO')),
    devFile: process.env.NODE_ENV !== 'production' && !env('FORM_WEBHOOK_URL') && !env('RESEND_API_KEY'),
  };
}

export function isConfigured() {
  const c = channels();
  return c.webhook || c.email || c.devFile;
}

async function toWebhook(s: Submission) {
  const res = await fetch(env('FORM_WEBHOOK_URL'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(env('FORM_WEBHOOK_SECRET') ? { 'x-xperienced-secret': env('FORM_WEBHOOK_SECRET') } : {}),
    },
    body: JSON.stringify({ ...s, secret: env('FORM_WEBHOOK_SECRET') || undefined }),
    signal: AbortSignal.timeout(10_000),
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
}

function escapeHtml(v: string) {
  return v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function render(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'oui' : 'non';
  return String(value ?? '');
}

async function toEmail(s: Submission) {
  const rows = [...Object.entries(s.data), ...Object.entries(s.meta)]
    .filter(([, v]) => render(v) !== '')
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(k)}</th><td style="padding:4px 0">${escapeHtml(render(v)).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');
  const replyTo = typeof s.data.email === 'string' && s.data.email ? s.data.email : undefined;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env('RESEND_API_KEY')}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env('NOTIFY_EMAIL_FROM') || 'Xperienced <onboarding@resend.dev>',
      to: env('NOTIFY_EMAIL_TO').split(',').map((x) => x.trim()),
      reply_to: replyTo,
      subject: `[Xperienced] ${KIND_LABELS[s.kind]} · ${s.id}`,
      html: `<h2 style="font-family:sans-serif">${escapeHtml(KIND_LABELS[s.kind])}</h2><p style="font-family:sans-serif">Reçu le ${escapeHtml(s.received_at)}</p><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
}

async function toDevFile(s: Submission) {
  await mkdir('.data', { recursive: true });
  await appendFile('.data/submissions.jsonl', JSON.stringify(s) + '\n', 'utf8');
}

/** Renvoie le nombre de canaux ayant reçu la demande. Lève une erreur si aucun n'a fonctionné. */
export async function deliver(s: Submission): Promise<number> {
  const c = channels();
  const jobs: Promise<void>[] = [];
  if (c.webhook) jobs.push(toWebhook(s));
  if (c.email) jobs.push(toEmail(s));
  if (c.devFile) jobs.push(toDevFile(s));
  const results = await Promise.allSettled(jobs);
  const ok = results.filter((r) => r.status === 'fulfilled').length;
  for (const r of results) {
    if (r.status === 'rejected') console.error(JSON.stringify({ event: 'delivery_error', id: s.id, error: String(r.reason) }));
  }
  if (!ok) throw new Error('no channel succeeded');
  return ok;
}
