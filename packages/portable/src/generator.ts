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
  const ctrlMd = dna.density === 'compact' ? '32px' : '36px';
  const ctrlSm = dna.density === 'compact' ? '28px' : '32px';
  const ctrlLg = dna.density === 'compact' ? '40px' : '44px';
  const easeOut =
    dna.motion === 'calm' || dna.motion === 'crisp'
      ? 'cubic-bezier(0.22,1,0.36,1)'
      : dna.motion === 'standard'
        ? 'cubic-bezier(0.2,0.9,0.3,1)'
        : 'cubic-bezier(0.34,1.56,0.64,1)';
  const segSelectedBg =
    dna.segmentedStyle === 'espresso'
      ? mode === 'light'
        ? S.inverted
        : S.inverted
      : 'var(--mh-raised-grad)';
  const segSelectedInk =
    dna.segmentedStyle === 'espresso'
      ? mode === 'light'
        ? S.onInverted
        : dna.atmosphere.light.ink
      : S.ink;

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
    `--mh-card-hairline:${M.cardHairline}`,
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
    `--mh-lip-pad:${dna.lipPx}px`,
    `--mh-seg-active-bg:${segSelectedBg}`,
    `--mh-seg-active-ink:${segSelectedInk}`,
    `--mh-font-display:"${dna.typography.displayFamily}"`,
    `--mh-font-body:"${dna.typography.bodyFamily}"`,
    `--mh-font-mono:"${dna.typography.monoFamily}"`,
    `--mh-font-base:${dna.typeBase}px`,
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
    `--mh-shadow-danger:${M.shadowDanger}`,
    `--mh-shadow-danger-pressed:${M.shadowDangerPressed}`,
    `--mh-info:${dna.statuses.info.text[idx]}`,
    `--mh-info-soft:${dna.statuses.info.muted[idx]}`,
    `--mh-success:${dna.statuses.success.text[idx]}`,
    `--mh-success-soft:${dna.statuses.success.muted[idx]}`,
    `--mh-warning:${dna.statuses.warning.text[idx]}`,
    `--mh-warning-soft:${dna.statuses.warning.muted[idx]}`,
    `--mh-danger:${dna.statuses.error.text[idx]}`,
    `--mh-danger-fill:${dna.statuses.error.solid[0]}`,
    `--mh-danger-soft:${dna.statuses.error.muted[idx]}`,
    `--mh-danger-soft-solid:${dna.statuses.error.softSolid[idx]}`,
    `--mh-r-sm:${dna.radii.inner}`,
    `--mh-r-md:${dna.radii.element}`,
    `--mh-r-lg:${dna.radii.container}`,
    `--mh-r-xl:${dna.radii.page}`,
    `--mh-ctrl-sm:${ctrlSm}`,
    `--mh-ctrl-md:${ctrlMd}`,
    `--mh-ctrl-lg:${ctrlLg}`,
    `--mh-ease:${easeOut}`,
  ].join(';');
}

