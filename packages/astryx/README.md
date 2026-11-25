# `@mehan/astryx` (`v1.0.0`)

Official provider and tactile extension layer on top of **Meta Astryx (`@astryxdesign/core ~0.7.17`)** — keeping all 103 Meta Astryx WAI-ARIA primitives as the untouched foundation while adding **8 prebuilt OKLCH tactile atmospheres**, **10 curated brand accents**, unrestricted parametric + raw Astryx theming (`createMehanTheme`), **10 self-hosted OFL WOFF2 font families**, **35 universal extension components & workspace layouts**, **4 ergonomic runtime hook suites**, and **80 AI-indexed Astryx docs**.

## Quick Setup

```tsx
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/themes/mehan-confectionery.css';
import '@mehan/astryx/styles.css';

import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {mehanConfectioneryTheme} from '@mehan/astryx/themes/mehan-confectionery';

export function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={mehanConfectioneryTheme} mode="system">
      <LayerProvider>{children}</LayerProvider>
    </Theme>
  );
}
```

## 35 Universal Extension Components & Workspaces (`@mehan/astryx`)

1. **Workspace, Stage & Inspector Layouts (`3`):** `WorkspaceLayout` (Level-1 adaptive workbench on Astryx `Layout` + `LayoutPanel` + `ResizeHandle` + `Drawer`), `CanvasStage` (Level-2 recessed interactive viewport + HUD + transport), `PropertyRow` (narrow-panel inspector row with `InfoTip` & 1-click reset)
2. **Actions & Viewport Triggers (`4`):** `SplitButton`, `CopyButton`, `InlineConfirm`, `CanvasZoomBar`
3. **Form, Color, Spatial & Rich Editors (`13`):** `DigitEntry` (`OtpInput`), `Rating`, `PrecisionSlider`, `AngleDial`, `AnchorMatrix`, `TimelineScrubber`, `ColorSwatch`, `ColorWell`, `ColorPicker` (with `hasAlpha`), `GradientPicker` (`formatGradientCss`), `ImageWell`, `CodeEditor` (WCAG 2.1.2 `Esc -> Tab`), `MarkdownEditor`
4. **Content, Tables, Hierarchy & Data Viz (`9`):** `MiddleTruncate`, `ColumnSettingsMenu` (paired with Astryx `useTableColumnSettingsState`), `ColumnView` (2D-keyboard Miller columns), `Timeline`, `MetricCard`, `DataChart` (`line | area | bar | horizontal-bar` + SR `<table>`), `Sparkline`, `Gauge`, `ActivityRing`
5. **Feedback, Overlays & Theme Utilities (`6`):** `InlineMessage`, `ErrorSummary`, `ShortcutSheet` (`?` modal wired to `useMehanShortcuts`), `NotificationCenter`, `Tour`, `ThemeSwitch`

## Ergonomic Runtime Hooks & `@mehan/astryx/dna`

- **Shortcuts (Law U1):** `useMehanShortcuts`, `usePrimaryAction`, `useRegisteredShortcuts`, `formatShortcutKeys`, `isTypingTarget`
- **Viewport & Motion (Laws U2 & U5):** `useMehanViewport`, `MEHAN_MEDIA_QUERIES`
- **Form Resilience (Law U3):** `useAutoDraft`, `useUnsavedGuard`
- **Theme, History & File I/O:** `MEHAN_THEME_INIT_SCRIPT`, `useMehanThemeMode`, `useHistoryStore`, `copyTextSafe`, `readFileText`, `pickFiles`, `downloadBlob`, `downloadJson`
- **DNA (`@mehan/astryx/dna`):** `createMehanTheme`, `resolveMehanDna`, `auditMehanThemeContrast`, `createHistoryStore`, `validateFile`, `exportW3cDesignTokens`, `formatNumber`, `formatCurrency`, `formatBytes`, `formatRelativeTime`

## AI Agent Guides (`astryx docs`)

- `mehan-design-rules` · `mehan-ux-complexity` · `mehan-copy-and-states` · `mehan-ergonomics-and-motion` · `mehan-forms-and-i18n` · `mehan-page-archetypes` · `mehan-runtime-hooks`
