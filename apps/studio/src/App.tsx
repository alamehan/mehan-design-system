import React, {useEffect, useMemo, useState} from 'react';
import {
  AlertDialog,
  Badge,
  Button,
  Card,
  CodeBlock,
  Divider,
  Grid,
  Heading,
  IconButton,
  LayerProvider,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Tab,
  TabList,
  Text,
  useToast,
} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {ColorSwatch} from '@mehan/astryx';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  contrastRatio,
  resolveMehanDna,
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
  Moon,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
} from 'lucide-react';
import {ComponentsCatalogView} from './catalog/ComponentsCatalogView';
import {STUDIO_COPY} from './i18n';
import {MaintainView} from './MaintainView';
import {
  buildAgentSetupPrompt,
  buildReactInstallSnippet,
  copyText,
  downloadTextFile,
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

const PRESET_ACCENT_LIST = Object.values(MEHAN_ACCENT_PRESETS);

interface StudioInnerProps {
  lang: StudioLang;
  setLang: (lang: StudioLang) => void;
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  editorOpen: boolean;
  setEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  themeState: FullThemeEditorState;
  setThemeState: React.Dispatch<React.SetStateAction<FullThemeEditorState>>;
  effectiveTokens: Record<string, string>;
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
  effectiveTokens,
  presets,
  setPresets,
}: StudioInnerProps) {
  const showToast = useToast();
  const copy = STUDIO_COPY[lang];
  const isId = lang === 'id';

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sourceMode, setSourceMode] = useState<InstallSourceMode>('local');
  const [cssMode, setCssMode] = useState<InstallCssMode>('plain');
  const [confirmOpen, setConfirmOpen] = useState(false);

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
      {/* Sticky Top Bar */}
      <header className="studio-topbar">
        <div className="studio-topbar-inner">
          <div className="studio-brand">
            <div className="studio-logo-badge" aria-hidden="true">
              m
            </div>
            <span className="studio-wordmark">mehan</span>
            <Badge variant="neutral" label="v1.0.0" />
            <button
              type="button"
              className="studio-active-theme-pill"
              onClick={() => setEditorOpen(prev => !prev)}
              title={copy.nav.customize}
            >
              <span
                className="studio-pill-dot"
                style={{backgroundColor: dna.accent.accentLight}}
              />
              <span>
                {atmosphereName} · {accentName}
              </span>
            </button>
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
                  gap={5}
                  align="center"
                >
                  <Stack gap={3}>
                    <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                      <Badge variant="info" label={copy.overview.eyebrow} />
                      <Badge
                        variant="success"
                        label={`WCAG AA · ${accentTextContrast}:1`}
                      />
                    </Stack>
                    <Heading level={1}>{copy.overview.heroTitle}</Heading>
                    <Text color="secondary">{copy.overview.heroDesc}</Text>
                    <Stack direction="horizontal" gap={2} wrap="wrap">
                      <Button
                        variant="primary"
                        label={copy.overview.ctaCustomize}
                        icon={<SlidersHorizontal size={15} />}
                        onClick={() => setEditorOpen(true)}
                      />
                      <Button
                        variant="secondary"
                        label={copy.overview.ctaCopyAiKit}
                        icon={<Sparkles size={15} />}
                        onClick={() => void handleCopyAiKit()}
                      />
                      <Button
                        variant="ghost"
                        label={copy.overview.ctaExploreComponents}
                        onClick={() => setActiveTab('components')}
                      />
                    </Stack>
                  </Stack>

                  {/* Live Tactile Specimen right inside Hero */}
                  <div className="studio-tray-panel">
                    <Stack gap={3}>
                      <Stack
                        direction="horizontal"
                        justify="between"
                        align="center"
                        wrap="wrap"
                        gap={2}
                      >
                        <Text weight="semibold">
                          {isId ? 'Pratinjau Taktil Langsung' : 'Live Tactile Specimen'}
                        </Text>
                        <Stack direction="horizontal" gap={1.5}>
                          {PRESET_ACCENT_LIST.map(preset => (
                            <ColorSwatch
                              key={preset.id}
                              size="sm"
                              color={preset.seed}
                              label={`${preset.name} accent`}
                              isSelected={seed.accent === preset.id}
                              onSelect={() =>
                                setThemeState(prev => ({
                                  ...prev,
                                  seed: {...prev.seed, accent: preset.id},
                                }))
                              }
                            />
                          ))}
                        </Stack>
                      </Stack>

                      <SegmentedControl
                        label="Atmosphere quick switch"
                        size="sm"
                        value={seed.atmosphere}
                        onChange={val =>
                          setThemeState(prev => ({
                            ...prev,
                            seed: {
                              ...prev.seed,
                              atmosphere: val as typeof prev.seed.atmosphere,
                            },
                          }))
                        }
                      >
                        <SegmentedControlItem
                          value="confectionery"
                          label="Confectionery"
                        />
                        <SegmentedControlItem value="porcelain" label="Porcelain" />
                        <SegmentedControlItem value="stone" label="Stone" />
                      </SegmentedControl>

                      <SegmentedControl
                        label="Segmented active pill quick switch"
                        size="sm"
                        value={seed.segmentedStyle}
                        onChange={val =>
                          setThemeState(prev => ({
                            ...prev,
                            seed: {
                              ...prev.seed,
                              segmentedStyle:
                                val as typeof prev.seed.segmentedStyle,
                            },
                          }))
                        }
                      >
                        <SegmentedControlItem
                          value="raised"
                          label="Raised Ceramic"
                        />
                        <SegmentedControlItem
                          value="espresso"
                          label="Espresso Ink (Shotcandy)"
                        />
                      </SegmentedControl>

                      <Stack direction="horizontal" gap={2} wrap="wrap">
                        <Button
                          variant="primary"
                          label={isId ? 'Simpan perubahan' : 'Save changes'}
                        />
                        <Button
                          variant="secondary"
                          label={
                            isId ? 'Lihat Theme Showcase' : 'Open Theme Showcase'
                          }
                          onClick={() => setActiveTab('templates')}
                        />
                        <Button
                          variant="destructive"
                          label={isId ? 'Hapus item' : 'Delete item'}
                          onClick={() => setConfirmOpen(true)}
                        />
                      </Stack>
                    </Stack>
                  </div>
                </Grid>
              </section>

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

              {/* 3 Practical Start / Install Paths */}
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack
                    direction="horizontal"
                    justify="between"
                    align="center"
                    wrap="wrap"
                    gap={3}
                  >
                    <Stack gap={1}>
                      <Heading level={2}>{copy.overview.installTitle}</Heading>
                      <Text color="secondary">{copy.overview.installSub}</Text>
                    </Stack>

                    <Stack direction="horizontal" gap={2} wrap="wrap">
                      <SegmentedControl
                        label="Package source"
                        size="sm"
                        value={sourceMode}
                        onChange={v => setSourceMode(v as InstallSourceMode)}
                      >
                        <SegmentedControlItem
                          value="local"
                          label={copy.overview.sourceLocal}
                        />
                        <SegmentedControlItem
                          value="npm"
                          label={copy.overview.sourceNpm}
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
                    </Stack>
                  </Stack>

                  <Grid columns={{minWidth: 280, max: 3, repeat: 'fit'}} gap={3}>
                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="pink" label={copy.overview.cardAiBadge} />
                        <Heading level={4}>{copy.overview.cardAiTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardAiDesc}</Text>
                        <Stack direction="horizontal" gap={2} wrap="wrap">
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
                        </Stack>
                      </Stack>
                    </div>

                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="blue" label={copy.overview.cardReactBadge} />
                        <Heading level={4}>{copy.overview.cardReactTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardReactDesc}</Text>
                        <Stack direction="horizontal" gap={2} wrap="wrap">
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
                                  ? 'Prompt Setup untuk AI Agent berhasil disalin!'
                                  : 'Copied Agent Setup Prompt to clipboard!',
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
                                  ? 'Perintah instalasi disalin.'
                                  : 'Copied CLI install command.',
                              });
                            }}
                          />
                        </Stack>
                      </Stack>
                    </div>

                    <div className="studio-tray-panel">
                      <Stack gap={2}>
                        <Badge variant="teal" label={copy.overview.cardHtmlBadge} />
                        <Heading level={4}>{copy.overview.cardHtmlTitle}</Heading>
                        <Text color="secondary">{copy.overview.cardHtmlDesc}</Text>
                        <Stack direction="horizontal" gap={2} wrap="wrap">
                          <Button
                            variant="secondary"
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
                        </Stack>
                      </Stack>
                    </div>
                  </Grid>

                  <Divider />

                  <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={3}>
                    <CodeBlock
                      code={`${reactSnippets.installCmd}\n\n${reactSnippets.cssCode}`}
                      language="bash"
                      title={
                        cssMode === 'tailwind'
                          ? 'Terminal + src/mehan.css (Tailwind v4 Bridge)'
                          : 'Terminal + src/mehan.css'
                      }
                      hasCopyButton
                      maxHeight={240}
                    />
                    <CodeBlock
                      code={reactSnippets.tsxCode}
                      language="tsx"
                      title="src/App.tsx"
                      hasCopyButton
                      hasLineNumbers
                      maxHeight={240}
                    />
                  </Grid>
                </Stack>
              </Card>
            </Stack>
          )}

          {activeTab === 'components' && (
            <ComponentsCatalogView lang={lang} copy={copy} />
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
          effectiveTokens={effectiveTokens}
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
    </div>
  );
}

export function App() {
  const initial = useMemo(() => loadPersistedStudioState(), []);
  const [lang, setLang] = useState<StudioLang>(initial.lang);
  const [mode, setMode] = useState<'light' | 'dark'>(initial.mode);
  const [editorOpen, setEditorOpen] = useState<boolean>(initial.editorOpen);
  const [themeState, setThemeState] = useState<FullThemeEditorState>(
    initial.themeState,
  );
  const [presets, setPresets] = useState<NamedStudioPreset[]>(initial.presets);

  useEffect(() => {
    savePersistedStudioState({lang, mode, editorOpen, themeState, presets});
  }, [lang, mode, editorOpen, themeState, presets]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [lang, mode]);

  const {theme: liveTheme, effectiveTokens} = useMemo(
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
          setThemeState={setThemeState}
          effectiveTokens={effectiveTokens}
          presets={presets}
          setPresets={setPresets}
        />
      </LayerProvider>
    </Theme>
  );
}
