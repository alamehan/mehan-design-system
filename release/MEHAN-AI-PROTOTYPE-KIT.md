# Mehan Design System — Single-HTML Prototype Kit (Confectionery · Strawberry)

Use the embedded **Mehan Portable CSS + Runtime** below to build a tactile, accessible, responsive single-file HTML prototype (zero external npm build required; works offline & in sandboxed AI previews).

## 1. Tactile Surface & Visual Rules
1. **Surface Hierarchy:** Page canvas uses `--mh-paper`; primary panels use `.mh-card`; nested inner groupings inside a card MUST step down to `.mh-tray` or `.mh-well` (never stack white bordered cards inside white bordered cards).
2. **Silky-Smooth Tactile Buttons:** One `.mh-btn.mh-btn-primary` per screen/dialog for the primary CTA; secondary actions use `.mh-btn.mh-btn-secondary`; quiet actions use `.mh-btn.mh-btn-ghost`; destructive actions use soft-tactile `.mh-btn.mh-btn-danger`.
3. **Typography & Tabular Numbers:** Headings use `.mh-display`, `.mh-h1`, `.mh-h2`, `.mh-h3`; numbers/KPIs/timestamps use `.mh-mono` or `.mh-metric-value` (`tabular-nums`).

## 2. Universal UX, Semantic & Copywriting Standards
1. **Simple First, Power on Demand:** Keep top-level forms/toolbars to `<= 5` primary controls; place expert flags inside a collapsible `<details><summary>Advanced settings</summary>...</details>`.
2. **Row-First Data Discipline:** Use a maximum of `4` `.mh-metric` summary cards at the top; render homogeneous lists of `5+` records in `.mh-table-wrap > .mh-table` rather than walls of repeated cards.
3. **Semantic Control Boundaries:** Use `.mh-seg` ONLY for `2–5` immediate view/mode switches; use `.mh-tabs` ONLY when switching distinct content panels; use `.mh-select` ONLY for form value selection.
4. **Recovery States & Microcopy:**
   - **Sentence case** on all buttons, labels, and headings (e.g., `Save changes`, `Create project`, `Delete item`). Never use vague `OK`, `Yes`, or `Submit`.
   - **Blame-free errors:** State what happened + how to fix it (e.g., `Enter a valid work email, like name@company.com.`), preserving user input.
   - **Actionable empty states:** Explain what belongs in the view in one sentence and provide one clear CTA button.
   - **Destructive confirmation:** Confirm irreversible deletes in a `<dialog class="mh-modal">` naming the item, with `Cancel` + specific `Delete <noun>`.

## 3. Auto-Wired Interactive Markup
- **Theme toggle:** `<button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>`
- **Segmented control:** `<div class="mh-seg"><button aria-selected="true">Day</button><button>Week</button></div>`
- **Switch:** `<button type="button" role="switch" aria-checked="true" class="mh-switch is-on" aria-label="Enable feature"></button>`
- **Tabs:** `<div class="mh-tabs"><button class="mh-tab is-active" data-tab="overview">Overview</button><button class="mh-tab" data-tab="activity">Activity</button></div>` paired with `<section data-tab-panel="overview">...</section>`
- **Modal:** `<button class="mh-btn mh-btn-secondary" data-mh-modal-open="confirm-dlg">Delete item</button>` + `<dialog id="confirm-dlg" class="mh-modal">...<button class="mh-btn mh-btn-secondary" data-mh-modal-close>Cancel</button></dialog>`

