# Mehan Design System (`v1.0.0`)

> **Silky-smooth tactile UI architecture, universal UX & microcopy standards, and zero-setup portability — built cleanly on Meta Astryx (`@astryxdesign/core ~0.7.17`).**

Mehan Design System pairs **Meta Astryx's** accessible behavioral engine (75+ WAI-ARIA primitives, focus traps, keyboard models, touch ergonomics, and strict CLI validator) with **Mehan's** signature tactile physicality and product UX discipline:

- **6 Parametric Knobs (`@mehan/dna`)** — `atmosphere` (`confectionery`, `porcelain`, `stone`), `accent` (6 curated presets or **any `#rrggbb` custom hex** with automatic WCAG AA contrast solving `>= 4.5:1`), `depth` (`0.5x–1.5x`), `radiusScale` (`0.75x–1.25x`), `density` (`standard` `36px` / `compact` `32px`, auto-expanding to `44px` on coarse touch screens), and `motion` (`expressive`, `standard`, `calm`).
- **Silky Tactile Surface Physics** — Smooth 3-stop perceptual OKLCH primary button gradients with a 1-shade-darker bottom lip (zero harsh cliff), optical vertical face centering, soft-tactile destructive actions, borderless recessed input wells (zero `1px` corner seam), `6%` feathered card hairlines, 4-layer progressive drop shadows, and 46-surface nested contrast resets.
- **4 Signature Precision Controls (`@mehan/astryx`)** — `ColorSwatch` (3D specular gloss), `ColorPicker` (2D HSV + hex + native `EyeDropper`), `PrecisionSlider` (`Shift` `0.25x` fine-drag, magnetic stops, bipolar center fill, click-to-type mono readout), and `MetricCard` (`tabular-nums` KPI bento).
- **Universal UX & Copywriting Rulebooks** — 4 official Astryx `ReferenceDoc` guides (`mehan-design-rules`, `mehan-ux-complexity`, `mehan-copy-and-states`, `mehan-page-archetypes`) automatically indexed into consumer `AGENTS.md` / `CLAUDE.md` via `astryx init --features agents`, and mirrored in `MEHAN-AI-PROTOTYPE-KIT.md`.
- **Dual-Engine Portability & W3C Figma Tokens (`@mehan/portable`)** — Compiles the exact same `@mehan/dna` math into standalone CSS/JS, single-HTML Claude Artifacts / Gemini Canvas kits, CDN starters, and standard W3C DTCG `mehan-tokens.w3c.json`.

---

## 1-Door Zero-Terminal Hub (`STUDIO.html`)

You do not need a terminal to explore, customize, install, or maintain Mehan:

