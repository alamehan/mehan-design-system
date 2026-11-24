#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
echo "============================================================"
echo " Mehan Design System — Full Rebuild & 6-Gate Verification"
echo "============================================================"
if [ ! -d "node_modules" ]; then
  echo "Installing workspace dependencies..."
  pnpm install || { printf "\n[ERROR] Install failed.\n"; read -r _; exit 1; }
fi
if pnpm verify; then
  printf "\n[OK] All 6 quality gates passed and STUDIO.html + release/ are up to date!\n"
  printf "Press Enter to close..."
  read -r _
  exit 0
else
  printf "\n[ERROR] Verification failed. Review the output above.\n"
  printf "Press Enter to close..."
  read -r _
  exit 1
fi
