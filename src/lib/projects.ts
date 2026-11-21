/** Job stories (src/content/projects/): who and where, without naming a client before permission. */
import type { CollectionEntry } from 'astro:content';

/** "Schreiber Dynamix, Fazilka" with permission; otherwise "A plant in Fazilka". */
export const projectWhere = (p: CollectionEntry<'projects'>['data']): string | undefined => {
  if (p.client && p.clientNamePermission) return p.location ? `${p.client}, ${p.location}` : p.client;
  return p.location ? `A plant in ${p.location}` : undefined;
};
