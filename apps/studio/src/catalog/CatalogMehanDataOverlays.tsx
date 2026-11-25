import React, {useState} from 'react';
import {Button, HStack, Stack, useToast} from '@astryxdesign/core';
import {
  ActivityRing,
  CanvasZoomBar,
  CodeEditor,
  Gauge,
  MarkdownEditor,
  NotificationCenter,
  Sparkline,
  Timeline,
  TimelineScrubber,
  Tour,
  type NotificationEntry,
} from '@mehan/astryx';
import type {SpecimenDefinition} from './SpecimenCard';

export function useCatalogMehanDataOverlays(): SpecimenDefinition[] {
  const showToast = useToast();
  const [zoom, setZoom] = useState(100);
  const [playTime, setPlayTime] = useState(4.2);
  const [playing, setPlaying] = useState(false);
  const [codeSrc, setCodeSrc] = useState(
    `const theme = createMehanTheme({\n  name: 'studio',\n  atmosphere: 'confectionery',\n});`,
  );
  const [mdSrc, setMdSrc] = useState(
    '### Release notes\n- Offline **WOFF2** typography\n- Zero external CDN calls',
  );
  const [notifications, setNotifications] = useState<NotificationEntry[]>([
    {
      id: 'n1',
      title: 'Figma tokens exported',
      body: 'mehan-tokens.w3c.json saved cleanly.',
      timestamp: '2m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Contrast gate passed',
      body: 'All 30 palette pairs cleared WCAG AA.',
      timestamp: '18m ago',
      unread: true,
    },
    {
      id: 'n3',
      title: 'Bundle verified',
      body: 'Offline STUDIO.html emitted.',
      timestamp: '1h ago',
      unread: false,
    },
  ]);
  const [tourOpen, setTourOpen] = useState(true);

  return [
    {
      id: 'canvas-zoom-bar',
      name: 'CanvasZoomBar',
      category: 'Action',
      pkg: 'mehan',
      summaryEn:
        'Floating magnification HUD with stepper buttons, tabular preset menu (50%–200%), and Fit-to-Screen reset.',
      summaryId:
        'Bilah perbesaran kanvas melayang dengan tombol langkah, menu preset angka sejajar (50%–200%), dan pas layar.',
      code: `<CanvasZoomBar zoom={zoom} onZoomChange={setZoom} onFitToScreen={() => setZoom(100)} />`,
      render: () => (
        <CanvasZoomBar
          zoom={zoom}
          onZoomChange={setZoom}
          onFitToScreen={() => {
            setZoom(100);
            showToast({type: 'info', body: 'Canvas fitted to 100%.'});
          }}
        />
      ),
    },
    {
      id: 'sparkline',
      name: 'Sparkline',
      category: 'Data Visualization',
      pkg: 'mehan',
      summaryEn:
        'Compact inline trend chart (area, line, or bar) with hover value preview and screen-reader support.',
      summaryId:
        'Grafik tren mini sebaris (area, garis, atau batang) lengkap dengan info nilai saat disentuh kursor.',
      code: `<Sparkline label="7-day throughput" data={[42, 48, 45, 59, 64, 61, 78]} />`,
      render: () => (
        <HStack gap={4} wrap="wrap" vAlign="center">
          <Sparkline
            label="7-day request throughput"
            data={[42, 48, 45, 59, 64, 61, 78]}
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          />
          <Sparkline
            label="Daily build count"
            variant="bar"
            tone="success"
            width={108}
            data={[12, 16, 14, 19, 22, 20, 25]}
          />
        </HStack>
      ),
    },
    {
      id: 'gauge',
      name: 'Gauge',
      category: 'Data Visualization',
      pkg: 'mehan',
      summaryEn:
        'Clean circular arc meter showing progress or capacity with a bold centered number.',
      summaryId:
        'Meteran melengkung untuk menampilkan persentase kuota atau capaian dengan angka tegas di tengah.',
      code: `<Gauge label="Memory quota" value={68} unit="%" tone="accent" />`,
      render: () => (
        <HStack gap={4} wrap="wrap" vAlign="center">
          <Gauge label="Memory quota" value={68} size="sm" tone="accent" />
          <Gauge label="SLO uptime" value={99} size="sm" tone="success" />
        </HStack>
      ),
    },
    {
      id: 'activity-ring',
      name: 'ActivityRing',
      category: 'Data Visualization',
      pkg: 'mehan',
      summaryEn:
        'Concentric 360-degree goal rings comparing up to 3 normalized metrics alongside a tabular percentage legend.',
      summaryId:
        'Cincin capaian konsentris 360 derajat untuk membandingkan hingga 3 metrik sekaligus beserta legenda persentase sejajar.',
      code: `<ActivityRing label="Release gates" rings={[{id: 'aa', label: 'WCAG AA', value: 100}]} />`,
      render: () => (
        <ActivityRing
          label="Release readiness"
          size={88}
          rings={[
            {id: 'r1', label: 'Contrast AA', value: 100},
            {id: 'r2', label: 'Test coverage', value: 94},
            {id: 'r3', label: 'Docs parity', value: 88},
          ]}
        />
      ),
    },
    {
      id: 'timeline-scrubber',
      name: 'TimelineScrubber',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Frame-accurate playhead scrubber with Play/Pause transport, MM:SS.ff timecode, keyframe pins, and Shift+Arrow frame step.',
      summaryId:
        'Penggeser waktu presisi per-frame dengan tombol putar, kode waktu MM:SS.ff, pin keyframe, dan langkah frame Shift+Panah.',
      code: `<TimelineScrubber currentTime={t} duration={12} onSeek={setT} markers={[{id: 'm1', time: 3, label: 'Intro'}]} />`,
      render: () => (
        <TimelineScrubber
          currentTime={playTime}
          duration={12}
          onSeek={setPlayTime}
          isPlaying={playing}
          onTogglePlay={() => setPlaying(prev => !prev)}
          markers={[
            {id: 'm1', time: 3, label: 'Intro beat'},
            {id: 'm2', time: 8.5, label: 'Hero reveal'},
          ]}
        />
      ),
    },
    {
      id: 'code-editor',
      name: 'CodeEditor',
      category: 'Form Controls',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Lightweight code editor with synced line numbers, inline warnings, CopyButton, and clean keyboard Tab escape.',
      summaryId:
        'Editor kode ringan dengan nomor baris sinkron, penanda baris bermasalah, tombol salin, dan keluar fokus yang aman.',
      code: `<CodeEditor language="ts" value={code} onChange={setCode} minRows={4} />`,
      render: () => (
        <CodeEditor
          language="ts"
          label="Theme config code editor"
          value={codeSrc}
          onChange={setCodeSrc}
          minRows={4}
          diagnostics={[
            {
              line: 3,
              severity: 'warning',
              message: 'Tip: try "porcelain" or "stone" to compare neutral warmth.',
            },
          ]}
        />
      ),
    },
    {
      id: 'markdown-editor',
      name: 'MarkdownEditor',
      category: 'Form Controls',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Markdown writing box with formatting buttons, instant Write/Preview tabs, and live word & character count.',
      summaryId:
        'Kotak tulis Markdown lengkap dengan tombol format cepat, tab Tulis/Pratinjau, serta penghitung kata & karakter.',
      code: `<MarkdownEditor value={md} onChange={setMd} minRows={4} />`,
      render: () => (
        <MarkdownEditor
          label="Release notes Markdown editor"
          value={mdSrc}
          onChange={setMdSrc}
          minRows={4}
        />
      ),
    },
    {
      id: 'notification-center',
      name: 'NotificationCenter',
      category: 'Overlay',
      pkg: 'mehan',
      summaryEn:
        'Inbox bell popover with an unread counter, All/Unread filter tabs, and one-click Mark all read.',
      summaryId:
        'Lonceng notifikasi lengkap dengan penghitung pesan baru, filter Semua/Belum dibaca, dan tombol Tandai semua dibaca.',
      code: `<NotificationCenter items={items} onMarkRead={markRead} onMarkAllRead={markAllRead} />`,
      render: () => (
        <NotificationCenter
          items={notifications}
          onMarkRead={id =>
            setNotifications(prev =>
              prev.map(n => (n.id === id ? {...n, unread: false} : n)),
            )
          }
          onMarkAllRead={() =>
            setNotifications(prev => prev.map(n => ({...n, unread: false})))
          }
        />
      ),
    },
    {
      id: 'tour',
      name: 'Tour',
      category: 'Overlay',
      pkg: 'mehan',
      summaryEn:
        'Friendly step-by-step onboarding card that always includes a visible Skip button from step one.',
      summaryId:
        'Kartu panduan bertahap yang ramah pengguna dan selalu menyediakan tombol Lewati sejak langkah pertama.',
      code: `<Tour isOpen={open} onOpenChange={setOpen} steps={steps} />`,
      render: () => (
        <Stack gap={2}>
          {!tourOpen && (
            <Button
              size="sm"
              variant="secondary"
              label="Restart 3-step tour"
              onClick={() => setTourOpen(true)}
            />
          )}
          <Tour
            isOpen={tourOpen}
            onOpenChange={setTourOpen}
            onFinish={() =>
              showToast({type: 'info', body: 'Completed guided tour.'})
            }
            steps={[
              {
                id: 's1',
                title: 'Pick an atmosphere',
                description:
                  'Choose Confectionery, Porcelain, or Stone to anchor warm or crisp surfaces.',
              },
              {
                id: 's2',
                title: 'Tune component slots',
                description:
                  'Adjust radii, padding, or custom CSS properties with live preview.',
              },
              {
                id: 's3',
                title: 'Export anywhere',
                description:
                  'Download TypeScript themes, Portable CSS, or W3C Figma tokens.',
              },
            ]}
          />
        </Stack>
      ),
    },
    {
      id: 'timeline',
      name: 'Timeline',
      category: 'Table & List',
      pkg: 'mehan',
      summaryEn:
        'Semantic <ol> chronological event rail with status pins, actor badges, and tabular timestamps.',
      summaryId:
        'Daftar urutan kronologis semantik <ol> dengan pin status, lencana aktor, dan stempel waktu sejajar.',
      code: `<Timeline items={[{id: '1', title: 'Rollout completed', timestamp: '14:22', status: 'success'}]} />`,
      render: () => (
        <Timeline
          density="compact"
          items={[
            {
              id: 'tl-1',
              title: 'Production rollout completed',
              timestamp: '14:22',
              actor: 'release-bot',
              description: 'All 12 edge regions healthy.',
              status: 'success',
            },
            {
              id: 'tl-2',
              title: 'Canary traffic shifted to 25%',
              timestamp: '14:05',
              actor: 'ops-auto',
              status: 'accent',
            },
            {
              id: 'tl-3',
              title: 'WCAG 2.2 AA gate verified',
              timestamp: '13:58',
              actor: 'ci-runner',
              status: 'default',
            },
          ]}
        />
      ),
    },
  ];
}
