export {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  buildMehanThemeConfig,
  contrastRatio,
  createMehanBaseTheme,
  createMehanTheme,
  ensureContrast,
  exportW3cDesignTokens,
  hexToOklch,
  hexToRgb,
  hexToRgbaCss,
  isPresetAccent,
  mehanIconRegistry,
  mergeMehanComponentStyles,
  mixHex,
  normalizeHex,
  oklchToHex,
  relativeLuminance,
  resolveMehanAccent,
  resolveMehanDna,
  rgbToHex,
  withHexAlpha,
  type AtmosphereModeScale,
  type CategoricalFamilyStops,
  type MehanAccentPreset,
  type MehanAstryxThemeOptions,
  type MehanAtmosphere,
  type MehanAtmosphereId,
  type MehanDensity,
  type MehanLipStyle,
  type MehanMotion,
  type MehanPresetAccentId,
  type MehanSegmentedStyle,
  type MehanThemeOptions,
  type MehanWellStyle,
  type OklchColor,
  type ResolvedMehanAccent,
  type ResolvedMehanDna,
  type RgbColor,
  type W3cTokenDocument,
  type W3cTokenLeaf,
} from './dna';

/**
 * Inline `<head>` script preventing dark-mode Flash of Unstyled Content (FOUC)
 * in Next.js App Router, Remix, Astro, or SSR HTML shells.
 */
export const MEHAN_THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export {ColorSwatch, type ColorSwatchProps} from './components/ColorSwatch/ColorSwatch';
export {ColorPicker, type ColorPickerProps} from './components/ColorPicker/ColorPicker';
export {
  PrecisionSlider,
  type PrecisionSliderProps,
} from './components/PrecisionSlider/PrecisionSlider';
export {
  MetricCard,
  type MetricCardDelta,
  type MetricCardProps,
} from './components/MetricCard/MetricCard';
