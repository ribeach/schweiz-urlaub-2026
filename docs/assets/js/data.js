/* =============================================================================
   data.js  —  Alle Inhalte der Reiseplanung. Strikt vom Markup getrennt.

   ➜  NEUE DESTINATION HINZUFÜGEN = ein Objekt an `destinationen` anhängen.
      Kein neues HTML nötig – index.html und destination.html rendern
      datengetrieben. Status "bald" erzeugt eine Platzhalterkarte,
      Status "bereit" eine vollständige Karte + eigene Destinationsseite.

   Eignungs-Skala:  "ideal" | "gut" | "bedingt" | "ungeeignet"
                    (wird IMMER mit Text UND Symbol dargestellt, nie Farbe allein)
   Kategorien:      themenweg | balancieren | wasser | action | bike |
                    spielen | schlechtwetter | ausflug
   Koordinaten:     koordinaten: { lat, lng } an jeder Aktivität, jedem Hotel
                    (Hotels haben dafür ein stabiles id-Slug) und
                    meta.anreiseStopp — Grundlage der Planungskarte (map.js).
                    Der Churer Gleichgewichtsweg liegt bewusst doppelt vor
                    (Aktivität + anreiseStopp, gleiche Koordinaten); map.js
                    dedupliziert per id. Mehrere Aktivitäten teilen bewusst
                    denselben Ort (Heidsee, Pradaschier, Sportzentrum,
                    Talstation Rothorn) und damit identische Koordinaten.
   Preise/Zeiten:   Stand Recherche – vor der Buchung offiziell prüfen.
   ============================================================================= */

