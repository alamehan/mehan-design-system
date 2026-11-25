# AGENTS.md — Universal Multi-Agent Entrypoint for Mehan Design System

> **Applies to:** Claude Code ([`CLAUDE.md`](./CLAUDE.md)), Antigravity / Gemini, OpenAI Codex, Cursor, Windsurf, and any AI coding agent or maintainer working inside **`mehan-design-system`**.

## 1. Session Read Order

1. **[`README.md`](./README.md)** — Architectural thesis (*Meta Astryx's engine × Mehan's tactile soul*), workspace packages, and 60-second onboarding paths.
2. **[`CLAUDE.md`](./CLAUDE.md)** — Complete 5-Lock engineering invariants, command reference, and verification gates.
3. **[`packages/astryx/src/createMehanTheme.ts`](./packages/astryx/src/createMehanTheme.ts)** — Official Meta Astryx theme provider mapping OKLCH DNA (`@mehan/dna`) onto Core component slots.

---

## 2. The 5 Binding Invariants

| Lock | Mandatory Rule |
|---|---|
| **Lock 1 · Zero-Fork Meta Astryx Core** | Never fork, vendor, or copy-paste `@astryxdesign/core` components. Always compose or configure official props (`<Selector placement="below">`, `<Collapsible>`, `<Code>`) and style official component slots in [`createMehanTheme.ts`](./packages/astryx/src/createMehanTheme.ts). |
| **Lock 2 · 4-Step Extension Ladder & Pure Domain Neutrality** | Follow **1) Reuse Core -> 2) Compose -> 3) Theme Override -> 4) Extend (`@mehan/astryx`)** strictly when WAI-ARIA behavior or spatial topology genuinely differs. Keep all components and docs 100% universal with zero product-specific or private-repo bias, and enforce `min-width: 0` inside every flex/grid card boundary. |
| **Lock 3 · 3-Bucket Evergreen Copywriting** | **Bucket 1 (Dynamic UI Badges):** bind live counts from runtime arrays (`{items.length}`) — never hardcode numbers in JSX strings. **Bucket 2 (Cross-File Prose & Static SVGs):** write durable capability-first prose in [`README.md`](./README.md), [`assets/why-mehan-architecture.svg`](./assets/why-mehan-architecture.svg), and AI docs with zero brittle inventory tallies, zero temporal filler (*"new"*, *"recently"*), and zero leaked plumbing jargon (*"zero API keys"*, *"via localStorage"*). **Bucket 3 (Automated Ledgers):** assert exact structural counts inside [`tests/`](./tests) against single-source exports. |
| **Lock 4 · Multi-Viewport Visual QA Before Shipping** | Render every UI, theme, or SVG change in headless Chromium via Playwright across Desktop (`1366×900` Light & Dark), Mobile (`375×812`, `0px` horizontal overflow), and open interactive states (`Selector` popups, `Collapsible` panels, inline `Code`), inspecting actual `.png` screenshots before concluding. |
| **Lock 5 · 6-Gate `pnpm verify` & Clean Release Sync** | Every change must pass `pnpm verify` (`pnpm build` -> `pnpm typecheck` -> `vitest run` -> `astryx integration check --strict --next` -> `astryx integration verify` -> `playwright test` + `axe` WCAG 2.2 AA). Pushing `main` automatically deploys `apps/studio/dist` to GitHub Pages via [`.github/workflows/deploy-studio.yml`](./.github/workflows/deploy-studio.yml) — never manually copy build folders to another repo. |
