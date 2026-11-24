export {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  auditMehanThemeContrast,
  buildMehanThemeConfig,
  contrastRatio,
  createHistoryStore,
  createMehanBaseTheme,
  createMehanTheme,
  ensureContrast,
  exportW3cDesignTokens,
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  generateOklchScale,
  gradientBandContrast,
  hexToOklch,
  hexToRgb,
  hexToRgbaCss,
  isPresetAccent,
  mehanIconRegistry,
  mergeMehanComponentStyles,
  mixHex,
  mixOklab,
  normalizeHex,
  oklchToHex,
  parseLocalIsoDate,
  relativeLuminance,
  resolveMehanAccent,
  resolveMehanDna,
  rgbToHex,
  suggestOklchHarmonies,
  withHexAlpha,
  type AtmosphereModeScale,
  type CategoricalFamilyStops,
  type ContrastAuditCheck,
  type CreateHistoryStoreOptions,
  type HistoryEntry,
  type HistorySnapshot,
  type HistoryStore,
  type HistoryUpdateOptions,
  type MehanAccentPreset,
  type MehanAstryxThemeOptions,
  type MehanAtmosphere,
  type MehanAtmosphereId,
  type MehanContrastAuditReport,
  type MehanDensity,
  type MehanLipStyle,
  type MehanMotion,
  type MehanPresetAccentId,
  type MehanSegmentedStyle,
  type MehanThemeOptions,
  type MehanWellStyle,
  type OklchColor,
  type OklchHarmonies,
  type OklchShadeStop,
  type ResolvedMehanAccent,
  type ResolvedMehanDna,
  type RgbColor,
  type W3cTokenDocument,
  type W3cTokenLeaf,
} from './dna';

export {
  MEHAN_THEME_INIT_SCRIPT,
  copyTextSafe,
  formatShortcutKeys,
  isApplePlatform,
  isTypingTarget,
  useHistoryStore,
  useMehanThemeMode,
  type MehanThemeModePreference,
  type UseMehanThemeModeOptions,
  type UseMehanThemeModeResult,
} from './runtime';

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

// Stage 2A — Tier 1 Universal & Creative Studio Primitives
export {
  SplitButton,
  type SplitButtonItem,
  type SplitButtonProps,
} from './components/SplitButton/SplitButton';
export {CopyButton, type CopyButtonProps} from './components/CopyButton/CopyButton';
export {ColorWell, type ColorWellProps} from './components/ColorWell/ColorWell';
export {ThemeSwitch, type ThemeSwitchProps} from './components/ThemeSwitch/ThemeSwitch';
export {
  MiddleTruncate,
  type MiddleTruncateProps,
} from './components/MiddleTruncate/MiddleTruncate';
export {AngleDial, type AngleDialProps} from './components/AngleDial/AngleDial';
export {
  GradientPicker,
  formatGradientCss,
  type GradientPickerProps,
  type GradientStop,
} from './components/GradientPicker/GradientPicker';
export {
  AnchorMatrix,
  type AnchorMatrixProps,
  type AnchorPosition,
} from './components/AnchorMatrix/AnchorMatrix';

// Stage 2B — Tier 2 Application & Form Feedback Primitives
export {
  DigitEntry,
  DigitEntry as OtpInput,
  type DigitEntryProps,
  type DigitEntryProps as OtpInputProps,
} from './components/DigitEntry/DigitEntry';
export {Rating, type RatingProps} from './components/Rating/Rating';
export {ImageWell, type ImageWellProps} from './components/ImageWell/ImageWell';
export {
  ErrorSummary,
  type ErrorSummaryItem,
  type ErrorSummaryProps,
} from './components/ErrorSummary/ErrorSummary';
export {
  InlineConfirm,
  type InlineConfirmProps,
} from './components/InlineConfirm/InlineConfirm';
export {
  InlineMessage,
  type InlineMessageProps,
} from './components/InlineMessage/InlineMessage';

// Stage 2C — Tier 3 Data Visualization, Editors & Advanced Surface Primitives
export {Sparkline, type SparklineProps} from './components/Sparkline/Sparkline';
export {Gauge, type GaugeProps} from './components/Gauge/Gauge';
export {
  ActivityRing,
  type ActivityRingItem,
  type ActivityRingProps,
} from './components/ActivityRing/ActivityRing';
export {
  Timeline,
  type TimelineEntry,
  type TimelineProps,
} from './components/Timeline/Timeline';
export {
  TimelineScrubber,
  type TimelineMarker,
  type TimelineScrubberProps,
} from './components/TimelineScrubber/TimelineScrubber';
export {
  CanvasZoomBar,
  type CanvasZoomBarProps,
} from './components/CanvasZoomBar/CanvasZoomBar';
export {
  CodeEditor,
  type CodeDiagnostic,
  type CodeEditorProps,
} from './components/CodeEditor/CodeEditor';
export {
  MarkdownEditor,
  type MarkdownEditorProps,
} from './components/MarkdownEditor/MarkdownEditor';
export {
  NotificationCenter,
  type NotificationCenterProps,
  type NotificationEntry,
} from './components/NotificationCenter/NotificationCenter';
export {
  Tour,
  type TourProps,
  type TourStepItem,
} from './components/Tour/Tour';


