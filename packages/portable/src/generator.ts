import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  resolveMehanDna,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
  type MehanThemeOptions,
  type ResolvedMehanDna,
} from '@mehan/dna';

function varsBlock(dna: ResolvedMehanDna, mode: 'light' | 'dark'): string {
  const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
  const M = mode === 'light' ? dna.materials.light : dna.materials.dark;
  const A = dna.accent;
  const idx = mode === 'light' ? 0 : 1;

  return [
    `--mh-paper:${S.paper}`,
    `--mh-tray:${S.tray}`,
    `--mh-surface:${S.surface}`,
    `--mh-float:${S.float}`,
    `--mh-well:${S.well}`,
    `--mh-well-hover:${S.wellHover}`,
    `--mh-socket:${S.socket}`,
    `--mh-inverted:${S.inverted}`,
    `--mh-on-inverted:${S.onInverted}`,
    `--mh-line:${S.line}`,
    `--mh-line-strong:${S.lineStrong}`,
    `--mh-ink:${S.ink}`,
    `--mh-ink-2:${S.ink2}`,
    `--mh-ink-3:${S.ink3}`,
    `--mh-ink-disabled:${S.inkDisabled}`,
    `--mh-accent:${mode === 'light' ? A.accentLight : A.accentDark}`,
    `--mh-accent-text:${mode === 'light' ? A.textLight : A.textDark}`,
    `--mh-accent-muted:${mode === 'light' ? A.mutedLight : A.mutedDark}`,
    `--mh-accent-soft:${mode === 'light' ? A.softSolidLight : A.softSolidDark}`,
    `--mh-primary-grad:${A.buttonGradient}`,
    `--mh-primary-grad-hover:${A.buttonGradientHover}`,
    `--mh-primary-lip:${A.buttonLip}`,
    `--mh-raised-grad:${M.raisedGradient}`,
    `--mh-knob-grad:${M.knobGradient}`,
    `--mh-shadow-well:${M.shadowWell}`,
    `--mh-shadow-socket:${M.shadowSocket}`,
    `--mh-shadow-raised:${M.shadowRaised}`,
    `--mh-shadow-raised-hover:${M.shadowRaisedHover}`,
    `--mh-shadow-pressed:${M.shadowPressed}`,
    `--mh-shadow-card:${M.shadowCard}`,
    `--mh-shadow-float:${M.shadowFloat}`,
    `--mh-shadow-modal:${M.shadowModal}`,
    `--mh-shadow-knob:${M.shadowKnob}`,
    `--mh-shadow-primary:${M.shadowPrimary}`,
    `--mh-shadow-primary-hover:${M.shadowPrimaryHover}`,
    `--mh-shadow-primary-pressed:${M.shadowPrimaryPressed}`,
    `--mh-info:${dna.statuses.info.text[idx]}`,
    `--mh-info-soft:${dna.statuses.info.muted[idx]}`,
    `--mh-success:${dna.statuses.success.text[idx]}`,
    `--mh-success-soft:${dna.statuses.success.muted[idx]}`,
    `--mh-warning:${dna.statuses.warning.text[idx]}`,
    `--mh-warning-soft:${dna.statuses.warning.muted[idx]}`,
    `--mh-danger:${dna.statuses.error.text[idx]}`,
    `--mh-danger-fill:${dna.statuses.error.solid[0]}`,
    `--mh-danger-soft:${dna.statuses.error.muted[idx]}`,
    `--mh-r-sm:${dna.radii.inner}`,
    `--mh-r-md:${dna.radii.element}`,
    `--mh-r-lg:${dna.radii.container}`,
    `--mh-r-xl:${dna.radii.page}`,
  ].join(';');
}

