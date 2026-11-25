# Mehan Design System (`v1.0.0`)

> **Calm tactile UI surfaces, perceptual OKLCH atmospheres & curated theme presets, a 4-Pillar component & runtime catalog, 5-in-1 Workspace Topology architecture, bilingual UX & Evergreen Microcopy Playbook, and zero-setup portability — engineered cleanly on top of Meta Astryx (`@astryxdesign/core ~0.7.17`).**

- **Open Interactive Studio Online (Zero Install):** **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)** *(deployed automatically via [`.github/workflows/deploy-studio.yml`](./.github/workflows/deploy-studio.yml))*
- **Open Offline (`file://`):** Clone or download this repository and double-click **[`STUDIO.html`](./STUDIO.html)** (100% self-contained single HTML file, bundled WOFF2 fonts, zero external CDN requests).

![Why Mehan Design System Exists — Architectural Leverage on Meta Astryx](./assets/why-mehan-architecture.svg)

---

## Why Mehan Exists — Work Smart, Not From Scratch

Countless teams spend months redrawing buttons, dropdowns, and dialogs from zero (or buying cosmetic UI kits) that look appealing in static screenshots yet collapse in production: missing WAI-ARIA roles, broken modal focus traps, inaccessible keyboard navigation, broken `200%` browser zoom, and muddy dark-mode contrast.

When open behavioral foundations like **Meta Astryx** already ship battle-tested accessible primitives across real-world applications, rebuilding `<Selector>` or `<Dialog>` from scratch isn't craftsmanship — it is wasted effort. **Mehan Design System** takes the high-leverage architectural path:

1. **Keep the Behavioral Engine 100% Intact (`Meta Astryx ~0.7.17`):** Zero forked primitives. Focus management, roving tabindex, RTL, touch hit-targets, and strict CLI validation remain 100% native and safely upgradable.
2. **Sculpt Tactile Soul & Spatial Ergonomics on Top (`@mehan/dna` + `@mehan/astryx`):** Layer perceptual **OKLCH** 7-role surface materials (`socket < well < paper < tray < surface < raised < float`), 3-stop sculpted button lips, curated atmospheres & signature presets, universal `5-in-1` workspace topologies, runtime state suites, and bilingual (`ID`/`EN`) UX & Evergreen Copy laws.
3. **Deliver Everywhere Without Lock-In (`@mehan/portable`):** Export the exact same active theme simultaneously to **React / Next.js / Tailwind CSS v4**, **Claude Artifacts & Gemini Canvas**, **Vanilla HTML / Vue / Svelte**, and **Figma W3C Design Tokens**.

---

## Start in 60 Seconds

You do **not** need a complex terminal setup to explore, customize, or adopt Mehan:

1. **Open the Studio:** Visit **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)** in your browser *(or double-click [`STUDIO.html`](./STUDIO.html) offline)*.
2. **Pick or Customize Your Theme:** Click any **Signature Theme Preset** right on the `Overview` tab — each card previews its real typography, corner geometry, and 3D lip physics live — or open **`Theme Editor`** (`Mod+.`) to tune atmosphere, OKLCH brand hex, offline WOFF2 fonts, and component slots across Light & Dark modes.
3. **Copy 1-Click Output for Your Stack:**
   - **AI Chat Prototyping (Claude / Gemini / ChatGPT / v0):** Click **`Copy AI Kit`** → paste into your AI chat → generate a tactile single-HTML artifact governed by Mehan's UX laws.
   - **Production React, Next.js, or Vite:** Click **`Copy Setup Prompt`** (paste into Cursor / Claude Code / Antigravity) or install directly from GitHub:
     ```bash
     pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "https://github.com/alamehan/mehan-design-system/raw/main/release/mehan-astryx-1.0.0.tgz"
     pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
     ```
     *(Or scaffold `src/mehan.css` + `src/MehanProvider.tsx` automatically from any Studio JSON export: `node ./bin/mehan.mjs init ./my-app --from mehan-confectionery-theme.json --github`).*
   - **Vanilla HTML, Vue, Svelte, Astro, or Figma:** Click **`Copy Portable CSS`**, **`Download Starter HTML`**, or **`Figma W3C Tokens`**, or grab prebuilt files from [`release/`](./release).

---

## Signature Theme Presets & OKLCH Atmospheres

Inspired by *Shotcandy*'s tactile warmth and *Meta Astryx*'s theme explorations — re-engineered in perceptual OKLCH so **every Light & Dark surface pair** obeys strict 7-layer optical depth and passes **WCAG 2.2 AA**:

