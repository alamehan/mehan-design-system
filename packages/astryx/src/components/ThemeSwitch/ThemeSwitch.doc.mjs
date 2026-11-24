/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ThemeSwitch',
  displayName: 'Theme Switch',
  import: '@mehan/astryx',
  category: 'Action',
  keywords: ['theme switch', 'dark mode', 'light mode', 'color scheme', 'system mode'],
  props: [
    {
      name: 'value',
      type: "'light' | 'dark' | 'system'",
      description: 'Active color mode selection.',
      required: true,
    },
    {
      name: 'onChange',
      type: "(mode: 'light' | 'dark' | 'system') => void",
      description: 'Called when the user selects Light, Dark, or Auto.',
      required: true,
    },
    {
      name: 'includeSystem',
      type: 'boolean',
      description: 'Include the 3-way `system` option alongside `light` and `dark`.',
      default: 'true',
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      description: 'Control height scale.',
      default: "'sm'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible radiogroup label.',
      default: "'Color theme'",
    },
    {
      name: 'lightLabel',
      type: 'string',
      description: 'Label for the light appearance option.',
      default: "'Light'",
    },
    {
      name: 'darkLabel',
      type: 'string',
      description: 'Label for the dark appearance option.',
      default: "'Dark'",
    },
    {
      name: 'systemLabel',
      type: 'string',
      description: 'Label for the OS-synced system appearance option.',
      default: "'Auto'",
    },
    {
      name: 'isIconOnly',
      type: 'boolean',
      description: 'Hide visible text labels for compact topbars while preserving accessible radio labels.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Accessible 2-way or 3-way (`Light` / `Dark` / `Auto`) tactile appearance switcher inside a recessed well with roving arrow-key navigation. Pair with `useMehanThemeMode` and `MEHAN_THEME_INIT_SCRIPT`.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair with `MEHAN_THEME_INIT_SCRIPT` in `<head>` so SSR or static HTML pages never flash the wrong color scheme before hydration.',
      },
      {
        guidance: false,
        description: 'Use a binary Checkbox for color-mode switching when OS `system` preference is supported.',
      },
    ],
  },
};