const CORE_PORTABLE_RULES = `
*,*::before,*::after{box-sizing:border-box}
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
.mh-kbd{display:inline-flex;align-items:center;padding:3px 6px;border-radius:6px;background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);border:1px solid var(--mh-line);font:600 11px/1 "Geist Mono",monospace;color:var(--mh-ink-2)}

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

/* Surfaces */
.mh-card{background:var(--mh-surface);border:1px solid var(--mh-line);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:18px}
.mh-card .mh-card,.mh-tray{background:var(--mh-tray);border:1px solid var(--mh-line);border-radius:var(--mh-r-md);padding:12px;box-shadow:none}
.mh-well{background:var(--mh-well);box-shadow:var(--mh-shadow-well);border-radius:var(--mh-r-md);padding:12px}

/* Tactile Buttons (Fixed-Height Lip-Collapse + Distinct Focus Ring) */
.mh-btn{height:36px;padding:0 14px;border:0;border-radius:var(--mh-r-md);display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer;text-decoration:none;transition:transform 120ms cubic-bezier(.34,1.56,.64,1),box-shadow 120ms ease,background 120ms ease}
.mh-btn-sm{height:32px;padding:0 11px;font-size:12.5px}
.mh-btn-lg{height:44px;padding:0 18px;font-size:14.5px;border-radius:calc(var(--mh-r-md) + 2px)}
.mh-btn-primary{color:#fff;background:var(--mh-primary-grad);box-shadow:var(--mh-shadow-primary);padding-bottom:3px;text-shadow:0 1px 0 rgba(0,0,0,.2)}
.mh-btn-primary:hover:not(:disabled){background:var(--mh-primary-grad-hover);box-shadow:var(--mh-shadow-primary-hover)}
.mh-btn-primary:active:not(:disabled){transform:translateY(2px);padding-bottom:1px;box-shadow:var(--mh-shadow-primary-pressed);transition-duration:80ms}
.mh-btn-secondary{color:var(--mh-ink);background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);padding-bottom:2px}
.mh-btn-secondary:hover:not(:disabled){box-shadow:var(--mh-shadow-raised-hover)}
.mh-btn-secondary:active:not(:disabled){transform:translateY(1px);padding-bottom:0;box-shadow:var(--mh-shadow-pressed);transition-duration:80ms}
.mh-btn-ghost{background:transparent;color:var(--mh-ink-2)}
.mh-btn-ghost:hover:not(:disabled){background:var(--mh-well);color:var(--mh-ink)}
.mh-btn-danger{color:#fff;background:var(--mh-danger-fill);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 -3px 0 #7f1d1d,0 4px 10px -4px rgba(185,28,28,.4);padding-bottom:3px}
.mh-btn-danger:active:not(:disabled){transform:translateY(2px);padding-bottom:1px}
.mh-btn:disabled{opacity:.48;cursor:default;transform:none}
.mh-icon-btn{width:36px;height:36px;padding:0;border-radius:var(--mh-r-md);display:inline-grid;place-items:center;border:0;background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);cursor:pointer}
.mh-btn:focus-visible,.mh-icon-btn:focus-visible,.mh-seg button:focus-visible,.mh-switch:focus-visible,.mh-tab:focus-visible,.mh-swatch:focus-visible{outline:2px solid var(--mh-ink);outline-offset:2px}

/* Recessed-Well Form Controls */
.mh-field{display:flex;flex-direction:column;gap:6px}
.mh-label{font-size:12.5px;font-weight:600;color:var(--mh-ink-2);display:flex;justify-content:space-between}
.mh-input,.mh-select,.mh-textarea{width:100%;border:1px solid transparent;outline:none;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well);color:var(--mh-ink);font-size:13.5px}
.mh-input,.mh-select{height:36px;padding:0 12px}
.mh-textarea{min-height:84px;padding:9px 12px;resize:vertical}
.mh-input::placeholder,.mh-textarea::placeholder{color:var(--mh-ink-3)}
.mh-input:focus,.mh-select:focus,.mh-textarea:focus{border-color:var(--mh-accent);box-shadow:var(--mh-shadow-well),0 0 0 2px var(--mh-accent-muted)}

/* Segmented Control, Switch, Slider & Boiled-Sweet Swatch */
.mh-seg{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well)}
.mh-seg button{height:30px;padding:0 12px;border:0;border-radius:var(--mh-r-sm);background:transparent;color:var(--mh-ink-2);font-size:12.5px;font-weight:600;cursor:pointer}
.mh-seg button[aria-selected="true"],.mh-seg button.is-active{background:var(--mh-raised-grad);color:var(--mh-ink);box-shadow:var(--mh-shadow-raised)}
.mh-switch{width:38px;height:22px;padding:0;border:0;border-radius:999px;background:var(--mh-socket);box-shadow:var(--mh-shadow-socket);position:relative;cursor:pointer;transition:background 180ms ease}
.mh-switch::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--mh-knob-grad);box-shadow:var(--mh-shadow-knob);transition:transform 180ms cubic-bezier(.34,1.56,.64,1)}
.mh-switch[aria-checked="true"],.mh-switch.is-on{background:var(--mh-primary-grad)}
.mh-switch[aria-checked="true"]::after,.mh-switch.is-on::after{transform:translateX(16px)}
.mh-swatch{width:30px;height:30px;border:0;border-radius:50%;position:relative;cursor:pointer;box-shadow:inset 0 -2px 0 rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.15);transition:transform 140ms cubic-bezier(.34,1.56,.64,1)}
.mh-swatch::after{content:"";position:absolute;left:21%;top:15%;width:34%;height:22%;border-radius:999px;background:rgba(255,255,255,.52);transform:rotate(-28deg)}
.mh-swatch:hover{transform:scale(1.08)}
.mh-swatch.is-selected,.mh-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px var(--mh-surface),0 0 0 4px var(--mh-accent)}

/* KPI Metric Card, Badges, Alerts, Tabs, Table & Modal */
.mh-metric{background:var(--mh-surface);border:1px solid var(--mh-line);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:16px 18px;display:flex;flex-direction:column;gap:6px}
.mh-metric-value{font:800 28px/1.12 "Bricolage Grotesque",sans-serif;letter-spacing:-0.03em;font-variant-numeric:tabular-nums}
.mh-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:700;background:var(--mh-well);color:var(--mh-ink-2)}
.mh-badge-accent{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
.mh-badge-info{background:var(--mh-info-soft);color:var(--mh-info)}
.mh-badge-success{background:var(--mh-success-soft);color:var(--mh-success)}
.mh-badge-warning{background:var(--mh-warning-soft);color:var(--mh-warning)}
.mh-badge-danger{background:var(--mh-danger-soft);color:var(--mh-danger)}
.mh-alert{padding:11px 14px;border-radius:var(--mh-r-md);background:var(--mh-info-soft);color:var(--mh-ink);font-size:13px;display:flex;gap:10px;align-items:flex-start}
.mh-tabs{display:flex;gap:18px;border-bottom:1px solid var(--mh-line)}
.mh-tab{height:36px;padding:0 2px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;position:relative;cursor:pointer}
.mh-tab[aria-selected="true"],.mh-tab.is-active{color:var(--mh-ink)}
.mh-tab[aria-selected="true"]::after,.mh-tab.is-active::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2.5px;border-radius:999px;background:var(--mh-accent)}
.mh-table-wrap{overflow-x:auto;border-radius:var(--mh-r-lg);border:1px solid var(--mh-line);background:var(--mh-surface);box-shadow:var(--mh-shadow-card)}
.mh-table{width:100%;border-collapse:collapse;font-size:13px}
.mh-table th,.mh-table td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--mh-line)}
.mh-table th{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--mh-ink-3);background:var(--mh-tray)}
.mh-table tr:last-child td{border-bottom:0}
.mh-nav-item{height:36px;padding:0 10px;border-radius:var(--mh-r-sm);display:flex;align-items:center;gap:9px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;width:100%;text-align:left}
.mh-nav-item:hover{background:var(--mh-well);color:var(--mh-ink)}
.mh-nav-item.is-active,.mh-nav-item[aria-current="page"]{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
dialog.mh-modal{border:1px solid var(--mh-line);border-radius:var(--mh-r-xl);background:var(--mh-float);color:var(--mh-ink);box-shadow:var(--mh-shadow-modal);padding:22px;max-width:460px;width:calc(100% - 32px)}
dialog.mh-modal::backdrop{background:rgba(15,12,10,.46);backdrop-filter:blur(3px)}
@media (max-width:860px){.mh-shell{grid-template-columns:1fr}.mh-sidebar{display:none}.mh-grid-2,.mh-grid-3,.mh-grid-4{grid-template-columns:1fr}}
@media (pointer:coarse){.mh-btn,.mh-input,.mh-select,.mh-nav-item{min-height:44px}.mh-input,.mh-select,.mh-textarea{font-size:16px}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}
`.trim();

