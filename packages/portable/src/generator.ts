import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  resolveMehanDna,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
  type MehanThemeOptions,
  type ResolvedMehanDna,
} from '@mehan/dna';

export interface MehanAiKitOptions extends Partial<MehanThemeOptions> {
  /** Base URL serving `<runtimePrefix>-runtime.css`, `<runtimePrefix>-runtime.js`, and `fonts/*.woff2`. */
  cdnBaseUrl?: string;
  /** Runtime bundle filename prefix (defaults to `'mehan'`; adapts automatically on scope switch). */
  runtimePrefix?: string;
  /** Optional Astryx raw token overrides from Studio Theme Editor. */
  tokens?: Record<string, string>;
  /** Optional Astryx component slot overrides from Studio Theme Editor. */
  components?: Record<string, unknown>;
  /** Initial color mode (`'light'` | `'dark'`). @default 'light' */
  defaultMode?: 'light' | 'dark';
}

const DEFAULT_CDN_BASE_URL = 'https://alamehan.github.io/mehan-design-system/cdn';

function varsBlock(dna: ResolvedMehanDna, mode: 'light' | 'dark'): string {
  const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
  const M = mode === 'light' ? dna.materials.light : dna.materials.dark;
  const A = dna.accent;
  const idx = mode === 'light' ? 0 : 1;
  const ctrlMd = dna.density === 'compact' ? '32px' : '36px';
  const ctrlSm = dna.density === 'compact' ? '28px' : '32px';
  const ctrlLg = dna.density === 'compact' ? '40px' : '44px';
  const ctrlFontSm = `${Math.max(12, Math.round((dna.typeBase - 1.5) * 2) / 2)}px`;
  const ctrlFontMd = `${dna.typeBase}px`;
  const ctrlFontLg = `${Math.round((dna.typeBase + 1) * 2) / 2}px`;
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
    `--mh-ctrl-font-sm:${ctrlFontSm}`,
    `--mh-ctrl-font-md:${ctrlFontMd}`,
    `--mh-ctrl-font-lg:${ctrlFontLg}`,
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
.mh-code{font:500 0.88em/1.25 var(--mh-font-mono,"Geist Mono"),monospace;padding:1px 5px;border-radius:5px;background:var(--mh-well);border:1px solid var(--mh-line);color:var(--mh-ink)}
.mh-blockquote{margin:0;padding:12px 14px 12px 16px;border-left:3.5px solid var(--mh-accent);border-radius:4px var(--mh-r-md) var(--mh-r-md) 4px;background:var(--mh-tray);color:var(--mh-ink)}
details.mh-disclosure{border-radius:var(--mh-r-md);border:1px solid var(--mh-line);background:var(--mh-tray);padding:10px 14px}
details.mh-disclosure>summary{cursor:pointer;font-family:var(--mh-font-display,"Bricolage Grotesque"),sans-serif;font-weight:600;list-style:none}
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
.mh-btn{height:var(--mh-ctrl-md,36px);padding:0 15px;border:0;border-radius:var(--mh-r-md);display:inline-flex;align-items:center;justify-content:center;gap:7px;font-size:var(--mh-ctrl-font-md,14px);line-height:1.2;font-weight:600;white-space:nowrap;cursor:pointer;text-decoration:none;transition:transform 150ms var(--mh-ease),box-shadow 150ms ease,background-image 150ms ease,background-color 150ms ease}
.mh-btn-sm{height:var(--mh-ctrl-sm,32px);padding:0 12px;font-size:var(--mh-ctrl-font-sm,12.5px)}
.mh-btn-lg{height:var(--mh-ctrl-lg,44px);padding:0 19px;font-size:var(--mh-ctrl-font-lg,15px);border-radius:calc(var(--mh-r-md) + 2px)}
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
.mh-btn:focus-visible,.mh-icon-btn:focus-visible,.mh-seg button:focus-visible,.mh-switch:focus-visible,.mh-tab:focus-visible,.mh-swatch:focus-visible,.mh-nav-item:focus-visible,.mh-anchor-grid button:focus-visible,.mh-cv-item:focus-visible{outline:2px solid var(--mh-ink);outline-offset:2px}

/* Borderless Recessed-Well Form Controls */
.mh-field{display:flex;flex-direction:column;gap:6px}
.mh-label{font-size:var(--mh-ctrl-font-sm,12.5px);font-weight:600;color:var(--mh-ink-2);display:flex;justify-content:space-between}
.mh-input,.mh-select,.mh-textarea{width:100%;border:0;outline:none;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well);color:var(--mh-ink);font-size:var(--mh-ctrl-font-md,14px);transition:box-shadow 140ms ease}
.mh-input,.mh-select{height:var(--mh-ctrl-md,36px);padding:0 12px}
.mh-textarea{min-height:84px;padding:9px 12px;resize:vertical;overscroll-behavior-y:auto}
.mh-input::placeholder,.mh-textarea::placeholder{color:var(--mh-ink-3)}
.mh-input:focus,.mh-select:focus,.mh-textarea:focus{box-shadow:var(--mh-shadow-well),0 0 0 2px var(--mh-accent)}

/* Segmented Control, Switch & Boiled-Sweet Swatch */
.mh-seg{display:inline-flex;flex-wrap:wrap;align-items:center;gap:2px;padding:3px;max-width:100%;border-radius:var(--mh-r-md);background:var(--mh-well);box-shadow:var(--mh-shadow-well)}
.mh-seg button{height:calc(var(--mh-ctrl-md,36px) - 6px);padding:0 12px;border:0;border-radius:var(--mh-r-sm);background:transparent;color:var(--mh-ink-2);font-size:var(--mh-ctrl-font-md,14px);font-weight:600;cursor:pointer}
.mh-seg button[aria-selected="true"],.mh-seg button.is-active{background:var(--mh-seg-active-bg,var(--mh-raised-grad));color:var(--mh-seg-active-ink,var(--mh-ink));box-shadow:var(--mh-shadow-raised)}
.mh-switch{width:38px;height:22px;padding:0;border:0;border-radius:999px;background:var(--mh-socket);box-shadow:var(--mh-shadow-socket);position:relative;cursor:pointer;transition:background 180ms ease}
.mh-switch::after{content:"";position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:var(--mh-knob-grad);box-shadow:var(--mh-shadow-knob);transition:transform 180ms var(--mh-ease)}
.mh-switch[aria-checked="true"],.mh-switch.is-on{background:var(--mh-primary-grad)}
.mh-switch[aria-checked="true"]::after,.mh-switch.is-on::after{transform:translateX(16px)}
.mh-swatch{width:30px;height:30px;border:0;border-radius:50%;position:relative;cursor:pointer;box-shadow:inset 0 -2px 0 rgba(0,0,0,.16),inset 0 0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.15);transition:transform 140ms var(--mh-ease)}
.mh-swatch::after{content:"";position:absolute;left:21%;top:15%;width:34%;height:22%;border-radius:999px;background:rgba(255,255,255,.52);transform:rotate(-28deg)}
.mh-swatch:hover{transform:scale(1.08)}
.mh-swatch.is-selected,.mh-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px var(--mh-surface),0 0 0 4px var(--mh-accent)}

