# Mehan Design System (`v1.0.0`)

> **A warm, tactile design system crafted for modern web apps and AI workflows — built with Product Design care by [M. Raihan Rafiiful Allaam (`@alamehan`)](https://alamehan.github.io) on top of [Meta Astryx](https://astryx.atmeta.com).**

- **Open Interactive Studio Online (Zero Install):** **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)** *(deployed automatically via [`.github/workflows/deploy-studio.yml`](./.github/workflows/deploy-studio.yml))*
- **Open Offline (`file://`):** Clone or download this repository and double-click **[`STUDIO.html`](./STUDIO.html)** (100% self-contained single HTML file, bundled offline fonts, zero external network calls).

![Why Mehan Design System Exists — Smart Foundation, Original Design Craft](./assets/why-mehan-architecture.svg)

---

## Why Mehan Exists — Smart Foundation, Dedicated Craft

Countless teams build design systems from scratch — or buy static UI kits — just to get a fresh look, only to lose months rebuilding buttons, dropdowns, and dialogs that look nice in mockups yet break in real use: stuck keyboard navigation, broken modal focus, mobile overflow, and muddy dark-mode contrast.

**Mehan Design System** takes a smarter, higher-craft path:

1. **Stand on a Proven Giant ([Meta Astryx](https://astryx.atmeta.com) · [`meta/astryx`](https://github.com/meta/astryx)):** Astryx is Meta's official open-source design system forged over **8 years across 13,000+ internal applications**, engineered for both React developers and **AI coding agents** (`@astryxdesign/core` & `@astryxdesign/cli`). Mehan keeps 100% of that battle-tested foundation intact without breaking or forking a single core component.
2. **Pour 100% of Original Craft into How Products Feel (`@mehan/dna` + `@mehan/astryx`):** Sparked by the joy of warm creative tools like *Shotcandy*, Mehan was designed and engineered end-to-end with an original perceptual color & contrast engine, **8 surface atmospheres**, **12 ready-made visual themes**, **35+ extra workspace & creative components** (`5-in-1` app layouts, charts, color/gradient pickers, editors, auto-saved drafts), bundled offline typefaces, and a **12-chapter bilingual (`ID`/`EN`) UX & interface writing guide**.
3. **Use Anywhere in One Click (`@mehan/portable`):** Export the exact same active theme simultaneously to **Claude / Gemini AI Chat**, **React / Next.js / Tailwind CSS v4**, **Vanilla HTML / Vue / Svelte**, and **Figma Design Tokens**.

---

## Start in 60 Seconds

You do **not** need a terminal setup to explore, customize, or use Mehan:

1. **Open the Studio:** Visit **[alamehan.github.io/mehan-design-system](https://alamehan.github.io/mehan-design-system/)** *(or double-click [`STUDIO.html`](./STUDIO.html) offline)*.
2. **Pick or Craft Your Look:** Click any of the **12 Ready-Made Themes** right on `Overview` — each card renders its own real fonts and tactile 3D button style live — or open **`Theme Editor`** (`Ctrl/⌘ + .`) to customize colors, fonts, and corners across Light & Dark modes.
3. **Copy 1-Click Output for Your Stack:**
   - **AI Chat Prototyping (Claude / Gemini / ChatGPT / v0):** Click **`Copy AI Kit`** → paste into your AI chat → get a complete, warm single-HTML app following Mehan's layout & UX rules.
   - **Production React, Next.js, or Vite:** Click **`Copy Setup Prompt`** (paste into Claude Code / Cursor / Antigravity) or install directly from GitHub:
     ```bash
     pnpm add @astryxdesign/core@~0.7.17 @stylexjs/stylex@^0.19.0 lucide-react "https://github.com/alamehan/mehan-design-system/raw/main/release/mehan-astryx-1.0.0.tgz"
     pnpm add -D @astryxdesign/cli@~0.7.17 && pnpm exec astryx init --features agents
     ```
     *(Or scaffold `src/mehan.css` + `src/MehanProvider.tsx` automatically from any Studio JSON export: `node ./bin/mehan.mjs init ./my-app --from mehan-confectionery-theme.json --github`).*
   - **Vanilla HTML, Vue, Svelte, Astro, or Figma:** Click **`Copy Portable CSS`**, **`Download Starter HTML`**, or **`Figma W3C Tokens`**, or grab prebuilt files from [`release/`](./release).

---

## 12 Ready-Made Themes Across 8 Color Atmospheres

Every theme computes Light & Dark surface layers and button contrast mathematically so readability passes **WCAG 2.2 AA** out of the box:

| Theme | Character | Atmosphere | Typography (Heading / Body) | Feel |
|---|---|---|---|---|
| **Confectionery** *(Default)* | Signature Default | `confectionery` | `Bricolage Grotesque` / `Figtree` | Warm cream paper & friendly berry-pink 3D buttons |
| **Espresso Berry** | Tactile Compact | `confectionery` | `Bricolage Grotesque` / `Figtree` | Compact `32px` sizing & bold espresso active tabs |
| **Sunlit Butter** | Warm & Bright | `butter` | `Outfit` / `Outfit` | Sunny buttercream canvas & crisp cobalt buttons |
| **Kyoto Matcha** | Calm & Organic | `matcha` | `Bricolage Grotesque` / `Figtree` | Soft sage-tea paper & deep moss dark mode |
| **Artisanal Cacao** | Editorial Serif | `cacao` | `Fraunces` / `Albert Sans` | Warm oat-latte canvas, roasted cacao & literary serif |
| **Cloud Y2K Pop** | Playful & Soft | `periwinkle` | `Poppins` / `Poppins` | Airy lavender-ice & playful rounded geometry |
| **Obsidian Linear** | Sleek Engineering | `obsidian` | `Albert Sans` / `JetBrains Mono` | Titanium mist & carbon black with crisp `0.75x` corners |
| **Porcelain SaaS** | Clean Enterprise | `porcelain` | `Albert Sans` / `Figtree` | Crisp white & classic blue for data-heavy apps |
| **Stone Editorial** | Quiet Workspace | `stone` | `Fraunces` / `Figtree` | Warm sandstone & calm teal for reading and AI tools |
| **Solar Citrus** | Creative Studio | `butter` | `Bricolage Grotesque` / `Outfit` | Golden warmth paired with vibrant tangerine energy |
| **Nordic Fjord** | Crisp Analytics | `porcelain` | `Montserrat` / `Figtree` | High-clarity porcelain & cool fjord teal for fintech |
| **Velvet Crimson** | Bold Culture | `stone` | `Fraunces` / `Figtree` | Soft alabaster stone paired with rich ruby contrast |

---

## Repository Architecture & Governance

| Path | Package / Artifact | Role |
|---|---|---|
| [`packages/dna`](./packages/dna) | `@mehan/dna` | Perceptual color & contrast engine, atmospheres & accents, history store, `Intl` formatters, file validator, and Figma W3C token exporter. |
| [`packages/astryx`](./packages/astryx) | `@mehan/astryx` | Official Meta Astryx theme provider (`createMehanTheme`), prebuilt themes, workspace & creative components, runtime hooks, offline fonts, and AI agent docs. |
| [`packages/portable`](./packages/portable) | `@mehan/portable` | Standalone `.mh-*` CSS generator, progressive JS runtime, AI Prototype Kit generator, and zero-bundler HTML starter builder. |
| [`apps/studio`](./apps/studio) | `@mehan/studio` | Bilingual (`ID`/`EN`) interactive Studio, live theme gallery, 3-tier Theme Editor, component catalog, `5-in-1` workspace layouts, and UX guide. |
| [`release/`](./release) | Distributables | Pre-packed tarballs (`mehan-dna-1.0.0.tgz`, `mehan-astryx-1.0.0.tgz`, `mehan-portable-1.0.0.tgz`), Portable CSS/JS, AI Kit, CDN HTML, and W3C tokens. |
| [`AGENTS.md`](./AGENTS.md) · [`CLAUDE.md`](./CLAUDE.md) | Governance | Multi-agent engineering rules, 4-Step Extension Ladder, Evergreen Copywriting, Visual QA mandate, and 6-gate `pnpm verify` pipeline. |

Run `pnpm install && pnpm verify` (or [`rebuild-and-check-windows.cmd`](./rebuild-and-check-windows.cmd) / [`rebuild-and-check-mac-linux.command`](./rebuild-and-check-mac-linux.command)) to execute all 6 automated verification gates.

---

## Author & License

Created and designed by **M. Raihan Rafiiful Allaam (`@alamehan`)** — *Product Designer & Product Engineer* ([alamehan.github.io](https://alamehan.github.io)).

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
