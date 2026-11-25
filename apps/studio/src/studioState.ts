import {copyTextSafe} from '@mehan/astryx';
import {isMehanAtmosphereId, isPresetAccent} from '@mehan/astryx/dna';
import {
  DEFAULT_SEED_CONFIG,
  SHOTCANDY_AUTHENTIC_SEED,
  type FullThemeEditorState,
  type StudioSeedConfig,
} from './theme-editor/themeEditorModel';

export type StudioLang = 'id' | 'en';
export type InstallSourceMode = 'github' | 'local' | 'npm';
export type InstallCssMode = 'plain' | 'tailwind';

export const GITHUB_REPO_URL = 'https://github.com/alamehan/mehan-design-system';
export const GITHUB_ASTRYX_TGZ = `${GITHUB_REPO_URL}/raw/main/release/mehan-astryx-1.0.0.tgz`;

export interface NamedStudioPreset {
  id: string;
  name: string;
  badge?: string;
  taglineEn?: string;
  taglineId?: string;
  state: FullThemeEditorState;
}

export const DEFAULT_EDITOR_STATE: FullThemeEditorState = {
  seed: {...DEFAULT_SEED_CONFIG},
  tokenOverrides: {},
  customOverrides: [],
};

const STORAGE_KEY = 'mehan-studio-state-v3';

interface PersistedStudioState {
  lang?: StudioLang;
  mode?: 'light' | 'dark';
  editorOpen?: boolean;
  themeState?: Partial<FullThemeEditorState>;
  presets?: NamedStudioPreset[];
}

