/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColorWell',
  displayName: 'Color Well',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['color well', 'color button', 'inspector swatch', 'popover color picker'],
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled 6-digit "#rrggbb" hex color value.',
      required: true,
    },
    {
      name: 'onChange',
      type: '(hex: string) => void',
      description: 'Called with normalized lowercase "#rrggbb" hex when a color is picked.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label announced for the color well trigger and popover dialog.',
      default: "'Choose color'",
    },
    {
      name: 'hasAlpha',
      type: 'boolean',
      description: 'Enable checkerboard alpha opacity control inside the floating picker.',
      default: 'false',
    },
    {
      name: 'alpha',
      type: 'number',
      description: 'Controlled opacity in the range 0..1 when `hasAlpha` is enabled.',
      default: '1',
    },
    {
      name: 'onAlphaChange',
      type: '(alpha: number) => void',
      description: 'Called with normalized 0..1 opacity when the alpha rail changes.',
    },
    {
      name: 'presets',
      type: 'readonly string[]',
      description: 'Optional curated hex swatches shown inside the popover.',
    },
    {
      name: 'hasHexReadout',
      type: 'boolean',
      description: 'Display the tabular `#RRGGBB` readout next to the color chip.',
      default: 'true',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables opening the color well.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Compact inspector color chip with checkerboard alpha preview and tabular hex readout that opens a focus-restoring floating `ColorPicker` popover on click.',
    bestPractices: [
      {
        guidance: true,
        description: 'Use `ColorWell` in dense property panels or table cells where an inline `ColorPicker` would consume too much vertical space.',
      },
      {
        guidance: false,
        description: 'Omit `label` when multiple ColorWells appear in the same toolbar (e.g. "Fill color" vs. "Stroke color").',
      },
    ],
  },
};
