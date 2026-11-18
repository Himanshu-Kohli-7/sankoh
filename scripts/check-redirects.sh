#!/usr/bin/env bash
# curl -I each old URL (no follow), then the Location's path on the same server: must be 200, no 2nd hop.
# Old-URL redirect check (docs/REDIRECTS.md). Run against a deploy preview or `netlify dev`.
# Usage: bash scripts/check-redirects.sh <base-url>   e.g. http://localhost:8888 or https://deploy-preview-N--site.netlify.app
BASE="${1:-http://localhost:8888}"
URLS=(
  "/products?category=manual-valves"
  "/products?category=automated-valves&subcategory=pneumatic"
  "/products?category=automated-valves&subcategory=electric"
  "/products?category=automated-valves&subcategory=solenoid"
  "/products?category=process-instruments&subcategory=flow-meter"
  "/products?category=process-instruments&subcategory=pressure"
  "/products?category=process-instruments&subcategory=temperature"
  "/products?category=process-instruments&subcategory=level-transmitter"
  "/products?category=process-instruments&subcategory=analytical"
  "/products?category=instruments&subcategory=flow-meter"
  "/products?category=instruments&subcategory=pressure"
  "/products?category=instruments&subcategory=temperature"
  "/products?category=instruments&subcategory=level-transmitter"
  "/products?category=instruments&subcategory=analytical"
  "/products?subcategory=pneumatic&category=automated-valves"
  "/products/?category=manual-valves"
  "/products?category=automated-valves"
  "/products?category=process-instruments"
  "/products?category=instruments"
  "/products?category=unknown-thing"
  "/about"
  "/contact"
  "/products"
  "/services"
  "/sitemap.xml"
  "/manifest.json"
  "/logo.png"
  "/logo192.png"
  "/logo512.png"
  "/Icons/favicon.ico"
  "/Icons/favicon.svg"
  "/Icons/favicon-96x96.png"
  "/Icons/apple-touch-icon.png"
  "/Icons/web-app-manifest-192x192.png"
  "/Icons/web-app-manifest-512x512.png"
  "/index.html"
  "/about.html"
  "/contact.html"
  "/products.html"
  "/services.html"
  "/"
  "/products/"
  "/services/"
  "/robots.txt"
)
for u in "${URLS[@]}"; do
  h=$(curl -s -o /dev/null -D - --max-time 15 "$BASE$u" | tr -d '\r')
  code=$(echo "$h" | head -1 | awk '{print $2}')
  loc=$(echo "$h" | grep -i '^location:' | head -1 | cut -d' ' -f2-)
  final=""
  if [ -n "$loc" ]; then
    path=$(echo "$loc" | sed -E 's#^https?://[^/]+##')
    h2=$(curl -s -o /dev/null -D - --max-time 15 "$BASE$path" | tr -d '\r')
    c2=$(echo "$h2" | head -1 | awk '{print $2}')
    l2=$(echo "$h2" | grep -i '^location:' | head -1 | cut -d' ' -f2-)
    final="-> $path  [$c2${l2:+ then $l2}]"
  fi
  printf '%-66s %s %s %s\n' "$u" "$code" "${loc:-}" "$final"
done
