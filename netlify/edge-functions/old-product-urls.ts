/**
 * Old-site product URLs (docs/REDIRECTS.md): /products?category=…[&subcategory=…] -> the category page.
 *
 * Why an edge function and not only netlify.toml rules: Netlify's CDN normalises the trailing slash
 * before redirect rules run, and its Pretty URLs 301 (/products -> /products/) can win over a query
 * rule. Edge functions run before both, so every old URL gets its one 301 straight to the target,
 * whether or not it has the slash. The rules in netlify.toml stay as a fallback.
 *
 * Target is the clean category URL (the old query is not carried over). Parameter order does not
 * matter and unrelated parameters (utm_*, gclid) are ignored. Bare ?category=automated-valves,
 * process-instruments, instruments or any other value is not redirected: /products/ answers it.
 */
import type { Config, Context } from '@netlify/edge-functions';

const ORIGIN = 'https://www.sankohtech.com';

const INSTRUMENTS: Record<string, string> = {
  'flow-meter': 'flow-meters',
  pressure: 'pressure-instruments',
  temperature: 'temperature-instruments',
  'level-transmitter': 'level-instruments',
  analytical: 'analytical-instruments',
};

/** category -> subcategory -> slug under /products/. Keep in step with the rules in netlify.toml. */
const TARGETS: Record<string, Record<string, string>> = {
  'automated-valves': {
    pneumatic: 'pneumatic-actuated-valves',
    electric: 'electric-actuated-valves',
    solenoid: 'solenoid-valves',
  },
  // The old showcase sent "Process Instruments" to category=instruments, an id that never existed.
  'process-instruments': INSTRUMENTS,
  instruments: INSTRUMENTS,
};

export default function handler(request: Request, context: Context): Response | Promise<Response> {
  const params = new URL(request.url).searchParams;
  const category = params.get('category');
  const sub = params.get('subcategory');

  let slug: string | undefined;
  if (category === 'manual-valves') slug = 'manual-valves';
  else if (category && sub && Object.hasOwn(TARGETS, category)) slug = TARGETS[category][sub];

  if (!slug) return context.next();
  return new Response(null, { status: 301, headers: { Location: `${ORIGIN}/products/${slug}/` } });
}

export const config: Config = { path: ['/products', '/products/'] };
