import React, {useState} from 'react';
import {HStack, Stack, Text, useToast} from '@astryxdesign/core';
import {
  AnchorMatrix,
  AngleDial,
  ColorWell,
  CopyButton,
  GradientPicker,
  MiddleTruncate,
  SplitButton,
  ThemeSwitch,
  type AnchorPosition,
  type GradientStop,
} from '@mehan/astryx';
import type {SpecimenDefinition} from './SpecimenCard';

export function useCatalogMehanTier1(): SpecimenDefinition[] {
  const showToast = useToast();
  const [themePref, setThemePref] = useState<'light' | 'dark' | 'system'>('system');
  const [wellHex, setWellHex] = useState('#2563eb');
  const [wellAlpha, setWellAlpha] = useState(0.85);
  const [dialDeg, setDialDeg] = useState(135);
  const [anchorPos, setAnchorPos] = useState<AnchorPosition>('bottom-end');
  const [gradAngle, setGradAngle] = useState(135);
  const [gradKind, setGradKind] = useState<'linear' | 'radial'>('linear');
  const [gradStops, setGradStops] = useState<GradientStop[]>([
    {id: 'g1', color: '#ff7597', position: 0},
    {id: 'g2', color: '#d42a5f', position: 52},
    {id: 'g3', color: '#7a1236', position: 100},
  ]);

  return [
    {
      id: 'split-button',
      name: 'SplitButton',
      category: 'Action',
      pkg: 'mehan',
      summaryEn:
        'Compound 3D push-button pairing a one-click primary action with a keyboard-navigable menu of related format variants.',
      summaryId:
        'Tombol komposit 3D yang memadukan aksi utama satu klik dengan menu varian format terkait bernavigasi panah.',
      code: `<SplitButton\n  label="Export PDF"\n  onAction={() => exportPdf()}\n  items={[\n    {id: 'md', label: 'Export Markdown (.md)'},\n    {id: 'json', label: 'Export W3C tokens (.json)'},\n  ]}\n/>`,
      render: () => (
        <HStack gap={2} wrap="wrap" vAlign="center">
          <SplitButton
            size="sm"
            label="Export PDF"
            onAction={() =>
              showToast({type: 'info', body: 'Exported PDF report.'})
            }
            onSelectItem={id =>
              showToast({type: 'info', body: `Exported format: ${id}`})
            }
            items={[
              {
                id: 'md',
                label: 'Export Markdown (.md)',
                description: 'Clean portable document',
              },
              {
                id: 'w3c',
                label: 'Export W3C tokens (.json)',
                description: 'Figma Tokens Studio ready',
              },
            ]}
          />
          <SplitButton
            size="sm"
            variant="secondary"
            label="Deploy staging"
            onAction={() =>
              showToast({type: 'info', body: 'Deploying staging build.'})
            }
            items={[
              {id: 'canary', label: 'Deploy canary (10%)'},
              {id: 'prod', label: 'Promote to production'},
            ]}
          />
        </HStack>
      ),
    },
    {
      id: 'copy-button',
      name: 'CopyButton',
      category: 'Action',
      pkg: 'mehan',
      summaryEn:
        'Zero-jitter clipboard button with focus-safe file:// fallback, width reservation, icon morph, and polite live announcement.',
      summaryId:
        'Tombol salin bebas goyang lebar dengan cadangan file:// aman fokus, perubahan ikon, dan pengumuman pembaca layar.',
      code: `<CopyButton value="pnpm add @mehan/astryx" label="Copy command" copiedLabel="Copied" />`,
      render: () => (
        <HStack gap={2} wrap="wrap" vAlign="center">
          <CopyButton
            value="pnpm add @mehan/astryx"
            label="Copy command"
            copiedLabel="Copied"
          />
          <CopyButton
            variant="ghost"
            value="--color-accent"
            label="Copy token"
            copiedLabel="Copied"
          />
        </HStack>
      ),
    },
    {
      id: 'theme-switch',
      name: 'ThemeSwitch',
      category: 'Action',
      pkg: 'mehan',
      summaryEn:
        'Recessed 3-way appearance radiogroup (Light, Dark, Auto) with roving arrow-key navigation.',
      summaryId:
        'Pemilih tampilan 3-arah cekung (Terang, Gelap, Otomatis) dengan navigasi tombol panah.',
      code: `<ThemeSwitch value={mode} onChange={setMode} />`,
      render: () => (
        <ThemeSwitch value={themePref} onChange={setThemePref} />
      ),
    },
    {
      id: 'middle-truncate',
      name: 'MiddleTruncate',
      category: 'Content',
      pkg: 'mehan',
      summaryEn:
        'Pure-CSS middle ellipsis keeping leading path context and trailing file extension or hash digits intact, with optional full copy.',
      summaryId:
        'Pemotong tengah CSS murni yang menjaga awal jalur dan ekstensi file atau digit akhir hash tetap terbaca utuh.',
      code: `<MiddleTruncate text="packages/astryx/src/themes/mehanConfectioneryTheme.ts" endChars={14} monospace copyable />`,
      render: () => (
        <Stack gap={1.5} style={{maxWidth: 270}}>
          <MiddleTruncate
            text="packages/astryx/src/themes/mehanConfectioneryTheme.ts"
            endChars={14}
            monospace
            copyable
          />
          <MiddleTruncate
            text="sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
            endChars={10}
            monospace
          />
        </Stack>
      ),
    },
    {
      id: 'color-well',
      name: 'ColorWell',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Compact checkerboard color chip with tabular hex and alpha readout opening a floating HSV + opacity ColorPicker.',
      summaryId:
        'Chip warna ringkas berlatar papan catur dengan kode hex sejajar yang membuka popover ColorPicker ber-opasitas.',
      code: `<ColorWell label="Fill color" value={hex} onChange={setHex} hasAlpha alpha={alpha} onAlphaChange={setAlpha} />`,
      render: () => (
        <ColorWell
          label="Fill color"
          value={wellHex}
          onChange={setWellHex}
          hasAlpha
          alpha={wellAlpha}
          onAlphaChange={setWellAlpha}
        />
      ),
    },
    {
      id: 'angle-dial',
      name: 'AngleDial',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        '3D ceramic rotary knob with 45° magnetic detents, Shift 1° precision, keyboard slider stepping, and click-to-type degrees.',
      summaryId:
        'Kenop putar keramik 3D dengan kuncian magnetik 45°, presisi Shift 1°, tombol panah, dan ketik derajat langsung.',
      code: `<AngleDial label="Key light" value={angle} onChange={setAngle} />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <AngleDial label="Key light" value={dialDeg} onChange={setDialDeg} />
          <Text type="supporting" color="secondary">
            Double-click knob to reset to 135°.
          </Text>
        </HStack>
      ),
    },
    {
      id: 'anchor-matrix',
      name: 'AnchorMatrix',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Tactile 3×3 nine-point spatial origin picker with 2D arrow-key radiogroup navigation.',
      summaryId:
        'Pemilih titik jangkar spasial 3×3 dengan navigasi tombol panah dua dimensi.',
      code: `<AnchorMatrix label="Watermark pin" value={pos} onChange={setPos} />`,
      render: () => (
        <AnchorMatrix
          label="Watermark pin"
          value={anchorPos}
          onChange={setAnchorPos}
        />
      ),
    },
    {
      id: 'gradient-picker',
      name: 'GradientPicker',
      category: 'Form Controls',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Multi-stop OKLab gradient studio with rail click stop insertion, ColorWell stop tinting, Linear/Radial switch, and AngleDial.',
      summaryId:
        'Studio gradien multi-titik OKLab dengan tambah titik di rel, ColorWell per titik, mode Linear/Radial, dan AngleDial.',
      code: `<GradientPicker stops={stops} onStopsChange={setStops} angle={angle} onAngleChange={setAngle} kind={kind} onKindChange={setKind} />`,
      render: () => (
        <GradientPicker
          stops={gradStops}
          onStopsChange={setGradStops}
          angle={gradAngle}
          onAngleChange={setGradAngle}
          kind={gradKind}
          onKindChange={setGradKind}
        />
      ),
    },
  ];
}
