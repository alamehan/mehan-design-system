# `@mehan/dna` (`v1.0.0`)

Zero-DOM, framework-agnostic parametric token, perceptual OKLCH color math, WCAG 2.2 AA contrast auditing, coalesced undo/redo history, `Intl` formatting, file validation, and W3C Design Tokens (DTCG) engine powering **Mehan Design System**.

Runs identically in Node.js, Edge Workers, Deno, Bun, and modern browsers with **zero runtime dependencies**.

## Installation

```bash
# Local release tarball
pnpm add "D:/mehan-design-system/release/mehan-dna-1.0.0.tgz"

# Or via @mehan/astryx/dna in React + Meta Astryx apps
import {resolveMehanDna, auditMehanThemeContrast} from '@mehan/astryx/dna';
```

## Core Modules

1. **Atmospheres, Accents & Tactile Materials (`resolveMehanDna`)**
   - 3 canonical neutral atmospheres (`confectionery`, `porcelain`, `stone`) strictly obeying monotonic dark-mode optical depth (`socket < well < paper < tray < surface < raised < float`).
   - 6 curated brand accents (`strawberry`, `blueberry`, `mint`, `tangerine`, `grape`, `teal`) plus arbitrary `#rrggbb` custom OKLCH seeds.
   - Sculptural 3-stop primary gradients, harmonious 1-shade-darker 3D lips (`candy | subtle | flat`), recessed wells, and multi-layer colored shadows.
2. **Perceptual OKLCH Math & WCAG 2.2 AA Auditor**
   - `hexToOklch`, `oklchToHex`, `mixOklab`, `generateOklchScale`, `suggestOklchHarmonies`, `contrastRatio`, `ensureContrast`, `gradientBandContrast`, `auditMehanThemeContrast`.
3. **Coalesced Undo/Redo State Store (`createHistoryStore`)**
   - Framework-agnostic state history coalescing high-frequency slider/color-picker scrubs into single undo steps (`undo`, `redo`, `transient`, `coalesce`).
4. **Locale-Memoized `Intl` Formatters & Pure File Validation**
   - `formatNumber`, `formatCompactNumber`, `formatCurrency`, `formatPercent`, `formatBytes`, `formatRelativeTime`, `parseLocalIsoDate`.
   - `validateFile`, `matchesAcceptedType` (MIME, wildcard `type/*`, `.ext`, and byte-size caps with structured issue codes).
5. **Symmetric W3C DTCG Token Export (`exportW3cDesignTokens`)**
   - Exports 1:1 symmetric `color.light` and `color.dark` (25 keys each), `dimension`, and `fontFamily` tokens for Figma Tokens Studio, Penpot, and Style Dictionary.
