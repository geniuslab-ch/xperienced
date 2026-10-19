import type { APIRoute } from 'astro';
import { randomUUID } from 'node:crypto';
import { validate } from '../../lib/forms';
import { deliver, isConfigured } from '../../lib/delivery';

export const prerender = false;

// Limite simple : 8 envois par adresse IP et par tranche de 10 minutes.
const WINDOW = 10 * 60 * 1000;
const MAX = 8;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX;
}

/** Adresse IP du visiteur, via les en-têtes du proxy (Vercel, Render) ou la connexion directe. */
function ipOf(request: Request, getAddress: () => string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip');
  if (forwarded) return forwarded;
  try {
    return getAddress();
  } catch {
    return 'unknown'; // certains hébergeurs n'exposent pas l'adresse
  }
}

export const POST: APIRoute = async (context) => {
  const { request, redirect } = context;
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const reply = (status: number, body: Record<string, unknown>, fallback: string) =>
    wantsJson
      ? new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } })
      : redirect(fallback, 303);

  const ip = ipOf(request, () => context.clientAddress);
  if (limited(ip)) {
    return reply(429, { ok: false, error: 'rate_limited' }, '/merci?etat=limite');
  }

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return reply(400, { ok: false, error: 'bad_request' }, '/merci?etat=erreur');
  }

  const result = validate(fd);
  if (!result.ok) {
    // Les robots reçoivent une fausse confirmation : ils ne réessaient pas.
    if (result.spam) return reply(200, { ok: true }, '/merci');
    return reply(422, { ok: false, error: 'invalid', fields: result.errors }, '/merci?etat=incomplet');
  }

  if (!isConfigured()) {
    console.warn(JSON.stringify({ event: 'form_not_configured', kind: result.kind }));
    return reply(503, { ok: false, error: 'not_configured' }, '/merci?etat=inactif');
  }

  const submission = {
    id: randomUUID().slice(0, 8),
    kind: result.kind,
    received_at: new Date().toISOString(),
    data: result.data,
    meta: result.meta,
  };

  try {
    await deliver(submission);
  } catch {
    return reply(502, { ok: false, error: 'delivery_failed' }, '/merci?etat=erreur');
  }

  // Journal sans données personnelles : sert au tableau de bord (inscriptions par campagne).
  console.log(JSON.stringify({ event: 'form_submitted', id: submission.id, kind: submission.kind, ...submission.meta }));
  return reply(200, { ok: true, id: submission.id, kind: submission.kind }, `/merci?type=${submission.kind}`);
};
