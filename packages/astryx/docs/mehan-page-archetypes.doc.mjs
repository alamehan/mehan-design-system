/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-page-archetypes',
  title: 'Mehan Page Archetypes and Scroll Ergonomics',
  category: 'guide',
  keywords: [
    'mehan layout',
    'page archetypes',
    'dashboard',
    'workbench',
    'inspector',
    'scroll region',
    'tabular-nums',
  ],
  description:
    'Five universal page composition archetypes, single-scroll discipline, responsive viewport-lock release, and overflow typography rules.',
  sections: [
    {
      id: 'five-archetypes',
      title: 'Five Universal Page Archetypes',
      content: [
        {
          type: 'table',
          headers: ['Archetype', 'Composition Order', 'Key Restraint'],
          rows: [
            [
              'Dashboard Overview',
              'Primary status/action -> 2-4 `MetricCard` summaries -> dominant `Table` or `List`.',
              'Avoid equal-weight metric-card walls; keep filters compact.',
            ],
            [
              'Settings / Workflow',
              'Title -> grouped `Section` essentials -> inline validation -> `Collapsible` advanced options.',
              'Pin sticky save bars only when forms scroll past the viewport.',
            ],
            [
              'Master-Detail Explorer',
              'Stable collection list -> contextual side `Drawer` or detail pane (`Esc` to close).',
              'Collapse side panes into sheets below `768px` width.',
            ],
            [
              'Studio / Canvas Workbench',
              'Compact toolbar -> dominant `well` stage -> `300-340px` property inspector with `PrecisionSlider`.',
              'Release any `100dvh` lock below `768px` width or `560px` height (200% zoom safe).',
            ],
            [
              'Sequential Wizard',
              '`Stepper` header -> one focused task per step -> review before final commit.',
              'Preserve entered values when navigating back and forth.',
            ],
          ],
        },
      ],
    },
    {
      id: 'scroll-and-overflow',
      title: 'Grouping, Truncation, Scroll, and Tabular Numerals',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Group related fields tightly (`gap={1.5}` to `gap={2}`) and separate distinct semantic groups with wider breathing room (`gap={4}` to `gap={6}`) rather than wrapping every group in a bordered `Card`.',
            'Use `maxLines={1}` for overflowing IDs, file paths, and fixed-height cells (relying on Astryx smart tooltips), and `maxLines={2}` for uniform card summaries. Never truncate button action labels, validation messages, or currency figures.',
            'Prefer one primary document scroll region per page; introduce nested scroll areas only for bounded code blocks, wide tables, or multi-pane editors.',
            'Keep outer rounded containers (`Card`, `Dialog`, `CodeBlock`) clipped while scrolling an inner unrounded body with `overscroll-behavior: contain` so scrollbars do not cut across rounded corners.',
            'Keep `TabList` (`overflow="auto"`) and `Toolbar` on a single horizontal line rather than wrapping tabs onto multiple rows.',
            'Apply `font-variant-numeric: tabular-nums` and `align: "end"` on dynamic counters, slider readouts, prices, and numeric table columns (`MetricCard` and `PrecisionSlider` enforce this automatically). See {@link generic:mehan-design-rules}.',
          ],
        },
      ],
    },
  ],
};
