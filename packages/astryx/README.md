# `@mehan/astryx` (`v1.0.0`)

Mehan Design System integration package for Meta Astryx (`@astryxdesign/core ~0.7.17`) — combining 3 prebuilt OKLCH tactile themes, unrestricted parametric + raw Astryx theming (`createMehanTheme`), **10 self-hosted WOFF2 font families**, **28 universal extension components**, runtime/history/locale utilities, and **65 AI-indexed Astryx docs**.

## Quick Setup (Zero Bundler Plugins)

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

## 28 Universal Extension Components (`@mehan/astryx`)

- **Action & Shell:** `SplitButton`, `CopyButton`, `ThemeSwitch`, `InlineConfirm`, `CanvasZoomBar`
- **Color, Spatial & Precision Controls:** `ColorSwatch`, `ColorPicker` (with `hasAlpha` opacity rail), `ColorWell`, `PrecisionSlider`, `AngleDial`, `GradientPicker` (`formatGradientCss`), `AnchorMatrix`, `TimelineScrubber`
- **Application Inputs & Feedback:** `MiddleTruncate`, `DigitEntry` (`OtpInput`), `Rating`, `ImageWell`, `ErrorSummary`, `InlineMessage`
- **Data Visualization & Feeds:** `MetricCard`, `Sparkline` (with companion screen-reader `<table>`), `Gauge`, `ActivityRing`, `Timeline`
- **Editors & Guided Surfaces:** `CodeEditor` (WCAG 2.1.2 `Esc -> Tab` focus exit), `MarkdownEditor`, `NotificationCenter`, `Tour`

## Runtime Hooks & `@mehan/astryx/dna` Utilities

- **Runtime (`@mehan/astryx`):** `MEHAN_THEME_INIT_SCRIPT`, `useMehanThemeMode`, `useHistoryStore`, `copyTextSafe`, `isTypingTarget`, `formatShortcutKeys`
- **DNA & Locale (`@mehan/astryx/dna`):** `createMehanTheme`, `resolveMehanDna`, `auditMehanThemeContrast`, `generateOklchScale`, `suggestOklchHarmonies`, `mixOklab`, `createHistoryStore`, `exportW3cDesignTokens`, `formatNumber`, `formatCompactNumber`, `formatCurrency`, `formatPercent`, `formatBytes`, `formatRelativeTime`, `parseLocalIsoDate`

## AI Agent Documentation (`astryx docs`)

- `mehan-design-rules` — 7-role material hierarchy, 80/15/5 color budget & open theming
- `mehan-ux-complexity` — One primary CTA, 4-tier progressive disclosure & semantic control roles
- `mehan-copy-and-states` — Sentence-case microcopy & 5 humane recovery states
- `mehan-ergonomics-and-motion` — Keyboard shortcuts, layered `Esc`, coarse pointer `44px`, 9-tier line budget & motion choreography (`U1`, `U2`, `U4`, `U5`)
- `mehan-forms-and-i18n` — *Reward early, punish late* validation timing, 3-tier confirmation & `Intl` formatting (`U3`, `U6`)
- `mehan-page-archetypes` — Production dashboard, progressive settings & studio canvas layouts
