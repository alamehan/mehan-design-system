/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ActivityRing',
  displayName: 'Activity Ring',
  import: '@mehan/astryx',
  category: 'Data Visualization',
  keywords: ['activity ring', 'concentric progress', 'goal rings', 'multi-metric'],
  props: [
    {
      name: 'rings',
      type: 'readonly ActivityRingItem[]',
      description: 'Up to 3 concentric `{id, label, value, max, color}` progress rings ordered outer-to-inner.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible group label describing the multi-ring summary.',
      required: true,
    },
    {
      name: 'size',
      type: 'number',
      description: 'Outer SVG diameter in pixels.',
      default: '96',
    },
    {
      name: 'hasLegend',
      type: 'boolean',
      description: 'Display a tabular percentage legend alongside the concentric rings.',
      default: 'true',
    },
  ],
  usage: {
    description:
      'Concentric 360-degree rounded goal rings comparing 1 to 3 normalized completion metrics simultaneously with an aligned tabular percentage legend.',
    bestPractices: [
      {
        guidance: true,
        description: 'Cap concentric rings at 3 metrics so inner rings remain legible at compact sizes.',
      },
      {
        guidance: false,
        description: 'Hide `hasLegend` without providing context for what each ring color represents.',
      },
    ],
  },
};
