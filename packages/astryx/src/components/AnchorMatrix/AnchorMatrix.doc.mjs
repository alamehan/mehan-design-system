/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'AnchorMatrix',
  displayName: 'Anchor Matrix',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['anchor matrix', '9-point grid', 'origin', 'alignment', 'position'],
  props: [
    {
      name: 'value',
      type: 'AnchorPosition',
      description: 'Active 9-point anchor (`top-start` through `bottom-end`, including `center`).',
      required: true,
    },
    {
      name: 'onChange',
      type: '(position: AnchorPosition) => void',
      description: 'Called when the user clicks a detent or navigates with 2D arrow keys.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible radiogroup label and optional visible caption.',
      default: "'Anchor position'",
    },
    {
      name: 'hasReadout',
      type: 'boolean',
      description: 'Display the active cell name (`Center`, `Top start`, etc.) beside the 3×3 well.',
      default: 'true',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables pointer and keyboard selection.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Tactile 3×3 9-point spatial origin picker inside a recessed well with 2D `ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight` radiogroup navigation for watermarks, badges, toast corners, and transform origins.',
    bestPractices: [
      {
        guidance: true,
        description: 'Use `AnchorMatrix` instead of two separate X/Y dropdowns whenever choosing a 9-point spatial pin.',
      },
      {
        guidance: false,
        description: 'Use `AnchorMatrix` for text paragraph alignment (use left/center/right `SegmentedControl` instead).',
      },
    ],
  },
};
