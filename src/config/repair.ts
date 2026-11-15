/**
 * Shared repair wording: process steps and WhatsApp messages for the repair hubs and pages.
 * Steps are described generally (docs/PENDING.md #17, #18): no test procedure, pressures or certificates.
 */
import type { Step } from '../components/ProcessSteps.astro';

export type RepairGroup = 'valve' | 'drive';

/** The five workshop steps (SPEC §3), drawn as line icons on a pipeline line. */
export const repairSteps: Record<RepairGroup, Step[]> = {
  valve: [
    { title: 'Receive & inspect', text: 'We receive the unit at our workshop and inspect it.', icon: 'box' },
    { title: 'Strip down & assess', text: 'It is stripped down and each part is assessed.', icon: 'search' },
    { title: 'Repair / replace parts', text: 'Worn or damaged parts are repaired or replaced.', icon: 'wrench' },
    { title: 'Test & calibrate', text: 'The unit is tested before dispatch.', icon: 'pressure' },
    { title: 'Report & dispatch', text: 'You get a report of the work done and the unit is sent back.', icon: 'truck' },
  ],
  drive: [
    { title: 'Receive & inspect', text: 'The unit arrives at our workshop and is checked over.', icon: 'box' },
    { title: 'Diagnose the fault', text: 'We trace the fault from your description and our own checks.', icon: 'search' },
    { title: 'Repair / replace parts', text: 'Faulty parts are repaired or replaced.', icon: 'wrench' },
    { title: 'Test', text: 'The unit is tested before dispatch.', icon: 'drive' },
    { title: 'Report & dispatch', text: 'You get a report of the work done and the unit is sent back.', icon: 'truck' },
  ],
};

/** "Valve repair" / "Drive repair", as used in hub names and messages. */
export const groupName: Record<RepairGroup, string> = { valve: 'Valve repair', drive: 'Drive repair' };

/** What the customer sends: "valve" / "drive or HMI". */
export const groupThing: Record<RepairGroup, string> = { valve: 'valve', drive: 'drive or HMI' };

/** A title as it reads mid-sentence: plain capitalised words lowercased, acronyms kept ("VFD Repair" → "VFD repair"). */
const inSentence = (title: string): string =>
  title.replace(/[A-Za-z]+/g, (w) => (/^[A-Z][a-z]+$/.test(w) ? w.toLowerCase() : w));

/** Prefilled WhatsApp text naming the service: "Hi, I need ball valve repair. Photo attached." */
export const repairWhatsApp = (serviceTitle: string): string => `Hi, I need ${inSentence(serviceTitle)}. Photo attached.`;
