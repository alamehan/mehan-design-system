import {defineTheme} from '@astryxdesign/core/theme';
import {mehanStoneBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanStoneTheme = defineTheme({
  name: 'mehan-stone',
  extends: mehanStoneBaseTheme,
  icons: mehanIconRegistry,
});
