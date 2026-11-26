# CLAUDE.md — Engineering Handbook & Verification Pipeline

> Read alongside **[`AGENTS.md`](./AGENTS.md)**, **[`README.md`](./README.md)**, and **[`docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md`](./docs/DESIGN-SYSTEM-REPLICATION-PLAYBOOK.md)**.

## 1. Monorepo Architecture & Directory Responsibilities

1. **[`packages/dna`](./packages/dna) (`@mehan/dna`):** Pure zero-DOM perceptual OKLCH math, 7-role surface hierarchy (`socket < well < paper < tray < surface < raised < float`), curated atmospheres & accents, WCAG 2.2 AA contrast auditor, coalescing history store, `Intl` formatters, pure file validator, and symmetric W3C Design Tokens exporter.
2. **[`packages/astryx`](./packages/astryx) (`@mehan/astryx`):** Official Meta Astryx theme provider ([`createMehanTheme.ts`](./packages/astryx/src/createMehanTheme.ts)), prebuilt CLI-verified themes, universal workspace (`AppShell` -> `WorkspaceLayout` -> `CanvasStage`) & creative/data extensions, runtime hooks, self-hosted OFL WOFF2 fonts, and `@astryxdesign/cli`-indexed agent documentation ([`packages/astryx/docs/`](./packages/astryx/docs)).
3. **[`packages/portable`](./packages/portable) (`@mehan/portable`):** Real-engine single-HTML AI Prototype Kit (`MEHAN-AI-PROTOTYPE-KIT.md` + `mehan-astryx-cdn.html` powered by `<script type="text/tsx">`), air-gapped `--offline` AI Kit fallback, standalone `.mh-*` CSS generator, and progressive JS runtime.
4. **[`apps/studio`](./apps/studio) (`@mehan/studio`):** Bilingual (`ID`/`EN`) interactive Studio organized into [`components/`](./apps/studio/src/components), [`views/`](./apps/studio/src/views), [`catalog/`](./apps/studio/src/catalog), [`templates/`](./apps/studio/src/templates), and [`theme-editor/`](./apps/studio/src/theme-editor) — compiled into `apps/studio/dist` (including the self-contained `/cdn/` browser runtime built by [`build-cdn-runtime.mjs`](./apps/studio/scripts/build-cdn-runtime.mjs) for GitHub Pages) plus a 100% offline single-file [`STUDIO.html`](./STUDIO.html).
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
| `pnpm test:e2e` | Runs Playwright Chromium specs + `axe-core` WCAG 2.2 AA audits ([`tests/e2e/`](./tests/e2e)) against offline [`STUDIO.html`](./STUDIO.html) and single-HTML `<script type="text/tsx">` prototypes. |
| `pnpm verify` | Executes **all 6 gates sequentially** — mandatory before every commit or release. |

---

## 4. Future Evolution & Auto-Sync Matrix (Zero-Drift Maintenance)

The monorepo is wired so routine improvements propagate **automatically** on `pnpm verify` + `git push origin main` without manual copy-pasting across Portable, AI Kit, or CDN bundles:

| Change Scenario | Where You Edit | What Auto-Syncs Automatically on `pnpm verify` + Push |
|---|---|---|
| **Adjust tokens, button physics, radii, shadows, or fix an existing component** | [`packages/dna/src/`](./packages/dna/src) or [`packages/astryx/src/`](./packages/astryx/src) | **100% Automatic:** updates Live Studio, offline [`STUDIO.html`](./STUDIO.html), `/cdn/mehan-runtime.{css,js}` (upgrading existing `.html` prototypes too), [`release/*.tgz`](./release), [`mehan-portable.css`](./release/mehan-portable.css), [`MEHAN-AI-PROTOTYPE-KIT.md`](./release/MEHAN-AI-PROTOTYPE-KIT.md), and W3C JSON. |
| **Add a curated Studio Theme Preset** | Add preset entry to `getBuiltInPresets()` in [`apps/studio/src/studioState.ts`](./apps/studio/src/studioState.ts) | **100% Automatic:** appears in Studio Overview grid & Theme Editor selector, updates dynamic `{builtInPresets.length}` badges, runs WCAG 2.2 AA contrast audit in [`repo-and-dna-proof.test.ts`](./tests/unit/repo-and-dna-proof.test.ts), and exports cleanly to AI Kit / Starter HTML / React / W3C. |
| **Add a new Component to `@mehan/astryx`** | Create `packages/astryx/src/components/<Name>/` (`<Name>.tsx` + `<Name>.doc.mjs` + styles in [`styles.css`](./packages/astryx/src/styles.css)), export in [`packages/astryx/src/index.ts`](./packages/astryx/src/index.ts), and add showcase in `blocks/` + Studio `catalog/` | **Automatic Portable & AI Kit Sync:** `/cdn/mehan-runtime.{css,js}` bundles `<Name>` automatically, [`sync-astryx-catalog.mjs`](./packages/portable/scripts/sync-astryx-catalog.mjs) auto-injects `<Name>` and its verified props into [`MEHAN-AI-PROTOTYPE-KIT.md`](./release/MEHAN-AI-PROTOTYPE-KIT.md) & Studio's `Copy AI kit`, and `repo-and-dna-proof.test.ts` enforces 1:1 export + AI Kit parity. *(Touch `.mh-*` rules in `generator.ts` only if you also want a pure CSS class in the optional `--offline` non-React track.)* |
| **Add a new Atmosphere, Brand Accent, or `.woff2` Font** | [`atmospheres.ts`](./packages/dna/src/atmospheres.ts) / [`accents.ts`](./packages/dna/src/accents.ts) or [`packages/astryx/fonts/`](./packages/astryx/fonts) + [`fonts.css`](./packages/astryx/fonts.css) (+ [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)) | **100% Automatic:** `createMehanTheme`, `/cdn/fonts/*.woff2`, `mehan-portable.css`, `MEHAN-AI-PROTOTYPE-KIT.md` seed lists, W3C tokens, and contrast matrix tests all pick up the new seed/font automatically. |