/**
 * Generates a complete standalone `mehan-portable.css` bundling all 3 atmospheres
 * and 6 brand accents (or a specific custom theme configuration).
 */
export function generatePortableCss(customOptions?: MehanThemeOptions): string {
  if (customOptions) {
    const dna = resolveMehanDna(customOptions);
    return [
      `/* Mehan Portable CSS (${dna.atmosphere.name} · ${dna.accent.name}) */`,
      `:root{color-scheme:light;${varsBlock(dna, 'light')}}`,
      `:root[data-theme="dark"]{color-scheme:dark;${varsBlock(dna, 'dark')}}`,
      `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;${varsBlock(dna, 'dark')}}}`,
      CORE_PORTABLE_RULES,
    ].join('\n');
  }

  const lines: string[] = [
    '/* Mehan Portable CSS v1.0.0 — Universal Tactile Design System (All Atmospheres & Accents) */',
  ];

  // Default: Confectionery + Strawberry
  const def = resolveMehanDna({
    name: 'mehan-default',
    atmosphere: 'confectionery',
    accent: 'strawberry',
  });
  lines.push(`:root{color-scheme:light;${varsBlock(def, 'light')}}`);
  lines.push(`:root[data-theme="dark"]{color-scheme:dark;${varsBlock(def, 'dark')}}`);
  lines.push(
    `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;${varsBlock(def, 'dark')}}}`,
  );

  // All 3 Atmospheres × 6 Accents attribute selectors
  for (const atmId of Object.keys(MEHAN_ATMOSPHERES) as MehanAtmosphereId[]) {
    const atmDefault = resolveMehanDna({name: `mh-${atmId}`, atmosphere: atmId});
    lines.push(
      `:root[data-atmosphere="${atmId}"]{${varsBlock(atmDefault, 'light')}}`,
      `:root[data-atmosphere="${atmId}"][data-theme="dark"]{${varsBlock(atmDefault, 'dark')}}`,
      `@media (prefers-color-scheme:dark){:root[data-atmosphere="${atmId}"]:not([data-theme="light"]){${varsBlock(atmDefault, 'dark')}}}`,
    );
    for (const accId of Object.keys(MEHAN_ACCENT_PRESETS) as MehanPresetAccentId[]) {
      const combo = resolveMehanDna({
        name: `mh-${atmId}-${accId}`,
        atmosphere: atmId,
        accent: accId,
      });
      lines.push(
        `:root[data-atmosphere="${atmId}"][data-accent="${accId}"]{${varsBlock(combo, 'light')}}`,
        `:root[data-atmosphere="${atmId}"][data-accent="${accId}"][data-theme="dark"]{${varsBlock(combo, 'dark')}}`,
        `@media (prefers-color-scheme:dark){:root[data-atmosphere="${atmId}"][data-accent="${accId}"]:not([data-theme="light"]){${varsBlock(combo, 'dark')}}}`,
      );
    }
  }

  lines.push(CORE_PORTABLE_RULES);
  return lines.join('\n');
}

