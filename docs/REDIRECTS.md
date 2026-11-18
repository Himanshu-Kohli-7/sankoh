# Old-URL redirects

Rules live in `netlify.toml` (SPEC §10). Test: `bash scripts/check-redirects.sh <base-url>` (curl -I, no follow, then the target path must answer 200 with no second hop).

## Where the old URLs come from

Inventory taken 17 Nov 2026 from branch `master` (and `origin/main`, which has only a README), the full git history and `legacy/`:

- Routes in the old app (`src/App.js`): `/`, `/about`, `/services`, `/products`, `/contact`. The old app was a client-side app that answered **every** path with its home page (`/* /index.html 200`), so `.html` variants and stray paths returned 200 and may be indexed.
- Category links: `/products?category=…[&subcategory=…]` from the nav, footer, old sitemap and `ProductShowcase.js`. Category ids in `src/data/products.js`: `manual-valves`, `automated-valves` (`pneumatic`, `electric`, `solenoid`), `process-instruments` (`flow-meter`, `pressure`, `temperature`, `level-transmitter`, `analytical`). The showcase's `categoryMap` sent "Process Instruments" to `category=instruments`, an id that never existed, so both are mapped.
- Files in `public/`: `sitemap.xml`, `robots.txt`, `manifest.json`, `logo.png` (the old og:image), `Icons/*` (favicons). Earlier in history: `logo192.png`, `logo512.png`, `favicon.ico`, `images/img1`, `images/industrial1.png`, `images/valve1.jpg`.
- No PDF or catalogue file was ever in the old repo.

## Rules (all 301, tested with `netlify dev` on 17 Nov 2026)

| Old URL | New URL | Result |
|---|---|---|
| `/products?category=manual-valves` | `/products/manual-valves/` | 301 → 200 |
| `/products?category=automated-valves&subcategory=pneumatic` | `/products/pneumatic-actuated-valves/` | 301 → 200 |
| `/products?category=automated-valves&subcategory=electric` | `/products/electric-actuated-valves/` | 301 → 200 |
| `/products?category=automated-valves&subcategory=solenoid` | `/products/solenoid-valves/` | 301 → 200 |
| `/products?category=process-instruments&subcategory=flow-meter` | `/products/flow-meters/` | 301 → 200 |
| `/products?category=process-instruments&subcategory=pressure` | `/products/pressure-instruments/` | 301 → 200 |
| `/products?category=process-instruments&subcategory=temperature` | `/products/temperature-instruments/` | 301 → 200 |
| `/products?category=process-instruments&subcategory=level-transmitter` | `/products/level-instruments/` | 301 → 200 |
| `/products?category=process-instruments&subcategory=analytical` | `/products/analytical-instruments/` | 301 → 200 |
| `/products?category=instruments&subcategory=` (same five) | same five targets | 301 → 200 |
| `/sitemap.xml` | `/sitemap-index.xml` | 301 → 200 |
| `/manifest.json` | `/site.webmanifest` | 301 → 200 |
| `/logo.png` | `/og/default.jpg` | 301 → 200 |
| `/logo192.png` | `/web-app-manifest-192x192.png` | 301 → 200 |
| `/logo512.png` | `/web-app-manifest-512x512.png` | 301 → 200 |
| `/Icons/favicon.ico` | `/favicon.ico` | 301 → 200 |
| `/Icons/favicon.svg` | `/favicon.svg` | 301 → 200 |
| `/Icons/favicon-96x96.png` | `/favicon-96x96.png` | 301 → 200 |
| `/Icons/apple-touch-icon.png` | `/apple-touch-icon.png` | 301 → 200 |
| `/Icons/web-app-manifest-192x192.png` | `/web-app-manifest-192x192.png` | 301 → 200 |
| `/Icons/web-app-manifest-512x512.png` | `/web-app-manifest-512x512.png` | 301 → 200 |
| `/index.html` | `/` | 301 → 200 (forced: the file exists) |
| `/about.html` | `/about/` | 301 → 200 |
| `/contact.html` | `/contact/` | 301 → 200 |
| `/products.html` | `/products/` | 301 → 200 |
| `/services.html` | `/services/` | 301 → 200 |

Parameter order does not matter (`subcategory=…&category=…` matches too), and `/products/?category=…` with a slash matches the same rules.

**The query string is carried over.** Netlify appends the old query to the target (`/products/manual-valves/?category=manual-valves`). It is still one hop to a 200, and the page's canonical has no query. An empty `?` on the target does not strip it; only a made-up parameter would, which is worse.

## Not redirected, on purpose

| Old URL | What happens | Why |
|---|---|---|
| `/products?category=automated-valves`, `process-instruments`, `instruments`, any other value | 200 on `/products/` | A rule back to `/products/` matches its own target (query carried) and loops: tested, it did. `/products/` ignores the query; its canonical is clean |
| `/about`, `/contact`, `/products`, `/services` | Netlify's trailing-slash handling (production: 301 to the slash URL; `netlify dev` serves 200) | A rule from `/about` also matches `/about/`, so it would loop or be shadowed |
| `/services` → `/valve-repair/` (old SPEC line) | Dropped: goes to the new `/services/` hub | Decided 17 Nov 2026 |
| `/images/*`, `/static/*` (old build assets), `/asset-manifest.json` | 404 | No equivalent; never linked |

## Apex requests

Old-URL rules come before the apex → www rule and use absolute `https://www.sankohtech.com/…` targets, so `https://sankohtech.com/products?category=manual-valves` goes straight to the www page. If Netlify's primary-domain redirect for the apex runs before the rules, apex requests take two hops (apex → www → page); check on production after launch.
