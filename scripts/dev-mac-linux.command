#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Starting Mehan Design System Live Studio..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies for first run..."
  pnpm install
fi
pnpm --filter @mehan/studio dev --open
