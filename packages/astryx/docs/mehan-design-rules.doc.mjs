/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-design-rules',
  title: 'Mehan Tactile Surfaces and 6-Knob DNA',
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
  ],
  description:
    '7-role material hierarchy, 80/15/5 color budget, borderless lip physics, focus-vs-selection separation, and 6-knob parametric theming for @mehan/astryx.',
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
          text: 'Buttons, input wells, sockets, and floating overlays use borderless tone steps, top highlights, inner lips, and progressive drop shadows instead of wireframe outlines. Grouping containers inside a card use `tray`, never a `well` nested inside another `well`.',
        },
      ],
    },
    {
      id: 'color-budget-and-focus',
      title: '80 / 15 / 5 Color Budget and Focus Separation',
      content: [
        {
          type: 'prose',
          text: 'Maintain an 80% neutral, 15% brand action/selection, and 5% semantic status color budget across every view. Keyboard focus (`--focus-outline-color`) uses high-contrast neutral ink, while active selection (`--color-accent` and `--shadow-inset-selected`) uses the brand accent so focused-vs-selected states never blur.',
        },
      ],
    },
    {
      id: 'parametric-theming',
      title: '6-Knob Parametric Theming',
      content: [
        {
          type: 'prose',
          text: 'Load a prebuilt stylesheet (`mehan-confectionery`, `mehan-porcelain`, `mehan-stone`) or build a custom brand configuration with `createMehanTheme()` from `@mehan/astryx/dna` across 6 bounded knobs: `atmosphere`, `accent` (preset or `#rrggbb` seed), `depth` (`0.5..1.5`), `radiusScale` (`0.75..1.25`), `density` (`standard` 36px or `compact` 32px, expanding to 44px on coarse touch pointers), and `motion` (`expressive`, `standard`, or `calm`). Pair these visual rules with {@link generic:mehan-ux-complexity}, {@link generic:mehan-copy-and-states}, and {@link generic:mehan-page-archetypes}.',
        },
        {
          type: 'code',
          lang: 'tsx',
          label: 'Custom 6-knob Mehan theme',
          code: "import {createMehanTheme} from '@mehan/astryx/dna';\n\nexport const workspaceTheme = createMehanTheme({\n  name: 'acme-workspace',\n  atmosphere: 'porcelain',\n  accent: '#4f46e5',\n  depth: 1,\n  radiusScale: 1,\n  density: 'compact',\n  motion: 'calm',\n});",
        },
      ],
    },
  ],
};
