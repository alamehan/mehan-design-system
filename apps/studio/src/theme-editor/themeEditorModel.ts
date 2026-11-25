import {
  colorDefaults,
  dataTokenDefaults,
  durationDefaults,
  easeDefaults,
  expandRadiusScale,
  expandTypeScale,
  fontWeightDefaults,
  radiusDefaults,
  shadowDefaults,
  sizeDefaults,
  spacingDefaults,
  syntaxTokenDefaults,
  textSizeDefaults,
  typeScaleDefaults,
  typographyDefaults,
  type ComponentStyleMap,
  type DefinedTheme,
  type TokenName,
  type TokenValue,
} from '@astryxdesign/core/theme';
import {
  createMehanTheme,
  isMehanAtmosphereId,
  mergeMehanComponentStyles,
  type MehanAtmosphereId,
  type MehanLipStyle,
  type MehanMotion,
  type MehanPresetAccentId,
  type MehanSegmentedStyle,
  type MehanWellStyle,
} from '@mehan/astryx/dna';

export interface StudioSeedConfig {
  atmosphere: MehanAtmosphereId;
  accent: MehanPresetAccentId | string;
  depth: number;
  radiusScale: number;
  radiusBase: number | null;
  spacingBase: number;
  sizeBase: number;
  typeBase: number;
  typeRatio: number;
  headingFont: string;
  bodyFont: string;
  codeFont: string;
  motion: MehanMotion;
  durationStep: number;
  lipStyle: MehanLipStyle;
  segmentedStyle: MehanSegmentedStyle;
  wellStyle: MehanWellStyle;
}

export interface CustomCssOverride {
  id: string;
  component: string;
  property: string;
  value: string;
}

export interface FullThemeEditorState {
  seed: StudioSeedConfig;
  tokenOverrides: Record<string, string>;
  customOverrides: CustomCssOverride[];
}

export const DEFAULT_SEED_CONFIG: StudioSeedConfig = {
  atmosphere: 'confectionery',
  accent: 'strawberry',
  depth: 1,
  radiusScale: 1,
  radiusBase: null,
  spacingBase: 4,
  sizeBase: 36,
  typeBase: 14,
  typeRatio: 1.22,
  headingFont: 'Bricolage Grotesque',
  bodyFont: 'Figtree',
  codeFont: 'Geist Mono',
  motion: 'expressive',
  durationStep: 1,
  lipStyle: 'candy',
  segmentedStyle: 'raised',
  wellStyle: 'recessed',
};

export const SHOTCANDY_AUTHENTIC_SEED: StudioSeedConfig = {
  atmosphere: 'confectionery',
  accent: 'strawberry',
  depth: 1,
  radiusScale: 1,
  radiusBase: null,
  spacingBase: 4,
  sizeBase: 32,
  typeBase: 13.5,
  typeRatio: 1.22,
  headingFont: 'Bricolage Grotesque',
  bodyFont: 'Figtree',
  codeFont: 'Geist Mono',
  motion: 'expressive',
  durationStep: 1.15,
  lipStyle: 'candy',
  segmentedStyle: 'espresso',
  wellStyle: 'recessed',
};

export const ALL_ASTRYX_DEFAULTS: Record<string, string> = {
  ...colorDefaults,
  ...spacingDefaults,
  ...radiusDefaults,
  ...typographyDefaults,
  ...textSizeDefaults,
  ...fontWeightDefaults,
  ...typeScaleDefaults,
  ...sizeDefaults,
  ...shadowDefaults,
  ...durationDefaults,
  ...easeDefaults,
  ...syntaxTokenDefaults,
  ...dataTokenDefaults,
};

export const HEADING_FONT_OPTIONS = [
  {value: 'Bricolage Grotesque', label: 'Bricolage Grotesque (Mehan Tactile)'},
  {value: 'Figtree', label: 'Figtree (Clean Humanist)'},
  {value: 'Albert Sans', label: 'Albert Sans (Neo-Grotesque SaaS)'},
  {value: 'Outfit', label: 'Outfit (Modern Geometric)'},
  {value: 'Poppins', label: 'Poppins (Friendly Circular)'},
  {value: 'Montserrat', label: 'Montserrat (Architectural Wide)'},
  {value: 'Fraunces', label: 'Fraunces (Editorial Serif)'},
  {value: 'Crimson Text', label: 'Crimson Text (Classic Book Serif)'},
  {value: 'Georgia', label: 'Georgia (System Serif)'},
];

export const BODY_FONT_OPTIONS = [
  {value: 'Figtree', label: 'Figtree (Mehan Default)'},
  {value: 'Albert Sans', label: 'Albert Sans (Crisp SaaS)'},
  {value: 'Outfit', label: 'Outfit (Geometric Sans)'},
  {value: 'Poppins', label: 'Poppins (Circular Sans)'},
  {value: 'Bricolage Grotesque', label: 'Bricolage Grotesque'},
  {value: 'Montserrat', label: 'Montserrat'},
  {value: 'Crimson Text', label: 'Crimson Text (Editorial Serif)'},
  {value: 'system-ui', label: 'System UI (OS Native)'},
];

export const CODE_FONT_OPTIONS = [
  {value: 'Geist Mono', label: 'Geist Mono (Mehan Default)'},
  {value: 'JetBrains Mono', label: 'JetBrains Mono'},
  {value: 'Consolas', label: 'Consolas'},
  {value: 'ui-monospace', label: 'System Monospace'},
];

export const RATIO_OPTIONS = [
  {value: 1.067, label: '1.067 — Minor Second'},
  {value: 1.125, label: '1.125 — Major Second'},
  {value: 1.2, label: '1.200 — Minor Third'},
  {value: 1.22, label: '1.220 — Mehan Balanced'},
  {value: 1.25, label: '1.250 — Major Third'},
  {value: 1.333, label: '1.333 — Perfect Fourth'},
  {value: 1.414, label: '1.414 — Augmented Fourth'},
  {value: 1.5, label: '1.500 — Perfect Fifth'},
  {value: 1.618, label: '1.618 — Golden Ratio'},
];