const CORE_PORTABLE_RULES = `
*,*::before,*::after{box-sizing:border-box}
:root{scrollbar-color:var(--mh-line-strong) transparent}
*{scrollbar-width:thin}
:root[data-density="compact"]{--mh-ctrl-sm:28px;--mh-ctrl-md:32px;--mh-ctrl-lg:40px}
:root[data-motion="calm"]{--mh-ease:cubic-bezier(0.22,1,0.36,1)}
html,body{margin:0;min-height:100%;background:var(--mh-paper);color:var(--mh-ink);font:400 var(--mh-font-base,14px)/1.5 var(--mh-font-body,"Figtree"),ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4,p{margin:0}
p,li,dd,figcaption{text-wrap:pretty}
button,input,select,textarea{font:inherit;color:inherit}
button>svg,a>svg{flex-shrink:0}
.mh-display,.mh-h1,.mh-h2,.mh-h3{font-family:var(--mh-font-display,"Bricolage Grotesque"),var(--mh-font-body,"Figtree"),ui-sans-serif,system-ui,sans-serif;letter-spacing:-0.025em;text-wrap:balance}
.mh-display{font-size:clamp(28px,4vw,42px);line-height:1.12;font-weight:700;letter-spacing:-0.03em}
.mh-h1{font-size:26px;line-height:1.22;font-weight:700}
.mh-h2{font-size:19px;line-height:1.26;font-weight:600}
.mh-h3{font-size:15px;line-height:1.34;font-weight:600}
.mh-muted{color:var(--mh-ink-3);font-size:13px}
.mh-mono{font-family:var(--mh-font-mono,"Geist Mono"),ui-monospace,"SFMono-Regular",Menlo,monospace;font-variant-numeric:tabular-nums;font-size:12px}
.mh-kbd{display:inline-flex;align-items:center;padding:3px 7px;border-radius:6px;background:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);border:0;font:600 11px/1 var(--mh-font-mono,"Geist Mono"),monospace;color:var(--mh-ink-2)}

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
.mh-card{min-width:0;max-width:100%;background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:18px}
.mh-card .mh-card,.mh-tray{background:var(--mh-tray);border:1px solid var(--mh-line);border-radius:var(--mh-r-md);padding:12px;box-shadow:none}
.mh-well{background:var(--mh-well);box-shadow:var(--mh-shadow-well);border-radius:var(--mh-r-md);padding:12px}
.mh-swatch-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:6px 6px 8px}

/* Silky-Smooth Tactile Push Buttons (Perceptual Lip + Optical Face Centering) */
.mh-btn{height:var(--mh-ctrl-md,36px);padding:0 14px;border:0;border-radius:var(--mh-r-md);display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer;text-decoration:none;transition:transform 150ms var(--mh-ease),box-shadow 150ms ease,background-image 150ms ease,background-color 150ms ease}
.mh-btn-sm{height:var(--mh-ctrl-sm,32px);padding:0 11px;font-size:12.5px}
.mh-btn-lg{height:var(--mh-ctrl-lg,44px);padding:0 18px;font-size:14.5px;border-radius:calc(var(--mh-r-md) + 2px)}
.mh-btn-primary{color:#fff;background-color:var(--mh-accent);background-image:var(--mh-primary-grad);box-shadow:var(--mh-shadow-primary);padding-bottom:var(--mh-lip-pad,3px)}
.mh-btn-primary:hover:not(:disabled){background-image:var(--mh-primary-grad-hover);box-shadow:var(--mh-shadow-primary-hover)}
.mh-btn-primary:active:not(:disabled){transform:translateY(1.5px);padding-bottom:min(var(--mh-lip-pad,1px),1px);box-shadow:var(--mh-shadow-primary-pressed);transition-duration:80ms}
.mh-btn-secondary{color:var(--mh-ink);background-color:var(--mh-surface);background-image:var(--mh-raised-grad);box-shadow:var(--mh-shadow-raised);padding-bottom:min(var(--mh-lip-pad,2px),2px)}
.mh-btn-secondary:hover:not(:disabled){box-shadow:var(--mh-shadow-raised-hover)}
.mh-btn-secondary:active:not(:disabled){transform:translateY(1px);padding-bottom:0;box-shadow:var(--mh-shadow-pressed);transition-duration:80ms}
.mh-btn-ghost{background:transparent;color:var(--mh-ink-2)}
.mh-btn-ghost:hover:not(:disabled){background:var(--mh-well);color:var(--mh-ink)}
.mh-btn-danger{color:var(--mh-danger);background:var(--mh-danger-soft-solid);box-shadow:var(--mh-shadow-danger);padding-bottom:min(var(--mh-lip-pad,2px),2px)}
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
.mh-textarea{min-height:84px;padding:9px 12px;resize:vertical;overscroll-behavior-y:auto}
.mh-input::placeholder,.mh-textarea::placeholder{color:var(--mh-ink-3)}
.mh-input:focus,.mh-select:focus,.mh-textarea:focus{box-shadow:var(--mh-shadow-well),0 0 0 2px var(--mh-accent)}

/* Segmented Control, Switch & Boiled-Sweet Swatch */
.mh-seg{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well)}
.mh-seg button{height:calc(var(--mh-ctrl-md,36px) - 6px);padding:0 12px;border:0;border-radius:var(--mh-r-sm);background:transparent;color:var(--mh-ink-2);font-size:12.5px;font-weight:600;cursor:pointer}
.mh-seg button[aria-selected="true"],.mh-seg button.is-active{background:var(--mh-seg-active-bg,var(--mh-raised-grad));color:var(--mh-seg-active-ink,var(--mh-ink));box-shadow:var(--mh-shadow-raised)}
.mh-switch{width:38px;height:22px;padding:0;border:0;border-radius:999px;background:var(--mh-socket);box-shadow:var(--mh-shadow-socket);position:relative;cursor:pointer;transition:background 180ms ease}
.mh-switch::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--mh-knob-grad);box-shadow:var(--mh-shadow-knob);transition:transform 180ms var(--mh-ease)}
.mh-switch[aria-checked="true"],.mh-switch.is-on{background:var(--mh-primary-grad)}
.mh-switch[aria-checked="true"]::after,.mh-switch.is-on::after{transform:translateX(16px)}
.mh-swatch{width:30px;height:30px;border:0;border-radius:50%;position:relative;cursor:pointer;box-shadow:inset 0 -2px 0 rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.15);transition:transform 140ms var(--mh-ease)}
.mh-swatch::after{content:"";position:absolute;left:21%;top:15%;width:34%;height:22%;border-radius:999px;background:rgba(255,255,255,.52);transform:rotate(-28deg)}
.mh-swatch:hover{transform:scale(1.08)}
.mh-swatch.is-selected,.mh-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px var(--mh-surface),0 0 0 4px var(--mh-accent)}

/* KPI Metric Card, Badges, Alerts, Tabs, Table & Borderless Floating Modal */
.mh-metric{min-width:0;max-width:100%;background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:16px 18px;display:flex;flex-direction:column;gap:6px}
.mh-metric-value{font:700 28px/1.15 var(--mh-font-display,"Bricolage Grotesque"),sans-serif;letter-spacing:-0.03em;font-variant-numeric:tabular-nums}
.mh-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:600;background:var(--mh-well);color:var(--mh-ink-2)}
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
.mh-table-wrap{overflow-x:auto;overscroll-behavior-x:contain;overscroll-behavior-y:auto;border-radius:var(--mh-r-lg);border:1px solid var(--mh-card-hairline);background:var(--mh-surface);box-shadow:var(--mh-shadow-card)}
.mh-table{width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}
.mh-table th,.mh-table td{padding:10px 14px;text-align:left;border-bottom:1px solid var(--mh-line)}
.mh-table th{font-size:12px;font-weight:600;letter-spacing:-0.005em;color:var(--mh-ink-2);background:var(--mh-tray);border-bottom:1px solid var(--mh-line-strong)}
.mh-table tr:last-child td{border-bottom:0}
.mh-nav-item{height:var(--mh-ctrl-md,36px);padding:0 10px;border-radius:var(--mh-r-sm);display:flex;align-items:center;gap:9px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;width:100%;text-align:left}
.mh-nav-item:hover{background:var(--mh-well);color:var(--mh-ink)}
.mh-nav-item.is-active,.mh-nav-item[aria-current="page"]{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
dialog.mh-modal{border:0;overscroll-behavior:contain;border-radius:var(--mh-r-xl);background:var(--mh-float);color:var(--mh-ink);box-shadow:var(--mh-shadow-modal);padding:22px;max-width:460px;width:calc(100% - 32px)}
dialog.mh-modal::backdrop{background:rgba(15,12,10,.46);backdrop-filter:blur(3px)}
.mh-split{display:inline-flex;align-items:stretch;position:relative}
.mh-split>.mh-btn:first-child{border-top-right-radius:0;border-bottom-right-radius:0}
.mh-split>.mh-btn:nth-child(2){border-top-left-radius:0;border-bottom-left-radius:0;padding-inline:9px;border-left:1px solid rgba(255,255,255,.24)}
.mh-copy-btn[data-copied="true"]{color:var(--mh-success)}
.mh-mid-trunc{display:inline-flex;align-items:baseline;max-width:100%;min-width:0;overflow:hidden}
.mh-mid-head{flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mh-mid-tail{flex:0 0 auto;white-space:nowrap}
.mh-anchor-grid{display:inline-grid;grid-template-columns:repeat(3,22px);grid-template-rows:repeat(3,22px);gap:3px;padding:4px;border-radius:var(--mh-r-sm);background:var(--mh-well);box-shadow:var(--mh-shadow-well)}
.mh-anchor-grid button{border:0;border-radius:5px;background:transparent;display:grid;place-items:center;cursor:pointer;padding:0}
.mh-anchor-grid button::after{content:"";width:5px;height:5px;border-radius:999px;background:var(--mh-ink-3)}
.mh-anchor-grid button[aria-checked="true"]{background:var(--mh-surface);box-shadow:var(--mh-shadow-raised)}
.mh-anchor-grid button[aria-checked="true"]::after{width:8px;height:8px;background:var(--mh-accent)}
.mh-otp{display:inline-flex;gap:6px;align-items:center}
.mh-otp input{width:38px;height:42px;border:1.5px solid transparent;border-radius:var(--mh-r-sm);background:var(--mh-well);box-shadow:var(--mh-shadow-well);text-align:center;font:700 16px/1 var(--mh-font-mono,"Geist Mono"),monospace;color:var(--mh-ink)}
.mh-error-summary{padding:12px 14px;border-radius:var(--mh-r-md);background:var(--mh-danger-soft);color:var(--mh-ink);display:flex;flex-direction:column;gap:6px}
.mh-inline-msg{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--mh-info)}
.mh-inline-msg.is-error{color:var(--mh-danger)}
.mh-inline-msg.is-success{color:var(--mh-success)}
.mh-timeline{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.mh-timeline li{position:relative;padding-left:20px;font-size:13px}
.mh-timeline li::before{content:"";position:absolute;left:0;top:5px;width:9px;height:9px;border-radius:999px;background:var(--mh-accent)}
.mh-zoom-bar{display:inline-flex;align-items:center;gap:4px;padding:4px;border-radius:999px;background:var(--mh-float);box-shadow:var(--mh-shadow-card)}
@media (max-width:860px){.mh-shell{grid-template-columns:1fr}.mh-sidebar{display:none}.mh-grid-2,.mh-grid-3,.mh-grid-4{grid-template-columns:1fr}}
@media (pointer:coarse){.mh-btn,.mh-input,.mh-select,.mh-nav-item{min-height:44px}.mh-input,.mh-select,.mh-textarea{font-size:16px}}
@media (prefers-contrast:more){.mh-card,.mh-metric,.mh-table-wrap,.mh-input,.mh-select,.mh-textarea,.mh-btn-secondary{outline:1px solid var(--mh-line-strong)}}
@media (forced-colors:active){.mh-btn,.mh-card,.mh-metric,.mh-table-wrap,.mh-input,.mh-select,.mh-textarea,.mh-switch{border:1px solid CanvasText}.mh-seg button[aria-selected="true"],.mh-tab[aria-selected="true"],.mh-swatch.is-selected{outline:2px solid Highlight}.mh-swatch{forced-color-adjust:none}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:.01ms!important}.mh-btn-primary:hover,.mh-btn-secondary:hover,.mh-btn-danger:hover,.mh-swatch:hover{transform:none!important}}
@media print{.mh-topbar,.mh-sidebar,[data-mh-theme-toggle],dialog.mh-modal{display:none!important}.mh-shell{display:block!important;min-height:auto!important}body{background:#fff!important;color:#000!important}.mh-card,.mh-metric,.mh-table-wrap,tr,pre{break-inside:avoid;box-shadow:none!important}}
`.trim();

