import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cataloguePath } from './nav';

/**
 * Build-time only (uses node:fs — never import from an island).
 * The catalogue link is shown only once the PDF is in public/downloads/,
 * so the site never ships a dead download link.
 */
export const catalogue = {
  href: cataloguePath,
  available: existsSync(join(process.cwd(), 'public', cataloguePath)),
};
