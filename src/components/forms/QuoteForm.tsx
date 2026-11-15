/**
 * Quote form island (SPEC §6.1). The page around it (pages/request-a-quote.astro) carries the
 * no-JS fallback; this island is hidden when JavaScript is off.
 *
 * - `?product=<slug>` prefills "Product or service" from the slug → title map the page prints in
 *   <script type="application/json" id="quote-products">.
 * - Inline validation with the shared rules in lib/quote.ts (the function uses the same ones).
 * - Cloudflare Turnstile loads on the first focus inside the form, never on page load.
 * - Success → /thank-you/ (which sends GA4 generate_lead). Failure → the `failure` slot: "Please call
 *   us" with both numbers, rendered by the page inside a data-contact-exempt wrapper.
 */
import { cloneElement, type ComponentChildren, type JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import {
  DETAILS_PLACEHOLDER,
  HONEYPOT,
  MAX_LENGTH,
  QUOTE_FIELDS,
  validate,
  validateField,
  type QuoteErrors,
  type QuoteField,
  type QuoteInput,
} from '../../lib/quote';

interface Props {
  turnstileSiteKey: string;
  endpoint?: string;
  /** Slot: "Please call us" block with both numbers (data-contact-exempt). */
  failure?: ComponentChildren;
  /** Slot: the shared WhatsApp button for photos. */
  photo?: ComponentChildren;
}

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
    __sankohTurnstileReady?: () => void;
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__sankohTurnstileReady';
export const LEAD_KEY = 'sankoh-lead';

const EMPTY: QuoteInput = { name: '', company: '', phone: '', email: '', product: '', quantity: '', details: '' };

const LABELS: Record<QuoteField, string> = {
  name: 'Your name',
  company: 'Company',
  phone: 'Phone',
  email: 'Email',
  product: 'Product or service',
  quantity: 'Quantity',
  details: 'Your requirement',
};
const REQUIRED: QuoteField[] = ['name', 'phone', 'details'];

type Status = 'idle' | 'sending' | 'failed';

export default function QuoteForm({ turnstileSiteKey, endpoint = '/api/quote', failure, photo }: Props) {
  const [values, setValues] = useState<QuoteInput>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [products, setProducts] = useState<string[]>([]);
  const form = useRef<HTMLFormElement>(null);
  const widgetBox = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef('');
  const loading = useRef(false);
  const failureBox = useRef<HTMLDivElement>(null);

  // Prefill from ?product= and fill the suggestion list.
  useEffect(() => {
    let map: Record<string, string> = {};
    try {
      map = JSON.parse(document.getElementById('quote-products')?.textContent ?? '{}');
    } catch {
      /* no map: no prefill */
    }
    setProducts([...new Set(Object.values(map))].sort());
    const slug = new URLSearchParams(location.search).get('product');
    if (slug && map[slug]) setValues((v) => ({ ...v, product: map[slug] }));
  }, []);

  useEffect(() => {
    if (status === 'failed') failureBox.current?.focus();
  }, [status]);

  const renderWidget = () => {
    if (!window.turnstile || !widgetBox.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(widgetBox.current, {
      sitekey: turnstileSiteKey,
      appearance: 'interaction-only',
      size: 'flexible',
      callback: (t: string) => (token.current = t),
      'expired-callback': () => (token.current = ''),
      'error-callback': () => (token.current = ''),
    });
  };

  /** Load Turnstile once, on the first interaction with the form. */
  const loadTurnstile = () => {
    if (loading.current) return;
    loading.current = true;
    window.__sankohTurnstileReady = renderWidget;
    const s = document.createElement('script');
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  };

  const waitForToken = async (ms = 15000): Promise<string> => {
    loadTurnstile();
    const start = Date.now();
    while (!token.current && Date.now() - start < ms) await new Promise((r) => setTimeout(r, 200));
    return token.current;
  };

  const set = (field: QuoteField) => (e: Event) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: validateField(field, value) }));
  };
  const check = (field: QuoteField) => () => {
    const error = validateField(field, values[field]);
    setErrors((err) => ({ ...err, [field]: error }));
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    const first = QUOTE_FIELDS.find((f) => found[f]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const honeypot = (form.current?.elements.namedItem(HONEYPOT) as HTMLInputElement | null)?.value ?? '';
    try {
      const turnstileToken = await waitForToken();
      if (!turnstileToken) throw new Error('verification');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, [HONEYPOT]: honeypot, turnstileToken, source: document.referrer }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: QuoteErrors };
      if (res.ok && data.ok) {
        try {
          sessionStorage.setItem(LEAD_KEY, values.product || 'General enquiry');
        } catch {
          /* storage blocked: the lead is still sent, only the analytics event is lost */
        }
        location.assign('/thank-you/');
        return;
      }
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus('idle');
        return;
      }
      throw new Error('send');
    } catch {
      // Tokens are single-use: get a fresh one for a retry.
      token.current = '';
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
      setStatus('failed');
    }
  };

  const field = (name: QuoteField, input: JSX.Element, hint?: string) => {
    const error = errors[name];
    const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(' ') || undefined;
    return (
      <div class={`qf-field qf-${name}`}>
        <label for={`qf-${name}`}>
          {LABELS[name]}
          {REQUIRED.includes(name) ? <span class="qf-req"> (required)</span> : <span class="qf-opt"> (optional)</span>}
        </label>
        {hint && (
          <p class="qf-hint" id={`${name}-hint`}>
            {hint}
          </p>
        )}
        {cloneElement(input, { id: `qf-${name}`, name, 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': describedBy })}
        {error && (
          <p class="qf-error" id={`${name}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  };

  const input = (name: QuoteField, extra: Record<string, unknown> = {}) => (
    <input
      type="text"
      value={values[name]}
      maxLength={MAX_LENGTH[name]}
      onInput={set(name)}
      onBlur={check(name)}
      required={REQUIRED.includes(name)}
      {...extra}
    />
  );

  return (
    <form ref={form} class="qf" noValidate onSubmit={onSubmit} onFocusIn={loadTurnstile}>
      <div class="qf-grid">
        {field('name', input('name', { autoComplete: 'name' }))}
        {field('company', input('company', { autoComplete: 'organization' }))}
        {field('phone', input('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' }), 'Mobile number. We usually call back.')}
        {field('email', input('email', { type: 'email', inputMode: 'email', autoComplete: 'email' }))}
        {field('product', input('product', { list: 'qf-products' }), 'Type to search, or describe it in your own words.')}
        {field('quantity', input('quantity'))}
      </div>
      <datalist id="qf-products">
        {products.map((p) => (
          <option key={p} value={p} />
        ))}
      </datalist>

      {field(
        'details',
        <textarea rows={6} value={values.details} maxLength={MAX_LENGTH.details} onInput={set('details')} onBlur={check('details')} required placeholder={DETAILS_PLACEHOLDER} />,
      )}

      <div class="qf-photo">
        <p>
          <strong>Photos or drawings?</strong> There is no file upload here. WhatsApp us a photo of the nameplate, the drawing or the
          faulty unit.
        </p>
        {photo}
      </div>

      {/* Honeypot: hidden from people and screen readers. */}
      <div class="qf-hp" aria-hidden="true">
        <label for="qf-website">Website</label>
        <input id="qf-website" type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
      </div>

      <div class="qf-turnstile" ref={widgetBox} />

      {Object.values(errors).some(Boolean) && (
        <p class="qf-summary" role="alert">
          Please check the fields marked above.
        </p>
      )}

      <div class="qf-submit">
        <button type="submit" class="btn btn-primary" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p class="qf-note">
          We use your details only to answer this enquiry. <a href="/privacy-policy/">Privacy policy</a>
        </p>
      </div>

      <div class="qf-failure" ref={failureBox} tabIndex={-1} role="alert" hidden={status !== 'failed'}>
        {failure}
      </div>
      <p class="sr-only" aria-live="polite">
        {status === 'sending' ? 'Sending your enquiry' : ''}
      </p>
    </form>
  );
}