/* KPI Metric Card, Badges, Alerts, Tabs, Table, Drawer, Toast, Stepper, Progress, Avatar & Modal */
.mh-metric{min-width:0;max-width:100%;background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:16px 18px;display:flex;flex-direction:column;gap:6px}
.mh-metric-value{font:700 28px/1.15 var(--mh-font-display,"Bricolage Grotesque"),sans-serif;letter-spacing:-0.03em;font-variant-numeric:tabular-nums}
.mh-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;font-size:11.5px;font-weight:600;white-space:nowrap;background:var(--mh-well);color:var(--mh-ink-2)}
.mh-badge-accent{background:var(--mh-accent-soft);color:var(--mh-accent-text)}
.mh-badge-info{background:var(--mh-info-soft);color:var(--mh-info)}
.mh-badge-success{background:var(--mh-success-soft);color:var(--mh-success)}
.mh-badge-warning{background:var(--mh-warning-soft);color:var(--mh-warning)}
.mh-badge-danger{background:var(--mh-danger-soft);color:var(--mh-danger)}
.mh-avatar{width:34px;height:34px;border-radius:999px;display:inline-grid;place-items:center;flex:none;font:700 12.5px/1 var(--mh-font-display,"Bricolage Grotesque"),sans-serif;background:var(--mh-accent-soft);color:var(--mh-accent-text);border:1px solid var(--mh-line)}
.mh-progress{height:8px;width:100%;border-radius:999px;background:var(--mh-socket);overflow:hidden}
.mh-progress-fill{height:100%;border-radius:999px;background:var(--mh-accent);transition:width 220ms var(--mh-ease)}
.mh-stepper{display:flex;align-items:center;gap:10px;flex-wrap:wrap;list-style:none;margin:0;padding:0}
.mh-step{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--mh-ink-3)}
.mh-step::before{content:attr(data-step);width:22px;height:22px;border-radius:999px;display:inline-grid;place-items:center;font:700 11px/1 var(--mh-font-mono,"Geist Mono"),monospace;background:var(--mh-well);color:var(--mh-ink-2)}
.mh-step.is-active{color:var(--mh-ink)}
.mh-step.is-active::before{background:var(--mh-accent);color:#fff}
.mh-step.is-done{color:var(--mh-success)}
.mh-step.is-done::before{content:"✓";background:var(--mh-success-soft);color:var(--mh-success)}
.mh-empty{padding:32px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;border-radius:var(--mh-r-lg);border:1px dashed var(--mh-line-strong);background:var(--mh-tray)}
.mh-alert{padding:11px 14px;border-radius:var(--mh-r-md);background:var(--mh-info-soft);color:var(--mh-ink);font-size:13px;display:flex;gap:10px;align-items:flex-start}
.mh-tabs{display:flex;gap:18px;border-bottom:1px solid var(--mh-line);overflow-x:auto}
.mh-tab{height:var(--mh-ctrl-md,36px);padding:0 2px;border:0;background:transparent;color:var(--mh-ink-2);font-size:13px;font-weight:600;white-space:nowrap;position:relative;cursor:pointer}
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
dialog.mh-drawer{border:0;margin:0 0 0 auto;max-height:100dvh;height:100dvh;max-width:440px;width:calc(100% - 40px);padding:20px;border-radius:var(--mh-r-xl) 0 0 var(--mh-r-xl);background:var(--mh-float);color:var(--mh-ink);box-shadow:var(--mh-shadow-modal);overscroll-behavior:contain}
dialog.mh-drawer::backdrop{background:rgba(15,12,10,.36);backdrop-filter:blur(2px)}
.mh-toast-stack{position:fixed;right:18px;bottom:18px;z-index:99;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.mh-toast{pointer-events:auto;padding:10px 14px;border-radius:var(--mh-r-md);background:var(--mh-inverted);color:var(--mh-on-inverted);box-shadow:var(--mh-shadow-float);font-size:13px;font-weight:600}
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
.mh-otp input{width:38px;height:42px;border:1.5px solid transparent;border-radius:var(--mh-r-sm);background:var(--mh-well);box-shadow:var(--mh-shadow-well);text-align:center;font:700 16px/1 var(--mh-font-mono,"Geist Mono"),monospace;color:var(--mh-ink);outline:none}
.mh-otp input:focus,.mh-otp input:focus-visible{border-color:var(--mh-accent);box-shadow:var(--mh-shadow-well),0 0 0 2px var(--mh-accent)}
.mh-error-summary{padding:12px 14px;border-radius:var(--mh-r-md);background:var(--mh-danger-soft);color:var(--mh-ink);display:flex;flex-direction:column;gap:6px}
.mh-inline-msg{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--mh-info)}
.mh-inline-msg.is-error{color:var(--mh-danger)}
.mh-inline-msg.is-success{color:var(--mh-success)}
.mh-timeline{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.mh-timeline li{position:relative;padding-left:20px;font-size:13px}
.mh-timeline li::before{content:"";position:absolute;left:0;top:5px;width:9px;height:9px;border-radius:999px;background:var(--mh-accent)}
.mh-zoom-bar{display:inline-flex;align-items:center;gap:4px;padding:4px;border-radius:999px;background:var(--mh-float);box-shadow:var(--mh-shadow-card)}
.mh-workspace{display:grid;grid-template-columns:256px minmax(0,1fr) 292px;border-radius:var(--mh-r-lg);border:1px solid var(--mh-card-hairline);background:var(--mh-surface);box-shadow:var(--mh-shadow-card);overflow:hidden}
.mh-workspace.is-2col{grid-template-columns:264px minmax(0,1fr)}
.mh-ws-pane{padding:14px;background:var(--mh-tray);border-right:1px solid var(--mh-line);display:flex;flex-direction:column;gap:10px}
.mh-ws-pane.is-end{border-right:0;border-left:1px solid var(--mh-line)}
.mh-ws-main{padding:18px;min-width:0;display:flex;flex-direction:column;gap:14px}
.mh-canvas-stage{position:relative;min-height:260px;padding:20px;display:grid;place-items:center;border-radius:var(--mh-r-lg);border:1px solid var(--mh-line);background-color:var(--mh-well);background-image:radial-gradient(color-mix(in srgb,var(--mh-ink-3) 26%,transparent) 1.1px,transparent 1.1px);background-size:18px 18px;box-shadow:var(--mh-shadow-well);overflow:hidden}
.mh-cs-hud{position:absolute;right:12px;bottom:12px;display:inline-flex;gap:6px;z-index:2}
.mh-property-row{display:grid;grid-template-columns:108px minmax(0,1fr);align-items:center;gap:8px;min-height:32px}
.mh-property-row>.mh-label{margin:0}
.mh-chart{background:var(--mh-surface);border:1px solid var(--mh-card-hairline);border-radius:var(--mh-r-lg);box-shadow:var(--mh-shadow-card);padding:14px 16px;display:flex;flex-direction:column;gap:10px}
.mh-hbar{display:grid;grid-template-columns:minmax(100px,150px) minmax(0,1fr) auto;align-items:center;gap:10px;font-size:12.5px}
.mh-hbar-track{height:9px;border-radius:999px;background:var(--mh-socket);overflow:hidden}
.mh-hbar-fill{height:100%;border-radius:999px;background:var(--mh-accent)}
.mh-column-view{display:flex;align-items:stretch;border-radius:var(--mh-r-lg);border:1px solid var(--mh-line);background:var(--mh-surface);overflow-x:auto}
.mh-cv-col{list-style:none;margin:0;padding:6px;min-width:180px;flex:1 1 180px;border-right:1px solid var(--mh-line);display:flex;flex-direction:column;gap:2px}
.mh-cv-col:last-child{border-right:0}
.mh-cv-item{width:100%;min-height:32px;padding:5px 9px;border:0;border-radius:var(--mh-r-sm);background:transparent;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;font-weight:500;cursor:pointer;text-align:left}
.mh-cv-item:hover{background:var(--mh-well)}
.mh-cv-item[aria-selected="true"],.mh-cv-item.is-active{background:var(--mh-accent-soft);color:var(--mh-accent-text);font-weight:600}
@media (max-width:860px),(max-height:559px){.mh-shell{grid-template-columns:1fr;min-height:auto}.mh-sidebar{display:none}.mh-workspace,.mh-workspace.is-2col{grid-template-columns:1fr}.mh-ws-pane,.mh-ws-pane.is-end{border:0;border-bottom:1px solid var(--mh-line)}.mh-grid-2,.mh-grid-3,.mh-grid-4{grid-template-columns:1fr}}
@media (pointer:coarse){.mh-btn,.mh-input,.mh-select,.mh-nav-item{min-height:44px}.mh-input,.mh-select,.mh-textarea{font-size:16px}}
@media (prefers-contrast:more){.mh-card,.mh-metric,.mh-table-wrap,.mh-input,.mh-select,.mh-textarea,.mh-btn-secondary{outline:1px solid var(--mh-line-strong)}}
@media (forced-colors:active){.mh-btn,.mh-card,.mh-metric,.mh-table-wrap,.mh-input,.mh-select,.mh-textarea,.mh-switch{border:1px solid CanvasText}.mh-seg button[aria-selected="true"],.mh-tab[aria-selected="true"],.mh-swatch.is-selected{outline:2px solid Highlight}.mh-swatch{forced-color-adjust:none}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:.01ms!important}.mh-btn-primary:hover,.mh-btn-secondary:hover,.mh-btn-danger:hover,.mh-swatch:hover{transform:none!important}}
@media print{.mh-topbar,.mh-sidebar,[data-mh-theme-toggle],dialog.mh-modal,dialog.mh-drawer,.mh-toast-stack{display:none!important}.mh-shell{display:block!important;min-height:auto!important}body{background:#fff!important;color:#000!important}.mh-card,.mh-metric,.mh-table-wrap,tr,pre{break-inside:avoid;box-shadow:none!important}}
`.trim();

function accentDeltaBlock(dna: ResolvedMehanDna, mode: 'light' | 'dark'): string {
  const M = mode === 'light' ? dna.materials.light : dna.materials.dark;
  const A = dna.accent;
  return [
    `--mh-accent:${mode === 'light' ? A.accentLight : A.accentDark}`,
    `--mh-accent-text:${mode === 'light' ? A.textLight : A.textDark}`,
    `--mh-accent-muted:${mode === 'light' ? A.mutedLight : A.mutedDark}`,
    `--mh-accent-soft:${mode === 'light' ? A.softSolidLight : A.softSolidDark}`,
    `--mh-primary-grad:${A.buttonGradient}`,
    `--mh-primary-grad-hover:${A.buttonGradientHover}`,
    `--mh-primary-lip:${A.buttonLip}`,
    `--mh-shadow-primary:${M.shadowPrimary}`,
    `--mh-shadow-primary-hover:${M.shadowPrimaryHover}`,
    `--mh-shadow-primary-pressed:${M.shadowPrimaryPressed}`,
  ].join(';');
}

/**
 * Generates a complete standalone `mehan-portable.css` bundling all 8 atmospheres
 * and 10 brand accents (or a specific custom theme configuration).
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
    '/* Mehan Portable CSS v1.0.0 — Universal Tactile Design System (8 Atmospheres × 10 Accents) */',
  ];

  const def = resolveMehanDna({
    name: 'mehan-default',
    atmosphere: 'porcelain',
    accent: 'blueberry',
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
        `:root[data-atmosphere="${atmId}"][data-accent="${accId}"]{${accentDeltaBlock(combo, 'light')}}`,
        `:root[data-atmosphere="${atmId}"][data-accent="${accId}"][data-theme="dark"]{${accentDeltaBlock(combo, 'dark')}}`,
        `@media (prefers-color-scheme:dark){:root[data-atmosphere="${atmId}"][data-accent="${accId}"]:not([data-theme="light"]){${accentDeltaBlock(combo, 'dark')}}}`,
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

  window.mhToast = function (message) {
    var stack = document.querySelector('.mh-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'mh-toast-stack';
      stack.setAttribute('role', 'status');
      stack.setAttribute('aria-live', 'polite');
      document.body.appendChild(stack);
    }
    var item = document.createElement('div');
    item.className = 'mh-toast';
    item.textContent = String(message || '');
    stack.appendChild(item);
    setTimeout(function () { item.remove(); }, 2800);
  };

  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;

    if (target instanceof HTMLDialogElement && (target.classList.contains('mh-modal') || target.classList.contains('mh-drawer'))) {
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

    var openBtn = target.closest('[data-mh-modal-open],[data-mh-drawer-open]');
    if (openBtn) {
      var dlgId = openBtn.getAttribute('data-mh-modal-open') || openBtn.getAttribute('data-mh-drawer-open') || '';
      var dlg = document.getElementById(dlgId);
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }

    var closeBtn = target.closest('[data-mh-modal-close],[data-mh-drawer-close]');
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

  document.addEventListener('input', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || !input.closest('.mh-otp')) return;
    var digit = input.value.replace(/[^0-9a-zA-Z]/g, '').slice(-1);
    input.value = digit;
    if (digit && input.nextElementSibling instanceof HTMLInputElement) {
      input.nextElementSibling.focus();
    }
  });

  document.addEventListener('keydown', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || !input.closest('.mh-otp')) return;
    if (e.key === 'Backspace' && !input.value && input.previousElementSibling instanceof HTMLInputElement) {
      input.previousElementSibling.focus();
    }
  });

  document.addEventListener('paste', function (e) {
    var input = e.target;
    if (!(input instanceof HTMLInputElement) || !input.closest('.mh-otp')) return;
    var text = (e.clipboardData ? e.clipboardData.getData('text') : '').replace(/[\\s-]+/g, '');
    if (!text) return;
    e.preventDefault();
    var cells = Array.from(input.closest('.mh-otp').querySelectorAll('input'));
    var startIdx = Math.max(0, cells.indexOf(input));
    for (var i = 0; i < text.length && startIdx + i < cells.length; i++) {
      cells[startIdx + i].value = text[i];
    }
    var focusIdx = Math.min(cells.length - 1, startIdx + text.length);
    if (cells[focusIdx]) cells[focusIdx].focus();
  });
})();
`.trim();

function buildSerializedThemeExpression(
  options: MehanAiKitOptions | undefined,
  dna: ResolvedMehanDna,
): string {
  const themeSeed: Record<string, unknown> = {
    name: `mehan-${dna.atmosphere.id}`,
    atmosphere: dna.atmosphere.id,
    accent: options?.accent ?? dna.accent.seed,
  };
  if (options?.depth !== undefined && options.depth !== 1) {
    themeSeed.depth = options.depth;
  }
  if (options?.radiusScale !== undefined && options.radiusScale !== 1) {
    themeSeed.radiusScale = options.radiusScale;
  }
  if (options?.radiusBase !== undefined && options.radiusBase !== null) {
    themeSeed.radiusBase = options.radiusBase;
  }
  if (options?.spacingBase !== undefined && options.spacingBase !== 4) {
    themeSeed.spacingBase = options.spacingBase;
  }
  if (options?.sizeBase !== undefined && options.sizeBase !== 36) {
    themeSeed.sizeBase = options.sizeBase;
  }
  if (options?.typeBase !== undefined && options.typeBase !== 14) {
    themeSeed.typeBase = options.typeBase;
  }
  if (options?.typeRatio !== undefined && options.typeRatio !== 1.22) {
    themeSeed.typeRatio = options.typeRatio;
  }
  if (options?.headingFont && options.headingFont !== 'Bricolage Grotesque') {
    themeSeed.headingFont = options.headingFont;
  }
  if (options?.bodyFont && options.bodyFont !== 'Figtree') {
    themeSeed.bodyFont = options.bodyFont;
  }
  if (options?.codeFont && options.codeFont !== 'Geist Mono') {
    themeSeed.codeFont = options.codeFont;
  }
  if (options?.density && options.density !== 'standard') {
    themeSeed.density = options.density;
  }
  if (options?.motion && options.motion !== 'expressive') {
    themeSeed.motion = options.motion;
  }
  if (options?.durationStep !== undefined && options.durationStep !== 1) {
    themeSeed.durationStep = options.durationStep;
  }
  if (options?.lipStyle && options.lipStyle !== 'candy') {
    themeSeed.lipStyle = options.lipStyle;
  }
  if (options?.segmentedStyle && options.segmentedStyle !== 'raised') {
    themeSeed.segmentedStyle = options.segmentedStyle;
  }
  if (options?.wellStyle && options.wellStyle !== 'recessed') {
    themeSeed.wellStyle = options.wellStyle;
  }
  if (options?.tokens && Object.keys(options.tokens).length > 0) {
    themeSeed.tokens = options.tokens;
  }
  if (options?.components && Object.keys(options.components).length > 0) {
    themeSeed.components = options.components;
  }
  return `createMehanTheme(${JSON.stringify(themeSeed, null, 2)})`;
}

/**
 * Generates the flagship 1-click AI Prototype Kit (`MEHAN-AI-PROTOTYPE-KIT.md`)
 * powered by the self-contained Mehan × Meta Astryx browser runtime bundle so
 * single-file `.html` prototypes render 100% authentic WAI-ARIA components.
 */
export function generateAiPrototypeKit(options?: MehanAiKitOptions): string {
  const fullOptions: MehanThemeOptions = {
    ...options,
    name: options?.name ?? 'mehan-prototype',
    atmosphere: options?.atmosphere ?? 'porcelain',
  };
  const dna = resolveMehanDna(fullOptions);
  const cdnBase = (options?.cdnBaseUrl ?? DEFAULT_CDN_BASE_URL).replace(/\/+$/, '');
  const prefix = (options?.runtimePrefix ?? 'mehan').replace(/[^a-z0-9-]/gi, '') || 'mehan';
  const defaultMode = options?.defaultMode ?? 'light';
  const themeExpr = buildSerializedThemeExpression(options, dna);

  return `# Mehan Design System — Real-Engine Single-HTML Prototype Kit (${dna.atmosphere.name} · ${dna.accent.name})

Use the **Mehan × Meta Astryx Self-Contained Runtime** below to build a tactile, clear, accessible single-file HTML app powered by **100% real Mehan Design System & Meta Astryx React 19 components** (zero npm install, zero bundler, zero third-party CDN risk).

## 1. Single-File HTML Contract (Zero Build Step)
1. **Return ONE complete, runnable \`.html\` file** starting with \`<!doctype html>\` using the exact head + runtime tags in **Section 5**.
2. **Write clean React 19 + TypeScript/JSX inside \`<script type="text/tsx">\`:** \`${prefix}-runtime.js\` compiles TypeScript + JSX + \`import\` statements directly in the browser in \`< 5ms\`. You may use standard \`import { ... } from 'react' | '@astryxdesign/core' | '@mehan/astryx' | 'lucide-react'\` OR destructure \`window.MehanUI\`.
3. **Root Provider Rule:** Always mount \`<Theme theme={appTheme} mode={mode}><LayerProvider><WorkspaceApp mode={mode} setMode={setMode} /></LayerProvider></Theme>\`. Call \`const showToast = useToast()\` **inside** \`<WorkspaceApp />\` (below \`<LayerProvider>\`), never above it.

## 2. Executive Demo Mandate ("Zero Dead Controls")
Every prototype is presented live to product & executive stakeholders — **never render static placeholder controls**:
1. **Live Filtering & Reactive KPIs:** Wire \`<TextInput>\` search, \`<SegmentedControl>\`, \`<Selector placement="below">\`, or \`<DateRangeInput>\` to \`useState\` + \`useMemo\` so filtering immediately updates \`<Table>\` rows, \`<MetricCard>\` totals, and \`<DataChart>\` series. Render \`<EmptyState>\` with a working **Reset filters** \`<Button>\` when \`0\` rows match.
2. **Master-Detail Inspector (\`Table\` -> \`Drawer\` -> \`Toast\`):** Clicking a table row or action button opens an Astryx \`<Drawer>\` (or \`WorkspaceLayout\` \`endPane\`) showing \`<DrawerHeader>\`, workflow \`<Stepper>\`, editable fields, and a primary action (\`Approve\`, \`Save changes\`, \`Assign\`) that mutates state and triggers \`showToast({ type: 'info', body: '...' })\`.
3. **Safe Destructive Flows & Live Theme Toggle:** Wire destructive actions through \`<AlertDialog>\` (naming the exact record) or \`<InlineConfirm>\`, and keep a working Light / Dark toggle in the top header.
4. **Domain-Authentic Sample Data:** Populate \`6–10\` realistic business records with aligned numbers/currencies (\`formatCurrency\`, \`formatNumber\`, \`hasTabularNumbers\`). Never use *"Lorem ipsum"* or *"Item 1"*.

## 3. Verified Component Prop Reference (Do Not Invent Props!)

### A. App Shells, Workspaces & Layout (\`@astryxdesign/core\` + \`@mehan/astryx\`)
- **\`WorkspaceLayout\`** (\`@mehan/astryx\`): \`<WorkspaceLayout scrollMode="page" toolbar={<HStack ... />} startPane={{ title: 'Filters', content: <Stack gap={3}>...</Stack>, defaultWidth: 264, mobileMode: 'collapsible' }} endPane={{ title: 'Details', isOpen: Boolean(selected), onOpenChange: open => !open && setSelected(null), content: <Stack gap={3}>...</Stack> }}>{mainContent}</WorkspaceLayout>\`
- **\`Stack\` / \`HStack\` / \`VStack\`**: \`gap={0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6}\`, \`vAlign="start" | "center" | "end"\`, \`hAlign="start" | "between" | "end"\`, \`wrap="wrap"\`.
- **\`Grid\`**: \`<Grid columns={{ minWidth: 220, max: 4, repeat: 'fit' }} gap={3}>...</Grid>\`
- **\`Card\`**: \`<Card elevation="low" padding={4}>...</Card>\` (step inner boxes down to \`<Section variant="muted" padding={3}>\` or \`<Collapsible>\` — avoid white card-inside-card walls).
- **\`Collapsible\`**: \`<Collapsible defaultIsOpen={false} trigger="Advanced options">...</Collapsible>\`
- **\`Heading\` & \`Text\`**: \`<Heading level={1 | 2 | 3 | 4}>Title</Heading>\` · \`<Text type="body" | "supporting" color="primary" | "secondary" weight="semibold" hasTabularNumbers>...</Text>\`

### B. Buttons, Navigation & Menus (\`label\` Prop Required!)
- **\`Button\`**: \`<Button variant="primary" | "secondary" | "ghost" | "destructive" size="sm" | "md" | "lg" label="Save changes" icon={<Check size={15} />} onClick={...} isDisabled={...} />\` *(passes visible text via \`label\`, NOT children!)*
- **\`IconButton\`**: \`<IconButton variant="ghost" | "secondary" size="sm" | "md" label="Toggle dark mode" icon={<Moon size={15} />} onClick={...} />\`
- **\`SplitButton\`** (\`@mehan/astryx\`): \`<SplitButton label="Publish" variant="primary" onPrimaryClick={...} items={[{ id: 'draft', label: 'Save as draft', onSelect: ... }]} />\`
- **\`CopyButton\` & \`InlineConfirm\`** (\`@mehan/astryx\`): \`<CopyButton value="INV-2026-084" label="Copy ID" size="sm" />\` · \`<InlineConfirm label="Remove" confirmLabel="Confirm remove" onConfirm={...} />\`
- **\`TabList\` + \`Tab\`**: \`<TabList role="tablist" aria-label="Views" value={tab} onChange={setTab} overflow="auto"><Tab value="overview" label="Overview" /><Tab value="approvals" label="Approvals" /></TabList>\`
- **\`SegmentedControl\`**: Wrap 4+ items in \`<div className="mehan-seg-wrap">\`: \`<SegmentedControl label="Window" size="sm" value={period} onChange={setPeriod}><SegmentedControlItem value="7d" label="7 days" /><SegmentedControlItem value="30d" label="30 days" /></SegmentedControl>\`
- **\`DropdownMenu\`**: \`<DropdownMenu button={{ label: 'Actions', variant: 'secondary', size: 'sm' }} items={[{ label: 'Export CSV', onClick: ... }, { type: 'divider' }, { label: 'Archive', onClick: ... }]} />\`

### C. Form Controls (\`onChange\` Passes Value Directly!)
- **\`TextInput\` / \`TextArea\`**: \`<TextInput label="Search requests" size="sm" | "md" placeholder="Search by owner or ID..." value={query} onChange={setQuery} />\` · \`<TextArea label="Review note" value={note} onChange={setNote} rows={3} />\`
- **\`NumberInput\`**: \`<NumberInput label="Headcount" value={count} onChange={val => setCount(val ?? 0)} min={0} step={1} />\`
- **\`Selector\`**: Always pass \`placement="below"\`: \`<Selector label="Department" size="sm" | "md" placement="below" value={dept} onChange={val => val && setDept(val)} options={[{ value: 'all', label: 'All departments' }, { value: 'eng', label: 'Engineering' }]} />\`
- **\`DateRangeInput\`**: \`<DateRangeInput label="Period" size="sm" value={range} onChange={setRange} />\` where \`range\` is \`{ start: '2026-11-01', end: '2026-11-30' } | null\`.
- **\`Switch\` & \`CheckboxInput\`**: Uses \`value\` boolean (NOT \`checked\`!): \`<Switch label="Auto-escalate SLA" value={enabled} onChange={checked => setEnabled(checked)} />\` · \`<CheckboxInput label="Include archived" value={inc} onChange={checked => setInc(checked)} />\`

### D. KPIs, Charts, Tables & Workflow Status
- **\`MetricCard\`** (\`@mehan/astryx\`): \`<MetricCard label="Net Revenue" value="Rp 1,48 M" delta={{ value: '+14.8%', direction: 'up' }} caption="vs. last 30 days" icon={<TrendingUp size={16} />} />\`
- **\`DataChart\`** (\`@mehan/astryx\`): \`<DataChart kind="area" | "bar" | "line" | "horizontal-bar" title="Monthly Throughput" subtitle="Completed vs. target" categories={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']} series={[{ id: 'actual', label: 'Completed', values: [42, 51, 58, 63, 71, 84] }, { id: 'target', label: 'Target', values: [40, 48, 55, 60, 68, 75] }]} height={210} />\`
- **\`Sparkline\` / \`Gauge\` / \`ActivityRing\`** (\`@mehan/astryx\`): \`<Sparkline values={[12, 18, 15, 24, 29]} />\` · \`<Gauge value={86} label="SLA compliance" />\`
- **\`Table\`**: Wrap in \`<div className="mehan-table-scroll">\`:
  \`\`\`tsx
  <div className="mehan-table-scroll">
    <Table
      aria-label="Approval requests"
      data={filteredRows}
      hasHover
      density="balanced"
      columns={[
        { key: 'title', header: 'Request', width: proportional(1.6, { minWidth: 180 }), renderCell: row => <Text weight="semibold">{row.title}</Text> },
        { key: 'status', header: 'Status', width: proportional(1, { minWidth: 120 }), renderCell: row => <Badge variant={row.statusVariant} label={row.statusLabel} /> },
        { key: 'amount', header: 'Budget', width: proportional(1, { minWidth: 120 }), renderCell: row => <Text hasTabularNumbers>{formatCurrency(row.amount, 'USD', 'en-US')}</Text> },
        { key: 'actions', header: '', width: pixel(108), renderCell: row => <Button size="sm" variant="secondary" label="Inspect" onClick={() => setSelectedId(row.id)} /> },
      ]}
    />
  </div>
  \`\`\`
- **\`Badge\`**: \`<Badge variant="neutral" | "info" | "success" | "warning" | "error" | "blue" | "teal" | "green" | "orange" | "pink" | "purple" label="Approved" />\`
- **\`Stepper\` + \`Step\`**: \`<Stepper activeStep={1} onStepClick={setStep}><Step step={0} label="Submitted" /><Step step={1} label="Finance review" /><Step step={2} label="Approved" /></Stepper>\`
- **\`ProgressBar\`**: \`<ProgressBar value={76} label="Q4 budget utilization" hasValueLabel variant="accent" | "success" | "warning" | "error" />\`
- **\`Avatar\`**: \`<Avatar name="Nadia Kusuma" size="sm" | "md" status={<AvatarStatusDot variant="success" label="Online" />} />\`
- **\`EmptyState\`**: \`<EmptyState title="No matching requests" description="Try clearing your search or status filter." actions={<Button variant="secondary" label="Reset filters" onClick={resetFilters} />} />\`

### E. Drawers, BottomSheets, Dialogs, Banners & Toasts
- **\`Drawer\` + \`DrawerHeader\`**:
  \`\`\`tsx
  <Drawer isOpen={selected != null} onOpenChange={open => !open && setSelectedId(null)} label={selected ? \`Inspect \${selected.title}\` : 'Details'} width={440}>
    <Layout
      header={<DrawerHeader title={selected?.title ?? ''} subtitle={selected?.id} onOpenChange={open => !open && setSelectedId(null)} />}
      content={<LayoutContent><Stack gap={3}>{/* Inspector details */}</Stack></LayoutContent>}
      footer={<LayoutFooter><HStack hAlign="end" gap={2}><Button variant="secondary" label="Close" onClick={() => setSelectedId(null)} /><Button variant="primary" label="Approve request" onClick={handleApprove} /></HStack></LayoutFooter>}
    />
  </Drawer>
  \`\`\`
- **\`BottomSheet\`**: \`<BottomSheet isOpen={sheetOpen} onOpenChange={setSheetOpen} label="Quick filters" height="72dvh" snapPoints={[0.42, 0.72]}>...</BottomSheet>\`
- **\`Dialog\` + \`DialogHeader\`**: \`<Dialog isOpen={open} onOpenChange={setOpen} width={520} purpose="form"><Layout header={<DialogHeader title="New request" onOpenChange={setOpen} />} content={<LayoutContent>...</LayoutContent>} /></Dialog>\`
- **\`AlertDialog\`**: \`<AlertDialog isOpen={confirmOpen} onOpenChange={setConfirmOpen} title='Cancel request "REQ-204"?' description="This removes the request from the approval queue." cancelLabel="Keep request" actionLabel="Cancel request" onAction={() => { setConfirmOpen(false); ... }} />\`
- **\`Banner\`**: \`<Banner status="info" | "success" | "warning" | "error" container="card" collapsible={false} title="Policy check passed" description="All items meet Q4 budget thresholds." />\`
- **Raw HTML Fallback Buttons (Only inside custom SVGs/canvas):** Always include \`type="button"\` (e.g. \`<button type="button">\`).

## 4. Mehan Spatial, UX & Copywriting Standards
1. **One Primary CTA Per View:** Use one \`variant="primary"\` \`<Button>\` for the main screen or drawer goal; use \`"secondary"\` or \`"ghost"\` for supporting controls.
2. **Chunking & Cognitive Calm:** Cap KPI strips at \`4\` \`<MetricCard>\`s; use \`<Table>\` for \`5+\` items; keep visible toolbar controls \`<= 5\` and tuck secondary filters inside \`<Collapsible>\` or \`<Drawer>\`.
3. **Human Sentence Case & Forgiving Forms:** Write clear sentence-case labels without \`ALL CAPS\`, validate new inputs gently on blur/submit rather than first keystroke, and keep flex/grid children shrink-safe (\`minWidth: 0\`).

## 5. Starter Single-File HTML Template (Copy & Build Inside \`<script type="text/tsx">\`)
\`\`\`html
<!doctype html>
<html lang="en" data-theme="${defaultMode}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Prototype — ${dna.atmosphere.name}</title>
  <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="4" width="28" height="26" rx="8" fill="${dna.accent.buttonLip}"/><rect x="2" y="2" width="28" height="25" rx="8" fill="${dna.accent.accentLight}"/><path d="M9 20V9h3.2l3.8 6.2L19.8 9H23v11h-3v-6.1l-3.2 5.1h-1.6L12 13.9V20H9z" fill="${dna.accent.onAccentLight}"/></svg>`)}" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('mehan-mode');
        var mode = saved === 'dark' || saved === 'light' ? saved : '${defaultMode}';
        document.documentElement.dataset.theme = mode;
        document.documentElement.style.colorScheme = mode;
      } catch (e) {}
    })();
  </script>
  <link rel="stylesheet" href="${cdnBase}/${prefix}-runtime.css" />
