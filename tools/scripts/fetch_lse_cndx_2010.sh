#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   export JWT='paste-your-jwt'
#   bash tools/scripts/fetch_lse_cndx_2010.sh

: "${JWT:?Set JWT environment variable first (export JWT='...')}"
RAW_DIR="/Users/sakthipriyan/Workspace/projects/sakthipriyan.github.io/data/raw/lse/cndx.l"
OUT="$RAW_DIR/2010.json"
mkdir -p "$RAW_DIR"

curl "https://refinitiv-widgets.financial.com/rest/api/timeseries/historical?ric=CNDX.L&fids=_DATE_END,CLOSE_PRC,HIGH_1,OPEN_PRC,LOW_1&samples=D&appendRecentData=all&toDate=2010-12-31T23:59:59&fromDate=2010-01-01T00:00:00" \
  -H "accept: application/json" \
  -H "jwt: $JWT" \
  -H "origin: https://www.londonstockexchange.com" \
  -H "referer: https://www.londonstockexchange.com/" \
  --fail --silent --show-error -o "$OUT"

printf "Saved: %s\n" "$OUT"
wc -c < "$OUT"
head -c 200 "$OUT" && echo
