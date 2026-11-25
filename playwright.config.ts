import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {chromium, defineConfig} from '@playwright/test';

function resolveChromiumExecutable(): string | undefined {
  if (process.env.PLAYWRIGHT_EXECUTABLE_PATH) {
    return process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  }
  try {
    const defaultExe = chromium.executablePath();
    if (defaultExe && fs.existsSync(defaultExe)) return undefined;
  } catch {
    // Fall back to any cached ms-playwright chromium binary
  }

  const cacheRoot =
    process.platform === 'win32'
      ? path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright')
      : process.platform === 'darwin'
        ? path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright')
        : path.join(os.homedir(), '.cache', 'ms-playwright');

  if (!fs.existsSync(cacheRoot)) return undefined;
  const dirs = fs
    .readdirSync(cacheRoot)
    .filter(d => d.startsWith('chromium-'))
    .sort()
    .reverse();

  for (const dir of dirs) {
    for (const sub of [
      ['chrome-win64', 'chrome.exe'],
      ['chrome-win', 'chrome.exe'],
      ['chrome-linux', 'chrome'],
      ['chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'],
    ]) {
      const candidate = path.join(cacheRoot, dir, ...sub);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return undefined;
}

const executablePath = resolveChromiumExecutable();
fs.mkdirSync(path.join(os.tmpdir(), 'mehan-playwright-shots'), {recursive: true});

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  outputDir: path.join(os.tmpdir(), 'mehan-playwright-results'),
  timeout: 45_000,
  use: {
    headless: true,
    launchOptions: executablePath ? {executablePath} : undefined,
  },
  projects: [
    {
      name: 'chromium',
      use: {browserName: 'chromium'},
    },
  ],
});