export const MEHAN_PORTABLE_RUNTIME_JS = `
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

    var themeBtn = target.closest('[data-mh-theme-toggle]');
    if (themeBtn) {
      var root = document.documentElement;
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    }
  });
})();
`.trim();

/**
 * Generates a 1-click ready-to-paste prompt + inline CSS/JS kit for
 * Claude Artifacts, Gemini Canvas, ChatGPT Canvas, or single-file HTML prototypes.
 */
export function generateAiPrototypeKit(options?: Partial<MehanThemeOptions>): string {
  const dna = resolveMehanDna({
    name: options?.name ?? 'mehan-prototype',
    atmosphere: options?.atmosphere ?? 'confectionery',
    accent: options?.accent,
    depth: options?.depth,
    radiusScale: options?.radiusScale,
  });
  const compactCss = generatePortableCss({
    name: dna.name,
    atmosphere: dna.atmosphere.id,
    accent: dna.accent.seed,
    depth: dna.depth,
    radiusScale: dna.radiusScale,
  });

  return `# Mehan Design System — Single-HTML Prototype Kit (${dna.atmosphere.name} · ${dna.accent.name})

Use the embedded **Mehan Portable CSS + Runtime** below to build a tactile, accessible, responsive single-file HTML prototype (zero external npm build required; works offline & in sandboxed AI previews).

## Core Visual & Markup Rules
1. **Surface Hierarchy:** Page canvas uses \`--mh-paper\`; primary panels use \`.mh-card\`; nested inner groupings inside a card MUST step down to \`.mh-tray\` or \`.mh-well\` (never stack bordered white cards on white cards).
2. **Buttons:** One \`.mh-btn.mh-btn-primary\` per view/section for the main CTA (3px tactile bottom lip); secondary actions use \`.mh-btn.mh-btn-secondary\`; quiet actions use \`.mh-btn.mh-btn-ghost\`.
3. **Typography:** Headings use \`.mh-display\`, \`.mh-h1\`, \`.mh-h2\`, \`.mh-h3\`; numbers/KPIs/codes use \`.mh-mono\` or \`.mh-metric-value\` (\`tabular-nums\`).
4. **Interactive Controls (Auto-Wired by Inline Script):**
   - Theme toggle button: \`<button class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Toggle Theme</button>\`
   - Segmented control: \`<div class="mh-seg"><button aria-selected="true">Day</button><button>Week</button></div>\`
   - Switch: \`<button type="button" role="switch" aria-checked="true" class="mh-switch is-on" aria-label="Enable feature"></button>\`
   - Tabs: \`<div class="mh-tabs"><button class="mh-tab is-active" data-tab="overview">Overview</button><button class="mh-tab" data-tab="activity">Activity</button></div>\` paired with \`<section data-tab-panel="overview">...</section>\`
   - Modal: \`<button class="mh-btn mh-btn-secondary" data-mh-modal-open="demo-dlg">Open</button>\` + \`<dialog id="demo-dlg" class="mh-modal">...<button class="mh-btn mh-btn-secondary" data-mh-modal-close>Close</button></dialog>\`
   - KPI Cards, Badges, Inputs & Tables: \`.mh-metric\`, \`.mh-badge.mh-badge-success|warning|danger|info|accent\`, \`.mh-field > .mh-label + .mh-input|.mh-select|.mh-textarea\`, \`.mh-table-wrap > .mh-table\`.

## Starter Single-File HTML Template (Embed Directly)
\`\`\`html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Prototype</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
${compactCss}
  </style>
</head>
<body>
  <header class="mh-topbar">
    <div class="mh-row"><strong class="mh-h2">mehan</strong><span class="mh-badge mh-badge-accent">${dna.atmosphere.name}</span></div>
    <button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>
  </header>
  <main class="mh-container mh-stack">
    <!-- Build the requested UI here using .mh-* classes -->
  </main>
  <script>
${MEHAN_PORTABLE_RUNTIME_JS}
  </script>
</body>
</html>
\`\`\`
`;
}
