import {defineTheme} from '@astryxdesign/core/theme';
import {mehanPeriwinkleBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanPeriwinkleTheme = defineTheme({
  name: 'mehan-periwinkle',
  extends: mehanPeriwinkleBaseTheme,
  icons: mehanIconRegistry,
});
