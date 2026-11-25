/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'WorkspaceLayout',
  displayName: 'Workspace Layout',
  import: '@mehan/astryx',
  category: 'Layout',
  keywords: [
    'workspace layout',
    'multi-pane',
    'split workbench',
    'master detail',
    'explorer layout',
    'inspector drawer',
    'form result',
  ],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description: 'Primary work area rendered inside Meta Astryx `LayoutContent`.',
      required: true,
    },
    {
      name: 'toolbar',
      type: 'React.ReactNode',
      description: 'Optional top toolbar or filter bar rendered inside `LayoutHeader`.',
    },
    {
      name: 'startPane',
      type: 'WorkspaceStartPaneConfig',
      description:
        "Collapsible/resizable start panel (`{ title?, content, defaultWidth?, isResizable?, isCollapsible?, mobileMode?: 'stack' | 'collapsible' | 'drawer' }`).",
    },
    {
      name: 'endPane',
      type: 'WorkspaceEndPaneConfig',
      description:
        'Contextual detail/inspector panel (`{ title, content, isOpen, onOpenChange, defaultWidth?, isResizable? }`) that automatically morphs into an Astryx `Drawer` below `768px`.',
    },
    {
      name: 'footer',
      type: 'React.ReactNode',
      description: 'Optional status or action bar rendered inside `LayoutFooter`.',
    },
    {
      name: 'scrollMode',
      type: "'adaptive-pane' | 'page'",
      description:
        "Controls scroll containment. `'adaptive-pane'` scrolls panes independently on tall desktop viewports and automatically releases to page scroll on mobile (`<=767px`) or `200%` zoom (`<=559px`).",
      default: "'adaptive-pane'",
    },
    {
      name: 'enableShortcuts',
      type: 'boolean',
      description:
        'Registers `Mod+\\` to toggle `startPane` and `Escape` to dismiss `endPane`.',
      default: 'true',
    },
    {
      name: 'desktopHeight',
      type: 'number | string',
      description:
        'Optional bounded height on desktop when `scrollMode="adaptive-pane"`.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible region label for the workspace container.',
      default: "'Workspace'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the root workspace element.',
    },
  ],
  usage: {
    description:
      'Level-1 multi-pane application workbench built directly on Meta Astryx `Layout`, `LayoutPanel`, `ResizeHandle`, and `Drawer` — unifying Form+Result, Workbench, Explorer, and Collection shells.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Pass `endPane` for contextual row/item inspection so it renders inline on desktop and automatically morphs into an Astryx `Drawer` below `768px`.',
      },
      {
        guidance: false,
        description:
          'Nest multiple `AppShell` instances inside a page; use `AppShell` once for outer app chrome and `WorkspaceLayout` for the active task workbench.',
      },
    ],
  },
};
