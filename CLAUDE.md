# CLAUDE.md — Sankoh Technical Solutions website rebuild

Read this file fully at the start of every session. Detailed page, content, feature and SEO specs live in `docs/SPEC.md` — read the relevant section before building anything.

## 1. What we are building

A full rebuild of https://www.sankohtech.com for **Sankoh Technical Solutions**, an industrial valves, automation, instrumentation and repair company in Derabassi (near Chandigarh), Punjab, serving buyers across India.

Goals, in priority order:
1. **Search visibility** — rank on Google and get cited by AI assistants (ChatGPT, Claude, Perplexity, Gemini, Copilot). Every page must be complete, readable HTML without JavaScript.
2. **Calls and enquiries** — most customers phone. Call, WhatsApp and the quote form must be one tap away on every page.
3. **Credibility** — a modern, clean, engineering-grade site that makes the company look established and professional.
4. **Speed** — fast on mid-range Android phones on 4G.

The old site is a client-side Create React App with 5 URLs and no per-product pages. The new site has ~130 indexable pages.

## 2. Hard rules (never break these)

1. **Never invent facts.** No made-up specs, pressure/temperature ratings, sizes, materials, certifications, standards (ISO, API, ATEX, SIL…), years in business, customer counts, project numbers, awards or claims. Only state company facts listed in §4 or in content files. If a page needs a fact we don't have, put a `TODO:` in the content file and tell the user — never fill the gap yourself.
   - The old repo's `src/Data.js` contains placeholder certifications and specs. **Never migrate anything from it.**
2. **General product knowledge is allowed; company-specific claims are not.** "A butterfly valve regulates flow with a rotating disc" is fine. "We supply 2–24 inch butterfly valves in SS316" is not, unless it is in §4 or a content file.
   - Product pages may carry a **"Typical options"** table of general industry ranges (sizes, materials, end connections, pressure classes, output signals), framed as "available to your specification". It is general information, not a stock claim, and each table must be specific to its product type: never the same table on every page.
   - Still never claim certifications, compliance with a named standard as a company claim, years in business, counts or awards. Never print nameplate or dial data from a photo as a spec.
3. **No fake imagery.** No AI-generated or stock photos presented as Sankoh's workshop, team, projects or repairs. Use line illustrations and icons for processes. Product photo sources, in this order:
   1. Real product images from the old repo that carry no mark other than Sankoh's or an authorised partner's.
   2. The official sites or catalogues of the authorised partners (Flowtech, UPC, Stolzel); their logos may show. **Provisional until each partner has agreed in writing** (docs/PENDING.md): no launch before that.
   3. Wikimedia Commons or other openly licensed images: public domain, CC0, CC BY or CC BY-SA only, **never NC or ND**. Same kind of product, no brand visible. Record author, licence and URL in `docs/IMAGE-CREDITS.md`; the site has an Image credits page.
   4. The placeholder drawing. Any photo that fails the mark check falls back to this, never to a marked photo.
   - Never use images from marketplaces, competitors or other manufacturers, even if no logo shows. A photo only needs to be the same kind of product, not an exact model.
4. **No third-party brand logos or marks** except the own brand (Sankoh), authorised partners (Stolzel, UPC, Flowtech) and clients with permission (§4). Every other brand is plain text only.
5. **24/7 is false.** Never write "24/7", "round the clock", "any time of day" or "365 days". The only availability claim is **"Urgent breakdown support 7 days a week"** (short form "7-day breakdown support"), next to the office hours in §4. `npm run check:claims` enforces this.
6. **No client-only rendering for content.** Pages are static HTML. JavaScript only in small islands (quote form, product selector, mobile menu).
7. **Work on branch `astro-rebuild` only.** Never commit to or push `master`. Never force-push.
8. **Ask before adding any npm dependency** not listed in §5.
9. **Write original text.** Don't copy from manufacturer or competitor websites.

## 3. Positioning (use this framing everywhere)

> Sankoh Technical Solutions **manufactures** (Sankoh®), **supplies and sources** industrial valves, valve automation and process instruments as an authorised partner of Stolzel, UPC and Flowtech, and **repairs** valves, actuators, positioners and VFDs of any make, on site or in its workshop.

Three divisions, each with its own colour (§6):
- **Valves & Automation** — manual, pneumatic, electric and solenoid valves, automation accessories.
- **Instruments & Analyzers** — flow, pressure, temperature, level and analytical instruments.
- **Repair & Service** — valve repair, VFD repair, technical advice (valve selection & maintenance advisory), installation & commissioning, product sourcing, surplus/discontinued valves.

**Repair is a headline offering, not a footnote.** It gets equal weight with products in the nav, on the homepage and in internal links.

**Sourcing is a selling point.** They trade through a vendor network and can source products not listed on the site, to the customer's specification. Every category page ends with a "Can't find what you need? We'll source it" block.

## 4. Confirmed company facts (the only company facts you may state)

