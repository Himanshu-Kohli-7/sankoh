/** IndexNow key file (SPEC §7): /<key>.txt containing the key, from site.ts. */
import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const getStaticPaths = () => [{ params: { indexnow: site.integrations.indexNowKey } }];

export const GET: APIRoute = () =>
  new Response(site.integrations.indexNowKey, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
