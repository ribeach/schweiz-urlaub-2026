# ultracode — Interaktive Google-Maps-Planungskarte einbauen

**ultracode**: Nutze Multi-Agent-Orchestrierung und arbeite parallel, wo Teilaufgaben unabhängig sind (Koordinaten-Beschaffung ‖ Karten-Modul ‖ CSS/Legende). **Modellwahl (Vorgabe des Users):** Fable NUR für Big-Picture-Schritte — Architektur-Synthese, Marker-Technologie-Entscheid, Platzierungs-Entscheid, Zusammenführen der Verifikationsergebnisse. Alles Routinehafte (Datei-Edits, Lookup-Skript, Koordinaten eintragen, Smoke-Tests, Plausibilitätschecks) erledigen Opus/Sonnet-Subagenten.

Diese Session kennt keine Vorgeschichte — alles Nötige steht hier. Lies zuerst die unten genannten Dateien, plane dann, arbeite datengetrieben, verifiziere lokal und live.

---

## 1 · Kontext & Repo-Fakten (verbindlich)

- **Repo:** `/Users/micwag/Developer/vivi-urlaub` → GitHub `ribeach/schweiz-urlaub-2026` (public). GitHub Pages serviert `docs/` vom `main`-Branch unter **https://ribeach.github.io/schweiz-urlaub-2026/** — ein **Unterpfad**, also ausschliesslich **relative Pfade** (`assets/js/...`), nie absolute (`/assets/...`).
- **Stack:** rein statisch — HTML + CSS + Vanilla-JS, **kein Build, keine Frameworks, keine externen Requests** ausser der Google-Maps-JS-API. Inhalte strikt datengetrieben aus `window.REISE` in `docs/assets/js/data.js`; `docs/assets/js/app.js` rendert alles per DOM-Erzeugung.
- **Sprache:** Deutsch mit **Schweizer Rechtschreibung** (immer «ss» statt «ß», «»-Guillemets) — für UI-Texte, Kommentare und Commit-Messages.
- **Zielgeräte & Standards:** primär iPhone/iPad Safari, mobile-first. Touch-Ziele ≥ 44 px (Projekt-Token `--tap: 48px`), WCAG AA, Dark Mode via `prefers-color-scheme`, **kein `100vh`** (nur `100dvh`/`svh`), Zoom nie blockieren, `prefers-reduced-motion` respektieren.
- **Git:** auf `main` committen und pushen ist erwünscht; Pages deployt automatisch (~1 Min). Commit-Messages auf Deutsch.

**Zielgruppe & Zweck der Karte (wichtig):** Die Seite dient **hauptsächlich der Reiseplanung im Vorfeld** durch den User (Onkel) und seine **70-jährigen Eltern**; die 6,5-jährige Nichte ist sekundär. Die Karte ist ein **Planungsinstrument**: Lage der Aktivitäten zueinander sehen, Distanzen einschätzen, Tage sinnvoll gruppieren. Gestaltung der Karte **erwachsen und ruhig, exzellent lesbar für 70-Jährige** — keine kindliche Verspieltheit auf der Karte. Die verspielten Elemente der übrigen Seite bleiben **komplett unangetastet**.

**Karte lädt DIREKT beim Seitenaufruf** — kein «Karte laden»-Button, kein Consent-/Tap-to-Load-Gate. Das Netz in der Schweiz ist ausgezeichnet und geplant wird zuhause. Das Laden erfolgt asynchron/deferred, ohne das Seiten-Rendering zu blockieren. Lazy-Init via `IntersectionObserver` (Map erst initialisieren, wenn der Abschnitt in Viewport-Nähe kommt, grosszügiges `rootMargin`) ist als reines Performance-Detail erlaubt — aber **kein Klick-Gate davor**.

## 2 · Pflichtlektüre (bevor du irgendetwas schreibst)

