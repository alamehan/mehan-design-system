/**
 * Parametric Brand Accent Engine.
 * Supports 6 curated Mehan brand accents AND any custom #rrggbb hex seed,
 * computing smooth 3-stop sculptural button gradients (500 -> 600@40% -> 700),
 * 1-shade-darker harmonious bottom lips (800, deltaL ~ -0.063), 3-layer colored
 * ambient shadows, and WCAG AA (>= 4.5:1) foreground/link stops in Light & Dark.
 */

import type {MehanAtmosphere} from './atmospheres';
import {
  contrastRatio,
  ensureContrast,
  hexToOklch,
  hexToRgbaCss,
  normalizeHex,
  oklchToHex,
  withHexAlpha,
} from './color';

export type MehanPresetAccentId =
  | 'strawberry'
  | 'blueberry'
  | 'mint'
  | 'tangerine'
  | 'grape'
  | 'teal';

export interface MehanAccentPreset {
  id: MehanPresetAccentId;
  name: string;
  seed: string;
}

export const MEHAN_ACCENT_PRESETS: Record<
  MehanPresetAccentId,
  MehanAccentPreset
> = {
  strawberry: {id: 'strawberry', name: 'Strawberry', seed: '#d42a5f'},
  blueberry: {id: 'blueberry', name: 'Blueberry', seed: '#2563eb'},
  mint: {id: 'mint', name: 'Mint', seed: '#059669'},
  tangerine: {id: 'tangerine', name: 'Tangerine', seed: '#d95b16'},
  grape: {id: 'grape', name: 'Grape', seed: '#7c3aed'},
  teal: {id: 'teal', name: 'Teal', seed: '#0d9488'},
};

export interface ResolvedMehanAccent {
  id: string;
  name: string;
  seed: string;
  /** Lighter top stop (shade 500 equivalent) */
  shade500: string;
  /** Solid accent token in light mode — shade 600 (>= 4.55:1 against white) */
  accentLight: string;
  /** Deeper bottom gradient stop (shade 700 equivalent) */
  shade700: string;
  /** Solid accent token in dark mode */
  accentDark: string;
  /** Foreground on accentLight */
  onAccentLight: string;
  /** Foreground on accentDark */
  onAccentDark: string;
  /** Readable accent text/icon on light surface & well (>= 4.7:1) */
  textLight: string;
  /** Readable accent text/icon on dark surface & well (>= 4.8:1) */
  textDark: string;
  /** Soft translucent wash in light mode */
  mutedLight: string;
  /** Soft translucent wash in dark mode */
  mutedDark: string;
  /** Solid soft background for selected chips/rows in light mode */
  softSolidLight: string;
  /** Solid soft background for selected chips/rows in dark mode */
  softSolidDark: string;
  /** Smooth 3-stop sculptural gradient (500 -> 600 @ 40% -> 700 @ 100%) */
  buttonGradient: string;
  /** Hover gradient (500+ -> 600 @ 55% -> 700 @ 100%) */
  buttonGradientHover: string;
  /** Harmonious 1-shade-darker bottom lip (shade 800, smooth curve from 700) */
  buttonLip: string;
  /** Tight 1px contact shadow rgba() (shade 900 @ 22%) */
  buttonContactShadow: string;
  /** Mid colored shadow rgba() (shade 700 @ 28%) */
  buttonMidShadow: string;
  /** Diffused colored ambient glow rgba() (shade 700 @ 42%) */
  buttonGlow: string;
  /** Pressed inner shadow rgba() (shade 950 @ 32%) */
  buttonPressedInner: string;
}

export function isPresetAccent(value: string): value is MehanPresetAccentId {
  return Object.prototype.hasOwnProperty.call(MEHAN_ACCENT_PRESETS, value);
}