</head>
<body data-astryx-theme="mehan-${dna.atmosphere.id}">
  <div id="root"></div>
  <script src="${cdnBase}/${prefix}-runtime.js"></script>
  <script type="text/tsx">
    import React, { useMemo, useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import {
      Avatar,
      Badge,
      Banner,
      Button,
      Card,
      Drawer,
      DrawerHeader,
      EmptyState,
      Grid,
      HStack,
      Heading,
      IconButton,
      LayerProvider,
      Layout,
      LayoutContent,
      LayoutFooter,
      ProgressBar,
      SegmentedControl,
      SegmentedControlItem,
      Selector,
      Stack,
      Step,
      Stepper,
      Table,
      Text,
      TextInput,
      pixel,
      proportional,
      useToast,
    } from '@astryxdesign/core';
    import { Theme } from '@astryxdesign/core/theme';
    import {
      DataChart,
      MetricCard,
      WorkspaceLayout,
      createMehanTheme,
      formatCurrency,
    } from '@mehan/astryx';
    import { Check, Moon, Plus, Search, Sun, TrendingUp } from 'lucide-react';

    const appTheme = ${themeExpr.split('\n').join('\n    ')};

    function PrototypeWorkspace({
      mode,
      onToggleMode,
    }: {
      mode: 'light' | 'dark';
      onToggleMode: () => void;
    }) {
      const showToast = useToast();
      // Build the interactive application state, KPI row, charts, table & drawer here
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 30,
              padding: '10px 20px',
              background: 'var(--color-background-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
              <HStack gap={2} vAlign="center">
                <Heading level={3}>Workspace Prototype</Heading>
                <Badge variant="info" label="${dna.atmosphere.name} · ${dna.accent.name}" />
              </HStack>
              <HStack gap={2} vAlign="center">
                <IconButton
                  variant="secondary"
                  size="sm"
                  label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  icon={mode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                  onClick={onToggleMode}
                />
                <Button
                  variant="primary"
                  size="sm"
                  label="New request"
                  icon={<Plus size={15} />}
                  onClick={() => showToast({ type: 'info', body: 'Ready to create a new record.' })}
                />
              </HStack>
            </HStack>
          </header>

          <main style={{ maxWidth: 1240, width: '100%', margin: '0 auto', padding: '24px 20px', flex: 1 }}>
            {/* Replace with full interactive prototype */}
          </main>
        </div>
      );
    }

    function App() {
      const [mode, setMode] = useState<'light' | 'dark'>(
        () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : '${defaultMode}'),
      );
      const toggleMode = () => {
        const next = mode === 'light' ? 'dark' : 'light';
        setMode(next);
        document.documentElement.dataset.theme = next;
        document.documentElement.style.colorScheme = next;
        try { localStorage.setItem('mehan-mode', next); } catch (e) {}
      };
      return (
        <Theme theme={appTheme} mode={mode}>
          <LayerProvider>
            <PrototypeWorkspace mode={mode} onToggleMode={toggleMode} />
          </LayerProvider>
        </Theme>
      );
    }

    createRoot(document.getElementById('root')!).render(<App />);
  </script>
