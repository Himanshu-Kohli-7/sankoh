/**
 * Single source of truth for company facts (CLAUDE.md §4).
 * Import from here everywhere. Never hard-code the phone, address, email or GSTIN in components.
 * Add only facts confirmed in CLAUDE.md §4 — anything else is a TODO tracked in docs/PENDING.md.
 */

/** The only company phone. It is also the WhatsApp number. */
const phone = { display: '+91 98884 91527', e164: '+919888491527' } as const;

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

  /** The only number: header, footer, Call buttons, mobile action bar and schema. */
  phone,
  whatsapp,

  /** TODO: replace with a domain email before launch (docs/PENDING.md). Keep it as the only place email is set. */
  email: 'sankoh.techsol@gmail.com',

  people: {
    proprietor: { name: 'Sanjay Kohli', title: 'Proprietor' },
  },

  brands: {
    /** The only own brand. */
    own: ['Sankoh®'],
    /** Authorised partners. Their logos and product photos may be shown (CLAUDE.md §2.4); no other brand's may. */
    authorisedPartners: ['Stolzel', 'UPC', 'Flowtech Measuring Instruments Pvt Ltd'],
  },

  divisions: {
    valves: { name: 'Valves & Automation', colour: 'navy' },
    instruments: { name: 'Instruments & Analyzers', colour: 'blue' },
    repair: { name: 'Repair & Service', colour: 'amber' },
  },

  service: {
    area: 'All of India; quickest delivery and on-site service across North India',
    /**
     * The only availability claim the site makes (CLAUDE.md §2.5). The office keeps the hours above;
     * breakdown support runs every day. `npm run check:claims` bans the old wordings.
     */
    supportLine: 'Urgent breakdown support 7 days a week',
    /** Short form for fact strips. */
    supportLineShort: '7-day breakdown support',
    team: 'Qualified engineers and professionals',
    repairTurnaround: 'Typically 2–3 days for workshop repairs',
    /** On-site repair is offered as well as workshop repair. */
    onSiteRepair: 'On-site repair available',
    repairScope: {
      valves: 'Valves of any make, manual and automated, including actuators, cylinders and positioners',
      vfds: 'VFDs of any make',
    },
    vfdBrands: 'ABB, Danfoss and all other makes',
    /** Warranty terms, as confirmed by the company. State them only in these words. */
    warranty: {
      repairedValves: '6 months on repaired valves and positioners',
      repairedVfds: '3 months on repaired VFDs',
      newProducts: '1 year on new products',
    },
    alsoOffers: [
      'Help selecting the right product',
      'Technical advice',
      'Delivery, installation and testing',
      'Setting up and commissioning valve and automation systems for factories',
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

  /** Office hours, the one place they are set: footer, Contact page and LocalBusiness schema read this. */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
    display: 'Monday to Saturday, 9:00 AM to 6:00 PM',
    closed: 'Sunday closed',
  },

  /** Not yet provided — see docs/PENDING.md. Leave empty/undefined until confirmed. */
  pending: {
    // TODO: Google Business Profile URL (docs/PENDING.md). Until then maps links use a search for the address.
    googleBusinessProfileUrl: undefined as string | undefined,
    // TODO: LinkedIn / IndiaMART / other profile URLs (docs/PENDING.md) — used for schema sameAs.
    sameAs: [] as string[],
  },

  /** TODO: IDs from the user (docs/PENDING.md). Analytics and verification are off while empty. */
  integrations: {
    ga4MeasurementId: '' as string,
    searchConsoleVerification: '' as string,
    bingVerification: '' as string,
    turnstileSiteKey: '' as string,
  },
} as const;

export type Site = typeof site;

/** "A", "A and B", "A, B and C". */
export const listAnd = (items: readonly string[]): string =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** `tel:` link for a phone entry. */
export const telHref = (p: { e164: string } = site.phone): string => `tel:${p.e164}`;

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
