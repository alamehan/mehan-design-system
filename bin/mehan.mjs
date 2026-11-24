#!/usr/bin/env node
/**
 * Mehan Design System Universal Helper CLI (`node bin/mehan.mjs`)
 * Works identically on Windows, macOS, and Linux:
 *   node bin/mehan.mjs init [target-dir] [--theme mehan-confectionery] [--portable]
 *   node bin/mehan.mjs ai-kit [--atmosphere confectionery] [--accent strawberry] [--out prototype-kit.md]
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const cmd = args[0] ?? 'help';

function readFlag(name, fallback) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

if (cmd === 'ai-kit') {
  const atmosphere = readFlag('--atmosphere', 'confectionery');
  const accent = readFlag('--accent', 'strawberry');
  const out = readFlag('--out', null);
  const {generateAiPrototypeKit} = await import(
    new URL('../packages/portable/dist/index.js', import.meta.url).href
  );
  const kit = generateAiPrototypeKit({atmosphere, accent});
  if (out) {
    const dest = path.resolve(process.cwd(), out);
    fs.writeFileSync(dest, kit, 'utf8');
    console.log(`✅ Wrote Mehan AI Prototype Kit to ${dest}`);
  } else {
    process.stdout.write(kit);
  }
  process.exit(0);
}

if (cmd === 'init') {
  const positional = args.slice(1).find(a => !a.startsWith('--')) ?? '.';
  const targetDir = path.resolve(process.cwd(), positional);
  const slug = readFlag('--theme', 'mehan-confectionery');
  const forcePortable = args.includes('--portable');

  fs.mkdirSync(targetDir, {recursive: true});
  const pkgPath = path.join(targetDir, 'package.json');
  const hasPkg = fs.existsSync(pkgPath);
  const pkg = hasPkg ? JSON.parse(fs.readFileSync(pkgPath, 'utf8')) : null;
  const allDeps = pkg
    ? {...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {})}
    : {};
  const isReactProject = Boolean(allDeps.react) && !forcePortable;

  if (!isReactProject) {
    // Non-React / Vanilla / Astro / Vue / Svelte / HTML mode -> copy Portable CSS + JS!
    const outDir = path.join(targetDir, 'mehan');
    fs.mkdirSync(outDir, {recursive: true});
    fs.copyFileSync(
      path.join(repoRoot, 'packages/portable/dist/mehan-portable.css'),
      path.join(outDir, 'mehan-portable.css'),
    );
    fs.copyFileSync(
      path.join(repoRoot, 'packages/portable/dist/mehan-portable.js'),
      path.join(outDir, 'mehan-portable.js'),
    );
    console.log(`✅ Installed Mehan Portable into ${outDir}`);
    console.log('   Add to your HTML <head>: <link rel="stylesheet" href="./mehan/mehan-portable.css" />');
    console.log('   Add before </body>:      <script src="./mehan/mehan-portable.js"></script>');
    process.exit(0);
  }

  // React 19+ project -> ensure modern browserslist for CSS light-dark() + write MehanProvider!
  if (!pkg.browserslist) {
    pkg.browserslist = ['Chrome >= 123', 'Firefox >= 120', 'Safari >= 17.5'];
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  }
  const srcDir = fs.existsSync(path.join(targetDir, 'src'))
    ? path.join(targetDir, 'src')
    : targetDir;
  const camel = `${slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())}Theme`;
  const providerPath = path.join(srcDir, 'MehanProvider.tsx');
  fs.writeFileSync(
    providerPath,
    `'use client';

import React from 'react';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/themes/${slug}.css';
import '@mehan/astryx/styles.css';
import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {${camel}} from '@mehan/astryx/themes/${slug}';

export function MehanProvider({
  children,
  mode = 'system',
}: {
  children: React.ReactNode;
  mode?: 'light' | 'dark' | 'system';
}) {
  return (
    <Theme theme={${camel}} mode={mode}>
      <LayerProvider>{children}</LayerProvider>
    </Theme>
  );
}
`,
    'utf8',
  );
  console.log(`✅ Created ${providerPath} and ensured modern browserslist in package.json!`);
  console.log('   Install packages: pnpm add @astryxdesign/core@0.7.17 @mehan/astryx');
  console.log('   Wrap your root app with <MehanProvider>{children}</MehanProvider>');
  process.exit(0);
}

console.log(`Mehan Design System CLI (v1.0.0)
Usage:
  • Double-click STUDIO.html (Windows / macOS / Linux) to open Interactive Studio offline!
  • node bin/mehan.mjs init <project-folder> [--theme mehan-confectionery|mehan-porcelain|mehan-stone] [--portable]
  • node bin/mehan.mjs ai-kit [--atmosphere confectionery|porcelain|stone] [--accent strawberry|#hex] [--out kit.md]
`);
