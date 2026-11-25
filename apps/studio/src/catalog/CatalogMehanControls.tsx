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

export function useCatalogMehanControls(): SpecimenDefinition[] {
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
        'Pairs a one-click primary button with a quick dropdown of related format or deploy options.',
      summaryId:
        'Memadukan tombol aksi utama satu klik dengan menu pilihan format atau aksi turunan di sebelahnya.',
      code: `<SplitButton\n  label="Export PDF"\n  onAction={() => exportPdf()}\n  items={[\n    {id: 'md', label: 'Export Markdown (.md)'},\n    {id: 'json', label: 'Export W3C tokens (.json)'},\n  ]}\n/>`,
      render: () => (
        <HStack gap={2} wrap="wrap" vAlign="center">
          <SplitButton
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
        'One-click copy button that keeps a steady width when switching from Copy to Copied and works offline.',
      summaryId:
        'Tombol salin satu klik yang lebarnya tetap stabil saat berubah ke Tersalin serta aman dibuka offline.',
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
      category: 'Utility',
      pkg: 'mehan',
      summaryEn:
        'Three-way Light, Dark, and Auto appearance switcher with smooth arrow-key navigation.',
      summaryId:
        'Pemilih tampilan Terang, Gelap, atau Otomatis mengikuti perangkat dengan navigasi tombol panah.',
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
        'Shortens long file paths or keys in the middle so both the folder name and file extension stay readable.',
      summaryId:
        'Memyingkat jalur file atau kunci panjang di bagian tengah agar nama awal dan ekstensi akhirnya tetap utuh terbaca.',
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
        'Color swatch button showing the active hex and opacity that opens a floating color picker.',
      summaryId:
        'Tombol pemilih warna lengkap dengan kode hex dan transparansi yang membuka panel warna mengambang.',
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
        'Tactile rotary dial for angles with 45° snap points, keyboard arrows, and click-to-type degrees.',
      summaryId:
        'Kenop putar sudut dengan pengunci halus tiap 45°, dukungan tombol panah, dan ketik angka langsung.',
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
        'Nine-point 3×3 alignment grid for choosing corner, edge, or center placement.',
      summaryId:
        'Kotak 9-titik (3×3) untuk memilih posisi perataan di sudut, tepi, atau tengah kanvas.',
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
        'Interactive multi-stop gradient editor: click the bar to add color stops, switch Linear or Radial, and dial the angle.',
      summaryId:
        'Editor gradien interaktif: klik baris warna untuk menambah titik baru, pilih Linear/Radial, dan putar sudutnya.',
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