/**
 * Generates a complete standalone `mehan-portable.css` bundling all 3 atmospheres
 * and 6 brand accents (or a specific custom theme configuration).
 */
export function generatePortableCss(customOptions?: MehanThemeOptions): string {
  if (customOptions) {
    const dna = resolveMehanDna(customOptions);
    return [
      `/* Mehan Portable CSS (${dna.atmosphere.name} · ${dna.accent.name} · ${dna.density} · ${dna.motion}) */`,
      `:root{color-scheme:light;${varsBlock(dna, 'light')}}`,
      `:root[data-theme="dark"]{color-scheme:dark;${varsBlock(dna, 'dark')}}`,
      `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){color-scheme:dark;${varsBlock(dna, 'dark')}}}`,
      CORE_PORTABLE_RULES,
    ].join('\n');
  }

  const lines: string[] = [
    '/* Mehan Portable CSS v1.0.0 — Universal Tactile Design System (All Atmospheres & Accents) */',
  ];

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
  try {
    var saved = localStorage.getItem('mehan-mode');
    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
      document.documentElement.style.colorScheme = saved;
    }
  } catch (e) {}

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    if (target instanceof HTMLDialogElement && target.classList.contains('mh-modal')) {
      var r = target.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        target.close();
        return;
      }
    }

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
      var nextMode = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', nextMode);
      root.style.colorScheme = nextMode;
      try { localStorage.setItem('mehan-mode', nextMode); } catch (err) {}
    }

    var copyBtn = target.closest('[data-mh-copy]');
    if (copyBtn) {
      var payload = copyBtn.getAttribute('data-mh-copy') || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).catch(function () {});
      }
      copyBtn.setAttribute('data-copied', 'true');
      setTimeout(function () { copyBtn.removeAttribute('data-copied'); }, 1800);
    }

    var anchorCell = target.closest('.mh-anchor-grid button');
    if (anchorCell && anchorCell.parentElement) {
      anchorCell.parentElement.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-checked', b === anchorCell ? 'true' : 'false');
      });
    }
  });
})();
`.trim();

/**
 * Generates a 1-click ready-to-paste prompt + inline CSS/JS kit for
 * Claude Artifacts, Gemini Canvas, ChatGPT Canvas, or single-file HTML prototypes.
 */
export function generateAiPrototypeKit(options?: Partial<MehanThemeOptions>): string {
  const fullOptions: MehanThemeOptions = {
    ...options,
    name: options?.name ?? 'mehan-prototype',
    atmosphere: options?.atmosphere ?? 'confectionery',
  };
  const dna = resolveMehanDna(fullOptions);
  const compactCss = generatePortableCss({
    ...fullOptions,
    name: dna.name,
    atmosphere: dna.atmosphere.id,
    accent: dna.accent.seed,
  });

  return `# Mehan Design System — Single-HTML Prototype Kit (${dna.atmosphere.name} · ${dna.accent.name})

