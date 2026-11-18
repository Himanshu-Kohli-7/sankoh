#!/usr/bin/env bash
# Old-URL redirect check (docs/REDIRECTS.md). Follows each URL hop by hop (curl, no auto-follow) and prints
# hop count and final URL. Exits 1 if any URL takes more than one hop, ends on a wrong path, or does not end on 200.
# Usage: bash scripts/check-redirects.sh <base-url>   e.g. http://localhost:8888 or https://deploy-preview-N--site.netlify.app
#
# A Location on the production host is requested on <base-url> instead (same path), so a preview is tested
# end to end. The final URL shown is that path on <base-url>.
BASE="${1:-http://localhost:8888}"
BASE="${BASE%/}"
MAX_HOPS=1

# Each row: old URL|expected final path (query ignored). Query URLs are tested with and without the slash.
ROWS=()
add_query() { # <query> <expected path>
  ROWS+=("/products?$1|$2" "/products/?$1|$2")
}
add_query "category=manual-valves" /products/manual-valves/
add_query "category=automated-valves&subcategory=pneumatic" /products/pneumatic-actuated-valves/
add_query "category=automated-valves&subcategory=electric" /products/electric-actuated-valves/
add_query "category=automated-valves&subcategory=solenoid" /products/solenoid-valves/
for cat in process-instruments instruments; do
  add_query "category=$cat&subcategory=flow-meter" /products/flow-meters/
  add_query "category=$cat&subcategory=pressure" /products/pressure-instruments/
  add_query "category=$cat&subcategory=temperature" /products/temperature-instruments/
  add_query "category=$cat&subcategory=level-transmitter" /products/level-instruments/
  add_query "category=$cat&subcategory=analytical" /products/analytical-instruments/
done
add_query "subcategory=pneumatic&category=automated-valves" /products/pneumatic-actuated-valves/
# Bare categories and unknown values are not redirected: /products/ answers them (one slash hop at most).
add_query "category=automated-valves" /products/
add_query "category=process-instruments" /products/
add_query "category=instruments" /products/
add_query "category=unknown-thing" /products/
ROWS+=(
  "/about|/about/" "/contact|/contact/" "/products|/products/" "/services|/services/"
  "/sitemap.xml|/sitemap-index.xml"
  "/manifest.json|/site.webmanifest"
  "/logo.png|/og/default.jpg"
  "/logo192.png|/web-app-manifest-192x192.png"
  "/logo512.png|/web-app-manifest-512x512.png"
  "/Icons/favicon.ico|/favicon.ico"
  "/Icons/favicon.svg|/favicon.svg"
  "/Icons/favicon-96x96.png|/favicon-96x96.png"
  "/Icons/apple-touch-icon.png|/apple-touch-icon.png"
  "/Icons/web-app-manifest-192x192.png|/web-app-manifest-192x192.png"
  "/Icons/web-app-manifest-512x512.png|/web-app-manifest-512x512.png"
  "/index.html|/"
  "/about.html|/about/" "/contact.html|/contact/" "/products.html|/products/" "/services.html|/services/"
  "/|/" "/products/|/products/" "/services/|/services/" "/robots.txt|/robots.txt"
)

fail=0
printf '%-72s %-4s %-5s %s\n' "URL" "HOPS" "CODE" "FINAL"
for row in "${ROWS[@]}"; do
  url="${row%%|*}"
  want="${row##*|}"
  cur="$url"
  hops=0
  code=""
  while :; do
    h=$(curl -s -o /dev/null -D - --max-time 20 "$BASE$cur" | tr -d '\r')
    code=$(printf '%s\n' "$h" | head -1 | awk '{print $2}')
    loc=$(printf '%s\n' "$h" | grep -i '^location:' | head -1 | cut -d' ' -f2-)
    case "$code" in 301|302|307|308) ;; *) break ;; esac
    [ -z "$loc" ] && break
    cur=$(printf '%s' "$loc" | sed -E 's#^https?://[^/]+##')
    case "$cur" in /*) ;; *) cur="/$cur" ;; esac
    hops=$((hops + 1))
    [ "$hops" -gt 5 ] && break
  done
  final_path="${cur%%\?*}"
  verdict="ok"
  if [ -z "$code" ] || [ "$code" = "000" ]; then
    verdict="FAIL no response"
  elif [ "$hops" -gt "$MAX_HOPS" ]; then
    verdict="FAIL $hops hops (max $MAX_HOPS)"
  elif [ "$final_path" != "$want" ]; then
    verdict="FAIL wrong target (want $want)"
  elif [ "$code" != "200" ]; then
    verdict="FAIL final status $code"
  fi
  [ "$verdict" != "ok" ] && fail=$((fail + 1))
  printf '%-72s %-4s %-5s %s  %s\n' "$url" "$hops" "$code" "$cur" "$verdict"
done

if [ "$fail" -gt 0 ]; then
  echo "FAILED: $fail of ${#ROWS[@]} URLs."
  exit 1
fi
echo "OK: ${#ROWS[@]} URLs, each at most $MAX_HOPS hop, all on the expected 200 target."
