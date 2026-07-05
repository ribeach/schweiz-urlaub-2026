# Prompt für Claude Design — Urlaubsplanungs-Webseite «Unser Bergabenteuer 2026»

Erstelle eine **statische, mobile-first Webseite** zur Planung eines Familienbesuchs in Graubünden im August 2026. Die Seite ist zugleich **Planungswerkzeug für die Erwachsenen** (Aktivitäten vergleichen, Tagesplan, Hotels, Kosten) und **Vorfreude-Abenteuerbuch für ein Kind**, das die Seite gemeinsam mit den Grosseltern auf dem iPad anschaut.

Alle Inhalte unten sind **echt und final** — bitte vollständig einbauen. **Kein Lorem Ipsum, keine erfundenen Preise oder Öffnungszeiten.**

Sprache: durchgängig **Deutsch mit Schweizer Rechtschreibung** («ss» statt «ß», Guillemets «…» als Anführungszeichen), `lang="de-CH"`.

---

## 1. Ziel & Publikum

**Der Anlass:** Familienbesuch bei einem Verwandten in **Landquart (GR)** im **August 2026**, genaues Datum noch offen, **2 Übernachtungen**. Anreise mit dem Auto aus **Ellwangen (Deutschland, ca. 3 Std.)**, die Route führt **über Chur**. Ablauf: **Tag 1** Ankunft zum Mittagessen · **Tag 2** ganztags Programm · **Tag 3** Abreise am späten Vormittag.

**Reisegruppe (neutral, ohne Namen):**
- ein **Kind (6,5 Jahre)** — liebt Klettern, Balancieren/Gleichgewichtswege, Velofahren, Sommerrodelbahnen und die Berge. Der **Churer Gleichgewichtsweg** war letzten Sommer das Highlight und liegt direkt auf der Anreiseroute.
- die **Grosseltern (70 Jahre)** — gehfähig, aber es zählen bequeme Wege, Rastmöglichkeiten, moderates Tempo.

**Zwei Nutzungssituationen:**
1. **Planung:** Die Erwachsenen entscheiden am iPhone/iPad, welche Aktivitäten passen (Eignung, Preise, Altersregeln, Wetter, Hotelwahl).
2. **Vorfreude:** Kind und Grosseltern schauen die Seite **gemeinsam auf dem iPad** an — verspielt und bildhaft fürs Kind, gleichzeitig grosse Schrift, hoher Kontrast und ruhige Struktur für 70-Jährige.

Löse diesen Spagat als **ein Design, nicht zwei Modi**: kräftige, freundliche Bildsprache in einem grosszügig gesetzten, ruhigen Layout — plus ein **zweischichtiges Textkonzept** (Abschnitt 2).

**Erweiterbarkeit ist zentral:** Bislang ist nur die **Lenzerheide** recherchiert. Weitere Reiseziele müssen später **ohne Markup-Umbau** dazukommen — nur als neuer Eintrag in der Datendatei (Abschnitt 5).

---

## 2. Stil & Stimmung

- **Warme, sommerlich-alpine Bergwelt:** Wiesengrün, See-Türkis, Himmelblau, Sonnengelb, Bergrot-Akzent — **kräftig und kontraststark**, nicht pastellig-blass. Viel heller Raum, klare Blöcke, grosszügige Abstände.
- **Illustrativ statt fotolastig:** Stimmung über CSS-Formen, Farbverläufe, Inline-SVG (z. B. stilisierte Bergsilhouette im Header) und freundliche Emojis/Piktogramme (Berg, See, Schlitten, Velo, Bär, Eichhörnchen, Regenschirm). **Keine Fotos von Personen, keine externen Bilder.** Symbole immer **zusätzlich zu Text**, nie als einzige Bedeutungsquelle.
- **Zweischichtiges Textkonzept pro Aktivität (Kern des Zielgruppen-Spagats):**
  1. **Vorlese-Text fürs Kind** — gross, verspielt, direkt: z. B. «Der Boden ist Lava! Schaffst du alle 19 Balancier-Hindernisse?»
  2. **Fakten für die Erwachsenen** — kleiner, ruhig, sachlich, visuell klar untergeordnet, aber vollständig: Eignung, Preis in CHF, Öffnung, Altersregel, Links. Umsetzbar z. B. als native `<details>/<summary>`-Box «Für die Erwachsenen» (gross antippbar, funktioniert ohne JS) oder als abgesetzte Infozeile.
- Ton: herzlich, konkret, vorfreudig, kurze Sätze — für Kinder verständlich, aber nicht kindisch.

---

## 3. Spielerische Elemente (Vorfreude fürs Kind)