## 4. Starter Single-File HTML Template (Embed Directly)
```html
<!doctype html>
<html lang="en" data-theme="light" data-density="standard" data-motion="expressive">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
/* Mehan Portable CSS (Confectionery · Custom (#d42a5f) · standard · expressive) */
:root{color-scheme:light;--mh-paper:#fbf5ec;--mh-tray:#f6eee2;--mh-surface:#fffcf7;--mh-float:#fffdf9;--mh-well:#f2e8d9;--mh-well-hover:#eadecd;--mh-socket:#e4d5c1;--mh-inverted:#261b16;--mh-on-inverted:#fbf5ec;--mh-line:#e5d7c4;--mh-line-strong:#8c7766;--mh-card-hairline:#261b160f;--mh-ink:#261b16;--mh-ink-2:#5c4a3e;--mh-ink-3:#6f5b4d;--mh-ink-disabled:#a38f7e;--mh-accent:#c91b57;--mh-accent-text:#c41253;--mh-accent-muted:#c91b5721;--mh-accent-soft:#ffedef;--mh-primary-grad:linear-gradient(180deg, #e1436d 0%, #c91b57 40%, #b20048 100%);--mh-primary-grad-hover:linear-gradient(180deg, #e94872 0%, #c91b57 55%, #b20048 100%);--mh-primary-lip:#94003b;--mh-raised-grad:linear-gradient(180deg, #ffffff 0%, #faf3e8 100%);--mh-knob-grad:radial-gradient(circle at 36% 28%, #ffffff 0%, #ffffff 38%, #fbf5ec 70%, #e5d6c3 100%);--mh-shadow-well:inset 0 1px 2px rgba(74, 45, 20, 0.11), inset 0 0 0 1px rgba(74, 45, 20, 0.04), inset 0 -1px 0 rgba(255, 255, 255, 0.90);--mh-shadow-socket:inset 0 1px 2px rgba(74, 45, 20, 0.22), inset 0 0 0 1px rgba(74, 45, 20, 0.06), inset 0 -1px 0 rgba(255, 255, 255, 0.90);--mh-shadow-raised:inset 0 1px 0 #ffffff, inset 0 -2px 0 #e5d7c4, 0 0 0 1px rgba(74, 45, 20, 0.05), 0 1px 1px rgba(74, 45, 20, 0.040), 0 2px 3px rgba(74, 45, 20, 0.050), 0 6px 8px -4px rgba(74, 45, 20, 0.100);--mh-shadow-raised-hover:inset 0 1px 0 #ffffff, inset 0 -2px 0 #e5d7c4, 0 0 0 1px rgba(74, 45, 20, 0.06), 0 2px 3px rgba(74, 45, 20, 0.050), 0 5px 8px -2px rgba(74, 45, 20, 0.080), 0 12px 16px -6px rgba(74, 45, 20, 0.140);--mh-shadow-pressed:inset 0 1px 2px rgba(74, 45, 20, 0.18), inset 0 0 0 1px rgba(74, 45, 20, 0.06);--mh-shadow-card:inset 0 -2px 0 #f1e9dc, 0 0 0 1px rgba(74, 45, 20, 0.04), 0 1px 1px rgba(74, 45, 20, 0.030), 0 3px 5px rgba(74, 45, 20, 0.040), 0 10px 18px -8px rgba(74, 45, 20, 0.080), 0 26px 40px -22px rgba(74, 45, 20, 0.160);--mh-shadow-float:inset 0 1px 0 #ffffff, 0 0 0 1px rgba(74, 45, 20, 0.05), 0 2px 4px rgba(74, 45, 20, 0.060), 0 8px 16px -4px rgba(74, 45, 20, 0.120), 0 24px 44px -16px rgba(74, 45, 20, 0.240);--mh-shadow-modal:0 0 0 1px rgba(74, 45, 20, 0.05), 0 8px 20px rgba(74, 45, 20, 0.120), 0 44px 100px -24px rgba(74, 45, 20, 0.380);--mh-shadow-knob:0 0 0 0.5px rgba(74, 45, 20, 0.08), 0 1px 1px rgba(74, 45, 20, 0.100), 0 2px 4px rgba(74, 45, 20, 0.140), 0 5px 8px -3px rgba(74, 45, 20, 0.160);--mh-shadow-primary:inset 0 1px 0 rgba(255, 255, 255, 0.36), inset 0 -3px 0 #94003b, 0 1px 1px rgba(119, 21, 51, 0.22), 0 3px 5px -1px rgba(178, 0, 72, 0.28), 0 9px 14px -6px rgba(178, 0, 72, 0.42);--mh-shadow-primary-hover:inset 0 1px 0 rgba(255, 255, 255, 0.44), inset 0 -3px 0 #94003b, 0 2px 3px rgba(119, 21, 51, 0.22), 0 5px 8px -1px rgba(178, 0, 72, 0.28), 0 11px 18px -5px rgba(178, 0, 72, 0.42);--mh-shadow-primary-pressed:inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 #94003b, inset 0 2px 4px rgba(87, 17, 37, 0.32), 0 1px 2px rgba(119, 21, 51, 0.22);--mh-shadow-danger:inset 0 1px 0 #ffffff, inset 0 -2px 0 rgba(185, 28, 28, 0.18), 0 0 0 1px rgba(185, 28, 28, 0.08), 0 1px 1px rgba(185, 28, 28, 0.08), 0 5px 8px -4px rgba(185, 28, 28, 0.24);--mh-shadow-danger-pressed:inset 0 1px 2px rgba(185, 28, 28, 0.22), inset 0 0 0 1px rgba(185, 28, 28, 0.12);--mh-info:#1d5bbf;--mh-info-soft:#0284c71f;--mh-success:#14704e;--mh-success-soft:#15805821;--mh-warning:#9a5206;--mh-warning-soft:#d9770626;--mh-danger:#b91c1c;--mh-danger-fill:#dc2626;--mh-danger-soft:#dc26261f;--mh-danger-soft-solid:#fee8e7;--mh-r-sm:8px;--mh-r-md:12px;--mh-r-lg:18px;--mh-r-xl:24px;--mh-ctrl-sm:32px;--mh-ctrl-md:36px;--mh-ctrl-lg:44px;--mh-ease:cubic-bezier(0.34,1.56,0.64,1)}
:root[data-theme="dark"]{color-scheme:dark;--mh-paper:#1a1310;--mh-tray:#1f1713;--mh-surface:#251c18;--mh-float:#2f241e;--mh-well:#150f0c;--mh-well-hover:#1e1612;--mh-socket:#0f0b09;--mh-inverted:#fbf0e6;--mh-on-inverted:#1a1310;--mh-line:#3d3029;--mh-line-strong:#856e61;--mh-card-hairline:rgba(255, 255, 255, 0.065);--mh-ink:#fbf0e6;--mh-ink-2:#d8c5b6;--mh-ink-3:#b8a291;--mh-ink-disabled:#756255;--mh-accent:#ff8099;--mh-accent-text:#ff92a5;--mh-accent-muted:#ff809933;--mh-accent-soft:#351219;--mh-primary-grad:linear-gradient(180deg, #e1436d 0%, #c91b57 40%, #b20048 100%);--mh-primary-grad-hover:linear-gradient(180deg, #e94872 0%, #c91b57 55%, #b20048 100%);--mh-primary-lip:#94003b;--mh-raised-grad:linear-gradient(180deg, #332721 0%, #2b201b 100%);--mh-knob-grad:radial-gradient(circle at 36% 28%, #ffffff 0%, #f1f5f9 40%, #cbd5e1 72%, #94a3b8 100%);--mh-shadow-well:inset 0 1px 2px rgba(0, 0, 0, 0.60), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.08);--mh-shadow-socket:inset 0 1px 2px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.14);--mh-shadow-raised:inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 1px 2px rgba(0, 0, 0, 0.320), 0 2px 4px rgba(0, 0, 0, 0.280), 0 5px 9px -3px rgba(0, 0, 0, 0.400);--mh-shadow-raised-hover:inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 3px rgba(0, 0, 0, 0.360), 0 5px 9px -2px rgba(0, 0, 0, 0.360), 0 10px 14px -4px rgba(0, 0, 0, 0.500);--mh-shadow-pressed:inset 0 1px 3px rgba(0, 0, 0, 0.56), inset 0 0 0 1px rgba(255, 255, 255, 0.05);--mh-shadow-card:inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.300), 0 6px 12px -4px rgba(0, 0, 0, 0.350), 0 14px 28px -10px rgba(0, 0, 0, 0.500), 0 30px 48px -24px rgba(0, 0, 0, 0.600);--mh-shadow-float:inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 6px rgba(0, 0, 0, 0.360), 0 8px 18px -4px rgba(0, 0, 0, 0.480), 0 20px 48px -14px rgba(0, 0, 0, 0.680);--mh-shadow-modal:inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 20px rgba(0, 0, 0, 0.500), 0 44px 100px -24px rgba(0, 0, 0, 0.720);--mh-shadow-knob:0 0 0 0.5px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.500), 0 2px 4px rgba(0, 0, 0, 0.420), 0 4px 7px -2px rgba(0, 0, 0, 0.450);--mh-shadow-primary:inset 0 1px 0 rgba(255, 255, 255, 0.32), inset 0 -3px 0 #94003b, 0 1px 2px rgba(0, 0, 0, 0.45), 0 3px 6px -1px rgba(178, 0, 72, 0.28), 0 9px 16px -6px rgba(178, 0, 72, 0.42);--mh-shadow-primary-hover:inset 0 1px 0 rgba(255, 255, 255, 0.40), inset 0 -3px 0 #94003b, 0 2px 4px rgba(0, 0, 0, 0.48), 0 5px 9px -1px rgba(178, 0, 72, 0.28), 0 11px 20px -5px rgba(178, 0, 72, 0.42);--mh-shadow-primary-pressed:inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 #94003b, inset 0 2px 4px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.45);--mh-shadow-danger:inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(248, 113, 113, 0.18), 0 1px 2px rgba(0, 0, 0, 0.35), 0 5px 10px -4px rgba(0, 0, 0, 0.45);--mh-shadow-danger-pressed:inset 0 1px 3px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(248, 113, 113, 0.18);--mh-info:#7cb3ff;--mh-info-soft:#38bdf82e;--mh-success:#5cd6a9;--mh-success-soft:#4ade802e;--mh-warning:#ffb562;--mh-warning-soft:#fbbf242e;--mh-danger:#ff8b82;--mh-danger-fill:#dc2626;--mh-danger-soft:#f871712e;--mh-danger-soft-solid:#381210;--mh-r-sm:8px;--mh-r-md:12px;--mh-r-lg:18px;--mh-r-xl:24px;--mh-ctrl-sm:32px;--mh-ctrl-md:36px;--mh-ctrl-lg:44px;--mh-ease:cubic-bezier(0.34,1.56,0.64,1)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;--mh-paper:#1a1310;--mh-tray:#1f1713;--mh-surface:#251c18;--mh-float:#2f241e;--mh-well:#150f0c;--mh-well-hover:#1e1612;--mh-socket:#0f0b09;--mh-inverted:#fbf0e6;--mh-on-inverted:#1a1310;--mh-line:#3d3029;--mh-line-strong:#856e61;--mh-card-hairline:rgba(255, 255, 255, 0.065);--mh-ink:#fbf0e6;--mh-ink-2:#d8c5b6;--mh-ink-3:#b8a291;--mh-ink-disabled:#756255;--mh-accent:#ff8099;--mh-accent-text:#ff92a5;--mh-accent-muted:#ff809933;--mh-accent-soft:#351219;--mh-primary-grad:linear-gradient(180deg, #e1436d 0%, #c91b57 40%, #b20048 100%);--mh-primary-grad-hover:linear-gradient(180deg, #e94872 0%, #c91b57 55%, #b20048 100%);--mh-primary-lip:#94003b;--mh-raised-grad:linear-gradient(180deg, #332721 0%, #2b201b 100%);--mh-knob-grad:radial-gradient(circle at 36% 28%, #ffffff 0%, #f1f5f9 40%, #cbd5e1 72%, #94a3b8 100%);--mh-shadow-well:inset 0 1px 2px rgba(0, 0, 0, 0.60), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 -1px 0 rgba(255, 255, 255, 0.08);--mh-shadow-socket:inset 0 1px 2px rgba(0, 0, 0, 0.72), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(255, 255, 255, 0.14);--mh-shadow-raised:inset 0 1px 0 rgba(255, 255, 255, 0.10), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 1px 2px rgba(0, 0, 0, 0.320), 0 2px 4px rgba(0, 0, 0, 0.280), 0 5px 9px -3px rgba(0, 0, 0, 0.400);--mh-shadow-raised-hover:inset 0 1px 0 rgba(255, 255, 255, 0.14), inset 0 -2px 0 rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 3px rgba(0, 0, 0, 0.360), 0 5px 9px -2px rgba(0, 0, 0, 0.360), 0 10px 14px -4px rgba(0, 0, 0, 0.500);--mh-shadow-pressed:inset 0 1px 3px rgba(0, 0, 0, 0.56), inset 0 0 0 1px rgba(255, 255, 255, 0.05);--mh-shadow-card:inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 2px 4px rgba(0, 0, 0, 0.300), 0 6px 12px -4px rgba(0, 0, 0, 0.350), 0 14px 28px -10px rgba(0, 0, 0, 0.500), 0 30px 48px -24px rgba(0, 0, 0, 0.600);--mh-shadow-float:inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 6px rgba(0, 0, 0, 0.360), 0 8px 18px -4px rgba(0, 0, 0, 0.480), 0 20px 48px -14px rgba(0, 0, 0, 0.680);--mh-shadow-modal:inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.06), 0 8px 20px rgba(0, 0, 0, 0.500), 0 44px 100px -24px rgba(0, 0, 0, 0.720);--mh-shadow-knob:0 0 0 0.5px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.500), 0 2px 4px rgba(0, 0, 0, 0.420), 0 4px 7px -2px rgba(0, 0, 0, 0.450);--mh-shadow-primary:inset 0 1px 0 rgba(255, 255, 255, 0.32), inset 0 -3px 0 #94003b, 0 1px 2px rgba(0, 0, 0, 0.45), 0 3px 6px -1px rgba(178, 0, 72, 0.28), 0 9px 16px -6px rgba(178, 0, 72, 0.42);--mh-shadow-primary-hover:inset 0 1px 0 rgba(255, 255, 255, 0.40), inset 0 -3px 0 #94003b, 0 2px 4px rgba(0, 0, 0, 0.48), 0 5px 9px -1px rgba(178, 0, 72, 0.28), 0 11px 20px -5px rgba(178, 0, 72, 0.42);--mh-shadow-primary-pressed:inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 -1px 0 #94003b, inset 0 2px 4px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.45);--mh-shadow-danger:inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(248, 113, 113, 0.18), 0 1px 2px rgba(0, 0, 0, 0.35), 0 5px 10px -4px rgba(0, 0, 0, 0.45);--mh-shadow-danger-pressed:inset 0 1px 3px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(248, 113, 113, 0.18);--mh-info:#7cb3ff;--mh-info-soft:#38bdf82e;--mh-success:#5cd6a9;--mh-success-soft:#4ade802e;--mh-warning:#ffb562;--mh-warning-soft:#fbbf242e;--mh-danger:#ff8b82;--mh-danger-fill:#dc2626;--mh-danger-soft:#f871712e;--mh-danger-soft-solid:#381210;--mh-r-sm:8px;--mh-r-md:12px;--mh-r-lg:18px;--mh-r-xl:24px;--mh-ctrl-sm:32px;--mh-ctrl-md:36px;--mh-ctrl-lg:44px;--mh-ease:cubic-bezier(0.34,1.56,0.64,1)}}
*,*::before,*::after{box-sizing:border-box}
:root[data-density="compact"]{--mh-ctrl-sm:28px;--mh-ctrl-md:32px;--mh-ctrl-lg:40px}
:root[data-motion="calm"]{--mh-ease:cubic-bezier(0.22,1,0.36,1)}
html,body{margin:0;min-height:100%;background:var(--mh-paper);color:var(--mh-ink);font:400 14px/1.5 "Figtree",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,p{margin:0}
button,input,select,textarea{font:inherit;color:inherit}
.mh-display,.mh-h1,.mh-h2,.mh-h3{font-family:"Bricolage Grotesque","Figtree",ui-sans-serif,system-ui,sans-serif;letter-spacing:-0.028em;text-wrap:balance}
.mh-display{font-size:clamp(28px,4vw,42px);line-height:1.08;font-weight:800;letter-spacing:-0.035em}
.mh-h1{font-size:26px;line-height:1.18;font-weight:800}
.mh-h2{font-size:19px;line-height:1.25;font-weight:700}
.mh-h3{font-size:15px;line-height:1.35;font-weight:700}
.mh-muted{color:var(--mh-ink-3);font-size:13px}
.mh-mono{font-family:"Geist Mono",ui-monospace,"SFMono-Regular",Menlo,monospace;font-variant-numeric:tabular-nums;font-size:12px}
.mh-kbd{display:inline-flex;align-items:center;padding:3px 7px;border-radius:6px;background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);border:0;font:600 11px/1 "Geist Mono",monospace;color:var(--mh-ink-2)}

/* Layout */
.mh-container{max-width:1160px;margin:0 auto;padding:24px}
.mh-topbar{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:56px;padding:10px 20px;background:var(--mh-surface);border-bottom:1px solid var(--mh-line);position:sticky;top:0;z-index:20}
.mh-shell{display:grid;grid-template-columns:236px minmax(0,1fr);min-height:calc(100dvh - 56px)}
.mh-sidebar{background:var(--mh-surface);border-right:1px solid var(--mh-line);padding:14px;display:flex;flex-direction:column;gap:4px}
.mh-main{padding:24px;min-width:0}
.mh-stack{display:flex;flex-direction:column;gap:14px}
.mh-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.mh-between{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.mh-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.mh-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.mh-grid-4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.mh-divider{height:1px;background:var(--mh-line);border:0;margin:8px 0}

/* Surfaces (6% feathered hairline + progressive 4-layer elevation) */
.mh-card{background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:18px}
.mh-card .mh-card,.mh-tray{background:var(--mh-tray);border:1px solid var(--mh-line);border-radius:var(--mh-r-md);padding:12px;box-shadow:none}
.mh-well{background:var(--mh-well);box-shadow:var(--mh-shadow-well);border-radius:var(--mh-r-md);padding:12px}

/* Silky-Smooth Tactile Push Buttons (Perceptual Lip + Optical Face Centering) */
.mh-btn{height:var(--mh-ctrl-md,36px);padding:0 14px;border:0;border-radius:var(--mh-r-md);display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer;text-decoration:none;transition:transform 150ms var(--mh-ease),box-shadow 150ms ease,background-image 150ms ease,background-color 150ms ease}
.mh-btn-sm{height:var(--mh-ctrl-sm,32px);padding:0 11px;font-size:12.5px}
.mh-btn-lg{height:var(--mh-ctrl-lg,44px);padding:0 18px;font-size:14.5px;border-radius:calc(var(--mh-r-md) + 2px)}
.mh-btn-primary{color:#fff;background-color:var(--mh-accent);background-image:var(--mh-primary-grad);box-shadow:var(--mh-shadow-primary);padding-bottom:3px}
.mh-btn-primary:hover:not(:disabled){background-image:var(--mh-primary-grad-hover);box-shadow:var(--mh-shadow-primary-hover)}
.mh-btn-primary:active:not(:disabled){transform:translateY(1.5px);padding-bottom:1px;box-shadow:var(--mh-shadow-primary-pressed);transition-duration:80ms}
.mh-btn-secondary{color:var(--mh-ink);background-color:var(--mh-surface);background-image:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);padding-bottom:2px}
.mh-btn-secondary:hover:not(:disabled){box-shadow:var(--mh-shadow-raised-hover)}
.mh-btn-secondary:active:not(:disabled){transform:translateY(1px);padding-bottom:0;box-shadow:var(--mh-shadow-pressed);transition-duration:80ms}
.mh-btn-ghost{background:transparent;color:var(--mh-ink-2)}
.mh-btn-ghost:hover:not(:disabled){background:var(--mh-well);color:var(--mh-ink)}
.mh-btn-danger{color:var(--mh-danger);background:var(--mh-danger-soft-solid);box-shadow:var(--mh-shadow-danger);padding-bottom:2px}
.mh-btn-danger:active:not(:disabled){transform:translateY(1px);padding-bottom:0;box-shadow:var(--mh-shadow-danger-pressed);transition-duration:80ms}
@media (hover:hover) and (prefers-reduced-motion:no-preference){.mh-btn-primary:hover:not(:disabled),.mh-btn-secondary:hover:not(:disabled),.mh-btn-danger:hover:not(:disabled){transform:translateY(-1px)}}
.mh-btn:disabled{opacity:.48;cursor:default;transform:none}
.mh-icon-btn{width:var(--mh-ctrl-md,36px);height:var(--mh-ctrl-md,36px);padding:0;padding-bottom:2px;border-radius:var(--mh-r-md);display:inline-grid;place-items:center;border:0;background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);cursor:pointer}
.mh-btn:focus-visible,.mh-icon-btn:focus-visible,.mh-seg button:focus-visible,.mh-switch:focus-visible,.mh-tab:focus-visible,.mh-swatch:focus-visible{outline:2px solid var(--mh-ink);outline-offset:2px}

/* Borderless Recessed-Well Form Controls */
.mh-field{display:flex;flex-direction:column;gap:6px}
.mh-label{font-size:12.5px;font-weight:600;color:var(--mh-ink-2);display:flex;justify-content:space-between}
.mh-input,.mh-select,.mh-textarea{width:100%;border:0;outline:none;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well);color:var(--mh-ink);font-size:13.5px;transition:box-shadow 140ms ease}
.mh-input,.mh-select{height:var(--mh-ctrl-md,36px);padding:0 12px}
.mh-textarea{min-height:84px;padding:9px 12px;resize:vertical}
.mh-input::placeholder,.mh-textarea::placeholder{color:var(--mh-ink-3)}
.mh-input:focus,.mh-select:focus,.mh-textarea:focus{box-shadow:var(--mh-shadow-well),0 0 0 2px var(--mh-accent)}

/* Segmented Control, Switch & Boiled-Sweet Swatch */
.mh-seg{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well)}
.mh-seg button{height:calc(var(--mh-ctrl-md,36px) - 6px);padding:0 12px;border:0;border-radius:var(--mh-r-sm);background:transparent;color:var(--mh-ink-2);font-size:12.5px;font-weight:600;cursor:pointer}
.mh-seg button[aria-selected="true"],.mh-seg button.is-active{background:var(--mh-raised-grad);color:var(--mh-ink);box-shadow:var(--mh-shadow-raised)}
.mh-switch{width:38px;height:22px;padding:0;border:0;border-radius:999px;background:var(--mh-socket);box-shadow:var(--mh-shadow-socket);position:relative;cursor:pointer;transition:background 180ms ease}
.mh-switch::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--mh-knob-grad);box-shadow:var(--mh-shadow-knob);transition:transform 180ms var(--mh-ease)}
.mh-switch[aria-checked="true"],.mh-switch.is-on{background:var(--mh-primary-grad)}
.mh-switch[aria-checked="true"]::after,.mh-switch.is-on::after{transform:translateX(16px)}
.mh-swatch{width:30px;height:30px;border:0;border-radius:50%;position:relative;cursor:pointer;box-shadow:inset 0 -2px 0 rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.15);transition:transform 140ms var(--mh-ease)}
.mh-swatch::after{content:"";position:absolute;left:21%;top:15%;width:34%;height:22%;border-radius:999px;background:rgba(255,255,255,.52);transform:rotate(-28deg)}
.mh-swatch:hover{transform:scale(1.08)}
.mh-swatch.is-selected,.mh-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px var(--mh-surface),0 0 0 4px var(--mh-accent)}

/* KPI Metric Card, Badges, Alerts, Tabs, Table & Borderless Floating Modal */
.mh-metric{background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:16px 18px;display:flex;flex-direction:column;gap:6px}
.mh-metric-value{font:800 28px/1.12 "Bricolage Grotesque",sans-serif;letter-spacing:-0.03em;font-variant-numeric:tabular-nums}
.mh-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:700;background:var(--mh-well);color:var(--mh-ink-2)}
.mh-badge-accent{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
.mh-badge-info{background:var(--mh-info-soft);color:var(--mh-info)}
.mh-badge-success{background:var(--mh-success-soft);color:var(--mh-success)}
.mh-badge-warning{background:var(--mh-warning-soft);color:var(--mh-warning)}
.mh-badge-danger{background:var(--mh-danger-soft);color:var(--mh-danger)}
.mh-alert{padding:11px 14px;border-radius:var(--mh-r-md);background:var(--mh-info-soft);color:var(--mh-ink);font-size:13px;display:flex;gap:10px;align-items:flex-start}
.mh-tabs{display:flex;gap:18px;border-bottom:1px solid var(--mh-line)}
.mh-tab{height:var(--mh-ctrl-md,36px);padding:0 2px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;position:relative;cursor:pointer}
.mh-tab[aria-selected="true"],.mh-tab.is-active{color:var(--mh-ink)}
.mh-tab[aria-selected="true"]::after,.mh-tab.is-active::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2.5px;border-radius:999px;background:var(--mh-accent)}
.mh-table-wrap{overflow-x:auto;border-radius:var(--mh-r-lg);border:1px solid var(--mh-card-hairline);background:var(--mh-surface);box-shadow:var(--mh-shadow-card)}
.mh-table{width:100%;border-collapse:collapse;font-size:13px}
.mh-table th,.mh-table td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--mh-line)}
.mh-table th{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--mh-ink-3);background:var(--mh-tray)}
.mh-table tr:last-child td{border-bottom:0}
.mh-nav-item{height:var(--mh-ctrl-md,36px);padding:0 10px;border-radius:var(--mh-r-sm);display:flex;align-items:center;gap:9px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;width:100%;text-align:left}
.mh-nav-item:hover{background:var(--mh-well);color:var(--mh-ink)}
.mh-nav-item.is-active,.mh-nav-item[aria-current="page"]{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
dialog.mh-modal{border:0;border-radius:var(--mh-r-xl);background:var(--mh-float);color:var(--mh-ink);box-shadow:var(--mh-shadow-modal);padding:22px;max-width:460px;width:calc(100% - 32px)}
dialog.mh-modal::backdrop{background:rgba(15,12,10,.46);backdrop-filter:blur(3px)}
@media (max-width:860px){.mh-shell{grid-template-columns:1fr}.mh-sidebar{display:none}.mh-grid-2,.mh-grid-3,.mh-grid-4{grid-template-columns:1fr}}
@media (pointer:coarse){.mh-btn,.mh-input,.mh-select,.mh-nav-item{min-height:44px}.mh-input,.mh-select,.mh-textarea{font-size:16px}}
@media (prefers-contrast:more){.mh-card,.mh-metric,.mh-table-wrap,.mh-input,.mh-select,.mh-textarea,.mh-btn-secondary{outline:1px solid var(--mh-line-strong)}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
  </style>
</head>
<body>
  <header class="mh-topbar">
    <div class="mh-row"><strong class="mh-h2">mehan</strong><span class="mh-badge mh-badge-accent">Confectionery</span></div>
    <button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>
  </header>
  <main class="mh-container mh-stack">
    <!-- Build the requested UI here using .mh-* classes and Mehan UX rules -->
  </main>
  <script>
/* Mehan Portable Progressive Runtime (Zero Dependencies) */
(function () {
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    var segBtn = target.closest('.mh-seg button');
    if (segBtn && segBtn.parentElement) {
      segBtn.parentElement.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-selected', b === segBtn ? 'true' : 'false');
        b.classList.toggle('is-active', b === segBtn);
      });
    }

    var sw = target.closest('.mh-switch');
    if (sw) {
      var next = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(next));
      sw.classList.toggle('is-on', next);
    }

    var tab = target.closest('.mh-tab[data-tab]');
    if (tab && tab.parentElement) {
      var tabId = tab.getAttribute('data-tab');
      tab.parentElement.querySelectorAll('.mh-tab').forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.classList.toggle('is-active', active);
      });
      document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
        if (p instanceof HTMLElement) {
          p.hidden = p.getAttribute('data-tab-panel') !== tabId;
        }
      });
    }

    var openBtn = target.closest('[data-mh-modal-open]');
    if (openBtn) {
      var dlg = document.getElementById(openBtn.getAttribute('data-mh-modal-open') || '');
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }

    var closeBtn = target.closest('[data-mh-modal-close]');
    if (closeBtn) {
      var parentDlg = closeBtn.closest('dialog');
      if (parentDlg) parentDlg.close();
    }

    var themeBtn = target.closest('[data-mh-theme-toggle], .mh-theme-toggle');
    if (themeBtn) {
      var root = document.documentElement;
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    }
  });
})();
  </script>
</body>
</html>
```
