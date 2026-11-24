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
      'Mehan (@mehan/astryx) ships 3 tactile themes (`mehan-confectionery`, `mehan-porcelain`, `mehan-stone`) and `createMehanTheme()` from `@mehan/astryx/dna`.',
      'Signature controls: `ColorSwatch`, `ColorPicker`, `PrecisionSlider`, and `MetricCard`. Run `astryx docs mehan-design-rules` for hierarchy rules.',
    ],
  },
};
