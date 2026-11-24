import React, {useMemo, useState} from 'react';
import {
  Badge,
  Banner,
  Calendar,
  CheckboxInput,
  CheckboxList,
  CheckboxListItem,
  ComplexSelector,
  DateInput,
  DateRangeInput,
  DateTimeInput,
  Field,
  FileInput,
  HStack,
  InfoTip,
  InputGroup,
  InputGroupText,
  MultiSelector,
  NumberInput,
  PowerSearch,
  ProgressBar,
  RadioList,
  RadioListItem,
  Selector,
  Skeleton,
  Slider,
  Spinner,
  StatusDot,
  Switch,
  Text,
  TextArea,
  TextInput,
  TimeInput,
  Tokenizer,
  Typeahead,
  VStack,
  createPowerSearchConfig,
  createStaticSource,
  type DateRange,
  type ISODateString,
  type ISODateTimeString,
  type ISOTimeString,
  type PowerSearchFilter,
  type SearchableItem,
} from '@astryxdesign/core';
import {
  ColorPicker,
  ColorSwatch,
  MetricCard,
  PrecisionSlider,
} from '@mehan/astryx';
import {MEHAN_ACCENT_PRESETS} from '@mehan/astryx/dna';
import type {SpecimenDefinition} from './SpecimenCard';

const DATA_VIZ_SERIES = [
  {label: 'Blue', token: 'var(--color-data-categorical-blue)', pct: 86},
  {label: 'Orange', token: 'var(--color-data-categorical-orange)', pct: 68},
  {label: 'Purple', token: 'var(--color-data-categorical-purple)', pct: 74},
  {label: 'Green', token: 'var(--color-data-categorical-green)', pct: 92},
  {label: 'Pink', token: 'var(--color-data-categorical-pink)', pct: 61},
  {label: 'Teal', token: 'var(--color-data-categorical-teal)', pct: 79},
];

const STATIC_FRAMEWORKS: SearchableItem[] = [
  {id: 'react', label: 'React 19'},
  {id: 'next', label: 'Next.js App Router'},
  {id: 'vite', label: 'Vite + TypeScript'},
  {id: 'astro', label: 'Astro Islands'},
  {id: 'vue', label: 'Vue 3 (Portable CSS)'},
];

const POWER_SEARCH_DEFS = [
  {
    key: 'status',
    type: 'enum',
    label: 'Status',
    enumValues: [
      {value: 'healthy', label: 'Healthy'},
      {value: 'degraded', label: 'Degraded'},
    ],
  },
  {key: 'service', type: 'string', label: 'Service'},
] as const;

