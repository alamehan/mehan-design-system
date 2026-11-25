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

/**
 * All 12 official Meta Astryx component categories, ordered architecturally
 * across 4 pillars: Structure -> Actions & Inputs -> Data & Content -> Feedback & Runtime.
 */
export const OFFICIAL_ASTRYX_CATEGORIES = [
  // Pillar I — Structure & Wayfinding
  'Layout',
  'Navigation',
  'Container',
  // Pillar II — Actions & Inputs
  'Action',
  'Form Controls',
  // Pillar III — Data, Content & Visualization
  'Content',
  'Table & List',
  'Data Visualization',
  // Pillar IV — Feedback, Overlays & Runtime
  'Feedback & Status',
  'Overlay',
  'Chat',
  'Utility',
] as const;

export type OfficialAstryxCategory = (typeof OFFICIAL_ASTRYX_CATEGORIES)[number];

export const CATALOG_PILLARS: ReadonlyArray<{
  id: string;
  roman: string;
  en: string;
  idLabel: string;
  categories: ReadonlyArray<OfficialAstryxCategory>;
}> = [
  {
    id: 'structure',
    roman: 'I',
    en: 'Structure & Wayfinding',
    idLabel: 'Struktur & Navigasi',
    categories: ['Layout', 'Navigation', 'Container'],
  },
  {
    id: 'inputs',
    roman: 'II',
    en: 'Actions & Inputs',
    idLabel: 'Aksi & Input',
    categories: ['Action', 'Form Controls'],
  },
  {
    id: 'data',
    roman: 'III',
    en: 'Data, Content & Viz',
    idLabel: 'Data, Konten & Grafik',
    categories: ['Content', 'Table & List', 'Data Visualization'],
  },
  {
    id: 'feedback',
    roman: 'IV',
    en: 'Feedback & Runtime',
    idLabel: 'Status, Overlay & Runtime',
    categories: ['Feedback & Status', 'Overlay', 'Chat', 'Utility'],
  },
];

/**
 * Formats inline backtick segments (`likeThis`) as crisp monospace pills
 * so catalog descriptions and specimen summaries never render raw backticks.
 */
export function renderFormattedCopy(text: string): React.ReactNode {
  if (!text.includes('`')) return text;
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <code key={idx} className="studio-inline-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export interface FormControlSubgroup {
  id: string;
  en: string;
  idLabel: string;
  specimenIds: ReadonlyArray<string>;
}

/**
 * Semantic sub-clusters inside `Form Controls` so 35 controls scan effortlessly
 * instead of rendering as an undifferentiated wall.
 */
export const FORM_CONTROL_SUBGROUPS: ReadonlyArray<FormControlSubgroup> = [
  {
    id: 'text-editors',
    en: 'Text, Verification & Rich Editors',
    idLabel: 'Teks, Verifikasi OTP & Editor Kaya',
    specimenIds: [
      'field',
      'text-input',
      'input-group',
      'digit-entry',
      'text-area',
      'markdown-editor',
      'code-editor',
    ],
  },
  {
    id: 'selection-search',
    en: 'Selection, Toggles & Search',
    idLabel: 'Pilihan, Sakelar & Pencarian',
    specimenIds: [
      'selector',
      'multi-selector',
      'complex-selector',
      'typeahead',
      'tokenizer',
      'power-search',
      'switch',
      'checkbox-input',
      'checkbox-list',
      'radio-list',
      'rating',
    ],
  },
  {
    id: 'numeric-spatial',
    en: 'Numbers, Sliders, Dials & Scrubbers',
    idLabel: 'Angka, Slider, Kenop & Penggeser Waktu',
    specimenIds: [
      'number-input',
      'slider',
      'precision-slider',
      'angle-dial',
      'anchor-matrix',
      'timeline-scrubber',
    ],
  },
  {
    id: 'dates-time',
    en: 'Dates, Ranges & Calendars',
    idLabel: 'Tanggal, Rentang Waktu & Kalender',
    specimenIds: [
      'date-input',
      'time-input',
      'date-time-input',
      'date-range-input',
      'calendar',
    ],
  },
  {
    id: 'color-media',
    en: 'Color, Gradients & Media Dropzones',
    idLabel: 'Warna, Gradien & Unggah Media',
    specimenIds: [
      'color-swatch',
      'color-well',
      'color-picker',
      'gradient-picker',
      'image-well',
      'file-input',
    ],
  },
];

