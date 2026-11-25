/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'DataChart',
  displayName: 'Data Chart',
  import: '@mehan/astryx',
  category: 'Data Visualization',
  keywords: [
    'chart',
    'line chart',
    'area chart',
    'bar chart',
    'horizontal bar chart',
    'analytics',
    'time series',
    'oklch categorical',
  ],
  props: [
    {
      name: 'categories',
      type: 'ReadonlyArray<string>',
      description: 'Ordered category or X-axis labels.',
      required: true,
    },
    {
      name: 'series',
      type: 'ReadonlyArray<DataChartSeries>',
      description:
        '1 to 4 data series (`{ id, label, values, color? }`) colored from Mehan OKLCH categorical tokens.',
      required: true,
    },
    {
      name: 'kind',
      type: "'line' | 'area' | 'bar' | 'horizontal-bar'",
      description:
        "Chart geometry. Prefer `'horizontal-bar'` when category labels exceed ~12 characters so labels never tilt.",
      default: "'area'",
    },
    {
      name: 'title',
      type: 'string',
      description: 'Optional heading rendered in the chart header.',
    },
    {
      name: 'subtitle',
      type: 'string',
      description: 'Optional supporting caption or time window.',
    },
    {
      name: 'valueFormatter',
      type: '(value: number) => string',
      description:
        'Custom formatter for Y-axis ticks, scrub readouts, and screen-reader table cells.',
    },
    {
      name: 'height',
      type: 'number',
      description: 'Plot height in pixels for Cartesian SVG modes.',
      default: '210',
    },
    {
      name: 'showLegend',
      type: 'boolean',
      description:
        'Show interactive series toggle pills (enabled automatically when `series.length > 1`).',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible figure label when `title` is omitted.',
      default: "'Data chart'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the root figure.',
    },
  ],
  usage: {
    description:
      'Multi-series Cartesian analytical chart (`line`, `area`, `bar`, and `horizontal-bar`) using Mehan OKLCH categorical colors, interactive series toggles, keyboard/pointer scrub crosshair, and an automatic companion screen-reader `<table>`.',
    bestPractices: [
      {
        guidance: true,
        description:
          "Switch `kind` to `'horizontal-bar'` when category names are longer than ~12 characters so labels stay horizontal and readable.",
      },
      {
        guidance: false,
        description:
          'Plot more than 4 simultaneous series on one chart; split dense multi-metric views or let users filter series.',
      },
    ],
  },
};