1. `/Users/micwag/Developer/vivi-urlaub/docs/assets/js/config.js` — Key-Handling; im Kopfkommentar steht das exakte **Einbindungs-Snippet** inkl. localhost-Override.
2. `/Users/micwag/Developer/vivi-urlaub/docs/assets/js/data.js` — Schema von `window.REISE`: `meta.anreiseStopp` (Churer Gleichgewichtsweg), `destinationen[].aktivitaeten[]` (18 Stück; Felder u. a. `id, name, kategorie, icon, favoritKind, eignungKind{stufe,hinweis}, eignungGrosseltern{...}, preis{erwachsen,kind,hinweis}|null, gratis, dauer, lage, mapsUrl, offiziellUrl`) und `destinationen[].hotels[]` (5 Stück; **haben kein `id` und kein `mapsUrl`**). **Es gibt noch KEINE Koordinaten.** Achtung: Der Churer Gleichgewichtsweg existiert doppelt — als `meta.anreiseStopp` UND als Aktivität `id: "churer-gleichgewichtsweg"`.
3. `/Users/micwag/Developer/vivi-urlaub/docs/assets/js/app.js` — Render-Muster: Helfer `el()`, `extLink()`, `param()`, `initDestination()`, Konstanten `AMPEL` (Eignungs-Symbole) und `KAT_LABEL`, Aktivitätskarten tragen `data-akt-id="<id>"`, Sprungnav-Highlight per IntersectionObserver.
4. `/Users/micwag/Developer/vivi-urlaub/docs/assets/css/style.css` — Design-Tokens: Palette `--gruen --tuerkis --himmel --sonne --bergrot` (+ Dunkelvarianten), Flächen `--bg --bg-2 --surface --line`, `--radius`, `--shadow`, `--tap`, Ampel-Farben, Dark-Mode-Block, **`@media print`-Block**.
5. `/Users/micwag/Developer/vivi-urlaub/docs/destination.html` — Zielseite (`?id=lenzerheide`): Sektions-Shells, sticky Sprungnav `.subnav`, lädt aktuell nur `data.js` + `app.js` (beide `defer`), **noch kein `config.js`**.
6. `/Users/micwag/Developer/vivi-urlaub/README.md` + `/Users/micwag/Developer/vivi-urlaub/scripts/make-config-local.sh` — Zwei-Key-Muster und Referrer-Unsicherheit.
7. `/Users/micwag/Developer/baltic-roadtrip/scripts/lookup-places.mjs` — **Vorbild-Skript** für den Koordinaten-Lookup (Struktur 1:1 übernehmbar).

## 3 · Auftrag

1. **Koordinaten beschaffen** (Places API New, §5) und in `data.js` einpflegen.
2. Neues, eigenständiges Karten-Modul `docs/assets/js/map.js` schreiben, das auf der Destinationsseite einen neuen Abschnitt **«Karte»** rendert — datengetrieben aus `window.REISE` + `?id`, sodass **künftige Destinationen ohne Markup-Umbau** funktionieren.
3. Loader/Key sauber in `destination.html` verkabeln (§4, Key-Handling NICHT neu erfinden).
4. Volle Robustheit, Fallbacks, Print-Ausschluss (§4).
5. Lokal + live verifizieren (§6), dann auf `main` committen und pushen.

## 4 · Fachliche Anforderungen & technische Randbedingungen

**Abschnitt «Karte»:** Neue `<section id="karte">` in `docs/destination.html`, dem bestehenden Sektions-Muster folgend, platziert **zwischen Abenteuer-Galerie und Tagesplan** (Leseführung: erst Aktivitäten sehen, dann ihre Lage, dann Tage gruppieren — finaler Platzierungs-Entscheid durch Fable). Dazu ein Sprungnav-Eintrag `🗺️ Karte` in `.subnav`, damit Anker + bestehendes Subnav-Highlight greifen (`scroll-margin-top` prüfen). Kartengrösse: grosszügig, aber nicht bildschirmfüllend (z. B. clamp um 55–65 dvh), runde Ecken/Schatten aus `--radius`/`--shadow`.

