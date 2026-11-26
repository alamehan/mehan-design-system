import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
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
  generateOklchScale,
  resolveMehanDna,
  type HistoryUpdateOptions,
} from '@mehan/astryx/dna';
import {
  MEHAN_PORTABLE_RUNTIME_JS,
  generateAiPrototypeKit,
  generateOfflineAiPrototypeKit,
  generatePortableCss,
  generateStarterCdnHtml,
} from '@mehan/portable';
import {
  Check,
  Copy,
  Download,
  Heart,
  Info,
  Keyboard,
  Moon,
  MoreHorizontal,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Terminal,
} from 'lucide-react';
import {ComponentsCatalogView} from './catalog/ComponentsCatalogView';
import {STUDIO_COPY} from './i18n';
import {MaintainView} from './views/MaintainView';
import {MehanLogoMark, buildMehanFaviconDataUri} from './components/MehanLogoMark';
import {OverviewManifesto} from './views/OverviewManifesto';
import {StudioInfoDialog, type StudioInfoTab} from './components/StudioInfoDialog';
import {
  STUDIO_CDN_BASE_URL,
  STUDIO_RUNTIME_PREFIX,
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
  extractThemeExportOverrides,
  type FullThemeEditorState,
} from './theme-editor/themeEditorModel';
import {UX_CHAPTER_COUNT, UxCopyView} from './views/UxCopyView';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const catalogSearchRef = useRef<HTMLInputElement | null>(null);
  const didMountTabRef = useRef(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (
        mobileMenuWrapRef.current &&
        !mobileMenuWrapRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [mobileMenuOpen]);

  useLayoutEffect(() => {
    if (!didMountTabRef.current) {
      didMountTabRef.current = true;
      return;
    }
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  }, [activeTab]);

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

  useEffect(() => {
    const iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (iconLink) {
      iconLink.href = buildMehanFaviconDataUri(
        dna.accent.accentLight,
        dna.accent.buttonLip,
      );
    }
  }, [dna.accent.accentLight, dna.accent.buttonLip]);

  const builtInPresets = useMemo(() => getBuiltInPresets(), []);

  const activePreset = useMemo(
    () =>
      builtInPresets.find(preset => {
        const pSeed = preset.state.seed;
        return (
          seed.atmosphere === pSeed.atmosphere &&
          seed.accent === pSeed.accent &&
          seed.headingFont === pSeed.headingFont &&
          seed.bodyFont === pSeed.bodyFont &&
          seed.sizeBase === pSeed.sizeBase &&
          seed.segmentedStyle === pSeed.segmentedStyle
        );
      }),
    [builtInPresets, seed],
  );

  const activeFontSummary =
    seed.headingFont === seed.bodyFont
      ? `${seed.headingFont} · ${seed.codeFont}`
      : `${seed.headingFont} + ${seed.bodyFont}`;

  const accentTextContrast = useMemo(() => {
    const S = mode === 'light' ? dna.atmosphere.light : dna.atmosphere.dark;
    const text = mode === 'light' ? dna.accent.textLight : dna.accent.textDark;
    return contrastRatio(text, S.surface).toFixed(2);
  }, [dna, mode]);

  const heroTiltDeg =
    heroStage === 'design' ? -4 : heroStage === 'ship' ? 4 : 0;

  const heroCushionGradient = useMemo(() => {
    const ramp = generateOklchScale(dna.accent.accentLight);
    return `linear-gradient(135deg, ${ramp[400]} 0%, ${dna.accent.accentLight} 52%, ${dna.accent.buttonLip} 100%)`;
  }, [dna.accent.accentLight, dna.accent.buttonLip]);

  const exportedThemeTs = useMemo(
    () => exportCreateMehanThemeTs(themeState, 'customMehan'),
    [themeState],
  );

  const aiKitOptions = useMemo(() => {
    const {tokens, components} = extractThemeExportOverrides(themeState);
    return {
      ...seed,
      radiusBase: seed.radiusBase ?? undefined,
      tokens,
      components,
      defaultMode: mode,
      cdnBaseUrl: STUDIO_CDN_BASE_URL,
      runtimePrefix: STUDIO_RUNTIME_PREFIX,
    };
  }, [themeState, seed, mode]);

  const aiKitMarkdown = useMemo(
    () => generateAiPrototypeKit(aiKitOptions),
    [aiKitOptions],
  );

  const offlineAiKitMarkdown = useMemo(
    () =>
      generateOfflineAiPrototypeKit({
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
        ? `Kit AI Real-Engine (${atmosphereName} · ${accentName}) disalin ke clipboard.`
        : `Copied Real-Engine AI Prototype Kit (${atmosphereName} · ${accentName}).`,
    });
  };

  const handleCopyOfflineAiKit = async () => {
    await copyText(offlineAiKitMarkdown);
    showToast({
      type: 'info',
      body: isId
        ? `Kit AI CSS offline (${atmosphereName} · ${accentName}) disalin.`
        : `Copied Offline CSS AI Kit (${atmosphereName} · ${accentName}).`,
    });
  };

  const handleDownloadRealStarterHtml = () => {
    const html = generateStarterCdnHtml(aiKitOptions);
    downloadTextFile(`mehan-${seed.atmosphere}-prototype.html`, html, 'text/html');
    showToast({
      type: 'info',
      body: isId
        ? `mehan-${seed.atmosphere}-prototype.html diunduh.`
        : `Downloaded mehan-${seed.atmosphere}-prototype.html`,
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
        <input class="mh-input" value="Porcelain Workspace" />
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
      body: isId
        ? `mehan-${seed.atmosphere}-starter.html diunduh.`
        : `Downloaded mehan-${seed.atmosphere}-starter.html`,
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

          <div className="studio-actions-cluster studio-actions-desktop">
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

          <div className="studio-actions-cluster studio-actions-mobile">
            <IconButton
              variant="secondary"
              size="sm"
              label={mode === 'light' ? copy.nav.dark : copy.nav.light}
              icon={mode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}
            />

            <div className="studio-mobile-menu-wrap" ref={mobileMenuWrapRef}>
              <IconButton
                ref={mobileMenuTriggerRef}
                variant={mobileMenuOpen ? 'secondary' : 'ghost'}
                size="sm"
                label={isId ? 'Opsi Studio lainnya' : 'More Studio options'}
                icon={<MoreHorizontal size={16} />}
                aria-haspopup="menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(prev => !prev)}
              />

              {mobileMenuOpen && (
                <div
                  className="studio-mobile-menu-popover"
                  role="menu"
                  aria-label={isId ? 'Opsi Studio lainnya' : 'More Studio options'}
                  onKeyDown={e => {
                    const items = Array.from(
                      e.currentTarget.querySelectorAll<HTMLButtonElement>(
                        '[role="menuitem"]',
                      ),
                    );
                    const idx = items.indexOf(
                      document.activeElement as HTMLButtonElement,
                    );
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      items[(idx + 1) % items.length]?.focus();
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      items[(idx - 1 + items.length) % items.length]?.focus();
                    } else if (e.key === 'Home') {
                      e.preventDefault();
                      items[0]?.focus();
                    } else if (e.key === 'End') {
                      e.preventDefault();
                      items[items.length - 1]?.focus();
                    }
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="studio-mobile-menu-item"
                    onClick={() => {
                      setLang(isId ? 'en' : 'id');
                      setMobileMenuOpen(false);
                    }}
                  >
                    {isId
                      ? 'Switch to English (EN)'
                      : 'Ganti ke Bahasa Indonesia (ID)'}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="studio-mobile-menu-item"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCreatorModal('overview');
                    }}
                  >
                    {copy.nav.info}
                  </button>
                  <div className="studio-mobile-menu-divider" role="separator" />
                  <button
                    type="button"
                    role="menuitem"
                    className="studio-mobile-menu-item"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openCreatorModal('about');
                    }}
                  >
                    {isId
                      ? 'Tentang Pembuat (@alamehan)'
                      : 'About Creator (@alamehan)'}
                  </button>
                </div>
              )}
            </div>

            <Button
              variant={editorOpen ? 'secondary' : 'primary'}
              size="sm"
              label={isId ? 'Tema' : 'Theme'}
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
            <div className="mh-overview-column">
              <Stack gap={6}>
                {/* Beat 1: Calm Editorial Playground + 4x3 Tactile Mood Switcher */}
                <section className="studio-hero">
                  <Stack gap={4}>
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
                                : `WCAG AA · ${accentTextContrast}:1`
                            }
                          />
                        </HStack>
                        <Heading level={1}>{copy.overview.heroTitle}</Heading>
                        <Text color="secondary">{copy.overview.heroDesc}</Text>
                        <HStack gap={2} wrap="wrap" vAlign="center">
                          <Button
                            variant="primary"
                            label={copy.overview.ctaExploreComponents}
                            onClick={() => setActiveTab('components')}
                          />
                          <Button
                            variant="secondary"
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
                                ? 'Oleh Raihan Allaam (@alamehan) · Cerita, arsitektur & profil'
                                : 'By Raihan Allaam (@alamehan) · Story, architecture & credits'}
                            </span>
                          </button>
                        </div>
                      </Stack>

                      {/* Compact Live 3D Product Studio Stage (Reactive to Active Theme & Stage Tab) */}
                      <div className="mh-hero-stage">
                        <div className="mh-hero-stage-hud">
                          <span className="mh-hero-stage-pill">
                            <i aria-hidden="true" />
                            {isId ? 'Panggung 3D Interaktif' : 'Live 3D Stage'}
                          </span>
                          <span className="mh-hero-stage-meta">
                            {atmosphereName} · {heroTiltDeg > 0 ? `+${heroTiltDeg}°` : `${heroTiltDeg}°`}
                          </span>
                        </div>

                        <div
                          className="mh-hero-shot-frame"
                          style={{
                            borderRadius: `${Math.max(14, Math.round(18 * seed.radiusScale))}px`,
                            backgroundImage: heroCushionGradient,
                            boxShadow: `0 3px 0 ${dna.accent.buttonLip}, 0 16px 28px -10px rgba(15, 23, 42, 0.28), inset 0 1.5px 0 rgba(255, 255, 255, 0.36)`,
                            transform: `perspective(940px) rotateY(${heroTiltDeg}deg) rotateX(2deg)`,
                          }}
                        >
                          <div
                            className="mh-hero-shot-window"
                            style={{
                              borderRadius: `${Math.max(10, Math.round(13 * seed.radiusScale))}px`,
                            }}
                          >
                            <div className="mh-hero-window-bar">
                              <div className="mh-hero-window-left">
                                <div className="mh-hero-window-dots" aria-hidden="true">
                                  <span style={{backgroundColor: '#f43f5e'}} />
                                  <span style={{backgroundColor: '#f59e0b'}} />
                                  <span style={{backgroundColor: '#10b981'}} />
                                </div>
                                <span className="mh-hero-window-title">
                                  {isId
                                    ? 'Pratinjau komponen'
                                    : 'Interactive UI'}
                                </span>
                              </div>
                              <span className="mh-hero-window-badge">
                                <Badge
                                  variant="success"
                                  label={isId ? 'Aktif' : 'Live UI'}
                                />
                              </span>
                            </div>

                            <Stack gap={2}>
                              <SegmentedControl
                                label={isId ? 'Tahap proyek' : 'Project stage'}
                                size="sm"
                                value={heroStage}
                                onChange={setHeroStage}
                              >
                                <SegmentedControlItem
                                  value="design"
                                  label={isId ? 'Desain' : 'Design'}
                                />
                                <SegmentedControlItem
                                  value="review"
                                  label={isId ? 'Ulasan' : 'Review'}
                                />
                                <SegmentedControlItem
                                  value="ship"
                                  label={isId ? 'Rilis' : 'Ship'}
                                />
                              </SegmentedControl>

                              <TextInput
                                label={isId ? 'Nama ruang kerja proyek' : 'Project workspace name'}
                                size="sm"
                                value={heroProjectName}
                                onChange={setHeroProjectName}
                              />

                              <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                                <Switch
                                  label={
                                    isId ? 'Fokus tenang' : 'Calm focus mode'
                                  }
                                  value={heroCalmMode}
                                  onChange={setHeroCalmMode}
                                />
                                <Button
                                  variant="primary"
                                  size="sm"
                                  label={
                                    heroStage === 'ship'
                                      ? isId
                                        ? 'Terbitkan'
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
                            </Stack>
                          </div>
                        </div>
                      </div>
                    </Grid>

                    <div className="mh-hero-preset-dock">
                      <div className="mh-hero-preset-head">
                        <span className="mh-hero-preset-title">
                          {isId
                            ? 'Pilih suasana tampilan dalam satu klik'
                            : 'Switch visual mood in one click'}
                        </span>
                        <span className="mh-hero-preset-count">
                          {isId
                            ? `${builtInPresets.length} suasana siap pakai · WOFF2 offline`
                            : `${builtInPresets.length} instant moods · offline WOFF2`}
                        </span>
                      </div>

                      <div
                        className="mh-preset-strip"
                        role="radiogroup"
                        aria-label={isId ? 'Galeri preset tema Mehan' : 'Mehan signature theme presets'}
                      >
                        {builtInPresets.map(preset => {
                          const pSeed = preset.state.seed;
                          const pAtm =
                            MEHAN_ATMOSPHERES[pSeed.atmosphere] ??
                            MEHAN_ATMOSPHERES.porcelain;
                          const pDna = resolveMehanDna({
                            name: preset.id,
                            ...pSeed,
                            radiusBase: pSeed.radiusBase ?? undefined,
                          });
                          const isCurrent = activePreset?.id === preset.id;
                          const tileRadius = `${Math.max(8, Math.round(10 * pSeed.radiusScale))}px`;
                          const chipRadius = `${Math.max(5, Math.round(6 * pSeed.radiusScale))}px`;
                          const lipShadow =
                            pDna.lipPx > 0
                              ? `inset 0 -${Math.min(2, pDna.lipPx)}px 0 ${pDna.accent.buttonLip}, 0 1px 2px rgba(0,0,0,0.14)`
                              : '0 1px 2px rgba(0,0,0,0.12)';
                          const tileBg =
                            mode === 'dark' ? pAtm.dark.surface : pAtm.light.paper;
                          const tileInk =
                            mode === 'dark' ? pAtm.dark.ink : pAtm.light.ink;
                          const tileBorder = isCurrent
                            ? mode === 'dark'
                              ? pDna.accent.accentDark
                              : pDna.accent.accentLight
                            : mode === 'dark'
                              ? pAtm.dark.line
                              : pAtm.light.line;

                          return (
                            <button
                              key={preset.id}
                              type="button"
                              role="radio"
                              aria-checked={isCurrent}
                              className={`mh-preset-tile ${isCurrent ? 'is-active' : ''}`}
                              style={{
                                borderRadius: tileRadius,
                                backgroundColor: tileBg,
                                color: tileInk,
                                borderColor: tileBorder,
                              }}
                              onClick={() => setThemeState(preset.state)}
                            >
                              <span
                                className="mh-preset-cap"
                                aria-hidden="true"
                                style={{
                                  borderRadius: chipRadius,
                                  backgroundColor: pDna.accent.accentLight,
                                  backgroundImage: pDna.accent.buttonGradient,
                                  boxShadow: lipShadow,
                                }}
                              />
                              <span
                                className="mh-preset-tile-name"
                                style={{
                                  fontFamily: `"${pSeed.headingFont}", var(--font-family-heading), sans-serif`,
                                }}
                              >
                                {preset.name}
                              </span>
                              {isCurrent && (
                                <span className="mh-preset-tile-check" aria-hidden="true">
                                  <Check size={12} />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mh-preset-active-bar">
                        <div className="mh-preset-active-copy">
                          <strong className="mh-preset-active-title">
                            {activePreset
                              ? activePreset.name
                              : isId
                                ? 'Tema Kustom'
                                : 'Custom Theme'}
                          </strong>
                          <span className="mh-preset-active-sep" aria-hidden="true">
                            ·
                          </span>
                          <span className="mh-preset-active-desc">
                            {activePreset
                              ? isId
                                ? activePreset.taglineId ?? activePreset.taglineEn
                                : activePreset.taglineEn
                              : isId
                                ? `${dna.atmosphere.name} berpadu aksen ${dna.accent.name}`
                                : `${dna.atmosphere.name} paired with ${dna.accent.name} accent`}
                          </span>
                          <span className="mh-preset-active-font">{activeFontSummary}</span>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          label={isId ? 'Racik di Theme Editor' : 'Open Theme Editor'}
                          icon={<SlidersHorizontal size={14} />}
                          onClick={() => setEditorOpen(true)}
                        />
                      </div>
                    </div>
                  </Stack>
                </section>

                {/* Beat 2: 2.5D SceneForge Kinetic Diorama + Clean Distillation Spine */}
                <OverviewManifesto
                  lang={lang}
                  dna={dna}
                  mode={mode}
                  activePresetName={activePreset?.name}
                  presetCount={builtInPresets.length}
                  uxChapterCount={UX_CHAPTER_COUNT}
                  onNavigateTab={setActiveTab}
                  onOpenStory={() => openCreatorModal('how')}
                />

                {/* Beat 3: Concise, Scrollbar-Free 60-Second Quickstart */}
                <Card elevation="low">
                  <Stack gap={3}>
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Heading level={2}>{copy.overview.installTitle}</Heading>
                      <Badge
                        variant="teal"
                        label={
                          isId
                            ? `Tema Aktif · ${atmosphereName} × ${accentName}`
                            : `Active Theme · ${atmosphereName} × ${accentName}`
                        }
                      />
                    </HStack>

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
                          <div style={{minWidth: 0, flex: '1 1 280px'}}>
                            <Text color="secondary">{copy.overview.cardAiDesc}</Text>
                          </div>
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
                              onClick={handleDownloadRealStarterHtml}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              label={copy.overview.cardAiOfflineBtn}
                              icon={<Copy size={14} />}
                              onClick={() => void handleCopyOfflineAiKit()}
                            />
                          </HStack>
                        </HStack>
                        <CodeBlock
                          code={[
                            `<!-- Single-file .html running 100% real Mehan × Meta Astryx -->`,
                            `<link rel="stylesheet" href=".../${STUDIO_RUNTIME_PREFIX}-runtime.css" />`,
                            `<script src=".../${STUDIO_RUNTIME_PREFIX}-runtime.js"></script>`,
                            `<script type="text/tsx">`,
                            `  import { Button, Drawer, Table } from '@astryxdesign/core';`,
                            `  import { WorkspaceLayout, DataChart, createMehanTheme } from '@${STUDIO_RUNTIME_PREFIX}/astryx';`,
                            `  // Active mood (${atmosphereName} · ${accentName}) + overrides embedded!`,
                            `</script>`,
                          ].join('\n')}
                          language="html"
                          title={`MEHAN-AI-PROTOTYPE-KIT.md (${atmosphereName} · ${accentName})`}
                          maxHeight={192}
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

                        <CodeBlock
                          code={`${reactSnippets.cssCode}\n\n${reactSnippets.tsxCode}`}
                          language="tsx"
                          title={
                            cssMode === 'tailwind'
                              ? 'src/mehan.css (Tailwind v4) + src/App.tsx'
                              : 'src/mehan.css + src/App.tsx'
                          }
                          hasCopyButton
                          maxHeight={216}
                        />
                      </div>
                    )}

                    {quickstartTab === 'html' && (
                      <div className="mh-quickstart-body">
                        <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                          <div style={{minWidth: 0, flex: '1 1 260px'}}>
                            <Text color="secondary">{copy.overview.cardHtmlDesc}</Text>
                          </div>
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
                          code={[
                            `<html lang="${lang}" data-theme="${mode}" data-motion="${seed.motion}">`,
                            `  <link rel="stylesheet" href="./mehan-portable.css" />`,
                            `  <body class="mh-container">`,
                            `    <section class="mh-card mh-stack">`,
                            `      <h1 class="mh-h1">${atmosphereName} · ${accentName}</h1>`,
                            `      <button type="button" class="mh-btn mh-btn-primary">`,
                            `        Ship tactile UI`,
                            `      </button>`,
                            `    </section>`,
                            `    <script src="./mehan-portable.js"></script>`,
                            `  </body>`,
                            `</html>`,
                          ].join('\n')}
                          language="html"
                          title="index.html (Vanilla HTML / Vue / Svelte / Astro)"
                          hasCopyButton
                          maxHeight={196}
                        />
                      </div>
                    )}
                  </Stack>
                </Card>
              </Stack>
            </div>
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
        presetCount={builtInPresets.length}
        uxChapterCount={UX_CHAPTER_COUNT}
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
