/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'Rating',
  displayName: 'Rating',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['rating', 'stars', 'score', 'feedback', 'half star'],
  props: [
    {
      name: 'value',
      type: 'number',
      description: 'Current rating score (`0..max`).',
      required: true,
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      description: 'Called when the user selects or clears a star score.',
    },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum star count (`1..10`).',
      default: '5',
    },
    {
      name: 'allowHalf',
      type: 'boolean',
      description: 'Enable `0.5` half-star precision via pointer position and arrow keys.',
      default: 'false',
    },
    {
      name: 'allowClear',
      type: 'boolean',
      description: 'Allow clicking the active rating again to reset back to `0`.',
      default: 'true',
    },
    {
      name: 'isReadOnly',
      type: 'boolean',
      description: 'Render non-interactive display stars with `role="img"` semantics.',
      default: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Star icon scale.',
      default: "'md'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible slider or image label.',
      default: "'Rating'",
    },
    {
      name: 'hasValueReadout',
      type: 'boolean',
      description: 'Display tabular numeric score next to the stars.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Accessible tactile star rating control supporting whole or half-star increments, live pointer preview, `Arrow`/`Home`/`End` slider navigation, click-to-clear, and WCAG-clean read-only display mode.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pass `isReadOnly` when displaying aggregate review scores inside cards or tables.',
      },
      {
        guidance: false,
        description: 'Omit `label` when multiple rating criteria appear on the same form.',
      },
    ],
  },
};
