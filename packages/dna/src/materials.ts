/**
 * Mehan 7-Role Tactile Material & Semantic Status System.
 * Synthesizes Shotcandy's warm atmospheres with Tools Factory SDK's silky
 * 4-layer feathered shadows, seamless button lips, soft-tactile danger,
 * and full 6-knob parametric control.
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
export type MehanMotion = 'expressive' | 'standard' | 'calm';

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
  /** Desktop control & layout rhythm ('standard' 36px | 'compact' 32px, default 'standard') */
  density?: MehanDensity;
  /** Motion personality ('expressive' | 'standard' | 'calm', default 'expressive') */
  motion?: MehanMotion;
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
  density: MehanDensity;
  motion: MehanMotion;
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
  const density: MehanDensity = options.density ?? 'standard';
  const motion: MehanMotion = options.motion ?? 'expressive';

  const L = atmosphere.light;
  const D = atmosphere.dark;
  const sRgb = L.shadowRgb;

  // Semantic statuses verified >= 4.7:1 against both light & dark surfaces
  const infoTextL = ensureContrast('#1d5bbf', L.well, 4.75, 'darker');
  const infoTextD = ensureContrast('#7cb3ff', D.surface, 4.85, 'lighter');
  const successTextL = ensureContrast('#14704e', L.well, 4.75, 'darker');
  const successTextD = ensureContrast('#5cd6a9', D.surface, 4.85, 'lighter');
  const warnTextL = ensureContrast('#9a5206', L.well, 4.75, 'darker');
  const warnTextD = ensureContrast('#ffb562', D.surface, 4.85, 'lighter');
  const errTextL = ensureContrast('#b91c1c', L.well, 4.8, 'darker');
  const errTextD = ensureContrast('#ff8b82', D.surface, 4.85, 'lighter');

  // Opaque soft danger surfaces for tactile destructive buttons (>= 4.75:1 with errText)
  const errSoftSolidL = mixHex(L.surface, '#fee2e2', 0.78);
  const errSoftSolidD = mixHex(D.surface, '#450a0a', 0.58);
  const safeErrTextOnSoftL = ensureContrast(errTextL, errSoftSolidL, 4.75, 'darker');
  const safeErrTextOnSoftD = ensureContrast(errTextD, errSoftSolidD, 4.8, 'lighter');

  // Categorical stops: luminous pastel card fills + >= 3.05:1 WCAG 1.4.11 chart/graphical strokes
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

  // Soft-lip neutral tone for raised secondary buttons & panels (modeled on design-system.css)
  const lightPanelLip = mixHex(L.surface, L.line, 0.52);

  return {
    name: options.name,
    atmosphere,
    accent,
    depth,
    radiusScale: rScale,
    density,
    motion,
    sizing:
      density === 'compact'
        ? {
            controlSm: '28px',
            controlMd: '32px',
            controlLg: '40px',
            cardPadding: '12px',
            fieldGap: '4px',
          }
        : {
            controlSm: '32px',
            controlMd: '36px',
            controlLg: '44px',
            cardPadding: '16px',
            fieldGap: '6px',
          },
    radii: {
      inner: px(8 * rScale),
      element: px(12 * rScale),
      container: px(18 * rScale),
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
        solid: ['#0284c7', '#38bdf8'],
        text: [infoTextL, infoTextD],
        muted: [withHexAlpha('#0284c7', 0.12), withHexAlpha('#38bdf8', 0.18)],
        onSolid: ['#ffffff', '#082f49'],
        onMuted: [infoTextL, infoTextD],
      },
      success: {
        solid: ['#158058', '#4ade80'],
        text: [successTextL, successTextD],
        muted: [withHexAlpha('#158058', 0.13), withHexAlpha('#4ade80', 0.18)],
        onSolid: ['#ffffff', '#0b291c'],
        onMuted: [successTextL, successTextD],
      },
      warning: {
        solid: ['#b45309', '#fbbf24'],
        text: [warnTextL, warnTextD],
        muted: [withHexAlpha('#d97706', 0.15), withHexAlpha('#fbbf24', 0.18)],
        onSolid: ['#ffffff', '#261600'],
        onMuted: [warnTextL, warnTextD],
      },
      error: {
        solid: ['#dc2626', '#f87171'],
        text: [safeErrTextOnSoftL, safeErrTextOnSoftD],
        muted: [withHexAlpha('#dc2626', 0.12), withHexAlpha('#f87171', 0.18)],
        softSolid: [errSoftSolidL, errSoftSolidD],
        onSolid: ['#ffffff', '#2b0907'],
        onMuted: [safeErrTextOnSoftL, safeErrTextOnSoftD],
      },
    },
    categorical,
    materials: {
      light: {
        raisedGradient: `linear-gradient(180deg, ${L.raisedTop} 0%, ${L.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #ffffff 0%, #ffffff 38%, ${L.paper} 70%, ${mixHex(L.line, L.socket, 0.45)} 100%)`,
        cardHairline: withHexAlpha(L.ink, 0.06),
        shadowWell: `inset 0 1px 2px rgba(${sRgb}, 0.11), inset 0 0 0 1px rgba(${sRgb}, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.90)`,
        shadowSocket: `inset 0 1px 2px rgba(${sRgb}, 0.22), inset 0 0 0 1px rgba(${sRgb}, 0.06), inset 0 -1px 0 rgba(255, 255, 255, 0.90)`,
        shadowRaised: `inset 0 1px 0 #ffffff, inset 0 -2px 0 ${L.line}, 0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.04 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(${sRgb}, ${(0.05 * depth).toFixed(3)}), 0 ${px(6 * depth)} ${px(8 * depth)} -4px rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 #ffffff, inset 0 -2px 0 ${L.line}, 0 0 0 1px rgba(${sRgb}, 0.06), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(${sRgb}, ${(0.05 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(8 * depth)} -2px rgba(${sRgb}, ${(0.08 * depth).toFixed(3)}), 0 ${px(12 * depth)} ${px(16 * depth)} -6px rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 1px 2px rgba(${sRgb}, 0.18), inset 0 0 0 1px rgba(${sRgb}, 0.06)`,
        shadowCard: `inset 0 -2px 0 ${lightPanelLip}, 0 0 0 1px rgba(${sRgb}, 0.04), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.03 * depth).toFixed(3)}), 0 ${px(3 * depth)} ${px(5 * depth)} rgba(${sRgb}, ${(0.04 * depth).toFixed(3)}), 0 ${px(10 * depth)} ${px(18 * depth)} -8px rgba(${sRgb}, ${(0.08 * depth).toFixed(3)}), 0 ${px(26 * depth)} ${px(40 * depth)} -22px rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 #ffffff, 0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(${sRgb}, ${(0.06 * depth).toFixed(3)}), 0 ${px(8 * depth)} ${px(16 * depth)} -4px rgba(${sRgb}, ${(0.12 * depth).toFixed(3)}), 0 ${px(24 * depth)} ${px(44 * depth)} -16px rgba(${sRgb}, ${(0.24 * depth).toFixed(3)})`,
        shadowModal: `0 0 0 1px rgba(${sRgb}, 0.05), 0 ${px(8 * depth)} ${px(20 * depth)} rgba(${sRgb}, ${(0.12 * depth).toFixed(3)}), 0 ${px(44 * depth)} ${px(100 * depth)} -24px rgba(${sRgb}, ${(0.38 * depth).toFixed(3)})`,
        shadowKnob: `0 0 0 0.5px rgba(${sRgb}, 0.08), 0 ${px(1 * depth)} ${px(1 * depth)} rgba(${sRgb}, ${(0.10 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(${sRgb}, ${(0.14 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(8 * depth)} -3px rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(1 * depth)} ${px(1 * depth)} ${accent.buttonContactShadow}, 0 ${px(3 * depth)} ${px(5 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(9 * depth)} ${px(14 * depth)} -6px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.44), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(2 * depth)} ${px(3 * depth)} ${accent.buttonContactShadow}, 0 ${px(5 * depth)} ${px(8 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(11 * depth)} ${px(18 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 ${accent.buttonLip}, inset 0 2px 4px ${accent.buttonPressedInner}, 0 ${px(1 * depth)} ${px(2 * depth)} ${accent.buttonContactShadow}`,
        shadowDanger: `inset 0 1px 0 #ffffff, inset 0 -2px 0 rgba(185, 28, 28, 0.18), 0 0 0 1px rgba(185, 28, 28, 0.08), 0 1px 1px rgba(185, 28, 28, 0.08), 0 ${px(5 * depth)} ${px(8 * depth)} -4px rgba(185, 28, 28, 0.24)`,
        shadowDangerPressed: `inset 0 1px 2px rgba(185, 28, 28, 0.22), inset 0 0 0 1px rgba(185, 28, 28, 0.12)`,
      },
      dark: {
        raisedGradient: `linear-gradient(180deg, ${D.raisedTop} 0%, ${D.raisedBottom} 100%)`,
        knobGradient: `radial-gradient(circle at 36% 28%, #ffffff 0%, #f1f5f9 40%, #cbd5e1 72%, #94a3b8 100%)`,
        cardHairline: 'rgba(255, 255, 255, 0.065)',
        shadowWell: `inset 0 1px 2px rgba(0, 0, 0, 0.60), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.08)`,
        shadowSocket: `inset 0 1px 2px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.14)`,
        shadowRaised: `inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, ${(0.32 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.28 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(9 * depth)} -3px rgba(0, 0, 0, ${(0.40 * depth).toFixed(3)})`,
        shadowRaisedHover: `inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 ${px(2 * depth)} ${px(3 * depth)} rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(5 * depth)} ${px(9 * depth)} -2px rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(10 * depth)} ${px(14 * depth)} -4px rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`,
        shadowPressed: `inset 0 1px 3px rgba(0, 0, 0, 0.56), inset 0 0 0 1px rgba(255, 255, 255, 0.05)`,
        shadowCard: `inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.30 * depth).toFixed(3)}), 0 ${px(6 * depth)} ${px(12 * depth)} -4px rgba(0, 0, 0, ${(0.35 * depth).toFixed(3)}), 0 ${px(14 * depth)} ${px(28 * depth)} -10px rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(30 * depth)} ${px(48 * depth)} -24px rgba(0, 0, 0, ${(0.60 * depth).toFixed(3)})`,
        shadowFloat: `inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 ${px(2 * depth)} ${px(6 * depth)} rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)}), 0 ${px(8 * depth)} ${px(18 * depth)} -4px rgba(0, 0, 0, ${(0.48 * depth).toFixed(3)}), 0 ${px(20 * depth)} ${px(48 * depth)} -14px rgba(0, 0, 0, ${(0.68 * depth).toFixed(3)})`,
        shadowModal: `inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 ${px(8 * depth)} ${px(20 * depth)} rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(44 * depth)} ${px(100 * depth)} -24px rgba(0, 0, 0, ${(0.72 * depth).toFixed(3)})`,
        shadowKnob: `0 0 0 0.5px rgba(0, 0, 0, 0.35), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)}), 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, ${(0.42 * depth).toFixed(3)}), 0 ${px(4 * depth)} ${px(7 * depth)} -2px rgba(0, 0, 0, ${(0.45 * depth).toFixed(3)})`,
        shadowPrimary: `inset 0 1px 0 rgba(255, 255, 255, 0.32), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, 0.45), 0 ${px(3 * depth)} ${px(6 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(9 * depth)} ${px(16 * depth)} -6px ${accent.buttonGlow}`,
        shadowPrimaryHover: `inset 0 1px 0 rgba(255, 255, 255, 0.40), inset 0 -3px 0 ${accent.buttonLip}, 0 ${px(2 * depth)} ${px(4 * depth)} rgba(0, 0, 0, 0.48), 0 ${px(5 * depth)} ${px(9 * depth)} -1px ${accent.buttonMidShadow}, 0 ${px(11 * depth)} ${px(20 * depth)} -5px ${accent.buttonGlow}`,
        shadowPrimaryPressed: `inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 ${accent.buttonLip}, inset 0 2px 4px rgba(0, 0, 0, 0.45), 0 ${px(1 * depth)} ${px(2 * depth)} rgba(0, 0, 0, 0.45)`,
        shadowDanger: `inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(248, 113, 113, 0.18), 0 1px 2px rgba(0, 0, 0, 0.35), 0 ${px(5 * depth)} ${px(10 * depth)} -4px rgba(0, 0, 0, 0.45)`,
        shadowDangerPressed: `inset 0 1px 3px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(248, 113, 113, 0.18)`,
      },
    },
  };
}
