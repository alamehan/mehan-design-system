import {parseStyleKey} from '@astryxdesign/core/utils';
import {
  defineSyntaxTheme,
  defineTheme,
  type ComponentStyleMap,
  type DefineThemeInput,
  type DefinedTheme,
  type StyleOverrides,
  type TokenName,
  type TokenValue,
} from '@astryxdesign/core/theme';
import {
  mixHex,
  resolveMehanDna,
  withHexAlpha,
  type MehanThemeOptions,
} from '@mehan/dna';
import {mehanIconRegistry} from './icons';

export interface MehanAstryxThemeOptions extends MehanThemeOptions {
  /** Raw or semantic Astryx token overrides merged on top of the Mehan DNA seed. */
  tokens?: Partial<Record<TokenName, TokenValue>>;
  /** Theme-local CSS custom property overrides. */
  localTokens?: Record<string, TokenValue>;
  /** Deep-merged Astryx component style overrides (wins at the leaf level). */
  components?: ComponentStyleMap;
}

/**
 * Recursively merges any number of Astryx component style maps so leaf overrides
 * layer cleanly on top of Mehan's base tactile rules without wiping sibling keys.
 */
export function mergeMehanComponentStyles(
  ...maps: Array<Record<string, unknown> | undefined>
): ComponentStyleMap {
  const result: Record<string, unknown> = {};
  for (const map of maps) {
    if (!map) continue;
    for (const [key, value] of Object.entries(map)) {
      const existing = result[key];
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        existing &&
        typeof existing === 'object' &&
        !Array.isArray(existing)
      ) {
        result[key] = mergeMehanComponentStyles(
          existing as Record<string, unknown>,
          value as Record<string, unknown>,
        );
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = mergeMehanComponentStyles(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
  }
  return result as ComponentStyleMap;
}

const lightDark = (light: string, dark: string): string =>
  `light-dark(${light}, ${dark})`;

const STRIPED_ROW = ':nth-child(even of :not([data-expansion-panel]))';

/**
 * All surface-painting targets (from official Meta themes + Mehan extensions)
 * so nested inputs, popovers, menus, and cards inside pastel coloured cards
 * restore theme surface text tokens cleanly in both Light and Dark mode.
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
  ['complex-selector-popup', 'base'],
  ['dropdown-menu', 'base'],
  ['dropdown-menu-radio', 'base'],
  ['context-menu', 'base'],
  ['more-menu', 'base'],
  ['popover', 'base'],
  ['hover-card', 'base'],
  ['dialog', 'base'],
  ['alert-dialog', 'base'],
  ['drawer', 'base'],
  ['bottom-sheet', 'base'],
  ['chat-composer', 'base'],
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
  v => `.astryx-card[data-variant="${v}"], .astryx-clickable-card[data-variant="${v}"]`,
).join(', ')})`;
const OWN_FILL = `:is(${OWN_FILL_RULES.filter(([, , s]) => !s)
  .map(([part, key]) => ruleSelector(part, key))
  .join(', ')})`;
const IN_COLOURED_CARD = `:where(${COLOURED_CARD} *):not(:where(${COLOURED_CARD} ${OWN_FILL} *))`;

const POPUP_CLOSED = ':not([aria-expanded="true"][aria-haspopup]:not([aria-haspopup="false"]))';
const ENABLED = ':not(:disabled, [aria-disabled="true"])';

/**
 * Builds the complete `DefineThemeInput` for a Mehan theme, combining the
 * parametric Mehan DNA seed with optional unrestricted Astryx `tokens` and
 * `components` overrides.
 */
export function buildMehanThemeConfig(
  options: MehanAstryxThemeOptions,
): Omit<DefineThemeInput, 'icons'> {
  const dna = resolveMehanDna(options);
  const L = dna.atmosphere.light;
  const D = dna.atmosphere.dark;
  const A = dna.accent;
  const S = dna.statuses;
  const C = dna.categorical;
  const sRgb = L.shadowRgb;
  const depth = dna.depth;
  const lipPx = dna.lipPx;
  const px = (val: number): string => `${Number(val.toFixed(2))}px`;

  const lightPanelLip = mixHex(L.surface, L.line, 0.52);
  const lightKnobRim = mixHex(L.line, L.socket, 0.45);

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

  // Input field surface ('recessed' carved well vs 'bordered' crisp 1px edge)
  const RECESSED_INPUT_BASE: StyleOverrides =
    dna.wellStyle === 'bordered'
      ? {
          backgroundColor: 'var(--color-background-surface)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--color-border-emphasized)',
          boxShadow: 'none',
          ':focus-within': {
            borderColor: 'var(--color-accent)',
            boxShadow: '0 0 0 2px var(--color-accent-muted)',
          },
        }
      : {
          backgroundColor: 'var(--mehan-well)',
          borderWidth: '0px',
          borderStyle: 'none',
          boxShadow: 'var(--mehan-shadow-well)',
          ':focus-within': {
            boxShadow: 'var(--mehan-shadow-well), 0 0 0 2px var(--color-accent)',
          },
        };

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

  // Borderless tactile raised secondary surface (shared by Button & Selector triggers per AST-079 FR2)
  const SECONDARY_RAISED = {
    backgroundColor: lightDark(L.surface, D.raisedBottom),
    backgroundImage: 'var(--mehan-raised-grad)',
    borderWidth: '0px',
    borderStyle: 'none',
    color: 'var(--color-text-primary)',
    boxShadow: 'var(--mehan-shadow-raised)',
    paddingBlockStart: 'calc(var(--spacing-2) - 1px)',
    paddingBlockEnd: 'calc(var(--spacing-2) + 1px)',
    [`:hover${ENABLED}`]: {
      boxShadow: 'var(--mehan-shadow-raised-hover)',
    },
  } as const;

  const SECONDARY_SELECTOR = {
    ':not(.astryx-input-group *)': {
      backgroundColor: SECONDARY_RAISED.backgroundColor,
      backgroundImage: SECONDARY_RAISED.backgroundImage,
      borderWidth: '0px',
      borderStyle: 'none',
      color: SECONDARY_RAISED.color,
      boxShadow: SECONDARY_RAISED.boxShadow,
    },
    ':hover:not([data-disabled], [data-readonly], .astryx-input-group *)': {
      boxShadow: 'var(--mehan-shadow-raised-hover)',
    },
  } as const;

  const FLOATING_OVERLAY_BASE = {
    borderRadius: 'var(--radius-container)',
    borderWidth: '0px',
    borderStyle: 'none',
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

  const tempoFromStep = Math.min(
    1.5,
    Math.max(0.75, Number((1 / dna.durationStep).toFixed(2))),
  );
  const motionConfig =
    dna.motion === 'calm'
      ? {tempo: Math.max(tempoFromStep, 1.35), character: 'standard' as const}
      : dna.motion === 'crisp'
        ? {tempo: tempoFromStep, character: 'crisp' as const}
        : dna.motion === 'standard'
          ? {tempo: tempoFromStep, character: 'standard' as const}
          : {tempo: tempoFromStep, character: 'expressive' as const};

  const spacingTokens: Partial<Record<TokenName, TokenValue>> = {};
  if (options.spacingBase !== undefined && options.spacingBase !== 4) {
    const steps = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (const step of steps) {
      const k = `--spacing-${String(step).replace('.', '-')}` as TokenName;
      spacingTokens[k] = `${Math.round(dna.spacingBase * step) / 16}rem`;
    }
  }

  const lipInset = lipPx > 0 ? `inset 0 -${lipPx}px 0 ${A.buttonLip}, ` : '';
  const lipPressedInset = lipPx > 0 ? `inset 0 -1px 0 ${A.buttonLip}, ` : '';
  const secLip =
    lipPx > 0
      ? `inset 0 -${Math.min(2, lipPx)}px 0 ${lightDark(L.line, 'rgba(0, 0, 0, 0.34)')}, `
      : '';

  const baseComponents = withOwnFillText({
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

      'empty-state-title': {
        base: {
          fontFamily: 'var(--font-family-heading)',
          fontWeight: '800',
          letterSpacing: '-0.028em',
        },
      },

      // Silky-Smooth Tactile Push-Button Physics (OKLCH gradient + perceptual lip)
      button: {
        base: {
          fontWeight: '600',
          borderWidth: '0px',
          borderStyle: 'none',
          '--button-focus-offset': '2px',
          transitionProperty:
            'background-image, background-color, box-shadow, color, opacity, transform',
        },
        'variant:primary': {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          color: '#ffffff',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-primary)',
          paddingBlockStart: 'calc(var(--spacing-2) - 1.5px)',
          paddingBlockEnd: 'calc(var(--spacing-2) + 1.5px)',
          [`:hover${ENABLED}`]: {
            backgroundImage: 'var(--mehan-primary-grad-hover)',
            boxShadow: 'var(--mehan-shadow-primary-hover)',
          },
          [`:active${ENABLED}${POPUP_CLOSED}`]: {
            transform: 'translateY(1.5px)',
            boxShadow: 'var(--mehan-shadow-primary-pressed)',
            paddingBlockStart: 'calc(var(--spacing-2) - 0.5px)',
            paddingBlockEnd: 'calc(var(--spacing-2) + 0.5px)',
            backgroundImage:
              'var(--_press-paint-image, linear-gradient(transparent, transparent)), var(--mehan-primary-grad)',
          },
        },
        'variant:secondary': {
          ...SECONDARY_RAISED,
          [`:active${ENABLED}${POPUP_CLOSED}`]: {
            transform: 'translateY(1px)',
            boxShadow: 'var(--mehan-shadow-pressed)',
            paddingBlockStart: 'var(--spacing-2)',
            paddingBlockEnd: 'var(--spacing-2)',
            backgroundImage:
              'var(--_press-paint-image, linear-gradient(transparent, transparent)), var(--mehan-raised-grad)',
          },
        },
        'variant:destructive': {
          backgroundColor: lightDark(S.error.softSolid[0], S.error.softSolid[1]),
          color: lightDark(S.error.text[0], S.error.text[1]),
          borderWidth: '0px',
          borderStyle: 'none',
          boxShadow: 'var(--mehan-shadow-danger)',
          paddingBlockStart: 'calc(var(--spacing-2) - 1px)',
          paddingBlockEnd: 'calc(var(--spacing-2) + 1px)',
          [`:active${ENABLED}${POPUP_CLOSED}`]: {
            transform: 'translateY(1px)',
            boxShadow: 'var(--mehan-shadow-danger-pressed)',
            paddingBlockStart: 'var(--spacing-2)',
            paddingBlockEnd: 'var(--spacing-2)',
          },
        },
        'variant:ghost': {
          color: 'var(--color-text-secondary)',
          [`:hover${ENABLED}`]: {
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-overlay-hover)',
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

      // SegmentedControl — recessed well + ('raised' ceramic pill OR 'espresso' Shotcandy inverted ink)
      'segmented-control': {
        base: {
          backgroundColor: 'var(--mehan-well)',
          boxShadow: 'var(--mehan-shadow-well)',
          padding: '3px',
        },
      },
      'segmented-control-item': {
        selected:
          dna.segmentedStyle === 'espresso'
            ? {
                backgroundColor: lightDark(L.inverted, D.inverted),
                backgroundImage: 'none',
                color: lightDark(L.onInverted, L.ink),
                '--color-text-primary': lightDark(L.onInverted, L.ink),
                '--color-text-secondary': lightDark(L.onInverted, L.ink2),
                '--color-icon-primary': lightDark(L.onInverted, L.ink),
                boxShadow: `0 1px 2px ${lightDark('rgba(35, 24, 20, 0.24)', 'rgba(0, 0, 0, 0.45)')}, inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0.55)')}`,
                fontWeight: '600',
              }
            : {
                backgroundColor: lightDark(L.surface, D.raisedTop),
                backgroundImage: 'var(--mehan-raised-grad)',
                boxShadow: 'var(--mehan-shadow-raised)',
                fontWeight: '600',
              },
      },

      // Complete Borderless Recessed-Well Input & Search Family (15 targets!)
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
      'command-palette-input': {base: RECESSED_INPUT_BASE},
      'selector-search': {base: RECESSED_INPUT_BASE},
      'multi-selector-search': {base: RECESSED_INPUT_BASE},
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
          borderWidth: '0px',
          borderStyle: 'none',
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

      // AI Chat Composer & Toolbar
      'chat-composer': {
        base: {
          backgroundColor: 'var(--mehan-surface)',
          borderWidth: '0px',
          borderStyle: 'none',
        },
      },
      'chat-send-button': {
        base: {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          color: '#ffffff',
          boxShadow: 'var(--mehan-shadow-primary)',
        },
      },
      toolbar: {
        base: {
          backgroundColor: 'var(--mehan-float)',
          borderRadius: 'var(--radius-container)',
          boxShadow: 'var(--shadow-low)',
          borderWidth: '0px',
        },
      },

      // Socket & Spherical 3D Dome Knob Controls
      switch: {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
        checked: {
          backgroundColor: A.accentLight,
          backgroundImage: 'var(--mehan-primary-grad)',
          boxShadow:
            'inset 0 1px 2px rgba(0, 0, 0, 0.28), inset 0 -1px 0 rgba(255, 255, 255, 0.22)',
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
            transform: 'scale(1.07)',
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
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -2px 0 ${A.buttonLip}`,
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
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -2px 0 ${A.buttonLip}`,
        },
      },
      'progress-bar-track': {
        base: {
          backgroundColor: 'var(--mehan-socket)',
          boxShadow: 'var(--mehan-shadow-socket)',
        },
      },
      'progress-bar-fill': {
        base: {
          backgroundImage: 'var(--mehan-primary-grad)',
        },
        'variant:success': {
          backgroundImage: 'none',
          backgroundColor: 'var(--color-success)',
        },
        'variant:warning': {
          backgroundImage: 'none',
          backgroundColor: 'var(--color-warning)',
        },
        'variant:error': {
          backgroundImage: 'none',
          backgroundColor: 'var(--color-error)',
        },
      },
      'progress-bar-mark': {
        'placement:fill+variant:success': {
          backgroundColor: 'var(--color-on-success)',
        },
        'placement:fill+variant:warning': {
          backgroundColor: 'var(--color-on-warning)',
        },
        'placement:fill+variant:error': {
          backgroundColor: 'var(--color-on-error)',
        },
      },

      // Sculptural Cards & Clickable/Selectable Cards (6% hairline for flat SaaS safety + zero --_card-ring clobber!)
      card: {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--mehan-card-hairline)',
          padding: dna.density === 'compact' ? 'var(--spacing-3)' : 'var(--spacing-4)',
        },
        'variant:default': {
          ':where(.astryx-card *)': {
            backgroundColor: 'var(--mehan-tray)',
          },
        },
        ...colouredCardRules,
      },
      'clickable-card': {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--mehan-card-hairline)',
          padding: dna.density === 'compact' ? 'var(--spacing-3)' : 'var(--spacing-4)',
        },
        ...colouredCardRules,
      },
      'selectable-card': {
        base: {
          borderRadius: 'var(--radius-container)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--mehan-card-hairline)',
        },
        'selected:true': {
          '--selectable-card-ring-color': 'var(--color-accent)',
          backgroundColor: lightDark(A.softSolidLight, A.softSolidDark),
        },
      },
      section: {
        base: {
          borderRadius: 'var(--radius-container)',
          padding: dna.density === 'compact' ? 'var(--spacing-3)' : 'var(--spacing-4)',
        },
      },

      // Borderless Floating Overlays (shadow-med / shadow-high own the 1px rim + highlight!)
      dialog: {
        base: {
          borderRadius: 'var(--radius-page)',
          borderWidth: '0px',
          borderStyle: 'none',
        },
      },
      'alert-dialog': {
        base: {
          borderRadius: 'var(--radius-page)',
          borderWidth: '0px',
          borderStyle: 'none',
        },
      },
      drawer: {
        base: {
          borderWidth: '0px',
          borderStyle: 'none',
        },
      },
      'bottom-sheet': {
        base: {
          borderRadius: 'var(--radius-page) var(--radius-page) 0 0',
          borderWidth: '0px',
          borderStyle: 'none',
        },
      },
      popover: {base: FLOATING_OVERLAY_BASE},
      'hover-card': {base: FLOATING_OVERLAY_BASE},
      'dropdown-menu': {base: FLOATING_OVERLAY_BASE},
      'context-menu': {base: FLOATING_OVERLAY_BASE},
      'more-menu': {base: FLOATING_OVERLAY_BASE},
      'selector-popup': {base: FLOATING_OVERLAY_BASE},
      'multi-selector-popup': {base: FLOATING_OVERLAY_BASE},
      'complex-selector-popup': {base: FLOATING_OVERLAY_BASE},

      // 3D Moulded Keycaps (<Kbd>), Tabular Table Cells, & Tactile Badges
      'kbd-key': {
        base: {
          backgroundColor: lightDark(L.surface, D.raisedTop),
          backgroundImage: 'var(--mehan-raised-grad)',
          borderWidth: '0px',
          boxShadow: 'var(--mehan-shadow-raised)',
          fontWeight: '600',
        },
      },
      'table-cell': {
        base: {
          fontVariantNumeric: 'tabular-nums',
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
    });

  return {
    name: dna.name,

    typography: {
      scale: {base: dna.typeBase, ratio: dna.typeRatio},
      body: {
        family: dna.typography.bodyFamily.replace(/^"|"$/g, ''),
        fallbacks:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
      heading: {
        family: dna.typography.displayFamily.replace(/^"|"$/g, ''),
        fallbacks: '"Figtree", ui-sans-serif, system-ui, sans-serif',
        weight: 'bold',
        weights: {1: 'bold', 2: 'bold', 3: 'bold', 4: 'semibold'},
      },
      code: {
        family: dna.typography.monoFamily.replace(/^"|"$/g, ''),
        fallbacks: 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
      },
    },

    motion: motionConfig,

    syntax,

    localTokens: {
      '--mehan-paper': [L.paper, D.paper],
      '--mehan-tray': [L.tray, D.tray],
      '--mehan-surface': [L.surface, D.surface],
      '--mehan-float': [L.float, D.float],
      '--mehan-well': [L.well, D.well],
      '--mehan-well-hover': [L.wellHover, D.wellHover],
      '--mehan-socket': [L.socket, D.socket],
      '--mehan-edge-control': 'transparent',
      '--mehan-card-hairline': [withHexAlpha(L.ink, 0.06), '#ffffff11'],
      '--mehan-raised-grad': `linear-gradient(180deg, ${lightDark(L.raisedTop, D.raisedTop)} 0%, ${lightDark(L.raisedBottom, D.raisedBottom)} 100%)`,
      '--mehan-knob-grad': `radial-gradient(circle at 36% 28%, #ffffff 0%, ${lightDark('#ffffff', '#f1f5f9')} 38%, ${lightDark(L.paper, '#cbd5e1')} 70%, ${lightDark(lightKnobRim, '#94a3b8')} 100%)`,
      '--mehan-primary-grad': A.buttonGradient,
      '--mehan-primary-grad-hover': A.buttonGradientHover,
      '--mehan-primary-lip': A.buttonLip,
      '--mehan-shadow-well': `inset 0 1px 2px ${lightDark(`rgba(${sRgb}, 0.11)`, 'rgba(0, 0, 0, 0.60)')}, inset 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.04)`, 'rgba(0, 0, 0, 0.25)')}, inset 0 -1px 0 ${lightDark('rgba(255, 255, 255, 0.90)', 'rgba(255, 255, 255, 0.08)')}, inset 0 0 0 1px var(--mehan-edge-control)`,
      '--mehan-shadow-socket': `inset 0 1px 2px ${lightDark(`rgba(${sRgb}, 0.22)`, 'rgba(0, 0, 0, 0.72)')}, inset 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.06)`, 'rgba(255, 255, 255, 0.05)')}, inset 0 -1px 0 ${lightDark('rgba(255, 255, 255, 0.90)', 'rgba(255, 255, 255, 0.14)')}, inset 0 0 0 1px var(--mehan-edge-control)`,
      '--mehan-shadow-raised': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.10)')}, ${secLip}0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.05)`, 'rgba(255, 255, 255, 0.05)')}, 0 ${px(1 * depth)} ${px(1.5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.04 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.32 * depth).toFixed(3)})`)}, 0 ${px(2 * depth)} ${px(3.5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.05 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.28 * depth).toFixed(3)})`)}, 0 ${px(6 * depth)} ${px(9 * depth)} -4px ${lightDark(`rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.40 * depth).toFixed(3)})`)}, inset 0 0 0 1px var(--mehan-edge-control)`,
      '--mehan-shadow-raised-hover': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.14)')}, ${secLip}0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.06)`, 'rgba(255, 255, 255, 0.08)')}, 0 ${px(2 * depth)} ${px(3 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.05 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)})`)}, 0 ${px(5 * depth)} ${px(8 * depth)} -2px ${lightDark(`rgba(${sRgb}, ${(0.08 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)})`)}, 0 ${px(11 * depth)} ${px(15 * depth)} -5px ${lightDark(`rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`)}, inset 0 0 0 1px var(--mehan-edge-control)`,
      '--mehan-shadow-pressed': `inset 0 1px 2.5px ${lightDark(`rgba(${sRgb}, 0.18)`, 'rgba(0, 0, 0, 0.56)')}, inset 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.06)`, 'rgba(255, 255, 255, 0.05)')}, inset 0 0 0 1px var(--mehan-edge-control)`,
      '--mehan-shadow-knob': `0 0 0 0.5px ${lightDark(`rgba(${sRgb}, 0.08)`, 'rgba(0, 0, 0, 0.35)')}, 0 ${px(1 * depth)} ${px(1.5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.10 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`)}, 0 ${px(2 * depth)} ${px(4 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.14 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.42 * depth).toFixed(3)})`)}, 0 ${px(5 * depth)} ${px(8 * depth)} -3px ${lightDark(`rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.45 * depth).toFixed(3)})`)}`,
      '--mehan-shadow-primary': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.36)', 'rgba(255, 255, 255, 0.32)')}, ${lipInset}0 ${px(1 * depth)} ${px(1.5 * depth)} ${lightDark(A.buttonContactShadow, 'rgba(0, 0, 0, 0.45)')}, 0 ${px(3 * depth)} ${px(5.5 * depth)} -1px ${A.buttonMidShadow}, 0 ${px(9 * depth)} ${px(15 * depth)} -6px ${A.buttonGlow}`,
      '--mehan-shadow-primary-hover': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.44)', 'rgba(255, 255, 255, 0.40)')}, ${lipInset}0 ${px(2 * depth)} ${px(3.5 * depth)} ${lightDark(A.buttonContactShadow, 'rgba(0, 0, 0, 0.48)')}, 0 ${px(5 * depth)} ${px(8.5 * depth)} -1px ${A.buttonMidShadow}, 0 ${px(11 * depth)} ${px(19 * depth)} -5px ${A.buttonGlow}`,
      '--mehan-shadow-primary-pressed': `inset 0 1px 0 ${lightDark('rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.16)')}, ${lipPressedInset}inset 0 2px 4px ${lightDark(A.buttonPressedInner, 'rgba(0, 0, 0, 0.45)')}, 0 ${px(1 * depth)} ${px(2 * depth)} ${lightDark(A.buttonContactShadow, 'rgba(0, 0, 0, 0.45)')}`,
      '--mehan-shadow-danger': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.08)')}, inset 0 -2px 0 ${lightDark('rgba(185, 28, 28, 0.18)', 'rgba(0, 0, 0, 0.38)')}, 0 0 0 1px ${lightDark('rgba(185, 28, 28, 0.08)', 'rgba(248, 113, 113, 0.18)')}, 0 1px 1.5px ${lightDark('rgba(185, 28, 28, 0.08)', 'rgba(0, 0, 0, 0.35)')}, 0 ${px(5 * depth)} ${px(9 * depth)} -4px ${lightDark('rgba(185, 28, 28, 0.24)', 'rgba(0, 0, 0, 0.45)')}`,
      '--mehan-shadow-danger-pressed': `inset 0 1px 2.5px ${lightDark('rgba(185, 28, 28, 0.22)', 'rgba(0, 0, 0, 0.55)')}, inset 0 0 0 1px ${lightDark('rgba(185, 28, 28, 0.12)', 'rgba(248, 113, 113, 0.18)')}`,
      ...(options.localTokens ?? {}),
    },

    adaptations: {
      rules: [
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
        {
          when: {pointer: 'fine', motion: 'no-preference'},
          value: {
            components: {
              button: {
                'variant:primary': {
                  [`:hover${ENABLED}${POPUP_CLOSED}`]: {
                    transform: 'translateY(-1px)',
                  },
                },
                'variant:secondary': {
                  [`:hover${ENABLED}${POPUP_CLOSED}`]: {
                    transform: 'translateY(-1px)',
                  },
                },
                'variant:destructive': {
                  [`:hover${ENABLED}${POPUP_CLOSED}`]: {
                    transform: 'translateY(-1px)',
                  },
                },
              },
            },
          },
        },
        {
          when: {contrast: 'more'},
          value: {
            localTokens: {
              '--mehan-edge-control': [L.lineStrong, D.lineStrong],
              '--mehan-card-hairline': [L.lineStrong, D.lineStrong],
            },
          },
        },
      ],
    },

    tokens: {
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
      '--color-background-inverted': [L.inverted, D.inverted],
      '--color-on-dark': L.onInverted,
      '--color-on-light': L.ink,

      '--color-neutral': [withHexAlpha(L.ink, 0.065), withHexAlpha(D.ink, 0.10)],
      '--color-overlay': [withHexAlpha(L.ink, 0.42), '#080605ab'],
      '--color-overlay-hover': [
        withHexAlpha(L.ink, 0.045),
        withHexAlpha(D.ink, 0.07),
      ],
      '--color-overlay-pressed': [
        withHexAlpha(L.ink, 0.09),
        withHexAlpha(D.ink, 0.13),
      ],

      '--color-text-primary': [L.ink, D.ink],
      '--color-text-secondary': [L.ink2, D.ink2],
      '--color-text-disabled': [L.inkDisabled, D.inkDisabled],

      '--color-icon-primary': [L.ink, D.ink],
      '--color-icon-secondary': [L.ink3, D.ink3],
      '--color-icon-disabled': [L.inkDisabled, D.inkDisabled],

      '--color-border': [L.line, D.line],
      '--color-border-emphasized': [L.lineStrong, D.lineStrong],
      '--color-tint-hover': [L.ink, D.ink],

      '--color-info': S.info.solid,
      '--color-info-muted': S.info.muted,
      '--color-on-info': S.info.onSolid,
      '--color-on-info-muted': S.info.onMuted,
      '--color-text-info': S.info.text,

      '--color-success': S.success.solid,
      '--color-success-muted': S.success.muted,
      '--color-on-success': S.success.onSolid,
      '--color-on-success-muted': S.success.onMuted,
      '--color-text-success': S.success.text,

      '--color-warning': S.warning.solid,
      '--color-warning-muted': S.warning.muted,
      '--color-on-warning': S.warning.onSolid,
      '--color-on-warning-muted': S.warning.onMuted,
      '--color-text-warning': S.warning.text,

      '--color-error': S.error.solid,
      '--color-error-muted': S.error.muted,
      '--color-on-error': S.error.onSolid,
      '--color-on-error-muted': S.error.onMuted,
      '--color-text-error': S.error.text,
      '--color-background-error-inverted': ['#991b1b', '#fca5a5'],

      '--focus-outline-color': [L.ink, D.ink],

      '--size-element-sm': dna.sizing.controlSm,
      '--size-element-md': dna.sizing.controlMd,
      '--size-element-lg': dna.sizing.controlLg,

      '--radius-none': '0px',
      '--radius-inner': dna.radii.inner,
      '--radius-element': dna.radii.element,
      '--radius-container': dna.radii.container,
      '--radius-page': dna.radii.page,
      '--radius-chat': dna.radii.chat,
      '--radius-full': '9999px',

      '--color-skeleton': [L.socket, D.wellHover],
      '--color-shadow': [withHexAlpha(L.ink, 0.14), '#00000080'],
      '--shadow-low': `inset 0 -2px 0 ${lightDark(lightPanelLip, 'rgba(255, 255, 255, 0.03)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.04)`, 'rgba(255, 255, 255, 0.05)')}, 0 ${px(1 * depth)} ${px(1.5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.03 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.30 * depth).toFixed(3)})`)}, 0 ${px(3 * depth)} ${px(5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.04 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.35 * depth).toFixed(3)})`)}, 0 ${px(10 * depth)} ${px(18 * depth)} -8px ${lightDark(`rgba(${sRgb}, ${(0.08 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`)}, 0 ${px(26 * depth)} ${px(40 * depth)} -22px ${lightDark(`rgba(${sRgb}, ${(0.16 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.60 * depth).toFixed(3)})`)}`,
      '--shadow-med': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.09)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.05)`, 'rgba(255, 255, 255, 0.06)')}, 0 ${px(2 * depth)} ${px(5 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.06 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.36 * depth).toFixed(3)})`)}, 0 ${px(8 * depth)} ${px(16 * depth)} -4px ${lightDark(`rgba(${sRgb}, ${(0.12 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.48 * depth).toFixed(3)})`)}, 0 ${px(24 * depth)} ${px(44 * depth)} -16px ${lightDark(`rgba(${sRgb}, ${(0.24 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.68 * depth).toFixed(3)})`)}`,
      '--shadow-high': `inset 0 1px 0 ${lightDark('#ffffff', 'rgba(255, 255, 255, 0.08)')}, 0 0 0 1px ${lightDark(`rgba(${sRgb}, 0.05)`, 'rgba(255, 255, 255, 0.06)')}, 0 ${px(8 * depth)} ${px(20 * depth)} ${lightDark(`rgba(${sRgb}, ${(0.12 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.50 * depth).toFixed(3)})`)}, 0 ${px(44 * depth)} ${px(100 * depth)} -24px ${lightDark(`rgba(${sRgb}, ${(0.38 * depth).toFixed(3)})`, `rgba(0, 0, 0, ${(0.72 * depth).toFixed(3)})`)}`,
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

      // Official Astryx Data Visualization Categorical Tokens (`dataTokens.stylex.ts`)
      '--color-data-categorical-blue': [C.blue.borderLight, C.blue.borderDark],
      '--color-data-categorical-orange': [C.orange.borderLight, C.orange.borderDark],
      '--color-data-categorical-purple': [C.purple.borderLight, C.purple.borderDark],
      '--color-data-categorical-green': [C.green.borderLight, C.green.borderDark],
      '--color-data-categorical-pink': [C.pink.borderLight, C.pink.borderDark],
      '--color-data-categorical-cyan': [C.cyan.borderLight, C.cyan.borderDark],
      '--color-data-categorical-red': [C.red.borderLight, C.red.borderDark],
      '--color-data-categorical-teal': [C.teal.borderLight, C.teal.borderDark],
      '--color-data-categorical-brown': ['#9a5206', '#fbbf24'],
      '--color-data-categorical-indigo': ['#4f46e5', '#818cf8'],
      '--color-data-neutral': [L.ink3, D.ink3],

      ...spacingTokens,
      ...(options.tokens ?? {}),
    },

    components: options.components
      ? mergeMehanComponentStyles(baseComponents, options.components)
      : baseComponents,
  };
}

export function createMehanBaseTheme(
  options: MehanAstryxThemeOptions,
): DefinedTheme {
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
 * Runtime theme factory combining Mehan's parametric DNA seed with full,
 * unrestricted Astryx `tokens` and `components` overrides.
 */
export function createMehanTheme(
  options: MehanAstryxThemeOptions,
): DefinedTheme {
  return defineTheme({
    ...buildMehanThemeConfig(options),
    icons: mehanIconRegistry,
  });
}
