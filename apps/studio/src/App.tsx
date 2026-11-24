import React, {useEffect, useMemo, useState} from 'react';
import {
  AlertDialog,
  Badge,
  Banner,
  Button,
  Card,
  CheckboxInput,
  CodeBlock,
  Collapsible,
  Dialog,
  DialogHeader,
  Divider,
  EmptyState,
  Grid,
  Heading,
  IconButton,
  Kbd,
  LayerProvider,
  NumberInput,
  Popover,
  ProgressBar,
  RadioList,
  RadioListItem,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  Stack,
  Switch,
  Tab,
  TabList,
  Table,
  Text,
  TextArea,
  TextInput,
  ToggleButton,
  proportional,
  useToast,
} from '@astryxdesign/core';
import {Theme} from '@astryxdesign/core/theme';
import {
  ColorPicker,
  ColorSwatch,
  MetricCard,
  PrecisionSlider,
} from '@mehan/astryx';
import {
  MEHAN_ACCENT_PRESETS,
  MEHAN_ATMOSPHERES,
  contrastRatio,
  createMehanTheme,
  resolveMehanDna,
} from '@mehan/astryx/dna';
import {
  MEHAN_PORTABLE_RUNTIME_JS,
  generateAiPrototypeKit,
  generatePortableCss,
} from '@mehan/portable';
import {
  Activity,
  ArrowRight,
  Bookmark,
  Boxes,
  Copy,
  Download,
  Inbox,
  Layers,
  Moon,
  Palette,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
  Trash2,
  Zap,
} from 'lucide-react';
import {CustomizeDrawer} from './CustomizeDrawer';
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
  type StudioConfig,
  type StudioLang,
} from './studioState';
import {UxCopyView} from './UxCopyView';

const PRESET_ACCENT_LIST = Object.values(MEHAN_ACCENT_PRESETS);
const PRESET_HEX_SWATCHES = PRESET_ACCENT_LIST.map(p => p.seed);

const BACKDROP_PRESETS = [
  {
    id: 'berry-cream',
    label: 'Strawberry Cream',
    swatch: '#e0366b',
    gradient: 'linear-gradient(135deg, #ff7597 0%, #d42a5f 52%, #7a1236 100%)',
  },
  {
    id: 'cobalt-sky',
    label: 'Porcelain Cobalt',
    swatch: '#2563eb',
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 52%, #1e3a8a 100%)',
  },
  {
    id: 'mint-jade',
    label: 'Mint Glaze',
    swatch: '#0d9468',
    gradient: 'linear-gradient(135deg, #6ee7b7 0%, #0d9468 55%, #064e3b 100%)',
  },
  {
    id: 'amber-honey',
    label: 'Tangerine Zest',
    swatch: '#ea580c',
    gradient: 'linear-gradient(135deg, #fdba74 0%, #ea580c 54%, #7c2d12 100%)',
  },
  {
    id: 'plum-velvet',
    label: 'Grape Velvet',
    swatch: '#7c3aed',
    gradient: 'linear-gradient(135deg, #c4b5fd 0%, #7c3aed 54%, #3b0764 100%)',
  },
] as const;

interface StudioInnerProps {
  lang: StudioLang;
  setLang: (lang: StudioLang) => void;
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  config: StudioConfig;
  setConfig: React.Dispatch<React.SetStateAction<StudioConfig>>;
  presets: NamedStudioPreset[];
  setPresets: React.Dispatch<React.SetStateAction<NamedStudioPreset[]>>;
}

