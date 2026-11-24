/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'Timeline',
  displayName: 'Timeline',
  import: '@mehan/astryx',
  category: 'Table & List',
  keywords: ['timeline', 'activity feed', 'audit log', 'history rail', 'changelog'],
  props: [
    {
      name: 'items',
      type: 'readonly TimelineEntry[]',
      description: 'Chronological `{id, title, timestamp, description, actor, status}` entries.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible `<ol>` label.',
      default: "'Activity timeline'",
    },
    {
      name: 'density',
      type: "'compact' | 'comfortable'",
      description: 'Vertical spacing density between events.',
      default: "'comfortable'",
    },
  ],
  usage: {
    description:
      'Semantic `<ol>` chronological event rail with tactile status pins, tabular timestamps, and actor badges for deployment history, order tracking, and audit logs.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair with `formatRelativeTime` or tabular timestamps so chronological order scans effortlessly.',
      },
      {
        guidance: false,
        description: 'Use `Timeline` for interactive wizard step navigation — use Core `Stepper` instead.',
      },
    ],
  },
};
