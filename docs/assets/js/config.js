// Google Maps JavaScript API Key — per HTTP-Referrer auf ribeach.github.io beschränkt
// und nur für die Maps JavaScript API freigeschaltet. Deshalb ist das Committen hier
// unkritisch: Auf der deployten Seite wäre der Key ohnehin im Quelltext sichtbar.
// Gleicher Key wie im Schwester-Projekt github.com/ribeach/baltic-roadtrip.
// Lokale Vorschau: Google erlaubt localhost nicht in Referrer-Beschränkungen.
// Deshalb überschreibt die gitignorte config.local.js (generiert aus .env via
// scripts/make-config-local.sh) diesen Key lokal mit einem Dev-Key.
// Einbindung im HTML, sobald die Karte gebaut wird:
//   <script src="assets/js/config.js"></script>
//   <script>
//     if (['localhost', '127.0.0.1'].includes(location.hostname)) {
//       document.write('<script src="assets/js/config.local.js"><\/script>');
//     }
//   </script>
window.CONFIG = {
  GOOGLE_MAPS_API_KEY: 'AIzaSyDcV9G4nWy4HokIhb61Wq9AKdsHvYFQmtg',
};
