/**
 * Mehan 7-Role Tactile Material & Semantic Status System.
 * Synthesizes Shotcandy's warm confectionery physicality with Mehan's
 * 7-role surface hierarchy, spherical 3D dome knobs, and high-contrast safety.
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
import {ensureContrast, withHexAlpha} from './color';

export interface MehanThemeOptions {
  /** Lower-kebab theme slug (e.g. 'mehan-confectionery') */
  name: string;
  /** Neutral atmosphere ('confectionery' | 'porcelain' | 'stone') */
  atmosphere?: MehanAtmosphereId;
  /** Preset brand accent or any '#rrggbb' hex seed */
  accent?: MehanPresetAccentId | string;
  /** Shadow depth multiplier (0.5 .. 1.5, default 1) */
  depth?: number;
  /** Corner radius multiplier (0.75 .. 1.25, default 1) */
  radiusScale?: number;
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
    info: {solid: [string, string]; text: [string, string]; muted: [string, string]; onSolid: [string, string]; onMuted: [string, string]};
    success: {solid: [string, string]; text: [string, string]; muted: [string, string]; onSolid: [string, string]; onMuted: [string, string]};
    warning: {solid: [string, string]; text: [string, string]; muted: [string, string]; onSolid: [string, string]; onMuted: [string, string]};
    error: {solid: [string, string]; text: [string, string]; muted: [string, string]; onSolid: [string, string]; onMuted: [string, string]};
  };
  categorical: Record<
    'blue' | 'cyan' | 'gray' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'teal' | 'yellow',
    CategoricalFamilyStops
  >;
  materials: {
    light: {
      raisedGradient: string;
      knobGradient: string;
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
    };
    dark: {
      raisedGradient: string;
      knobGradient: string;
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
    };
  };
}

function px(val: number): string {
  return `${Number(val.toFixed(2))}px`;
}

