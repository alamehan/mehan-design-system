/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-forms-and-i18n',
  title: 'Mehan Form Validation Timing, Proportional Confirmation, and Bilingual Intl Rules',
  category: 'guide',
  keywords: [
    'form validation',
    'reward early punish late',
    'dirty state',
    'inline confirm',
    'undo toast',
    'bilingual expansion',
    'intl formatting',
    'indonesian copy',
  ],
  description:
    'Humane form validation timing (onBlur then live onChange), dirty-draft protection, proportional 3-tier confirmation, +30-40% text-expansion resilience, and locale-bound Intl formatting.',
  sections: [
    {
      id: 'validation-timing-and-confirmation-tiers',
      title: 'U3: Validation Timing, Dirty Drafts, and Undo vs. Confirm',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Reward early, punish late: never display red validation errors while the user is typing their first entry into an untouched field. Validate `onBlur` or `onSubmit`, then clear the error immediately `onChange` as soon as the input becomes valid.',
            'Guard unsaved edits (`isDirty`) before discarding or resetting forms, and display `Saved` feedback only after persistence succeeds.',
            'Match confirmation friction to reversibility: execute immediately + `8s` `Undo` toast for reversible actions, use in-place `InlineConfirm` for local row removal, and reserve modal `AlertDialog` strictly for irreversible destruction.',
          ],
        },
      ],
    },
    {
      id: 'text-expansion-and-intl-formatting',
      title: 'U6: +30-40% Text Expansion and Locale-Aware Intl Formatting',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Indonesian and German UI strings run 30-40% longer than English (`Save` -> `Simpan perubahan`). Never hardcode fixed pixel widths on buttons, badges, or tabs; switch `SegmentedControl` to `Selector` when 3+ localized labels would wrap.',
            'Write concise, natural Indonesian imperatives without bureaucratic pronouns (`Simpan perubahan`, `Pilih file`, `Coba lagi`), keeping established technical loanwords (`file`, `token`, `webhook`, `browser`).',
            'Format dynamic numbers, currencies, byte sizes, percentages, and relative timestamps with `@mehan/astryx/dna` memoized `Intl` helpers (`formatNumber`, `formatCurrency`, `formatBytes`, `formatPercent`, `formatRelativeTime`) paired with `tabular-nums`.',
          ],
        },
        {
          type: 'code',
          lang: 'tsx',
          label: 'Locale-bound formatting with @mehan/astryx/dna',
          code: "import {formatCurrency, formatBytes, formatNumber} from '@mehan/astryx/dna';\n\nconst totalEn = formatNumber(12480.5, 'en-US'); // '12,480.5'\nconst totalId = formatNumber(12480.5, 'id-ID'); // '12.480,5'\nconst delta = formatCurrency(-1500, 'USD', 'en-US', {compact: true}); // '-$1.5K'\nconst bundle = formatBytes(1572864, 'id-ID'); // '1,5 MB'",
        },
      ],
    },
  ],
};