**Marker:** je Aktivität + je Hotel ein Marker. **Kategorie-Kennzeichnung im Stil der Seite:** Es gibt noch keine Kategorie→Farbe-Zuordnung im CSS — definiere eine ruhige, konsistente Zuordnung der 8 Kategorien (`themenweg, balancieren, wasser, action, bike, spielen, schlechtwetter, ausflug`) auf die Marken-Tokens (z. B. wasser→`--tuerkis`, balancieren/themenweg→`--gruen`, action→`--bergrot`) und nutze das Aktivitäts-`icon` im Pin. Hotels bekommen eine klar unterscheidbare Form/Farbe (z. B. neutral + 🏨). Kleine, gut lesbare **Legende** beim Kartenabschnitt (funktioniert auch ohne Kartentiles). **Dedupe:** Der Churer Gleichgewichtsweg ist bereits Aktivität — nicht zusätzlich als `anreiseStopp` doppelt setzen. Überlappende Koordinaten (Pradaschier-Cluster, Sportzentrum, Heidsee) sauber behandeln: leichter Offset oder kombiniertes Info-Fenster — kein Marker darf einen anderen komplett verdecken.

**Info-Fenster als Planungshilfe** (gross, gut lesbar, Touch-Ziele ≥ 44 px, Kontrast in Light UND Dark): Name (+ Icon), Kategorie-Label (`KAT_LABEL`), Eignung Kind + Grosseltern kompakt (Symbol UND Wort via `AMPEL` — nie Farbe allein), Preis-Kurzinfo (`gratis` → «Gratis», sonst `preis.erwachsen` knapp), Link **«Zur Aktivität»** (scrollt zu `[data-akt-id="<id>"]` via `scrollIntoView`) und **Google-Maps-Routenlink** (`https://www.google.com/maps/dir/?api=1&destination=<lat>,<lng>`, `rel="noopener"`, neuer Tab).

**Bedienung:** `gestureHandling: 'cooperative'` (Pflicht — einfingriges Seiten-Scrollen darf nicht in der Karte hängen bleiben). Anfangsausschnitt: `fitBounds` über alle Marker der Destination (inkl. entferntem Chur-Stopp).

**Key-/Loader-Verkabelung in `destination.html`** — exakt nach dem Snippet im Kopfkommentar von `config.js`; Reihenfolge am Body-Ende (das `document.write`-Snippet muss **synchron vor** den deferred Skripten laufen, sonst greift der Dev-Key lokal nicht):
```html
<script src="assets/js/config.js"></script>
<script>
  if (['localhost','127.0.0.1'].includes(location.hostname)) {
    document.write('<script src="assets/js/config.local.js"><\/script>');
  }
</script>
<script src="assets/js/data.js" defer></script>
<script src="assets/js/app.js" defer></script>
<script src="assets/js/map.js" defer></script>
```
`map.js` liest den Key ausschliesslich aus `window.CONFIG.GOOGLE_MAPS_API_KEY` — nie hartcodieren. Hintergrund Zwei-Key-Muster (existiert bereits, NICHT neu erfinden): `config.js` ist committet (referrer-beschränkt auf ribeach.github.io, NUR Maps JavaScript API); `config.local.js` ist gitignored, existiert lokal, wird via `scripts/make-config-local.sh` aus `.env` generiert — Google erlaubt **kein localhost** in Website-Beschränkungen, lokale Kartenvorschau geht NUR über diesen Dev-Key.

**Asynchroner Bootstrap-Loader:** offizieller Inline-Bootstrap-Loader von Google + `await google.maps.importLibrary('maps')` (ggf. `'marker'`) — lädt asynchron, blockiert das initiale Rendering nicht. Kein blockierendes `<script src=…maps/api/js…>`.

**Marker-Technologie — Abwägung (Fable entscheidet, Wahl als Kommentar in `map.js` dokumentieren):** `AdvancedMarkerElement` braucht eine `mapId`; `DEMO_MAP_ID` ist nur für Entwicklung gedacht, eine echte Map-ID kann nur der User in der Cloud Console anlegen (externe Abhängigkeit). Klassische `google.maps.Marker` + `InfoWindow` sind deprecated, funktionieren aber ohne `mapId` und erlauben kategorie-gefärbte SVG-Pins. **Default-Empfehlung: klassische Marker** (robust, keine User-Abhängigkeit). Bei Wahl von AdvancedMarker: mit `DEMO_MAP_ID` starten und dem User im Abschluss-Report sagen, dass für Produktion eine eigene Map-ID nötig wäre.

