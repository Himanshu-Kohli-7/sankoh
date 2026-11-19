# Sankoh website — build specification

Companion to `CLAUDE.md`. The hard rules in CLAUDE.md §2 override anything here.

Contents
1. Global layout & components
2. Pages and product inventory
3. Design details
4. Content model (collections + schemas)
5. Page templates and content patterns
6. Features
7. SEO and AI-search checklist
8. Performance budget
9. Accessibility
10. Old-URL redirects
11. Build phases and definition of done

---

## 1. Global layout & components

**Header (sticky, compact on scroll)**
- Top strip (navy, ≥769px): hours on the left (`Mon–Sat 9:30 AM–6:30 PM · 7-day breakdown support`), phone icon + the full primary number on the right. It switches on at the same width the mobile action bar switches off, so at every width either the number or a Call button is visible.
- Left: full logo (icon-only below 360px).
- Nav: Products (mega-menu: two columns — Valves & Automation, Instruments & Analyzers — each listing its categories), Valve Repair, VFD Repair, Services, About, Contact.
- Right: amber **Get a Quote** button (≥769px). No number in the bar.
- Mobile (≤768px): logo and menu only. Hamburger → full-height menu (Preact island), accordion for product categories, and one **Request a quote** button.

**Mobile action bar** (≤768px, fixed bottom, always visible)
- Two equal labelled buttons, no digits: **Call** (`tel:` primary number) and **WhatsApp** (`https://wa.me/<number>?text=<prefilled message with page title>`). The number is in each aria-label.
- 56px tall, safe-area padding, page gets matching bottom padding so content isn't hidden.
- From 769px: no bar; instead a small icon-only floating WhatsApp button bottom-right.

**Footer (navy)**
- Logo + one-line positioning, address, the full primary number once with a WhatsApp icon and a smaller "Sales: +91 98779 38373" line under it, email, GSTIN.
- Columns: Valves & Automation categories, Instruments categories, Repair & Services links, Company (About, Brands, Contact, Catalogue PDF, Privacy).
- Office hours (Monday to Saturday, 9:30 AM to 6:30 PM · Sunday closed), with "Urgent breakdown support 7 days a week · Repairs typically in 2–3 days" directly under them.
- Company column also links to Image credits.
- Copyright with current year.

**Shared components**
Contact (`src/components/contact/`): `CallButton`, `WhatsAppButton`, `QuoteButton` (variants primary · secondary · ghost · icon; tones light · dark · amber; labels like "Call us", never digits), `PhoneNumber` (the only component that prints the primary digits), `SalesLine`, `ContactCard` (`full` on the Contact page, `summary` on the home page).
`SEO` (head tags + JSON-LD), `Breadcrumbs`, `SectionHeader` (mono eyebrow + h2 + intro), `DivisionBadge`, `ProductCard`, `CategoryCard`, `RepairServiceCard`, `ProcessSteps`, `FAQ` (native `<details>`), `CTABand` (amber), `SourcingBlock`, `ReviewCard`, `ClientLogoStrip`, `TrustStats` (only confirmed facts), `EnquiryChecklist`, `PipelineDivider`, `BlueprintGrid`, `Icon`.

---

## 2. Pages and product inventory

