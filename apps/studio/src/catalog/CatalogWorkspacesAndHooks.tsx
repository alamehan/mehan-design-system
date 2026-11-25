import React, {useState} from 'react';
import {
  Badge,
  Button,
  Code,
  HStack,
  Kbd,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  proportional,
  useTableColumnSettings,
  useTableColumnSettingsState,
  useToast,
} from '@astryxdesign/core';
import {
  CanvasStage,
  CanvasZoomBar,
  ColumnSettingsMenu,
  ColumnView,
  DataChart,
  InlineMessage,
  PropertyRow,
  ShortcutSheet,
  TimelineScrubber,
  WorkspaceLayout,
  downloadJson,
  useAutoDraft,
  useMehanViewport,
  type ColumnViewNode,
  type DataChartKind,
} from '@mehan/astryx';
import {formatBytes, validateFile} from '@mehan/astryx/dna';
import type {SpecimenDefinition} from './SpecimenCard';

interface ServiceSpecRow extends Record<string, unknown> {
  id: string;
  service: string;
  region: string;
  p95: string;
  uptime: string;
}

const CSM_ROWS: ServiceSpecRow[] = [
  {id: '1', service: 'Auth Edge API', region: 'ap-southeast-1', p95: '14.2 ms', uptime: '99.99%'},
  {id: '2', service: 'Billing Worker', region: 'eu-central-1', p95: '21.8 ms', uptime: '99.98%'},
  {id: '3', service: 'Search Indexer', region: 'us-east-1', p95: '34.5 ms', uptime: '99.95%'},
];

const CSM_ALL_COLS = [
  {key: 'service', header: 'Service', width: proportional(1.4, {minWidth: 120})},
  {key: 'region', header: 'Region', width: proportional(1.1, {minWidth: 110})},
  {key: 'p95', header: 'P95', width: proportional(0.8, {minWidth: 80}), align: 'end' as const},
  {key: 'uptime', header: 'Uptime', width: proportional(0.8, {minWidth: 80}), align: 'end' as const},
];

const MILLER_TREE: ColumnViewNode[] = [
  {
    id: 'packages',
    label: 'packages',
    badge: '3',
    children: [
      {
        id: 'dna',
        label: '@mehan/dna',
        badge: '4',
        children: [
          {id: 'atmospheres', label: 'atmospheres.ts', meta: '3 presets'},
          {id: 'accents', label: 'accents.ts', meta: 'OKLCH'},
          {id: 'audit', label: 'audit.ts', meta: 'WCAG 2.2'},
          {id: 'w3c', label: 'w3c.ts', meta: '25/25 keys'},
        ],
      },
      {
        id: 'astryx',
        label: '@mehan/astryx',
        badge: '3',
        children: [
          {id: 'ws', label: 'WorkspaceLayout.tsx', meta: 'Level 1'},
          {id: 'cs', label: 'CanvasStage.tsx', meta: 'Level 2'},
          {id: 'dc', label: 'DataChart.tsx', meta: '4-in-1'},
        ],
      },
      {
        id: 'portable',
        label: '@mehan/portable',
        meta: 'CSS + JS',
      },
    ],
  },
  {
    id: 'guides',
    label: 'docs',
    badge: '2',
    children: [
      {id: 'arch', label: 'mehan-page-archetypes.doc.mjs', meta: 'Layouts'},
      {id: 'hooks', label: 'mehan-runtime-hooks.doc.mjs', meta: 'U1–U5'},
    ],
  },
];

