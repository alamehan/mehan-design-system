// 1 · Parametric DNA, OKLCH Color Math, W3C Tokens & Open Astryx Theme Builder
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
  matchesAcceptedType,
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
  validateFile,
  withHexAlpha,
  type AtmosphereModeScale,
  type CategoricalFamilyStops,
  type ContrastAuditCheck,
  type CreateHistoryStoreOptions,
  type FileMetadataLike,
  type FileValidationIssueCode,
  type FileValidationResult,
  type FileValidationRule,
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

// 2 · Ergonomic Runtime Hooks & Client File I/O (UX Laws U1–U5)
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

export {
  getRegisteredShortcuts,
  matchesShortcutEvent,
  useMehanShortcuts,
  usePrimaryAction,
  useRegisteredShortcuts,
  type MehanShortcutBinding,
  type RegisteredShortcutItem,
  type UsePrimaryActionOptions,
} from './hooks/shortcuts';

export {
  useAutoDraft,
  useUnsavedGuard,
  type DraftStorageLike,
  type UseAutoDraftOptions,
  type UseAutoDraftResult,
} from './hooks/draft';

export {
  MEHAN_MEDIA_QUERIES,
  useMehanViewport,
  type MehanViewportState,
} from './hooks/viewport';

export {
  downloadBlob,
  downloadJson,
  pickFiles,
  readFileText,
  type PickFilesOptions,
} from './hooks/fileIo';

// 3 · Structure, Workspace & Stage Extensions (Layout)
export {
  WorkspaceLayout,
  type WorkspaceEndPaneConfig,
  type WorkspaceLayoutProps,
  type WorkspaceStartPaneConfig,
} from './components/WorkspaceLayout/WorkspaceLayout';
export {
  CanvasStage,
  type CanvasStageBackdrop,
  type CanvasStageProps,
} from './components/CanvasStage/CanvasStage';
export {
  PropertyRow,
  type PropertyRowProps,
} from './components/PropertyRow/PropertyRow';

// 4 · Actions & Viewport Triggers
export {
  SplitButton,
  type SplitButtonItem,
  type SplitButtonProps,
} from './components/SplitButton/SplitButton';
export {CopyButton, type CopyButtonProps} from './components/CopyButton/CopyButton';
export {
  InlineConfirm,
  type InlineConfirmProps,
} from './components/InlineConfirm/InlineConfirm';
export {
  CanvasZoomBar,
  type CanvasZoomBarProps,
} from './components/CanvasZoomBar/CanvasZoomBar';

// 5 · Form, Color, Spatial & Rich Editor Controls
export {
  DigitEntry,
  DigitEntry as OtpInput,
  type DigitEntryProps,
  type DigitEntryProps as OtpInputProps,
} from './components/DigitEntry/DigitEntry';
export {Rating, type RatingProps} from './components/Rating/Rating';
export {
  PrecisionSlider,
  type PrecisionSliderProps,
} from './components/PrecisionSlider/PrecisionSlider';
export {AngleDial, type AngleDialProps} from './components/AngleDial/AngleDial';
export {
  AnchorMatrix,
  type AnchorMatrixProps,
  type AnchorPosition,
} from './components/AnchorMatrix/AnchorMatrix';
export {
  TimelineScrubber,
  type TimelineMarker,
  type TimelineScrubberProps,
} from './components/TimelineScrubber/TimelineScrubber';
export {ColorSwatch, type ColorSwatchProps} from './components/ColorSwatch/ColorSwatch';
export {ColorWell, type ColorWellProps} from './components/ColorWell/ColorWell';
export {ColorPicker, type ColorPickerProps} from './components/ColorPicker/ColorPicker';
export {
  GradientPicker,
  formatGradientCss,
  type GradientPickerProps,
  type GradientStop,
} from './components/GradientPicker/GradientPicker';
export {ImageWell, type ImageWellProps} from './components/ImageWell/ImageWell';
export {
  CodeEditor,
  type CodeDiagnostic,
  type CodeEditorProps,
} from './components/CodeEditor/CodeEditor';
export {
  MarkdownEditor,
  type MarkdownEditorProps,
} from './components/MarkdownEditor/MarkdownEditor';

// 6 · Content, Tables, Hierarchy & Data Visualization
export {
  MiddleTruncate,
  type MiddleTruncateProps,
} from './components/MiddleTruncate/MiddleTruncate';
export {
  ColumnSettingsMenu,
  type ColumnSettingsMenuProps,
} from './components/ColumnSettingsMenu/ColumnSettingsMenu';
export {
  ColumnView,
  type ColumnViewNode,
  type ColumnViewProps,
} from './components/ColumnView/ColumnView';
export {
  Timeline,
  type TimelineEntry,
  type TimelineProps,
} from './components/Timeline/Timeline';
export {
  MetricCard,
  type MetricCardDelta,
  type MetricCardProps,
} from './components/MetricCard/MetricCard';
export {
  DataChart,
  type DataChartKind,
  type DataChartProps,
  type DataChartSeries,
} from './components/DataChart/DataChart';
export {Sparkline, type SparklineProps} from './components/Sparkline/Sparkline';
export {Gauge, type GaugeProps} from './components/Gauge/Gauge';
export {
  ActivityRing,
  type ActivityRingItem,
  type ActivityRingProps,
} from './components/ActivityRing/ActivityRing';

// 7 · Feedback, Overlays & Theme Utilities
export {
  InlineMessage,
  type InlineMessageProps,
} from './components/InlineMessage/InlineMessage';
export {
  ErrorSummary,
  type ErrorSummaryItem,
  type ErrorSummaryProps,
} from './components/ErrorSummary/ErrorSummary';
export {
  ShortcutSheet,
  type ShortcutSheetEntry,
  type ShortcutSheetProps,
} from './components/ShortcutSheet/ShortcutSheet';
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
export {ThemeSwitch, type ThemeSwitchProps} from './components/ThemeSwitch/ThemeSwitch';
