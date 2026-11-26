#!/usr/bin/env node
/**
 * Mehan Design System Universal Helper CLI (`node bin/mehan.mjs`)
 * Works identically on Windows, macOS, and Linux:
 *   node bin/mehan.mjs init [target-dir] [--from theme.json] [--atmosphere porcelain|confectionery|stone] [--accent blueberry|#hex]
 *        [--depth 1] [--radius 1] [--radius-base <px>] [--type-base 14] [--type-ratio 1.22] [--size-base 36]
 *        [--spacing-base 4] [--duration-step 1] [--density standard|compact] [--motion expressive|standard|crisp|calm]
 *        [--tailwind] [--github|--local|--npm] [--portable]
 *   node bin/mehan.mjs ai-kit [--from theme.json] [--atmosphere porcelain] [--accent blueberry] [--offline] [--out prototype-kit.md]
 *   node bin/mehan.mjs tokens [--from theme.json] [--atmosphere porcelain] [--accent blueberry] [--out mehan-tokens.w3c.json]
 *   node bin/mehan.mjs set-scope <@newscope>
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const cmd = args[0] ?? 'help';

function readFlag(name, fallback = undefined) {
  const idx = args.indexOf(name);
  return idx !== -1 && args[idx + 1] !== undefined ? args[idx + 1] : fallback;
}

function readNumberFlag(name, fallback = undefined) {
  const raw = readFlag(name, undefined);
  if (raw === undefined) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readJsonSafe(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function readCurrentScope() {
  const dnaPkg = readJsonSafe(path.join(repoRoot, 'packages/dna/package.json'));
  const match = /^(@[^/]+)\//.exec(dnaPkg.name);
  return match ? match[1] : '@mehan';
}

function readGithubRepoUrl() {
  try {
    const rootPkg = readJsonSafe(path.join(repoRoot, 'package.json'));
    const rawUrl = typeof rootPkg?.repository === 'string'
      ? rootPkg.repository
      : rootPkg?.repository?.url;
    if (typeof rawUrl === 'string' && rawUrl.trim().length > 0) {
      return rawUrl.trim().replace(/^git\+/, '').replace(/\.git$/, '').replace(/\/$/, '');
    }
  } catch {
    // Fallback below
  }
  return 'https://github.com/alamehan/mehan-design-system';
}

function readHomepageCdnUrl() {
  try {
    const rootPkg = readJsonSafe(path.join(repoRoot, 'package.json'));
    if (typeof rootPkg?.homepage === 'string' && rootPkg.homepage.trim().length > 0) {
      return `${rootPkg.homepage.trim().replace(/\/+$/, '')}/cdn`;
    }
  } catch {
    // Fallback below
  }
  return 'https://alamehan.github.io/mehan-design-system/cdn';
}

function defaultAccentForAtmosphere(atm) {
  switch (atm) {
    case 'confectionery':
      return 'strawberry';
    case 'stone':
      return 'teal';
    case 'butter':
      return 'cobalt';
    case 'matcha':
      return 'matcha';
    case 'cacao':
      return 'cacao';
    case 'periwinkle':
      return 'grape';
    case 'obsidian':
      return 'cobalt';
    case 'porcelain':
    default:
      return 'blueberry';
  }
}

/**
 * Parses a theme JSON exported from Mehan Studio (`{ seed, tokenOverrides, customOverrides }`),
 * a W3C DTCG token file (`{ $metadata }`), or a flat DNA options JSON.
 */
function loadFromJsonSeed() {
  const fromPath = readFlag('--from', null);
  if (!fromPath) return {seed: {}, tokenOverrides: undefined, customOverrides: undefined};
  const resolved = path.resolve(process.cwd(), fromPath);
  if (!fs.existsSync(resolved)) {
    console.error(`❌ Theme JSON file not found: ${resolved}`);
    process.exit(1);
  }
  const raw = readJsonSafe(resolved);
  const src =
    raw && typeof raw === 'object'
      ? raw.seed && typeof raw.seed === 'object'
        ? raw.seed
        : raw.$metadata && typeof raw.$metadata === 'object'
          ? raw.$metadata
          : raw
      : {};
  return {
    seed: src,
    tokenOverrides:
      raw && typeof raw.tokenOverrides === 'object' && raw.tokenOverrides !== null
        ? raw.tokenOverrides
        : undefined,
    customOverrides: Array.isArray(raw?.customOverrides) ? raw.customOverrides : undefined,
  };
}

