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
- Left: full logo (icon-only below 360px).
- Nav: Products (mega-menu: two columns — Valves & Automation, Instruments & Analyzers — each listing its categories), Valve Repair, Drive Repair, Services, About, Contact.
- Right: phone number as a `tel:` link (desktop), amber **Get a Quote** button.
- Mobile: hamburger → full-height menu (Preact island), accordion for product categories.

**Mobile action bar** (≤768px, fixed bottom, always visible)
- Three equal buttons: **Call** (`tel:` primary number), **WhatsApp** (`https://wa.me/<number>?text=<prefilled message with page title>`), **Quote** (`/request-a-quote/`, product prefilled when on a product page).
- 56px tall, safe-area padding, page gets matching bottom padding so content isn't hidden.
- On desktop: no bar; instead a small floating WhatsApp button bottom-right.

**Footer (navy)**
- Logo + one-line positioning, address, phones, email, GSTIN.
- Columns: Valves & Automation categories, Instruments categories, Repair & Services links, Company (About, Brands, Contact, Catalogue PDF, Privacy).
- "Service available 365 days a year · Repairs typically in 2–3 days".
- Copyright with current year.

**Shared components**
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
| `/drive-repair/` | Drive & HMI repair hub | "VFD repair", "servo drive repair", "HMI repair" |
| `/services/` | All services overview | — |
| `/services/valve-selection-maintenance-advisory/` | Advisory | "valve selection help", "valve maintenance services" |
| `/services/product-sourcing/` | Sourcing to customer spec | "industrial valve sourcing", "hard to find valves" |
| `/services/surplus-discontinued-valves/` | Surplus, obsolete, reconditioned | "discontinued valve replacement", "obsolete valve parts" |
| `/brands/` | Sankoh, Stolzel, Scientific Devices, UPC | brand names |
| `/about/` | Story, team, positioning, trust section | brand name |
| `/contact/` | All contact details, map, hours | "Sankoh Derabassi contact" |
| `/request-a-quote/` | Quote form | — |
| `/privacy-policy/` | What the form collects and why | — |

### 2.2 Product categories and products (~81)

Names below are the **page titles**. Slugs are the kebab-case of the name unless given. Items marked † are from the company profile but not on the old site — they get pages but need images (use a clean placeholder illustration until then). Items marked ? need confirmation (CLAUDE.md §10).

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
18. Steam Traps ?

