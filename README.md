# Mehan Design System (`v1.0.0`)

> **Silky-smooth tactile UI surfaces, unrestricted Meta Astryx theming, 131-specimen 12-category component catalog, 12-chapter UX & Microcopy Playbook, and zero-setup portability — built cleanly on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System pairs **Meta Astryx's** accessible behavioral engine (103 WAI-ARIA primitives across 12 official categories, focus traps, keyboard models, touch ergonomics, and strict CLI validator) with **Mehan / Shotcandy's** tactile physicality, **28 universal Mehan extension components**, and universal UX discipline:

- **Parametric Seed + Unrestricted Open Theme Engine (`@mehan/dna` + `@mehan/astryx`)** — Tune fast parametric DNA seeds (`atmosphere`: `confectionery | porcelain | stone`, `accent`: 6 boiled-sweet OKLCH presets or any `#rrggbb`, `lipStyle`: `'candy' | 'subtle' | 'flat'`, `segmentedStyle`: `'raised' | 'espresso'` for Shotcandy's inverted `#2a1f1a` / `#fbefe4` active pill, `wellStyle`: `'recessed' | 'bordered'`, `depth`, `typeBase` incl. `13.5px`, `typeRatio`, `headingFont`, `bodyFont`, `codeFont`, `spacingBase`, `radiusBase`, `sizeBase`, `motion`, `durationStep`) **plus** unrestricted raw Astryx `tokens`, `localTokens`, and deep-merged `components` overrides in `createMehanTheme()`, backed by `createHistoryStore()` coalesced Undo/Redo, OKLCH contrast/harmony auditors, and locale-memoized `Intl` formatters.
- **Docked 3-Tier Theme Editor + 10 Offline-Bundled WOFF2 Typefaces** — Chunked split-pane Theme Editor (`Base Styles`, `Components`, `Advanced`) featuring `Undo`/`Redo` (`Ctrl+Z`/`Ctrl+Shift+Z`), **10 self-hosted OFL-1.1 WOFF2 font families** (`Bricolage Grotesque`, `Figtree`, `Albert Sans`, `Outfit`, `Poppins`, `Montserrat`, `Fraunces`, `Crimson Text`, `Geist Mono`, `JetBrains Mono`) that switch live offline over `file://`, multi-target Component Token slots, inline Custom CSS Override editing, and bidirectional `.json` / `.ts` Import & Export.
- **Complete 12-Category Interactive Component Catalog (131 Live Specimens: 103 Core + 28 Mehan Universal Components)** — Focused category-first navigation across Meta Astryx's 12 official categories (`Action`, `Chat`, `Container`, `Content`, `Data Visualization`, `Feedback & Status`, `Form Controls`, `Layout`, `Navigation`, `Overlay`, `Table & List`, `Utility`) including all 28 `@mehan/astryx` components (`ColorSwatch`, `ColorPicker` + Alpha, `ColorWell`, `PrecisionSlider`, `AngleDial`, `GradientPicker`, `AnchorMatrix`, `SplitButton`, `CopyButton`, `ThemeSwitch`, `MiddleTruncate`, `DigitEntry`/`OtpInput`, `Rating`, `ImageWell`, `ErrorSummary`, `InlineConfirm`, `InlineMessage`, `MetricCard`, `Sparkline`, `Gauge`, `ActivityRing`, `Timeline`, `TimelineScrubber`, `CanvasZoomBar`, `CodeEditor`, `MarkdownEditor`, `NotificationCenter`, and `Tour`).
- **Official Meta Astryx `Theme Showcase` + Production Templates** — Stress-test any theme live against the official Astryx Storefront + Checkout + Studio AI Chat + Inventory Table benchmark, SaaS Dashboard, Progressive-Disclosure Settings, and Shotcandy 3D Canvas Studio.
- **Interactive 12-Chapter UX & Microcopy Playbook (`01`–`12`, incl. `U1`–`U6`) + Portable Kits (`@mehan/portable`)** — Covers Grouping & Chunking, 4-Tier Progressive Disclosure, Truncation & Numerals, Action Hierarchy, 5 System Recovery States, Bilingual Microcopy, **U1** Keyboard/Shortcut Grammar & Layered `Esc` Precedence, **U2** Coarse-Pointer `44px` / `200%` Zoom / High-Contrast & Print Hygiene, **U3** *Reward Early, Punish Late* Form Validation & 3-Tier Confirmation, **U4** 9-Tier Line Budget & Scroll-Chaining Split, **U5** 4-Tier Motion Choreography & Reduced-Motion Nuance, and **U6** `+30–40%` Text-Expansion Resilience & `Intl` Formatting — backed by **65 AI-indexed Astryx docs**, Portable CSS/JS, and W3C Figma tokens.

---

## 1-Door Zero-Terminal Hub (`STUDIO.html`)

1. **Double-click `STUDIO.html`** directly in Explorer / Finder / Files (100% offline `file://`, zero external CDN calls).
2. Switch **Bahasa Indonesia (`ID`) / English (`EN`)** and **Light / Dark** in the top bar.
3. Explore all 5 workspaces (`Overview`, `Components`, `Templates`, `UX & Copy`, `Maintain`) while docking **`Theme Editor`** side-by-side for live split-pane customization.

### Zero-Terminal Double-Click Scripts (Windows, macOS & Linux)

| Action | Windows | macOS / Linux |
|---|---|---|
| Open interactive Studio offline | `STUDIO.html` | `STUDIO.html` |
| Start live Vite dev server | `dev-windows.cmd` | `dev-mac-linux.command` |
| Full rebuild + multi-gate verification | `rebuild-and-check-windows.cmd` | `rebuild-and-check-mac-linux.command` |

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

## Full Automated Verification (`pnpm verify`)

```bash
pnpm verify
```

Runs:
1. **Workspace Build & Singlefile Bundling:** `@mehan/dna`, `@mehan/astryx`, `@mehan/portable`, root offline `STUDIO.html`, and `release/mehan-astryx-1.0.0.tgz`.
2. **Strict TypeScript (`tsc --noEmit`):** 4 workspace packages + root test suites (`0` errors).
3. **Vitest Unit & Mathematical Token Suite (`24/24`):** 30-palette `[Atmosphere × Accent]` WCAG AA + 3-stop gradient-band contrast audit, OKLCH harmonies, `createHistoryStore` coalescing/undo/redo, `Intl` formatters, `formatGradientCss`, Portable CSS media rules, and repo/tarball export drift lock.
4. **`astryx integration check --strict --next`:** `65/65` docs verified, `28/28` components verified, `197/197` prop types judged (`0` errors, `0` warnings).
5. **`astryx integration verify`:** `283` packed files, `125/125` required files verified.
6. **Playwright Headless Chromium Suite (`9/9` E2E specs across 6 files over `file://`):** Theme Editor knob-by-knob `getComputedStyle` proof, interactive Tier 1 (`8`), Tier 2 (`6`), and Tier 3 (`10`) component proofs, 12-category Light/Dark `assertMehanDomFit` + keyboard `Tab` focus-ring reachability audit (`ringless === 0`), 12-chapter bilingual (`ID`/`EN`) UX Playbook proof, Extreme Parametric Seed stress test (`16px` / `1.333` / `XL` radius on Desktop `1366×900` & Mobile `375×812`), `forced-colors` / `prefers-reduced-motion` / `@media print` hygiene, zero external network requests, and full WCAG 2.2 AA `axe` (`wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`).

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
