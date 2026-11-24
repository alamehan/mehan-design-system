/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'CopyButton',
  displayName: 'Copy Button',
  import: '@mehan/astryx',
  category: 'Action',
  keywords: ['copy', 'clipboard', 'token copy', 'snippet copy', 'live region'],
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Exact text written to the clipboard via focus-preserving `copyTextSafe`.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Sentence-case label displayed while idle (or used as `aria-label` when `variant="icon"`).',
      default: "'Copy'",
    },
    {
      name: 'copiedLabel',
      type: 'string',
      description: 'Confirmation text displayed and announced via polite `aria-live` after copying.',
      default: "'Copied'",
    },
    {
      name: 'variant',
      type: "'secondary' | 'ghost' | 'icon'",
      description: 'Visual button treatment.',
      default: "'secondary'",
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      description: 'Control height scale.',
      default: "'sm'",
    },
    {
      name: 'resetDelayMs',
      type: 'number',
      description: 'Duration in milliseconds before reverting from `copiedLabel` back to `label`.',
      default: '1800',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables the copy trigger.',
      default: 'false',
    },
    {
      name: 'onCopied',
      type: '(ok: boolean) => void',
      description: 'Optional callback invoked with `true` when the clipboard write succeeds.',
    },
  ],
  usage: {
    description:
      'Zero-jitter clipboard action button with focus-safe `file://` fallback, icon morphing, width reservation so neighboring controls never shift, and polite screen-reader confirmation.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair with `MiddleTruncate` or token readouts so users copy the full untruncated value.',
      },
      {
        guidance: false,
        description: 'Fire a toast AND a CopyButton morph simultaneously for routine inline copies; the morphing checkmark is sufficient.',
      },
    ],
  },
};
