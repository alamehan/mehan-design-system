import {describe, expect, it} from 'vitest';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  contrastRatio,
  relativeLuminance,
  resolveMehanDna,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
} from '@mehan/dna';
import {createMehanTheme} from '@mehan/astryx/dna';
import {generateAiPrototypeKit, generatePortableCss} from '@mehan/portable';

describe('@mehan/dna optical depth & WCAG AA contrast laws', () => {
  const atmospheres = Object.keys(MEHAN_ATMOSPHERES) as MehanAtmosphereId[];
  const accents = Object.keys(MEHAN_ACCENT_PRESETS) as MehanPresetAccentId[];

  for (const atmId of atmospheres) {
    it(`enforces strictly monotonic Dark Mode luminance order in "${atmId}"`, () => {
      const D = MEHAN_ATMOSPHERES[atmId].dark;
      const lum = (hex: string) => relativeLuminance(hex);

      // Deeper layers MUST be darker; raised layers MUST be lighter!
      expect(lum(D.socket)).toBeLessThan(lum(D.well));
      expect(lum(D.well)).toBeLessThan(lum(D.paper));
      expect(lum(D.paper)).toBeLessThan(lum(D.tray));
      expect(lum(D.tray)).toBeLessThan(lum(D.surface));
      expect(lum(D.surface)).toBeLessThan(lum(D.raisedBottom));
      expect(lum(D.raisedBottom)).toBeLessThan(lum(D.raisedTop));
    });

    it(`clears WCAG AA (>= 4.5:1) for ink, ink2, and ink3 across Light & Dark in "${atmId}"`, () => {
      const {light, dark} = MEHAN_ATMOSPHERES[atmId];
      expect(contrastRatio(light.ink, light.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(light.ink2, light.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(light.ink3, light.well)).toBeGreaterThanOrEqual(4.5);

      expect(contrastRatio(dark.ink, dark.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(dark.ink2, dark.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(dark.ink3, dark.surface)).toBeGreaterThanOrEqual(4.5);
    });
  }

  for (const accId of accents) {
    it(`solves WCAG AA (>= 4.5:1) button & link contrast for preset accent "${accId}"`, () => {
      const dna = resolveMehanDna({
        name: `test-${accId}`,
        atmosphere: 'confectionery',
        accent: accId,
      });
      expect(
        contrastRatio(dna.accent.onAccentLight, dna.accent.accentLight),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(dna.accent.onAccentDark, dna.accent.accentDark),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(dna.accent.textLight, dna.atmosphere.light.well),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(dna.accent.textDark, dna.atmosphere.dark.surface),
      ).toBeGreaterThanOrEqual(4.5);
    });
  }

  it('auto-corrects arbitrary pale or ultra-dark custom hex seeds to WCAG AA', () => {
    for (const customHex of ['#ffd84d', '#67e8f9', '#111827', '#ec4899']) {
      const dna = resolveMehanDna({
        name: 'custom-brand',
        atmosphere: 'porcelain',
        accent: customHex,
      });
      expect(
        contrastRatio(dna.accent.onAccentLight, dna.accent.accentLight),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(dna.accent.textLight, dna.atmosphere.light.surface),
      ).toBeGreaterThanOrEqual(4.5);
      expect(
        contrastRatio(dna.accent.textDark, dna.atmosphere.dark.surface),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('creates valid Astryx DefinedTheme objects and Portable AI kits from the same DNA', () => {
    const theme = createMehanTheme({
      name: 'mehan-unit-test',
      atmosphere: 'stone',
      accent: '#7c3aed',
    });
    expect(theme.name).toBe('mehan-unit-test');
    expect(theme.tokens['--color-background-inverted']).toMatch(/light-dark\(#/);

    const css = generatePortableCss();
    expect(css).toContain('data-atmosphere="confectionery"');
    expect(css).toContain('.mh-btn-primary');

    const kit = generateAiPrototypeKit({
      atmosphere: 'confectionery',
      accent: 'blueberry',
    });
    expect(kit).toContain('<!doctype html>');
    expect(kit).toContain('Mehan Portable Progressive Runtime');
  });
});
