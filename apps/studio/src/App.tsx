import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  AlertDialog,
  Badge,
  Button,
  Card,
  CodeBlock,
  Collapsible,
  Grid,
  HStack,
  Heading,
  IconButton,
  LayerProvider,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Switch,
  Tab,
  TabList,
  Text,
  useToast,
} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {
  ColorSwatch,
  MetricCard,
  PrecisionSlider,
  ShortcutSheet,
  useHistoryStore,
  useMehanShortcuts,
} from '@mehan/astryx';
import {
  MEHAN_ATMOSPHERES,
  contrastRatio,
  createHistoryStore,
  resolveMehanDna,
  type HistoryUpdateOptions,
} from '@mehan/astryx/dna';
import {
  MEHAN_PORTABLE_RUNTIME_JS,
  generateAiPrototypeKit,
  generatePortableCss,
} from '@mehan/portable';
import {
  ArrowRight,
  Copy,
  Download,
  Keyboard,
  Moon,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
} from 'lucide-react';
import {ComponentsCatalogView} from './catalog/ComponentsCatalogView';
import {STUDIO_COPY} from './i18n';
import {MaintainView} from './MaintainView';
import {OverviewManifesto} from './OverviewManifesto';
import {
  buildAgentSetupPrompt,
  buildReactInstallSnippet,
  copyText,
  downloadTextFile,
  getBuiltInPresets,
  loadPersistedStudioState,
  savePersistedStudioState,
  type InstallCssMode,
  type InstallSourceMode,
  type NamedStudioPreset,
  type StudioLang,
} from './studioState';
import {TemplatesView} from './templates/TemplatesView';
import {DockedThemeEditor} from './theme-editor/DockedThemeEditor';
import {
  composeStudioTheme,
  exportCreateMehanThemeTs,
  type FullThemeEditorState,
} from './theme-editor/themeEditorModel';
import {UxCopyView} from './UxCopyView';

interface StudioInnerProps {
  lang: StudioLang;
  setLang: (lang: StudioLang) => void;
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  editorOpen: boolean;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  presets: NamedStudioPreset[];
  setPresets: React.Dispatch<React.SetStateAction<NamedStudioPreset[]>>;
}

