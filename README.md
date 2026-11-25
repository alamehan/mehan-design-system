# Mehan Design System (`v1.0.0`)

> **Calm tactile UI surfaces, unrestricted Meta Astryx theming, 4-Pillar 142-specimen component & runtime catalog, 5-in-1 Workspace Topology architecture, 12-chapter UX & Microcopy Playbook, and zero-setup portability — built cleanly as an official extension layer on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System keeps **Meta Astryx (`@astryxdesign/core`)** as the 100% untouched behavioral & WAI-ARIA foundation (103 Core components across 12 official categories, `<Theme>`, `<LayerProvider>`, focus traps, and strict CLI validation) while layering **Mehan's** perceptual OKLCH materials, **35 universal extension components & workspace layouts**, **4 ergonomic runtime hook suites**, and **7 AI-indexed UX/architecture guides** on top:

- **3-Level Spatial Hierarchy on Meta Astryx** — `AppShell` (Level 0 outer app chrome from `@astryxdesign/core`) → `WorkspaceLayout` (Level 1 multi-pane task workbench composing Astryx `Layout` + `LayoutPanel` + `ResizeHandle` + `Drawer`, with `Mod+\` collapse, `<768px` auto-`Drawer` inspector, and `200%`-zoom scroll release) → `CanvasStage` (Level 2 recessed interactive stage with non-blocking corner HUD & transport slots).
- **Parametric Seed + Unrestricted Open Theme Engine (`@mehan/dna` + `@mehan/astryx`)** — 3 canonical atmospheres (`confectionery`, `porcelain`, `stone`), 6 curated OKLCH brand accents + custom `#rrggbb` seeds, 10 self-hosted OFL-1.1 WOFF2 font families, plus open raw Astryx `tokens`, `localTokens`, and `components` overrides in `createMehanTheme()`.
- **4-Pillar, 12-Category Interactive Catalog (`142` Live Specimens)** — Organized architecturally from *Structure & Wayfinding* → *Actions & Inputs* (with 5 semantic sub-clusters inside `Form Controls`) → *Data, Content & Visualization* → *Feedback, Overlays & Runtime*, placing Astryx Core and Mehan extensions side-by-side by functional family.
- **4-Domain, 12-Chapter UX & Microcopy Playbook (`01`–`12`) + Global `?` ShortcutSheet** — Grouped into *Cognitive & Spatial*, *Typography & Intl*, *Actions, Keys & Motion*, and *Forms, States & Copy*, backed by executable runtime hooks (`useMehanShortcuts`, `usePrimaryAction`, `useAutoDraft`, `useUnsavedGuard`, `useMehanViewport`, `validateFile`).
- **Universal Delivery (`@mehan/portable` + `bin/mehan.mjs`)** — Direct GitHub release tarball installs, single-flag `--from theme.json` bridge from Studio exports to React/Next.js/Tailwind v4 apps, standalone `mehan-portable.css` + runtime JS, single-HTML AI Prototype Kits, and symmetric W3C DTCG tokens (`25/25` keys) for Figma.

---

## Live Studio & Zero-Terminal Hub (`STUDIO.html`)

- **Online (GitHub Pages):** **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)**
- **Offline (`file://`):** Double-click **`STUDIO.html`** directly in Explorer / Finder / Files (100% self-contained single HTML file, zero external CDN requests).
- Switch **Bahasa Indonesia (`ID`) / English (`EN`)**, toggle **Light / Dark**, or press **`?`** anywhere to open the live Studio `ShortcutSheet` (`/` focuses component search, `Mod+.` toggles the Docked Theme Editor, `Mod+Z` / `Mod+Shift+Z` undoes/redoes theme edits).

| Action | Windows | macOS / Linux |
|---|---|---|
| Open interactive Studio offline | `STUDIO.html` | `STUDIO.html` |
| Start live Vite dev server | `dev-windows.cmd` | `dev-mac-linux.command` |
| Full rebuild + 6-gate verification | `rebuild-and-check-windows.cmd` | `rebuild-and-check-mac-linux.command` |

---

## Installing in Any Project (via GitHub)

### 1. React, Next.js, or Vite (Direct GitHub Tarball — Zero Clone Needed)

