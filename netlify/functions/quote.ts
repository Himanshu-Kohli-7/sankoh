/**
 * Quote form endpoint (SPEC §6.1): POST /api/quote with JSON from components/forms/QuoteForm.tsx.
 *
 * 1. Validates with the same rules as the form (src/lib/quote.ts).
 * 2. Honeypot filled → answers ok and sends nothing.
 * 3. Verifies the Cloudflare Turnstile token. Secret: TURNSTILE_SECRET_KEY (Netlify env only, never
 *    committed). Outside production with no secret set, Cloudflare's public test secret is used.
 * 4. Sends the enquiry to the company email in src/config/site.ts with nodemailer over Gmail SMTP
 *    (EMAIL_USER / EMAIL_PASS). Reply-To is the customer's email, only when one was given.
 *
 * If anything after validation fails, it answers 502 (the form then shows "Please call us" with both
 * numbers) and logs a short summary — name, phone, product, reason — so the lead is not lost.
 * Company, email, quantity and details are deliberately not logged.
 */
import nodemailer from 'nodemailer';
import { site } from '../../src/config/site.ts';
import {
  HONEYPOT,
  TURNSTILE_TEST_SECRET,
  clean,
  oneLine,
  validate,
  type QuoteInput,
} from '../../src/lib/quote.ts';

export const config = { path: '/api/quote' };

type Transport = { sendMail: (message: Record<string, unknown>) => Promise<unknown> };

interface Deps {
  /** Test seam: replaces the SMTP transport. */
  transport?: Transport;
  /** Test seam: replaces the Turnstile siteverify call. */
  fetch?: typeof fetch;
}

interface NetlifyContext {
  deploy?: { context?: string };
  ip?: string;
}

const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Short summary for the function log: enough to call the customer back, nothing more. */
function logUnsent(reason: string, input: QuoteInput): void {
  console.error(
    'QUOTE_LEAD_NOT_SENT',
    JSON.stringify({
      time: new Date().toISOString(),
      reason,
      name: oneLine(input.name),
      phone: oneLine(input.phone),
      product: oneLine(input.product),
    }),
  );
}

async function verifyTurnstile(token: string, secret: string, ip: string | undefined, doFetch: typeof fetch): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const res = await doFetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export function buildMessage(input: QuoteInput, from: string, source: string) {
  const name = oneLine(input.name);
  const product = oneLine(input.product);
  const email = oneLine(input.email);
  const rows: [string, string][] = [
    ['Name', name],
    ['Company', oneLine(input.company)],
    ['Phone', oneLine(input.phone)],
    ['Email', email],
    ['Product or service', product],
    ['Quantity', oneLine(input.quantity)],
  ];
  const filled = rows.filter(([, v]) => v);
  const meta = `Sent from ${source || 'the website'} on ${new Date().toISOString()}`;

  const text = [...filled.map(([k, v]) => `${k}: ${v}`), '', 'Details:', input.details, '', meta].join('\n');
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 sans-serif">` +
    filled.map(([k, v]) => `<tr><th align="left" style="color:#4A5B70">${k}</th><td>${escapeHtml(v)}</td></tr>`).join('') +
    `</table><p style="font:15px/1.5 sans-serif"><strong>Details</strong><br>${escapeHtml(input.details).replace(/\n/g, '<br>')}</p>` +
    `<p style="font:13px sans-serif;color:#4A5B70">${escapeHtml(meta)}</p>`;

  return {
    from: { name: `${site.shortName} website`, address: from },
    to: site.email,
    // Only one-line values go into headers (header injection guard); Reply-To only when an email was given.
    ...(email ? { replyTo: { name, address: email } } : {}),
    subject: oneLine(`Quote request: ${product || 'General enquiry'} — ${name}`).slice(0, 200),
    text,
    html,
  };
}

export async function handleQuote(req: Request, context: NetlifyContext = {}, deps: Deps = {}): Promise<Response> {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'method' });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: 'invalid' });
  }
  if (!body || typeof body !== 'object') return json(400, { ok: false, error: 'invalid' });

  // Bots fill every field. Answer as if it worked, send nothing.
  if (typeof body[HONEYPOT] === 'string' && body[HONEYPOT].trim()) return json(200, { ok: true });

  const input = clean(body);
  const errors = validate(input);
  if (Object.keys(errors).length) return json(400, { ok: false, error: 'invalid', errors });

  const deployContext = context.deploy?.context ?? process.env.CONTEXT ?? 'dev';
  const isProduction = deployContext === 'production';
  const secret = process.env.TURNSTILE_SECRET_KEY || (isProduction ? '' : TURNSTILE_TEST_SECRET);
  const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : '';
  const source = typeof body.source === 'string' ? oneLine(body.source).slice(0, 300) : '';

  if (!secret) {
    logUnsent('TURNSTILE_SECRET_KEY not set', input);
    return json(502, { ok: false, error: 'unavailable' });
  }
  try {
    if (!(await verifyTurnstile(token, secret, context.ip, deps.fetch ?? fetch))) {
      logUnsent('Turnstile check failed', input);
      return json(502, { ok: false, error: 'verification' });
    }
  } catch (err) {
    logUnsent(`Turnstile request failed: ${(err as Error).message}`, input);
    return json(502, { ok: false, error: 'verification' });
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!deps.transport && (!user || !pass)) {
    logUnsent('EMAIL_USER / EMAIL_PASS not set', input);
    return json(502, { ok: false, error: 'unavailable' });
  }

  try {
    const transport: Transport =
      deps.transport ?? nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
    await transport.sendMail(buildMessage(input, user ?? 'website@localhost', source));
  } catch (err) {
    logUnsent(`Send failed: ${(err as Error).message}`, input);
    return json(502, { ok: false, error: 'send' });
  }

  return json(200, { ok: true });
}

export default (req: Request, context: NetlifyContext) => handleQuote(req, context);
