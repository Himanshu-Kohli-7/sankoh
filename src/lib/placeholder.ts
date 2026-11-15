/**
 * Line drawings shown in place of a product photo (no photo yet, or the legacy one is not a sure match).
 * Valves: the valve symbol. Instruments: a dial gauge on a pipe. Both drawn in a 120 × 90 viewBox.
 */
import type { DivisionKey } from '../config/nav';

const VALVE = 'M30 30v30l30-15-30-15z M90 30v30L60 45l30-15z M60 45V24 M48 24h24 M10 45h20 M90 45h20';
const INSTRUMENT = 'M10 58h100 M10 68h100 M60 44v14 M54 44h12 M42 26a18 18 0 1 0 36 0a18 18 0 1 0 -36 0 M60 26l9-8 M48 26h3 M69 26h3';

export const placeholderPath = (division: DivisionKey = 'valves'): string =>
  division === 'instruments' ? INSTRUMENT : VALVE;
