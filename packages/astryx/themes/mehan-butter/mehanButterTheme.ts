import {defineTheme} from '@astryxdesign/core/theme';
import {mehanButterBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanButterTheme = defineTheme({
  name: 'mehan-butter',
  extends: mehanButterBaseTheme,
  icons: mehanIconRegistry,
});
