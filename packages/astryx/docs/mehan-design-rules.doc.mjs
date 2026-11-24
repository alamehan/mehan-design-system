/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-design-rules',
  title: 'Mehan Tactile Surfaces and Parametric Theme Engine',
  category: 'guide',
  keywords: [
    'mehan',
    'tactile',
    'confectionery',
    'porcelain',
    'stone',
    'createMehanTheme',
    'material hierarchy',
    'color budget',
    'segmentedStyle',
  ],
  description:
    '7-role material hierarchy, 80/15/5 color budget, tactile button and input physics, and full Astryx token/component extensibility for @mehan/astryx.',
  sections: [
    {
      id: 'material-hierarchy',
      title: '7-Role Tactile Material Hierarchy',
      content: [
        {
          type: 'prose',
          text: 'Mehan assigns each surface to one of 7 physical roles: `socket` (switch, checkbox, radio, slider, and progress grooves), `well` (recessed text fields, search inputs, and segmented tracks), `paper` (page background), `tray` (flat grouping container via `Card variant="muted"` or `Section variant="muted"`), `surface` (default card), `raised` (secondary buttons and active segmented pills), and `float` (popovers, menus, drawers, and dialogs). In dark mode, deeper layers are strictly darker and raised layers are strictly lighter.',
        },
        {
          type: 'prose',
          text: 'Buttons, input wells, sockets, and floating overlays default to borderless tone steps, top highlights, inner lips, and progressive drop shadows. Grouping containers inside a card step down to `tray`, never nesting a `well` inside another `well`.',
        },
      ],
    },
    {
      id: 'color-budget-and-focus',
      title: '80 / 15 / 5 Color Budget and Focus Separation',
      content: [
        {
          type: 'prose',
          text: 'Maintain an 80% neutral, 15% brand action/selection, and 5% semantic status color budget across every view. Keyboard focus (`--focus-outline-color`) uses high-contrast neutral ink, while active selection (`--color-accent` and `--shadow-inset-selected`) uses the brand accent so focused-vs-selected states stay distinct.',
        },
      ],
    },
    {
      id: 'parametric-and-open-theming',
      title: 'Parametric Seed Plus Full Astryx Extensibility',
      content: [
        {
          type: 'prose',
          text: 'Load a prebuilt stylesheet (`mehan-confectionery`, `mehan-porcelain`, `mehan-stone`) or configure `createMehanTheme()` from `@mehan/astryx/dna`. `createMehanTheme()` provides fast tactile seed options (`atmosphere`, `accent`, `depth`, `lipStyle`, `segmentedStyle`, `wellStyle`, `typeBase`, `typeRatio`, `spacingBase`, `radiusBase`, `sizeBase`, `motion`, `durationStep`) and accepts any raw Astryx `tokens` and `components` overrides on top without restriction. Pair these visual rules with {@link generic:mehan-ux-complexity}, {@link generic:mehan-copy-and-states}, and {@link generic:mehan-page-archetypes}.',
        },
        {
          type: 'code',
          lang: 'tsx',
          label: 'Custom Mehan theme with tactile seed and raw Astryx overrides',
          code: "import {createMehanTheme} from '@mehan/astryx/dna';\n\nexport const workspaceTheme = createMehanTheme({\n  name: 'acme-workspace',\n  atmosphere: 'confectionery',\n  accent: '#d42a5f',\n  segmentedStyle: 'espresso',\n  lipStyle: 'candy',\n  typeBase: 13.5,\n  sizeBase: 32,\n  tokens: {\n    '--radius-chat': '22px',\n  },\n  components: {\n    card: {base: {padding: 'var(--spacing-4)'}},\n  },\n});",
        },
      ],
    },
  ],
};
