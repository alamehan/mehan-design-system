import React, {useMemo, useRef, useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  Collapsible,
  Divider,
  DropdownMenu,
  IconButton,
  NumberInput,
  Popover,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  Stack,
  Tab,
  TabList,
  TextInput,
  Tooltip,
  useToast,
} from '@astryxdesign/core';
import {ColorPicker, ColorSwatch, PrecisionSlider} from '@mehan/astryx';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERE_IDS,
  MEHAN_ATMOSPHERES,
  contrastRatio,
  exportW3cDesignTokens,
  isPresetAccent,
  type HistoryUpdateOptions,
  type MehanLipStyle,
  type MehanMotion,
  type MehanSegmentedStyle,
  type MehanWellStyle,
  type ResolvedMehanDna,
} from '@mehan/astryx/dna';
import {generateAiPrototypeKit, generatePortableCss} from '@mehan/portable';
import {
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  Download,
  Palette,
  Plus,
  Redo2,
  RotateCcw,
  Search,
  Trash2,
  Undo2,
  Upload,
  X,
} from 'lucide-react';
import {
  copyText,
  downloadTextFile,
  getBuiltInPresets,
  type NamedStudioPreset,
  type StudioLang,
} from '../studioState';
import {
  ADVANCED_TOKEN_GROUPS,
  ALL_COMPONENT_TARGETS,
  BODY_FONT_OPTIONS,
  CODE_FONT_OPTIONS,
  COLOR_CATEGORIES,
  COMPONENT_VARS,
  DEFAULT_SEED_CONFIG,
  HEADING_FONT_OPTIONS,
  RATIO_OPTIONS,
  TYPOGRAPHY_CATEGORIES,
  UNIFIED_PRESETS,
  exportCreateMehanThemeTs,
  exportPureAstryxDefineThemeTs,
  getConcentricityWarning,
  getTokenLabel,
  parseColorWithAlpha,
  parseImportedThemeText,
  parseLightDark,
  readSeededComponentValue,
  resolveComponentOptionLabel,
  spacingToPx,
  type AdvancedTokenGroupKey,
  type FullThemeEditorState,
  type StudioSeedConfig,
} from './themeEditorModel';
import {TokenColorRow} from './TokenColorRow';

const PRESET_ACCENT_LIST = Object.values(MEHAN_ACCENT_PRESETS);
const PRESET_HEX_SWATCHES = PRESET_ACCENT_LIST.map(p => p.seed);

const BASE_CORE_COLOR_TOKENS = [
  {token: '--color-accent', en: 'Accent (Primary)', id: 'Aksen utama (Primary)'},
  {token: '--color-neutral', en: 'Neutral', id: 'Netral'},
  {token: '--color-background-card', en: 'Card surface', id: 'Permukaan kartu'},
  {token: '--color-background-surface', en: 'Surface', id: 'Permukaan dasar'},
  {token: '--color-background-body', en: 'Page body', id: 'Kanvas halaman'},
  {token: '--color-background-muted', en: 'Muted tray', id: 'Baki redup'},
  {token: '--color-text-primary', en: 'Text primary', id: 'Teks utama'},
] as const;

const ADV_GROUP_LABELS_ID: Record<AdvancedTokenGroupKey, string> = {
  colors: 'Warna',
  typography: 'Tipografi',
  spacing: 'Spasi',
  radius: 'Sudut',
  size: 'Ukuran',
  shadow: 'Bayangan',
  duration: 'Durasi',
  easing: 'Kurva Gerak',
};

interface DockedThemeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  lang: StudioLang;
  mode: 'light' | 'dark';
  themeState: FullThemeEditorState;
  setThemeState: (
    next:
      | FullThemeEditorState
      | ((prev: FullThemeEditorState) => FullThemeEditorState),
    options?: HistoryUpdateOptions,
  ) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  effectiveTokens: Record<string, string>;
  baseComponents: Record<string, unknown>;
  dna: ResolvedMehanDna;
  presets: NamedStudioPreset[];
  setPresets: React.Dispatch<React.SetStateAction<NamedStudioPreset[]>>;
}

