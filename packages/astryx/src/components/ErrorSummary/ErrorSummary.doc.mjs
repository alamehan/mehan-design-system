/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ErrorSummary',
  displayName: 'Error Summary',
  import: '@mehan/astryx',
  category: 'Feedback & Status',
  keywords: ['error summary', 'form validation', 'wcag 3.3.1', 'focus jump', 'recovery'],
  props: [
    {
      name: 'errors',
      type: 'readonly ErrorSummaryItem[]',
      description: 'Collection of `{fieldId, fieldLabel, message}` entries; renders `null` when empty.',
      required: true,
    },
    {
      name: 'title',
      type: 'string',
      description: 'Sentence-case heading summarizing the validation state.',
      default: "'Fix the following issues before continuing'",
    },
    {
      name: 'onSelectField',
      type: '(fieldId: string) => void',
      description: 'Optional callback invoked after focusing the target `#fieldId` control.',
    },
    {
      name: 'autoFocusOnMount',
      type: 'boolean',
      description: 'Programmatically move focus to the alert summary when errors appear after submit.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Top-of-form WCAG 3.3.1 validation summary with clickable focus-jumping links directly to each invalid input (`#fieldId`) and blame-free recovery copy.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair `ErrorSummary` at the top of multi-field forms with inline `InlineMessage` hints beneath each invalid field.',
      },
      {
        guidance: false,
        description: 'Write blameful copy like "Invalid input"; state how to fix the field ("Enter a valid work email, like name@company.com").',
      },
    ],
  },
};