**Robustheit / Fallbacks (Pflicht):**
- `map.js` als eigene IIFE, defensiv: no-op ohne `#karte`-Abschnitt, ohne passende Destination, ohne Koordinaten oder ohne Key.
- **Ohne JS:** statischer Fallback in der Section (kurzer Hinweis + Google-Maps-Link auf die Region), den `map.js` bei Erfolg ersetzt. Die bestehenden `mapsUrl`-Links auf allen Aktivitätskarten bleiben überall erhalten — sie SIND der generelle Fallback.
- **Key blockiert:** `window.gm_authFailure` implementieren → kaputtes Karten-Overlay verbergen, Fallback einblenden.
- **Offline/Loader-Fehler:** `importLibrary` in `try/catch` + Timeout (~8 s) → Fallback statt kaputtem UI.
- **Druck:** Die Karte darf nie im gedruckten Tagesplan erscheinen. Der bestehende Print-Selektor (`main > section:not(#tagesplan)`) trifft den neuen Abschnitt evtl. nicht (Sections liegen ggf. in einem Wrapper) — prüfen und zur Sicherheit explizit `@media print { #karte { display: none !important; } }` ergänzen.

## 5 · Koordinaten-Aufgabe (verifizierter Weg)

`data.js` hat noch keine `lat`/`lng`. Beschaffung serverseitig über die **Places API (New)** — NICHT mit dem committeten Key:

- **Key-Trennung (hart):** Der `config.js`-Key kann NUR die Maps JavaScript API — für Places-Lookups nutzlos. Verwende den Key `PUBLIC_GOOGLE_MAPS_API_KEY` aus `/Users/micwag/Developer/vivi-urlaub/.env` — der kann die Places API (New), serverseitig verifiziert: `places:searchText` lieferte für «Heidsee Lenzerheide Schweiz» `46.7403206, 9.5506518`. **Der `.env`-Key gehört NIEMALS in eine committete Datei** — nur lokal im Skript aus `../.env` lesen.
- **Skript:** `scripts/lookup-coordinates.mjs` analog zum Vorbild `/Users/micwag/Developer/baltic-roadtrip/scripts/lookup-places.mjs`: `POST https://places.googleapis.com/v1/places:searchText`, Header `X-Goog-Api-Key` + `X-Goog-FieldMask: places.id,places.displayName,places.googleMapsUri,places.location`, **200 ms Delay** zwischen Requests, `--dry-run`-Flag, Ergebnisse als JSON (keyed per id). Ergebnis-JSON ist Zwischenartefakt — nicht committen; die finalen Koordinaten leben in `data.js`.
- **Queries aus `data.js` generieren, nicht abtippen** (`data.js` setzt `window.REISE`, kein ES-Modul — in Node z. B. via `globalThis.window = {}` + `vm.runInThisContext` laden). Query-Aufbau: wenn `mapsUrl` existiert, deren `query=`-Parameter dekodieren (die Strings sind handverlesen präzise, z. B. «Talstation Rothorn Canols Lenzerheide»); sonst `name + ", " + lage + ", Schweiz"`; Hotels: `name + ", Lenzerheide, Schweiz"`.
- **Einpflegen:** Schema einheitlich um `koordinaten: { lat, lng }` erweitern — bei allen 18 Aktivitäten, allen 5 Hotels (Hotels dabei ein stabiles `id`-Slug geben, sie haben noch keins) und `meta.anreiseStopp` (gleiche Koordinaten wie die Aktivität `churer-gleichgewichtsweg`). Schema-Kommentar oben in `data.js` mitpflegen. Alle bestehenden Felder inkl. `mapsUrl` unangetastet lassen. Die Datei ist handformatiert — reviewbare Edits, keine blinde Regex-Ersetzung.
- **Plausibilitäts-Check (Pflicht, automatisiert):** Alle POIs im Raum Lenzerheide/Chur/Churwalden/Lantsch/Arosa grob in der Box **46.6–46.9 N / 9.4–9.7 E** (Anker: Heidsee 46.7403/9.5507 verifiziert, Chur ~46.85/9.53, Churwalden ~46.78/9.54, Arosa ~46.78/9.68). Chur und Arosa liegen erwartungsgemäss abseits des Kern-Clusters — kein Fehler. **Ausreisser ausserhalb der Box flaggen und manuell prüfen** (Hauptfehlerquellen: falscher Treffer bei generischen Namen; Rothorn-**Gipfel** statt Talstation Canols). Bei schlecht auflösenden POIs lieber Dorfzentrum/`lage` als falsche Koordinate. Danach visuelle Stichprobe auf der fertigen Karte (Heidsee am See? Pradaschier in Churwalden? Chur-Weg in Chur?).

