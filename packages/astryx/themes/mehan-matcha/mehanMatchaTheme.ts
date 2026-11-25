import {defineTheme} from '@astryxdesign/core/theme';
import {mehanMatchaBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanMatchaTheme = defineTheme({
  name: 'mehan-matcha',
  extends: mehanMatchaBaseTheme,
  icons: mehanIconRegistry,
});
