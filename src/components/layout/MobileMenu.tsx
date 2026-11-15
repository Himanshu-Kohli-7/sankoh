/**
 * Mobile menu island (SPEC §1): hamburger → full-height panel with accordions.
 * Without JavaScript the trigger is a plain link to the footer navigation.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { site, quoteHref } from '../../config/site';
import { productGroups, repairGroups, primaryLinks, productsHref, selectorAvailable, selectorHref, type NavGroup } from '../../config/nav';

interface Props {
  currentPath: string;
  catalogueHref: string | null;
}

/* Same paths as components/Icon.astro (kept local so the island stays small). */
const ICONS = {
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6L6 18',
  chevron: 'M6 9l6 6 6-6',
  quote: 'M14 3v4a1 1 0 0 0 1 1h4 M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z M9 13h6 M9 17h6',
} as const;

function Svg({ d, size = 24, class: cls }: { d: string; size?: number; class?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class={cls}
    >
      <path d={d} />
    </svg>
  );
}

const DIVISION_BORDER: Record<string, string> = {
  valves: 'border-navy',
  instruments: 'border-blue',
  repair: 'border-amber',
};

function Group({ group, hubLabel, currentPath }: { group: NavGroup; hubLabel?: string; currentPath: string }) {
  return (
    <details name="mobile-menu" class="group border-b border-line" open={group.links.some((l) => currentPath.startsWith(l.href))}>
      <summary class="flex min-h-14 cursor-pointer list-none items-center justify-between text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
        {group.label}
        <Svg d={ICONS.chevron} size={20} class="text-slate transition-transform group-open:rotate-180" />
      </summary>
      <ul class={`mb-4 ml-1 border-l-2 ${DIVISION_BORDER[group.division]}`}>
        {hubLabel && (
          <li>
            <a class="flex min-h-11 items-center pl-4 font-semibold text-navy no-underline" href={group.href}>
              {hubLabel}
            </a>
          </li>
        )}
        {group.links.map((link) => (
          <li key={link.href}>
            <a
              class="flex min-h-11 items-center pl-4 text-ink no-underline"
              href={link.href}
              aria-current={currentPath === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function MobileMenu({ currentPath, catalogueHref }: Props) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) trigger.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>('a[href], button, summary')].filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // The panel only exists below the desktop breakpoint.
    const desktop = window.matchMedia('(min-width: 1120px)');
    const onDesktop = () => desktop.matches && setOpen(false);

    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  const openMenu = (e: Event) => {
    e.preventDefault();
    setOpen(true);
  };

  const plainLink = 'flex min-h-14 items-center border-b border-line text-lg font-semibold text-navy no-underline';

  return (
    <>
      <a
        ref={trigger}
        href="#footer-nav"
        role="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        class="-mr-2 grid size-11 place-items-center text-navy"
        onClick={openMenu}
        onKeyDown={(e) => e.key === ' ' && openMenu(e)}
      >
        <Svg d={ICONS.menu} size={26} />
      </a>

      <div
        ref={panel}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        class="pointer-events-auto fixed inset-0 z-[70] flex flex-col bg-white"
      >
        <div class="flex h-15 flex-none items-center justify-between border-b border-line px-4">
          <a href="/" aria-label={`${site.name}, home`} class="flex min-h-11 items-center">
            <img src="/brand/sankoh-logo-full.svg" width="159" height="34" alt={site.name} class="h-[34px] w-auto" />
          </a>
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close menu"
            class="-mr-2 grid size-11 cursor-pointer place-items-center text-navy"
            onClick={() => setOpen(false)}
          >
            <Svg d={ICONS.close} size={26} />
          </button>
        </div>

        <nav aria-label="Mobile" class="flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
          <p class="eyebrow pt-5 pb-1 text-slate">Products</p>
          {productGroups.map((group) => (
            <Group key={group.key} group={group} currentPath={currentPath} />
          ))}
          <a class={plainLink} href={productsHref}>
            All products
          </a>
          {selectorAvailable && (
            <a class={plainLink} href={selectorHref} aria-current={currentPath === selectorHref ? 'page' : undefined}>
              Product selector
            </a>
          )}

          <p class="eyebrow pt-6 pb-1 text-slate">Repair</p>
          {repairGroups.map((group) =>
            group.links.length ? (
              <Group key={group.key} group={group} hubLabel={`All ${group.label.toLowerCase()} services`} currentPath={currentPath} />
            ) : (
              <a key={group.key} class={plainLink} href={group.href} aria-current={currentPath === group.href ? 'page' : undefined}>
                {group.label}
              </a>
            ),
          )}

          <p class="eyebrow pt-6 pb-1 text-slate">Company</p>
          {primaryLinks
            .filter((l) => !repairGroups.some((g) => g.href === l.href))
            .map((link) => (
              <a key={link.href} class={plainLink} href={link.href} aria-current={currentPath === link.href ? 'page' : undefined}>
                {link.label}
              </a>
            ))}
          {catalogueHref && (
            <a class={plainLink} href={catalogueHref} download data-event="download_catalogue">
              Catalogue (PDF)
            </a>
          )}
          <p class="pt-5 text-small text-slate">{site.service.supportLine}</p>
        </nav>

        <div class="flex-none border-t border-line bg-paper p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <a class="btn btn-primary w-full" href={quoteHref()}>
            <Svg d={ICONS.quote} size={20} />
            Request a quote
          </a>
        </div>
      </div>
    </>
  );
}