export function getBuiltInPresets(): NamedStudioPreset[] {
  return [
    {
      id: 'preset-porcelain',
      name: 'Porcelain SaaS',
      badge: 'Signature Default',
      taglineEn: 'Crisp porcelain white, classic blue 3D buttons, and Bricolage Grotesque + Figtree type.',
      taglineId: 'Putih porselen jernih, tombol 3D biru tegas, dan huruf Bricolage Grotesque + Figtree.',
      state: {
        seed: {...DEFAULT_SEED_CONFIG},
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-confectionery',
      name: 'Confectionery',
      badge: 'Warm Creative',
      taglineEn: 'Warm cream paper with friendly berry-pink 3D buttons and soft recessed inputs.',
      taglineId: 'Krem hangat dengan tombol 3D merah beri yang empuk dan kolom input lembut.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'confectionery',
          accent: 'strawberry',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-shotcandy',
      name: 'Espresso Berry',
      badge: 'Tactile Compact',
      taglineEn: 'Compact 32px sizing, bold espresso active tabs, and lively button spring.',
      taglineId: 'Ukuran ringkas 32px dengan tab gelap tegas dan pantulan tombol yang responsif.',
      state: {
        seed: {...SHOTCANDY_AUTHENTIC_SEED},
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-butter',
      name: 'Sunlit Butter',
      badge: 'Warm & Bright',
      taglineEn: 'Sunny buttercream surfaces paired with crisp cobalt buttons and clean Outfit type.',
      taglineId: 'Permukaan krim cerah berpadu tombol biru kobalt segar dan huruf Outfit yang rapi.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'butter',
          accent: 'cobalt',
          radiusScale: 1.15,
          headingFont: 'Outfit',
          bodyFont: 'Outfit',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-matcha',
      name: 'Kyoto Matcha',
      badge: 'Calm & Organic',
      taglineEn: 'Soft sage-tea paper and deep moss dark mode built for calm focus.',
      taglineId: 'Hijau teh yang teduh dan mode gelap lumut hutan untuk ruang kerja yang tenang.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'matcha',
          accent: 'matcha',
          lipStyle: 'subtle',
          motion: 'calm',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-cacao',
      name: 'Artisanal Cacao',
      badge: 'Editorial Serif',
      taglineEn: 'Warm oat-latte canvas, roasted cacao accents, and expressive Fraunces headings.',
      taglineId: 'Nuansa kopi susu hangat, aksen cokelat panggang, dan judul serif Fraunces.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'cacao',
          accent: 'cacao',
          headingFont: 'Fraunces',
          bodyFont: 'Albert Sans',
          segmentedStyle: 'espresso',
          lipStyle: 'subtle',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-periwinkle',
      name: 'Cloud Y2K Pop',
      badge: 'Playful & Soft',
      taglineEn: 'Airy lavender-ice surfaces, playful grape accents, and rounded Poppins type.',
      taglineId: 'Permukaan ungu muda segar, aksen anggur ceria, dan huruf bulat Poppins.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'periwinkle',
          accent: 'grape',
          radiusScale: 1.35,
          headingFont: 'Poppins',
          bodyFont: 'Poppins',
          motion: 'expressive',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-obsidian',
      name: 'Obsidian Linear',
      badge: 'Sleek Engineering',
      taglineEn: 'Titanium mist and carbon black with crisp corners and JetBrains Mono.',
      taglineId: 'Abu titanium & hitam karbon bersudut tegas untuk aplikasi teknis modern.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'obsidian',
          accent: '#4f46e5',
          radiusScale: 0.8,
          sizeBase: 36,
          headingFont: 'Albert Sans',
          bodyFont: 'Albert Sans',
          codeFont: 'JetBrains Mono',
          lipStyle: 'subtle',
          wellStyle: 'bordered',
          motion: 'crisp',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-stone',
      name: 'Stone Editorial',
      badge: 'Quiet Workspace',
      taglineEn: 'Warm sandstone surfaces and calm teal built for reading, notes, and AI tools.',
      taglineId: 'Batu pasir hangat dan hijau toska tenang untuk ruang baca, catatan, & aplikasi AI.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'stone',
          accent: 'teal',
          depth: 0.9,
          headingFont: 'Fraunces',
          bodyFont: 'Figtree',
          lipStyle: 'subtle',
          motion: 'calm',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-solar',
      name: 'Solar Citrus',
      badge: 'Creative Studio',
      taglineEn: 'Golden warmth paired with vibrant tangerine accents for lively consumer apps.',
      taglineId: 'Kuning hangat berpadu oranye segar yang penuh energi untuk aplikasi kreatif.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'butter',
          accent: 'tangerine',
          radiusScale: 1.1,
          headingFont: 'Bricolage Grotesque',
          bodyFont: 'Outfit',
          segmentedStyle: 'espresso',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-nordic',
      name: 'Nordic Fjord',
      badge: 'Crisp Analytics',
      taglineEn: 'High-clarity porcelain, cool fjord teal, and confident Montserrat headings.',
      taglineId: 'Tampilan jernih beraksen biru-hijau tegas untuk produk finansial & analitik.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'porcelain',
          accent: 'teal',
          radiusScale: 0.9,
          headingFont: 'Montserrat',
          bodyFont: 'Figtree',
          lipStyle: 'subtle',
          motion: 'standard',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
    {
      id: 'preset-crimson',
      name: 'Velvet Crimson',
      badge: 'Bold Culture',
      taglineEn: 'Soft alabaster stone paired with rich ruby buttons and literary serif titles.',
      taglineId: 'Kontras batu alabaster lembut dan tombol merah rubi yang berani namun elegan.',
      state: {
        seed: {
          ...DEFAULT_SEED_CONFIG,
          atmosphere: 'stone',
          accent: 'crimson',
          typeBase: 14.5,
          headingFont: 'Fraunces',
          bodyFont: 'Figtree',
          segmentedStyle: 'espresso',
        },
        tokenOverrides: {},
        customOverrides: [],
      },
    },
  ];
}

function sanitizeSeed(raw?: Partial<StudioSeedConfig>): StudioSeedConfig {
  if (!raw) return {...DEFAULT_SEED_CONFIG};
  return {
    atmosphere: isMehanAtmosphereId(raw.atmosphere)
      ? raw.atmosphere
      : 'porcelain',
    accent: typeof raw.accent === 'string' && raw.accent ? raw.accent : 'blueberry',
    depth: typeof raw.depth === 'number' ? raw.depth : DEFAULT_SEED_CONFIG.depth,
    radiusScale:
      typeof raw.radiusScale === 'number'
        ? raw.radiusScale
        : DEFAULT_SEED_CONFIG.radiusScale,
    radiusBase:
      typeof raw.radiusBase === 'number' && Number.isFinite(raw.radiusBase)
        ? raw.radiusBase
        : null,
    spacingBase:
      typeof raw.spacingBase === 'number'
        ? raw.spacingBase
        : DEFAULT_SEED_CONFIG.spacingBase,
    sizeBase:
      typeof raw.sizeBase === 'number' ? raw.sizeBase : DEFAULT_SEED_CONFIG.sizeBase,
    typeBase:
      typeof raw.typeBase === 'number' ? raw.typeBase : DEFAULT_SEED_CONFIG.typeBase,
    typeRatio:
      typeof raw.typeRatio === 'number'
        ? raw.typeRatio
        : DEFAULT_SEED_CONFIG.typeRatio,
    headingFont:
      typeof raw.headingFont === 'string' && raw.headingFont
        ? raw.headingFont
        : DEFAULT_SEED_CONFIG.headingFont,
    bodyFont:
      typeof raw.bodyFont === 'string' && raw.bodyFont
        ? raw.bodyFont
        : DEFAULT_SEED_CONFIG.bodyFont,
    codeFont:
      typeof raw.codeFont === 'string' && raw.codeFont
        ? raw.codeFont
        : DEFAULT_SEED_CONFIG.codeFont,
    motion:
      raw.motion === 'calm' || raw.motion === 'standard' || raw.motion === 'crisp'
        ? raw.motion
        : 'expressive',
    durationStep:
      typeof raw.durationStep === 'number'
        ? raw.durationStep
        : DEFAULT_SEED_CONFIG.durationStep,
    lipStyle:
      raw.lipStyle === 'subtle' || raw.lipStyle === 'flat' ? raw.lipStyle : 'candy',
    segmentedStyle: raw.segmentedStyle === 'espresso' ? 'espresso' : 'raised',
    wellStyle: raw.wellStyle === 'bordered' ? 'bordered' : 'recessed',
  };
}

export function loadPersistedStudioState(): {
  lang: StudioLang;
  mode: 'light' | 'dark';
  editorOpen: boolean;
  themeState: FullThemeEditorState;
  presets: NamedStudioPreset[];
} {
  const defaultPresets = getBuiltInPresets();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        lang: 'id',
        mode: 'light',
        editorOpen: false,
        themeState: DEFAULT_EDITOR_STATE,
        presets: defaultPresets,
      };
    }
    const parsed = JSON.parse(raw) as PersistedStudioState;
    const ts = parsed.themeState ?? {};
    return {
      lang: parsed.lang === 'en' ? 'en' : 'id',
      mode: parsed.mode === 'dark' ? 'dark' : 'light',
      editorOpen: Boolean(parsed.editorOpen),
      themeState: {
        seed: sanitizeSeed(ts.seed),
        tokenOverrides:
          ts.tokenOverrides && typeof ts.tokenOverrides === 'object'
            ? (ts.tokenOverrides as Record<string, string>)
            : {},
        customOverrides: Array.isArray(ts.customOverrides)
          ? ts.customOverrides
          : [],
      },
      presets: [
        ...defaultPresets,
        ...(Array.isArray(parsed.presets)
          ? parsed.presets.filter(
              p => p && !defaultPresets.some(b => b.id === p.id),
            )
          : []),
      ],
    };
  } catch {
    return {
      lang: 'id',
      mode: 'light',
      editorOpen: false,
      themeState: DEFAULT_EDITOR_STATE,
      presets: defaultPresets,
    };
  }
}