- **«Noch so oft schlafen»-Countdown:** Das Reisedatum ist noch offen. In `data.js` gibt es `reise.start` (zunächst `null`).
  - Ist `start` **`null`** → fröhlicher Hinweis: «**Bald geht's los!** Sobald das Datum feststeht, zählen wir gemeinsam die Nächte.» (kein leerer Countdown).
  - Ist ein Datum gesetzt → «**Noch X Mal schlafen** bis zum Bergabenteuer!» (in Nächten, kein Stunden/Minuten-Ticker).
- **Abenteuer-Stempel sammeln:** Jede Aktivitätskarte hat einen grossen **«Ich will da hin!»-Stempel-Button** (Touch ≥ 44 px). Tippen = Stempel erscheint mit sanfter Animation. Zustand in **localStorage**. Oben eine Fortschrittsanzeige «**X von Y Abenteuern** gesammelt!» mit freundlicher Fortschrittsleiste.
- **Strikt progressive enhancement:** Die Seite ist ohne JavaScript/localStorage vollständig lesbar; Countdown, Stempel und Filter sind Zugaben, keine Voraussetzung.

---

## 4. Informationsarchitektur / Seitenaufbau

### Startseite (`index.html`)
1. **Hero:** Neutraler Titel **«Unser Bergabenteuer»**, Untertitel «Schweiz-Urlaub 2026 · Graubünden». Stilisierte SVG-Bergszene, darunter der **Countdown/«Bald»-Zustand**.
2. **Reise-Steckbrief** als kompakte Chips: August 2026 · 2 Übernachtungen · Anreise Auto ca. 3 Std. über Chur · Gastgeber in Landquart · Gruppe: Kind (6,5 J.) + Grosseltern (70 J.).
3. **Destinations-Karten (Kern der Erweiterbarkeit):** aus den Daten generiert. Aktuell **eine gefüllte Karte «Lenzerheide»** («recherchiert»-Badge, Kurzbeschreibung, Highlights-Icons, Button «Ansehen») plus **1–2 Platzhalterkarten «Bald mehr!»** in dezenter, gestrichelter Fragezeichen-Optik — sichtbar, dass die Liste wächst.
4. **Anreise-Block:** Route über Chur mit dem **Churer Gleichgewichtsweg** als Zwischenstopp-Tipp (gilt zielunabhängig), inkl. Google-Maps-Link.

### Destinationsseite (`destination.html?id=lenzerheide`)
**Ein einziges Template**, das jede Destination anhand des `id`-Parameters aus den Daten rendert (unbekannte/fehlende `id` → sauber zur Startseite zurückverweisen). Abschnitte in dieser Reihenfolge, mit kompakter **Sprungnavigation** (sticky) am Seitenanfang:
1. **Steckbrief:** Name, Region, warum die Destination passt, Anfahrt von Landquart (ca. 30–40 Min.), **zentrale Kostenwarnung Bergbahnen** (Abschnitt 6).
2. **Balancieren & Gleichgewichtswege** — eigener Schwerpunktabschnitt (Lieblingsthema des Kindes).
3. **Abenteuer-Galerie (Aktivitäten)** mit **Tap-Filterleiste** und Sammel-Stempeln.
4. **Tagesplan Tag 1–3** mit **Umschalter «Schönwetter / Schlechtwetter»** — dieser Abschnitt muss **druckbar** sein (Drucken-Button).
5. **Hotels** mit Vergleich und Empfehlungslogik.
6. **Kosten & Tipps** (Beispiel-Kostentabelle).
7. **Events August 2026** («Programm» vs. «Kulisse»).
8. **Hinweise/Vorbehalte** (klein, am Seitenende).
9. Zurück-Link zur Startseite (relative Navigation).

---

## 5. Datenmodell (`assets/js/data.js`) — strikt vom Markup getrennt

Alle Inhalte leben in **einer** Datendatei. **Eine neue Destination hinzufügen = ein Objekt an `destinationen` anhängen, kein neues HTML.** Bitte dieses Schema übernehmen und mit den echten Inhalten aus Abschnitt 6 füllen:

```js
// assets/js/data.js
window.REISE = {
  meta: {
    titel: "Unser Bergabenteuer",
    untertitel: "Schweiz-Urlaub 2026",
    reisezeit: "August 2026",
    naechte: 2,
    start: null, // Datum noch offen -> "Bald geht's los!"-Zustand
    anreise: "Auto aus Ellwangen, ca. 3 Std., über Chur",
    gastgeberOrt: "Landquart",
    gruppe: [
      { rolle: "kind", label: "Kind", alter: 6.5,
        interessen: ["Klettern", "Balancieren", "Velofahren", "Sommerrodeln", "Berge"] },
      { rolle: "grosseltern", label: "Grosseltern", alter: 70 }
    ]
  },
  // Eignungs-Skala: "ideal" | "gut" | "bedingt" | "ungeeignet" — immer Text + Symbol, nie Farbe allein
  destinationen: [
    {
      id: "lenzerheide",
      name: "Lenzerheide",
      region: "Graubünden",
      status: "bereit", // "bereit" | "bald" (Platzhalterkarte)
      kurzbeschreibung: "Zertifizierte «Family Destination» …",
      anfahrtVonLandquart: "ca. 30–40 Min. mit dem Auto",
      kostenhinweis: "Bergbahnen im Sommer NICHT in einer Gästekarte gratis …",
      aktivitaeten: [
        {
          id: "globi-wanderweg",
          name: "Globi-Wanderweg",
          kategorie: "themenweg", // themenweg | balancieren | wasser | action | bike | spielen | schlechtwetter | ausflug
          icon: "🐤",
          favoritKind: true, // trifft ein Kind-Interesse -> Stern-Marker
          kindText: "Fahr mit dem Sessellift hoch und entdecke 13 Posten …", // Vorlese-Text
          fakten: "…", // sachliche Kurzbeschreibung für Erwachsene
          eignungKind: { stufe: "ideal", hinweis: "kurze Distanzen zwischen den Posten" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Sessellift verkürzt den Aufstieg" },
          preis: { erwachsen: "CHF 16 (Sessellift einfach)", kind: "CHF 8", hinweis: "retour CHF 21/10.50; bis 5. Geburtstag gratis" },
          gratis: false,
          dauer: "halber Tag",
          lage: "Lenzerheide / Val Sporz",
          schlechtwetter: "bedingt", // ja | nein | bedingt
          altersregel: null, // Warntext nur wo relevant (Rodelbahn, Seilpark!)
          offiziellUrl: "https://…",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=…"
        }
        // … alle weiteren Aktivitäten aus Abschnitt 6
      ],
      hotels: [ /* Felder: name, sterne, lage, hallenbad, eignungKind, preisniveau,
                   zimmerFuer3, zweitesZimmerMoeglich, besonderheit, offiziellUrl */ ],
      hotelEmpfehlung: "…",
      tagesplan: {
        schoenwetter: [ { tag: 1, titel: "…", bloecke: [ { zeit: "Mittag", text: "…" } ] } /* Tag 1–3 */ ],
        schlechtwetter: [ /* gleiche Struktur */ ]
      },
      kostenueberblick: { warnung: "…", posten: [ /* posten, erwachsen, kind, hinweis */ ] },
      events: [ { name: "…", datum: "…", art: "programm" /* | "kulisse" */ } ]
    }
  ]
};
```

`assets/js/app.js` enthält die gesamte Render-, Filter-, Stempel- und Countdown-Logik in **Vanilla JS**.

---

## 6. Konkrete Inhalte — Lenzerheide (echt, vollständig einbauen)

### Steckbrief & zentrale Kostenwarnung
Zertifizierte **«Family Destination»**, ideal für Kind (6,5 J.) + Grosseltern (70 J.): viele niederschwellige Angebote, kurze Wege, Sessellifte verkürzen Aufstiege. Anfahrt von Landquart ca. 30–40 Min.

**Kostenwarnung (als auffällige Infobox, mehrfach verlinkt):** Anders als in Arosa (Arosa Card = Arosa-Bahnen gratis) sind die **Lenzerheide-Bergbahnen im Sommer NICHT in einer Gästekarte inklusive**. Sommer-Tagesticket **Erw. CHF 56 / Kind CHF 28** (online exakt 6 % günstiger; Kinder bis zum 5. Geburtstag gratis). Für den kurzen Aufenthalt sind **Einzelfahrten oft günstiger**. Die Gästekarte bringt Vergünstigungen (Sportzentrum/H2Lai, Viamala u. a.) und **kostenlosen Sportbus** — Auto stehen lassen. **Sommerrodelbahn Pradaschier separat budgetieren** (nicht in Bergbahn-Tickets enthalten). Das **Sunstar-Hotel** bietet Gästen vergünstigte Bergbahntickets (**CHF 15/Tag statt CHF 48/56**).

