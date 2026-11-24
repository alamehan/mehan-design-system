/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'Gauge',
  displayName: 'Gauge',
  import: '@mehan/astryx',
  category: 'Data Visualization',
  keywords: ['gauge', 'radial meter', 'utilization', 'quota', 'arc progress'],
  props: [
    {
      name: 'value',
      type: 'number',
      description: 'Measured scalar value within `[min, max]`.',
      required: true,
    },
    {
      name: 'min',
      type: 'number',
      description: 'Lower bound of the meter.',
      default: '0',
    },
    {
      name: 'max',
      type: 'number',
      description: 'Upper bound of the meter.',
      default: '100',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Visible caption and accessible `role="meter"` label.',
      required: true,
    },
    {
      name: 'unit',
      type: 'string',
      description: 'Unit suffix displayed next to the centered tabular value.',
      default: "'%'",
    },
    {
      name: 'tone',
      type: "'accent' | 'success' | 'warning' | 'error'",
      description: 'Semantic stroke color for threshold signaling.',
      default: "'accent'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Dial diameter scale.',
      default: "'md'",
    },
  ],
  usage: {
    description:
      '240-degree sculpted radial arc meter with WAI-ARIA `role="meter"` semantics and centered tabular readout for bounded utilization, health scores, and capacity quotas.',
    bestPractices: [
      {
        guidance: true,
        description: 'Switch `tone` to `"warning"` or `"error"` when utilization crosses operational safety thresholds.',
      },
      {
        guidance: false,
        description: 'Use `Gauge` for unbounded counts (such as total users); use `MetricCard` instead.',
      },
    ],
  },
};
