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
      'Mehan (@mehan/astryx) extends Meta Astryx with 8 tactile atmospheres, 10 OKLCH brand accents, createMehanTheme(), 35 universal components & WorkspaceLayout/CanvasStage, and runtime hooks (useMehanShortcuts, useAutoDraft, useMehanViewport).',
      'Read Mehan guides before building UIs: `astryx docs mehan-design-rules`, `mehan-ux-complexity`, `mehan-copy-and-states`, `mehan-ergonomics-and-motion`, `mehan-forms-and-i18n`, `mehan-page-archetypes`, `mehan-runtime-hooks`.',
    ],
  },
};