const COMPONENT_VAR_TO_OVERRIDE = {
  '--button-radius': [
    {component: 'button', cssProperty: 'borderRadius'},
    {component: 'icon-button', cssProperty: 'borderRadius'},
    {component: 'toggle-button', cssProperty: 'borderRadius'},
  ],
  '--card-radius': [
    {component: 'card', cssProperty: 'borderRadius'},
    {component: 'clickable-card', cssProperty: 'borderRadius'},
    {component: 'selectable-card', cssProperty: 'borderRadius'},
  ],
  '--card-padding': [
    {component: 'card', cssProperty: 'padding'},
    {component: 'clickable-card', cssProperty: 'padding'},
  ],
  '--input-radius': [
    {component: 'text-input', cssProperty: '--_field-radius'},
    {component: 'text-area', cssProperty: '--_field-radius'},
    {component: 'number-input', cssProperty: '--_field-radius'},
    {component: 'date-input', cssProperty: '--_field-radius'},
    {component: 'date-range-input', cssProperty: '--_field-radius'},
    {component: 'date-time-input-date-segment', cssProperty: '--_field-radius'},
    {component: 'date-time-input-time-segment', cssProperty: '--_field-radius'},
    {component: 'time-input', cssProperty: '--_field-radius'},
    {component: 'typeahead', cssProperty: '--_field-radius'},
    {component: 'tokenizer', cssProperty: '--_field-radius'},
    {component: 'power-search', cssProperty: '--_field-radius'},
    {component: 'selector', cssProperty: '--_field-radius'},
    {component: 'multi-selector', cssProperty: '--_field-radius'},
    {component: 'file-input', cssProperty: 'borderRadius'},
  ],
  '--banner-radius': [{component: 'banner', cssProperty: 'borderRadius'}],
  '--segmented-control-radius': [
    {component: 'segmented-control', cssProperty: 'borderRadius'},
  ],
  '--segmented-control-padding': [
    {component: 'segmented-control', cssProperty: 'padding'},
  ],
  '--dialog-radius': [
    {component: 'dialog', cssProperty: 'borderRadius'},
    {component: 'alert-dialog', cssProperty: 'borderRadius'},
  ],
  '--dialog-padding': [
    {component: 'dialog', cssProperty: 'padding'},
    {component: 'dialog', cssProperty: '--astryx-dialog-padding'},
    {component: 'alert-dialog', cssProperty: 'padding'},
  ],
  '--dropdown-radius': [
    {component: 'dropdown-menu', cssProperty: 'borderRadius'},
    {component: 'dropdown-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'context-menu', cssProperty: 'borderRadius'},
    {component: 'context-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'more-menu', cssProperty: 'borderRadius'},
    {component: 'more-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'selector-popup', cssProperty: 'borderRadius'},
    {component: 'multi-selector-popup', cssProperty: 'borderRadius'},
    {component: 'complex-selector-popup', cssProperty: 'borderRadius'},
  ],
  '--dropdown-padding': [
    {component: 'dropdown-menu', cssProperty: 'padding'},
    {component: 'dropdown-menu', cssProperty: '--_dropdown-menu-padding'},
    {component: 'context-menu', cssProperty: 'padding'},
    {component: 'context-menu', cssProperty: '--_dropdown-menu-padding'},
    {component: 'more-menu', cssProperty: 'padding'},
    {component: 'more-menu', cssProperty: '--_dropdown-menu-padding'},
  ],
  '--section-padding': [{component: 'section', cssProperty: 'padding'}],
  '--popover-radius': [{component: 'popover', cssProperty: 'borderRadius'}],
  '--hovercard-radius': [{component: 'hover-card', cssProperty: 'borderRadius'}],
  '--composer-radius': [
    {component: 'chat-composer', cssProperty: '--_chat-composer-radius'},
    {component: 'chat-composer', cssProperty: 'borderRadius'},
  ],
  '--composer-padding': [
    {component: 'chat-composer', cssProperty: '--_chat-composer-padding'},
  ],
};

function splitOverridesForTheme(tokenOverrides, customOverrides) {
  const rawTokens = {};
  const components = {};
  if (tokenOverrides && typeof tokenOverrides === 'object') {
    for (const [k, v] of Object.entries(tokenOverrides)) {
      if (!v) continue;
      const mappings = COMPONENT_VAR_TO_OVERRIDE[k];
      if (mappings) {
        for (const {component, cssProperty} of mappings) {
          components[component] ??= {base: {}};
          components[component].base[cssProperty] = String(v);
        }
      } else {
        rawTokens[k] = String(v);
      }
    }
  }
  if (Array.isArray(customOverrides)) {
    for (const item of customOverrides) {
      if (!item || !item.component || !item.property || !item.value) continue;
      components[item.component] ??= {base: {}};
      components[item.component].base[item.property] = String(item.value);
    }
  }
  return {
    rawTokens: Object.keys(rawTokens).length > 0 ? rawTokens : undefined,
    components: Object.keys(components).length > 0 ? components : undefined,
  };
}

function resolveCliSeedOptions() {
  const {seed: fromSeed, tokenOverrides, customOverrides} = loadFromJsonSeed();
  const {rawTokens, components} = splitOverridesForTheme(tokenOverrides, customOverrides);
  const themeFlag = readFlag('--theme', null);
  const atmosphere =
    themeFlag?.replace(/^mehan-/, '') ??
    readFlag('--atmosphere', fromSeed.atmosphere ?? 'porcelain');
  const accent = readFlag(
    '--accent',
    fromSeed.accent ?? defaultAccentForAtmosphere(atmosphere),
  );
  const depth = readNumberFlag('--depth', fromSeed.depth ?? 1);
  const radiusScale = readNumberFlag('--radius', fromSeed.radiusScale ?? 1);
  const radiusBase = readNumberFlag(
    '--radius-base',
    fromSeed.radiusBase !== null && fromSeed.radiusBase !== undefined
      ? Number(fromSeed.radiusBase)
      : undefined,
  );
  const typeBase = readNumberFlag('--type-base', fromSeed.typeBase);
  const typeRatio = readNumberFlag('--type-ratio', fromSeed.typeRatio);
  const sizeBase = readNumberFlag('--size-base', fromSeed.sizeBase);
  const spacingBase = readNumberFlag('--spacing-base', fromSeed.spacingBase);
  const durationStep = readNumberFlag('--duration-step', fromSeed.durationStep);

  const derivedDensity =
    sizeBase !== undefined && sizeBase <= 32 ? 'compact' : 'standard';
  const density = readFlag('--density', fromSeed.density ?? derivedDensity);
  const motion = readFlag('--motion', fromSeed.motion ?? 'expressive');
  const lipStyle = readFlag('--lip', fromSeed.lipStyle ?? 'candy');
  const segmentedStyle = readFlag('--segmented', fromSeed.segmentedStyle ?? 'raised');
  const wellStyle = readFlag('--well', fromSeed.wellStyle ?? 'recessed');
  const headingFont = readFlag(
    '--heading-font',
    fromSeed.headingFont ?? fromSeed.displayFamily ?? 'Bricolage Grotesque',
  );
  const bodyFont = readFlag(
    '--body-font',
    fromSeed.bodyFont ?? fromSeed.bodyFamily ?? 'Figtree',
  );
  const codeFont = readFlag(
    '--code-font',
    fromSeed.codeFont ?? fromSeed.monoFamily ?? 'Geist Mono',
  );

  const dnaOptions = {
    atmosphere,
    accent,
    depth,
    radiusScale,
    ...(radiusBase !== undefined ? {radiusBase} : {}),
    ...(typeBase !== undefined ? {typeBase} : {}),
    ...(typeRatio !== undefined ? {typeRatio} : {}),
    ...(sizeBase !== undefined ? {sizeBase} : {}),
    ...(spacingBase !== undefined ? {spacingBase} : {}),
    ...(durationStep !== undefined ? {durationStep} : {}),
    density,
    motion,
    lipStyle,
    segmentedStyle,
    wellStyle,
    headingFont,
    bodyFont,
    codeFont,
  };

  return {dnaOptions, tokenOverrides: rawTokens, components};
}

if (cmd === 'ai-kit') {
  const {dnaOptions, tokenOverrides, components} = resolveCliSeedOptions();
  const out = readFlag('--out', null);
  const isOffline = args.includes('--offline');
  const {generateAiPrototypeKit, generateOfflineAiPrototypeKit} = await import(
    new URL('../packages/portable/dist/index.js', import.meta.url).href
  );
  const kit = isOffline
    ? generateOfflineAiPrototypeKit(dnaOptions)
    : generateAiPrototypeKit({
        ...dnaOptions,
        tokens: tokenOverrides,
        components,
        cdnBaseUrl: readHomepageCdnUrl(),
        runtimePrefix: readCurrentScope().slice(1),
      });
  if (out) {
    const dest = path.resolve(process.cwd(), out);
    fs.writeFileSync(dest, kit, 'utf8');
    console.log(
      `✅ Wrote Mehan ${isOffline ? 'Offline CSS ' : ''}AI Prototype Kit to ${dest}`,
    );
  } else {
    process.stdout.write(kit);
  }
  process.exit(0);
}

if (cmd === 'tokens') {
  const {dnaOptions} = resolveCliSeedOptions();
  const out = readFlag('--out', 'mehan-tokens.w3c.json');
  const {exportW3cDesignTokens} = await import(
    new URL('../packages/portable/dist/index.js', import.meta.url).href
  );
  const json = `${JSON.stringify(
    exportW3cDesignTokens({
      name: `mehan-${dnaOptions.atmosphere}`,
      ...dnaOptions,
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

  const prevBare = prevScope.slice(1);
  const nextBare = nextScope.slice(1);

  const textExts = new Set(['.json', '.ts', '.tsx', '.mjs', '.md', '.css']);
  const skipDirs = new Set([
    'node_modules',
    'dist',
    'dist-single',
    'release',
    '.git',
    '.github',
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
          .replaceAll(`${prevScope}/studio`, `${nextScope}/studio`)
          .replaceAll(`${prevBare}-astryx-`, `${nextBare}-astryx-`)
          .replaceAll(`${prevBare}-dna-`, `${nextBare}-dna-`)
          .replaceAll(`${prevBare}-portable-`, `${nextBare}-portable-`);
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
  const positional = [];
  for (let i = 1; i < args.length; i += 1) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      if (
        arg !== '--tailwind' &&
        arg !== '--github' &&
        arg !== '--local' &&
        arg !== '--npm' &&
        arg !== '--portable'
      ) {
        i += 1; // skip value of value-taking flag (e.g. `--from theme.json`)
      }
    } else {
      positional.push(arg);
    }
  }
  const targetDir = path.resolve(process.cwd(), positional[0] ?? '.');
  const {dnaOptions, tokenOverrides, components} = resolveCliSeedOptions();
  const {
    atmosphere,
    accent,
    depth,
    radiusScale,
    radiusBase,
    typeBase,
    typeRatio,
    sizeBase,
    spacingBase,
    durationStep,
    density,
    motion,
    lipStyle,
    segmentedStyle,
    wellStyle,
    headingFont,
    bodyFont,
    codeFont,
  } = dnaOptions;

  const forcePortable = args.includes('--portable');
  const preferGithub = args.includes('--github');
  const preferNpm = args.includes('--npm');
  const scope = readCurrentScope();
  const githubRepoUrl = readGithubRepoUrl();

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
        ...dnaOptions,
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
  const hasExtraScaleOverrides =
    radiusBase !== undefined ||
    (typeBase !== undefined && typeBase !== 14) ||
    (typeRatio !== undefined && typeRatio !== 1.22) ||
    (sizeBase !== undefined && sizeBase !== 36) ||
    (spacingBase !== undefined && spacingBase !== 4) ||
    (durationStep !== undefined && durationStep !== 1) ||
    (tokenOverrides && Object.keys(tokenOverrides).length > 0) ||
    (components && Object.keys(components).length > 0);

  const isDefaultPreset =
    (atmosphere === 'confectionery' ||
      atmosphere === 'porcelain' ||
      atmosphere === 'stone') &&
    !hasExtraScaleOverrides &&
    accent === defaultAccentForAtmosphere(atmosphere) &&
    depth === 1 &&
    radiusScale === 1 &&
    density === 'standard' &&
    motion === 'expressive' &&
    lipStyle === 'candy' &&
    segmentedStyle === 'raised' &&
    wellStyle === 'recessed' &&
    headingFont === 'Bricolage Grotesque' &&
    bodyFont === 'Figtree' &&
    codeFont === 'Geist Mono';

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

  const extraOptionLines = [
    radiusBase !== undefined ? `  radiusBase: ${radiusBase},` : null,
    typeBase !== undefined ? `  typeBase: ${typeBase},` : null,
    typeRatio !== undefined ? `  typeRatio: ${typeRatio},` : null,
    sizeBase !== undefined ? `  sizeBase: ${sizeBase},` : null,
    spacingBase !== undefined ? `  spacingBase: ${spacingBase},` : null,
    durationStep !== undefined ? `  durationStep: ${durationStep},` : null,
    tokenOverrides && Object.keys(tokenOverrides).length > 0
      ? `  tokens: ${JSON.stringify(tokenOverrides, null, 2).replaceAll('\n', '\n  ')},`
      : null,
    components && Object.keys(components).length > 0
      ? `  components: ${JSON.stringify(components, null, 2).replaceAll('\n', '\n  ')},`
      : null,
  ].filter(Boolean);

  const providerPath = path.join(srcDir, 'MehanProvider.tsx');
  const providerSource = isDefaultPreset
    ? `'use client';

import React from 'react';
import './mehan.css';
import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {${camel}} from '${scope}/astryx/themes/${slug}';

/** Optional SSR / Next.js <head> inline script to prevent dark-mode flash on load. */
export const MEHAN_THEME_INIT_SCRIPT = \`(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();\`;

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
${extraOptionLines.length > 0 ? `${extraOptionLines.join('\n')}\n` : ''}  density: '${density}',
  motion: '${motion}',
  lipStyle: '${lipStyle}',
  segmentedStyle: '${segmentedStyle}',
  wellStyle: '${wellStyle}',
  headingFont: '${headingFont}',
  bodyFont: '${bodyFont}',
  codeFont: '${codeFont}',
});

/** Optional SSR / Next.js <head> inline script to prevent dark-mode flash on load. */
export const MEHAN_THEME_INIT_SCRIPT = \`(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();\`;

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
  const astryxTgz =
    releaseFiles.find(f => f.includes('-astryx-')) ?? releaseFiles[0];
  const localTgz = astryxTgz
    ? path
        .join(repoRoot, 'release', astryxTgz)
        .replaceAll('\\', '/')
    : null;
  const githubTgz = `${githubRepoUrl}/raw/main/release/${astryxTgz ?? 'mehan-astryx-1.0.0.tgz'}`;
  const pkgSpec = preferNpm
    ? `${scope}/astryx`
    : preferGithub || !localTgz
      ? `"${githubTgz}"`
      : `"${localTgz}"`;

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
  • node bin/mehan.mjs init <project-folder> [--from theme.json] [--atmosphere porcelain|confectionery|stone] [--accent blueberry|#hex] [--lip candy|subtle|flat] [--segmented raised|espresso] [--well recessed|bordered] [--density standard|compact] [--motion expressive|standard|crisp|calm] [--type-base 14] [--type-ratio 1.22] [--size-base 36] [--spacing-base 4] [--radius-base 8] [--duration-step 1] [--tailwind] [--github|--local|--npm] [--portable]
  • node bin/mehan.mjs ai-kit [--from theme.json] [--atmosphere porcelain|confectionery|stone] [--accent blueberry|#hex] [--offline] [--out kit.md]
  • node bin/mehan.mjs tokens [--from theme.json] [--atmosphere porcelain] [--accent blueberry] [--out mehan-tokens.w3c.json]
  • node bin/mehan.mjs set-scope @yourscope
`);