## 6 · Verifikationsplan (Pflicht, in dieser Reihenfolge)

1. **Koordinaten:** Plausibilitäts-Check grün, Ausreisser bereinigt; alle Einträge haben numerische `koordinaten`.
2. **Lokaler Smoke-Test:** `scripts/make-config-local.sh` ausführen (Dev-Key aus `.env` → gitignorte `config.local.js`), `npx serve docs` starten, per **Chrome (claude-in-chrome)** `destination.html?id=lenzerheide` öffnen. Prüfen: Karte lädt **automatisch** (kein Button), Marker vollständig und richtig platziert, Info-Fenster lesbar, «Zur Aktivität» scrollt korrekt, Routenlinks stimmen, Legende, Sprungnav-Eintrag, Dark Mode. **Konsole lesen — 0 Fehler.**
3. **iPhone-Viewport** (~390×844): Touch-Ziele ≥ 44 px, einfingriges Scrollen bleibt nicht in der Karte hängen (`cooperative`), kein horizontales Überlaufen, kein `100vh`-Sprung.
4. **Robustheit:** fehlenden/blockierten Key und Ladefehler simulieren → sauberer Fallback statt kaputtem UI. Print-Preview → Karte erscheint nicht.
5. **Deploy:** auf `main` committen (deutsche Commit-Message) und pushen; ~1 Min auf Pages warten.
6. **Live-Check (kritisch):** **https://ribeach.github.io/schweiz-urlaub-2026/destination.html?id=lenzerheide** in Chrome öffnen, **Konsole gezielt auf `RefererNotAllowedMapError` prüfen**. Hintergrund: Die Referrer-Beschränkung des committeten Keys ist möglicherweise auf `ribeach.github.io/baltic-roadtrip/*` gescopet statt `ribeach.github.io/*` — von aussen nicht prüfbar, der Referrer-Check läuft erst zur Laufzeit im Browser. **Falls der Fehler auftritt:** dem User klar melden, dass **er** in der Google Cloud Console (APIs & Dienste → Anmeldedaten → Maps-JS-Key → Website-Beschränkungen) einen Eintrag `ribeach.github.io/*` ergänzen muss — das kann nur der User. Nicht selbst versuchen.
7. Live-Karte auch im iPhone-Viewport gegenprüfen. Nicht «fertig» melden, bevor Schritt 6 gelaufen ist.

## 7 · Explizite Don'ts

- **Kein** «Karte laden»-Button, kein Tap-to-Load, kein Consent-Gate — die Karte lädt direkt.
- **Kein** Blockieren des initialen Renderings durch die Maps-API (async Loader Pflicht).
- Der **`.env`-Key niemals** in committete Dateien; `config.local.js` nie committen (bleibt gitignored). Den `config.js`-Key nie für Places-Lookups verwenden.
- Key-Handling **nicht neu erfinden** — `config.js` + `config.local.js` + `make-config-local.sh` existieren, nur verkabeln.
- **Keine** absoluten Pfade (Unterpfad!), kein Build, keine Frameworks, keine externen CDNs/Fonts.
- Die **verspielten Kind-Elemente** der übrigen Seite nicht anfassen; nur die Karte ist ruhig/erwachsen.
- Bestehende `mapsUrl`-Links und Felder in `data.js` **nicht entfernen** (Fallback).
- Kein `100vh`, Zoom nie sperren, `prefers-reduced-motion` und Dark Mode respektieren, kein `ß`.
- `data.js` nicht blind per Regex umschreiben — handformatiert, reviewbare Edits.

**Am Ende:** Fasse für den User zusammen: was gebaut wurde, geänderte Dateien, getroffene Marker-Entscheidung, Ergebnis des Live-Checks — insbesondere ob `RefererNotAllowedMapError` auftrat und ob er in der Cloud Console aktiv werden muss.