#!/bin/bash
# sync-to-deploy.sh — site/v1/ → kcocoh-deploy/ 안전 복사
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
SRC="$ROOT/site/v1"
DST="$(cd "$ROOT/.." && pwd)/kcocoh-deploy"

if [ ! -d "$SRC" ]; then
  echo "❌ 소스 폴더 없음: $SRC"
  exit 1
fi

mkdir -p "$DST"
echo "→ $SRC/. → $DST/"
rsync -a --delete "$SRC"/ "$DST"/
echo "✓ 동기화 완료"
echo "  index.html: $(stat -f%z "$DST/index.html" 2>/dev/null || stat -c%s "$DST/index.html") bytes"