```bash
pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "https://github.com/alamehan/mehan-design-system/raw/main/release/mehan-astryx-1.0.0.tgz"
pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
```

Or clone the repository and scaffold `src/mehan.css` + `src/MehanProvider.tsx` automatically from any Studio JSON export:

```bash
git clone https://github.com/alamehan/mehan-design-system.git
node ./mehan-design-system/bin/mehan.mjs init ./my-app --from mehan-confectionery-theme.json --github
```

### 2. Vanilla HTML, Vue, Svelte, Astro, or Claude / Gemini Artifacts

Grab ready-made assets directly from [`release/`](./release) (or copy them in 1 click inside Studio):

- [`release/mehan-portable.css`](./release/mehan-portable.css) & [`release/mehan-portable.js`](./release/mehan-portable.js) — Zero-React `.mh-*` stylesheet + progressive interactive runtime.
- [`release/MEHAN-AI-PROTOTYPE-KIT.md`](./release/MEHAN-AI-PROTOTYPE-KIT.md) — Self-contained prompt kit for single-HTML AI prototypes.
- [`release/mehan-tokens.w3c.json`](./release/mehan-tokens.w3c.json) — Symmetric W3C DTCG tokens for Figma Tokens Studio.

---

## Repository Architecture

| Path | Package / Artifact | Role |
|---|---|---|
| [`packages/dna`](./packages/dna) | `@mehan/dna` | Zero-DOM OKLCH color math, atmospheres, WCAG 2.2 AA contrast auditor, coalesced history store, `Intl` formatters, file validator, and W3C token exporter. |
| [`packages/astryx`](./packages/astryx) | `@mehan/astryx` | Official Meta Astryx theme provider (`createMehanTheme`), 35 universal extension components & workspace layouts, 4 runtime hook suites, 10 WOFF2 font families, and 80 AI agent docs. |
| [`packages/portable`](./packages/portable) | `@mehan/portable` | Framework-agnostic `.mh-*` CSS generator, progressive JS runtime, AI Prototype Kit generator, and single-HTML CDN starter builder. |
| [`apps/studio`](./apps/studio) | `@mehan/studio` | Interactive bilingual (`ID`/`EN`) Design System Studio, 3-tier Docked Theme Editor, 142-specimen catalog, 5-in-1 Workspace Topologies, and 12-chapter UX Playbook. |
| [`release/`](./release) | Distributables | Pre-packed tarballs (`mehan-dna-1.0.0.tgz`, `mehan-astryx-1.0.0.tgz`, `mehan-portable-1.0.0.tgz`), Portable CSS/JS, AI Kit, CDN starter, and W3C JSON tokens. |

---

## Full Automated Verification (`pnpm verify`)

```bash
pnpm install
pnpm verify
```

1. **Workspace Build & Release Packing:** `@mehan/dna`, `@mehan/astryx`, `@mehan/portable`, root offline `STUDIO.html`, and all `release/*` tarballs & portable kits.
2. **Strict TypeScript (`tsc --noEmit`):** All 4 workspace packages + root test suites (`0` errors).
3. **Vitest Mathematical, CLI & Repo Hygiene Suite:** 30-palette WCAG 2.2 AA contrast & gradient-band matrix, OKLCH math, `createHistoryStore`, `Intl` formatters, `validateFile`, symmetric W3C `color.light`/`color.dark` keys (`25/25`), Theme Editor `.ts` roundtrip, temp-dir CLI E2E (`init`, `tokens`, `ai-kit`), `:focus-visible` selector lock, and zero hardcoded local paths.
4. **`astryx integration check --strict --next`:** `80/80` docs verified, `35/35` components & `35/35` templates verified (`0` errors, `0` warnings).
5. **`astryx integration verify`:** `330` packed files, `154/154` required files verified.
6. **Playwright Headless Chromium & WCAG 2.2 AA `axe` Suite:** Desktop (`1366×900` Light/Dark), Mobile (`375×812`), `200%` zoom (`max-height: 559px`), all 12 catalog categories, 5-in-1 Workspace Topologies zero-clipping lock, 12-chapter bilingual UX Playbook, Theme Editor live proof, and zero external network calls over `file://`.

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
