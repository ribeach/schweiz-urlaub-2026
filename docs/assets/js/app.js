/* =============================================================================
   app.js — Render-, Filter-, Stempel- und Countdown-Logik. Vanilla JS.
   Progressive Enhancement: Die Seiten sind ohne JS vollständig lesbar
   (Basisinhalte stehen serverseitig im HTML bzw. werden hier ergänzt).
   Countdown, Stempel, Filter und Wetter-Umschalter sind Zugaben.
   ============================================================================= */
(function () {
  "use strict";

  var DATA = window.REISE;
  if (!DATA) return;

  document.documentElement.classList.add("has-js");

  /* ---------- kleine Helfer ---------- */
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
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML; }
  function extLink(href, text, cls) {
    return el("a", { href: href, target: "_blank", rel: "noopener", class: cls || "" }, [text]);
  }
  function param(name) {
    return new URLSearchParams(location.search).get(name);
  }

  /* Eignungs-Ampel: Text UND Symbol, nie Farbe allein */
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

  /* =========================================================================
     STEMPEL (localStorage) — pro Aktivität, destinationsübergreifend gezählt
     ========================================================================= */
  var STORE_KEY = "bergabenteuer.stempel.v1";
  function loadStamps() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveStamps(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  var stamps = loadStamps();
  function isStamped(id) { return !!stamps[id]; }
  function toggleStamp(id) {
    if (stamps[id]) delete stamps[id]; else stamps[id] = true;
    saveStamps(stamps);
    return !!stamps[id];
  }

  /* =========================================================================
     COUNTDOWN  (meta.start === null -> "Bald geht's los!")
     ========================================================================= */
  function renderCountdown(host) {
    var m = DATA.meta;
    host.innerHTML = "";
    if (!m.start) {
      host.className = "countdown countdown--soon";
      host.appendChild(el("div", { class: "countdown__emoji", "aria-hidden": "true" }, ["🎒⛰️"]));
      host.appendChild(el("p", { class: "countdown__label" }, ["Bald geht's los!"]));
      host.appendChild(el("p", { class: "countdown__hint" }, [
        "Sobald das Datum feststeht, zählen wir gemeinsam die Nächte bis zum Bergabenteuer."
      ]));
      return;
    }
    // Nächte bis zum Reisestart (kein Stunden/Minuten-Ticker)
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var start = new Date(m.start + "T00:00:00");
    var nights = Math.round((start - today) / 86400000);
    host.className = "countdown";
    if (nights > 0) {
      host.appendChild(el("div", { class: "countdown__num", "aria-hidden": "true" }, [String(nights)]));
      host.appendChild(el("p", { class: "countdown__label" }, [
        "Noch " + nights + " Mal schlafen"
      ]));
      host.appendChild(el("p", { class: "countdown__hint" }, ["bis zum Bergabenteuer!"]));
    } else if (nights === 0) {
      host.appendChild(el("div", { class: "countdown__emoji", "aria-hidden": "true" }, ["🎉"]));
      host.appendChild(el("p", { class: "countdown__label" }, ["Heute geht's los!"]));
    } else {
      host.appendChild(el("div", { class: "countdown__emoji", "aria-hidden": "true" }, ["💛"]));
      host.appendChild(el("p", { class: "countdown__label" }, ["Schön war's!"]));
      host.appendChild(el("p", { class: "countdown__hint" }, ["Unser Bergabenteuer ist vorbei – bis zum nächsten Mal."]));
    }
  }

  /* =========================================================================
     STARTSEITE
     ========================================================================= */
  function initIndex() {
    var m = DATA.meta;

    // Countdown
    var cd = $("#countdown"); if (cd) renderCountdown(cd);

    // Reise-Steckbrief Chips
    var chips = $("#reise-chips");
    if (chips) {
      var kind = (m.gruppe || []).filter(function (g) { return g.rolle === "kind"; })[0];
      var facts = [
        ["📅", m.reisezeit],
        ["🌙", m.naechte + " Übernachtungen"],
        ["🚗", "Anreise Auto ca. 3 Std. über Chur"],
        ["🏡", "Gastgeber in " + m.gastgeberOrt],
        ["🧒", "Kind " + (kind ? kind.alter : "") + " J."],
        ["👵👴", "Grosseltern 70 J."]
      ];
      facts.forEach(function (f) {
        chips.appendChild(el("span", { class: "chip-info" }, [
          el("span", { class: "ic", "aria-hidden": "true" }, [f[0]]), f[1]
        ]));
      });
    }

    // Destinationskarten
    var grid = $("#dest-grid");
    if (grid) {
      DATA.destinationen.forEach(function (d) {
        grid.appendChild(d.status === "bereit" ? destCardReady(d) : destCardSoon(d));
      });
    }

    // Anreise-Block
    var an = $("#anreise-inner");
    if (an && m.anreiseStopp) {
      var s = m.anreiseStopp;
      an.appendChild(el("div", { class: "anreise__route" }, [
        el("span", { "aria-hidden": "true" }, ["🚗"]), m.anreiseRoute
      ]));
      an.appendChild(el("div", { class: "anreise__stopp" }, [
        el("span", { class: "tip-flag" }, ["Zwischenstopp-Tipp"]),
        el("h3", null, [el("span", { "aria-hidden": "true" }, [s.icon]), s.name]),
        el("p", null, [s.text]),
        el("p", { class: "fineprint" }, ["📍 " + s.lage]),
        el("div", { class: "linkrow" }, [
          extLink(s.mapsUrl, "In Google Maps öffnen ↗", "btn btn--ghost btn--sm"),
          extLink(s.offiziellUrl, "Mehr Infos ↗", "btn btn--ghost btn--sm")
        ])
      ]));
    }
  }

  function destCardReady(d) {
    return el("article", { class: "card dest" }, [
      el("div", { class: "dest__banner" }, [
        el("span", { class: "badge" }, ["✓ recherchiert"]),
        el("div", { class: "dest__emoji", "aria-hidden": "true" }, [d.emoji || "🏔️"]),
        el("h3", { class: "dest__name" }, [d.name]),
        el("span", { class: "dest__region" }, [d.region])
      ]),
      el("div", { class: "dest__body" }, [
        el("p", null, [d.kurzbeschreibung]),
        el("div", { class: "dest__hl", "aria-hidden": "true" }, (d.highlights || []).map(function (h) {
          return el("span", null, [h]);
        })),
        el("div", { class: "dest__footer" }, [
          el("a", { class: "btn btn--primary", href: "destination.html?id=" + encodeURIComponent(d.id) },
            ["Ansehen ⛰️"])
        ])
      ])
    ]);
  }

  function destCardSoon(d) {
    return el("article", { class: "card dest dest--soon" }, [
      el("div", { class: "q", "aria-hidden": "true" }, ["?"]),
      el("h3", { class: "dest__name" }, [d.name || "Bald mehr!"]),
      el("p", null, [d.region ? d.region + " · in Planung" : "Weitere Reiseziele folgen."]),
      el("span", { class: "chip-info" }, [el("span", { class: "ic", "aria-hidden": "true" }, ["🧭"]), "Bald mehr!"])
    ]);
  }

  /* =========================================================================
     DESTINATIONSSEITE
     ========================================================================= */
  function initDestination() {
    var id = param("id");
    var dest = (DATA.destinationen || []).filter(function (d) { return d.id === id && d.status === "bereit"; })[0];

    // Unbekannte/fehlende id -> sauber zur Startseite
    if (!dest) {
      var t = $("#dest-title"); if (t) t.textContent = "Ziel nicht gefunden";
      var sb = $("#dest-sub"); if (sb) sb.textContent = "Zurück zur Übersicht";
      var nav = document.querySelector(".subnav"); if (nav) nav.style.display = "none";
      var main = $("#dest-main");
      if (main) {
        main.innerHTML = "";
        main.appendChild(el("div", { class: "wrap section" }, [
          el("h1", null, ["Reiseziel nicht gefunden"]),
          el("p", null, ["Dieses Reiseziel gibt es (noch) nicht. Zurück zur Übersicht:"]),
          el("a", { class: "btn btn--primary", href: "index.html" }, ["← Zur Startseite"])
        ]));
      }
      document.title = "Nicht gefunden · Unser Bergabenteuer";
      return;
    }

    document.title = dest.name + " · Unser Bergabenteuer 2026";
    var titleEl = $("#dest-title"); if (titleEl) titleEl.textContent = dest.name;
    var subEl = $("#dest-sub"); if (subEl) subEl.textContent = dest.region + " · Anfahrt von " + DATA.meta.gastgeberOrt + " " + dest.anfahrtVonLandquart;

    renderSteckbrief(dest);
    renderBalancieren(dest);
    renderGalerie(dest);
    renderTagesplan(dest);
    renderHotels(dest);
    renderKosten(dest);
    renderEvents(dest);
    renderHinweise(dest);
    initSubnavHighlight();
  }

  /* --- Steckbrief + Kostenwarnung --- */
  function renderSteckbrief(d) {
    var host = $("#steckbrief-body"); if (!host) return;
    host.appendChild(el("p", { class: "lead" }, [d.warumPasst]));
    host.appendChild(el("div", { class: "facts" }, [
      chipInfo("📍", d.region),
      chipInfo("🚗", "ab " + DATA.meta.gastgeberOrt + ": " + d.anfahrtVonLandquart),
      chipInfo("🌙", DATA.meta.naechte + " Übernachtungen"),
      chipInfo("📅", DATA.meta.reisezeit)
    ]));
    host.appendChild(el("div", { class: "warnbox warnbox--danger" }, [
      el("h3", null, [el("span", { "aria-hidden": "true" }, ["⚠️"]), "Wichtig: Bergbahnen kosten extra"]),
      el("p", null, [d.kostenhinweis])
    ]));
  }
  function chipInfo(ic, text) {
    return el("span", { class: "chip-info" }, [el("span", { class: "ic", "aria-hidden": "true" }, [ic]), text]);
  }

  /* --- Schwerpunkt Balancieren --- */
  function renderBalancieren(d) {
    var host = $("#balancieren-grid"); if (!host) return;
    var items = d.aktivitaeten.filter(function (a) { return a.balancieren; });
    items.forEach(function (a) { host.appendChild(aktCard(a)); });
    refreshProgress();
  }

  /* --- Abenteuer-Galerie + Filter --- */
  var galerieState = { dest: null, filters: {} };
  function renderGalerie(d) {
    galerieState.dest = d;
    var host = $("#galerie-grid"); if (!host) return;

    // Filterchips aufbauen
    buildFilterBar(d);

    // Karten rendern (alle), Sichtbarkeit steuert der Filter
    host.innerHTML = "";
    d.aktivitaeten.forEach(function (a) {
      var card = aktCard(a);
      card.setAttribute("data-akt", a.id);
      host.appendChild(card);
    });
    applyFilters();
    refreshProgress();
  }

  function buildFilterBar(d) {
    var bar = $("#filterbar"); if (!bar) return;
    bar.innerHTML = "";

    // Zeile 1: Eignung/Eigenschaften
    var propRow = el("div", { class: "filterbar__row" }, [
      el("span", { class: "filterbar__legend" }, ["Passt für:"])
    ]);
    [
      ["kind", "🧒 Fürs Kind ideal"],
      ["senioren", "👵👴 Für Grosseltern bequem"],
      ["gratis", "🆓 Gratis"],
      ["schlecht", "🌧️ Schlechtwetter-tauglich"]
    ].forEach(function (f) { propRow.appendChild(makeChip("prop", f[0], f[1])); });
    bar.appendChild(propRow);

    // Zeile 2: Kategorien (nur vorhandene)
    var cats = [];
    d.aktivitaeten.forEach(function (a) { if (cats.indexOf(a.kategorie) < 0) cats.push(a.kategorie); });
    var catRow = el("div", { class: "filterbar__row" }, [
      el("span", { class: "filterbar__legend" }, ["Art:"])
    ]);
    cats.forEach(function (c) { catRow.appendChild(makeChip("cat", c, KAT_LABEL[c] || c)); });
    bar.appendChild(catRow);

    // Zeile 3: Reset + Zähler
    var resetRow = el("div", { class: "filterbar__row" }, [
      el("button", {
        class: "chip chip--reset", type: "button", "aria-pressed": "false",
        onclick: resetFilters
      }, [el("span", { "aria-hidden": "true" }, ["↺"]), "Alle zeigen"]),
      el("span", { class: "filter-count", id: "filter-count" }, [""])
    ]);
    bar.appendChild(resetRow);
  }

  function makeChip(group, key, label) {
    var id = group + ":" + key;
    return el("button", {
      class: "chip", type: "button", "aria-pressed": "false", "data-filter": id,
      onclick: function () {
        var pressed = this.getAttribute("aria-pressed") === "true";
        this.setAttribute("aria-pressed", pressed ? "false" : "true");
        if (pressed) delete galerieState.filters[id]; else galerieState.filters[id] = true;
        applyFilters();
      }
    }, [el("span", { class: "chip__check", "aria-hidden": "true" }, ["✓"]), label]);
  }

  function resetFilters() {
    galerieState.filters = {};
    Array.prototype.forEach.call(document.querySelectorAll("#filterbar .chip[data-filter]"), function (c) {
      c.setAttribute("aria-pressed", "false");
    });
    applyFilters();
  }

  function matchesFilters(a) {
    var f = galerieState.filters;
    var keys = Object.keys(f);
    if (!keys.length) return true;

    // Props (UND-Verknüpfung), Kategorien (ODER innerhalb der Gruppe)
    var props = keys.filter(function (k) { return k.indexOf("prop:") === 0; }).map(function (k) { return k.split(":")[1]; });
    var cats = keys.filter(function (k) { return k.indexOf("cat:") === 0; }).map(function (k) { return k.split(":")[1]; });

    for (var i = 0; i < props.length; i++) {
      var p = props[i];
      if (p === "kind" && a.eignungKind.stufe !== "ideal") return false;
      if (p === "senioren" && !(a.eignungGrosseltern.stufe === "ideal" || a.eignungGrosseltern.stufe === "gut")) return false;
      if (p === "gratis" && !a.gratis) return false;
      if (p === "schlecht" && !(a.schlechtwetter === "ja" || a.schlechtwetter === "bedingt")) return false;
    }
    if (cats.length && cats.indexOf(a.kategorie) < 0) return false;
    return true;
  }

  function applyFilters() {
    var host = $("#galerie-grid"); if (!host) return;
    var visible = 0, total = galerieState.dest.aktivitaeten.length;
    galerieState.dest.aktivitaeten.forEach(function (a) {
      var card = host.querySelector('[data-akt="' + a.id + '"]');
      if (!card) return;
      var ok = matchesFilters(a);
      card.style.display = ok ? "" : "none";
      if (ok) visible++;
    });
    var cnt = $("#filter-count");
    if (cnt) {
      var active = Object.keys(galerieState.filters).length;
      cnt.textContent = active ? (visible + " von " + total + " Abenteuern") : (total + " Abenteuer");
    }
    var empty = $("#galerie-empty");
    if (empty) empty.style.display = visible === 0 ? "" : "none";
  }

  /* --- Aktivitätskarte --- */
  function aktCard(a) {
    var card = el("article", { class: "card akt" });
    card.setAttribute("data-stamped", isStamped(a.id) ? "true" : "false");

    // Kopf
    var titleRow = el("h3", { class: "akt__name" }, [a.name]);
    if (a.favoritKind) titleRow.appendChild(el("span", { class: "akt__star", title: "Trifft ein Interesse des Kindes" }, ["⭐"]));
    var meta = el("div", { class: "akt__meta" }, [
      el("span", { class: "cat" }, [KAT_LABEL[a.kategorie] || a.kategorie]),
      a.gratis ? el("span", { class: "cat gratis-tag" }, ["🆓 Gratis"]) : null,
      el("span", null, ["🕒 " + a.dauer]),
      el("span", null, ["📍 " + a.lage])
    ]);
    card.appendChild(el("div", { class: "akt__head" }, [
      el("div", { class: "akt__icon", "aria-hidden": "true" }, [a.icon]),
      el("div", { class: "akt__titlewrap" }, [titleRow, meta])
    ]));

    // Vorlese-Text fürs Kind (gross, verspielt)
    card.appendChild(el("p", { class: "akt__kind" }, [a.kindText]));

    // Body
    var body = el("div", { class: "akt__body" });

    // Altersregel-Warnung (prominent, direkt auf der Karte)
    if (a.altersregel) {
      body.appendChild(el("div", { class: "altersregel", role: "note" }, [
        el("span", { class: "ic", "aria-hidden": "true" }, ["🔔"]),
        el("span", null, [el("b", null, ["Altersregel: "]), a.altersregel])
      ]));
    }

    // Eignungs-Ampeln (Text + Symbol)
    body.appendChild(el("div", { class: "ampeln" }, [
      ampel("🧒 Kind", a.eignungKind),
      ampel("👵👴 Grosseltern", a.eignungGrosseltern)
    ]));

    // Details "Für die Erwachsenen"
    body.appendChild(faktenDetails(a));

    // Stempel-Button (progressive enhancement)
    var btn = el("button", {
      class: "stamp-btn js-only", type: "button",
      "aria-pressed": isStamped(a.id) ? "true" : "false"
    });
    setStampLabel(btn, isStamped(a.id));
    btn.addEventListener("click", function () {
      var now = toggleStamp(a.id);
      btn.setAttribute("aria-pressed", now ? "true" : "false");
      setStampLabel(btn, now);
      // Alle Karten mit gleicher id (Schwerpunkt + Galerie) synchron halten
      Array.prototype.forEach.call(document.querySelectorAll('[data-akt="' + a.id + '"], .akt'), function () {});
      syncStampCards(a.id, now);
      refreshProgress();
    });
    body.appendChild(btn);

    card.appendChild(body);
    card.setAttribute("data-akt-id", a.id);
    return card;
  }

  function setStampLabel(btn, stamped) {
    btn.innerHTML = "";
    btn.appendChild(el("span", { class: "stamp-btn__stamp", "aria-hidden": "true" }, [stamped ? "✅" : "🎯"]));
    btn.appendChild(document.createTextNode(stamped ? "Gesammelt!" : "Ich will da hin!"));
  }

  // Karten mit derselben Aktivitäts-id synchronisieren (Schwerpunkt + Galerie)
  function syncStampCards(id, stamped) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-akt-id="' + id + '"]'), function (card) {
      card.setAttribute("data-stamped", stamped ? "true" : "false");
      var b = card.querySelector(".stamp-btn");
      if (b) { b.setAttribute("aria-pressed", stamped ? "true" : "false"); setStampLabel(b, stamped); }
    });
  }

  function ampel(who, e) {
    var a = AMPEL[e.stufe] || AMPEL.bedingt;
    return el("div", { class: "ampel ampel--" + e.stufe }, [
      el("span", { class: "ampel__sym", "aria-hidden": "true" }, [a.sym]),
      el("span", null, [
        el("span", { class: "ampel__who" }, [who + ": "]),
        el("span", null, [a.wort]),
        e.hinweis ? el("span", { class: "ampel__hint" }, [e.hinweis]) : null
      ])
    ]);
  }

  function faktenDetails(a) {
    var det = el("details", { class: "details" });
    det.appendChild(el("summary", null, [
      el("span", { "aria-hidden": "true" }, ["📋"]), "Für die Erwachsenen"
    ]));
    var kv = el("dl", { class: "kv" });
    function row(dt, dd, cls) { kv.appendChild(el("dt", null, [dt])); kv.appendChild(el("dd", { class: cls || "" }, dd)); }

    if (a.preis) {
      var priceNode = el("span", { class: "price" }, [
        el("b", null, ["Erw. " + a.preis.erwachsen]),
        document.createTextNode(" · Kind " + a.preis.kind)
      ]);
      row("Preis", [priceNode], "price");
      if (a.preis.hinweis) row("Hinweis", [a.preis.hinweis]);
    } else if (a.gratis) {
      row("Preis", [el("b", null, ["Gratis"])], "price");
    }
    row("Öffnung", [wetterText(a.schlechtwetter)]);
    row("Dauer", [a.dauer]);
    row("Lage", [a.lage]);

    var inner = el("div", { class: "details__inner" }, [
      el("p", null, [a.fakten]),
      kv,
      el("div", { class: "linkrow" }, [
        a.offiziellUrl ? extLink(a.offiziellUrl, "Offizielle Seite ↗", "btn btn--ghost btn--sm") : null,
        a.mapsUrl ? extLink(a.mapsUrl, "Karte ↗", "btn btn--ghost btn--sm") : null
      ])
    ]);
    det.appendChild(inner);
    return det;
  }
  function wetterText(w) {
    if (w === "ja") return "auch bei Regen (Schlechtwetter-tauglich)";
    if (w === "bedingt") return "auch bei leichtem Regen möglich";
    return "am besten bei schönem Wetter";
  }

  /* --- Fortschrittsanzeige "X von Y Abenteuern" --- */
  function refreshProgress() {
    var host = $("#progress"); if (!host) return;
    var d = galerieState.dest || (DATA.destinationen.filter(function (x) { return x.status === "bereit"; })[0]);
    if (!d) return;
    var total = d.aktivitaeten.length;
    var got = d.aktivitaeten.filter(function (a) { return isStamped(a.id); }).length;
    var pct = total ? Math.round((got / total) * 100) : 0;
    host.innerHTML = "";
    host.appendChild(el("p", { class: "progress__text" }, [
      el("span", { "aria-hidden": "true" }, ["🏅 "]),
      el("b", null, [got + " von " + total]), " Abenteuern gesammelt!"
    ]));
    host.appendChild(el("div", {
      class: "progress__bar", role: "progressbar",
      "aria-valuenow": got, "aria-valuemin": 0, "aria-valuemax": total,
      "aria-label": got + " von " + total + " Abenteuern gesammelt"
    }, [el("div", { class: "progress__fill", style: "width:" + pct + "%" })]));
  }

  /* --- Tagesplan + Wetter-Umschalter + Drucken --- */
  function renderTagesplan(d) {
    var host = $("#days"); if (!host) return;
    var current = "schoenwetter";

    function draw(mode) {
      current = mode;
      host.innerHTML = "";
      (d.tagesplan[mode] || []).forEach(function (tag) {
        host.appendChild(el("div", { class: "day" }, [
          el("div", { class: "day__head" }, [
            el("div", { class: "day__tag" }, ["Tag " + tag.tag]),
            el("div", { class: "day__titel" }, [tag.titel])
          ]),
          el("div", { class: "day__blocks" }, tag.bloecke.map(function (b) {
            return el("div", { class: "block" }, [
              el("div", { class: "block__zeit" }, [b.zeit]),
              el("p", { class: "block__text" }, [b.text])
            ]);
          }))
        ]));
      });
    }

    // Umschalter
    var toggle = $("#wetter-toggle");
    if (toggle) {
      toggle.innerHTML = "";
      [["schoenwetter", "☀️ Schönwetter"], ["schlechtwetter", "🌧️ Schlechtwetter"]].forEach(function (t) {
        var b = el("button", {
          type: "button", "aria-pressed": t[0] === current ? "true" : "false",
          onclick: function () {
            draw(t[0]);
            Array.prototype.forEach.call(toggle.children, function (c) { c.setAttribute("aria-pressed", "false"); });
            b.setAttribute("aria-pressed", "true");
          }
        }, [t[1]]);
        toggle.appendChild(b);
      });
    }
    var printBtn = $("#print-btn");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    draw("schoenwetter");
  }

  /* --- Hotels + Empfehlung --- */
  function renderHotels(d) {
    var host = $("#hotels-grid"); if (!host) return;
    (d.hotels || []).forEach(function (h) {
      host.appendChild(el("article", { class: "card hotel" }, [
        el("div", { class: "hotel__top" }, [
          el("h3", { class: "hotel__name" }, [h.name]),
          h.sterne ? el("span", { class: "hotel__stars", "aria-label": h.sterne + " Sterne" }, [stars(h.sterne)]) : null
        ]),
        el("p", { class: "fineprint", style: "margin:0" }, ["📍 " + h.lage]),
        el("div", { class: "hotel__tags" }, [
          el("span", { class: "htag " + (h.hallenbad ? "htag--yes" : "htag--no") }, [(h.hallenbad ? "✓" : "✕") + " Hallenbad"]),
          el("span", { class: "htag" }, ["🧒 Kind: " + h.eignungKind]),
          h.zimmerFuer3 ? el("span", { class: "htag" }, ["Zimmer für 3"]) : null,
          h.zweitesZimmerMoeglich ? el("span", { class: "htag" }, ["2. Zimmer möglich"]) : null
        ]),
        el("p", { style: "margin:0" }, [h.besonderheit]),
        el("p", { class: "hotel__price" }, ["💰 " + h.preisniveau]),
        el("div", { class: "linkrow" }, [extLink(h.offiziellUrl, "Zur Hotel-Seite ↗", "btn btn--ghost btn--sm")])
      ]));
    });
    var emp = $("#hotel-empfehlung");
    if (emp && d.hotelEmpfehlung) {
      emp.appendChild(el("h3", null, [el("span", { "aria-hidden": "true" }, ["🧭"]), "Welches Hotel passt?"]));
      emp.appendChild(el("p", { style: "margin:0" }, [d.hotelEmpfehlung]));
    }
  }
  function stars(n) { var s = ""; for (var i = 0; i < n; i++) s += "★"; return s; }

  /* --- Kosten --- */
  function renderKosten(d) {
    var host = $("#kosten-body"); if (!host || !d.kostenueberblick) return;
    host.appendChild(el("div", { class: "warnbox" }, [
      el("h3", null, [el("span", { "aria-hidden": "true" }, ["💡"]), "Spar-Tipps"]),
      el("p", null, [d.kostenueberblick.warnung])
    ]));
    var tbody = el("tbody");
    d.kostenueberblick.posten.forEach(function (p) {
      tbody.appendChild(el("tr", null, [
        el("th", { scope: "row" }, [p.posten, p.hinweis ? el("div", { class: "hint" }, [p.hinweis]) : null]),
        el("td", { class: "num" }, [p.erwachsen]),
        el("td", { class: "num" }, [p.kind])
      ]));
    });
    host.appendChild(el("div", { class: "table-wrap" }, [
      el("table", { class: "kosten" }, [
        el("caption", null, ["Beispiel-Kosten (Stand Recherche, pro Person, vor Buchung prüfen)"]),
        el("thead", null, [el("tr", null, [
          el("th", { scope: "col" }, ["Posten"]),
          el("th", { scope: "col" }, ["Erwachsen"]),
          el("th", { scope: "col" }, ["Kind"])
        ])]),
        tbody
      ])
    ]));
  }

  /* --- Events --- */
  function renderEvents(d) {
    var host = $("#events-list"); if (!host) return;
    (d.events || []).forEach(function (ev) {
      host.appendChild(el("div", { class: "event" }, [
        el("span", { class: "event__date" }, [ev.datum]),
        el("span", { class: "event__name" }, [ev.name]),
        el("span", { class: "art art--" + ev.art }, [ev.art === "programm" ? "Programm" : "Kulisse"])
      ]));
    });
    var hint = $("#events-hint");
    if (hint && d.eventHinweis) hint.textContent = d.eventHinweis;
  }

  /* --- Hinweise --- */
  function renderHinweise(d) {
    var host = $("#hinweise-text");
    if (host && d.hinweise) host.textContent = d.hinweise;
  }

  /* --- Sprungnav: aktiven Abschnitt markieren --- */
  function initSubnavHighlight() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".subnav a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute("href").slice(1)] = l; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var link = map[e.target.id];
        if (link && e.isIntersecting) {
          links.forEach(function (l) { l.style.borderColor = ""; l.style.background = ""; });
          link.style.borderColor = "var(--tuerkis)";
          link.style.background = "var(--surface)";
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) obs.observe(s); });
  }

  /* ---------- Bootstrap ---------- */
  function boot() {
    var page = document.body.getAttribute("data-page");
    if (page === "index") initIndex();
    else if (page === "destination") initDestination();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