export function resolveMehanAccent(
  accentInput: MehanPresetAccentId | string,
  atmosphere: MehanAtmosphere,
): ResolvedMehanAccent {
  const preset = isPresetAccent(accentInput)
    ? MEHAN_ACCENT_PRESETS[accentInput]
    : null;
  const rawSeed = preset ? preset.seed : normalizeHex(accentInput);
  const {l: seedL, c: seedC, h} = hexToOklch(rawSeed);
  const chroma = Math.max(0.12, Math.min(0.24, seedC || 0.16));

  // Shade 600: solid fill carrying crisp white text (#ffffff) at >= 4.55:1
  const baseSolidCandidate = preset
    ? rawSeed
    : oklchToHex(Math.min(seedL, 0.545), chroma, h);
  const accentLight = ensureContrast(
    baseSolidCandidate,
    '#ffffff',
    4.55,
    'darker',
  );
  const onAccentLight = '#ffffff';

  // Dark mode semantic accent: luminous vivid stop (~0.75 L) with dark ink
  const rawDarkAccent = oklchToHex(0.75, Math.min(chroma * 0.92, 0.19), h);
  const accentDark =
    contrastRatio(rawDarkAccent, atmosphere.dark.ink) >= 4.5
      ? rawDarkAccent
      : ensureContrast(rawDarkAccent, '#14110f', 4.6, 'lighter');
  const onAccentDark =
    contrastRatio('#14110f', accentDark) >= 4.5 ? '#14110f' : '#ffffff';

  // Text/icon accent stops guaranteed >= 4.75:1 against both surface and well
  const textLight = ensureContrast(
    accentLight,
    atmosphere.light.well,
    4.75,
    'darker',
  );
  const textDark = ensureContrast(
    oklchToHex(0.78, Math.min(chroma * 0.9, 0.18), h),
    atmosphere.dark.surface,
    4.8,
    'lighter',
  );

  // Sculptural OKLCH shade ladder (500 -> 600 -> 700 -> 800 perceptual lip)
  const s600 = hexToOklch(accentLight);
  const shade500 = oklchToHex(
    Math.min(s600.l + 0.076, 0.65),
    Math.min(s600.c * 0.95, 0.24),
    h,
  );
  const shade700 = oklchToHex(
    Math.max(s600.l - 0.056, 0.41),
    Math.min(s600.c * 0.99, 0.24),
    h,
  );
  const s700 = hexToOklch(shade700);

  // Shade 800 lip sits smoothly ~0.062 below shade 700 while keeping rich chroma
  // so the bottom bevel reads as one continuous curved keycap, never a dark band.
  const buttonLip = oklchToHex(
    Math.max(s700.l - 0.062, 0.34),
    Math.min(s600.c * 0.84, 0.21),
    h,
  );
  const shade900 = oklchToHex(
    Math.max(s700.l - 0.11, 0.28),
    Math.min(s600.c * 0.65, 0.16),
    h,
  );
  const shade950 = oklchToHex(
    Math.max(s700.l - 0.18, 0.2),
    Math.min(s600.c * 0.5, 0.12),
    h,
  );

  const hoverTop = oklchToHex(
    Math.min(s600.l + 0.095, 0.67),
    Math.min(s600.c * 0.97, 0.24),
    h,
  );

  const softSolidLight = oklchToHex(0.96, Math.min(chroma * 0.18, 0.032), h);
  const softSolidDark = oklchToHex(0.24, Math.min(chroma * 0.34, 0.058), h);

  return {
    id: preset ? preset.id : `custom-${rawSeed.slice(1)}`,
    name: preset ? preset.name : `Custom (${rawSeed})`,
    seed: rawSeed,
    shade500,
    accentLight,
    shade700,
    accentDark,
    onAccentLight,
    onAccentDark,
    textLight,
    textDark,
    mutedLight: withHexAlpha(accentLight, 0.13),
    mutedDark: withHexAlpha(accentDark, 0.2),
    softSolidLight,
    softSolidDark,
    buttonGradient: `linear-gradient(180deg, ${shade500} 0%, ${accentLight} 40%, ${shade700} 100%)`,
    buttonGradientHover: `linear-gradient(180deg, ${hoverTop} 0%, ${accentLight} 55%, ${shade700} 100%)`,
    buttonLip,
    buttonContactShadow: hexToRgbaCss(shade900, 0.22),
    buttonMidShadow: hexToRgbaCss(shade700, 0.28),
    buttonGlow: hexToRgbaCss(shade700, 0.42),
    buttonPressedInner: hexToRgbaCss(shade950, 0.32),
  };
}
