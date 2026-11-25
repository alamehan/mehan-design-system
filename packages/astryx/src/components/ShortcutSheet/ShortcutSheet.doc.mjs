/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ShortcutSheet',
  displayName: 'Shortcut Sheet',
  import: '@mehan/astryx',
  category: 'Overlay',
  keywords: [
    'keyboard shortcuts',
    'cheat sheet',
    'hotkey dialog',
    'kbd reference',
    'question mark shortcut',
  ],
  props: [
    {
      name: 'isOpen',
      type: 'boolean',
      description: 'Whether the shortcut reference dialog is open.',
      required: true,
    },
    {
      name: 'onOpenChange',
      type: '(isOpen: boolean) => void',
      description: 'Called when the dialog requests to close (`Escape`, close button, or scrim).',
      required: true,
    },
    {
      name: 'shortcuts',
      type: 'ReadonlyArray<ShortcutSheetEntry>',
      description:
        'Explicit shortcut definitions (`{ keys, label, group? }`) displayed alongside or instead of live registrations.',
    },
    {
      name: 'includeRegistered',
      type: 'boolean',
      description:
        'Automatically merge all currently mounted `useMehanShortcuts` and `usePrimaryAction` bindings.',
      default: 'true',
    },
    {
      name: 'title',
      type: 'string',
      description: 'Heading rendered inside Meta Astryx `DialogHeader`.',
      default: "'Keyboard shortcuts'",
    },
    {
      name: 'subtitle',
      type: 'string',
      description: 'Optional supporting subtitle inside `DialogHeader`.',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      description: 'Placeholder text for the instant filter input.',
      default: "'Filter shortcuts…'",
    },
    {
      name: 'isInline',
      type: 'boolean',
      description:
        'Renders inline without modal `<dialog>` backdrop/focus-trap (for documentation previews only).',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Self-documenting keyboard shortcut reference modal built on Meta Astryx `Dialog`, `TextInput`, and `Kbd`, automatically reading live `useMehanShortcuts` and `usePrimaryAction` registrations.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Bind `?` via `useMehanShortcuts` (which automatically ignores active text inputs and IME composition) to open `ShortcutSheet`.',
      },
      {
        guidance: false,
        description:
          'Hardcode `Cmd` or `Ctrl` strings in labels; pass canonical `"mod+k"` combos so `<Kbd />` adapts to Apple and Windows/Linux automatically.',
      },
    ],
  },
};
