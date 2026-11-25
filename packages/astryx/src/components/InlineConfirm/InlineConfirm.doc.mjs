/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'InlineConfirm',
  displayName: 'Inline Confirm',
  import: '@mehan/astryx',
  category: 'Action',
  keywords: ['inline confirm', 'two-step delete', 'row delete', 'destructive guard'],
  props: [
    {
      name: 'triggerLabel',
      type: 'string',
      description: 'Initial sentence-case destructive trigger label (for example `"Remove webhook"`).',
      required: true,
    },
    {
      name: 'confirmLabel',
      type: 'string',
      description: 'Specific verb shown on the armed confirmation button.',
      default: "'Confirm'",
    },
    {
      name: 'cancelLabel',
      type: 'string',
      description: 'Safe cancel button label that receives initial focus when armed.',
      default: "'Cancel'",
    },
    {
      name: 'prompt',
      type: 'string',
      description: 'Brief inline question displayed beside the armed actions.',
      default: "'Are you sure?'",
    },
    {
      name: 'onConfirm',
      type: '() => void',
      description: 'Called only after the user explicitly clicks the armed confirmation button.',
      required: true,
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Control height scale matching Button and TextInput.',
      default: "'md'",
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables arming the confirmation.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Lightweight two-step inline confirmation for moderate row-level removals where a modal `AlertDialog` would interrupt flow. Focuses `Cancel` first for safety and disarms cleanly on `Escape` or outside click.',
    bestPractices: [
      {
        guidance: true,
        description: 'Use `InlineConfirm` for row-level item removals without Undo; reserve modal `AlertDialog` for high-consequence workspace or billing deletions.',
      },
      {
        guidance: false,
        description: 'Label the armed button `"Yes"` or `"OK"`; repeat the specific verb (`"Remove"`, `"Revoke"`).',
      },
    ],
  },
};
