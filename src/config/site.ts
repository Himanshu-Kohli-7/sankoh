/**
 * Single source of truth for company facts (CLAUDE.md §4).
 * Import from here everywhere. Never hard-code phone numbers, address, email or GSTIN in components.
 * Add only facts confirmed in CLAUDE.md §4 — anything else is a TODO tracked in docs/PENDING.md.
 */

/** Primary number (the owner's): every Call button, tel: link and WhatsApp link uses it. */
const phone = { display: '+91 98884 91527', e164: '+919888491527' } as const;
/**
 * Company sales line, the backup when the primary can't be reached. Small secondary text only
 * (components/contact/SalesLine.astro): footer, Contact page and error states. Never a button.
 */
const salesPhone = { label: 'Sales', display: '+91 98779 38373', e164: '+919877938373' } as const;

/** WhatsApp uses the primary number. Only `number` (for wa.me) is needed: buttons never print digits. */
const whatsapp = { number: '919888491527' } as const;

/** How quickly we respond to a breakdown call (confirmed by the proprietor, 21 Nov 2026). */
const responseTime = 'the same day, or by the next day at the latest';
/** The end of the support sentence, shared by `supportLine` and the fact tile's second line. */
const SUPPORT_TAIL = `Call or WhatsApp us any day, Sundays included. We respond ${responseTime}.`;

/** Valve, actuator and positioner makes we repair, named as plain text only (CLAUDE.md §2.4). */
const repairedMakes = ['Fisher', 'Forbes Marshall', 'Rotork', 'AUMA', 'Samson', 'Siemens', 'Dembla', 'Rotex'] as const;
/** VFD makes we repair, named as plain text only. */
const vfdMakes = ['ABB', 'Danfoss', 'Allen-Bradley', 'Siemens', 'Delta', 'Yaskawa', 'Schneider', 'L&T'] as const;
/** Regions we have supplied to; we also supply all over India. */
const supplyRegions = ['Himachal Pradesh', 'Punjab', 'Haryana', 'Delhi NCR', 'Bengaluru', 'Andhra Pradesh'] as const;
/** Regions where site work has been done; it can be done anywhere in India. */
const siteWorkRegions = ['Himachal Pradesh', 'Punjab', 'Haryana'] as const;
const teamSize = '10–15';
const engineerExperience = '5+ years';

/**
 * Udyam registration. [CONFIRM] the number from the proprietor (docs/CONFIRM.md). While empty, the footer
 * and About show no number. Format: UDYAM-XX-00-0000000 (checked below; a malformed number fails the build).
 */
const udyamNumber = '' as string;
export const UDYAM_RE = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
if (udyamNumber && !UDYAM_RE.test(udyamNumber)) {
  throw new Error(`site.ts: Udyam number "${udyamNumber}" does not match UDYAM-XX-00-0000000`);
}

/** "A", "A and B", "A, B and C". */
const joinAnd = (items: readonly string[]): string =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

