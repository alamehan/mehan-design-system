/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'MarkdownEditor',
  displayName: 'Markdown Editor',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['markdown editor', 'rich text', 'write preview', 'formatting toolbar'],
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled Markdown text.',
      required: true,
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called when typing or applying formatting toolbar actions.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label for the Markdown `<textarea>`.',
      default: "'Markdown editor'",
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder shown when `value` is empty.',
      default: "'Write using Markdown…'",
    },
    {
      name: 'minRows',
      type: 'number',
      description: 'Minimum visible rows in Write mode.',
      default: '5',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables typing and toolbar actions.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Clean Markdown composer with selection-wrapping toolbar (`Bold`, `Italic`, `Heading`, `Code`, `List`, `Link`), XSS-safe `Write` / `Preview` tabs, and tabular word/character counter.',
    bestPractices: [
      {
        guidance: true,
        description: 'Use `MarkdownEditor` for release notes, issue descriptions, and documentation comments where portable plain-text storage is preferred.',
      },
      {
        guidance: false,
        description: 'Render unsanitized `dangerouslySetInnerHTML` in user-authored previews.',
      },
    ],
  },
};
