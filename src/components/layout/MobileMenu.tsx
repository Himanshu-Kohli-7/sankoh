/**
 * Mobile menu island (SPEC §1): hamburger → panel with one-at-a-time accordions, below the desktop breakpoint.
 * Without JavaScript the trigger is a plain link to the footer navigation.
 *
 * Stability rules (nothing may shift or clip):
 * - The panel is sized by left/right/bottom (never 100vw) and its top is the page header's current top, so the menu
 *   header (same container, height, logo and button size as the page header) covers it exactly and the X lands on
 *   the hamburger.
 * - Scroll lock is overflow: hidden on <html>, which keeps its stable scrollbar gutter; where scrollbar-gutter is
 *   unsupported the lock pads by the measured scrollbar width instead.
 * - The list's scroll container reserves its own gutter, so rows keep their width when a section makes it scroll.
 * - Chevrons sit in a fixed box at the row end and only rotate.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { site, quoteHref } from '../../config/site';
import {
  productGroups,
  repairGroups,
  servicesGroup,
  primaryLinks,
  productsHref,
  selectorAvailable,
  selectorHref,
  type NavGroup,
} from '../../config/nav';

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

/* Focus rings are drawn inset so the scroll container and collapsing sections never clip them. */
const RING = 'focus-visible:outline-offset-[-3px]';
const ROW = `flex min-h-13 w-full items-center border-b border-line text-lg font-semibold text-navy no-underline ${RING}`;
const SUB_LINK = `flex min-h-13 items-center pl-4 text-ink no-underline ${RING}`;
const BUTTON_44 = `-mr-2 grid size-11 flex-none place-items-center text-navy`;

const DESKTOP = '(min-width: 1120px)';

const current = (path: string, href: string) => (path === href ? 'page' : undefined);
const inGroup = (path: string, g: NavGroup) =>
  (g.links.length > 0 && path.startsWith(g.href) && !g.href.includes('#')) || g.links.some((l) => path.startsWith(l.href));

interface SectionProps {
  group: NavGroup;
  hubLabel?: string;
  open: boolean;
  onToggle: () => void;
  currentPath: string;
}