export function resolveMehanDna(options: MehanThemeOptions): ResolvedMehanDna {
  const atmosphereId = options.atmosphere ?? 'confectionery';
  const atmosphere = MEHAN_ATMOSPHERES[atmosphereId];
  const defaultAccent: MehanPresetAccentId =
    atmosphereId === 'confectionery'
      ? 'strawberry'
      : atmosphereId === 'porcelain'
        ? 'blueberry'
        : 'teal';
  const accent = resolveMehanAccent(options.accent ?? defaultAccent, atmosphere);
  const depth = Math.min(1.5, Math.max(0.5, options.depth ?? 1));
  const rScale = Math.min(1.25, Math.max(0.75, options.radiusScale ?? 1));

  const L = atmosphere.light;
  const D = atmosphere.dark;
  const sRgb = L.shadowRgb;

  // Semantic statuses verified >= 4.6:1 against both light & dark surfaces
  const infoTextL = ensureContrast('#1d5bbf', L.well, 4.7, 'darker');
  const infoTextD = ensureContrast('#7cb3ff', D.surface, 4.8, 'lighter');
  const successTextL = ensureContrast('#14704e', L.well, 4.7, 'darker');
  const successTextD = ensureContrast('#5cd6a9', D.surface, 4.8, 'lighter');
  const warnTextL = ensureContrast('#9a5206', L.well, 4.7, 'darker');
  const warnTextD = ensureContrast('#ffb562', D.surface, 4.8, 'lighter');
  const errTextL = ensureContrast('#be2620', L.well, 4.7, 'darker');
  const errTextD = ensureContrast('#ff857a', D.surface, 4.8, 'lighter');

  // Categorical pastel stops — Astryx Coloured Cards use bgLight/bgDark with dark ink on pastel!
  const categorical: ResolvedMehanDna['categorical'] = {
    blue: {bgLight: '#e0edff', bgDark: '#dbeafe', borderLight: '#b8d4ff', borderDark: '#93c5fd', textLight: '#18438f', textDark: '#18438f'},
    cyan: {bgLight: '#daf5fa', bgDark: '#cffafe', borderLight: '#a5e6f3', borderDark: '#67e8f9', textLight: '#0e5666', textDark: '#0e5666'},
    gray: {bgLight: '#ebe7e0', bgDark: '#e5e2dc', borderLight: '#d4cec3', borderDark: '#cbd5e1', textLight: '#332e29', textDark: '#332e29'},
    green: {bgLight: '#d9f7e8', bgDark: '#d1fae5', borderLight: '#a9ebc9', borderDark: '#6ee7b7', textLight: '#11593d', textDark: '#11593d'},
    orange: {bgLight: '#ffe6cc', bgDark: '#ffedd5', borderLight: '#ffc994', borderDark: '#fdba74', textLight: '#7c3904', textDark: '#7c3904'},
    pink: {bgLight: '#ffe0ea', bgDark: '#fce7f3', borderLight: '#ffb5cd', borderDark: '#f9a8d4', textLight: '#85183b', textDark: '#85183b'},
    purple: {bgLight: '#ece3ff', bgDark: '#ede9fe', borderLight: '#cbb6ff', borderDark: '#c4b5fd', textLight: '#4c249e', textDark: '#4c249e'},
    red: {bgLight: '#ffe1de', bgDark: '#fee2e2', borderLight: '#ffb8b0', borderDark: '#fca5a5', textLight: '#871d18', textDark: '#871d18'},
    teal: {bgLight: '#d6f5ef', bgDark: '#ccfbf1', borderLight: '#9ee6d9', borderDark: '#5eead4', textLight: '#0f574e', textDark: '#0f574e'},
    yellow: {bgLight: '#fff3bf', bgDark: '#fef3c7', borderLight: '#ffe074', borderDark: '#fcd34d', textLight: '#664c00', textDark: '#664c00'},
  };

  return {
    name: options.name,
    atmosphere,
    accent,
    depth,
    radiusScale: rScale,
    radii: {
      inner: px(7 * rScale),
      element: px(11 * rScale),
      container: px(16 * rScale),
      page: px(24 * rScale),
      chat: px(24 * rScale),
    },
    typography: {
      displayFamily: '"Bricolage Grotesque"',
      bodyFamily: '"Figtree"',
      monoFamily: '"Geist Mono"',
    },
    statuses: {
      info: {
        solid: ['#2563eb', '#60a5fa'],
        text: [infoTextL, infoTextD],
        muted: [withHexAlpha('#2563eb', 0.13), withHexAlpha('#60a5fa', 0.2)],
        onSolid: ['#ffffff', '#0f172a'],
        onMuted: [infoTextL, infoTextD],
      },
      success: {
        solid: ['#158058', '#4ade80'],
        text: [successTextL, successTextD],
        muted: [withHexAlpha('#158058', 0.14), withHexAlpha('#4ade80', 0.18)],
        onSolid: ['#ffffff', '#0b291c'],
        onMuted: [successTextL, successTextD],
      },
      warning: {
        solid: ['#c2670a', '#fbbf24'],
        text: [warnTextL, warnTextD],
        muted: [withHexAlpha('#d97706', 0.16), withHexAlpha('#fbbf24', 0.18)],
        onSolid: ['#ffffff', '#261600'],
        onMuted: [warnTextL, warnTextD],
      },
      error: {
        solid: ['#c82d26', '#f87171'],
        text: [errTextL, errTextD],
        muted: [withHexAlpha('#dc2626', 0.13), withHexAlpha('#f87171', 0.2)],
        onSolid: ['#ffffff', '#2b0907'],
        onMuted: [errTextL, errTextD],
      },
    },
    categorical,
    materials: {
      light: {
        raisedGradient: `linear-gradient(180deg, ${L.raisedTop} 0%, ${L.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #ffffff 0%, #ffffff 38%, ${L.paper} 72%, ${L.line} 100%)`,
        shadowWell: `inset 0 1px 2px rgba(${sRgb}, 0.10), inset 0 0 0 1px rgba(${sRgb}, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.82)`,
        shadowSocket: `inset 0 1px 2.5px rgba(${sRgb}, 0.22), inset 0 0 0 1px rgba(${sRgb}, 0.07), inset 0 -1px 0 rgba(255, 255, 255, 0.85)`,
        shadowRaised: `inset 0 1px 0 ${L.topHighlight}, inset 0 -2px 0 rgba(${sRgb}, 0.09), 0 0 0 1px rgba(${sRgb}, 0.07), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(${sRgb}, ${(0.07 * depth).toFixed(3)}), 0 ${px(4 * depth)} ${px(8 * depth)} -3px rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 #ffffff, inset 0 -2px 0 rgba(${sRgb}, 0.10), 0 0 0 1px rgba(${sRgb}, 0.09), 0 ${px(3 * depth)} ${px(8 * depth)} -2px rgba(${sRgb}, ${(0.15 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 1.5px 2.5px rgba(${sRgb}, 0.16), 0 0 0 1px rgba(${sRgb}, 0.08)`,
        shadowCard: `inset 0 1px 0 ${L.topHighlight}, 0 ${px(1 * depth)} ${px(2 * depth)} rgba(${sRgb}, ${(0.05 * depth).toFixed(3)}), 0 ${px(10 * depth)} ${px(24 * depth)} -10px rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 ${L.topHighlight}, 0 ${px(2 * depth)} ${px(6 * depth)} rgba(${sRgb}, ${(0.08 * depth).toFixed(3)}), 0 ${px(16 * depth)} ${px(38 * depth)} -12px rgba(${sRgb}, ${(0.24 * depth).toFixed(3)})`,
        shadowModal: `inset 0 1px 0 ${L.topHighlight}, 0 ${px(6 * depth)} ${px(16 * depth)} rgba(${sRgb}, ${(0.12 * depth).toFixed(3)}), 0 ${px(36 * depth)} ${px(84 * depth)} -20px rgba(${sRgb}, ${(0.36 * depth).toFixed(3)})`,
        shadowKnob: `inset 0 -2px 0 rgba(${sRgb}, 0.09), 0 0 0 1px rgba(${sRgb}, 0.08), 0 2px 5px rgba(${sRgb}, 0.22)`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.42), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(1 * depth)} ${px(2 * depth)} rgba(${sRgb}, 0.18), 0 ${px(6 * depth)} ${px(14 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.52), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(3 * depth)} ${px(6 * depth)} rgba(${sRgb}, 0.20), 0 ${px(9 * depth)} ${px(18 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 ${accent.buttonLip}, inset 0 2px 4px ${accent.buttonPressedInner}, 0 1px 2px rgba(${sRgb}, 0.22)`,
      },
      dark: {
        raisedGradient: `linear-gradient(180deg, ${D.raisedTop} 0%, ${D.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #fffaf4 0%, #f5ede4 42%, #ded2c5 76%, #c4b5a6 100%)`,
        shadowWell: `inset 0 1.5px 3px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.06)`,
        shadowSocket: `inset 0 2px 3.5px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.09)`,
        shadowRaised: `inset 0 1px 0 ${D.topHighlight}, inset 0 -2px 0 rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.07), 0 ${px(2 * depth)} ${px(5 * depth)} rgba(0, 0, 0, ${(0.38 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 rgba(255, 255, 255, 0.13), inset 0 -2px 0 rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.10), 0 ${px(5 * depth)} ${px(12 * depth)} -2px rgba(0, 0, 0, ${(0.52 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 2px 3.5px rgba(0, 0, 0, 0.62), 0 0 0 1px rgba(255, 255, 255, 0.06)`,
        shadowCard: `inset 0 1px 0 ${D.topHighlight}, 0 ${px(2 * depth)} ${px(5 * depth)} rgba(0, 0, 0, ${(0.35 * depth).toFixed(3)}), 0 ${px(14 * depth)} ${px(32 * depth)} -12px rgba(0, 0, 0, ${(0.58 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 ${px(3 * depth)} ${px(8 * depth)} rgba(0, 0, 0, ${(0.45 * depth).toFixed(3)}), 0 ${px(20 * depth)} ${px(48 * depth)} -12px rgba(0, 0, 0, ${(0.70 * depth).toFixed(3)})`,
        shadowModal: `inset 0 1px 0 rgba(255, 255, 255, 0.10), 0 ${px(8 * depth)} ${px(22 * depth)} rgba(0, 0, 0, ${(0.52 * depth).toFixed(3)}), 0 ${px(40 * depth)} ${px(92 * depth)} -20px rgba(0, 0, 0, ${(0.80 * depth).toFixed(3)})`,
        shadowKnob: `inset 0 -2px 0 rgba(74, 45, 20, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.55)`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, 0.45), 0 ${px(8 * depth)} ${px(16 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.46), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(4 * depth)} ${px(8 * depth)} rgba(0, 0, 0, 0.50), 0 ${px(10 * depth)} ${px(20 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 ${accent.buttonLip}, inset 0 2px 4px rgba(0, 0, 0, 0.48), 0 1px 2px rgba(0, 0, 0, 0.45)`,
      },
    },
  };
}
