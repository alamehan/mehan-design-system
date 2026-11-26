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
import {MEHAN_THEME_INIT_SCRIPT} from '@mehan/astryx';
import {
  generateAiPrototypeKit,
  generateOfflineAiPrototypeKit,
  generatePortableCss,
} from '@mehan/portable';
import {
  DEFAULT_SEED_CONFIG,
  exportCreateMehanThemeTs,
  exportPureAstryxDefineThemeTs,
  parseImportedThemeText,
  type FullThemeEditorState,
} from '../../apps/studio/src/theme-editor/themeEditorModel';

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
      for (const st of Object.values(dna.statuses)) {
        expect(contrastRatio(st.onSolid[0], st.solid[0])).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(st.onSolid[1], st.solid[1])).toBeGreaterThanOrEqual(4.5);
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
    expect(kit).toContain('Mehan Spatial, UX & Copywriting Standards');
    expect(kit).toContain('"density": "compact"');
    expect(kit).toContain('"motion": "calm"');

    const offlineKit = generateOfflineAiPrototypeKit({
      atmosphere: 'confectionery',
      accent: 'blueberry',
      density: 'compact',
      motion: 'calm',
    });
    expect(offlineKit).toContain('Visual Surfaces, Buttons & UX Standards');
    expect(offlineKit).toContain('data-density="compact"');
  });

  it('supports Shotcandy 1:1 Espresso segmented pills, lip/well modes, data viz tokens, and unrestricted Astryx overrides', () => {
    const shotcandyTheme = createMehanTheme({
      name: 'shotcandy-open',
      atmosphere: 'confectionery',
      accent: 'strawberry',
      typeBase: 13.5,
      sizeBase: 32,
      lipStyle: 'subtle',
      segmentedStyle: 'espresso',
      wellStyle: 'bordered',
      motion: 'crisp',
      durationStep: 1.25,
      tokens: {
        '--radius-page': '28px',
      },
      components: {
        card: {
          base: {
            borderRadius: '24px',
          },
        },
      },
    });

    expect(shotcandyTheme.tokens['--size-element-md']).toBe('32px');
    expect(shotcandyTheme.tokens['--radius-page']).toBe('28px');
    expect(shotcandyTheme.tokens['--color-data-categorical-blue']).toMatch(
      /light-dark\(#/,
    );
    expect(shotcandyTheme.tokens['--color-data-neutral']).toMatch(/light-dark\(#/);

    const portableEspresso = generatePortableCss({
      name: 'shotcandy-portable',
      atmosphere: 'confectionery',
      segmentedStyle: 'espresso',
      typeBase: 13.5,
      lipStyle: 'flat',
      headingFont: 'Fraunces',
      bodyFont: 'Albert Sans',
      codeFont: 'JetBrains Mono',
    });
    expect(portableEspresso).toContain('--mh-font-base:13.5px');
    expect(portableEspresso).toContain('--mh-lip-pad:0px');
    expect(portableEspresso).toContain('--mh-seg-active-bg:#261b16');
    expect(portableEspresso).toContain('--mh-font-display:"Fraunces"');
    expect(portableEspresso).toContain('--mh-font-body:"Albert Sans"');
    expect(portableEspresso).toContain('--mh-font-mono:"JetBrains Mono"');
    expect(portableEspresso).toContain('padding-bottom:var(--mh-lip-pad,3px)');
    expect(portableEspresso).not.toContain('text-transform:uppercase');

    const stoneDefault = resolveMehanDna({
      name: 'stone-default',
      atmosphere: 'stone',
    });
    expect(stoneDefault.accent.name).toBe('Teal');

    const w3cCustom = exportW3cDesignTokens({
      name: 'shotcandy-figma',
      atmosphere: 'confectionery',
      headingFont: 'Georgia',
      bodyFont: 'Inter',
      codeFont: 'JetBrains Mono',
      typeBase: 13.5,
      segmentedStyle: 'espresso',
      lipStyle: 'subtle',
    });
    expect(w3cCustom.fontFamily.display.$value).toBe('Georgia');
    expect(w3cCustom.fontFamily.body.$value).toBe('Inter');
    expect(w3cCustom.fontFamily.mono.$value).toBe('JetBrains Mono');
    expect(w3cCustom.dimension.typeBase.$value).toBe('13.5px');
    expect(w3cCustom.$metadata.segmentedStyle).toBe('espresso');

    const aiKitEspresso = generateAiPrototypeKit({
      atmosphere: 'confectionery',
      segmentedStyle: 'espresso',
      typeBase: 13.5,
      lipStyle: 'flat',
    });
    expect(aiKitEspresso).toContain('"typeBase": 13.5');
    expect(aiKitEspresso).toContain('"lipStyle": "flat"');
    expect(aiKitEspresso).toContain('"segmentedStyle": "espresso"');

    const offlineAiKitEspresso = generateOfflineAiPrototypeKit({
      atmosphere: 'confectionery',
      segmentedStyle: 'espresso',
      typeBase: 13.5,
      lipStyle: 'flat',
    });
    expect(offlineAiKitEspresso).toContain('--mh-font-base:13.5px');
    expect(offlineAiKitEspresso).toContain('--mh-lip-pad:0px');
    expect(offlineAiKitEspresso).toContain('--mh-seg-active-bg:#261b16');
    expect(MEHAN_THEME_INIT_SCRIPT).toContain('data-theme');
  });

  it('round-trips Studio JSON, createMehanTheme (.ts), and Astryx defineTheme (.ts) cleanly', () => {
    const fallback: FullThemeEditorState = {
      seed: {...DEFAULT_SEED_CONFIG},
      tokenOverrides: {},
      customOverrides: [],
    };

    // 1. Pure seed customization (0 raw token overrides!) exported as createMehanTheme (.ts)
    const pureSeedState: FullThemeEditorState = {
      seed: {
        ...DEFAULT_SEED_CONFIG,
        atmosphere: 'stone',
        accent: '#7c3aed',
        lipStyle: 'subtle',
        segmentedStyle: 'espresso',
        wellStyle: 'bordered',
        headingFont: 'Fraunces',
        bodyFont: 'Outfit',
        codeFont: 'JetBrains Mono',
        typeBase: 15,
        typeRatio: 1.25,
        spacingBase: 5,
        radiusBase: 6,
        sizeBase: 40,
        motion: 'calm',
        durationStep: 1.25,
        depth: 0.85,
      },
      tokenOverrides: {},
      customOverrides: [
        {
          id: 'ov-1',
          component: 'button',
          property: 'borderRadius',
          value: '999px',
        },
      ],
    };

    const mehanTs = exportCreateMehanThemeTs(pureSeedState, 'editorialStone');
    const reimportedMehan = parseImportedThemeText(mehanTs, fallback);
    expect(reimportedMehan.seed.atmosphere).toBe('stone');
    expect(reimportedMehan.seed.accent).toBe('#7c3aed');
    expect(reimportedMehan.seed.lipStyle).toBe('subtle');
    expect(reimportedMehan.seed.segmentedStyle).toBe('espresso');
    expect(reimportedMehan.seed.wellStyle).toBe('bordered');
    expect(reimportedMehan.seed.headingFont).toBe('Fraunces');
    expect(reimportedMehan.seed.bodyFont).toBe('Outfit');
    expect(reimportedMehan.seed.codeFont).toBe('JetBrains Mono');
    expect(reimportedMehan.seed.typeBase).toBe(15);
    expect(reimportedMehan.seed.radiusBase).toBe(6);
    expect(reimportedMehan.customOverrides).toContainEqual(
      expect.objectContaining({
        component: 'button',
        property: 'borderRadius',
        value: '999px',
      }),
    );

    // 2. Pure Astryx defineTheme (.ts) export includes `components` and imports cleanly
    const astryxTs = exportPureAstryxDefineThemeTs(pureSeedState, 'astryxStone');
    expect(astryxTs).toContain('components:');
    const reimportedAstryx = parseImportedThemeText(astryxTs, fallback);
    expect(reimportedAstryx.seed.typeBase).toBe(15);
    expect(reimportedAstryx.seed.typeRatio).toBe(1.25);

    // 3. Studio JSON roundtrip
    const reimportedJson = parseImportedThemeText(
      JSON.stringify(pureSeedState),
      fallback,
    );
    expect(reimportedJson.seed).toEqual(pureSeedState.seed);
  });
});
