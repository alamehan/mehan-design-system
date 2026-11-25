/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColumnView',
  displayName: 'Column View',
  import: '@mehan/astryx',
  category: 'Table & List',
  keywords: [
    'miller columns',
    'column view',
    'finder browser',
    'hierarchical explorer',
    'taxonomy drilldown',
  ],
  props: [
    {
      name: 'items',
      type: 'ReadonlyArray<ColumnViewNode>',
      description:
        'Root hierarchy nodes (`{ id, label, meta?, badge?, icon?, children? }`).',
      required: true,
    },
    {
      name: 'selectedPath',
      type: 'ReadonlyArray<string>',
      description: 'Controlled array of selected node IDs from root to active leaf.',
    },
    {
      name: 'defaultSelectedPath',
      type: 'ReadonlyArray<string>',
      description: 'Initial selected ID path in uncontrolled mode.',
      default: '[]',
    },
    {
      name: 'onSelectedPathChange',
      type: '(path: string[], activeNode: ColumnViewNode | null) => void',
      description: 'Called whenever column selection or drill-down depth changes.',
    },
    {
      name: 'renderDetail',
      type: '(node: ColumnViewNode) => React.ReactNode',
      description:
        'Optional detail/preview renderer displayed beside the deepest column.',
    },
    {
      name: 'emptyDetailTitle',
      type: 'string',
      description: 'Placeholder heading in the detail pane when no node is selected.',
      default: "'Select an item to inspect'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible region label for assistive technology.',
      default: "'Column browser'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the root container.',
    },
  ],
  usage: {
    description:
      'Hierarchical multi-column Miller browser (`[Col 1] -> [Col 2] -> [Col 3] -> [Preview]`) with 2D arrow-key roving (`↑↓←→`) on desktop and automatic single-column step-drill on mobile.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Provide `renderDetail` so selecting a leaf node surfaces rich metadata or actions immediately beside the deepest column.',
      },
      {
        guidance: false,
        description:
          'Use `ColumnView` for flat non-hierarchical lists; use Astryx `List` or `Table` instead.',
      },
    ],
  },
};
