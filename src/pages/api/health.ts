import type { APIRoute } from 'astro';
import { channels } from '../../lib/delivery';

export const prerender = false;

/** État du service (utilisé par Render). N'expose aucun secret : seulement quels canaux sont actifs. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ ok: true, forms: channels() }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