| Preset | Atmosphere | Accent | Typography (Heading / Body) | Character |
|---|---|---|---|---|
| **Confectionery** *(Default)* | `confectionery` | Strawberry | `Bricolage Grotesque` / `Figtree` | Warm cream paper & 3D berry candy lip |
| **Shotcandy 1:1** | `confectionery` | Strawberry | `Bricolage Grotesque` / `Figtree` | Compact `32px` rhythm & espresso active pills |
| **Sunlit Butter** | `butter` | Cobalt | `Outfit` / `Outfit` | Cultured buttercream canvas & electric ultramarine CTA |
| **Kyoto Matcha** | `matcha` | Matcha | `Bricolage Grotesque` / `Figtree` | Ceremonial sage washi, cedar moss dark & calm motion |
| **Artisanal Cacao** | `cacao` | Cacao | `Fraunces` / `Albert Sans` | Oat-latte parchment, roasted cacao & literary serif |
| **Cloud Y2K Pop** | `periwinkle` | Grape | `Poppins` / `Poppins` | Iridescent lavender-ice & playful holographic pills |
| **Obsidian Linear** | `obsidian` | Indigo (`#4f46e5`) | `Albert Sans` / `JetBrains Mono` | Titanium mist & carbon noir with crisp `0.75x` geometry |
| **Porcelain SaaS** | `porcelain` | Blueberry | `Albert Sans` / `Figtree` | Crisp ice-white & midnight slate for dense SaaS |
| **Stone Editorial** | `stone` | Teal | `Fraunces` / `Figtree` | Sandstone alabaster & quiet teal for AI workspaces |
| **Solar Citrus** | `butter` | Tangerine | `Bricolage Grotesque` / `Outfit` | Golden warmth paired with energetic burnt citrus |
| **Nordic Fjord** | `porcelain` | Teal | `Montserrat` / `Figtree` | Clinical fintech & analytics precision |
| **Velvet Crimson** | `stone` | Crimson | `Fraunces` / `Figtree` | Editorial alabaster & ruby carmine contrast |

---

## How Mehan Was Forged — 6 Disciplined Iteration Loops

1. **01 · Forensic Spark (`Meta's Engine × Shotcandy's Soul`):** Deconstructed why *Shotcandy*'s bespoke UI felt joyful while refusing to sacrifice WAI-ARIA compliance — choosing Meta Astryx as the zero-fork foundation.
2. **02 · Perceptual OKLCH Physics & Zero-Bias Audit (`@mehan/dna`):** Replaced ad-hoc hex tweaks with mathematical OKLCH shade ramps, monotonic 7-layer dark-mode depth, smooth 3-stop button gradients, and automated WCAG 2.2 AA contrast locks.
3. **03 · Unrestricted 3-Tier Live Theme Studio:** Expanded customization into a 3-tier Docked Theme Editor (*Base Seeds → Component Slots → Raw Token Groups*), bundled OFL WOFF2 fonts, and coalesced `Mod+Z` undo/redo.
4. **04 · Universal Spatial Distillation (`5-in-1` Workspaces):** Distilled repetitive page templates into a universal 3-level hierarchy (`AppShell` → `WorkspaceLayout` expressing 5 topologies in 1 → `CanvasStage`) with `<768px` auto-Drawer and `200%`-zoom scroll release.
5. **05 · 4-Pillar Taxonomy & Evergreen UX Playbook:** Structured the interactive catalog into 4 architectural pillars alongside bilingual (`ID`/`EN`) UX, Evergreen Copywriting, and 4-Step Extension Ladder laws indexed by `@astryxdesign/cli`.
6. **06 · Full-Sweep Tactile Polish & Universal Portability:** Polished Core sub-targets (`Collapsible`, `Selector`, `Code`, `ButtonGroup`, `Stepper`, `ResizeHandle`, `Calendar`, `ChatComposer`) so zero primitives feel raw, then packaged offline [`STUDIO.html`](./STUDIO.html) and [`release/`](./release) artifacts.

---

## Repository Architecture & Governance

| Path | Package / Artifact | Role |
|---|---|---|
| [`packages/dna`](./packages/dna) | `@mehan/dna` | Zero-DOM OKLCH color math, atmospheres & accents, WCAG 2.2 AA auditor, history store, `Intl` formatters, file validator, and W3C token exporter. |
| [`packages/astryx`](./packages/astryx) | `@mehan/astryx` | Official Meta Astryx provider (`createMehanTheme`), prebuilt themes, universal workspace/creative extensions, runtime hooks, WOFF2 fonts, and AI agent docs. |
| [`packages/portable`](./packages/portable) | `@mehan/portable` | Framework-agnostic `.mh-*` CSS generator, progressive JS runtime, AI Prototype Kit generator, and standalone HTML starter builder. |
| [`apps/studio`](./apps/studio) | `@mehan/studio` | Bilingual (`ID`/`EN`) interactive Studio, live preset gallery, 3-tier Theme Editor, 4-pillar catalog, 5-in-1 topologies, and UX Playbook. |
| [`release/`](./release) | Distributables | Pre-packed tarballs (`mehan-dna-1.0.0.tgz`, `mehan-astryx-1.0.0.tgz`, `mehan-portable-1.0.0.tgz`), Portable CSS/JS, AI Kit, CDN HTML, and W3C tokens. |
| [`AGENTS.md`](./AGENTS.md) · [`CLAUDE.md`](./CLAUDE.md) | Governance | Multi-agent architectural invariants, 4-Step Extension Ladder, 3-Bucket Evergreen Copywriting, Visual QA mandate, and 6-gate `pnpm verify` workflow. |

Run `pnpm install && pnpm verify` (or [`rebuild-and-check-windows.cmd`](./rebuild-and-check-windows.cmd) / [`rebuild-and-check-mac-linux.command`](./rebuild-and-check-mac-linux.command)) to execute all 6 automated verification gates.

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
