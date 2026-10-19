/**
 * Transmission des formulaires.
 *
 * Canaux, activés par des variables d'environnement (jamais dans le code) :
 *  ★ SUPABASE_SECRET_KEY (+ SUPABASE_URL) → base de données Supabase : chaque formulaire
 *     devient une ligne dans sa table (voir supabase/schema.sql). C'est la base de référence.
 *  0. SMTP_HOST + SMTP_USER + SMTP_PASS + NOTIFY_EMAIL_TO → e-mail via un serveur SMTP.
 *     Recommandé : Infomaniak (mail.infomaniak.com), données stockées en Suisse.
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
import nodemailer from 'nodemailer';
import { KIND_LABELS, type FormKind } from './forms';

export type Submission = {
  id: string;
  kind: FormKind;
  received_at: string;
  data: Record<string, unknown>;
  meta: Record<string, string>;
};

/** Scan de QR code transmis au webhook (même forme qu'un formulaire, sans données personnelles). */
type ScanEvent = Omit<Submission, 'kind'> & { kind: 'qr_scan' };

const env = (k: string) => process.env[k]?.trim() || '';

/** Projet Supabase de Xperienced (l'URL n'est pas secrète ; la clé, elle, l'est). */
const DEFAULT_SUPABASE_URL = 'https://tdmlanvywfbzqjlzzqxu.supabase.co';
const supabaseUrl = () => (env('SUPABASE_URL') || DEFAULT_SUPABASE_URL).replace(/\/+$/, '');
const supabaseKey = () => env('SUPABASE_SECRET_KEY') || env('SUPABASE_SERVICE_ROLE_KEY');

/** Une table par formulaire. */
export const SUPABASE_TABLES: Record<FormKind, string> = {
  individu: 'candidats',
  opportunite: 'mandats_proposes',
  soutien: 'soutiens',
  mur: 'mur',
};

export function channels() {
  return {
    supabase: Boolean(supabaseKey()),
    smtp: Boolean(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS') && env('NOTIFY_EMAIL_TO')),
    webhook: Boolean(env('FORM_WEBHOOK_URL')),
    email: Boolean(env('RESEND_API_KEY') && env('NOTIFY_EMAIL_TO')),
    devFile: process.env.NODE_ENV !== 'production' && !env('FORM_WEBHOOK_URL') && !env('RESEND_API_KEY') && !env('SMTP_HOST') && !supabaseKey(),
  };
}

export function isConfigured() {
  const c = channels();
  return c.supabase || c.smtp || c.webhook || c.email || c.devFile;
}

/** Insère une ligne via l'API REST de Supabase, avec la clé secrète (côté serveur uniquement). */
async function supabaseInsert(table: string, row: Record<string, unknown>, timeout = 10_000) {
  const key = supabaseKey();
  const headers: Record<string, string> = {
    apikey: key,
    'content-type': 'application/json',
    prefer: 'return=minimal',
  };
  // Les anciennes clés « service_role » sont des JWT et doivent aussi être passées en Bearer.
  if (key.startsWith('eyJ')) headers.authorization = `Bearer ${key}`;
  const res = await fetch(`${supabaseUrl()}/rest/v1/${table}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(timeout),
  });
  if (!res.ok) {
    // On ne journalise que le code et le message d'erreur : le champ « details » de Supabase
    // peut contenir la ligne refusée, donc des données personnelles.
    const body = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
    throw new Error(`supabase ${table} ${res.status} ${body.code ?? ''} ${body.message ?? ''}`.trim());
  }
}

async function toSupabase(s: Submission) {
  const row: Record<string, unknown> = { public_id: s.id, created_at: s.received_at };
  for (const [k, v] of Object.entries(s.data)) row[k] = v === '' ? null : v;
  for (const [k, v] of Object.entries(s.meta)) row[k] = v;
  await supabaseInsert(SUPABASE_TABLES[s.kind], row);
}

async function toWebhook(s: Submission | ScanEvent, timeout = 10_000) {
  const res = await fetch(env('FORM_WEBHOOK_URL'), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(env('FORM_WEBHOOK_SECRET') ? { 'x-xperienced-secret': env('FORM_WEBHOOK_SECRET') } : {}),
    },
    body: JSON.stringify({ ...s, secret: env('FORM_WEBHOOK_SECRET') || undefined }),
    signal: AbortSignal.timeout(timeout),
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

function emailContent(s: Submission) {
  const rows = [...Object.entries(s.data), ...Object.entries(s.meta)]
    .filter(([, v]) => render(v) !== '')
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(k)}</th><td style="padding:4px 0">${escapeHtml(render(v)).replace(/\n/g, '<br>')}</td></tr>`,
    )
    .join('');
  const replyTo = typeof s.data.email === 'string' && s.data.email ? s.data.email : undefined;
  return {
    replyTo,
    subject: `[Xperienced] ${KIND_LABELS[s.kind]} · ${s.id}`,
    html: `<h2 style="font-family:sans-serif">${escapeHtml(KIND_LABELS[s.kind])}</h2><p style="font-family:sans-serif">Reçu le ${escapeHtml(s.received_at)}</p><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
  };
}

async function toSmtp(s: Submission) {
  const port = Number(env('SMTP_PORT') || 465);
  const transport = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    connectionTimeout: 10_000,
    socketTimeout: 10_000,
  });
  const { replyTo, subject, html } = emailContent(s);
  await transport.sendMail({
    from: env('NOTIFY_EMAIL_FROM') || `Xperienced <${env('SMTP_USER')}>`,
    to: env('NOTIFY_EMAIL_TO').split(',').map((x) => x.trim()),
    replyTo,
    subject,
    html,
  });
}

async function toEmail(s: Submission) {
  const { replyTo, subject, html } = emailContent(s);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env('RESEND_API_KEY')}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env('NOTIFY_EMAIL_FROM') || 'Xperienced <onboarding@resend.dev>',
      to: env('NOTIFY_EMAIL_TO').split(',').map((x) => x.trim()),
      reply_to: replyTo,
      subject,
      html,
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
  if (c.supabase) jobs.push(toSupabase(s));
  if (c.smtp) jobs.push(toSmtp(s));
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

/**
 * Enregistre un scan de QR code dans Supabase (table qr_scans) et/ou le webhook,
 * pour garder un historique durable : les journaux gratuits de Vercel ou Render ne sont
 * conservés que peu de temps. Ne bloque jamais la redirection plus de 1,5 s.
 */
export async function recordScan(code: string, campaign: string) {
  if (supabaseKey()) {
    try {
      await supabaseInsert('qr_scans', { code, campagne: campaign }, 1500);
    } catch (err) {
      console.error(JSON.stringify({ event: 'qr_scan_store_error', error: String(err) }));
    }
  }
  if (!env('FORM_WEBHOOK_URL')) return;
  try {
    await toWebhook({
      id: crypto.randomUUID().slice(0, 8),
      kind: 'qr_scan',
      received_at: new Date().toISOString(),
      data: {},
      meta: { code, utm_campaign: campaign },
    }, 1500);
  } catch {
    /* un scan non enregistré ne doit jamais empêcher la visite */
  }
}
