# [CONFIRM] register

Text that is written but not yet confirmed by the company is marked with the literal tag `[CONFIRM]` in the source (`src/`, `public/`). Use it where a sentence or value is a best guess that a person must check before launch. Never use it to hold an invented fact: if a fact is missing, use a `TODO:` and add a line to `docs/PENDING.md` (CLAUDE.md §10).

Rules, enforced by `scripts/check-claims.mjs` (`npm run check:claims`, also run by `npm run build`):

- Every `[CONFIRM]` in `src/` or `public/` must have a row below that names its file path in backticks. An unlisted marker fails the check everywhere.
- Any `[CONFIRM]` left in `dist/` **fails the build when `CONTEXT=production`** (Netlify production deploys). In deploy previews and local builds it only warns.
- A row whose file no longer holds the marker gets a warning: delete the row when you resolve an item.

| File | Text | Who confirms | Why |
|---|---|---|---|
| `src/config/site.ts` | Udyam registration number (`udyamNumber`, empty) | Sanjay Kohli | Number not yet supplied. Fill it in the format `UDYAM-XX-00-0000000`; the footer and About show it as text once set. Production builds fail until this row is resolved |
