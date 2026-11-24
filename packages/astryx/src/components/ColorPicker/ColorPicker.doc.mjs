/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColorPicker',
  displayName: 'Color Picker',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['color picker', 'hsv', 'alpha', 'opacity', 'hex input', 'eyedropper', 'palette'],
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
      description: 'Called with normalized lowercase "#rrggbb" hex whenever selection changes.',
      required: true,
    },
    {
      name: 'presets',
      type: 'readonly string[]',
      description: 'Quick-select preset hex colors rendered as tactile ColorSwatch buttons.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible group label for the color picker surface.',
      default: "'Color picker'",
    },
    {
      name: 'hasAlpha',
      type: 'boolean',
      description: 'Render a checkerboard-backed opacity rail (0%–100%) below the hue slider.',
      default: 'false',
    },
    {
      name: 'alpha',
      type: 'number',
      description: 'Controlled alpha opacity value in the range 0..1 when `hasAlpha` is enabled.',
    },
    {
      name: 'onAlphaChange',
      type: '(alpha: number) => void',
      description: 'Called with normalized 0..1 opacity whenever the alpha rail changes.',
    },
  ],
  usage: {
    description:
      'Tactile HSV saturation-value canvas, hue rail, optional checkerboard alpha slider, hex field, progressive browser EyeDropper button, and preset ColorSwatch strip.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pass curated brand stops in `presets` so users can snap back to canonical tokens.',
      },
      {
        guidance: false,
        description: 'Pass arbitrary named CSS strings ("rebeccapurple"); pass normalized 6-digit hex.',
      },
    ],
  },
};
