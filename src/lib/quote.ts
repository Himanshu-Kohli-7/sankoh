/**
 * Quote form rules shared by the form island (components/forms/QuoteForm.tsx) and the Netlify
 * Function (netlify/functions/quote.ts), so the browser and the server validate the same way.
 * No Node or DOM APIs: it is bundled into both.
 */

export interface QuoteInput {
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  details: string;
}

export type QuoteField = keyof QuoteInput;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const QUOTE_FIELDS: QuoteField[] = ['name', 'company', 'phone', 'email', 'product', 'quantity', 'details'];

/** Longest accepted value per field. */
export const MAX_LENGTH: Record<QuoteField, number> = {
  name: 100,
  company: 150,
  phone: 20,
  email: 254,
  product: 200,
  quantity: 60,
  details: 5000,
};

/** The honeypot field: hidden from people, filled in by bots. */
export const HONEYPOT = 'website';

/** Cloudflare Turnstile test keys (public values from Cloudflare's docs, not secrets). */
export const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
export const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA';
/** Site keys starting 1x, 2x or 3x are Cloudflare's test keys. */
export const isTurnstileTestKey = (key: string): boolean => /^[123]x0+/.test(key);

/** Indian mobile number: optional +91 / 91 / 0, then ten digits starting 6–9. */
const MOBILE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export const normalisePhone = (value: string): string => value.replace(/[\s\-().]/g, '');

/** Trim and cut to the field's maximum length. */
export function clean(input: Partial<Record<string, unknown>>): QuoteInput {
  const out = {} as QuoteInput;
  for (const field of QUOTE_FIELDS) {
    const raw = input[field];
    out[field] = typeof raw === 'string' ? raw.trim().slice(0, MAX_LENGTH[field]) : '';
  }
  return out;
}

export function validateField(field: QuoteField, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case 'name':
      return v ? undefined : 'Please enter your name.';
    case 'phone':
      if (!v) return 'Please enter your phone number so we can call you back.';
      return MOBILE_RE.test(normalisePhone(v)) ? undefined : 'Please enter a 10-digit Indian mobile number, e.g. 98765 43210.';
    case 'email':
      return !v || EMAIL_RE.test(v) ? undefined : 'Please check your email address, or leave it blank.';
    case 'details':
      if (!v) return 'Please tell us what you need.';
      return v.length >= 10 ? undefined : 'Please add a little more detail (at least 10 characters).';
    default:
      return undefined;
  }
}

export function validate(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};
  for (const field of QUOTE_FIELDS) {
    const error = validateField(field, input[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

/**
 * One line of plain text for an email header (subject, Reply-To): removes CR, LF and every other
 * control character, so a value can never start a new header (header injection), and collapses spaces.
 */
export const oneLine = (value: string): string =>
  value
    .replace(/[\u0000-\u001f\u007f-\u009f\u2028\u2029]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Placeholder for the details box: the enquiry checklist in short (SPEC §6.1). */
export const DETAILS_PLACEHOLDER =
  'For a product: size, media, pressure and temperature, material, connection, quantity, delivery location.\n' +
  'For a repair: make and model, what is wrong, on site or at our workshop.';
