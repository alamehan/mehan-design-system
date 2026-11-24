@echo off
cd /d "%~dp0"
echo Starting Mehan Design System Live Studio...
if not exist "node_modules" (
  echo Installing dependencies for first run...
  call pnpm install
)
call pnpm --filter @mehan/studio dev --open
