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
    en: 'Tactile triggers, command menus, segmented switchers, and keyboard-roving toolbars.',
    id: 'Pemicu aksi taktil, menu perintah, pemilih mode cekung, dan bilah alat bernavigasi panah.',
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
    en: 'Calibrated display & body typography, code highlighting, avatars, citations, and empty states.',
    id: 'Tipografi judul & isi terkalibrasi, blok kode, avatar, kutipan, serta tampilan kosong.',
  },
  'Data Visualization': {
    en: 'Tabular KPI metric cards and perceptually balanced OKLCH categorical chart palettes.',
    id: 'Kartu metrik KPI berangka sejajar dan palet warna grafik kategorikal OKLCH.',
  },
  'Feedback & Status': {
    en: 'WCAG-verified semantic badges, inline banners, determinate progress tracks, and shimmers.',
    id: 'Lencana status berkontras terjaga, kotak info sebaris, bilah progres, dan kerangka muat.',
  },
  'Form Controls': {
    en: 'Recessed-well inputs, calendars, comboboxes, HSV color pickers, and studio precision sliders.',
    id: 'Kolom input cekung, kalender, pemilih pencarian, kanvas warna HSV, dan slider presisi.',
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
    en: 'Top-layer modal dialogs, named destructive alerts, drawers, bottom sheets, and command palettes.',
    id: 'Dialog modal pengunci fokus, konfirmasi hapus bernama, laci samping, dan palet perintah.',
  },
  'Table & List': {
    en: 'Row-first data tables with shaded headers and tabular numerals, structured lists, and treeviews.',
    id: 'Tabel data rapi berheader tegas dengan angka sejajar, daftar terstruktur, dan pohon hierarki.',
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
