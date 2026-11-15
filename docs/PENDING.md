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
| 6 | Pneumatic & electric "Tri-Clover" and "UPVC" items — which is ball, which is butterfly | Names assigned from the images; flagged for review. **Pneumatic, done from the photos** (the old site labelled both only "Tri Clover Type"): legacy `tri-clover.png` (long tubular body, clamp ends) → Pneumatic Tri-Clover Ball Valve; `tri-clover-bfv.png` (short two-piece body around a disc) → Pneumatic Tri-Clover Butterfly Valve. Both old UPVC items were labelled only "UPVC": `upvc-ball.png` (true-union body with threaded ends) → Pneumatic UPVC Ball Valve; `bfv-upvc.png` (wafer body around a disc) → Pneumatic UPVC Butterfly Valve. **Electric, checked against the photos** (here the old site already named each item, and the photos agree): `tri-clove-ball-valve.png` (long tubular body, clamp ends, labelled "Electrical TC Ball Valve") → Electric Tri-Clover Ball Valve; `tri-clove-bfv.png` (two-piece body around a disc, labelled "Electrical TC Butterfly Valve") → Electric Tri-Clover Butterfly Valve | You (check images) |
| 7 | "Water Meter" vs "Mechanical Water Meter" — what's the difference (electronic?) | Generic water meter page | Company |
| 8 | Review all product page text for accuracy | Draft content, written from general knowledge | Company (quick skim) |



## Product range questions

