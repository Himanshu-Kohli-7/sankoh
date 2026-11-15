/**
 * Product selector island (SPEC §6.2). The server render is the full product list grouped by type:
 * the no-JS fallback. With JavaScript the filter bar appears (hidden under html:not(.js) by the page).
 *
 * Filter state lives in the URL hash, e.g. #operation=pneumatic,electric&media=steam, so a view can be
 * shared without creating crawlable duplicates. OR within a filter, AND across filters.
 */
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { SelectorFilter, SelectorItem } from '../../lib/selector';

interface Props {
  items: SelectorItem[];
  filters: SelectorFilter[];
  sourcingHref: string;
}

type Key = SelectorFilter['key'];
type State = Record<Key, string[]>;

const EMPTY: State = { type: [], operation: [], media: [], application: [] };
const KEYS: Key[] = ['type', 'operation', 'media', 'application'];

const valuesOf = (item: SelectorItem, key: Key): string[] =>
  key === 'type' ? [item.type] : key === 'operation' ? [item.operation] : key === 'media' ? item.media : item.applications;

const matches = (item: SelectorItem, state: State, skip?: Key): boolean =>
  KEYS.every((key) => key === skip || !state[key].length || valuesOf(item, key).some((v) => state[key].includes(v)));

function parseHash(hash: string, filters: SelectorFilter[]): State {
  const state: State = { ...EMPTY };
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  for (const f of filters) {
    const allowed = new Set(f.options.map((o) => o.value));
    const raw = params.get(f.key);
    state[f.key] = raw ? [...new Set(raw.split(',').map((v) => v.trim().toLowerCase()))].filter((v) => allowed.has(v)) : [];
  }
  return state;
}

const toHash = (state: State): string =>
  KEYS.filter((k) => state[k].length)
    .map((k) => `${k}=${state[k].join(',')}`)
    .join('&');

const OPERATION_LABEL: Record<string, string> = {
  manual: 'Manual',
  'self-acting': 'Self-acting',
  pneumatic: 'Pneumatic',
  electric: 'Electric',
  solenoid: 'Solenoid',
};

export default function ProductSelector({ items, filters, sourcingHref }: Props) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  // Read the hash after hydration (the server render shows everything), and follow back/forward.
  useEffect(() => {
    const read = () => setState(parseHash(location.hash, filters));
    read();
    setReady(true);
    addEventListener('hashchange', read);
    return () => removeEventListener('hashchange', read);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const hash = toHash(state);
    if (hash === location.hash.replace(/^#/, '')) return;
    history.replaceState(null, '', hash ? `#${hash}` : location.pathname + location.search);
  }, [state, ready]);

  const shown = useMemo(() => items.filter((i) => matches(i, state)), [items, state]);
  const active = KEYS.some((k) => state[k].length);
  const typeFilter = filters.find((f) => f.key === 'type')!;
  const mediaLabel = useMemo(
    () => Object.fromEntries((filters.find((f) => f.key === 'media')?.options ?? []).map((o) => [o.value, o.label])),
    [filters],
  );

  const toggle = (key: Key, value: string) =>
    setState((s) => ({ ...s, [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value] }));

  const chip = (key: Key, value: string, label: string) => {
    const on = state[key].includes(value);
    const count = items.filter((i) => matches(i, state, key) && valuesOf(i, key).includes(value)).length;
    return (
      <li key={value}>
        <button type="button" class="ps-chip" aria-pressed={on} disabled={!on && count === 0} onClick={() => toggle(key, value)}>
          {label}
          <span class="ps-count">
            {count}
            <span class="sr-only"> products</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <div class="ps">
      <div class="ps-filters" role="group" aria-label="Filter products">
        {filters.map((f) => {
          const groups = f.key === 'type' ? [...new Set(f.options.map((o) => o.group!))] : [undefined];
          return (
            <fieldset key={f.key} class="ps-filter">
              <legend class="eyebrow">{f.label}</legend>
              {groups.map((g) => (
                <div key={g ?? f.key} class="ps-group">
                  {g && <p class="ps-group-label">{g}</p>}
                  <ul class="ps-chips">
                    {f.options.filter((o) => o.group === g).map((o) => chip(f.key, o.value, o.label))}
                  </ul>
                </div>
              ))}
            </fieldset>
          );
        })}
        <div class="ps-status">
          <p aria-live="polite" aria-atomic="true">
            {active ? (
              <>
                <strong>{shown.length}</strong> of {items.length} products match
              </>
            ) : (
              <>
                All <strong>{items.length}</strong> products
              </>
            )}
          </p>
          {active && (
            <button type="button" class="ps-clear" onClick={() => setState(EMPTY)}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      {shown.length === 0 && (
        <div class="ps-empty">
          <p>
            <strong>No product matches all of these filters.</strong> Clear one of them, or tell us what you need: we can source
            products we don’t list.
          </p>
          <a href={sourcingHref}>Ask us to source it</a>
        </div>
      )}

      {typeFilter.options.map((t) => {
        const list = shown.filter((i) => i.type === t.value);
        if (!list.length) return null;
        return (
          <section key={t.value} class="ps-type" aria-labelledby={`ps-${t.value}`}>
            <h2 id={`ps-${t.value}`} class="ps-type-title">
              {t.label} <span class="ps-type-count">{list.length}</span>
            </h2>
            <ul class="ps-results">
              {list.map((item) => (
                <li key={item.href} class="ps-item" data-division={item.division}>
                  <div class="ps-media">
                    {item.thumb ? (
                      <img src={item.thumb.src} width={item.thumb.width} height={item.thumb.height} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <svg viewBox="0 0 120 90" aria-hidden="true">
                        <path d={item.placeholder} />
                      </svg>
                    )}
                  </div>
                  <div class="ps-body">
                    <h3 class="ps-title">
                      <a href={item.href}>{item.title}</a>
                    </h3>
                    <p class="ps-summary">{item.summary}</p>
                    {(OPERATION_LABEL[item.operation] || item.media.length > 0) && (
                      <p class="ps-tags">
                        {OPERATION_LABEL[item.operation] && <span>{OPERATION_LABEL[item.operation]}</span>}
                        {item.media.map((m) => (
                          <span key={m}>{mediaLabel[m] ?? m}</span>
                        ))}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