### Schwerpunkt «Balancieren & Gleichgewichtswege»
1. **Churer Gleichgewichtsweg (das Original)** 🤸 — Fürstenwald, Chur. Ca. **450 m Parcours mit 19 Balancier-Hindernissen**, Motto «der Boden ist Lava», für alle Generationen. Kind: **ideal** (letzten Sommer erprobt und geliebt). Grosseltern: **gut** (Hindernisse freiwillig, Waldweg daneben). **Gratis, jederzeit frei zugänglich.** Liegt **direkt auf der Anreiseroute** — idealer Zwischenstopp an Tag 1 oder Tag 3. Kind-Text: «Der Boden ist Lava! 19 Hindernisse im Wald — schaffst du alle?» Link: https://die-buergergemeinde.ch/tipps/churer-gleichgewichtsweg/
2. **Autschliweg (beste Lenzerheide-Alternative)** 🐻 — Themenweg mit dem magischen Bären «Autschli»: Rätsel lösen, **auf Baumstämmen balancieren**; Autschli versteckt sich hinter Bäumen. Von der Mittelstation Scharmoin bergab ins Dorf. Kind: **ideal** (trifft genau die Interessen). Grosseltern: **gut** (bergab). Weg gratis, Bergbahn kostenpflichtig. Bonus an Scharmoin: **grösste Murmelbahn (Kugelbahn) der Schweiz, über 250 m** + LIKEaBIKE-Park + Erlebnisland. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Wandern-mit-Kindern
3. **Spielplatz Heidsee** 🏴‍☠️ — Piratenschiff, Hängebrücke, Kletterfelsen, Spielbach, viele Balancier-/Kletterelemente. Kind: **ideal**. Grosseltern: **ideal** (Kiosk mit warmen Gerichten, Grillstelle, Sitzbänke am See). **Gratis**, kinderwagentauglich, gut mit Baden/Pedalo kombinierbar. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Spielplaetze
4. **Wetterwichtelweg (Heidbüel, Churwalden)** 🧙 — Rätselweg mit **10 Stationen**: mit dem Blickrichter Tiere entdecken, die Wetterbotschaft entschlüsseln und an der Kasse Portal Churwalden oder im Infobüro Lenzerheide gegen eine **kleine Überraschung** eintauschen. Kind: **ideal**. Grosseltern: **gut** (gemächlich). Weg gratis, Bergbahn kostenpflichtig. **Kombi-Tipp: am selben Hang wie die Sommerrodelbahn Pradaschier.** Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Wandern-mit-Kindern/Wetterwichtelweg-Heidbueel_tour_19523175

