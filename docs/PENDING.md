# Pending confirmations

Things the site is built around but that still need an answer from the company (or from you). Go through this list before launch. Claude adds a line here every time it leaves a `TODO:` in the code or content.

How to use: when something is confirmed, tell Claude "X is confirmed: …". It updates CLAUDE.md §4, the content, and ticks the box here.

## Before launch (needed for a complete site)

| # | Item | What the site does until confirmed | Who to ask |
|---|---|---|---|
| 1 | Domain email (e.g. info@sankohtech.com) | Uses sankoh.techsol@gmail.com from `site.ts` | You / company |
| 2 | Business hours | Hours hidden; "365 days a year" shown | Company |
| 3 | Google Business Profile URL | Map link uses a Google Maps search for the address | You |
| 4 | LinkedIn / IndiaMART / other profile URLs | `sameAs` left empty | Company |
| 5 | GA4 ID, Search Console + Bing verification, Turnstile keys | Placeholders in `site.ts`; analytics off | You |
| 6 | Pneumatic & electric "Tri-Clover" and "UPVC" items — which is ball, which is butterfly | Names assigned from the images; flagged for review | You (check images) |
| 7 | "Water Meter" vs "Mechanical Water Meter" — what's the difference (electronic?) | Generic water meter page | Company |
| 8 | Review all product page text for accuracy | Draft content, written from general knowledge | Company (quick skim) |



## Product range questions

| # | Item | Until confirmed |
|---|---|---|
| 9 | Is "Traps" = steam traps? | Page titled "Steam Traps" is written and published as a steam trap page, marked TODO. If wrong, unpublish it (remove the body of `manual-valves/steam-traps.md`) and rewrite |
| 10 | Do they sell vibration sensors? (company profile mentions them) | No page |
| 11 | Catalogue-only products: images needed (plug valves, motorised globe/gate, solenoid types, positioner, limit switch box, I/P converter, air release valve, thermowell, siphon, TDS/conductivity, DO, turbidity analyzers) | Placeholder illustration |
| 12 | Which product ranges come from Scientific Devices and UPC | Brands page describes them as authorised partners only |
| 13 | Category-level "commonly supplied" info: typical sizes, body materials, end connections, pressure classes | Product pages say "available to your specification"; spec table hidden |
| 14 | Pressure / temperature / size / material data for the product selector | Selector filters by type, operation, media, application only |
| 25 | Which products are sold under Sankoh® or Stolzel® (the pneumatic ball valve photo shows a Stolzel-marked actuator) | Product structured data carries no brand. Once the company says which products are Sankoh® or Stolzel®, the site can show the brand and add it to the structured data |
| 26 | "Typical applications" on the Pneumatic Actuated Ball Valve page are general typical uses, not company-stated | Shown as drafted; company to review or replace |
| 27 | Low-resolution photos: Ball Valve – Flanged End (270px), Spring Loaded Non-Return Valve (150px) | Legacy images used; they look blurry on large screens. Ask the company for better photos, or use the catalogue's images if they cover these products |
| 28 | "Flush Bottom Valve" legacy photo looks like a wafer-pattern ball valve, not a flush bottom valve | Legacy image used with a neutral alt text. The page is now published and its text describes a Y-shaped tank outlet valve, so the photo and the text do not match. A mislabelled photo hurts buyer trust: ask the company for the right photo, or leave this product without an image until we have one |
| 30 | "Typical applications" and "Media" on all 18 Manual Valves pages are general typical uses, not company-stated (the company's media list covers automated and solenoid valves only) | Shown as drafted; company to review or replace. Knife Gate Valve lists only "Water" because slurry is not one of the six media values |
| 31 | Which types the company actually supplies within each manual valve product. The pages explain the common types in general terms without saying which are supplied: butterfly (wafer / lug, lever / gear), screwed ball valve (1/2/3-piece, BSP / NPT), flanged check valve (swing / lift), gate valve (rising / non-rising stem), forged valves (gate / globe / check; screwed / socket weld / flanged), flush bottom valve (disc opens into tank / into valve), strainer (Y-type / basket), sight glass (tubular / window; flanged / screwed / clamp ends), steam traps (float, bucket, thermostatic, thermodynamic) | Types described as general knowledge only. Once confirmed, they can go in each product's `variants` table |
| 32 | Repair of manual valves that have no repair page of their own: check valves, piston, flush bottom and safety valves. Also: does the company test, reset or certify safety valves? | These pages show no related repair service and say nothing about testing or certificates. Knife Gate Valve links to Gate Valve Repair, and Forged Valves to Gate and Globe Valve Repair: confirm that is right |
| 33 | `operation` is `manual` on self-acting Manual Valves products (check valves, safety valve, steam traps) and on strainer and sight glass, which have nothing to operate | Not shown on the page. Decide before the product selector is built whether these should appear under the "Manual" filter or be set to `n/a` |

## Repair & services

| # | Item | Until confirmed |
|---|---|---|
| 15 | Second VFD brand ("denforce" — probably Danfoss) | Site names ABB "and all other makes" |
| 16 | Other drive/HMI brands they repair often | "Any make" wording only |
| 17 | Do they offer on-site repair, or workshop only? | Says on-site service across North India (from company profile) + workshop repairs in 2–3 days |
| 18 | Testing done after repair (e.g. pressure/seat leak test, calibration) | Process step described generally ("tested before dispatch") |

## Trust & company

| # | Item | Until confirmed |
|---|---|---|
| 19 | Year founded | Not shown |
| 20 | Certifications / test reports (ISO, Udyam/MSME etc.) | Section hidden |
| 21 | Repair / project photos (optional, later) | Repair gallery and projects hidden |
| 22 | Original vector logo file (optional) | Traced SVGs used |
| 23 | Logo files for Stolzel®, Scientific Devices and UPC | Homepage brands strip shows these three as text names |
| 24 | Catalogue PDF (`public/downloads/sankoh-technical-solutions-catalogue.pdf`) | Catalogue card and download links stay hidden until the file is added |
| 29 | Wrigley: the logo image says "Mars Wrigley" but the client name is listed as "Wrigley". Which does the company prefer? (Small fix for later) | Name and alt text say "Wrigley"; make the name and the logo's alt text match once confirmed |

## Confirmed (moved to CLAUDE.md §4)

- [x] WhatsApp number: +91 98884 91527
- [x] Proprietor: Sanjay Kohli
- [x] No 24/7 — "365 days a year"
- [x] Repair turnaround: typically 2–3 days
- [x] Permission to use client reviews and logos
- [x] Valve management system → "Valve Selection & Maintenance Advisory"
