/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'MetricCard',
  displayName: 'Metric Card',
  import: '@mehan/astryx',
  category: 'Content',
  keywords: ['metric card', 'kpi tile', 'bento stat', 'scorecard', 'dashboard metric'],
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Metric title displayed above the headline numeral.',
      required: true,
    },
    {
      name: 'value',
      type: 'ReactNode',
      description: 'Pre-formatted headline metric rendered large with tabular numerals.',
      required: true,
    },
    {
      name: 'delta',
      type: 'MetricCardDelta',
      description: 'Optional trend pill with directional arrow and semantic sentiment coloring.',
    },
    {
      name: 'caption',
      type: 'string',
      description: 'Supporting comparison context underneath the headline metric.',
    },
    {
      name: 'icon',
      type: 'ReactNode',
      description: 'Optional top-right decorative or contextual glyph.',
    },
  ],
  usage: {
    description:
      'Self-contained tactile KPI card with Bricolage Grotesque tabular headline numerals, Geist Mono delta badge, and supporting comparison caption.',
    bestPractices: [
      {
        guidance: true,
        description: 'Override `delta.sentiment` for inverted metrics such as latency or error rate where downward movement is positive.',
      },
      {
        guidance: false,
        description: 'Nest MetricCard inside another bordered Card; MetricCard already renders a tactile card frame.',
      },
    ],
  },
};
