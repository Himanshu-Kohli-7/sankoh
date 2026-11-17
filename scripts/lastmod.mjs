/**
 * Sitemap lastmod from git (SPEC §7), used by astro.config.mjs.
 *
 * Each URL gets the date of the last commit that touched its content file (a product, category,
 * repair or service entry) or, for a fixed page, its file in src/pages/. Template changes do not
 * count: lastmod tracks the page's own content.
 *
 * In a shallow clone (Netlify can clone shallow) every file would show the same commit date, which
 * says nothing, so lastmod is left out entirely. The same if git is unavailable. The mode is logged.
 */
import { execFileSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

/** URL path → source files whose last commit date is the page's lastmod. */
function sourcesFor(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  const [first, second, third] = parts;
  if (parts.length === 0) return ['src/pages/index.astro'];
  if (first === 'products') {
    if (third) return [`src/content/products/${second}/${third}.md`];
    if (second) return [`src/content/categories/${second}.md`];
    return ['src/pages/products/index.astro'];
  }
  if (first === 'valve-repair') {
    return second ? [`src/content/repair-services/valve/${second}.md`] : ['src/content/repair-hubs/valve-repair.yaml'];
  }
  if (first === 'vfd-repair') return ['src/content/repair-services/vfd/vfd-repair.md'];
  if (first === 'services') return second ? [`src/content/services/${second}.md`] : ['src/pages/services/index.astro'];
  return [`src/pages/${first}.astro`];
}

/** Returns `(url) => ISO date | undefined`, or undefined when lastmod should be left out. */
export function gitLastmod() {
  let shallow;
  try {
    shallow = git('rev-parse', '--is-shallow-repository') === 'true';
  } catch {
    console.log('[sitemap] lastmod: omitted (git unavailable)');
    return undefined;
  }
  if (shallow) {
    console.log('[sitemap] lastmod: omitted (shallow clone, every file would share one commit date)');
    return undefined;
  }

  /** One git call: newest commit date per file under src/. */
  const dates = new Map();
  let current;
  for (const line of git('log', '--format=@%cI', '--name-only', '--', 'src/content', 'src/pages').split('\n')) {
    if (line.startsWith('@')) current = line.slice(1);
    else if (line && !dates.has(line)) dates.set(line, current);
  }

  let found = 0;
  let missing = 0;
  const lookup = (url) => {
    const files = sourcesFor(new URL(url).pathname);
    const known = files.map((f) => dates.get(f)).filter(Boolean).sort();
    if (known.length) found++;
    else missing++;
    return known.at(-1);
  };
  lookup.report = () =>
    console.log(`[sitemap] lastmod: from git commit dates of each page's content file (${found} dated, ${missing} without a committed source)`);
  return lookup;
}
