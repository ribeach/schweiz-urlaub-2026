/* =============================================================================
   map.js — Interaktive Planungskarte auf der Destinationsseite.
   Datengetrieben aus window.REISE + ?id — künftige Destinationen mit
   koordinaten funktionieren ohne Markup-Umbau.

   Marker-Technologie: klassische google.maps.Marker + google.maps.InfoWindow.
   Bewusst NICHT AdvancedMarkerElement: das bräuchte eine mapId, die nur der
   User in der Cloud Console anlegen kann (DEMO_MAP_ID ist nicht produktiv).
   Klassische Marker laufen ohne mapId, erlauben kategorie-gefärbte SVG-Pins und
   funktionieren mit dem styles:-Array. «Deprecated» heisst hier nur «für
   Neuprojekte nicht empfohlen» (Google gewährt ≥ 12 Monate Vorlauf) — für die
   Lebensdauer dieser Seite akzeptiert.

   Ruhig, erwachsen, für Senioren lesbar — die verspielten Elemente der übrigen
   Seite bleiben unangetastet. Karte lädt direkt (asynchron), ohne das Rendering
   zu blockieren; robuster Fallback (statischer Regionslink) bei jedem Fehler.
   ============================================================================= */
(function () {
  "use strict";

  /* ---------- kleine Helfer (eigene Kopien — app.js-IIFE ist nicht global) ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") node.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] != null && attrs[k] !== false) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Eignungs-Ampel: Text UND Symbol, nie Farbe allein (Kopie aus app.js) */
  var AMPEL = {
    ideal:      { sym: "✓✓", wort: "Ideal" },
    gut:        { sym: "✓",  wort: "Gut geeignet" },
    bedingt:    { sym: "!",  wort: "Bedingt" },
    ungeeignet: { sym: "✕",  wort: "Ungeeignet" }
  };
  var KAT_LABEL = {
    themenweg: "Themenweg", balancieren: "Balancieren", wasser: "Wasser",
    action: "Action", bike: "Velo & Bike", spielen: "Spielen",
    schlechtwetter: "Schlechtwetter", ausflug: "Ausflug"
  };
  /* Kategorie → fixe Light-Hexwerte (Marker-Icons sind Bilder ausserhalb des
     CSS-Kontexts; Kartentiles bleiben in beiden Farbschemata hell). Legenden-
     Swatches nutzen dieselben Werte, damit Pin und Legende exakt stimmen. */
  var KAT_FARBE = {
    balancieren: "#d64524", action: "#a5321a", themenweg: "#218a4e", bike: "#17643a",
    wasser: "#0a94a3", ausflug: "#1f74d6", schlechtwetter: "#14539c", spielen: "#f2a900"
  };
  var KAT_ICON = {
    balancieren: "🤸", themenweg: "🚶", spielen: "🛝", wasser: "🏖️",
    action: "🛷", bike: "🚵", ausflug: "🚡", schlechtwetter: "🌧️"
  };
  var HOTEL_FARBE = "#1c2a30";
  var LEGENDE_ORDER = ["balancieren", "themenweg", "spielen", "wasser", "action", "bike", "ausflug", "schlechtwetter"];
  var NEUTRAL = "#46555c"; // Fallback-Farbe für unbekannte Kategorien

  /* Karten-Styles (mapId-frei, mit klassischen Markern kompatibel): POI-Rauschen
     weg, Orts-/Strassenbeschriftung bleibt in voller Stärke (Lesbarkeit). */
  var MAP_STYLES = [
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "poi.attraction", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] }
  ];

  var infoWindow = null; // geteiltes InfoWindow (in initMap gesetzt)

  /* =========================================================================
     Markerdaten sammeln + Cluster-Offset
     ========================================================================= */
  function collectMarkers(dest) {
    var list = [];
    (dest.aktivitaeten || []).forEach(function (a) {
      if (!a.koordinaten) return;
      list.push({
        typ: "aktivitaet", id: a.id, name: a.name, icon: a.icon, kategorie: a.kategorie,
        eignungKind: a.eignungKind, eignungGrosseltern: a.eignungGrosseltern,
        preis: a.preis, gratis: a.gratis,
        lat: a.koordinaten.lat, lng: a.koordinaten.lng
      });
    });
    (dest.hotels || []).forEach(function (h) {
      if (!h.koordinaten) return;
      list.push({
        typ: "hotel", id: h.id, name: h.name, sterne: h.sterne,
        lage: h.lage, preisniveau: h.preisniveau,
        lat: h.koordinaten.lat, lng: h.koordinaten.lng
      });
    });
    // meta.anreiseStopp nur anhängen, wenn Koordinaten vorhanden UND die id noch
    // nicht gesammelt wurde (Lenzerheide: churer-gleichgewichtsweg ist bereits
    // Aktivität → wird übersprungen; künftige Destinationen: eigener Marker).
    var stopp = (window.REISE.meta || {}).anreiseStopp;
    if (stopp && stopp.koordinaten) {
      var doppelt = list.some(function (m) { return m.id && stopp.id && m.id === stopp.id; });
      if (!doppelt) {
        list.push({
          typ: "aktivitaet", id: stopp.id, name: stopp.name, icon: stopp.icon,
          kategorie: stopp.kategorie, eignungKind: null, eignungGrosseltern: null,
          preis: null, gratis: true,
          lat: stopp.koordinaten.lat, lng: stopp.koordinaten.lng
        });
      }
    }
    return list;
  }

  // Überlappende Koordinaten (Heidsee, Pradaschier, Sportzentrum, Talstation
  // Rothorn) zur Laufzeit auf einem Kreis verteilen — kein Marker verdeckt einen
  // anderen. Original-Koordinaten bleiben in den Daten (für Routenlinks) unberührt.
  function applyOffsets(list) {
    var groups = {};
    list.forEach(function (m) {
      var k = m.lat.toFixed(5) + "," + m.lng.toFixed(5);
      (groups[k] = groups[k] || []).push(m);
    });
    Object.keys(groups).forEach(function (k) {
      var g = groups[k], n = g.length;
      g.forEach(function (m, i) {
        if (n === 1) { m.posLat = m.lat; m.posLng = m.lng; return; }
        var R = 0.00045, w = (2 * Math.PI * i) / n;
        m.posLat = m.lat + R * Math.cos(w);
        m.posLng = m.lng + (R * Math.sin(w)) / Math.cos(m.lat * Math.PI / 180);
      });
    });
  }

  /* =========================================================================
     SVG-Pins (als icon-Data-URI; Emoji separat als Marker-label)
     ========================================================================= */
  function activityIcon(color) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="48" viewBox="0 0 38 48">'
      + '<path d="M19 47 C12 34 3 26 3 17 A16 16 0 1 1 35 17 C35 26 26 34 19 47 Z" fill="' + color + '" stroke="#ffffff" stroke-width="1.5"/>'
      + '<circle cx="19" cy="17" r="11.5" fill="#ffffff"/></svg>';
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(38, 48),
      anchor: new google.maps.Point(19, 47),
      labelOrigin: new google.maps.Point(19, 17)
    };
  }
  function hotelIcon() {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">'
      + '<path d="M9 1 H27 A8 8 0 0 1 35 9 V27 A8 8 0 0 1 27 35 H22 L18 43 L14 35 H9 A8 8 0 0 1 1 27 V9 A8 8 0 0 1 9 1 Z" fill="' + HOTEL_FARBE + '" stroke="#ffffff" stroke-width="1.5"/>'
      + '<circle cx="18" cy="18" r="11" fill="#ffffff"/></svg>';
    return {
      url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
      scaledSize: new google.maps.Size(36, 44),
      anchor: new google.maps.Point(18, 43),
      labelOrigin: new google.maps.Point(18, 18)
    };
  }

  /* =========================================================================
     Info-Fenster-Inhalt (DOM-Knoten; fixe Light-Werte im CSS, Google-Ballon
     ist immer weiss). Planungshilfe: gross, lesbar, Touch-Ziele ≥ 44 px.
     ========================================================================= */
  function ampelZeile(who, e) {
    var a = AMPEL[e.stufe] || AMPEL.bedingt;
    return el("p", { class: "karte-iw__ampel karte-iw__ampel--" + e.stufe }, [
      el("span", { "aria-hidden": "true" }, [a.sym]), " " + who + ": " + a.wort
    ]);
  }
  function preisText(m) {
    if (m.gratis) return "Gratis";
    if (m.preis && m.preis.erwachsen) return "Erw. " + m.preis.erwachsen;
    return null;
  }
  function routeLink(m) {
    return el("a", {
      class: "karte-iw__btn", target: "_blank", rel: "noopener",
      href: "https://www.google.com/maps/dir/?api=1&destination=" + m.lat + "," + m.lng
    }, ["Route in Google Maps ↗"]);
  }
  function scrollTarget(target) {
    if (target) target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  }
  function aktContent(m) {
    var kids = [
      el("h3", { class: "karte-iw__name" }, [
        el("span", { class: "karte-iw__ic", "aria-hidden": "true" }, [m.icon || ""]), " " + m.name
      ]),
      el("p", { class: "karte-iw__kat" }, [KAT_LABEL[m.kategorie] || m.kategorie])
    ];
    if (m.eignungKind) kids.push(ampelZeile("🧒 Kind", m.eignungKind));
    if (m.eignungGrosseltern) kids.push(ampelZeile("👵👴 Grosseltern", m.eignungGrosseltern));
    var preis = preisText(m);
    if (preis) kids.push(el("p", { class: "karte-iw__preis" }, [preis]));

    var btn = el("button", { type: "button", class: "karte-iw__btn" }, ["Zur Aktivität ↓"]);
    btn.addEventListener("click", function () {
      if (infoWindow) infoWindow.close();
      var t = document.querySelector('#galerie-grid [data-akt-id="' + m.id + '"]');
      if (!t) t = document.querySelector('[data-akt-id="' + m.id + '"]');
      if (!t || t.offsetParent === null) t = document.getElementById("galerie");
      scrollTarget(t);
    });
    kids.push(el("div", { class: "karte-iw__links" }, [btn, routeLink(m)]));
    return el("div", { class: "karte-iw" }, kids);
  }
  function hotelContent(m) {
    var kids = [
      el("h3", { class: "karte-iw__name" }, [
        el("span", { class: "karte-iw__ic", "aria-hidden": "true" }, ["🏨"]), " " + m.name
      ]),
      el("p", { class: "karte-iw__kat" }, ["Hotel"])
    ];
    var info = [];
    if (m.sterne) { var s = ""; for (var i = 0; i < m.sterne; i++) s += "★"; info.push(s); }
    if (m.preisniveau) info.push(m.preisniveau);
    if (info.length) kids.push(el("p", { class: "karte-iw__fakt" }, [info.join(" · ")]));
    if (m.lage) kids.push(el("p", { class: "karte-iw__fakt" }, ["📍 " + m.lage]));

    var btn = el("button", { type: "button", class: "karte-iw__btn" }, ["Zum Hotelvergleich ↓"]);
    btn.addEventListener("click", function () {
      if (infoWindow) infoWindow.close();
      scrollTarget(document.getElementById("hotels"));
    });
    kids.push(el("div", { class: "karte-iw__links" }, [btn, routeLink(m)]));
    return el("div", { class: "karte-iw" }, kids);
  }

  /* =========================================================================
     Legende (rein DOM/CSS — funktioniert auch ohne Kartentiles)
     ========================================================================= */
  function legendItem(color, icon, label, hotel) {
    return el("li", { class: "karte-legende__item" }, [
      el("span", { class: "karte-legende__swatch" + (hotel ? " karte-legende__swatch--hotel" : ""), style: "background:" + color }),
      el("span", { class: "karte-legende__icon", "aria-hidden": "true" }, [icon]),
      " " + label
    ]);
  }
  function buildLegend(markers) {
    var ul = document.getElementById("karte-legende");
    if (!ul) return;
    ul.innerHTML = "";
    var present = {};
    markers.forEach(function (m) { if (m.typ === "aktivitaet") present[m.kategorie] = true; });
    LEGENDE_ORDER.forEach(function (kat) {
      if (present[kat]) ul.appendChild(legendItem(KAT_FARBE[kat] || NEUTRAL, KAT_ICON[kat] || "📍", KAT_LABEL[kat] || kat, false));
    });
    if (markers.some(function (m) { return m.typ === "hotel"; })) {
      ul.appendChild(legendItem(HOTEL_FARBE, "🏨", "Hotels", true));
    }
    ul.hidden = false;
  }

  /* =========================================================================
     Zustände: Laden (Fallback aus) / Fehler (Fallback ein)
     ========================================================================= */
  function enterLoadingState(dest) {
    var link = document.getElementById("karte-fallback-link");
    if (link) link.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(dest.name);
    var fb = document.getElementById("karte-fallback");
    if (fb) fb.hidden = true;
  }
  function enterErrorState() {
    var mapEl = document.getElementById("karte-map");
    if (mapEl) { mapEl.innerHTML = ""; mapEl.hidden = true; }
    var fb = document.getElementById("karte-fallback");
    if (fb) fb.hidden = false;
    var lg = document.getElementById("karte-legende");
    if (lg) lg.hidden = true;
  }

  /* =========================================================================
     Google-Maps-Bootstrap (offizieller Inline-Loader) + asynchrone Init
     ========================================================================= */
  function bootstrapMaps(key) {
    ((g) => { var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {}); var d = b.maps || (b.maps = {}), r = new Set(), e = new URLSearchParams(), u = () => h || (h = new Promise(async (f, n) => { await (a = m.createElement("script")); e.set("libraries", [...r] + ""); for (k in g) e.set(k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q); a.src = `https://maps.${c}apis.com/maps/api/js?` + e; d[q] = f; a.onerror = () => h = n(Error(p + " could not load.")); a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a); })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)); })({
      key: key, v: "weekly", language: "de", region: "CH"
    });
  }

  async function initMap(dest, markers, key) {
    // EIN try/catch um den GESAMTEN Ablauf (Bootstrap, Import, Konstruktion,
    // Marker, fitBounds): jeder Fehler führt zum Fallback statt zu einer stillen
    // Blank-Karte oder einer unhandled rejection (boot() ruft ohne await auf).
    try {
      bootstrapMaps(key);
      var libs = Promise.all([
        google.maps.importLibrary("maps"),
        google.maps.importLibrary("marker")
      ]);
      var timeout = new Promise(function (_, rej) { setTimeout(function () { rej(new Error("timeout")); }, 8000); });
      var loaded = await Promise.race([libs, timeout]);

      var Map = loaded[0].Map, InfoWindow = loaded[0].InfoWindow, Marker = loaded[1].Marker;
      var mapEl = document.getElementById("karte-map");
      if (!mapEl) return;

      var map = new Map(mapEl, {
        gestureHandling: "cooperative",
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        fullscreenControl: true,
        clickableIcons: false,
        maxZoom: 15,
        styles: MAP_STYLES
      });
      infoWindow = new InfoWindow({ maxWidth: 300 });

      var bounds = new google.maps.LatLngBounds();
      markers.forEach(function (m) {
        var marker = new Marker({
          position: { lat: m.posLat, lng: m.posLng },
          map: map,
          title: m.name,
          icon: m.typ === "hotel" ? hotelIcon() : activityIcon(KAT_FARBE[m.kategorie] || NEUTRAL),
          label: m.typ === "hotel"
            ? { text: "🏨", fontSize: "14px" }
            : { text: m.icon || "", fontSize: "15px" }
        });
        marker.addListener("click", function () {
          infoWindow.setOptions({ ariaLabel: m.name });
          infoWindow.setContent(m.typ === "hotel" ? hotelContent(m) : aktContent(m));
          infoWindow.open({ anchor: marker, map: map });
        });
        bounds.extend({ lat: m.posLat, lng: m.posLng });
      });

      map.fitBounds(bounds, 48);
      // Watchdog: Die Maps-JS lädt zwar, die Karte rendert aber nie (z. B. bei
      // Quota-/Throttle-Fehlern, die weder gm_authFailure noch das importLibrary-
      // Timeout auslösen) -> nach 10 s statt eines leeren Rahmens den Fallback
      // zeigen. Das erste "idle"-Event bestätigt das Rendern und entschärft ihn.
      var rendered = false;
      var watchdog = setTimeout(function () { if (!rendered) enterErrorState(); }, 10000);
      google.maps.event.addListenerOnce(map, "idle", function () {
        rendered = true;
        clearTimeout(watchdog);
        map.setOptions({ maxZoom: null }); // Deckel nur für den ersten Ausschnitt
      });
    } catch (err) {
      enterErrorState();
    }
  }

  /* =========================================================================
     Boot: Guard-Kette (jeweils stilles return, kein Fehler)
     ========================================================================= */
  function boot() {
    if (!window.REISE) return;                                            // 1
    if (document.body.getAttribute("data-page") !== "destination") return; // 2
    if (!document.getElementById("karte-map")) return;                     // 3

    var id = param("id");
    var dest = (window.REISE.destinationen || []).filter(function (d) {
      return d.id === id && d.status === "bereit";
    })[0];
    if (!dest) return;                                                      // 4

    var markers = collectMarkers(dest);                                    // 5
    if (!markers.length) {
      var section = document.getElementById("karte");
      if (section) section.hidden = true;
      return;
    }
    applyOffsets(markers);

    var key = window.CONFIG && window.CONFIG.GOOGLE_MAPS_API_KEY;
    if (!key) return;                                                      // 6: Fallback bleibt sichtbar

    buildLegend(markers);
    enterLoadingState(dest);
    window.gm_authFailure = function () { enterErrorState(); };
    initMap(dest, markers, key).catch(function () { enterErrorState(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
