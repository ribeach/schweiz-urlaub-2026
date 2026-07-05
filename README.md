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

Bevorzugt normale Google-Maps-Links (kein Key nötig). Falls eine interaktive
Karte gewünscht ist: Der Maps-JavaScript-Key muss per **HTTP-Referrer auf
`ribeach.github.io/*` beschränkt** sein, denn auf einer statischen Seite ist
er im Quelltext öffentlich sichtbar. Die `.env` bleibt lokal und ist
gitignored; Details in `.env.example`.

## Hinweise

- Zielgeräte: primär iPad und iPhone (Safari) — mobile-first.
- Öffentliches Repo: keine Klarnamen, keine Fotos von Personen.
- Preise/Öffnungszeiten in den Recherchen sind Momentaufnahmen — vor der
  Buchung auf den offiziellen Seiten verifizieren.