export const site = {
  name: 'Sankoh Technical Solutions',
  shortName: 'Sankoh',
  url: 'https://www.sankohtech.com',
  locale: 'en-IN',
  gstin: '03AKSPK5866E1ZW',

  positioning:
    'Manufacturer of Sankoh® manual valves, authorised partner for automated valves and process instruments, and repair specialist for valves, actuators, positioners and VFDs of any make.',

  /** Company facts confirmed by the proprietor, 21 Nov 2026 (CLAUDE.md §4). */
  company: {
    foundingDate: '2018-12',
    foundingYear: 2018,
    foundingDisplay: 'December 2018',
    clientCount: '400+',
    teamSize,
    engineerExperience,
    udyam: { registered: true, number: udyamNumber },
    /** We serve any industry; these are named as examples. */
    industriesNamed: ['Textile', 'Pharma', 'Food', 'Paper', 'Chemical', 'Sugar', 'Dairy', 'Water treatment'],
    industriesLine: 'Textile, pharma, food, paper, chemical, sugar, dairy, water treatment and any other industry.',
  },

  address: {
    line1: '69, Ground Floor, Hansa Industrial Park',
    line2: 'Barwala Road',
    locality: 'Derabassi',
    postalCode: '140507',
    district: 'Distt. SAS Nagar',
    region: 'Punjab',
    country: 'India',
    countryCode: 'IN',
    /** One-line form for footer, schema and Google Maps search. */
    oneLine:
      '69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India',
    /** Preferred wording when describing where we are. */
    locationWording: 'Derabassi, Punjab (near Chandigarh)',
  },

  /**
   * Primary number: the target of every Call and WhatsApp button and schema `telephone`.
   * Its digits are printed only by components/contact/PhoneNumber.astro (desktop header strip, footer)
   * and ContactCard on the Contact page. `npm run check:contact` enforces this.
   */
  phone,
  /** Backup sales line: small secondary text in the footer, on the Contact page and in error states only. */
  salesPhone,
  whatsapp,

  /** TODO: replace with a domain email before launch (docs/PENDING.md). Keep it as the only place email is set. */
  email: 'sankoh.techsol@gmail.com',

  people: {
    proprietor: { name: 'Sanjay Kohli', title: 'Proprietor' },
  },

  brands: {
    /** The only own brand. */
    own: ['Sankoh®'],
    /** What Sankoh manufactures, and the only thing it manufactures: manual valves under the Sankoh® brand. */
    manufactured: 'manual valves',
    /**
     * What each authorised partner's range covers. These are traded (supplied), never manufactured by Sankoh.
     * Keys match partnerLogoPermission.
     */
    partnerLines: {
      stolzel: 'automated valves',
      upc: 'process instruments',
      flowtech: 'process instruments',
    } as Record<string, string>,
    /** Authorised partners. Their logos and product photos may be shown (CLAUDE.md §2.4); no other brand's may. */
    authorisedPartners: ['Stolzel', 'UPC', 'Flowtech Measuring Instruments Pvt Ltd'],
    /**
     * Written permission to show each partner's logo: confirmed by the company, 18 Nov 2026 (docs/PENDING.md).
     * While false, the partner is shown by name only. Logo files: src/config/partnerLogos.ts.
     */
    partnerLogoPermission: { stolzel: true, upc: true, flowtech: true } as Record<string, boolean>,
  },

  divisions: {
    valves: { name: 'Valves & Automation', colour: 'navy' },
    instruments: { name: 'Instruments & Analyzers', colour: 'blue' },
    repair: { name: 'Repair & Service', colour: 'amber' },
  },

  service: {
    area: `All of India; site work in ${joinAnd(siteWorkRegions)}, and anywhere in India on request`,
    supplyRegions,
    siteWorkRegions,
    responseTime,
    /** Valves repaired a year. */
    repairsPerYear: '1,200–1,500',
    /** Stock and lead times for every product on the site. */
    stockNote: 'Every product on this site is available from ready stock.',
    leadTimes: {
      inStock: '1–2 days',
      notInStock: 'up to 2–3 weeks',
      customised: '3–4 weeks',
    },
    /** We calibrate valves and positioners only. Instruments are sold, never calibrated or repaired by us. */
    calibrationScope: 'Valves and positioners only',
    repairedMakes,
    vfdMakes,
    /**
     * The only availability claim the site makes (CLAUDE.md §2.5). The office keeps the hours above;
     * breakdown support runs every day. Use these two values everywhere; never hard-code a copy.
     * `npm run check:claims` bans the old wordings and `npm run check:contact` caps how often the phrase
     * may appear on a page (3: header strip, one contextual spot, footer).
     * - supportLineShort: the label, for the header strip (and its mobile menu copy), the footer and the fact tile.
     * - supportLine: the full sentence, for the contextual spot only (the footer uses the short label).
     * - supportLineTail: the end of the sentence, for the fact tile's second line under the label.
     * The old "7-day" label is banned (check:claims): it reads as a 7-day turnaround.
     * The header strip and footer use the short label; the full sentence is for the contextual spot only.
     */
    supportLine: `Breakdown? ${SUPPORT_TAIL}`,
    supportLineShort: 'Breakdown support 7 days a week',
    supportLineTail: SUPPORT_TAIL,
    team: `A team of ${teamSize}, with engineers of ${engineerExperience}' experience`,
    repairTurnaround: 'Typically 2–3 days for workshop repairs',
    /** On-site repair is offered as well as workshop repair. */
    onSiteRepair: 'On-site repair available',
    repairScope: {
      valves: 'Valves of any make, manual and automated, including actuators, cylinders and positioners',
      vfds: 'VFDs of any make',
    },
    vfdBrands: `${joinAnd([...vfdMakes, 'all other makes'])}`,
    /** "Any make, including Fisher, … and Rotex": valve and actuator repair pages and the hub only. */
    repairedMakesLine: `Any make, including ${joinAnd(repairedMakes)}`,
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

  /**
   * Office hours, the one place they are set: footer, Contact page and LocalBusiness schema read this.
   * Source: the Google Business Profile (replaces the 9–6 hours from the legacy footer).
   */
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:30',
    closes: '18:30',
    display: 'Monday to Saturday, 9:30 AM to 6:30 PM',
    /** Short form for the header strip and CTA band. */
    short: 'Mon–Sat 9:30 AM–6:30 PM',
    closed: 'Sunday closed',
  },

  /** Not yet provided — see docs/PENDING.md. Leave empty/undefined until confirmed. */
  pending: {
    // TODO: Google Business Profile URL (docs/PENDING.md). Until then maps links use a search for the address.
    googleBusinessProfileUrl: undefined as string | undefined,
    // TODO: LinkedIn / IndiaMART / other profile URLs (docs/PENDING.md) — used for schema sameAs.
    sameAs: [] as string[],
    // TODO: coordinates of the Google Business Profile pin (docs/PENDING.md). Schema `geo` is left out until set.
    geo: undefined as { latitude: number; longitude: number } | undefined,
  },

  /** TODO: IDs from the user (docs/PENDING.md). Analytics and verification are off while empty. */
  integrations: {
    /** GA4 "G-…" ID. Empty: components/Analytics.astro renders nothing and no analytics JS ships. */
    ga4MeasurementId: '' as string,
    /**
     * TODO (docs/PENDING.md #4): Google Search Console HTML-tag token, the `content` of
     * <meta name="google-site-verification">. Rendered by components/SEO.astro only when set.
     */
    searchConsoleVerification: '' as string,
    /** TODO (docs/PENDING.md #4): Bing Webmaster Tools token, the `content` of <meta name="msvalidate.01">. */
    bingVerification: '' as string,
    /**
     * IndexNow key (public by design): served as /<key>.txt by pages/[indexnow].txt.ts; the Netlify
     * plugin in netlify/plugins/indexnow pings changed URLs after each production deploy.
     */
    indexNowKey: '9ee9ab310d0ab86da859b1c90bafe697',
    /**
     * Cloudflare Turnstile site key (public). `astro dev` uses Cloudflare's test key instead.
     * The secret key lives only in Netlify as TURNSTILE_SECRET_KEY, never in the repo.
     * A production build fails if this is empty or a test key (lib/turnstile.ts).
     */
    turnstileSiteKey: '0x4AAAAAAGCFx79y_XT964J_' as string,
  },
} as const;

export type Site = typeof site;

/** "A", "A and B", "A, B and C". */
export const listAnd = joinAnd;

/** `tel:` link for a phone entry. */
export const telHref = (p: { e164: string } = site.phone): string => `tel:${p.e164}`;

/**
 * Accessible names for Call / WhatsApp buttons. They always start with the visible label
 * (WCAG 2.5.3 Label in Name) and end with the full number, which the button itself never prints.
 * Icon-only (no label) and the bare "Call" / "WhatsApp" labels read "Call Sankoh on +91 …".
 */
const contactAria = (verb: 'Call' | 'WhatsApp', label?: string): string => {
  const n = site.phone.display;
  if (!label || label === verb) return `${verb} ${site.shortName} on ${n}`;
  if (/ us$/.test(label)) return `${label} on ${n}`;
  return `${label} to ${n}`;
};
export const callAria = (label?: string): string => contactAria('Call', label);
export const whatsappAria = (label?: string): string => contactAria('WhatsApp', label);

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