function StudioInner({
  lang,
  setLang,
  mode,
  setMode,
  editorOpen,
  setEditorOpen,
  themeState,
  setThemeState,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  effectiveTokens,
  baseComponents,
  presets,
  setPresets,
}: StudioInnerProps) {
  const showToast = useToast();
  const copy = STUDIO_COPY[lang];
  const isId = lang === 'id';

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sourceMode, setSourceMode] = useState<InstallSourceMode>('github');
  const [cssMode, setCssMode] = useState<InstallCssMode>('plain');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const catalogSearchRef = useRef<HTMLInputElement | null>(null);

  useMehanShortcuts([
    {
      keys: '?',
      label: isId ? 'Buka referensi pintasan keyboard' : 'Open keyboard shortcuts sheet',
      group: 'Studio',
      onPress: () => setShortcutsOpen(true),
    },
    {
      keys: '/',
      label: isId ? 'Cari komponen di katalog' : 'Focus component catalog search',
      group: 'Studio',
      onPress: () => {
        setActiveTab('components');
        requestAnimationFrame(() => catalogSearchRef.current?.focus());
      },
    },
    {
      keys: 'mod+.',
      label: isId ? 'Buka / tutup Theme Editor' : 'Toggle Docked Theme Editor',
      group: 'Studio',
      onPress: () => setEditorOpen(prev => !prev),
    },
    {
      keys: 'mod+z',
      label: isId ? 'Urungkan perubahan tema' : 'Undo theme change',
      group: 'History',
      onPress: () => onUndo(),
    },
    {
      keys: 'mod+shift+z',
      label: isId ? 'Ulangi perubahan tema' : 'Redo theme change',
      group: 'History',
      onPress: () => onRedo(),
    },
  ]);

  // Live Hero Demo Widget state (real product surface, not duplicate theme knobs)
  const [heroChannel, setHeroChannel] = useState<string>('production');
  const [heroRollout, setHeroRollout] = useState<number>(85);
  const [heroAutoGuard, setHeroAutoGuard] = useState<boolean>(true);

  const {seed} = themeState;

  const dna = useMemo(
    () =>
      resolveMehanDna({
        name: `mehan-${seed.atmosphere}`,
        ...seed,
        radiusBase: seed.radiusBase ?? undefined,
      }),
    [seed],
  );

  const atmosphereName = MEHAN_ATMOSPHERES[seed.atmosphere].name;
  const accentName = dna.accent.name;

  const builtInPresets = useMemo(() => getBuiltInPresets(), []);

  const accentTextContrast = useMemo(() => {
    const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
    const text = mode === 'light' ? dna.accent.textLight : dna.accent.textDark;
    return contrastRatio(text, S.surface).toFixed(2);
  }, [dna, mode]);

  const exportedThemeTs = useMemo(
    () => exportCreateMehanThemeTs(themeState, 'customMehan'),
    [themeState],
  );

  const aiKitMarkdown = useMemo(
    () =>
      generateAiPrototypeKit({
        ...seed,
        radiusBase: seed.radiusBase ?? undefined,
      }),
    [seed],
  );

  const reactSnippets = useMemo(
    () =>
      buildReactInstallSnippet(
        themeState,
        sourceMode,
        cssMode,
        mode,
        exportedThemeTs,
      ),
    [themeState, sourceMode, cssMode, mode, exportedThemeTs],
  );

  const agentSetupPrompt = useMemo(
    () => buildAgentSetupPrompt(themeState, sourceMode, cssMode),
    [themeState, sourceMode, cssMode],
  );

  const handleCopyAiKit = async () => {
    await copyText(aiKitMarkdown);
    showToast({
      type: 'info',
      body: isId
        ? `Kit AI (${atmosphereName} · ${accentName}) disalin ke clipboard.`
        : `Copied AI Prototype Kit (${atmosphereName} · ${accentName}).`,
    });
  };

  const handleDownloadStarterHtml = () => {
    const density = seed.sizeBase <= 32 ? 'compact' : 'standard';
    const css = generatePortableCss({
      name: `mehan-${seed.atmosphere}`,
      ...seed,
      radiusBase: seed.radiusBase ?? undefined,
    });
    const html = `<!doctype html>
<html lang="${lang}" data-theme="${mode}" data-density="${density}" data-motion="${seed.motion}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Portable Starter — ${atmosphereName}</title>
  <style>${css}</style>
</head>
<body>
  <header class="mh-topbar">
    <div class="mh-row"><strong class="mh-h2">mehan</strong><span class="mh-badge mh-badge-accent">${atmosphereName} · ${accentName}</span></div>
    <button class="mh-btn mh-btn-sm mh-btn-secondary" type="button" data-mh-theme-toggle>Light / Dark</button>
  </header>
  <main class="mh-container">
    <section class="mh-card mh-stack" style="max-width:540px;margin:24px auto">
      <h1 class="mh-h1">Workspace settings</h1>
      <p class="mh-muted">Single-file HTML prototype powered by Mehan Portable with zero external build tools.</p>
      <label class="mh-field">
        <span class="mh-label">Project name</span>
        <input class="mh-input" value="Confectionery Launchpad" />
      </label>
      <div class="mh-row">
        <button class="mh-btn mh-btn-primary" type="button">Save changes</button>
        <button class="mh-btn mh-btn-secondary" type="button">Export</button>
        <button class="mh-btn mh-btn-danger" type="button">Delete item</button>
      </div>
    </section>
  </main>
  <script>${MEHAN_PORTABLE_RUNTIME_JS}</script>
</body>
</html>`;
    downloadTextFile(`mehan-${seed.atmosphere}-starter.html`, html, 'text/html');
    showToast({
      type: 'info',
      body: `Downloaded mehan-${seed.atmosphere}-starter.html`,
    });
  };

  const handleCopyPortableCss = async () => {
    const css = generatePortableCss({
      name: `mehan-${seed.atmosphere}`,
      ...seed,
      radiusBase: seed.radiusBase ?? undefined,
    });
    await copyText(css);
    showToast({
      type: 'info',
      body: isId
        ? 'mehan-portable.css berhasil disalin.'
        : 'Copied standalone mehan-portable.css.',
    });
  };

  return (
    <div className="studio-shell">
      {/* Calm, Uncluttered Sticky Top Bar */}
      <header className="studio-topbar">
        <div className="studio-topbar-inner">
          <div className="studio-brand">
            <div className="studio-logo-badge" aria-hidden="true">
              m
            </div>
            <span className="studio-wordmark">mehan</span>
            <Badge variant="neutral" label="v1.0" />
          </div>

          <nav className="studio-topnav" aria-label="Studio navigation">
            <TabList
              role="tablist"
              aria-label="Mehan Studio sections"
              value={activeTab}
              onChange={setActiveTab}
              overflow="auto"
            >
              <Tab value="overview" label={copy.nav.overview} />
              <Tab value="components" label={copy.nav.components} />
              <Tab value="templates" label={copy.nav.templates} />
              <Tab value="ux" label={copy.nav.uxCopy} />
              <Tab value="maintain" label={copy.nav.maintain} />
            </TabList>
          </nav>

          <div className="studio-actions-cluster">
            <SegmentedControl
              label="Language"
              size="sm"
              value={lang}
              onChange={val => setLang(val as StudioLang)}
            >
              <SegmentedControlItem value="id" label="ID" />
              <SegmentedControlItem value="en" label="EN" />
            </SegmentedControl>

            <IconButton
              variant="ghost"
              size="sm"
              label={copy.nav.shortcuts}
              icon={<Keyboard size={15} />}
              onClick={() => setShortcutsOpen(true)}
            />

            <IconButton
              variant="secondary"
              size="sm"
              label={mode === 'light' ? copy.nav.dark : copy.nav.light}
              icon={mode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}
            />

            <Button
              variant={editorOpen ? 'secondary' : 'primary'}
              size="sm"
              label={copy.nav.customize}
              icon={<SlidersHorizontal size={14} />}
              onClick={() => setEditorOpen(prev => !prev)}
            />
          </div>
        </div>
      </header>

      {/* Split-Pane Workspace: Main Content + Non-Modal Docked Theme Editor */}
      <div className={`studio-workspace ${editorOpen ? 'has-docked-editor' : ''}`}>
        <main className="studio-main">
          {activeTab === 'overview' && (
            <Stack gap={5}>
              <section className="studio-hero">
                <Grid
                  columns={{minWidth: 320, max: 2, repeat: 'fit'}}
                  gap={6}
                  align="center"
                >
                  <Stack gap={3}>
                    <HStack gap={2} vAlign="center" wrap="wrap">
                      <Badge variant="info" label={copy.overview.eyebrow} />
                      <Badge
                        variant="success"
                        label={`WCAG 2.2 AA · ${accentTextContrast}:1`}
                      />
                    </HStack>
                    <Heading level={1}>{copy.overview.heroTitle}</Heading>
                    <Text color="secondary">{copy.overview.heroDesc}</Text>
                    <HStack gap={2} wrap="wrap" vAlign="center">
                      <Button
                        variant="primary"
                        label={copy.overview.ctaCustomize}
                        icon={<SlidersHorizontal size={15} />}
                        onClick={() => setEditorOpen(true)}
                      />
                      <Button
                        variant="secondary"
                        label={copy.overview.ctaExploreComponents}
                        onClick={() => setActiveTab('components')}
                      />
                      <Button
                        variant="ghost"
                        label={copy.overview.ctaCopyAiKit}
                        icon={<Sparkles size={15} />}
                        onClick={() => void handleCopyAiKit()}
                      />
                    </HStack>
                  </Stack>

                  {/* Focused Real-World Tactile Widget (Zero Duplicate Settings Clutter) */}
                  <div className="studio-tray-panel">
                    <Stack gap={3}>
                      <HStack hAlign="between" vAlign="center" gap={2}>
                        <div style={{minWidth: 0, flex: 1}}>
                          <Stack gap={0.5}>
                            <Text weight="semibold">
                              {isId ? 'Kontrol rilis bertahap' : 'Progressive rollout'}
                            </Text>
                            <Text type="supporting" color="secondary" maxLines={1}>
                              {atmosphereName} · {accentName} · {seed.headingFont}
                            </Text>
                          </Stack>
                        </div>
                        <div style={{flex: 'none'}}>
                          <Badge
                            variant="success"
                            label={heroChannel === 'production' ? 'Live' : 'Canary'}
                          />
                        </div>
                      </HStack>

                      <SegmentedControl
                        label="Deployment environment"
                        size="sm"
                        value={heroChannel}
                        onChange={setHeroChannel}
                      >
                        <SegmentedControlItem value="production" label="Production" />
                        <SegmentedControlItem value="canary" label="Canary" />
                        <SegmentedControlItem value="preview" label="Preview" />
                      </SegmentedControl>

                      <MetricCard
                        label={isId ? 'Latensi tepi (p95)' : 'Edge latency (p95)'}
                        value={heroChannel === 'production' ? '18.4 ms' : '21.2 ms'}
                        delta={{value: '-2.8 ms', direction: 'down'}}
                        caption={
                          isId
                            ? 'Angka sejajar otomatis (tabular-nums)'
                            : 'Aligned tabular numerals across live updates'
                        }
                      />

                      <PrecisionSlider
                        label={isId ? 'Trafik' : 'Traffic'}
                        value={heroRollout}
                        min={0}
                        max={100}
                        step={5}
                        stops={[25, 50, 85, 100]}
                        unit="%"
                        onChange={setHeroRollout}
                      />

                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Switch
                          label={
                            isId ? 'Proteksi kontras otomatis' : 'Auto contrast guard'
                          }
                          value={heroAutoGuard}
                          onChange={setHeroAutoGuard}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          label={isId ? 'Buka Showcase' : 'Open Showcase'}
                          onClick={() => setActiveTab('templates')}
                        />
                      </HStack>
                    </Stack>
                  </div>
                </Grid>
              </section>

              {/* Editorial Manifesto, Attachment-1 Distillation Illustration, 12-Preset Live Gallery & 6-Stage Iteration Chronicle */}
              <OverviewManifesto
                lang={lang}
                dna={dna}
                themeState={themeState}
                builtInPresets={builtInPresets}
                onApplyPreset={preset => {
                  setThemeState(preset.state);
                }}
                onOpenEditor={() => setEditorOpen(true)}
              />

              {/* 30-Second Visual Architecture Map */}
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={2}>{copy.overview.mapTitle}</Heading>
                    <Text color="secondary">{copy.overview.mapSub}</Text>
                  </Stack>

                  <div className="studio-arch-grid">
                    <div className="studio-arch-step">
                      <Badge variant="neutral" label={copy.overview.layer1Tag} />
                      <Heading level={4}>{copy.overview.layer1Title}</Heading>
                      <Text color="secondary">{copy.overview.layer1Desc}</Text>
                    </div>

                    <div className="studio-arch-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>

                    <div className="studio-arch-step studio-arch-step-highlight">
                      <Badge variant="info" label={copy.overview.layer2Tag} />
                      <Heading level={4}>{copy.overview.layer2Title}</Heading>
                      <Text color="secondary">{copy.overview.layer2Desc}</Text>
                    </div>

                    <div className="studio-arch-arrow" aria-hidden="true">
                      <ArrowRight size={18} />
                    </div>

                    <div className="studio-arch-step">
                      <Badge variant="success" label={copy.overview.layer3Tag} />
                      <Heading level={4}>{copy.overview.layer3Title}</Heading>
                      <Text color="secondary">{copy.overview.layer3Desc}</Text>
                    </div>
                  </div>
                </Stack>
              </Card>

              {/* 3 Practical Start Paths + Clear 60-Second User Journey */}
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={2}>{copy.overview.installTitle}</Heading>
                    <Text color="secondary">{copy.overview.installSub}</Text>
                  </Stack>

                  {/* Explicit 3-Step User Flow Answering "How Do People Use This?" */}
                  <div className="mh-journey-strip" role="list" aria-label="60-second workflow">
                    <div className="mh-journey-step" role="listitem">
                      <span className="mh-journey-num">1</span>
                      <div>
                        <strong>
                          {isId
                            ? 'Buka Studio Web atau STUDIO.html'
                            : 'Open Web Studio or STUDIO.html'}
                        </strong>
                        <p>
                          {isId
                            ? 'Akses langsung via link GitHub Pages tanpa instalasi (atau klik 2x STUDIO.html secara offline).'
                            : 'Visit the live GitHub Pages URL with zero setup (or double-click STUDIO.html offline).'}
                        </p>
                      </div>
                    </div>
                    <div className="mh-journey-step" role="listitem">
                      <span className="mh-journey-num">2</span>
                      <div>
                        <strong>
                          {isId
                            ? 'Pilih 1 dari 12 Preset atau Racik Tema'
                            : 'Pick a Preset or Tune in Theme Editor'}
                        </strong>
                        <p>
                          {isId
                            ? 'Klik kartu preset di atas atau sesuaikan atmosfer, aksen OKLCH, font, dan radius secara live.'
                            : 'Click any preset card above or customize atmosphere, OKLCH accent, fonts, and radii live.'}
                        </p>
                      </div>
                    </div>
                    <div className="mh-journey-step" role="listitem">
                      <span className="mh-journey-num">3</span>
                      <div>
                        <strong>
                          {isId
                            ? 'Salin 1-Klik Sesuai Target Proyekmu'
                            : 'Copy 1-Click Output for Your Stack'}
                        </strong>
                        <p>
                          {isId
                            ? 'Semua tombol salin/unduh di bawah otomatis membawa tema aktif pilihanmu — siap tempel!'
                            : 'Every copy/download button below automatically embeds your active theme — paste and ship!'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Grid columns={{minWidth: 280, max: 3, repeat: 'fit'}} gap={3}>
                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="pink" label={copy.overview.cardAiBadge} />
                        <Heading level={4}>{copy.overview.cardAiTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardAiDesc}</Text>
                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="primary"
                            size="sm"
                            label={copy.overview.cardAiBtn}
                            icon={<Sparkles size={14} />}
                            onClick={() => void handleCopyAiKit()}
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            label={copy.overview.cardAiDownload}
                            icon={<Download size={14} />}
                            onClick={handleDownloadStarterHtml}
                          />
                        </HStack>
                      </Stack>
                    </div>

                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="blue" label={copy.overview.cardReactBadge} />
                        <Heading level={4}>{copy.overview.cardReactTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardReactDesc}</Text>
                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            label={copy.overview.cardReactAgentBtn}
                            icon={<Copy size={14} />}
                            onClick={async () => {
                              await copyText(agentSetupPrompt);
                              showToast({
                                type: 'info',
                                body: isId
                                  ? 'Prompt Setup disalin ke clipboard.'
                                  : 'Copied Agent Setup Prompt to clipboard.',
                              });
                            }}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            label={copy.overview.cardReactCmdBtn}
                            icon={<Terminal size={14} />}
                            onClick={async () => {
                              await copyText(reactSnippets.installCmd);
                              showToast({
                                type: 'info',
                                body: isId
                                  ? 'Perintah CLI disalin.'
                                  : 'Copied CLI install command.',
                              });
                            }}
                          />
                        </HStack>
                      </Stack>
                    </div>

                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="teal" label={copy.overview.cardHtmlBadge} />
                        <Heading level={4}>{copy.overview.cardHtmlTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardHtmlDesc}</Text>
                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            label={copy.overview.cardHtmlCssBtn}
                            icon={<Copy size={14} />}
                            onClick={() => void handleCopyPortableCss()}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            label={copy.overview.cardHtmlCdnBtn}
                            icon={<Download size={14} />}
                            onClick={handleDownloadStarterHtml}
                          />
                        </HStack>
                      </Stack>
                    </div>
                  </Grid>

                  <div className="te-disclosure-box">
                    <Collapsible
                      defaultIsOpen={false}
                      trigger={
                        isId
                          ? 'Lihat kode setup lengkap (React, Next.js & Tailwind CSS v4)'
                          : 'Show full setup snippets (React, Next.js & Tailwind CSS v4)'
                      }
                    >
                      <Stack gap={3}>
                        <HStack gap={2} wrap="wrap" vAlign="center">
                          <SegmentedControl
                            label="Package source"
                            size="sm"
                            value={sourceMode}
                            onChange={v => setSourceMode(v as InstallSourceMode)}
                          >
                            <SegmentedControlItem
                              value="github"
                              label={copy.overview.sourceGithub}
                            />
                            <SegmentedControlItem
                              value="local"
                              label={copy.overview.sourceLocal}
                            />
                            <SegmentedControlItem
                              value="npm"
                              label={copy.overview.sourceNpm}
                              isDisabled
                            />
                          </SegmentedControl>

                          <SegmentedControl
                            label="CSS stack"
                            size="sm"
                            value={cssMode}
                            onChange={v => setCssMode(v as InstallCssMode)}
                          >
                            <SegmentedControlItem
                              value="plain"
                              label={copy.overview.cssPlain}
                            />
                            <SegmentedControlItem
                              value="tailwind"
                              label={copy.overview.cssTailwind}
                            />
                          </SegmentedControl>
                        </HStack>

                        <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={3}>
                          <CodeBlock
                            code={`${reactSnippets.installCmd}\n\n${reactSnippets.cssCode}`}
                            language="bash"
                            title={
                              cssMode === 'tailwind'
                                ? 'Terminal + src/mehan.css (Tailwind v4)'
                                : 'Terminal + src/mehan.css'
                            }
                            hasCopyButton
                            maxHeight={220}
                          />
                          <CodeBlock
                            code={reactSnippets.tsxCode}
                            language="tsx"
                            title="src/App.tsx"
                            hasCopyButton
                            hasLineNumbers
                            maxHeight={220}
                          />
                        </Grid>
                      </Stack>
                    </Collapsible>
                  </div>
                </Stack>
              </Card>
            </Stack>
          )}

          {activeTab === 'components' && (
            <ComponentsCatalogView
              lang={lang}
              copy={copy}
              searchInputRef={catalogSearchRef}
            />
          )}

          {activeTab === 'templates' && (
            <TemplatesView lang={lang} copy={copy} />
          )}

          {activeTab === 'ux' && (
            <UxCopyView
              lang={lang}
              copy={copy}
              onOpenConfirmDemo={() => setConfirmOpen(true)}
            />
          )}

          {activeTab === 'maintain' && (
            <MaintainView
              lang={lang}
              copy={copy}
              themeState={themeState}
              dna={dna}
            />
          )}
        </main>

        <DockedThemeEditor
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          lang={lang}
          mode={mode}
          themeState={themeState}
          setThemeState={setThemeState}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
          effectiveTokens={effectiveTokens}
          baseComponents={baseComponents}
          dna={dna}
          presets={presets}
          setPresets={setPresets}
        />
      </div>

      {/* Named Destructive AlertDialog Demo */}
      <AlertDialog
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={
          isId
            ? 'Hapus kunci API "prod-gateway"?'
            : 'Delete API key "prod-gateway"?'
        }
        description={
          isId
            ? 'Layanan yang masih memakai kunci ini akan langsung ditolak. Tindakan ini tidak dapat dibatalkan.'
            : 'Services authenticating with this key will immediately stop working. This action cannot be undone.'
        }
        actionLabel={isId ? 'Hapus kunci API' : 'Delete API key'}
        cancelLabel={isId ? 'Batal' : 'Cancel'}
        onAction={() => {
          setConfirmOpen(false);
          showToast({
            type: 'info',
            body: isId
              ? 'Demo selesai — tidak ada data yang dihapus.'
              : 'Demo complete — nothing was deleted.',
          });
        }}
      />

      <ShortcutSheet
        isOpen={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
        title={isId ? 'Pintasan keyboard Studio' : 'Studio keyboard shortcuts'}
        searchPlaceholder={isId ? 'Saring pintasan…' : 'Filter shortcuts…'}
      />
    </div>
  );
}

export function App() {
  const initial = useMemo(() => loadPersistedStudioState(), []);
  const [lang, setLang] = useState<StudioLang>(initial.lang);
  const [mode, setMode] = useState<'light' | 'dark'>(initial.mode);
  const [editorOpen, setEditorOpen] = useState<boolean>(initial.editorOpen);
  const historyStore = useMemo(
    () =>
      createHistoryStore<FullThemeEditorState>(initial.themeState, {
        limit: 60,
        coalesceMs: 650,
      }),
    [initial],
  );
  const {
    present: themeState,
    canUndo,
    canRedo,
  } = useHistoryStore(historyStore);
  const [presets, setPresets] = useState<NamedStudioPreset[]>(initial.presets);

  useEffect(() => {
    savePersistedStudioState({lang, mode, editorOpen, themeState, presets});
  }, [lang, mode, editorOpen, themeState, presets]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [lang, mode]);

  const {theme: liveTheme, effectiveTokens, baseComponents} = useMemo(
    () => composeStudioTheme(themeState),
    [themeState],
  );

  return (
    <Theme theme={liveTheme} mode={mode}>
      <LayerProvider>
        <StudioInner
          lang={lang}
          setLang={setLang}
          mode={mode}
          setMode={setMode}
          editorOpen={editorOpen}
          setEditorOpen={setEditorOpen}
          themeState={themeState}
          setThemeState={historyStore.set}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={() => {
            historyStore.undo();
          }}
          onRedo={() => {
            historyStore.redo();
          }}
          effectiveTokens={effectiveTokens}
          baseComponents={baseComponents}
          presets={presets}
          setPresets={setPresets}
        />
      </LayerProvider>
    </Theme>
  );
}
