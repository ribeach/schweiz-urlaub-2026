#!/usr/bin/env node

/**
 * apply-coordinates.mjs — fuegt `koordinaten: { lat, lng }` deterministisch in
 * docs/assets/js/data.js ein (exakte String-Einfuegung pro id, KEINE blinde
 * Regex-Ersetzung; jede Einfuegung wird auf genau ein Vorkommen geprueft).
 *
 * Generisch: das Ergebnis-JSON ist pro id gekeyt (Aktivitaeten UND Hotels haben
 * eindeutige ids). Fuer jede id wird `koordinaten` direkt nach der `id:`-Zeile
 * (10 Space Einzug) eingefuegt. Rundet auf 6 Nachkommastellen.
 *
 * Usage: node scripts/apply-coordinates.mjs <results.json>
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DATA_PATH = join(ROOT, 'docs', 'assets', 'js', 'data.js');
const resultsPath = process.argv[2];
if (!resultsPath) { console.error('Nutzung: node scripts/apply-coordinates.mjs <results.json>'); process.exit(1); }

const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));
const r6 = n => Number(n.toFixed(6));

let text = readFileSync(DATA_PATH, 'utf-8');
let edits = 0;

function replaceOnce(needle, replacement, label) {
  const count = text.split(needle).length - 1;
  if (count !== 1) throw new Error(`Anker "${label}" ${count}x gefunden (erwartet: 1)`);
  text = text.replace(needle, replacement);
  edits++;
}

for (const [id, r] of Object.entries(results)) {
  if (typeof r.lat !== 'number' || typeof r.lng !== 'number') {
    throw new Error(`Ergebnis "${id}" ohne numerische lat/lng`);
  }
  const anchor = `          id: "${id}",\n`;
  const coord = `{ lat: ${r6(r.lat)}, lng: ${r6(r.lng)} }`;
  replaceOnce(anchor, `${anchor}          koordinaten: ${coord},\n`, id);
}

writeFileSync(DATA_PATH, text);
console.log(`✅ ${edits} koordinaten-Einfuegungen in data.js (${Object.keys(results).length} erwartet).`);
