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

export const productsHref = '/products/';
export const selectorHref = '/product-selector/';
export const cataloguePath = '/downloads/sankoh-technical-solutions-catalogue.pdf';
