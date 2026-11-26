# `@mehan/astryx` (`v1.0.0`)

Official provider and tactile extension layer on top of **Meta Astryx (`@astryxdesign/core ~0.7.17`)** — keeping every Meta Astryx WAI-ARIA primitive intact while adding curated OKLCH tactile atmospheres, brand accents, parametric + slot-level theming (`createMehanTheme`), self-hosted OFL WOFF2 font families, universal workspace & creative components, ergonomic runtime hooks, and AI-indexed UX guides.

## Quick Setup

```tsx
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/themes/mehan-porcelain.css';
import '@mehan/astryx/styles.css';

import {LayerProvider} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {mehanPorcelainTheme} from '@mehan/astryx/themes/mehan-porcelain';

export function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={mehanPorcelainTheme} mode="system">
      <LayerProvider>{children}</LayerProvider>
    </Theme>
  );
}
```

## Universal Extension Components & Workspaces (`@mehan/astryx`)

1. **Workspace, Stage & Inspector Layouts:** `WorkspaceLayout` (adaptive multi-panel workbench on Astryx `Layout` + `LayoutPanel` + `ResizeHandle` + `Drawer`), `CanvasStage` (recessed interactive viewport + HUD + transport), `PropertyRow` (narrow-panel inspector row with `InfoTip` & 1-click reset)
2. **Actions & Viewport Triggers:** `SplitButton`, `CopyButton`, `InlineConfirm`, `CanvasZoomBar`
3. **Form, Color, Spatial & Rich Editors:** `DigitEntry` (`OtpInput`), `Rating`, `PrecisionSlider`, `AngleDial`, `AnchorMatrix`, `TimelineScrubber`, `ColorSwatch`, `ColorWell`, `ColorPicker` (with `hasAlpha`), `GradientPicker` (`formatGradientCss`), `ImageWell`, `CodeEditor` (WCAG 2.1.2 `Esc -> Tab`), `MarkdownEditor`
4. **Content, Tables, Hierarchy & Data Viz:** `MiddleTruncate`, `ColumnSettingsMenu` (paired with Astryx `useTableColumnSettingsState`), `ColumnView` (2D-keyboard Miller columns), `Timeline`, `MetricCard`, `DataChart` (`line | area | bar | horizontal-bar` + SR `<table>`), `Sparkline`, `Gauge`, `ActivityRing`
5. **Feedback, Overlays & Theme Utilities:** `InlineMessage`, `ErrorSummary`, `ShortcutSheet` (`?` modal wired to `useMehanShortcuts`), `NotificationCenter`, `Tour`, `ThemeSwitch`

## Ergonomic Runtime Hooks & `@mehan/astryx/dna`

- **Shortcuts:** `useMehanShortcuts`, `usePrimaryAction`, `useRegisteredShortcuts`, `formatShortcutKeys`, `isTypingTarget`
- **Viewport & Motion:** `useMehanViewport`, `MEHAN_MEDIA_QUERIES`
- **Form Resilience:** `useAutoDraft`, `useUnsavedGuard`
- **Theme, History & File I/O:** `MEHAN_THEME_INIT_SCRIPT`, `useMehanThemeMode`, `useHistoryStore`, `copyTextSafe`, `readFileText`, `pickFiles`, `downloadBlob`, `downloadJson`
- **DNA (`@mehan/astryx/dna`):** `createMehanTheme`, `resolveMehanDna`, `auditMehanThemeContrast`, `createHistoryStore`, `validateFile`, `exportW3cDesignTokens`, `formatNumber`, `formatCurrency`, `formatBytes`, `formatRelativeTime`

## AI Agent Guides (`astryx docs`) & Single-HTML Browser Runtime

- `mehan-design-rules` · `mehan-ux-complexity` · `mehan-copy-and-states` · `mehan-ergonomics-and-motion` · `mehan-forms-and-i18n` · `mehan-page-archetypes` · `mehan-runtime-hooks`
- Every component exported from [`src/index.ts`](./src/index.ts) and documented via `src/components/*/*.doc.mjs` is automatically bundled into `/cdn/mehan-runtime.{css,js}` and synced into `@mehan/portable`'s `MEHAN-AI-PROTOTYPE-KIT.md` during `pnpm build`.
