/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'SplitButton',
  displayName: 'Split Button',
  import: '@mehan/astryx',
  category: 'Action',
  keywords: ['split button', 'compound action', 'dropdown button', 'export menu'],
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Sentence-case label for the primary one-click action segment.',
      required: true,
    },
    {
      name: 'onAction',
      type: '() => void',
      description: 'Callback fired when the primary segment is clicked.',
      required: true,
    },
    {
      name: 'items',
      type: 'readonly SplitButtonItem[]',
      description: 'Related secondary variants shown when the trailing chevron menu opens.',
      required: true,
    },
    {
      name: 'onSelectItem',
      type: '(id: string) => void',
      description: 'Callback fired with `item.id` when a secondary menu item is selected.',
    },
    {
      name: 'variant',
      type: "'primary' | 'secondary'",
      description: 'Tactile surface emphasis matching Mehan 3D button hierarchy.',
      default: "'primary'",
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Control height scale.',
      default: "'md'",
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables both the primary action and menu trigger.',
      default: 'false',
    },
    {
      name: 'menuLabel',
      type: 'string',
      description: 'Accessible label suffix for the trailing chevron trigger.',
      default: "'More actions'",
    },
  ],
  usage: {
    description:
      'Compound tactile button pairing a high-frequency primary action (e.g. "Export PDF") with an attached roving-focus menu of related variants ("Export Markdown", "Export JSON").',
    bestPractices: [
      {
        guidance: true,
        description: 'Group closely related variants of the same verb (such as export formats or deploy targets).',
      },
      {
        guidance: false,
        description: 'Hide unrelated navigation or destructive page-level actions inside a SplitButton menu.',
      },
    ],
  },
};
