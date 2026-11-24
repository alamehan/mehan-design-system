import {parseStyleKey} from '@astryxdesign/core/utils';
import {
  defineSyntaxTheme,
  defineTheme,
  type ComponentStyleMap,
  type DefineThemeInput,
  type DefinedTheme,
} from '@astryxdesign/core/theme';
import {
  resolveMehanDna,
  withHexAlpha,
  type MehanThemeOptions,
} from '@mehan/dna';
import {mehanIconRegistry} from './icons';

const lightDark = (light: string, dark: string): string =>
  `light-dark(${light}, ${dark})`;

const STRIPED_ROW = ':nth-child(even of :not([data-expansion-panel]))';

/**
 * All 46 Astryx surface-painting rules (from official Meta themes) so nested
 * inputs, popovers, menus, and cards inside pastel coloured cards reset text
 * tokens cleanly in both Light and Dark mode.
 */
const OWN_FILL_RULES: ReadonlyArray<readonly [string, string, string?]> = [
  ['card', 'variant:default'],
  ['card', 'variant:muted'],
  ['clickable-card', 'variant:default'],
  ['clickable-card', 'variant:muted'],
  ['selectable-card', 'variant:default'],
  ['selectable-card', 'variant:muted'],
  ['section', 'variant:section'],
  ['section', 'variant:muted'],
  ['app-shell', 'variant:surface'],
  ['app-shell', 'variant:section'],
  ['app-shell-header', 'variant:surface'],
  ['app-shell-sidenav', 'variant:surface'],
  ['layout-panel', 'base'],
  ['layout-content', 'base'],
  ['code', 'base'],
  ['avatar', 'base'],
  ['avatar-group-overflow', 'base'],
  ['segmented-control-item', 'selected'],
  ['step-indicator', 'progress:not-started'],
  ['table-row', 'striped', STRIPED_ROW],
  ['banner-content', 'base'],
  ['input-group-text', 'base'],
  ['text-input', 'base'],
  ['text-area', 'base'],
  ['number-input', 'base'],
  ['date-input', 'base'],
  ['date-range-input', 'base'],
  ['date-time-input-date-segment', 'base'],
  ['date-time-input-time-segment', 'base'],
  ['time-input', 'base'],
  ['file-input', 'base'],
  ['typeahead', 'base'],
  ['tokenizer', 'base'],
  ['selector', 'variant:input'],
  ['multi-selector', 'variant:input'],
  ['selector-popup', 'base'],
  ['multi-selector-popup', 'base'],
  ['dropdown-menu', 'base'],
  ['dropdown-menu-radio', 'base'],
  ['context-menu', 'base'],
  ['popover', 'base'],
  ['hover-card', 'base'],
  ['dialog', 'base'],
  ['drawer', 'base'],
  ['bottom-sheet', 'base'],
  ['chat-composer-drawer', 'base'],
];

const COLOURED_CARDS = [
  'blue',
  'cyan',
  'gray',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
] as const;

function ruleSelector(part: string, key: string): string {
  return `.astryx-${part}${parseStyleKey(key)}`;
}

const COLOURED_CARD = `:is(${COLOURED_CARDS.map(
  v => `.astryx-card[data-variant="${v}"]`,
).join(', ')})`;
const OWN_FILL = `:is(${OWN_FILL_RULES.filter(([, , s]) => !s)
  .map(([part, key]) => ruleSelector(part, key))
  .join(', ')})`;
const IN_COLOURED_CARD = `:where(${COLOURED_CARD} *):not(:where(${COLOURED_CARD} ${OWN_FILL} *))`;

const POPUP_CLOSED = ':not([aria-expanded="true"][aria-haspopup])';

/**
 * Builds the complete 6-axis `DefineThemeInput` for a Mehan theme.
 * Exported separately so source theme files in `themes/<slug>/` can pass an
 * explicit named `icons: mehanIconRegistry` import to `defineTheme()` for
 * `astryx theme build` static import preservation.
 */