### Weitere Aktivitäten (jede als Karte mit vollem Attributsatz)
5. **Globi-Wanderweg** 🐤 ⭐ — einziger der Schweiz, **13 Erlebnisposten**, ca. 6,5 km, Start Val Sporz → Sessellift → Tgantieni. Kügelibahn, Rega-Karussell, Ferngläser, Globi-Huus, Grillstellen. Kind: **ideal**. Grosseltern: **gut** (Abschnitt Acla Grischuna–Speichersee sogar kinderwagentauglich, Teilstrecken möglich). Preis Sessellift: **einfach Erw. CHF 16 / Kind CHF 8, retour CHF 21 / 10.50; bis 5. Geburtstag gratis**. Wetter: auch bei leichtem Regen gut. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Globi-in-Lenzerheide
6. **Globi live & Globi Set** 🎁 — Globi persönlich treffen (in der Saison Mi & So); Globi Set = Pauschale mit Geschichte und kleinem Geschenk. Kind: **ideal** (Highlight). Link wie oben.
7. **Sommerrodelbahn Pradaschier (Churwalden)** 🛷 ⭐ — **längste Rodelbahn der Schweiz**: 3100 m, 31 Kurven, 480 Höhenmeter, bis 40 km/h, Schienenführung, Auffahrt per Sesselbahn; Talstation mit **Riesen-Kugelbahn** (Roger Federer Foundation). **ALTERSREGEL — prominenter Warnhinweis auf der Karte:** Kinder **ab 3 J. nur in Begleitung eines Erwachsenen; allein erst ab 8 J. + 135 cm** → das 6,5-jährige Kind fährt **gemeinsam mit einem Grosselternteil**. Grosseltern: **gut** (Tempo per Bremshebel selbst steuerbar). Preis: **1 Fahrt inkl. Sesselbahn Erw. CHF 29.50 / Kind (6–12) CHF 15**; 5× CHF 59 / 39; «Rodeln Plus» inkl. Tagesmenü CHF 46 / 26. **Nicht in Bergbahn-Tickets enthalten.** Öffnung Aug. 2026: bis 16.8. tägl. 9–17 Uhr, ab 17.8. tägl. 9:30–17 Uhr. Wetter: fährt bei Trockenheit auch bei Bewölkung, **bei Nässe geschlossen**. Lage: Churwalden, Girabodawäg 16. Link: https://pradaschier.ch/de/
8. **Seilpark & Zipline Pradaschier** 🧗 — **ALTERSREGEL — Warnhinweis: Seilpark erst ab 10 J. / 140 cm — für das Kind NICHT geeignet.** Zipline (1739 m, bis 110 km/h): allein ab 10 J. (min. 25 kg); **Tandemflug für Kinder 3–9 J. mit Erwachsenem möglich**. Grosseltern: **bedingt** (nur bei Fitness/Mut). Preis Zipline inkl. Sesselbahn Erw. CHF 66 / Kind (10–17) CHF 42. Link: https://pradaschier.ch/de/
9. **Heidsee / Lido & Wassersportcenter** 🏖️ ⭐ — Bergsee auf 1500 m, im Sommer über 20 °C. Sandstrand, Piratenschiff, Kletterberg «Mini Lenzerhorn», Hängebrücke, abgetrenntes Kinderbecken; Pedalo-/Ruderboot-/Kajakverleih. Kind: **ideal**. Grosseltern: **ideal** (flache, rollstuhl-/kinderwagengängige Seeumrundung mit Rastbänken). **Seezugang gratis**, Boote gegen Miete. Wassersportcenter Ende Mai–Mitte Okt. tägl. 10–18 Uhr (in den Sommerferien länger). Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Wassersport
10. **Bergbahn Rothorn & Scharmoin-Erlebnisland** 🚡 ⭐ — Gondelbahn; an der Mittelstation Scharmoin die **grösste Murmelibahn der Schweiz** + LIKEaBIKE-Park + Erlebnisland. Kind: **ideal**. Grosseltern: **gut** (Gondel bequem, Bergrestaurant/Terrasse). Preis: Einzelfahrt Canols–Scharmoin **Erw. CHF 19 / Kind 9.50** (retour 25 / 12.50); bis Rothorngipfel 36 / 18 (retour 48 / 24). Sommerbetrieb täglich, bis 15.8. «Late Shred» bis 20 Uhr. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer
11. **Eichhörnchenwald** 🐿️ ⭐ — Waldstück zwischen Dorf und Heidsee, zutrauliche Eichhörnchen fressen mitgebrachte **Haselnüsse** aus der Hand. Kind: **ideal** (Highlight). Grosseltern: **gut** (flacher, kurzer Spaziergang). **Gratis.** Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Eichhoernchenwald
12. **Bike Kingdom / Little Kingdom & Pumptrack** 🚵 ⭐ — Little Kingdom: spielerisch Kurventechnik, Balance und Bremsen ohne Leistungsdruck; **Pumptrack im Dorf beim Spielplatz Ochsenbühl gratis**; Bike-Verleih in mehreren Shops. Kind: **gut**. Grosseltern: **bedingt** (zuschauen oder gemütliche (E-)Bike-Runde um den Heidsee). Link: https://www.bikekingdom.ch/de
13. **Minigolf & Pit-Pat** ⛳ — 18-Bahn-Minigolf am Sportzentrum (bei trockenem Wetter); Pit-Pat an der PRIVÀ Alpine Lodge (tägl. 8–21 Uhr, ohne Voranmeldung). Kind & Grosseltern: **ideal** (gemeinsames Spiel). Preis Minigolf inkl. Schläger & Ball: **Erw. CHF 9 / Kind CHF 7**. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Minigolf-Pit-Pat
14. **Wellnessbad H2Lai / Sportzentrum** 🏊 — Hallenbad innen/aussen, 175 m² Aussen-Whirlpool (35 °C), Wellness, Eishalle. **Top-Schlechtwetter-Option** für Kind und Grosseltern. Lage: Dieschen Sot 4. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Sportzentrum
15. **Foxtrail (Schnitzeljagd)** 🦊 — Rätseljagd; Bergtrail (~3 Std.) oder kürzerer, flacher **Heidseetrail** (für die Gruppe ideal). Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Foxtrail
16. **Biathlon-Erlebnis (Roland Arena, Lantsch/Lenz)** 🎯 — «Familien-Hit»: 2 Std. Biathlonkurs mit Luftgewehr + Spassparcours. Kind: **bedingt** (unterer Altersrand, aber betreut). Grosseltern: **gut**. Link: https://www.biathlon-arena-lenzerheide.ch
17. **Arosa Bärenland (Tagesausflug)** 🐻 — Bärenschutz-Anlage, via Rothorn + mehrere Lifte erreichbar, rollstuhlgängig. Kind: **ideal**. Grosseltern: **bedingt** (langer Anreiseweg, nur bei mehr Zeit). Preis Tageseintritt inkl. Bahn ab Arosa Erw. CHF 25 / Kind 12.50. Link: https://arosabaerenland.swiss/de
18. **Freibad Churwalden** 🌞 — grosse Liegewiese, Kiosk, Grillplatz; Alternative, wenn der Heidsee zu kühl ist. Link: https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Wassersport

