/**
 * Single source of truth for company facts (CLAUDE.md §4).
 * Import from here everywhere. Never hard-code phones, address, email or GSTIN in components.
 * Add only facts confirmed in CLAUDE.md §4 — anything else is a TODO tracked in docs/PENDING.md.
 */

const phones = [
  { display: '+91 62834 92019', e164: '+916283492019' },
  { display: '+91 98884 91527', e164: '+919888491527' },
] as const;

const whatsapp = { display: '+91 98884 91527', number: '919888491527' } as const;

export const site = {
  name: 'Sankoh Technical Solutions',
  shortName: 'Sankoh',
  url: 'https://www.sankohtech.com',
  locale: 'en-IN',
  gstin: '03AKSPK5866E1ZW',

  positioning:
    'Manufacturer, supplier and repair partner for industrial valves, valve automation and process instruments.',

  address: {
    line1: '254, 1st Floor, Hansa Industrial Park',
    line2: 'Barwala Road',
    locality: 'Derabassi',
    postalCode: '140507',
    district: 'Distt. SAS Nagar',
    region: 'Punjab',
    country: 'India',
    countryCode: 'IN',
    /** One-line form for footer, schema and Google Maps search. */
    oneLine:
      '254, 1st Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India',
    /** Preferred wording when describing where we are. */
    locationWording: 'Derabassi, Punjab (near Chandigarh)',
  },

  phones,
  /** Primary number: used for the header, the mobile Call button and schema. */
  primaryPhone: phones[0],
  whatsapp,

  /** TODO: replace with a domain email before launch (docs/PENDING.md #1). Keep it as the only place email is set. */
  email: {
    primary: 'sankoh.techsol@gmail.com',
    secondary: 'piyush.sankoh@gmail.com',
  },

  people: {
    proprietor: { name: 'Sanjay Kohli', title: 'Proprietor' },
    marketing: { name: 'Piyush Kohli', title: 'Marketing Head' },
  },

  brands: {
    own: ['Sankoh®', 'Stolzel®'],
    /** Authorised channel partner of. Which ranges come from them is unconfirmed (PENDING #12). */
    authorisedPartners: ['Scientific Devices', 'UPC'],
  },

  divisions: {
    valves: { name: 'Valves & Automation', colour: 'navy' },
    instruments: { name: 'Instruments & Analyzers', colour: 'blue' },
    repair: { name: 'Repair & Service', colour: 'amber' },
  },

  service: {
    area: 'All of India; quickest delivery and on-site service across North India',
    /** Never "24/7" or "round the clock" (CLAUDE.md §2.5). */
    availability: 'Service available 365 days a year',
    team: 'Qualified engineers and professionals',
    repairTurnaround: 'Typically 2–3 days for workshop repairs',
    repairScope: {
      valves: 'Valves, actuators, cylinders and positioners of any make',
      drives: 'VFDs, servo drives and HMIs of any make',
    },
    /** Second VFD brand pending (PENDING #15). */
    vfdBrands: 'ABB and all other makes',
    alsoOffers: [
      'Help selecting the right product',
      'Delivery, installation and testing',
      'New valves, surplus and discontinued valves and parts, reconditioned components',
      'Sourcing through a vendor network',
    ],
    advisory: {
      name: 'Valve Selection & Maintenance Advisory',
      description: 'Expert advice on choosing, maintaining and managing all types of valves',
    },
  },

  applications: [
    'Water treatment',
    'HVAC',
    'Building automation',
    'Industrial automation',
    'Water/milk ATMs',
  ],
  /** Media named by the company for automated and solenoid valves. */
  media: ['Air', 'Water', 'Oil', 'Gas', 'Chemicals', 'Steam'],

  /** Not yet provided — see docs/PENDING.md #2–5. Leave empty/undefined until confirmed. */
  pending: {
    // TODO: business hours (PENDING #2) — hidden until confirmed.
    hours: undefined as string | undefined,
    // TODO: Google Business Profile URL (PENDING #3). Until then maps links use a search for the address.
    googleBusinessProfileUrl: undefined as string | undefined,
    // TODO: LinkedIn / IndiaMART / other profile URLs (PENDING #4) — used for schema sameAs.
    sameAs: [] as string[],
  },

  /** TODO: IDs from the user (PENDING #5). Analytics and verification are off while empty. */
  integrations: {
    ga4MeasurementId: '' as string,
    searchConsoleVerification: '' as string,
    bingVerification: '' as string,
    turnstileSiteKey: '' as string,
  },
} as const;

export type Site = typeof site;

/** `tel:` link for a phone entry. */
export const telHref = (phone: { e164: string } = site.primaryPhone): string => `tel:${phone.e164}`;

/** `wa.me` link, optionally with a prefilled message (e.g. the page title). */
export const waHref = (text?: string): string =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** Quote form link; `product` is the only query string the site allows (SPEC §6.1). */
export const quoteHref = (product?: string): string =>
  `/request-a-quote/${product ? `?product=${encodeURIComponent(product)}` : ''}`;

/** Google Maps search link for the address (until a Business Profile URL exists). */
export const mapsHref = (): string =>
  site.pending.googleBusinessProfileUrl ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${site.address.oneLine}`,
  )}`;