| # | Item | Until confirmed |
|---|---|---|
| 9 | Is "Traps" = steam traps, and does the company sell them at all? | **Hide if not sold.** The Steam Traps page is written and live as a steam trap page (marked TODO in `manual-valves/steam-traps.md`). If the company does not sell steam traps, unpublish it (remove the body) and drop it from Related products on the Strainer, Sight Glass, Safety Valve and Piston Valve pages, which link to it |
| 10 | Do they sell vibration sensors? (company profile mentions them) | No page |
| 11 | Catalogue-only products: images needed (plug valves (the Pneumatic Plug Valve page is live with the placeholder drawing), motorised globe/gate, solenoid types, positioner, limit switch box, I/P converter, air release valve, thermowell, siphon, TDS/conductivity, DO, turbidity analyzers) | Placeholder illustration |
| 12 | Which product ranges come from Scientific Devices and UPC | Brands page describes them as authorised partners only |
| 13 | Category-level "commonly supplied" info: typical sizes, body materials, end connections, pressure classes | Product pages say "available to your specification"; spec table hidden |
| 14 | Pressure / temperature / size / material data for the product selector | Selector filters by type, operation, media, application only |
| 25 | Which products are sold under Sankoh® or Stolzel® (Stolzel markings appear on the photos of the pneumatic ball valve and spherical disc butterfly valve actuators, the Y-type angle seat valve body and nameplate, the Tri-Clover ball valve body and solenoid valves, and the limit switch box on the UPVC ball valve; on the electric pages, the Electric Actuated Ball Valve and Electric Tri-Clover Ball Valve bodies, and the actuators on the Electric Actuated Wafer and Spherical Disc Butterfly Valves) | Product structured data carries no brand. Once the company says which products are Sankoh® or Stolzel®, the site can show the brand and add it to the structured data |
| 26 | "Typical applications" on the Pneumatic Actuated Ball Valve page are general typical uses, not company-stated | Shown as drafted; company to review or replace |
| 27 | Low-resolution photos: Ball Valve – Flanged End (270px), Spring Loaded Non-Return Valve (150px) | Legacy images used; they look blurry on large screens. Ask the company for better photos, or use the catalogue's images if they cover these products |
| 28 | "Flush Bottom Valve" legacy photo looks like a wafer-pattern ball valve, not a flush bottom valve | **Image hidden.** The page shows the placeholder drawing instead. The legacy file stays at `src/assets/products/flush-bottom-valve.webp`, unused. Ask the company for the right photo, then add it to `images` in `flush-bottom-valve.md` |
| 30 | "Typical applications" and "Media" on all 18 Manual Valves pages are general typical uses, not company-stated (the company's media list covers automated and solenoid valves only) | Shown as drafted; company to review or replace. Knife Gate Valve lists only "Water" because slurry is not one of the six media values |
| 31 | Which types the company actually supplies within each manual valve product. The pages explain the common types in general terms without saying which are supplied: butterfly (wafer / lug, lever / gear), screwed ball valve (1/2/3-piece, BSP / NPT), flanged check valve (swing / lift), gate valve (rising / non-rising stem), forged valves (gate / globe / check; screwed / socket weld / flanged), flush bottom valve (disc opens into tank / into valve), strainer (Y-type / basket), sight glass (tubular / window; flanged / screwed / clamp ends), steam traps (float, bucket, thermostatic, thermodynamic) | Types described as general knowledge only. Once confirmed, they can go in each product's `variants` table |
| 32 | Repair of manual valves that have no repair page of their own: check valves, piston, flush bottom and safety valves. Also: does the company test, reset or certify safety valves? | These pages show no related repair service and say nothing about testing or certificates. Knife Gate Valve links to Gate Valve Repair, and Forged Valves to Gate and Globe Valve Repair: confirm that is right |
| 34 | "Typical applications" and "Media" on the Pneumatic Actuated Valves pages are general typical uses. The media come from the company's list (air, water, oil, gas, chemicals, steam), but which media fit each product is our choice. Company-stated applications (water treatment, HVAC, building automation, industrial automation, water/milk ATMs) are used where they fit | Shown as drafted; company to review or replace |
| 35 | Which types, materials and options the company supplies within each pneumatic product. Described in general terms only: wafer vs lug butterfly bodies; spherical disc seat/body materials and temperature limits; globe control valve trim, body and actuator options; angle seat valve normally closed / normally open / double-acting; plug valve sleeved / lubricated / multi-port; Tri-Clover seat compounds and internal surface finish; UPVC end connections (true union, flanged), ball, disc and seal materials, and chemical compatibility. Also: the Y-Type Angle Seat Valve links only to Actuator & Cylinder Repair: confirm whether the valve body is repaired too | Types described as general knowledge only. Once confirmed, they can go in each product's `variants` table |
| 36 | The Y-Type Angle Seat Valve photo has a Stolzel nameplate with one model's data (port size, body and seat material, NC position, media and air pressure ranges). Can that data be published, and is it one model or the whole range? | **Not used.** The page states no sizes, materials or pressures. Once confirmed, the data can go in the page's `variants` table |
| 37 | "Tri-Clover" is a trade name that is widely used generically for sanitary clamp ends (also called tri-clamp or TC). The pneumatic and electric Tri-Clover pages (four in all) keep the SPEC titles and explain the term as tri-clover (TC) clamps or clamp ends. Is the company happy with this name, or would it prefer "TC" or "Sanitary Clamp-End"? | Titles as in SPEC §2.2 |
| 38 | The Pneumatic Power Cylinder for Dampers photo (legacy `cylinder.png`) shows a third-party maker's name on the position indicator box. Is the photo fine to use (CLAUDE.md §2.4 allows no third-party logos), and does the company have its own photo? Also: which positioner and fail-position (lock-up) options are supplied with it | Photo shown as on the old site; options described generally |
| 39 | "Typical applications" and "Media" on the Electric Actuated (Motorised) Valves pages are general typical uses. Media come from the company's list (air, water, oil, gas, chemicals, steam), but which media fit each product is our choice. Company-stated applications (water treatment, HVAC, building automation, industrial automation, water/milk ATMs) are used where they fit | Shown as drafted; company to review or replace |
| 40 | Which types and options the company supplies within each electric product. Described in general terms only, nothing stated as supplied: supply voltages (AC single-phase, three-phase, DC); on/off vs modulating actuators and their control and feedback signals; fail-safe (spring-return or battery backup) options; enclosure types (weatherproof, flameproof); body types (the Electric Actuated Ball Valve photo shows a three-piece screwed body). The Electric Tri-Clover Ball Valve photo shows a supply voltage on the actuator label: **not used**, as it may be one model only | Pages tell the buyer to state supply, signal and fail position at enquiry. Once confirmed, options can go in each product's `variants` table |

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
