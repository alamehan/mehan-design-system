/** @type {import('@astryxdesign/cli/authoring').AstryxIntegration} */
export default {
  providerId: 'mehan',
  themes: './themes',
  components: './src/components',
  templates: './blocks',
  docs: './docs',
  logo: {
    light: './assets/logo-light.svg',
    dark: './assets/logo-dark.svg',
  },
  agentDocs: {
    append: [
      'Mehan (@mehan/astryx) provides 3 tactile themes (`mehan-confectionery`, `mehan-porcelain`, `mehan-stone`) and 6-knob `createMehanTheme()` in `@mehan/astryx/dna`.',
      'Read Mehan UX, copy, and layout rules before building screens: `astryx docs mehan-design-rules`, `mehan-ux-complexity`, `mehan-copy-and-states`, `mehan-page-archetypes`.',
    ],
  },
};
