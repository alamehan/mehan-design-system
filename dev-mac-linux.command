#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
echo "Starting Mehan Design System Live Studio..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies for first run..."
  pnpm install
fi
pnpm --filter @mehan/studio dev --open