export const UNIFIED_PRESETS = {
  compact: {
    label: 'Compact',
    typeBase: 12.5,
    typeRatio: 1.125,
    spacing: 3,
    radius: 3,
    sizeMd: 28,
  },
  shotcandy: {
    label: 'Shotcandy',
    typeBase: 13.5,
    typeRatio: 1.22,
    spacing: 4,
    radius: null as number | null,
    sizeMd: 32,
  },
  default: {
    label: 'Default',
    typeBase: 14,
    typeRatio: 1.22,
    spacing: 4,
    radius: 4,
    sizeMd: 36,
  },
  comfortable: {
    label: 'Comfortable',
    typeBase: 16,
    typeRatio: 1.25,
    spacing: 6,
    radius: 6,
    sizeMd: 42,
  },
} as const;

export const RADIUS_TOKEN_OPTIONS = [
  {value: 'var(--radius-none)', token: '--radius-none', label: 'None'},
  {value: 'var(--radius-inner)', token: '--radius-inner', label: 'Inner'},
  {value: 'var(--radius-element)', token: '--radius-element', label: 'Element'},
  {value: 'var(--radius-container)', token: '--radius-container', label: 'Container'},
  {value: 'var(--radius-page)', token: '--radius-page', label: 'Page'},
  {value: 'var(--radius-full)', token: '--radius-full', label: 'Full'},
];

export const SPACING_TOKEN_OPTIONS = [
  {value: 'var(--spacing-0-5)', token: '--spacing-0-5', label: '0.5'},
  {value: 'var(--spacing-1)', token: '--spacing-1', label: '1'},
  {value: 'var(--spacing-2)', token: '--spacing-2', label: '2'},
  {value: 'var(--spacing-3)', token: '--spacing-3', label: '3'},
  {value: 'var(--spacing-4)', token: '--spacing-4', label: '4'},
  {value: 'var(--spacing-6)', token: '--spacing-6', label: '6'},
  {value: 'var(--spacing-8)', token: '--spacing-8', label: '8'},
];

export interface ComponentTokenSlot {
  name: string;
  default: string;
  description: string;
  options: Array<{value: string; token?: string; label: string}>;
}

/** Official 11 Component Token groups from Astryx Theme Editor (`constants.ts`). */
export const COMPONENT_VARS: Record<
  string,
  {label: string; vars: ComponentTokenSlot[]}