/**
 * Canonical semantic family order within each of the 12 official categories
 * (Core + Mehan unified side-by-side, zero chronological build-order artifacts).
 */
export const CANONICAL_CATEGORY_SPECIMEN_IDS: Record<
  OfficialAstryxCategory,
  ReadonlyArray<string>
> = {
  Layout: [
    'app-shell',
    'workspace-layout',
    'canvas-stage',
    'layout',
    'resizable',
    'section',
    'grid',
    'stack',
    'form-layout',
    'property-row',
    'scrollable-area',
    'center',
    'aspect-ratio',
    'divider',
  ],
  Navigation: [
    'top-nav',
    'side-nav',
    'mobile-nav',
    'nav-heading-menu',
    'tab-list',
    'breadcrumbs',
    'stepper',
    'outline',
    'pagination',
  ],
  Container: [
    'card',
    'selectable-card',
    'clickable-card',
    'collapsible',
    'carousel',
  ],
  Action: [
    'button',
    'split-button',
    'icon-button',
    'toggle-button',
    'button-group',
    'segmented-control',
    'copy-button',
    'inline-confirm',
    'dropdown-menu',
    'more-menu',
    'context-menu',
    'toolbar',
    'canvas-zoom-bar',
    'link',
  ],
  'Form Controls': FORM_CONTROL_SUBGROUPS.flatMap(g => g.specimenIds),
  Content: [
    'heading',
    'text',
    'middle-truncate',
    'markdown',
    'blockquote',
    'citation',
    'code',
    'code-block',
    'kbd',
    'token',
    'avatar',
    'avatar-group',
    'thumbnail',
    'icon',
    'timestamp',
    'timer',
    'empty-state',
  ],
  'Table & List': [
    'table',
    'column-settings-menu',
    'list',
    'item',
    'metadata-list',
    'tree-list',
    'column-view',
    'timeline',
    'overflow-list',
  ],
  'Data Visualization': [
    'metric-card',
    'data-chart',
    'sparkline',
    'gauge',
    'activity-ring',
    'data-categorical-palette',
  ],
  'Feedback & Status': [
    'badge',
    'status-dot',
    'banner',
    'inline-message',
    'error-summary',
    'progress-bar',
    'spinner',
    'skeleton',
    'info-tip',
  ],
  Overlay: [
    'dialog',
    'alert-dialog',
    'drawer',
    'bottom-sheet',
    'popover',
    'hover-card',
    'tooltip',
    'toast',
    'command-palette',
    'shortcut-sheet',
    'notification-center',
    'tour',
    'lightbox',
    'overlay',
  ],
  Chat: ['chat-thread', 'chat-tool-calls'],
  Utility: [
    'theme-switch',
    'media-theme',
    'syntax-theme',
    'visually-hidden',
    'hook-shortcuts',
    'hook-autodraft',
    'hook-viewport',
    'hook-file-io',
  ],
};

export function getSpecimenRank(
  category: OfficialAstryxCategory,
  id: string,
): number {
  const list = CANONICAL_CATEGORY_SPECIMEN_IDS[category];
  const idx = list.indexOf(id);
  return idx === -1 ? 999 : idx;
}

export const CATEGORY_LABELS_ID: Record<OfficialAstryxCategory, string> = {
  Layout: 'Layout · Struktur & Workspace',
  Navigation: 'Navigation · Navigasi & Alur',
  Container: 'Container · Wadah & Kartu',
  Action: 'Action · Tombol & Perintah',
  'Form Controls': 'Form Controls · Input & Studio',
  Content: 'Content · Tipografi & Media',
  'Table & List': 'Table & List · Tabel & Hierarki',
  'Data Visualization': 'Data Visualization · Metrik & Grafik',
  'Feedback & Status': 'Feedback & Status · Indikator',
  Overlay: 'Overlay · Dialog, Drawer & Pintasan',
  Chat: 'Chat · Percakapan AI',
  Utility: 'Utility · Tema & Runtime Hooks',
};

export const CATEGORY_DESC: Record<
  OfficialAstryxCategory,
  {en: string; id: string}