export function buildMehanThemeConfig(
  options: MehanThemeOptions,
): Omit<DefineThemeInput, 'icons'> {
  const dna = resolveMehanDna(options);
  const L = dna.atmosphere.light;
  const D = dna.atmosphere.dark;
  const A = dna.accent;
  const S = dna.statuses;
  const C = dna.categorical;
  const sRgb = L.shadowRgb;
  const depth = dna.depth;
  const px = (val: number): string => `${Number(val.toFixed(2))}px`;

  const surfaceText = {
    '--color-text-primary': lightDark(L.ink, D.ink),
    '--color-text-secondary': lightDark(L.ink2, D.ink2),
    '--color-text-accent': lightDark(A.textLight, A.textDark),
  };

  function withOwnFillText(components: ComponentStyleMap): ComponentStyleMap {
    const out: ComponentStyleMap = {...components};
    for (const [part, key, selector] of OWN_FILL_RULES) {
      const rule = out[part]?.[key] ?? {};
      out[part] = {
        ...out[part],
        [key]: selector
          ? {
              ...rule,
              [selector]: {
                ...surfaceText,
                color: 'var(--color-text-primary)',
                ...((rule as Record<string, object>)[selector] ?? {}),
              },
            }
          : {...surfaceText, ...rule},
      };
    }
    return out;
  }

  const syntax = defineSyntaxTheme({
    name: `${dna.name}-syntax`,
    tokens: {
      keyword: [C.purple.textLight, '#c4b5fd'],
      string: [C.green.textLight, '#6ee7b7'],
      comment: [L.ink3, D.ink3],
      number: [C.orange.textLight, '#fdba74'],
      function: [C.blue.textLight, '#93c5fd'],
      type: [C.teal.textLight, '#5eead4'],
      variable: [L.ink, D.ink],
      operator: [L.ink2, D.ink2],
      constant: [C.orange.textLight, '#fcd34d'],
      tag: [C.pink.textLight, '#f9a8d4'],
      attribute: [C.purple.textLight, '#ddd6fe'],
      property: [C.blue.textLight, '#7dd3fc'],
      punctuation: [L.ink3, D.ink3],
      background: [L.well, D.well],
    },
  });

  // Recessed well styling shared across all 12 Astryx input targets
  const RECESSED_INPUT_BASE = {
    backgroundColor: 'var(--mehan-well)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--mehan-edge-control)',
    boxShadow: 'var(--mehan-shadow-well)',
    ':focus-within': {
      borderColor: 'var(--color-accent)',
      boxShadow: 'var(--mehan-shadow-well), 0 0 0 2px var(--color-accent-muted)',
    },
  } as const;

  const INPUT_STATUS_VARS = {
    'status:success': {
      '--color-border-success': lightDark(S.success.solid[0], S.success.solid[1]),
      '--color-icon-success': lightDark(S.success.text[0], S.success.text[1]),
    },
    'status:warning': {
      '--color-border-warning': lightDark(S.warning.solid[0], S.warning.solid[1]),
      '--color-icon-warning': lightDark(S.warning.text[0], S.warning.text[1]),
    },
    'status:error': {
      '--color-border-error': lightDark(S.error.solid[0], S.error.solid[1]),
      '--color-icon-error': lightDark(S.error.text[0], S.error.text[1]),
    },
  } as const;

  // Tactile raised secondary surface shared across Button & Selector triggers (AST-079 FR2 & FR6)
  const SECONDARY_RAISED = {
    backgroundColor: lightDark(L.surface, D.raisedBottom),
    backgroundImage: 'var(--mehan-raised-grad)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--mehan-edge-control)',
    color: 'var(--color-text-primary)',
    boxShadow: 'var(--mehan-shadow-raised)',
    ':hover': {
      boxShadow: 'var(--mehan-shadow-raised-hover)',
    },
  } as const;

  const SECONDARY_SELECTOR = {
    ':not(.astryx-input-group *)': {
      backgroundColor: SECONDARY_RAISED.backgroundColor,
      backgroundImage: SECONDARY_RAISED.backgroundImage,
      borderWidth: SECONDARY_RAISED.borderWidth,
      borderStyle: SECONDARY_RAISED.borderStyle,
      borderColor: SECONDARY_RAISED.borderColor,
      color: SECONDARY_RAISED.color,
      boxShadow: SECONDARY_RAISED.boxShadow,
    },
    ':hover:not([data-disabled], [data-readonly], .astryx-input-group *)': {
      boxShadow: 'var(--mehan-shadow-raised-hover)',
    },
  } as const;

  const colouredCardRules = Object.fromEntries(
    COLOURED_CARDS.map(variant => [
      `variant:${variant}`,
      {
        '--color-text-primary': L.ink,
        '--color-text-secondary': L.ink2,
        '--color-text-accent': A.textLight,
      },
    ]),
  );

  return {
    name: dna.name,

    typography: {
      scale: {base: 14, ratio: 1.22},
      body: {
        family: 'Figtree',
        fallbacks:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      heading: {
        family: 'Bricolage Grotesque',
        fallbacks: '"Figtree", ui-sans-serif, system-ui, sans-serif',
        weight: 'bold',
        weights: {1: 'bold', 2: 'bold', 3: 'bold', 4: 'semibold'},
      },
      code: {
        family: 'Geist Mono',
        fallbacks: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      },
    },

    motion: {
      tempo: 1,
      character: 'expressive',
    },

    syntax,

    // Official theme-local tokens (`defineTheme.ts:444`).
    // Composite gradients and box-shadows put `light-dark(lightColor, darkColor)`
    // inside each `<color>` slot (never `light-dark(<image>, <image>)` or
    // `light-dark(<shadow>, <shadow>)`, which CSS Color 5 drops as IACVT).
    localTokens: {
      '--mehan-paper': [L.paper, D.paper],
      '--mehan-tray': [L.tray, D.tray],
      '--mehan-surface': [L.surface, D.surface],
      '--mehan-float': [L.float, D.float],
      '--mehan-well': [L.well, D.well],
      '--mehan-well-hover': [L.wellHover, D.wellHover],
      '--mehan-socket': [L.socket, D.socket],
      '--mehan-edge-control': 'transparent',
      '--mehan-raised-grad': `linear-gradient(180deg, ${lightDark(L.raisedTop, D.raisedTop)} 0%, ${lightDark(L.raisedBottom, D.raisedBottom)} 100%)`,
      '--mehan-knob-grad': `radial-gradient(circle at 36% 28%, ${lightDark('#ffffff', '#fffaf4')} 0%, ${lightDark('#ffffff', '#f5ede4')} 40%, ${lightDark(L.paper, '#ded2c5')} 74%, ${lightDark(L.line, '#c4b5a6')} 100%)`,
      '--mehan-primary-grad': A.buttonGradient,
      '--mehan-primary-grad-hover': A.buttonGradientHover,
      '--mehan-primary-lip': A.buttonLip,
      '--mehan-shadow-well': `inset 0 1.5px 2.5px ${lightDark(`rgba(${sRgb}, 0.10)`, 'rgba(0, 0, 0, 0.55)')}, inset 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.05)`, 'rgba(255, 255, 255, 0.04)')}, inset 0 -1px 0 ${lightDark('rgba(255, 255, 255, 0.82)', 'rgba(255, 255, 255, 0.06)')}`,
      '--mehan-shadow-socket': `inset 0 1.5px 3px ${lightDark(`rgba(${sRgb}, 0.22)`, 'rgba(0, 0, 0, 0.72)')}, inset 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.07)`, 'rgba(255, 255, 255, 0.05)')}, inset 0 -1px 0 ${lightDark('rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.09)')}`,
      '--mehan-shadow-raised': `inset 0 1px 0 ${lightDark(L.topHighlight, D.topHighlight)}, inset 0 -2px 0 ${lightDark(`rgba(${sRgb}, 0.09)`, 'rgba(0, 0, 0, 0.42)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.07)`, 'rgba(255, 255, 255, 0.07)')}, 0 ${px(1.5 * depth)} ${px(3 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.07 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.38 * depth).toFixed(3)})`)}, 0 ${px(4 * depth)} ${px(8 * depth)} -3px ${lightDark(`rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.32 * depth).toFixed(3)})`)}`,
      '--mehan-shadow-raised-hover': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.13)')}, inset 0 -2px 0 ${lightDark(`rgba(${sRgb}, 0.10)`, 'rgba(0, 0, 0, 0.42)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.09)`, 'rgba(255, 255, 255, 0.10)')}, 0 ${px(4 * depth)} ${px(10 * depth)} -2px ${lightDark(`rgba(${sRgb}, ${(0.15 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.52 * depth).toFixed(3)})`)}`,
      '--mehan-shadow-pressed': `inset 0 1.5px 3px ${lightDark(`rgba(${sRgb}, 0.16)`, 'rgba(0, 0, 0, 0.62)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.08)`, 'rgba(255, 255, 255, 0.06)')}`,
      '--mehan-shadow-knob': `inset 0 -2px 0 ${lightDark(`rgba(${sRgb}, 0.09)`, 'rgba(74, 45, 20, 0.15)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.08)`, 'rgba(0, 0, 0, 0.35)')}, 0 2px 5px ${lightDark(`rgba(${sRgb}, 0.22)`, 'rgba(0, 0, 0, 0.55)')}`,
      '--mehan-shadow-primary': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.42)', 'rgba(255, 255, 255, 0.36)')}, inset 0 -3px 0 ${A.buttonLip}, 0 ${px(1.5 * depth)} ${px(3 * depth)} ${lightDark(`rgba(${sRgb}, 0.18)`, 'rgba(0, 0, 0, 0.45)')}, 0 ${px(7 * depth)} ${px(15 * depth)} -5px ${A.buttonGlow}`,
      '--mehan-shadow-primary-hover': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.52)', 'rgba(255, 255, 255, 0.46)')}, inset 0 -3px 0 ${A.buttonLip}, 0 ${px(3.5 * depth)} ${px(7 * depth)} ${lightDark(`rgba(${sRgb}, 0.20)`, 'rgba(0, 0, 0, 0.50)')}, 0 ${px(9 * depth)} ${px(19 * depth)} -5px ${A.buttonGlow}`,
      '--mehan-shadow-primary-pressed': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.16)')}, inset 0 -1px 0 ${A.buttonLip}, inset 0 2px 4px ${lightDark(A.buttonPressedInner, 'rgba(0, 0, 0, 0.48)')}, 0 1px 2px ${lightDark(`rgba(${sRgb}, 0.22)`, 'rgba(0, 0, 0, 0.45)')}`,
    },

    adaptations: {
      rules: [
        // Prevent iOS Safari input auto-zoom (<16px) & expand touch targets to 44px
        {
          when: {pointer: 'coarse', width: {below: 'lg'}},
          value: {
            typography: {scale: {base: 16, ratio: 1.195}},
            tokens: {
              '--size-element-sm': '36px',
              '--size-element-md': '44px',
              '--size-element-lg': '48px',
            },
          },
        },
        // OS High-Contrast accessibility: promote control edge to crisp visible stroke
        {
          when: {contrast: 'more'},
          value: {
            localTokens: {
              '--mehan-edge-control': [L.lineStrong, D.lineStrong],
            },
          },
        },
      ],
    },

    tokens: {
      // Core semantic surfaces & inks (all resolved #rrggbb / #rrggbbaa sRGB hex!)
      '--color-accent': [A.accentLight, A.accentDark],
      '--color-accent-muted': [A.mutedLight, A.mutedDark],
      '--color-on-accent': [A.onAccentLight, A.onAccentDark],
      '--color-text-accent': [A.textLight, A.textDark],
      '--color-icon-accent': [A.textLight, A.textDark],

      '--color-background-body': [L.paper, D.paper],
      '--color-background-surface': [L.surface, D.surface],
      '--color-background-card': [L.surface, D.surface],
      '--color-background-popover': [L.float, D.float],
      '--color-background-muted': [L.tray, D.tray],
      // Opaque hex required by Toast SSR contrast detector (CHANGELOG 0.7.17 line 124)
      '--color-background-inverted': [L.inverted, D.inverted],
      '--color-on-dark': L.onInverted,
      '--color-on-light': L.ink,

      '--color-neutral': [withHexAlpha(L.ink, 0.07), withHexAlpha(D.ink, 0.10)],
      '--color-overlay': [withHexAlpha(L.ink, 0.42), '#080605ab'],
      '--color-overlay-hover': [
        withHexAlpha(L.ink, 0.05),
        withHexAlpha(D.ink, 0.07),
      ],
      '--color-overlay-pressed': [
        withHexAlpha(L.ink, 0.10),
        withHexAlpha(D.ink, 0.13),
      ],

      '--color-text-primary': [L.ink, D.ink],
      '--color-text-secondary': [L.ink2, D.ink2],
      '--color-text-disabled': [L.inkDisabled, D.inkDisabled],

      '--color-icon-primary': [L.ink, D.ink],
      '--color-icon-secondary': [L.ink3, D.ink3],
      '--color-icon-disabled': [L.inkDisabled, D.inkDisabled],

      // Semantic statuses
      '--color-info': S.info.solid,
      '--color-info-muted': S.info.muted,
      '--color-text-info': S.info.text,
      '--color-on-info-muted': S.info.onMuted,

      '--color-success': S.success.solid,
      '--color-success-muted': S.success.muted,
      '--color-text-success': S.success.text,
      '--color-on-success': S.success.onSolid,
      '--color-on-success-muted': S.success.onMuted,

      '--color-warning': S.warning.solid,
      '--color-warning-muted': S.warning.muted,
      '--color-text-warning': S.warning.text,
      '--color-on-warning': S.warning.onSolid,
      '--color-on-warning-muted': S.warning.onMuted,

      '--color-error': S.error.solid,
      '--color-error-muted': S.error.muted,
      '--color-text-error': S.error.text,
      '--color-on-error': S.error.onSolid,
      '--color-on-error-muted': S.error.onMuted,

      // Borders & Focus ≠ Selection separation
      '--color-border': [L.line, D.line],
      '--color-border-emphasized': [L.lineStrong, D.lineStrong],
      '--focus-outline-color': [L.ink, D.ink],

      // Normalized Mehan desktop heights (32 / 36 / 44)
      '--size-element-sm': '32px',
      '--size-element-md': '36px',
      '--size-element-lg': '44px',

      // Radii (--radius-none & --radius-full fixed per Astryx contract)
      '--radius-none': '0px',
      '--radius-inner': dna.radii.inner,
      '--radius-element': dna.radii.element,
      '--radius-container': dna.radii.container,
      '--radius-page': dna.radii.page,
      '--radius-chat': dna.radii.chat,
      '--radius-full': '9999px',

      // Tactile warm/tinted shadows (single strings with color-level light-dark() so CSS Color 5 parses cleanly!)
      '--color-skeleton': [L.socket, D.wellHover],
      '--color-shadow': [withHexAlpha(L.ink, 0.14), '#00000080'],
      '--shadow-low': `inset 0 1px 0 ${lightDark(L.topHighlight, D.topHighlight)}, 0 ${px(1.5 * depth)} ${px(3 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.05 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.35 * depth).toFixed(3)})`)}, 0 ${px(12 * depth)} ${px(28 * depth)} -10px ${lightDark(`rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.58 * depth).toFixed(3)})`)}`,
      '--shadow-med': `inset 0 1px 0 ${lightDark(L.topHighlight, 'rgba(255, 255, 255, 0.09)')}, 0 ${px(2.5 * depth)} ${px(7 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.08 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.45 * depth).toFixed(3)})`)}, 0 ${px(18 * depth)} ${px(42 * depth)} -12px ${lightDark(`rgba(${sRgb}, ${(0.24 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.70 * depth).toFixed(3)})`)}`,
      '--shadow-high': `inset 0 1px 0 ${lightDark(L.topHighlight, 'rgba(255, 255, 255, 0.10)')}, 0 ${px(7 * depth)} ${px(18 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.12 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.52 * depth).toFixed(3)})`)}, 0 ${px(38 * depth)} ${px(88 * depth)} -20px ${lightDark(`rgba(${sRgb}, ${(0.36 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.80 * depth).toFixed(3)})`)}`,
      '--shadow-inset-hover': `inset 0 0 0 1.5px ${lightDark(withHexAlpha(L.ink, 0.16), withHexAlpha(D.ink, 0.22))}`,
      '--shadow-inset-selected': `inset 0 0 0 2px ${lightDark(A.accentLight, A.accentDark)}`,

      // Categorical families
      '--color-background-blue': [C.blue.bgLight, C.blue.bgDark],
      '--color-border-blue': [C.blue.borderLight, C.blue.borderDark],
      '--color-icon-blue': [C.blue.textLight, C.blue.textDark],
      '--color-text-blue': [C.blue.textLight, C.blue.textDark],

      '--color-background-cyan': [C.cyan.bgLight, C.cyan.bgDark],
      '--color-border-cyan': [C.cyan.borderLight, C.cyan.borderDark],
      '--color-icon-cyan': [C.cyan.textLight, C.cyan.textDark],
      '--color-text-cyan': [C.cyan.textLight, C.cyan.textDark],

      '--color-background-gray': [C.gray.bgLight, C.gray.bgDark],
      '--color-border-gray': [C.gray.borderLight, C.gray.borderDark],
      '--color-icon-gray': [C.gray.textLight, C.gray.textDark],
      '--color-text-gray': [C.gray.textLight, C.gray.textDark],

      '--color-background-green': [C.green.bgLight, C.green.bgDark],
      '--color-border-green': [C.green.borderLight, C.green.borderDark],
      '--color-icon-green': [C.green.textLight, C.green.textDark],
      '--color-text-green': [C.green.textLight, C.green.textDark],

      '--color-background-orange': [C.orange.bgLight, C.orange.bgDark],
      '--color-border-orange': [C.orange.borderLight, C.orange.borderDark],
      '--color-icon-orange': [C.orange.textLight, C.orange.textDark],
      '--color-text-orange': [C.orange.textLight, C.orange.textDark],

      '--color-background-pink': [C.pink.bgLight, C.pink.bgDark],
      '--color-border-pink': [C.pink.borderLight, C.pink.borderDark],
      '--color-icon-pink': [C.pink.textLight, C.pink.textDark],
      '--color-text-pink': [C.pink.textLight, C.pink.textDark],

      '--color-background-purple': [C.purple.bgLight, C.purple.bgDark],
      '--color-border-purple': [C.purple.borderLight, C.purple.borderDark],
      '--color-icon-purple': [C.purple.textLight, C.purple.textDark],
      '--color-text-purple': [C.purple.textLight, C.purple.textDark],

      '--color-background-red': [C.red.bgLight, C.red.bgDark],
      '--color-border-red': [C.red.borderLight, C.red.borderDark],
      '--color-icon-red': [C.red.textLight, C.red.textDark],
      '--color-text-red': [C.red.textLight, C.red.textDark],

      '--color-background-teal': [C.teal.bgLight, C.teal.bgDark],
      '--color-border-teal': [C.teal.borderLight, C.teal.borderDark],
      '--color-icon-teal': [C.teal.textLight, C.teal.textDark],
      '--color-text-teal': [C.teal.textLight, C.teal.textDark],

      '--color-background-yellow': [C.yellow.bgLight, C.yellow.bgDark],
      '--color-border-yellow': [C.yellow.borderLight, C.yellow.borderDark],
      '--color-icon-yellow': [C.yellow.textLight, C.yellow.textDark],
      '--color-text-yellow': [C.yellow.textLight, C.yellow.textDark],
    },

    components: withOwnFillText({
      heading: {
        base: {
          letterSpacing: '-0.025em',
        },
        'type:display-1': {
          fontWeight: '800',
          letterSpacing: '-0.035em',
        },
        'type:display-2': {
          fontWeight: '800',
          letterSpacing: '-0.032em',
        },
        'type:display-3': {
          fontWeight: '800',
          letterSpacing: '-0.03em',
        },
      },

      // Tactile Push-Button Physics (Fixed-Height Lip-Collapse + Popup Anchor Guard INV22)
      button: {
        base: {
          fontWeight: '600',
          '--button-focus-offset': '2px',
        },
        'variant:primary': {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          color: '#ffffff',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-primary)',
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.20)',
          ':hover': {
            backgroundImage: 'var(--mehan-primary-grad-hover)',
            boxShadow: 'var(--mehan-shadow-primary-hover)',
          },
          [`:active${POPUP_CLOSED}`]: {
            transform: 'translateY(1.5px)',
            boxShadow: 'var(--mehan-shadow-primary-pressed)',
          },
        },
        'variant:secondary': {
          ...SECONDARY_RAISED,
          [`:active${POPUP_CLOSED}`]: {
            transform: 'translateY(1px)',
            boxShadow: 'var(--mehan-shadow-pressed)',
          },
        },
        'variant:destructive': {
          backgroundColor: lightDark(S.error.solid[0], '#b91c1c'),
          color: '#ffffff',
          borderWidth: '0px',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -3px 0 #7f1d1d, 0 4px 10px -4px rgba(185,28,28,0.45)',
          [`:active${POPUP_CLOSED}`]: {
            transform: 'translateY(1.5px)',
            boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.35), inset 0 -1px 0 #7f1d1d',
          },
        },
      },

      // ToggleButton ('isPressed:true' boolean-string key!)
      'toggle-button': {
        'isPressed:true': {
          backgroundColor: lightDark(A.softSolidLight, A.softSolidDark),
          color: lightDark(A.textLight, A.textDark),
          boxShadow: 'var(--shadow-inset-selected)',
        },
      },

      // SegmentedControl — recessed well + raised moulded pill (Astryx auto-copies to sliding ::before!)
      'segmented-control': {
        base: {
          backgroundColor: 'var(--mehan-well)',
          boxShadow: 'var(--mehan-shadow-well)',
          padding: '3px',
        },
      },
      'segmented-control-item': {
        selected: {
          backgroundColor: lightDark(L.surface, D.raisedTop),
          backgroundImage: 'var(--mehan-raised-grad)',
          boxShadow: 'var(--mehan-shadow-raised)',
          fontWeight: '600',
        },
      },

      // Complete 12-Target Recessed-Well Input Family
      'text-input': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'text-area': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'number-input': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'date-input': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'date-range-input': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'date-time-input-date-segment': {
        base: RECESSED_INPUT_BASE,
        ...INPUT_STATUS_VARS,
      },
      'date-time-input-time-segment': {
        base: RECESSED_INPUT_BASE,
        ...INPUT_STATUS_VARS,
      },
      'time-input': {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'file-input': {
        'mode:input': RECESSED_INPUT_BASE,
        'mode:dropzone': {
          backgroundColor: 'var(--mehan-well)',
          borderWidth: '1.5px',
          borderStyle: 'dashed',
          borderColor: 'var(--color-border-emphasized)',
        },
        ...INPUT_STATUS_VARS,
      },
      typeahead: {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      tokenizer: {base: RECESSED_INPUT_BASE, ...INPUT_STATUS_VARS},
      'power-search': {base: RECESSED_INPUT_BASE},
      selector: {
        'variant:input': RECESSED_INPUT_BASE,
        'variant:secondary': SECONDARY_SELECTOR,
        ...INPUT_STATUS_VARS,
      },
      'multi-selector': {
        'variant:input': RECESSED_INPUT_BASE,
        'variant:secondary': SECONDARY_SELECTOR,
        ...INPUT_STATUS_VARS,
      },
      'complex-selector': {
        'variant:secondary': {
          backgroundColor: SECONDARY_RAISED.backgroundColor,
          backgroundImage: SECONDARY_RAISED.backgroundImage,
          borderWidth: SECONDARY_RAISED.borderWidth,
          borderStyle: SECONDARY_RAISED.borderStyle,
          borderColor: SECONDARY_RAISED.borderColor,
          color: SECONDARY_RAISED.color,
          boxShadow: SECONDARY_RAISED.boxShadow,
        },
      },
      'input-group-text': {
        base: {
          backgroundColor: 'var(--mehan-tray)',
          borderColor: 'var(--color-border)',
        },
      },

      // Socket & Spherical 3D Dome Knob Controls (Switch, Slider, Checkbox, Radio, ProgressBar)
      switch: {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
        checked: {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.25)',
        },
      },
      'switch-thumb': {
        base: {
          backgroundColor: '#ffffff',
          backgroundImage: 'var(--mehan-knob-grad)',
          boxShadow: 'var(--mehan-shadow-knob)',
        },
      },
      'slider-track': {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
      },
      'slider-thumb': {
        base: {
          backgroundColor: '#ffffff',
          backgroundImage: 'var(--mehan-knob-grad)',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-knob)',
          ':hover': {
            transform: 'scale(1.08)',
          },
        },
      },
      'checkbox-indicator': {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
        checked: {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1.5px 0 rgba(0,0,0,0.22)',
        },
      },
      'radio-indicator': {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
        checked: {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1.5px 0 rgba(0,0,0,0.22)',
        },
      },
      'progress-bar-track': {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
      },

      // Cards (No boxShadow override on card.base so SelectableCard --_card-ring stays intact!)
      card: {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
          padding: 'var(--spacing-4)',
        },
        'variant:default': {
          // Nested default card flattening: steps down to subtle tray without touching coloured cards!
          ':where(.astryx-card *)': {
            backgroundColor: 'var(--mehan-tray)',
          },
        },
        ...colouredCardRules,
      },
      'selectable-card': {
        'selected:true': {
          '--selectable-card-ring-color': 'var(--color-accent)',
          backgroundColor: lightDark(A.softSolidLight, A.softSolidDark),
        },
      },

      // Floating Overlays (Dialog, Drawer, BottomSheet, Popover, Menus)
      dialog: {
        base: {
          borderRadius: 'var(--radius-page)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
        },
      },
      popover: {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
        },
      },
      'dropdown-menu': {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
        },
      },
      'context-menu': {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
        },
      },
      'selector-popup': {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
        },
      },

      // 3D Moulded Keycaps (<Kbd>) & Tactile Badges / Tokens
      'kbd-key': {
        base: {
          backgroundColor: lightDark(L.surface, D.raisedTop),
          backgroundImage: 'var(--mehan-raised-grad)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--mehan-shadow-raised)',
          fontWeight: '600',
        },
      },
      badge: {
        base: {
          fontWeight: '600',
        },
      },
      token: {
        base: {
          fontWeight: '500',
        },
      },

      // Nested secondary text contrast protection inside coloured cards
      item: {
        selected: {
          [IN_COLOURED_CARD]: {
            '--color-text-secondary': L.ink2,
          },
        },
      },
      'tree-list-item': {
        selected: {
          [IN_COLOURED_CARD]: {
            '--color-text-secondary': L.ink2,
          },
        },
      },
    }),
  };
}

/**
 * Base theme builder (without React element icon nodes) used as `extends:`
 * by prebuilt source theme modules so `astryx theme build` sees a flat
 * top-level `icons: mehanIconRegistry` property.
 */
export function createMehanBaseTheme(options: MehanThemeOptions): DefinedTheme {
  return defineTheme(buildMehanThemeConfig(options));
}

export const mehanConfectioneryBaseTheme: DefinedTheme = createMehanBaseTheme({
  name: 'mehan-confectionery-base',
  atmosphere: 'confectionery',
  accent: 'strawberry',
});

export const mehanPorcelainBaseTheme: DefinedTheme = createMehanBaseTheme({
  name: 'mehan-porcelain-base',
  atmosphere: 'porcelain',
  accent: 'blueberry',
});

export const mehanStoneBaseTheme: DefinedTheme = createMehanBaseTheme({
  name: 'mehan-stone-base',
  atmosphere: 'stone',
  accent: 'teal',
});

/**
 * Runtime theme factory for custom brand themes in any Astryx app:
 * `const appTheme = createMehanTheme({ name: 'acme', atmosphere: 'confectionery', accent: 'blueberry' })`
 */
export function createMehanTheme(options: MehanThemeOptions): DefinedTheme {
  return defineTheme({
    ...buildMehanThemeConfig(options),
    icons: mehanIconRegistry,
  });
}
