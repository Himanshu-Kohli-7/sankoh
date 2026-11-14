# Starting the rebuild in Claude Code

## 1. One-time setup (your terminal, inside the repo)

```bash
git checkout master
git pull
git checkout -b astro-rebuild
```

Unzip `sankoh-starter.zip` and copy its contents into the repo root: `CLAUDE.md`, `docs/` and `brand-assets/` (Claude moves the logos into the new `public/` in Prompt 1). Then:

```bash
git add CLAUDE.md docs brand-assets
git commit -m "Add rebuild docs and brand assets"
git push -u origin astro-rebuild
claude
```

Inside the Claude Code session, pick the model with `/model`, then install plugins:

```
/plugin install frontend-design@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install skill-creator@claude-plugins-official
```

Add Context7 and Chrome DevTools from `/plugin` (search by name).

## 2. Prompts, in order

Use plan mode (Shift+Tab) for each, review the plan, then let it build.

**Prompt 1 — scaffold**
> Read CLAUDE.md, docs/SPEC.md and docs/PENDING.md fully. Then do Phase 0 from SPEC §11. First move the old Create React App (src, public, package files, netlify functions, generate-sitemap.js and any other app files) into `legacy/` with `git mv`, keeping CLAUDE.md, docs/, brand-assets/ and .git at the root. Then scaffold the Astro project at the repo root with the stack in CLAUDE.md §5, create `src/config/site.ts` with every fact from CLAUDE.md §4, set up the design tokens from §6 in Tailwind and CSS variables, self-host the fonts, move `brand-assets/*.svg` into `public/brand/`, generate favicons from `public/brand/sankoh-icon.svg`, add a `netlify.toml` (build `npm run build`, publish `dist`, Node 20+), and make sure `npm run build` passes. Commit and push.

**Prompt 2 — design system + shell**
> Using the frontend-design skill, build the global layout from SPEC §1 and §3: header with mega-menu, mobile menu island, footer, mobile action bar, and the shared components. Screenshot at 390px and 1440px with Playwright, critique against SPEC §3, fix, and show me the screenshots.

**Prompt 3 — homepage**
> Build the homepage exactly as SPEC §3 lists it, using real product images from `legacy/` for the hero cluster. No invented facts. Screenshot both sizes, self-critique, fix, then show me.

**Prompt 4 — templates for approval**
> Build the Manual Valves category page, the Pneumatic Actuated Ball Valve product page and the Valve Repair hub, following SPEC §5. Write the content files for just these three. Screenshot both sizes and show me before building anything else.

*(Stop here and iterate on design until you're happy.)*

**Prompt 5 — content migration**
> Create the product and category content files for every item in SPEC §2.2, migrating and renaming images from `legacy/` (descriptive kebab-case names, dedupe the jpeg-optimizer copies). Write original content per SPEC §5.2. Mark anything unconfirmed with `todo`. Give me a list of every TODO at the end.

**Prompt 6 — repair, services, about, contact, brands**
> Build all repair, drive repair, services, brands, about and contact pages per SPEC §2 and §5.

**Prompt 7 — features**
> Build the quote form, Netlify function and thank-you page (SPEC §6.1), the product selector (§6.2), the trust section (§6.3), catalogue download and GA4 events.

**Prompt 8 — SEO + performance**
> Run Phase 4: structured data, sitemap, robots.txt with AI crawlers, llms.txt, OG images, redirects from SPEC §10, IndexNow. Then run Lighthouse on home, a category, a product and the repair hub, and fix anything below the SPEC §8 budget. Report the scores.

**Optional — project SEO skill**
> Use skill-creator to make a project skill called `sankoh-page-check` that runs the SEO checklist (SPEC §7) and definition of done (SPEC §11) on a given page.
