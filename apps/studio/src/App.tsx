import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  AlertDialog,
  Badge,
  Button,
  Card,
  CodeBlock,
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
  TextInput,
  useToast,
} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {
  ShortcutSheet,
  useHistoryStore,
  useMehanShortcuts,
} from '@mehan/astryx';
import {
  MEHAN_ATMOSPHERES,
  contrastRatio,
  createHistoryStore,
  exportW3cDesignTokens,
  resolveMehanDna,
  type HistoryUpdateOptions,
} from '@mehan/astryx/dna';
import {
  MEHAN_PORTABLE_RUNTIME_JS,
  generateAiPrototypeKit,
  generatePortableCss,
} from '@mehan/portable';
import {
  Copy,
  Download,
  Heart,
  Info,
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
import {MehanLogoMark} from './MehanLogoMark';
import {OverviewManifesto} from './OverviewManifesto';
import {StudioInfoDialog, type StudioInfoTab} from './StudioInfoDialog';
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
  const [quickstartTab, setQuickstartTab] = useState<string>('ai');
  const [sourceMode, setSourceMode] = useState<InstallSourceMode>('github');
  const [cssMode, setCssMode] = useState<InstallCssMode>('plain');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTab, setInfoTab] = useState<StudioInfoTab>('overview');
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

  // Relatable Everyday Product Card State in Hero (Zero DevOps Jargon!)
  const [heroStage, setHeroStage] = useState<string>('design');
  const [heroProjectName, setHeroProjectName] = useState<string>(
    'Studio Kreatif Nusantara',
  );
  const [heroCalmMode, setHeroCalmMode] = useState<boolean>(true);

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
    <div class="mh-row"><strong class="mh-h2">Mehan Design System</strong><span class="mh-badge mh-badge-accent">${atmosphereName} · ${accentName}</span></div>
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

  const handleDownloadW3cTokens = () => {
    const w3c = exportW3cDesignTokens({
      name: `mehan-${seed.atmosphere}`,
      ...seed,
      radiusBase: seed.radiusBase ?? undefined,
    });
    downloadTextFile(
      `mehan-${seed.atmosphere}-tokens.w3c.json`,
      JSON.stringify(w3c, null, 2),
      'application/json',
    );
    showToast({
      type: 'info',
      body: isId
        ? `Token W3C (mehan-${seed.atmosphere}-tokens.w3c.json) diunduh.`
        : `Downloaded mehan-${seed.atmosphere}-tokens.w3c.json.`,
    });
  };

  const openCreatorModal = (targetTab: StudioInfoTab = 'overview') => {
    setInfoTab(targetTab);
    setInfoOpen(true);
  };

  return (
    <div className="studio-shell">
      {/* Calm, Uncluttered Sticky Top Bar with Hand-Crafted 2.5D Animated Emblem */}
      <header className="studio-topbar">
        <div className="studio-topbar-inner">
          <div className="studio-brand">
            <MehanLogoMark size={32} />
            <span className="studio-wordmark">Mehan Design System</span>
            <span className="studio-version-badge">
              <Badge variant="neutral" label="v1.0" />
            </span>
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
              label={copy.nav.info}
              icon={<Info size={15} />}
              onClick={() => openCreatorModal('overview')}
            />

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
                        label={
                          isId
                            ? `Kontras Aman · ${accentTextContrast}:1`
                            : `WCAG AA Contrast · ${accentTextContrast}:1`
                        }
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

                    <div>
                      <button
                        type="button"
                        className="mh-author-pill"
                        onClick={() => openCreatorModal('about')}
                      >
                        <Heart size={12} aria-hidden="true" />
                        <span>
                          {isId
                            ? 'Dirancang penuh dedikasi oleh Raihan Allaam (@alamehan) · Lihat profil & cerita'
                            : 'Crafted with dedication by Raihan Allaam (@alamehan) · Story & credits'}
                        </span>
                      </button>
                    </div>
                  </Stack>

                  {/* Calm, Proportional Live UI Preview (Default md Controls) */}
                  <div className="studio-tray-panel">
                    <Stack gap={3}>
                      <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
                        <div style={{minWidth: 0, flex: 1}}>
                          <Stack gap={0.5}>
                            <Text weight="semibold">
                              {isId
                                ? 'Coba langsung rasa komponennya'
                                : 'Feel the live components right here'}
                            </Text>
                            <Text type="supporting" color="secondary" maxLines={1}>
                              {atmosphereName} · {accentName} · {seed.headingFont}
                            </Text>
                          </Stack>
                        </div>
                        <Badge
                          variant="success"
                          label={isId ? 'Interaktif' : 'Live UI'}
                        />
                      </HStack>

                      <SegmentedControl
                        label={isId ? 'Tahap proyek' : 'Project stage'}
                        value={heroStage}
                        onChange={setHeroStage}
                      >
                        <SegmentedControlItem
                          value="design"
                          label={isId ? 'Desain' : 'Design'}
                        />
                        <SegmentedControlItem
                          value="review"
                          label={isId ? 'Ulasan Tim' : 'Team Review'}
                        />
                        <SegmentedControlItem
                          value="ship"
                          label={isId ? 'Siap Rilis' : 'Ready to Ship'}
                        />
                      </SegmentedControl>

                      <TextInput
                        label={isId ? 'Nama ruang kerja proyek' : 'Project workspace name'}
                        value={heroProjectName}
                        onChange={setHeroProjectName}
                      />

                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Switch
                          label={
                            isId ? 'Mode fokus tenang' : 'Calm focus mode'
                          }
                          value={heroCalmMode}
                          onChange={setHeroCalmMode}
                        />
                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="secondary"
                            label={isId ? 'Contoh Halaman' : 'See Templates'}
                            onClick={() => setActiveTab('templates')}
                          />
                          <Button
                            variant="primary"
                            label={
                              heroStage === 'ship'
                                ? isId
                                  ? 'Terbitkan sekarang'
                                  : 'Publish now'
                                : isId
                                  ? 'Simpan draf'
                                  : 'Save draft'
                            }
                            onClick={() =>
                              showToast({
                                type: 'info',
                                body: isId
                                  ? `Tersimpan di pratinjau "${heroProjectName}".`
                                  : `Saved in "${heroProjectName}" preview.`,
                              })
                            }
                          />
                        </HStack>
                      </HStack>
                    </Stack>
                  </div>
                </Grid>
              </section>

              {/* Beat 2 (Compact 2x6 Theme Strip) & Beat 3 (Why Mehan Exists + 6-Stage Story) */}
              <OverviewManifesto
                lang={lang}
                mode={mode}
                dna={dna}
                themeState={themeState}
                builtInPresets={builtInPresets}
                onApplyPreset={preset => {
                  setThemeState(preset.state);
                }}
                onOpenEditor={() => setEditorOpen(true)}
              />

              {/* Beat 4: Concise Tabbed 60-Second Quickstart */}
              <Card elevation="low">
                <Stack gap={3}>
                  <Stack gap={1}>
                    <HStack gap={2} vAlign="center" wrap="wrap">
                      <Badge
                        variant="teal"
                        label={
                          isId
                            ? `Tema Aktif · ${atmosphereName} × ${accentName}`
                            : `Active Theme · ${atmosphereName} × ${accentName}`
                        }
                      />
                    </HStack>
                    <Heading level={2}>{copy.overview.installTitle}</Heading>
                    <Text color="secondary">{copy.overview.installSub}</Text>
                  </Stack>

                  <TabList
                    role="tablist"
                    aria-label="Quickstart stack"
                    value={quickstartTab}
                    onChange={setQuickstartTab}
                    overflow="auto"
                  >
                    <Tab value="ai" label={copy.overview.cardAiTitle} />
                    <Tab value="react" label={copy.overview.cardReactTitle} />
                    <Tab value="html" label={copy.overview.cardHtmlTitle} />
                  </TabList>

                  {quickstartTab === 'ai' && (
                    <div className="mh-quickstart-body">
                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
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
                      </HStack>
                      <CodeBlock
                        code={
                          aiKitMarkdown.slice(0, 760) +
                          '\n/* ...full kit copied via button above */'
                        }
                        language="markdown"
                        title={`MEHAN-AI-PROTOTYPE-KIT.md (${atmosphereName} · ${accentName})`}
                        hasCopyButton
                        maxHeight={180}
                      />
                    </div>
                  )}

                  {quickstartTab === 'react' && (
                    <div className="mh-quickstart-body">
                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
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

                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="primary"
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
                            variant="secondary"
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
                          maxHeight={200}
                        />
                        <CodeBlock
                          code={reactSnippets.tsxCode}
                          language="tsx"
                          title="src/App.tsx"
                          hasCopyButton
                          hasLineNumbers
                          maxHeight={200}
                        />
                      </Grid>
                    </div>
                  )}

                  {quickstartTab === 'html' && (
                    <div className="mh-quickstart-body">
                      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                        <Text color="secondary">{copy.overview.cardHtmlDesc}</Text>
                        <HStack gap={2} wrap="wrap">
                          <Button
                            variant="primary"
                            size="sm"
                            label={copy.overview.cardHtmlCssBtn}
                            icon={<Copy size={14} />}
                            onClick={() => void handleCopyPortableCss()}
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            label={copy.overview.cardHtmlCdnBtn}
                            icon={<Download size={14} />}
                            onClick={handleDownloadStarterHtml}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            label={isId ? 'Token Figma W3C' : 'Figma W3C tokens'}
                            icon={<Download size={14} />}
                            onClick={handleDownloadW3cTokens}
                          />
                        </HStack>
                      </HStack>
                      <CodeBlock
                        code={`<html lang="${lang}" data-theme="${mode}" data-motion="${seed.motion}">\n  <link rel="stylesheet" href="./mehan-portable.css" />\n  <body class="mh-container">\n    <section class="mh-card mh-stack">\n      <h1 class="mh-h1">${atmosphereName} · ${accentName}</h1>\n      <button type="button" class="mh-btn mh-btn-primary">Ship tactile UI</button>\n    </section>\n    <script src="./mehan-portable.js"></script>\n  </body>\n</html>`}
                        language="html"
                        title="index.html (Vanilla HTML / Vue / Svelte / Astro)"
                        hasCopyButton
                        maxHeight={180}
                      />
                    </div>
                  )}
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

      {/* Tools-Factory-Style Info & Creator Modal */}
      <StudioInfoDialog
        isOpen={infoOpen}
        onOpenChange={setInfoOpen}
        tab={infoTab}
        onTabChange={setInfoTab}
        lang={lang}
      />

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
