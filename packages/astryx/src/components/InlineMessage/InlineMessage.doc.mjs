/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'InlineMessage',
  displayName: 'Inline Message',
  import: '@mehan/astryx',
  category: 'Feedback & Status',
  keywords: ['inline message', 'field error', 'helper text', 'validation message', 'status line'],
  props: [
    {
      name: 'message',
      type: 'string',
      description: 'Concise sentence-case feedback or recovery instruction.',
      required: true,
    },
    {
      name: 'status',
      type: "'info' | 'success' | 'warning' | 'error'",
      description: 'Semantic sentiment pairing an icon with WCAG AA verified status ink.',
      default: "'info'",
    },
    {
      name: 'fieldId',
      type: 'string',
      description: 'Optional `id` attribute for linking via a form control `aria-describedby`.',
    },
    {
      name: 'isLive',
      type: 'boolean',
      description: 'Emit `role="alert"` (`error`) or `role="status"` so assistive tech announces dynamic updates.',
      default: 'true',
    },
  ],
  usage: {
    description:
      'Compact field-level feedback line pairing a semantic icon with high-contrast status text (`info`, `success`, `warning`, `error`) without the heavy container chrome of a full-width `Banner`.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair `InlineMessage` directly beneath a custom control (`DigitEntry`, `ImageWell`, `ColorWell`) via `fieldId` and `aria-describedby`.',
      },
      {
        guidance: false,
        description: 'Rely on red color alone without an icon or explicit recovery text (WCAG 1.4.1 Use of Color).',
      },
    ],
  },
};