function StudioInner({
  lang,
  setLang,
  mode,
  setMode,
  config,
  setConfig,
  presets,
  setPresets,
}: StudioInnerProps) {
  const showToast = useToast();
  const copy = STUDIO_COPY[lang];
  const isId = lang === 'id';

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Overview install toggles
  const [sourceMode, setSourceMode] = useState<InstallSourceMode>('local');
  const [cssMode, setCssMode] = useState<InstallCssMode>('plain');

  // Component gallery states
  const [compFilter, setCompFilter] = useState<string>('all');
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [workspaceName, setWorkspaceName] = useState('Confectionery Studio');
  const [seatCount, setSeatCount] = useState<number>(12);
  const [environmentRole, setEnvironmentRole] = useState('Production');
  const [releaseNotes, setReleaseNotes] = useState(
    'Silky perceptual button lips, zero-border wells, and WCAG AA contrast.',
  );
  const [nestedNote, setNestedNote] = useState('Own-fill contrast reset');
  const [springTension, setSpringTension] = useState(72);
  const [stereoPan, setStereoPan] = useState(14);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [aaGateLocked, setAaGateLocked] = useState(true);
  const [exportFormat, setExportFormat] = useState('png');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Patterns states
  const [patternView, setPatternView] = useState<string>('dashboard');
  const [deployFilter, setDeployFilter] = useState<string>('all');
  const [deployQuery, setDeployQuery] = useState<string>('');
  const [orgName, setOrgName] = useState('Mehan Labs');
  const [billingEmail, setBillingEmail] = useState('ops@mehan.design');
  const [webhookSecret, setWebhookSecret] = useState('whsec_94fa82c10e');
  const [shotPadding, setShotPadding] = useState(36);
  const [shotRadius, setShotRadius] = useState(18);
  const [shotTilt, setShotTilt] = useState(-4);
  const [backdropId, setBackdropId] = useState<string>('berry-cream');

  const dna = useMemo(
    () =>
      resolveMehanDna({
        name: `mehan-${config.atmosphere}`,
        atmosphere: config.atmosphere,
        accent: config.accent,
        depth: config.depth,
        radiusScale: config.radiusScale,
        density: config.density,
        motion: config.motion,
      }),
    [config],
  );

  const atmosphereName = MEHAN_ATMOSPHERES[config.atmosphere].name;
  const accentName = dna.accent.name;

  const inkContrast = useMemo(() => {
    const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
    return contrastRatio(S.ink, S.paper).toFixed(1);
  }, [dna, mode]);

  const buttonContrast = useMemo(
    () =>
      contrastRatio(dna.accent.onAccentLight, dna.accent.accentLight).toFixed(2),
    [dna],
  );

  const accentTextContrast = useMemo(() => {
    const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
    const text = mode === 'light' ? dna.accent.textLight : dna.accent.textDark;
    return contrastRatio(text, S.surface).toFixed(2);
  }, [dna, mode]);

  const aiKitMarkdown = useMemo(
    () =>
      generateAiPrototypeKit({
        atmosphere: config.atmosphere,
        accent: config.accent,
        depth: config.depth,
        radiusScale: config.radiusScale,
        density: config.density,
        motion: config.motion,
      }),
    [config],
  );

  const reactSnippets = useMemo(
    () => buildReactInstallSnippet(config, sourceMode, cssMode, mode),
    [config, sourceMode, cssMode, mode],
  );

  const agentSetupPrompt = useMemo(
    () => buildAgentSetupPrompt(config, sourceMode, cssMode),
    [config, sourceMode, cssMode],
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
    const css = generatePortableCss({
      name: `mehan-${config.atmosphere}`,
      atmosphere: config.atmosphere,
      accent: config.accent,
      depth: config.depth,
      radiusScale: config.radiusScale,
      density: config.density,
      motion: config.motion,
    });
    const html = `<!doctype html>
<html lang="${lang}" data-theme="${mode}" data-density="${config.density}" data-motion="${config.motion}">
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
    downloadTextFile(`mehan-${config.atmosphere}-starter.html`, html, 'text/html');
    showToast({
      type: 'info',
      body: `Downloaded mehan-${config.atmosphere}-starter.html`,
    });
  };

  const handleCopyPortableCss = async () => {
    const css = generatePortableCss({
      name: `mehan-${config.atmosphere}`,
      atmosphere: config.atmosphere,
      accent: config.accent,
      depth: config.depth,
      radiusScale: config.radiusScale,
      density: config.density,
      motion: config.motion,
    });
    await copyText(css);
    showToast({
      type: 'info',
      body: isId
        ? 'mehan-portable.css berhasil disalin.'
        : 'Copied standalone mehan-portable.css.',
    });
  };

  const deploymentRows = useMemo(() => {
    const all = [
      {
        id: 'dep-1',
        service: 'Design Token API',
        env: 'Production',
        latency: '18 ms',
        status: 'Healthy',
        variant: 'success' as const,
      },
      {
        id: 'dep-2',
        service: 'Billing Checkout UI',
        env: 'Production',
        latency: '24 ms',
        status: 'Healthy',
        variant: 'success' as const,
      },
      {
        id: 'dep-3',
        service: 'Preview Sandbox',
        env: 'Staging',
        latency: '41 ms',
        status: 'Syncing',
        variant: 'info' as const,
      },
      {
        id: 'dep-4',
        service: 'Webhook Dispatcher',
        env: 'Production',
        latency: '112 ms',
        status: 'Review',
        variant: 'warning' as const,
      },
      {
        id: 'dep-5',
        service: 'Portable Asset Packager',
        env: 'Staging',
        latency: '15 ms',
        status: 'Healthy',
        variant: 'success' as const,
      },
    ];
    return all.filter(item => {
      if (deployFilter === 'prod' && item.env !== 'Production') return false;
      if (deployFilter === 'staging' && item.env !== 'Staging') return false;
      if (
        deployQuery.trim() &&
        !item.service.toLowerCase().includes(deployQuery.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [deployFilter, deployQuery]);

  const activeBackdrop =
    BACKDROP_PRESETS.find(b => b.id === backdropId) ?? BACKDROP_PRESETS[0];

  const showSection = (id: string) => compFilter === 'all' || compFilter === id;

  return (
    <div className="studio-shell">
      {/* Clean 1-Line Top Bar (Living proof of Simple First, Power on Demand) */}
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
              onClick={() => setDrawerOpen(true)}
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
              <Tab value="ux" label={copy.nav.uxCopy} />
              <Tab value="patterns" label={copy.nav.patterns} />
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
              variant="primary"
              size="sm"
              label={copy.nav.customize}
              icon={<SlidersHorizontal size={14} />}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </div>
      </header>

      <main className="studio-main">
        {/* ============================================================
            TAB 1: OVERVIEW (Understandable in 30s + 3 Install Paths)
           ============================================================ */}
        {activeTab === 'overview' && (
          <Stack gap={5}>
            <section className="studio-hero">
              <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={5} align="center">
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
                      onClick={() => setDrawerOpen(true)}
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

                {/* Live Interactive Tactile Specimen right inside Hero */}
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
                            isSelected={config.accent === preset.id}
                            onSelect={() =>
                              setConfig(prev => ({...prev, accent: preset.id}))
                            }
                          />
                        ))}
                      </Stack>
                    </Stack>

                    <SegmentedControl
                      label="Atmosphere quick switch"
                      size="sm"
                      value={config.atmosphere}
                      onChange={val =>
                        setConfig(prev => ({
                          ...prev,
                          atmosphere: val as StudioConfig['atmosphere'],
                        }))
                      }
                    >
                      <SegmentedControlItem value="confectionery" label="Confectionery" />
                      <SegmentedControlItem value="porcelain" label="Porcelain" />
                      <SegmentedControlItem value="stone" label="Stone" />
                    </SegmentedControl>

                    <Stack direction="horizontal" gap={2} wrap="wrap">
                      <Button
                        variant="primary"
                        label={isId ? 'Simpan perubahan' : 'Save changes'}
                      />
                      <Button
                        variant="secondary"
                        label={isId ? 'Ekspor' : 'Export'}
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
                  {/* Path 1: AI Chat Prototype */}
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

                  {/* Path 2: React / Next.js / Vite */}
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

                  {/* Path 3: Vanilla / Vue / Svelte */}
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

        {/* ============================================================
            TAB 2: COMPONENTS (sdk-preview-Grade Interactive Specimens)
           ============================================================ */}
        {activeTab === 'components' && (
          <Stack gap={4}>
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              wrap="wrap"
              gap={3}
            >
              <Stack gap={1}>
                <Heading level={2}>{copy.components.title}</Heading>
                <Text color="secondary">{copy.components.subtitle}</Text>
              </Stack>

              <SegmentedControl
                label="Component category"
                size="sm"
                value={compFilter}
                onChange={setCompFilter}
              >
                <SegmentedControlItem value="all" label={copy.components.filterAll} />
                <SegmentedControlItem
                  value="actions"
                  label={copy.components.filterActions}
                />
                <SegmentedControlItem
                  value="inputs"
                  label={copy.components.filterInputs}
                />
                <SegmentedControlItem
                  value="precision"
                  label={copy.components.filterPrecision}
                />
                <SegmentedControlItem
                  value="surfaces"
                  label={copy.components.filterSurfaces}
                />
                <SegmentedControlItem
                  value="feedback"
                  label={copy.components.filterFeedback}
                />
              </SegmentedControl>
            </Stack>

            {showSection('actions') && (
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>
                      {isId
                        ? 'Tombol Taktil Mulus (Perceptual OKLCH Lip & Soft Danger)'
                        : 'Silky Tactile Push Buttons (Perceptual Lip & Soft Danger)'}
                    </Heading>
                    <Text color="secondary">
                      {isId
                        ? 'Gradasi halus 3-titik, bibir bawah 1-tingkat lebih gelap tanpa garis kasar, kompensasi optik tengah vertikal, dan varian bahaya lembut.'
                        : 'Smooth 3-stop gradient, 1-shade-darker perceptual lip without harsh cliffs, optical face centering, and soft-tactile destructive treatment.'}
                    </Text>
                  </Stack>

                  <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                    <Button
                      variant="primary"
                      label={isId ? 'Simpan perubahan' : 'Save changes'}
                      icon={<Zap size={15} />}
                      onClick={() =>
                        showToast({
                          type: 'info',
                          body: isId ? 'Perubahan disimpan.' : 'Changes saved.',
                        })
                      }
                    />
                    <Button
                      variant="secondary"
                      label={isId ? 'Ekspor paket' : 'Export bundle'}
                    />
                    <Button
                      variant="destructive"
                      label={isId ? 'Hapus item' : 'Delete item'}
                      icon={<Trash2 size={14} />}
                      onClick={() => setConfirmOpen(true)}
                    />
                    <Button variant="ghost" label={isId ? 'Batal' : 'Cancel'} />
                    <Button
                      variant="secondary"
                      isLoading
                      label={isId ? 'Menyimpan...' : 'Saving...'}
                    />
                    <Button
                      variant="primary"
                      isDisabled
                      label={isId ? 'Nonaktif' : 'Disabled'}
                    />
                  </Stack>

                  <Divider />

                  <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                    <Button variant="secondary" size="sm" label="Small (sm)" />
                    <Button variant="secondary" size="md" label="Medium (md)" />
                    <Button variant="secondary" size="lg" label="Large (lg)" />
                    <ToggleButton
                      label={isId ? 'Tandai favorit' : 'Bookmark'}
                      icon={<Bookmark size={14} />}
                      isPressed={isBookmarked}
                      onPressedChange={setIsBookmarked}
                    />
                    <IconButton
                      variant="secondary"
                      label={isId ? 'Pengaturan tampilan' : 'Display settings'}
                      icon={<Settings2 size={15} />}
                      onClick={() => setDrawerOpen(true)}
                    />
                    <Kbd keys="Shift+Drag" />
                    <Kbd keys="Cmd+K" />
                  </Stack>
                </Stack>
              </Card>
            )}

            {showSection('inputs') && (
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>
                      {isId
                        ? 'Sumur Input Tanpa Garis Patah (Zero-Border Recessed Wells)'
                        : 'Zero-Border Recessed Input Wells'}
                    </Heading>
                    <Text color="secondary">
                      {isId
                        ? 'Seluruh TextInput, NumberInput, Selector, dan TextArea memakai bayangan dalam utuh tanpa celah sudut 1px.'
                        : 'TextInput, NumberInput, Selector, and TextArea share seamless inset well shadows with zero 1px corner seam.'}
                    </Text>
                  </Stack>

                  <Grid columns={{minWidth: 260, max: 3, repeat: 'fit'}} gap={3}>
                    <TextInput
                      label={isId ? 'Nama ruang kerja' : 'Workspace name'}
                      value={workspaceName}
                      onChange={setWorkspaceName}
                      hasClear
                    />
                    <NumberInput
                      label={isId ? 'Kuota kursi tim' : 'Team seat quota'}
                      value={seatCount}
                      min={1}
                      max={500}
                      hasNumberSteppers
                      onChange={setSeatCount}
                    />
                    <Selector
                      label={isId ? 'Lingkungan rilis' : 'Release environment'}
                      options={['Production', 'Staging', 'Development']}
                      value={environmentRole}
                      onChange={setEnvironmentRole}
                    />
                  </Grid>

                  <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3}>
                    <TextInput
                      label={isId ? 'Namespace terverifikasi' : 'Verified package scope'}
                      value="@mehan/astryx"
                      onChange={() => {}}
                      status={{
                        type: 'success',
                        message: isId
                          ? 'Kontras WCAG AA >= 4.5:1 terverifikasi di Light & Dark.'
                          : 'WCAG AA >= 4.5:1 verified across Light & Dark.',
                      }}
                    />
                    <TextArea
                      label={isId ? 'Catatan rilis' : 'Release summary'}
                      rows={2}
                      value={releaseNotes}
                      onChange={setReleaseNotes}
                    />
                  </Grid>
                </Stack>
              </Card>
            )}

            {showSection('precision') && (
              <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4}>
                <Card elevation="low">
                  <Stack gap={4}>
                    <Stack gap={1}>
                      <Heading level={3}>
                        {isId
                          ? 'Kontrol Presisi Khas Mehan'
                          : 'Mehan Signature Precision Controls'}
                      </Heading>
                      <Text color="secondary">
                        {isId
                          ? 'Tahan Shift untuk geser halus 0.25x, titik magnetik otomatis, atau klik angka mono untuk mengetik.'
                          : 'Hold Shift for 0.25x fine drag, snap to magnetic stops, or click the mono value to type directly.'}
                      </Text>
                    </Stack>
                    <PrecisionSlider
                      label={isId ? 'Tegangan pegas' : 'Spring tension'}
                      value={springTension}
                      min={0}
                      max={100}
                      step={1}
                      stops={[25, 50, 75]}
                      unit="%"
                      onChange={setSpringTension}
                    />
                    <PrecisionSlider
                      label={isId ? 'Sudut kemiringan' : 'Stereo pan tilt'}
                      value={stereoPan}
                      min={-45}
                      max={45}
                      step={1}
                      stops={[0]}
                      isCentered
                      unit="°"
                      onChange={setStereoPan}
                    />
                    <Divider />
                    <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                      {PRESET_ACCENT_LIST.map(preset => (
                        <ColorSwatch
                          key={preset.id}
                          color={preset.seed}
                          label={`${preset.name} swatch`}
                          isSelected={config.accent === preset.id}
                          onSelect={() =>
                            setConfig(prev => ({...prev, accent: preset.id}))
                          }
                        />
                      ))}
                      <Popover
                        label="Custom HSV color picker"
                        padding={2}
                        content={
                          <ColorPicker
                            label="Brand seed hex"
                            value={dna.accent.seed}
                            presets={PRESET_HEX_SWATCHES}
                            onChange={hex =>
                              setConfig(prev => ({...prev, accent: hex}))
                            }
                          />
                        }
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          label={isId ? 'Pemilih Warna HSV' : 'HSV ColorPicker'}
                          icon={<Palette size={14} />}
                        />
                      </Popover>
                    </Stack>
                  </Stack>
                </Card>

                <Card elevation="low">
                  <Stack gap={4}>
                    <Stack gap={1}>
                      <Heading level={3}>
                        {isId
                          ? 'Soket Cekung & Kenop Kubah 3D'
                          : 'Recessed Sockets & Spherical 3D Knobs'}
                      </Heading>
                      <Text color="secondary">
                        {isId
                          ? 'Switch, Checkbox, dan Radio berada di dalam soket cekung dengan kenop keramik bercahaya radial.'
                          : 'Switch tracks, checkboxes, and radios sit inside carved sockets with radial-lit ceramic domes.'}
                      </Text>
                    </Stack>
                    <Switch
                      label={
                        isId
                          ? 'Fisika lip-collapse tanpa geser layout'
                          : 'Zero-layout-shift lip-collapse physics'
                      }
                      description={
                        isId
                          ? 'Menjaga tinggi tombol tetap stabil saat ditekan'
                          : 'Preserves exact control box height during :active press'
                      }
                      value={hapticsEnabled}
                      onChange={setHapticsEnabled}
                    />
                    <CheckboxInput
                      label={
                        isId
                          ? 'Kunci batas kontras minimum WCAG AA (>= 4.5:1)'
                          : 'Enforce WCAG AA minimum contrast (>= 4.5:1)'
                      }
                      value={aaGateLocked}
                      onChange={v => setAaGateLocked(Boolean(v))}
                    />
                    <RadioList
                      label={isId ? 'Format ekspor aset' : 'Asset export format'}
                      orientation="horizontal"
                      value={exportFormat}
                      onChange={setExportFormat}
                    >
                      <RadioListItem value="png" label="PNG 2x" />
                      <RadioListItem value="svg" label="SVG Vector" />
                      <RadioListItem value="w3c" label="W3C JSON" />
                    </RadioList>
                  </Stack>
                </Card>
              </Grid>
            )}

            {showSection('surfaces') && (
              <Stack gap={4}>
                <Grid columns={{minWidth: 220, max: 4, repeat: 'fit'}} gap={3}>
                  <MetricCard
                    label={isId ? 'Target Tema Astryx' : 'Styled Theme Targets'}
                    value="73"
                    delta={{value: '100% Core families', direction: 'up', sentiment: 'positive'}}
                    caption={isId ? 'Termasuk 14 komponen turunan' : 'Includes all sibling popups & cells'}
                    icon={<Layers size={16} />}
                  />
                  <MetricCard
                    label={isId ? 'Pasangan Kontras Lolos' : 'Verified Contrast Pairs'}
                    value="100%"
                    delta={{value: '>= 4.5:1 AA', direction: 'up', sentiment: 'positive'}}
                    caption={isId ? 'Otomatis di Light & Dark' : 'Solved in Light & Dark modes'}
                    icon={<ShieldCheck size={16} />}
                  />
                  <MetricCard
                    label={isId ? 'Ukuran Portable CSS' : 'Portable CSS Payload'}
                    value="6.4 KB"
                    delta={{value: '0 dependencies', direction: 'flat', sentiment: 'neutral'}}
                    caption={isId ? 'Siap tempel ke Claude/Gemini' : 'Ready for single-HTML AI kits'}
                    icon={<Boxes size={16} />}
                  />
                  <MetricCard
                    label={isId ? 'Latensi Ganti Tema' : 'Theme Switch Latency'}
                    value="< 2 ms"
                    delta={{value: 'CSS light-dark()', direction: 'up', sentiment: 'positive'}}
                    caption={isId ? 'Tanpa kompilasi ulang JS' : 'Zero runtime style recalculation'}
                    icon={<Activity size={16} />}
                  />
                </Grid>

                <Card elevation="low">
                  <Stack gap={3}>
                    <Heading level={3}>
                      {isId
                        ? 'Kartu Pastel Hangat & Perlindungan Kontras 46 Permukaan Bersarang'
                        : 'Warm Pastel Cards & 46-Surface Nested Contrast Protection'}
                    </Heading>
                    <Grid columns={{minWidth: 220, max: 4, repeat: 'fit'}} gap={3}>
                      <Card variant="pink">
                        <Stack gap={2}>
                          <Heading level={4}>Strawberry Glaze</Heading>
                          <Text color="secondary">
                            {isId
                              ? 'Teks tetap tajam di atas kartu pastel baik di mode Terang maupun Gelap.'
                              : 'Dark cocoa ink stays crisp on pastel berry cards in both Light and Dark mode.'}
                          </Text>
                        </Stack>
                      </Card>
                      <Card variant="blue">
                        <Stack gap={2}>
                          <Heading level={4}>Porcelain Cobalt</Heading>
                          <TextInput
                            label={isId ? 'Input bersarang' : 'Nested input'}
                            value={nestedNote}
                            onChange={setNestedNote}
                          />
                        </Stack>
                      </Card>
                      <Card variant="green">
                        <Stack gap={2}>
                          <Heading level={4}>Mint Patisserie</Heading>
                          <Stack direction="horizontal" gap={1.5} wrap="wrap">
                            <Badge variant="success" label="Verified" />
                            <Badge variant="info" label="OKLCH" />
                          </Stack>
                        </Stack>
                      </Card>
                      <Card variant="yellow">
                        <Stack gap={2}>
                          <Heading level={4}>Honey Custard</Heading>
                          <Button
                            variant="secondary"
                            size="sm"
                            label={isId ? 'Aksi Bersarang' : 'Nested Action'}
                          />
                        </Stack>
                      </Card>
                    </Grid>
                  </Stack>
                </Card>
              </Stack>
            )}

            {showSection('feedback') && (
              <Card elevation="low">
                <Stack gap={4}>
                  <Heading level={3}>
                    {isId
                      ? 'Banner Status, Bar Progres, Modal & Konfirmasi Hapus'
                      : 'Status Banners, Progress, Modal & AlertDialog'}
                  </Heading>
                  <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3}>
                    <Banner
                      status="success"
                      container="card"
                      title={isId ? '6 gerbang kualitas lolos' : 'All 6 quality gates passed'}
                      description={
                        isId
                          ? '0 error TypeScript, 0 warning Astryx strict, dan 0 pelanggaran kontras axe.'
                          : 'Zero TypeScript errors, zero strict Astryx warnings, and zero axe contrast issues.'
                      }
                    />
                    <Banner
                      status="warning"
                      container="card"
                      title={isId ? 'Kunci versi terjaga' : 'Version lock active'}
                      description={
                        isId
                          ? '@astryxdesign/core dikunci pada ~0.7.17 agar pembaruan mayor tidak pernah merusak aplikasi.'
                          : '@astryxdesign/core is locked to ~0.7.17 so upstream breaking changes never surprise apps.'
                      }
                    />
                  </Grid>
                  <ProgressBar
                    label={isId ? 'Kelengkapan audit kontras permukaan' : 'Surface contrast audit coverage'}
                    value={100}
                    max={100}
                    hasValueLabel
                  />
                  <Stack direction="horizontal" gap={2} wrap="wrap">
                    <Button
                      variant="secondary"
                      label={isId ? 'Buka Dialog Modal' : 'Open Modal Dialog'}
                      onClick={() => setDialogOpen(true)}
                    />
                    <Button
                      variant="destructive"
                      label={isId ? 'Uji Konfirmasi Hapus...' : 'Test Destructive Confirm...'}
                      onClick={() => setConfirmOpen(true)}
                    />
                  </Stack>
                </Stack>
              </Card>
            )}
          </Stack>
        )}

        {/* ============================================================
            TAB 3: UX & COPY (Visual Do vs. Don't Rulebook)
           ============================================================ */}
        {activeTab === 'ux' && (
          <UxCopyView
            lang={lang}
            copy={copy}
            onOpenConfirmDemo={() => setConfirmOpen(true)}
          />
        )}

        {/* ============================================================
            TAB 4: PATTERNS (3 Production Page Archetypes)
           ============================================================ */}
        {activeTab === 'patterns' && (
          <Stack gap={4}>
            <Stack
              direction="horizontal"
              justify="between"
              align="center"
              wrap="wrap"
              gap={3}
            >
              <Stack gap={1}>
                <Heading level={2}>{copy.patterns.title}</Heading>
                <Text color="secondary">{copy.patterns.subtitle}</Text>
              </Stack>

              <SegmentedControl
                label="Page pattern archetype"
                size="sm"
                value={patternView}
                onChange={setPatternView}
              >
                <SegmentedControlItem
                  value="dashboard"
                  label={copy.patterns.tabDashboard}
                />
                <SegmentedControlItem
                  value="settings"
                  label={copy.patterns.tabSettings}
                />
                <SegmentedControlItem
                  value="canvas"
                  label={copy.patterns.tabCanvas}
                />
              </SegmentedControl>
            </Stack>

            {patternView === 'dashboard' && (
              <Stack gap={4}>
                <Grid columns={{minWidth: 220, max: 4, repeat: 'fit'}} gap={3}>
                  <MetricCard
                    label={isId ? 'Layanan Aktif' : 'Active Services'}
                    value="24"
                    delta={{value: '+3 minggu ini', direction: 'up', sentiment: 'positive'}}
                    caption="99.98% uptime"
                  />
                  <MetricCard
                    label={isId ? 'Rata-rata Latensi' : 'Median Latency'}
                    value="21 ms"
                    delta={{value: '-6 ms', direction: 'up', sentiment: 'positive'}}
                    caption="ap-southeast-1"
                  />
                  <MetricCard
                    label={isId ? 'Rilis Hari Ini' : 'Deploys Today'}
                    value="14"
                    delta={{value: '0 rollback', direction: 'flat', sentiment: 'neutral'}}
                    caption="CI gate green"
                  />
                  <MetricCard
                    label={isId ? 'Skor Aksesibilitas' : 'Accessibility Score'}
                    value="100%"
                    delta={{value: 'WCAG 2.2 AA', direction: 'up', sentiment: 'positive'}}
                    caption="Automated axe audit"
                  />
                </Grid>

                <Card elevation="low">
                  <Stack gap={3}>
                    <Stack
                      direction="horizontal"
                      justify="between"
                      align="center"
                      wrap="wrap"
                      gap={2}
                    >
                      <Heading level={3}>
                        {isId ? 'Status Layanan Produksi' : 'Service Deployments'}
                      </Heading>
                      <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                        <div style={{width: 220}}>
                          <TextInput
                            label="Filter services"
                            isLabelHidden
                            placeholder={isId ? 'Cari layanan...' : 'Filter services...'}
                            value={deployQuery}
                            onChange={setDeployQuery}
                            hasClear
                          />
                        </div>
                        <SegmentedControl
                          label="Environment filter"
                          size="sm"
                          value={deployFilter}
                          onChange={setDeployFilter}
                        >
                          <SegmentedControlItem value="all" label={isId ? 'Semua' : 'All'} />
                          <SegmentedControlItem value="prod" label="Prod" />
                          <SegmentedControlItem value="staging" label="Staging" />
                        </SegmentedControl>
                      </Stack>
                    </Stack>

                    {deploymentRows.length > 0 ? (
                      <Table
                        aria-label="Service deployments"
                        data={deploymentRows}
                        columns={[
                          {
                            key: 'service',
                            header: isId ? 'Layanan' : 'Service',
                            width: proportional(1.5),
                            renderCell: r => (
                              <Text weight="semibold">{String(r.service)}</Text>
                            ),
                          },
                          {
                            key: 'env',
                            header: isId ? 'Lingkungan' : 'Environment',
                            width: proportional(1),
                          },
                          {
                            key: 'latency',
                            header: isId ? 'Latensi' : 'Latency',
                            width: proportional(0.8),
                            renderCell: r => (
                              <span className="studio-mono-pill">{String(r.latency)}</span>
                            ),
                          },
                          {
                            key: 'status',
                            header: 'Status',
                            width: proportional(0.9),
                            renderCell: r => (
                              <Badge variant={r.variant} label={String(r.status)} />
                            ),
                          },
                        ]}
                        density="balanced"
                        hasHover
                      />
                    ) : (
                      <EmptyState
                        isCompact
                        icon={<Inbox size={24} />}
                        title={
                          isId
                            ? 'Tidak ada layanan yang cocok'
                            : 'No matching services'
                        }
                        description={
                          isId
                            ? 'Hapus kata kunci pencarian atau pilih filter Semua.'
                            : 'Clear your filter query to view all running services.'
                        }
                        actions={
                          <Button
                            variant="secondary"
                            size="sm"
                            label={isId ? 'Reset filter' : 'Reset filters'}
                            onClick={() => {
                              setDeployQuery('');
                              setDeployFilter('all');
                            }}
                          />
                        }
                      />
                    )}
                  </Stack>
                </Card>
              </Stack>
            )}

            {patternView === 'settings' && (
              <Card elevation="low" maxWidth={680}>
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>
                      {isId ? 'Profil Ruang Kerja' : 'Workspace profile'}
                    </Heading>
                    <Text color="secondary">
                      {isId
                        ? 'Hanya menampilkan pengaturan utama di awal; konfigurasi webhook teknis disimpan rapi di bawah.'
                        : 'Surfaces essential fields upfront while keeping developer webhook secrets tucked inside progressive disclosure.'}
                    </Text>
                  </Stack>

                  <TextInput
                    label={isId ? 'Nama organisasi' : 'Organization name'}
                    value={orgName}
                    onChange={setOrgName}
                  />
                  <TextInput
                    label={isId ? 'Email notifikasi tagihan' : 'Billing notification email'}
                    value={billingEmail}
                    onChange={setBillingEmail}
                  />

                  <Collapsible
                    trigger={
                      isId
                        ? 'Pengaturan lanjutan (Keamanan & Webhook)'
                        : 'Advanced settings (Security & Webhooks)'
                    }
                  >
                    <Stack gap={3}>
                      <TextInput
                        label={isId ? 'Kunci tanda tangan Webhook' : 'Webhook signing secret'}
                        value={webhookSecret}
                        onChange={setWebhookSecret}
                      />
                    </Stack>
                  </Collapsible>

                  <Divider />

                  <Stack direction="horizontal" justify="end" gap={2}>
                    <Button variant="ghost" label={isId ? 'Batal' : 'Cancel'} />
                    <Button
                      variant="primary"
                      label={isId ? 'Simpan perubahan' : 'Save changes'}
                      onClick={() =>
                        showToast({
                          type: 'info',
                          body: isId
                            ? 'Pengaturan ruang kerja disimpan.'
                            : 'Workspace settings saved.',
                        })
                      }
                    />
                  </Stack>
                </Stack>
              </Card>
            )}

            {patternView === 'canvas' && (
              <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
                <Card elevation="low">
                  <Stack gap={4}>
                    <Stack gap={1}>
                      <Heading level={3}>
                        {isId
                          ? 'Kontrol Bingkai & Panggung 3D (Gaya Shotcandy)'
                          : 'Shotcandy Frame & 3D Stage Controls'}
                      </Heading>
                      <Text color="secondary">
                        {isId
                          ? 'Pola ideal untuk aplikasi kreatif, editor gambar, dan studio pratinjau.'
                          : 'Ideal layout for creative tools: calm recessed canvas paired with precision tactile sliders.'}
                      </Text>
                    </Stack>
                    <PrecisionSlider
                      label="Padding"
                      value={shotPadding}
                      min={16}
                      max={64}
                      step={2}
                      stops={[24, 36, 48]}
                      unit="px"
                      onChange={setShotPadding}
                    />
                    <PrecisionSlider
                      label={isId ? 'Sudut' : 'Corners'}
                      value={shotRadius}
                      min={8}
                      max={28}
                      step={1}
                      stops={[12, 18, 24]}
                      unit="px"
                      onChange={setShotRadius}
                    />
                    <PrecisionSlider
                      label="3D Tilt"
                      value={shotTilt}
                      min={-12}
                      max={12}
                      step={1}
                      stops={[0]}
                      isCentered
                      unit="°"
                      onChange={setShotTilt}
                    />
                    <Divider />
                    <Stack gap={2}>
                      <Text weight="semibold">
                        {isId ? 'Latar panggung' : 'Stage backdrop'}
                      </Text>
                      <Stack direction="horizontal" gap={2} wrap="wrap">
                        {BACKDROP_PRESETS.map(b => (
                          <ColorSwatch
                            key={b.id}
                            color={b.swatch}
                            label={b.label}
                            isSelected={backdropId === b.id}
                            onSelect={() => setBackdropId(b.id)}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>

                <div className="studio-canvas-stage">
                  <div
                    className="studio-shot-frame"
                    style={{
                      padding: `${shotPadding}px`,
                      borderRadius: `${shotRadius + 10}px`,
                      backgroundImage: activeBackdrop.gradient,
                      boxShadow: 'var(--shadow-med)',
                      transform: `perspective(900px) rotateY(${shotTilt}deg)`,
                    }}
                  >
                    <div
                      className="studio-shot-window"
                      style={{
                        borderRadius: `${shotRadius}px`,
                        boxShadow: 'var(--shadow-high)',
                      }}
                    >
                      <div className="studio-window-dots" aria-hidden="true">
                        <span style={{backgroundColor: '#ef4444'}} />
                        <span style={{backgroundColor: '#f59e0b'}} />
                        <span style={{backgroundColor: '#10b981'}} />
                      </div>
                      <Stack gap={2}>
                        <Badge variant="info" label={activeBackdrop.label} />
                        <Heading level={3}>Mehan Tactile Frame</Heading>
                        <Text color="secondary">
                          {isId
                            ? 'Ubah suasana atau mode gelap di atas — kartu langsung beradaptasi mulus.'
                            : 'Switch atmospheres or toggle Dark mode above — the framed surface adapts instantaneously.'}
                        </Text>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            variant="primary"
                            size="sm"
                            label={isId ? 'Ekspor bingkai' : 'Export frame'}
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            label={isId ? 'Reset sudut' : 'Reset tilt'}
                            onClick={() => setShotTilt(0)}
                          />
                        </Stack>
                      </Stack>
                    </div>
                  </div>
                </div>
              </Grid>
            )}
          </Stack>
        )}

        {/* ============================================================
            TAB 5: MAINTAIN (Zero-Terminal Maintainer Cockpit)
           ============================================================ */}
        {activeTab === 'maintain' && (
          <MaintainView lang={lang} copy={copy} config={config} dna={dna} />
        )}
      </main>

      {/* Live 6-Knob Customize Drawer */}
      <CustomizeDrawer
        isOpen={drawerOpen}
        onOpenChange={setDrawerOpen}
        copy={copy}
        config={config}
        setConfig={setConfig}
        dna={dna}
        inkContrast={inkContrast}
        buttonContrast={buttonContrast}
        accentTextContrast={accentTextContrast}
        presets={presets}
        setPresets={setPresets}
      />

      {/* Standard Modal Dialog Specimen */}
      <Dialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        width={460}
        padding={5}
      >
        <Stack gap={4}>
          <DialogHeader
            title={isId ? 'Permukaan Modal Mengambang' : 'Floating Modal Surface'}
            subtitle={
              isId
                ? 'Elevasi --mehan-float tanpa garis kasar + focus trap otomatis'
                : 'Borderless --mehan-float elevation with built-in focus trap'
            }
            onOpenChange={setDialogOpen}
          />
          <Text color="secondary">
            {isId
              ? 'Dialog, Drawer, Popover, dan Menu mewarisi bayangan berlapis halus Mehan sekaligus aksesibilitas penuh Meta Astryx.'
              : 'Dialogs, Drawers, Popovers, and Menus inherit Mehan’s 4-layer feathered shadow while keeping Meta Astryx focus management.'}
          </Text>
          <Stack direction="horizontal" gap={2} justify="end">
            <Button
              variant="ghost"
              label={isId ? 'Tutup' : 'Close'}
              onClick={() => setDialogOpen(false)}
            />
            <Button
              variant="primary"
              label={copy.overview.ctaCopyAiKit}
              onClick={() => {
                setDialogOpen(false);
                void handleCopyAiKit();
              }}
            />
          </Stack>
        </Stack>
      </Dialog>

      {/* Named Destructive Confirmation Specimen */}
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
            ? 'Layanan yang masih memakai kunci ini akan langsung kehilangan akses. Tindakan ini tidak dapat dibatalkan.'
            : 'Services authenticating with this key will immediately lose access. This action cannot be undone.'
        }
        cancelLabel={isId ? 'Batal' : 'Cancel'}
        actionLabel={isId ? 'Hapus kunci API' : 'Delete API key'}
        actionVariant="destructive"
        onAction={() => {
          setConfirmOpen(false);
          showToast({
            type: 'info',
            body: isId
              ? 'Simulasi: kunci API dihapus dengan aman.'
              : 'Demo: API key deleted cleanly.',
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
  const [config, setConfig] = useState<StudioConfig>(initial.config);
  const [presets, setPresets] = useState<NamedStudioPreset[]>(initial.presets);

  useEffect(() => {
    savePersistedStudioState({lang, mode, config, presets});
  }, [lang, mode, config, presets]);

  const accentSlug = useMemo(
    () => config.accent.replace(/[^a-z0-9]/gi, '').toLowerCase(),
    [config.accent],
  );

  const liveTheme = useMemo(
    () =>
      createMehanTheme({
        name: `mh-${config.atmosphere}-${accentSlug}-d${Math.round(config.depth * 100)}-r${Math.round(config.radiusScale * 100)}-${config.density}-${config.motion}`,
        atmosphere: config.atmosphere,
        accent: config.accent,
        depth: config.depth,
        radiusScale: config.radiusScale,
        density: config.density,
        motion: config.motion,
      }),
    [config, accentSlug],
  );

  return (
    <Theme theme={liveTheme} mode={mode}>
      <LayerProvider>
        <StudioInner
          lang={lang}
          setLang={setLang}
          mode={mode}
          setMode={setMode}
          config={config}
          setConfig={setConfig}
          presets={presets}
          setPresets={setPresets}
        />
      </LayerProvider>
    </Theme>
  );
}
