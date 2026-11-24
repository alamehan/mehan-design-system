import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  auditMehanThemeContrast,
  createHistoryStore,
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  generateOklchScale,
  mixOklab,
  parseLocalIsoDate,
  relativeLuminance,
  suggestOklchHarmonies,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
} from '@mehan/dna';
import {
  MEHAN_THEME_INIT_SCRIPT,
  formatGradientCss,
  formatShortcutKeys,
} from '@mehan/astryx';
import {generatePortableCss} from '@mehan/portable';

const repoRoot = path.resolve(import.meta.dirname, '..');

describe('Stage 1 Proof — Exhaustive 30-Theme Contrast Matrix, Utilities & Repo Drift-Lock', () => {
  const atmospheres = Object.keys(MEHAN_ATMOSPHERES) as MehanAtmosphereId[];
  const presetAccents = Object.keys(MEHAN_ACCENT_PRESETS) as MehanPresetAccentId[];
  const customHexSeeds = ['#ffd84d', '#67e8f9', '#111827', '#7c3aed'];

  it('passes WCAG 2.2 AA + 3-stop primary gradient-band contrast across all 30 [Atmosphere x Accent] combinations', () => {
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
  });

  it('produces monotonic perceptual OKLCH shade ramps, clean Oklab midpoints, and valid color harmonies', () => {
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
  });

  it('coalesces high-frequency drag updates into 1 undo step and supports full undo/redo/transient semantics', () => {
    const store = createHistoryStore({depth: 1, accent: 'strawberry'}, {
      limit: 10,
      coalesceMs: 1000,
    });

    // Simulate 5 rapid slider scrub frames with matching coalesce key
    for (const d of [1.1, 1.2, 1.3, 1.4, 1.5]) {
      store.set(prev => ({...prev, depth: d}), {
        coalesce: 'seed:depth',
        label: 'Adjust shadow depth',
      });
    }
    expect(store.getSnapshot().present.depth).toBe(1.5);
    expect(store.getSnapshot().pastCount).toBe(1);

    // Distinct action creates a 2nd undo step
    store.set(prev => ({...prev, accent: 'blueberry'}), {
      label: 'Select Blueberry',
    });
    expect(store.getSnapshot().pastCount).toBe(2);

    // Transient preview updates present without adding an undo entry
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

  it('formats numbers, currencies, bytes, relative times, shortcuts, and local ISO dates accurately across EN & ID', () => {
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
      '.mh-split',
      '.mh-copy-btn',
      '.mh-mid-trunc',
      '.mh-anchor-grid',
      '.mh-otp',
      '.mh-error-summary',
      '.mh-inline-msg',
      '.mh-timeline',
      '.mh-zoom-bar',
      '@media (prefers-contrast:more)',
      '@media (forced-colors:active)',
      '@media (pointer:coarse)',
      '@media (prefers-reduced-motion:reduce)',
      '@media print',
    ]) {
      expect(portableCss).toContain(cls);
    }
  });

  it('locks package versions, built exports, bundled WOFF2 fonts, and MEHAN_THEME_INIT_SCRIPT parity', () => {
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

    // Verify CLI MEHAN_THEME_INIT_SCRIPT matches @mehan/astryx byte-for-byte
    const cliSource = fs.readFileSync(
      path.join(repoRoot, 'bin/mehan.mjs'),
      'utf8',
    );
    expect(cliSource).toContain(MEHAN_THEME_INIT_SCRIPT);

    // Verify every url('./fonts/...') in packages/astryx/fonts.css exists on disk
    const fontsCss = fs.readFileSync(
      path.join(repoRoot, 'packages/astryx/fonts.css'),
      'utf8',
    );
    const fontMatches = [...fontsCss.matchAll(/url\(['"]\.\/fonts\/([^'"]+)['"]\)/g)];
    expect(fontMatches.length).toBeGreaterThanOrEqual(20);
    for (const m of fontMatches) {
      const fontFile = path.join(repoRoot, 'packages/astryx/fonts', m[1]);
      expect(fs.existsSync(fontFile), `Missing bundled font ${fontFile}`).toBe(
        true,
      );
    }
  });
});
