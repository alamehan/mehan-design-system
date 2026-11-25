# CLAUDE.md — Engineering Handbook & Verification Pipeline

> Read alongside **[`AGENTS.md`](./AGENTS.md)**, **[`README.md`](./README.md)**, and **[`docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md`](./docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md)**.

## 1. Monorepo Architecture & Directory Responsibilities

1. **[`packages/dna`](./packages/dna) (`@mehan/dna`):** Pure zero-DOM perceptual OKLCH math, 7-role surface hierarchy (`socket < well < paper < tray < surface < raised < float`), curated atmospheres & accents, WCAG 2.2 AA contrast auditor, coalescing history store, `Intl` formatters, pure file validator, and symmetric W3C Design Tokens exporter.
2. **[`packages/astryx`](./packages/astryx) (`@mehan/astryx`):** Official Meta Astryx theme provider ([`createMehanTheme.ts`](./packages/astryx/src/createMehanTheme.ts)), prebuilt CLI-verified themes, universal workspace (`AppShell` -> `WorkspaceLayout` -> `CanvasStage`) & creative/data extensions, runtime hooks, self-hosted OFL WOFF2 fonts, and `@astryxdesign/cli`-indexed agent documentation ([`packages/astryx/docs/`](./packages/astryx/docs)).
3. **[`packages/portable`](./packages/portable) (`@mehan/portable`):** Standalone `.mh-*` CSS generator, progressive JS runtime, single-prompt AI Prototype Kit (`MEHAN-AI-PROTOTYPE-KIT.md`), and zero-bundler HTML starter generator.
4. **[`apps/studio`](./apps/studio) (`@mehan/studio`):** Bilingual (`ID`/`EN`) interactive Studio organized into [`components/`](./apps/studio/src/components), [`views/`](./apps/studio/src/views), [`catalog/`](./apps/studio/src/catalog), [`templates/`](./apps/studio/src/templates), and [`theme-editor/`](./apps/studio/src/theme-editor) — compiled both as a web app (`apps/studio/dist` for GitHub Pages) and a 100% offline single-file [`STUDIO.html`](./STUDIO.html).
5. **[`scripts/`](./scripts) & [`bin/mehan.mjs`](./bin/mehan.mjs):** [`scripts/pack-release.mjs`](./scripts/pack-release.mjs) centralizes [`release/`](./release) tarball & portable asset packaging without cross-package coupling; [`scripts/dev-windows.cmd`](./scripts/dev-windows.cmd) / [`scripts/verify-windows.cmd`](./scripts/verify-windows.cmd) (and `.command` equivalents) provide one-click OS launchers; [`bin/mehan.mjs`](./bin/mehan.mjs) scaffolds consumer projects (`init`, `tokens`, `ai-kit`, `set-scope`).
6. **[`docs/`](./docs) & [`tests/`](./tests):** [`docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md`](./docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md) documents how to clone this repository into new domain design systems; [`tests/unit/`](./tests/unit) runs Vitest mathematical & governance proofs, and [`tests/e2e/`](./tests/e2e) runs Playwright visual & `axe` WCAG 2.2 AA suites.

---

## 2. Component, Proportion & UX Discipline

- **Unified Control Heights & Font Scale:** Default interactive controls (`Button`, `SplitButton`, `CopyButton`, `ColorWell`, `ThemeSwitch`, `InlineConfirm`, `SegmentedControl`, `TextInput`, `Selector`) share exact scale parity (`sm: 30px / 12.5px`, `md: 36px / 14px`, `lg: 42px / 15px`) with concentric squircle radii (`7px` inner -> `10px` control -> `16px` card -> `24px` dialog).
- **Inline `<Code>` Optical Rhythm:** Inline code chips inside supporting prose scale proportionally (`fontSize: '0.88em'`, `lineHeight: '1.25'`, `padding: '1px 5px'`) across `createMehanTheme.ts`, `studio.css`, and `@mehan/portable`.
- **Standalone `<Collapsible>` Hit-Target & Cushion:** Standalone `<Collapsible>` (`:not([data-divided])` / `:not([data-density])`) enforces a `40px` minimum trigger target (`paddingBlock: '10px'`, `paddingInline: '14px'`) and cushioned content padding in [`createMehanTheme.ts`](./packages/astryx/src/createMehanTheme.ts).
- **`<Selector placement="below">` Anchoring:** Every `<Selector>` in Studio passes `placement="below"` so popups anchor cleanly beneath the trigger field while retaining native Meta Astryx WAI-ARIA `combobox`/`listbox` keyboard navigation.
- **4-Step Extension Ladder:**
  1. **Reuse Core:** Prefer native `@astryxdesign/core` primitives first.
  2. **Compose:** Combine `Stack`, `Grid`, `Card`, and `WorkspaceLayout` before inventing wrappers.
  3. **Theme Override:** Adjust visual tokens/slots via `createMehanTheme({ components })`.
  4. **Extend (`@mehan/astryx`):** Author a new extension only when WAI-ARIA semantics or spatial physics differ, accompanied by `.doc.mjs` agent docs, `:focus-visible` outlines, and WCAG 2.2 AA tests.

---

## 3. Commands & 6-Gate Quality Pipeline

| Command | Purpose |
|---|---|
| `pnpm build` | Builds `@mehan/dna`, `@mehan/astryx` (+ Astryx theme/doc manifests), `@mehan/portable`, `apps/studio/dist`, offline [`STUDIO.html`](./STUDIO.html), and [`release/`](./release) tarballs via [`scripts/pack-release.mjs`](./scripts/pack-release.mjs). |
| `pnpm typecheck` | Runs strict `tsc --noEmit` across all packages, Studio, and [`tests/tsconfig.json`](./tests/tsconfig.json). |
| `pnpm test:unit` | Runs Vitest mathematical OKLCH contrast proofs, W3C symmetry, CLI E2E, and Evergreen/governance drift locks ([`tests/unit/repo-and-dna-proof.test.ts`](./tests/unit/repo-and-dna-proof.test.ts)). |
| `pnpm verify:astryx` | Runs official `astryx integration check --strict --next` and `astryx integration verify` against `@mehan/astryx`. |
| `pnpm test:e2e` | Runs Playwright Chromium specs + `axe-core` WCAG 2.2 AA audits ([`tests/e2e/`](./tests/e2e)) against offline [`STUDIO.html`](./STUDIO.html). |
| `pnpm verify` | Executes **all 6 gates sequentially** — mandatory before every commit or release. |