### Tagesplan Tag 1–3 (beide Wettervarianten, aus den Daten gerendert)
**Schönwetter:**
- **Tag 1 (ab Mittag):** Auf der Anreise **Zwischenstopp Churer Gleichgewichtsweg**. Ankunft, Check-in, Mittagessen im Dorf · Nachmittag **Heidsee/Lido** (Strand, Spielplatz, Piratenschiff, evtl. Pedalo), optional **Eichhörnchenwald** (Haselnüsse mitbringen!) · Abend gemütliches Nachtessen.
- **Tag 2 (ganztags):** Vormittag **Globi-Wanderweg** (Sessellift Val Sporz → Tgantieni), Einkehr im Bergrestaurant · Nachmittag **Sommerrodelbahn Pradaschier** (Kind mit Grosselternteil im Schlitten) + Riesen-Kugelbahn — alternativ **Scharmoin-Erlebnisland** (Murmelibahn, LIKEaBIKE, Autschliweg bergab) · Abend Minigolf oder Wellness/Hallenbad.
- **Tag 3 (bis später Vormittag):** hotelnahes Kurzprogramm — **Pumptrack/Spielplatz Ochsenbühl**, **Minigolf** oder nochmals kurz an den **Heidsee** · später Vormittag Abreise (alternativ Churer Gleichgewichtsweg auf der Rückfahrt).

**Schlechtwetter:**
- **Tag 1:** Ankunft/Mittagessen · Nachmittag **Wellnessbad H2Lai** (Hallenbad, Whirlpool 35 °C) · Abend im Hotel.
- **Tag 2:** Vormittag **Pradaschier** (fährt bei Trockenheit auch bewölkt; bei Nässe geschlossen) oder **Globi-Wanderweg** bei leichtem Regen · Nachmittag H2Lai oder **Museum Vaz/Obervaz** · Abend Pit-Pat/Wellness.
- **Tag 3:** H2Lai oder Museum, dann Abreise.

### Hotels (Karten oder Vergleichstabelle mit Entscheidungskriterien)
- **Hotel Schweizerhof Lenzerheide ★★★★ (Swiss Family Hotel)** — Dorfzentrum. Grosse Familienzimmer (auch verbundene Zimmer/«Belle Etage»), Kinderbetreuung, **Familienbad + 1500 m² Wellness** (grösster Hamam der Alpen). Deckt Kind und Grosseltern gut ab. Preisniveau CHF 250–450+. https://www.schweizerhof-lenzerheide.ch
- **Sunstar Hotel Lenzerheide ★★★★** — zentral (~200 m Zentrum), Sportbus-Halt ~50 m, **Pumptrack direkt vor dem Hotel**, Hallenbad + Sauna, alle Zimmer mit Balkon, Frühstück & Wellness inklusive. **Bonus: vergünstigte Bergbahntickets CHF 15/Tag für Gäste.** https://lenzerheide.sunstar.ch/de
- **Revier Mountain Lodge ★★★** — direkt an Talstation Rothornbahn und am Heidsee, modern, Self-Check-in, **kein Hallenbad**, Frühstück extra, Parkplatz CHF 8/Nacht. Gutes Preis-Leistungs-Verhältnis, Zimmer für bis zu 3 Personen. Ab ca. CHF 150–200. https://lenzerheide.revierhotels.com/de
- **Valbella Resort** — Valbella, Garten mit Minigolf, Trampolin, Spielplatz, Tennis. https://www.valbellaresort.ch/de
- **Hotel Lenzerhorn** — Dorf, Family-Deluxe-Zimmer, **Hallenbad (28 °C)** & Wellness. https://www.hotel-lenzerhorn.ch/de

**Empfehlungslogik (als kurzer Entscheidungs-Block):** Hallenbad + kurze Wege wichtig → **Schweizerhof** oder **Sunstar** (Sunstar zusätzlich mit Bergbahn-Ticketvorteil). Nähe See/Rothorn + Budget/Modernität → **Revier** (ohne Hallenbad). Übernachtet der Gastgeber mit → Haus mit zweitem Zimmer/Verbindungstür (Schweizerhof, Sunstar, Lenzerhorn); sonst reicht ein Familienzimmer für 3.

### Kostenüberblick (Beispieltabelle, 2 Erwachsene + 1 Kind)
- Bergbahn-Tagesticket ganzes Gebiet: Erw. CHF 56 / Kind CHF 28 (online 6 % günstiger; bis 5. Geburtstag gratis) — **oder** Einzelfahrten rechnen (Globi-Sessellift CHF 16/8; Scharmoin CHF 19/9.50).
- Sommerrodelbahn Pradaschier: Erw. CHF 29.50 / Kind CHF 15 pro Fahrt — **separat, nicht im Bergbahn-Ticket**.
- Minigolf: Erw. CHF 9 / Kind CHF 7. Churer Gleichgewichtsweg, Heidsee-Zugang, Spielplätze, Pumptrack: **gratis**.
- Sportbus: mit Gästekarte gratis. Spar-Tipps: online kaufen, Sunstar-Vorteil, Einzelfahrten statt Tagesticket.

