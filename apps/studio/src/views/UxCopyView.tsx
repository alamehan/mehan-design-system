import React, {useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  Card,
  Collapsible,
  Divider,
  Drawer,
  EmptyState,
  Grid,
  HStack,
  Heading,
  List,
  ListItem,
  Popover,
  ProgressBar,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  VStack,
  pixel,
  proportional,
  useToast,
} from '@astryxdesign/core';
import {
  ErrorSummary,
  InlineConfirm,
  InlineMessage,
  MiddleTruncate,
  PrecisionSlider,
  formatShortcutKeys,
} from '@mehan/astryx';
import {
  formatBytes,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatRelativeTime,
} from '@mehan/astryx/dna';
import {
  CheckCircle2,
  Inbox,
  RefreshCw,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react';
import type {StudioCopy} from '../i18n';
import type {StudioLang} from '../studioState';

interface UxCopyViewProps {
  lang: StudioLang;
  copy: StudioCopy;
  onOpenConfirmDemo: () => void;
}

type UxChapterId =
  | 'chunking'
  | 'disclosure'
  | 'truncation'
  | 'hierarchy'
  | 'states'
  | 'microcopy'
  | 'keyboard'
  | 'ergonomics'
  | 'forms'
  | 'linebudget'
  | 'motion'
  | 'i18n'
  | 'all';

const UX_DOMAINS: ReadonlyArray<{
  id: string;
  roman: string;
  en: string;
  idLabel: string;
  chapters: ReadonlyArray<{
    id: Exclude<UxChapterId, 'all'>;
    num: string;
    en: string;
    idLabel: string;
  }>;
}> = [
  {
    id: 'cognitive-spatial',
    roman: 'I',
    en: 'Cognitive & Spatial',
    idLabel: 'Kognitif & Ruang',
    chapters: [
      {id: 'chunking', num: '01', en: 'Grouping & Chunking', idLabel: 'Grouping & Chunking'},
      {id: 'disclosure', num: '02', en: 'Progressive Disclosure', idLabel: 'Progressive Disclosure'},
      {id: 'ergonomics', num: '03', en: 'Touch, Zoom & Contrast', idLabel: 'Sentuh, Zoom & Kontras'},
    ],
  },
  {
    id: 'typography-intl',
    roman: 'II',
    en: 'Typography & Intl',
    idLabel: 'Tipografi & Bahasa',
    chapters: [
      {id: 'truncation', num: '04', en: 'Truncation & Numerals', idLabel: 'Truncate & Angka'},
      {id: 'linebudget', num: '05', en: 'Line Budget & Scroll', idLabel: 'Batas Baris & Scroll'},
      {id: 'i18n', num: '06', en: 'Bilingual & Intl Rules', idLabel: 'Ekspansi Bahasa & Intl'},
    ],
  },
  {
    id: 'actions-keys-motion',
    roman: 'III',
    en: 'Actions & Motion',
    idLabel: 'Aksi, Pintasan & Gerak',
    chapters: [
      {id: 'hierarchy', num: '07', en: 'Actions & Control Roles', idLabel: 'Hierarki & Kontrol'},
      {id: 'keyboard', num: '08', en: 'Keyboard & Focus Laws', idLabel: 'Keyboard & Fokus'},
      {id: 'motion', num: '09', en: 'Motion Choreography', idLabel: 'Koreografi Gerak'},
    ],
  },
  {
    id: 'forms-states-copy',
    roman: 'IV',
    en: 'Forms, States & Copy',
    idLabel: 'Form, State & Copy',
    chapters: [
      {id: 'forms', num: '10', en: 'Form Timing & Confirm', idLabel: 'Form, Draf & Konfirmasi'},
      {id: 'states', num: '11', en: 'States & Recovery', idLabel: 'State & Pemulihan'},
      {id: 'microcopy', num: '12', en: 'Microcopy & Glossary', idLabel: 'Microcopy & Kamus'},
    ],
  },
];

export function UxCopyView({lang, copy, onOpenConfirmDemo}: UxCopyViewProps) {
  const isId = lang === 'id';
  const showToast = useToast();
  const [chapter, setChapter] = useState<UxChapterId>('chunking');

  // Chapter 1 state
  const [orgName, setOrgName] = useState('Mehan Studio');
  const [orgSlug, setOrgSlug] = useState('mehan-studio');
  const [emailAlerts, setEmailAlerts] = useState(true);

  // Chapter 2 state
  const [projName, setProjName] = useState('Acme Billing');
  const [region, setRegion] = useState('Singapore (ap-southeast-1)');
  const [webhookUrl, setWebhookUrl] = useState('https://api.acme.dev/hooks');
  const [moreFilterOpen, setMoreFilterOpen] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);

  // Chapter 3 state
  const [liveTick, setLiveTick] = useState(0);
  const latencySamples = ['9.4 ms', '18.2 ms', '104.8 ms', '7.1 ms'];
  const revenueSamples = ['$940.00', '$12,480.50', '$3,105.00', '$88.25'];

  // Chapter 4 state
  const [period, setPeriod] = useState('week');

  // Chapter 5 state
  const [simState, setSimState] = useState<string>('invalid');
  const [badEmail, setBadEmail] = useState('raihan@acme');

  // Chapters 07-12 (U1-U6) interactive sandbox states
  const [shortcutPlatform, setShortcutPlatform] = useState<string>('win');
  const [u1Slug, setU1Slug] = useState('acme prod');
  const [pointerSim, setPointerSim] = useState<string>('coarse');
  const [u3Email, setU3Email] = useState('');
  const [u3Touched, setU3Touched] = useState(false);
  const [u3RowRemoved, setU3RowRemoved] = useState(false);
  const [u4Width, setU4Width] = useState(240);
  const [u5Reduced, setU5Reduced] = useState<string>('standard');
  const [u6Locale, setU6Locale] = useState<string>('id-ID');
  const [u6AmountIdx, setU6AmountIdx] = useState(0);

  const u3IsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u3Email.trim());
  const u3ShowError = u3Touched && u3Email.trim().length > 0 && !u3IsValid;

  const show = (id: Exclude<UxChapterId, 'all'>) =>
    chapter === 'all' || chapter === id;

  const spacingScaleRows = [
    {
      id: 's1',
      level: isId ? 'Label ke kolom inputnya' : 'Label to its own input',
      token: 'gap={1} (4px–6px)',
      why: isId
        ? 'Membuat jelas label mana milik kolom yang mana.'
        : 'Makes it obvious which label belongs to which field.',
    },
    {
      id: 's2',
      level: isId ? 'Antar kolom dalam satu kelompok' : 'Fields in the same group',
      token: 'gap={2}–{3} (8px–12px)',
      why: isId
        ? 'Menyatukan <= 5 kolom yang saling berkaitan agar mudah dipindai.'
        : 'Groups up to 5 related inputs into one easy-to-scan block.',
    },
    {
      id: 's3',
      level: isId ? 'Antar topik yang berbeda' : 'Between different topics',
      token: 'gap={5}–{6} (20px–24px)',
      why: isId
        ? 'Memberi ruang napas tanpa harus menambah garis kotak Card baru.'
        : 'Adds breathing room without wrapping everything in extra Card borders.',
    },
    {
      id: 's4',
      level: isId ? 'Antar bagian besar halaman' : 'Major page sections',
      token: 'gap={7}–{8} (28px–36px)',
      why: isId
        ? 'Menandai perpindahan bagian utama dengan jelas.'
        : 'Marks a clear visual break between major sections.',
    },
  ];

  const semanticRows = isId
    ? [
        {
          id: '1',
          need: 'Memilih & menyimpan nilai di dalam form',
          right: 'Selector / MultiSelector',
          wrong: 'DropdownMenu (khusus perintah aksi)',
        },
        {
          id: '2',
          need: 'Menyaring baris tabel secara langsung',
          right: 'TextInput pencarian + tombol hapus',
          wrong: 'Typeahead (khusus memilih 1 item)',
        },
        {
          id: '3',
          need: 'Mengubah tampilan lokal seketika (2–5 opsi)',
          right: 'SegmentedControl',
          wrong: 'TabList (khusus berpindah halaman/panel isi)',
        },
        {
          id: '4',
          need: 'Menampilkan >= 5 daftar data sejenis (pesanan, anggota)',
          right: 'Table atau List dengan garis pemisah',
          wrong: 'Tumpukan Card berulang yang memenuhi layar',
        },
        {
          id: '5',
          need: 'Mengatur jumlah angka vs tahapan alur kerja',
          right: 'NumberInput (jumlah) · Stepper (tahap)',
          wrong: 'Menukar fungsi keduanya',
        },
      ]
    : [
        {
          id: '1',
          need: 'Choose and keep a value inside a form',
          right: 'Selector / MultiSelector',
          wrong: 'DropdownMenu (fires immediate actions)',
        },
        {
          id: '2',
          need: 'Filter visible table or list rows live',
          right: 'Clearable search TextInput',
          wrong: 'Typeahead (picks one item)',
        },
        {
          id: '3',
          need: 'Switch local display mode (2–5 options)',
          right: 'SegmentedControl',
          wrong: 'TabList (switches separate content views)',
        },
        {
          id: '4',
          need: 'Show 5+ similar items (orders, team members)',
          right: 'Table or divided List',
          wrong: 'Wall of repeated Cards for every row',
        },
        {
          id: '5',
          need: 'Adjust numeric quantity vs workflow progress',
          right: 'NumberInput (quantity) · Stepper (stages)',
          wrong: 'Substituting one for the other',
        },
      ];

  const copyRows = [
    {
      id: 'c1',
      context: isId ? 'Kapitalisasi semua UI' : 'UI capitalization',
      enGood: 'Save changes · Export tokens',
      idGood: 'Simpan perubahan · Ekspor token',
      avoid: 'SAVE CHANGES / Save Changes',
    },
    {
      id: 'c2',
      context: isId ? 'Tombol aksi utama (Verb + Noun)' : 'Primary CTA (Verb + Noun)',
      enGood: 'Create workspace · Publish release',
      idGood: 'Buat ruang kerja · Terbitkan rilis',
      avoid: 'Submit / OK / Process / Yes',
    },
    {
      id: 'c3',
      context: isId ? 'Konfirmasi hapus permanen' : 'Destructive confirmation',
      enGood: 'Delete API key · Cancel',
      idGood: 'Hapus kunci API · Batal',
      avoid: 'Are you sure? Yes / No',
    },
    {
      id: 'c4',
      context: isId ? 'Pesan validasi error' : 'Validation error copy',
      enGood: 'Enter a work email, like name@company.com.',
      idGood: 'Masukkan email kantor, mis. nama@perusahaan.com.',
      avoid: 'Invalid input! Wrong format.',
    },
    {
      id: 'c5',
      context: isId ? 'Label vs Placeholder input' : 'Field label vs Placeholder',
      enGood: 'Label: Project name · Placeholder: e.g. Q4 launch',
      idGood: 'Label: Nama proyek · Placeholder: mis. Rilis Q4',
      avoid: 'Unlabeled input relying only on placeholder',
    },
    {
      id: 'c6',
      context: isId
        ? 'Tagline murni & Evergreen Copy'
        : 'Pure domain & Evergreen copy',
      enGood: 'Turn raw notes into structured briefs ({items.length} templates)',
      idGood: 'Ubah catatan mentah menjadi dokumen terstruktur ({items.length} templat)',
      avoid: '"142 items · zero API keys · via localStorage" hardcoded in prose',
    },
  ];

  const totalUxChapters = UX_DOMAINS.reduce(
    (sum, d) => sum + d.chapters.length,
    0,
  );

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Heading level={2}>{copy.ux.title}</Heading>
          <Badge
            variant="info"
            label={
              isId
                ? `${totalUxChapters} Bab · Terindeks AI`
                : `${totalUxChapters} Chapters · AI-Indexed`
            }
          />
        </HStack>
        <Text color="secondary">{copy.ux.subtitle}</Text>
      </Stack>

      <div className="ux-layout">
        {/* Sticky Left Chapter Rail (Practicing Chunking!) */}
        <nav className="ux-sidebar" aria-label="UX Playbook chapters">
          {UX_DOMAINS.map(domain => (
            <div key={domain.id} className="cat-pillar-group">
              <div className="cat-pillar-label" aria-hidden="true">
                <span className="cat-pillar-num">{domain.roman}</span>
                <span className="cat-pillar-text">
                  {isId ? domain.idLabel : domain.en}
                </span>
              </div>
              <div className="cat-pillar-items">
                {domain.chapters.map(ch => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`cat-nav-btn ${chapter === ch.id ? 'is-active' : ''}`}
                    onClick={() => setChapter(ch.id)}
                  >
                    <span>{isId ? ch.idLabel : ch.en}</span>
                    <span className="cat-nav-count">{ch.num}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="cat-sidebar-divider" role="separator" />

          <button
            type="button"
            className={`cat-nav-btn ${chapter === 'all' ? 'is-active' : ''}`}
            onClick={() => setChapter('all')}
          >
            <span>{isId ? 'Semua Bab' : 'All Chapters'}</span>
            <span className="cat-nav-count">12</span>
          </button>
        </nav>

        <Stack gap={5}>
          {/* ================================================================
              CHAPTER 01: GROUPING & CHUNKING (GESTALT & ANTI-CARD-WALL)
             ================================================================ */}
          {show('chunking') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 01 · Grouping, Chunking & Anti-Card-Wall'
                        : 'Chapter 01 · Grouping, Chunking & Anti-Card-Wall'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Kelompokkan <= 5 item terkait dengan jarak rapat; pisahkan topik dengan ruang napas, bukan kotak bertumpuk'
                      : 'Group <= 5 related items tightly; separate topics with space instead of nested Card walls'}
                  </Heading>
                  <Text color="secondary">
                    {isId
                      ? 'Memori kerja manusia memindai 4 ± 1 kelompok sekaligus. Jika jarak dalam grup sama lebarnya dengan jarak antar grup — atau setiap baris dibungkus Card berbingkai — mata kehilangan titik fokus.'
                      : 'Working memory scans 4 ± 1 chunks at a glance. When intra-group spacing equals inter-group spacing — or every item is wrapped in its own bordered Card — visual hierarchy collapses into noise.'}
                  </Text>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <div className="studio-ux-tag studio-ux-tag-do">
                      <CheckCircle2 size={15} />
                      <span>{copy.ux.doLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Satu permukaan tenang: jarak rapat di dalam grup (8px), garis pemisah halus antar topik (20px), dan baris List untuk item berulang.'
                        : 'One calm container: tight spacing within a group (8px), generous break + hairline Divider between topics, and divided List rows.'}
                    </Text>

                    {/* Group A: Tight intra-group spacing */}
                    <VStack gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Identitas ruang kerja' : 'Workspace identity'}
                      </Text>
                      <TextInput
                        label={isId ? 'Nama organisasi' : 'Organization name'}
                        size="sm"
                        value={orgName}
                        onChange={setOrgName}
                      />
                      <TextInput
                        label="URL slug"
                        size="sm"
                        value={orgSlug}
                        onChange={setOrgSlug}
                      />
                    </VStack>

                    <Divider />

                    {/* Group B: Distinct semantic topic */}
                    <VStack gap={2}>
                      <Switch
                        label={
                          isId
                            ? 'Ringkasan insiden harian via email'
                            : 'Daily incident digest email'
                        }
                        value={emailAlerts}
                        onChange={setEmailAlerts}
                      />
                      <List density="compact" hasDividers>
                        <ListItem
                          label="ap-southeast-1"
                          description="Primary gateway"
                          endContent={<Badge variant="success" label="14 ms" />}
                        />
                        <ListItem
                          label="eu-central-1"
                          description="Failover replica"
                          endContent={<Badge variant="neutral" label="22 ms" />}
                        />
                      </List>
                    </VStack>
                  </div>

                  <div className="studio-ux-box studio-ux-dont">
                    <div className="studio-ux-tag studio-ux-tag-dont">
                      <XCircle size={15} />
                      <span>{copy.ux.dontLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Card Wall: membungkus setiap baris dan setiap properti tunggal ke dalam kotak berbingkai & berbayang sendiri-sendiri.'
                        : 'Card Wall: wrapping every single row and isolated toggle inside its own bordered, shadowed box.'}
                    </Text>

                    <div className="studio-card-wall-bad">
                      <div>
                        <strong>Organization: Mehan</strong>
                        <Badge variant="neutral" label="Edit" />
                      </div>
                      <div>
                        <strong>Slug: mehan-studio</strong>
                        <Badge variant="neutral" label="Edit" />
                      </div>
                      <div>
                        <strong>Gateway: ap-southeast-1</strong>
                        <Badge variant="success" label="14 ms" />
                      </div>
                      <div>
                        <strong>Replica: eu-central-1</strong>
                        <Badge variant="neutral" label="22 ms" />
                      </div>
                    </div>
                  </div>
                </Grid>

                <Table
                  aria-label="Spacing proximity scale"
                  density="compact"
                  dividers="rows"
                  data={spacingScaleRows}
                  columns={[
                    {
                      key: 'level',
                      header: isId ? 'Tingkat kedekatan' : 'Proximity tier',
                      width: proportional(1.2),
                    },
                    {
                      key: 'token',
                      header: 'Astryx Stack / Gap',
                      width: pixel(185),
                      renderCell: r => (
                        <span className="studio-mono-pill">{String(r.token)}</span>
                      ),
                    },
                    {
                      key: 'why',
                      header: isId ? 'Fungsi perseptual' : 'Perceptual job',
                      width: proportional(1.6),
                    },
                  ]}
                />
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 02: PROGRESSIVE DISCLOSURE (4-TIER COMPLEXITY BUDGET)
             ================================================================ */}
          {show('disclosure') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 02 · Progressive Disclosure (4 Tingkat)'
                        : 'Chapter 02 · Progressive Disclosure (4 Tiers)'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Sederhana di depan, lengkap sesuai permintaan (maksimal 2 lapis kedalaman)'
                      : 'Simple first, power on demand — capped at two disclosure levels'}
                  </Heading>
                  <Text color="secondary">
                    {isId
                      ? 'Tampilkan <= 5 keputusan utama dengan nilai bawaan yang aman. Simpan filter sekunder di Popover, parameter teknis di Collapsible, dan inspeksi detail di Drawer samping — jangan pernah membuat tab-di-dalam-tab atau modal-di-atas-modal.'
                      : 'Expose <= 5 frequent controls with safe defaults upfront. Stage secondary filters in a Popover, expert flags in a Collapsible, and item inspection in a side Drawer — never nest tabs inside tabs or stack modals.'}
                  </Text>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <div className="studio-ux-tag studio-ux-tag-do">
                      <CheckCircle2 size={15} />
                      <span>{copy.ux.doLabel}</span>
                    </div>

                    {/* Tier 1: Visible defaults */}
                    <TextInput
                      label={isId ? '1. Nama proyek (Utama)' : '1. Project name (Primary)'}
                      size="sm"
                      value={projName}
                      onChange={setProjName}
                    />
                    <Selector
                      label={isId ? '1. Wilayah utama' : '1. Primary region'}
                      size="sm"
                      placement="below"
                      options={[
                        'Singapore (ap-southeast-1)',
                        'Tokyo (ap-northeast-1)',
                        'Frankfurt (eu-central-1)',
                      ]}
                      value={region}
                      onChange={setRegion}
                    />

                    {/* Tier 2 & Tier 4 triggers */}
                    <HStack gap={2} wrap="wrap">
                      <Popover
                        isOpen={moreFilterOpen}
                        onOpenChange={setMoreFilterOpen}
                        label="More options"
                        content={
                          <div style={{padding: 12, width: 220}}>
                            <VStack gap={2}>
                              <Text type="supporting" weight="semibold">
                                {isId ? 'Tingkat 2 · Popover' : 'Tier 2 · Peer Popover'}
                              </Text>
                              <Switch
                                label={isId ? 'Sertakan arsip' : 'Include archived'}
                                value={includeArchived}
                                onChange={setIncludeArchived}
                              />
                            </VStack>
                          </div>
                        }
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<SlidersHorizontal size={13} />}
                          label={isId ? '2. Opsi tambahan' : '2. More options'}
                        />
                      </Popover>

                      <Button
                        variant="ghost"
                        size="sm"
                        label={isId ? '4. Inspeksi di Drawer' : '4. Inspect in Drawer'}
                        onClick={() => setDetailDrawerOpen(true)}
                      />
                    </HStack>

                    {/* Tier 3: Inline Collapsible */}
                    <Collapsible
                      defaultIsOpen={false}
                      trigger={
                        isId
                          ? '3. Pengaturan ahli (Webhook & HMAC)'
                          : '3. Advanced settings (Webhook & HMAC)'
                      }
                    >
                      <TextInput
                        label="Webhook endpoint URL"
                        size="sm"
                        value={webhookUrl}
                        onChange={setWebhookUrl}
                      />
                    </Collapsible>
                  </div>

                  <div className="studio-ux-box studio-ux-dont">
                    <div className="studio-ux-tag studio-ux-tag-dont">
                      <XCircle size={15} />
                      <span>{copy.ux.dontLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Menumpahkan 8–12 parameter infrastruktur mentah sekaligus di layar pertama membuat pengguna baru ragu dan salah klik.'
                        : 'Dumping 8–12 low-frequency infrastructure flags onto the initial screen intimidates new users and causes misconfiguration.'}
                    </Text>
                    <div className="studio-clutter-mock">
                      <span>Shard ID: 0x04</span>
                      <span>Retry jitter (ms)</span>
                      <span>TLS cipher suite</span>
                      <span>HMAC header key</span>
                      <span>Keep-alive TTL</span>
                      <span>Max idle sockets</span>
                      <span>BGP fallback ASN</span>
                      <span>Read quorum count</span>
                    </div>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 8 (U2): TOUCH, MOBILE, 200% ZOOM & HIGH-CONTRAST
             ================================================================ */}
          {show('ergonomics') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 03 · Ergonomi Sentuh, Zoom 200% & Kontras Tinggi'
                        : 'Chapter 03 · Touch Targets, 200% Zoom & Borderless High-Contrast'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Target sentuh >= 44px pada layar sentuh, font input >= 16px, dan garis tegas otomatis di mode kontras tinggi'
                      : '44px coarse-pointer targets, 16px mobile input floor, and automatic high-contrast borders'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Adaptasi kepadatan penunjuk' : 'Pointer density adaptation'}
                      </Text>
                      <SegmentedControl
                        label="Simulate pointer precision"
                        size="sm"
                        value={pointerSim}
                        onChange={setPointerSim}
                      >
                        <SegmentedControlItem value="fine" label="Fine (32–36px)" />
                        <SegmentedControlItem value="coarse" label="Coarse (44px)" />
                      </SegmentedControl>
                    </HStack>

                    <div
                      style={{
                        padding: 12,
                        borderRadius: 10,
                        backgroundColor: 'var(--mehan-tray)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: pointerSim === 'coarse' ? 10 : 6,
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        variant="primary"
                        size={pointerSim === 'coarse' ? 'lg' : 'sm'}
                        label={isId ? 'Simpan perubahan' : 'Save changes'}
                      />
                      <Button
                        variant="secondary"
                        size={pointerSim === 'coarse' ? 'lg' : 'sm'}
                        label={isId ? 'Pratinjau' : 'Preview'}
                      />
                    </div>

                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Pada @media (pointer: coarse), tinggi tombol naik ke >= 44px dengan jarak minimal 8px, dan font input >= 16px agar Safari iOS tidak melakukan zoom paksa.'
                        : 'Under @media (pointer: coarse), controls expand to >= 44px height with >= 8px gap and >= 16px input font size to prevent iOS Safari forced page zoom.'}
                    </Text>
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId
                        ? '4 jaminan media CSS otomatis Mehan'
                        : 'Four built-in CSS media guarantees'}
                    </Text>
                    <List density="compact" hasDividers>
                      <ListItem
                        label="@media (prefers-contrast: more)"
                        description={
                          isId
                            ? 'Sumur input, soket, dan kartu tanpa garis otomatis mendapat tepi kontras >= 3:1.'
                            : 'Borderless wells, sockets, and cards gain crisp >= 3:1 structural borders.'
                        }
                      />
                      <ListItem
                        label="@media (forced-colors: active)"
                        description={
                          isId
                            ? 'Memetakan tepi kontrol ke CanvasText & Highlight pada Windows High Contrast.'
                            : 'Maps control outlines cleanly to CanvasText and Highlight system colors.'
                        }
                      />
                      <ListItem
                        label="200% Browser Zoom & <= 559px Height"
                        description={
                          isId
                            ? 'Melepas kunci tinggi 100dvh agar konten tetap dapat digulir saat zoom 200% atau papan ketik virtual terbuka.'
                            : 'Releases 100dvh viewport locks so zoomed or virtual-keyboard viewports scroll naturally.'
                        }
                      />
                      <ListItem
                        label="@media print"
                        description={
                          isId
                            ? 'Menyembunyikan bilah navigasi/editor dan membuka area gulir agar dokumen tercetak utuh.'
                            : 'Hides studio chrome and unlocks scroll containers for clean document printing.'
                        }
                      />
                    </List>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 04: TRUNCATION, WRAPPING & TABULAR NUMERALS
             ================================================================ */}
          {show('truncation') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 04 · Truncation, Wrapping & Tabular Numerals'
                        : 'Chapter 04 · Truncation, Wrapping & Tabular Numerals'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Potong ID panjang dengan tooltip pintar; pantang memotong label tombol, error, atau nominal uang'
                      : 'Truncate long paths with smart tooltips; never truncate action buttons, errors, or currency'}
                  </Heading>
                  <Text color="secondary">
                    {isId
                      ? 'Gunakan maxLines={1} untuk path/ID di ruang sempit dan maxLines={2} untuk menyamakan tinggi deskripsi kartu. Untuk angka dinamis dan kolom tabel numerik, wajib aktifkan tabular-nums rata kanan.'
                      : 'Use maxLines={1} for long paths/IDs in bounded slots and maxLines={2} to equalize card descriptions. Always right-align dynamic metrics and table numbers with tabular-nums.'}
                  </Text>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <div className="studio-ux-tag studio-ux-tag-do">
                      <CheckCircle2 size={15} />
                      <span>{copy.ux.doLabel}</span>
                    </div>

                    <VStack gap={1}>
                      <Text type="supporting" weight="semibold">
                        {isId
                          ? '1. Path panjang -> maxLines={1} + Tooltip otomatis saat diarahkan:'
                          : '1. Long path -> maxLines={1} + automatic hover Tooltip:'}
                      </Text>
                      <div
                        style={{
                          maxWidth: 260,
                          padding: '6px 10px',
                          borderRadius: 8,
                          backgroundColor: 'var(--mehan-well)',
                        }}
                      >
                        <Text type="supporting" maxLines={1}>
                          packages/astryx/themes/mehan-confectionery/mehanConfectioneryTheme.ts
                        </Text>
                      </div>
                    </VStack>

                    <VStack gap={1.5}>
                      <HStack hAlign="between" vAlign="center">
                        <Text type="supporting" weight="semibold">
                          {isId
                            ? '2. Angka dinamis -> tabular-nums rata kanan:'
                            : '2. Live metrics -> right-aligned tabular-nums:'}
                        </Text>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<RefreshCw size={12} />}
                          label={isId ? 'Ubah angka' : 'Cycle digits'}
                          onClick={() => setLiveTick(t => (t + 1) % 4)}
                        />
                      </HStack>
                      <div
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          backgroundColor: 'var(--mehan-tray)',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text type="supporting" color="secondary">
                          Edge p95 / Volume
                        </Text>
                        <HStack gap={3}>
                          <Text weight="semibold" hasTabularNumbers>
                            {latencySamples[liveTick]}
                          </Text>
                          <Text weight="semibold" hasTabularNumbers>
                            {revenueSamples[liveTick]}
                          </Text>
                        </HStack>
                      </div>
                    </VStack>
                  </div>

                  <div className="studio-ux-box studio-ux-dont">
                    <div className="studio-ux-tag studio-ux-tag-dont">
                      <XCircle size={15} />
                      <span>{copy.ux.dontLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Empat elemen yang HARAM dipotong elipsis (...) karena menghilangkan makna kritis:'
                        : 'Four elements that must NEVER be truncated with an ellipsis (...):'}
                    </Text>
                    <List density="compact" hasDividers>
                      <ListItem
                        label={isId ? 'Label tombol aksi' : 'Action button labels'}
                        description={
                          isId
                            ? 'Salah: "Delete API..." -> Benar: lebarkan tombol atau bungkus baris.'
                            : 'Bad: "Delete API..." -> Good: let button grow to fit verb + noun.'
                        }
                      />
                      <ListItem
                        label={isId ? 'Pesan error & validasi' : 'Validation & error messages'}
                        description={
                          isId
                            ? 'Wajib membungkus baris (wrap) agar solusi perbaikan terbaca utuh.'
                            : 'Must wrap naturally so recovery instructions stay readable.'
                        }
                      />
                      <ListItem
                        label={isId ? 'Nominal harga & kuota' : 'Currency totals & quotas'}
                        description={
                          isId
                            ? 'Memotong "$12,480.00" menjadi "$12,4..." berisiko fatal.'
                            : 'Clipping "$12,480.00" into "$12,4..." causes costly mistakes.'
                        }
                      />
                    </List>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 10 (U4): 9-TIER LINE BUDGET, MIDDLETRUNCATE & SCROLL SPLIT
             ================================================================ */}
          {show('linebudget') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 05 · Matriks 9 Batas Baris, MiddleTruncate & Pemisahan Scroll'
                        : 'Chapter 05 · 9-Tier Line Budget, MiddleTruncate & Scroll-Chaining Split'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Jaga ekstensi file dengan MiddleTruncate & jangan pernah menjebak gulir vertikal halaman'
                      : 'Preserve file tails with MiddleTruncate & never trap vertical page scrolling inside inline blocks'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <Text weight="semibold">
                      {isId
                        ? 'Uji langsung lebar wadah MiddleTruncate'
                        : 'Drag container width to test MiddleTruncate'}
                    </Text>
                    <PrecisionSlider
                      label={isId ? 'Lebar slot' : 'Slot width'}
                      value={u4Width}
                      min={150}
                      max={340}
                      step={10}
                      unit="px"
                      onChange={setU4Width}
                    />
                    <div
                      style={{
                        width: u4Width,
                        maxWidth: '100%',
                        padding: '8px 12px',
                        borderRadius: 8,
                        backgroundColor: 'var(--mehan-well)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}
                    >
                      <MiddleTruncate
                        text="quarterly-revenue-audit-2026-signed.pdf"
                        endChars={11}
                        monospace
                      />
                      <MiddleTruncate
                        text="mh_key_example_98f4c2a1b7e044829d4e"
                        endChars={6}
                        monospace
                      />
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Ekstensi .pdf dan 6 karakter akhir kunci API tetap terlihat, sementara pembaca layar membaca teks utuh.'
                        : 'Both .pdf and the 6-char key suffix stay scannable while screen readers announce the full string.'}
                    </Text>
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId
                        ? 'Aturan pemisahan overscroll-behavior'
                        : 'Scroll-chaining split law'}
                    </Text>
                    <List density="compact" hasDividers>
                      <ListItem
                        label="Overlay melayang (Dialog, Drawer, Popover)"
                        description={
                          isId
                            ? 'Gunakan overscroll-behavior: contain agar latar belakang halaman terkunci tenang.'
                            : 'Use overscroll-behavior: contain so background content never rubber-bands.'
                        }
                      />
                      <ListItem
                        label="Blok sebaris (Table horizontal, CodeEditor)"
                        description={
                          isId
                            ? 'Wajib overscroll-behavior-inline: contain; overscroll-behavior-block: auto agar roda mouse tidak terjebak saat menggulir halaman ke bawah.'
                            : 'Must use overscroll-behavior-inline: contain; overscroll-behavior-block: auto so wheel scrolling never gets trapped mid-page.'
                        }
                      />
                    </List>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 12 (U6): BILINGUAL +30-40% EXPANSION & INTL FORMATTING
             ================================================================ */}
          {show('i18n') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 06 · Ketahanan Ekspansi Teks +30–40% & Format Lokal Intl'
                        : 'Chapter 06 · +30–40% Text-Expansion Resilience & Intl Formatting'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Biarkan lebar tombol tumbuh alami & gunakan pemformat Intl bermemoisasi sesuai bahasa aktif'
                      : 'Let controls grow intrinsically for +30–40% longer translations & format metrics via locale-bound Intl'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Pemformat langsung @mehan/dna' : 'Live @mehan/dna Intl formatters'}
                      </Text>
                      <HStack gap={2} vAlign="center">
                        <SegmentedControl
                          label="Formatting locale"
                          size="sm"
                          value={u6Locale}
                          onChange={setU6Locale}
                        >
                          <SegmentedControlItem value="id-ID" label="id-ID" />
                          <SegmentedControlItem value="en-US" label="en-US" />
                        </SegmentedControl>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={<RefreshCw size={12} />}
                          label={isId ? 'Sampel' : 'Sample'}
                          onClick={() => setU6AmountIdx(i => (i + 1) % 3)}
                        />
                      </HStack>
                    </HStack>

                    {(() => {
                      const samples = [
                        {num: 12480.5, cur: -1500, bytes: 1572864, pct: 0.994, mins: 3},
                        {num: 984120.75, cur: 48200, bytes: 268435456, pct: 0.682, mins: 42},
                        {num: 305.2, cur: -290, bytes: 921600, pct: 1, mins: 120},
                      ] as const;
                      const s = samples[u6AmountIdx];
                      return (
                        <List density="compact" hasDividers>
                          <ListItem
                            label="formatNumber"
                            endContent={
                              <Text weight="semibold" hasTabularNumbers>
                                {formatNumber(s.num, u6Locale)}
                              </Text>
                            }
                          />
                          <ListItem
                            label="formatCurrency (compact)"
                            endContent={
                              <Text weight="semibold" hasTabularNumbers>
                                {formatCurrency(
                                  s.cur,
                                  u6Locale === 'id-ID' ? 'IDR' : 'USD',
                                  u6Locale,
                                  {compact: true},
                                )}
                              </Text>
                            }
                          />
                          <ListItem
                            label="formatBytes · formatPercent"
                            endContent={
                              <Text weight="semibold" hasTabularNumbers>
                                {formatBytes(s.bytes, u6Locale)} ·{' '}
                                {formatPercent(s.pct, u6Locale, 1)}
                              </Text>
                            }
                          />
                          <ListItem
                            label="formatRelativeTime"
                            endContent={
                              <Text weight="semibold" hasTabularNumbers>
                                {formatRelativeTime(
                                  Date.now() - s.mins * 60_000,
                                  u6Locale,
                                )}
                              </Text>
                            }
                          />
                        </List>
                      );
                    })()}
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId
                        ? 'Perbandingan ekspansi lebar tombol (+35%)'
                        : 'Button text-expansion resilience (+35%)'}
                    </Text>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Jangan pernah mengunci width: 80px pada tombol atau tab. Gunakan kalimat perintah ringkas yang lugas dan alami.'
                        : 'Never hardcode narrow pixel widths (like width: 80px) on buttons or tabs. Let padding + flex-wrap absorb +30–40% translation growth.'}
                    </Text>
                    <VStack gap={2}>
                      <HStack gap={2} wrap="wrap" vAlign="center">
                        <Badge variant="neutral" label="EN" />
                        <Button variant="primary" size="sm" label="Save" />
                        <Button variant="secondary" size="sm" label="Retry" />
                        <Button variant="ghost" size="sm" label="Clear" />
                      </HStack>
                      <HStack gap={2} wrap="wrap" vAlign="center">
                        <Badge variant="pink" label="ID" />
                        <Button variant="primary" size="sm" label="Simpan perubahan" />
                        <Button variant="secondary" size="sm" label="Coba lagi" />
                        <Button variant="ghost" size="sm" label="Bersihkan filter" />
                      </HStack>
                    </VStack>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 07: ACTION HIERARCHY & SEMANTIC CONTROL BOUNDARIES
             ================================================================ */}
          {show('hierarchy') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 07 · Hierarki Aksi & Batas Semantik Kontrol'
                        : 'Chapter 07 · Action Hierarchy & Semantic Control Roles'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Maksimal 1 tombol Primary per konteks keputusan & patuhi batas peran kontrol'
                      : 'One Primary CTA per decision context & strict behavioral control boundaries'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3}>
                  <div className="studio-ux-box studio-ux-do">
                    <div className="studio-ux-tag studio-ux-tag-do">
                      <CheckCircle2 size={15} />
                      <span>{copy.ux.doLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Urutan tenang dari kiri ke kanan: Ghost (Batal) -> Secondary (Pendukung) -> 1 Primary (Tujuan utama).'
                        : 'Calm progression: quiet Ghost cancel -> raised Secondary -> one clear Primary CTA.'}
                    </Text>
                    <HStack gap={2} wrap="wrap" vAlign="center">
                      <Button variant="ghost" size="sm" label={isId ? 'Batal' : 'Cancel'} />
                      <Button
                        variant="secondary"
                        size="sm"
                        label={isId ? 'Simpan draf' : 'Save draft'}
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        label={isId ? 'Terbitkan rilis' : 'Publish release'}
                      />
                    </HStack>
                  </div>

                  <div className="studio-ux-box studio-ux-dont">
                    <div className="studio-ux-tag studio-ux-tag-dont">
                      <XCircle size={15} />
                      <span>{copy.ux.dontLabel}</span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Tiga tombol Primary bersaing + label huruf besar kabur ("OK", "SUBMIT").'
                        : 'Three competing Primary fills + vague shouting labels ("OK", "SUBMIT").'}
                    </Text>
                    <HStack gap={2} wrap="wrap" vAlign="center">
                      <Button variant="primary" size="sm" label="SUBMIT" />
                      <Button variant="primary" size="sm" label="EXPORT ALL" />
                      <Button variant="primary" size="sm" label="OK" />
                    </HStack>
                  </div>
                </Grid>

                <HStack gap={3} vAlign="center" wrap="wrap">
                  <Text type="supporting" color="secondary">
                    {isId
                      ? 'Contoh SegmentedControl (mengubah rentang tampilan lokal seketika):'
                      : 'Live SegmentedControl (switches local display mode immediately):'}
                  </Text>
                  <SegmentedControl
                    label="Time range"
                    size="sm"
                    value={period}
                    onChange={setPeriod}
                  >
                    <SegmentedControlItem value="day" label={isId ? 'Hari' : 'Day'} />
                    <SegmentedControlItem value="week" label={isId ? 'Minggu' : 'Week'} />
                    <SegmentedControlItem value="month" label={isId ? 'Bulan' : 'Month'} />
                  </SegmentedControl>
                </HStack>

                <Table
                  aria-label="Semantic control boundaries"
                  data={semanticRows}
                  columns={[
                    {
                      key: 'need',
                      header: isId ? 'Kebutuhan interaksi' : 'Interaction job',
                      width: proportional(1.4, {minWidth: 180}),
                    },
                    {
                      key: 'right',
                      header: isId ? 'Komponen tepat' : 'Canonical control',
                      width: proportional(1.1, {minWidth: 150}),
                      renderCell: row => (
                        <span className="studio-mono-pill">{String(row.right)}</span>
                      ),
                    },
                    {
                      key: 'wrong',
                      header: isId ? 'Jangan diganti dengan' : 'Never substitute',
                      width: proportional(1.2, {minWidth: 160}),
                      renderCell: row => (
                        <Text type="supporting" color="secondary">
                          {String(row.wrong)}
                        </Text>
                      ),
                    },
                  ]}
                  density="balanced"
                  dividers="rows"
                  hasHover
                />
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 7 (U1): KEYBOARD, SHORTCUT GRAMMAR & FOCUS PLACEMENT
             ================================================================ */}
          {show('keyboard') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 08 · Pintasan Keyboard, Urutan Esc & Penempatan Fokus'
                        : 'Chapter 08 · Keyboard Grammar, Layered Esc & Focus Placement'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Lindungi ketikan form & IME, urutkan prioritas tombol Esc, dan arahkan fokus langsung ke solusi'
                      : 'Guard IME & input typing, layer Escape dismissal cleanly, and land focus where recovery happens'}
                  </Heading>
                  <Text color="secondary">
                    {isId
                      ? 'Pintasan satu tombol (/, ?) wajib memeriksa !isComposing && keyCode !== 229 && !isTypingTarget(target). Sementara Mod+Enter tetap mengirimkan aksi utama di dalam form, dan Esc menutup lapisan teratas satu per satu.'
                      : 'Single-key shortcuts (/, ?) must check !isComposing && keyCode !== 229 && !isTypingTarget(target). Mod+Enter submits inside focused inputs, while Escape dismisses strictly one topmost layer at a time.'}
                  </Text>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Notasi pintasan adaptif OS' : 'Platform-aware shortcut badges'}
                      </Text>
                      <SegmentedControl
                        label="Shortcut OS platform"
                        size="sm"
                        value={shortcutPlatform}
                        onChange={setShortcutPlatform}
                      >
                        <SegmentedControlItem value="win" label="Win / Linux" />
                        <SegmentedControlItem value="mac" label="macOS" />
                      </SegmentedControl>
                    </HStack>

                    <List density="compact" hasDividers>
                      {[
                        {
                          job: isId ? 'Kirim form utama' : 'Submit primary form',
                          combo: 'mod+enter',
                        },
                        {
                          job: isId ? 'Urungkan langkah (Undo)' : 'Undo last change',
                          combo: 'mod+z',
                        },
                        {
                          job: isId ? 'Ulangi langkah (Redo)' : 'Redo change',
                          combo: 'mod+shift+z',
                        },
                      ].map(row => (
                        <ListItem
                          key={row.combo}
                          label={row.job}
                          endContent={
                            <HStack gap={1}>
                              {formatShortcutKeys(
                                row.combo,
                                shortcutPlatform === 'mac',
                              ).map(k => (
                                <kbd key={k} className="studio-mono-pill">
                                  {k}
                                </kbd>
                              ))}
                            </HStack>
                          }
                        />
                      ))}
                    </List>

                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Urutan Esc berlapis: Menu/Popover teratas -> Hapus isi pencarian -> Tutup Drawer samping -> Tutup Tour -> Pantang menghapus draf form tanpa konfirmasi.'
                        : 'Layered Esc order: Topmost menu/popover -> Clear search query -> Close side Drawer -> Dismiss Tour -> Never wipe dirty form edits.'}
                    </Text>
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId
                        ? 'Lompatan fokus ErrorSummary (#fieldId + scroll-padding-top)'
                        : 'ErrorSummary focus jump (#fieldId + scroll-padding-top)'}
                    </Text>
                    {/\s/.test(u1Slug) ? (
                      <ErrorSummary
                        title={
                          isId
                            ? 'Perbaiki kolom berikut sebelum menyimpan'
                            : 'Fix the following issue before saving'
                        }
                        errors={[
                          {
                            fieldId: 'ux-u1-slug-wrap',
                            fieldLabel: 'Workspace slug',
                            message: isId
                              ? 'Gunakan huruf kecil dan tanda hubung tanpa spasi (mis. acme-prod).'
                              : 'Use lowercase letters and hyphens without spaces (e.g. acme-prod).',
                          },
                        ]}
                      />
                    ) : (
                      <InlineMessage
                        status="success"
                        message={
                          isId
                            ? 'Format slug valid dan siap disimpan.'
                            : 'Workspace slug is valid and ready to save.'
                        }
                      />
                    )}

                    <div id="ux-u1-slug-wrap">
                      <TextInput
                        label="Workspace slug"
                        size="sm"
                        value={u1Slug}
                        onChange={setU1Slug}
                      />
                    </div>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 11 (U5): MOTION CHOREOGRAPHY & REDUCED-MOTION NUANCE
             ================================================================ */}
          {show('motion') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 09 · Koreografi Gerak 4 Tingkat & Nuansa Reduced-Motion'
                        : 'Chapter 09 · 4-Tier Motion Physics & Reduced-Motion Nuance'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Tekanan tombol 80ms terserap ke dalam bibir 3D; hentikan loncatan spasial saat reduced-motion tanpa membekukan indikator muat'
                      : '80ms press absorbed inside the 3D lip; stop spatial bounce under reduced-motion without freezing async spinners'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Simulasi preferensi gerak' : 'Motion preference behavior'}
                      </Text>
                      <SegmentedControl
                        label="Motion preference preview"
                        size="sm"
                        value={u5Reduced}
                        onChange={setU5Reduced}
                      >
                        <SegmentedControlItem value="standard" label="Standard" />
                        <SegmentedControlItem value="reduce" label="Reduced motion" />
                      </SegmentedControl>
                    </HStack>

                    <HStack gap={3} vAlign="center" wrap="wrap">
                      <Spinner size="sm" label="Syncing deployment" />
                      <Text type="supporting">
                        {u5Reduced === 'reduce'
                          ? isId
                            ? 'Reduced motion aktif: pergeseran Y/skala dimatikan (0px), namun Spinner tetap memberi sinyal hidup yang tenang.'
                            : 'Reduced motion active: spatial slide/bounce collapses to 0px while Spinner stays gently discernible.'
                          : isId
                            ? 'Mode standar: pegas mikro untuk kontrol kecil (Switch, CopyButton); keluar overlay 25% lebih cepat daripada masuk.'
                            : 'Standard mode: spring overshoot reserved for small tactile controls; overlay exits run ~25% faster than entrances.'}
                      </Text>
                    </HStack>
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId ? 'Skala durasi & masa tampil Toast' : 'Duration tiers & Toast persistence'}
                    </Text>
                    <List density="compact" hasDividers>
                      <ListItem
                        label="80ms · Tekan taktil (Press)"
                        description={
                          isId
                            ? 'Diserap oleh bibir bawah 3D internal — tinggi luar tombol 100% stabil (0px layout shift).'
                            : 'Absorbed into the internal bottom lip with 0px outer layout shift.'
                        }
                      />
                      <ListItem
                        label="140ms Hover · 220ms Popover · 320ms Drawer"
                        description={
                          isId
                            ? 'Efek hover wajib dibatasi @media (hover: hover) agar tidak lengket di layar sentuh.'
                            : 'Gate hover transitions behind @media (hover: hover) to avoid sticky touch states.'
                        }
                      />
                      <ListItem
                        label="Toast: 4–5 dtk Info · 8+ dtk Error / Undo"
                        description={
                          isId
                            ? 'Jeda penghitung waktu saat diarahkan kursor atau fokus keyboard; maksimal 3 toast tampil.'
                            : 'Pause auto-dismiss on pointer hover or keyboard focus; cap stack at 3 visible toasts.'
                        }
                      />
                    </List>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 9 (U3): FORM VALIDATION TIMING & PROPORTIONAL CONFIRM
             ================================================================ */}
          {show('forms') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 10 · Ritme Validasi Form & 3 Tingkat Konfirmasi'
                        : 'Chapter 10 · Form Validation Timing & Proportional Confirmation'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Puji cepat, tegur belakangan (onBlur lalu pulih seketika onChange) & sesuaikan gesekan konfirmasi'
                      : 'Reward early, punish late (validate onBlur, clear live onChange) & match confirmation friction to risk'}
                  </Heading>
                </Stack>

                <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3} align="start">
                  <div className="studio-ux-box studio-ux-do">
                    <Text weight="semibold">
                      {isId
                        ? 'Uji langsung: ketik sebagian email lalu tekan Tab'
                        : 'Try live: type a partial email, then press Tab'}
                    </Text>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Tidak ada pesan merah yang menyela saat mengetik pertama kali. Pesan muncul setelah keluar kolom (onBlur), dan langsung hilang pada ketikan saat format menjadi valid.'
                        : 'Zero red interruption while typing your first entry. Error appears only after blur, then clears on the exact keystroke the address becomes valid.'}
                    </Text>

                    <div onBlur={() => setU3Touched(true)}>
                      <TextInput
                        label={isId ? 'Email notifikasi rilis' : 'Release notification email'}
                        placeholder="dev@acme.com"
                        size="sm"
                        value={u3Email}
                        onChange={setU3Email}
                        status={
                          u3ShowError
                            ? {
                                type: 'error',
                                message: isId
                                  ? 'Sertakan domain lengkap, misalnya dev@acme.com.'
                                  : 'Include a complete domain, like dev@acme.com.',
                              }
                            : undefined
                        }
                      />
                    </div>

                    {u3IsValid && (
                      <InlineMessage
                        status="success"
                        message={
                          isId
                            ? 'Alamat email valid — error langsung bersih tanpa perlu blur ulang.'
                            : 'Valid email — error cleared immediately without waiting for blur.'
                        }
                      />
                    )}
                  </div>

                  <div className="studio-ux-box">
                    <Text weight="semibold">
                      {isId
                        ? '3 tingkat konfirmasi sesuai dampak aksi'
                        : 'Three proportional confirmation tiers'}
                    </Text>

                    <VStack gap={3}>
                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Text type="supporting">
                          {isId
                            ? '1. Bisa dibatalkan -> langsung jalan + Toast Undo:'
                            : '1. Reversible -> immediate + Undo Toast:'}
                        </Text>
                        <Button
                          variant="secondary"
                          size="sm"
                          label={isId ? 'Arsipkan item' : 'Archive item'}
                          onClick={() =>
                            showToast({
                              type: 'info',
                              body: isId
                                ? 'Item diarsipkan. Gunakan Undo dalam 8 detik bila tidak sengaja.'
                                : 'Item archived. Reversible actions use Undo instead of modals.',
                            })
                          }
                        />
                      </HStack>

                      <Divider />

                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Text type="supporting">
                          {isId
                            ? '2. Hapus baris lokal -> InlineConfirm tanpa modal:'
                            : '2. Local row removal -> non-modal InlineConfirm:'}
                        </Text>
                        {u3RowRemoved ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            label={isId ? 'Pulihkan baris contoh' : 'Restore sample row'}
                            onClick={() => setU3RowRemoved(false)}
                          />
                        ) : (
                          <InlineConfirm
                            triggerLabel={isId ? 'Hapus webhook' : 'Remove webhook'}
                            confirmLabel={isId ? 'Ya, hapus' : 'Confirm remove'}
                            cancelLabel={isId ? 'Batal' : 'Cancel'}
                            prompt={isId ? 'Hapus baris ini?' : 'Remove this row?'}
                            onConfirm={() => setU3RowRemoved(true)}
                          />
                        )}
                      </HStack>

                      <Divider />

                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Text type="supporting">
                          {isId
                            ? '3. Permanen & berdampak luas -> AlertDialog bernama:'
                            : '3. Irreversible destruction -> named AlertDialog:'}
                        </Text>
                        <Button
                          variant="destructive"
                          size="sm"
                          label={isId ? 'Hapus kunci API' : 'Delete API key'}
                          onClick={onOpenConfirmDemo}
                        />
                      </HStack>
                    </VStack>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 11: SYSTEM STATES & HUMANE RECOVERY
             ================================================================ */}
          {show('states') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 11 · Lima State Sistem & Pemulihan Manusiawi'
                        : 'Chapter 11 · Five System States & Humane Recovery'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Setiap layar wajib merancang kondisi Loading, Empty, Invalid, Error, dan Destructive'
                      : 'Design Loading, Empty, Invalid, Error, and Destructive states before shipping'}
                  </Heading>
                </Stack>

                <SegmentedControl
                  label="Simulate system state"
                  size="sm"
                  value={simState}
                  onChange={setSimState}
                >
                  <SegmentedControlItem value="invalid" label="1. Validation" />
                  <SegmentedControlItem value="loading" label="2. Loading" />
                  <SegmentedControlItem value="empty" label="3. Empty" />
                  <SegmentedControlItem value="error" label="4. Error" />
                  <SegmentedControlItem value="destructive" label="5. Destructive" />
                </SegmentedControl>

                <div className="studio-ux-box">
                  {simState === 'invalid' && (
                    <Stack gap={2}>
                      <Text weight="semibold">
                        {isId
                          ? 'Validasi non-destruktif (jangan pernah menghapus ketikan pengguna)'
                          : 'Non-destructive validation (preserve user input + show how to fix it)'}
                      </Text>
                      <div style={{maxWidth: 420}}>
                        <TextInput
                          label={isId ? 'Email kerja' : 'Work email'}
                          value={badEmail}
                          onChange={setBadEmail}
                          status={{
                            type: 'error',
                            message: isId
                              ? 'Masukkan email kantor lengkap, misalnya nama@perusahaan.com.'
                              : 'Enter a complete work email, like name@company.com.',
                          }}
                        />
                      </div>
                    </Stack>
                  )}

                  {simState === 'loading' && (
                    <Grid columns={{minWidth: 240, max: 2, repeat: 'fit'}} gap={4}>
                      <VStack gap={2}>
                        <Text type="supporting" weight="semibold">
                          {isId
                            ? 'Tata letak diketahui -> Skeleton sesuai bentuk:'
                            : 'Known layout -> Geometry-matched Skeleton:'}
                        </Text>
                        <HStack gap={3} vAlign="center">
                          <Skeleton width={36} height={36} radius="rounded" index={0} />
                          <VStack gap={1.5} width="100%">
                            <Skeleton width="70%" height={12} index={1} />
                            <Skeleton width="45%" height={10} index={2} />
                          </VStack>
                        </HStack>
                      </VStack>
                      <VStack gap={2}>
                        <Text type="supporting" weight="semibold">
                          {isId
                            ? 'Proses > 5 detik -> ProgressBar terukur:'
                            : 'Long task (> 5s) -> Determinate ProgressBar:'}
                        </Text>
                        <ProgressBar label="Exporting bundle…" value={68} />
                      </VStack>
                    </Grid>
                  )}

                  {simState === 'empty' && (
                    <EmptyState
                      isCompact
                      icon={<Inbox size={24} />}
                      title={isId ? 'Belum ada kunci API' : 'No API keys yet'}
                      description={
                        isId
                          ? 'Buat kunci API untuk menghubungkan layanan produksi dengan aman.'
                          : 'Create an API key to authenticate your production service.'
                      }
                      actions={
                        <Button
                          variant="primary"
                          size="sm"
                          label={isId ? 'Buat kunci API' : 'Create API key'}
                        />
                      }
                    />
                  )}

                  {simState === 'error' && (
                    <Stack gap={2}>
                      <Banner
                        status="error"
                        title={
                          isId
                            ? 'Gagal menyinkronkan webhook'
                            : 'Could not sync webhook endpoint'
                        }
                        description={
                          isId
                            ? 'Server tujuan tidak merespons dalam 10 detik. Perubahan drafmu tetap tersimpan aman.'
                            : 'The target host timed out after 10 seconds. Your draft settings remain safely saved.'
                        }
                      />
                      <HStack>
                        <Button
                          variant="secondary"
                          size="sm"
                          label={isId ? 'Coba lagi' : 'Try again'}
                        />
                      </HStack>
                    </Stack>
                  )}

                  {simState === 'destructive' && (
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={3}>
                      <Stack gap={0.5}>
                        <Text weight="semibold">
                          {isId
                            ? 'Konfirmasi penghapusan bernama eksplisit'
                            : 'Explicitly named destructive confirmation'}
                        </Text>
                        <Text type="supporting" color="secondary">
                          {isId
                            ? 'Sebutkan objek yang dihapus pada judul dan tombol AlertDialog — bukan "Ya / Tidak".'
                            : 'Name the exact resource in both the AlertDialog title and action button — never "Yes / No".'}
                        </Text>
                      </Stack>
                      <Button
                        variant="destructive"
                        size="sm"
                        label={isId ? 'Hapus kunci API' : 'Delete API key'}
                        onClick={onOpenConfirmDemo}
                      />
                    </HStack>
                  )}
                </div>
              </Stack>
            </Card>
          )}

          {/* ================================================================
              CHAPTER 12: MICROCOPY & BILINGUAL PRODUCT GRAMMAR
             ================================================================ */}
          {show('microcopy') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 12 · Standar Microcopy & Kamus Konsistensi'
                        : 'Chapter 12 · Microcopy Contract & Bilingual Glossary'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'Jelas, tenang, berorientasi hasil — dalam Bahasa Indonesia maupun Inggris'
                      : 'Clear, calm, outcome-first product copy across English & Indonesian'}
                  </Heading>
                </Stack>

                <Table
                  aria-label="Microcopy grammar and bilingual glossary"
                  data={copyRows}
                  columns={[
                    {
                      key: 'context',
                      header: isId ? 'Konteks UI' : 'UI pattern',
                      width: proportional(1, {minWidth: 140}),
                    },
                    {
                      key: 'enGood',
                      header: 'English (Do)',
                      width: proportional(1.25, {minWidth: 160}),
                      renderCell: r => <Text weight="semibold">{String(r.enGood)}</Text>,
                    },
                    {
                      key: 'idGood',
                      header: 'Indonesia (Lakukan)',
                      width: proportional(1.25, {minWidth: 160}),
                      renderCell: r => <Text weight="semibold">{String(r.idGood)}</Text>,
                    },
                    {
                      key: 'avoid',
                      header: isId ? 'Hindari' : 'Avoid',
                      width: pixel(170),
                      renderCell: r => (
                        <Text type="supporting" color="secondary">
                          {String(r.avoid)}
                        </Text>
                      ),
                    },
                  ]}
                  density="balanced"
                  dividers="rows"
                  hasHover
                />

                <Grid columns={{minWidth: 280, max: 2, repeat: 'fit'}} gap={3}>
                  <div className="studio-ux-box studio-ux-do">
                    <div className="studio-ux-tag studio-ux-tag-do">
                      <CheckCircle2 size={15} />
                      <span>
                        {isId
                          ? '3-Bucket Evergreen Copy & Tangga Ekstensi'
                          : '3-Bucket Evergreen Copy & Extension Ladder'}
                      </span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? '1) Ikat angka dinamis langsung dari data ({items.length}), 2) Tulis narasi lintas-file & SVG yang tahan waktu tanpa deretan angka inventaris rapuh, dan 3) Ikuti tangga komponen: Reuse Core -> Compose -> Theme Override -> Extend hanya bila perilaku ARIA berbeda.'
                        : '1) Bind counts dynamically from runtime arrays ({items.length}), 2) Keep cross-file prose & SVGs evergreen without brittle inventory tallies, and 3) Follow Reuse Core -> Compose -> Theme Override -> Extend only when WAI-ARIA semantics differ.'}
                    </Text>
                  </div>
                  <div className="studio-ux-box studio-ux-dont">
                    <div className="studio-ux-tag studio-ux-tag-dont">
                      <XCircle size={15} />
                      <span>
                        {isId
                          ? 'Anti-pola pemeliharaan tinggi'
                          : 'High-maintenance drift anti-patterns'}
                      </span>
                    </div>
                    <Text type="supporting" color="secondary">
                      {isId
                        ? 'Menebar angka statis ("142 item, 12 preset") di puluhan paragraf atau membocorkan jargon pipa teknis ("zero API keys, via localStorage") pada tagline produk.'
                        : 'Scattering hardcoded counts across prose/SVGs that go stale on every release, or leaking internal plumbing ("zero API keys, via localStorage") into user taglines.'}
                    </Text>
                  </div>
                </Grid>
              </Stack>
            </Card>
          )}
        </Stack>
      </div>

      {/* Tier 4 Disclosure Demo Drawer */}
      <Drawer
        isOpen={detailDrawerOpen}
        onOpenChange={setDetailDrawerOpen}
        label="Tier 4 contextual detail drawer"
        width={340}
      >
        <VStack gap={3}>
          <Heading level={4}>
            {isId ? 'Tingkat 4 · Drawer Kontekstual' : 'Tier 4 · Contextual Side Drawer'}
          </Heading>
          <Text color="secondary">
            {isId
              ? 'Gunakan Drawer samping untuk memeriksa log audit atau mengedit baris tabel tanpa memaksa pengguna meninggalkan halaman utama.'
              : 'Use a side Drawer to inspect audit logs or edit a selected record while preserving the user’s scroll position on the main page.'}
          </Text>
          <Button
            variant="secondary"
            size="sm"
            label={isId ? 'Tutup panel' : 'Close drawer'}
            onClick={() => setDetailDrawerOpen(false)}
          />
        </VStack>
      </Drawer>
    </Stack>
  );
}
