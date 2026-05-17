#!/bin/bash
# backup-system.sh — KCOC 로컬 스냅샷 + GitHub manifest 백업
set -euo pipefail
DESC="${1:-manual backup}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(dirname "$SCRIPT_DIR")"
PARENT="$(cd "$ROOT/.." && pwd)"
TS="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="$PARENT/KCOC WEB BACKUPS/$TS"
MANIFEST="$ROOT/backups/github/$TS-manifest.md"

mkdir -p "$BACKUP_DIR" "$ROOT/backups/github"
rsync -a --delete   --exclude '.git/'   --exclude '.wrangler/'   --exclude 'node_modules/'   --exclude '../kcocoh-deploy/'   "$ROOT"/ "$BACKUP_DIR"/

cat > "$MANIFEST" <<EOF
# KCOC Backup Manifest — $TS

- Description: $DESC
- Source: $ROOT
- Local snapshot: $BACKUP_DIR
- Created: $(date)

## Git status at backup time

\`\`\`
$(cd "$ROOT" && git status --short 2>/dev/null || true)
\`\`\`
EOF

echo "✓ 로컬 백업: $BACKUP_DIR"
echo "✓ manifest: $MANIFEST"
