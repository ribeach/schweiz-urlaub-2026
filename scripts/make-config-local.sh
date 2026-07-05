#!/usr/bin/env bash
# Erzeugt docs/assets/js/config.local.js (gitignored) aus der lokalen .env.
# Damit nutzt die lokale Vorschau den Dev-Key aus der .env, während auf
# GitHub Pages der committete, referrer-beschränkte Key aus config.js gilt.
set -euo pipefail
cd "$(dirname "$0")/.."

KEY=$(grep '^PUBLIC_GOOGLE_MAPS_API_KEY=' .env | cut -d= -f2-)
if [ -z "$KEY" ] || [ "$KEY" = "DEIN_API_KEY_HIER" ]; then
  echo "Fehler: PUBLIC_GOOGLE_MAPS_API_KEY fehlt in .env" >&2
  exit 1
fi

cat > docs/assets/js/config.local.js <<EOF
// LOKALER Override — gitignored, wird nie deployt.
// Generiert aus .env via scripts/make-config-local.sh — nicht von Hand editieren.
window.CONFIG = Object.assign(window.CONFIG || {}, {
  GOOGLE_MAPS_API_KEY: '$KEY',
});
EOF
echo "docs/assets/js/config.local.js geschrieben (Key-Prefix: ${KEY:0:8}…)"
