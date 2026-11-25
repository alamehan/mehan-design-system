#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const pkgRoot = path.resolve(import.meta.dirname, '..');
const distDir = path.join(pkgRoot, 'dist');
const distThemesDir = path.join(distDir, 'themes');

fs.rmSync(distDir, {recursive: true, force: true});
fs.mkdirSync(distThemesDir, {recursive: true});

const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

function run(args, label) {
  console.log(`▶ ${label}`);
  execFileSync(pnpmCmd, args, {
    cwd: pkgRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}

// Step 1: Bundle core entrypoints (`dist/index.js`, `dist/dna.js` + `.d.ts`) first
run(
  ['exec', 'tsup', '--config', 'tsup.config.mjs'],
  'Bundling @mehan/astryx core + dna + .d.ts',
);

// Step 2: Bundle themes/*.js and blocks/*.js + .d.ts (depends on dist/{index,dna}.d.ts)
run(
  ['exec', 'tsup', '--config', 'tsup.secondary.config.mjs'],
  'Bundling @mehan/astryx themes + showcase blocks + .d.ts',
);

// Step 3: Copy pre-compiled extension stylesheet
fs.copyFileSync(
  path.join(pkgRoot, 'src', 'styles.css'),
  path.join(distDir, 'styles.css'),
);

// Step 4: Compile all 8 source themes via `astryx theme build`
const THEMES = [
  ['mehan-confectionery', 'mehanConfectioneryTheme.ts'],
  ['mehan-porcelain', 'mehanPorcelainTheme.ts'],
  ['mehan-stone', 'mehanStoneTheme.ts'],
  ['mehan-butter', 'mehanButterTheme.ts'],
  ['mehan-matcha', 'mehanMatchaTheme.ts'],
  ['mehan-cacao', 'mehanCacaoTheme.ts'],
  ['mehan-periwinkle', 'mehanPeriwinkleTheme.ts'],
  ['mehan-obsidian', 'mehanObsidianTheme.ts'],
];

for (const [slug, entry] of THEMES) {
  run(
    [
      'exec',
      'astryx',
      'theme',
      'build',
      `themes/${slug}/${entry}`,
      '-o',
      `dist/themes/${slug}.css`,
    ],
    `Compiling theme ${slug}`,
  );
}

console.log('✅ @mehan/astryx build complete.');
