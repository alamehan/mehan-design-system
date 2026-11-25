# `@mehan/portable` (`v1.0.0`)

Zero-bundler standalone CSS, progressive vanilla JS runtime, single-HTML AI Prototype Kit generator, and W3C Design Tokens bridge for **Mehan Design System**.

Use `@mehan/portable` when building prototypes in **Claude Artifacts, Gemini Canvas, Vanilla HTML, Vue, Svelte, Astro, HTMX, Rails, Laravel, or Go templates** without a React or StyleX build pipeline.

## Installation & Usage

```html
<!-- Drop directly into any HTML document -->
<link rel="stylesheet" href="./mehan-portable.css" />
<script src="./mehan-portable.js" defer></script>
```

Or generate customized outputs programmatically / via CLI:

```bash
# Emit standalone CSS + JS into ./my-site/mehan/ (run from cloned repo root)
node ./bin/mehan.mjs init ./my-site --portable --atmosphere porcelain --accent blueberry

# Generate a single-file AI Prototype Kit markdown prompt
node ./bin/mehan.mjs ai-kit --from mehan-theme.json --out kit.md
```

## Included `.mh-*` Primitives & Layouts

- **Surfaces & Workspaces:** `.mh-topbar`, `.mh-shell`, `.mh-workspace`, `.mh-workspace.is-2col`, `.mh-ws-pane`, `.mh-canvas-stage`, `.mh-cs-hud`, `.mh-card`, `.mh-tray`, `.mh-well`, `.mh-property-row`
- **Actions & Forms:** `.mh-btn` (`primary`, `secondary`, `ghost`, `danger`), `.mh-split`, `.mh-copy-btn`, `.mh-input`, `.mh-select`, `.mh-textarea`, `.mh-seg`, `.mh-switch`, `.mh-swatch`, `.mh-anchor-grid`, `.mh-otp` (auto-advance, Backspace & paste)
- **Data, Hierarchy & Feedback:** `.mh-metric`, `.mh-chart`, `.mh-hbar`, `.mh-table-wrap > .mh-table`, `.mh-column-view`, `.mh-timeline`, `.mh-mid-trunc`, `.mh-badge`, `.mh-alert`, `.mh-error-summary`, `.mh-inline-msg`, `dialog.mh-modal`
- **Built-in Accessibility & Media Hygiene:** Automatic `44px` coarse-pointer targets, `max-height: 559px` (`200%` zoom) workspace height unlock, `prefers-contrast: more`, `forced-colors: active`, `prefers-reduced-motion: reduce`, and `@media print`.
