# SEO / AEO plan: phase 2

Status: **plan only, for review.** No page in this document is built yet. Page list approval comes before any writing.

Ground rules for everything below:
- Every company fact comes from `src/config/site.ts`, which is CLAUDE.md §4. If a fact is not there, it is not written.
- Search volumes are not estimated. **Priority** (H / M / L) is set by business value:
  - **H**: high-intent buyer queries for repair or products the company sells.
  - **M**: research queries that lead to an enquiry.
  - **L**: brand-awareness or long-tail queries.
- "Existing" means a page live on the astro-rebuild site today. "New" refers to a page in §B by its number.

Contents: [A. Search-query map](#a-search-query-map) · [B. Proposed new pages](#b-proposed-new-pages-18) · [C. AEO rules](#c-aeo-rules-for-all-new-content) · [D. Off-site checklist](#d-off-site-checklist-for-the-company)

---

## A. Search-query map

Hindi/Hinglish forms are listed where buyers actually type them, usually in Latin script and often mixed with English: "repair wala", "kharab", "ka rate", "chahiye". Devanagari queries are rare for industrial parts and are not targeted.

### A1. Local / near me

"Near me" ranking depends mostly on the Google Business Profile, its distance and its reviews (§D). The site's job is to back that profile up with a consistent NAP and clear service pages.

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| valve repair near me · valve repairing near me · valve repair shop near me · valve repair wala | GBP → `/valve-repair/` | No GBP link in schema yet (`sameAs` empty, PENDING #2/#3). Few reviews | H |
| control valve repair near me | GBP → `/valve-repair/control-valve-repair/` | As above | H |
| VFD repair near me · drive repair near me · AC drive repair near me · VFD repair wala | GBP → `/vfd-repair/` | As above | H |
| actuator repair near me · pneumatic actuator repair near me | GBP → `/valve-repair/actuator-cylinder-repair/` | As above | H |
| valve supplier near me · valve dealer near me · valve shop near me | GBP → `/products/` | GBP products section not filled | H |
| solenoid valve dealer near me | GBP → `/products/solenoid-valves/` | As above | M |
| flow meter dealer near me | GBP → `/products/flow-meters/` | As above | M |

### A2. Product + place

The site should not build one page per city (doorway pages). One page, `/areas-we-serve/` (New 17), names the states and industrial areas. Category pages stay the ranking target, and both link to each other.

Places: Punjab, Haryana, Himachal Pradesh, Chandigarh tricity (Chandigarh, Mohali, Panchkula, Zirakpur), Baddi (Baddi–Barotiwala–Nalagarh), Ludhiana, Derabassi.

| Query pattern (examples) | Page that should rank | Gap | Priority |
|---|---|---|---|
| valve supplier in Derabassi · valves Derabassi · valve repair Derabassi | Home, `/contact/` | Derabassi is in the address and the location wording, but no page explains the local offer in words | H |
| valve repair Chandigarh · valve repair Mohali · valve repair Panchkula · valve repair Zirakpur | `/valve-repair/` + New 17 | "near Chandigarh" appears in the location wording only. No tricity section | H |
| VFD repair Chandigarh · drive repair Mohali · VFD repair Ludhiana · VFD repair Baddi | `/vfd-repair/` + New 17 | No place wording on the VFD page | H |
| valve dealer Ludhiana · ball valve supplier Ludhiana · industrial valves Ludhiana | `/products/manual-valves/` + New 17 | Ludhiana not named anywhere | H |
| valve supplier Baddi · pharma valves Baddi · solenoid valve Baddi | `/products/` + New 17 + New 18 (pharma) | Baddi is named only as a site-job location | H |
| pneumatic valve supplier Punjab · pneumatic actuated valve Punjab | `/products/pneumatic-actuated-valves/` | Titles say "in India" only, which is right for the title. The body needs one line naming the regions supplied (site.ts `supplyRegions`) | M |
| solenoid valve dealer Haryana · valve supplier Ambala · valve supplier Panipat | Category pages + New 17 | Haryana is named only in the regions lists | M |
| valve supplier Himachal Pradesh · valve supplier Parwanoo / Kala Amb / Nalagarh | New 17 | Not covered | M |
| flow meter supplier Punjab · flow meter Chandigarh · electromagnetic flow meter Ludhiana | `/products/flow-meters/`, product pages | No place wording | M |
| water quality analyzer Punjab · pH analyzer supplier Chandigarh | `/products/analytical-instruments/` | No place wording | L |
| valve chahiye Ludhiana · valve ka dealer Chandigarh | Same as the English rows | Hinglish is not targeted in copy. One natural Hinglish FAQ on New 17 is enough | L |

### A3. Repair by make

Valve and actuator makes (`repairedMakes`): Fisher, Forbes Marshall, Rotork, AUMA, Samson, Siemens, Dembla, Rotex.
VFD makes (`vfdMakes`): ABB, Danfoss, Allen-Bradley, Siemens, Delta, Yaskawa, Schneider, L&T.

All are plain text only (no logos), and the wording stays "any make, including …". No model numbers or part claims are made for any make, and no make is called a partner. **The positioner page says "any make" and names none** (CLAUDE.md §4). Make-specific FAQs therefore go on the hub, actuator, control-valve and VFD pages, never on the positioner page.

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| Fisher control valve repair · Fisher valve repair India | `/valve-repair/control-valve-repair/` | The make is named only in `repairedMakesLine`. No answer block per make | H |
| Forbes Marshall valve repair · Forbes Marshall control valve service | `/valve-repair/control-valve-repair/` | As above | H |
| Rotork actuator repair · Rotork repair Punjab | `/valve-repair/actuator-cylinder-repair/` | As above | H |
| AUMA actuator repair · AUMA actuator service India | `/valve-repair/actuator-cylinder-repair/` | As above | H |
| Samson positioner repair · Samson control valve repair | `/valve-repair/control-valve-repair/` (not the positioner page, see above) | As above | M |
| Siemens positioner calibration · Siemens valve repair | `/valve-repair/control-valve-repair/` | As above | M |
| Dembla valve repair | `/valve-repair/` | As above | M |
| Rotex valve repair · Rotex actuator repair · Rotex solenoid valve repair | `/valve-repair/actuator-cylinder-repair/` | As above | M |
| ABB drive repair · ABB VFD repair · ABB ACS repair | `/vfd-repair/` | Title names ABB, Danfoss and Siemens. No per-make answer block | H |
| Danfoss VFD repair · Danfoss drive repair | `/vfd-repair/` | As above | H |
| Siemens VFD repair · Siemens drive repair | `/vfd-repair/` | As above | H |
| Allen-Bradley drive repair · Allen Bradley VFD repair | `/vfd-repair/` | Named in the list only | M |
| Delta VFD repair · Delta drive repair | `/vfd-repair/` | Named in the list only | H |
| Yaskawa VFD repair | `/vfd-repair/` | Named in the list only | M |
| Schneider VFD repair · Schneider Altivar repair | `/vfd-repair/` | Named in the list only | M |
| L&T drive repair · L&T VFD repair | `/vfd-repair/` | Named in the list only | M |
| [make] VFD kharab · [make] drive repair wala | `/vfd-repair/` | Not targeted. Covered by the English answer blocks | L |

**Decision: sections on existing pages, not separate make pages.** Sixteen make pages would share the same process, warranty, turnaround and checklist and differ only in the make's name: thin near-duplicates. There are no make-specific facts (model lists, parts held, job counts) to make each page unique. Instead:
- `/valve-repair/` gets a **"Makes we repair"** section with three H3 groups. Each group has a 40–60 word answer saying it is repaired, any make, with the same warranty and turnaround:
  - control valves (Fisher, Forbes Marshall, Samson, Siemens, Dembla)
  - actuators (Rotork, AUMA, Rotex)
  - positioners (worded "any make", with no names)
- `/vfd-repair/` gets the same section: one H3 per VFD make, each a 40–60 word answer. The wording varies per make by describing what the buyer sends (drive, rating plate photo, fault code), never by inventing make facts.
- Make FAQs on existing pages are listed in B6.
- Revisit separate pages only when the company can give make-specific facts, such as real repair photos of a make (CLAUDE.md §2.3).

### A4. Partner brand

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| Stolzel valves · Stolzel valve dealer · Stolzel supplier Punjab · Stolzel automated valves | New 1 `/brands/stolzel/` | Stolzel appears only as a card on `/brands/` | H |
| Stolzel pneumatic valve · Stolzel solenoid valve · Stolzel motorised valve | New 1 → category pages | As above | M |
| UPC instruments · UPC pressure gauge dealer · UPC flow meter supplier | New 2 `/brands/upc/` | Card only | M |
| Flowtech flow meter · Flowtech Measuring Instruments dealer · Flowtech level transmitter supplier | New 3 `/brands/flowtech/` | Card only | M |
| Stolzel price · Flowtech flow meter price | New 1 / 3 + New 14 (price guide) | No prices are published. The page answers "what decides the price" and links to the quote form | L |

The pages may not say "dealer" or "distributor": the fact is "authorised partner". The pages use "authorised partner" and answer the dealer query in a FAQ ("Are you a Stolzel dealer? We are an authorised partner of Stolzel…").

### A5. Problem / troubleshooting

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| control valve hunting · control valve oscillating · valve not reaching setpoint | New 8 | The positioner page has one FAQ ("Why does my valve hunt?"). The guide must go deeper, not repeat it | H |
| valve passing · valve leaking through when closed · valve leak ho raha hai | New 9 | Not covered | H |
| VFD tripping · VFD overcurrent fault · VFD overvoltage trip · drive trip ho raha hai · VFD kharab ho gaya | New 13 | One FAQ about supply surges only | H |
| solenoid valve not working · solenoid valve not opening · solenoid coil burnt | New 12 | Not covered | H |
| steam trap not working · steam trap blowing steam · steam trap failure signs | New 11 | Not covered | M |
| positioner calibration procedure · when to calibrate a positioner | New 10 | Covered in part on the positioner page. The guide stays general and links there | M |
| actuator not working · pneumatic actuator not turning · actuator slow | Covered by `/valve-repair/actuator-cylinder-repair/` common faults | No gap worth a page | M |

### A6. Comparisons

| Query | Page that should rank | Gap | Priority |
|---|---|---|---|
| ball valve vs butterfly valve · ball vs gate valve · gate valve vs globe valve | New 5 | Category "How to choose" covers this briefly | M |
| pneumatic vs electric actuator · pneumatic vs motorised valve | New 6 | Not covered | M |
| electromagnetic vs ultrasonic flow meter · which flow meter for water | New 16 | Not covered | M |
| repair or replace control valve · valve repair vs new valve | New 7 | The hub has a short "repair vs replace" block | H |
| steam valve selection · which valve for steam line | New 4 | Not covered | M |

### A7. Price ("what decides the price")

No prices are published anywhere (SPEC §7). Guides explain what decides the price and end at the quote form.

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| ball valve price · valve price list · valve ka rate · industrial valve price India | New 14 | Not covered | H |
| solenoid valve price · pneumatic valve price · motorised valve price | New 14 (one section per family) | Not covered | M |
| flow meter price · electromagnetic flow meter price | New 14 (instruments section) | Not covered | M |
| VFD repair cost · VFD repair charges · drive repair ka kharcha | New 15 | Not covered | H |
| valve repair cost · control valve repair charges · actuator repair cost | New 15 | Not covered | H |

### A8. Industry

`industriesNamed`: textile, pharma, food, paper, chemical, sugar, dairy, water treatment. These are covered by **one hub, `/industries/` (New 18)**, with one section per industry.

| Query (and variants) | Page that should rank | Gap | Priority |
|---|---|---|---|
| valves for textile industry · textile dyeing valve · steam valve textile Ludhiana | New 18 #textile | Industries are named only in a line | M |
| pharma valves · sanitary valves pharma Baddi · tri clover valve supplier | New 18 #pharma → tri-clover product pages | As above | H (Baddi is a pharma cluster, a strong local fit) |
| food grade valves · valves for food processing | New 18 #food | As above | M |
| valves for paper mill · paper industry valves | New 18 #paper | As above | M |
| chemical valves · valves for chemical plant · UPVC valve chemical | New 18 #chemical | As above | M |
| sugar mill valves · valves for sugar industry | New 18 #sugar | As above | M |
| dairy valves · milk valve · tri clover dairy valve | New 18 #dairy | As above | M |
| water treatment valves · STP ETP valves · valves for RO plant · water quality analyzer for ETP | New 18 #water-treatment | Water treatment is also an application chip. No page | H |

### A9. AI-assistant style questions

AI assistants answer from pages that state a fact plainly, near the top, with the company name in the sentence. `llms.txt` already lists the facts. The gaps are direct answer blocks on the pages, and off-site mentions (GBP, directories, partner sites) that confirm the same NAP.

| Prompt (examples) | Page(s) that should be cited | Gap | Priority |
|---|---|---|---|
| "Best valve repair company near Chandigarh" | `/valve-repair/`, New 17, GBP reviews | "Best" is earned off-site through reviews. On-site, a direct answer block "Who repairs valves near Chandigarh?" on New 17 | H |
| "Who repairs Rotork / AUMA actuators in Punjab?" | `/valve-repair/actuator-cylinder-repair/` | Make answer blocks (A3) | H |
| "Where can I get an ABB / Danfoss / Delta VFD repaired near Ludhiana?" | `/vfd-repair/`, New 17 | Make answer blocks plus place wording | H |
| "Is there a Stolzel authorised partner in Punjab?" | New 1 | Partner page | M |
| "Which company manufactures Sankoh valves?" · "Is Sankoh a manufacturer?" | `/brands/`, `/about/` | Answered. Keep the sankohMade wording exact | M |
| "Manual valve manufacturer in Derabassi" | Home, `/about/`, `/products/manual-valves/` | Answered on About and home. The category page now lists the Sankoh® make products | M |
| "How long does a valve repair take?" · "Do they repair on Sundays?" | `/valve-repair/` FAQs | Answered | L |
| "Water treatment valves and analyzers supplier in Punjab" | New 18 #water-treatment | Not covered | M |

---

## B. Proposed new pages (18)

Count: 3 partner + 13 guides + 1 areas + 1 industries hub = **18**. The cap was 25, so there is room for a later batch.

Common to every new page:
- One H1.
- Breadcrumbs plus BreadcrumbList.
- A 2–3 sentence direct answer under the H1.
- Call, WhatsApp and quote one tap away (existing components).
- The CTA band and the C rules.
- Titles below are the `seoTitle`: `pageTitle()` appends " | Sankoh" when the full suffix will not fit. Every resulting `<title>` is 60 characters or fewer.
- Meta descriptions are 120–155 characters; the count is in brackets.

New collections, as CLAUDE.md §8 expects:
- `src/content/guides/` → `/guides/<slug>/`, plus a `/guides/` index that lists them. The index is not counted as a content page and appears only once the first guide is live.
- `src/content/industries/` → the `/industries/` hub.
- Partner pages are a `[partner].astro` route under `/brands/` that reads `site.brands`.

### B1. Partner pages (3)

Facts allowed, all from site.ts:
- authorised partner of …
- the range line (`partnerLines`)
- "we supply (trade) their products; we do not manufacture them"
- the logo (`partnerLogoPermission`)
- our own services around them: help selecting, delivery, installation and commissioning, repair of valves and positioners of any make
- the stock and lead-time rows
- warranty "1 year on new products"

**Not allowed:** years of partnership, regions or territories, "dealer", "distributor", "exclusive", stock depth, model lists, prices, or the partner's own claims. Instrument pages also never imply that we calibrate or repair instruments.

#### 1. Stolzel
- **URL:** `/brands/stolzel/`
- **Title:** Stolzel Automated Valves – Authorised Partner
- **H1:** Stolzel automated valves
- **Target queries:** Stolzel valves, Stolzel valve dealer, Stolzel supplier Punjab, Stolzel pneumatic/solenoid/motorised valve
- **Meta (147):** Sankoh Technical Solutions is an authorised partner of Stolzel for automated valves: pneumatic, electric and solenoid valves to your specification.
- **Outline:**
  1. Direct answer: authorised partner; automated valves; traded, not manufactured.
  2. What we supply from Stolzel: links to the pneumatic, electric and solenoid categories. These are the categories whose Product JSON-LD names Stolzel.
  3. Help choosing (advisory link).
  4. Stock and delivery (StockDelivery).
  5. Installation and commissioning.
  6. Repair: we repair automated valves and positioners of any make (repair hub link).
  7. FAQ.
- **Internal links:** `/brands/`; the three categories; `/services/installation-commissioning/`; `/valve-repair/actuator-cylinder-repair/`; `/request-a-quote/`.
- **FAQ ideas:**
  - Are you a Stolzel dealer? (answer: authorised partner)
  - Do you manufacture Stolzel valves? (no)
  - Can you supply a Stolzel valve to my specification?
  - How quickly can a Stolzel valve be dispatched? (lead-time rows)
  - Do you repair automated valves?

#### 2. UPC
- **URL:** `/brands/upc/`
- **Title:** UPC Process Instruments – Authorised Partner
- **H1:** UPC process instruments
- **Target queries:** UPC instruments, UPC pressure gauge dealer, UPC flow meter supplier
- **Meta (142):** Sankoh Technical Solutions is an authorised partner of UPC for process instruments. Supplied to your specification and delivered across India.
- **Outline:**
  1. Direct answer.
  2. Instrument categories (links). Products are listed by name only once `partner: upc` is set on them (PENDING #10).
  3. What to tell us (EnquiryChecklist, instrument).
  4. Stock and delivery.
  5. Note: we supply instruments; we do not calibrate or repair them.
  6. FAQ.
- **Internal links:** `/brands/`; the instrument categories; `/services/product-sourcing/`; `/request-a-quote/`.
- **FAQ ideas:**
  - Are you a UPC dealer?
  - Do you calibrate or repair UPC instruments? (no, from `calibrationScope`)
  - Which UPC instruments can you supply? (categories; anything else is sourced)
  - Is there a warranty? (1 year on new products)

#### 3. Flowtech
- **URL:** `/brands/flowtech/`
- **Title:** Flowtech Instruments – Authorised Partner
- **H1:** Flowtech Measuring Instruments
- **Target queries:** Flowtech flow meter, Flowtech Measuring Instruments dealer, Flowtech level transmitter supplier
- **Meta (142):** Sankoh Technical Solutions is an authorised partner of Flowtech Measuring Instruments Pvt Ltd for process instruments, delivered across India.
- **Outline:** as UPC. Products are listed by name only once `partner: flowtech` is set on them (PENDING #10). Until then the page names no instrument types as Flowtech's.
- **Internal links and FAQ ideas:** as UPC.

### B2. Guides (13), at `/guides/<slug>/`

Every guide:
- is general product knowledge (CLAUDE.md §2.2), with no company specs;
- has question-style H2s, each opening with a 40–60 word answer;
- ends with a "Next step" block linking the matching repair or product page;
- has a visible FAQ of 3–5 items (FAQPage JSON-LD only because it is visible).

#### 4. Steam valve choice
- **URL:** `/guides/choosing-valves-for-steam-lines/`
- **Title:** Choosing Valves for Steam Lines: A Practical Guide
- **H1:** How to choose a valve for a steam line
- **Target queries:** steam valve selection, which valve for steam line, globe vs gate valve for steam
- **Meta (140):** Which valve suits a steam line: isolation, regulation, non-return and safety duties, what to check, and where steam traps and strainers fit.
- **Outline:**
  1. Which valve isolates a steam line?
  2. Which valve regulates steam flow?
  3. Do steam lines need a non-return valve?
  4. Where do steam traps and strainers go?
  5. What should I tell a supplier?
  6. Next step.
- **Links:** gate, globe and safety valve, steam traps, strainer, `/services/valve-selection-maintenance-advisory/`
- **FAQ ideas:** ball valve on steam? · why globe for throttling? · how often check a safety valve?

#### 5. Ball vs butterfly vs gate
- **URL:** `/guides/ball-vs-butterfly-vs-gate-valve/`
- **Title:** Ball vs Butterfly vs Gate Valve: Which to Use
- **H1:** Ball, butterfly or gate valve: which one to use
- **Target queries:** ball valve vs butterfly valve, ball vs gate valve, butterfly vs gate valve
- **Meta (152):** Ball, butterfly and gate valves compared: how each one shuts off, where each fits by size, pressure drop and operation, and which suits automation best.
- **Outline:**
  1. What is the difference in how they close?
  2. Which is best for large lines?
  3. Which gives the least pressure drop?
  4. Which is easiest to automate?
  5. Next step.
- **Links:** the three manual product pages, pneumatic ball and butterfly, the three repair pages
- **FAQ ideas:** can a butterfly valve throttle? · gate valve half open? · which needs fewest turns to operate?

#### 6. Pneumatic vs electric actuation
- **URL:** `/guides/pneumatic-vs-electric-actuated-valves/`
- **Title:** Pneumatic vs Electric Actuated Valves Compared
- **H1:** Pneumatic or electric actuated valve?
- **Target queries:** pneumatic vs electric actuator, pneumatic vs motorised valve
- **Meta (137):** Pneumatic or electric actuated valve? How each works, air versus power, speed, fail-safe options and duty, and what to tell us to choose.
- **Outline:**
  1. How does each actuator move the valve?
  2. Which needs less on site?
  3. Which can fail safe?
  4. Which suits frequent operation?
  5. What accessories go with each?
  6. Next step.
- **Links:** both categories, valve automation accessories, `/valve-repair/actuator-cylinder-repair/`
- **FAQ ideas:** spring return? · can I convert manual to automated? · positioner needed?

#### 7. Repair or replace a control valve
- **URL:** `/guides/repair-or-replace-control-valve/`
- **Title:** Repair or Replace a Control Valve? How to Decide
- **H1:** Should you repair or replace a control valve?
- **Target queries:** repair or replace control valve, valve repair vs new valve
- **Meta (132):** When a control valve is worth repairing and when to replace it: body and trim condition, discontinued models, downtime and warranty.
- **Outline:**
  1. When is a repair the better call?
  2. When is replacement better?
  3. What if the model is discontinued?
  4. What warranty applies? (6 months repaired; 1 year new)
  5. Next step.
- **Links:** `/valve-repair/control-valve-repair/`, `/services/surplus-discontinued-valves/`, `/products/pneumatic-actuated-valves/`
- **FAQ ideas:** can trim be replaced alone? · repair on site? · how long does it take? (typically 2–3 days)

#### 8. Control valve hunting
- **URL:** `/guides/control-valve-hunting-causes/`
- **Title:** Control Valve Hunting: Causes and What to Check
- **H1:** Why a control valve hunts, and what to check
- **Target queries:** control valve hunting, valve oscillating, valve not reaching setpoint
- **Meta (149):** Why a control valve hunts or will not hold setpoint: the positioner, actuator, air supply, packing friction and loop tuning, and what to check first.
- **Outline:**
  1. What does hunting look like?
  2. Is it the positioner?
  3. Is it the actuator or air supply?
  4. Can packing friction cause it?
  5. Could it be loop tuning?
  6. When to call for repair.
- **Links:** `/valve-repair/positioner-repair-calibration/`, `/valve-repair/control-valve-repair/`, air filter regulator, smart valve positioner
- **Note:** this must not repeat the positioner page's "Why does my valve hunt?" answer. The guide covers the full diagnosis; that FAQ stays short and links here.

#### 9. Valve passing
- **URL:** `/guides/valve-passing-leaking-when-closed/`
- **Title:** Valve Passing When Closed: Causes and Fixes
- **H1:** Why a closed valve still passes, and what fixes it
- **Target queries:** valve passing, valve leaking through, valve leak ho raha hai
- **Meta (144):** Why a valve leaks through when closed: seat and disc wear, debris, the wrong valve for the duty, actuator travel, and when to repair or replace.
- **Outline:**
  1. What does "passing" mean?
  2. What wears the seat?
  3. Can debris cause it?
  4. Is the actuator closing fully?
  5. Repair or replace?
  6. Next step.
- **Links:** `/valve-repair/`, the ball, gate and globe repair pages, strainer
- **FAQ ideas:** leak from the gland vs passing? · can a seat be lapped? · will a strainer help?

#### 10. When a positioner needs calibration
- **URL:** `/guides/when-to-calibrate-a-valve-positioner/`
- **Title:** When Does a Valve Positioner Need Calibration?
- **H1:** When a valve positioner needs calibration
- **Target queries:** positioner calibration, when to calibrate positioner
- **Meta (141):** Signs a valve positioner needs calibration: drift, wrong end positions, slow response or hunting, and the work after which it must be redone.
- **Outline:**
  1. What does calibration set?
  2. What are the signs?
  3. After which work must it be redone?
  4. On site or in the workshop?
  5. Next step.
- **Links:** `/valve-repair/positioner-repair-calibration/`, the SiteJobs block (positioner jobs), smart valve positioner
- **FAQ ideas:** do you calibrate instruments? (no) · how long on site? (about two days at each confirmed job, from projects data only)

#### 11. Steam trap failure signs
- **URL:** `/guides/steam-trap-types-and-failure-signs/`
- **Title:** Steam Trap Types and Signs of a Failed Trap
- **H1:** Steam trap types, and how to tell one has failed
- **Target queries:** steam trap not working, steam trap blowing steam, steam trap types
- **Meta (137):** Thermodynamic, ball float and other steam traps explained, the signs of a trap failed open or closed, and why a strainer before it helps.
- **Outline:**
  1. What does a steam trap do?
  2. How do the main types differ?
  3. What does a trap failed open look like?
  4. …and failed closed?
  5. Next step.
- **Links:** steam traps, thermodynamic steam trap, ball float steam trap, strainer, moisture separator
- **FAQ ideas:** can a trap be repaired? · which trap for tracing lines?

#### 12. Solenoid valve not working
- **URL:** `/guides/solenoid-valve-not-working/`
- **Title:** Solenoid Valve Not Working? Causes and Checks
- **H1:** Solenoid valve not working: causes and checks
- **Target queries:** solenoid valve not working, not opening, coil burnt
- **Meta (144):** Solenoid valve will not open, close or hums? Coil and voltage checks, minimum pressure for pilot valves, dirt in the pilot, and when to replace.
- **Outline:**
  1. Is the coil getting the right voltage?
  2. Why does a pilot-operated valve need pressure?
  3. Can dirt stop it?
  4. Why do coils burn out?
  5. Next step.
- **Links:** solenoid category, solenoid coils, direct-acting and pilot-operated product pages
- **FAQ ideas:** can I change the coil alone? · AC vs DC coil? · NAMUR solenoid for actuators?

#### 13. VFD trips
- **URL:** `/guides/vfd-tripping-common-causes/`
- **Title:** VFD Tripping: Common Causes Before You Call
- **H1:** Why a VFD trips, and what to check before you call
- **Target queries:** VFD tripping, overcurrent fault, overvoltage trip, drive trip ho raha hai
- **Meta (137):** Why a VFD trips on overcurrent, overvoltage or overheating, the safe checks to note before you call, and what to send if it needs repair.
- **Outline:**
  1. What does an overcurrent trip mean?
  2. …overvoltage?
  3. …overheating?
  4. What should I note down? (fault code, rating plate)
  5. When does it need repair? (3 months' warranty on repaired VFDs; any make)
- **Links:** `/vfd-repair/`
- **Safety:** "isolate and wait for discharge before opening" only, with no step-by-step electrical work.

#### 14. What decides a valve's price
- **URL:** `/guides/what-decides-industrial-valve-price/`
- **Title:** What Decides the Price of an Industrial Valve
- **H1:** What decides the price of an industrial valve
- **Target queries:** ball valve price, valve price list, valve ka rate, solenoid/pneumatic valve price, flow meter price
- **Meta (145):** What decides a valve's price: size, body and seat material, pressure class, end connection, manual or automated operation. How to compare quotes.
- **Outline:**
  1. Why is there no single price list?
  2. How much does size matter?
  3. Materials?
  4. Pressure class and ends?
  5. Manual vs automated?
  6. Instruments: what changes the price?
  7. How to get a quote (EnquiryChecklist).
- **No prices, no ranges.** Links: `/request-a-quote/`, the manual and automated categories, flow meters.

#### 15. What decides repair cost
- **URL:** `/guides/valve-and-vfd-repair-cost/`
- **Title:** What Decides the Cost of a Valve or VFD Repair
- **H1:** What decides the cost of a valve or VFD repair
- **Target queries:** VFD repair cost, valve repair charges, actuator repair cost
- **Meta (145):** What decides the cost of a valve, actuator, positioner or VFD repair: the fault, parts, on-site or workshop work, and why inspection comes first.
- **Outline:**
  1. Why is a repair quoted after inspection?
  2. What changes a valve repair cost?
  3. …a VFD repair cost?
  4. On site vs workshop?
  5. When is a new unit cheaper?
  6. Warranty (6 months / 3 months).
- **No prices.** Links: `/valve-repair/`, `/vfd-repair/`.

#### 16. Choosing a flow meter
- **URL:** `/guides/choosing-a-flow-meter/`
- **Title:** How to Choose a Flow Meter: Mag, Ultrasonic, Vortex
- **H1:** How to choose a flow meter
- **Target queries:** electromagnetic vs ultrasonic flow meter, which flow meter for water, flow meter selection
- **Meta (133):** How to choose a flow meter: electromagnetic, ultrasonic, vortex, turbine and rotameter compared by fluid, pipe size and installation.
- **Outline:**
  1. What is the liquid or gas?
  2. Does it conduct? (mag)
  3. Clamp-on or inline? (ultrasonic)
  4. Steam and gas? (vortex)
  5. Low flows? (rotameter)
  6. What to tell us (EnquiryChecklist instrument).
- **Links:** the flow meter category and products. Note: we supply instruments; we do not calibrate or repair them.

**Parked (not in the 18):** "Radar vs ultrasonic vs hydrostatic level transmitter". It goes first in the next batch.

### B3. Areas we serve (1)

#### 17. Areas we serve
- **URL:** `/areas-we-serve/`
- **Title:** Areas We Serve: Punjab, Haryana, HP and All India
- **H1:** Areas we serve
- **Target queries:** A2 place queries, "valve repair near Chandigarh", AI prompts in A9
- **Meta (140):** Sankoh Technical Solutions, Derabassi, supplies valves and instruments across India, with site work in Punjab, Haryana and Himachal Pradesh.
- **Outline:**
  1. Direct answer (`service.area`).
  2. **Where we are**: Derabassi, Punjab (near Chandigarh), with the map link.
  3. **States**: one H2 each for Punjab, Haryana, Himachal Pradesh (site work and supply), then Delhi NCR, Bengaluru, Andhra Pradesh (supplied), then "All of India".
  4. **Named industrial areas** as H3s under their state:
     - Punjab: Derabassi, Chandigarh tricity (Chandigarh, Mohali, Panchkula, Zirakpur), Ludhiana, Rajpura, Mandi Gobindgarh, Jalandhar, Amritsar
     - Haryana: Ambala, Panchkula, Yamunanagar, Panipat
     - Himachal Pradesh: Baddi–Barotiwala–Nalagarh, Parwanoo, Kala Amb
  5. How repairs reach us from anywhere (send it in, or on-site repair).
  6. The SiteJobs block (Fazilka, Ambala, Baddi; client names only with permission).
  7. FAQ.
- **Wording rule:** under each named area, only what site.ts supports:
  - we supply and deliver there (all of India);
  - site work in that state (PB, HR, HP);
  - repairs can be sent to our Derabassi workshop or done on site.

  Not allowed: local staff, offices, warehouses, stock in that city, delivery times to that city, client names, or "leading/best in [city]". Each area's paragraph must read differently, varying by which products and repairs the area's industries typically need (general knowledge), so the page is not a list of swapped names.
- **Internal links:** `/contact/`, `/valve-repair/`, `/vfd-repair/`, `/products/`, New 18
- **FAQ ideas:**
  - Do you come on site in Himachal Pradesh?
  - Can I send a valve from outside Punjab for repair?
  - Do you deliver outside North India?
  - Valve repair ke liye Derabassi aana padega? (Hinglish, answered in English)

### B4. Industries hub (1)

#### 18. Industries
- **URL:** `/industries/`
- **Title:** Valves and Instruments by Industry
- **H1:** Valves, instruments and repair for your industry
- **Target queries:** A8
- **Meta (139):** Valves, instruments and repair for textile, pharma, food, paper, chemical, sugar, dairy and water treatment plants, and any other industry.
- **Outline:**
  1. Direct answer (`industriesLine`: we serve any industry; these are examples).
  2. One H2 per industry, with an id (`#textile`, `#pharma`, `#food`, `#paper`, `#chemical`, `#sugar`, `#dairy`, `#water-treatment`). Each section has:
     - a 40–60 word answer to "Which valves and instruments does a [industry] plant use?" (general knowledge);
     - 4–6 product links, taken from products whose `industries` field names it;
     - the matching repair link.
  3. "Any other industry" block (sourcing).
  4. FAQ.
- **Linking:**
  - Set `industryHref: '/industries/#water-treatment'` for the "Water treatment" chip in `src/config/applications.ts`. It is the only application that is also a named industry.
  - The other four chips (HVAC, building automation, industrial automation, water/milk ATMs) stay on the selector.
  - Add an "Industries" row of eight links on the home page, next to the application chips, pointing at the anchors.
  - Add a footer Company link.
- **No client names or "trusted by [industry]" lines** unless a client has given permission and is in the clients collection.
- **Which section could become its own page later: water treatment.** Reasons:
  - It is the only industry that is also a company-named application (`site.applications`).
  - It has the most products that tie straight to it: the analytical instruments category (pH, ORP, DO, turbidity, chlorine, conductivity/TDS, BOD, COD, multi-parameter), UPVC valves, electromagnetic and open-channel flow meters, and level instruments. That is enough distinct, real content for a standalone page that is not thin.
  - The query set (STP, ETP, RO plant) is distinct from the other industries.
- **Second candidate: pharma**, because of the Baddi cluster and the tri-clover product pages. Split either section out only when it has outgrown the hub, with roughly double the hub section's unique content.

### B5. What is not proposed
- No city pages and no make pages (see A2, A3).
- No "dealer"/"distributor" pages.
- No price-list pages.
- No pages for products the company does not sell (vibration sensors, servo drives, HMIs).

### B6. Existing pages that get new FAQ items instead of new pages

All answers come from site.ts and are visible on the page. The page's FAQPage JSON-LD picks them up automatically.

| Page | New FAQ question | Answer source |
|---|---|---|
| Home `/` | Where are you based, and do you serve Chandigarh, Mohali and Panchkula? | `locationWording`, `service.area` |
| Home `/` | Which industries do you work with? | `industriesLine` + link to New 18 |
| `/valve-repair/` | Do you repair Fisher and Forbes Marshall control valves? | `repairedMakes`, "any make" |
| `/valve-repair/` | Do you repair Rotork and AUMA actuators? | as above |
| `/valve-repair/` | Can I send a valve for repair from Himachal Pradesh or Haryana? | `siteWorkRegions`, `onSiteRepair` |
| `/vfd-repair/` | Do you repair Delta, Yaskawa and L&T drives? | `vfdMakes` |
| `/vfd-repair/` | How long does a VFD repair take? | Only if the company confirms a VFD turnaround. `repairTurnaround` is stated for workshop valve repairs. **Ask before adding** |
| `/vfd-repair/` | Do you repair servo drives or HMIs? | "No" (CLAUDE.md §4). Answers a real query and prevents wrong leads |
| `/brands/` | Are you a dealer or distributor for Stolzel, UPC or Flowtech? | "authorised partner" wording, links to New 1–3 |
| `/brands/` | Which of your products are Sankoh® make? | sankohMade list (the same links as the category page) |
| `/contact/` | (the page has no FAQ today) Add 3: Can I visit your office in Derabassi? · How do I reach you about a breakdown? · Do you reply on WhatsApp on Sundays? | `hours`, `supportLine` (counts toward its 3-per-page cap) |
| `/valve-repair/actuator-cylinder-repair/` | Do you repair Rotex actuators? | `repairedMakes` |
| `/valve-repair/control-valve-repair/` | Do you repair Samson and Siemens control valves and their positioners? | `repairedMakes`. Positioner make names stay off the positioner page |
| `/valve-repair/positioner-repair-calibration/` | (shorten "Why does my valve hunt?" and link New 8) | no new item |
| `/products/solenoid-valves/` | Do you supply Stolzel solenoid valves? | partner page link |
| `/products/flow-meters/` | Do you calibrate or repair flow meters? | No (`calibrationScope`). This prevents wrong repair leads |
| `/products/manual-valves/` | Which manual valves do you make under the Sankoh® brand? | the sankohMade list |

---

## C. AEO rules for all new content

1. **Answer first.** Under every question-style H2, the first paragraph is a direct answer of **40–60 words** that makes sense on its own when quoted: subject named, no "as above", no "it". Detail follows.
2. **Facts only from `src/config/site.ts`.** That covers company name, location wording, regions, makes, warranty, lead times, response time, team, counts, industries and applications. Import them; never retype them. If a sentence needs a fact that is not there, leave it out and add a PENDING line.
3. **No invented specs, prices, certifications or counts:**
   - No pressure, temperature or size ranges stated as our stock; general "typical options" ranges only, framed as industry ranges.
   - No ₹ figures or price bands.
   - No ISO, API, ATEX or SIL claims as company claims.
   - No job counts beyond `clientCount`, `repairsPerYear` and `valvesSuppliedPerYear`.
   - No years of partnership.
4. **Make and brand wording:**
   - "Manufactured by Sankoh®" only on sankohMade pages, home, About, `/brands/` and llms.txt. That means not on partner pages, guides, the areas page or the industries hub (check:claims fails otherwise). Guides and hubs may say "Sankoh® manual valves", linking the sankohMade products.
   - Partners are "authorised partner", never dealer, distributor or exclusive.
   - Other makes are plain text, with no logos.
   - Never say we calibrate or repair instruments.
5. **Availability wording** comes only from `supportLine` / `supportLineShort`, within the 3-per-page cap. Never 24/7. "Typically 2–3 days" is for workshop repairs only.
6. **Every guide ends with a "Next step" block** linking at least one relevant repair page and one relevant product or category page, plus the quote button.
7. **FAQPage JSON-LD only where the FAQ is visible** on that page (native `<details>`, via the existing `FAQ` component with `schema`). check:seo already fails any question that is not visible, and more than one FAQPage per page.
8. **One H1; titles ≤60; metas 120–155.** Unique per page (check:seo).
9. **Every new page is in the sitemap and in llms.txt:** a "Guides" and "Areas and industries" section in `llms.txt.ts`.
10. **Original text** (CLAUDE.md §2.9). Hinglish appears only in FAQ questions where buyers phrase it that way, with answers in plain English.
11. **No near-duplicates:** check:repeats must pass. Area paragraphs and per-make answer blocks are written individually, not templated.

---

## D. Off-site checklist for the company

Hand this section to Sankoh as it is. All text uses the facts on the website. Wherever a URL is still pending, it is marked `[…]`.

### D1. Google Business Profile (GBP)

**Fields:**

| Field | Enter exactly |
|---|---|
| Business name | Sankoh Technical Solutions *(no extra keywords: Google suspends profiles that add them)* |
| Address | 69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India |
| Primary phone | +91 98884 91527 |
| Additional phone | +91 98779 38373 |
| Website | https://www.sankohtech.com/ |
| Hours | Monday to Saturday, 9:30 AM – 6:30 PM; Sunday closed |
| Opening date | December 2018 |
| Service area | Punjab, Haryana, Himachal Pradesh, Chandigarh (add the states; India-wide supply is in the description) |
| Appointment / quote link | https://www.sankohtech.com/request-a-quote/ |

**Categories.** Pick only names that appear in GBP's category dropdown; type each one and check it exists before choosing. Candidates, in order of fit:
- Primary: *Valve supplier* if it exists; otherwise *Industrial equipment supplier*.
- Additional (up to 9), each only if it exists in the dropdown: *Manufacturer* (for Sankoh® manual valves) · *Machine repair service* · *Electrical repair shop* (for VFD repair) · *Industrial equipment supplier* (if not primary) · *Equipment supplier*.
- Do not choose categories for things the company does not do, such as pumps, calibration labs or instrument repair.

**Description** (paste; 735 characters, under GBP's 750 limit):

> Sankoh Technical Solutions, Derabassi, Punjab (near Chandigarh), manufactures Sankoh® manual valves and supplies automated valves and process instruments as an authorised partner of Stolzel, UPC and Flowtech. We repair valves, actuators, positioners and VFDs of any make, in our workshop or on site, with typically 2–3 days for workshop repairs. Every product on our website is available from ready stock, with dispatch in 1–2 days. Warranty: 6 months on repaired valves and positioners, 3 months on repaired VFDs, 1 year on new products. We supply across India, with site work in Punjab, Haryana and Himachal Pradesh. Breakdown? Call or WhatsApp us any day, Sundays included. We respond the same day, or by the next day at the latest.

**Services** (add each with a one-line description from the website): Valve repair · Control valve repair · Actuator and cylinder repair · Positioner repair and calibration · VFD repair · Valve installation and commissioning · Valve selection and maintenance advisory · Product sourcing · Surplus and discontinued valves.

**Products** (one entry per category, with the category page URL and a photo the website already uses; no prices): Manual valves · Pneumatic actuated valves · Electric actuated valves · Solenoid valves · Valve automation accessories · Flow meters · Pressure instruments · Temperature instruments · Level instruments · Analytical instruments.

**Photos:** real photos only: the workshop, the team at work, a Sankoh®-branded valve (PENDING #8b). No stock images.

**After setup:** send us the GBP link and the pin's latitude/longitude (PENDING #2, #3a) so the website can link to it.

### D2. Review request (WhatsApp)

Rules: send it to **every** client after a job or delivery, not only the happy ones. **Never offer anything in return** (no discount, gift or priority): Google's policy forbids it, and reviews can be removed. Don't ask for a star rating or suggest wording. Replace `[GOOGLE REVIEW LINK]` with the "Ask for reviews" link from GBP (it looks like `https://g.page/r/…/review`).

**English:**
> Hello [Name], thank you for working with Sankoh Technical Solutions on [the valve repair / your order]. If you have a minute, we would be grateful for an honest review of our work on Google. It helps other plants find us.
> [GOOGLE REVIEW LINK]
> Thank you, Sanjay Kohli, Sankoh Technical Solutions

**Hinglish:**
> Namaste [Name] ji, Sankoh Technical Solutions ke saath [valve repair / order] ke liye dhanyavaad. Agar aapke paas ek minute ho, toh Google par hamare kaam ka ek honest review zaroor dein. Isse doosre plants ko hamein dhoondhne mein madad milti hai.
> [GOOGLE REVIEW LINK]
> Dhanyavaad, Sanjay Kohli, Sankoh Technical Solutions

**Reply to every review** within a few days, by name, without repeating the customer's details.

### D3. Directory listings: IndiaMART, Justdial, TradeIndia

Use this NAP **exactly the same** on every listing, character for character:

```
Sankoh Technical Solutions
69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India
+91 98884 91527
https://www.sankohtech.com/
```

Secondary number (where a second field exists): `+91 98779 38373 (Sales)`
Email: `sankoh.techsol@gmail.com`. Update every listing when the domain email is set up (PENDING #1).
Hours: `Monday to Saturday, 9:30 AM – 6:30 PM. Sunday closed.`
GSTIN (IndiaMART/TradeIndia verification): `03AKSPK5866E1ZW`
Year established: `2018`

**Short description** (Justdial "About", IndiaMART tagline):
> Manufacturer of Sankoh® manual valves; authorised partner of Stolzel, UPC and Flowtech; repair of valves, actuators, positioners and VFDs of any make. Derabassi, Punjab.

**Long description** (IndiaMART / TradeIndia company profile):
> Sankoh Technical Solutions was founded in December 2018 in Derabassi, Punjab (near Chandigarh). We manufacture manual valves under our own brand, Sankoh®. We supply automated valves (Stolzel) and process instruments (UPC and Flowtech Measuring Instruments Pvt Ltd) as an authorised partner; we do not manufacture them. Anything else we source to your specification through our vendor network.
>
> We repair valves of any make, manual and automated, including actuators, cylinders and positioners, and VFDs of any make (ABB, Danfoss, Allen-Bradley, Siemens, Delta, Yaskawa, Schneider, L&T and all other makes), on site or in our workshop. Workshop repairs typically take 2–3 days. Warranty: 6 months on repaired valves and positioners, 3 months on repaired VFDs, 1 year on new products.
>
> Every product on our website is available from ready stock, with dispatch in 1–2 days; up to 2–3 weeks if ready stock has run out; 3–4 weeks for customised items. We have served 400+ clients and supply all over India, with site work in Punjab, Haryana and Himachal Pradesh.

**Product listings on IndiaMART/TradeIndia:**
- Use the website's product names and one-line summaries, and link each to its page.
- **Do not enter prices** unless the company decides to publish them. The site never shows prices, and mismatched numbers confuse buyers and AI answers.
- **Do not label Stolzel, UPC or Flowtech products as "manufacturer"**. Choose "supplier", "trader" or "authorised partner" for those. Only the Sankoh® manual valves are "manufacturer".
- Justdial categories: Valve Dealers · Valve Manufacturers (Sankoh® manual valves only) · Valve Repair · VFD Repair / AC Drive Repair · Flow Meter Dealers · Industrial Instrument Dealers. Pick what Justdial offers.

### D4. Partner dealer-listing request email

Send to each partner's sales or channel contact (Stolzel, UPC, Flowtech). Replace `[Partner]` and `[product range]`:

> **Subject:** Listing Sankoh Technical Solutions on your authorised partner page
>
> Dear [Partner] team,
>
> Sankoh Technical Solutions is your authorised partner for [automated valves / process instruments] in Derabassi, Punjab. If your website has a page of authorised partners, dealers or where to buy, we would be grateful if you could list us there, with a link to our website.
>
> Please use these details:
> Sankoh Technical Solutions
> 69, Ground Floor, Hansa Industrial Park, Barwala Road, Derabassi – 140507, Distt. SAS Nagar, Punjab, India
> Phone: +91 98884 91527
> Email: sankoh.techsol@gmail.com
> Website: https://www.sankohtech.com/
>
> Our page about your range is https://www.sankohtech.com/brands/ (a dedicated page will follow).
>
> Please also confirm in writing that we may continue to use your logo and product photographs on our website, as we do now.
>
> Thank you,
> Sanjay Kohli
> Proprietor, Sankoh Technical Solutions

The last paragraph also closes PENDING #5 (written photo permission). Keep the replies.

### D5. After each listing goes live
Send the listing URLs (GBP, IndiaMART, Justdial, TradeIndia, LinkedIn, partner pages) to the web team. They go into `site.pending.sameAs` (PENDING #3), so the website's structured data links to them.