Use the embedded **Mehan Portable CSS + Runtime** below to build a tactile, accessible, responsive single-file HTML prototype (zero external npm build required; works offline & in sandboxed AI previews).

## 1. Tactile Surface & Visual Rules
1. **Surface Hierarchy:** Page canvas uses \`--mh-paper\`; primary panels use \`.mh-card\`; nested inner groupings inside a card MUST step down to \`.mh-tray\` or \`.mh-well\` (never stack white bordered cards inside white bordered cards).
2. **Silky-Smooth Tactile Buttons:** One \`.mh-btn.mh-btn-primary\` per screen/dialog for the primary CTA; secondary actions use \`.mh-btn.mh-btn-secondary\`; quiet actions use \`.mh-btn.mh-btn-ghost\`; destructive actions use soft-tactile \`.mh-btn.mh-btn-danger\`.
3. **Typography & Tabular Numbers:** Headings use \`.mh-display\`, \`.mh-h1\`, \`.mh-h2\`, \`.mh-h3\`; numbers/KPIs/timestamps use \`.mh-mono\` or \`.mh-metric-value\` (\`tabular-nums\`).

## 2. Universal UX, Semantic & Copywriting Standards
1. **Grouping & Chunking (Anti-Card-Wall):** Keep intra-group spacing tighter than inter-group spacing (\`8–12px\` inside a group, \`20–24px\` between sections). Use at most \`4\` \`.mh-metric\` KPI cards at the top; render homogeneous lists of \`5+\` records in \`.mh-table-wrap > .mh-table\` rather than walls of repeated cards.
2. **Simple First, Power on Demand:** Keep top-level forms/toolbars to \`<= 5\` primary controls; place expert flags or raw code inside a collapsible \`<details><summary>Advanced settings</summary>...</details>\` (capped at 2 disclosure levels).
3. **Truncation & Tabular Numerals:** Right-align numeric table columns (\`text-align:right\`) with \`tabular-nums\`. Never truncate button labels, error messages, or financial values; clamp multi-line card descriptions to 2 lines with accessible titles.
4. **Semantic Control Boundaries:** Use \`.mh-seg\` ONLY for \`2–5\` immediate view/mode switches; use \`.mh-tabs\` ONLY when switching distinct content panels; use \`.mh-select\` ONLY for form value selection.
5. **Recovery States & Microcopy:**
   - **Sentence case** on all buttons, table headers, labels, and headings (e.g., \`Save changes\`, \`Create project\`, \`Delete item\`). Never shout in ALL CAPS or use vague \`OK\`, \`Yes\`, or \`Submit\`.
   - **Blame-free errors:** State what happened + how to fix it (e.g., \`Enter a valid work email, like name@company.com.\`), preserving user input.
   - **Actionable empty states:** Explain what belongs in the view in one sentence and provide one clear CTA button.
   - **Destructive confirmation:** Confirm irreversible deletes in a \`<dialog class="mh-modal">\` naming the item, with \`Cancel\` + specific \`Delete <noun>\`.

## 3. Auto-Wired Interactive Markup
- **Theme toggle:** \`<button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>\`
- **Segmented control:** \`<div class="mh-seg"><button aria-selected="true">Day</button><button>Week</button></div>\`
- **Switch:** \`<button type="button" role="switch" aria-checked="true" class="mh-switch is-on" aria-label="Enable feature"></button>\`
- **Tabs:** \`<div class="mh-tabs"><button class="mh-tab is-active" data-tab="overview">Overview</button><button class="mh-tab" data-tab="activity">Activity</button></div>\` paired with \`<section data-tab-panel="overview">...</section>\`
- **Modal:** \`<button class="mh-btn mh-btn-secondary" data-mh-modal-open="confirm-dlg">Delete item</button>\` + \`<dialog id="confirm-dlg" class="mh-modal">...<button class="mh-btn mh-btn-secondary" data-mh-modal-close>Cancel</button></dialog>\`

## 4. Starter Single-File HTML Template (Embed Directly)
\`\`\`html
<!doctype html>
<html lang="en" data-theme="light" data-density="${dna.density}" data-motion="${dna.motion}">
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
    <!-- Build the requested UI here using .mh-* classes and Mehan UX rules -->
  </main>
  <script>
${MEHAN_PORTABLE_RUNTIME_JS}
  </script>
</body>
</html>
\`\`\`
`;
}
