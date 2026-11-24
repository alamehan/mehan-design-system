/**
 * Programmatic WCAG 2.2 AA Contrast & Optical Depth Auditor for Mehan themes.
 * Evaluates text, 3-stop primary button gradient bands, status fills, and
 * non-text categorical borders across both Light and Dark modes.
 */

import {contrastRatio, gradientBandContrast, relativeLuminance} from './color';
import {resolveMehanDna, type MehanThemeOptions} from './materials';

export interface ContrastAuditCheck {
  id: string;
  mode: 'light' | 'dark';
  ratio: number;
  minRequired: number;
  passes: boolean;
}

export interface MehanContrastAuditReport {
  themeName: string;
  passesAll: boolean;
  darkDepthMonotonic: boolean;
  failures: ContrastAuditCheck[];
  checks: ContrastAuditCheck[];
}

export function auditMehanThemeContrast(
  options: MehanThemeOptions,
): MehanContrastAuditReport {
  const dna = resolveMehanDna(options);
  const L = dna.atmosphere.light;
  const D = dna.atmosphere.dark;
  const A = dna.accent;

  const checks: ContrastAuditCheck[] = [];
  const push = (
    id: string,
    mode: 'light' | 'dark',
    ratio: number,
    minRequired: number,
  ) => {
    const rounded = Number(ratio.toFixed(2));
    checks.push({
      id,
      mode,
      ratio: rounded,
      minRequired,
      passes: rounded >= minRequired,
    });
  };

  // Light mode text & surface checks
  push('ink-on-paper', 'light', contrastRatio(L.ink, L.paper), 4.5);
  push('ink-on-surface', 'light', contrastRatio(L.ink, L.surface), 4.5);
  push('ink2-on-surface', 'light', contrastRatio(L.ink2, L.surface), 4.5);
  push('ink3-on-well', 'light', contrastRatio(L.ink3, L.well), 4.5);
  push('accent-text-on-surface', 'light', contrastRatio(A.textLight, L.surface), 4.5);
  push('accent-text-on-well', 'light', contrastRatio(A.textLight, L.well), 4.5);
  push('on-accent-solid', 'light', contrastRatio(A.onAccentLight, A.accentLight), 4.5);
  push(
    'primary-button-gradient-band',
    'light',
    gradientBandContrast('#ffffff', [A.shade500, A.accentLight, A.shade700]),
    4.5,
  );

  // Dark mode text & surface checks
  push('ink-on-paper', 'dark', contrastRatio(D.ink, D.paper), 4.5);
  push('ink-on-surface', 'dark', contrastRatio(D.ink, D.surface), 4.5);
  push('ink2-on-surface', 'dark', contrastRatio(D.ink2, D.surface), 4.5);
  push('ink3-on-surface', 'dark', contrastRatio(D.ink3, D.surface), 4.5);
  push('accent-text-on-surface', 'dark', contrastRatio(A.textDark, D.surface), 4.5);
  push('on-accent-solid', 'dark', contrastRatio(A.onAccentDark, A.accentDark), 4.5);

  // Status solid & text contrast
  for (const [statusName, st] of Object.entries(dna.statuses)) {
    push(`status-${statusName}-solid`, 'light', contrastRatio(st.onSolid[0], st.solid[0]), 4.5);
    push(`status-${statusName}-solid`, 'dark', contrastRatio(st.onSolid[1], st.solid[1]), 4.5);
    push(`status-${statusName}-text`, 'light', contrastRatio(st.text[0], L.surface), 4.5);
    push(`status-${statusName}-text`, 'dark', contrastRatio(st.text[1], D.surface), 4.5);
  }

  // Categorical >= 3:1 non-text border contrast (WCAG 1.4.11)
  for (const [catName, ramp] of Object.entries(dna.categorical)) {
    push(`categorical-${catName}-border`, 'light', contrastRatio(ramp.borderLight, L.surface), 3);
    push(`categorical-${catName}-border`, 'dark', contrastRatio(ramp.borderDark, D.surface), 3);
  }

  const lum = (hex: string) => relativeLuminance(hex);
  const darkDepthMonotonic =
    lum(D.socket) < lum(D.well) &&
    lum(D.well) < lum(D.paper) &&
    lum(D.paper) < lum(D.tray) &&
    lum(D.tray) < lum(D.surface) &&
    lum(D.surface) < lum(D.raisedBottom) &&
    lum(D.raisedBottom) < lum(D.raisedTop);

  const failures = checks.filter(c => !c.passes);
  return {
    themeName: dna.name,
    passesAll: failures.length === 0 && darkDepthMonotonic,
    darkDepthMonotonic,
    failures,
    checks,
  };
}
