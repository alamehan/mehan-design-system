# Mehan Design System (`v1.0.0`)

> **Calm tactile UI surfaces, 8 OKLCH atmospheres × 12 signature theme presets, a 4-Pillar 142-specimen component & runtime catalog, 5-in-1 Workspace Topology architecture, 12-chapter UX & Microcopy Playbook, and zero-setup portability — engineered cleanly on top of Meta Astryx (`@astryxdesign/core ~0.7.17`).**

- **Open Interactive Studio Online (Zero Install):** **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)**
- **Open Offline (`file://`):** Clone or download this repository and double-click **`STUDIO.html`** (100% self-contained single HTML file, zero external CDN requests).

![Why Mehan Design System Exists — Architectural Leverage on Meta Astryx](./assets/why-mehan-architecture.svg)

---

## Why Mehan Exists — Work Smart, Not From Scratch

Countless teams spend months redrawing buttons, dropdowns, and dialogs from zero (or buying cosmetic UI kits) that look appealing in static screenshots yet collapse in production: missing WAI-ARIA roles, broken modal focus traps, inaccessible keyboard navigation, broken `200%` browser zoom, and muddy dark-mode contrast.

When open behavioral foundations like **Meta Astryx** have already battle-tested **103 accessible primitives** across thousands of real-world applications, rebuilding `<Select>` or `<Dialog>` from scratch isn't craftsmanship — it is wasted effort. **Mehan Design System** takes the high-leverage architectural path:

1. **Keep the Behavioral Engine 100% Intact (`Meta Astryx ~0.7.17`):** Zero forked primitives. Focus management, roving tabindex, RTL, touch hit-targets, and strict CLI validation remain 100% native and safely upgradable.
2. **Sculpt Tactile Soul & Spatial Ergonomics on Top (`@mehan/dna` + `@mehan/astryx`):** Layer perceptual **OKLCH** 7-role surface materials (`socket < well < paper < tray < surface < raised < float`), 3-stop sculpted button lips, **8 atmospheres**, **10 brand accents**, **12 curated presets**, **35 universal workspace/creative extensions**, **4 runtime hook suites**, and **12 UX & Microcopy chapters** (`80` AI agent docs).
3. **Deliver Everywhere Without Lock-In (`@mehan/portable`):** Export the exact same active theme simultaneously to **React / Next.js / Tailwind CSS v4**, **Claude Artifacts & Gemini Canvas**, **Vanilla HTML / Vue / Svelte**, and **Figma W3C Design Tokens**.

---

## How Anyone Uses Mehan in 60 Seconds

You do **not** need a complex terminal setup just to explore or adopt Mehan:

1. **Open the Studio:** Visit **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)** in your browser *(or double-click `STUDIO.html` offline)*.
2. **Pick or Customize Your Theme:** Click any of the **12 Signature Theme Presets** right on the `Overview` tab (or click **`Theme Editor`** to tune atmosphere, OKLCH brand hex, 10 offline WOFF2 fonts, 3D button lip, and corner radii live across Light & Dark modes).
3. **Ship to Your Stack in 1 Click:**
   - **Prototyping in Claude / Gemini / ChatGPT / v0?** Click **`Copy AI Kit`** → paste into your AI chat → get an instant, tactile single-HTML app following all Mehan UX laws.
   - **Building a Production React, Next.js, or Vite App?** Click **`Copy Setup Prompt`** (paste into Cursor / Claude Code / Antigravity) or install directly from GitHub:
     ```bash
     pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "https://github.com/alamehan/mehan-design-system/raw/main/release/mehan-astryx-1.0.0.tgz"
     pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
     ```
     *(Or scaffold `src/mehan.css` + `src/MehanProvider.tsx` automatically from any Studio JSON export: `node ./bin/mehan.mjs init ./my-app --from mehan-confectionery-theme.json --github`).*
   - **Building in Vanilla HTML, Vue, Svelte, Astro, or Figma?** Click **`Copy Portable CSS`** / **`Download Starter HTML`**, or grab prebuilt files from [`release/`](./release) (`mehan-portable.css`, `mehan-portable.js`, `MEHAN-AI-PROTOTYPE-KIT.md`, `mehan-tokens.w3c.json`).

---