### Events August 2026 (klar als «Programm» vs. «Kulisse» kennzeichnen)
- **Family Bike Vibes (Arosa):** 7.–9. August 2026 — *Programm*.
- **Roland-Arena-Event (Lantsch/Lenz):** 7.–9. August 2026 — *Programm*.
- **Dynafit Transalpine Run, Start Lenzerheide:** 28. August 2026 — *Kulisse* (mit Kind eher zuschauen).
- Hinweis: Termine der Familienevents 2026 (Globi live, «Musik & Märli im Wald», Heidsee-Olympiade) kurz vor der Reise im Veranstaltungskalender prüfen.

### Vorbehalte (klein, am Seitenende)
Preise und Öffnungszeiten sind **Stand Recherche** und vor der Buchung auf den offiziellen Seiten zu prüfen. Altersregeln streng beachten: Rodeln allein erst ab 8 J./135 cm, Seilpark ab 10 J./140 cm.

---

## 7. Funktionale Anforderungen

- **Tap-Filterleiste** für die Aktivitäten (grosse Chips, Mehrfachauswahl, deutlich markierter Aktiv-Zustand, «Alle zeigen»-Reset): «Für das Kind ideal» · «Für Grosseltern bequem» · «Gratis» · «Schlechtwetter-tauglich» · Kategorie. Rein clientseitig, ohne Reload; bewusst wenige, grosse Chips, damit auch 70-Jährige sie mühelos bedienen.
- **Wetter-Umschalter** im Tagesplan (Schönwetter/Schlechtwetter) als grosser Tap-Toggle.
- **Eignungs-Badges** durchgängig als Ampel **mit Text UND Symbol** (ideal/gut/bedingt/ungeeignet), nie Farbe allein.
- **Alters-/Grössen-Warnungen** (Rodelbahn, Seilpark) als auffälliger, nicht übersehbarer Hinweis **direkt auf der jeweiligen Karte**.
- **Sammel-Stempel + Fortschritt + Countdown** gemäss Abschnitt 3, alles progressive enhancement.
- **Aufklappbare Details** über native `<details>/<summary>` (funktioniert ohne JS, gross antippbar).
- **Karten & Anfahrt als normale Google-Maps-Links** (kein API-Key, kein Embed), Muster `https://www.google.com/maps/search/?api=1&query=<Ort>`. Queries u. a.: «Churer Gleichgewichtsweg Fürstenwald Chur», «Heidsee Lenzerheide», «Talstation Val Sporz Lenzerheide», «Pradaschier Churwalden Girabodawäg 16», «Talstation Rothorn Canols Lenzerheide», «Sportzentrum Lenzerheide Dieschen Sot», «Landquart». Externe Links in neuem Tab mit `rel="noopener"`. Eine interaktive Karte höchstens als **optionale spätere Erweiterung** erwähnen, jetzt nicht einbauen.
- **Druckfunktion:** sichtbarer Button «Tagesplan drucken» (`window.print()`) beim Tagesplan.

---

## 8. Geräte, Bedienung & Barrierefreiheit (überprüfbare Kriterien)

Zielgeräte **primär iPhone und iPad mit Safari**, mobile-first. Reale Nutzung: iPhone unterwegs (einhändig, evtl. schwaches Netz), iPad zu Hause (Kind + Grosseltern gemeinsam).

- **Typografie:** fluide Skala mit `clamp()`, **Grundschrift mind. 18–20 px**, Zeilenhöhe ca. 1.5–1.6, Zeilenlänge ~60–70 Zeichen, Überschriften klar gestuft. Wichtige Zahlen (Preise, Zeiten) optisch hervorheben. Relative Einheiten, damit die iOS-Textvergrösserung greift.
- **Zoom nie blockieren:** **kein `user-scalable=no`, kein `maximum-scale`.**
- **Kontrast:** WCAG AA (Text ≥ 4.5:1, grosse Überschriften ≥ 3:1) — in Light **und** Dark Mode (`prefers-color-scheme: dark` mit ruhiger dunkler Palette).
- **Touch:** alle interaktiven Elemente **mind. 44×44 px** (besser 48), ausreichend Abstand. **Keine Hover-abhängige Bedienung** — alles per Tap; sichtbare `:focus-visible`-Zustände.
- **iOS-Safari-Spezifika:** Vollhöhen mit **`100dvh`/`svh` statt `100vh`** (Adressleisten-Bug). `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` und **`env(safe-area-inset-*)`** an Kopf-/Fuss-/Sticky-Bereichen. Sprunganker mit **`scroll-margin-top`**, damit nichts unter der sticky Navigation verschwindet. `scroll-behavior: smooth`, aber **`prefers-reduced-motion` respektieren**.
- **Performance:** wenig, defer-geladenes Vanilla JS; **Systemschriften** bevorzugen (höchstens **eine** selbst gehostete Schrift mit `font-display: swap`); keinerlei externe Requests; Deko als Inline-SVG/CSS. Schnell nutzbar auch bei langsamem Netz.
- **Druck:** `@media print` für den Tagesplan Tag 1–3 — Schwarz auf Weiss, gute Schriftgrösse, keine Navigation/Buttons/Hintergrundfarben, sinnvolle Seitenumbrüche, wichtigste URLs ausgeschrieben.
- **Semantik:** Landmarks (`header/nav/main/section/footer`), korrekte Überschriften-Hierarchie, sprechende Link-Texte, Skip-Link, per Tastatur bedienbar, `lang="de-CH"`, UTF-8.

