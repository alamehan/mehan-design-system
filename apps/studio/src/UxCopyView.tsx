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
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  VStack,
  pixel,
  proportional,
} from '@astryxdesign/core';
import {
  CheckCircle2,
  Inbox,
  RefreshCw,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react';
import type {StudioCopy} from './i18n';
import type {StudioLang} from './studioState';

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
  | 'all';

const UX_CHAPTERS: ReadonlyArray<{
  id: Exclude<UxChapterId, 'all'>;
  num: string;
  en: string;
  idLabel: string;
}> = [
  {
    id: 'chunking',
    num: '01',
    en: 'Grouping & Chunking',
    idLabel: 'Grouping & Chunking',
  },
  {
    id: 'disclosure',
    num: '02',
    en: 'Progressive Disclosure',
    idLabel: 'Progressive Disclosure',
  },
  {
    id: 'truncation',
    num: '03',
    en: 'Truncation & Numerals',
    idLabel: 'Truncate & Angka',
  },
  {
    id: 'hierarchy',
    num: '04',
    en: 'Actions & Control Roles',
    idLabel: 'Hierarki & Kontrol',
  },
  {
    id: 'states',
    num: '05',
    en: 'States & Recovery',
    idLabel: 'State & Pemulihan',
  },
  {
    id: 'microcopy',
    num: '06',
    en: 'Microcopy & Glossary',
    idLabel: 'Microcopy & Kamus',
  },
];

export function UxCopyView({lang, copy, onOpenConfirmDemo}: UxCopyViewProps) {
  const isId = lang === 'id';
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

  const show = (id: Exclude<UxChapterId, 'all'>) =>
    chapter === 'all' || chapter === id;

  const spacingScaleRows = [
    {
      id: 's1',
      level: isId ? 'Label ke input (Intra-field)' : 'Label to input (Intra-field)',
      token: 'gap={1} (4px–6px)',
      why: isId
        ? 'Mengikat label langsung ke kontrol miliknya.'
        : 'Binds a label unmistakably to its own control.',
    },
    {
      id: 's2',
      level: isId ? 'Antar input sejenis (Intra-group)' : 'Related fields (Intra-group)',
      token: 'gap={2}–{3} (8px–12px)',
      why: isId
        ? 'Membentuk 1 kelompok kognitif utuh ( <= 5 item).'
        : 'Forms one scannable chunk of <= 5 related inputs.',
    },
    {
      id: 's3',
      level: isId ? 'Antar kelompok topik (Inter-group)' : 'Distinct topics (Inter-group)',
      token: 'gap={5}–{6} (20px–24px)',
      why: isId
        ? 'Memberi jeda napas tanpa perlu menambah kotak Card baru.'
        : 'Separates topics cleanly without adding extra Card borders.',
    },
    {
      id: 's4',
      level: isId ? 'Antar bagian besar halaman' : 'Major page sections',
      token: 'gap={7}–{8} (28px–36px)',
      why: isId
        ? 'Menandai perpindahan konteks pekerjaan utama.'
        : 'Marks a clear shift between primary page tasks.',
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
          wrong: 'Typeahead (khusus memilih 1 entitas)',
        },
        {
          id: '3',
          need: 'Mengubah tampilan lokal seketika (2–5 opsi)',
          right: 'SegmentedControl',
          wrong: 'TabList (khusus berpindah halaman/panel isi)',
        },
        {
          id: '4',
          need: 'Menampilkan >= 5 data sejenis (order, token, user)',
          right: 'Table atau List dengan garis pemisah',
          wrong: 'Tumpukan Card berulang (Card Wall)',
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
          need: 'Choose and retain a value inside a form',
          right: 'Selector / MultiSelector',
          wrong: 'DropdownMenu (fires immediate commands)',
        },
        {
          id: '2',
          need: 'Filter visible table or list rows live',
          right: 'Clearable search TextInput',
          wrong: 'Typeahead (picks one entity value)',
        },
        {
          id: '3',
          need: 'Switch local display mode (2–5 options)',
          right: 'SegmentedControl',
          wrong: 'TabList (switches peer content views)',
        },
        {
          id: '4',
          need: 'Display >= 5 homogeneous records (orders, users)',
          right: 'Table or divided List',
          wrong: 'Repeated Card-per-row wall',
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
  ];

  return (
    <Stack gap={4}>
      <Stack gap={1}>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Heading level={2}>{copy.ux.title}</Heading>
          <Badge variant="info" label="6 Chapters · AI-Indexed" />
        </HStack>
        <Text color="secondary">{copy.ux.subtitle}</Text>
      </Stack>

      <div className="ux-layout">
        {/* Sticky Left Chapter Rail (Practicing Chunking!) */}
        <nav className="ux-sidebar" aria-label="UX Playbook chapters">
          {UX_CHAPTERS.map(ch => (
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

          <div className="cat-sidebar-divider" role="separator" />

          <button
            type="button"
            className={`cat-nav-btn ${chapter === 'all' ? 'is-active' : ''}`}
            onClick={() => setChapter('all')}
          >
            <span>{isId ? 'Semua Bab' : 'All Chapters'}</span>
            <span className="cat-nav-count">6</span>
          </button>
        </nav>

        <Stack gap={5}>
          {/* ================================================================
              CHAPTER 1: GROUPING & CHUNKING (GESTALT & ANTI-CARD-WALL)
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
              CHAPTER 2: PROGRESSIVE DISCLOSURE (4-TIER COMPLEXITY BUDGET)
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
              CHAPTER 3: TRUNCATION, WRAPPING & TABULAR NUMERALS
             ================================================================ */}
          {show('truncation') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 03 · Truncation, Wrapping & Tabular Numerals'
                        : 'Chapter 03 · Truncation, Wrapping & Tabular Numerals'
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
              CHAPTER 4: ACTION HIERARCHY & SEMANTIC CONTROL BOUNDARIES
             ================================================================ */}
          {show('hierarchy') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 04 · Hierarki Aksi & Batas Semantik Kontrol'
                        : 'Chapter 04 · Action Hierarchy & Semantic Control Roles'
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
              CHAPTER 5: SYSTEM STATES & HUMANE RECOVERY
             ================================================================ */}
          {show('states') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 05 · Lima State Sistem & Pemulihan Manusiawi'
                        : 'Chapter 05 · Five System States & Humane Recovery'
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
              CHAPTER 6: MICROCOPY & BILINGUAL PRODUCT GRAMMAR
             ================================================================ */}
          {show('microcopy') && (
            <Card padding={4} elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? 'Bab 06 · Standar Microcopy & Kamus Konsistensi'
                        : 'Chapter 06 · Microcopy Contract & Bilingual Glossary'
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