export function DockedThemeEditor({
  isOpen,
  onClose,
  lang,
  mode,
  themeState,
  setThemeState,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  effectiveTokens,
  baseComponents,
  dna,
  presets,
  setPresets,
}: DockedThemeEditorProps) {
  const isId = lang === 'id';
  const showToast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [editorTab, setEditorTab] = useState<string>('base');
  const [advGroup, setAdvGroup] = useState<AdvancedTokenGroupKey>('colors');
  const [tokenQuery, setTokenQuery] = useState('');
  const [compQuery, setCompQuery] = useState('');
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const [presetSaveOpen, setPresetSaveOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');

  // Custom Component CSS Override builder state
  const [customTarget, setCustomTarget] = useState<string>('button');
  const [customProp, setCustomProp] = useState<string>('letterSpacing');
  const [customVal, setCustomVal] = useState<string>('-0.01em');
  const [customVarSlots, setCustomVarSlots] = useState<Record<string, boolean>>({});

  const {seed, tokenOverrides, customOverrides} = themeState;

  const updateSeed = (
    patch: Partial<StudioSeedConfig>,
    clearTokens: string[] = [],
    clearPrefixes: string[] = [],
    historyOpts?: HistoryUpdateOptions,
  ) => {
    setThemeState(prev => {
      let nextTokens = prev.tokenOverrides;
      if (clearTokens.length > 0 || clearPrefixes.length > 0) {
        nextTokens = {...prev.tokenOverrides};
        for (const k of clearTokens) {
          delete nextTokens[k];
        }
        if (clearPrefixes.length > 0) {
          for (const key of Object.keys(nextTokens)) {
            if (clearPrefixes.some(prefix => key.startsWith(prefix))) {
              delete nextTokens[key];
            }
          }
        }
      }
      return {
        ...prev,
        seed: {...prev.seed, ...patch},
        tokenOverrides: nextTokens,
      };
    }, historyOpts);
  };

  const setTokenOverride = (
    tokenName: string,
    value: string,
    coalesce?: string,
  ) => {
    setThemeState(
      prev => ({
        ...prev,
        tokenOverrides: {...prev.tokenOverrides, [tokenName]: value},
      }),
      coalesce ? {coalesce} : undefined,
    );
  };

  const removeTokenOverride = (tokenName: string) => {
    setThemeState(prev => {
      const next = {...prev.tokenOverrides};
      delete next[tokenName];
      return {...prev, tokenOverrides: next};
    });
  };

  const totalOverrides =
    Object.keys(tokenOverrides).length + customOverrides.length;

  const contrastAudit = useMemo(() => {
    const resolveBranch = (val: string | undefined, fallback: string) => {
      if (!val) return fallback;
      const ld = parseLightDark(val);
      const branch = ld ? (mode === 'dark' ? ld.dark : ld.light) : val;
      return parseColorWithAlpha(branch)?.hex ?? fallback;
    };
    const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
    const textHex = resolveBranch(effectiveTokens['--color-text-primary'], S.ink);
    const bodyHex = resolveBranch(effectiveTokens['--color-background-body'], S.paper);
    const cardHex = resolveBranch(effectiveTokens['--color-background-card'], S.surface);
    const accentHex = resolveBranch(
      effectiveTokens['--color-accent'],
      mode === 'light' ? dna.accent.accentLight : dna.accent.accentDark,
    );
    const onAccentHex = resolveBranch(
      effectiveTokens['--color-on-accent'],
      mode === 'light' ? dna.accent.onAccentLight : dna.accent.onAccentDark,
    );

    const textOnBody = contrastRatio(textHex, bodyHex);
    const textOnCard = contrastRatio(textHex, cardHex);
    const ctaRatio = contrastRatio(onAccentHex, accentHex);
    const passesAll = textOnBody >= 4.5 && textOnCard >= 4.5 && ctaRatio >= 4.5;
    return {
      textOnBody: textOnBody.toFixed(1),
      textOnCard: textOnCard.toFixed(1),
      ctaRatio: ctaRatio.toFixed(2),
      passesAll,
    };
  }, [effectiveTokens, dna, mode]);

  const concentricityWarning = useMemo(
    () => getConcentricityWarning(seed.radiusBase, seed.spacingBase),
    [seed.radiusBase, seed.spacingBase],
  );

  const activePresetId = useMemo(() => {
    const match = presets.find(
      p =>
        p.state.seed.atmosphere === seed.atmosphere &&
        p.state.seed.accent === seed.accent &&
        p.state.seed.lipStyle === seed.lipStyle &&
        p.state.seed.segmentedStyle === seed.segmentedStyle &&
        p.state.seed.wellStyle === seed.wellStyle &&
        p.state.seed.radiusScale === seed.radiusScale &&
        p.state.seed.sizeBase === seed.sizeBase &&
        p.state.seed.typeBase === seed.typeBase &&
        p.state.seed.headingFont === seed.headingFont &&
        p.state.seed.bodyFont === seed.bodyFont &&
        totalOverrides ===
          Object.keys(p.state.tokenOverrides).length +
            p.state.customOverrides.length,
    );
    return match?.id ?? '__custom__';
  }, [presets, seed, totalOverrides]);

  if (!isOpen) return null;

  const isCustomHex = !isPresetAccent(seed.accent);
  const isCustomUserPreset =
    activePresetId !== '__custom__' &&
    !getBuiltInPresets().some(b => b.id === activePresetId);

  const handleSavePreset = () => {
    const trimmed = newPresetName.trim();
    if (!trimmed) return;
    const preset: NamedStudioPreset = {
      id: `preset-${Date.now()}`,
      name: trimmed,
      state: {
        seed: {...seed},
        tokenOverrides: {...tokenOverrides},
        customOverrides: [...customOverrides],
      },
    };
    setPresets(prev => [...prev, preset]);
    setNewPresetName('');
    setPresetSaveOpen(false);
    showToast({
      type: 'info',
      body: isId ? `Preset "${trimmed}" disimpan.` : `Saved preset "${trimmed}".`,
    });
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = parseImportedThemeText(text, themeState);
      setThemeState(imported);
      showToast({
        type: 'info',
        body: isId
          ? `Tema "${file.name}" berhasil diimpor.`
          : `Imported theme from "${file.name}".`,
      });
    } catch {
      showToast({
        type: 'error',
        body: isId
          ? 'Pilih file .json Studio atau .ts defineTheme yang valid.'
          : 'Choose a valid Mehan .json or Astryx defineTheme .ts file.',
      });
    } finally {
      e.target.value = '';
    }
  };

  const handleAddCustomOverride = () => {
    const prop = customProp.trim();
    const val = customVal.trim();
    if (!customTarget || !prop || !val) return;
    setThemeState(prev => ({
      ...prev,
      customOverrides: [
        ...prev.customOverrides,
        {
          id: `ov-${Date.now()}`,
          component: customTarget,
          property: prop,
          value: val,
        },
      ],
    }));
  };

  const handleResetAll = () => {
    setThemeState({
      seed: {...DEFAULT_SEED_CONFIG},
      tokenOverrides: {},
      customOverrides: [],
    });
    showToast({
      type: 'info',
      body: isId
        ? 'Tema dikembalikan ke setelan awal.'
        : 'Reset all seed & token overrides to default.',
    });
  };

  const activeUnifiedPreset = (
    Object.entries(UNIFIED_PRESETS) as Array<
      [keyof typeof UNIFIED_PRESETS, (typeof UNIFIED_PRESETS)[keyof typeof UNIFIED_PRESETS]]
    >
  ).find(
    ([, p]) =>
      seed.typeBase === p.typeBase &&
      seed.spacingBase === p.spacing &&
      seed.sizeBase === p.sizeMd &&
      seed.radiusBase === p.radius,
  )?.[0];

  const qLower = tokenQuery.trim().toLowerCase();
  const compQLower = compQuery.trim().toLowerCase();

  return (
    <aside
      className="te-docked-panel"
      aria-label={isId ? 'Editor Tema Langsung' : 'Live Theme Editor'}
    >
      {/* Clean, Uncluttered Sticky Header */}
      <div className="te-header">
        <div className="te-header-top">
          <div className="te-header-title-row">
            <Palette size={15} />
            <span className="te-header-title">Theme Editor</span>
            <Tooltip
              content={`Body ${contrastAudit.textOnBody}:1 · Card ${contrastAudit.textOnCard}:1 · CTA ${contrastAudit.ctaRatio}:1`}
            >
              <span
                className={`te-contrast-pill ${contrastAudit.passesAll ? 'te-contrast-ok' : 'te-contrast-warn'}`}
              >
                {contrastAudit.passesAll ? (
                  <CheckCircle2 size={11} />
                ) : (
                  <AlertTriangle size={11} />
                )}
                <span>{contrastAudit.passesAll ? 'AA' : 'Check'}</span>
              </span>
            </Tooltip>
            {totalOverrides > 0 && (
              <Badge variant="info" label={`${totalOverrides}`} />
            )}
          </div>

          <div className="te-header-actions">
            <Tooltip content={isId ? 'Urungkan (Ctrl+Z)' : 'Undo (Ctrl+Z)'}>
              <IconButton
                variant="ghost"
                size="sm"
                isDisabled={!canUndo}
                label={isId ? 'Urungkan perubahan tema' : 'Undo theme change'}
                icon={<Undo2 size={14} />}
                onClick={onUndo}
              />
            </Tooltip>
            <Tooltip content={isId ? 'Ulangi (Ctrl+Shift+Z)' : 'Redo (Ctrl+Shift+Z)'}>
              <IconButton
                variant="ghost"
                size="sm"
                isDisabled={!canRedo}
                label={isId ? 'Ulangi perubahan tema' : 'Redo theme change'}
                icon={<Redo2 size={14} />}
                onClick={onRedo}
              />
            </Tooltip>
            <Tooltip content={isId ? 'Reset semua ke bawaan' : 'Reset all to default'}>
              <IconButton
                variant="ghost"
                size="sm"
                label={isId ? 'Reset semua' : 'Reset all to default'}
                icon={<RotateCcw size={14} />}
                onClick={handleResetAll}
              />
            </Tooltip>
            <IconButton
              variant="ghost"
              size="sm"
              label={isId ? 'Tutup Theme Editor' : 'Close Theme Editor'}
              icon={<X size={15} />}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Clean Preset & File I/O Row (Zero Header Crowding) */}
        <div className="te-preset-row">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.ts,.tsx,application/json,text/plain"
            style={{display: 'none'}}
            onChange={handleImportFile}
          />
          <div className="te-preset-selector">
            <Selector
              label={isId ? 'Preset tema' : 'Theme preset'}
              isLabelHidden
              size="sm"
              value={activePresetId}
              options={[
                ...presets.map(p => ({value: p.id, label: `Preset: ${p.name}`})),
                ...(activePresetId === '__custom__'
                  ? [{value: '__custom__', label: isId ? 'Preset: Kustom aktif' : 'Preset: Custom active'}]
                  : []),
              ]}
              onChange={id => {
                if (!id || id === '__custom__') return;
                const found = presets.find(p => p.id === id);
                if (found) setThemeState(found.state);
              }}
            />
          </div>
          {isCustomUserPreset && (
            <IconButton
              variant="ghost"
              size="sm"
              label={isId ? 'Hapus preset aktif' : 'Delete active preset'}
              icon={<Trash2 size={13} />}
              onClick={() =>
                setPresets(prev => prev.filter(item => item.id !== activePresetId))
              }
            />
          )}
          <Popover
            isOpen={presetSaveOpen}
            onOpenChange={setPresetSaveOpen}
            label={isId ? 'Simpan preset tema bernama' : 'Save named theme preset'}
            placement="below"
            alignment="end"
            content={
              <div style={{padding: 12, width: 232}}>
                <Stack gap={2}>
                  <TextInput
                    label={isId ? 'Nama preset' : 'Preset name'}
                    size="sm"
                    placeholder={isId ? 'Contoh: Editorial Gelap' : 'For example: Editorial Dark'}
                    value={newPresetName}
                    onChange={setNewPresetName}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    label={isId ? 'Simpan preset' : 'Save preset'}
                    icon={<Bookmark size={13} />}
                    onClick={handleSavePreset}
                  />
                </Stack>
              </div>
            }
          >
            <IconButton
              variant="secondary"
              size="sm"
              label={isId ? 'Simpan' : 'Save'}
              icon={<Bookmark size={13} />}
            />
          </Popover>
          <Tooltip content={isId ? 'Impor tema (.json / .ts)' : 'Import theme (.json / .ts)'}>
            <IconButton
              variant="secondary"
              size="sm"
              label={isId ? 'Impor tema' : 'Import theme'}
              icon={<Upload size={13} />}
              onClick={() => fileInputRef.current?.click()}
            />
          </Tooltip>
          <DropdownMenu
            button={{
              label: isId ? 'Ekspor tema' : 'Export theme',
              isIconOnly: true,
              variant: 'secondary',
              size: 'sm',
              icon: <Download size={13} />,
            }}
            items={[
              {
                label: 'createMehanTheme (.ts)',
                onClick: () => {
                  const ts = exportCreateMehanThemeTs(themeState, 'customMehan');
                  downloadTextFile('mehan-theme.ts', ts, 'text/typescript');
                  showToast({
                    type: 'info',
                    body: isId ? 'mehan-theme.ts diunduh.' : 'Downloaded mehan-theme.ts',
                  });
                },
              },
              {
                label: 'Astryx defineTheme (.ts)',
                onClick: () => {
                  const ts = exportPureAstryxDefineThemeTs(
                    themeState,
                    'astryxMehan',
                  );
                  downloadTextFile('astryx-theme.ts', ts, 'text/typescript');
                  showToast({
                    type: 'info',
                    body: isId
                      ? 'astryx-theme.ts murni diunduh.'
                      : 'Downloaded pure Astryx astryx-theme.ts',
                  });
                },
              },
              {
                label: isId ? 'Status Studio (.json)' : 'Studio state (.json)',
                onClick: () => {
                  downloadTextFile(
                    `mehan-${seed.atmosphere}-theme.json`,
                    `${JSON.stringify(themeState, null, 2)}\n`,
                    'application/json',
                  );
                  showToast({
                    type: 'info',
                    body: isId ? 'JSON Studio diunduh.' : 'Downloaded Studio JSON',
                  });
                },
              },
              {type: 'divider'},
              {
                label: isId ? 'Salin Portable CSS' : 'Copy Portable CSS (.css)',
                onClick: async () => {
                  const css = generatePortableCss({
                    name: `mehan-${seed.atmosphere}`,
                    ...seed,
                    radiusBase: seed.radiusBase ?? undefined,
                  });
                  await copyText(css);
                  showToast({
                    type: 'info',
                    body: isId
                      ? 'mehan-portable.css disalin.'
                      : 'Copied standalone mehan-portable.css',
                  });
                },
              },
              {
                label: isId ? 'Salin Kit Prototipe AI' : 'Copy AI Prototype Kit',
                onClick: async () => {
                  const md = generateAiPrototypeKit({
                    ...seed,
                    radiusBase: seed.radiusBase ?? undefined,
                  });
                  await copyText(md);
                  showToast({
                    type: 'info',
                    body: isId
                      ? 'Kit Prototipe AI disalin.'
                      : 'Copied AI Prototype Kit',
                  });
                },
              },
              {
                label: isId ? 'Token Figma W3C (.w3c.json)' : 'W3C Figma tokens (.w3c.json)',
                onClick: () => {
                  const w3c = exportW3cDesignTokens({
                    name: `mehan-${seed.atmosphere}`,
                    ...seed,
                    radiusBase: seed.radiusBase ?? undefined,
                  });
                  downloadTextFile(
                    'mehan-tokens.w3c.json',
                    `${JSON.stringify(w3c, null, 2)}\n`,
                    'application/json',
                  );
                  showToast({
                    type: 'info',
                    body: isId
                      ? 'mehan-tokens.w3c.json diunduh.'
                      : 'Downloaded mehan-tokens.w3c.json',
                  });
                },
              },
            ]}
          />
        </div>

        {/* Official 3 Astryx Theme Editor Tabs */}
        <TabList
          role="tablist"
          aria-label="Theme editor sections"
          value={editorTab}
          onChange={setEditorTab}
        >
          <Tab value="base" label={isId ? 'Gaya Dasar' : 'Base Styles'} />
          <Tab value="components" label={isId ? 'Komponen' : 'Components'} />
          <Tab value="advanced" label={isId ? 'Lanjutan' : 'Advanced'} />
        </TabList>
      </div>

      {/* Scrollable Chunked Body */}
      <div className="te-body">
        {/* ================================================================
            TAB 1: BASE STYLES (Chunked with Progressive Disclosure)
           ================================================================ */}
        {editorTab === 'base' && (
          <Stack gap={3}>
            {/* Group 1 (Primary): Tactile Seed & Brand */}
            <section className="te-section">
              <div className="te-section-title">
                {isId ? '1. Atmosfer & Aksen Taktil' : '1. Atmosphere & Brand Seed'}
              </div>

              <Stack gap={3}>
                <Stack gap={1.5}>
                  <span className="te-field-label">
                    {isId ? 'Suasana permukaan (8 atmosfer)' : 'Neutral atmosphere (8 surfaces)'}
                  </span>
                  <div
                    className="te-atmosphere-grid"
                    role="radiogroup"
                    aria-label="Neutral atmosphere"
                  >
                    {MEHAN_ATMOSPHERE_IDS.map(atmId => {
                      const atm = MEHAN_ATMOSPHERES[atmId];
                      const selected = seed.atmosphere === atmId;
                      return (
                        <button
                          key={atmId}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          className={`te-atmosphere-chip ${selected ? 'is-selected' : ''}`}
                          onClick={() =>
                            updateSeed(
                              {atmosphere: atmId},
                              [
                                '--color-background-body',
                                '--color-background-surface',
                                '--color-background-card',
                                '--color-background-muted',
                                '--color-text-primary',
                              ],
                            )
                          }
                        >
                          <span className="te-atm-dots" aria-hidden="true">
                            <i style={{backgroundColor: atm.light.paper}} />
                            <i style={{backgroundColor: atm.dark.surface}} />
                          </span>
                          <span className="te-atm-label">{atm.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </Stack>

                <Stack gap={1.5}>
                  <Stack direction="horizontal" justify="between" align="center">
                    <span className="te-field-label">
                      {isId ? 'Benih aksen (OKLCH)' : 'Brand accent (OKLCH)'}
                    </span>
                    <code className="te-token-code">{dna.accent.seed}</code>
                  </Stack>
                  <Stack direction="horizontal" gap={1.5} wrap="wrap" align="center">
                    {PRESET_ACCENT_LIST.map(preset => (
                      <ColorSwatch
                        key={preset.id}
                        size="md"
                        color={preset.seed}
                        label={`${preset.name} (${preset.seed})`}
                        isSelected={seed.accent === preset.id}
                        onSelect={() =>
                          updateSeed({accent: preset.id}, ['--color-accent'])
                        }
                      />
                    ))}
                    <Popover
                      isOpen={customPickerOpen}
                      onOpenChange={setCustomPickerOpen}
                      label="Custom brand hex picker"
                      placement="below"
                      alignment="end"
                      content={
                        <div style={{padding: 8, width: 256}}>
                          <ColorPicker
                            label="Custom brand hex"
                            value={dna.accent.seed}
                            onChange={hex =>
                              updateSeed(
                                {accent: hex},
                                ['--color-accent'],
                                [],
                                {coalesce: 'seed:accent'},
                              )
                            }
                            presets={PRESET_HEX_SWATCHES}
                          />
                        </div>
                      }
                    >
                      <Button
                        variant={isCustomHex ? 'primary' : 'secondary'}
                        size="sm"
                        label={isCustomHex ? dna.accent.seed : 'Hex'}
                      />
                    </Popover>
                  </Stack>
                </Stack>

                <Divider variant="subtle" />

                <Stack gap={2}>
                  <Stack gap={1}>
                    <span className="te-field-label">
                      {isId ? 'Pil aktif SegmentedControl' : 'Segmented active pill'}
                    </span>
                    <SegmentedControl
                      label="Segmented control active style"
                      size="sm"
                      value={seed.segmentedStyle}
                      onChange={v =>
                        updateSeed({segmentedStyle: v as MehanSegmentedStyle})
                      }
                    >
                      <SegmentedControlItem value="raised" label="Raised Ceramic" />
                      <SegmentedControlItem
                        value="espresso"
                        label="Espresso Ink"
                      />
                    </SegmentedControl>
                  </Stack>

                  <Stack gap={1}>
                    <span className="te-field-label">
                      {isId ? 'Bibir tombol 3D' : '3D button lip'}
                    </span>
                    <SegmentedControl
                      label="Button lip style"
                      size="sm"
                      value={seed.lipStyle}
                      onChange={v => updateSeed({lipStyle: v as MehanLipStyle})}
                    >
                      <SegmentedControlItem value="candy" label="Candy 3px" />
                      <SegmentedControlItem value="subtle" label="Subtle 2px" />
                      <SegmentedControlItem value="flat" label="Flat 0px" />
                    </SegmentedControl>
                  </Stack>

                  <Stack gap={1}>
                    <span className="te-field-label">
                      {isId ? 'Gaya kolom input' : 'Input field surface'}
                    </span>
                    <SegmentedControl
                      label="Input field surface style"
                      size="sm"
                      value={seed.wellStyle}
                      onChange={v => updateSeed({wellStyle: v as MehanWellStyle})}
                    >
                      <SegmentedControlItem value="recessed" label="Recessed Well" />
                      <SegmentedControlItem value="bordered" label="Bordered 1px" />
                    </SegmentedControl>
                  </Stack>

                  <PrecisionSlider
                    label={isId ? 'Kedalaman 3D' : 'Shadow depth'}
                    value={Math.round(seed.depth * 100)}
                    min={0}
                    max={150}
                    step={5}
                    stops={[50, 100, 150]}
                    unit="%"
                    onChange={val =>
                      updateSeed(
                        {depth: Number((val / 100).toFixed(2))},
                        [],
                        ['--shadow-'],
                        {coalesce: 'seed:depth'},
                      )
                    }
                  />
                </Stack>
              </Stack>
            </section>

            {/* Group 2 (Primary): Typography & Real Offline Font Pairing */}
            <section className="te-section">
              <div className="te-section-title">
                {isId ? '2. Tipografi & Pasangan Font' : '2. Typography & Font Pairing'}
              </div>
              <Stack gap={2}>
                <Selector
                  label={isId ? 'Font judul (Heading)' : 'Heading font'}
                  size="sm"
                  value={seed.headingFont}
                  options={HEADING_FONT_OPTIONS}
                  onChange={v =>
                    v && updateSeed({headingFont: v}, ['--font-family-heading'])
                  }
                />
                <Selector
                  label={isId ? 'Font isi (Body)' : 'Body font'}
                  size="sm"
                  value={seed.bodyFont}
                  options={BODY_FONT_OPTIONS}
                  onChange={v =>
                    v && updateSeed({bodyFont: v}, ['--font-family-body'])
                  }
                />
                <Selector
                  label={isId ? 'Font kode (Monospace)' : 'Code font'}
                  size="sm"
                  value={seed.codeFont}
                  options={CODE_FONT_OPTIONS}
                  onChange={v =>
                    v && updateSeed({codeFont: v}, ['--font-family-code'])
                  }
                />
                <Selector
                  label={isId ? 'Rasio skala huruf' : 'Type scale ratio'}
                  size="sm"
                  value={String(seed.typeRatio)}
                  options={RATIO_OPTIONS.map(r => ({
                    value: String(r.value),
                    label: r.label,
                  }))}
                  onChange={v =>
                    v &&
                    updateSeed(
                      {typeRatio: Number(v)},
                      [],
                      ['--text-', '--font-size-'],
                    )
                  }
                />

                <div className="te-scale-row">
                  <span className="te-field-label">
                    {isId ? 'Ukuran teks dasar' : 'Base type size'}
                  </span>
                  <div className="te-scale-controls">
                    <SegmentedControl
                      label="Base type size preset"
                      size="sm"
                      value={
                        [13, 13.5, 14, 16].includes(seed.typeBase)
                          ? String(seed.typeBase)
                          : 'custom'
                      }
                      onChange={v => {
                        if (v !== 'custom') {
                          updateSeed(
                            {typeBase: Number(v)},
                            [],
                            ['--text-', '--font-size-'],
                          );
                        }
                      }}
                    >
                      <SegmentedControlItem value="13" label="13" />
                      <SegmentedControlItem value="13.5" label="13.5" />
                      <SegmentedControlItem value="14" label="14" />
                      <SegmentedControlItem value="16" label="16" />
                    </SegmentedControl>
                    <NumberInput
                      label="Base type size px"
                      isLabelHidden
                      size="sm"
                      width={78}
                      min={11}
                      max={22}
                      step={0.5}
                      value={seed.typeBase}
                      onChange={v =>
                        v != null &&
                        updateSeed(
                          {typeBase: Number(v)},
                          [],
                          ['--text-', '--font-size-'],
                        )
                      }
                    />
                  </div>
                </div>
              </Stack>
            </section>

            {/* Group 3 (Progressive Disclosure): Shape, Scale & Density */}
            <div className="te-disclosure-box">
              <Collapsible
                defaultIsOpen={false}
                trigger={
                  isId
                    ? '3. Skala Kepadatan, Sudut & Spasi'
                    : '3. Scale Presets, Radius & Spacing'
                }
              >
                <Stack gap={3}>
                  <div className="te-unified-grid">
                    {(
                      Object.entries(UNIFIED_PRESETS) as Array<
                        [
                          keyof typeof UNIFIED_PRESETS,
                          (typeof UNIFIED_PRESETS)[keyof typeof UNIFIED_PRESETS],
                        ]
                      >
                    ).map(([id, preset]) => (
                      <button
                        key={id}
                        type="button"
                        className={`te-unified-card ${activeUnifiedPreset === id ? 'is-active' : ''}`}
                        onClick={() =>
                          updateSeed(
                            {
                              typeBase: preset.typeBase,
                              typeRatio: preset.typeRatio,
                              spacingBase: preset.spacing,
                              radiusBase: preset.radius,
                              sizeBase: preset.sizeMd,
                            },
                            [],
                            [
                              '--text-',
                              '--font-size-',
                              '--radius-',
                              '--spacing-',
                              '--size-element-',
                            ],
                          )
                        }
                      >
                        <span className="te-unified-name">{preset.label}</span>
                        <span className="te-unified-meta">
                          {preset.typeBase}px · {preset.sizeMd}h · {preset.spacing}sp
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="te-scale-row">
                    <span className="te-field-label">
                      {isId ? 'Sudut lengkung dasar' : 'Corner radius base'}
                    </span>
                    <div className="te-scale-controls">
                      <SegmentedControl
                        label="Corner radius base preset"
                        size="sm"
                        value={
                          seed.radiusBase === null
                            ? 'mehan'
                            : [0, 2, 4, 8].includes(seed.radiusBase)
                              ? String(seed.radiusBase)
                              : 'custom'
                        }
                        onChange={v => {
                          if (v === 'mehan') {
                            updateSeed(
                              {radiusBase: null, radiusScale: 1},
                              [],
                              ['--radius-'],
                            );
                          } else if (v !== 'custom') {
                            updateSeed(
                              {radiusBase: Number(v)},
                              [],
                              ['--radius-'],
                            );
                          }
                        }}
                      >
                        <SegmentedControlItem value="0" label="0" />
                        <SegmentedControlItem value="2" label="S" />
                        <SegmentedControlItem value="4" label="M" />
                        <SegmentedControlItem value="mehan" label="Mehan" />
                        <SegmentedControlItem value="8" label="XL" />
                      </SegmentedControl>
                      <NumberInput
                        label="Corner radius base px"
                        isLabelHidden
                        size="sm"
                        width={76}
                        min={0}
                        max={20}
                        step={1}
                        value={seed.radiusBase ?? 5}
                        onChange={v =>
                          v != null &&
                          updateSeed(
                            {radiusBase: Number(v)},
                            [],
                            ['--radius-'],
                          )
                        }
                      />
                    </div>
                  </div>

                  {concentricityWarning && (
                    <Banner
                      status="warning"
                      title={
                        isId
                          ? 'Konsentrisitas sudut bersarang'
                          : 'Concentric radius notice'
                      }
                      description={concentricityWarning}
                    />
                  )}

                  <div className="te-scale-row">
                    <span className="te-field-label">
                      {isId ? 'Unit jarak dasar' : 'Spacing base unit'}
                    </span>
                    <div className="te-scale-controls">
                      <SegmentedControl
                        label="Spacing base unit"
                        size="sm"
                        value={
                          [3, 4, 5, 6].includes(seed.spacingBase)
                            ? String(seed.spacingBase)
                            : 'custom'
                        }
                        onChange={v => {
                          if (v !== 'custom') {
                            updateSeed(
                              {spacingBase: Number(v)},
                              [],
                              ['--spacing-'],
                            );
                          }
                        }}
                      >
                        <SegmentedControlItem value="3" label="3px" />
                        <SegmentedControlItem value="4" label="4px" />
                        <SegmentedControlItem value="5" label="5px" />
                        <SegmentedControlItem value="6" label="6px" />
                      </SegmentedControl>
                      <NumberInput
                        label="Spacing base px"
                        isLabelHidden
                        size="sm"
                        width={76}
                        min={2}
                        max={10}
                        step={1}
                        value={seed.spacingBase}
                        onChange={v =>
                          v != null &&
                          updateSeed(
                            {spacingBase: Number(v)},
                            [],
                            ['--spacing-'],
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="te-scale-row">
                    <span className="te-field-label">
                      {isId ? 'Tinggi kontrol sedang' : 'Control height (md)'}
                    </span>
                    <div className="te-scale-controls">
                      <SegmentedControl
                        label="Element height md"
                        size="sm"
                        value={
                          [28, 32, 36, 40].includes(seed.sizeBase)
                            ? String(seed.sizeBase)
                            : 'custom'
                        }
                        onChange={v => {
                          if (v !== 'custom') {
                            updateSeed(
                              {sizeBase: Number(v)},
                              [],
                              ['--size-element-'],
                            );
                          }
                        }}
                      >
                        <SegmentedControlItem value="28" label="28" />
                        <SegmentedControlItem value="32" label="32" />
                        <SegmentedControlItem value="36" label="36" />
                        <SegmentedControlItem value="40" label="40" />
                      </SegmentedControl>
                      <NumberInput
                        label="Element height px"
                        isLabelHidden
                        size="sm"
                        width={76}
                        min={26}
                        max={52}
                        step={2}
                        value={seed.sizeBase}
                        onChange={v =>
                          v != null &&
                          updateSeed(
                            {sizeBase: Number(v)},
                            [],
                            ['--size-element-'],
                          )
                        }
                      />
                    </div>
                  </div>
                </Stack>
              </Collapsible>
            </div>

            {/* Group 4 (Progressive Disclosure): Core Semantic Color Overrides */}
            <div className="te-disclosure-box">
              <Collapsible
                defaultIsOpen={false}
                trigger={
                  isId
                    ? `4. Override Warna Inti (${mode === 'dark' ? 'Gelap' : 'Terang'})`
                    : `4. Core Semantic Colors (${mode === 'dark' ? 'Dark' : 'Light'})`
                }
              >
                <div className="te-token-list">
                  {BASE_CORE_COLOR_TOKENS.map(({token, en, id}) => (
                    <TokenColorRow
                      key={token}
                      tokenName={token}
                      label={isId ? id : en}
                      effectiveValue={effectiveTokens[token] ?? ''}
                      isOverridden={token in tokenOverrides}
                      mode={mode}
                      swatches={PRESET_HEX_SWATCHES}
                      onChange={val =>
                        setTokenOverride(token, val, `color:${token}`)
                      }
                      onReset={() => removeTokenOverride(token)}
                    />
                  ))}
                </div>
              </Collapsible>
            </div>

            {/* Group 5 (Progressive Disclosure): Motion & Tempo */}
            <div className="te-disclosure-box">
              <Collapsible
                defaultIsOpen={false}
                trigger={isId ? '5. Karakter Gerak & Durasi' : '5. Motion & Tempo'}
              >
                <Stack gap={2}>
                  <SegmentedControl
                    label="Motion character"
                    size="sm"
                    value={seed.motion}
                    onChange={v =>
                      updateSeed(
                        {motion: v as MehanMotion},
                        [],
                        ['--duration-', '--ease-'],
                      )
                    }
                  >
                    <SegmentedControlItem value="expressive" label="Expressive" />
                    <SegmentedControlItem value="standard" label="Standard" />
                    <SegmentedControlItem value="crisp" label="Crisp" />
                    <SegmentedControlItem value="calm" label="Calm" />
                  </SegmentedControl>

                  <SegmentedControl
                    label="Duration speed multiplier"
                    size="sm"
                    value={String(seed.durationStep)}
                    onChange={v =>
                      updateSeed(
                        {durationStep: Number(v)},
                        [],
                        ['--duration-'],
                      )
                    }
                  >
                    <SegmentedControlItem value="0.5" label="0.5×" />
                    <SegmentedControlItem value="0.75" label="0.75×" />
                    <SegmentedControlItem value="1" label="1×" />
                    <SegmentedControlItem value="1.25" label="1.25×" />
                    <SegmentedControlItem value="1.5" label="1.5×" />
                    <SegmentedControlItem value="2" label="2×" />
                  </SegmentedControl>
                </Stack>
              </Collapsible>
            </div>
          </Stack>
        )}

        {/* ================================================================
            TAB 2: COMPONENTS (11 Official Astryx Groups + Custom CSS Overrides)
           ================================================================ */}
        {editorTab === 'components' && (
          <Stack gap={3}>
            <TextInput
              label="Filter component tokens"
              isLabelHidden
              size="sm"
              hasClear
              startIcon={<Search size={14} />}
              placeholder={
                isId
                  ? 'Saring slot komponen (button, card, input, chat)...'
                  : 'Filter component slots (button, card, input, chat)...'
              }
              value={compQuery}
              onChange={setCompQuery}
            />

            <Stack gap={2}>
              {Object.entries(COMPONENT_VARS)
                .filter(
                  ([key, group]) =>
                    !compQLower ||
                    key.includes(compQLower) ||
                    group.label.toLowerCase().includes(compQLower) ||
                    group.vars.some(v => v.name.includes(compQLower)),
                )
                .map(([key, group]) => (
                  <div key={key} className="te-section">
                    <div className="te-section-title">{group.label}</div>
                    <Stack gap={2}>
                      {group.vars.map(slot => {
                        const seededDefault =
                          readSeededComponentValue(baseComponents, slot.name) ??
                          slot.default;
                        const currentVal =
                          tokenOverrides[slot.name] ?? seededDefault;
                        const isOverridden = slot.name in tokenOverrides;
                        const isKnownOption = slot.options.some(
                          o => o.value === currentVal,
                        );
                        const isCustomMode =
                          Boolean(customVarSlots[slot.name]) ||
                          (isOverridden && !isKnownOption);

                        return (
                          <Stack key={slot.name} gap={1}>
                            <Stack
                              direction="horizontal"
                              justify="between"
                              align="center"
                            >
                              <span className="te-token-label">
                                {slot.description}
                                {isOverridden && <i className="te-override-dot" />}
                              </span>
                              <code className="te-token-code">{slot.name}</code>
                            </Stack>
                            <Stack direction="horizontal" gap={1.5} align="center">
                              <div style={{flex: 1}}>
                                <Selector
                                  label={`${group.label} ${slot.description}`}
                                  isLabelHidden
                                  size="sm"
                                  value={
                                    isCustomMode
                                      ? '__custom__'
                                      : isKnownOption
                                        ? currentVal
                                        : slot.default
                                  }
                                  options={[
                                    ...slot.options.map(o => ({
                                      value: o.value,
                                      label: resolveComponentOptionLabel(
                                        o,
                                        effectiveTokens,
                                      ),
                                    })),
                                    {
        value: '__custom__',
        label: isId ? 'Nilai CSS kustom...' : 'Custom CSS value...',
      },
                                  ]}
                                  onChange={v => {
                                    if (!v) return;
                                    if (v === '__custom__') {
                                      setCustomVarSlots(prev => ({
                                        ...prev,
                                        [slot.name]: true,
                                      }));
                                    } else {
                                      setCustomVarSlots(prev => ({
                                        ...prev,
                                        [slot.name]: false,
                                      }));
                                      setTokenOverride(slot.name, v);
                                    }
                                  }}
                                />
                              </div>
                              {isOverridden && (
                                <IconButton
                                  variant="ghost"
                                  size="sm"
                                  label={`Reset ${slot.name}`}
                                  icon={<RotateCcw size={13} />}
                                  onClick={() => {
                                    setCustomVarSlots(prev => ({
                                      ...prev,
                                      [slot.name]: false,
                                    }));
                                    removeTokenOverride(slot.name);
                                  }}
                                />
                              )}
                            </Stack>
                            {isCustomMode && (
                              <TextInput
                                label={`Custom CSS value for ${slot.name}`}
                                isLabelHidden
                                size="sm"
                                placeholder="e.g. 9999px or 18px"
                                value={currentVal}
                                onChange={val => setTokenOverride(slot.name, val)}
                              />
                            )}
                          </Stack>
                        );
                      })}
                    </Stack>
                  </div>
                ))}
            </Stack>

            <Divider />

            {/* Custom Component CSS Overrides Builder */}
            <section className="te-section">
              <div className="te-section-title">
                {isId
                  ? 'Override CSS Komponen Bebas (65+ Target)'
                  : 'Custom Component CSS Overrides (65+ Targets)'}
              </div>
              <Stack gap={2}>
                <Selector
                  label={isId ? 'Target komponen Astryx' : 'Component target'}
                  size="sm"
                  value={customTarget}
                  options={ALL_COMPONENT_TARGETS.map(t => ({value: t, label: t}))}
                  onChange={v => v && setCustomTarget(v)}
                />
                <Stack direction="horizontal" gap={1.5}>
                  <TextInput
                    label="CSS property (camelCase)"
                    size="sm"
                    placeholder="borderRadius"
                    value={customProp}
                    onChange={setCustomProp}
                  />
                  <TextInput
                    label="CSS value"
                    size="sm"
                    placeholder="999px"
                    value={customVal}
                    onChange={setCustomVal}
                  />
                </Stack>
                <Button
                  variant="secondary"
                  size="sm"
                  label={isId ? 'Tambah override' : 'Add component override'}
                  icon={<Plus size={14} />}
                  onClick={handleAddCustomOverride}
                />

                {customOverrides.length > 0 && (
                  <Stack gap={1.5}>
                    {customOverrides.map(ov => (
                      <Stack key={ov.id} gap={1}>
                        <div className="te-custom-override-row">
                          <code>
                            {ov.component}.base.{ov.property}
                          </code>
                          <IconButton
                            variant="ghost"
                            size="sm"
                            label={`Remove override ${ov.component}.${ov.property}`}
                            icon={<Trash2 size={13} />}
                            onClick={() =>
                              setThemeState(prev => ({
                                ...prev,
                                customOverrides: prev.customOverrides.filter(
                                  item => item.id !== ov.id,
                                ),
                              }))
                            }
                          />
                        </div>
                        <TextInput
                          label={`Override value for ${ov.component}.${ov.property}`}
                          isLabelHidden
                          size="sm"
                          value={ov.value}
                          onChange={nextVal =>
                            setThemeState(
                              prev => ({
                                ...prev,
                                customOverrides: prev.customOverrides.map(item =>
                                  item.id === ov.id
                                    ? {...item, value: nextVal}
                                    : item,
                                ),
                              }),
                              {coalesce: `ov:${ov.id}`},
                            )
                          }
                        />
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </section>
          </Stack>
        )}

        {/* ================================================================
            TAB 3: ADVANCED (All 8 Official Astryx Raw Token Groups)
           ================================================================ */}
        {editorTab === 'advanced' && (
          <Stack gap={3}>
            <div className="te-adv-pills" role="tablist" aria-label="Raw token groups">
              {(
                Object.entries(ADVANCED_TOKEN_GROUPS) as Array<
                  [
                    AdvancedTokenGroupKey,
                    (typeof ADVANCED_TOKEN_GROUPS)[AdvancedTokenGroupKey],
                  ]
                >
              ).map(([key, grp]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={advGroup === key}
                  className={`te-adv-pill ${advGroup === key ? 'is-active' : ''}`}
                  onClick={() => setAdvGroup(key)}
                >
                  {isId ? ADV_GROUP_LABELS_ID[key] : grp.label}
                </button>
              ))}
            </div>

            <TextInput
              label="Filter raw tokens"
              isLabelHidden
              size="sm"
              hasClear
              startIcon={<Search size={14} />}
              placeholder={
                isId
                  ? 'Cari nama token (--color-accent, --radius-page)...'
                  : 'Search token (--color-accent, --spacing-4, --shadow-low)...'
              }
              value={tokenQuery}
              onChange={setTokenQuery}
            />

            {/* Group 1: Colors (10 subcategories incl. Data Viz & Syntax) */}
            {advGroup === 'colors' && (
              <Stack gap={2}>
                {Object.entries(COLOR_CATEGORIES).map(([catName, keys]) => {
                  const filtered = keys.filter(
                    k =>
                      !qLower ||
                      k.toLowerCase().includes(qLower) ||
                      catName.toLowerCase().includes(qLower),
                  );
                  if (filtered.length === 0) return null;
                  return (
                    <div key={catName} className="te-disclosure-box">
                      <Collapsible
                        defaultIsOpen={
                          catName === 'Core Semantic' || Boolean(qLower)
                        }
                        trigger={`${catName} (${filtered.length})`}
                      >
                        <div className="te-token-list">
                          {filtered.map(token => (
                            <TokenColorRow
                              key={token}
                              tokenName={token}
                              effectiveValue={effectiveTokens[token] ?? ''}
                              isOverridden={token in tokenOverrides}
                              mode={mode}
                              swatches={PRESET_HEX_SWATCHES}
                              onChange={val =>
                        setTokenOverride(token, val, `color:${token}`)
                      }
                              onReset={() => removeTokenOverride(token)}
                            />
                          ))}
                        </div>
                      </Collapsible>
                    </div>
                  );
                })}
              </Stack>
            )}

            {/* Group 4: Typography (Categorized with live Aa preview) */}
            {advGroup === 'typography' && (
              <Stack gap={2}>
                {Object.entries(TYPOGRAPHY_CATEGORIES).map(([catName, keys]) => {
                  const filtered = keys.filter(
                    k =>
                      !qLower ||
                      k.toLowerCase().includes(qLower) ||
                      catName.toLowerCase().includes(qLower),
                  );
                  if (filtered.length === 0) return null;
                  return (
                    <div key={catName} className="te-section">
                      <div className="te-section-title">{catName}</div>
                      <div className="te-token-list">
                        {filtered.map(token => {
                          const val = effectiveTokens[token] ?? '';
                          const isOverridden = token in tokenOverrides;
                          return (
                            <div key={token} className="te-token-row">
                              <div className="te-token-meta">
                                <span className="te-token-label">
                                  {getTokenLabel(token)}
                                  {isOverridden && <i className="te-override-dot" />}
                                </span>
                                <code className="te-token-code">{token}</code>
                              </div>
                              <div className="te-token-controls">
                                {token.endsWith('-size') && (
                                  <span
                                    className="te-aa-preview"
                                    style={{fontSize: val}}
                                  >
                                    Aa
                                  </span>
                                )}
                                <div className="te-raw-input">
                                  <TextInput
                                    label={token}
                                    isLabelHidden
                                    size="sm"
                                    value={val}
                                    onChange={next =>
                                      setTokenOverride(token, next, `raw:${token}`)
                                    }
                                  />
                                </div>
                                {isOverridden ? (
                                  <IconButton
                                    variant="ghost"
                                    size="sm"
                                    label={`Reset ${token}`}
                                    icon={<RotateCcw size={13} />}
                                    onClick={() => removeTokenOverride(token)}
                                  />
                                ) : (
                                  <span className="te-reset-spacer" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </Stack>
            )}

            {/* Groups: Spacing, Radius, Size, Shadow, Duration, Easing */}
            {advGroup !== 'colors' && advGroup !== 'typography' && (
              <div className="te-section">
                <div className="te-section-title">
                  {isId ? ADV_GROUP_LABELS_ID[advGroup] : ADVANCED_TOKEN_GROUPS[advGroup].label}
                </div>
                <div className="te-token-list">
                  {ADVANCED_TOKEN_GROUPS[advGroup].keys
                    .filter(k => !qLower || k.toLowerCase().includes(qLower))
                    .map(token => {
                      const val = effectiveTokens[token] ?? '';
                      const isOverridden = token in tokenOverrides;
                      const px = spacingToPx(val);
                      return (
                        <div key={token} className="te-token-row">
                          <div className="te-token-meta">
                            <span className="te-token-label">
                              {getTokenLabel(token)}
                              {isOverridden && <i className="te-override-dot" />}
                            </span>
                            <code className="te-token-code">{token}</code>
                          </div>
                          <div className="te-token-controls">
                            {advGroup === 'spacing' && Number.isFinite(px) && (
                              <span
                                className="te-spacing-bar"
                                style={{width: Math.min(56, Math.max(2, px))}}
                                title={`${px}px`}
                              />
                            )}
                            {advGroup === 'radius' && (
                              <span
                                className="te-radius-box"
                                style={{borderRadius: val}}
                              />
                            )}
                            <div className="te-raw-input">
                              <TextInput
                                label={token}
                                isLabelHidden
                                size="sm"
                                value={val}
                                onChange={next => setTokenOverride(token, next)}
                              />
                            </div>
                            {isOverridden ? (
                              <IconButton
                                variant="ghost"
                                size="sm"
                                label={`Reset ${token}`}
                                icon={<RotateCcw size={13} />}
                                onClick={() => removeTokenOverride(token)}
                              />
                            ) : (
                              <span className="te-reset-spacer" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </Stack>
        )}
      </div>
    </aside>
  );
}
