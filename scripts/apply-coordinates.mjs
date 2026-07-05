#!/usr/bin/env node

/**
 * apply-coordinates.mjs — fuegt `koordinaten: { lat, lng }` deterministisch in
 * docs/assets/js/data.js ein (exakte String-Einfuegung pro id/Name, KEINE blinde
 * Regex-Ersetzung; jede Einfuegung wird auf genau ein Vorkommen geprueft).
 *
 * Quelle: Lookup-Ergebnis-JSON (Zwischenartefakt). Rundet auf 6 Nachkommastellen.
 * Hotels erhalten zusaetzlich ein stabiles id-Slug. meta.anreiseStopp bekommt die
 * Koordinaten der Aktivitaet churer-gleichgewichtsweg.
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
const coord = key => `{ lat: ${r6(results[key].lat)}, lng: ${r6(results[key].lng)} }`;

let text = readFileSync(DATA_PATH, 'utf-8');
let edits = 0;

function replaceOnce(needle, replacement, label) {
  const count = text.split(needle).length - 1;
  if (count !== 1) throw new Error(`Anker "${label}" ${count}x gefunden (erwartet: 1)`);
  text = text.replace(needle, replacement);
  edits++;
}

// ── Aktivitaeten: koordinaten direkt nach der id-Zeile (10 Space Einzug) ─────
const AKT_IDS = [
  'churer-gleichgewichtsweg', 'autschliweg', 'spielplatz-heidsee', 'wetterwichtelweg',
  'globi-wanderweg', 'globi-live', 'sommerrodelbahn-pradaschier', 'seilpark-zipline',
  'heidsee-lido', 'bergbahn-rothorn', 'eichhoernchenwald', 'bike-kingdom',
  'minigolf-pitpat', 'h2lai', 'foxtrail', 'biathlon', 'arosa-baerenland', 'freibad-churwalden',
];
for (const id of AKT_IDS) {
  const anchor = `          id: "${id}",\n`;
  replaceOnce(anchor, `${anchor}          koordinaten: ${coord(id)},\n`, `aktivitaet ${id}`);
}

// ── Hotels: stabiles id-Slug + koordinaten VOR der name-Zeile (10 Space) ─────
const HOTELS = [
  { slug: 'hotel-schweizerhof',     name: 'Hotel Schweizerhof Lenzerheide' },
  { slug: 'sunstar-hotel',          name: 'Sunstar Hotel Lenzerheide' },
  { slug: 'revier-mountain-lodge',  name: 'Revier Mountain Lodge' },
  { slug: 'valbella-resort',        name: 'Valbella Resort' },
  { slug: 'hotel-lenzerhorn',       name: 'Hotel Lenzerhorn' },
];
for (const h of HOTELS) {
  const anchor = `          name: "${h.name}",\n`;
  replaceOnce(anchor,
    `          id: "${h.slug}",\n          koordinaten: ${coord(h.slug)},\n${anchor}`,
    `hotel ${h.slug}`);
}

// ── meta.anreiseStopp == churer-gleichgewichtsweg (6 Space Einzug, eindeutig) ─
const stoppAnchor = `      name: "Churer Gleichgewichtsweg",\n      icon: "🤸",\n`;
replaceOnce(stoppAnchor,
  `      name: "Churer Gleichgewichtsweg",\n      icon: "🤸",\n      koordinaten: ${coord('churer-gleichgewichtsweg')},\n`,
  'meta.anreiseStopp');

writeFileSync(DATA_PATH, text);
console.log(`✅ ${edits} Einfuegungen in data.js (18 Aktivitaeten + 5 Hotels + anreiseStopp = 24 erwartet).`);
