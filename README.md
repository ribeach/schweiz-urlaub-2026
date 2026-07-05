# Schweiz-Urlaub 2026 🏔️

Planungswebseite für einen Familienbesuch in Graubünden im August 2026:
2 Übernachtungen, Anreise aus Ellwangen (Ankunft zum Mittagessen am Tag 1,
Abreise am späten Vormittag des Tags 3). Reisegruppe: ein Kind (6,5 Jahre)
und die Grosseltern (70 Jahre), Basis-Standort des Gastgebers ist Landquart.

**Live-Seite:** https://ribeach.github.io/schweiz-urlaub-2026/

## Repo-Struktur

```
docs/                  ← GitHub Pages Root (statisches HTML/CSS/JS, kein Build)
  index.html
  assets/{css,js,img}
research/              ← Recherche-Dokumente, ein Ordner pro Destination
  lenzerheide/
design/                ← Prompts und Notizen für Claude Design
  claude-design-prompt.md
.env                   ← API-Keys (gitignored, siehe .env.example)
```

## Arbeitsweise

- **Recherche:** Ergebnisse (Claude Code oder externe Research-Agenten) landen
  als Markdown unter `research/<destination>/`. Erste Destination: Lenzerheide.
- **Design:** Die Webseite wird mit Claude Design entworfen. Der Prompt dafür
  liegt in `design/claude-design-prompt.md`; der generierte Output kommt nach
  `docs/`.
- **Deployment:** GitHub Pages serviert direkt aus `docs/` auf dem
  `main`-Branch — pushen genügt, kein Build-Schritt.

## Lokale Vorschau

```sh
npx serve docs
# oder einfach docs/index.html im Browser öffnen
```

## Karten & API-Keys

Für einfache Verlinkungen genügen normale Google-Maps-Links (kein Key nötig).
Für interaktive Karten liegt der Maps-JavaScript-Key in
`docs/assets/js/config.js` — bewusst committet, weil er per **HTTP-Referrer
auf `ribeach.github.io` beschränkt** und nur für die Maps JavaScript API
freigeschaltet ist (gleicher Key wie im Schwester-Projekt
[baltic-roadtrip](https://github.com/ribeach/baltic-roadtrip)). Zwei Folgen:

- Google unterstützt `localhost` in Website-Beschränkungen grundsätzlich
  nicht («Invalid website domain»). Für die lokale Vorschau gibt es deshalb
  ein Zwei-Key-Muster: `scripts/make-config-local.sh` generiert aus der
  `.env` die gitignorte `docs/assets/js/config.local.js`, die den
  committeten Key lokal überschreibt (Einbindungs-Snippet steht als
  Kommentar in `config.js`). Wichtig: Der Dev-Key in der `.env` darf
  selbst **keine** Website-Beschränkung haben — nur API-Beschränkung auf
  die Maps JavaScript API.
- Taucht der Fehler auch auf der Live-Seite auf, ist die Beschränkung
  vermutlich auf `…/baltic-roadtrip/*` gescopet und muss auf
  `ribeach.github.io/*` erweitert werden.

Die `.env` (weiterer Maps-Key + Stitch-Key) bleibt lokal und ist gitignored;
Details in `.env.example`.

## Hinweise

- Zielgeräte: primär iPad und iPhone (Safari) — mobile-first.
- Öffentliches Repo: keine Klarnamen, keine Fotos von Personen.
- Preise/Öffnungszeiten in den Recherchen sind Momentaufnahmen — vor der
  Buchung auf den offiziellen Seiten verifizieren.
