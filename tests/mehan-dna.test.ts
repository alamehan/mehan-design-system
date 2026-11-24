import {describe, expect, it} from 'vitest';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  contrastRatio,
  exportW3cDesignTokens,
  hexToOklch,
  relativeLuminance,
  resolveMehanDna,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
} from '@mehan/dna';
import {createMehanTheme} from '@mehan/astryx/dna';
import {generateAiPrototypeKit, generatePortableCss} from '@mehan/portable';

describe('@mehan/dna optical depth, silky button physics & WCAG AA contrast laws', () => {
  const atmospheres = Object.keys(MEHAN_ATMOSPHERES) as MehanAtmosphereId[];
  const accents = Object.keys(MEHAN_ACCENT_PRESETS) as MehanPresetAccentId[];

  for (const atmId of atmospheres) {
    it(`enforces strictly monotonic Dark Mode luminance order in "${atmId}"`, () => {
      const D = MEHAN_ATMOSPHERES[atmId].dark;
      const lum = (hex: string) => relativeLuminance(hex);

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

    it(`enforces WCAG 1.4.11 >= 3:1 non-text contrast on all 10 categorical borders in "${atmId}"`, () => {
      const dna = resolveMehanDna({name: `cat-${atmId}`, atmosphere: atmId});
      for (const ramp of Object.values(dna.categorical)) {
        expect(
          contrastRatio(ramp.borderLight, dna.atmosphere.light.surface),
        ).toBeGreaterThanOrEqual(3);
        expect(
          contrastRatio(ramp.borderDark, dna.atmosphere.dark.surface),
        ).toBeGreaterThanOrEqual(3);
      }
    });
  }

  for (const accId of accents) {
    it(`solves WCAG AA (>= 4.5:1) contrast and smooth perceptual button lip for "${accId}"`, () => {
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

      // Button lip MUST stay perceptually close to the face (no harsh dark cliff)
      const faceL = hexToOklch(dna.accent.accentLight).l;
      const lipL = hexToOklch(dna.accent.buttonLip).l;
      expect(faceL - lipL).toBeGreaterThan(0.03);
      expect(faceL - lipL).toBeLessThan(0.14);
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

  it('supports compact density, calm motion, W3C DTCG export, and Portable UX kits', () => {
    const theme = createMehanTheme({
      name: 'mehan-compact-calm',
      atmosphere: 'stone',
      accent: '#7c3aed',
      density: 'compact',
      motion: 'calm',
    });
    expect(theme.name).toBe('mehan-compact-calm');
    expect(theme.tokens['--size-element-md']).toBe('32px');
    expect(theme.tokens['--color-background-inverted']).toMatch(/light-dark\(#/);

    const w3c = exportW3cDesignTokens({
      name: 'mehan-figma',
      atmosphere: 'confectionery',
      accent: 'strawberry',
    });
    expect(w3c.$metadata.density).toBe('standard');
    expect(w3c.color.light.accentSolid.$type).toBe('color');

    const css = generatePortableCss();
    expect(css).toContain('data-atmosphere="confectionery"');
    expect(css).toContain('.mh-btn-danger');

    const kit = generateAiPrototypeKit({
      atmosphere: 'confectionery',
      accent: 'blueberry',
      density: 'compact',
      motion: 'calm',
    });
    expect(kit).toContain('Universal UX, Semantic & Copywriting Standards');
    expect(kit).toContain('data-density="compact"');
  });
});
