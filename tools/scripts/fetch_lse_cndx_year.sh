#!/usr/bin/env bash
set -euo pipefail

# Fetch CNDX.L daily JSON for a given year using a freshly fetched JWT.
# Usage:
#   bash tools/scripts/fetch_lse_cndx_year.sh 2010
# Outputs to data/raw/lse/cndx.l/<year>.json

YEAR="${1:?Provide YEAR, e.g., 2010}"
FROM_TS="${YEAR}-01-01T00:00:00"
TO_TS="${YEAR}-12-31T23:59:59"

# Get JWT: use env JWT if set; otherwise fetch via token script
if [[ -z "${JWT:-}" ]]; then
  JWT=$(bash "$(dirname "$0")/get_lse_token.sh")
fi
if [[ -z "$JWT" ]]; then
  echo "JWT not available" >&2
  exit 1
fi

RAW_DIR="/Users/sakthipriyan/Workspace/projects/sakthipriyan.github.io/data/raw/lse/cndx.l"
OUT="$RAW_DIR/${YEAR}.json"
mkdir -p "$RAW_DIR"

URL="https://refinitiv-widgets.financial.com/rest/api/timeseries/historical?ric=CNDX.L&fids=_DATE_END,CLOSE_PRC,HIGH_1,OPEN_PRC,LOW_1&samples=D&appendRecentData=all&toDate=${TO_TS}&fromDate=${FROM_TS}"

curl "$URL" \
  -H "accept: application/json" \
  -H "jwt: $JWT" \
  -H "origin: https://www.londonstockexchange.com" \
  -H "referer: https://www.londonstockexchange.com/" \
  --fail --silent --show-error -o "$OUT"

printf "Saved: %s\n" "$OUT"
wc -c < "$OUT"
head -c 200 "$OUT" && echo
