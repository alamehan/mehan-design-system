/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-design-rules',
  title: 'Mehan Tactile Design Rules',
  category: 'guide',
  keywords: [
    'mehan',
    'tactile',
    'confectionery',
    'porcelain',
    'stone',
    'createMehanTheme',
    'material hierarchy',
    'lip collapse',
  ],
  description:
    'Core design laws, 7-role surface hierarchy, focus-vs-selection separation, and parametric theming rules for Mehan Design System (@mehan/astryx).',
  sections: [
    {
      id: 'material-hierarchy',
      title: '7-Role Tactile Material Hierarchy',
      content: [
        {
          type: 'prose',
          text: 'Mehan separates physical depth into 7 distinct neutral layers so surfaces never stack muddily: `socket` (deepest control groove for switches, checkboxes, radios, and slider rails), `well` (recessed input and segmented tracks), `paper` (page canvas), `tray` (flat grouping container), `surface` (default card), `raised` (convex secondary buttons and active segmented pills), and `float` (popovers, menus, and dialogs). In dark mode, deeper layers are strictly darker and raised layers strictly lighter.',
        },
      ],
    },
    {
      id: 'focus-vs-selection',
      title: 'Focus Ring vs. Selection Ring',
      content: [
        {
          type: 'prose',
          text: 'Never conflate keyboard focus with active selection. Keyboard focus (`--focus-outline-color`) always uses high-contrast neutral ink (`--color-text-primary`), while active/selected states (`--color-accent` and `--shadow-inset-selected`) use the brand accent.',
        },
      ],
    },
    {
      id: 'parametric-theming',
      title: 'Customizing Atmospheres and Brand Accents',
      content: [
        {
          type: 'prose',
          text: 'Use one of the 3 pre-built themes (`mehan-confectionery`, `mehan-porcelain`, `mehan-stone`) or call `createMehanTheme({ name, atmosphere, accent })` from `@mehan/astryx/dna` with any preset accent (`strawberry`, `blueberry`, `mint`, `tangerine`, `grape`, `teal`) or any custom `#rrggbb` hex seed.',
        },
        {
          type: 'code',
          lang: 'tsx',
          label: 'Custom SaaS theme with Mehan Confectionery warmth + Blueberry accent',
          code: "import {createMehanTheme} from '@mehan/astryx/dna';\n\nexport const saasTheme = createMehanTheme({\n  name: 'my-saas',\n  atmosphere: 'confectionery',\n  accent: 'blueberry',\n});",
        },
      ],
    },
  ],
};
