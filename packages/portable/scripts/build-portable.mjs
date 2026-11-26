#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {syncAstryxCatalog} from './sync-astryx-catalog.mjs';

const pkgRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(pkgRoot, '../..');
const astryxDir = path.resolve(pkgRoot, '../astryx');
const distDir = path.join(pkgRoot, 'dist');

await syncAstryxCatalog();

fs.rmSync(distDir, {recursive: true, force: true});
fs.mkdirSync(distDir, {recursive: true});

const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

execFileSync(
  pnpmCmd,
  ['exec', 'tsup', '--config', 'tsup.config.mjs'],
  {cwd: pkgRoot, stdio: 'inherit', shell: process.platform === 'win32'},
);

const rootPkg = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
);
const astryxPkg = JSON.parse(
  fs.readFileSync(path.join(astryxDir, 'package.json'), 'utf8'),
);
const scopeMatch = /^@([a-z0-9-]+)\//i.exec(astryxPkg.name ?? '');
const runtimePrefix = scopeMatch ? scopeMatch[1].toLowerCase() : 'mehan';
const homepage =
  typeof rootPkg.homepage === 'string' && rootPkg.homepage.trim().length > 0
    ? rootPkg.homepage.trim().replace(/\/+$/, '')
    : 'https://alamehan.github.io/mehan-design-system';
const cdnBaseUrl = `${homepage}/cdn`;

const {
  generatePortableCss,
  generateAiPrototypeKit,
  generateStarterCdnHtml,
  exportW3cDesignTokens,
  MEHAN_PORTABLE_RUNTIME_JS,
} = await import(new URL('../dist/index.js', import.meta.url).href);

const fullCss = generatePortableCss();
const aiKitMd = generateAiPrototypeKit({
  atmosphere: 'porcelain',
  accent: 'blueberry',
  cdnBaseUrl,
  runtimePrefix,
});
const cdnHtml = generateStarterCdnHtml({
  atmosphere: 'porcelain',
  accent: 'blueberry',
  cdnBaseUrl,
  runtimePrefix,
});
const w3cJson = `${JSON.stringify(
  exportW3cDesignTokens({
    name: 'mehan-porcelain',
    atmosphere: 'porcelain',
    accent: 'blueberry',
  }),
  null,
  2,
)}\n`;

fs.writeFileSync(path.join(distDir, 'mehan-portable.css'), fullCss, 'utf8');
fs.writeFileSync(
  path.join(distDir, 'mehan-portable.js'),
  MEHAN_PORTABLE_RUNTIME_JS,
  'utf8',
);
fs.writeFileSync(
  path.join(distDir, 'MEHAN-AI-PROTOTYPE-KIT.md'),
  aiKitMd,
  'utf8',
);
fs.writeFileSync(path.join(distDir, 'mehan-astryx-cdn.html'), cdnHtml, 'utf8');
fs.writeFileSync(path.join(distDir, 'mehan-tokens.w3c.json'), w3cJson, 'utf8');

console.log(
  '✅ @mehan/portable built CSS, runtime JS, Real-Engine AI Kit, W3C tokens, and CDN HTML in dist/.',
);
