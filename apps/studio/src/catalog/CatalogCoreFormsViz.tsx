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
  Grid,
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

export function useCatalogCoreFormsViz(): SpecimenDefinition[] {
  const [swatchHex, setSwatchHex] = useState('#2563eb');
  const [pickerHex, setPickerHex] = useState('#2563eb');

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
  const [sliderRange, setSliderRange] = useState<[number, number]>([20, 80]);
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
      span: 'wide',
      summaryEn: 'KPI readout card with aligned tabular numerals, trend delta pill, and context caption.',
      summaryId: 'Kartu metrik KPI dengan angka tabular sejajar, lencana arah tren, dan konteks waktu.',
      code: `<MetricCard label="Conversion rate" value="4.82%" delta={{value: '+0.64%', direction: 'up'}} caption="30-day rolling window" />`,
      render: () => (
        <Grid columns={{minWidth: 220, max: 2, repeat: 'fit'}} gap={3}>
          <MetricCard
            label="Conversion rate"
            value="4.82%"
            delta={{value: '+0.64%', direction: 'up'}}
            caption="30-day rolling window"
          />
          <MetricCard
            label="P95 edge latency"
            value="18.4 ms"
            delta={{value: '-3.1 ms', direction: 'down'}}
            caption="Global PoP median"
          />
        </Grid>
      ),
    },
    {
      id: 'data-categorical-palette',
      name: 'Data Categorical Tokens',
      category: 'Data Visualization',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Perceptually balanced `--color-data-categorical-*` OKLCH tokens (>= 3:1 chart stroke contrast).',
      summaryId: 'Token warna grafik `--color-data-categorical-*` berbasis OKLCH dengan kontras >= 3:1.',
      code: `<div style={{backgroundColor: 'var(--color-data-categorical-blue)'}} />`,
      render: () => (
        <VStack gap={2}>
          {DATA_VIZ_SERIES.map(s => (
            <HStack key={s.label} gap={3} vAlign="center">
              <span style={{width: 56, fontSize: 12, fontWeight: 500}}>{s.label}</span>
              <div
                style={{
                  flex: 1,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: 'var(--mehan-well)',
                  boxShadow: 'var(--mehan-shadow-well)',
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
              <span
                style={{
                  width: 36,
                  textAlign: 'right',
                  fontSize: 11.5,
                  fontFamily: 'var(--font-family-code)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.pct}%
              </span>
            </HStack>
          ))}
        </VStack>
      ),
    },

    // ==================== CATEGORY 6: FEEDBACK & STATUS ====================
    {
      id: 'banner',
      name: 'Banner',
      category: 'Feedback & Status',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Inline status callout surface for informational, success, warning, and error notices.',
      summaryId: 'Kotak pemberitahuan kontekstual sebaris untuk info, peringatan, dan keberhasilan.',
      code: `<Banner status="success" title="All 6 quality gates passed" description="0 integration errors · 0 WCAG AA contrast violations." />`,
      render: () => (
        <Banner
          status="success"
          title="All 6 quality gates passed"
          description="0 integration errors · 0 WCAG AA contrast violations across Light & Dark modes."
        />
      ),
    },
    {
      id: 'badge',
      name: 'Badge',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Semantic status and categorical pills with WCAG AA-verified foreground contrast.',
      summaryId: 'Lencana status semantik dan kategori warna dengan kontras teks WCAG AA.',
      code: `<HStack gap={1.5}><Badge variant="success" label="Healthy" /><Badge variant="warning" label="Review" /></HStack>`,
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
      id: 'status-dot',
      name: 'StatusDot',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: '8px presence indicator with optional reduced-motion-safe pulse.',
      summaryId: 'Titik status kehadiran 8px dengan animasi denyut ramah aksesibilitas.',
      code: `<StatusDot variant="success" label="Online" isPulsing />`,
      render: () => (
        <HStack gap={4} vAlign="center" wrap="wrap">
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="success" label="Online" isPulsing />
            <Text type="supporting">Operational</Text>
          </HStack>
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="warning" label="Standby" />
            <Text type="supporting">Degraded</Text>
          </HStack>
          <HStack gap={1.5} vAlign="center">
            <StatusDot variant="error" label="Offline" />
            <Text type="supporting">Outage</Text>
          </HStack>
        </HStack>
      ),
    },
    {
      id: 'progress-bar',
      name: 'ProgressBar',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Recessed socket progress track with determinate percentage or indeterminate fill.',
      summaryId: 'Jalur progres cekung dengan warna aksen penuh dan pembacaan persentase.',
      code: `<ProgressBar label="Theme compilation progress" value={76} />`,
      render: () => <ProgressBar label="Theme compilation progress" value={76} />,
    },
    {
      id: 'skeleton',
      name: 'Skeleton',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Geometry-matched shimmer placeholder preserving layout stability while loading.',
      summaryId: 'Kerangka pemuatan beranimasi lembut yang menjaga tata letak tidak melompat.',
      code: `<Skeleton width="100%" height={14} index={0} />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Skeleton width={38} height={38} radius="rounded" index={0} />
          <VStack gap={1.5} width="100%">
            <Skeleton width="72%" height={12} index={1} />
            <Skeleton width="48%" height={10} index={2} />
          </VStack>
        </HStack>
      ),
    },
    {
      id: 'spinner',
      name: 'Spinner',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Accessible activity rotor for short (< 2s) in-place async operations.',
      summaryId: 'Indikator putar aksesibel untuk proses pemuatan singkat di bawah 2 detik.',
      code: `<Spinner size="md" label="Verifying…" />`,
      render: () => (
        <HStack gap={4} vAlign="center">
          <Spinner size="sm" aria-label="Small loader" />
          <Spinner size="md" label="Verifying tokens…" />
        </HStack>
      ),
    },
    {
      id: 'info-tip',
      name: 'InfoTip',
      category: 'Feedback & Status',
      pkg: 'core',
      summaryEn: 'Focusable info trigger revealing concise contextual guidance on click or hover.',
      summaryId: 'Tombol info fokus-aman untuk menampilkan penjelasan istilah teknis secara ringkas.',
      code: `<InfoTip label="About OKLCH" content="Perceptually uniform lightness across hues." />`,
      render: () => (
        <HStack gap={1.5} vAlign="center">
          <Text type="supporting" weight="semibold">
            Perceptual contrast solver
          </Text>
          <InfoTip
            label="About perceptual contrast"
            content="Binary-searches OKLCH lightness so every custom hex seed meets WCAG 2.1 AA."
          />
        </HStack>
      ),
    },

    // ==================== CATEGORY 7: FORM CONTROLS ====================
    {
      id: 'text-input',
      name: 'TextInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Recessed well (or 1px bordered) text field with visible label and clear button.',
      summaryId: 'Kolom teks utama bergaya sumur cekung atau bingkai 1px dengan tombol bersihkan.',
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
      id: 'selector',
      name: 'Selector',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Accessible listbox field (`Select`) retaining a chosen value inside forms.',
      summaryId: 'Kotak pilih nilai form (`Select`) dengan dukungan navigasi papan ketik penuh.',
      code: `<Selector label="Primary edge region" placement="below" options={options} value={region} onChange={setRegion} />`,
      render: () => (
        <Selector
          label="Primary edge region"
          size="sm"
          placement="below"
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
      id: 'precision-slider',
      name: 'PrecisionSlider',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: 'Studio slider with Shift 0.25× fine-scrubbing, magnetic stops, and click-to-type readout.',
      summaryId: 'Slider presisi khas studio dengan Shift 0.25×, titik magnetis, dan klik angka untuk ketik.',
      code: `<PrecisionSlider label="Spring tension" value={val} min={0} max={100} stops={[50, 72, 100]} unit="%" onChange={setVal} />`,
      render: () => (
        <PrecisionSlider
          label="Tension"
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
      id: 'color-swatch',
      name: 'ColorSwatch',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: 'Boiled-sweet 3D color token button with specular glint and dual-ring selection halo.',
      summaryId: 'Tombol sampel warna 3D berkilau halus dengan cincin seleksi kontras tinggi.',
      code: `<ColorSwatch color="#e0366b" label="Strawberry" isSelected onSelect={() => {}} />`,
      render: () => (
        <HStack gap={2} wrap="wrap">
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
      id: 'number-input',
      name: 'NumberInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Numeric quantity field with min/max clamping and stepper buttons.',
      summaryId: 'Input kuantitas angka presisi dengan batas minimum/maksimum dan tombol tambah-kurang.',
      code: `<NumberInput label="Team seats" value={seats} onChange={setSeats} min={1} max={250} />`,
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
      id: 'input-group',
      name: 'InputGroup',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Joined prefix/suffix addons (`InputGroupText`, `Selector`, `Button`) around an input.',
      summaryId: 'Penggabung awalan atau akhiran teks/tombol yang menyatu rapi dengan kolom input.',
      code: `<InputGroup label="Workspace URL"><InputGroupText>mehan.design/</InputGroupText><TextInput ... /></InputGroup>`,
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
      summaryEn: 'Searchable multi-select dropdown rendering selected items as compact chips.',
      summaryId: 'Pemilih banyak nilai sekaligus dengan pencarian cepat dan tampilan chip.',
      code: `<MultiSelector label="Target stacks" options={options} value={selected} onChange={setSelected} />`,
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
      id: 'typeahead',
      name: 'Typeahead',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Async-ready single-entity search combobox powered by `SearchSource`.',
      summaryId: 'Kotak pencarian pilihan tunggal berbasis daftar sumber data terindeks.',
      code: `<Typeahead label="Primary framework" searchSource={source} value={item} onChange={setItem} />`,
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
    {
      id: 'switch',
      name: 'Switch',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Immediate boolean toggle with recessed socket track and 3D spherical thumb.',
      summaryId: 'Sakelar aktif/nonaktif seketika dengan soket cekung dan kenop bulat 3D.',
      code: `<Switch label="Auto-expand coarse touch targets (44px)" value={on} onChange={setOn} />`,
      render: () => (
        <Switch
          label="Auto-expand touch targets (44px)"
          value={switchVal}
          onChange={setSwitchVal}
        />
      ),
    },
    {
      id: 'slider',
      name: 'Slider',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn:
        'Core WAI-ARIA slider supporting both single-value and dual-thumb [min, max] range selection.',
      summaryId:
        'Slider standar WAI-ARIA yang mendukung nilai tunggal maupun rentang dua-kenop [min, max].',
      code: `<Slider label="Opacity" value={val} onChange={setVal} />\n<Slider label="Price band" value={[20, 80]} onChange={setRange} />`,
      render: () => (
        <VStack gap={2}>
          <Slider
            label="Ambient shadow opacity"
            value={sliderVal}
            onChange={setSliderVal}
            valueDisplay="text"
          />
          <Slider
            label="Target latency band (ms)"
            value={sliderRange}
            onChange={setSliderRange}
            valueDisplay="text"
          />
        </VStack>
      ),
    },
    {
      id: 'checkbox-input',
      name: 'CheckboxInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Single boolean checkbox with tactile indicator and supporting description.',
      summaryId: 'Kotak centang tunggal dengan indikator taktil dan teks penjelasan bantu.',
      code: `<CheckboxInput label="Enforce strict WCAG AA contrast" value={checked} onChange={setChecked} />`,
      render: () => (
        <CheckboxInput
          label="Enforce strict WCAG AA contrast"
          description="Clamps perceptual lightness across Light and Dark surfaces."
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
      summaryEn: 'Grouped fieldset of related checkboxes managing an array of selected keys.',
      summaryId: 'Kelompok kotak centang terstruktur untuk memilih beberapa target sekaligus.',
      code: `<CheckboxList label="Export targets" value={targets} onChange={setTargets}>...</CheckboxList>`,
      render: () => (
        <CheckboxList
          label="Export targets"
          density="compact"
          value={chkList}
          onChange={setChkList}
        >
          <CheckboxListItem value="wcag" label="TypeScript theme (.ts)" />
          <CheckboxListItem value="tokens" label="W3C Figma tokens (.json)" />
          <CheckboxListItem value="portable" label="Portable stylesheet (.css)" />
        </CheckboxList>
      ),
    },
    {
      id: 'radio-list',
      name: 'RadioList',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Mutually exclusive radio group supporting rich item descriptions.',
      summaryId: 'Kelompok pilihan tunggal (radio) dengan dukungan deskripsi tiap opsi.',
      code: `<RadioList label="Desktop density" value={val} onChange={setVal}>...</RadioList>`,
      render: () => (
        <RadioList
          label="Desktop density"
          value={radioVal}
          onChange={setRadioVal}
        >
          <RadioListItem value="compact" label="Compact (32px Shotcandy)" />
          <RadioListItem value="standard" label="Standard (36px Default)" />
        </RadioList>
      ),
    },
    {
      id: 'text-area',
      name: 'TextArea',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Multi-line recessed text input with optional character count and auto-resize.',
      summaryId: 'Kolom teks multi-baris cekung untuk catatan atau ringkasan rilis.',
      code: `<TextArea label="Release summary" rows={2} value={notes} onChange={setNotes} />`,
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
      id: 'date-input',
      name: 'DateInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Segmented keyboard date field paired with an anchored calendar popover.',
      summaryId: 'Input tanggal terstruktur dengan dukungan ketik langsung dan popup kalender.',
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
      id: 'time-input',
      name: 'TimeInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Steppable clock time field supporting 12-hour and 24-hour locales.',
      summaryId: 'Input waktu jam presisi dengan navigasi panah atas/bawah.',
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
      id: 'date-range-input',
      name: 'DateRangeInput',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Start-to-end date window selector with dual-calendar range highlighting.',
      summaryId: 'Pemilih rentang tanggal awal hingga akhir dengan sorotan kalender.',
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
      id: 'complex-selector',
      name: 'ComplexSelector',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Combobox trigger opening a custom interactive picker layout inside a popover.',
      summaryId: 'Pemicu pemilih kustom untuk menampilkan tata letak kaya di dalam popover.',
      code: `<ComplexSelector label="Workspace persona" value={role} triggerLabel={role}>...</ComplexSelector>`,
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
      id: 'field',
      name: 'Field',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Accessible label, helper text, and validation message wrapper for custom controls.',
      summaryId: 'Pembungkus semantik label, petunjuk, dan validasi untuk elemen input kustom.',
      code: `<Field label="Custom slug" inputID="slug-id" description="Lowercase kebab-case"><input id="slug-id" /></Field>`,
      render: () => (
        <Field
          label="Custom native control"
          inputID="catalog-custom-native-input"
          description="Bound via aria-describedby & htmlFor"
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
      summaryEn: 'Accessible file picker and drag-and-drop zone with MIME/size validation.',
      summaryId: 'Pengunggah berkas dengan dukungan klik maupun seret-lepas (dropzone).',
      code: `<FileInput label="Theme JSON or TS" accept=".json,.ts" value={file} onChange={setFile} />`,
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
      id: 'date-time-input',
      name: 'DateTimeInput',
      category: 'Form Controls',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Coordinated date and clock segments inside a unified accessible Field.',
      summaryId: 'Gabungan segmen tanggal dan jam presisi dalam satu kesatuan Field.',
      code: `<DateTimeInput label="Scheduled deployment" value={dt} onChange={setDt} />`,
      render: () => (
        <div style={{maxWidth: 360}}>
          <DateTimeInput
            label="Scheduled deployment"
            size="sm"
            value={dateTimeVal}
            onChange={setDateTimeVal}
          />
        </div>
      ),
    },
    {
      id: 'tokenizer',
      name: 'Tokenizer',
      category: 'Form Controls',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Multi-entity typeahead converting chosen items into removable inline `Token` chips.',
      summaryId: 'Pencarian multi-entitas yang mengubah pilihan menjadi deretan chip `Token`.',
      code: `<Tokenizer label="Supported runtimes" searchSource={source} value={items} onChange={setItems} />`,
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
      id: 'power-search',
      name: 'PowerSearch',
      category: 'Form Controls',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Structured filter query bar composing `attribute + operator + value` tokens.',
      summaryId: 'Bilah kueri filter terstruktur berbasis atribut, operator, dan nilai.',
      code: `<PowerSearch label="Filter deployments" config={config} filters={filters} onChange={setFilters} />`,
      render: () => (
        <PowerSearch
          label="Filter deployments"
          size="sm"
          placeholder="Filter by status or service name…"
          config={psConfig}
          filters={psFilters}
          onChange={next => setPsFilters(next)}
        />
      ),
    },
    {
      id: 'calendar',
      name: 'Calendar',
      category: 'Form Controls',
      pkg: 'core',
      summaryEn: 'Arrow-key navigable month grid supporting single-date and range selection.',
      summaryId: 'Grid kalender bulanan aksesibel dengan navigasi tombol panah penuh.',
      code: `<Calendar value={date} onChange={setDate} />`,
      render: () => (
        <div style={{alignSelf: 'center'}}>
          <Calendar
            value={calDate}
            onChange={setCalDate}
            hasVariableRowCount
          />
        </div>
      ),
    },
    {
      id: 'color-picker',
      name: 'ColorPicker',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn: '2D HSV saturation/brightness canvas, hue rail, hex input, eyedropper, and swatches.',
      summaryId: 'Kanvas warna HSV 2D khas Mehan lengkap dengan rel hue, input Hex, dan sampel.',
      code: `<ColorPicker label="Brand seed" value={hex} onChange={setHex} />`,
      render: () => (
        <div style={{alignSelf: 'center'}}>
          <ColorPicker
            label="Brand seed hex"
            value={pickerHex}
            onChange={setPickerHex}
            presets={Object.values(MEHAN_ACCENT_PRESETS).map(p => p.seed)}
          />
        </div>
      ),
    },
  ];
}
