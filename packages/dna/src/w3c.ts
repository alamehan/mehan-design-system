/**
 * W3C Design Tokens Community Group (DTCG) Format Exporter.
 * Enables 1-click interoperability with Figma (Tokens Studio), Penpot,
 * Style Dictionary, and external non-JS design pipelines.
 */

import {contrastRatio, hexToOklch} from './color';
import {
  resolveMehanDna,
  type MehanLipStyle,
  type MehanSegmentedStyle,
  type MehanThemeOptions,
  type MehanWellStyle,
} from './materials';

export interface W3cTokenLeaf {
  $value: string | number;
  $type: 'color' | 'dimension' | 'fontFamily' | 'number' | 'string';
  $description?: string;
  $extensions?: Record<string, unknown>;
}

export interface W3cTokenDocument {
  $schema: string;
  $metadata: {
    generator: string;
    name: string;
    atmosphere: string;
    accent: string;
    depth: number;
    radiusScale: number;
    radiusBase?: number;
    spacingBase: number;
    sizeBase: number;
    typeBase: number;
    typeRatio: number;
    density: string;
    motion: string;
    durationStep: number;
    lipStyle: MehanLipStyle;
    segmentedStyle: MehanSegmentedStyle;
    wellStyle: MehanWellStyle;
  };
  color: {
    light: Record<string, W3cTokenLeaf>;
    dark: Record<string, W3cTokenLeaf>;
  };
  dimension: Record<string, W3cTokenLeaf>;
  fontFamily: Record<string, W3cTokenLeaf>;
}

function colorLeaf(hex: string, description: string, bgForContrast?: string): W3cTokenLeaf {
  const oklch = hex.startsWith('#') && hex.length === 7 ? hexToOklch(hex) : null;
  const ratio =
    bgForContrast && hex.startsWith('#') && hex.length === 7
      ? Number(contrastRatio(hex, bgForContrast).toFixed(2))
      : undefined;
  return {
    $value: hex,
    $type: 'color',
    $description: description,
    $extensions: {
      'design.mehan': {
        ...(oklch
          ? {
              oklch: {
                l: Number(oklch.l.toFixed(4)),
                c: Number(oklch.c.toFixed(4)),
                h: Number(oklch.h.toFixed(1)),
              },
            }
          : {}),
        ...(ratio !== undefined ? {contrastRatio: ratio, wcagAA: ratio >= 4.5} : {}),
      },
    },
  };
}

