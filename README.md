# Mehan Design System (`v1.0.0`)

> **Silky-smooth tactile UI surfaces, unrestricted Meta Astryx theming, complete 12-category component catalog, and zero-setup portability — built cleanly on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System pairs **Meta Astryx's** accessible behavioral engine (90+ WAI-ARIA primitives across 12 official categories, focus traps, keyboard models, touch ergonomics, and strict CLI validator) with **Mehan / Shotcandy's** tactile physicality and universal UX discipline:

- **Parametric Seed + Unrestricted Open Theme Engine (`@mehan/dna` + `@mehan/astryx`)** — Tune fast parametric DNA seeds (`atmosphere`: `confectionery | porcelain | stone`, `accent`: 6 boiled-sweet OKLCH presets or any `#rrggbb`, `lipStyle`: `'candy' | 'subtle' | 'flat'`, `segmentedStyle`: `'raised' | 'espresso'` for Shotcandy's inverted `#2a1f1a` / `#fbefe4` active pill, `wellStyle`: `'recessed' | 'bordered'`, `depth`, `typeBase` incl. `13.5px`, `typeRatio`, `headingFont`, `bodyFont`, `codeFont`, `spacingBase`, `radiusBase`, `sizeBase`, `motion`, `durationStep`) **plus** unrestricted raw Astryx `tokens`, `localTokens`, and deep-merged `components` overrides in `createMehanTheme()`.
- **Docked 3-Tier Theme Editor + 10 Offline-Bundled WOFF2 Typefaces** — Chunked split-pane Theme Editor (`Base Styles`, `Components`, `Advanced`) featuring **10 self-hosted OFL-1.1 WOFF2 font families** (`Bricolage Grotesque`, `Figtree`, `Albert Sans`, `Outfit`, `Poppins`, `Montserrat`, `Fraunces`, `Crimson Text`, `Geist Mono`, `JetBrains Mono`) that switch live offline over `file://`, plus bidirectional `.json` / `.ts` Import & Export.
- **Complete 12-Category Interactive Component Catalog (107 Live Specimens)** — Focused category-first navigation across Meta Astryx's 12 official categories (`Action`, `Chat`, `Container`, `Content`, `Data Visualization`, `Feedback & Status`, `Form Controls`, `Layout`, `Navigation`, `Overlay`, `Table & List`, `Utility`) with adaptive wide/full stages, shaded-header `Table`, bounded `AppShell`, and Mehan's 4 precision controls (`ColorSwatch`, `ColorPicker`, `PrecisionSlider`, `MetricCard`).
- **Official Meta Astryx `Theme Showcase` + Production Templates** — Stress-test any theme live against the official Astryx Storefront + Checkout + Studio AI Chat + Inventory Table benchmark, SaaS Dashboard, Progressive-Disclosure Settings, and Shotcandy 3D Canvas Studio.
- **Interactive 6-Chapter UX & Microcopy Playbook + Portable Kits (`@mehan/portable`)** — Covers Grouping & Chunking, 4-Tier Progressive Disclosure, Truncation & Tabular Numerals, Action Hierarchy, 5 System Recovery States, and Bilingual Microcopy (`ID`/`EN`), alongside 4 AI-indexed Astryx `ReferenceDoc` guides, Portable CSS/JS, and W3C Figma tokens.

---

## 1-Door Zero-Terminal Hub (`STUDIO.html`)

1. **Double-click `STUDIO.html`** directly in Explorer / Finder / Files (100% offline `file://`).
2. Switch **Bahasa Indonesia (`ID`) / English (`EN`)** and **Light / Dark** in the top bar.
3. Explore all 5 workspaces (`Overview`, `Components`, `Templates`, `UX & Copy`, `Maintain`) while docking **`Theme Editor`** side-by-side for live split-pane customization.

### Zero-Terminal Double-Click Scripts (Windows, macOS & Linux)

| Action | Windows | macOS / Linux |
|---|---|---|
| Open interactive Studio offline | `STUDIO.html` | `STUDIO.html` |
| Start live Vite dev server | `dev-windows.cmd` | `dev-mac-linux.command` |
| Full rebuild + 6-gate verification | `rebuild-and-check-windows.cmd` | `rebuild-and-check-mac-linux.command` |

---

## Installing in Any Project

```bash
# One-command setup (auto-detects React/Next.js/Vite & Tailwind CSS v4):
node "D:/mehan-design-system/bin/mehan.mjs" init ./my-app --atmosphere confectionery --accent strawberry

# Direct package install (offline-ready local tarball):
pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "D:/mehan-design-system/release/mehan-astryx-1.0.0.tgz"
pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
```

---

## Full 6-Gate Verification

```bash
pnpm verify
```

Runs: (1) Full workspace build + `STUDIO.html` + `release/` tarball, (2) TypeScript `tsc --noEmit` across all packages & root tests, (3) Vitest optical depth, tactile modes, open `tokens`/`components` merge, & WCAG AA contrast laws, (4) `astryx integration check --strict --next`, (5) `astryx integration verify`, and (6) Playwright headless Chromium over `file://` (`1366×900` Light/Dark + `375×812` Mobile + zero `axe` `color-contrast` violations).

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