## 8 Tactile Atmospheres & 12 Signature Theme Presets

Inspired by *Shotcandy*'s tactile warmth and *Meta Astryx*'s theme explorations — re-engineered `200%` in perceptual OKLCH so **every Light & Dark surface pair** obeys strict 7-layer optical depth and passes **WCAG 2.2 AA**:

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

Mehan was not generated in a single pass; it was forged through 6 relentless cycles of critique, de-biasing, and verification:

1. **01 · Forensic Spark (`Meta's Engine × Shotcandy's Soul`):** Deconstructed why *Shotcandy*'s bespoke UI felt joyful while refusing to sacrifice enterprise WAI-ARIA compliance — choosing Meta Astryx as the zero-fork foundation.
2. **02 · Perceptual OKLCH Physics & Zero-Bias Audit (`@mehan/dna`):** Replaced ad-hoc hex tweaks with mathematical OKLCH shade ramps, monotonic 7-layer dark-mode depth, smooth 3-stop button gradients, and automated contrast locks across `112` `[Atmosphere × Accent]` pairs.
3. **03 · Unrestricted 3-Tier Live Theme Studio:** Expanded customization from basic sliders into a full 3-tier Docked Theme Editor (*Base Seeds → Component Slots → 8 Raw Token Groups*), 10 offline OFL WOFF2 fonts, and coalesced `Mod+Z` undo/redo.
4. **04 · Universal Spatial Distillation (`5-in-1` Workspaces):** Rejected bloated duplicate page templates in favor of a universal 3-level hierarchy (`AppShell` → `WorkspaceLayout` expressing 5 topologies in 1 → `CanvasStage`) with `<768px` auto-Drawer and `200%`-zoom scroll release.
5. **05 · 4-Pillar Catalog & 12-Chapter UX Playbook:** Structured all **142 live specimens** (`103` Core + `35` Mehan Extensions + `4` Runtime Suites) into 4 clear pillars alongside 12 bilingual (`ID`/`EN`) UX & Microcopy chapters (`80/80` CLI-verified agent docs).
6. **06 · Full-Sweep Tactile Polish & Universal Portability:** Audited 30+ subtle Core sub-targets (`ButtonGroup`, `Stepper`, `ResizeHandle`, `Calendar`, `ChatComposer`, overlays) so zero components felt raw, then packaged offline `STUDIO.html` and `release/*` tarballs.

---

## Repository Architecture & 6-Gate Verification (`pnpm verify`)

| Path | Package / Artifact | Role |
|---|---|---|
| [`packages/dna`](./packages/dna) | `@mehan/dna` | Zero-DOM OKLCH color math, 8 atmospheres, 10 accents, WCAG 2.2 AA auditor, history store, `Intl` formatters, file validator, and W3C token exporter. |
| [`packages/astryx`](./packages/astryx) | `@mehan/astryx` | Official Meta Astryx provider (`createMehanTheme`), 8 prebuilt themes, 35 universal extensions & workspaces, 4 runtime hook suites, 10 WOFF2 fonts, and 80 AI docs. |
| [`packages/portable`](./packages/portable) | `@mehan/portable` | Framework-agnostic `.mh-*` CSS generator (`8 × 10` matrix), progressive JS runtime, AI Prototype Kit generator, and CDN starter builder. |
| [`apps/studio`](./apps/studio) | `@mehan/studio` | Bilingual (`ID`/`EN`) interactive Studio, 12-preset live gallery, 3-tier Theme Editor, 142-specimen catalog, 5-in-1 topologies, and 12-chapter UX Playbook. |
| [`release/`](./release) | Distributables | Pre-packed tarballs (`mehan-dna-1.0.0.tgz`, `mehan-astryx-1.0.0.tgz`, `mehan-portable-1.0.0.tgz`), Portable CSS/JS, AI Kit, CDN HTML, and W3C tokens. |

Run `pnpm install && pnpm verify` (or double-click `rebuild-and-check-windows.cmd` / `rebuild-and-check-mac-linux.command`) to execute all 6 automated gates: full workspace build, strict `tsc --noEmit`, Vitest mathematical & CLI E2E proofs, `astryx integration check --strict --next`, `astryx integration verify`, and Playwright + `axe` WCAG 2.2 AA visual audits.

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