function Section({ group, hubLabel, open, onToggle, currentPath }: SectionProps) {
  const id = `mm-${group.key}`;
  return (
    <div class="border-b border-line">
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={id}
        class={`flex min-h-13 w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-navy ${RING}`}
        onClick={onToggle}
      >
        <span>{group.label}</span>
        <span class="grid size-6 flex-none place-items-center text-slate">
          <Svg
            d={ICONS.chevron}
            size={20}
            class={`transition-transform duration-180 ease-out motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      <div
        id={id}
        inert={!open}
        class="grid transition-[grid-template-rows] duration-180 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div class="min-h-0 overflow-hidden">
          <ul class={`mb-3 ml-1 border-l-2 ${DIVISION_BORDER[group.division]}`}>
            {hubLabel && (
              <li>
                <a class={`${SUB_LINK} font-semibold text-navy`} href={group.href} aria-current={current(currentPath, group.href)}>
                  {hubLabel}
                </a>
              </li>
            )}
            {group.links.map((link) => (
              <li key={link.href}>
                <a class={SUB_LINK} href={link.href} aria-current={current(currentPath, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function MobileMenu({ currentPath, catalogueHref }: Props) {
  const [valveRepair, vfdRepair] = [repairGroups.find((g) => g.links.length), repairGroups.find((g) => !g.links.length)];
  const accordions = [...productGroups, ...(valveRepair ? [valveRepair] : []), servicesGroup];
  const companyLinks = primaryLinks.filter(
    (l) => !repairGroups.some((g) => g.href === l.href) && l.href !== servicesGroup.href,
  );

  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(
    () => accordions.find((g) => inGroup(currentPath, g))?.key ?? null,
  );
  const [frame, setFrame] = useState({ top: 0, right: 0 });
  const trigger = useRef<HTMLAnchorElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  /** How the menu was last opened or closed: keyboard moves focus visibly, pointer and touch do not. */
  const byKeyboard = useRef(false);

  const headerTop = () => trigger.current?.closest('[data-site-header]')?.getBoundingClientRect().top ?? 0;

  useEffect(() => {
    const root = document.documentElement;
    if (!open) {
      if (wasOpen.current) trigger.current?.focus({ focusVisible: byKeyboard.current } as FocusOptions);
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const previous = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;
    const keepsGutter = typeof CSS !== 'undefined' && CSS.supports('scrollbar-gutter', 'stable');
    root.style.overflow = 'hidden';
    if (!keepsGutter && scrollbar > 0) {
      root.style.paddingRight = `${scrollbar}px`;
      setFrame((f) => ({ ...f, right: scrollbar }));
    }

    if (byKeyboard.current) closeBtn.current?.focus();
    else panel.current?.focus({ preventScroll: true });

    const close = (keyboard: boolean) => {
      byKeyboard.current = keyboard;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close(true);
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
        (el) => el.offsetParent !== null && !el.closest('[inert]'),
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!active && items.includes(active);
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => setFrame((f) => ({ ...f, top: headerTop() }));
    // The panel only exists below the desktop breakpoint.
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => desktop.matches && close(false);

    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    desktop.addEventListener('change', onDesktop);
    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.paddingRight;
      setFrame((f) => ({ ...f, right: 0 }));
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open]);

  const openMenu = (e: Event, keyboard: boolean) => {
    e.preventDefault();
    byKeyboard.current = keyboard;
    setFrame((f) => ({ ...f, top: headerTop() }));
    setOpen(true);
  };
  const toggle = (key: string) => setSection((s) => (s === key ? null : key));

  return (
    <>
      <a
        ref={trigger}
        href="#footer-nav"
        role="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        class={BUTTON_44}
        onClick={(e) => openMenu(e, e.detail === 0)}
        onKeyDown={(e) => e.key === ' ' && openMenu(e, true)}
      >
        <Svg d={ICONS.menu} size={26} />
      </a>

      <div
        ref={panel}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        hidden={!open}
        class="pointer-events-auto fixed bottom-0 left-0 z-[70] flex flex-col bg-white focus-visible:outline-none"
        style={{ top: `${frame.top}px`, right: `${frame.right}px` }}
      >
        <div class="h-15 flex-none border-b border-line">
          <div class="container-content flex h-full items-center justify-between gap-6">
            <a href="/" aria-label={`${site.name}, home`} class="flex min-h-11 flex-none items-center">
              <picture>
                <source media="(max-width: 359px)" srcset="/brand/sankoh-icon.svg" width="40" height="40" />
                <img src="/brand/sankoh-logo-full.svg" width="187" height="40" alt={site.name} class="block h-[2.125rem] w-auto" />
              </picture>
            </a>
            <button
              ref={closeBtn}
              type="button"
              aria-label="Close menu"
              class={`${BUTTON_44} cursor-pointer`}
              onClick={(e) => {
                byKeyboard.current = e.detail === 0;
                setOpen(false);
              }}
            >
              <Svg d={ICONS.close} size={26} />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile" class="flex-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
          <div class="container-content pb-6">
            <p class="eyebrow pt-5 pb-1 text-slate">Products</p>
            {productGroups.map((group) => (
              <Section
                key={group.key}
                group={group}
                open={section === group.key}
                onToggle={() => toggle(group.key)}
                currentPath={currentPath}
              />
            ))}
            <a class={ROW} href={productsHref} aria-current={current(currentPath, productsHref)}>
              All products
            </a>
            {selectorAvailable && (
              <a class={ROW} href={selectorHref} aria-current={current(currentPath, selectorHref)}>
                Product selector
              </a>
            )}
            {catalogueHref && (
              <a class={ROW} href={catalogueHref} download data-event="download_catalogue">
                Catalogue (PDF)
              </a>
            )}

            <p class="eyebrow pt-6 pb-1 text-slate">Repair &amp; Service</p>
            {valveRepair && (
              <Section
                group={valveRepair}
                hubLabel="All valve repair services"
                open={section === valveRepair.key}
                onToggle={() => toggle(valveRepair.key)}
                currentPath={currentPath}
              />
            )}
            {vfdRepair && (
              <a class={ROW} href={vfdRepair.href} aria-current={current(currentPath, vfdRepair.href)}>
                {vfdRepair.label}
              </a>
            )}
            <Section
              group={servicesGroup}
              hubLabel="All services"
              open={section === servicesGroup.key}
              onToggle={() => toggle(servicesGroup.key)}
              currentPath={currentPath}
            />

            <p class="eyebrow pt-6 pb-1 text-slate">Company</p>
            {companyLinks.map((link) => (
              <a key={link.href} class={ROW} href={link.href} aria-current={current(currentPath, link.href)}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div class="flex-none border-t border-line bg-paper pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <div class="container-content">
            <p class="pb-3 text-small text-slate">{site.service.supportLine}</p>
            <a class="btn btn-primary w-full" href={quoteHref()}>
              <Svg d={ICONS.quote} size={20} />
              Request a quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
