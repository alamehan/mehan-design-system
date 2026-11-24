/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'MiddleTruncate',
  displayName: 'Middle Truncate',
  import: '@mehan/astryx',
  category: 'Content',
  keywords: ['middle truncate', 'ellipsis', 'file path', 'hash', 'uuid', 'identifier'],
  props: [
    {
      name: 'text',
      type: 'string',
      description: 'Full unbroken string exposed to screen readers, `title`, and optional clipboard copy.',
      required: true,
    },
    {
      name: 'endChars',
      type: 'number',
      description: 'Trailing character count kept visible so file extensions or trailing hash digits never clip.',
      default: '10',
    },
    {
      name: 'monospace',
      type: 'boolean',
      description: 'Format the string using `--font-family-code` and `tabular-nums`.',
      default: 'false',
    },
    {
      name: 'copyable',
      type: 'boolean',
      description: 'Render a compact inline icon `CopyButton` that copies the full untruncated `text`.',
      default: 'false',
    },
    {
      name: 'copyLabel',
      type: 'string',
      description: 'Accessible label for the inline copy button when `copyable` is enabled.',
      default: "'Copy full value'",
    },
  ],
  usage: {
    description:
      'Pure-CSS layout-free middle ellipsis preserving both the leading prefix and trailing `endChars` (file extensions, commit SHAs, key suffixes) while exposing the full string to assistive technology.',
    bestPractices: [
      {
        guidance: true,
        description: 'Use `MiddleTruncate` for file paths (`packages/astryx/…/Theme.tsx`), hashes (`sha256:8f9c…41b2`), and masked identifiers.',
      },
      {
        guidance: false,
        description: 'Truncate error messages, button labels, or financial totals; those must wrap or remain fully visible.',
      },
    ],
  },
};
