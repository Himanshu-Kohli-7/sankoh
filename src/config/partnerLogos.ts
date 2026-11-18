/**
 * Official partner logo files, taken from each partner's own site (18 Nov 2026) and optimised.
 * Permission is in site.brands.partnerLogoPermission. A partner without a file is shown as a text
 * wordmark: Stolzel's site (stolzelvalves.com) has no logo file, only styled text, so none is used.
 */
import type { ImageMetadata } from 'astro';
import upc from '../assets/partners/upc.png';

export type PartnerLogo =
  | { kind: 'svg'; src: string; width: number; height: number; /** Light artwork: shown on a navy chip, never recoloured. */ onDark?: boolean }
  | { kind: 'image'; src: ImageMetadata };

export const partnerLogos: Record<string, PartnerLogo> = {
  // flowtech-instruments.com, wp-content/uploads/2020/03/flowtech-logo-2.svg (svgo, precision 1). Its wordmark is white, so it sits on navy.
  flowtech: { kind: 'svg', src: '/brand/partners/flowtech.svg', width: 748, height: 140, onDark: true },
  // upcinstruments.in header logo, the only size published (343 x 59 PNG, palette-optimised).
  upc: { kind: 'image', src: upc },
};
