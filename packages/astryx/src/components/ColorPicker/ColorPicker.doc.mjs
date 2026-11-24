/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColorPicker',
  displayName: 'Color Picker',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['color picker', 'hsv', 'hex input', 'eyedropper', 'palette'],
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
  ],
  usage: {
    description:
      'Tactile HSV saturation-value canvas, hue rail, hex field, progressive browser EyeDropper button, and preset ColorSwatch strip. Place inline in an inspector or inside Core Popover.',
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