window.REISE = {

  meta: {
    titel: "Unser Bergabenteuer",
    untertitel: "Schweiz-Urlaub 2026 · Graubünden",
    reisezeit: "August 2026",
    naechte: 2,
    // Reisedatum noch offen -> null erzeugt den "Bald geht's los!"-Zustand.
    // Sobald das Datum feststeht, hier ein ISO-Datum eintragen, z.B. "2026-08-14".
    start: null,
    anreise: "Auto aus Ellwangen, ca. 3 Std., über Chur",
    gastgeberOrt: "Landquart",
    ablauf: [
      "Tag 1 · Ankunft zum Mittagessen",
      "Tag 2 · ganztags Programm",
      "Tag 3 · Abreise am Nachmittag"
    ],
    gruppe: [
      {
        rolle: "kind", label: "Kind", alter: 6.5, emoji: "🧒",
        interessen: ["Klettern", "Balancieren", "Velofahren", "Sommerrodeln", "Berge"]
      },
      { rolle: "grosseltern", label: "Grosseltern", alter: 70, emoji: "👵👴" }
    ],
    // Zielunabhängiger Anreise-Tipp (liegt direkt auf der Route über Chur).
    anreiseRoute: "Ellwangen → über Chur → Landquart · ca. 3 Std. mit dem Auto",
    anreiseStopp: {
      id: "churer-gleichgewichtsweg",     // gleiche id wie die Aktivität → Dedupe-Schlüssel für map.js
      kategorie: "balancieren",
      name: "Churer Gleichgewichtsweg",
      icon: "🤸",
      koordinaten: { lat: 46.875184, lng: 9.546094 },
      text: "Das Original und letzten Sommer das grosse Highlight: 450 m Waldparcours mit 19 Balancier-Hindernissen nach dem Motto «der Boden ist Lava». Gratis, jederzeit offen – und ein perfekter Zwischenstopp auf der Anreise oder Rückfahrt.",
      lage: "Fürstenwald, Chur",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Churer+Gleichgewichtsweg+F%C3%BCrstenwald+Chur",
      offiziellUrl: "https://die-buergergemeinde.ch/tipps/churer-gleichgewichtsweg/"
    }
  },

  destinationen: [
    {
      id: "lenzerheide",
      name: "Lenzerheide",
      region: "Graubünden",
      status: "bereit",                       // "bereit" | "bald"
      emoji: "🏔️",
      kurzbeschreibung: "Zertifizierte «Family Destination» mit kurzen Wegen, vielen niederschwelligen Angeboten und Sesselliften, die den Aufstieg verkürzen – ideal für Kind und Grosseltern.",
      highlights: ["🛷", "🏖️", "🐤", "🐿️", "🤸"],
      anfahrtVonLandquart: "ca. 30–40 Min. mit dem Auto",
      warumPasst: "Viele Angebote sind niederschwellig und kurz, die Wege sind flach, und wo es bergauf geht, verkürzen Sessel- und Gondelbahnen den Aufstieg. So kommen das kletter- und balancierbegeisterte Kind und die Grosseltern gleichermassen auf ihre Kosten.",
      kostenhinweis: "Achtung – anders als in Arosa (Arosa Card = Bergbahnen gratis) sind die Lenzerheide-Bergbahnen im Sommer NICHT in einer Gästekarte inklusive. Sommer-Tagesticket Erw. CHF 56 / Kind CHF 28 (online exakt 6 % günstiger; Kinder bis zum 5. Geburtstag gratis). Für den kurzen Aufenthalt sind Einzelfahrten oft günstiger. Die Gästekarte bringt Vergünstigungen (Sportzentrum/H2Lai, Viamala u. a.) und einen kostenlosen Sportbus – Auto stehen lassen lohnt sich. Sommerrodelbahn Pradaschier separat budgetieren. Das Sunstar-Hotel bietet Gästen vergünstigte Bergbahntickets (CHF 15/Tag statt CHF 48/56).",

      aktivitaeten: [

        /* --- Schwerpunkt: Balancieren & Gleichgewichtswege (balancieren: true) --- */
        {
          id: "churer-gleichgewichtsweg",
          koordinaten: { lat: 46.875184, lng: 9.546094 },
          name: "Churer Gleichgewichtsweg",
          kategorie: "balancieren", icon: "🤸",
          favoritKind: true, balancieren: true,
          kindText: "Der Boden ist Lava! 19 Hindernisse mitten im Wald – schaffst du alle bis zum Schluss, ohne runterzufallen?",
          fakten: "Das Original in Chur: ca. 450 m Parcours mit 19 Balancier-Hindernissen im Fürstenwald, Motto «der Boden ist Lava», für alle Generationen. Neben den Hindernissen läuft ein normaler Waldweg. Liegt direkt auf der Anreiseroute – idealer Zwischenstopp an Tag 1 oder auf der Rückfahrt an Tag 3.",
          eignungKind: { stufe: "ideal", hinweis: "letzten Sommer erprobt und heiss geliebt" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Hindernisse sind freiwillig, ein Waldweg führt daneben" },
          preis: null, gratis: true,
          dauer: "1–2 Std.", lage: "Fürstenwald, Chur",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://die-buergergemeinde.ch/tipps/churer-gleichgewichtsweg/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Churer+Gleichgewichtsweg+F%C3%BCrstenwald+Chur"
        },
        {
          id: "autschliweg",
          koordinaten: { lat: 46.74029, lng: 9.556857 },
          name: "Autschliweg",
          kategorie: "balancieren", icon: "🐻",
          favoritKind: true, balancieren: true,
          kindText: "Der magische Bär Autschli versteckt sich hinter den Bäumen. Löse seine Rätsel und balanciere über die Baumstämme!",
          fakten: "Themenweg mit dem Bären «Autschli»: Rätsel lösen und auf Baumstämmen balancieren, von der Mittelstation Scharmoin gemütlich bergab ins Dorf. Bonus an Scharmoin: die grösste Murmelbahn (Kugelbahn) der Schweiz (über 250 m), ein LIKEaBIKE-Park und das Erlebnisland.",
          eignungKind: { stufe: "ideal", hinweis: "trifft genau die Interessen: Balancieren und Rätsel" },
          eignungGrosseltern: { stufe: "gut", hinweis: "vorwiegend bergab" },
          preis: { erwachsen: "Weg gratis · Bergbahn CHF 19 (Canols–Scharmoin einfach)", kind: "Weg gratis · Bergbahn CHF 9.50", hinweis: "retour CHF 25 / 12.50" },
          gratis: false,
          dauer: "halber Tag", lage: "Scharmoin, Lenzerheide",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Wandern-mit-Kindern",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Rothorn+Canols+Lenzerheide"
        },
        {
          id: "spielplatz-heidsee",
          koordinaten: { lat: 46.740321, lng: 9.550652 },
          name: "Spielplatz Heidsee",
          kategorie: "spielen", icon: "🏴‍☠️",
          favoritKind: true, balancieren: true,
          kindText: "Entere das Piratenschiff, wackle über die Hängebrücke und erklimme den Kletterfelsen – hier ist alles zum Balancieren und Klettern da!",
          fakten: "Piratenschiff, Hängebrücke, Kletterfelsen, Spielbach und viele Balancier- und Kletterelemente. Kinderwagentauglich und bestens mit Baden oder einer Pedalofahrt kombinierbar.",
          eignungKind: { stufe: "ideal", hinweis: "Klettern und Balancieren pur" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "Kiosk mit warmen Gerichten, Grillstelle und Sitzbänke direkt am See" },
          preis: null, gratis: true,
          dauer: "2–3 Std.", lage: "Heidsee, Lenzerheide",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Spielplaetze",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Heidsee+Lenzerheide"
        },
        {
          id: "wetterwichtelweg",
          koordinaten: { lat: 46.778603, lng: 9.541357 },
          name: "Wetterwichtelweg (Heidbüel)",
          kategorie: "themenweg", icon: "🧙",
          favoritKind: false, balancieren: true,
          kindText: "Finde mit dem Blickrichter alle versteckten Tiere, knacke die geheime Wetterbotschaft – und hol dir dafür eine kleine Überraschung ab!",
          fakten: "Rätselweg mit 10 Stationen am Heidbüel (Churwalden): mit dem Blickrichter Tiere entdecken, die Wetterbotschaft entschlüsseln und an der Kasse Portal Churwalden oder im Infobüro Lenzerheide gegen eine kleine Überraschung eintauschen. Kombi-Tipp: am selben Hang wie die Sommerrodelbahn Pradaschier.",
          eignungKind: { stufe: "ideal", hinweis: "Rätsel plus Belohnung am Schluss" },
          eignungGrosseltern: { stufe: "gut", hinweis: "gemächliches Tempo möglich" },
          preis: { erwachsen: "Weg gratis · Bergbahn kostenpflichtig", kind: "Weg gratis · Bergbahn kostenpflichtig", hinweis: "Auffahrt zum Heidbüel per Bergbahn" },
          gratis: false,
          dauer: "halber Tag", lage: "Heidbüel, Churwalden",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Wandern-mit-Kindern/Wetterwichtelweg-Heidbueel_tour_19523175",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pradaschier+Churwalden+Girabodaw%C3%A4g+16"
        },

        /* --- Weitere Aktivitäten --- */
        {
          id: "globi-wanderweg",
          koordinaten: { lat: 46.725161, lng: 9.546252 },
          name: "Globi-Wanderweg",
          kategorie: "themenweg", icon: "🐤",
          favoritKind: true, balancieren: false,
          kindText: "Fahr mit dem Sessellift den Berg hinauf und entdecke 13 Erlebnisposten – Kügelibahn, Rega-Karussell und das Globi-Huus warten auf dich!",
          fakten: "Der einzige Globi-Wanderweg der Schweiz: 13 Erlebnisposten, ca. 6,5 km, Start Val Sporz → Sessellift → Tgantieni. Kügelibahn, Rega-Karussell, Ferngläser, Globi-Huus und Grillstellen. Der Abschnitt Acla Grischuna–Speichersee ist sogar kinderwagentauglich; Teilstrecken sind gut machbar.",
          eignungKind: { stufe: "ideal", hinweis: "kurze Distanzen zwischen den Posten" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Sessellift verkürzt den Aufstieg, Teilstrecken kinderwagentauglich" },
          preis: { erwachsen: "CHF 16 (Sessellift einfach)", kind: "CHF 8", hinweis: "retour CHF 21 / 10.50; bis 5. Geburtstag gratis" },
          gratis: false,
          dauer: "halber bis ganzer Tag", lage: "Lenzerheide / Val Sporz",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Globi-in-Lenzerheide",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Val+Sporz+Lenzerheide"
        },
        {
          id: "globi-live",
          koordinaten: { lat: 46.726002, lng: 9.557748 },
          name: "Globi live & Globi Set",
          kategorie: "themenweg", icon: "🎁",
          favoritKind: false, balancieren: false,
          kindText: "Globi ist da! Triff ihn persönlich und hol dir dein Globi-Set mit Geschichte und einem kleinen Geschenk.",
          fakten: "Globi persönlich treffen (in der Saison Mi & So). Das Globi Set ist eine Pauschale mit Geschichte und kleinem Geschenk. Genaue Termine 2026 kurz vor der Reise im Veranstaltungskalender prüfen.",
          eignungKind: { stufe: "ideal", hinweis: "ein echtes Highlight" },
          eignungGrosseltern: { stufe: "gut", hinweis: "begleitend problemlos" },
          preis: null, gratis: false,
          dauer: "1–2 Std.", lage: "Lenzerheide",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Globi-in-Lenzerheide",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Lenzerheide"
        },
        {
          id: "sommerrodelbahn-pradaschier",
          koordinaten: { lat: 46.778603, lng: 9.541357 },
          name: "Sommerrodelbahn Pradaschier",
          kategorie: "action", icon: "🛷",
          favoritKind: true, balancieren: false,
          kindText: "3100 Meter den Berg hinuntersausen! Die längste Rodelbahn der Schweiz – du fährst zusammen mit Oma oder Opa im Schlitten.",
          fakten: "Die längste Rodelbahn der Schweiz: 3100 m, 31 Kurven, 480 Höhenmeter, bis 40 km/h, sichere Schienenführung. Auffahrt per Sesselbahn; an der Talstation die Riesen-Kugelbahn (Roger Federer Foundation). Öffnung Aug. 2026: bis 16.8. tägl. 9–17 Uhr, ab 17.8. tägl. 9:30–17 Uhr. Fährt bei Trockenheit auch bei Bewölkung, bei Nässe geschlossen. NICHT in Bergbahn-Tickets enthalten.",
          eignungKind: { stufe: "gut", hinweis: "nur gemeinsam mit einem Erwachsenen im Schlitten" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Tempo per Bremshebel selbst steuerbar" },
          preis: { erwachsen: "CHF 29.50 (1 Fahrt inkl. Sesselbahn)", kind: "CHF 15 (6–12 J.)", hinweis: "5× CHF 59 / 39 · «Rodeln Plus» inkl. Tagesmenü CHF 46 / 26 · separat budgetieren" },
          gratis: false,
          dauer: "2–3 Std.", lage: "Churwalden, Girabodawäg 16",
          schlechtwetter: "bedingt",
          altersregel: "Kinder ab 3 J. nur in Begleitung eines Erwachsenen; allein rodeln erst ab 8 J. und 135 cm. Das 6,5-jährige Kind fährt gemeinsam mit einem Grosselternteil.",
          offiziellUrl: "https://pradaschier.ch/de/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pradaschier+Churwalden+Girabodaw%C3%A4g+16"
        },
        {
          id: "seilpark-zipline",
          koordinaten: { lat: 46.778603, lng: 9.541357 },
          name: "Seilpark & Zipline Pradaschier",
          kategorie: "action", icon: "🧗",
          favoritKind: false, balancieren: false,
          kindText: "Diese Riesen-Klettertour und die schnelle Zipline sind erst für grössere Kinder – aber du kannst den mutigen Fliegern zuschauen!",
          fakten: "Seilpark mit drei Parcours und die erste Zipline Graubündens (1739 m, bis 110 km/h). Die Zipline ist allein ab 10 J. (min. 25 kg); ein Tandemflug ist für Kinder von 3–9 J. mit einem Erwachsenen möglich.",
          eignungKind: { stufe: "ungeeignet", hinweis: "Seilpark erst ab 10 J. / 140 cm; Zipline nur als Tandem" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "nur bei entsprechender Fitness und Mut" },
          preis: { erwachsen: "Zipline CHF 66 (inkl. Sesselbahn)", kind: "CHF 42 (10–17 J.)", hinweis: "Seilpark separat" },
          gratis: false,
          dauer: "2–3 Std.", lage: "Churwalden, Pradaschier",
          schlechtwetter: "nein",
          altersregel: "Seilpark erst ab 10 J. / 140 cm – für das 6,5-jährige Kind NICHT geeignet. Zipline allein ab 10 J. (min. 25 kg); Tandemflug für Kinder 3–9 J. nur mit Erwachsenem.",
          offiziellUrl: "https://pradaschier.ch/de/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pradaschier+Churwalden+Girabodaw%C3%A4g+16"
        },
        {
          id: "heidsee-lido",
          koordinaten: { lat: 46.740321, lng: 9.550652 },
          name: "Heidsee / Lido & Wassersport",
          kategorie: "wasser", icon: "🏖️",
          favoritKind: true, balancieren: false,
          kindText: "Ab an den Strand! Bade im warmen Bergsee, klettere auf den «Mini Lenzerhorn» oder fahr mit dem Pedalo übers Wasser.",
          fakten: "Bergsee auf 1500 m, im Sommer über 20 °C. Sandstrand, Piratenschiff, Kletterberg «Mini Lenzerhorn», Hängebrücke und ein abgetrenntes Kinderbecken. Pedalo-, Ruderboot- und Kajakverleih. Wassersportcenter Ende Mai–Mitte Okt. tägl. 10–18 Uhr (in den Sommerferien länger).",
          eignungKind: { stufe: "ideal", hinweis: "Baden, Spielplatz und Pedalo an einem Ort" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "flache, kinderwagen- und rollstuhlgängige Seeumrundung mit Rastbänken" },
          preis: { erwachsen: "Seezugang gratis", kind: "gratis", hinweis: "Boote gegen Mietgebühr" },
          gratis: true,
          dauer: "halber Tag", lage: "Heidsee, Lenzerheide",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Wassersport",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Heidsee+Lenzerheide"
        },
        {
          id: "bergbahn-rothorn",
          koordinaten: { lat: 46.74029, lng: 9.556857 },
          name: "Bergbahn Rothorn & Scharmoin-Erlebnisland",
          kategorie: "ausflug", icon: "🚡",
          favoritKind: true, balancieren: false,
          kindText: "Schweb mit der Gondel hoch in die Berge! An der Mittelstation warten die grösste Murmelbahn der Schweiz und der LIKEaBIKE-Park.",
          fakten: "Gondelbahn Rothorn. An der Mittelstation Scharmoin die grösste Murmelibahn der Schweiz, ein LIKEaBIKE-Park und das Erlebnisland. Sommerbetrieb täglich, bis 15.8. «Late Shred» bis 20 Uhr.",
          eignungKind: { stufe: "ideal", hinweis: "Murmelibahn und Laufrad-Park" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Gondel bequem, Bergrestaurant mit Terrasse" },
          preis: { erwachsen: "CHF 19 (Canols–Scharmoin einfach)", kind: "CHF 9.50", hinweis: "retour CHF 25 / 12.50 · bis Rothorngipfel CHF 36 / 18 (retour 48 / 24)" },
          gratis: false,
          dauer: "halber Tag", lage: "Talstation Rothorn, Canols, Lenzerheide",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Rothorn+Canols+Lenzerheide"
        },
        {
          id: "eichhoernchenwald",
          koordinaten: { lat: 46.732381, lng: 9.55224 },
          name: "Eichhörnchenwald",
          kategorie: "spielen", icon: "🐿️",
          favoritKind: true, balancieren: false,
          kindText: "Streck die Hand aus – die zutraulichen Eichhörnchen fressen Haselnüsse direkt aus deiner Hand! (Nüsse nicht vergessen.)",
          fakten: "Waldstück zwischen Dorf und Heidsee, in dem zutrauliche Eichhörnchen mitgebrachte Haselnüsse aus der Hand fressen. Ein flacher, kurzer Spaziergang.",
          eignungKind: { stufe: "ideal", hinweis: "ein magisches Highlight" },
          eignungGrosseltern: { stufe: "gut", hinweis: "flach und kurz" },
          preis: null, gratis: true,
          dauer: "ca. 1 Std.", lage: "zwischen Lenzerheide und Heidsee",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Familienerlebnisse/Eichhoernchenwald",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Eichh%C3%B6rnchenwald+Lenzerheide"
        },
        {
          id: "bike-kingdom",
          koordinaten: { lat: 46.728938, lng: 9.554841 },
          name: "Bike Kingdom / Little Kingdom & Pumptrack",
          kategorie: "bike", icon: "🚵",
          favoritKind: true, balancieren: false,
          kindText: "Üb auf dem Pumptrack Kurven, Balance und Bremsen – ganz ohne Stress. Der Pumptrack im Dorf ist gratis!",
          fakten: "Im Little Kingdom lernen Kinder spielerisch Kurventechnik, Balance und Bremsen ohne Leistungsdruck. Der Pumptrack im Dorf beim Spielplatz Ochsenbühl ist gratis nutzbar; Bike-Verleih in mehreren Shops.",
          eignungKind: { stufe: "gut", hinweis: "Einsteigerangebote und gratis Pumptrack" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "zuschauen oder gemütliche (E-)Bike-Runde um den Heidsee" },
          preis: { erwachsen: "Pumptrack gratis · Verleih/Kurse variabel", kind: "Pumptrack gratis", hinweis: "Little-Kingdom-Kurse buchbar" },
          gratis: true,
          dauer: "1–2 Std.", lage: "Ochsenbühl, Lenzerheide",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.bikekingdom.ch/de",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pumptrack+Ochsenb%C3%BChl+Lenzerheide"
        },
        {
          id: "minigolf-pitpat",
          koordinaten: { lat: 46.73311, lng: 9.555966 },
          name: "Minigolf & Pit-Pat",
          kategorie: "spielen", icon: "⛳",
          favoritKind: false, balancieren: false,
          kindText: "Wer schafft das Loch mit den wenigsten Schlägen? Minigolf für die ganze Familie – Oma und Opa spielen mit!",
          fakten: "18-Bahn-Minigolf am Sportzentrum (bei trockenem Wetter). Pit-Pat (Mix aus Minigolf und Billard) an der PRIVÀ Alpine Lodge, tägl. 8–21 Uhr, ohne Voranmeldung.",
          eignungKind: { stufe: "ideal", hinweis: "gemeinsames Spiel über Generationen" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "ruhig und im Sitzen zwischendurch möglich" },
          preis: { erwachsen: "CHF 9 (inkl. Schläger & Ball)", kind: "CHF 7", hinweis: "10er-Abo CHF 81 / 63" },
          gratis: false,
          dauer: "1–2 Std.", lage: "Sportzentrum, Lenzerheide",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Minigolf-Pit-Pat",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sportzentrum+Lenzerheide+Dieschen+Sot"
        },
        {
          id: "h2lai",
          koordinaten: { lat: 46.73311, lng: 9.555966 },
          name: "Wellnessbad H2Lai / Sportzentrum",
          kategorie: "schlechtwetter", icon: "🏊",
          favoritKind: false, balancieren: false,
          kindText: "Regen? Egal! Ab ins warme Hallenbad mit Innen- und Aussenbecken und dem grossen Whirlpool.",
          fakten: "Hallenbad innen und aussen, 175 m² Aussen-Whirlpool (35 °C), Wellness und Eishalle. Die Top-Schlechtwetter-Option für Kind und Grosseltern; mit Gästekarte vergünstigt.",
          eignungKind: { stufe: "ideal", hinweis: "warmes Wasser, viel Platz zum Planschen" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "Whirlpool und Wellness" },
          preis: null, gratis: false,
          dauer: "halber Tag", lage: "Sportzentrum, Dieschen Sot 4, Lenzerheide",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Sportzentrum",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sportzentrum+Lenzerheide+Dieschen+Sot"
        },
        {
          id: "foxtrail",
          koordinaten: { lat: 46.740321, lng: 9.550652 },
          name: "Foxtrail (Schnitzeljagd)",
          kategorie: "themenweg", icon: "🦊",
          favoritKind: false, balancieren: false,
          kindText: "Werde zum Detektiv! Folge den Spuren des schlauen Fuchses und löse knifflige Rätsel rund um den Heidsee.",
          fakten: "Rätsel-Schnitzeljagd in zwei Varianten: Bergtrail (~3 Std.) oder der kürzere, flache Heidseetrail – für die Gruppe ideal.",
          eignungKind: { stufe: "gut", hinweis: "mit Erwachsenen lösbar; Heidseetrail einfacher" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Heidseetrail flach und angenehm" },
          preis: null, gratis: false,
          dauer: "2–3 Std.", lage: "Heidsee, Lenzerheide",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Foxtrail",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Heidsee+Lenzerheide"
        },
        {
          id: "biathlon",
          koordinaten: { lat: 46.692328, lng: 9.559355 },
          name: "Biathlon-Erlebnis (Roland Arena)",
          kategorie: "action", icon: "🎯",
          favoritKind: false, balancieren: false,
          kindText: "Zielen und treffen! Beim Familien-Biathlon schiesst du mit dem Luftgewehr und flitzt durch den Spassparcours.",
          fakten: "«Familien-Hit»: 2 Std. Biathlonkurs mit Luftgewehr und Spassparcours auf der ersten fix installierten Biathlon-Anlage der Schweiz.",
          eignungKind: { stufe: "bedingt", hinweis: "am unteren Altersrand, aber betreut" },
          eignungGrosseltern: { stufe: "gut", hinweis: "gut machbar" },
          preis: null, gratis: false,
          dauer: "ca. 2 Std.", lage: "Roland Arena, Lantsch/Lenz",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.biathlon-arena-lenzerheide.ch",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Biathlon+Arena+Lenzerheide+Lantsch%2FLenz"
        },
        {
          id: "arosa-baerenland",
          koordinaten: { lat: 46.786778, lng: 9.663989 },
          name: "Arosa Bärenland (Tagesausflug)",
          kategorie: "ausflug", icon: "🐻",
          favoritKind: false, balancieren: false,
          kindText: "Besuche die grossen Bären in ihrem Wald-Zuhause! Ein Tagesausflug mit Gondel und Liften über die Berge nach Arosa.",
          fakten: "Bärenschutz-Anlage in Arosa, via Rothorn und mehrere Lifte erreichbar, rollstuhlgängig. Der Anreiseweg ist lang – lohnt sich nur, wenn mehr Zeit bleibt.",
          eignungKind: { stufe: "ideal", hinweis: "echte Bären zum Beobachten" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "langer Anreiseweg, nur bei mehr Zeit" },
          preis: { erwachsen: "CHF 25 (Tageseintritt inkl. Bahn ab Arosa)", kind: "CHF 12.50", hinweis: "mit Arosa Card Bahn gratis" },
          gratis: false,
          dauer: "ganzer Tag", lage: "Arosa",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://arosabaerenland.swiss/de",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Arosa+B%C3%A4renland"
        },
        {
          id: "freibad-churwalden",
          koordinaten: { lat: 46.776477, lng: 9.544258 },
          name: "Freibad Churwalden",
          kategorie: "wasser", icon: "🌞",
          favoritKind: false, balancieren: false,
          kindText: "Ist der Bergsee zu kühl? Dann ab ins Freibad mit grosser Liegewiese, Kiosk und Grillplatz!",
          fakten: "Freibad mit grosser Liegewiese, Kiosk und Grillplatz – die sonnige Alternative, wenn der Heidsee einmal zu kühl ist.",
          eignungKind: { stufe: "gut", hinweis: "klassisches Freibad-Vergnügen" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Liegewiese und Kiosk zum Verweilen" },
          preis: null, gratis: false,
          dauer: "halber Tag", lage: "Churwalden",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://arosalenzerheide.swiss/de/Lenzerheide/Sommer/Weitere-Sommeraktivitaeten/Wassersport",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Freibad+Churwalden"
        }
      ],

      hotels: [
        {
          id: "hotel-schweizerhof",
          koordinaten: { lat: 46.727351, lng: 9.557642 },
          name: "Hotel Schweizerhof Lenzerheide",
          sterne: 4, lage: "Dorfzentrum",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 250–450+",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Swiss Family Hotel: grosse Familienzimmer (auch verbundene Zimmer / «Belle Etage»), Kinderbetreuung, Familienbad + 1500 m² Wellness (grösster Hamam der Alpen).",
          offiziellUrl: "https://www.schweizerhof-lenzerheide.ch"
        },
        {
          id: "hotel-sunstar",
          koordinaten: { lat: 46.728688, lng: 9.554225 },
          name: "Sunstar Hotel Lenzerheide",
          sterne: 4, lage: "zentral (~200 m Zentrum), Sportbus-Halt ~50 m",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 250–400",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Pumptrack direkt vor dem Hotel, Hallenbad + Sauna, alle Zimmer mit Balkon, Frühstück & Wellness inklusive. Bonus: vergünstigte Bergbahntickets CHF 15/Tag statt CHF 48/56.",
          offiziellUrl: "https://lenzerheide.sunstar.ch/de"
        },
        {
          id: "hotel-revier",
          koordinaten: { lat: 46.740971, lng: 9.555747 },
          name: "Revier Mountain Lodge",
          sterne: 3, lage: "an Talstation Rothornbahn und am Heidsee",
          hallenbad: false, eignungKind: "gut", preisniveau: "ab ca. CHF 150–200",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Modern, Self-Check-in, Zimmer für bis zu 3 Personen. Kein Hallenbad, Frühstück extra, Parkplatz CHF 8/Nacht. Gutes Preis-Leistungs-Verhältnis.",
          offiziellUrl: "https://lenzerheide.revierhotels.com/de"
        },
        {
          id: "hotel-valbella",
          koordinaten: { lat: 46.749181, lng: 9.557492 },
          name: "Valbella Resort",
          sterne: null, lage: "Valbella",
          hallenbad: false, eignungKind: "gut", preisniveau: "auf Anfrage",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Garten mit Minigolf, Trampolin, Spielplatz und Tennisplatz – viel Bewegung direkt vor der Tür.",
          offiziellUrl: "https://www.valbellaresort.ch/de"
        },
        {
          id: "hotel-lenzerhorn",
          koordinaten: { lat: 46.728125, lng: 9.557543 },
          name: "Hotel Lenzerhorn",
          sterne: null, lage: "Dorf Lenzerheide",
          hallenbad: true, eignungKind: "gut", preisniveau: "auf Anfrage",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Family-Deluxe-Zimmer, Hallenbad (28 °C) & Wellness.",
          offiziellUrl: "https://www.hotel-lenzerhorn.ch/de"
        }
      ],
      hotelEmpfehlung: "Sind ein Hallenbad und kurze Wege wichtig, passt der Schweizerhof oder das Sunstar am besten (das Sunstar zusätzlich mit dem Bergbahn-Ticketvorteil). Zählen Nähe zu See und Rothorn sowie Budget und Modernität mehr, ist die Revier Mountain Lodge ideal (allerdings ohne Hallenbad). Übernachtet der Gastgeber mit, empfiehlt sich ein Haus mit zweitem Zimmer oder Verbindungstür (Schweizerhof, Sunstar, Lenzerhorn) – sonst genügt ein Familienzimmer für drei.",

      tagesplan: {
        schoenwetter: [
          {
            tag: 1, titel: "Ankunft & Heidsee",
            bloecke: [
              { zeit: "Anreise", text: "Zwischenstopp auf der Route: Churer Gleichgewichtsweg (450 m, 19 Balancier-Hindernisse, gratis)." },
              { zeit: "Mittag", text: "Ankunft, Check-in und Mittagessen im Dorf." },
              { zeit: "Nachmittag", text: "Heidsee / Lido: Strand, Spielplatz, Piratenschiff, evtl. Pedalofahrt. Optional Abstecher in den Eichhörnchenwald (Haselnüsse mitbringen!)." },
              { zeit: "Abend", text: "Gemütliches Nachtessen im Dorf oder Hotel." }
            ]
          },
          {
            tag: 2, titel: "Bergtag & Rodeln",
            bloecke: [
              { zeit: "Vormittag", text: "Globi-Wanderweg: Sessellift Val Sporz → Tgantieni, 13 Posten erkunden, Einkehr im Bergrestaurant." },
              { zeit: "Nachmittag", text: "Sommerrodelbahn Pradaschier (Kind mit Grosselternteil im Schlitten) + Riesen-Kugelbahn – alternativ Scharmoin-Erlebnisland (Murmelibahn, LIKEaBIKE, Autschliweg bergab)." },
              { zeit: "Abend", text: "Minigolf oder Wellness / Hallenbad." }
            ]
          },
          {
            tag: 3, titel: "Vormittagsprogramm & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "Hotelnahes Programm: Pumptrack / Spielplatz Ochsenbühl, Minigolf oder nochmals an den Heidsee." },
              { zeit: "Mittag", text: "Gemeinsames Mittagessen im Dorf." },
              { zeit: "Nachmittag", text: "Abreise – alternativ der Churer Gleichgewichtsweg als Stopp auf der Rückfahrt." }
            ]
          }
        ],
        schlechtwetter: [
          {
            tag: 1, titel: "Ankunft & Wellnessbad",
            bloecke: [
              { zeit: "Mittag", text: "Ankunft und Mittagessen." },
              { zeit: "Nachmittag", text: "Wellnessbad H2Lai: Hallenbad und Whirlpool (35 °C)." },
              { zeit: "Abend", text: "Gemütlich im Hotel." }
            ]
          },
          {
            tag: 2, titel: "Trockene Action & Bad",
            bloecke: [
              { zeit: "Vormittag", text: "Pradaschier (fährt bei Trockenheit auch bewölkt; bei Nässe geschlossen) oder Globi-Wanderweg bei leichtem Regen." },
              { zeit: "Nachmittag", text: "H2Lai oder Museum Vaz/Obervaz." },
              { zeit: "Abend", text: "Pit-Pat oder Wellness." }
            ]
          },
          {
            tag: 3, titel: "Bad oder Museum & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "H2Lai oder Museum Vaz/Obervaz." },
              { zeit: "Nachmittag", text: "Mittagessen, dann Abreise." }
            ]
          }
        ]
      },

      kostenueberblick: {
        warnung: "Bergbahnen sind im Sommer NICHT in einer Gästekarte gratis. Für den kurzen Aufenthalt oft günstiger: Einzelfahrten statt Tagesticket, online kaufen (6 % günstiger), Sunstar-Ticketvorteil nutzen, Sportbus (mit Gästekarte gratis) statt Auto.",
        posten: [
          { posten: "Bergbahn-Tagesticket (ganzes Gebiet)", erwachsen: "CHF 56", kind: "CHF 28", hinweis: "online 6 % günstiger; bis 5. Geburtstag gratis" },
          { posten: "Sessellift Globi-Wanderweg (einfach)", erwachsen: "CHF 16", kind: "CHF 8", hinweis: "Einzelfahrt-Alternative zum Tagesticket" },
          { posten: "Gondel Canols–Scharmoin (einfach)", erwachsen: "CHF 19", kind: "CHF 9.50", hinweis: "retour CHF 25 / 12.50" },
          { posten: "Sommerrodelbahn Pradaschier (1 Fahrt)", erwachsen: "CHF 29.50", kind: "CHF 15", hinweis: "separat, nicht im Bergbahn-Ticket" },
          { posten: "Minigolf (inkl. Schläger & Ball)", erwachsen: "CHF 9", kind: "CHF 7", hinweis: "" },
          { posten: "Churer Gleichgewichtsweg · Heidsee · Spielplätze · Pumptrack", erwachsen: "gratis", kind: "gratis", hinweis: "keine Kosten" },
          { posten: "Sportbus", erwachsen: "mit Gästekarte gratis", kind: "mit Gästekarte gratis", hinweis: "Auto stehen lassen" }
        ]
      },

      events: [
        { name: "Family Bike Vibes (Arosa)", datum: "7.–9. August 2026", art: "programm" },
        { name: "Roland-Arena-Event (Lantsch/Lenz)", datum: "7.–9. August 2026", art: "programm" },
        { name: "Dynafit Transalpine Run, Start Lenzerheide", datum: "28. August 2026", art: "kulisse" }
      ],
      eventHinweis: "Termine der Familienevents 2026 (Globi live, «Musik & Märli im Wald», Heidsee-Olympiade) kurz vor der Reise im Veranstaltungskalender prüfen.",

      hinweise: "Preise und Öffnungszeiten sind Stand Recherche und vor der Buchung auf den offiziellen Seiten zu prüfen. Altersregeln streng beachten: Rodeln allein erst ab 8 J. / 135 cm (das Kind nur mit Erwachsenem), Seilpark ab 10 J. / 140 cm (für das Kind ungeeignet)."
    }

    /* ---------------------------------------------------------------------
       WEITERE DESTINATION HINZUFÜGEN:
       Ein neues Objekt nach diesem Muster anhängen. Für eine noch nicht
       recherchierte Destination genügt ein Platzhalter:

       { id: "arosa", name: "Arosa", region: "Graubünden", status: "bald" }

       Status "bald" -> Platzhalterkarte auf der Startseite ("Bald mehr!").
       Sobald recherchiert: status auf "bereit" setzen und Felder füllen.
    --------------------------------------------------------------------- */
    ,
    {
      id: "davos-klosters",
      name: "Davos Klosters",
      region: "Graubünden",
      status: "bereit",                       // "bereit" | "bald"
      emoji: "⛰️",
      kurzbeschreibung: "Vier Erlebnisberge per Bahn, der grösste Bergspielplatz der Schweiz und viele gratis Angebote (Streichelzoo, Seebad, Spielplätze) – mit kurzen, teils kinderwagentauglichen Wegen für Kind und Grosseltern.",
      highlights: ["🎪", "🛷", "🐐", "🏖️", "🧙"],
      anfahrtVonLandquart: "ca. 45–50 Min. mit dem Auto",
      warumPasst: "Alle Höhen-Highlights sind bequem per Gondel oder Standseilbahn erreichbar; oben warten flache, kurze Rundwege (30 Min. bis max. 2 Std.) und viele kostenlose Angebote. So kommen das kletter- und balancierbegeisterte Kind und die 70-jährigen Grosseltern gleichermassen auf ihre Kosten. Mit der Premium Card lässt sich das Auto stehen lassen und alles lokal per Bus und Bahn erreichen.",
      kostenhinweis: "Die Davos Klosters Premium Card ist ab der ersten Übernachtung automatisch enthalten (lokaler ÖV gratis, Bergbahn-Kinderpreise halbiert) – die Bergbahnen selbst sind damit aber NICHT gratis. Im August gelten die Hauptsaison-Tarife (18.7.–23.8.2026): ein Berg Erw. CHF 20 / Kind CHF 10, Mehrbergtageskarte (exkl. Schatzalp) CHF 30 / 15, Schatzalpbahn CHF 10 / 5; ab 24.8. gilt die günstigere Nebensaison. Sommerrodelbahn und Madrisa-Gondel separat budgetieren. Kurtaxe Davos CHF 5.90/Person/Nacht ab 12 J. (Kinder 6–11 gratis). Alle Angaben Stand Recherche, vor der Buchung offiziell prüfen.",

      aktivitaeten: [

        /* --- Schwerpunkt: Klettern & Balancieren (balancieren: true) --- */
        {
          id: "davos-madrisa-land",
          koordinaten: { lat: 46.884438, lng: 9.875648 },
          name: "Madrisa-Land Klosters",
          kategorie: "spielen", icon: "🎪",
          favoritKind: true, balancieren: true,
          kindText: "Der grösste Bergspielplatz der Schweiz! Kletterbaum, Boulderwand, Slackline, Riesenrutschen, Wasserspiele und eine 100-Meter-Kugelbahn warten auf dich – hier kannst du einen ganzen Tag klettern und balancieren.",
          fakten: "Auf 1900 m gelegen und laut Schweiz Tourismus der grösste Spielplatz in den Schweizer Bergen, ausgelegt für Kinder von 2 bis 12 Jahren. Gondelbahn ab Klosters Dorf. Hüpfburg, Trampolin, Kletterbaum, Boulderwand, grosse Rutschen, Wasserspiele, Slackline-Parcours, Schlangenhöhle, Flyingfox und Kugelbahn, dazu ein Streichelzoo – barrierefrei angelegt. Der Eintritt ins Madrisa-Land ist im Gondelticket inbegriffen. Zusätzlich der kinderwagentaugliche Themen-Rundweg «Klara auf der Alp» (ca. 1,5 h). Sommersaison 13.6.–18.10.2026, Madrisa-Land tägl. 10–16 Uhr, Bahn 8:15–17:00. Auch bei leichtem Regen geeignet. Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "trifft alle Interessen: Klettern, Balancieren und Wasserspiele" },
          eignungGrosseltern: { stufe: "gut", hinweis: "barrierefreies Areal, Bergrestaurant und ein kinderwagentauglicher Themenweg" },
          preis: { erwachsen: "Gondel retour CHF 32 (Sommer)", kind: "CHF 13 (6–12 J.)", hinweis: "Eintritt Madrisa-Land im Gondelticket inbegriffen; mit Premium Card deutlich günstiger. Stand Recherche" },
          gratis: false,
          dauer: "ganzer Tag", lage: "Klosters Dorf (Madrisa)",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.madrisa.ch/en/sommer/summer-experiences/families",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Madrisa+Klosters+Dorf"
        },
        {
          id: "davos-zwergenweg",
          koordinaten: { lat: 46.862536, lng: 9.89003 },
          name: "Zwergenweg Klosters",
          kategorie: "themenweg", icon: "🧙",
          favoritKind: true, balancieren: true,
          kindText: "Setz die Zwergenmütze auf und folge Zwerg Purzel! Rutsch vom Zwergenturm, balanciere über die Hindernisse und schick eine Kugel durch die Riesen-Kugelbahn mitten im Wald.",
          fakten: "Modernisierter Themenweg mit 10 Stationen und Geschichten über Zwerg Purzel; Kinder dürfen Zwergenmützen aufsetzen. Highlights: Zwergenturm mit grosser Rutsche, Balance-Elemente, Tast-Station und eine mehrere Meter lange Riesen-Kugelbahn. Ca. 2,7 km, gut 1,5 h. Start bei der Bushaltestelle Doggiboden/Brachweg (Bus Nr. 3 ab Klosters Platz). Achtung: nicht kinderwagentauglich (Wurzelwege), viel Schatten, Bach zum Erfrischen, WC am Ende. Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "Balancieren, Rutsche und Kugelbahn – genau nach dem Geschmack des Kindes" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "Wurzelwege, festes Schuhwerk nötig, nicht kinderwagentauglich" },
          preis: null, gratis: true,
          dauer: "halber Tag", lage: "Doggiboden, Klosters",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.davos.ch/en/dwarf-trail",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zwergenweg+Klosters+Doggiboden"
        },
        {
          id: "davos-adventure-park",
          koordinaten: { lat: 46.810818, lng: 9.85501 },
          name: "Davos Adventure Park / Seilpark Färich",
          kategorie: "balancieren", icon: "🧗",
          favoritKind: true, balancieren: true,
          kindText: "Kletter dich mutig durch den Seilpark – der Kinderparcours ist schon für dich! Danach flitzt du mit dem Velo über den Pumptrack oder tobst auf den Spielplätzen.",
          fakten: "Seilpark mit 5 Parcours unterschiedlicher Schwierigkeit; Kinderparcours ab 4 Jahren mit Durchlaufsicherung. Für die hohen Parcours: Kinder ab 7 J. und 1,3 m Körpergrösse (bis 9 J. nur in Begleitung eines mitkletternden Erwachsenen). Auf dem Gelände zusätzlich zwei Kinderspielplätze, Skatebowl, Bikepark mit Pumptrack und das Restaurant Chalet Velo. Montags geschlossen; in den Ferien oft ausgebucht – Reservation empfohlen. 10 % Ermässigung mit Premium Card; Pumptrack mit eigenem Bike kostenlos. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "Kinderparcours ab 4 J.; hohe Parcours erst ab 7 J. / 1,3 m" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "zuschauen oder Pumptrack/Spielplätze; Klettern nur bei entsprechender Fitness" },
          preis: { erwachsen: "Seilpark kostenpflichtig (10 % mit Premium Card)", kind: "Kinderparcours günstiger", hinweis: "Pumptrack mit eigenem Bike gratis; genaue Preise vor Ort/online prüfen. Stand Recherche" },
          gratis: false,
          dauer: "2–3 Std.", lage: "Färich, Flüelatal, Davos Dorf",
          schlechtwetter: "nein",
          altersregel: "Kinderparcours ab 4 J. mit Durchlaufsicherung; hohe Parcours erst ab 7 J. und 1,3 m (bis 9 J. nur mit mitkletterndem Erwachsenen). Für das 6,5-jährige Kind ist der Kinderparcours geeignet.",
          offiziellUrl: "https://www.davos.ch/aktivitaeten/outdoor-abenteuer/davos-adventure-park",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Davos+Adventure+Park+Seilpark+F%C3%A4rich"
        },
        {
          id: "davos-spielplatz-kurpark",
          koordinaten: { lat: 46.798842, lng: 9.828474 },
          name: "Spielplatz Kurpark Davos",
          kategorie: "spielen", icon: "🛝",
          favoritKind: true, balancieren: true,
          kindText: "Kletter, rutsch und balanciere im Spielplatz mitten in Davos – und an heissen Tagen kühlst du dich bei den Wasserspielen ab!",
          fakten: "Frei zugänglicher Spielplatz im Kurpark Davos mit Wasserspielen, Rutsche sowie Kletter- und Balancierelementen, zentral gelegen – ideal für ein kurzes Programm, z. B. vor der Abreise. Weitere gratis Spielplätze: am Davosersee (Naturspielplatz, ca. 4–7 J.), Seehofseeli und beim Chalet Velo (Färich). Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "Klettern, Balancieren und Wasserspiele an einem Ort" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "zentral, ebener Weg, Sitzbänke" },
          preis: null, gratis: true,
          dauer: "1–2 Std.", lage: "Kurpark, Davos Platz",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.davosklostersmountains.ch/de/mountains/aktuelles/news-blog/Die-6-schoensten-Spielplaetze-in-Davos-Klosters_bba_2402240",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Spielplatz+Kurpark+Davos+Platz"
        },

        /* --- Erlebnisberge & weitere Aktivitäten --- */
        {
          id: "davos-rinerhorn",
          koordinaten: { lat: 46.745577, lng: 9.780824 },
          name: "Rinerhorn (Spielplatz & Streichelzoo)",
          kategorie: "ausflug", icon: "🐐",
          favoritKind: true, balancieren: false,
          kindText: "Schweb mit der Gondel hoch zum Rinerhorn! Oben streichelst du Alpakas, Ziegen und Schweine und planschst im seichten Nüllisee.",
          fakten: "Gondelbahn ab der Talstation Glaris auf 2053 m. Oben: grosser Spielplatz mit Trampolin, Sandkasten, Kletterturm und Hüpfkissen sowie ein kostenloser Alpen-Streichelzoo mit Alpakas, Ziegen, Schweinen und Hühnern (Ende Juni bis Ende September). Der seichte, abgesperrte Bereich des Nüllisees lädt zum Planschen ein (Baden im tiefen Bereich verboten). Kinderfreundliches Restaurant Jatzmeder; Grillplatz Äbirügg (ca. 30 Min., kinderwagen-/rollstuhltauglich). Bergbahn Sommer 2026: 6.6.–18.10. Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "Spielplatz, Streichelzoo und Planschen an einem Ort" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "flache, teils kinderwagentaugliche Wege und Bergrestaurant" },
          preis: { erwachsen: "CHF 20 (Berg-/Talfahrt, Premium Card, Hauptsaison)", kind: "CHF 10", hinweis: "Spielplatz & Streichelzoo gratis; Preise Stand Recherche" },
          gratis: false,
          dauer: "halber bis ganzer Tag", lage: "Davos Glaris (Rinerhorn)",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.davos.ch/en/discover/mountains-in-davos-klosters/rinerhorn",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Rinerhorn+Davos+Glaris"
        },
        {
          id: "davos-schatzalp",
          koordinaten: { lat: 46.797181, lng: 9.821569 },
          name: "Schatzalp: Sommerrodelbahn & Alpinum",
          kategorie: "action", icon: "🛷",
          favoritKind: true, balancieren: false,
          kindText: "Mit der historischen Standseilbahn in nur 4 Minuten hoch – dann sausst du auf der über 500 Meter langen Sommerrodelbahn den Berg hinunter!",
          fakten: "Nostalgische Standseilbahn von Davos Platz (1557 m) auf 1861 m in 4 Min., tagsüber alle 15 Min. Highlights: Sommerrodelbahn (über 500 m Kanal, Rücktransport per Lift, nur bei trockener Witterung, tägl. 10–17 Uhr, Mitte Mai bis ca. Mitte Oktober) und der botanische Alpengarten Alpinum (rund 3500 Pflanzenarten, grösste Edelweiss-Sammlung Europas, tägl. 9–18 Uhr). Dazu ein Wasserfall-Rundweg und ein Bergrestaurant mit Terrasse. Bahn-Sommerbetrieb 1.5.–25.10.2026. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "Rodeln ab 3 J. nur in Begleitung eines Erwachsenen" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Standseilbahn bequem; Alpinum und Terrasse gemütlich" },
          preis: { erwachsen: "Schatzalpbahn CHF 10 · Rodeln ca. CHF 4/Fahrt", kind: "Bahn CHF 5 · Rodeln ca. CHF 4", hinweis: "Alpinum CHF 5 (mit Premium Card gratis); Rodelpreise je nach Quelle CHF 4/18/35 bzw. 3.50/15/28 – vor Ort prüfen. Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Schatzalp, Davos Platz",
          schlechtwetter: "bedingt",
          altersregel: "Sommerrodelbahn: allein erst ab 8 J.; ab 3 J. nur in Begleitung eines Erwachsenen. Das 6,5-jährige Kind fährt gemeinsam mit einem Grosselternteil.",
          offiziellUrl: "https://www.schatzalp.ch/en/activities",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Schatzalpbahn+Talstation+Davos+Platz"
        },
        {
          id: "davos-jakobshorn",
          koordinaten: { lat: 46.791714, lng: 9.821854 },
          name: "Jakobshorn & Schaukäserei Clavadeleralp",
          kategorie: "ausflug", icon: "🧀",
          favoritKind: false, balancieren: false,
          kindText: "Fahr mit der Gondel hoch und schau in der Schaukäserei zu, wie echter Bergkäse entsteht – am kleinen Spielplatz kannst du danach toben.",
          fakten: "Gondelbahn in zwei Sektionen bis 2590 m. Familienfreundlich: von der Mittelstation Jschalp eine leichte Wanderung durch den Matta-Wald (ca. 1,5 h) oder in ca. 35–45 Min. zur Schau- und Erlebniskäserei Clavadeleralp (Käseherstellung live von Mitte Juni bis Mitte September, tägl. 10:30–12 Uhr) mit kleinem Spielplatz. Grill-/Picknickplatz am Stadlersee (ca. 20 Min. ab Bergstation, kinderwagentauglich). Sommerbetrieb 20.6.–18.10.2026. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "Käseshow und Spielplatz; kurze Wege wählbar" },
          eignungGrosseltern: { stufe: "gut", hinweis: "leichte Wege ab der Mittelstation, Bergrestaurant" },
          preis: { erwachsen: "CHF 20 (Berg-/Talfahrt, Premium Card, Hauptsaison)", kind: "CHF 10", hinweis: "Besuch der Schaukäserei gratis; Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Davos Platz (Jakobshorn)",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.davos.ch/entdecken/berge/jakobshorn",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Talstation+Jakobshorn+Davos+Platz"
        },
        {
          id: "davos-davosersee",
          koordinaten: { lat: 46.81533, lng: 9.852127 },
          name: "Davosersee: Baden, Pedalo & Eichhörnchen",
          kategorie: "wasser", icon: "🏖️",
          favoritKind: true, balancieren: false,
          kindText: "Bade im warmen Bergsee, fahr mit dem Pedalo übers Wasser und füttere die zutraulichen Eichhörnchen auf dem Rundweg – Nüsse nicht vergessen!",
          fakten: "Natürlicher Bergsee (Wassertemperatur bis 20 °C) mit kostenlosem Strandbad: grosse Liegewiese, Sandstrand, Beachvolleyball, Trampoline, Kickertische, Kinderspielplatz und Restaurant. Vermietung von 4-Plätzer-Pedalos (CHF 27/Std.), Kajaks und SUP. Rund um den See ein bequemer, ca. 5 km langer Rundweg, grösstenteils flach – ideal für die Grosseltern, mit zutraulichen Eichhörnchen (Nüsse mitnehmen!). Naturspielplatz für ca. 4–7-Jährige. Eintritt gratis. Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "Baden, Spielplatz, Pedalo und Eichhörnchen an einem Ort" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "bequemer, flacher Rundweg mit Rastmöglichkeiten" },
          preis: { erwachsen: "Seezugang gratis", kind: "gratis", hinweis: "Pedalo CHF 27/Std. Stand Recherche" },
          gratis: true,
          dauer: "halber Tag", lage: "Davosersee, Davos",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.davos.ch/aktivitaeten/wassersport/davosersee",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Davosersee+Strandbad+Davos"
        },
        {
          id: "davos-eau-la-la",
          koordinaten: { lat: 46.800793, lng: 9.830482 },
          name: "eau-là-là Erlebnisbad",
          kategorie: "schlechtwetter", icon: "🏊",
          favoritKind: false, balancieren: false,
          kindText: "Regen? Ab ins Erlebnisbad! Rutsch die 80 Meter lange «Black Hole», kletter im Wasser-Kletterpark und plansche im grossen Kinderbereich.",
          fakten: "Ganzjähriges Hallen- und Freibad: 25-m-Becken, grosser Planschbereich, Sprunganlagen, beheiztes Aussenbecken, 80-m-Rutsche «Black Hole», Kletterpark im Wasser, Fun-Park für Kinder (Mi/Sa) sowie Wellness und Sauna im Obergeschoss. Perfektes Schlechtwetterprogramm. Erlebnisbad Mo–Sa 10–21 Uhr, So 10–18 Uhr. Stand Recherche.",
          eignungKind: { stufe: "ideal", hinweis: "warmes Wasser, Rutsche und Wasser-Kletterpark" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "Wellness und Sauna im Obergeschoss" },
          preis: { erwachsen: "CHF 10", kind: "CHF 7", hinweis: "Erlebnisbad; Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Davos Platz",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://www.davos.ch/en/activities/water-sports/aquatic-centre-eau-la-la",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=eau-l%C3%A0-l%C3%A0+Erlebnisbad+Davos+Platz"
        },
        {
          id: "davos-gwunderwald",
          koordinaten: { lat: 46.76674, lng: 9.807365 },
          name: "GWunderwald Heidboden",
          kategorie: "themenweg", icon: "🌲",
          favoritKind: false, balancieren: false,
          kindText: "Entdecke im GWunderwald 31 Stationen zum Ausprobieren – über Tiere, Wald und Davos. Ihr sucht euch selbst aus, wie lang euer Weg wird!",
          fakten: "Grosser Naturerlebnispfad mit 31 Aktivposten auf 8 kombinierbaren Teilpfaden rund um den Heidboden. Themen: Natur, Tierwelt, Alp- und Forstwirtschaft, Davoser Geschichte. Routenlänge frei wählbar, teils überdachte Posten (auch bei leichtem Regen gut). Zugang bequem per Gratis-Bus (Linie 301) ab Davos Dorf; verschiedene Einstiege (Islen, Frauenkirch, Glaris). Kostenlos. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "viele Posten zum Ausprobieren" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Länge frei wählbar, gemächliches Tempo möglich" },
          preis: null, gratis: true,
          dauer: "halber Tag", lage: "Heidboden, Davos",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://gwunderwald.ch/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=GWunderwald+Heidboden+Davos"
        },
        {
          id: "davos-family-trail",
          koordinaten: { lat: 46.857334, lng: 9.955615 },
          name: "Family-Trail Klosters & Alp Garfiun",
          kategorie: "bike", icon: "🚲",
          favoritKind: true, balancieren: false,
          kindText: "Radle auf dem flachen Family-Trail dem Fluss entlang bis zur Alp Garfiun mit Spielplatz – unterwegs übst du im Pumptrack Kurven und Balance.",
          fakten: "Flacher Rundweg entlang der Landquart ab Arena Klosters zur Alp Garfiun (mit Spielplatz und einfacher Schweizer Küche) und zurück; unterwegs ein Bike-Skills-Areal mit Pumptrack. Familientauglich. Die Alp Garfiun oberhalb Monbiel ist auch zu Fuss (ca. 45–60 Min. ab Monbiel) oder per Kutsche erreichbar. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "flach, mit Pumptrack und Spielplatz am Ziel" },
          eignungGrosseltern: { stufe: "gut", hinweis: "flacher Weg; gemütliche (E-)Bike-Runde, zu Fuss oder per Kutsche" },
          preis: { erwachsen: "Trail & Pumptrack gratis · Bike-Verleih variabel", kind: "gratis", hinweis: "Alp Garfiun auch per Kutsche erreichbar. Stand Recherche" },
          gratis: true,
          dauer: "halber Tag", lage: "Monbiel / Alp Garfiun, Klosters",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.davosklostersmountains.ch/de/mountains/aktuelles/news-blog/Biketouren-Tipps-fuer-Familien_bba_1760514",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Alp+Garfiun+Monbiel+Klosters"
        },
        {
          id: "davos-kutschenfahrt",
          koordinaten: { lat: 46.781979, lng: 9.81437 },
          name: "Kutschenfahrt Sertig- / Dischmatal",
          kategorie: "ausflug", icon: "🐴",
          favoritKind: false, balancieren: false,
          kindText: "Klapper mit der Pferdekutsche in ein wildes Bergtal hinein – vielleicht bis zu einer Alp, wo ihr eine Pause macht.",
          fakten: "Pferdekutschen-Fahrten in die idyllischen Seitentäler Sertig und Dischma ab dem Bahnhof Davos Platz: z. B. Dischmatal–Teufi ca. 3 h (mit Einkehr), Sertigtal–Sand ca. 4,5 h, kürzere Runden ab ca. 45 Min. Auf Wunsch Abholung bei der Unterkunft. Anbieter u. a. Kutschen-Zentrale Davos und Flütsch Kutschenfahrten (Klosters). Voranmeldung empfohlen. Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "gemütlich; kürzere Runden für kleine Kinder wählen" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "bequem sitzend Natur geniessen, ideal mit Einkehr" },
          preis: { erwachsen: "kostenpflichtig, je nach Route", kind: "kostenpflichtig", hinweis: "Preise je nach Route und Anbieter; Voranmeldung nötig. Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Sertig- / Dischmatal, ab Davos Platz",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.davos.ch/entdecken/ausfluege-in-und-um-davos-klosters/kutschenfahrten",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kutschen-Zentrale+Davos+Bahnhof+Davos+Platz"
        },
        {
          id: "davos-foxtrail",
          koordinaten: { lat: 46.797874, lng: 9.826875 },
          name: "Foxtrail Davos (Schnitzeljagd)",
          kategorie: "themenweg", icon: "🦊",
          favoritKind: false, balancieren: false,
          kindText: "Werde zum Spürnasen-Detektiv und folge den Spuren des schlauen Fuchses quer durch Davos – knifflige Rätsel warten auf dich!",
          fakten: "Interaktive Schnitzeljagd/Rätseltour durch die Region. In Davos gibt es zwei kombinierbare Routen («Foxolino Cuolm» und «Foxolino Striunau»), je ca. 1,5–2 h, kombiniert ca. 2,5–3 h. Empfohlenes Mindestalter laut davos.ch 8 Jahre (foxtrail.ch eher 10–12 J.), Kinder unter 4 gratis. Teams 2–6 Personen; Tickets vor Ort bei den Gästeberatungen oder online. Stand Recherche.",
          eignungKind: { stufe: "bedingt", hinweis: "unter dem Mindestalter – nur mit starker Begleitung durch Erwachsene" },
          eignungGrosseltern: { stufe: "gut", hinweis: "gemütliche Route wählbar, Rätsel gemeinsam lösen" },
          preis: { erwachsen: "CHF 32 (Einzelroute) / 36 (kombiniert)", kind: "CHF 16 / 18 (bis 16 J.)", hinweis: "Familie (2 Erw. + 2 Kinder) CHF 79 / 89; unter 4 J. gratis. Stand Recherche" },
          gratis: false,
          dauer: "2–3 Std.", lage: "Davos",
          schlechtwetter: "bedingt",
          altersregel: "Empfohlenes Mindestalter 8 J. (foxtrail.ch: 10–12 J.). Für das 6,5-jährige Kind nur mit starker erwachsener Unterstützung sinnvoll.",
          offiziellUrl: "https://www.davos.ch/aktivitaeten/outdoor-abenteuer/foxtrail-davos",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=G%C3%A4steinformation+Davos+Platz"
        },
        {
          id: "davos-kirchner-museum",
          koordinaten: { lat: 46.80017, lng: 9.826745 },
          name: "Kirchner Museum Davos",
          kategorie: "schlechtwetter", icon: "🖼️",
          favoritKind: false, balancieren: false,
          kindText: "Wenn es draussen regnet, entdeckst du im Kunstmuseum bunte Bilder – manchmal gibt es sogar etwas zum Selbermachen für Kinder.",
          fakten: "Museum für Expressionismus (E. L. Kirchner), mit speziellen Kinderaktivitäten. 15 % Ermässigung mit Premium Card. Ein guter kurzer Regen-Programmpunkt, gut kombinierbar mit dem eau-là-là. Stand Recherche.",
          eignungKind: { stufe: "bedingt", hinweis: "kurze Kinderaktivitäten; für kleine Kinder nur begrenzt" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "ruhig, wettergeschützt und kulturell" },
          preis: { erwachsen: "Eintritt kostenpflichtig (15 % mit Premium Card)", kind: "ermässigt / gratis je nach Alter", hinweis: "aktuelle Preise vor Ort; Stand Recherche" },
          gratis: false,
          dauer: "1–2 Std.", lage: "Davos Platz",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://www.davos.ch/klosters",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kirchner+Museum+Davos+Platz"
        },
        {
          id: "davos-pradaschier",
          koordinaten: { lat: 46.785385, lng: 9.532051 },
          name: "Sommerrodelbahn Pradaschier (Tagesausflug)",
          kategorie: "ausflug", icon: "🎢",
          favoritKind: true, balancieren: false,
          kindText: "Willst du die längste Rodelbahn der Schweiz? Über 3000 Meter und 31 Kurven sausen bergab – zusammen mit Oma oder Opa im Schlitten!",
          fakten: "Pradaschier Churwalden (ca. 45–60 Min. Fahrt Richtung Lenzerheide/Chur): mit 31 Kurven, 480 Höhenmetern und rund 3060 m die längste Rodelbahn der Schweiz (ganzjährig auf Schiene). Dazu Sesselbahn, Zipline, Seilpark, Riesen-Kugelbahn und Hüpfburg an der Talstation. Ende Mai–Ende Oktober tägl. 10–17 Uhr (bei schönem Wetter). Stand Recherche.",
          eignungKind: { stufe: "gut", hinweis: "nur gemeinsam mit einem Erwachsenen im Schlitten" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Sesselbahn hoch, Tempo per Bremshebel selbst steuerbar" },
          preis: { erwachsen: "CHF 29.50 (1 Fahrt inkl. Sesselbahn)", kind: "CHF 15", hinweis: "ausserhalb der Davos-Klosters-Karte; Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Churwalden (Anfahrt ca. 45–60 Min.)",
          schlechtwetter: "bedingt",
          altersregel: "Rodeln allein ab 8 J. und 135 cm; ab 3 J. nur in Begleitung. Das 6,5-jährige Kind fährt gemeinsam mit einem Erwachsenen. Zipline und Seilpark erst für ältere Kinder.",
          offiziellUrl: "https://pradaschier.ch/en/activities/rodelbahn-sommer/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pradaschier+Churwalden"
        }
      ],

      hotels: [
        {
          id: "davos-waldhuus",
          koordinaten: { lat: 46.797595, lng: 9.835132 },
          name: "Hotel Waldhuus Davos",
          sterne: 4, lage: "Davos Platz, am Waldrand",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "Familienpaket ab ca. CHF 190/Nacht",
          zimmerFuer3: false, zweitesZimmerMoeglich: true,
          besonderheit: "Beste Familienwahl: Chalet-Hotel mit Globi Kids Club (gratis Kinderbetreuung), Kinderkino, 9-Loch-Minigolf, Hallenbad/Wellness und Kinderbuffet; Tiefgarage mit direktem Liftzugang. Familienzimmer für 2 Erw. + bis 2 Kinder – für 3 Erwachsene grösseres Zimmer/2. Zimmer anfragen. «Mountain Hotel»: Kinder bis 16 gratis, Premium Card inklusive.",
          offiziellUrl: "https://www.parsenn-resort.ch/de/hotels/Familien-Package_ho_2928"
        },
        {
          id: "davos-strela",
          koordinaten: { lat: 46.796028, lng: 9.819266 },
          name: "Hotel Strela Davos",
          sterne: 3, lage: "Davos Platz, ca. 10 Gehmin. zum Bahnhof",
          hallenbad: false, eignungKind: "gut", preisniveau: "preiswert (Familienzimmer)",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Zentral & preiswert: 2019 renoviert, Familienzimmer für 2–4 Personen (Doppelzimmer mit Bettsofa), Kinderspielecke, Wellness mit Sauna; nahe der Schatzalpbahn. Kinder bis 17 im Sommer gratis, Premium Card inklusive. Parkplatz CHF 10/Tag (begrenzt).",
          offiziellUrl: "https://www.davos.ch/erleben/familien/familienunterkuenfte/hotel-strela"
        },
        {
          id: "davos-meierhof",
          koordinaten: { lat: 46.805968, lng: 9.837018 },
          name: "Hotel Meierhof Davos",
          sterne: 4, lage: "Davos Dorf, ca. 300 m zur Parsennbahn",
          hallenbad: true, eignungKind: "gut", preisniveau: "Sommer ca. CHF 150–350 (Orientierung)",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Traditionshaus zentral in Davos Dorf, Bushaltestelle vor der Tür. Familienzimmer mit Balkon/Bergsicht, Kinderspielzimmer, Hallenbad/Wellness. Gratis-Parkplätze und kostenpflichtige Garage. Gute Frühstücksbewertungen.",
          offiziellUrl: "https://www.booking.com/hotel/ch/meierhofdavos.html"
        },
        {
          id: "davos-mountain-plaza",
          koordinaten: { lat: 46.793284, lng: 9.817778 },
          name: "Mountain Plaza Hotel Davos",
          sterne: null, lage: "Davos Platz",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "auf Anfrage",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Grösseres, kinderfreundliches Familienhotel mit eigenem Hallenbad, Spielzimmer und Bällebad – praktisch bei Regen. Von Familien gelobt (etwas «betriebsam»).",
          offiziellUrl: "https://www.davos.ch/erleben/familien/familienunterkuenfte"
        },
        {
          id: "davos-buenda",
          koordinaten: { lat: 46.807687, lng: 9.843868 },
          name: "Hotel Bünda Davos",
          sterne: null, lage: "Davos Dorf, ruhige Lage",
          hallenbad: false, eignungKind: "gut", preisniveau: "günstig, gutes Preis-Leistungs-Verhältnis",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Familien- und hundefreundlich, geräumige Familienzimmer, ruhige Lage nahe Skischulwiese. Gutes Preis-Leistungs-Verhältnis.",
          offiziellUrl: "https://www.tripadvisor.com/Hotels-g188090-zff4-Davos_Canton_of_Graubunden_Swiss_Alps-Hotels.html"
        },
        {
          id: "davos-hardrock",
          koordinaten: { lat: 46.797202, lng: 9.822805 },
          name: "Hard Rock Hotel Davos",
          sterne: null, lage: "Davos Platz, zentral am See/Kongresszentrum",
          hallenbad: false, eignungKind: "gut", preisniveau: "gehoben",
          zimmerFuer3: false, zweitesZimmerMoeglich: true,
          besonderheit: "Modernes Erlebnishotel mit Familienpaketen und grosszügigen Studio-Suiten für 2 Erw. + bis 2 Kinder, kinderfreundliches Restaurant, Foxtrail-Anbindung. Für 3 Erwachsene ein zweites Zimmer anfragen.",
          offiziellUrl: "https://hotel.hardrock.com/davos/de/kinderhotel-davos.aspx"
        },
        {
          id: "davos-seehof",
          koordinaten: { lat: 46.809088, lng: 9.839168 },
          name: "Hotel Seehof Davos",
          sterne: 5, lage: "Davos Dorf, direkt an der Parsennbahn",
          hallenbad: true, eignungKind: "gut", preisniveau: "5★-Luxus, höheres Segment",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Familienfreundliches Luxushaus mit Spa, ideal wegen der Bergbahn-Nähe; höheres Preissegment.",
          offiziellUrl: "https://www.seehofdavos.ch/en"
        }
      ],
      hotelEmpfehlung: "Fürs maximale Kinderprogramm passt das Waldhuus am besten (Globi Kids Club, Hallenbad, Tiefgarage). Zentral und preiswert sind das Strela und der Meierhof, letzterer zusätzlich mit Hallenbad und direkt an der Parsennbahn. Wichtig: Viele Familienzimmer sind für 2 Erwachsene + 2 Kinder ausgelegt – für 3 Erwachsene (Grosseltern + Gastgeber) unbedingt eine grössere Suite oder ein Verbindungs-/Zweitzimmer anfragen. Ein «Mountain Hotel» (Waldhuus, Strela u. a.) bringt Kinder bis 17 im Sommer gratis und die Premium Card inklusive.",

      tagesplan: {
        schoenwetter: [
          {
            tag: 1, titel: "Ankunft & Davosersee",
            bloecke: [
              { zeit: "Mittag", text: "Ankunft, Check-in und Ankunftsmittagessen am Davosersee (Strandbad-Restaurant, Spielplatz nebenan)." },
              { zeit: "Nachmittag", text: "Entspannt am Davosersee: Spielplatz, Eichhörnchen füttern auf dem flachen Rundweg (Nüsse mitbringen!), evtl. Pedalofahrt und Baden im warmen Bergsee." },
              { zeit: "Abend", text: "Gemütliches Nachtessen im Dorf oder Hotel." }
            ]
          },
          {
            tag: 2, titel: "Bergtag: Madrisa-Land oder Rinerhorn",
            bloecke: [
              { zeit: "Vormittag", text: "Gondel hoch: Madrisa-Land Klosters – klettern, balancieren, Wasserspiele und Streichelzoo (Eintritt im Gondelticket inkl.). Alternativ Rinerhorn mit Spielplatz, Streichelzoo und Nüllisee." },
              { zeit: "Mittag", text: "Einkehr im Bergrestaurant (Madrisa-Alp bzw. Jatzmeder am Rinerhorn)." },
              { zeit: "Nachmittag", text: "Weiterspielen am Berg oder als kürzere Ergänzung der Zwergenweg Klosters bzw. der GWunderwald." },
              { zeit: "Abend", text: "Ausklang im Hotel oder Spielplatz Kurpark." }
            ]
          },
          {
            tag: 3, titel: "Schatzalp & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "Schatzalp: Standseilbahn hoch (4 Min.), ein paar Fahrten auf der Sommerrodelbahn und Rundgang durchs Alpinum." },
              { zeit: "Mittag", text: "Einkehr auf der Schatzalp oder im Dorf." },
              { zeit: "Nachmittag", text: "Abreise – alternativ ein kurzer Stopp am Spielplatz Kurpark oder ein Abschnitt des Davosersee-Rundwegs." }
            ]
          }
        ],
        schlechtwetter: [
          {
            tag: 1, titel: "Ankunft & Erlebnisbad",
            bloecke: [
              { zeit: "Mittag", text: "Ankunft, Check-in und Mittagessen." },
              { zeit: "Nachmittag", text: "eau-là-là Erlebnisbad: Rutsche «Black Hole», Wasser-Kletterpark und Planschbereich." },
              { zeit: "Abend", text: "Gemütlich im Hotel." }
            ]
          },
          {
            tag: 2, titel: "Madrisa-Land oder Kultur & Bad",
            bloecke: [
              { zeit: "Vormittag", text: "Madrisa-Land (auch bei leichtem Regen geeignet) – oder bei starkem Regen das Kirchner Museum mit Kinderaktivitäten." },
              { zeit: "Nachmittag", text: "eau-là-là oder das Hotel-Hallenbad." },
              { zeit: "Abend", text: "Ausklang im Hotel." }
            ]
          },
          {
            tag: 3, titel: "Bad oder Museum & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "eau-là-là-Besuch oder Kirchner Museum." },
              { zeit: "Nachmittag", text: "Mittagessen, dann Abreise." }
            ]
          }
        ]
      },

      kostenueberblick: {
        warnung: "Die Premium Card (automatisch ab 1 Nacht) macht den lokalen ÖV gratis und halbiert die Kinderpreise auf den Bergbahnen – die Bergbahnen selbst sind aber NICHT gratis. August ist Hauptsaison (18.7.–23.8.2026) mit höheren Tarifen; ab 24.8. wird es günstiger. Viele Top-Angebote sind gratis: Spielplätze, Streichelzoo Rinerhorn, Strandbad Davosersee, GWunderwald, Zwergenweg und der Madrisa-Land-Eintritt (im Gondelticket inbegriffen). Auto stehen lassen und lokal Bus/Bahn nutzen lohnt sich.",
        posten: [
          { posten: "Bergbahn ein Berg (Berg-/Talfahrt, Premium Card, Hauptsaison)", erwachsen: "CHF 20", kind: "CHF 10", hinweis: "z. B. Rinerhorn oder Jakobshorn; ab 24.8. CHF 13 / 7" },
          { posten: "Mehrbergtageskarte (alle Berge, exkl. Schatzalp)", erwachsen: "CHF 30", kind: "CHF 15", hinweis: "Hauptsaison; ab 24.8. CHF 20 / 10" },
          { posten: "Schatzalpbahn (Berg-/Talfahrt)", erwachsen: "CHF 10", kind: "CHF 5", hinweis: "Sommerrodelbahn separat" },
          { posten: "Madrisa Gondel retour (Sommer)", erwachsen: "CHF 32", kind: "CHF 13", hinweis: "Eintritt Madrisa-Land inbegriffen; mit Premium Card günstiger" },
          { posten: "Sommerrodelbahn Schatzalp (1 Fahrt)", erwachsen: "ca. CHF 4", kind: "ca. CHF 4", hinweis: "Preise je nach Quelle CHF 4/18/35 bzw. 3.50/15/28 – vor Ort prüfen" },
          { posten: "eau-là-là Erlebnisbad", erwachsen: "CHF 10", kind: "CHF 7", hinweis: "Schlechtwetter-Option" },
          { posten: "Kurtaxe pro Nacht", erwachsen: "CHF 5.90", kind: "gratis (6–11 J.)", hinweis: "ab 12 J. CHF 5.90; Kinder anmelden" },
          { posten: "Davosersee · Spielplätze · GWunderwald · Zwergenweg · Streichelzoo", erwachsen: "gratis", kind: "gratis", hinweis: "keine Kosten" },
          { posten: "Lokaler ÖV (Bus/Bahn) mit Premium Card", erwachsen: "gratis", kind: "gratis", hinweis: "Auto stehen lassen" }
        ]
      },

      events: [
        { name: "Schaukäserei Clavadeleralp – Käseherstellung live", datum: "Mitte Juni – Mitte September 2026, tägl. 10:30–12 Uhr", art: "programm" },
        { name: "Alpen-Streichelzoo Rinerhorn", datum: "Ende Juni – Ende September 2026", art: "programm" },
        { name: "Madrisa-Land Sommersaison", datum: "13. Juni – 18. Oktober 2026", art: "kulisse" },
        { name: "Sommerrodelbahn Schatzalp", datum: "Mitte Mai – Mitte Oktober 2026, tägl. 10–17 Uhr", art: "programm" }
      ],
      eventHinweis: "Konkrete Veranstaltungstermine, Betriebszeiten und wetterabhängige Angebote (Sommerrodelbahn, Käseshow) kurz vor der Reise auf davos.ch prüfen.",

      hinweise: "Preise und Öffnungszeiten sind Stand Recherche und teils aus Drittquellen – vor der Buchung auf den offiziellen Seiten prüfen; Rodelbahn und einige Aussenaktivitäten laufen nur bei trockener Witterung. Altersregeln streng beachten: Sommerrodelbahn Schatzalp und Pradaschier allein erst ab 8 J. (das Kind nur mit Erwachsenem im Schlitten), die hohen Seilpark-Parcours im Adventure Park ab 7 J. / 1,3 m, der Foxtrail ab 8 J. (für das 6,5-jährige Kind nur mit starker erwachsener Begleitung). Premium Card ab 1 Übernachtung inklusive; Kurtaxe Davos CHF 5.90/Person/Nacht ab 12 J. (Kinder 6–11 gratis)."
    },
    {
      id: "flims-laax",
      name: "Flims Laax",
      region: "Graubünden",
      status: "bereit",                       // "bereit" | "bald"
      emoji: "🐉",
      kurzbeschreibung: "Offiziell «Families Welcome»: der längste Baumwipfelpfad der Welt, türkisgrüne Badeseen mit Schräglift und viele bahnunterstützte, ebene Wege – ideal für Kind und Grosseltern zugleich.",
      highlights: ["🐉", "🏊", "🤸", "🚵", "🐿️"],
      anfahrtVonLandquart: "ca. 30–35 Min. mit dem Auto",
      warumPasst: "Viele Highlights liegen dicht beieinander und sind eben oder barrierefrei: Der Baumwipfelpfad Senda dil Dragun und der Caumasee-Schräglift machen selbst Höhepunkte ohne Anstrengung erreichbar. Wo es bergauf geht, verkürzen Sessel- und Luftseilbahnen den Weg. So kommen das kletter- und balancierbegeisterte Kind und die 70-jährigen Grosseltern gleichermassen auf ihre Kosten – oft ganz ohne Auto, weil der Ortsbus mit der Gästekarte gratis ist.",
      kostenhinweis: "Achtung – die Bergbahnen von Flims Laax Falera sind im Sommer NICHT in der Übernachtung inklusive, sondern kostenpflichtig. Die Gästekarte Flims Laax Falera (automatisch ab 1 Übernachtung) bringt aber den Gratis-Ortsbus/Postauto (Zone Fidaz/Flims/Laax/Falera), 30 % Rabatt auf die Freestyle Academy, 5 % auf Bergbahn-Einzelfahrten und für Kinder den Caumasee-Eintritt gratis. Der FlemXpress gilt als auffallend teuer (bis CHF 105, regulär sogar CHF 131.25 retour für Erwachsene) – günstiger sind die Luftseilbahn Laax–Crap Sogn Gion (Erw. retour CHF 45) und der Sessellift Foppa. Alle Preise Stand Recherche, vor der Reise offiziell prüfen.",

      aktivitaeten: [

        /* --- Schwerpunkt: Klettern & Balancieren (balancieren: true) --- */
        {
          id: "flims-senda-dil-dragun",
          koordinaten: { lat: 46.818975, lng: 9.263702 },
          name: "Senda dil Dragun (Baumwipfelpfad)",
          kategorie: "themenweg", icon: "🐉",
          favoritKind: true, balancieren: true,
          kindText: "Der längste Baumwipfelpfad der ganzen Welt! Wandere hoch über dem Waldboden zwischen den Baumkronen – und flitze am Ende die 73 Meter lange Spiralrutsche hinunter!",
          fakten: "Mit 1,56 km der längste Baumwipfelpfad der Welt, zwischen Laax Murschetg und Laax Dorf, 2 bis 28 m über dem Waldboden. 5 Erlebnisorte, 4 Plattformen mit Sitzbänken, 5 Kugelbahnen und am Einstiegsturm Murschetg eine 73 m lange Spiralrutsche. Barrierefrei mit Lift im Turm – kinderwagen- und rollstuhltauglich, ebener Steg. Bei Gewitter/Sturm kann er gesperrt sein (Live-Info prüfen).",
          eignungKind: { stufe: "ideal", hinweis: "Balancieren zwischen den Baumkronen plus Riesenrutsche" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "barrierefrei, ebener Steg, Bänke zum Ausruhen" },
          preis: { erwachsen: "CHF 22", kind: "CHF 12 (6–17 J.)", hinweis: "Holzkugel für die Kugelbahn CHF 5; Rutsche ohne Begleitung ab 6 J.; Preise Stand Recherche" },
          gratis: false,
          dauer: "1–1,5 Std.", lage: "Laax Murschetg / Laax Dorf",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.laax.com/baumwipfelpfad",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Senda+dil+Dragun+Baumwipfelpfad+Laax"
        },
        {
          id: "flims-hochseilpark",
          koordinaten: { lat: 46.822921, lng: 9.276796 },
          name: "Hochseilpark Prau la Selva",
          kategorie: "balancieren", icon: "🧗",
          favoritKind: true, balancieren: true,
          kindText: "Kletter von Baum zu Baum wie ein kleiner Bär! Im Kinderparcours «Bärliweg» balancierst du gesichert durch den Wald, während Oma oder Opa von unten aufpasst.",
          fakten: "Mehrere Parcours auf 2–12 m Höhe mitten im Flimserwald (Kinder-, Wald-, Cross-, Fun- und Profiparcours), Restaurant Prau la Selva vor Ort. Der Bärliweg/Kinderparcours ist ab 4 J. mit Durchlaufsicherung begehbar (Begleitperson beaufsichtigt vom Boden). Sommer täglich ca. 10–19 Uhr; letzter Einlass rund 3 Std. vor Schluss. Turn- oder Wanderschuhe mit Profil sind Pflicht.",
          eignungKind: { stufe: "gut", hinweis: "Kinderparcours ab 4 J.; grössere Parcours erst ab 120 cm" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "Mitklettern nur bei Fitness und Mut; sonst vom Boden begleiten" },
          preis: { erwachsen: "Familie (2 Erw.+2 Ki.) ca. CHF 110", kind: "ca. CHF 27 (7–15 J.)", hinweis: "Stand Juli 2024; Dauer inkl. Einführung ~4 Std.; Preise Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Prau la Selva, Flims Waldhaus",
          schlechtwetter: "nein",
          altersregel: "Kinderparcours ab 4 J. mit Durchlaufsicherung. Die Parcours A–D erst ab Mindestkörpergrösse 120 cm (mit erwachsener Begleitung ab 18 J.) – je nach Grösse des Kindes vor Ort prüfen.",
          offiziellUrl: "https://sportzentrum-flims.ch/sommer-april-oktober/hochseilpark/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hochseilpark+Prau+la+Selva+Flims+Waldhaus"
        },
        {
          id: "flims-piazza",
          koordinaten: { lat: 46.819782, lng: 9.263543 },
          name: "rocksresort Piazza (Slackline, Trampolin & Surfwave)",
          kategorie: "spielen", icon: "🤸",
          favoritKind: true, balancieren: true,
          kindText: "Balanciere über die Slackline, hüpf auf dem Trampolin und schau den Surfern auf der Welle zu – und das Beste: Es kostet gar nichts!",
          fakten: "Frei zugänglicher Outdoor-Actionbereich direkt am rocksresort und an der Talstation Laax: Slackline, Trampolin, Snake Run, urbane Surfwave, Sandkasten und Pedalos. Alles gratis nutzbar, kein Autofahren nötig – perfekt für den Ankunftsnachmittag, weil es direkt bei signinahotel und rocksresort liegt.",
          eignungKind: { stufe: "ideal", hinweis: "Balancieren und Toben ohne Eintritt, mitten im Resort" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Bänke und Restaurants ringsum zum Zuschauen und Einkehren" },
          preis: null, gratis: true,
          dauer: "1–2 Std.", lage: "rocksresort, Laax Murschetg",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.rocksresort.com/en/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=rocksresort+Piazza+Laax+Murschetg"
        },
        {
          id: "flims-foppa-spielplatz",
          koordinaten: { lat: 46.84699, lng: 9.267876 },
          name: "Foppa-Spielplatz (per Sessellift)",
          kategorie: "spielen", icon: "🎢",
          favoritKind: true, balancieren: true,
          kindText: "Fahr mit dem Sessellift den Berg hinauf zum Spielplatz beim Berggasthaus Foppa – dort wartet eine richtig lange Rutsche auf dich!",
          fakten: "Erlebnis-Spielplatz beim Berggasthaus Foppa mit langer Rutsche und Klettergeräten, per Sessellift ab Flims erreichbar. Ideale Kombination: Kind spielt, Grosseltern kehren auf der Sonnenterrasse ein. Von Foppa führt eine kurze, leichte Runde Richtung Runca Höhe (Spielplatz, Feuerstelle) – nur Teilabschnitte des Trutg dil Flem wählen, der ganze Weg ist zu anspruchsvoll.",
          eignungKind: { stufe: "ideal", hinweis: "Klettern und Rutschen mit Bergpanorama" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Sessellift bringt bequem hinauf, Terrasse zum Einkehren" },
          preis: { erwachsen: "Sessellift Flims–Foppa CHF 16 (einfach)", kind: "ca. CHF 8 (Kinder reduziert)", hinweis: "Spielplatz gratis; mit Gästekarte 5 % auf Einzelfahrten; Preise Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Foppa, Flims",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.outdooractive.com/en/poi/flims-laax/foppa-playground/58448710/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Berggasthaus+Foppa+Flims"
        },

        /* --- Weitere Aktivitäten --- */
        {
          id: "flims-caumasee",
          koordinaten: { lat: 46.819988, lng: 9.295913 },
          name: "Caumasee (Badesee mit Schräglift)",
          kategorie: "wasser", icon: "🏊",
          favoritKind: true, balancieren: false,
          kindText: "Bade im türkisgrünen Zaubersee mitten im Wald! Spring vom Floss, plansch im flachen Kinderbecken – und fahr mit dem lustigen Schräglift zum Ufer hinunter.",
          fakten: "Türkisgrüner Badesee im Flimserwald, im Sommer 17–24 °C. Strandbad mit Floss, Sprungturm, Planschbecken, Kinderspielplatz, Beachvolleyball und Pedalo-/SUP-/Ruderbootverleih; Restaurant Ustria La Cauma. Der kostenlose Caumasee-Schräglift überwindet ~80 Höhenmeter, der Waldweg ist kinderwagen- und rollstuhltauglich. Seebad im August ca. 8:30–17 Uhr.",
          eignungKind: { stufe: "ideal", hinweis: "Baden, Floss und Spielplatz an einem Ort" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "Schräglift macht den Zugang bequem und barrierefrei" },
          preis: { erwachsen: "CHF 18 (mit Gästekarte CHF 9)", kind: "mit Gästekarte gratis (bis 16 J.)", hinweis: "Schräglift gratis; Saisonabo mit Gästekarte CHF 50 statt 120; Preise Stand Recherche" },
          gratis: false,
          dauer: "halber bis ganzer Tag", lage: "Flims Waldhaus",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/en/outdoor-activities/mountain-lakes/lake-cauma",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Caumasee+Flims"
        },
        {
          id: "flims-laaxersee",
          koordinaten: { lat: 46.807783, lng: 9.257015 },
          name: "Laaxersee (Ortssee mit Wasserspielplatz)",
          kategorie: "wasser", icon: "🏖️",
          favoritKind: true, balancieren: false,
          kindText: "Ein Badesee mitten im Dorf mit zwei Spielplätzen und einem eigenen Wasserspielplatz zum Planschen – und einem ebenen Rundweg drumherum.",
          fakten: "Badesee mitten in Laax mit Liegewiese, zwei Spielplätzen, Wasserspielplatz, Pedalo- und SUP-Verleih, Beachvolleyball und Floss. Der Rundweg ist kinderwagentauglich, und der See liegt direkt am Ausgang des Baumwipfelpfads (Laax Dorf) sowie am wellnessHostel3000/Aua Grava. Preiswert.",
          eignungKind: { stufe: "ideal", hinweis: "zwei Spielplätze plus Wasserspielplatz direkt am See" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "ebener, kinderwagentauglicher Rundweg mit Rastmöglichkeiten" },
          preis: { erwachsen: "ca. CHF 5", kind: "ca. CHF 2.50", hinweis: "preiswerter Ortssee; Boote gegen Mietgebühr; Preise Stand Recherche" },
          gratis: false,
          dauer: "halber Tag", lage: "Laax Dorf",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Laaxersee+Laax"
        },
        {
          id: "flims-freestyle-academy",
          koordinaten: { lat: 46.817978, lng: 9.265044 },
          name: "Freestyle Academy Laax (Indoor)",
          kategorie: "schlechtwetter", icon: "🛹",
          favoritKind: true, balancieren: false,
          kindText: "Regen? Egal! Spring in den Airbag, hüpf auf riesigen Trampolinen und probier die Skate-Bowl aus – alles unter einem Dach.",
          fakten: "Europas erste Indoor-Freestyle-Halle, 2000 m² mit Skate-Bowl, Rampen, Trampolinen, Airbag/Bagjump und Parkour; Café im Haus. Wetterunabhängig und damit die Top-Regen-Option. WICHTIG: Montag und Dienstag geschlossen – geöffnet Mi–So 13–20 Uhr. Rutschsocken im Trampolinbereich Pflicht (Kauf CHF 6.50). Mit Gästekarte 30 % Rabatt (nicht auf Abos).",
          eignungKind: { stufe: "gut", hinweis: "Halleneintritt ab 6 J.; jünger die KIDS Freestyle Academy in Flims" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "eher zum Zuschauen; Café zum Verweilen" },
          preis: { erwachsen: "vergünstigt (20 % Sommerrabatt)", kind: "mit Gästekarte zusätzlich 30 % Rabatt", hinweis: "Mo/Di geschlossen; Rutschsocken Pflicht (CHF 6.50); Preise Stand Recherche" },
          gratis: false,
          dauer: "2–3 Std.", lage: "rocksresort, Laax Murschetg",
          schlechtwetter: "ja",
          altersregel: "Halleneintritt ab 6 J. Für Kinder von 0–8 J. gibt es die separate KIDS Freestyle Academy in Flims (Stenna).",
          offiziellUrl: "https://freestyleacademy.com/laax",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Freestyle+Academy+Laax+Murschetg"
        },
        {
          id: "flims-kids-freestyle",
          koordinaten: { lat: 46.833762, lng: 9.282318 },
          name: "KIDS Freestyle Academy (Flims, Stenna)",
          kategorie: "schlechtwetter", icon: "🧸",
          favoritKind: true, balancieren: false,
          kindText: "Deine eigene Indoor-Spielwelt zum Rutschen, Klettern und ersten Trampolin-Hüpfen – ganz ohne die grossen Kinder, nur für dich!",
          fakten: "Rund 1500 m² Indoor-Bereich für Kinder von 0–8 Jahren (Rutschen, Klettern, erste Trampolin-Versuche), ungestört von älteren Kids – die ideale Regen-Alternative zur grossen Freestyle Academy und genau auf die 6,5-Jährige zugeschnitten. Mit Gästekarte gibt es 30 % Rabatt sowie gratis Kaffee für die begleitende Person.",
          eignungKind: { stufe: "ideal", hinweis: "Kernzielgruppe 0–8 J. – perfekt bei Regen" },
          eignungGrosseltern: { stufe: "gut", hinweis: "begleiten und zuschauen, Kaffee mit Gästekarte gratis" },
          preis: null, gratis: false,
          dauer: "2–3 Std.", lage: "Stenna, Flims Dorf",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/indoor-aktivitaeten/freestyle-academy",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=KIDS+Freestyle+Academy+Flims+Stenna"
        },
        {
          id: "flims-connbaechli",
          koordinaten: { lat: 46.825912, lng: 9.289482 },
          name: "Connbächli mit Connschiffli",
          kategorie: "themenweg", icon: "⛵",
          favoritKind: true, balancieren: false,
          kindText: "Zieh dein eigenes kleines Holzschiffchen am Seil durch den Bach und begleite es auf seiner Reise durch den Wald – eine echte Bach-Abenteuerfahrt!",
          fakten: "Familienwanderung entlang eines Bächleins: Kinder ziehen ein gekauftes oder eigenes Holzschiffchen am Seil durch das Wasser. Start beim hölzernen Torbogen nach dem Parkplatz Flims Waldhaus/Caumasee, bis zu 3,2 km entlang des Bachs; ein Forstweg parallel erlaubt das Verkürzen. Der Pfad ist schmal und nicht kinderwagentauglich. Ein schönes, ruhiges Kurzprogramm für Tag 3.",
          eignungKind: { stufe: "ideal", hinweis: "spielerisch, Kind bestimmt das Tempo" },
          eignungGrosseltern: { stufe: "gut", hinweis: "leicht, aber schmaler Pfad – festes Schuhwerk" },
          preis: null, gratis: true,
          dauer: "1–2 Std.", lage: "Flims Waldhaus (Start beim Caumasee-Parkplatz)",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Conn+Flims+Waldhaus+Caumasee+Parkplatz"
        },
        {
          id: "flims-ami-sabi",
          koordinaten: { lat: 46.821176, lng: 9.262194 },
          name: "Ami Sabi Sommerwunderland (betreutes Kinderprogramm)",
          kategorie: "spielen", icon: "🪄",
          favoritKind: true, balancieren: false,
          kindText: "Der Zauberer Ami Sabi nimmt dich mit auf Entdeckungsreise zu Tieren, Wasser und den vier Elementen – basteln, spielen und staunen im Wald!",
          fakten: "Zauberer Ami Sabi vermittelt Kindern von 4–12 Jahren spielerisch Natur, Tiere und die vier Elemente; Bastel- und Erlebnistage an wechselnden Orten (u. a. Falera, Flims/Foppa mit Sessellift, Laaxer Bach), Werkstatt bei den Zelten in Laax Murschetg (Di–Sa). Betreutes Angebot – Eltern und Grosseltern haben derweil Freizeit. Sommer- und Herbstferien, mehrere Tage pro Woche. Termine 2026 vor der Reise prüfen.",
          eignungKind: { stufe: "ideal", hinweis: "genau die Altersgruppe – betreut und thematisch passend" },
          eignungGrosseltern: { stufe: "gut", hinweis: "Kind ist betreut, Grosseltern haben Zeit für sich" },
          preis: null, gratis: false,
          dauer: "halber Tag", lage: "wechselnde Orte, Werkstatt Laax Murschetg",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://laaxschool.com/ami-sabi",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ami+Sabi+Werkstatt+Laax+Murschetg"
        },
        {
          id: "flims-pumptrack",
          koordinaten: { lat: 46.835281, lng: 9.284905 },
          name: "Pumptrack Flims",
          kategorie: "bike", icon: "🚵",
          favoritKind: true, balancieren: false,
          kindText: "Die «Mutter aller Pumptracks»! Sause mit Velo, Scooter oder Skateboard über die Wellen und durch die Steilkurven – und es ist gratis!",
          fakten: "Die «Mutter aller Pumptracks»: 190 m Wellenbahn mit 29 Wellen und 7 Steilkurven für Bike, BMX, Scooter, Skateboard und Inliner. Eintritt kostenlos (Helm mitbringen). Velo-Verleih bei LAAX Rental an der Talstation sowie bei Menzli Sport/Intersport in Laax Dorf; für Familien mit jüngeren Kindern eignet sich zudem der Runca Trail mit «Chicken-Run»-Umfahrungen.",
          eignungKind: { stufe: "gut", hinweis: "mit eigenem Velo/Scooter und Helm; Tempo selbst bestimmbar" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "eher zum Zuschauen; gemütliche Waldwege im Flimserwald als Alternative" },
          preis: null, gratis: true,
          dauer: "1–2 Std.", lage: "Flims",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/en/biken/bike-rental",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pumptrack+Flims"
        },
        {
          id: "flims-minigolf",
          koordinaten: { lat: 46.823101, lng: 9.276872 },
          name: "Minigolf Flims",
          kategorie: "spielen", icon: "⛳",
          favoritKind: false, balancieren: false,
          kindText: "Wer trifft das Loch mit den wenigsten Schlägen? Minigolf für die ganze Familie – Oma und Opa spielen mit!",
          fakten: "Minigolfanlage in Flims (beim Hotel Adula / Flims Waldhaus) – ein ruhiges, generationenübergreifendes Spiel für zwischendurch, gut mit Caumasee oder Il Spir kombinierbar. Öffnungszeiten und Preise vor Ort bzw. im Tourismusbüro prüfen.",
          eignungKind: { stufe: "ideal", hinweis: "gemeinsames Spiel über die Generationen" },
          eignungGrosseltern: { stufe: "ideal", hinweis: "ruhig und im Stehen/Sitzen zwischendurch möglich" },
          preis: null, gratis: false,
          dauer: "1–2 Std.", lage: "Flims Waldhaus",
          schlechtwetter: "bedingt", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Minigolf+Flims+Waldhaus"
        },
        {
          id: "flims-il-spir",
          koordinaten: { lat: 46.812695, lng: 9.319794 },
          name: "Aussichtsplattform Il Spir & Rheinschlucht",
          kategorie: "ausflug", icon: "🦅",
          favoritKind: false, balancieren: false,
          kindText: "Steh auf einer Plattform, die aussieht wie ein grosser Vogel, und schau tief hinunter in den «Swiss Grand Canyon» – wie hoch fühlst du dich?",
          fakten: "Die kostenlose Aussichtsplattform Il Spir bei Conn (in Form eines Mauerseglers) bietet einen 180°-Blick in die Rheinschlucht Ruinaulta, den «Swiss Grand Canyon». Von Flims Waldhaus über Staderas–Conn ein leichter, laut Graubünden Tourism kinderwagentauglicher Weg (~45–60 Min.), Einkehr im Restaurant Conn, Rückweg per Bus möglich. Plattform Mai–Oktober; etwas Schwindelfreiheit nötig.",
          eignungKind: { stufe: "gut", hinweis: "beeindruckende Aussicht; auf der Plattform an der Hand halten" },
          eignungGrosseltern: { stufe: "gut", hinweis: "ebener Zuweg, Einkehr unterwegs; leichte Schwindelfreiheit auf der Plattform" },
          preis: null, gratis: true,
          dauer: "halber Tag", lage: "Conn, Flims",
          schlechtwetter: "nein", altersregel: null,
          offiziellUrl: "https://www.rheinschlucht.ch/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aussichtsplattform+Il+Spir+Conn+Flims"
        },
        {
          id: "flims-nagens-murmeltiere",
          koordinaten: { lat: 46.855492, lng: 9.234921 },
          name: "Murmeltiere Alp Nagens (per Bahn & Shuttle)",
          kategorie: "ausflug", icon: "🐿️",
          favoritKind: true, balancieren: false,
          kindText: "Fahr mit Bahn und Shuttle hoch auf die Alp und halte Ausschau nach den pfeifenden Murmeltieren – am Morgen zeigen sie sich am liebsten!",
          fakten: "Von den Laax Bergbahnen bringt ein Shuttle auf die Alp Nagens (~1980 m); rund um Nagens/Segnesboden ist die Chance auf Murmeltiere hoch, morgens am besten. Ein kurzer, leichter Abschnitt zum Unteren Segnesboden (Kinder spielen an Wasserläufen) ist für rüstige Grosseltern und Kind machbar – die volle Nagens-Segnesboden-Runde ist für die Gruppe zu anspruchsvoll. Günstiger Zustieg: Luftseilbahn Laax–Crap Sogn Gion statt des teuren FlemXpress.",
          eignungKind: { stufe: "gut", hinweis: "Tiere beobachten; nur leichte Teilabschnitte gehen" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "bahnunterstützt; nur den kurzen, ebenen Abschnitt wählen, teils seitlich abschüssig" },
          preis: { erwachsen: "Luftseilbahn Laax–Crap Sogn Gion retour CHF 45", kind: "CHF 22.50", hinweis: "FlemXpress deutlich teurer (bis CHF 105 retour Erw.); Shuttle Alp Nagens separat; Preise Stand Recherche" },
          gratis: false,
          dauer: "ganzer Tag", lage: "Alp Nagens, Laax",
          schlechtwetter: "nein",
          altersregel: "Nur leichte Teilabschnitte wählen: Die volle Nagens-Segnesboden-Runde und der ganze Trutg dil Flem sind für 70-Jährige und ein Kind zu anspruchsvoll. Trittsichere Schuhe nötig.",
          offiziellUrl: "https://www.flimslaax.com/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Alp+Nagens+Laax"
        },
        {
          id: "flims-aua-grava",
          koordinaten: { lat: 46.810562, lng: 9.257685 },
          name: "Aua Grava (Hallenbad Laax)",
          kategorie: "schlechtwetter", icon: "🏊",
          favoritKind: false, balancieren: false,
          kindText: "Regentag? Ab ins Hallenbad mit Erlebnisrutsche und eigenem Kinderbecken zum Planschen und Toben!",
          fakten: "Modernes Hallenbad am Laaxersee mit 25-m-Becken, Nichtschwimmerbecken mit Erlebnisrutsche und Kinderbecken; 850 m² Spa/Sauna (erst ab 14 J.). Die Top-Regen-Option für Kind und Grosseltern. Gäste von Peaks Place und wellnessHostel3000 haben Gratis-Eintritt.",
          eignungKind: { stufe: "ideal", hinweis: "Kinderbecken und Erlebnisrutsche" },
          eignungGrosseltern: { stufe: "gut", hinweis: "grosses Becken, Spa/Sauna ab 14 J." },
          preis: null, gratis: false,
          dauer: "halber Tag", lage: "Laaxersee, Laax",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://www.auagrava.ch/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aua+Grava+Laax"
        },
        {
          id: "flims-kino-stenna",
          koordinaten: { lat: 46.833057, lng: 9.282221 },
          name: "Kino Stenna (Flims)",
          kategorie: "schlechtwetter", icon: "🎬",
          favoritKind: false, balancieren: false,
          kindText: "Wenn es draussen richtig giesst: Popcorn schnappen und im grossen Kino einen Film auf der Leinwand schauen!",
          fakten: "Kino im Untergeschoss des Stenna Flims mit vier Sälen (2D/3D) und aktuellen Blockbustern – eine gemütliche Rückzugsoption bei durchnässtem Wetter. Programm und Zeiten kurz vor der Reise prüfen.",
          eignungKind: { stufe: "gut", hinweis: "je nach Filmprogramm; ruhige Regen-Option" },
          eignungGrosseltern: { stufe: "gut", hinweis: "bequem im Sitzen, wettergeschützt" },
          preis: null, gratis: false,
          dauer: "2–3 Std.", lage: "Stenna, Flims Dorf",
          schlechtwetter: "ja", altersregel: null,
          offiziellUrl: "https://www.flimslaax.com/",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Kino+Stenna+Flims"
        },
        {
          id: "flims-rafting",
          koordinaten: { lat: 46.774449, lng: 9.202261 },
          name: "River Rafting Rheinschlucht",
          kategorie: "action", icon: "🚣",
          favoritKind: false, balancieren: false,
          kindText: "Eine wilde Schlauchbootfahrt durch die Rheinschlucht – aber nur, wenn du schon etwas grösser bist. Sonst schaust du der Ruinaulta lieber von oben zu!",
          fakten: "Schlauchbootfahrt durch die Ruinaulta («Swiss Grand Canyon») von Ilanz nach Reichenau mit Swiss River Adventures. Familienrafting ist möglich, eignet sich aber eher für etwas ältere Kinder / robuste Familien – das Mindestalter vorab beim Anbieter verbindlich prüfen. Für die 70-jährigen Grosseltern nur bei entsprechender Fitness.",
          eignungKind: { stufe: "bedingt", hinweis: "Mindestalter beim Anbieter prüfen – eher für ältere Kinder" },
          eignungGrosseltern: { stufe: "bedingt", hinweis: "nur bei guter Fitness; sonst die Rheinschlucht bei Il Spir von oben geniessen" },
          preis: null, gratis: false,
          dauer: "halber Tag", lage: "Ilanz–Reichenau (Rheinschlucht)",
          schlechtwetter: "nein",
          altersregel: "Mindestalter für das Familienrafting vorab beim Anbieter verbindlich prüfen; für ein 6,5-jähriges Kind eher zu früh.",
          offiziellUrl: "https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/rhine-gorge",
          mapsUrl: "https://www.google.com/maps/search/?api=1&query=Swiss+River+Adventures+Ilanz+Rheinschlucht"
        }
      ],

      hotels: [
        {
          id: "flims-signinahotel",
          koordinaten: { lat: 46.818932, lng: 9.264945 },
          name: "signinahotel",
          sterne: 4, lage: "mitten im rocksresort, direkt an Talstation/Luftseilbahn; Baumwipfelpfad 100 m",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 250–350/Nacht inkl. Frühstück",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Empfehlung für 2 Nächte: Familien-/Dreibettzimmer, Frühstück inklusive, signinawellness mit familientauglichem Bewegungsbecken (12,5 m, 30 °C) und «Spa Around»-Pass; kostenloser Zugang rocksresort Park inkl. Zauberteppich-Ticket und Siruppass für Kinder. Direkt am Baumwipfelpfad – kein Auto nötig.",
          offiziellUrl: "https://www.signinahotel.com/"
        },
        {
          id: "flims-rocksresort",
          koordinaten: { lat: 46.818962, lng: 9.264986 },
          name: "rocksresort",
          sterne: null, lage: "direkt an der Talstation Laax, am Baumwipfelpfad und an der Piazza",
          hallenbad: false, eignungKind: "sehr gut", preisniveau: "CHF 200–300+/Nacht (Apartment)",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Design-Apartments mit voll ausgestatteter Küche, «Families Welcome», Kinderhort, Freestyle Academy und Piazza-Action im Haus. Achtung: Der Sommer Family Deal (mit Bergbahn/Caumasee/Freestyle Academy inklusive) ist nur ab 4 bzw. 7 Nächten buchbar – für 2 Nächte ein reguläres Apartment ohne diese Inklusivleistungen buchen. Garage kostenpflichtig.",
          offiziellUrl: "https://www.rocksresort.com/"
        },
        {
          id: "flims-peaks-place",
          koordinaten: { lat: 46.816806, lng: 9.267298 },
          name: "Peaks Place Apartment & Spa",
          sterne: 4, lage: "~10 Gehminuten zur Gondel Laax; Caumasee ~2,6 km",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 200–300/Nacht (Apartment für 3)",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Zertifiziert familienfreundlich: Kinderspielzimmer «Piz Signina», Pool mit Kinderschwimmzeiten, Kindermenüs und GRATIS Aua-Grava-Hallenbad via Spa-Around-Pass. Hauseigene Sauna/Fitness erst ab 16 J. Frühstück/Endreinigung teils separat, Tiefgarage kostenpflichtig.",
          offiziellUrl: "https://www.peaks-place.com/"
        },
        {
          id: "flims-wellnesshostel3000",
          koordinaten: { lat: 46.810647, lng: 9.257742 },
          name: "wellnessHostel3000 & Aua Grava",
          sterne: null, lage: "direkt am Laaxersee, am Eingang zum Baumwipfelpfad; ~1,5 km zur Talstation",
          hallenbad: true, eignungKind: "gut", preisniveau: "ca. CHF 130–200/Nacht (Familienzimmer)",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Budget-Top-Tipp: 10 Familienzimmer mit Dusche/WC, Frühstück und Aua-Grava-Hallenbad-Eintritt (Kinderbecken, Erlebnisrutsche) inklusive. Spa/Sauna erst ab 14 J. Eigenes Parkhaus, Gratis-Ortsbus mit Gästekarte.",
          offiziellUrl: "https://www.youthhostel.ch/de/aua-grava-wellnesshostel-laax"
        },
        {
          id: "flims-adula",
          koordinaten: { lat: 46.828159, lng: 9.289827 },
          name: "Hotel Adula",
          sterne: 4, lage: "Flims Waldhaus, ~1 km zur Arena-Express-Gondel, nahe Caumasee/Il Spir",
          hallenbad: true, eignungKind: "gut", preisniveau: "CHF 250–450+",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "4★-Superior-Wellnesshotel mit Kinderspielplatz, Kinderbetreuung, Indoor-Pool (20 m) und Outdoor-Salzwasserpool (34 °C) sowie Minigolf; Spa/Sauna ab 16 J. Ruhige Lage in Flims Waldhaus, Familienzimmer verfügbar.",
          offiziellUrl: "https://www.adula.ch/"
        }
      ],
      hotelEmpfehlung: "Für kürzeste Wege und beste Kind-Tauglichkeit passt das signinahotel am besten – direkt an der Talstation und 100 m vom Baumwipfelpfad, mit Zimmer und Frühstück ideal für 2 Nächte. Wer lieber eine Apartment-Küche und Action direkt vor der Tür will, wählt ein reguläres rocksresort-Apartment (der Sommer Family Deal lohnt erst ab 4 Nächten). Budgetbewusst und mit Hallenbad inklusive ist das wellnessHostel3000 & Aua Grava top; wer Wellness und Ruhe schätzt, ist im Hotel Adula in Flims Waldhaus gut aufgehoben. Reist der Gastgeber mit, empfiehlt sich ein Apartment oder ein zweites Zimmer. Hinweis: Das Waldhaus Flims Wellness Resort ist im Sommer 2026 wegen Renovation geschlossen.",

      tagesplan: {
        schoenwetter: [
          {
            tag: 1, titel: "Ankunft & Baumwipfelpfad",
            bloecke: [
              { zeit: "Mittag", text: "Anreise (~30–35 Min. ab Landquart), Check-in, Gästekarte aktivieren und Mittagessen am Laaxersee oder im rocksresort." },
              { zeit: "Nachmittag", text: "Ortsnah und ohne Auto: Senda dil Dragun (Baumwipfelpfad mit 73-m-Rutsche) und danach die rocksresort Piazza (Slackline, Trampolin, Surfwave – gratis)." },
              { zeit: "Abend", text: "Abendessen in einem der Laaxer Restaurants, optional kurz an den Spielplatz Laaxersee." }
            ]
          },
          {
            tag: 2, titel: "Bergtag & Baden",
            bloecke: [
              { zeit: "Vormittag", text: "Mit Bahn/Shuttle in die Höhe: Alp Nagens (Murmeltiere, kurzer Segnesboden-Abschnitt) für rüstige Grosseltern – oder gemütlicher Foppa mit Spielplatz und langer Rutsche. Einkehr auf der Alp." },
              { zeit: "Nachmittag", text: "Caumasee: Baden, Floss, Spielplatz und Pedalo; Schräglift für den bequemen Zugang. Für die Grosseltern optional der ebene Spaziergang Conn–Il Spir mit Rheinschlucht-Blick." },
              { zeit: "Abend", text: "Grillen an einer der öffentlichen Feuerstellen oder Nachtessen im Dorf." }
            ]
          },
          {
            tag: 3, titel: "Vormittagsprogramm & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "Nach dem Check-out ein ortsnahes Programm: Connbächli mit Connschiffli, gemütlicher Caumasee-Rundweg oder nochmals die Baumwipfelpfad-Rutsche." },
              { zeit: "Mittag", text: "Mittagessen im rocksresort oder im Dorf." },
              { zeit: "Nachmittag", text: "Rückfahrt." }
            ]
          }
        ],
        schlechtwetter: [
          {
            tag: 1, titel: "Ankunft & Indoor-Toben",
            bloecke: [
              { zeit: "Mittag", text: "Ankunft, Check-in, Gästekarte aktivieren und Mittagessen." },
              { zeit: "Nachmittag", text: "KIDS Freestyle Academy in Flims (0–8 J.) oder – ab 6 J. – die grosse Freestyle Academy in Laax. Achtung: Freestyle Academy Mo/Di geschlossen; dann Aua Grava Hallenbad." },
              { zeit: "Abend", text: "Gemütlich im Hotel." }
            ]
          },
          {
            tag: 2, titel: "Bad, Halle & Kino",
            bloecke: [
              { zeit: "Vormittag", text: "Aua Grava Hallenbad (Erlebnisrutsche, Kinderbecken) am Laaxersee." },
              { zeit: "Nachmittag", text: "Freestyle Academy (Mi–So) oder KIDS Freestyle Academy; bei Dauerregen Kino Stenna in Flims." },
              { zeit: "Abend", text: "Nachtessen im Dorf." }
            ]
          },
          {
            tag: 3, titel: "Indoor & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "Nach dem Check-out nochmals Hallenbad oder KIDS Freestyle Academy." },
              { zeit: "Nachmittag", text: "Mittagessen, dann Abreise." }
            ]
          }
        ]
      },

      kostenueberblick: {
        warnung: "Bergbahnen sind im Sommer NICHT in der Übernachtung inklusive. Die Gästekarte (automatisch ab 1 Nacht) bringt Gratis-Ortsbus und Rabatte: 30 % auf die Freestyle Academy, 5 % auf Bergbahn-Einzelfahrten, Caumasee für Kinder gratis. Tickets vorab in der LAAX App kaufen (günstiger). Den teuren FlemXpress meiden – die Luftseilbahn Laax–Crap Sogn Gion und der Sessellift Foppa sind deutlich günstiger.",
        posten: [
          { posten: "Baumwipfelpfad Senda dil Dragun", erwachsen: "CHF 22", kind: "CHF 12", hinweis: "Holzkugel für die Kugelbahn CHF 5" },
          { posten: "Caumasee (mit Gästekarte)", erwachsen: "CHF 9", kind: "gratis (bis 16 J.)", hinweis: "ohne Gästekarte Erw. CHF 18; Schräglift gratis" },
          { posten: "Luftseilbahn Laax–Crap Sogn Gion (retour)", erwachsen: "CHF 45", kind: "CHF 22.50", hinweis: "günstige Alternative zum FlemXpress" },
          { posten: "FlemXpress Flims–Nagens Sura (retour)", erwachsen: "CHF 105", kind: "CHF 52.50", hinweis: "gilt als sehr teuer (regulär bis CHF 131.25)" },
          { posten: "Sessellift Flims–Foppa (einfach)", erwachsen: "CHF 16", kind: "ca. CHF 8", hinweis: "Zugang zum Foppa-Spielplatz" },
          { posten: "Hochseilpark Prau la Selva (Kind 7–15 J.)", erwachsen: "Familie ca. CHF 110", kind: "ca. CHF 27", hinweis: "Stand Juli 2024" },
          { posten: "Baumwipfelpfad-Rutsche · Laaxersee · Piazza · Pumptrack · Il Spir", erwachsen: "gratis/gering", kind: "gratis/gering", hinweis: "Piazza, Pumptrack und Il Spir kostenlos" },
          { posten: "Ortsbus/Postauto (Zone Fidaz/Flims/Laax/Falera)", erwachsen: "mit Gästekarte gratis", kind: "mit Gästekarte gratis", hinweis: "Auto stehen lassen" }
        ]
      },

      events: [
        { name: "Ami Sabi Sommerwunderland (betreutes Kinderprogramm 4–12 J.)", datum: "Juli–Oktober 2026", art: "programm" },
        { name: "Freestyle Academy Sommerbetrieb & 20 % Sommerrabatt (Mi–So)", datum: "bis 16. August 2026", art: "programm" },
        { name: "Voller Sommer-Bergbahnbetrieb (Talstation Flims tägl. 08:15–18:00)", datum: "4. Juni–30. August 2026", art: "kulisse" }
      ],
      eventHinweis: "Programm und Termine 2026 (Ami Sabi, Foxtrail, Veranstaltungen) sowie Live-Status der Anlagen kurz vor der Reise auf flimslaax.com bzw. in der LAAX App / live.laax.com prüfen.",

      hinweise: "Preise und Öffnungszeiten sind Stand Recherche (teils 2024/2025 bzw. Marktschätzung) und vor der Buchung auf den offiziellen Seiten zu prüfen. Bergbahnen sind im Sommer kostenpflichtig, nicht in der Übernachtung inklusive; der FlemXpress gilt als sehr teuer. Altersregeln beachten: Hochseilpark-Parcours A–D erst ab 120 cm (für das Kind nur der Kinderparcours ab 4 J.), Freestyle-Academy-Halle ab 6 J. (jünger die KIDS Freestyle Academy, 0–8 J.) und Mo/Di geschlossen, Rafting/Bogenschiessen eher für ältere Kinder. Der volle Trutg dil Flem und die ganze Nagens-Segnesboden-Runde sind für die Gruppe zu anspruchsvoll – nur leichte Teilabschnitte wählen. Das Waldhaus Flims Wellness Resort ist im Sommer 2026 wegen Renovation geschlossen."
    }
  ]
};
