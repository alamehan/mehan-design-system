/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-page-archetypes',
  title: 'Mehan Spatial Hierarchy, Page Archetypes, and Scroll Ergonomics',
  category: 'guide',
  keywords: [
    'mehan layout',
    'spatial hierarchy',
    'appshell',
    'workspacelayout',
    'canvasstage',
    'page archetypes',
    'scroll region',
    'tabular-nums',
  ],
  description:
    'Three-level Astryx spatial hierarchy (AppShell -> WorkspaceLayout -> CanvasStage), five universal page archetypes, and Law U2/U4 scroll & truncation rules.',
  sections: [
    {
      id: 'three-level-hierarchy',
      title: 'Three-Level Spatial Hierarchy on Meta Astryx',
      content: [
        {
          type: 'table',
          headers: ['Level', 'Component', 'Responsibility'],
          rows: [
            [
              'Level 0 — App Chrome',
              '`AppShell` (`@astryxdesign/core`)',
              'Global application top navigation, primary route `SideNav`, skip link, and mobile navigation drawer.',
            ],
            [
              'Level 1 — Task Workbench',
              '`WorkspaceLayout` (`@mehan/astryx`)',
              'Multi-pane page/feature workspace built on Astryx `Layout` + `LayoutPanel` + `ResizeHandle` + `Drawer`: `Mod+\\` collapsible start pane, main content, `<768px` auto-`Drawer` inspector, and `200%`-zoom scroll release.',
            ],
            [
              'Level 2 — Interactive Stage',
              '`CanvasStage` (`@mehan/astryx`)',
              'Recessed spatial viewport (`dots` | `grid` | `checkerboard` | `plain`) with non-blocking corner HUD slots (`CanvasZoomBar`) and docked `TimelineScrubber` transport.',
            ],
          ],
        },
      ],
    },
    {
      id: 'five-archetypes',
      title: 'Five Universal Page Archetypes (1 WorkspaceLayout)',
      content: [
        {
          type: 'table',
          headers: ['Archetype', 'WorkspaceLayout Configuration', 'Key Restraint'],
          rows: [
            [
              'Dashboard Overview',
              '`toolbar` + `MetricCard` row + `DataChart` + `Table` with `ColumnSettingsMenu`.',
              'Avoid equal-weight metric-card walls; keep filters compact.',
            ],
            [
              'Form + Result / Settings',
              '`startPane={{ mobileMode: "stack" }}` + live preview or grouped `Section` essentials.',
              'Pin sticky save bars only when forms scroll past the viewport.',
            ],
            [
              'Master-Detail Explorer',
              '`startPane={{ isCollapsible: true }}` + main list/table + `endPane` contextual inspector (`Esc` to close).',
              '`endPane` automatically morphs into an Astryx `Drawer` below `768px` width.',
            ],
            [
              'Studio / Canvas Workbench',
              '`WorkspaceLayout` wrapping `CanvasStage` + `PropertyRow` inspector (`280-320px`).',
              'Release any `100dvh` lock below `768px` width or `560px` height (`200%` zoom safe).',
            ],
            [
              'Sequential Wizard',
              '`Stepper` header -> one focused task per step -> review before final commit.',
              'Preserve entered values with `useAutoDraft` when navigating back and forth.',
            ],
          ],
        },
      ],
    },
    {
      id: 'scroll-and-overflow',
      title: 'Grouping, Truncation, Scroll-Chaining Split, and Tabular Numerals',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Group related fields tightly (`gap={1.5}` to `gap={2}`) and separate distinct semantic groups with wider breathing room (`gap={4}` to `gap={6}`) rather than wrapping every group in a bordered `Card`.',
            'Use `<MiddleTruncate />` (`@mehan/astryx`) for file paths, API keys, UUIDs, and git SHAs so both prefix and suffix remain readable; use `maxLines={2}` for uniform card summaries. Never truncate button action labels, validation messages, or currency figures.',
            'Enforce the Scroll-Chaining Split (Law U4): apply `overscroll-behavior: contain` strictly on floating overlays (`Dialog`, `Drawer`, `Popover`, menus), while inline `CodeBlock`, `CodeEditor`, and `MarkdownEditor` surfaces keep `overscroll-behavior-block: auto` so vertical wheel scrolling never traps the page.',
            'Keep `TabList` (`overflow="auto"`) and `Toolbar` on a single horizontal line rather than wrapping tabs onto multiple rows.',
            'Apply `font-variant-numeric: tabular-nums` and `align: "end"` on dynamic counters, slider readouts, prices, and numeric table columns (`MetricCard`, `PrecisionSlider`, and `DataChart` enforce this automatically). See {@link generic:mehan-design-rules}.',
          ],
        },
      ],
    },
  ],
};
