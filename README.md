# Mehan Design System (`v1.0.0`)

> **Silky-smooth tactile UI surfaces, unrestricted Meta Astryx theming, complete 12-category component catalog, and zero-setup portability — built cleanly on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System pairs **Meta Astryx's** accessible behavioral engine (90+ WAI-ARIA primitives across 12 official categories, focus traps, keyboard models, touch ergonomics, and strict CLI validator) with **Mehan / Shotcandy's** tactile physicality and universal UX discipline:

- **Parametric Seed + Unrestricted Open Theme Engine (`@mehan/dna` + `@mehan/astryx`)** — Tune fast parametric DNA seeds (`atmosphere`: `confectionery | porcelain | stone`, `accent`: 6 boiled-sweet OKLCH presets or any `#rrggbb`, `lipStyle`: `'candy' | 'subtle' | 'flat'`, `segmentedStyle`: `'raised' | 'espresso'` for Shotcandy's inverted `#2a1f1a` / `#fbefe4` active pill, `wellStyle`: `'recessed' | 'bordered'`, `depth`, `typeBase` incl. `13.5px`, `typeRatio`, `headingFont`, `bodyFont`, `codeFont`, `spacingBase`, `radiusBase`, `sizeBase`, `motion`, `durationStep`) **plus** unrestricted raw Astryx `tokens`, `localTokens`, and deep-merged `components` overrides in `createMehanTheme()`.
- **Docked 3-Tier Theme Editor in `STUDIO.html` (1:1 Astryx Playground Parity)** — Non-modal split-pane Theme Editor featuring **`Base Styles`**, **`Components`** (11 official component token groups + 65+ Custom CSS Override targets), and **`Advanced`** (all 8 raw token families: `Colors` incl. `Data Visualization` & `Syntax Highlighting`, `Spacing`, `Radius`, `Typography`, `Size`, `Elevation`, `Duration`, `Easing`), plus bidirectional `.json` / Astryx `defineTheme` `.ts` Import & Export.
- **Complete 12-Category Interactive Component Catalog (~95 Live Specimens)** — Organized strictly by Meta Astryx's 12 official categories (`Action`, `Chat`, `Container`, `Content`, `Data Visualization`, `Feedback & Status`, `Form Controls`, `Layout`, `Navigation`, `Overlay`, `Table & List`, `Utility`) including Mehan's 4 precision controls (`ColorSwatch`, `ColorPicker`, `PrecisionSlider`, `MetricCard`).
- **Official Meta Astryx `Theme Showcase` + Production Templates** — Stress-test any theme live against the official Astryx Storefront + Checkout + Studio AI Chat + Inventory Table benchmark, SaaS Dashboard, Progressive-Disclosure Settings, and Shotcandy 3D Canvas Studio.
- **Universal UX & Copywriting Rulebooks + Portable Kits (`@mehan/portable`)** — 4 official Astryx `ReferenceDoc` guides indexed for AI agents, plus standalone CSS/JS, Claude/Gemini AI Prototype Kits, and W3C DTCG `mehan-tokens.w3c.json` for Figma.

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