export function exportW3cDesignTokens(
  options: MehanThemeOptions = {name: 'mehan-confectionery'},
): W3cTokenDocument {
  const dna = resolveMehanDna(options);
  const L = dna.atmosphere.light;
  const D = dna.atmosphere.dark;
  const A = dna.accent;

  return {
    $schema: 'https://tr.designtokens.org/format/',
    $metadata: {
      generator: '@mehan/dna@1.0.0',
      name: dna.name,
      atmosphere: dna.atmosphere.id,
      accent: A.seed,
      depth: dna.depth,
      radiusScale: dna.radiusScale,
      ...(dna.radiusBase !== undefined ? {radiusBase: dna.radiusBase} : {}),
      spacingBase: dna.spacingBase,
      sizeBase: dna.sizeBase,
      typeBase: dna.typeBase,
      typeRatio: dna.typeRatio,
      density: dna.density,
      motion: dna.motion,
      durationStep: dna.durationStep,
      lipStyle: dna.lipStyle,
      segmentedStyle: dna.segmentedStyle,
      wellStyle: dna.wellStyle,
    },
    color: {
      light: {
        paper: colorLeaf(L.paper, 'Page body background'),
        tray: colorLeaf(L.tray, 'Flat subtle grouping tray'),
        surface: colorLeaf(L.surface, 'Default card and panel surface'),
        float: colorLeaf(L.float, 'Floating popover and dialog surface'),
        well: colorLeaf(L.well, 'Recessed input and track well'),
        socket: colorLeaf(L.socket, 'Deep groove for switches and checkboxes'),
        inverted: colorLeaf(L.inverted, 'Inverted espresso/ink surface'),
        onInverted: colorLeaf(L.onInverted, 'Foreground on inverted surface', L.inverted),
        line: colorLeaf(L.line, 'Divider and subtle edge tone'),
        inkPrimary: colorLeaf(L.ink, 'Primary body and heading ink', L.surface),
        inkSecondary: colorLeaf(L.ink2, 'Secondary UI label ink', L.surface),
        inkSupporting: colorLeaf(L.ink3, 'Helper and caption ink', L.well),
        accentSolid: colorLeaf(A.accentLight, 'Primary brand solid fill'),
        accentTop: colorLeaf(A.shade500, 'Primary button top stop (500)'),
        accentBottom: colorLeaf(A.shade700, 'Primary button bottom stop (700)'),
        accentLip: colorLeaf(A.buttonLip, 'Primary button 3D bottom lip (800)'),
        accentText: colorLeaf(A.textLight, 'Readable brand link/accent text', L.surface),
        infoSolid: colorLeaf(dna.statuses.info.solid[0], 'Info solid badge fill'),
        infoText: colorLeaf(dna.statuses.info.text[0], 'Info status text', L.surface),
        successSolid: colorLeaf(dna.statuses.success.solid[0], 'Success solid badge fill'),
        successText: colorLeaf(dna.statuses.success.text[0], 'Success status text', L.surface),
        warningSolid: colorLeaf(dna.statuses.warning.solid[0], 'Warning solid badge fill'),
        warningText: colorLeaf(dna.statuses.warning.text[0], 'Warning status text', L.surface),
        dangerSolid: colorLeaf(dna.statuses.error.solid[0], 'Danger solid badge fill'),
        dangerText: colorLeaf(dna.statuses.error.text[0], 'Danger status text', L.surface),
      },
      dark: {
        paper: colorLeaf(D.paper, 'Dark page body background'),
        tray: colorLeaf(D.tray, 'Dark flat grouping tray'),
        surface: colorLeaf(D.surface, 'Dark card and panel surface'),
        float: colorLeaf(D.float, 'Dark floating popover and dialog surface'),
        well: colorLeaf(D.well, 'Dark recessed input well (strictly darker than surface)'),
        socket: colorLeaf(D.socket, 'Dark deepest control socket'),
        inverted: colorLeaf(D.inverted, 'Dark inverted cream/alabaster surface'),
        onInverted: colorLeaf(D.onInverted, 'Foreground on dark inverted surface', D.inverted),
        line: colorLeaf(D.line, 'Dark divider line'),
        inkPrimary: colorLeaf(D.ink, 'Dark primary ink', D.surface),
        inkSecondary: colorLeaf(D.ink2, 'Dark secondary ink', D.surface),
        inkSupporting: colorLeaf(D.ink3, 'Dark supporting ink', D.surface),
        accentSolid: colorLeaf(A.accentDark, 'Dark brand accent token'),
        accentTop: colorLeaf(A.shade500, 'Dark primary button top stop (500)'),
        accentBottom: colorLeaf(A.shade700, 'Dark primary button bottom stop (700)'),
        accentLip: colorLeaf(A.buttonLip, 'Dark primary button 3D bottom lip (800)'),
        accentText: colorLeaf(A.textDark, 'Dark readable brand accent text', D.surface),
        infoSolid: colorLeaf(dna.statuses.info.solid[1], 'Dark info solid badge fill'),
        infoText: colorLeaf(dna.statuses.info.text[1], 'Dark info status text', D.surface),
        successSolid: colorLeaf(dna.statuses.success.solid[1], 'Dark success solid badge fill'),
        successText: colorLeaf(dna.statuses.success.text[1], 'Dark success status text', D.surface),
        warningSolid: colorLeaf(dna.statuses.warning.solid[1], 'Dark warning solid badge fill'),
        warningText: colorLeaf(dna.statuses.warning.text[1], 'Dark warning status text', D.surface),
        dangerSolid: colorLeaf(dna.statuses.error.solid[1], 'Dark danger solid badge fill'),
        dangerText: colorLeaf(dna.statuses.error.text[1], 'Dark danger status text', D.surface),
      },
    },
    dimension: {
      typeBase: {$value: `${dna.typeBase}px`, $type: 'dimension'},
      spacingBase: {$value: `${dna.spacingBase}px`, $type: 'dimension'},
      controlSm: {$value: dna.sizing.controlSm, $type: 'dimension'},
      controlMd: {$value: dna.sizing.controlMd, $type: 'dimension'},
      controlLg: {$value: dna.sizing.controlLg, $type: 'dimension'},
      cardPadding: {$value: dna.sizing.cardPadding, $type: 'dimension'},
      radiusInner: {$value: dna.radii.inner, $type: 'dimension'},
      radiusElement: {$value: dna.radii.element, $type: 'dimension'},
      radiusContainer: {$value: dna.radii.container, $type: 'dimension'},
      radiusPage: {$value: dna.radii.page, $type: 'dimension'},
      radiusChat: {$value: dna.radii.chat, $type: 'dimension'},
      buttonLip: {$value: `${dna.lipPx}px`, $type: 'dimension'},
    },
    fontFamily: {
      display: {$value: dna.typography.displayFamily, $type: 'fontFamily'},
      body: {$value: dna.typography.bodyFamily, $type: 'fontFamily'},
      mono: {$value: dna.typography.monoFamily, $type: 'fontFamily'},
    },
  };
}