export function useCatalogGroupB(): SpecimenDefinition[] {
  // Data Viz & Feedback states
  const [swatchHex, setSwatchHex] = useState('#e0366b');
  const [pickerHex, setPickerHex] = useState('#e0366b');

  // Form Controls states
  const [calDate, setCalDate] = useState<ISODateString | null>(
    '2026-11-24' as ISODateString,
  );
  const [chkSingle, setChkSingle] = useState(true);
  const [chkList, setChkList] = useState<string[]>(['wcag', 'tokens']);
  const [complexRole, setComplexRole] = useState('Designer + Engineer');
  const [dateVal, setDateVal] = useState<ISODateString | undefined>(
    '2026-11-24' as ISODateString,
  );
  const [dateRange, setDateRange] = useState<DateRange | null>({
    start: '2026-11-20' as ISODateString,
    end: '2026-11-26' as ISODateString,
  });
  const [dateTimeVal, setDateTimeVal] = useState<ISODateTimeString | undefined>(
    '2026-11-24T14:30' as ISODateTimeString,
  );
  const [uploadedFile, setUploadedFile] = useState<File | File[] | null>(null);
  const [slugText, setSlugText] = useState('mehan-studio');
  const [multiVals, setMultiVals] = useState<string[]>(['react', 'tailwind']);
  const [numSeats, setNumSeats] = useState<number | null>(12);
  const [psFilters, setPsFilters] = useState<ReadonlyArray<PowerSearchFilter>>([]);
  const [precisionVal, setPrecisionVal] = useState(72);
  const [radioVal, setRadioVal] = useState('standard');
  const [selRegion, setSelRegion] = useState<string>('ap-southeast-1');
  const [sliderVal, setSliderVal] = useState(64);
  const [switchVal, setSwitchVal] = useState(true);
  const [notesVal, setNotesVal] = useState(
    'Perceptual OKLCH tactile surfaces with zero forked ARIA primitives.',
  );
  const [projectInput, setProjectInput] = useState('Confectionery Portal');
  const [timeVal, setTimeVal] = useState<ISOTimeString | undefined>(
    '09:30' as ISOTimeString,
  );
  const [tokItems, setTokItems] = useState<SearchableItem[]>([
    STATIC_FRAMEWORKS[0],
    STATIC_FRAMEWORKS[2],
  ]);
  const [taItem, setTaItem] = useState<SearchableItem | null>(STATIC_FRAMEWORKS[1]);

  const frameworkSource = useMemo(
    () => createStaticSource(STATIC_FRAMEWORKS),
    [],
  );
  const psConfig = useMemo(
    () => createPowerSearchConfig(POWER_SEARCH_DEFS, 'catalog-ps').config,
    [],
  );

  return [
    // ==================== CATEGORY 5: DATA VISUALIZATION ====================
    {
      id: 'metric-card',
      name: 'MetricCard',
      category: 'Data Visualization',
      pkg: 'mehan',
      summaryEn: 'KPI readout card with tabular figures, trend badge, and comparison hint.',
      summaryId: 'Kartu metrik KPI dengan angka tabular sejajar dan lencana arah tren.',
      code: `<MetricCard label="Conversion rate" value="4.82%" delta="+0.64%" trend="up" hint="30-day rolling window" />`,
      render: () => (
        <MetricCard
          label="Conversion rate"
          value="4.82%"
          delta={{value: '+0.64%', direction: 'up'}}
          caption="30-day rolling window"
        />
      ),
    },
    {
      id: 'data-categorical-palette',
      name: 'Data Categorical Tokens',
      category: 'Data Visualization',
      pkg: 'core',
      summaryEn: 'Harmonized `--color-data-categorical-*` tokens tuned in OKLCH for charts.',
      summaryId: 'Rangkaian token warna grafik `--color-data-categorical-*` yang harmonis.',
      code: `<div style={{backgroundColor: 'var(--color-data-categorical-blue)'}} />`,
      render: () => (
        <VStack gap={1.5}>
          {DATA_VIZ_SERIES.map(s => (
            <HStack key={s.label} gap={2} vAlign="center">
              <span style={{width: 52, fontSize: 11.5}}>{s.label}</span>
              <div
                style={{
                  flex: 1,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: 'var(--mehan-well)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${s.pct}%`,
                    height: '100%',
                    borderRadius: 999,
                    backgroundColor: s.token,
                  }}
                />
              </div>
              <span style={{fontSize: 11, fontFamily: 'var(--font-family-code)'}}>
                {s.pct}%
              </span>
            </HStack>
          ))}
        </VStack>
      ),
    },

    // ==================== CATEGORY 6: FEEDBACK & STATUS ====================
    {
      id: 'badge',
      name: 'Badge',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Semantic status and categorical pills with WCAG-verified tint fills.',
      summaryId: 'Lencana status semantik dan warna kategori dengan kontras terjaga.',
      code: `<HStack gap={1.5}>\n  <Badge variant="success" label="Healthy" />\n  <Badge variant="warning" label="Degraded" />\n  <Badge variant="error" label="Failed" />\n</HStack>`,
      render: () => (
        <HStack gap={1.5} wrap="wrap">
          <Badge variant="success" label="Healthy" />
          <Badge variant="info" label="Syncing" />
          <Badge variant="warning" label="Review" />
          <Badge variant="error" label="Blocked" />
          <Badge variant="pink" label="Confectionery" />
        </HStack>
      ),
    },
    {
      id: 'banner',
      name: 'Banner',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Inline callout surface for info, success, warning, and error notices.',
      summaryId: 'Kotak pemberitahuan sebaris untuk info, peringatan, dan keberhasilan.',
      code: `<Banner status="info" title="Zero-fork architecture" description="Safe to upgrade." />`,
      render: () => (
        <Banner
          status="success"
          title="All 6 quality gates passed"
          description="0 integration errors · 0 WCAG AA contrast violations."
        />
      ),
    },
    {
      id: 'info-tip',
      name: 'InfoTip',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Focusable `"i"` button revealing concise contextual help on hover or tap.',
      summaryId: 'Tombol info kecil untuk menampilkan penjelasan singkat saat diklik/diarahkan.',
      code: `<InfoTip label="About OKLCH" content="Perceptually uniform lightness across hues." />`,
      render: () => (
        <HStack gap={1.5} vAlign="center">
          <Text type="supporting" weight="semibold">
            Perceptual Contrast Gate
          </Text>
          <InfoTip
            label="About perceptual contrast"
            content="Binary-searches OKLCH lightness so every brand seed passes WCAG 2.1 AA."
          />
        </HStack>
      ),
    },
    {
      id: 'progress-bar',
      name: 'ProgressBar',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Recessed socket progress track with determinate or indeterminate fill.',
      summaryId: 'Bilah progres cekung dengan warna aksen penuh.',
      code: `<ProgressBar label="Bundle verification" value={76} />`,
      render: () => <ProgressBar label="Theme compilation progress" value={76} />,
    },
    {
      id: 'skeleton',
      name: 'Skeleton',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Staggered shimmer placeholders matching content geometry before load.',
      summaryId: 'Kerangka pemuatan beranimasi lembut sesuai bentuk konten asli.',
      code: `<Skeleton width="100%" height={16} index={0} />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Skeleton width={36} height={36} radius="rounded" index={0} />
          <VStack gap={1.5} width="100%">
            <Skeleton width="75%" height={12} index={1} />
            <Skeleton width="50%" height={10} index={2} />
          </VStack>
        </HStack>
      ),
    },
    {
      id: 'spinner',
      name: 'Spinner',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Accessible loading rotor in `sm`, `md`, `lg`, and `xl` diameters.',
      summaryId: 'Indikator putar pemuatan aksesibel dalam empat ukuran.',
      code: `<Spinner size="md" label="Verifying…" />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Spinner size="sm" aria-label="Small loader" />
          <Spinner size="md" label="Syncing…" />
        </HStack>
      ),
    },
    {
      id: 'status-dot',
      name: 'StatusDot',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: '8px live presence indicator with optional reduced-motion-safe pulse.',
      summaryId: 'Titik indikator status 8px dengan opsi denyut aktivitas.',
      code: `<StatusDot variant="success" label="Online" isPulsing />`,
      render: () => (
        <HStack gap={3} vAlign="center" wrap="wrap">
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="success" label="Online" isPulsing />
            <Text type="supporting">Live</Text>
          </HStack>
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="warning" label="Standby" />
            <Text type="supporting">Standby</Text>
          </HStack>
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="error" label="Offline" />
            <Text type="supporting">Offline</Text>
          </HStack>
        </HStack>
      ),
    },

    // ==================== CATEGORY 7: FORM CONTROLS ====================
    {
      id: 'calendar',
      name: 'Calendar',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Full keyboard-navigable month grid supporting single or date-range selection.',
      summaryId: 'Kalender interaktif dengan navigasi tombol panah penuh.',
      code: `<Calendar value={date} onChange={setDate} />`,
      render: () => (
        <Calendar
          value={calDate}
          onChange={setCalDate}
          hasVariableRowCount
        />
      ),
    },
    {
      id: 'checkbox-input',
      name: 'CheckboxInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Single boolean checkbox with crisp indicator and optional helper text.',
      summaryId: 'Kotak centang tunggal dengan deskripsi bantu opsional.',
      code: `<CheckboxInput label="Lock WCAG AA contrast" value={checked} onChange={setChecked} />`,
      render: () => (
        <CheckboxInput
          label="Enforce strict WCAG AA contrast"
          description="Automatically clamps text lightness on light & dark surfaces."
          value={chkSingle}
          onChange={setChkSingle}
        />
      ),
    },
    {
      id: 'checkbox-list',
      name: 'CheckboxList',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Grouped multi-checkbox field managing an array of selected string values.',
      summaryId: 'Kelompok kotak centang terstruktur untuk memilih beberapa opsi sekaligus.',
      code: `<CheckboxList label="Export targets" value={targets} onChange={setTargets}>...</CheckboxList>`,
      render: () => (
        <CheckboxList
          label="Export targets"
          density="compact"
          value={chkList}
          onChange={setChkList}
        >
          <CheckboxListItem value="wcag" label="TypeScript Theme (.ts)" />
          <CheckboxListItem value="tokens" label="W3C Figma Tokens (.json)" />
          <CheckboxListItem value="portable" label="Portable CSS (.css)" />
        </CheckboxList>
      ),
    },
    {
      id: 'color-picker',
      name: 'ColorPicker',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: '2D HSV saturation/value canvas, hue rail, hex field, and curated swatches.',
      summaryId: 'Pemilih warna kanvas HSV 2D khas Mehan lengkap dengan input Hex.',
      code: `<ColorPicker label="Brand seed" value={hex} onChange={setHex} />`,
      render: () => (
        <ColorPicker
          label="Brand seed hex"
          value={pickerHex}
          onChange={setPickerHex}
          presets={Object.values(MEHAN_ACCENT_PRESETS).map(p => p.seed)}
        />
      ),
    },
    {
      id: 'color-swatch',
      name: 'ColorSwatch',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: 'Tactile color token button with selection halo and WCAG checkmark.',
      summaryId: 'Tombol sampel warna taktil dengan cincin fokus & tanda centang kontras.',
      code: `<ColorSwatch color="#e0366b" label="Strawberry" isSelected onSelect={() => {}} />`,
      render: () => (
        <HStack gap={1.5} wrap="wrap">
          {Object.values(MEHAN_ACCENT_PRESETS).map(p => (
            <ColorSwatch
              key={p.id}
              color={p.seed}
              label={p.name}
              isSelected={swatchHex === p.seed}
              onSelect={() => setSwatchHex(p.seed)}
            />
          ))}
        </HStack>
      ),
    },
    {
      id: 'complex-selector',
      name: 'ComplexSelector',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Combobox trigger opening a custom rich popover picker surface.',
      summaryId: 'Pemilih fleksibel untuk menampilkan antarmuka kustom di dalam popover.',
      code: `<ComplexSelector label="Role" value={role} triggerLabel={role}>{(val, onChange, close) => ...}</ComplexSelector>`,
      render: () => (
        <ComplexSelector
          label="Workspace persona"
          size="sm"
          value={complexRole}
          triggerLabel={complexRole}
          onChange={setComplexRole}
        >
          {(_val, onChange, close) => (
            <div style={{padding: 10, width: 220}}>
              <VStack gap={1.5}>
                {['Designer + Engineer', 'Product Manager', 'AI Prototyper'].map(
                  r => (
                    <CheckboxInput
                      key={r}
                      label={r}
                      value={complexRole === r}
                      onChange={() => {
                        onChange(r);
                        close();
                      }}
                    />
                  ),
                )}
              </VStack>
            </div>
          )}
        </ComplexSelector>
      ),
    },
    {
      id: 'date-input',
      name: 'DateInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Recessed date field with typed entry and calendar popover.',
      summaryId: 'Kolom tanggal cekung dengan dukungan ketik langsung & kalender.',
      code: `<DateInput label="Release date" value={date} onChange={setDate} />`,
      render: () => (
        <DateInput
          label="Release date"
          size="sm"
          value={dateVal}
          onChange={setDateVal}
        />
      ),
    },
    {
      id: 'date-range-input',
      name: 'DateRangeInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Start-to-end date window picker with dual-month popover support.',
      summaryId: 'Pemilih rentang tanggal awal hingga akhir.',
      code: `<DateRangeInput label="Sprint window" value={range} onChange={setRange} />`,
      render: () => (
        <DateRangeInput
          label="Sprint window"
          size="sm"
          value={dateRange}
          onChange={setDateRange}
        />
      ),
    },
    {
      id: 'date-time-input',
      name: 'DateTimeInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Paired date + clock time segments in a unified Field wrapper.',
      summaryId: 'Input gabungan tanggal dan jam dalam satu grup kolom.',
      code: `<DateTimeInput label="Deploy schedule" value={dt} onChange={setDt} />`,
      render: () => (
        <DateTimeInput
          label="Deploy schedule"
          size="sm"
          value={dateTimeVal}
          onChange={setDateTimeVal}
        />
      ),
    },
    {
      id: 'field',
      name: 'Field',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Low-level accessible label, description, and validation wrapper for custom inputs.',
      summaryId: 'Pembungkus label, deskripsi, dan pesan validasi untuk kontrol kustom.',
      code: `<Field label="Custom slug" inputID="slug-id" description="Lowercase letters">\n  <input id="slug-id" />\n</Field>`,
      render: () => (
        <Field
          label="Custom native control"
          inputID="catalog-custom-native-input"
          description="Wrapped in Astryx Field semantics"
        >
          <input
            id="catalog-custom-native-input"
            defaultValue="mehan-v1"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '6px 10px',
              borderRadius: 8,
              border: '0',
              background: 'var(--mehan-well)',
              boxShadow: 'var(--mehan-shadow-well)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-family-code)',
              fontSize: 12.5,
            }}
          />
        </Field>
      ),
    },
    {
      id: 'file-input',
      name: 'FileInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Accessible file & dropzone uploader with size/type validation.',
      summaryId: 'Pengunggah file aksesibel dengan dukungan seret & lepas (dropzone).',
      code: `<FileInput label="Import theme JSON" accept=".json,.ts" value={file} onChange={setFile} />`,
      render: () => (
        <FileInput
          label="Theme JSON or TS"
          accept=".json,.ts"
          value={uploadedFile}
          onChange={setUploadedFile}
        />
      ),
    },
    {
      id: 'input-group',
      name: 'InputGroup',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Joined prefix/suffix addons (`InputGroupText`, `Selector`, `Button`) around an input.',
      summaryId: 'Penggabung awalan/akhiran teks atau tombol yang menyatu dengan kolom input.',
      code: `<InputGroup label="Workspace URL">\n  <InputGroupText>https://</InputGroupText>\n  <TextInput label="Slug" isLabelHidden value={slug} onChange={setSlug} />\n</InputGroup>`,
      render: () => (
        <InputGroup label="Workspace URL" size="sm">
          <InputGroupText>mehan.design/</InputGroupText>
          <TextInput
            label="Workspace slug"
            isLabelHidden
            value={slugText}
            onChange={setSlugText}
          />
        </InputGroup>
      ),
    },
    {
      id: 'multi-selector',
      name: 'MultiSelector',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Searchable multi-select dropdown with token chips and select-all support.',
      summaryId: 'Pemilih banyak nilai sekaligus dengan pencarian dan chip.',
      code: `<MultiSelector label="Stacks" options={options} value={selected} onChange={setSelected} />`,
      render: () => (
        <MultiSelector
          label="Target stacks"
          size="sm"
          options={[
            {value: 'react', label: 'React 19'},
            {value: 'tailwind', label: 'Tailwind v4'},
            {value: 'portable', label: 'Portable HTML'},
            {value: 'figma', label: 'Figma W3C'},
          ]}
          value={multiVals}
          onChange={setMultiVals}
        />
      ),
    },
    {
      id: 'number-input',
      name: 'NumberInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Numeric stepper input with min/max clamping and arrow-key increments.',
      summaryId: 'Input angka presisi dengan tombol tambah/kurang terpadu.',
      code: `<NumberInput label="Team seats" value={seats} onChange={setSeats} min={1} max={100} />`,
      render: () => (
        <NumberInput
          label="Team seats"
          size="sm"
          min={1}
          max={250}
          value={numSeats}
          onChange={setNumSeats}
        />
      ),
    },
    {
      id: 'power-search',
      name: 'PowerSearch',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Structured query bar turning field + operator + value into editable tokens.',
      summaryId: 'Bilah pencarian terstruktur berbasis filter atribut & operator.',
      code: `<PowerSearch config={config} filters={filters} onChange={setFilters} />`,
      render: () => (
        <PowerSearch
          label="Filter deployments"
          size="sm"
          placeholder="Filter by status or service…"
          config={psConfig}
          filters={psFilters}
          onChange={next => setPsFilters(next)}
        />
      ),
    },
    {
      id: 'precision-slider',
      name: 'PrecisionSlider',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: 'Scrubbable CAD/studio slider with tabular readout and double-click reset.',
      summaryId: 'Slider presisi khas studio kreatif dengan klik 2x untuk reset ke nilai awal.',
      code: `<PrecisionSlider label="Spring tension" value={val} min={0} max={100} defaultValue={72} unit="%" onChange={setVal} />`,
      render: () => (
        <PrecisionSlider
          label="Spring tension"
          value={precisionVal}
          min={0}
          max={100}
          stops={[50, 72, 100]}
          unit="%"
          onChange={setPrecisionVal}
        />
      ),
    },
    {
      id: 'radio-list',
      name: 'RadioList',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Single-choice radio group with rich item descriptions and trailing metadata.',
      summaryId: 'Daftar pilihan tunggal (radio) lengkap dengan deskripsi tiap opsi.',
      code: `<RadioList label="Density" value={val} onChange={setVal}>\n  <RadioListItem value="compact" label="Compact (32px)" />\n</RadioList>`,
      render: () => (
        <RadioList
          label="Desktop density"
          value={radioVal}
          onChange={setRadioVal}
        >
          <RadioListItem value="compact" label="Compact (32px Shotcandy)" />
          <RadioListItem value="standard" label="Standard (36px Balanced)" />
        </RadioList>
      ),
    },
    {
      id: 'selector',
      name: 'Selector',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Accessible combobox select supporting recessed `input` or raised `secondary` trigger.',
      summaryId: 'Kotak pilih nilai form (Select) dengan navigasi pencarian cepat.',
      code: `<Selector label="Region" options={['ap-southeast-1', 'us-east-1']} value={region} onChange={setRegion} />`,
      render: () => (
        <Selector
          label="Primary edge region"
          size="sm"
          options={[
            {value: 'ap-southeast-1', label: 'Singapore (ap-southeast-1)'},
            {value: 'ap-northeast-1', label: 'Tokyo (ap-northeast-1)'},
            {value: 'eu-central-1', label: 'Frankfurt (eu-central-1)'},
          ]}
          value={selRegion}
          onChange={setSelRegion}
        />
      ),
    },
    {
      id: 'slider',
      name: 'Slider',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Core WAI-ARIA range slider with spherical 3D dome thumb and recessed socket.',
      summaryId: 'Slider rentang inti dengan kenop kubah 3D dan jalur cekung.',
      code: `<Slider label="Output gain" value={gain} onChange={setGain} />`,
      render: () => (
        <Slider
          label="Ambient shadow opacity"
          value={sliderVal}
          onChange={setSliderVal}
          valueDisplay="text"
        />
      ),
    },
    {
      id: 'switch',
      name: 'Switch',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Immediate toggle switch with recessed socket and tactile dome thumb.',
      summaryId: 'Sakelar aktif/nonaktif seketika dengan soket cekung halus.',
      code: `<Switch label="Auto-adapt touch targets (44px)" value={on} onChange={setOn} />`,
      render: () => (
        <Switch
          label="Auto-expand touch targets (44px)"
          value={switchVal}
          onChange={setSwitchVal}
        />
      ),
    },
    {
      id: 'text-area',
      name: 'TextArea',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Multi-line recessed text field with character counter and auto-grow option.',
      summaryId: 'Kolom teks banyak baris dengan penghitung karakter opsional.',
      code: `<TextArea label="Release summary" value={notes} onChange={setNotes} rows={2} />`,
      render: () => (
        <TextArea
          label="Release summary"
          rows={2}
          value={notesVal}
          onChange={setNotesVal}
        />
      ),
    },
    {
      id: 'text-input',
      name: 'TextInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Borderless recessed well input (or crisp 1px bordered mode) with clear button.',
      summaryId: 'Kolom input teks utama dengan gaya cekung atau berbingkai 1px.',
      code: `<TextInput label="Project name" value={name} onChange={setName} hasClear />`,
      render: () => (
        <TextInput
          label="Project name"
          size="sm"
          hasClear
          value={projectInput}
          onChange={setProjectInput}
        />
      ),
    },
    {
      id: 'time-input',
      name: 'TimeInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Keyboard-steppable clock time field (`12h` or `24h`) with preset dropdown.',
      summaryId: 'Input jam presisi dengan dukungan format 12 jam atau 24 jam.',
      code: `<TimeInput label="Maintenance window" value={time} onChange={setTime} />`,
      render: () => (
        <TimeInput
          label="Maintenance window"
          size="sm"
          value={timeVal}
          onChange={setTimeVal}
        />
      ),
    },
    {
      id: 'tokenizer',
      name: 'Tokenizer',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Multi-entity typeahead turning selected suggestions into inline `Token` chips.',
      summaryId: 'Kolom ketik multi-entitas yang mengubah pilihan menjadi chip Token.',
      code: `<Tokenizer label="Frameworks" searchSource={source} value={items} onChange={setItems} />`,
      render: () => (
        <Tokenizer
          label="Supported runtimes"
          size="sm"
          hasEntriesOnFocus
          searchSource={frameworkSource}
          value={tokItems}
          onChange={next => setTokItems(next)}
        />
      ),
    },
    {
      id: 'typeahead',
      name: 'Typeahead',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Single-entity async/static search combobox.',
      summaryId: 'Kotak pencarian saran cepat untuk memilih satu entitas.',
      code: `<Typeahead label="Framework" searchSource={source} value={item} onChange={setItem} />`,
      render: () => (
        <Typeahead
          label="Primary framework"
          size="sm"
          hasEntriesOnFocus
          searchSource={frameworkSource}
          value={taItem}
          onChange={setTaItem}
        />
      ),
    },
  ];
}