export function savePersistedStudioState(state: {
  lang: StudioLang;
  mode: 'light' | 'dark';
  editorOpen: boolean;
  themeState: FullThemeEditorState;
  presets: NamedStudioPreset[];
}): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or sandboxed file:// restrictions
  }
}

export async function copyText(text: string): Promise<boolean> {
  return copyTextSafe(text);
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

export function isDefaultPresetState(state: FullThemeEditorState): boolean {
  const {seed, tokenOverrides, customOverrides} = state;
  if (Object.keys(tokenOverrides).length > 0 || customOverrides.length > 0) {
    return false;
  }
  if (
    seed.atmosphere !== 'confectionery' &&
    seed.atmosphere !== 'porcelain' &&
    seed.atmosphere !== 'stone'
  ) {
    return false;
  }
  const expectedAccent =
    seed.atmosphere === 'porcelain'
      ? 'blueberry'
      : seed.atmosphere === 'stone'
        ? 'teal'
        : 'strawberry';
  return (
    seed.accent === expectedAccent &&
    seed.depth === 1 &&
    seed.radiusScale === 1 &&
    seed.radiusBase === null &&
    seed.spacingBase === 4 &&
    seed.sizeBase === 36 &&
    seed.typeBase === 14 &&
    seed.typeRatio === 1.22 &&
    seed.headingFont === 'Bricolage Grotesque' &&
    seed.bodyFont === 'Figtree' &&
    seed.codeFont === 'Geist Mono' &&
    seed.motion === 'expressive' &&
    seed.durationStep === 1 &&
    seed.lipStyle === 'candy' &&
    seed.segmentedStyle === 'raised' &&
    seed.wellStyle === 'recessed'
  );
}

export function buildReactInstallSnippet(
  state: FullThemeEditorState,
  sourceMode: InstallSourceMode,
  cssMode: InstallCssMode,
  mode: 'light' | 'dark',
  exportedThemeTs: string,
): {installCmd: string; cssCode: string; tsxCode: string} {
  const {seed} = state;
  const density = seed.sizeBase <= 32 ? 'compact' : 'standard';
  const pkgTarget =
    sourceMode === 'github'
      ? `"${GITHUB_ASTRYX_TGZ}"`
      : sourceMode === 'local'
        ? '"../mehan-design-system/release/mehan-astryx-1.0.0.tgz"'
        : '@mehan/astryx';
  const twFlag = cssMode === 'tailwind' ? ' --tailwind' : '';
  const srcFlag =
    sourceMode === 'github'
      ? ' --github'
      : sourceMode === 'local'
        ? ' --local'
        : ' --npm';
  const fontFlags = [
    seed.headingFont !== 'Bricolage Grotesque'
      ? ` --heading-font "${seed.headingFont}"`
      : '',
    seed.bodyFont !== 'Figtree' ? ` --body-font "${seed.bodyFont}"` : '',
    seed.codeFont !== 'Geist Mono' ? ` --code-font "${seed.codeFont}"` : '',
  ].join('');
  const scaleFlags = [
    seed.depth !== 1 ? ` --depth ${seed.depth}` : '',
    seed.radiusBase !== null
      ? ` --radius-base ${seed.radiusBase}`
      : seed.radiusScale !== 1
        ? ` --radius ${seed.radiusScale}`
        : '',
    seed.typeBase !== 14 ? ` --type-base ${seed.typeBase}` : '',
    seed.typeRatio !== 1.22 ? ` --type-ratio ${seed.typeRatio}` : '',
    seed.sizeBase !== 36 ? ` --size-base ${seed.sizeBase}` : '',
    seed.spacingBase !== 4 ? ` --spacing-base ${seed.spacingBase}` : '',
    seed.durationStep !== 1 ? ` --duration-step ${seed.durationStep}` : '',
  ].join('');
  const tactileFlags = ` --lip ${seed.lipStyle} --segmented ${seed.segmentedStyle} --well ${seed.wellStyle}`;
  const cliInitArgs = `init . --atmosphere ${seed.atmosphere} --accent "${seed.accent}" --density ${density} --motion ${seed.motion}${tactileFlags}${scaleFlags}${fontFlags}${twFlag}${srcFlag}`;
  const installCmd =
    sourceMode === 'github'
      ? [
          `# Option 1 — Install directly from GitHub release tarball (no local clone needed):`,
          `pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgTarget}`,
          `pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents`,
          ``,
          `# Option 2 — Clone repo & auto-scaffold MehanProvider.tsx + mehan.css (or pass --from mehan-${seed.atmosphere}-theme.json):`,
          `git clone --depth 1 ${GITHUB_REPO_URL}.git ../mehan-design-system`,
          `node "../mehan-design-system/bin/mehan.mjs" ${cliInitArgs}`,
        ].join('\n')
      : [
          `# Option 1 — Auto-scaffold from a local clone (or pass --from mehan-${seed.atmosphere}-theme.json):`,
          `node "../mehan-design-system/bin/mehan.mjs" ${cliInitArgs}`,
          ``,
          `# Option 2 — Install packages directly:`,
          `pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgTarget}`,
          `pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents`,
        ].join('\n');

  const isPreset = isDefaultPresetState(state);
  const slug = `mehan-${seed.atmosphere}`;
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
    : `${exportedThemeTs}

// src/App.tsx
import './mehan.css';
import {LayerProvider, Button, Card, Heading, Stack, TextInput} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';

export function App() {
  return (
    <Theme theme={customMehanTheme} mode="${mode}">
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
  state: FullThemeEditorState,
  sourceMode: InstallSourceMode,
  cssMode: InstallCssMode,
): string {
  const {seed} = state;
  const density = seed.sizeBase <= 32 ? 'compact' : 'standard';
  const pkgTarget =
    sourceMode === 'github'
      ? `"${GITHUB_ASTRYX_TGZ}"`
      : sourceMode === 'local'
        ? `"../mehan-design-system/release/mehan-astryx-1.0.0.tgz"`
        : `@mehan/astryx`;
  const srcFlag =
    sourceMode === 'github'
      ? ' --github'
      : sourceMode === 'local'
        ? ' --local'
        : ' --npm';
  const accentNote = isPresetAccent(seed.accent)
    ? seed.accent
    : `${seed.accent} (custom OKLCH hex)`;
  const overrideCount =
    Object.keys(state.tokenOverrides).length + state.customOverrides.length;

  return `Set up Mehan Design System (powered by Meta Astryx ~0.7.17) in this repository with these exact settings:
- Repository source: ${GITHUB_REPO_URL}
- Atmosphere: ${seed.atmosphere}
- Accent: ${accentNote}
- Tactile surface: lip=${seed.lipStyle}, segmented=${seed.segmentedStyle}, input=${seed.wellStyle}, depth=${seed.depth}
- Typography & Scale: heading="${seed.headingFont}", body="${seed.bodyFont}", base=${seed.typeBase}px, ratio=${seed.typeRatio}, sizeBase=${seed.sizeBase}px, spacingBase=${seed.spacingBase}px
- Motion: ${seed.motion} (${seed.durationStep}x)
- Custom token/component overrides: ${overrideCount}
- CSS stack: ${cssMode === 'tailwind' ? 'Tailwind CSS v4 (@layer bridge + @astryxdesign/core/tailwind-theme.css)' : 'Plain CSS'}

Steps to execute:
1. Install packages directly from GitHub: \`pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react ${pkgTarget}\` and dev dependency \`pnpm add -D @astryxdesign/cli@~0.7.17\` (or if \`mehan-design-system\` is cloned alongside this repo, run \`node "../mehan-design-system/bin/mehan.mjs" init . --atmosphere ${seed.atmosphere} --accent "${seed.accent}" --depth ${seed.depth} --density ${density} --motion ${seed.motion} --lip ${seed.lipStyle} --segmented ${seed.segmentedStyle} --well ${seed.wellStyle} --heading-font "${seed.headingFont}" --body-font "${seed.bodyFont}"${cssMode === 'tailwind' ? ' --tailwind' : ''}${srcFlag}\`).
2. Run \`pnpm exec astryx init --features agents\` so Astryx + Mehan UX & Copywriting docs are indexed for AI agents.
3. Wrap the root application in \`<MehanProvider>\` (generated by \`mehan.mjs init\`) or \`<Theme theme={customMehanTheme}><LayerProvider>{children}</LayerProvider></Theme>\`, and include \`MEHAN_THEME_INIT_SCRIPT\` (exported from \`@mehan/astryx\`) in \`<head>\` if using Next.js / SSR to prevent dark-mode FOUC.
4. Read all 7 Mehan UX, Copywriting, Spatial Hierarchy & Runtime Hook guides before building screens: \`pnpm exec astryx docs mehan-design-rules\`, \`mehan-ux-complexity\`, \`mehan-copy-and-states\`, \`mehan-ergonomics-and-motion\`, \`mehan-forms-and-i18n\`, \`mehan-page-archetypes\`, and \`mehan-runtime-hooks\`.
5. Use \`@astryxdesign/core\`'s 103 WAI-ARIA primitives as the core foundation alongside \`@mehan/astryx\`'s 35 universal extension components & layouts (\`WorkspaceLayout\`, \`CanvasStage\`, \`PropertyRow\`, \`SplitButton\`, \`CopyButton\`, \`InlineConfirm\`, \`CanvasZoomBar\`, \`DigitEntry\`, \`Rating\`, \`PrecisionSlider\`, \`AngleDial\`, \`AnchorMatrix\`, \`TimelineScrubber\`, \`ColorSwatch\`, \`ColorWell\`, \`ColorPicker\`, \`GradientPicker\`, \`ImageWell\`, \`CodeEditor\`, \`MarkdownEditor\`, \`MiddleTruncate\`, \`ColumnSettingsMenu\`, \`ColumnView\`, \`Timeline\`, \`MetricCard\`, \`DataChart\`, \`Sparkline\`, \`Gauge\`, \`ActivityRing\`, \`InlineMessage\`, \`ErrorSummary\`, \`ShortcutSheet\`, \`NotificationCenter\`, \`Tour\`, \`ThemeSwitch\`), ergonomic runtime hooks (\`useMehanShortcuts\`, \`usePrimaryAction\`, \`useAutoDraft\`, \`useUnsavedGuard\`, \`useMehanViewport\`), and \`@mehan/astryx/dna\` utilities (\`createHistoryStore\`, \`formatNumber\`, \`formatCurrency\`, \`formatBytes\`, \`validateFile\`, \`auditMehanThemeContrast\`).`;
}

export function buildThemeCommitPrompt(exportedThemeTs: string): string {
  return `Inside the mehan-design-system repository, update the default studio/preset theme configuration to match my customized Theme Editor setup:

\`\`\`ts
${exportedThemeTs}
\`\`\`

Then run \`pnpm verify\` so all packages, \`release/mehan-astryx-1.0.0.tgz\`, \`release/mehan-tokens.w3c.json\`, and \`STUDIO.html\` are rebuilt and verified across all 6 quality gates (0 errors, 0 warnings, 0 axe contrast violations).`;
}

export function buildAstryxUpgradePrompt(): string {
  return `Inside the mehan-design-system repository, check if a newer version of @astryxdesign/core and @astryxdesign/cli is available on npm:
1. Inspect the changelog and new \`astryx theme targets\` in a clean branch.
2. Bump \`@astryxdesign/core\`, \`@astryxdesign/cli\`, \`@astryxdesign/build\`, and \`@astryxdesign/theme-neutral\` in root \`package.json\`, \`packages/astryx/package.json\`, and \`apps/studio/package.json\`.
3. Run \`pnpm install && pnpm verify\` (including \`astryx integration check --strict --next\`, \`astryx integration verify\`, Vitest optical depth, and Playwright + axe contrast gates).
4. Only keep the upgrade if all 6 gates pass with 0 errors and 0 visual regressions; then rebuild \`release/\` and \`STUDIO.html\`.`;
}

export function buildScopeSwitchPrompt(targetScope: string): string {
  const clean = targetScope.startsWith('@') ? targetScope : `@${targetScope}`;
  return `Inside the mehan-design-system repository, switch the npm package scope to \`${clean}\`:
1. Run \`node bin/mehan.mjs set-scope ${clean}\`.
2. Run \`pnpm install && pnpm verify\` so all manifests, imports, \`release/\` tarballs, and \`STUDIO.html\` are rebuilt and verified cleanly.`;
}
