// 1 · Atmospheres, Accents & Parametric Tactile Materials
export {
  MEHAN_ATMOSPHERE_IDS,
  MEHAN_ATMOSPHERES,
  isMehanAtmosphereId,
  type AtmosphereModeScale,
  type MehanAtmosphere,
  type MehanAtmosphereId,
} from './atmospheres';

export {
  MEHAN_ACCENT_PRESETS,
  isPresetAccent,
  resolveMehanAccent,
  type MehanAccentPreset,
  type MehanPresetAccentId,
  type ResolvedMehanAccent,
} from './accents';

export {
  defaultAccentForAtmosphere,
  resolveMehanDna,
  type CategoricalFamilyStops,
  type MehanDensity,
  type MehanLipStyle,
  type MehanMotion,
  type MehanSegmentedStyle,
  type MehanThemeOptions,
  type MehanWellStyle,
  type ResolvedMehanDna,
} from './materials';

// 2 · Perceptual OKLCH Color Math & WCAG 2.2 AA Contrast Auditor
export {
  contrastRatio,
  ensureContrast,
  generateOklchScale,
  gradientBandContrast,
  hexToOklch,
  hexToRgb,
  hexToRgbaCss,
  mixHex,
  mixOklab,
  normalizeHex,
  oklchToHex,
  relativeLuminance,
  rgbToHex,
  suggestOklchHarmonies,
  withHexAlpha,
  type OklchColor,
  type OklchHarmonies,
  type OklchShadeStop,
  type RgbColor,
} from './color';

export {
  auditMehanThemeContrast,
  type ContrastAuditCheck,
  type MehanContrastAuditReport,
} from './audit';

// 3 · Coalesced Undo/Redo State History
export {
  createHistoryStore,
  type CreateHistoryStoreOptions,
  type HistoryEntry,
  type HistorySnapshot,
  type HistoryStore,
  type HistoryUpdateOptions,
} from './history';

// 4 · Locale-Aware Intl Formatters & Pure File Validation
export {
  formatBytes,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeTime,
  parseLocalIsoDate,
} from './format';

export {
  matchesAcceptedType,
  validateFile,
  type FileMetadataLike,
  type FileValidationIssueCode,
  type FileValidationResult,
  type FileValidationRule,
} from './files';

// 5 · W3C Design Tokens Community Group (DTCG) Interoperability
export {
  exportW3cDesignTokens,
  type W3cTokenDocument,
  type W3cTokenLeaf,
} from './w3c';
