import {
  isPresetAccent,
  type MehanAtmosphereId,
  type MehanDensity,
  type MehanMotion,
  type MehanPresetAccentId,
} from '@mehan/astryx/dna';

export type StudioLang = 'id' | 'en';
export type InstallSourceMode = 'local' | 'npm';
export type InstallCssMode = 'plain' | 'tailwind';

export interface StudioConfig {
  atmosphere: MehanAtmosphereId;
  accent: MehanPresetAccentId | string;
  depth: number;
  radiusScale: number;
  density: MehanDensity;
  motion: MehanMotion;
}

export interface NamedStudioPreset {
  id: string;
  name: string;
  config: StudioConfig;
}

export const DEFAULT_STUDIO_CONFIG: StudioConfig = {
  atmosphere: 'confectionery',
  accent: 'strawberry',
  depth: 1,
  radiusScale: 1,
  density: 'standard',
  motion: 'expressive',
};

const STORAGE_KEY = 'mehan-studio-state-v1';

interface PersistedStudioState {
  lang?: StudioLang;
  mode?: 'light' | 'dark';
  config?: Partial<StudioConfig>;
  presets?: NamedStudioPreset[];
}

export function loadPersistedStudioState(): {
  lang: StudioLang;
  mode: 'light' | 'dark';
  config: StudioConfig;
  presets: NamedStudioPreset[];
} {
  const defaultPresets: NamedStudioPreset[] = [
    {
      id: 'preset-confectionery',
      name: 'Confectionery Default',
      config: DEFAULT_STUDIO_CONFIG,
    },
    {
      id: 'preset-porcelain-saas',
      name: 'Porcelain SaaS',
      config: {
        atmosphere: 'porcelain',
        accent: 'blueberry',
        depth: 0.95,
        radiusScale: 0.95,
        density: 'compact',
        motion: 'standard',
      },
    },
    {
      id: 'preset-stone-editorial',
      name: 'Stone Calm',
      config: {
        atmosphere: 'stone',
        accent: 'teal',
        depth: 0.9,
        radiusScale: 1,
        density: 'standard',
        motion: 'calm',
      },
    },
  ];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        lang: 'id',
        mode: 'light',
        config: DEFAULT_STUDIO_CONFIG,
        presets: defaultPresets,
      };
    }
    const parsed = JSON.parse(raw) as PersistedStudioState;
    const cfg = parsed.config ?? {};
    return {
      lang: parsed.lang === 'en' ? 'en' : 'id',
      mode: parsed.mode === 'dark' ? 'dark' : 'light',
      config: {
        atmosphere:
          cfg.atmosphere === 'porcelain' || cfg.atmosphere === 'stone'
            ? cfg.atmosphere
            : 'confectionery',
        accent: typeof cfg.accent === 'string' && cfg.accent ? cfg.accent : 'strawberry',
        depth: typeof cfg.depth === 'number' ? cfg.depth : 1,
        radiusScale: typeof cfg.radiusScale === 'number' ? cfg.radiusScale : 1,
        density: cfg.density === 'compact' ? 'compact' : 'standard',
        motion:
          cfg.motion === 'calm' || cfg.motion === 'standard'
            ? cfg.motion
            : 'expressive',
      },
      presets:
        Array.isArray(parsed.presets) && parsed.presets.length > 0
          ? parsed.presets
          : defaultPresets,
    };
  } catch {
    return {
      lang: 'id',
      mode: 'light',
      config: DEFAULT_STUDIO_CONFIG,
      presets: defaultPresets,
    };
  }
}

export function savePersistedStudioState(state: {
  lang: StudioLang;
  mode: 'light' | 'dark';
  config: StudioConfig;
  presets: NamedStudioPreset[];
}): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or sandboxed file:// restrictions
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback for file:// environments
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  return ok;
}

