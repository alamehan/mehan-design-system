#!/usr/bin/env node
/**
 * Mehan Design System Universal Helper CLI (`node bin/mehan.mjs`)
 * Works identically on Windows, macOS, and Linux:
 *   node bin/mehan.mjs init [target-dir] [--atmosphere confectionery|porcelain|stone] [--accent strawberry|#hex]
 *        [--depth 1] [--radius 1] [--density standard|compact] [--motion expressive|standard|calm]
 *        [--tailwind] [--local|--npm] [--portable]
 *   node bin/mehan.mjs ai-kit [--atmosphere confectionery] [--accent strawberry] [--out prototype-kit.md]
 *   node bin/mehan.mjs tokens [--atmosphere confectionery] [--accent strawberry] [--out mehan-tokens.w3c.json]
 *   node bin/mehan.mjs set-scope <@newscope>
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

function readJsonSafe(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function readCurrentScope() {
  const dnaPkg = readJsonSafe(path.join(repoRoot, 'packages/dna/package.json'));
  const match = /^(@[^/]+)\//.exec(dnaPkg.name);
  return match ? match[1] : '@mehan';
}

if (cmd === 'ai-kit') {
  const atmosphere = readFlag('--atmosphere', 'confectionery');
  const accent = readFlag('--accent', 'strawberry');
  const depth = Number(readFlag('--depth', '1'));
  const radiusScale = Number(readFlag('--radius', '1'));
  const density = readFlag('--density', 'standard');
  const motion = readFlag('--motion', 'expressive');
  const lipStyle = readFlag('--lip', 'candy');
  const segmentedStyle = readFlag('--segmented', 'raised');
  const wellStyle = readFlag('--well', 'recessed');
  const out = readFlag('--out', null);
  const {generateAiPrototypeKit} = await import(
    new URL('../packages/portable/dist/index.js', import.meta.url).href
  );
  const kit = generateAiPrototypeKit({
    atmosphere,
    accent,
    depth,
    radiusScale,
    density,
    motion,
    lipStyle,
    segmentedStyle,
    wellStyle,
  });
  if (out) {
    const dest = path.resolve(process.cwd(), out);
    fs.writeFileSync(dest, kit, 'utf8');
    console.log(`✅ Wrote Mehan AI Prototype Kit to ${dest}`);
  } else {
    process.stdout.write(kit);
  }
  process.exit(0);
}

if (cmd === 'tokens') {
  const atmosphere = readFlag('--atmosphere', 'confectionery');
  const accent = readFlag('--accent', 'strawberry');
  const depth = Number(readFlag('--depth', '1'));
  const radiusScale = Number(readFlag('--radius', '1'));
  const density = readFlag('--density', 'standard');
  const motion = readFlag('--motion', 'expressive');
  const lipStyle = readFlag('--lip', 'candy');
  const segmentedStyle = readFlag('--segmented', 'raised');
  const wellStyle = readFlag('--well', 'recessed');
  const out = readFlag('--out', 'mehan-tokens.w3c.json');
  const {exportW3cDesignTokens} = await import(
    new URL('../packages/portable/dist/index.js', import.meta.url).href
  );
  const json = `${JSON.stringify(
    exportW3cDesignTokens({
      name: `mehan-${atmosphere}`,
      atmosphere,
      accent,
      depth,
      radiusScale,
      density,
      motion,
      lipStyle,
      segmentedStyle,
      wellStyle,
    }),
    null,
    2,
  )}\n`;
  const dest = path.resolve(process.cwd(), out);
  fs.writeFileSync(dest, json, 'utf8');
  console.log(`✅ Exported W3C DTCG design tokens to ${dest}`);
  process.exit(0);
}

if (cmd === 'set-scope') {
  const rawScope = args[1];
  if (!rawScope || !/^@[a-z0-9-]+$/i.test(rawScope)) {
    console.error('Usage: node bin/mehan.mjs set-scope @yourscope');
    process.exit(1);
  }
  const nextScope = rawScope.toLowerCase();
  const prevScope = readCurrentScope();
  if (nextScope === prevScope) {
    console.log(`ℹ️ Workspace already uses scope ${nextScope}.`);
    process.exit(0);
  }

  const textExts = new Set(['.json', '.ts', '.tsx', '.mjs', '.md']);
  const skipDirs = new Set([
    'node_modules',
    'dist',
    'dist-single',
    'release',
    '.git',
    'test-results',
    'playwright-report',
  ]);
  let touched = 0;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      if (skipDirs.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (
        textExts.has(path.extname(entry.name)) &&
        entry.name !== 'STUDIO.html' &&
        entry.name !== 'pnpm-lock.yaml'
      ) {
        const content = fs.readFileSync(full, 'utf8');
        const updated = content
          .replaceAll(`${prevScope}/dna`, `${nextScope}/dna`)
          .replaceAll(`${prevScope}/astryx`, `${nextScope}/astryx`)
          .replaceAll(`${prevScope}/portable`, `${nextScope}/portable`)
          .replaceAll(`${prevScope}/studio`, `${nextScope}/studio`);
        if (updated !== content) {
          fs.writeFileSync(full, updated, 'utf8');
          touched += 1;
        }
      }
    }
  }

  walk(repoRoot);
  console.log(
    `✅ Updated package scope from ${prevScope}/* to ${nextScope}/* across ${touched} source/manifest files.`,
  );
  console.log('   Next step: run `pnpm install && pnpm verify` to rebuild tarballs and STUDIO.html.');
  process.exit(0);
}

if (cmd === 'init') {
  const positional = args.slice(1).find(a => !a.startsWith('--')) ?? '.';
  const targetDir = path.resolve(process.cwd(), positional);
  const themeFlag = readFlag('--theme', null);
  const atmosphere =
    themeFlag?.replace(/^mehan-/, '') ?? readFlag('--atmosphere', 'confectionery');
  const defaultAccentForAtm =
    atmosphere === 'porcelain'
      ? 'blueberry'
      : atmosphere === 'stone'
        ? 'tangerine'
        : 'strawberry';
  const accent = readFlag('--accent', defaultAccentForAtm);
  const depth = Number(readFlag('--depth', '1'));
  const radiusScale = Number(readFlag('--radius', '1'));
  const density = readFlag('--density', 'standard');
  const motion = readFlag('--motion', 'expressive');
  const lipStyle = readFlag('--lip', 'candy');
  const segmentedStyle = readFlag('--segmented', 'raised');
  const wellStyle = readFlag('--well', 'recessed');
  const forcePortable = args.includes('--portable');
  const preferNpm = args.includes('--npm');
  const scope = readCurrentScope();

  fs.mkdirSync(targetDir, {recursive: true});
  const pkgPath = path.join(targetDir, 'package.json');
  const hasPkg = fs.existsSync(pkgPath);
  const pkg = hasPkg ? readJsonSafe(pkgPath) : null;
  const allDeps = pkg
    ? {...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {})}
    : {};
  const isReactProject = Boolean(allDeps.react) && !forcePortable;
  const usesTailwind =
    args.includes('--tailwind') || Boolean(allDeps.tailwindcss);

  if (!isReactProject) {
    const outDir = path.join(targetDir, 'mehan');
    fs.mkdirSync(outDir, {recursive: true});
    const {generatePortableCss, MEHAN_PORTABLE_RUNTIME_JS} = await import(
      new URL('../packages/portable/dist/index.js', import.meta.url).href
    );
    fs.writeFileSync(
      path.join(outDir, 'mehan-portable.css'),
      generatePortableCss({
        name: `mehan-${atmosphere}`,
        atmosphere,
        accent,
        depth,
        radiusScale,
        density,
        motion,
        lipStyle,
        segmentedStyle,
        wellStyle,
      }),
      'utf8',
    );
    fs.writeFileSync(
      path.join(outDir, 'mehan-portable.js'),
      MEHAN_PORTABLE_RUNTIME_JS,
      'utf8',
    );
    console.log(`✅ Installed Mehan Portable (${atmosphere} · ${accent}) into ${outDir}`);
    console.log('   Add to HTML <head>: <link rel="stylesheet" href="./mehan/mehan-portable.css" />');
    console.log('   Add before </body>: <script src="./mehan/mehan-portable.js"></script>');
    process.exit(0);
  }

  if (!pkg.browserslist) {
    pkg.browserslist = ['Chrome >= 123', 'Firefox >= 120', 'Safari >= 17.5'];
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  }

  const srcDir = fs.existsSync(path.join(targetDir, 'src'))
    ? path.join(targetDir, 'src')
    : targetDir;
  const slug = `mehan-${atmosphere}`;
  const camel = `${slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())}Theme`;
  const isDefaultPreset =
    accent === defaultAccentForAtm &&
    depth === 1 &&
    radiusScale === 1 &&
    density === 'standard' &&
    motion === 'expressive' &&
    lipStyle === 'candy' &&
    segmentedStyle === 'raised' &&
    wellStyle === 'recessed';

  const cssPath = path.join(srcDir, 'mehan.css');
  const cssLines = usesTailwind
    ? [
        '/* Tailwind CSS v4 + Meta Astryx + Mehan Layer Cascade */',
        '@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;',
        '@import "@astryxdesign/core/reset.css";',
        '@import "tailwindcss";',
        '@import "@astryxdesign/core/astryx.css";',
        '@import "@astryxdesign/core/tailwind-theme.css";',
        `@import "${scope}/astryx/fonts.css";`,
        ...(isDefaultPreset
          ? [`@import "${scope}/astryx/themes/${slug}.css";`]
          : []),
        `@import "${scope}/astryx/styles.css";`,
      ]
    : [
        '/* Meta Astryx + Mehan CSS Cascade */',
        '@import "@astryxdesign/core/reset.css";',
        '@import "@astryxdesign/core/astryx.css";',
        `@import "${scope}/astryx/fonts.css";`,
        ...(isDefaultPreset
          ? [`@import "${scope}/astryx/themes/${slug}.css";`]
          : []),
        `@import "${scope}/astryx/styles.css";`,
      ];
  fs.writeFileSync(cssPath, `${cssLines.join('\n')}\n`, 'utf8');

  const providerPath = path.join(srcDir, 'MehanProvider.tsx');
  const providerSource = isDefaultPreset
    ? `'use client';

import React from 'react';
import './mehan.css';
import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {${camel}} from '${scope}/astryx/themes/${slug}';

/** Optional SSR / Next.js <head> inline script to prevent dark-mode flash on load. */
export const MEHAN_THEME_INIT_SCRIPT = \`(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();\`;

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
`
    : `'use client';

import React from 'react';
import './mehan.css';
import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {createMehanTheme} from '${scope}/astryx/dna';

export const mehanAppTheme = createMehanTheme({
  name: 'app-${atmosphere}',
  atmosphere: '${atmosphere}',
  accent: '${accent}',
  depth: ${depth},
  radiusScale: ${radiusScale},
  density: '${density}',
  motion: '${motion}',
  lipStyle: '${lipStyle}',
  segmentedStyle: '${segmentedStyle}',
  wellStyle: '${wellStyle}',
});

/** Optional SSR / Next.js <head> inline script to prevent dark-mode flash on load. */
export const MEHAN_THEME_INIT_SCRIPT = \`(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();\`;

export function MehanProvider({
  children,
  mode = 'system',
}: {
  children: React.ReactNode;
  mode?: 'light' | 'dark' | 'system';
}) {
  return (
    <Theme theme={mehanAppTheme} mode={mode}>
      <LayerProvider>{children}</LayerProvider>
    </Theme>
  );
}
`;
  fs.writeFileSync(providerPath, providerSource, 'utf8');

  const releaseFiles = fs.existsSync(path.join(repoRoot, 'release'))
    ? fs
        .readdirSync(path.join(repoRoot, 'release'))
        .filter(f => f.endsWith('.tgz'))
    : [];
  const localTgz = releaseFiles[0]
    ? path
        .join(repoRoot, 'release', releaseFiles[0])
        .replaceAll('\\', '/')
    : null;
  const pkgSpec =
    !preferNpm && localTgz ? `"${localTgz}"` : `${scope}/astryx`;

  console.log(`✅ Created ${cssPath} and ${providerPath}!`);
  console.log('\nRun in your project:');
  console.log(
    `  pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgSpec}`,
  );
  console.log(
    '  pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents',
  );
  console.log('\nThen wrap your root app with <MehanProvider>{children}</MehanProvider>.');
  process.exit(0);
}

console.log(`Mehan Design System CLI (v1.0.0)
Usage:
  • Double-click STUDIO.html (Windows / macOS / Linux) to open Interactive Studio offline!
  • node bin/mehan.mjs init <project-folder> [--atmosphere confectionery|porcelain|stone] [--accent strawberry|#hex] [--lip candy|subtle|flat] [--segmented raised|espresso] [--well recessed|bordered] [--density standard|compact] [--motion expressive|standard|crisp|calm] [--tailwind] [--local|--npm] [--portable]
  • node bin/mehan.mjs ai-kit [--atmosphere confectionery|porcelain|stone] [--accent strawberry|#hex] [--out kit.md]
  • node bin/mehan.mjs tokens [--atmosphere confectionery] [--accent strawberry] [--out mehan-tokens.w3c.json]
  • node bin/mehan.mjs set-scope @yourscope
`);
