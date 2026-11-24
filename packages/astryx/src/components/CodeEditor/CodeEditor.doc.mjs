/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'CodeEditor',
  displayName: 'Code Editor',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['code editor', 'json editor', 'line numbers', 'diagnostics', 'wcag 2.1.2'],
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled source text.',
      required: true,
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called when the user edits or indents code.',
      required: true,
    },
    {
      name: 'language',
      type: 'string',
      description: 'Language label displayed in the editor header.',
      default: "'tsx'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label for the underlying code `<textarea>`.',
      default: "'Code editor'",
    },
    {
      name: 'minRows',
      type: 'number',
      description: 'Minimum visible row height.',
      default: '6',
    },
    {
      name: 'isReadOnly',
      type: 'boolean',
      description: 'Prevent edits while preserving selection and clipboard copy.',
      default: 'false',
    },
    {
      name: 'tabSize',
      type: 'number',
      description: 'Number of spaces inserted on `Tab` when indentation is active.',
      default: '2',
    },
    {
      name: 'diagnostics',
      type: 'readonly CodeDiagnostic[]',
      description: 'Optional `{line, message, severity}` markers highlighted in the gutter and status bar.',
    },
  ],
  usage: {
    description:
      'Lightweight monospace code workbench with synchronized tabular line gutter, line-level diagnostics, one-click `CopyButton`, and WCAG 2.1.2 `Esc → Tab` keyboard-trap escape.',
    bestPractices: [
      {
        guidance: true,
        description: 'Always preserve `Esc → Tab` unlock so keyboard users can Tab past the editor without a mouse.',
      },
      {
        guidance: false,
        description: 'Bundle a 2 MB external IDE runtime when editing JSON configs, SQL queries, or short snippets.',
      },
    ],
  },
};
