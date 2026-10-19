import type { APIRoute } from 'astro';
import { campaignUrl, findCampaign } from '../../config/campaigns';
import { recordScan } from '../../lib/delivery';

export const prerender = false;

/**
 * Lien court des QR codes : /q/<code>
 * Enregistre le scan dans les journaux du serveur (sans cookie ni donnée personnelle),
 * puis redirige vers la page de la campagne avec ses paramètres UTM.
 */
export const GET: APIRoute = async ({ params }) => {
  const campaign = findCampaign(params.code || '');
  if (!campaign) return new Response(null, { status: 302, headers: { location: '/' } });
  console.log(JSON.stringify({ event: 'qr_scan', code: campaign.code, campaign: campaign.utm_campaign, at: new Date().toISOString() }));
  await recordScan(campaign.code, campaign.utm_campaign);
  return new Response(null, {
    status: 302,
    headers: { location: campaignUrl(campaign, 'http://x').replace('http://x', ''), 'cache-control': 'no-store' },
  });
};
