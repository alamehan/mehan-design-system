/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-ux-complexity',
  title: 'Mehan UX Complexity Budget and Semantic Boundaries',
  category: 'guide',
  keywords: [
    'mehan ux',
    'complexity budget',
    'progressive disclosure',
    'primary cta',
    'semantic boundaries',
  ],
  description:
    'Action hierarchy, progressive disclosure tiers, anti-card-wall discipline, and the four mandatory component distinctions in Mehan interfaces.',
  sections: [
    {
      id: 'complexity-budget',
      title: 'One Primary Action and Progressive Disclosure',
      content: [
        {
          type: 'prose',
          text: 'Follow "Simple first, power on demand." Each screen, dialog, or form footer exposes one primary user job and at most one `Button variant="primary"` per decision context. Sibling actions step down to `secondary`, `ghost`, or `destructive`.',
        },
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Visible defaults: show frequent controls immediately with safe default values so common tasks succeed without configuration.',
            'More filters / More options: place secondary peer filters inside a `Popover` trigger.',
            'Show details: place read-only technical metadata inside a `Collapsible` disclosure.',
            'Advanced settings: isolate low-frequency tuning controls inside a `Collapsible` or `Drawer`, capped at two disclosure levels (no nested tabs or stacked dialogs).',
          ],
        },
      ],
    },
    {
      id: 'four-semantic-distinctions',
      title: 'Four Component Boundaries That Must Not Blur',
      content: [
        {
          type: 'table',
          headers: ['Pair', 'Value / View Selection', 'Command / Sequence'],
          rows: [
            [
              'Listbox vs. Menu',
              '`Selector` or `MultiSelector` chooses and retains a field value.',
              '`DropdownMenu` or `ContextMenu` executes an immediate command.',
            ],
            [
              'Search vs. Combobox',
              '`TextInput type="search"` or `PowerSearch` filters a collection.',
              '`Typeahead` searches options to pick a field value.',
            ],
            [
              'Mode vs. Peer Views',
              '`SegmentedControl` switches a local mode or display option (2-5 items).',
              '`TabList` switches peer content views.',
            ],
            [
              'Quantity vs. Journey',
              '`NumberInput` increments a numeric quantity.',
              '`Stepper` tracks ordered multi-stage workflow progress.',
            ],
          ],
        },
        {
          type: 'prose',
          text: 'Render repeated records as `Table` or `List` rows with dividers rather than wrapping each record in a separate `Card`. Continue to {@link generic:mehan-copy-and-states} for validation and copy rules.',
        },
      ],
    },
  ],
};