export function useCatalogWorkspacesAndHooks(): SpecimenDefinition[] {
  const showToast = useToast();

  // WorkspaceLayout specimen state
  const [wsInspectorOpen, setWsInspectorOpen] = useState(true);
  const [wsService, setWsService] = useState('Edge Gateway');

  // CanvasStage specimen state
  const [stageZoom, setStageZoom] = useState(100);
  const [stageBackdrop, setStageBackdrop] = useState<
    'dots' | 'grid' | 'checkerboard' | 'plain'
  >('dots');
  const [stageTime, setStageTime] = useState(1.5);

  // PropertyRow specimen state
  const [prBlend, setPrBlend] = useState('normal');
  const [prSnap, setPrSnap] = useState(true);
  const [prOpacity, setPrOpacity] = useState('100%');

  // ColumnSettingsMenu specimen state
  const [activeColKeys, setActiveColKeys] = useState<ReadonlyArray<string>>([
    'service',
    'region',
    'p95',
    'uptime',
  ]);
  const colState = useTableColumnSettingsState({
    columns: [
      {key: 'service', label: 'Service', isAlwaysVisible: true},
      {key: 'region', label: 'Region'},
      {key: 'p95', label: 'P95 Latency'},
      {key: 'uptime', label: 'Uptime'},
    ],
    activeColumnKeys: activeColKeys,
    onChangeActiveColumnKeys: setActiveColKeys,
    defaultColumnKeys: ['service', 'region', 'p95', 'uptime'],
  });
  const colPlugin = useTableColumnSettings<ServiceSpecRow>(
    colState.columnSettingsConfig,
  );

  // DataChart specimen state
  const [chartKind, setChartKind] = useState<DataChartKind>('area');

  // ShortcutSheet modal demo state
  const [sheetModalOpen, setSheetModalOpen] = useState(false);

  // Runtime Hooks interactive specimens
  const draftDemo = useAutoDraft({
    key: 'mehan-catalog-autodraft-demo',
    initialValue: 'Automatic local draft with schema-version guard.',
    version: 1,
    debounceMs: 250,
  });
  const viewport = useMehanViewport();
  const [fileSampleKind, setFileSampleKind] = useState<'valid' | 'oversize' | 'wrong'>(
    'valid',
  );

  const fileValidationCheck = validateFile(
    fileSampleKind === 'valid'
      ? {name: 'mehan-theme.json', size: 4_200, type: 'application/json'}
      : fileSampleKind === 'oversize'
        ? {name: 'raw-dump.json', size: 8_500_000, type: 'application/json'}
        : {name: 'installer.exe', size: 12_000, type: 'application/octet-stream'},
    {maxBytes: 2 * 1024 * 1024, accept: ['.json', 'application/json']},
  );

  return [
    {
      id: 'workspace-layout',
      name: 'WorkspaceLayout',
      category: 'Layout',
      pkg: 'mehan',
      span: 'wide',
      flush: true,
      summaryEn:
        'Flexible multi-panel workspace that handles sidebars, inspector drawers on mobile, and comfortable scrolling at 200% zoom.',
      summaryId:
        'Kerangka ruang kerja fleksibel yang mengatur panel samping, laci otomatis di layar ponsel, dan scroll aman saat layar diperbesar 200%.',
      code: `<WorkspaceLayout\n  toolbar={<Toolbar ... />}\n  startPane={{title: 'Services', content: <Nav />, isCollapsible: true}}\n  endPane={{title: 'Inspector', isOpen, onOpenChange: setIsOpen, content: <Details />}}\n>\n  {children}\n</WorkspaceLayout>`,
      render: () => (
        <WorkspaceLayout
          enableShortcuts={false}
          desktopHeight={280}
          label="Service explorer workspace specimen"
          toolbar={
            <HStack hAlign="between" vAlign="center" gap={2}>
              <Text weight="semibold">Production Services</Text>
              <Button
                variant="secondary"
                size="sm"
                label={wsInspectorOpen ? 'Hide inspector' : 'Inspect'}
                onClick={() => setWsInspectorOpen(prev => !prev)}
              />
            </HStack>
          }
          startPane={{
            title: 'Services',
            defaultWidth: 192,
            content: (
              <div className="mehan-ws-nav-list">
                {['Edge Gateway', 'Billing Sync', 'Token Compiler'].map(svc => (
                  <button
                    key={svc}
                    type="button"
                    className="mehan-ws-nav-item"
                    data-active={String(wsService === svc)}
                    onClick={() => {
                      setWsService(svc);
                      setWsInspectorOpen(true);
                    }}
                  >
                    <span>{svc}</span>
                  </button>
                ))}
              </div>
            ),
          }}
          endPane={{
            title: 'Inspector',
            isOpen: wsInspectorOpen,
            onOpenChange: setWsInspectorOpen,
            defaultWidth: 204,
            content: (
              <Stack gap={1.5}>
                <Badge variant="success" label="Healthy · 99.99%" />
                <Text type="supporting" color="secondary">
                  Selected: {wsService}
                </Text>
              </Stack>
            ),
          }}
        >
          <Stack gap={1.5}>
            <Text weight="semibold">{wsService}</Text>
            <Text type="supporting" color="secondary">
              One Astryx-powered primitive replaces separate Form+Result, Workbench, Explorer, and Collection shells.
            </Text>
          </Stack>
        </WorkspaceLayout>
      ),
    },
    {
      id: 'canvas-stage',
      name: 'CanvasStage',
      category: 'Layout',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Interactive preview stage with dot, grid, or checkerboard backdrops plus corner slots for zoom and timeline controls.',
      summaryId:
        'Area kanvas pratinjau dengan pilihan latar titik, garis kisi, atau papan catur serta sudut khusus tombol zoom dan timeline.',
      code: `<CanvasStage backdrop="dots" topStart={<Badge ... />} bottomEnd={<CanvasZoomBar ... />} transport={<TimelineScrubber ... />}>{stageContent}</CanvasStage>`,
      render: () => (
        <CanvasStage
          backdrop={stageBackdrop}
          minHeight={184}
          topStart={
            <SegmentedControl
              label="Stage backdrop pattern"
              size="sm"
              value={stageBackdrop}
              onChange={v =>
                setStageBackdrop(v as 'dots' | 'grid' | 'checkerboard' | 'plain')
              }
            >
              <SegmentedControlItem value="dots" label="Dots" />
              <SegmentedControlItem value="grid" label="Grid" />
              <SegmentedControlItem value="checkerboard" label="Alpha" />
            </SegmentedControl>
          }
          bottomEnd={
            <CanvasZoomBar
              zoom={stageZoom}
              onZoomChange={setStageZoom}
              onFitToScreen={() => setStageZoom(100)}
              menuPlacement="top"
            />
          }
          transport={
            <TimelineScrubber
              currentTime={stageTime}
              duration={6}
              onSeek={setStageTime}
            />
          }
        >
          <div
            style={{
              transform: `scale(${stageZoom / 100})`,
              padding: '12px 20px',
              borderRadius: 12,
              backgroundColor: 'var(--color-background-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-med)',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            3D / Vector Stage ({stageZoom}%)
          </div>
        </CanvasStage>
      ),
    },
    {
      id: 'property-row',
      name: 'PropertyRow',
      category: 'Layout',
      pkg: 'mehan',
      summaryEn:
        'Compact horizontal inspector row ([Label + InfoTip] [Control] [Modified reset dot]) engineered for narrow 260px–340px studio panels.',
      summaryId:
        'Baris properti horizontal ringkas ([Label + InfoTip] [Kontrol] [Titik reset]) khusus panel inspektur sempit 260px–340px.',
      code: `<PropertyRow label="Blend mode" hint="Layer compositing" isModified={mode !== 'normal'} onReset={() => setMode('normal')}>{control}</PropertyRow>`,
      render: () => (
        <Stack gap={2} style={{maxWidth: 340, width: '100%'}}>
          <PropertyRow
            label="Blend mode"
            hint="Determines how foreground pixels blend with underlying layers."
            isModified={prBlend !== 'normal'}
            onReset={() => setPrBlend('normal')}
          >
            <SegmentedControl
              label="Inspector blend mode"
              size="sm"
              value={prBlend}
              onChange={setPrBlend}
            >
              <SegmentedControlItem value="normal" label="Normal" />
              <SegmentedControlItem value="multiply" label="Multiply" />
            </SegmentedControl>
          </PropertyRow>
          <PropertyRow
            label="Opacity"
            htmlFor="spec-pr-opacity"
            isModified={prOpacity !== '100%'}
            onReset={() => setPrOpacity('100%')}
          >
            <TextInput
              id="spec-pr-opacity"
              label="Layer opacity"
              isLabelHidden
              size="sm"
              width={96}
              value={prOpacity}
              onChange={setPrOpacity}
            />
          </PropertyRow>
          <PropertyRow
            label="Pixel snap"
            isModified={!prSnap}
            onReset={() => setPrSnap(true)}
          >
            <Switch
              label="Enable pixel snap"
              isLabelHidden
              value={prSnap}
              onChange={setPrSnap}
            />
          </PropertyRow>
        </Stack>
      ),
    },
    {
      id: 'column-settings-menu',
      name: 'ColumnSettingsMenu',
      category: 'Table & List',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Ready-to-drop Popover UI for Meta Astryx headless useTableColumnSettingsState: toggles visibility, reorders columns, and guards the last visible column.',
      summaryId:
        'Komponen Popover pasangan langsung hook useTableColumnSettingsState milik Astryx untuk visibilitas, urutan kolom, dan proteksi kolom terakhir.',
      code: `<ColumnSettingsMenu columns={colState.columnSettingsConfig.columns} state={colState} />`,
      render: () => (
        <Stack gap={2} style={{width: '100%'}}>
          <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
            <Text weight="semibold">Regional Latency</Text>
            <ColumnSettingsMenu
              columns={colState.columnSettingsConfig.columns}
              state={colState}
            />
          </HStack>
          <div className="studio-table-frame">
            <Table
              aria-label="Column settings specimen table"
              data={CSM_ROWS}
              idKey="id"
              columns={CSM_ALL_COLS}
              plugins={{columnSettings: colPlugin}}
              density="compact"
              dividers="rows"
            />
          </div>
        </Stack>
      ),
    },
    {
      id: 'column-view',
      name: 'ColumnView',
      category: 'Table & List',
      pkg: 'mehan',
      span: 'wide',
      flush: true,
      summaryEn:
        'Multi-column hierarchical browser (Miller Columns) with 2D arrow-key roving (↑↓←→) and automatic mobile single-column step-drill.',
      summaryId:
        'Penjelajah hierarki multi-kolom (Miller Columns) dengan navigasi panah 2D (↑↓←→) yang otomatis melipat jadi step-drill di layar mobile.',
      code: `<ColumnView items={tree} defaultSelectedPath={['packages', 'astryx', 'ws']} renderDetail={node => <Preview node={node} />} />`,
      render: () => (
        <ColumnView
          label="Workspace package hierarchy"
          items={MILLER_TREE}
          defaultSelectedPath={['packages', 'dna', 'w3c']}
          renderDetail={node => (
            <Stack gap={1}>
              <Badge variant="info" label={node.meta ?? 'Directory'} />
              <Text weight="semibold">{node.label}</Text>
              <Text type="supporting" color="secondary">
                Use ← / → and ↑ / ↓ arrow keys to traverse hierarchy columns.
              </Text>
            </Stack>
          )}
        />
      ),
    },
    {
      id: 'data-chart',
      name: 'DataChart',
      category: 'Data Visualization',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Multi-series chart (line, area, bar, and horizontal bar) with clickable legend filters, hover tooltips, and keyboard support.',
      summaryId:
        'Grafik multi-seri terpadu (garis, area, batang vertikal & mendatar) lengkap dengan filter legenda dan info nilai interaktif.',
      code: `<DataChart title="Edge Requests" kind="area" categories={days} series={[{id: 'hit', label: 'Cache Hit', values: [420, 580, 690]}]} />`,
      render: () => (
        <Stack gap={2} style={{width: '100%'}}>
          <HStack hAlign="end">
            <SegmentedControl
              label="DataChart geometry"
              size="sm"
              value={chartKind}
              onChange={v => setChartKind(v as DataChartKind)}
            >
              <SegmentedControlItem value="area" label="Area" />
              <SegmentedControlItem value="line" label="Line" />
              <SegmentedControlItem value="bar" label="Bar" />
              <SegmentedControlItem value="horizontal-bar" label="H-Bar" />
            </SegmentedControl>
          </HStack>
          <DataChart
            title="Global Edge Throughput"
            subtitle="Requests per second across regions"
            kind={chartKind}
            height={176}
            categories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            series={[
              {
                id: 'hits',
                label: 'Cache Hits',
                values: [620, 740, 710, 890, 960, 1040],
              },
              {
                id: 'origin',
                label: 'Origin Pass',
                values: [180, 195, 160, 210, 175, 155],
              },
            ]}
          />
        </Stack>
      ),
    },
    {
      id: 'shortcut-sheet',
      name: 'ShortcutSheet',
      category: 'Overlay',
      pkg: 'mehan',
      summaryEn:
        'Self-documenting keyboard shortcut dialog built on Astryx Dialog + TextInput + Kbd, automatically reading live useMehanShortcuts registrations.',
      summaryId:
        'Dialog referensi pintasan keyboard otomatis di atas Astryx Dialog + Kbd dengan filter instan dan pembacaan live dari useMehanShortcuts.',
      code: `<ShortcutSheet isOpen={isOpen} onOpenChange={setIsOpen} />`,
      render: () => (
        <Stack gap={2} align="start">
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Button
              variant="secondary"
              size="sm"
              label="Open ShortcutSheet (?)"
              onClick={() => setSheetModalOpen(true)}
            />
            <Text type="supporting" color="secondary">
              Or press <Kbd keys="?" /> anywhere in Studio.
            </Text>
          </HStack>
          <ShortcutSheet
            isOpen={sheetModalOpen}
            onOpenChange={setSheetModalOpen}
            shortcuts={[
              {group: 'Workspace', keys: 'mod+\\', label: 'Toggle side panel'},
              {group: 'Actions', keys: 'mod+enter', label: 'Submit primary action'},
              {group: 'History', keys: 'mod+z', label: 'Undo theme edit'},
            ]}
          />
        </Stack>
      ),
    },
    {
      id: 'hook-shortcuts',
      name: 'useMehanShortcuts & usePrimaryAction',
      category: 'Utility',
      pkg: 'mehan',
      summaryEn:
        'Smart keyboard shortcut hook that ignores keystrokes while typing in text fields and auto-registers into ShortcutSheet.',
      summaryId:
        'Hook pintasan keyboard cerdas yang tidak mengganggu saat mengetik di kolom input dan otomatis tampil di daftar ShortcutSheet.',
      code: `usePrimaryAction(() => submitForm(), {label: 'Save changes'});\nuseMehanShortcuts([{keys: '?', label: 'Shortcuts', onPress: () => setOpen(true)}]);`,
      render: () => (
        <Stack gap={1.5}>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <Badge variant="info" label="Smart Shortcuts" />
            <Kbd keys="mod+enter" />
            <Kbd keys="mod+z" />
            <Kbd keys="?" />
          </HStack>
          <Text type="supporting" color="secondary">
            Automatically pauses single-key triggers while typing in inputs or closing open dialogs with <Code>Escape</Code>.
          </Text>
        </Stack>
      ),
    },
    {
      id: 'hook-autodraft',
      name: 'useAutoDraft & useUnsavedGuard',
      category: 'Utility',
      pkg: 'mehan',
      summaryEn:
        'Auto-saves form drafts locally as you type and warns before closing a tab with unsaved edits.',
      summaryId:
        'Menyimpan draf formulir secara otomatis saat mengetik dan memberi peringatan sebelum tab ditutup jika perubahan belum disimpan.',
      code: `const draft = useAutoDraft({key: 'post-draft', initialValue: '', version: 1});\nuseUnsavedGuard(draft.isDirty);`,
      render: () => (
        <Stack gap={2} style={{width: '100%'}}>
          <TextInput
            label="Live auto-persisted note"
            size="sm"
            value={draftDemo.value}
            onChange={draftDemo.setValue}
          />
          <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
            <Badge
              variant={draftDemo.isDirty ? 'warning' : 'success'}
              label={draftDemo.isDirty ? 'Modified · Auto-saved' : 'Clean default'}
            />
            {draftDemo.isDirty && (
              <Button
                variant="ghost"
                size="sm"
                label="Reset draft"
                onClick={draftDemo.resetToInitial}
              />
            )}
          </HStack>
        </Stack>
      ),
    },
    {
      id: 'hook-viewport',
      name: 'useMehanViewport',
      category: 'Utility',
      pkg: 'mehan',
      summaryEn:
        'Laws U2 & U5 reactive media preset built on Astryx useMediaQuery (isMobile, isCompactHeight 200% zoom, isCoarsePointer, prefersReducedMotion).',
      summaryId:
        'Preset media reaktif Hukum U2 & U5 di atas useMediaQuery Astryx (mobile, tinggi ringkas zoom 200%, sentuh kasar, kurangi gerak).',
      code: `const {isMobile, shouldReleasePaneScroll, isCoarsePointer, prefersReducedMotion} = useMehanViewport();`,
      render: () => (
        <HStack gap={1.5} wrap="wrap">
          <Badge
            variant={viewport.isMobile ? 'info' : 'neutral'}
            label={`mobile: ${String(viewport.isMobile)}`}
          />
          <Badge
            variant={viewport.shouldReleasePaneScroll ? 'warning' : 'success'}
            label={`paneScroll: ${viewport.shouldReleasePaneScroll ? 'auto' : 'fill'}`}
          />
          <Badge
            variant="neutral"
            label={`coarse: ${String(viewport.isCoarsePointer)}`}
          />
          <Badge
            variant="neutral"
            label={`reducedMotion: ${String(viewport.prefersReducedMotion)}`}
          />
        </HStack>
      ),
    },
    {
      id: 'hook-file-io',
      name: 'validateFile & Client File I/O',
      category: 'Utility',
      pkg: 'mehan',
      summaryEn:
        'Pure MIME/extension/byte-cap validator (@mehan/dna) paired with memory-safe readFileText, pickFiles, downloadBlob, and downloadJson.',
      summaryId:
        'Validator murni MIME/ekstensi/ukuran byte (@mehan/dna) berpasangan dengan readFileText, pickFiles, downloadBlob, dan downloadJson.',
      code: `const check = validateFile(file, {maxBytes: 2_097_152, accept: ['.json']});\nif (check.ok) downloadJson('export.json', payload);`,
      render: () => (
        <Stack gap={2}>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <SegmentedControl
              label="Simulated upload candidate"
              size="sm"
              value={fileSampleKind}
              onChange={v => setFileSampleKind(v as 'valid' | 'oversize' | 'wrong')}
            >
              <SegmentedControlItem value="valid" label={`JSON (${formatBytes(4200)})`} />
              <SegmentedControlItem value="oversize" label="8.5 MB" />
              <SegmentedControlItem value="wrong" label=".exe" />
            </SegmentedControl>
            <Button
              variant="secondary"
              size="sm"
              label="Download sample .json"
              onClick={() => {
                downloadJson('mehan-sample.json', {provider: 'mehan', version: '1.0.0'});
                showToast({type: 'info', body: 'Downloaded mehan-sample.json'});
              }}
            />
          </HStack>
          <InlineMessage
            status={fileValidationCheck.ok ? 'success' : 'error'}
            isLive={false}
            message={
              fileValidationCheck.ok
                ? 'Valid JSON payload within the 2 MB limit.'
                : fileValidationCheck.message
            }
          />
        </Stack>
      ),
    },
  ];
}
