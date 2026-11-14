// Regenerates favicons from public/brand/sankoh-icon.svg. Run: npm run favicons
// Uses sharp (installed transitively by Astro). ICO is packed by hand (PNG-in-ICO), no extra dependency.
import sharp from 'sharp';
import { readFile, writeFile, copyFile } from 'node:fs/promises';

const src = 'public/brand/sankoh-icon.svg';
const svg = await readFile(src);

/** Render the icon centred on a square canvas (transparent or white), with padding as a fraction. */
async function render(size, { background = { r: 0, g: 0, b: 0, alpha: 0 }, pad = 0.04 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const icon = await sharp(svg, { density: 384 })
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: icon, gravity: 'centre' }])
    .png()
    .toBuffer();
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };

await copyFile(src, 'public/favicon.svg');
await writeFile('public/favicon-96x96.png', await render(96));
await writeFile('public/apple-touch-icon.png', await render(180, { background: white, pad: 0.1 }));
await writeFile('public/web-app-manifest-192x192.png', await render(192, { background: white, pad: 0.1 }));
await writeFile('public/web-app-manifest-512x512.png', await render(512, { background: white, pad: 0.1 }));

// favicon.ico with 16/32/48 PNG entries
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => render(s, { pad: 0.02 })));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));

await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Sankoh Technical Solutions',
      short_name: 'Sankoh',
      icons: [
        { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      ],
      theme_color: '#102A4C',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
    },
    null,
    2,
  ) + '\n',
);
console.log('favicons written');
