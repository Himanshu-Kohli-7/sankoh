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
| 9 | Is "Traps" = steam traps? | Page titled "Steam Traps", marked TODO; hide if wrong |
| 10 | Do they sell vibration sensors? (company profile mentions them) | No page |
| 11 | Catalogue-only products: images needed (plug valves, motorised globe/gate, solenoid types, positioner, limit switch box, I/P converter, air release valve, thermowell, siphon, TDS/conductivity, DO, turbidity analyzers) | Placeholder illustration |
| 12 | Which product ranges come from Scientific Devices and UPC | Brands page describes them as authorised partners only |
| 13 | Category-level "commonly supplied" info: typical sizes, body materials, end connections, pressure classes | Product pages say "available to your specification"; spec table hidden |
| 14 | Pressure / temperature / size / material data for the product selector | Selector filters by type, operation, media, application only |
| 25 | Which products are sold under Sankoh® or Stolzel® (the pneumatic ball valve photo shows a Stolzel-marked actuator) | Product structured data carries no brand |
| 26 | "Typical applications" on the Pneumatic Actuated Ball Valve page are general typical uses, not company-stated | Shown as drafted; company to review or replace |
| 27 | Low-resolution photos: Ball Valve – Flanged End (270px), Spring Loaded Non-Return Valve (150px) | Legacy images used; they look soft on large screens |
| 28 | "Flush Bottom Valve" legacy photo looks like a wafer-pattern ball valve, not a flush bottom valve | Legacy image used with a neutral alt text; confirm or send the right photo |

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
| 29 | Wrigley: the logo image says "Mars Wrigley" but the client name is listed as "Wrigley". Which does the company prefer? | Name and alt text say "Wrigley"; make both match once confirmed |

## Confirmed (moved to CLAUDE.md §4)

- [x] WhatsApp number: +91 98884 91527
- [x] Proprietor: Sanjay Kohli
- [x] No 24/7 — "365 days a year"
- [x] Repair turnaround: typically 2–3 days
- [x] Permission to use client reviews and logos
- [x] Valve management system → "Valve Selection & Maintenance Advisory"