</body>
</html>
\`\`\`
`;
}

/**
 * Generates a complete, immediately runnable single-HTML starter (`mehan-astryx-cdn.html`)
 * using the self-contained Mehan × Meta Astryx runtime bundle — showcasing live KPI cards,
 * SVG DataChart, searchable/filterable Table, slide-over Drawer inspector with Stepper,
 * Toast feedback, and Light/Dark mode switching.
 */
export function generateStarterCdnHtml(options?: MehanAiKitOptions): string {
  const fullOptions: MehanThemeOptions = {
    ...options,
    name: options?.name ?? 'mehan-starter',
    atmosphere: options?.atmosphere ?? 'porcelain',
  };
  const dna = resolveMehanDna(fullOptions);
  const cdnBase = (options?.cdnBaseUrl ?? DEFAULT_CDN_BASE_URL).replace(/\/+$/, '');
  const prefix = (options?.runtimePrefix ?? 'mehan').replace(/[^a-z0-9-]/gi, '') || 'mehan';
  const defaultMode = options?.defaultMode ?? 'light';
  const themeExpr = buildSerializedThemeExpression(options, dna);

  return `<!doctype html>
<html lang="en" data-theme="${defaultMode}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mehan × Meta Astryx — Single-HTML Executive Prototype Starter (${dna.atmosphere.name})</title>
    <link rel="icon" href="data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="4" width="28" height="26" rx="8" fill="${dna.accent.buttonLip}"/><rect x="2" y="2" width="28" height="25" rx="8" fill="${dna.accent.accentLight}"/><path d="M9 20V9h3.2l3.8 6.2L19.8 9H23v11h-3v-6.1l-3.2 5.1h-1.6L12 13.9V20H9z" fill="${dna.accent.onAccentLight}"/></svg>`)}" />
    <script>
      (function () {
        try {
          var saved = localStorage.getItem('mehan-mode');
          var mode = saved === 'dark' || saved === 'light' ? saved : '${defaultMode}';
          document.documentElement.dataset.theme = mode;
          document.documentElement.style.colorScheme = mode;
        } catch (e) {}
      })();
    </script>
    <link rel="stylesheet" href="${cdnBase}/${prefix}-runtime.css" />
  </head>
  <body data-astryx-theme="mehan-${dna.atmosphere.id}">
    <div id="root"></div>
    <script src="${cdnBase}/${prefix}-runtime.js"></script>
    <script type="text/tsx">
      import React, { useMemo, useState } from 'react';
      import { createRoot } from 'react-dom/client';
      import {
        Avatar,
        Badge,
        Button,
        Card,
        Dialog,
        DialogHeader,
        Drawer,
        DrawerHeader,
        EmptyState,
        Grid,
        HStack,
        Heading,
        IconButton,
        LayerProvider,
        Layout,
        LayoutContent,
        LayoutFooter,
        ProgressBar,
        SegmentedControl,
        SegmentedControlItem,
        Selector,
        Stack,
        Step,
        Stepper,
        Table,
        Text,
        TextArea,
        TextInput,
        pixel,
        proportional,
        useToast,
      } from '@astryxdesign/core';
      import { Theme } from '@astryxdesign/core/theme';
      import {
        DataChart,
        MetricCard,
        createMehanTheme,
        formatCurrency,
      } from '@mehan/astryx';
      import { CheckCircle2, Clock, Moon, Plus, Sun, TrendingUp, Wallet } from 'lucide-react';

      const appTheme = ${themeExpr.split('\n').join('\n      ')};

      interface InitiativeRow extends Record<string, unknown> {
        id: string;
        title: string;
        owner: string;
        department: 'Product' | 'Engineering' | 'Operations';
        budget: number;
        stage: 0 | 1 | 2;
        status: 'pending' | 'approved' | 'in_review';
        note: string;
      }

      const INITIAL_ROWS: InitiativeRow[] = [
        { id: 'INIT-104', title: 'Unified Checkout Latency Reduction', owner: 'Nadia Kusuma', department: 'Engineering', budget: 48500, stage: 1, status: 'in_review', note: 'Cuts p95 payment confirmation from 1.8s to 420ms across regional edges.' },
        { id: 'INIT-108', title: 'Enterprise Self-Serve Onboarding', owner: 'Raka Pratama', department: 'Product', budget: 36000, stage: 2, status: 'approved', note: 'Guided workspace provisioning with SSO & role templates.' },
        { id: 'INIT-112', title: 'Automated Vendor Reconciliation', owner: 'Sinta Maharani', department: 'Operations', budget: 29400, stage: 0, status: 'pending', note: 'Eliminates manual month-end CSV matching for 140+ suppliers.' },
        { id: 'INIT-119', title: 'Mobile Field Inspector Offline Sync', owner: 'Dimas Wijaya', department: 'Engineering', budget: 54000, stage: 1, status: 'in_review', note: 'Conflict-free delta queue for low-signal warehouse tablets.' },
        { id: 'INIT-123', title: 'Q4 Customer Renewal Health Playbook', owner: 'Ayu Lestari', department: 'Operations', budget: 22000, stage: 2, status: 'approved', note: 'Proactive 60-day usage telemetry alerts for enterprise accounts.' },
      ];

      function StarterWorkspace({
        mode,
        onToggleMode,
      }: {
        mode: 'light' | 'dark';
        onToggleMode: () => void;
      }) {
        const showToast = useToast();
        const [rows, setRows] = useState<InitiativeRow[]>(INITIAL_ROWS);
        const [query, setQuery] = useState('');
        const [statusFilter, setStatusFilter] = useState('all');
        const [deptFilter, setDeptFilter] = useState('all');
        const [selectedId, setSelectedId] = useState<string | null>(null);
        const [createOpen, setCreateOpen] = useState(false);
        const [newTitle, setNewTitle] = useState('');
        const [newOwner, setNewOwner] = useState('');

        const filtered = useMemo(
          () =>
            rows.filter(row => {
              if (statusFilter !== 'all' && row.status !== statusFilter) return false;
              if (deptFilter !== 'all' && row.department !== deptFilter) return false;
              if (query.trim()) {
                const q = query.toLowerCase();
                return (
                  row.title.toLowerCase().includes(q) ||
                  row.owner.toLowerCase().includes(q) ||
                  row.id.toLowerCase().includes(q)
                );
              }
              return true;
            }),
          [rows, query, statusFilter, deptFilter],
        );

        const selected = useMemo(
          () => rows.find(r => r.id === selectedId) ?? null,
          [rows, selectedId],
        );

        const approvedBudget = useMemo(
          () => filtered.filter(r => r.status === 'approved').reduce((acc, r) => acc + r.budget, 0),
          [filtered],
        );
        const totalBudget = useMemo(
          () => filtered.reduce((acc, r) => acc + r.budget, 0),
          [filtered],
        );

        const approveItem = (id: string) => {
          setRows(prev =>
            prev.map(r => (r.id === id ? { ...r, status: 'approved', stage: 2 } : r)),
          );
          showToast({ type: 'info', body: \`Approved \${id} and updated portfolio metrics.\` });
        };

        const handleCreate = () => {
          if (!newTitle.trim()) return;
          const nextId = \`INIT-\${124 + rows.length}\`;
          setRows(prev => [
            {
              id: nextId,
              title: newTitle.trim(),
              owner: newOwner.trim() || 'Raihan Allaam',
              department: 'Product',
              budget: 32000,
              stage: 0,
              status: 'pending',
              note: 'Newly proposed Q4 initiative.',
            },
            ...prev,
          ]);
          setNewTitle('');
          setNewOwner('');
          setCreateOpen(false);
          showToast({ type: 'info', body: \`Created \${nextId}.\` });
        };

        return (
          <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
            <header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 30,
                padding: '10px 20px',
                background: 'var(--color-background-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div style={{ maxWidth: 1240, margin: '0 auto' }}>
                <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                  <HStack gap={2} vAlign="center">
                    <Heading level={3}>Portfolio Governance</Heading>
                    <Badge variant="teal" label="${dna.atmosphere.name} · ${dna.accent.name}" />
                  </HStack>
                  <HStack gap={2} vAlign="center">
                    <IconButton
                      variant="secondary"
                      size="sm"
                      label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                      icon={mode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                      onClick={onToggleMode}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      label="New initiative"
                      icon={<Plus size={15} />}
                      onClick={() => setCreateOpen(true)}
                    />
                  </HStack>
                </HStack>
              </div>
            </header>

            <main style={{ maxWidth: 1240, width: '100%', margin: '0 auto', padding: '24px 20px', flex: 1 }}>
              <Stack gap={4}>
                <Grid columns={{ minWidth: 220, max: 3, repeat: 'fit' }} gap={3}>
                  <MetricCard
                    label="Matching initiatives"
                    value={String(filtered.length)}
                    delta={{ value: \`\${rows.filter(r => r.status === 'approved').length} approved\`, direction: 'up' }}
                    caption="Live filtered portfolio count"
                    icon={<TrendingUp size={16} />}
                  />
                  <MetricCard
                    label="Requested budget"
                    value={formatCurrency(totalBudget, 'USD', 'en-US')}
                    delta={{ value: 'Within Q4 cap', direction: 'flat' }}
                    caption="Sum across visible rows"
                    icon={<Wallet size={16} />}
                  />
                  <MetricCard
                    label="Approved allocation"
                    value={formatCurrency(approvedBudget, 'USD', 'en-US')}
                    delta={{ value: '+18.4%', direction: 'up' }}
                    caption="Ready for disbursement"
                    icon={<CheckCircle2 size={16} />}
                  />
                </Grid>

                <Grid columns={{ minWidth: 300, max: 2, repeat: 'fit' }} gap={3}>
                  <DataChart
                    kind="area"
                    title="Cumulative velocity index"
                    subtitle="Completed milestones vs. quarterly plan"
                    categories={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']}
                    series={[
                      { id: 'delivered', label: 'Delivered', values: [28, 39, 52, 68, 81, 94] },
                      { id: 'plan', label: 'Planned', values: [25, 36, 48, 62, 75, 88] },
                    ]}
                    height={196}
                  />
                  <Card elevation="low">
                    <Stack gap={3}>
                      <Heading level={4}>Quarterly budget envelope</Heading>
                      <Text type="supporting" color="secondary">
                        Approved initiatives automatically update utilization against the $220,000 Q4 ceiling.
                      </Text>
                      <ProgressBar
                        value={Math.min(100, Math.round((approvedBudget / 220000) * 100))}
                        label="Approved ceiling utilization"
                        hasValueLabel
                        variant="accent"
                      />
                      <HStack gap={2} vAlign="center">
                        <Clock size={14} />
                        <Text type="supporting" color="secondary">
                          Click any row below to open the slide-over approval Drawer.
                        </Text>
                      </HStack>
                    </Stack>
                  </Card>
                </Grid>

                <Card elevation="low">
                  <Stack gap={3}>
                    <HStack hAlign="between" vAlign="end" wrap="wrap" gap={2}>
                      <div style={{ flex: '1 1 240px', minWidth: 0 }}>
                        <TextInput
                          label="Search initiatives"
                          size="sm"
                          placeholder="Filter by ID, title, or owner..."
                          value={query}
                          onChange={setQuery}
                        />
                      </div>
                      <HStack gap={2} vAlign="end" wrap="wrap">
                        <div className="mehan-seg-wrap">
                          <SegmentedControl
                            label="Status filter"
                            size="sm"
                            value={statusFilter}
                            onChange={setStatusFilter}
                          >
                            <SegmentedControlItem value="all" label="All" />
                            <SegmentedControlItem value="in_review" label="In review" />
                            <SegmentedControlItem value="approved" label="Approved" />
                            <SegmentedControlItem value="pending" label="Pending" />
                          </SegmentedControl>
                        </div>
                        <div style={{ width: 176 }}>
                          <Selector
                            label="Department"
                            isLabelHidden
                            size="sm"
                            placement="below"
                            value={deptFilter}
                            onChange={val => val && setDeptFilter(val)}
                            options={[
                              { value: 'all', label: 'All departments' },
                              { value: 'Engineering', label: 'Engineering' },
                              { value: 'Product', label: 'Product' },
                              { value: 'Operations', label: 'Operations' },
                            ]}
                          />
                        </div>
                      </HStack>
                    </HStack>

                    {filtered.length === 0 ? (
                      <EmptyState
                        title="No matching initiatives"
                        description="Adjust your search query or reset filters to view all portfolio items."
                        actions={
                          <Button
                            variant="secondary"
                            size="sm"
                            label="Reset filters"
                            onClick={() => {
                              setQuery('');
                              setStatusFilter('all');
                              setDeptFilter('all');
                            }}
                          />
                        }
                      />
                    ) : (
                      <div className="mehan-table-scroll">
                        <Table
                          aria-label="Strategic initiatives"
                          data={filtered}
                          hasHover
                          columns={[
                            {
                              key: 'title',
                              header: 'Initiative',
                              width: proportional(1.8, { minWidth: 210 }),
                              renderCell: row => (
                                <Stack gap={0.5}>
                                  <Text weight="semibold">{row.title}</Text>
                                  <Text type="supporting" color="secondary">{row.id} · {row.department}</Text>
                                </Stack>
                              ),
                            },
                            {
                              key: 'owner',
                              header: 'Owner',
                              width: proportional(1.1, { minWidth: 150 }),
                              renderCell: row => (
                                <HStack gap={1.5} vAlign="center">
                                  <Avatar name={row.owner} size="sm" />
                                  <Text>{row.owner}</Text>
                                </HStack>
                              ),
                            },
                            {
                              key: 'status',
                              header: 'Status',
                              width: proportional(0.9, { minWidth: 116 }),
                              renderCell: row => (
                                <Badge
                                  variant={
                                    row.status === 'approved'
                                      ? 'success'
                                      : row.status === 'in_review'
                                        ? 'info'
                                        : 'warning'
                                  }
                                  label={
                                    row.status === 'approved'
                                      ? 'Approved'
                                      : row.status === 'in_review'
                                        ? 'In review'
                                        : 'Pending'
                                  }
                                />
                              ),
                            },
                            {
                              key: 'budget',
                              header: 'Budget',
                              width: proportional(0.8, { minWidth: 108 }),
                              renderCell: row => (
                                <Text weight="semibold" hasTabularNumbers>
                                  {formatCurrency(row.budget, 'USD', 'en-US')}
                                </Text>
                              ),
                            },
                            {
                              key: 'actions',
                              header: '',
                              width: pixel(104),
                              renderCell: row => (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  label="Review"
                                  onClick={() => setSelectedId(row.id)}
                                />
                              ),
                            },
                          ]}
                        />
                      </div>
                    )}
                  </Stack>
                </Card>
              </Stack>
            </main>

            <Drawer
              isOpen={selected != null}
              onOpenChange={open => !open && setSelectedId(null)}
              label={selected ? \`Review \${selected.title}\` : 'Initiative review'}
              width={440}
            >
              <Layout
                header={
                  <DrawerHeader
                    title={selected?.title ?? ''}
                    subtitle={selected ? \`\${selected.id} · \${selected.owner}\` : ''}
                    onOpenChange={open => !open && setSelectedId(null)}
                  />
                }
                content={
                  <LayoutContent>
                    {selected && (
                      <Stack gap={4}>
                        <Stepper
                          activeStep={selected.stage}
                          onStepClick={idx =>
                            setRows(prev =>
                              prev.map(r =>
                                r.id === selected.id ? { ...r, stage: idx as 0 | 1 | 2 } : r,
                              ),
                            )
                          }
                        >
                          <Step step={0} label="Submitted" />
                          <Step step={1} label="Review" />
                          <Step step={2} label="Approved" />
                        </Stepper>
                        <TextArea
                          label="Executive summary"
                          value={selected.note}
                          onChange={val =>
                            setRows(prev =>
                              prev.map(r => (r.id === selected.id ? { ...r, note: val } : r)),
                            )
                          }
                          rows={4}
                        />
                      </Stack>
                    )}
                  </LayoutContent>
                }
                footer={
                  <LayoutFooter>
                    <HStack hAlign="end" gap={2}>
                      <Button
                        variant="secondary"
                        label="Close"
                        onClick={() => setSelectedId(null)}
                      />
                      {selected && selected.status !== 'approved' && (
                        <Button
                          variant="primary"
                          label="Approve initiative"
                          onClick={() => approveItem(selected.id)}
                        />
                      )}
                    </HStack>
                  </LayoutFooter>
                }
              />
            </Drawer>

            <Dialog
              isOpen={createOpen}
              onOpenChange={setCreateOpen}
              width={460}
              purpose="form"
            >
              <Layout
                header={<DialogHeader title="Propose new initiative" onOpenChange={setCreateOpen} />}
                content={
                  <LayoutContent>
                    <Stack gap={3}>
                      <TextInput
                        label="Initiative title"
                        placeholder="e.g., Regional Edge Cache Rollout"
                        value={newTitle}
                        onChange={setNewTitle}
                      />
                      <TextInput
                        label="Executive sponsor"
                        placeholder="e.g., Nadia Kusuma"
                        value={newOwner}
                        onChange={setNewOwner}
                      />
                    </Stack>
                  </LayoutContent>
                }
                footer={
                  <LayoutFooter>
                    <HStack hAlign="end" gap={2}>
                      <Button variant="ghost" label="Cancel" onClick={() => setCreateOpen(false)} />
                      <Button variant="primary" label="Add initiative" onClick={handleCreate} />
                    </HStack>
                  </LayoutFooter>
                }
              />
            </Dialog>
          </div>
        );
      }

      function App() {
        const [mode, setMode] = useState<'light' | 'dark'>(
          () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : '${defaultMode}'),
        );
        const toggleMode = () => {
          const next = mode === 'light' ? 'dark' : 'light';
          setMode(next);
          document.documentElement.dataset.theme = next;
          document.documentElement.style.colorScheme = next;
          try { localStorage.setItem('mehan-mode', next); } catch (e) {}
        };
        return (
          <Theme theme={appTheme} mode={mode}>
            <LayerProvider>
              <StarterWorkspace mode={mode} onToggleMode={toggleMode} />
            </LayerProvider>
          </Theme>
        );
      }

      createRoot(document.getElementById('root')!).render(<App />);
    </script>
  </body>
</html>
`;
}

/**
 * Generates the zero-network offline fallback CSS + vanilla JS AI Prototype Kit
 * for air-gapped environments without internet access.
 */
export function generateOfflineAiPrototypeKit(options?: Partial<MehanThemeOptions>): string {
  const fullOptions: MehanThemeOptions = {
    ...options,
    name: options?.name ?? 'mehan-prototype',
    atmosphere: options?.atmosphere ?? 'porcelain',
  };
  const dna = resolveMehanDna(fullOptions);
  const compactCss = generatePortableCss({
    ...fullOptions,
    name: dna.name,
    atmosphere: dna.atmosphere.id,
    accent: dna.accent.seed,
  });

  return `# Mehan Design System — Offline CSS Single-HTML Prototype Kit (${dna.atmosphere.name} · ${dna.accent.name})

Use the embedded **Mehan Portable CSS + Vanilla Runtime** below to build a tactile, clear, accessible single-file HTML app that runs **100% offline with zero network calls and zero build step**.

## 1. Visual Surfaces, Buttons & UX Standards
1. **Calm Layered Surfaces:** Page background uses \`--mh-paper\`; main panels use \`.mh-card\`; inner boxes step down to \`.mh-tray\` or \`.mh-well\`.
2. **Balanced Tactile Buttons (Always include \`type="button"\`):** Use one \`.mh-btn.mh-btn-primary\` per view; \`.mh-btn.mh-btn-secondary\` for supporting actions; \`.mh-btn.mh-btn-ghost\` for quiet actions; and \`.mh-btn.mh-btn-danger\` for destructive actions.
3. **Executive Interactivity:** Wire live search/filter inputs, clickable table rows opening \`<dialog class="mh-drawer">\`, step indicators (\`.mh-stepper > .mh-step\`), progress bars (\`.mh-progress > .mh-progress-fill\`), empty states (\`.mh-empty\`), and \`window.mhToast('Saved changes')\` feedback.

## 2. Auto-Wired Offline Interactive Markup
- **Theme toggle:** \`<button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>\`
- **Slide-over Drawer:** \`<button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-drawer-open="detail-drawer">Inspect</button>\` + \`<dialog id="detail-drawer" class="mh-drawer">...<button type="button" class="mh-btn mh-btn-secondary" data-mh-drawer-close>Close</button></dialog>\`
- **Modal Dialog:** \`<button type="button" class="mh-btn mh-btn-danger mh-btn-sm" data-mh-modal-open="confirm-dlg">Delete</button>\` + \`<dialog id="confirm-dlg" class="mh-modal">...<button type="button" class="mh-btn mh-btn-secondary" data-mh-modal-close>Cancel</button></dialog>\`
- **Stepper, Progress & Avatar:** \`<ol class="mh-stepper"><li class="mh-step is-done" data-step="1">Submitted</li><li class="mh-step is-active" data-step="2">Review</li></ol>\` · \`<div class="mh-progress"><div class="mh-progress-fill" style="width:72%"></div></div>\` · \`<span class="mh-avatar">NK</span>\`
- **Segmented, Switch & Tabs:** \`<div class="mh-seg"><button type="button" aria-selected="true">All</button><button type="button">Approved</button></div>\` · \`<button type="button" role="switch" aria-checked="true" class="mh-switch is-on" aria-label="Enable"></button>\` · \`<div class="mh-tabs"><button type="button" class="mh-tab is-active" data-tab="a">Overview</button><button type="button" class="mh-tab" data-tab="b">Activity</button></div>\`

## 3. Offline Single-File HTML Template
\`\`\`html
<!doctype html>
<html lang="en" data-theme="light" data-density="${dna.density}" data-motion="${dna.motion}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Offline Prototype</title>
  <style>
${compactCss}
  </style>
</head>
<body>
  <header class="mh-topbar">
    <div class="mh-row"><strong class="mh-h2">Mehan Workspace</strong><span class="mh-badge mh-badge-accent">${dna.atmosphere.name}</span></div>
    <button type="button" class="mh-btn mh-btn-secondary mh-btn-sm" data-mh-theme-toggle>Light / Dark</button>
  </header>
  <main class="mh-container mh-stack">
    <!-- Build interactive UI here -->
  </main>
  <script>
${MEHAN_PORTABLE_RUNTIME_JS}
  </script>
</body>
</html>
\`\`\`
`;
}