export function downloadTextFile(
  filename: string,
  content: string,
  mime = 'text/plain',
): void {
  const blob = new Blob([content], {type: `${mime};charset=utf-8`});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function isDefaultPresetConfig(cfg: StudioConfig): boolean {
  const expectedAccent =
    cfg.atmosphere === 'porcelain'
      ? 'blueberry'
      : cfg.atmosphere === 'stone'
        ? 'tangerine'
        : 'strawberry';
  return (
    cfg.accent === expectedAccent &&
    cfg.depth === 1 &&
    cfg.radiusScale === 1 &&
    cfg.density === 'standard' &&
    cfg.motion === 'expressive'
  );
}

export function buildReactInstallSnippet(
  cfg: StudioConfig,
  sourceMode: InstallSourceMode,
  cssMode: InstallCssMode,
  mode: 'light' | 'dark',
): {installCmd: string; cssCode: string; tsxCode: string} {
  const pkgTarget =
    sourceMode === 'local'
      ? '"D:/mehan-design-system/release/mehan-astryx-1.0.0.tgz"'
      : '@mehan/astryx';
  const twFlag = cssMode === 'tailwind' ? ' --tailwind' : '';
  const srcFlag = sourceMode === 'local' ? ' --local' : ' --npm';
  const installCmd = [
    `# Option 1 — One-command auto-setup (detects React/Next/Vite & Tailwind):`,
    `node "D:/mehan-design-system/bin/mehan.mjs" init . --atmosphere ${cfg.atmosphere} --accent "${cfg.accent}" --density ${cfg.density} --motion ${cfg.motion}${twFlag}${srcFlag}`,
    ``,
    `# Option 2 — Install packages directly:`,
    `pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgTarget}`,
    `pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents`,
  ].join('\n');

  const isPreset = isDefaultPresetConfig(cfg);
  const slug = `mehan-${cfg.atmosphere}`;
  const camel = `${slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())}Theme`;

  const cssCode =
    cssMode === 'tailwind'
      ? [
          `/* src/mehan.css — Tailwind CSS v4 + Meta Astryx + Mehan Layer Bridge */`,
          `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;`,
          `@import "@astryxdesign/core/reset.css";`,
          `@import "tailwindcss";`,
          `@import "@astryxdesign/core/astryx.css";`,
          `@import "@astryxdesign/core/tailwind-theme.css";`,
          `@import "@mehan/astryx/fonts.css";`,
          ...(isPreset ? [`@import "@mehan/astryx/themes/${slug}.css";`] : []),
          `@import "@mehan/astryx/styles.css";`,
        ].join('\n')
      : [
          `/* src/mehan.css — Standard CSS Cascade */`,
          `@import "@astryxdesign/core/reset.css";`,
          `@import "@astryxdesign/core/astryx.css";`,
          `@import "@mehan/astryx/fonts.css";`,
          ...(isPreset ? [`@import "@mehan/astryx/themes/${slug}.css";`] : []),
          `@import "@mehan/astryx/styles.css";`,
        ].join('\n');

  const accentLiteral = isPresetAccent(cfg.accent)
    ? `'${cfg.accent}'`
    : `'${cfg.accent}'`;

  const tsxCode = isPreset
    ? `'use client';

import './mehan.css';
import {LayerProvider, Button, Card, Heading, Stack, TextInput} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {${camel}} from '@mehan/astryx/themes/${slug}';

export function App() {
  return (
    <Theme theme={${camel}} mode="${mode}">
      <LayerProvider>
        <Card maxWidth={480}>
          <Stack gap={4}>
            <Heading level={2}>Workspace settings</Heading>
            <TextInput label="Project name" value="Acme Studio" onChange={() => {}} />
            <Button variant="primary" label="Save changes" />
          </Stack>
        </Card>
      </LayerProvider>
    </Theme>
  );
}`
    : `'use client';

import './mehan.css';
import {LayerProvider, Button, Card, Heading, Stack, TextInput} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {createMehanTheme} from '@mehan/astryx/dna';

const appTheme = createMehanTheme({
  name: 'app-${cfg.atmosphere}',
  atmosphere: '${cfg.atmosphere}',
  accent: ${accentLiteral},
  depth: ${cfg.depth},
  radiusScale: ${cfg.radiusScale},
  density: '${cfg.density}',
  motion: '${cfg.motion}',
});

export function App() {
  return (
    <Theme theme={appTheme} mode="${mode}">
      <LayerProvider>
        <Card maxWidth={480}>
          <Stack gap={4}>
            <Heading level={2}>Workspace settings</Heading>
            <TextInput label="Project name" value="Acme Studio" onChange={() => {}} />
            <Button variant="primary" label="Save changes" />
          </Stack>
        </Card>
      </LayerProvider>
    </Theme>
  );
}`;

  return {installCmd, cssCode, tsxCode};
}

export function buildAgentSetupPrompt(
  cfg: StudioConfig,
  sourceMode: InstallSourceMode,
  cssMode: InstallCssMode,
): string {
  const pkgTarget =
    sourceMode === 'local'
      ? `"D:/mehan-design-system/release/mehan-astryx-1.0.0.tgz"`
      : `@mehan/astryx`;
  return `Set up Mehan Design System (powered by Meta Astryx ~0.7.17) in this repository with these exact settings:
- Atmosphere: ${cfg.atmosphere}
- Accent: ${cfg.accent}
- Depth: ${cfg.depth}
- Radius scale: ${cfg.radiusScale}
- Density: ${cfg.density}
- Motion: ${cfg.motion}
- CSS stack: ${cssMode === 'tailwind' ? 'Tailwind CSS v4 (@layer bridge + @astryxdesign/core/tailwind-theme.css)' : 'Plain CSS'}

Steps to execute:
1. Run \`node "D:/mehan-design-system/bin/mehan.mjs" init . --atmosphere ${cfg.atmosphere} --accent "${cfg.accent}" --depth ${cfg.depth} --radius ${cfg.radiusScale} --density ${cfg.density} --motion ${cfg.motion}${cssMode === 'tailwind' ? ' --tailwind' : ''}${sourceMode === 'local' ? ' --local' : ' --npm'}\` (or install \`@astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgTarget}\` and dev dependency \`@astryxdesign/cli@~0.7.17\`).
2. Run \`pnpm exec astryx init --features agents\` so Astryx + Mehan UX & Copywriting docs are indexed for AI agents.
3. Wrap the root application in \`<MehanProvider>\` (and include \`MEHAN_THEME_INIT_SCRIPT\` in \`<head>\` if using Next.js / SSR to prevent dark-mode FOUC).
4. Read \`pnpm exec astryx docs mehan-design-rules\`, \`mehan-ux-complexity\`, and \`mehan-copy-and-states\` before building UI screens.`;
}

export function buildThemeCommitPrompt(cfg: StudioConfig): string {
  return `Inside D:\\mehan-design-system, update the default studio/preset theme configuration to match my customized settings:
- atmosphere: '${cfg.atmosphere}'
- accent: '${cfg.accent}'
- depth: ${cfg.depth}
- radiusScale: ${cfg.radiusScale}
- density: '${cfg.density}'
- motion: '${cfg.motion}'

Then run \`pnpm verify\` so all packages, \`release/mehan-astryx-1.0.0.tgz\`, \`release/mehan-tokens.w3c.json\`, and \`STUDIO.html\` are rebuilt and verified across all 6 quality gates (0 errors, 0 warnings, 0 axe contrast violations).`;
}

export function buildAstryxUpgradePrompt(): string {
  return `Inside D:\\mehan-design-system, check if a newer version of @astryxdesign/core and @astryxdesign/cli is available on npm:
1. Inspect the changelog and new \`astryx theme targets\` in a clean branch.
2. Bump \`@astryxdesign/core\`, \`@astryxdesign/cli\`, \`@astryxdesign/build\`, and \`@astryxdesign/theme-neutral\` in root \`package.json\`, \`packages/astryx/package.json\`, and \`apps/studio/package.json\`.
3. Run \`pnpm install && pnpm verify\` (including \`astryx integration check --strict --next\`, \`astryx integration verify\`, Vitest optical depth, and Playwright + axe contrast gates).
4. Only keep the upgrade if all 6 gates pass with 0 errors and 0 visual regressions; then rebuild \`release/\` and \`STUDIO.html\`.`;
}

export function buildScopeSwitchPrompt(targetScope: string): string {
  const clean = targetScope.startsWith('@') ? targetScope : `@${targetScope}`;
  return `Inside D:\\mehan-design-system, switch the npm package scope to \`${clean}\`:
1. Run \`node bin/mehan.mjs set-scope ${clean}\`.
2. Run \`pnpm install && pnpm verify\` so all manifests, imports, \`release/\` tarballs, and \`STUDIO.html\` are rebuilt and verified cleanly.`;
}
