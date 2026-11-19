/**
 * Openly licensed photos used on the site (CLAUDE.md §2.3). Shown on /image-credits/.
 * Only public domain, CC0, CC BY and CC BY-SA images are allowed: never NC or ND.
 * Keep this list and docs/IMAGE-CREDITS.md in step: add the entry in the same commit as the image.
 */
export interface ImageCredit {
  /** File in src/assets/products/. */
  file: string;
  /** Page the photo appears on. */
  usedOn: { label: string; href: string };
  title: string;
  author: string;
  licence: string;
  licenceUrl: string;
  /** The file's page at its source. */
  source: string;
  /** What we changed, as CC BY and CC BY-SA ask. */
  changes: string;
}

export const imageCredits: ImageCredit[] = [
  {
    file: 'thermowell.png',
    usedOn: { label: 'Thermowell', href: '/products/temperature-instruments/thermowell/' },
    title: 'Thermowell',
    author: 'Taintedkernel',
    licence: 'CC BY-SA 4.0',
    licenceUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Thermowell.png',
    changes: 'Resized and converted for the web',
  },
  {
    file: 'flow-switch.jpg',
    usedOn: { label: 'Flow Switch', href: '/products/flow-meters/flow-switch/' },
    title: 'Sensor de flujo tipo pistón (FlowSwitch.jpg)',
    author: 'Josefus2003',
    licence: 'Public domain',
    licenceUrl: 'https://commons.wikimedia.org/wiki/File:FlowSwitch.jpg#Licensing',
    source: 'https://commons.wikimedia.org/wiki/File:FlowSwitch.jpg',
    changes: 'Resized to 720 px wide and converted for the web',
  },
];
