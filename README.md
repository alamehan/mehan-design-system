# Mehan Design System (`v1.0.0`)

> **Calm tactile UI surfaces, unrestricted Meta Astryx theming, 4-Pillar 142-specimen component & runtime catalog, 5-in-1 Workspace Topology architecture, 12-chapter UX & Microcopy Playbook, and zero-setup portability — built cleanly as an official extension layer on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System keeps **Meta Astryx (`@astryxdesign/core`)** as the 100% untouched behavioral & WAI-ARIA foundation (103 Core components across 12 official categories, `<Theme>`, `<LayerProvider>`, focus traps, and strict CLI validation) while layering **Mehan's** perceptual OKLCH materials, **35 universal extension components & workspace layouts**, **4 ergonomic runtime hook suites**, and **7 AI-indexed UX/architecture guides** on top:

- **3-Level Spatial Hierarchy on Meta Astryx** — `AppShell` (Level 0 outer app chrome from `@astryxdesign/core`) → `WorkspaceLayout` (Level 1 multi-pane task workbench composing Astryx `Layout` + `LayoutPanel` + `ResizeHandle` + `Drawer`, with `Mod+\` collapse, `<768px` auto-`Drawer` inspector, and `200%`-zoom scroll release) → `CanvasStage` (Level 2 recessed interactive stage with non-blocking corner HUD & transport slots).
- **Parametric Seed + Unrestricted Open Theme Engine (`@mehan/dna` + `@mehan/astryx`)** — 3 canonical atmospheres (`confectionery`, `porcelain`, `stone`), 6 curated OKLCH brand accents + custom `#rrggbb` seeds, 10 self-hosted OFL-1.1 WOFF2 font families, plus open raw Astryx `tokens`, `localTokens`, and `components` overrides in `createMehanTheme()`.
- **4-Pillar, 12-Category Interactive Catalog (`142` Live Specimens)** — Organized architecturally from *Structure & Wayfinding* → *Actions & Inputs* (with 5 semantic sub-clusters inside `Form Controls`) → *Data, Content & Visualization* → *Feedback, Overlays & Runtime*, placing Astryx Core and Mehan extensions side-by-side by functional family.
- **4-Domain, 12-Chapter UX & Microcopy Playbook (`01`–`12`) + Global `?` ShortcutSheet** — Grouped into *Cognitive & Spatial*, *Typography & Intl*, *Actions, Keys & Motion*, and *Forms, States & Copy*, backed by executable runtime hooks (`useMehanShortcuts`, `usePrimaryAction`, `useAutoDraft`, `useUnsavedGuard`, `useMehanViewport`, `validateFile`).
- **Universal Delivery (`@mehan/portable` + `bin/mehan.mjs`)** — Single-flag `--from theme.json` bridge from Studio exports to React/Next.js/Tailwind v4 apps, standalone `mehan-portable.css` + runtime JS, single-HTML AI Prototype Kits, symmetric W3C DTCG tokens for Figma, and local `release/*.tgz` tarballs for `@mehan/dna`, `@mehan/astryx`, and `@mehan/portable`.

---

## 1-Door Zero-Terminal Hub (`STUDIO.html`)

1. **Double-click `STUDIO.html`** directly in Explorer / Finder / Files (100% offline `file://`, zero external CDN calls).
2. Switch **Bahasa Indonesia (`ID`) / English (`EN`)**, toggle **Light / Dark**, or press **`?`** anywhere to open the live Studio `ShortcutSheet` (`/` focuses component search, `Mod+.` toggles the Docked Theme Editor, `Mod+Z` / `Mod+Shift+Z` undoes/redoes theme edits).
3. Explore all 5 workspaces (`Overview`, `Components`, `Patterns & Templates`, `UX & Copy`, `Maintain`) while docking **`Theme Editor`** side-by-side.

| Action | Windows | macOS / Linux |
|---|---|---|
| Open interactive Studio offline | `STUDIO.html` | `STUDIO.html` |
| Start live Vite dev server | `dev-windows.cmd` | `dev-mac-linux.command` |
| Full rebuild + 6-gate verification | `rebuild-and-check-windows.cmd` | `rebuild-and-check-mac-linux.command` |

---

## Installing in Any Project

```bash
# One-command setup from a Studio JSON export or parametric flags:
node "D:/mehan-design-system/bin/mehan.mjs" init ./my-app --from mehan-confectionery-theme.json

# Or direct package install (offline-ready local tarballs in release/):
pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "D:/mehan-design-system/release/mehan-astryx-1.0.0.tgz"
pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
```

---

## Full Automated Verification (`pnpm verify`)

```bash
pnpm verify
```

1. **Workspace Build & Release Packing:** `@mehan/dna`, `@mehan/astryx`, `@mehan/portable`, root offline `STUDIO.html`, and all 3 `release/*.tgz` tarballs (`dna`, `astryx`, `portable`).
2. **Strict TypeScript (`tsc --noEmit`):** All 4 workspace packages + root test suites (`0` errors).
3. **Vitest Mathematical, CLI & Repo Hygiene Suite:** 30-palette WCAG 2.2 AA contrast & gradient-band matrix, OKLCH math, `createHistoryStore`, `Intl` formatters, `validateFile`, symmetric W3C `color.light`/`color.dark` keys, Theme Editor component-slot `.ts` roundtrip, temp-dir CLI E2E (`init`, `tokens`, `ai-kit`, `set-scope`), `:focus-visible` selector lock, and zero-bias repository audit.
4. **`astryx integration check --strict --next`:** `80/80` docs verified, `35/35` components & `35/35` templates verified (`0` errors, `0` warnings).
5. **`astryx integration verify`:** `330` packed files, `154/154` required files verified.
6. **Playwright Headless Chromium & WCAG 2.2 AA `axe` Suite:** Desktop (`1366×900` Light/Dark), Mobile (`375×812`), `200%` zoom (`max-height: 559px`), all 12 catalog categories, all new workspace/chart/table/column/shortcut primitives, 12-chapter bilingual UX Playbook, Theme Editor live proof, and zero external network calls over `file://`.

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
