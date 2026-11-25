/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'PropertyRow',
  displayName: 'Property Row',
  import: '@mehan/astryx',
  category: 'Layout',
  keywords: [
    'property row',
    'inspector row',
    'settings row',
    'studio panel',
    'reset to default',
  ],
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Concise property label displayed in the start column.',
      required: true,
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Compact control rendered in the value column.',
      required: true,
    },
    {
      name: 'htmlFor',
      type: 'string',
      description: 'Optional `id` of the associated input control.',
    },
    {
      name: 'hint',
      type: 'React.ReactNode',
      description: 'Short contextual help revealed via Meta Astryx `InfoTip`.',
    },
    {
      name: 'isModified',
      type: 'boolean',
      description:
        'Marks the row as modified from its default value and reveals the reset trigger when `onReset` is provided.',
      default: 'false',
    },
    {
      name: 'onReset',
      type: '() => void',
      description: 'Callback invoked when clicking the modified-property reset button.',
    },
    {
      name: 'resetLabel',
      type: 'string',
      description: 'Accessible label override for the reset button.',
    },
    {
      name: 'labelWidth',
      type: 'number | string',
      description: 'Width of the label column in pixels or CSS units.',
      default: '104',
    },
    {
      name: 'align',
      type: "'center' | 'start'",
      description: 'Vertical alignment between label and control columns.',
      default: "'center'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the row.',
    },
  ],
  usage: {
    description:
      'Compact horizontal `[Label + InfoTip] [Control] [Modified Reset Dot]` row designed for narrow `260px–340px` inspector sidebars and creative studio panels.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Pass `isModified` and `onReset` so users can spot non-default parameters and reset individual rows in one click.',
      },
      {
        guidance: false,
        description:
          'Use `PropertyRow` for long multi-sentence questionnaire forms; use Astryx `Field` and `FormLayout` for standard page forms.',
      },
    ],
  },
};