### 2.1 Core pages
| URL | Purpose | Primary search intent |
|---|---|---|
| `/` | Overview of all three divisions, trust, contact | "valve supplier / valve repair Punjab / India", brand name |
| `/products/` | Hub of 10 categories, grouped by division | "industrial valves and instruments supplier India" |
| `/product-selector/` | Filter tool (§6.2) | — (noindex not needed; it's a real page with intro text) |
| `/valve-repair/` | Valve repair hub | "valve repair service", "control valve repair India" |
| `/vfd-repair/` | VFD repair, one page (ABB, Danfoss and all other makes) | "VFD repair", "AC drive repair", "ABB / Danfoss VFD repair" |
| `/services/` | All services overview | — |
| `/services/valve-selection-maintenance-advisory/` | Technical advice and advisory | "valve selection help", "valve maintenance services" |
| `/services/installation-commissioning/` | Setting up and commissioning valve and automation systems for factories | "valve installation and commissioning" |
| `/services/product-sourcing/` | Sourcing to customer spec | "industrial valve sourcing", "hard to find valves" |
| `/services/surplus-discontinued-valves/` | Surplus, obsolete, reconditioned | "discontinued valve replacement", "obsolete valve parts" |
| `/brands/` | Sankoh (own brand); Stolzel, UPC, Flowtech (authorised partners) | brand names |
| `/about/` | Story, team, positioning, trust section | brand name |
| `/contact/` | All contact details, map, office hours with the support line under them | "Sankoh Derabassi contact" |
| `/request-a-quote/` | Quote form | — |
| `/privacy-policy/` | What the form collects and why | — |
| `/image-credits/` | Author, licence and source of openly licensed photos (from `docs/IMAGE-CREDITS.md`) | — |

### 2.2 Product categories and products (~81)

Names below are the **page titles**. Slugs are the kebab-case of the name unless given. Items marked † are from the company profile but not on the old site. Image sources follow CLAUDE.md §2.3; the placeholder drawing is the last resort.

**Division: Valves & Automation**

`/products/manual-valves/` — Manual Valves
1. Butterfly Valve
2. Ball Valve – Flanged End
3. Ball Valve – Screwed End
4. Non-Return Valve (Check Valve) – Flanged End
5. Wafer Type Single Plate Check Valve
6. Dual Plate Check Valve
7. Spring Loaded Non-Return Valve
8. Gate Valve
9. Globe Valve
10. Knife Gate Valve
11. Piston Valve
12. Forged Valves
13. Flush Bottom Valve
14. Safety Valve
15. Needle Valve
16. Strainer
17. Sight Glass
18. Steam Traps

`/products/pneumatic-actuated-valves/` — Pneumatic Actuated Valves
1. Pneumatic Actuated Ball Valve
2. Pneumatic Wafer Butterfly Valve
3. Pneumatic Globe Control Valve (also targets "control valve")
4. Pneumatic Plug Valve †
5. Y-Type Angle Seat Valve
6. Pneumatic Tri-Clover Ball Valve
7. Pneumatic Tri-Clover Butterfly Valve
8. Pneumatic UPVC Ball Valve
9. Pneumatic UPVC Butterfly Valve
10. Pneumatic Spherical Disc Butterfly Valve
11. Pneumatic Power Cylinder for Dampers

`/products/electric-actuated-valves/` — Electric Actuated (Motorised) Valves
1. Electric Actuated Ball Valve
2. Electric Actuated Wafer Butterfly Valve
3. Electric Actuated Spherical Disc Butterfly Valve
4. Electric Tri-Clover Ball Valve
5. Electric Tri-Clover Butterfly Valve
6. Electric UPVC Ball Valve
7. Electric UPVC Butterfly Valve
8. Motorised Plug Valve †
9. Motorised Globe Valve †
10. Motorised Gate Valve †

`/products/solenoid-valves/` — Solenoid Valves
1. Direct Acting Solenoid Valve (2/2 & 3/2 Way)
2. Pilot Operated Diaphragm Solenoid Valve † (legacy image `pilot-type.png`)
3. Semi-Lift Diaphragm Solenoid Valve (General & Steam) † (legacy image `Semilift.png`)
4. Pilot Operated Piston Type Steam Solenoid Valve † (legacy image `ssv.png`)
5. Pulse Jet Dust Collector Valve †
6. Solenoid Coils †

`/products/valve-automation-accessories/` — Valve Automation Accessories
1. Limit Switch Box †
2. Smart Valve Positioner †
3. I/P Converter †
4. Air Release Valve †
5. Position Feedback & Local Control Units (electric actuators) †

**Division: Instruments & Analyzers**

`/products/flow-meters/` — Flow Meters
1. Electromagnetic Flow Meter
2. Vortex Flow Meter
3. Turbine Flow Meter
4. Ultrasonic Flow Meter
5. Mass Flow Meter
6. Water Meter (the general page; #7 explains mechanical meters)
7. Mechanical Water Meter

`/products/pressure-instruments/` — Pressure Instruments
1. Pressure Gauge
2. Pressure Switch
3. Pressure Transmitter
4. Differential Pressure Transmitter
5. Siphon (U & Q Type) †

`/products/temperature-instruments/` — Temperature Instruments
1. Temperature Gauge (Mechanical)
2. RTD Sensor
3. High Temperature Sensor
4. Temperature Transmitter
5. Thermowell †

`/products/level-instruments/` — Level Instruments
1. Radar Level Transmitter
2. Ultrasonic Level Transmitter
3. Capacitance Level Transmitter
4. Side Mounted Level Transmitter
5. Float Type Level Switch
6. Vibrating Fork Level Switch
7. Rotary Paddle Level Switch (legacy name "Resistance Rotary Level Switch")

`/products/analytical-instruments/` — Analytical Instruments
1. pH Sensor
2. pH Transmitter
3. BOD Sensor
4. COD Sensor
5. Conductivity & TDS Analyzer †
6. Dissolved Oxygen (DO) Analyzer †
7. Turbidity Analyzer †

Vibration sensors are not sold: no page.

**New products (approved list).** Before writing each one, check for overlap with existing pages and merge or differentiate instead of adding a near-duplicate.

Batch A (first): Pressure Reducing Valve, Diaphragm Valve, Foot Valve, 3-Way Ball Valve, Plug Valve, Basket Strainer, Thermodynamic Steam Trap, Ball Float Steam Trap (manual valves); Pneumatic Rotary Actuator, Electric Actuator (valve automation accessories, as stand-alone units so they do not compete with the actuated valve pages); Rotameter, Metal Tube Rotameter, Oval Gear Flow Meter, Orifice Plate & Flange Assembly (flow); Thermocouple (temperature); Magnetic Level Indicator, Level Gauge Glass, Hydrostatic Level Transmitter (level); ORP Analyzer, Chlorine Analyzer (analytical).

Batch B (later): Float Valve, Moisture Separator, Pneumatic Cylinder, Pneumatic Knife Gate Valve, Mini Motorised Valve, Electric Diaphragm Valve, NAMUR Solenoid Valve, Air Filter Regulator, Open Channel Flow Meter, Flow Switch, Manometer, Temperature Switch, Conductivity Level Switch, Cable Float Switch, Multi-parameter Water Quality Analyzer.

Cross-links: Needle Valve and Siphon/Thermowell appear as "accessories" on the gauge pages; Solenoid valves and accessories cross-link from every automated valve page.

### 2.3 Repair pages

`/valve-repair/<slug>/` (8):
1. Control Valve Repair
2. Actuator & Cylinder Repair (pneumatic and electric actuators, power cylinders)
3. Positioner Repair & Calibration
4. Globe Valve Repair
5. Gate Valve Repair
6. Butterfly Valve Repair
7. Ball Valve Repair
8. Plug Valve Repair

`/vfd-repair/` (one page, no hub): VFD Repair. Name ABB, Danfoss "and all other makes". There is no servo drive or HMI repair.

Every repair page and the hub state the warranty (6 months on repaired valves and positioners, 3 months on repaired VFDs), that on-site repair is offered, and the support line.

---

## 3. Design details

**Type scale** (fluid with `clamp()`): h1 40→56px / 600; h2 28→36px / 600; h3 20→24px / 600; body 17px / 1.6; small 14px. Mono eyebrows 12–13px, letter-spacing 0.08em, uppercase.

**Layout**: max content width 1200px; 16px side gutters on mobile, 24px tablet, 32px desktop. 8px spacing grid. Section padding 64px mobile / 72px desktop.

**Division colour usage**: each product/repair page uses its division colour for the eyebrow, breadcrumb accent, icon strokes and a 4px top border on cards. Buttons are always amber (primary) or navy outline (secondary) regardless of division.

**Homepage** (top to bottom)
1. **Hero** on a blueprint grid: eyebrow `VALVES · AUTOMATION · INSTRUMENTS · REPAIR`; h1 "Industrial Valves, Instruments & Repair — Any Make, Any Model" (three lines max at 1366px; CTAs above the fold at 1366x768 and 1536x695); one-line sub ("Manufacturer, supplier and repair partner from Derabassi, serving industries across India"); buttons **Get a quote** (primary) and **Call us**; right side: a composed cluster of 4 real product cut-outs connected by thin pipeline lines (below 640px a swipeable strip right after the CTAs).
2. **What we supply**: the three divisions as columns (navy / blue / amber top rule), each listing its five categories or services with a small thumbnail (product photo; line icon for repair), closed by one "We'll source it" line. Each link appears once.
3. **Repair Hub band** (navy, amber accent; the only navy section on the page): "Any make. Any model. Typically back in 2–3 days." List of repair types, 5-step process strip, CTAs **Request repair** + **WhatsApp a photo**.
4. **Proof band**: own brand (Sankoh) and authorised partners (Stolzel, UPC, Flowtech) labelled as such, client logo grid (3 / 5 / 7 columns), three testimonials with a link to all of them on `/about/#reviews`.
5. **Why Sankoh**: compact strip of the six advantages from the company profile (icon, short title, one line).
6. **Product selector** (paper, blue top rule): operation and media chips into `/product-selector/` with the filter applied, plus the company-named applications as chips from `config/applications.ts` (industry page when it exists, otherwise the selector's application filter).
7. **FAQ** (5–7 questions about ordering, sourcing, repair, delivery area).
8. **Contact + CTA band** (amber): Get a quote / Call us / WhatsApp buttons (no number), address, hours with the breakdown line, Google Maps link; catalogue link once the PDF exists.

Bands alternate (white, paper, navy, paper, white, paper, white, amber) so no two neighbours look alike.

**Repair section without photos** — make it feel professional through structure, not stock images:
- Illustrated **5-step process**: Receive & inspect → Strip down & assess → Repair / replace parts → Test & calibrate → Report & dispatch. Line illustrations, numbered mono labels.
- "What we repair" grid with line-art icons per valve type.
- Fact strip: **Any make** · **Typically 2–3 days** · **7-day breakdown support** · **Qualified engineers**.
- "Repair vs replace" explainer and FAQs.
- A conditional gallery block that appears when `repair-gallery/` gets real photos.

**Motion**: decorative only: pipeline flow animation and hover lift on cards, transitions 150ms max. No scroll-reveal: content never starts hidden or at opacity 0. Everything off under `prefers-reduced-motion`.

---

## 4. Content model

All in `src/content/`, typed with Zod. Shared fields: `title`, `slug`, `seoTitle` (≤60 chars), `metaDescription` (120–155 chars), `updated` (date).

**categories** — `division` (`valves` | `instruments`), `order`, `intro` (markdown), `heroImage`, `faqs[]`, `commonlySupplied` (optional, from company; hidden if empty).

**products** — `category` (reference), `order`, `images[]` (with alt), `typicalOptions[]` (label + value rows of general industry ranges, specific to the product type), `summary` (1–2 sentences, used in cards and meta), `operation` (`manual` | `self-acting` (check valves, safety valves, steam traps, strainers, sight glasses: nothing to operate) | `pneumatic` | `electric` | `solenoid` | `n/a`), `media[]`, `applications[]`, `industries[]`, `variants[]` (optional, only confirmed), `relatedProducts[]`, `relatedRepair[]`, `faqs[]`, `todo` (optional note, never rendered). Body (markdown): the sections in §5.2.

**repairServices** — `group` (`valve` | `vfd`), `icon`, `summary`, `whatWeRepair[]`, `commonFaults[]`, `brandsNote`, `faqs[]`, `relatedProducts[]`.

**services** — advisory, sourcing, surplus pages.

**reviews** — `name`, `role`, `company`, `quote`, `logo?` (migrate exactly from legacy; no edits to wording beyond typo fixes).

**clients** — `name`, `logo`, `order`.

**brands** — `name`, `relationship` (`own` | `authorised-partner`), `logo`, `description`. Own: Sankoh. Authorised partners: Stolzel, UPC, Flowtech.

**certifications**, **projects**, **repairGallery** — empty folders with schemas; sections render only when non-empty.

---

## 5. Page templates and content patterns

### 5.1 Category page
H1 = category name + "Supplier in India" variant in `seoTitle` only. Intro (120–200 words: what these products do, where they're used, that Sankoh manufactures/supplies/sources them), product grid, "How to choose" short guide (general knowledge), FAQs (4–6), related repair services, SourcingBlock, CTABand.

### 5.2 Product page (no-datasheet pattern)
1. Breadcrumbs, division eyebrow, H1, summary, image gallery, buttons **Get a quote for [product]** / **WhatsApp**. The side panel has the same two buttons and no number.
2. **What it is and how it works** (80–150 words, general knowledge).
3. **Typical applications & media** (bullets; use company-stated applications/media where they exist, otherwise general typical uses — flag these for the user to review).
4. **Available to your specification**: "We supply this in a range of sizes, body materials, pressure ratings and end connections to match your process. Tell us your requirement and our engineers will recommend the right option." Under it, a **Typical options** table from `typicalOptions[]`: general industry ranges for that product type (sizes, materials, end connections, pressure classes, output signals), captioned as general information that is available to your specification, not a stock list. Each product's table is its own; never one shared table. No named standard as a company claim. If `variants[]` or category `commonlySupplied` exists (confirmed company data), show it as a second table.
5. **What to tell us when you enquire** — `EnquiryChecklist` tailored per category (valves: size, pressure, temperature, media, body material, end connection, actuation, quantity; instruments: media, process connection, range, accuracy, output signal, power supply, hazardous area, quantity; instrument accessories such as siphons and thermowells: media, process connection, gauge or instrument it protects, pressure & temperature, material, quantity; analytical sensors, transmitters and analyzers: sample type & source, parameter & measuring range, sample temperature & pressure, installation (immersion, inline or flow cell), transmitter or sensor it pairs with, output signal & power supply, calibration & cleaning needs, quantity; valve automation accessories: make & model it fits, valve type & size, control signal, supply voltage, mounting, location & enclosure, quantity). Instrument pages never ask valve questions.
6. **FAQs** (3–4, product-specific, original).
7. **Related products** (3–4) and **Related repair service** (where one exists).
8. CTABand.

Word count target: 300–500 words of unique text per product. No boilerplate paragraphs repeated across pages except the short "available to your specification" line, the checklist and the warranty line (1 year on new products).

### 5.3 Repair hub
H1 "Valve Repair Services — Any Make, Any Model". Intro, fact strip, "What we repair" grid → subpages, process steps, "Repair vs replace" section, why Sankoh, FAQs, conditional gallery, CTA (call / WhatsApp a photo of the valve / quote form with "Repair" selected).

### 5.4 Repair service page
What it covers, common faults/symptoms, how the repair works (process), testing/calibration step described generally, turnaround (2–3 days typical), on-site repair, warranty, the support line, any-make statement, FAQs, related products, CTA.

### 5.5 About
Positioning, three divisions, own brands and partners, owner/team block (owner photo + name/title once confirmed), Why Sankoh, trust section (clients, reviews, certifications if present), location.

---

## 6. Features

### 6.1 Quote form (`/request-a-quote/`)
- Fields (exactly these; the privacy policy lists the same): Name*, Company, Phone* (Indian mobile validation), Email, Product or service (prefilled via `?product=<slug>`, the only allowed query string; the page has a canonical without it; any product, category, service or repair slug, e.g. `vfd-repair`), Quantity, Requirement details* (placeholder shows the checklist). **No file upload**: the form says "WhatsApp us a photo".
- Preact island with inline validation (rules shared with the function in `src/lib/quote.ts`), honeypot field and Cloudflare Turnstile (script loaded on first focus in the form). Turnstile site key in `site.ts`; `astro dev` uses Cloudflare's test keys; a production build fails if the key is missing or a test key. Secret only in Netlify (`TURNSTILE_SECRET_KEY`).
- Without JS the form is hidden and the page shows Call, WhatsApp and email (Turnstile needs JS, so there is no plain-POST path).
- Function `netlify/functions/quote.ts` at `/api/quote`: validates, checks honeypot, verifies Turnstile, sends one enquiry email to `site.email` with nodemailer (`EMAIL_USER` / `EMAIL_PASS`), Reply-To the customer email only when given; header values stripped of line breaks. No acknowledgement email to the customer (it would let anyone make the company mailbox write to any address).
- Success → `/thank-you/` (noindex, out of the sitemap; Call us / WhatsApp us for urgent needs; fires GA4 `generate_lead` once, from a sessionStorage flag set by the form).
- Failure state (send failed): "Please call us" with both numbers in full (primary and Sales) inside an element marked `data-contact-exempt`, the only place outside the Contact page where `check:contact` allows them. The typed data stays in the form. The function logs a short summary (time, reason, name, phone, product) so the lead is not lost.

### 6.2 Product selector (`/product-selector/`)
- Index built at build time from the products collection (`src/lib/selector.ts`), passed to a Preact island.
- Filters: Type (the 10 categories, by division), Operation (manual / self-acting / pneumatic / electric / solenoid), Media (air, water, oil, gas, chemicals, steam), Application (the five company-named applications, tagged only where a product's own `applications` text names them). OR within a filter, AND across; chip counts, result count, "clear filters", empty state linking to sourcing.
- Filter state in the URL hash, e.g. `#operation=pneumatic,electric&media=steam` (not a query string), so it's shareable without crawlable duplicates. `check:links` treats `#key=value` as state.
- Server-rendered intro and the full product list by type as the no-JS fallback.
- No material, size, pressure or temperature filters: Typical options are general prose ranges, not structured or confirmed data. Add them only if structured, confirmed data arrives.

### 6.3 Trust section
Client logo strip; one logo treatment everywhere (client, partner and review logos): greyscale, colour on hover or focus (`.logo-mono`), review logos small. Review cards (name, role, company), conditional certifications and projects. Review markup: **no** self-serving AggregateRating/Review schema (Google ignores it for a business's own reviews); plain HTML only.

### 6.4 Call & WhatsApp
`tel:` and `wa.me` links everywhere via `src/components/contact/` reading `site.ts`. Buttons show short labels ("Call us", "WhatsApp us", "Get a quote", "Request repair"); the full number is in the aria-label ("Call us on +91 98884 91527"; icon-only: "Call Sankoh on …"). The full primary number appears at most twice per page (header strip, footer), except the Contact page and error states; the sales number only in the footer, Contact page and error states. Placement: category pages Get a quote + Call us; repair pages Request repair + Call us + WhatsApp a photo; service pages Request [service] + Call us; CTA band Get a quote + Call us + WhatsApp with one hours line; 404 and privacy buttons only. `npm run check:contact` enforces this on `dist/`. GA4 events: `click_call`, `click_whatsapp`, `download_catalogue`, `generate_lead` — mark these as conversions.

### 6.5 Catalogue download
`/downloads/sankoh-technical-solutions-catalogue.pdf`, compressed, PDF title/author metadata set, linked from header mega-menu, homepage, every category page and footer. Direct download, no email gate.

### 6.6 Map
Static map image/illustration with a "Open in Google Maps" link to the Business Profile; the interactive embed loads only on click.

---

## 7. SEO and AI-search checklist (every template)

**Head**
- Unique `<title>` (≤60 chars, format: `<Page> | Sankoh Technical Solutions`, home: `Sankoh Technical Solutions – Valves, Instruments & Repair, India`).
- Unique meta description (120–155 chars), canonical (absolute, trailing slash), `og:*` + `twitter:card`, per-page 1200×630 OG image (generated at build from a template: title + division colour + logo).
- `<html lang="en-IN">`, viewport **without** `user-scalable=no`/`maximum-scale`. No meta keywords.

**Structure**
- One H1 per page; logical H2/H3; breadcrumbs on every inner page.
- Key facts as real HTML: lists, tables, `<details>` FAQs — no text inside images.
- Each page answers its main question in the first 2–3 sentences (good for AI answers and featured snippets).
- Internal links: product ↔ category ↔ related products ↔ related repair; repair ↔ products; footer links to all categories and repair hubs. Descriptive anchor text.
- Image alt text describes the actual product ("Pneumatic actuated ball valve with double-acting actuator"), file names kebab-case and descriptive.

**Structured data (JSON-LD)**
- Site-wide: `Organization` + `LocalBusiness` (name, address, geo, phone, email, url, logo, areaServed: India, `sameAs` once URLs are known, `openingHoursSpecification` from the office hours in `site.ts`). Use one `@id` and reference it everywhere.
- `WebSite` on home.
- `BreadcrumbList` on all inner pages.
- `Product` on product pages: name, description, image, brand (only when a product is confirmed as Sankoh® or as a named partner's range), category, `offers` omitted (no prices). Don't add fake ratings.
- `Service` on repair/service pages: serviceType, provider (Organization `@id`), areaServed.
- `FAQPage` where FAQs are visible on the page.
- Validate with Google Rich Results Test and the Schema.org validator before launch.

**Crawl & index**
- `@astrojs/sitemap` with lastmod; exclude thank-you and 404.
- `robots.txt`: allow all, explicitly allow `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `Bingbot`, `Applebot-Extended`; sitemap URL.
- `llms.txt` at root: short company summary, divisions, links to hubs and key pages (cheap to add; low but non-zero value).
- IndexNow key file + ping on deploy (Bing, Yandex) via a small Netlify build plugin or post-deploy script.
- 301 redirects from old URLs (§10). `www` is canonical (existing redirect stays).
- `noindex` only on thank-you page.

**Off-site (user tasks, track in README)**
Google Business Profile: add repair services and categories, link to new site, match name/address/phone exactly. Bing Webmaster Tools (import from Search Console). IndiaMART/TradeIndia/Justdial/LinkedIn with identical NAP and a link back. Ask reviewing clients to post Google reviews.

---

## 8. Performance budget

Measured on a throttled mid-range mobile profile (Lighthouse mobile):
- Lighthouse Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO 100.
- LCP < 2.0s, CLS < 0.05, INP < 200ms.
- JS shipped on content pages ≤ 30 KB gzip (islands only where needed); selector page ≤ 60 KB.
- CSS ≤ 25 KB gzip. Fonts: 3 files max, `font-display: swap`, preload the body font.
- Hero image ≤ 120 KB, product images ≤ 60 KB each at display size, all with width/height.
- No third-party scripts before interaction except GA4 (deferred).

---

## 9. Accessibility

WCAG 2.2 AA: colour contrast (cyan never as text on white; amber buttons use navy text), visible focus rings, skip link, labelled form fields with error messages, `aria-expanded` on menus, alt text on all meaningful images, minimum 44px tap targets, works at 200% zoom.

---

## 10. Old-URL redirects (`netlify.toml`)

Full table and test results: `docs/REDIRECTS.md`. Check with `bash scripts/check-redirects.sh <deploy-preview-url>`.

- Keep the existing apex → `www` redirect. Old-URL rules come before it and point at absolute `www` URLs, so a `www` request takes one hop.
- `/about`, `/contact`, `/products`, `/services`: Netlify's own trailing-slash handling, no rules (a rule from `/about` would also match `/about/` and loop). Old `/services` goes to the new `/services/` hub, not `/valve-repair/`: Netlify matches `/services` and `/services/` alike, so that redirect would either never fire or break the hub (decided 17 Nov 2026).
- Query-string category URLs (legacy `categoryMap` and `products.js` ids): one forced rule per `category` + `subcategory` pair, and `category=manual-valves`, each to its new category page. Netlify carries the old query string over; the page's canonical has none.
- Bare `category=automated-valves`, `process-instruments`, `instruments` and unknown values are **not** redirected: a rule back to `/products/` would match its own target (query carried) and loop. `/products/` ignores the query.
- Old files: `/sitemap.xml`, `/manifest.json`, `/logo.png`, `/logo192.png`, `/logo512.png`, `/Icons/*`, and `.html` variants of the old routes.

---

## 11. Build phases and definition of done

**Phase 0 — Setup**: branch `astro-rebuild`, move old app into `legacy/`, scaffold Astro + Tailwind + Preact, `site.ts`, design tokens, fonts, logos/favicons, Netlify deploy preview working.

**Phase 1 — Design approval**: header, footer, mobile action bar, homepage, one category page (Manual Valves), one product page (Pneumatic Actuated Ball Valve), Valve Repair hub. Screenshots at 390/1440 for the user to approve. *Do not continue until approved.*

**Phase 2 — Content & templates**: migrate products/images from legacy (rename, dedupe, compress), write category + product content (user reviews accuracy), repair pages, services, brands, about, contact.

**Phase 3 — Features**: quote form + function + thank-you page, product selector, trust section, catalogue download, GA4 events.

**Phase 4 — SEO & performance pass**: structured data, sitemap, robots, llms.txt, OG images, redirects, IndexNow, Lighthouse budget on every template, accessibility checks.

**Phase 5 — Launch**: merge to `master`, verify redirects on production, submit sitemap to Search Console and Bing, request indexing for home, hubs and categories, update Google Business Profile link.

**Phase 6 — After launch**: buyer guides, industry pages, repair photos/projects when available, Pagefind search if needed.

**Definition of done for any page**: content accurate with no invented facts · unique title/description/H1 · breadcrumbs + JSON-LD valid · images optimised with alt text · internal links present · CTA + mobile action bar work · Lighthouse budget met · screenshots at 390 and 1440 reviewed.
