import {defineTheme} from '@astryxdesign/core/theme';
import {mehanObsidianBaseTheme, mehanIconRegistry} from '@mehan/astryx/dna';

export const colorModes = ['light', 'dark'] as const;

export const mehanObsidianTheme = defineTheme({
  name: 'mehan-obsidian',
  extends: mehanObsidianBaseTheme,
  icons: mehanIconRegistry,
});
