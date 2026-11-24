import {defineTheme} from '@astryxdesign/core/theme';
import {mehanPorcelainBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanPorcelainTheme = defineTheme({
  name: 'mehan-porcelain',
  extends: mehanPorcelainBaseTheme,
  icons: mehanIconRegistry,
});
