/**
 * Build-time only: picks the Turnstile site key for the quote form and guards production builds.
 * `astro dev` always uses Cloudflare's always-pass test key. A Netlify production build
 * (CONTEXT=production) fails when the key in site.ts is missing or is a test key, because the
 * form would silently stop working.
 */
import { site } from '../config/site';
import { TURNSTILE_TEST_SITE_KEY, isTurnstileTestKey } from './quote';

export function turnstileSiteKey(): string {
  if (import.meta.env.DEV) return TURNSTILE_TEST_SITE_KEY;
  const key = site.integrations.turnstileSiteKey.trim();
  if (!key || isTurnstileTestKey(key)) {
    const message =
      'Turnstile site key missing in src/config/site.ts (integrations.turnstileSiteKey): the quote form would not work.';
    if (process.env.CONTEXT === 'production') throw new Error(message);
    console.warn(`[quote form] ${message} Using Cloudflare's test key for this non-production build.`);
    return TURNSTILE_TEST_SITE_KEY;
  }
  return key;
}
