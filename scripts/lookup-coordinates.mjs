#!/usr/bin/env node

/**
 * lookup-coordinates.mjs — Koordinaten fuer die Reiseplanung beschaffen.
 *
 * Liest window.REISE aus docs/assets/js/data.js (kein ES-Modul -> via vm laden),
 * generiert die Suchqueries DIREKT aus den Daten (nicht abgetippt) und schlaegt
 * sie ueber die Google Places API (New) `places:searchText` nach. Ergebnisse
 * werden pro id gekeyt (Aktivitaeten und Hotels haben eindeutige ids).
 *
 * Key-Trennung (hart): NICHT der committete config.js-Key (kann nur die Maps
 * JavaScript API), sondern PUBLIC_GOOGLE_MAPS_API_KEY aus ../.env, der die
 * Places API (New) darf. Der .env-Key gehoert NIEMALS in eine committete Datei.
 *
 * Ergebnis-JSON ist ein Zwischenartefakt (Scratchpad) — nicht committen. Die
 * finalen Koordinaten leben in data.js.
 *
 * Usage:
 *   node scripts/lookup-coordinates.mjs --dest davos-klosters --dry-run
 *   node scripts/lookup-coordinates.mjs --dest davos-klosters --out <pfad.json>
 *   node scripts/lookup-coordinates.mjs --out <pfad.json>   # alle "bereit"-Ziele
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const ROOT = join(import.meta.dirname, '..');

// ── .env-Key lesen (nur lokal, nie committen) ───────────────────────────────
const envFile = readFileSync(join(ROOT, '.env'), 'utf-8');
const API_KEY = envFile.match(/^PUBLIC_GOOGLE_MAPS_API_KEY=(.+)$/m)?.[1]?.trim();
if (!API_KEY) {
  console.error('❌ PUBLIC_GOOGLE_MAPS_API_KEY fehlt in .env');
  process.exit(1);
}

const DRY_RUN = process.argv.includes('--dry-run');
const destIdx = process.argv.indexOf('--dest');
const DEST_FILTER = destIdx !== -1 ? process.argv[destIdx + 1] : null;
const outIdx = process.argv.indexOf('--out');
const OUT_PATH = outIdx !== -1 ? process.argv[outIdx + 1]
  : join(ROOT, 'scripts', 'coordinates-lookup-results.json');
const DELAY_MS = 200;

// Grosszuegige Plausibilitaets-Box fuer ganz Graubuenden (Chur/Lenzerheide/
// Davos/Klosters/Flims/Laax/Rheinschlucht).
const BOX = { latMin: 46.5, latMax: 47.1, lngMin: 8.9, lngMax: 10.2 };

// ── window.REISE aus data.js laden (kein ES-Modul) ──────────────────────────
function loadReise() {
  const code = readFileSync(join(ROOT, 'docs', 'assets', 'js', 'data.js'), 'utf-8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.REISE;
}

// query= aus einer Google-Maps-URL dekodieren (handverlesene, praezise Strings).
function queryFromMapsUrl(url) {
  if (!url) return null;
  const m = url.match(/[?&]query=([^&]+)/);
  if (!m) return null;
  return decodeURIComponent(m[1].replace(/\+/g, ' '));
}

// ── Queries generieren (nur Eintraege OHNE koordinaten) ─────────────────────
function buildQueries(REISE) {
  const queries = [];
  REISE.destinationen
    .filter(d => d.status === 'bereit' && (!DEST_FILTER || d.id === DEST_FILTER))
    .forEach(dest => {
      (dest.aktivitaeten || []).forEach(a => {
        if (a.koordinaten || !a.id) return;
        const q = queryFromMapsUrl(a.mapsUrl) || `${a.name}, ${a.lage}, Schweiz`;
        queries.push({ key: a.id, dest: dest.id, kind: 'aktivitaet', name: a.name, query: q });
      });
      (dest.hotels || []).forEach(h => {
        if (h.koordinaten || !h.id) return;
        const q = queryFromMapsUrl(h.mapsUrl) || `${h.name}, ${dest.name}, Schweiz`;
        queries.push({ key: h.id, dest: dest.id, kind: 'hotel', name: h.name, query: q });
      });
    });
  return queries;
}

// ── Places API (New) ────────────────────────────────────────────────────────
async function lookupPlace(query) {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.googleMapsUri,places.location',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'de', regionCode: 'CH' }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  if (!data.places || !data.places.length) return null;
  const p = data.places[0];
  return {
    placeId: p.id,
    displayName: p.displayName?.text || query,
    googleMapsUri: p.googleMapsUri || null,
    lat: p.location?.latitude,
    lng: p.location?.longitude,
  };
}

function inBox(lat, lng) {
  return lat >= BOX.latMin && lat <= BOX.latMax && lng >= BOX.lngMin && lng <= BOX.lngMax;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const REISE = loadReise();
  const queries = buildQueries(REISE);

  console.log(`📍 ${queries.length} Queries${DEST_FILTER ? ' (Dest: ' + DEST_FILTER + ')' : ''}${DRY_RUN ? ' (DRY RUN)' : ''}:\n`);
  queries.forEach((q, i) => console.log(`  [${String(i + 1).padStart(2)}] ${q.key.padEnd(30)} → "${q.query}"`));
  console.log('');

  if (DRY_RUN) { console.log('Dry run — keine API-Aufrufe.'); return; }
  if (!queries.length) { console.log('Nichts zu tun (alle haben schon koordinaten).'); return; }

  const results = {};
  const outliers = [];
  let found = 0, failed = 0;

  for (let i = 0; i < queries.length; i++) {
    const { key, dest, kind, query } = queries[i];
    try {
      const r = await lookupPlace(query);
      if (!r) { console.log(`  ⚠️  [${i + 1}/${queries.length}] Kein Treffer: "${query}"`); failed++; continue; }
      const ok = inBox(r.lat, r.lng);
      results[key] = {
        dest, kind, query,
        placeId: r.placeId, displayName: r.displayName, googleMapsUri: r.googleMapsUri,
        lat: r.lat, lng: r.lng, inBox: ok,
      };
      const flag = ok ? '✅' : '🚩 AUSSERHALB BOX';
      console.log(`  ${flag} [${i + 1}/${queries.length}] ${key} → ${r.displayName} (${r.lat.toFixed(5)}, ${r.lng.toFixed(5)})`);
      if (!ok) outliers.push({ key, displayName: r.displayName, lat: r.lat, lng: r.lng });
      found++;
    } catch (err) {
      console.log(`  ❌ [${i + 1}/${queries.length}] Fehler: "${query}" — ${err.message}`);
      failed++;
    }
    await new Promise(r => setTimeout(r, DELAY_MS));
  }

  writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + '\n');
  console.log(`\n📊 Fertig: ${found} gefunden, ${failed} fehlgeschlagen`);
  console.log(`💾 ${OUT_PATH}`);
  if (outliers.length) {
    console.log(`\n🚩 ${outliers.length} Ausreisser ausserhalb Box ${BOX.latMin}–${BOX.latMax}N / ${BOX.lngMin}–${BOX.lngMax}E — manuell pruefen:`);
    outliers.forEach(o => console.log(`   ${o.key}: ${o.displayName} (${o.lat.toFixed(5)}, ${o.lng.toFixed(5)})`));
  } else {
    console.log('\n✅ Alle Koordinaten innerhalb der Plausibilitaets-Box.');
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
