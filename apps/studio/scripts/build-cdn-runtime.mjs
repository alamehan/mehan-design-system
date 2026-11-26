#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';

const studioDir = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(studioDir, '../..');
const astryxDir = path.join(repoRoot, 'packages/astryx');
const astryxPkg = JSON.parse(
  fs.readFileSync(path.join(astryxDir, 'package.json'), 'utf8'),
);
const scopeMatch = /^@([a-z0-9-]+)\//i.exec(astryxPkg.name ?? '');
const runtimePrefix = scopeMatch ? scopeMatch[1].toLowerCase() : 'mehan';

const cdnOutDir = path.join(studioDir, 'dist', 'cdn');
const cdnFontsDir = path.join(cdnOutDir, 'fonts');

fs.mkdirSync(cdnFontsDir, {recursive: true});

// 1. Copy bundled self-hosted SIL OFL WOFF2 fonts so prototypes render 100% authentic typography with zero Google Fonts calls
const srcFontsDir = path.join(astryxDir, 'fonts');
for (const entry of fs.readdirSync(srcFontsDir, {withFileTypes: true})) {
  if (entry.isFile() && entry.name.endsWith('.woff2')) {
    fs.copyFileSync(
      path.join(srcFontsDir, entry.name),
      path.join(cdnFontsDir, entry.name),
    );
  }
}

// 2. Bundle unified CSS (`reset.css` + `astryx.css` + `fonts.css` + default `mehan-porcelain.css` + `styles.css`)
const cssOutPath = path.join(cdnOutDir, `${runtimePrefix}-runtime.css`);
await build({
  entryPoints: [path.join(studioDir, 'scripts/cdn-runtime-styles.css')],
  outfile: cssOutPath,
  bundle: true,
  minify: true,
  external: ['./fonts/*'],
  logLevel: 'silent',
});

// 3. Bundle unified JS runtime (React 19 + @astryxdesign/core + @mehan/astryx + Lucide icons + Sucrase TSX/JSX compiler)
const jsOutPath = path.join(cdnOutDir, `${runtimePrefix}-runtime.js`);
await build({
  entryPoints: [path.join(studioDir, 'scripts/cdn-runtime-entry.tsx')],
  outfile: jsOutPath,
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2022'],
  conditions: ['browser', 'import', 'default'],
  jsx: 'automatic',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  logLevel: 'silent',
});

const jsKb = (fs.statSync(jsOutPath).size / 1024).toFixed(1);
const cssKb = (fs.statSync(cssOutPath).size / 1024).toFixed(1);
console.log(
  `✅ Built single-HTML CDN runtime in dist/cdn/: ${runtimePrefix}-runtime.js (${jsKb} KB) + ${runtimePrefix}-runtime.css (${cssKb} KB) + WOFF2 fonts.`,
);
