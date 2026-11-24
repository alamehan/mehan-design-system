#!/usr/bin/env node
/**
 * Vendors self-hosted WOFF2 faces + OFL-1.1 licenses from installed Fontsource
 * packages into `packages/astryx/fonts/` and generates `packages/astryx/fonts.css`
 * using `font-display: fallback` (matching Meta Astryx's official theme convention).
 */
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const pkgRoot = path.resolve(import.meta.dirname, '..');
const fontsOutDir = path.join(pkgRoot, 'fonts');
fs.mkdirSync(fontsOutDir, {recursive: true});

const SOURCES = [
  {
    pkg: '@fontsource-variable/bricolage-grotesque',
    cssFiles: ['opsz.css'],
    licenseDest: 'LICENSE-Bricolage-Grotesque.txt',
  },
  {
    pkg: '@fontsource-variable/figtree',
    cssFiles: ['wght.css'],
    licenseDest: 'LICENSE-Figtree.txt',
  },
  {
    pkg: '@fontsource/geist-mono',
    cssFiles: ['400.css', '500.css', '600.css', '700.css'],
    licenseDest: 'LICENSE-Geist-Mono.txt',
  },
];

const blocks = [
  '/* Mehan Design System — Self-hosted WOFF2 Typefaces (OFL-1.1) */',
  '/* Bricolage Grotesque (opsz variable), Figtree (wght variable), Geist Mono */',
  '',
];

for (const src of SOURCES) {
  const pkgJsonPath = require.resolve(`${src.pkg}/package.json`);
  const srcDir = path.dirname(pkgJsonPath);
  const licFile = ['LICENSE', 'LICENSE.md', 'LICENSE.txt']
    .map(f => path.join(srcDir, f))
    .find(f => fs.existsSync(f));
  if (licFile) {
    fs.copyFileSync(licFile, path.join(fontsOutDir, src.licenseDest));
  }

  for (const cssFile of src.cssFiles) {
    const fullCssPath = path.join(srcDir, cssFile);
    if (!fs.existsSync(fullCssPath)) {
      throw new Error(`Missing Fontsource CSS: ${fullCssPath}`);
    }
    const rawCss = fs.readFileSync(fullCssPath, 'utf8');
    for (const match of rawCss.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
      let body = match[1];
      const woff2Match = /url\(\.\/files\/([^)]+\.woff2)\)/.exec(body);
      if (!woff2Match) continue;
      const fileName = woff2Match[1];
      // Keep latin + latin-ext subsets so package stays fast & lean (<350 KB total)
      if (!/latin/.test(fileName)) continue;
      fs.copyFileSync(
        path.join(srcDir, 'files', fileName),
        path.join(fontsOutDir, fileName),
      );
      body = body
        .replace(/font-display:\s*[^;]+;/, 'font-display: fallback;')
        .replace(/src:\s*[^;]+;/, `src: url('./fonts/${fileName}') format('woff2');`);
      blocks.push(`@font-face {${body}}`, '');
    }
  }
}

fs.writeFileSync(path.join(pkgRoot, 'fonts.css'), blocks.join('\n'), 'utf8');
console.log(
  `Vendored ${fs.readdirSync(fontsOutDir).length} files into fonts/ and generated fonts.css`,
);
