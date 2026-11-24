@echo off
cd /d "%~dp0"
echo ============================================================
echo  Mehan Design System — Full Rebuild ^& 6-Gate Verification
echo ============================================================
if not exist "node_modules" (
  echo Installing workspace dependencies...
  call pnpm install
  if errorlevel 1 goto :fail
)
call pnpm verify
if errorlevel 1 goto :fail
echo.
echo [OK] All 6 quality gates passed and STUDIO.html + release/ are up to date!
pause
exit /b 0
:fail
echo.
echo [ERROR] Verification failed. Review the output above.
pause
exit /b 1
