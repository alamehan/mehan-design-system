import {defineTheme} from '@astryxdesign/core/theme';
import {mehanCacaoBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanCacaoTheme = defineTheme({
  name: 'mehan-cacao',
  extends: mehanCacaoBaseTheme,
  icons: mehanIconRegistry,
});