---

## 9. Technische Randbedingungen (strikt)

- **Rein statisch: HTML, CSS, Vanilla JS. Kein Build-Schritt, keine Frameworks, kein npm, kein CDN.**
- **Dateistruktur:**
  ```
  index.html
  destination.html
  assets/css/style.css
  assets/js/data.js
  assets/js/app.js
  assets/fonts/   (optional, max. 1 Schrift)
  ```
- **Deployment auf GitHub Pages im Unterpfad** `https://ribeach.github.io/schweiz-urlaub-2026/` → **ausschliesslich relative Pfade** (`assets/...`, `destination.html?id=lenzerheide`). **Keine absoluten Pfade mit führendem `/`.**
- **Bereits im Repo vorhanden:** `assets/js/config.js` (referrer-beschränkter Google-Maps-Key für eine spätere interaktive Karte). Nicht löschen und vorerst nicht referenzieren — die Karte kommt in einer späteren Ausbaustufe.
- **Erweiterbarkeit:** neues Reiseziel = ein neues Objekt in `data.js` (Status «bald» → «bereit»); Startseiten-Karten und Destinationsseite rendern datengetrieben.

---

## 10. Privatsphäre (öffentliches Repo & öffentliche Seite)

- **Neutraler Titel ohne Namen:** «Unser Bergabenteuer» (Untertitel «Schweiz-Urlaub 2026»).
- **Keine Klarnamen:** das Kind nur als «das Kind»/«die Enkelin», die Grosseltern und der Gastgeber ohne Namen; Landquart nur als Ortsangabe für Distanzen, keine Adresse.
- **Keine Fotos von Personen** — Stimmung ausschliesslich über Farben, Inline-SVG und Emojis.

---

## 11. Explizite Don'ts

- **KEIN Lorem Ipsum, keine erfundenen Preise/Zeiten** — nur die echten Inhalte oben, gekennzeichnet als «Stand Recherche, vor der Buchung prüfen».
- **KEINE Frameworks, kein Build-Tool, kein npm/Bundler, keine externen CDN-/Font-/Bild-/Tracking-Requests, kein Karten-API-Key.**
- **KEINE absoluten Pfade** (führendes `/`) — die Seite liegt im Unterpfad.
- **KEINE Klarnamen, keine Personenfotos, kein sprechender Titel mit Familiennamen.**
- **KEIN «ß»** und keine geraden Anführungszeichen im sichtbaren Text — Schweizer Rechtschreibung und «…» durchhalten.
- **KEIN `user-scalable=no` / `maximum-scale`** — Zoomen muss immer möglich bleiben.
- **KEIN `100vh` für Vollhöhen** (iOS-Bug) — `100dvh`/`svh` verwenden.
- **KEINE Hover-only-Interaktion, keine Touch-Ziele < 44 px, keine winzige Schrift, keine reinen Farbcodes** ohne Text/Symbol.
- **KEINE automatisch abspielenden Sounds/Videos, kein Blinken/Flackern.**
- **Alters-/Grössenregeln nicht verharmlosen:** Rodelbahn allein erst ab 8 J./135 cm (das Kind nur mit Erwachsenem), Seilpark ab 10 J./140 cm (für das Kind ungeeignet) — klar erkennbar auf den Karten.
- **Inhalte nicht fest ins Markup schreiben**, wo sie in `data.js` gehören — die Erweiterbarkeit um weitere Destinationen darf nicht gebrochen werden.
- **Nicht so verspielt gestalten, dass die Erwachsenen-Fakten untergehen** — sie bleiben auffindbar und gut lesbar, nur visuell untergeordnet.

Liefere sauberen, kommentierten, gut strukturierten Code, der direkt auf GitHub Pages ausgerollt werden kann.