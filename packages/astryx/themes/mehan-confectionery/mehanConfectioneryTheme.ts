import {defineTheme} from '@astryxdesign/core/theme';
import {mehanConfectioneryBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanConfectioneryTheme = defineTheme({
  name: 'mehan-confectionery',
  extends: mehanConfectioneryBaseTheme,
  icons: mehanIconRegistry,
});
