import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {describe, expect, it} from 'vitest';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  auditMehanThemeContrast,
  createHistoryStore,
  exportW3cDesignTokens,
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  generateOklchScale,
  matchesAcceptedType,
  mixOklab,
  parseLocalIsoDate,
  relativeLuminance,
  suggestOklchHarmonies,
  validateFile,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
} from '@mehan/dna';
import {
  MEHAN_THEME_INIT_SCRIPT,
  formatGradientCss,
  formatShortcutKeys,
} from '@mehan/astryx';
import {generateAiPrototypeKit, generatePortableCss} from '@mehan/portable';
import {
  DEFAULT_SEED_CONFIG,
  exportCreateMehanThemeTs,
  parseImportedThemeText,
  type FullThemeEditorState,
} from '../../apps/studio/src/theme-editor/themeEditorModel';
import {getBuiltInPresets} from '../../apps/studio/src/studioState';

const repoRoot = path.resolve(import.meta.dirname, '../..');

describe('Mehan Design System v1.0 — Mathematical DNA, CLI E2E, Roundtrip & Zero-Bias Repo Lock', () => {
  const atmospheres = Object.keys(MEHAN_ATMOSPHERES) as MehanAtmosphereId[];
  const presetAccents = Object.keys(MEHAN_ACCENT_PRESETS) as MehanPresetAccentId[];
  const customHexSeeds = ['#ffd84d', '#67e8f9', '#111827', '#7c3aed'];

  it('passes WCAG 2.2 AA + 3-stop primary gradient-band contrast across all 112 [8 Atmospheres x 14 Accents] combinations and all 12 built-in Studio presets', () => {
    expect(atmospheres).toHaveLength(8);
    expect(presetAccents).toHaveLength(10);
    for (const atmosphere of atmospheres) {
      for (const accent of [...presetAccents, ...customHexSeeds]) {
        const report = auditMehanThemeContrast({
          name: `matrix-${atmosphere}-${String(accent).replace('#', '')}`,
          atmosphere,
          accent,
        });
        expect(report.darkDepthMonotonic).toBe(true);
        expect(report.failures).toEqual([]);
        expect(report.passesAll).toBe(true);
      }
    }

    const builtIns = getBuiltInPresets();
    expect(builtIns).toHaveLength(12);
    for (const preset of builtIns) {
      const report = auditMehanThemeContrast({
        name: preset.id,
        ...preset.state.seed,
        radiusBase: preset.state.seed.radiusBase ?? undefined,
      });
      expect(report.passesAll, `Preset ${preset.id} failed contrast`).toBe(true);
    }
  });

  it('produces monotonic perceptual OKLCH shade ramps, clean Oklab midpoints, and symmetric 25-key W3C light/dark tokens', () => {
    const scale = generateOklchScale('#e0366b');
    const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
    for (let i = 0; i < stops.length - 1; i += 1) {
      expect(relativeLuminance(scale[stops[i]])).toBeGreaterThan(
        relativeLuminance(scale[stops[i + 1]]),
      );
    }

    const mid = mixOklab('#ff0055', '#00d4ff', 0.5);
    expect(mid).toMatch(/^#[0-9a-f]{6}$/);

    const greyHarmonies = suggestOklchHarmonies('#808080');
    expect(greyHarmonies.analogous).toHaveLength(2);
    expect(greyHarmonies.linearGradientCss).toContain('linear-gradient');

    // W3C light/dark key parity lock (25/25 keys)
    const w3c = exportW3cDesignTokens({
      name: 'symmetry-check',
      atmosphere: 'confectionery',
      accent: 'strawberry',
    });
    const lightKeys = Object.keys(w3c.color.light).sort();
    const darkKeys = Object.keys(w3c.color.dark).sort();
    expect(darkKeys).toEqual(lightKeys);
    expect(lightKeys).toHaveLength(25);
  });

  it('coalesces high-frequency drag updates into 1 undo step and supports full undo/redo/transient semantics', () => {
    const store = createHistoryStore(
      {depth: 1, accent: 'strawberry'},
      {limit: 10, coalesceMs: 1000},
    );

    for (const d of [1.1, 1.2, 1.3, 1.4, 1.5]) {
      store.set(prev => ({...prev, depth: d}), {
        coalesce: 'seed:depth',
        label: 'Adjust shadow depth',
      });
    }
    expect(store.getSnapshot().present.depth).toBe(1.5);
    expect(store.getSnapshot().pastCount).toBe(1);

    store.set(prev => ({...prev, accent: 'blueberry'}), {
      label: 'Select Blueberry',
    });
    expect(store.getSnapshot().pastCount).toBe(2);

    store.set(prev => ({...prev, depth: 0.5}), {transient: true});
    expect(store.getSnapshot().pastCount).toBe(2);

    expect(store.undo()).toBe(true);
    expect(store.getState()).toEqual({depth: 1.5, accent: 'strawberry'});
    expect(store.undo()).toBe(true);
    expect(store.getState()).toEqual({depth: 1, accent: 'strawberry'});
    expect(store.getSnapshot().canUndo).toBe(false);
    expect(store.redo()).toBe(true);
    expect(store.getState()).toEqual({depth: 1.5, accent: 'strawberry'});
  });

  it('validates file metadata purely and formats numbers, currencies, bytes, dates, shortcuts, and Portable CSS/AI Kit', () => {
    expect(formatNumber(12480.5, 'en-US')).toBe('12,480.5');
    expect(formatNumber(12480.5, 'id-ID')).toBe('12.480,5');
    expect(formatCompactNumber(1500, 'en-US')).toBe('1.5K');
    expect(formatCurrency(-1500, 'USD', 'en-US', {compact: true})).toBe('-$1.5K');
    expect(formatPercent(0.994, 'en-US', 1)).toBe('99.4%');
    expect(formatBytes(1536, 'en-US')).toBe('1.5 KB');
    expect(formatRelativeTime(Date.now() - 120_000, 'en-US')).toContain('2');

    const localDate = parseLocalIsoDate('2026-01-05');
    expect(localDate.getFullYear()).toBe(2026);
    expect(localDate.getMonth()).toBe(0);
    expect(localDate.getDate()).toBe(5);

    // Pure file validator checks
    expect(
      validateFile({name: 'empty.json', size: 0, type: 'application/json'}),
    ).toMatchObject({ok: false, code: 'empty-file'});
    expect(
      validateFile(
        {name: 'huge.json', size: 5_000_000, type: 'application/json'},
        {maxBytes: 1_000_000},
      ),
    ).toMatchObject({ok: false, code: 'too-large'});
    expect(
      validateFile(
        {name: 'malware.exe', size: 1024, type: 'application/octet-stream'},
        {accept: ['.json', 'image/*']},
      ),
    ).toMatchObject({ok: false, code: 'unsupported-type'});
    expect(
      matchesAcceptedType({name: 'hero.png', type: 'image/png'}, ['image/*']),
    ).toBe(true);
    expect(
      validateFile(
        {name: 'theme.json', size: 2048, type: 'application/json'},
        {maxBytes: 1_000_000, accept: ['.json']},
      ),
    ).toEqual({ok: true});

    expect(formatShortcutKeys('mod+shift+z', true)).toEqual(['⌘', '⇧', 'Z']);
    expect(formatShortcutKeys('mod+shift+z', false)).toEqual(['Ctrl', 'Shift', 'Z']);

    expect(
      formatGradientCss(
        [
          {id: 'a', color: '#ff7597', position: 0},
          {id: 'b', color: '#d42a5f', position: 100},
        ],
        'linear',
        135,
      ),
    ).toBe('linear-gradient(135deg, #ff7597 0%, #d42a5f 100%)');

    const portableCss = generatePortableCss({
      name: 'proof',
      atmosphere: 'confectionery',
      accent: 'strawberry',
    });
    for (const cls of [
      '.mh-workspace',
      '.mh-canvas-stage',
      '.mh-property-row',
      '.mh-chart',
      '.mh-column-view',
      '.mh-split',
      '.mh-copy-btn',
      '.mh-mid-trunc',
      '.mh-anchor-grid',
      '.mh-otp',
      '.mh-error-summary',
      '.mh-inline-msg',
      '.mh-timeline',
      '.mh-zoom-bar',
      '.mh-nav-item:focus-visible',
      '.mh-anchor-grid button:focus-visible',
      '.mh-otp input:focus-visible',
      '@media (prefers-contrast:more)',
      '@media (forced-colors:active)',
      '@media (pointer:coarse)',
      '@media (prefers-reduced-motion:reduce)',
      '@media print',
    ]) {
      expect(portableCss).toContain(cls);
    }

    // Every <button in AI Prototype Kit examples must declare explicit type="button"
    const aiKit = generateAiPrototypeKit({atmosphere: 'porcelain', accent: 'blueberry'});
    const rawButtonTags = [...aiKit.matchAll(/<button\b[^>]*>/g)].map(m => m[0]);
    expect(rawButtonTags.length).toBeGreaterThan(5);
    for (const tag of rawButtonTags) {
      expect(tag, `Button tag missing type="button": ${tag}`).toContain('type="button"');
    }
  });

  it('roundtrips Theme Editor component-token slots (.ts) and sanitizes malformed JSON imports', () => {
    const fallback: FullThemeEditorState = {
      seed: {...DEFAULT_SEED_CONFIG},
      tokenOverrides: {},
      customOverrides: [],
    };
    const original: FullThemeEditorState = {
      seed: {
        ...DEFAULT_SEED_CONFIG,
        atmosphere: 'porcelain',
        accent: 'blueberry',
        radiusBase: 10,
      },
      tokenOverrides: {
        '--button-radius': '9999px',
        '--color-accent': '#2563eb',
      },
      customOverrides: [
        {id: 'c1', component: 'badge', property: 'letterSpacing', value: '0.02em'},
      ],
    };

    const exportedTs = exportCreateMehanThemeTs(original, 'roundtripDemo');
    const reimported = parseImportedThemeText(exportedTs, fallback);
    expect(reimported.seed.atmosphere).toBe('porcelain');
    expect(reimported.seed.radiusBase).toBe(10);
    expect(reimported.tokenOverrides['--button-radius']).toBe('9999px');
    expect(reimported.tokenOverrides['--color-accent']).toBe('#2563eb');
    expect(reimported.customOverrides).toEqual([
      {id: 'imp-1', component: 'badge', property: 'letterSpacing', value: '0.02em'},
    ]);

    const malformedJson = JSON.stringify({
      seed: {atmosphere: 'invalid-atm', depth: 'not-a-number', motion: 'bogus'},
    });
    const sanitized = parseImportedThemeText(malformedJson, fallback);
    expect(sanitized.seed.atmosphere).toBe(fallback.seed.atmosphere);
    expect(sanitized.seed.depth).toBe(fallback.seed.depth);
    expect(sanitized.seed.motion).toBe(fallback.seed.motion);
  });

  it('executes CLI commands (init Portable, init React + --from + Tailwind, tokens, ai-kit) cleanly in temp directories', () => {
    const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), 'mehan-cli-e2e-'));
    const cliPath = path.join(repoRoot, 'bin/mehan.mjs');
    try {
      const themeJsonPath = path.join(tmpBase, 'studio-export.json');
      fs.writeFileSync(
        themeJsonPath,
        JSON.stringify({
          seed: {
            atmosphere: 'stone',
            accent: '#0d9488',
            typeBase: 15,
            radiusBase: 6,
            motion: 'calm',
          },
          tokenOverrides: {
            '--color-accent': '#0d9488',
            '--button-radius': '9999px',
          },
          customOverrides: [
            {id: 'c1', component: 'badge', property: 'letterSpacing', value: '0.02em'},
          ],
        }),
        'utf8',
      );

      // 1. React + Tailwind + --from Studio JSON
      const reactAppDir = path.join(tmpBase, 'react-app');
      fs.mkdirSync(path.join(reactAppDir, 'src'), {recursive: true});
      fs.writeFileSync(
        path.join(reactAppDir, 'package.json'),
        JSON.stringify({name: 'demo-react', dependencies: {react: '^19.0.0'}}),
        'utf8',
      );
      const initStdout = execFileSync(
        process.execPath,
        [cliPath, 'init', reactAppDir, '--from', themeJsonPath, '--tailwind', '--github'],
        {stdio: 'pipe', encoding: 'utf8'},
      );
      expect(initStdout).toContain(
        'https://github.com/alamehan/mehan-design-system/raw/main/release/',
      );
      const cssOut = fs.readFileSync(path.join(reactAppDir, 'src/mehan.css'), 'utf8');
      const providerOut = fs.readFileSync(
        path.join(reactAppDir, 'src/MehanProvider.tsx'),
        'utf8',
      );
      expect(cssOut).toContain('@import "tailwindcss";');
      expect(providerOut).toContain("atmosphere: 'stone'");
      expect(providerOut).toContain('typeBase: 15');
      expect(providerOut).toContain('radiusBase: 6');
      expect(providerOut).not.toContain("'--button-radius'");
      expect(providerOut).not.toContain('"--button-radius"');
      expect(providerOut).toContain('components:');
      expect(providerOut).toContain('"borderRadius": "9999px"');
      expect(providerOut).toContain('"letterSpacing": "0.02em"');

      // 2. Portable HTML/CSS init
      const htmlDir = path.join(tmpBase, 'vanilla-site');
      execFileSync(
        process.execPath,
        [cliPath, 'init', htmlDir, '--portable', '--from', themeJsonPath],
        {stdio: 'pipe'},
      );
      expect(fs.existsSync(path.join(htmlDir, 'mehan/mehan-portable.css'))).toBe(true);
      expect(fs.existsSync(path.join(htmlDir, 'mehan/mehan-portable.js'))).toBe(true);

      // 3. tokens & ai-kit --from
      const tokensOutPath = path.join(tmpBase, 'out.w3c.json');
      const kitOutPath = path.join(tmpBase, 'out-kit.md');
      execFileSync(
        process.execPath,
        [cliPath, 'tokens', '--from', themeJsonPath, '--out', tokensOutPath],
        {stdio: 'pipe'},
      );
      execFileSync(
        process.execPath,
        [cliPath, 'ai-kit', '--from', themeJsonPath, '--out', kitOutPath],
        {stdio: 'pipe'},
      );
      const w3cParsed = JSON.parse(fs.readFileSync(tokensOutPath, 'utf8'));
      expect(w3cParsed.$metadata.atmosphere).toBe('stone');
      expect(fs.readFileSync(kitOutPath, 'utf8')).toContain('Stone');
    } finally {
      fs.rmSync(tmpBase, {recursive: true, force: true});
    }
  });

  it('locks package exports, all 3 release/*.tgz tarballs, explicit :focus-visible rules, and zero Tools-Factory bias', () => {
    const rootPkg = JSON.parse(
      fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
    );
    for (const pkgDir of ['dna', 'astryx', 'portable']) {
      const pkgPath = path.join(repoRoot, 'packages', pkgDir, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      expect(pkg.version).toBe(rootPkg.version);

      for (const [, expVal] of Object.entries(pkg.exports ?? {})) {
        const targets =
          typeof expVal === 'string'
            ? [expVal]
            : Object.values(expVal as Record<string, string>);
        for (const rel of targets) {
          const fullTarget = path.resolve(path.dirname(pkgPath), rel);
          expect(
            fs.existsSync(fullTarget),
            `Missing export file ${fullTarget}`,
          ).toBe(true);
        }
      }
    }

    // All 3 publishable tarballs present in release/
    const releaseFiles = fs.readdirSync(path.join(repoRoot, 'release'));
    expect(releaseFiles.some(f => f.includes('-dna-') && f.endsWith('.tgz'))).toBe(true);
    expect(releaseFiles.some(f => f.includes('-astryx-') && f.endsWith('.tgz'))).toBe(true);
    expect(releaseFiles.some(f => f.includes('-portable-') && f.endsWith('.tgz'))).toBe(true);

    // Verify CLI MEHAN_THEME_INIT_SCRIPT parity & unescaped external strings in tsup.secondary.config.mjs
    const cliSource = fs.readFileSync(path.join(repoRoot, 'bin/mehan.mjs'), 'utf8');
    expect(cliSource).toContain(MEHAN_THEME_INIT_SCRIPT);
    const tsupSec = fs.readFileSync(
      path.join(repoRoot, 'packages/astryx/tsup.secondary.config.mjs'),
      'utf8',
    );
    expect(tsupSec).not.toContain('@mehan\\/astryx');

    // Verify explicit :focus-visible rules in styles.css & studio.css
    const astryxCss = fs.readFileSync(
      path.join(repoRoot, 'packages/astryx/src/styles.css'),
      'utf8',
    );
    for (const sel of [
      '.mehan-ad-input:focus-visible',
      '.mehan-czb-preset:focus-visible',
      '.mehan-ce-textarea:focus-visible',
      '.mehan-cp-eyedropper:focus-visible',
      '.mehan-ps-value-btn:focus-visible',
      '.mehan-tour-next:focus-visible',
      '.mehan-dc-plot-wrap:focus-visible',
      '.mehan-cv-item:focus-visible',
      '.mehan-pr-reset-btn:focus-visible',
    ]) {
      expect(astryxCss).toContain(sel);
    }

    const studioCss = fs.readFileSync(
      path.join(repoRoot, 'apps/studio/src/studio.css'),
      'utf8',
    );
    expect(studioCss).toContain('@media (max-height: 559px)');
    expect(studioCss).toContain('.cat-nav-btn:focus-visible');

    // Verify zero stale incremental filenames in catalog/ and zero Tools-Factory bias strings
    const catalogFiles = fs.readdirSync(
      path.join(repoRoot, 'apps/studio/src/catalog'),
    );
    expect(catalogFiles.some(f => f.startsWith('CatalogGroup'))).toBe(false);
    expect(catalogFiles.some(f => f.startsWith('CatalogMehanTier'))).toBe(false);

    // Verify every url('./fonts/...') in packages/astryx/fonts.css exists on disk
    const fontsCss = fs.readFileSync(
      path.join(repoRoot, 'packages/astryx/fonts.css'),
      'utf8',
    );
    const fontMatches = [...fontsCss.matchAll(/url\(['"]\.\/fonts\/([^'"]+)['"]\)/g)];
    expect(fontMatches.length).toBeGreaterThanOrEqual(20);
    for (const m of fontMatches) {
      const fontFile = path.join(repoRoot, 'packages/astryx/fonts', m[1]);
      expect(fs.existsSync(fontFile), `Missing bundled font ${fontFile}`).toBe(true);
    }

    // Verify zero hardcoded local machine paths ("D:/mehan-design-system" or "D:\mehan-design-system") across source & docs
    const skipScan = new Set([
      'node_modules',
      '.git',
      'dist',
      'dist-single',
      'release',
      'test-results',
      'playwright-report',
    ]);
    const scanExts = new Set(['.md', '.ts', '.tsx', '.mjs', '.json', '.cmd', '.command']);
    function assertNoLocalDrivePaths(dir: string) {
      for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        if (skipScan.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          assertNoLocalDrivePaths(full);
        } else if (
          scanExts.has(path.extname(entry.name)) &&
          entry.name !== 'repo-and-dna-proof.test.ts'
        ) {
          const text = fs.readFileSync(full, 'utf8');
          expect(text, `Hardcoded D:/ path in ${full}`).not.toMatch(/D:[/\\]mehan-design-system/i);
        }
      }
    }
    assertNoLocalDrivePaths(repoRoot);

    // Lock 5: Clean root hygiene, governance convergence (README.md, README.id.md, AGENTS.md, CLAUDE.md, docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md),
    // valid relative links, valid XML SVG headers, and explicit Selector placement="below" across Studio
    const rootEntries = fs.readdirSync(repoRoot);
    expect(rootEntries.some(f => f.endsWith('.cmd') || f.endsWith('.command'))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, 'tsconfig.base.json'))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, 'scripts/pack-release.mjs'))).toBe(true);

    for (const docRel of [
      'README.md',
      'README.id.md',
      'AGENTS.md',
      'CLAUDE.md',
      'docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md',
    ]) {
      const docPath = path.join(repoRoot, docRel);
      expect(fs.existsSync(docPath), `Missing governance doc ${docRel}`).toBe(true);
      const docDir = path.dirname(docPath);
      const docContent = fs.readFileSync(docPath, 'utf8');
      const mdLinks = [...docContent.matchAll(/\]\((\.\.?\/[^)#\s]+)\)/g)].map(m => m[1]);
      const htmlLinks = [...docContent.matchAll(/(?:href|src|srcset)="(\.\.?\/[^"#]+)"/g)].map(
        m => m[1],
      );
      const allRelLinks = [...mdLinks, ...htmlLinks];
      expect(allRelLinks.length).toBeGreaterThan(0);
      for (const rel of allRelLinks) {
        const resolved = path.resolve(docDir, rel);
        expect(
          fs.existsSync(resolved),
          `Broken relative link ${rel} in ${docRel}`,
        ).toBe(true);
      }
    }

    for (const svgRel of [
      'assets/readme-header-dark.svg',
      'assets/readme-header-light.svg',
    ]) {
      const svgText = fs.readFileSync(path.join(repoRoot, svgRel), 'utf8');
      expect(svgText).toContain('<svg');
      expect(svgText).toContain('</svg>');
      expect(svgText, `Unescaped ampersand in ${svgRel}`).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)/);
    }

    function assertSelectorPlacementBelow(dir: string) {
      for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          assertSelectorPlacementBelow(full);
        } else if (entry.name.endsWith('.tsx')) {
          const src = fs.readFileSync(full, 'utf8');
          const tags = [...src.matchAll(/<Selector\b[\s\S]*?\/>/g)].map(m => m[0]);
          for (const tag of tags) {
            expect(
              tag,
              `<Selector> missing placement="below" in ${full}:\n${tag}`,
            ).toContain('placement="below"');
          }
        }
      }
    }
    assertSelectorPlacementBelow(path.join(repoRoot, 'apps/studio/src'));
  });
});
