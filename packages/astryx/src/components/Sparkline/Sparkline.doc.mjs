/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'Sparkline',
  displayName: 'Sparkline',
  import: '@mehan/astryx',
  category: 'Data Visualization',
  keywords: ['sparkline', 'micro chart', 'trendline', 'area chart', 'kpi trend'],
  props: [
    {
      name: 'data',
      type: 'readonly number[]',
      description: 'Ordered numeric values plotted across the micro-chart.',
      required: true,
    },
    {
      name: 'labels',
      type: 'readonly string[]',
      description: 'Optional labels corresponding to each `data` entry for hover inspection and screen-reader rows.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible caption rendered inside the companion screen-reader `<table>`.',
      required: true,
    },
    {
      name: 'variant',
      type: "'line' | 'area' | 'bar'",
      description: 'Sparkline geometry style.',
      default: "'area'",
    },
    {
      name: 'tone',
      type: "'accent' | 'success' | 'warning' | 'error' | 'neutral'",
      description: 'Semantic stroke and fill color token.',
      default: "'accent'",
    },
    {
      name: 'width',
      type: 'number',
      description: 'SVG width in pixels.',
      default: '148',
    },
    {
      name: 'height',
      type: 'number',
      description: 'SVG height in pixels.',
      default: '40',
    },
    {
      name: 'showEndDot',
      type: 'boolean',
      description: 'Highlight the latest value dot on line and area sparklines.',
      default: 'true',
    },
  ],
  usage: {
    description:
      'Inline SVG trend micro-chart (`area`, `line`, or `bar`) with pointer scrub readout and an embedded WCAG 1.1.1 screen-reader `<table>` exposing exact data points.',
    bestPractices: [
      {
        guidance: true,
        description: 'Embed inside `MetricCard` or `Table` cells to show directional trajectory alongside a tabular number.',
      },
      {
        guidance: false,
        description: 'Render decorative SVG trendlines without an accessible `label` and tabular data fallback.',
      },
    ],
  },
};
