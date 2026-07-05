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
      "Tag 3 · Abreise am späten Vormittag"
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
      name: "Churer Gleichgewichtsweg",
      icon: "🤸",
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
          name: "Hotel Schweizerhof Lenzerheide",
          sterne: 4, lage: "Dorfzentrum",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 250–450+",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Swiss Family Hotel: grosse Familienzimmer (auch verbundene Zimmer / «Belle Etage»), Kinderbetreuung, Familienbad + 1500 m² Wellness (grösster Hamam der Alpen).",
          offiziellUrl: "https://www.schweizerhof-lenzerheide.ch"
        },
        {
          name: "Sunstar Hotel Lenzerheide",
          sterne: 4, lage: "zentral (~200 m Zentrum), Sportbus-Halt ~50 m",
          hallenbad: true, eignungKind: "sehr gut", preisniveau: "CHF 250–400",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Pumptrack direkt vor dem Hotel, Hallenbad + Sauna, alle Zimmer mit Balkon, Frühstück & Wellness inklusive. Bonus: vergünstigte Bergbahntickets CHF 15/Tag statt CHF 48/56.",
          offiziellUrl: "https://lenzerheide.sunstar.ch/de"
        },
        {
          name: "Revier Mountain Lodge",
          sterne: 3, lage: "an Talstation Rothornbahn und am Heidsee",
          hallenbad: false, eignungKind: "gut", preisniveau: "ab ca. CHF 150–200",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Modern, Self-Check-in, Zimmer für bis zu 3 Personen. Kein Hallenbad, Frühstück extra, Parkplatz CHF 8/Nacht. Gutes Preis-Leistungs-Verhältnis.",
          offiziellUrl: "https://lenzerheide.revierhotels.com/de"
        },
        {
          name: "Valbella Resort",
          sterne: null, lage: "Valbella",
          hallenbad: false, eignungKind: "gut", preisniveau: "auf Anfrage",
          zimmerFuer3: true, zweitesZimmerMoeglich: true,
          besonderheit: "Garten mit Minigolf, Trampolin, Spielplatz und Tennisplatz – viel Bewegung direkt vor der Tür.",
          offiziellUrl: "https://www.valbellaresort.ch/de"
        },
        {
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
            tag: 3, titel: "Kurzprogramm & Abreise",
            bloecke: [
              { zeit: "Vormittag", text: "Hotelnahes Kurzprogramm: Pumptrack / Spielplatz Ochsenbühl, Minigolf oder nochmals kurz an den Heidsee." },
              { zeit: "Später Vormittag", text: "Abreise – alternativ der Churer Gleichgewichtsweg als Stopp auf der Rückfahrt." }
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
              { zeit: "Vormittag", text: "H2Lai oder Museum, dann Abreise." }
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
    { id: "davos-klosters", name: "Davos Klosters", region: "Graubünden", status: "bald" },
    { id: "flims-laax", name: "Flims Laax", region: "Graubünden", status: "bald" }
  ]
};
