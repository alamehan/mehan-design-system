#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "============================================================"
echo " Mehan Design System -- Full Rebuild & 6-Gate Verification"
echo "============================================================"
if [ ! -d "node_modules" ]; then
  echo "Installing workspace dependencies..."
  pnpm install
fi
pnpm verify
echo ""
echo "[OK] All 6 quality gates passed and STUDIO.html + release/ are up to date!"