> = {
  button: {
    label: 'Button',
    vars: [
      {
        name: '--button-radius',
        default: 'var(--radius-element)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
    ],
  },
  card: {
    label: 'Card',
    vars: [
      {
        name: '--card-radius',
        default: 'var(--radius-container)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
      {
        name: '--card-padding',
        default: 'var(--spacing-4)',
        description: 'Padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
  field: {
    label: 'Field / Input',
    vars: [
      {
        name: '--input-radius',
        default: 'var(--radius-element)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
    ],
  },
  banner: {
    label: 'Banner',
    vars: [
      {
        name: '--banner-radius',
        default: 'var(--radius-container)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
    ],
  },
  'segmented-control': {
    label: 'Segmented Control',
    vars: [
      {
        name: '--segmented-control-radius',
        default: 'var(--radius-element)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
      {
        name: '--segmented-control-padding',
        default: 'var(--spacing-1)',
        description: 'Padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
  dialog: {
    label: 'Dialog',
    vars: [
      {
        name: '--dialog-radius',
        default: 'var(--radius-page)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
      {
        name: '--dialog-padding',
        default: 'var(--spacing-4)',
        description: 'Padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
  'dropdown-menu': {
    label: 'Dropdown Menu',
    vars: [
      {
        name: '--dropdown-radius',
        default: 'var(--radius-container)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
      {
        name: '--dropdown-padding',
        default: 'var(--spacing-1)',
        description: 'Inner padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
  section: {
    label: 'Section',
    vars: [
      {
        name: '--section-padding',
        default: 'var(--spacing-4)',
        description: 'Padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
  popover: {
    label: 'Popover',
    vars: [
      {
        name: '--popover-radius',
        default: 'var(--radius-container)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
    ],
  },
  hovercard: {
    label: 'Hover Card',
    vars: [
      {
        name: '--hovercard-radius',
        default: 'var(--radius-container)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
    ],
  },
  'chat-composer': {
    label: 'Chat Composer',
    vars: [
      {
        name: '--composer-radius',
        default: 'var(--radius-page)',
        description: 'Border radius',
        options: RADIUS_TOKEN_OPTIONS,
      },
      {
        name: '--composer-padding',
        default: 'var(--spacing-3)',
        description: 'Padding',
        options: SPACING_TOKEN_OPTIONS,
      },
    ],
  },
};

export const COMPONENT_VAR_TO_OVERRIDE: Record<
  string,
  {component: string; cssProperty: string}[]
> = {
  '--button-radius': [
    {component: 'button', cssProperty: 'borderRadius'},
    {component: 'icon-button', cssProperty: 'borderRadius'},
    {component: 'toggle-button', cssProperty: 'borderRadius'},
  ],
  '--card-radius': [
    {component: 'card', cssProperty: 'borderRadius'},
    {component: 'clickable-card', cssProperty: 'borderRadius'},
    {component: 'selectable-card', cssProperty: 'borderRadius'},
  ],
  '--card-padding': [
    {component: 'card', cssProperty: 'padding'},
    {component: 'clickable-card', cssProperty: 'padding'},
  ],
  '--input-radius': [
    {component: 'text-input', cssProperty: '--_field-radius'},
    {component: 'text-area', cssProperty: '--_field-radius'},
    {component: 'number-input', cssProperty: '--_field-radius'},
    {component: 'date-input', cssProperty: '--_field-radius'},
    {component: 'date-range-input', cssProperty: '--_field-radius'},
    {component: 'date-time-input-date-segment', cssProperty: '--_field-radius'},
    {component: 'date-time-input-time-segment', cssProperty: '--_field-radius'},
    {component: 'time-input', cssProperty: '--_field-radius'},
    {component: 'typeahead', cssProperty: '--_field-radius'},
    {component: 'tokenizer', cssProperty: '--_field-radius'},
    {component: 'power-search', cssProperty: '--_field-radius'},
    {component: 'selector', cssProperty: '--_field-radius'},
    {component: 'multi-selector', cssProperty: '--_field-radius'},
    {component: 'file-input', cssProperty: 'borderRadius'},
  ],
  '--banner-radius': [{component: 'banner', cssProperty: 'borderRadius'}],
  '--segmented-control-radius': [
    {component: 'segmented-control', cssProperty: 'borderRadius'},
  ],
  '--segmented-control-padding': [
    {component: 'segmented-control', cssProperty: 'padding'},
  ],
  '--dialog-radius': [
    {component: 'dialog', cssProperty: 'borderRadius'},
    {component: 'alert-dialog', cssProperty: 'borderRadius'},
  ],
  '--dialog-padding': [
    {component: 'dialog', cssProperty: 'padding'},
    {component: 'dialog', cssProperty: '--astryx-dialog-padding'},
    {component: 'alert-dialog', cssProperty: 'padding'},
  ],
  '--dropdown-radius': [
    {component: 'dropdown-menu', cssProperty: 'borderRadius'},
    {component: 'dropdown-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'context-menu', cssProperty: 'borderRadius'},
    {component: 'context-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'more-menu', cssProperty: 'borderRadius'},
    {component: 'more-menu', cssProperty: '--_dropdown-menu-radius'},
    {component: 'selector-popup', cssProperty: 'borderRadius'},
    {component: 'multi-selector-popup', cssProperty: 'borderRadius'},
    {component: 'complex-selector-popup', cssProperty: 'borderRadius'},
  ],
  '--dropdown-padding': [
    {component: 'dropdown-menu', cssProperty: 'padding'},
    {component: 'dropdown-menu', cssProperty: '--_dropdown-menu-padding'},
    {component: 'context-menu', cssProperty: 'padding'},
    {component: 'context-menu', cssProperty: '--_dropdown-menu-padding'},
    {component: 'more-menu', cssProperty: 'padding'},
    {component: 'more-menu', cssProperty: '--_dropdown-menu-padding'},
  ],
  '--section-padding': [{component: 'section', cssProperty: 'padding'}],
  '--popover-radius': [{component: 'popover', cssProperty: 'borderRadius'}],
  '--hovercard-radius': [
    {component: 'hover-card', cssProperty: 'borderRadius'},
  ],
  '--composer-radius': [
    {component: 'chat-composer', cssProperty: '--_chat-composer-radius'},
    {component: 'chat-composer', cssProperty: 'borderRadius'},
  ],
  '--composer-padding': [
    {component: 'chat-composer', cssProperty: '--_chat-composer-padding'},
  ],
};

export function resolveComponentOptionLabel(
  option: {label: string; token?: string; value: string},
  tokens: Record<string, string>,
): string {
  if (!option.token) return option.label;
  const resolved = tokens[option.token];
  return resolved ? `${option.label} — ${resolved}` : `${option.label} (${option.token})`;
}

export function readSeededComponentValue(
  baseComponents: Record<string, unknown> | undefined,
  varName: string,
): string | undefined {
  if (!baseComponents) return undefined;
  const mapping = COMPONENT_VAR_TO_OVERRIDE[varName]?.[0];
  if (!mapping) return undefined;
  const comp = baseComponents[mapping.component];
  if (!comp || typeof comp !== 'object') return undefined;
  const base = (comp as Record<string, unknown>).base;
  if (!base || typeof base !== 'object') return undefined;
  const val = (base as Record<string, unknown>)[mapping.cssProperty];
  return typeof val === 'string' ? val : undefined;
}

export const COMPONENT_VAR_NAMES = new Set(
  Object.keys(COMPONENT_VAR_TO_OVERRIDE),
);

/** Full list of Astryx component targets available for Custom CSS Overrides. */
export const ALL_COMPONENT_TARGETS = [
  'alert-dialog',
  'app-shell',
  'avatar',
  'avatar-fallback',
  'badge',
  'banner',
  'blockquote',
  'bottom-sheet',
  'button',
  'button-group',
  'calendar',
  'calendar-day',
  'card',
  'chat-composer',
  'chat-message',
  'chat-message-bubble',
  'chat-send-button',
  'chat-tool-calls',
  'checkbox-indicator',
  'citation',
  'clickable-card',
  'code',
  'code-block',
  'collapsible',
  'collapsible-trigger',
  'command-palette',
  'command-palette-input',
  'complex-selector',
  'context-menu',
  'date-input',
  'dialog',
  'divider',
  'drawer',
  'dropdown-menu',
  'empty-state',
  'field',
  'file-input',
  'heading',
  'hover-card',
  'icon',
  'item',
  'kbd-key',
  'link',
  'list',
  'markdown',
  'more-menu',
  'multi-selector',
  'number-input',
  'outline-indicator',
  'outline-item',
  'pagination-item',
  'popover',
  'power-search',
  'progress-bar',
  'progress-bar-fill',
  'radio-indicator',
  'radio-list-item',
  'resize-handle',
  'section',
  'segmented-control',
  'segmented-control-item',
  'selectable-card',
  'selector',
  'side-nav',
  'side-nav-item',
  'skeleton',
  'slider',
  'spinner',
  'step-indicator',
  'switch',
  'tab',
  'tab-indicator',
  'tab-list',
  'table',
  'table-cell',
  'table-header-cell',
  'text',
  'text-area',
  'text-input',
  'toast',
  'toggle-button',
  'token',
  'tokenizer',
  'toolbar',
  'tooltip',
  'top-nav',
  'top-nav-item',
  'tree-list',
  'tree-list-item',
  'typeahead',
] as const;

export const COLOR_CATEGORIES: Record<string, readonly string[]> = {
  'Core Semantic': [
    '--color-accent',
    '--color-accent-muted',
    '--color-on-accent',
    '--color-neutral',
    '--color-overlay',
    '--color-overlay-hover',
    '--color-overlay-pressed',
  ],
  Text: [
    '--color-text-primary',
    '--color-text-secondary',
    '--color-text-disabled',
    '--color-text-accent',
    '--color-on-dark',
    '--color-on-light',
  ],
  Icon: [
    '--color-icon-primary',
    '--color-icon-secondary',
    '--color-icon-disabled',
    '--color-icon-accent',
  ],
  'Surface Variants': [
    '--color-background-surface',
    '--color-background-body',
    '--color-background-muted',
    '--color-background-card',
    '--color-background-popover',
    '--color-background-inverted',
    '--color-background-error-inverted',
  ],
  'Category Colors': [
    '--color-background-blue',
    '--color-background-cyan',
    '--color-background-gray',
    '--color-background-green',
    '--color-background-orange',
    '--color-background-pink',
    '--color-background-purple',
    '--color-background-red',
    '--color-background-teal',
    '--color-background-yellow',
  ],
  'Status / Sentiment': [
    '--color-info',
    '--color-info-muted',
    '--color-text-info',
    '--color-success',
    '--color-success-muted',
    '--color-text-success',
    '--color-warning',
    '--color-warning-muted',
    '--color-text-warning',
    '--color-error',
    '--color-error-muted',
    '--color-text-error',
  ],
  'Divider & Focus': [
    '--color-border',
    '--color-border-emphasized',
    '--focus-outline-color',
  ],
  Effects: ['--color-skeleton', '--color-shadow', '--color-tint-hover'],
  'Data Visualization': [
    '--color-data-categorical-blue',
    '--color-data-categorical-orange',
    '--color-data-categorical-purple',
    '--color-data-categorical-green',
    '--color-data-categorical-pink',
    '--color-data-categorical-cyan',
    '--color-data-categorical-red',
    '--color-data-categorical-teal',
    '--color-data-categorical-brown',
    '--color-data-categorical-indigo',
    '--color-data-neutral',
  ],
  'Syntax Highlighting': [
    '--color-syntax-keyword',
    '--color-syntax-string',
    '--color-syntax-comment',
    '--color-syntax-number',
    '--color-syntax-function',
    '--color-syntax-type',
    '--color-syntax-variable',
    '--color-syntax-background',
  ],
};

export const TYPOGRAPHY_CATEGORIES: Record<string, readonly string[]> = {
  'Font Families': [
    '--font-family-heading',
    '--font-family-body',
    '--font-family-code',
  ],
  'Heading 1': [
    '--text-heading-1-size',
    '--text-heading-1-weight',
    '--text-heading-1-leading',
  ],
  'Heading 2': [
    '--text-heading-2-size',
    '--text-heading-2-weight',
    '--text-heading-2-leading',
  ],
  'Heading 3': [
    '--text-heading-3-size',
    '--text-heading-3-weight',
    '--text-heading-3-leading',
  ],
  'Body Text': [
    '--text-body-size',
    '--text-body-weight',
    '--text-body-leading',
  ],
  'Label Text': [
    '--text-label-size',
    '--text-label-weight',
    '--text-label-leading',
  ],
  'Supporting Text': [
    '--text-supporting-size',
    '--text-supporting-weight',
    '--text-supporting-leading',
  ],
};

export const ADVANCED_TOKEN_GROUPS = {
  colors: {label: 'Colors', keys: [] as string[]},
  spacing: {label: 'Spacing', keys: Object.keys(spacingDefaults)},
  radius: {label: 'Radius', keys: Object.keys(radiusDefaults)},
  typography: {label: 'Typography', keys: [] as string[]},
  size: {label: 'Size', keys: Object.keys(sizeDefaults)},
  shadow: {label: 'Elevation', keys: Object.keys(shadowDefaults)},
  duration: {label: 'Duration', keys: Object.keys(durationDefaults)},
  easing: {label: 'Easing', keys: Object.keys(easeDefaults)},
} as const;

export type AdvancedTokenGroupKey = keyof typeof ADVANCED_TOKEN_GROUPS;

export function parseLightDark(
  value: string,
): {light: string; dark: string} | null {
  const match = /^light-dark\(([^,]+),\s*([^)]+)\)$/.exec((value ?? '').trim());
  if (!match) return null;
  return {light: match[1].trim(), dark: match[2].trim()};
}

export function parseColorWithAlpha(
  value: string,
): {hex: string; alpha: number} | null {
  const v = (value ?? '').trim();
  const hex8 = /^#([0-9a-fA-F]{8})$/.exec(v);
  if (hex8) {
    return {
      hex: `#${hex8[1].slice(0, 6)}`,
      alpha: Math.round((parseInt(hex8[1].slice(6, 8), 16) / 255) * 100) / 100,
    };
  }
  const hex6 = /^#([0-9a-fA-F]{6})$/.exec(v);
  if (hex6) return {hex: v, alpha: 1};
  const hex3 = /^#([0-9a-fA-F]{3})$/.exec(v);
  if (hex3) {
    const [r, g, b] = hex3[1];
    return {hex: `#${r}${r}${g}${g}${b}${b}`, alpha: 1};
  }
  const rgba = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/.exec(v);
  if (rgba) {
    const r = Number(rgba[1]).toString(16).padStart(2, '0');
    const g = Number(rgba[2]).toString(16).padStart(2, '0');
    const b = Number(rgba[3]).toString(16).padStart(2, '0');
    return {hex: `#${r}${g}${b}`, alpha: rgba[4] ? Number(rgba[4]) : 1};
  }
  return null;
}

export function colorWithAlphaToString(hex: string, alpha: number): string {
  if (alpha >= 0.999) return hex.toLowerCase();
  const aHex = Math.round(Math.min(1, Math.max(0, alpha)) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex.toLowerCase()}${aHex}`;
}

export function getTokenLabel(tokenName: string): string {
  return tokenName
    .replace(/^--/, '')
    .replace(/^color-data-categorical-/, 'Data ')
    .replace(/^color-syntax-/, 'Syntax ')
    .replace(/-/g, ' ')
    .replace(/\bbackground /gi, '')
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function spacingToPx(value: string | undefined): number {
  const match = /^(\d*\.?\d+)(px|rem)$/.exec((value ?? '').trim());
  if (!match) return Number.NaN;
  const n = Number.parseFloat(match[1]);
  return match[2] === 'rem' ? n * 16 : n;
}

export function buildSpacingScale(base: number): Record<string, string> {
  const steps = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const patch: Record<string, string> = {};
  for (const step of steps) {
    patch[`--spacing-${String(step).replace('.', '-')}`] =
      `${Math.round(base * step) / 16}rem`;
  }
  return patch;
}

export function getConcentricityWarning(
  radiusBase: number | null,
  spacingBase: number,
): string | null {
  if (radiusBase == null || !Number.isFinite(radiusBase)) return null;
  if (radiusBase === spacingBase) return null;
  const radii = expandRadiusScale({base: radiusBase, multiplier: 1});
  const container = parseInt(radii['--radius-container'], 10);
  const element = parseInt(radii['--radius-element'], 10);
  return `Container radius (${container}px) − spacing-1 (${spacingBase}px) = ${container - spacingBase}px, while element radius is ${element}px. Match Radius & Spacing (${spacingBase}px) for concentric nested corners.`;
}

export function buildComponentTokenOverrides(
  componentTokens: Record<string, string>,
): ComponentStyleMap {
  const components: Record<string, Record<string, Record<string, string>>> = {};
  for (const [varName, value] of Object.entries(componentTokens)) {
    if (!value) continue;
    const mappings = COMPONENT_VAR_TO_OVERRIDE[varName];
    if (!mappings) continue;
    for (const {component, cssProperty} of mappings) {
      components[component] ??= {};
      components[component].base ??= {};
      components[component].base[cssProperty] = value;
    }
  }
  return components as ComponentStyleMap;
}

function fnvHash8(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36).padStart(6, '0').slice(0, 8);
}

/**
 * Composes the live `DefinedTheme` AND the resolved flat token lookup table
 * from `FullThemeEditorState` (Mehan DNA seed + Base/Advanced token overrides +
 * Component token overrides + Custom CSS overrides).
 */
export function composeStudioTheme(state: FullThemeEditorState): {
  theme: DefinedTheme;
  effectiveTokens: Record<string, string>;
  baseComponents: Record<string, unknown>;
} {
  const {seed, tokenOverrides, customOverrides} = state;

  const coreTokenOverrides: Partial<Record<TokenName, TokenValue>> = {};
  const compVarOverrides: Record<string, string> = {};

  for (const [k, v] of Object.entries(tokenOverrides)) {
    if (!v) continue;
    if (COMPONENT_VAR_NAMES.has(k)) {
      compVarOverrides[k] = v;
    } else {
      coreTokenOverrides[k as TokenName] = v;
    }
  }

  const customCompMap: Record<string, {base: Record<string, string>}> = {};
  for (const item of customOverrides) {
    if (!item.component || !item.property || !item.value) continue;
    customCompMap[item.component] ??= {base: {}};
    customCompMap[item.component].base[item.property] = item.value;
  }

  const extraComponents = mergeMehanComponentStyles(
    buildComponentTokenOverrides(compVarOverrides),
    customCompMap,
  );

  const slug = `mh-${seed.atmosphere}-${fnvHash8(JSON.stringify(state))}`;

  const baseSeedTheme = createMehanTheme({
    name: `${slug}-seed`,
    atmosphere: seed.atmosphere,
    accent: seed.accent,
    depth: seed.depth,
    radiusScale: seed.radiusScale,
    radiusBase: seed.radiusBase ?? undefined,
    spacingBase: seed.spacingBase,
    sizeBase: seed.sizeBase,
    typeBase: seed.typeBase,
    typeRatio: seed.typeRatio,
    headingFont: seed.headingFont,
    bodyFont: seed.bodyFont,
    codeFont: seed.codeFont,
    motion: seed.motion,
    durationStep: seed.durationStep,
    lipStyle: seed.lipStyle,
    segmentedStyle: seed.segmentedStyle,
    wellStyle: seed.wellStyle,
  });

  const theme = createMehanTheme({
    name: slug,
    atmosphere: seed.atmosphere,
    accent: seed.accent,
    depth: seed.depth,
    radiusScale: seed.radiusScale,
    radiusBase: seed.radiusBase ?? undefined,
    spacingBase: seed.spacingBase,
    sizeBase: seed.sizeBase,
    typeBase: seed.typeBase,
    typeRatio: seed.typeRatio,
    headingFont: seed.headingFont,
    bodyFont: seed.bodyFont,
    codeFont: seed.codeFont,
    motion: seed.motion,
    durationStep: seed.durationStep,
    lipStyle: seed.lipStyle,
    segmentedStyle: seed.segmentedStyle,
    wellStyle: seed.wellStyle,
    tokens: coreTokenOverrides,
    components:
      Object.keys(extraComponents).length > 0 ? extraComponents : undefined,
  });

  const effectiveTokens: Record<string, string> = {
    ...ALL_ASTRYX_DEFAULTS,
    ...expandTypeScale({base: seed.typeBase, ratio: seed.typeRatio}),
    ...buildSpacingScale(seed.spacingBase),
    ...theme.tokens,
    ...compVarOverrides,
  };

  return {
    theme,
    effectiveTokens,
    baseComponents: (baseSeedTheme.components ?? {}) as Record<string, unknown>,
  };
}

/**
 * Exports a clean TypeScript theme module using `createMehanTheme()` (preserves
 * 100% of Mehan tactile physics + every custom token and component override).
 */
export function exportCreateMehanThemeTs(
  state: FullThemeEditorState,
  themeName = 'customMehan',
): string {
  const {seed, tokenOverrides, customOverrides} = state;
  const coreTokens: Record<string, string> = {};
  const compVars: Record<string, string> = {};
  for (const [k, v] of Object.entries(tokenOverrides)) {
    if (!v) continue;
    if (COMPONENT_VAR_NAMES.has(k)) compVars[k] = v;
    else coreTokens[k] = v;
  }
  const customCompMap: Record<string, {base: Record<string, string>}> = {};
  for (const o of customOverrides) {
    customCompMap[o.component] ??= {base: {}};
    customCompMap[o.component].base[o.property] = o.value;
  }
  const mergedComp = mergeMehanComponentStyles(
    buildComponentTokenOverrides(compVars),
    customCompMap,
  );

  const lines: string[] = [
    "import {createMehanTheme} from '@mehan/astryx/dna';",
    '',
    `export const ${themeName}Theme = createMehanTheme({`,
    `  name: '${themeName.replace(/([A-Z])/g, '-$1').toLowerCase()}',`,
    `  atmosphere: '${seed.atmosphere}',`,
    `  accent: '${seed.accent}',`,
    `  depth: ${seed.depth},`,
    `  lipStyle: '${seed.lipStyle}',`,
    `  segmentedStyle: '${seed.segmentedStyle}',`,
    `  wellStyle: '${seed.wellStyle}',`,
    `  typeBase: ${seed.typeBase},`,
    `  typeRatio: ${seed.typeRatio},`,
    `  headingFont: '${seed.headingFont}',`,
    `  bodyFont: '${seed.bodyFont}',`,
    `  codeFont: '${seed.codeFont}',`,
    `  spacingBase: ${seed.spacingBase},`,
    ...(seed.radiusBase != null
      ? [`  radiusBase: ${seed.radiusBase},`]
      : [`  radiusScale: ${seed.radiusScale},`]),
    `  sizeBase: ${seed.sizeBase},`,
    `  motion: '${seed.motion}',`,
    `  durationStep: ${seed.durationStep},`,
  ];

  if (Object.keys(coreTokens).length > 0) {
    lines.push(`  tokens: ${JSON.stringify(coreTokens, null, 4).replace(/\n/g, '\n  ')},`);
  }
  if (Object.keys(mergedComp).length > 0) {
    lines.push(
      `  components: ${JSON.stringify(mergedComp, null, 4).replace(/\n/g, '\n  ')},`,
    );
  }
  lines.push('});', '');
  return lines.join('\n');
}

/**
 * Exports a pure `@astryxdesign/core/theme` `defineTheme()` `.ts` file compatible
 * with both `astryx.atmeta.com/playground` and standalone Astryx apps.
 */
export function exportPureAstryxDefineThemeTs(
  state: FullThemeEditorState,
  themeName = 'mehanCustom',
): string {
  const {theme} = composeStudioTheme(state);
  return [
    "import {defineTheme} from '@astryxdesign/core/theme';",
    '',
    `export const ${themeName}Theme = defineTheme({`,
    `  name: '${themeName.replace(/([A-Z])/g, '-$1').toLowerCase()}',`,
    `  typography: {`,
    `    scale: {base: ${state.seed.typeBase}, ratio: ${state.seed.typeRatio}},`,
    `  },`,
    `  tokens: ${JSON.stringify(theme.tokens, null, 4).replace(/\n/g, '\n  ')},`,
    ...(theme.localTokens && Object.keys(theme.localTokens).length > 0
      ? [
          `  localTokens: ${JSON.stringify(theme.localTokens, null, 4).replace(/\n/g, '\n  ')},`,
        ]
      : []),
    ...(theme.components && Object.keys(theme.components).length > 0
      ? [
          `  components: ${JSON.stringify(theme.components, null, 4).replace(/\n/g, '\n  ')},`,
        ]
      : []),
    `});`,
    '',
  ].join('\n');
}

function readTsStringProp(source: string, prop: string): string | undefined {
  const re = new RegExp(`\\b${prop}\\s*:\\s*['"]([^'"]+)['"]`);
  return re.exec(source)?.[1];
}

function readTsNumberProp(source: string, prop: string): number | undefined {
  const re = new RegExp(`\\b${prop}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)`);
  const raw = re.exec(source)?.[1];
  if (raw == null) return undefined;
  const num = Number(raw);
  return Number.isFinite(num) ? num : undefined;
}

function extractBalancedBraceBlock(
  source: string,
  anchorRegex: RegExp,
): string | null {
  const anchor = anchorRegex.exec(source);
  if (!anchor) return null;
  const openIdx = source.indexOf('{', anchor.index + anchor[0].length - 1);
  if (openIdx === -1) return null;
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  for (let i = openIdx; i < source.length; i += 1) {
    const ch = source[i];
    const prev = i > 0 ? source[i - 1] : '';
    if (inStr) {
      if (ch === inStr && prev !== '\\') inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inStr = ch;
      continue;
    }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(openIdx, i + 1);
    }
  }
  return null;
}

/**
 * Imports a Mehan Studio `.json` file, a `createMehanTheme({...})` `.ts` module,
 * OR a pure `defineTheme({...})` `.ts` module (e.g. from `astryx.atmeta.com/playground`).
 */
export function parseImportedThemeText(
  rawText: string,
  fallback: FullThemeEditorState,
): FullThemeEditorState {
  const trimmed = rawText.trim();

  // Case 1: JSON format
  if (trimmed.startsWith('{')) {
    const parsed = JSON.parse(trimmed) as Partial<FullThemeEditorState> & {
      config?: Partial<StudioSeedConfig>;
    };
    const rawSeed = parsed.seed ?? parsed.config ?? {};
    const nextSeed: StudioSeedConfig = {
      atmosphere: isMehanAtmosphereId(rawSeed.atmosphere)
        ? rawSeed.atmosphere
        : fallback.seed.atmosphere,
      accent:
        typeof rawSeed.accent === 'string' && rawSeed.accent
          ? rawSeed.accent
          : fallback.seed.accent,
      depth:
        typeof rawSeed.depth === 'number' && Number.isFinite(rawSeed.depth)
          ? rawSeed.depth
          : fallback.seed.depth,
      radiusScale:
        typeof rawSeed.radiusScale === 'number' && Number.isFinite(rawSeed.radiusScale)
          ? rawSeed.radiusScale
          : fallback.seed.radiusScale,
      radiusBase:
        typeof rawSeed.radiusBase === 'number' && Number.isFinite(rawSeed.radiusBase)
          ? rawSeed.radiusBase
          : rawSeed.radiusBase === null
            ? null
            : fallback.seed.radiusBase,
      spacingBase:
        typeof rawSeed.spacingBase === 'number' && Number.isFinite(rawSeed.spacingBase)
          ? rawSeed.spacingBase
          : fallback.seed.spacingBase,
      sizeBase:
        typeof rawSeed.sizeBase === 'number' && Number.isFinite(rawSeed.sizeBase)
          ? rawSeed.sizeBase
          : fallback.seed.sizeBase,
      typeBase:
        typeof rawSeed.typeBase === 'number' && Number.isFinite(rawSeed.typeBase)
          ? rawSeed.typeBase
          : fallback.seed.typeBase,
      typeRatio:
        typeof rawSeed.typeRatio === 'number' && Number.isFinite(rawSeed.typeRatio)
          ? rawSeed.typeRatio
          : fallback.seed.typeRatio,
      headingFont:
        typeof rawSeed.headingFont === 'string' && rawSeed.headingFont
          ? rawSeed.headingFont
          : fallback.seed.headingFont,
      bodyFont:
        typeof rawSeed.bodyFont === 'string' && rawSeed.bodyFont
          ? rawSeed.bodyFont
          : fallback.seed.bodyFont,
      codeFont:
        typeof rawSeed.codeFont === 'string' && rawSeed.codeFont
          ? rawSeed.codeFont
          : fallback.seed.codeFont,
      motion:
        rawSeed.motion === 'calm' ||
        rawSeed.motion === 'standard' ||
        rawSeed.motion === 'crisp' ||
        rawSeed.motion === 'expressive'
          ? rawSeed.motion
          : fallback.seed.motion,
      durationStep:
        typeof rawSeed.durationStep === 'number' && Number.isFinite(rawSeed.durationStep)
          ? rawSeed.durationStep
          : fallback.seed.durationStep,
      lipStyle:
        rawSeed.lipStyle === 'subtle' ||
        rawSeed.lipStyle === 'flat' ||
        rawSeed.lipStyle === 'candy'
          ? rawSeed.lipStyle
          : fallback.seed.lipStyle,
      segmentedStyle:
        rawSeed.segmentedStyle === 'espresso' || rawSeed.segmentedStyle === 'raised'
          ? rawSeed.segmentedStyle
          : fallback.seed.segmentedStyle,
      wellStyle:
        rawSeed.wellStyle === 'bordered' || rawSeed.wellStyle === 'recessed'
          ? rawSeed.wellStyle
          : fallback.seed.wellStyle,
    };
    return {
      seed: nextSeed,
      tokenOverrides:
        parsed.tokenOverrides && typeof parsed.tokenOverrides === 'object'
          ? {...parsed.tokenOverrides}
          : {},
      customOverrides: Array.isArray(parsed.customOverrides)
        ? parsed.customOverrides
        : [],
    };
  }

  // Case 2A: Mehan `createMehanTheme({ ... })` TypeScript module
  const isCreateMehan = /\bcreateMehanTheme\s*\(/.test(trimmed);
  const isDefineTheme = /\bdefineTheme\s*\(/.test(trimmed);

  const nextSeed: StudioSeedConfig = {...fallback.seed};
  let foundSeedProp = false;

  if (isCreateMehan) {
    const atm = readTsStringProp(trimmed, 'atmosphere');
    if (isMehanAtmosphereId(atm)) {
      nextSeed.atmosphere = atm;
      foundSeedProp = true;
    }
    const accent = readTsStringProp(trimmed, 'accent');
    if (accent) {
      nextSeed.accent = accent;
      foundSeedProp = true;
    }
    const lip = readTsStringProp(trimmed, 'lipStyle');
    if (lip === 'candy' || lip === 'subtle' || lip === 'flat') {
      nextSeed.lipStyle = lip;
      foundSeedProp = true;
    }
    const seg = readTsStringProp(trimmed, 'segmentedStyle');
    if (seg === 'raised' || seg === 'espresso') {
      nextSeed.segmentedStyle = seg;
      foundSeedProp = true;
    }
    const well = readTsStringProp(trimmed, 'wellStyle');
    if (well === 'recessed' || well === 'bordered') {
      nextSeed.wellStyle = well;
      foundSeedProp = true;
    }
    const motion = readTsStringProp(trimmed, 'motion');
    if (
      motion === 'expressive' ||
      motion === 'standard' ||
      motion === 'crisp' ||
      motion === 'calm'
    ) {
      nextSeed.motion = motion;
      foundSeedProp = true;
    }
    const hFont = readTsStringProp(trimmed, 'headingFont');
    if (hFont) {
      nextSeed.headingFont = hFont;
      foundSeedProp = true;
    }
    const bFont = readTsStringProp(trimmed, 'bodyFont');
    if (bFont) {
      nextSeed.bodyFont = bFont;
      foundSeedProp = true;
    }
    const cFont = readTsStringProp(trimmed, 'codeFont');
    if (cFont) {
      nextSeed.codeFont = cFont;
      foundSeedProp = true;
    }
    const depth = readTsNumberProp(trimmed, 'depth');
    if (depth != null) {
      nextSeed.depth = depth;
      foundSeedProp = true;
    }
    const typeBase = readTsNumberProp(trimmed, 'typeBase');
    if (typeBase != null) {
      nextSeed.typeBase = typeBase;
      foundSeedProp = true;
    }
    const typeRatio = readTsNumberProp(trimmed, 'typeRatio');
    if (typeRatio != null) {
      nextSeed.typeRatio = typeRatio;
      foundSeedProp = true;
    }
    const spacingBase = readTsNumberProp(trimmed, 'spacingBase');
    if (spacingBase != null) {
      nextSeed.spacingBase = spacingBase;
      foundSeedProp = true;
    }
    const radiusBase = readTsNumberProp(trimmed, 'radiusBase');
    const radiusScale = readTsNumberProp(trimmed, 'radiusScale');
    if (radiusBase != null) {
      nextSeed.radiusBase = radiusBase;
      foundSeedProp = true;
    } else if (radiusScale != null) {
      nextSeed.radiusBase = null;
      nextSeed.radiusScale = radiusScale;
      foundSeedProp = true;
    }
    const sizeBase = readTsNumberProp(trimmed, 'sizeBase');
    if (sizeBase != null) {
      nextSeed.sizeBase = sizeBase;
      foundSeedProp = true;
    }
    const durationStep = readTsNumberProp(trimmed, 'durationStep');
    if (durationStep != null) {
      nextSeed.durationStep = durationStep;
      foundSeedProp = true;
    }
  } else if (isDefineTheme) {
    const scaleBlock = extractBalancedBraceBlock(trimmed, /\bscale\s*:\s*\{/);
    if (scaleBlock) {
      const base = readTsNumberProp(scaleBlock, 'base');
      const ratio = readTsNumberProp(scaleBlock, 'ratio');
      if (base != null) nextSeed.typeBase = base;
      if (ratio != null) nextSeed.typeRatio = ratio;
    }
  }

  // Extract `tokens: { ... }` (avoiding `localTokens` or `components` collisions)
  const tokensBlock =
    extractBalancedBraceBlock(trimmed, /\btokens\s*:\s*\{/) ?? trimmed;
  const extractedTokens: Record<string, string> = {};
  const tokenPairRegex = /['"](--[a-zA-Z0-9_-]+)['"]\s*:\s*['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = tokenPairRegex.exec(tokensBlock)) !== null) {
    const [, key, val] = match;
    if (!key.startsWith('--_astryx-')) {
      extractedTokens[key] = val;
    }
  }

  // Extract `components: { ... }` from `createMehanTheme` if present (JSON-formatted)
  let nextCustomOverrides: CustomCssOverride[] = isCreateMehan
    ? []
    : [...fallback.customOverrides];
  if (isCreateMehan) {
    const compBlock = extractBalancedBraceBlock(trimmed, /\bcomponents\s*:\s*\{/);
    if (compBlock) {
      try {
        const parsedComp = JSON.parse(compBlock) as Record<
          string,
          {base?: Record<string, string>}
        >;
        const consumedPairs = new Set<string>();
        for (const [varName, targets] of Object.entries(COMPONENT_VAR_TO_OVERRIDE)) {
          if (targets.length === 0) continue;
          const firstVal =
            parsedComp[targets[0].component]?.base?.[targets[0].cssProperty];
          if (typeof firstVal !== 'string' || !firstVal) continue;
          const allMatch = targets.every(
            t => parsedComp[t.component]?.base?.[t.cssProperty] === firstVal,
          );
          if (allMatch) {
            extractedTokens[varName] = firstVal;
            for (const t of targets) {
              consumedPairs.add(`${t.component}::${t.cssProperty}`);
            }
          }
        }
        let idx = 0;
        for (const [compName, slots] of Object.entries(parsedComp)) {
          if (!slots?.base) continue;
          for (const [prop, val] of Object.entries(slots.base)) {
            if (consumedPairs.has(`${compName}::${prop}`)) continue;
            if (typeof val === 'string') {
              idx += 1;
              nextCustomOverrides.push({
                id: `imp-${idx}`,
                component: compName,
                property: prop,
                value: val,
              });
            }
          }
        }
      } catch {
        // Ignore hand-edited non-JSON component expressions
      }
    }
  } else if (isDefineTheme && Object.keys(extractedTokens).length > 0) {
    // Only store tokens that actually differ from the base seed theme so seed sliders stay clean!
    const {theme: baseSeedTheme} = composeStudioTheme({
      seed: nextSeed,
      tokenOverrides: {},
      customOverrides: [],
    });
    for (const [k, v] of Object.entries(extractedTokens)) {
      if (baseSeedTheme.tokens[k as TokenName] === v) {
        delete extractedTokens[k];
      }
    }
  }

  if (!foundSeedProp && !isDefineTheme && Object.keys(extractedTokens).length === 0) {
    throw new Error('No valid Mehan JSON or Astryx --token entries found.');
  }

  return {
    seed: nextSeed,
    tokenOverrides: extractedTokens,
    customOverrides: nextCustomOverrides,
  };
}