`/products/pneumatic-actuated-valves/` — Pneumatic Actuated Valves
1. Pneumatic Actuated Ball Valve
2. Pneumatic Wafer Butterfly Valve
3. Pneumatic Globe Control Valve (also targets "control valve")
4. Pneumatic Plug Valve †
5. Y-Type Angle Seat Valve
6. Pneumatic Tri-Clover Ball Valve ?
7. Pneumatic Tri-Clover Butterfly Valve ?
8. Pneumatic UPVC Ball Valve ?
9. Pneumatic UPVC Butterfly Valve ?
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
4. Pilot Operated Piston Type Steam Solenoid Valve † (check legacy `ssv.png`)
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
6. Water Meter ? (confirm how it differs from #7)
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

Vibration sensor ? — add to a category only once confirmed.

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

`/drive-repair/<slug>/` (3):
1. VFD Repair (name ABB "and all other makes")
2. Servo Drive Repair
3. HMI Repair

---

## 3. Design details

**Type scale** (fluid with `clamp()`): h1 40→56px / 600; h2 28→36px / 600; h3 20→24px / 600; body 17px / 1.6; small 14px. Mono eyebrows 12–13px, letter-spacing 0.08em, uppercase.

**Layout**: max content width 1200px; 16px side gutters on mobile, 24px tablet, 32px desktop. 8px spacing grid. Section padding 64px mobile / 96px desktop.

**Division colour usage**: each product/repair page uses its division colour for the eyebrow, breadcrumb accent, icon strokes and a 4px top border on cards. Buttons are always amber (primary) or navy outline (secondary) regardless of division.

**Homepage** (top to bottom)
1. **Hero** on a blueprint grid: eyebrow `VALVES · AUTOMATION · INSTRUMENTS · REPAIR`; h1 "Industrial Valves, Instruments & Repairs — Any Make, Any Model"; one-line sub ("Manufacturer, supplier and repair partner from Derabassi, serving industries across India"); buttons **Call now** and **Get a quote**; right side: a composed cluster of 3–4 real product cut-outs connected by thin pipeline lines.
2. **Three division cards** (navy / blue / amber), each linking to its hub.
3. **Product categories grid** (10 tiles, two groups).
4. **Repair Hub band** (amber accent): "Any make. Any model. Typically back in 2–3 days." List of repair types, 5-step process strip, CTA "Send us your valve" (WhatsApp) + "Call the repair desk".
5. **Product selector teaser**: a mini filter row that links into `/product-selector/` with the choice applied.
6. **Brands strip**: Sankoh, Stolzel (own), Scientific Devices, UPC (authorised partners) — labelled as such.
7. **Why Sankoh**: six advantages from the company profile (right product, quick service response, any-make repairs, authorised channel partner, strategic location, engineering expertise).
8. **Applications**: water treatment, HVAC, building automation, industrial automation, water/milk ATMs (icons, no pages in phase 1).
9. **Trust**: client logo strip + review cards (+ certifications if present).
10. **Catalogue download** card + **Contact** block with lazy map.
11. **FAQ** (5–6 questions about ordering, sourcing, repair, delivery area).

**Repair section without photos** — make it feel professional through structure, not stock images:
- Illustrated **5-step process**: Receive & inspect → Strip down & assess → Repair / replace parts → Test & calibrate → Report & dispatch. Line illustrations, numbered mono labels.
- "What we repair" grid with line-art icons per valve/drive type.
- Fact strip: **Any make** · **Typically 2–3 days** · **365 days a year** · **Qualified engineers**.
- "Repair vs replace" explainer and FAQs.
- A conditional gallery block that appears when `repair-gallery/` gets real photos.

**Motion**: fade/slide-up on scroll via CSS + one small IntersectionObserver script (<1 KB), pipeline flow animation, hover lift on cards. Everything off under `prefers-reduced-motion`.

---

## 4. Content model

All in `src/content/`, typed with Zod. Shared fields: `title`, `slug`, `seoTitle` (≤60 chars), `metaDescription` (120–155 chars), `updated` (date).

**categories** — `division` (`valves` | `instruments`), `order`, `intro` (markdown), `heroImage`, `faqs[]`, `commonlySupplied` (optional, from company; hidden if empty).

**products** — `category` (reference), `order`, `images[]` (with alt), `summary` (1–2 sentences, used in cards and meta), `operation` (`manual` | `self-acting` (check valves, safety valves, steam traps, strainers, sight glasses: nothing to operate) | `pneumatic` | `electric` | `solenoid` | `n/a`), `media[]`, `applications[]`, `industries[]`, `variants[]` (optional, only confirmed), `relatedProducts[]`, `relatedRepair[]`, `faqs[]`, `todo` (optional note, never rendered). Body (markdown): the sections in §5.2.

**repairServices** — `group` (`valve` | `drive`), `icon`, `summary`, `whatWeRepair[]`, `commonFaults[]`, `brandsNote`, `faqs[]`, `relatedProducts[]`.

**services** — advisory, sourcing, surplus pages.

**reviews** — `name`, `role`, `company`, `quote`, `logo?` (migrate exactly from legacy; no edits to wording beyond typo fixes).

**clients** — `name`, `logo`, `order`.

**brands** — `name`, `relationship` (`own` | `authorised-partner`), `logo`, `description`.

**certifications**, **projects**, **repairGallery** — empty folders with schemas; sections render only when non-empty.

---

## 5. Page templates and content patterns

### 5.1 Category page
H1 = category name + "Supplier in India" variant in `seoTitle` only. Intro (120–200 words: what these products do, where they're used, that Sankoh manufactures/supplies/sources them), product grid, "How to choose" short guide (general knowledge), FAQs (4–6), related repair services, SourcingBlock, CTABand.

### 5.2 Product page (no-datasheet pattern)
1. Breadcrumbs, division eyebrow, H1, summary, image gallery, buttons **Get a quote for this product** / **Call** / **WhatsApp**.
2. **What it is and how it works** (80–150 words, general knowledge).
3. **Typical applications & media** (bullets; use company-stated applications/media where they exist, otherwise general typical uses — flag these for the user to review).
4. **Available to your specification**: "We supply this in a range of sizes, body materials, pressure ratings and end connections to match your process. Tell us your requirement and our engineers will recommend the right option." If `variants[]` or category `commonlySupplied` exists, show it as a spec-style table.
5. **What to tell us when you enquire** — `EnquiryChecklist` tailored per category (valves: size, pressure, temperature, media, body material, end connection, actuation, quantity; instruments: range, accuracy, process connection, output signal, display, media, quantity).
6. **FAQs** (3–4, product-specific, original).
7. **Related products** (3–4) and **Related repair service** (where one exists).
8. CTABand.

Word count target: 300–500 words of unique text per product. No boilerplate paragraphs repeated across pages except the short "available to your specification" line and the checklist.

### 5.3 Repair hub
H1 "Valve Repair Services — Any Make, Any Model". Intro, fact strip, "What we repair" grid → subpages, process steps, "Repair vs replace" section, why Sankoh, FAQs, conditional gallery, CTA (call / WhatsApp a photo of the valve / quote form with "Repair" selected).

### 5.4 Repair service page
What it covers, common faults/symptoms, how the repair works (process), testing/calibration step described generally, turnaround (2–3 days typical), any-make statement, FAQs, related products, CTA.

### 5.5 About
Positioning, three divisions, own brands and partners, owner/team block (owner photo + name/title once confirmed), Why Sankoh, trust section (clients, reviews, certifications if present), location.

---

## 6. Features

### 6.1 Quote form (`/request-a-quote/`)
- Fields: Enquiry type (Product / Repair / Sourcing / Advisory), Product or service (prefilled via `?product=<slug>` — the only allowed query string, page has a canonical without it), Name*, Company, Phone* (Indian mobile validation), Email, City/State, Requirement details* (textarea with placeholder showing the checklist), Quantity, File upload (optional: drawing/photo/nameplate; ≤5 MB; pdf/jpg/png), consent line.
- Works without JS (plain POST to the function, redirect to `/request-a-quote/thank-you/`); JS island adds inline validation and a loading state.
- Function: validates, verifies Turnstile, checks honeypot, sends (a) an enquiry email to the company with all fields + page source + UTM params, reply-to = customer email; (b) an acknowledgement to the customer if email given. From address = company address, never the customer's.
- Thank-you page: confirms receipt, shows phone/WhatsApp for urgent needs. Fires GA4 `generate_lead`.

### 6.2 Product selector (`/product-selector/`)
- Static JSON index generated at build from the products collection.
- Filters: Division, Category, Operation (manual / self-acting / pneumatic / electric / solenoid), Media (air, water, oil, gas, chemicals, steam), Application. All client-side, instant, with result count and "clear filters".
- Results link to product pages. Filter state in the URL hash (not query string) so it's shareable without creating crawlable duplicates.
- Page has a server-rendered intro and the full product list as the no-JS fallback.
- Pressure/temperature/size/material filters are added later only if confirmed data arrives.

### 6.3 Trust section
Client logo strip (greyscale, colour on hover), review cards (name, role, company), conditional certifications and projects. Review markup: **no** self-serving AggregateRating/Review schema (Google ignores it for a business's own reviews); plain HTML only.

### 6.4 Call & WhatsApp
`tel:` and `wa.me` links everywhere via one component reading `site.ts`. GA4 events: `click_call`, `click_whatsapp`, `download_catalogue`, `generate_lead` — mark these as conversions.

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
- Site-wide: `Organization` + `LocalBusiness` (name, address, geo, phones, email, url, logo, areaServed: India, `sameAs` once URLs are known, openingHours once known). Use one `@id` and reference it everywhere.
- `WebSite` on home.
- `BreadcrumbList` on all inner pages.
- `Product` on product pages: name, description, image, brand (only when it's Sankoh/Stolzel or a confirmed partner range), category, `offers` omitted (no prices). Don't add fake ratings.
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

## 10. Old-URL redirects (`netlify.toml` or `public/_redirects`)

Keep the existing apex → `www` redirect. Add 301s:

```
/about           /about/            301
/services        /valve-repair/     301
/contact         /contact/          301
/products        /products/         301
```

Query-string category URLs: read the legacy `categoryMap` in `legacy/src/components/ProductShowcase.js` and map each value with Netlify query matching, e.g.

```
/products  category=<old-value>  /products/<new-category>/  301
```

List every mapping explicitly; anything unmapped falls through to `/products/`. Test each with `curl -I` on the deploy preview.

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
