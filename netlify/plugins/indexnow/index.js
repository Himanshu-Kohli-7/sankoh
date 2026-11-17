/**
 * Local Netlify build plugin: ping IndexNow with the URLs that changed in this deploy (SPEC §7).
 * Registered in netlify.toml. No npm package.
 *
 * - onPostBuild: hash every sitemap page in the publish dir, compare with the hashes of the last
 *   production build (Netlify build cache) and keep the list of changed URLs. The first build with
 *   an empty cache counts every URL as changed.
 * - onSuccess: production only (CONTEXT === "production"), POST the list to api.indexnow.org.
 *
 * Nothing here can fail a deploy: every step is wrapped in try/catch and only logs.
 * If a build's hashes are cached but its ping is missed, run `npm run indexnow -- --all`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { changedUrls, pageHashes, ping, readKey } from '../../../scripts/indexnow.mjs';

const CACHE_FILE = '.netlify-indexnow/hashes.json';
const isProduction = () => process.env.CONTEXT === 'production';
let changed = [];

export const onPostBuild = async ({ constants, utils }) => {
  if (!isProduction()) return console.log(`IndexNow: skipped (context "${process.env.CONTEXT ?? 'local'}")`);
  try {
    const current = pageHashes(constants.PUBLISH_DIR);
    let previous;
    if (await utils.cache.restore(CACHE_FILE)) {
      try {
        previous = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      } catch {
        console.log('IndexNow: cached hashes unreadable, treating every URL as changed');
      }
    }
    changed = changedUrls(current, previous);
    console.log(`IndexNow: ${changed.length} of ${Object.keys(current).length} URL(s) changed${previous ? '' : ' (no previous hashes: all)'}`);
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(current));
    await utils.cache.save(CACHE_FILE);
  } catch (error) {
    changed = [];
    console.log(`IndexNow: could not work out changed URLs, skipping (${error.message})`);
  }
};

export const onSuccess = async ({ constants }) => {
  if (!isProduction()) return;
  try {
    await ping(changed, readKey(constants.PUBLISH_DIR));
  } catch (error) {
    console.log(`IndexNow: ping failed, deploy unaffected (${error.message})`);
  }
};
