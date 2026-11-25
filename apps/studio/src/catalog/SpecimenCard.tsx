import React, {useState} from 'react';
import {
  Badge,
  CodeBlock,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from '@astryxdesign/core';
import {Code2, Copy} from 'lucide-react';
import {copyText} from '../studioState';

export type SpecimenPackage = 'core' | 'mehan';

export interface SpecimenDefinition {
  id: string;
  name: string;
  category: OfficialAstryxCategory;
  pkg: SpecimenPackage;
  span?: 'wide' | 'full';
  flush?: boolean;
  summaryEn: string;
  summaryId: string;
  code: string;
  render: () => React.ReactNode;
}

export const OFFICIAL_ASTRYX_CATEGORIES = [
  'Action',
  'Chat',
  'Container',
  'Content',
  'Data Visualization',
  'Feedback & Status',
  'Form Controls',
  'Layout',
  'Navigation',
  'Overlay',
  'Table & List',
  'Utility',
] as const;

export type OfficialAstryxCategory = (typeof OFFICIAL_ASTRYX_CATEGORIES)[number];

export const CATEGORY_LABELS_ID: Record<OfficialAstryxCategory, string> = {
  Action: 'Action · Tombol & Perintah',
  Chat: 'Chat · Percakapan AI',
  Container: 'Container · Wadah & Kartu',
  Content: 'Content · Tipografi & Media',
  'Data Visualization': 'Data Visualization · Metrik & Grafik',
  'Feedback & Status': 'Feedback & Status · Indikator',
  'Form Controls': 'Form Controls · Input & Presisi',
  Layout: 'Layout · Struktur Halaman',
  Navigation: 'Navigation · Navigasi',
  Overlay: 'Overlay · Dialog & Popover',
  'Table & List': 'Table & List · Tabel & Daftar',
  Utility: 'Utility · Utilitas Tema',
};

export const CATEGORY_DESC: Record<
  OfficialAstryxCategory,
  {en: string; id: string}
> = {
  Action: {
    en: 'Tactile triggers, SplitButton, CopyButton, ThemeSwitch, InlineConfirm, CanvasZoomBar, and toolbars.',
    id: 'Pemicu aksi taktil, SplitButton, CopyButton, ThemeSwitch, InlineConfirm, CanvasZoomBar, dan bilah alat.',
  },
  Chat: {
    en: 'Conversational AI threads, tool-execution disclosures, and multi-action message composers.',
    id: 'Utas percakapan AI, rincian eksekusi alat, dan kolom ketik pesan terpadu.',
  },
  Container: {
    en: 'Elevated surfaces, interactive selection cards, snap carousels, and progressive disclosures.',
    id: 'Permukaan kartu bertingkat, kartu pilihan interaktif, rel geser, dan laci lipat.',
  },
  Content: {
    en: 'Calibrated typography, MiddleTruncate paths/keys, code blocks, avatars, citations, and empty states.',
    id: 'Tipografi terkalibrasi, MiddleTruncate path/kunci, blok kode, avatar, kutipan, dan tampilan kosong.',
  },
  'Data Visualization': {
    en: 'Tabular KPI MetricCards, Sparklines, 240° Gauges, concentric ActivityRings, and OKLCH chart palettes.',
    id: 'MetricCard KPI berangka sejajar, Sparkline, Gauge 240°, ActivityRing konsentris, dan palet OKLCH.',
  },
  'Feedback & Status': {
    en: 'WCAG badges, banners, ErrorSummary focus jumps, InlineMessages, progress tracks, and shimmers.',
    id: 'Lencana status, kotak info, lompatan fokus ErrorSummary, InlineMessage, bilah progres, dan kerangka muat.',
  },
  'Form Controls': {
    en: 'Recessed-well fields, DigitEntry OTP, Rating, ImageWell, ColorWell, GradientPicker, AngleDial, AnchorMatrix, TimelineScrubber, and Code/Markdown editors.',
    id: 'Kolom input cekung, DigitEntry OTP, Rating, ImageWell, ColorWell, GradientPicker, AngleDial, AnchorMatrix, TimelineScrubber, serta editor Kode/Markdown.',
  },
  Layout: {
    en: 'Bounded application shells, structured panels, draggable split-panes, and token-stepped stacks.',
    id: 'Kerangka aplikasi, panel terstruktur, pembatas geser interaktif, dan penyusun jarak konsisten.',
  },
  Navigation: {
    en: 'Top bars, collapsible side rails, breadcrumbs, scroll-spy outlines, steppers, and tabs.',
    id: 'Bilah atas, navigasi samping, jejak halaman, daftar isi aktif, penunjuk tahap, dan tab.',
  },
  Overlay: {
    en: 'Modal dialogs, named destructive alerts, drawers, bottom sheets, NotificationCenter, Tour, and command palettes.',
    id: 'Dialog modal, konfirmasi hapus bernama, laci samping, NotificationCenter, Tour, dan palet perintah.',
  },
  'Table & List': {
    en: 'Row-first data tables with shaded headers and tabular numerals, chronological Timelines, lists, and treeviews.',
    id: 'Tabel data rapi berheader tegas dengan angka sejajar, lini masa Timeline, daftar terstruktur, dan pohon hierarki.',
  },
  Utility: {
    en: 'Scoped media contrast zones, local syntax-highlighting themes, and screen-reader helpers.',
    id: 'Zona kontras di atas media gelap, tema sintaks kode lokal, dan utilitas pembaca layar.',
  },
};

export function SpecimenCard({
  item,
  isId,
}: {
  item: SpecimenDefinition;
  isId: boolean;
}) {
  const showToast = useToast();
  const [showCode, setShowCode] = useState(false);

  const handleCopy = async () => {
    await copyText(item.code);
    showToast({
      type: 'info',
      body: isId
        ? `Kode JSX ${item.name} disalin.`
        : `Copied ${item.name} JSX snippet.`,
    });
  };

  const spanClass =
    item.span === 'full'
      ? 'is-full'
      : item.span === 'wide'
        ? 'is-wide'
        : '';

  return (
    <article
      className={`cat-specimen-card ${spanClass}`}
      data-component={item.id}
    >
      <div className="cat-specimen-header">
        <div className="cat-specimen-title-wrap">
          <span className="cat-specimen-title">{item.name}</span>
          {item.pkg === 'mehan' && (
            <Badge variant="pink" label="Mehan" />
          )}
        </div>
        <div className="cat-specimen-actions">
          <Tooltip
            content={
              showCode
                ? isId
                  ? 'Tutup JSX'
                  : 'Hide JSX'
                : isId
                  ? 'Lihat JSX'
                  : 'Inspect JSX'
            }
          >
            <IconButton
              variant={showCode ? 'secondary' : 'ghost'}
              size="sm"
              label={
                isId
                  ? `Lihat JSX ${item.name}`
                  : `Inspect ${item.name} JSX`
              }
              icon={<Code2 size={13} />}
              onClick={() => setShowCode(prev => !prev)}
            />
          </Tooltip>
          <Tooltip
            content={isId ? `Salin JSX ${item.name}` : `Copy ${item.name} JSX`}
          >
            <IconButton
              variant="ghost"
              size="sm"
              label={isId ? `Salin JSX ${item.name}` : `Copy ${item.name} JSX`}
              icon={<Copy size={13} />}
              onClick={() => void handleCopy()}
            />
          </Tooltip>
        </div>
      </div>

      <Text type="supporting" color="secondary" maxLines={2}>
        {isId ? item.summaryId : item.summaryEn}
      </Text>

      <div className={`cat-specimen-stage ${item.flush ? 'is-flush' : ''}`}>
        {item.render()}
      </div>

      {showCode && (
        <CodeBlock
          language="tsx"
          code={item.code}
          hasCopyButton
          maxHeight={180}
        />
      )}
    </article>
  );
}
