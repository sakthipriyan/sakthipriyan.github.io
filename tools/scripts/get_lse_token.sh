#!/usr/bin/env bash
set -euo pipefail

# Fetch JWT token from Refinitiv Widgets token API and print it to stdout.
# Usage:
#   bash tools/scripts/get_lse_token.sh
# Optional: set SID via env if different from default.

SID_DEFAULT="b6a99564-c2fe-46de-aa93-d9af5349005f"
SID="${SID:-$SID_DEFAULT}"

# Avoid writing to disk to prevent permission issues; parse from STDIN.
RESP=$(curl "https://refinitiv-widgets.financial.com/auth/api/v1/tokens" \
  -X POST \
  -H "accept: application/json" \
  -H "accept-language: en-IN,en-US;q=0.9,en-GB;q=0.8,en;q=0.7,ta;q=0.6" \
  -H "content-length: 0" \
  -H "dnt: 1" \
  -H "origin: https://www.londonstockexchange.com" \
  -H "priority: u=1, i" \
  -H "referer: https://www.londonstockexchange.com/" \
  -H "sid: $SID" \
  -H "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36" \
  --fail --silent --show-error)

JWT=$(python3 - <<'PY'
import json,sys
try:
    d=json.loads(sys.stdin.read())
    print(d.get('jwt') or d.get('token') or '')
except Exception:
    print('')
PY
 <<<"$RESP")

if [[ -z "$JWT" ]]; then
  # Fallback: token API may return raw JWT string instead of JSON
  JWT=$(printf "%s" "$RESP" | tr -d '\r\n' | sed 's/^"//; s/"$//' )
fi

if [[ -z "$JWT" ]]; then
  echo "Failed to obtain JWT from token response" >&2
  echo "$RESP" | head -c 300
  exit 1
fi

printf "%s\n" "$JWT"