1. **Double-click `STUDIO.html`** directly in Windows Explorer, macOS Finder, or Linux Files (works 100% offline over `file://`).
2. Switch between **Bahasa Indonesia (`ID`)** and **English (`EN`)** and toggle **Light / Dark** in the top bar.
3. Explore all 5 self-explaining workspaces:
   - **`Overview` (`Ringkasan`)** — 30-second visual architecture map + 1-click setup prompts & commands for AI chat prototypes, React/Next.js/Vite (Local `D:\` `.tgz` or Public `npm`, Plain CSS or Tailwind CSS v4), and Vanilla/Vue/Svelte.
   - **`Components` (`Komponen`)** — Interactive specimen gallery across buttons, recessed inputs, precision sliders, pastel cards, tables, banners, and modals.
   - **`UX & Copy` (`UX & Bahasa`)** — Side-by-side visual **Do vs. Don't** comparisons for action hierarchy, progressive disclosure, semantic boundaries, recovery states, and sentence-case microcopy.
   - **`Patterns` (`Pola Halaman`)** — Production SaaS Operations Dashboard, Clean Progressive-Disclosure Settings, and Shotcandy 3D Canvas Studio.
   - **`Maintain` (`Perawatan`)** — 1-click Agent handoffs to commit custom themes, safely test Meta Astryx upgrades, switch npm scopes (`@mehan/*` ⇄ `@alamehan/*`), and export W3C Figma tokens.
4. Click **`Customize` (`Sesuaikan`)** to open the live 6-knob studio drawer with **Named Project Presets**, **JSON Import/Export**, and live WCAG AA contrast badges.

### Zero-Terminal Double-Click Scripts (Windows, macOS & Linux)

| Action | Windows | macOS / Linux |
|---|---|---|
| Open interactive Studio offline | `STUDIO.html` | `STUDIO.html` |
| Start live Vite dev server | `dev-windows.cmd` | `dev-mac-linux.command` |
| Full rebuild + 6-gate verification | `rebuild-and-check-windows.cmd` | `rebuild-and-check-mac-linux.command` |

---

## Monorepo Layout

```text
mehan-design-system/
├── STUDIO.html                         # Self-contained offline 1-door Hub (ID/EN)
├── rebuild-and-check-windows.cmd       # Double-click full build & 6-gate verifier (Windows)
├── rebuild-and-check-mac-linux.command # Double-click full build & 6-gate verifier (macOS/Linux)
├── bin/mehan.mjs                       # Cross-OS CLI (`init`, `ai-kit`, `tokens`, `set-scope`)
├── release/                            # Pre-packed local install & portable bundle
│   ├── mehan-astryx-1.0.0.tgz          # Offline-ready npm tarball (works before npm publish!)
│   ├── mehan-portable.css              # Zero-dep CSS (~7 KB, all atmospheres & accents)
│   ├── mehan-portable.js               # Progressive vanilla JS runtime
│   ├── MEHAN-AI-PROTOTYPE-KIT.md       # 1-click Claude Artifacts / Gemini Canvas prompt kit
│   ├── mehan-astryx-cdn.html           # Zero-bundler React + Astryx single-HTML CDN starter
│   └── mehan-tokens.w3c.json           # W3C DTCG tokens for Figma / Style Dictionary
├── packages/
│   ├── dna/                            # @mehan/dna — OKLCH math, 6 knobs, contrast solver, W3C export
│   ├── astryx/                         # @mehan/astryx — Themes, 4 precision controls, 4 UX/Copy docs
│   └── portable/                       # @mehan/portable — Standalone CSS/JS & AI Prototype Kit generator
├── apps/
│   └── studio/                         # @mehan/studio — React 19 + Vite source compiling STUDIO.html
└── tests/                              # Vitest optical/contrast unit tests + Playwright file:// & axe gates
```

---

## Installing in Any Project

### Path A — One-Command Setup (`bin/mehan.mjs init`)

Works on empty or existing React, Next.js, Vite, Tailwind CSS v4, or non-React folders:

```bash
node "D:/mehan-design-system/bin/mehan.mjs" init ./my-app --atmosphere confectionery --accent strawberry
```

- Auto-detects `tailwindcss` in `package.json` (or pass `--tailwind`) and writes the required `@layer reset, theme, base, astryx-base, astryx-theme, components, utilities;` + `@astryxdesign/core/tailwind-theme.css` cascade.
- Generates `MehanProvider.tsx` including `MEHAN_THEME_INIT_SCRIPT` to prevent dark-mode FOUC in Next.js / SSR.
- Defaults to installing the local `release/mehan-astryx-1.0.0.tgz` tarball so local projects work **today** without waiting for `npm publish` (pass `--npm` once published).

### Path B — Direct Package Install (React / Next.js / Vite)

```bash
# Local tarball (works offline today):
pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "D:/mehan-design-system/release/mehan-astryx-1.0.0.tgz"
pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
```

### Path C — AI Prototyping & Non-React Stacks

- **Claude Artifacts / Gemini Canvas:** Click **Copy AI Kit** in `STUDIO.html` (or copy `release/MEHAN-AI-PROTOTYPE-KIT.md`) and paste into your AI chat.
- **Vanilla HTML / Vue / Svelte / Astro:** Copy `release/mehan-portable.css` and `release/mehan-portable.js`.
- **Figma / Style Dictionary:** Import `release/mehan-tokens.w3c.json` (or export any custom theme from `STUDIO.html -> Maintain`).

---

## Versioning, Scope Switching & 6-Gate Verification

- **Locked Upstream Safety:** `@astryxdesign/core` and `@astryxdesign/cli` are locked to `~0.7.17`. Patch fixes (`0.7.x`) stay compatible; major upstream changes (`0.8+` / `1.0`) never affect existing projects until verified via `pnpm verify`.
- **Custom NPM Scope:** Switch `@mehan/*` to your own npm scope (e.g. `@alamehan/*`) in one step:
  ```bash
  node bin/mehan.mjs set-scope @alamehan
  pnpm install && pnpm verify
  ```
- **Full 6-Gate Verification:**
  ```bash
  pnpm verify
  ```
  Runs: (1) Full workspace build + `STUDIO.html` + `release/` tarball, (2) TypeScript `tsc --noEmit`, (3) Vitest optical depth, smooth lip `ΔL`, & WCAG contrast laws, (4) `astryx integration check --strict --next`, (5) `astryx integration verify`, and (6) Playwright headless Chromium over `file://` (`1366×900` Light/Dark + `375×812` Mobile + zero `axe` `color-contrast` violations).

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
