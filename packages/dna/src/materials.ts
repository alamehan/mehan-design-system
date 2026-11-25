/**
 * Mehan 7-Role Tactile Material, Scale & Semantic Status System.
 * Combines warm Shotcandy ("Confectionery") physicality with full parametric
 * freedom across atmospheres, accents, typography, spacing, sizing, radii,
 * motion, lip depth, segmented active style, and input well style.
 */

import {
  MEHAN_ATMOSPHERES,
  type MehanAtmosphere,
  type MehanAtmosphereId,
} from './atmospheres';
import {
  resolveMehanAccent,
  type MehanPresetAccentId,
  type ResolvedMehanAccent,
} from './accents';
import {ensureContrast, mixHex, withHexAlpha} from './color';

export type MehanDensity = 'standard' | 'compact';
export type MehanMotion = 'expressive' | 'standard' | 'crisp' | 'calm';
export type MehanLipStyle = 'candy' | 'subtle' | 'flat';
export type MehanSegmentedStyle = 'raised' | 'espresso';
export type MehanWellStyle = 'recessed' | 'bordered';

export interface MehanThemeOptions {
  /** Lower-kebab theme slug (e.g. 'mehan-confectionery') */
  name: string;
  /** Neutral atmosphere ('confectionery' | 'porcelain' | 'stone') */
  atmosphere?: MehanAtmosphereId;
  /** Preset brand accent or any '#rrggbb' hex seed */
  accent?: MehanPresetAccentId | string;
  /** Shadow depth multiplier (0 .. 2, default 1) */
  depth?: number;
  /** Corner radius multiplier (0 .. 2, default 1) */
  radiusScale?: number;
  /** Optional explicit inner radius base in px (e.g. 2, 4, 6, 8) */
  radiusBase?: number;
  /** Optional spacing base step in px (default 4 -> --spacing-1 = 0.25rem) */
  spacingBase?: number;
  /** Optional medium control height in px (e.g. 28, 32, 36, 40, 48) */
  sizeBase?: number;
  /** Optional typography base font size in px (default 14; supports 13.5 etc.) */
  typeBase?: number;
  /** Optional typography geometric ratio (default 1.22) */
  typeRatio?: number;
  /** Optional heading font family */
  headingFont?: string;
  /** Optional body font family */
  bodyFont?: string;
  /** Optional code/monospace font family */
  codeFont?: string;
  /** Desktop control & layout rhythm ('standard' 36px | 'compact' 32px, default 'standard') */
  density?: MehanDensity;
  /** Motion personality ('expressive' | 'standard' | 'crisp' | 'calm', default 'expressive') */
  motion?: MehanMotion;
  /** Motion speed multiplier (0.5 .. 2, default 1) */
  durationStep?: number;
  /** Primary button bottom-lip craft ('candy' 3px | 'subtle' 2px | 'flat' 0px, default 'candy') */
  lipStyle?: MehanLipStyle;
  /** Active SegmentedControl pill treatment ('raised' ceramic | 'espresso' Shotcandy inverted ink) */
  segmentedStyle?: MehanSegmentedStyle;
  /** Form input surface treatment ('recessed' carved well | 'bordered' crisp 1px edge) */
  wellStyle?: MehanWellStyle;
}

export interface CategoricalFamilyStops {
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  textLight: string;
  textDark: string;
}