> = {
  Layout: {
    en: 'App frames (`AppShell`), multi-panel workspaces (`WorkspaceLayout`), interactive stages (`CanvasStage`), inspector rows, grids, and stacks.',
    id: 'Kerangka aplikasi (`AppShell`), ruang kerja multi-panel (`WorkspaceLayout`), area kanvas (`CanvasStage`), baris properti, grid, dan susunan.',
  },
  Navigation: {
    en: 'Top bars, collapsible side menus, mobile drawers, breadcrumbs, page outlines, steppers, tabs, and pagination.',
    id: 'Bilah atas, menu samping lipat, laci layar ponsel, jejak halaman, daftar isi, penunjuk langkah, tab, dan nomor halaman.',
  },
  Container: {
    en: 'Warm layered cards, clickable selection cards, carousels, and expandable sections.',
    id: 'Kartu bertingkat yang hangat, kartu pilihan interaktif, karusel geser, dan bagian lipat.',
  },
  Action: {
    en: 'Balanced 3D buttons, `SplitButton`, `CopyButton`, `InlineConfirm`, `CanvasZoomBar`, menus, and toolbars — all sharing unified sizing.',
    id: 'Tombol 3D proporsional, `SplitButton`, `CopyButton`, `InlineConfirm`, `CanvasZoomBar`, menu, dan bilah alat dengan ukuran seragam.',
  },
  'Form Controls': {
    en: 'Grouped into Text & Editors, Choices & Search, Numbers & Dials, Dates & Calendars, and Color & Media uploads.',
    id: 'Dikelompokkan rapi ke dalam Teks & Editor, Pilihan & Pencarian, Angka & Kenop, Tanggal & Kalender, serta Warna & Unggah Media.',
  },
  Content: {
    en: 'Headings, body text, smart `MiddleTruncate` paths, Markdown, code blocks, `Kbd` shortcuts, avatars, and empty states.',
    id: 'Judul, teks isi, pemendek jalur `MiddleTruncate`, Markdown, blok kode, tombol `Kbd`, avatar, dan tampilan kosong.',
  },
  'Table & List': {
    en: 'Data tables with `ColumnSettingsMenu`, tree views, multi-column `ColumnView` browsers, `Timeline` feeds, and lists.',
    id: 'Tabel data lengkap dengan pengatur kolom `ColumnSettingsMenu`, pohon folder, penjelajah `ColumnView`, lini masa `Timeline`, dan daftar.',
  },
  'Data Visualization': {
    en: 'KPI `MetricCard`s, interactive `DataChart`s (`line`, `area`, `bar`, `horizontal-bar`), compact `Sparkline`s, `Gauge`s, and `ActivityRing`s.',
    id: 'Kartu metrik `MetricCard`, grafik interaktif `DataChart` (`line`, `area`, `bar`, `horizontal-bar`), `Sparkline`, `Gauge`, dan `ActivityRing`.',
  },
  'Feedback & Status': {
    en: 'Readable status badges, banners, field-level `InlineMessage` hints, clickable `ErrorSummary` boxes, progress bars, and loading states.',
    id: 'Lencana status yang jernih, kotak pengumuman, pesan kolom `InlineMessage`, ringkasan `ErrorSummary`, bilah progres, dan indikator muat.',
  },
  Overlay: {
    en: 'Dialogs, clear delete confirmations, side drawers, popovers, `CommandPalette`, `?` `ShortcutSheet`, `NotificationCenter`, and guided `Tour`.',
    id: 'Dialog, konfirmasi hapus yang jelas, panel samping, popover, `CommandPalette`, daftar pintasan `ShortcutSheet`, `NotificationCenter`, dan `Tour`.',
  },
  Chat: {
    en: 'AI chat message threads, collapsible tool-step cards, and rich prompt composers.',
    id: 'Percakapan chat AI, kartu langkah kerja yang bisa dilipat, dan kolom ketik pesan.',
  },
  Utility: {
    en: '`ThemeSwitch`, local contrast & code themes, accessibility helpers, and ready-made hooks for shortcuts, auto-saved drafts, and file checks.',
    id: '`ThemeSwitch`, pengatur tema lokal, alat bantu aksesibilitas, serta hook siap pakai untuk pintasan keyboard, simpan draf otomatis, dan validasi file.',
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
        {renderFormattedCopy(isId ? item.summaryId : item.summaryEn)}
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
