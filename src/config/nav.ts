/**
 * Navigation data shared by the header, mobile menu and footer.
 * Names and slugs come from docs/SPEC.md §2. Keep this file free of Node APIs:
 * it is bundled into the mobile menu island.
 */

export type DivisionKey = 'valves' | 'instruments' | 'repair';

export interface NavLink {
  label: string;
  href: string;
  /** Name of an icon in components/Icon.astro. */
  icon?: string;
}

export interface NavGroup {
  key: string;
  division: DivisionKey;
  label: string;
  href: string;
  /** Icon for a group that is a single page (no `links`). */
  icon?: string;
  /** One line shown under the group name where there are no links to list. */
  note?: string;
  links: NavLink[];
}

export const productGroups: NavGroup[] = [
  {
    key: 'valves',
    division: 'valves',
    label: 'Valves & Automation',
    href: '/products/#valves-automation',
    links: [
      { label: 'Manual Valves', href: '/products/manual-valves/', icon: 'valve' },
      { label: 'Pneumatic Actuated Valves', href: '/products/pneumatic-actuated-valves/', icon: 'actuator' },
      { label: 'Electric Actuated Valves', href: '/products/electric-actuated-valves/', icon: 'electric' },
      { label: 'Solenoid Valves', href: '/products/solenoid-valves/', icon: 'solenoid' },
      { label: 'Valve Automation Accessories', href: '/products/valve-automation-accessories/', icon: 'accessory' },
    ],
  },
  {
    key: 'instruments',
    division: 'instruments',
    label: 'Instruments & Analyzers',
    href: '/products/#instruments-analyzers',
    links: [
      { label: 'Flow Meters', href: '/products/flow-meters/', icon: 'flow' },
      { label: 'Pressure Instruments', href: '/products/pressure-instruments/', icon: 'pressure' },
      { label: 'Temperature Instruments', href: '/products/temperature-instruments/', icon: 'temperature' },
      { label: 'Level Instruments', href: '/products/level-instruments/', icon: 'level' },
      { label: 'Analytical Instruments', href: '/products/analytical-instruments/', icon: 'analyzer' },
    ],
  },
];

/** One-line category descriptions (home grid, products hub): general product knowledge only, no company-specific claims. */
export const categoryBlurbs: Record<string, string> = {
  '/products/manual-valves/': 'Hand-operated valves for isolating, regulating and protecting a line.',
  '/products/pneumatic-actuated-valves/': 'Valves opened and closed by compressed air.',
  '/products/electric-actuated-valves/': 'Motorised valves driven by an electric actuator.',
  '/products/solenoid-valves/': 'Electrically switched valves for fast on/off control.',
  '/products/valve-automation-accessories/': 'Limit switch boxes, positioners and other parts that complete an automated valve.',
  '/products/flow-meters/': 'Meters that measure how much liquid or gas passes through a pipe.',
  '/products/pressure-instruments/': 'Gauges, switches and transmitters for line and vessel pressure.',
  '/products/temperature-instruments/': 'Gauges, sensors and transmitters for process temperature.',
  '/products/level-instruments/': 'Transmitters and switches for tank and silo level.',
  '/products/analytical-instruments/': 'Sensors and analyzers for water and process liquid quality.',
};

export const repairGroups: NavGroup[] = [
  {
    key: 'valve-repair',
    division: 'repair',
    label: 'Valve Repair',
    href: '/valve-repair/',
    links: [
      { label: 'Control Valve Repair', href: '/valve-repair/control-valve-repair/', icon: 'actuator' },
      { label: 'Actuator & Cylinder Repair', href: '/valve-repair/actuator-cylinder-repair/', icon: 'accessory' },
      { label: 'Positioner Repair & Calibration', href: '/valve-repair/positioner-repair-calibration/', icon: 'pressure' },
      { label: 'Globe Valve Repair', href: '/valve-repair/globe-valve-repair/', icon: 'valve' },
      { label: 'Gate Valve Repair', href: '/valve-repair/gate-valve-repair/', icon: 'valve' },
      { label: 'Butterfly Valve Repair', href: '/valve-repair/butterfly-valve-repair/', icon: 'valve' },
      { label: 'Ball Valve Repair', href: '/valve-repair/ball-valve-repair/', icon: 'valve' },
      { label: 'Plug Valve Repair', href: '/valve-repair/plug-valve-repair/', icon: 'valve' },
    ],
  },
  /** VFD repair is one page, not a hub: no sub-pages. */
  {
    key: 'vfd-repair',
    division: 'repair',
    label: 'VFD Repair',
    href: '/vfd-repair/',
    icon: 'drive',
    note: 'ABB, Danfoss and all other makes',
    links: [],
  },
];

export const serviceLinks: NavLink[] = [
  { label: 'Valve Selection & Maintenance Advisory', href: '/services/valve-selection-maintenance-advisory/' },
  { label: 'Installation & Commissioning', href: '/services/installation-commissioning/' },
  { label: 'Product Sourcing', href: '/services/product-sourcing/' },
  { label: 'Surplus & Discontinued Valves', href: '/services/surplus-discontinued-valves/' },
];

/** Third mega-menu column: repair is a headline offering alongside the two product divisions (CLAUDE.md §3). */
export const repairServiceGroup: NavGroup = {
  key: 'repair-service',
  division: 'repair',
  label: 'Repair & Service',
  href: '/services/',
  links: [
    { label: 'Valve Repair', href: '/valve-repair/' },
    { label: 'VFD Repair', href: '/vfd-repair/' },
    ...serviceLinks,
  ],
};

/** Top-level header items after "Products". */
export const primaryLinks: NavLink[] = [
  { label: 'Valve Repair', href: '/valve-repair/' },
  { label: 'VFD Repair', href: '/vfd-repair/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export const companyLinks: NavLink[] = [
  { label: 'About', href: '/about/' },
  { label: 'Brands', href: '/brands/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Image credits', href: '/image-credits/' },
];

/** Mega-menu header design. TEMP nav-compare: both designs ship until one is chosen; ?nav=rules|pipeline overrides it. */
export type MegaMenuStyle = 'rules' | 'pipeline';
export const megaMenuStyle: MegaMenuStyle = 'rules';

export const productsHref = '/products/';
export const selectorHref = '/product-selector/';
/** /product-selector/ exists: the mega-menu link, mobile-menu entry, products hub link and home teaser show. */
export const selectorAvailable = true;
export const cataloguePath = '/downloads/sankoh-technical-solutions-catalogue.pdf';
