# Mehan Design System (`v1.0.0`)

> **Warm, tactile, parametric UI architecture built on Meta Astryx (`@astryxdesign/core`) — plus a zero-dependency Portable & AI Prototype Kit for single-HTML artifacts and any web stack.**

Mehan Design System combines **Meta Astryx's** accessible behavioral primitives, focus management, adaptive touch ergonomics, and agent-ready documentation engine with **Mehan's** signature tactile physicality:

- **3 Neutral Atmospheres** — **Confectionery** (Warm Cream ⇄ Roasted Espresso), **Porcelain** (Crisp White ⇄ Midnight Slate), and **Stone** (Editorial Alabaster ⇄ Warm Charcoal), all enforcing strict dark-mode optical depth (`socket < well < paper < tray < surface < raised`).
- **Parametric OKLCH Brand Accents** — 6 curated presets (`strawberry`, `blueberry`, `mint`, `tangerine`, `grape`, `teal`) or **any custom `#rrggbb` hex seed** with automatic WCAG AA contrast solving (`>= 4.5:1` across Light and Dark modes).
- **7-Role Tactile Material Physics** — Fixed-height lip-collapse 3D push buttons, 12-target recessed input wells, recessed sockets with spherical 3D dome knobs, and warm pastel cards with nested surface contrast protection.
- **4 Signature Precision Extensions (`@mehan/astryx`)** — `ColorSwatch` (boiled-sweet 3D specular gloss), `ColorPicker` (2D HSV + hex + native EyeDropper), `PrecisionSlider` (`Shift` `0.25x` fine-drag, magnetic stops, bipolar center fill, click-to-type mono value), and `MetricCard` (tabular-nums KPI bento).
- **Dual-Engine Portability (`@mehan/portable`)** — Generated from the exact same `@mehan/dna` math for single-HTML prototypes in **Claude Artifacts** and **Gemini Canvas**, plus Vanilla HTML, Vue, Svelte, and Astro projects.

---

## Instant Zero-Setup Launch (Windows, macOS & Linux)

No terminal, server, or `npm install` needed to explore, customize, and export tokens or AI kits:

1. **Double-click `STUDIO.html`** directly in Explorer (Windows), Finder (macOS), or Files (Linux).
2. Switch live between **Confectionery**, **Porcelain**, and **Stone**, test all **6 accents** or pick any **custom `#rrggbb` brand hex**, toggle **Light / Dark**, inspect interactive components, and click **"Copy Claude / Gemini AI Kit"** in one click.

For maintainers editing source inside this monorepo, double-click:
- **Windows:** `dev-windows.cmd`
- **macOS / Linux:** `dev-mac-linux.command`

---

## Monorepo Architecture

```text
mehan-design-system/
├── STUDIO.html                # Self-contained offline interactive Studio (double-click on any OS)
├── bin/mehan.mjs              # Cross-OS project bootstrapper (`init`, `ai-kit`)
├── packages/
│   ├── dna/                   # @mehan/dna — Zero-dep OKLCH color math, atmospheres, accents, 7-role materials
│   ├── astryx/                # @mehan/astryx — Official Meta Astryx integration (themes, fonts, 4 extensions, blocks, docs)
│   └── portable/              # @mehan/portable — Standalone CSS, vanilla JS runtime, Claude/Gemini Kit, Astryx CDN HTML
├── apps/
│   └── studio/                # @mehan/studio — Interactive React 19 + Vite customizer compiling STUDIO.html
└── tests/                     # Vitest DNA math + Playwright offline file:// & axe WCAG AA contrast gates
```

---

## Using Mehan in Any Project

### Path A — One-Command Cross-OS Bootstrap (`mehan init`)

Point `bin/mehan.mjs` at any folder — it auto-detects React/Next/Vite vs. Vanilla/Vue/Svelte:

```bash
node D:/mehan-design-system/bin/mehan.mjs init ./my-new-app --atmosphere porcelain --accent blueberry
```

### Path B — React / Next.js / Vite Apps (`@mehan/astryx` + Meta Astryx)

```bash
pnpm add @astryxdesign/core @mehan/astryx lucide-react
pnpm add -D @astryxdesign/cli
```

Load the CSS cascade and wrap your app in `<Theme>`:

```tsx
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/styles.css';
import '@mehan/astryx/themes/mehan-confectionery.css';

import {Theme} from '@astryxdesign/core/theme';
import {Button, Card, Heading, Stack, TextInput} from '@astryxdesign/core';
import {mehanConfectioneryTheme} from '@mehan/astryx/themes/mehan-confectionery';
import {PrecisionSlider, MetricCard} from '@mehan/astryx';

export function App() {
  return (
    <Theme theme={mehanConfectioneryTheme} mode="light">
      <Card maxWidth={480}>
        <Stack gap={4}>
          <Heading level={2}>Confectionery Workspace</Heading>
          <TextInput label="Workspace name" placeholder="Acme Studio" />
          <PrecisionSlider label="Padding" value={32} min={0} max={96} unit="px" onChange={() => {}} />
          <Button variant="primary" label="Launch Project" />
        </Stack>
      </Card>
    </Theme>
  );
}
```

Need a custom brand hex or atmosphere combination at runtime?

```tsx
import {createMehanTheme} from '@mehan/astryx/dna';

export const brandTheme = createMehanTheme({
  name: 'acme-brand',
  atmosphere: 'porcelain',
  accent: '#6d4aff',
  depth: 1,
  radiusScale: 1,
});
```

Because `@mehan/astryx` ships a validated `astryx.integration.mjs` manifest (`0 errors, 0 warnings`), AI coding agents inside consumer projects can query every Mehan rule, component, and theme via `@astryxdesign/cli` (`pnpm exec astryx docs mehan-design-rules`, `pnpm exec astryx component PrecisionSlider`).

### Path C — Single-HTML AI Prototyping (Claude Artifacts / Gemini Canvas) & Non-React Stacks

- **AI Prototyping:** Open `STUDIO.html`, configure your atmosphere & brand color, and click **"Copy Claude / Gemini AI Kit"** (or grab `packages/portable/dist/MEHAN-AI-PROTOTYPE-KIT.md`). Paste it into Claude or Gemini alongside your prompt to generate tactile single-file HTML prototypes with zero external dependencies.
- **Single-HTML React + Astryx via CDN:** Copy `packages/portable/dist/mehan-astryx-cdn.html` (`importmap` + `esm.sh` + `htm` — runs directly in any browser with zero bundler).
- **Vanilla / Vue / Svelte / Astro:** Copy or import `packages/portable/dist/mehan-portable.css` (and optional `mehan-portable.js`).

---

## Development & 6-Gate Verification

```bash
# Install workspace dependencies
pnpm install

# Build all packages + emit root STUDIO.html
pnpm build

# Run full verification suite (Typecheck + Astryx Strict Integration Audit + Vitest + Playwright Visual & axe WCAG AA)
pnpm verify
```

### Upgrading Meta Astryx Safely

Mehan never forks `@astryxdesign/core` internals — it layers cleanly through public `defineTheme()` tokens, semantic `data-*` selectors, and isolated `@mehan/astryx` extension components. When `@astryxdesign/core` releases a new version:

1. Update `@astryxdesign/core` and `@astryxdesign/cli` in `packages/astryx/package.json` and `apps/studio/package.json`.
2. Run `pnpm build && pnpm verify` — `astryx theme build`, `astryx integration check --strict --next`, `astryx integration verify`, and Playwright + `axe` immediately verify every token, selector, tarball export, and contrast ratio.

---

## License

MIT License — see [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