export interface ResolvedMehanDna {
  name: string;
  atmosphere: MehanAtmosphere;
  accent: ResolvedMehanAccent;
  depth: number;
  radiusScale: number;
  radiusBase?: number;
  spacingBase: number;
  sizeBase: number;
  typeBase: number;
  typeRatio: number;
  durationStep: number;
  density: MehanDensity;
  motion: MehanMotion;
  lipStyle: MehanLipStyle;
  lipPx: number;
  segmentedStyle: MehanSegmentedStyle;
  wellStyle: MehanWellStyle;
  sizing: {
    controlSm: string;
    controlMd: string;
    controlLg: string;
    cardPadding: string;
    fieldGap: string;
  };
  radii: {
    inner: string;
    element: string;
    container: string;
    page: string;
    chat: string;
  };
  typography: {
    displayFamily: string;
    bodyFamily: string;
    monoFamily: string;
  };
  statuses: {
    info: {
      solid: [string, string];
      text: [string, string];
      muted: [string, string];
      onSolid: [string, string];
      onMuted: [string, string];
    };
    success: {
      solid: [string, string];
      text: [string, string];
      muted: [string, string];
      onSolid: [string, string];
      onMuted: [string, string];
    };
    warning: {
      solid: [string, string];
      text: [string, string];
      muted: [string, string];
      onSolid: [string, string];
      onMuted: [string, string];
    };
    error: {
      solid: [string, string];
      text: [string, string];
      muted: [string, string];
      softSolid: [string, string];
      onSolid: [string, string];
      onMuted: [string, string];
    };
  };
  categorical: Record<
    | 'blue'
    | 'cyan'
    | 'gray'
    | 'green'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow',
    CategoricalFamilyStops
  >;
  materials: {
    light: {
      raisedGradient: string;
      knobGradient: string;
      cardHairline: string;
      shadowWell: string;
      shadowSocket: string;
      shadowRaised: string;
      shadowRaisedHover: string;
      shadowPressed: string;
      shadowCard: string;
      shadowFloat: string;
      shadowModal: string;
      shadowKnob: string;
      shadowPrimary: string;
      shadowPrimaryHover: string;
      shadowPrimaryPressed: string;
      shadowDanger: string;
      shadowDangerPressed: string;
    };
    dark: {
      raisedGradient: string;
      knobGradient: string;
      cardHairline: string;
      shadowWell: string;
      shadowSocket: string;
      shadowRaised: string;
      shadowRaisedHover: string;
      shadowPressed: string;
      shadowCard: string;
      shadowFloat: string;
      shadowModal: string;
      shadowKnob: string;
      shadowPrimary: string;
      shadowPrimaryHover: string;
      shadowPrimaryPressed: string;
      shadowDanger: string;
      shadowDangerPressed: string;
    };
  };
}

function px(val: number): string {
  return `${Number(val.toFixed(2))}px`;
}

export function defaultAccentForAtmosphere(
  atmosphereId: MehanAtmosphereId,
): MehanPresetAccentId {
  switch (atmosphereId) {
    case 'porcelain':
      return 'blueberry';
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
    case 'confectionery':
      return 'strawberry';
    default:
      return 'blueberry';
  }
}