| Field | Value |
|---|---|
| Name | Sankoh Technical Solutions |
| Address | 69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India (current address, confirmed 19 Nov 2026; the former first-floor unit must not appear anywhere, `check:claims` fails on it) |
| Location wording | "Derabassi, Punjab (near Chandigarh)" |
| Phone (primary) | +91 98884 91527, the owner's number. The target of every Call and WhatsApp button, `tel:` link and `wa.me` link. Buttons are short labels ("Call us", "WhatsApp us") and **never print digits**; the number is in their aria-label. The full number is printed only in the desktop header strip and the footer (at most twice per page), plus the Contact page card and error states. Never in body text, FAQs or intros |
| Phone (sales, backup) | +91 98779 38373, the company sales line (not any one person's), labelled "Sales". Used when the primary can't be reached. Small secondary text only: "Sales: …" in the footer, "If you can't reach us" on the Contact page, and in error states (quote form failure). Never a button, never in place of the primary. In JSON-LD as a `ContactPoint` with `contactType: "sales"` |
| Proprietor | Sanjay Kohli — Proprietor (About page, with the owner photo from legacy `src/assets/Others/sankoh_owner.JPG`) |
| Email (current) | sankoh.techsol@gmail.com, the only email. It will be replaced by a domain email before launch, so keep it in one config value |
| GSTIN | 03AKSPK5866E1ZW (footer) |
| Own brand (manufacturer) | Sankoh® only |
| Authorised partner of | Stolzel, UPC, Flowtech Measuring Instruments Pvt Ltd |
| Service area | All of India; quickest delivery and on-site service across North India |
| Team | Qualified engineers and professionals |
| Office hours | Monday to Saturday, 9:30 AM to 6:30 PM. Sunday closed (from the Google Business Profile) |
| Support line | "Urgent breakdown support 7 days a week", Sundays included (**not** 24/7) |
| Repair turnaround | Typically 2–3 days for workshop repairs |
| On-site repair | Offered, as well as workshop repair |
| Repair scope | Valves of **any make**, manual and automated, including actuators and cylinders; positioners; VFDs of **any make**. **No** servo drive or HMI repair |
| VFD brands to name | ABB, Danfoss "and all other makes" |
| Warranty | 6 months on repaired valves and positioners; 3 months on repaired VFDs; 1 year on new products |
| Also offers | Help selecting the right product; technical advice; delivery, installation and testing; setting up and commissioning valve and automation systems for factories; new valves, surplus and discontinued valves and parts, reconditioned components; sourcing through a vendor network |
| Not sold | Vibration sensors |
| Advisory service | "Valve Selection & Maintenance Advisory" — expert advice on choosing, maintaining and managing all types of valves |
| Clients (logos + reviews permitted) | Exactly as in the old repo's reviews and client-logo components |
| Applications named by the company | Water treatment, HVAC, building automation, industrial automation, water/milk ATMs |
| Media named by the company (automated + solenoid valves) | Air, water, oil, gas, chemicals, steam |

Single source of truth: `src/config/site.ts`. Import from it everywhere. Never hard-code the phone number, address, email or GSTIN in components. Every Call, WhatsApp and quote action uses `src/components/contact/` (`CallButton`, `WhatsAppButton`, `QuoteButton`, `PhoneNumber`, `SalesLine`, `ContactCard`); `npm run check:contact` enforces the number rules on `dist/`.

## 5. Stack

- **Astro** (latest stable), static output, **TypeScript strict**.
- **Tailwind CSS** via the official Astro/Vite integration.
- **Preact** islands for the quote form, product selector and mobile menu (`@astrojs/preact`). No React, framer-motion or carousel libraries.
- **Content collections** with Zod schemas for products, categories, repair services, services, reviews, clients, brands, FAQs, certifications, projects. Check current Astro docs via Context7 before writing collection config.
- **`astro:assets`** for every image: AVIF/WebP, explicit width/height, lazy below the fold.
- **@astrojs/sitemap**; Astro view transitions (subtle only).
- **Fonts:** IBM Plex Sans (400, 600) and IBM Plex Mono (500), self-hosted via Fontsource. No Google Fonts requests.
- **Icons:** inline SVG components in one line style; no icon fonts.
- **Hosting:** Netlify (existing account, domain and redirects). Build `npm run build`, publish `dist`.
- **Quote email:** Netlify Function in `netlify/functions/`, nodemailer with the existing Gmail SMTP env vars for now. Spam: Cloudflare Turnstile + honeypot field.
- **Analytics:** GA4 loaded after interaction/idle; Google Search Console and Bing Webmaster verification tags. All IDs live in `site.ts` (TODO until provided).

Allowed dependencies: `astro`, `@astrojs/*`, `tailwindcss` and its Vite plugin, `preact`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`, `nodemailer` (functions only), `pagefind` (optional, phase 2). Anything else → ask first.

## 6. Design system (summary — full detail in docs/SPEC.md §3)

Style: **clean industrial, engineering-grade, simple but creative.** Generous white space, strong type hierarchy, technical-drawing details. Light theme only.

| Token | Hex | Use |
|---|---|---|
| `navy` | `#102A4C` | Header, footer, dark sections, headings. **Valves & Automation** division |
| `blue` | `#0976B5` | Links, primary accents. **Instruments & Analyzers** division. One step darker than the logo blue `#0A78B8` (4.49:1 on `paper`) so text passes AA (4.61:1); the logo files keep `#0A78B8` |
| `cyan` | `#0FB5D8` | Logo cyan: decorative lines, icons, highlights only (fails contrast as text on white) |
| `amber` | `#E5A823` | **Repair & Service** division + every call-to-action button (navy text on amber) |
| `ink` | `#0B1726` | Body text |
| `slate` | `#4A5B70` | Secondary text |
| `line` | `#DCE3EA` | Borders, table rules, grid lines |
| `paper` | `#F5F8FB` | Alternate section background |
| `white` | `#FFFFFF` | Base background |

Signature motifs (CSS/SVG only, cheap to render):
- Faint **blueprint grid** behind the hero and section headers.
- Thin **pipeline lines** (1–2px cyan/blue SVG paths) connecting sections, with a slow flow animation disabled under `prefers-reduced-motion`.
- **Line-art icons and process illustrations** in one stroke style (1.5px, rounded caps).
- **Spec-sheet details**: IBM Plex Mono for labels, codes, numbers and small-caps eyebrows (e.g. `REPAIR / 02`).
- Product images as clean cut-outs on `paper` or white tiles, consistent aspect ratio.

Logos: `public/brand/sankoh-logo-full.svg` (icon + wordmark) and `public/brand/sankoh-icon.svg` (icon only; also the source for favicons). Traced from low-res originals — fine at header size; replace if the original vector file turns up.

## 7. Information architecture (full list in docs/SPEC.md §2)

```
/                                     Home
/products/                            All products hub
/products/<category>/                 10 category pages
/products/<category>/<product>/       ~81 product pages, plus new ones in batches (SPEC §2.2)
/product-selector/                    Product selector tool
/valve-repair/                        Valve repair hub
/valve-repair/<service>/              8 valve repair pages
/vfd-repair/                          VFD repair (one page, no hub)
/services/                            Services overview
/services/valve-selection-maintenance-advisory/
/services/installation-commissioning/
/services/product-sourcing/
/services/surplus-discontinued-valves/
/brands/                              Own brands + authorised partners
/about/                               About + trust section
/contact/                             Contact + map
/request-a-quote/                     Quote form
/privacy-policy/
/image-credits/
/404
/downloads/sankoh-technical-solutions-catalogue.pdf
```

URL rules: lowercase, hyphenated, trailing slash, no query strings for content, no dates. Every page within 3 clicks of home.

## 8. Conditional sections

These render **only if their content folder has entries** — no empty headings or "coming soon" on the live site, and nav/footer links to them disappear too:
- Certifications (`src/content/certifications/`)
- Projects / case studies (`src/content/projects/`)
- Repair photo gallery (`src/content/repair-gallery/`)
- Buyer guides (`src/content/guides/`) — phase 2
- Industry pages (`src/content/industries/`) — phase 2

## 9. How to work

1. **Plan first.** For anything bigger than one component, use plan mode and get the plan approved.
2. **One section at a time.** Build → `npm run build`, `npx astro check` and `npm run check:all` (claims, repeats, links, contact; run it before every push) → Playwright screenshots at **390px** and **1440px** → critique against this file and SPEC.md → fix → commit.
3. **Design before scale.** Get the design system, homepage, one category page, one product page and the valve repair hub approved before generating the rest.
4. **Commit after every working step**, small commits, clear messages.
5. **Check the performance budget** (SPEC.md §8) after each template.
6. **Run the SEO checklist** (SPEC.md §7) on every template.
7. **Legacy code** lives in `legacy/` (the old CRA app) as **read-only reference** for product names, images, reviews, client logos and the old category map. Never import from it. Delete it before merging to `master`.
8. When unsure about a fact, **stop and ask**.

## 10. Open items

`docs/PENDING.md` holds only what the site cannot be finished without (keys, URLs, partner permission, the catalogue PDF) and real fact questions. Rules:
- Image, description, type, option and application choices are made with best judgement and not listed there.
- Until a fact is confirmed, build around it: hide the section or use safe wording that makes no claim. Never guess.
- Whenever you add a new `TODO:` for a missing fact, add a matching line to `docs/PENDING.md` in the same commit.
- When the user confirms an item, update §4 of this file and the content, then tick it off in PENDING.md.

**[CONFIRM] markers.** Text that needs the company's confirmation is tagged `[CONFIRM]` and listed in `docs/CONFIRM.md` (an unlisted marker fails `check:claims`). Any `[CONFIRM]` left in `dist/` fails the build when `CONTEXT=production`; previews and local builds only warn.
