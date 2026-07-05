# CLAUDE.md

Planungswebseite für einen Familienurlaub in Graubünden, August 2026 (2 Übernachtungen).
GitHub: `ribeach/schweiz-urlaub-2026` (public) · Live: https://ribeach.github.io/schweiz-urlaub-2026/

## Zielgruppe — Achtung, nicht vom Look täuschen lassen

Die Seite *sieht* kindzentriert aus (Countdown, Sammel-Stempel), aber die
Hauptnutzer sind der User und seine **70-jährigen Eltern** bei der
Vorfeld-Planung; die 6,5-jährige Nichte ist sekundär. Neue Features
erwachsen/planungsorientiert auslegen, Lesbarkeit für Senioren priorisieren.
Die bestehenden verspielten Elemente bleiben.

## Architektur

- **Rein statisch**: HTML/CSS/Vanilla-JS, kein Build, kein npm, keine
  Frameworks, keine externen Requests (Ausnahme: Google Maps).
- `docs/` ist der GitHub-Pages-Root (Branch `main`). Deployt automatisch
  bei Push (~1 Min).
- **Nur relative Pfade** — die Seite liegt im Unterpfad
  `/schweiz-urlaub-2026/`. Nie mit führendem `/` referenzieren.
- **Datengetrieben**: Alle Inhalte in `docs/assets/js/data.js`
  (`window.REISE`). Neue Destination = neues Objekt in `destinationen[]`
  (Status `"bald"` → `"bereit"`), kein neues HTML.
  `docs/destination.html?id=<id>` ist das eine Template für alle
  Destinationen; `docs/assets/js/app.js` rendert.
- Recherche-Markdown pro Destination unter `research/<destination>/`.
- Claude-Design-/Claude-Code-Prompts unter `design/`. Design-Iterationen
  laufen über das Claude-Design-Projekt «Unser Bergabenteuer 2026»
  (claude.ai/design → Datei-/Ordner-Download → nach `docs/` kopieren).

## Sprache & UI-Regeln

- Deutsch mit **Schweizer Rechtschreibung**: `ss` statt `ß`, Guillemets
  «…», `lang="de-CH"`. Auch Commit-Messages auf Deutsch.
- Mobile-first für **iPhone/iPad Safari**: Touch-Ziele ≥ 44 px, WCAG AA,
  Dark Mode via `prefers-color-scheme`, `100dvh`/`svh` statt `100vh`,
  Zoom nie blockieren (kein `user-scalable=no`/`maximum-scale`),
  `prefers-reduced-motion` respektieren, Safe-Area-Insets.
- Progressive Enhancement: Countdown, Stempel, Filter sind Zugaben —
  Kerninhalte müssen ohne JS-Extras lesbar bleiben.
- Druck: Tagesplan hat ein Print-Layout; Karten/Buttons gehören nicht
  hinein.

## API-Keys — Zwei-Key-Muster

- `docs/assets/js/config.js` (**committet**, so gewollt): Maps-Key,
  referrer-beschränkt auf ribeach.github.io, **nur Maps JavaScript API**.
  Unsicher, ob die Beschränkung `…/baltic-roadtrip/*` oder ganz
  `ribeach.github.io/*` umfasst → nach Karten-Deploys die Live-Konsole
  auf `RefererNotAllowedMapError` prüfen; erweitern kann nur der User in
  der Google Cloud Console.
- `.env` (**gitignored, nie committen**): eigener Key; kann zusätzlich
  die **Places API (New)** serverseitig — für Koordinaten-Lookups nutzen
  (Vorbild: `/Users/micwag/Developer/baltic-roadtrip/scripts/lookup-places.mjs`).
- Lokale Kartenvorschau: Google erlaubt **kein localhost** in
  Website-Beschränkungen. `scripts/make-config-local.sh` generiert die
  gitignorte `docs/assets/js/config.local.js` (Dev-Key-Override) aus `.env`.
- Karten laden **direkt** beim Seitenaufruf (User-Entscheid: Netz in der
  Schweiz ist gut, geplant wird zuhause) — kein Consent-Gate, kein
  Tap-to-Load; aber asynchron, ohne das Rendering zu blockieren.

## Privatsphäre (öffentliches Repo + öffentliche Seite)

- Keine Klarnamen («Vivi» erscheint nirgends — nur «Kind»/«Enkelin»),
  keine Personenfotos, neutraler Titel «Unser Bergabenteuer».
- Der lokale Ordnername `vivi-urlaub` ist privat; öffentlich heisst alles
  `schweiz-urlaub-2026`.

## Arbeitsweise

- Committen und Pushen auf `main` ist erwünscht; danach Live-Seite prüfen.
- Lokale Vorschau: `python3 -m http.server 4173 -d docs` (Karte nur mit
  Dev-Key aus `config.local.js`).
- Vor jedem Commit von `docs/`-Änderungen prüfen: nur relative Pfade,
  keine externen Requests, kein `ß`, kein `100vh`, Touch-Ziele gross.
- In Workflows: **Fable** nur für wichtige/komplexe/Big-Picture-Schritte
  (Synthese, finale Entscheidungen), **Opus/Sonnet** für den Rest.
- Preise/Öffnungszeiten aus der Recherche gelten als «Stand Recherche» —
  nie als garantiert darstellen.
