# `@mehan/portable` (`v1.0.0`)

Real-engine single-HTML AI Prototype Kit generator (`<script type="text/tsx">` running `@astryxdesign/core` + `@mehan/astryx`), standalone `.mh-*` CSS/JS generator, and W3C Design Tokens bridge for **Mehan Design System**.

Use `@mehan/portable` across two complementary tracks:
1. **Real-Engine Single-HTML Prototypes (`generateAiPrototypeKit` + `generateStarterCdnHtml`):** Paste `MEHAN-AI-PROTOTYPE-KIT.md` into Claude / Gemini / ChatGPT to generate executive-ready single-file `.html` prototypes running 100% authentic `@astryxdesign/core` + `@mehan/astryx` components (`WorkspaceLayout`, `DataChart`, `Table`, `Drawer`, `Dialog`, `Toast`, `createMehanTheme`) via the hosted `/cdn/mehan-runtime.{css,js}` bundle with zero npm setup.
2. **Framework-Free & Air-Gapped HTML/CSS (`generatePortableCss` + `generateOfflineAiPrototypeKit`):** Drop `mehan-portable.css` + `mehan-portable.js` directly into **Vanilla HTML, Vue, Svelte, Astro, HTMX, Rails, Laravel, or Go templates**, or pass `--offline` for zero-internet single-HTML demos.

## Installation & Usage

```html
<!-- Real-Engine Single-HTML Prototype (<script type="text/tsx">) -->
<link rel="stylesheet" href="https://alamehan.github.io/mehan-design-system/cdn/mehan-runtime.css" />
<script src="https://alamehan.github.io/mehan-design-system/cdn/mehan-runtime.js"></script>

<!-- Or drop framework-free CSS + JS into any HTML / Vue / Svelte document -->
<link rel="stylesheet" href="./mehan-portable.css" />
<script src="./mehan-portable.js" defer></script>
```

Or generate customized outputs programmatically / via CLI:

```bash
# Generate Real-Engine AI Prototype Kit markdown prompt from any Studio JSON
node ./bin/mehan.mjs ai-kit --from mehan-theme.json --out kit.md

# Generate air-gapped Offline CSS AI Kit (zero internet required)
node ./bin/mehan.mjs ai-kit --from mehan-theme.json --offline --out kit-offline.md

# Emit standalone CSS + JS into ./my-site/mehan/
node ./bin/mehan.mjs init ./my-site --portable --atmosphere porcelain --accent blueberry
```

## Included `.mh-*` Standalone Primitives & Layouts

- **Surfaces & Workspaces:** `.mh-topbar`, `.mh-shell`, `.mh-workspace`, `.mh-workspace.is-2col`, `.mh-ws-pane`, `.mh-canvas-stage`, `.mh-cs-hud`, `.mh-card`, `.mh-tray`, `.mh-well`, `.mh-property-row`
- **Actions & Forms:** `.mh-btn` (`primary`, `secondary`, `ghost`, `danger`), `.mh-split`, `.mh-copy-btn`, `.mh-input`, `.mh-select`, `.mh-textarea`, `.mh-seg`, `.mh-switch`, `.mh-swatch`, `.mh-anchor-grid`, `.mh-otp` (auto-advance, Backspace & paste)
- **Data, Overlays & Feedback:** `.mh-metric`, `.mh-chart`, `.mh-hbar`, `.mh-progress`, `.mh-table-wrap > .mh-table`, `.mh-column-view`, `.mh-timeline`, `.mh-stepper`, `.mh-avatar`, `.mh-empty`, `.mh-mid-trunc`, `.mh-badge`, `.mh-alert`, `.mh-error-summary`, `.mh-inline-msg`, `dialog.mh-modal`, `aside.mh-drawer`, `window.mhToast(...)`
- **Built-in Accessibility & Media Hygiene:** Automatic `44px` coarse-pointer targets, `max-height: 559px` (`200%` zoom) workspace height unlock, `prefers-contrast: more`, `forced-colors: active`, `prefers-reduced-motion: reduce`, and `@media print`.