export function resolveMehanDna(options: MehanThemeOptions): ResolvedMehanDna {
  const atmosphereId = options.atmosphere ?? 'porcelain';
  const atmosphere = MEHAN_ATMOSPHERES[atmosphereId] ?? MEHAN_ATMOSPHERES.porcelain;
  const defaultAccent = defaultAccentForAtmosphere(atmosphere.id);
  const accent = resolveMehanAccent(options.accent ?? defaultAccent, atmosphere);
  const depth = Math.min(2, Math.max(0, options.depth ?? 1));
  const rScale = Math.min(2, Math.max(0, options.radiusScale ?? 1));
  const density: MehanDensity = options.density ?? 'standard';
  const motion: MehanMotion = options.motion ?? 'expressive';
  const lipStyle: MehanLipStyle = options.lipStyle ?? 'candy';
  const lipPx = lipStyle === 'candy' ? 3 : lipStyle === 'subtle' ? 2 : 0;
  const segmentedStyle: MehanSegmentedStyle = options.segmentedStyle ?? 'raised';
  const wellStyle: MehanWellStyle = options.wellStyle ?? 'recessed';

  const spacingBase = Math.min(16, Math.max(0, options.spacingBase ?? 4));
  const defaultSizeMd = density === 'compact' ? 32 : 36;
  const sizeBase = Math.min(56, Math.max(24, options.sizeBase ?? defaultSizeMd));
  const typeBase = Math.min(24, Math.max(10, options.typeBase ?? 14));
  const typeRatio = Math.min(1.7, Math.max(1.05, options.typeRatio ?? 1.22));
  const durationStep = Math.min(2, Math.max(0.5, options.durationStep ?? 1));

  const L = atmosphere.light;
  const D = atmosphere.dark;
  const sRgb = L.shadowRgb;

  const infoSolidL = ensureContrast('#0284c7', '#ffffff', 4.8, 'darker');
  const infoOnSolidD = ensureContrast('#082f49', '#38bdf8', 4.9, 'darker');
  const successSolidL = ensureContrast('#158058', '#ffffff', 4.8, 'darker');
  const successOnSolidD = ensureContrast('#0b291c', '#4ade80', 4.9, 'darker');
  const warnSolidL = ensureContrast('#b45309', '#ffffff', 4.8, 'darker');
  const warnOnSolidD = ensureContrast('#261600', '#fbbf24', 4.9, 'darker');
  const errSolidL = ensureContrast('#dc2626', '#ffffff', 4.8, 'darker');
  const errOnSolidD = ensureContrast('#2b0907', '#f87171', 4.9, 'darker');

  const infoTextL = ensureContrast('#1d5bbf', mixHex(L.well, infoSolidL, 0.15), 4.85, 'darker');
  const infoTextD = ensureContrast('#7cb3ff', mixHex(D.surface, '#38bdf8', 0.2), 4.9, 'lighter');
  const successTextL = ensureContrast('#14704e', mixHex(L.well, successSolidL, 0.15), 4.85, 'darker');
  const successTextD = ensureContrast('#5cd6a9', mixHex(D.surface, '#4ade80', 0.2), 4.9, 'lighter');
  const warnTextL = ensureContrast('#9a5206', mixHex(L.well, '#d97706', 0.18), 4.85, 'darker');
  const warnTextD = ensureContrast('#ffb562', mixHex(D.surface, '#fbbf24', 0.2), 4.9, 'lighter');
  const errTextL = ensureContrast('#b91c1c', mixHex(L.well, errSolidL, 0.15), 4.85, 'darker');
  const errTextD = ensureContrast('#ff8b82', mixHex(D.surface, '#f87171', 0.2), 4.9, 'lighter');

  const errSoftSolidL = mixHex(L.surface, '#fee2e2', 0.78);
  const errSoftSolidD = mixHex(D.surface, '#450a0a', 0.58);
  const safeErrTextOnSoftL = ensureContrast(errTextL, errSoftSolidL, 4.75, 'darker');
  const safeErrTextOnSoftD = ensureContrast(errTextD, errSoftSolidD, 4.8, 'lighter');

  function cat(
    bgL: string,
    bgD: string,
    strokeSeedL: string,
    strokeSeedD: string,
    txtL: string,
  ): CategoricalFamilyStops {
    return {
      bgLight: bgL,
      bgDark: bgD,
      borderLight: ensureContrast(strokeSeedL, L.surface, 3.05, 'darker'),
      borderDark: ensureContrast(strokeSeedD, D.surface, 3.05, 'lighter'),
      textLight: ensureContrast(txtL, bgL, 4.7, 'darker'),
      textDark: ensureContrast(txtL, bgD, 4.7, 'darker'),
    };
  }

  const categorical: ResolvedMehanDna['categorical'] = {
    blue: cat('#e6f0ff', '#dbeafe', '#3b82f6', '#60a5fa', '#18438f'),
    cyan: cat('#dff6fa', '#cffafe', '#0891b2', '#22d3ee', '#0e5666'),
    gray: cat('#eeebe5', '#e5e2dc', '#64748b', '#94a3b8', '#332e29'),
    green: cat('#def8eb', '#d1fae5', '#10b981', '#34d399', '#11593d'),
    orange: cat('#ffead4', '#ffedd5', '#ea580c', '#fb923c', '#7c3904'),
    pink: cat('#ffe4ed', '#fce7f3', '#db2777', '#f472b6', '#85183b'),
    purple: cat('#efe7ff', '#ede9fe', '#7c3aed', '#a78bfa', '#4c249e'),
    red: cat('#ffe4e1', '#fee2e2', '#dc2626', '#f87171', '#871d18'),
    teal: cat('#dcf6f1', '#ccfbf1', '#0d9488', '#2dd4bf', '#0f574e'),
    yellow: cat('#fff5c7', '#fef3c7', '#ca8a04', '#facc15', '#664c00'),
  };

  const lightPanelLip = mixHex(L.surface, L.line, 0.52);

  const radii =
    options.radiusBase !== undefined
      ? {
          inner: px(options.radiusBase),
          element: px(options.radiusBase * 2),
          container: px(options.radiusBase * 3),
          page: px(options.radiusBase * 7),
          chat: px(Math.max(12, options.radiusBase * 6)),
        }
      : {
          inner: px(7 * rScale),
          element: px(10 * rScale),
          container: px(16 * rScale),
          page: px(24 * rScale),
          chat: px(22 * rScale),
        };

  const lipInset = lipPx > 0 ? `inset 0 -${lipPx}px 0 ${accent.buttonLip}, ` : '';
  const lipPressedInset = lipPx > 0 ? `inset 0 -1px 0 ${accent.buttonLip}, ` : '';
  const secLipL = lipPx > 0 ? `inset 0 -${Math.min(2, lipPx)}px 0 ${L.line}, ` : '';
  const secLipD =
    lipPx > 0 ? `inset 0 -${Math.min(2, lipPx)}px 0 rgba(0, 0, 0, 0.34), ` : '';

  const shadowWellL =
    wellStyle === 'bordered'
      ? `inset 0 0 0 1px ${L.lineStrong}`
      : `inset 0 1px 2px rgba(${sRgb}, 0.11), inset 0 0 0 1px rgba(${sRgb}, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.90)`;
  const shadowWellD =
    wellStyle === 'bordered'
      ? `inset 0 0 0 1px ${D.lineStrong}`
      : `inset 0 1px 2px rgba(0, 0, 0, 0.60), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.08)`;

  return {
    name: options.name,
    atmosphere,
    accent,
    depth,
    radiusScale: rScale,
    radiusBase: options.radiusBase,
    spacingBase,
    sizeBase,
    typeBase,
    typeRatio,
    durationStep,
    density,
    motion,
    lipStyle,
    lipPx,
    segmentedStyle,
    wellStyle,
    sizing: {
      controlSm: px(Math.max(24, sizeBase - 4)),
      controlMd: px(sizeBase),
      controlLg: px(sizeBase + (options.sizeBase !== undefined ? 4 : 8)),
      cardPadding: px(spacingBase * (density === 'compact' ? 3 : 4)),
      fieldGap: px(density === 'compact' ? 4 : 6),
    },
    radii,
    typography: {
      displayFamily: options.headingFont ?? 'Bricolage Grotesque',
      bodyFamily: options.bodyFont ?? 'Figtree',
      monoFamily: options.codeFont ?? 'Geist Mono',
    },
    statuses: {
      info: {
        solid: [infoSolidL, '#38bdf8'],
        text: [infoTextL, infoTextD],
        muted: [withHexAlpha(infoSolidL, 0.12), withHexAlpha('#38bdf8', 0.18)],
        onSolid: ['#ffffff', infoOnSolidD],
        onMuted: [infoTextL, infoTextD],
      },
      success: {
        solid: [successSolidL, '#4ade80'],
        text: [successTextL, successTextD],
        muted: [withHexAlpha(successSolidL, 0.13), withHexAlpha('#4ade80', 0.18)],
        onSolid: ['#ffffff', successOnSolidD],
        onMuted: [successTextL, successTextD],
      },
      warning: {
        solid: [warnSolidL, '#fbbf24'],
        text: [warnTextL, warnTextD],
        muted: [withHexAlpha('#d97706', 0.15), withHexAlpha('#fbbf24', 0.18)],
        onSolid: ['#ffffff', warnOnSolidD],
        onMuted: [warnTextL, warnTextD],
      },
      error: {
        solid: [errSolidL, '#f87171'],
        text: [safeErrTextOnSoftL, safeErrTextOnSoftD],
        muted: [withHexAlpha(errSolidL, 0.12), withHexAlpha('#f87171', 0.18)],
        softSolid: [errSoftSolidL, errSoftSolidD],
        onSolid: ['#ffffff', errOnSolidD],
        onMuted: [safeErrTextOnSoftL, safeErrTextOnSoftD],
      },
    },
    categorical,
    materials: {
      light: {
        raisedGradient: `linear-gradient(180deg, ${L.raisedTop} 0%, ${L.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #ffffff 0%, #ffffff 38%, ${L.paper} 70%, ${mixHex(L.line, L.socket, 0.45)} 100%)`,
        cardHairline: withHexAlpha(L.ink, 0.06),
        shadowWell: shadowWellL,
        shadowSocket: `inset 0 1px 2px rgba(${sRgb}, 0.22), inset 0 0 0 1px rgba(${sRgb}, 0.06), inset 0 -1px 0 rgba(255, 255, 255, 0.90)`,
        shadowRaised: `inset 0 1px 0 #ffffff, ${secLipL}0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.04 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(${sRgb}, ${(0.05 * depth).toFixed(3)}), 0 ${px(6 * depth)} ${px(8 * depth)} -4px rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 #ffffff, ${secLipL}0 0 0 1px rgba(${sRgb}, 0.06), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(${sRgb}, ${(0.05 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(8 * depth)} -2px rgba(${sRgb}, ${(0.08 * depth).toFixed(3)}), 0 ${px(12 * depth)} ${px(16 * depth)} -6px rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 1px 2px rgba(${sRgb}, 0.18), inset 0 0 0 1px rgba(${sRgb}, 0.06)`,
        shadowCard: `inset 0 -2px 0 ${lightPanelLip}, 0 0 0 1px rgba(${sRgb}, 0.04), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.03 * depth).toFixed(3)}), 0 ${px(3 * depth)} ${px(5 * depth)} rgba(${sRgb}, ${(0.04 * depth).toFixed(3)}), 0 ${px(10 * depth)} ${px(18 * depth)} -8px rgba(${sRgb}, ${(0.08 * depth).toFixed(3)}), 0 ${px(26 * depth)} ${px(40 * depth)} -22px rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 #ffffff, 0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(${sRgb}, ${(0.06 * depth).toFixed(3)}), 0 ${px(8 * depth)} ${px(16 * depth)} -4px rgba(${sRgb}, ${(0.12 * depth).toFixed(3)}), 0 ${px(24 * depth)} ${px(44 * depth)} -16px rgba(${sRgb}, ${(0.24 * depth).toFixed(3)})`,
        shadowModal: `0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(8 * depth)} ${px(20 * depth)} rgba(${sRgb}, ${(0.12 * depth).toFixed(3)}), 0 ${px(44 * depth)} ${px(100 * depth)} -24px rgba(${sRgb}, ${(0.38 * depth).toFixed(3)})`,
        shadowKnob: `0 0 0 0.5px rgba(${sRgb}, 0.08), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.10 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(${sRgb}, ${(0.14 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(8 * depth)} -3px rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.36), ${lipInset}0 ${px(1 * depth)} ${px(1 * depth)} ${accent.buttonContactShadow}, 0 ${px(3 * depth)} ${px(5 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(9 * depth)} ${px(14 * depth)} -6px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.44), ${lipInset}0 ${px(2 * depth)} ${px(3 * depth)} ${accent.buttonContactShadow}, 0 ${px(5 * depth)} ${px(8 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(11 * depth)} ${px(18 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.18), ${lipPressedInset}inset 0 2px 4px ${accent.buttonPressedInner}, 0 ${px(1 * depth)} ${px(2 * depth)} ${accent.buttonContactShadow}`,
        shadowDanger: `inset 0 1px 0 #ffffff, inset 0 -2px 0 rgba(185, 28, 28, 0.18), 0 0 0 1px rgba(185, 28, 28, 0.08), 0 1px 1px rgba(185, 28, 28, 0.08), 0 ${px(5 * depth)} ${px(8 * depth)} -4px rgba(185, 28, 28, 0.24)`,
        shadowDangerPressed: `inset 0 1px 2px rgba(185, 28, 28, 0.22), inset 0 0 0 1px rgba(185, 28, 28, 0.12)`,
      },
      dark: {
        raisedGradient: `linear-gradient(180deg, ${D.raisedTop} 0%, ${D.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #ffffff 0%, #f1f5f9 40%, #cbd5e1 72%, #94a3b8 100%)`,
        cardHairline: 'rgba(255, 255, 255, 0.065)',
        shadowWell: shadowWellD,
        shadowSocket: `inset 0 1px 2px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.14)`,
        shadowRaised: `inset 0 1px 0 rgba(255, 255, 255, 0.10), ${secLipD}0 0 0 1px rgba(255, 255, 255, 0.05), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, ${(0.32 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.28 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(9 * depth)} -3px rgba(0, 0, 0, ${(0.40 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 rgba(255, 255, 255, 0.14), ${secLipD}0 0 0 1px rgba(255, 255, 255, 0.08), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(9 * depth)} -2px rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(10 * depth)} ${px(14 * depth)} -4px rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 1px 3px rgba(0, 0, 0, 0.56), inset 0 0 0 1px rgba(255, 255, 255, 0.05)`,
        shadowCard: `inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.30 * depth).toFixed(3)}), 0 ${px(6 * depth)} ${px(12 * depth)} -4px rgba(0, 0, 0, ${(0.35 * depth).toFixed(3)}), 0 ${px(14 * depth)} ${px(28 * depth)} -10px rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(30 * depth)} ${px(48 * depth)} -24px rgba(0, 0, 0, ${(0.60 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 ${px(2 * depth)} ${px(6 * depth)} rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(8 * depth)} ${px(18 * depth)} -4px rgba(0, 0, 0, ${(0.48 * depth).toFixed(3)}), 0 ${px(20 * depth)} ${px(48 * depth)} -14px rgba(0, 0, 0, ${(0.68 * depth).toFixed(3)})`,
        shadowModal: `inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 ${px(8 * depth)} ${px(20 * depth)} rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(44 * depth)} ${px(100 * depth)} -24px rgba(0, 0, 0, ${(0.72 * depth).toFixed(3)})`,
        shadowKnob: `0 0 0 0.5px rgba(0, 0, 0, 0.35), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.42 * depth).toFixed(3)}), 0 ${px(4 * depth)} ${px(7 * depth)} -2px rgba(0, 0, 0, ${(0.45 * depth).toFixed(3)})`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.32), ${lipInset}0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, 0.45), 0 ${px(3 * depth)} ${px(6 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(9 * depth)} ${px(16 * depth)} -6px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.40), ${lipInset}0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, 0.48), 0 ${px(5 * depth)} ${px(9 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(11 * depth)} ${px(20 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.16), ${lipPressedInset}inset 0 2px 4px rgba(0, 0, 0, 0.45), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, 0.45)`,
        shadowDanger: `inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(248, 113, 113, 0.18), 0 1px 2px rgba(0, 0, 0, 0.35), 0 ${px(5 * depth)} ${px(10 * depth)} -4px rgba(0, 0, 0, 0.45)`,
        shadowDangerPressed: `inset 0 1px 3px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(248, 113, 113, 0.18)`,
      },
    },
  };
}
