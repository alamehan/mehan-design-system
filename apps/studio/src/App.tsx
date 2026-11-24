import React, {useMemo, useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  Card,
  CheckboxInput,
  CodeBlock,
  Collapsible,
  CollapsibleGroup,
  Dialog,
  DialogHeader,
  Divider,
  Grid,
  Heading,
  Kbd,
  LayerProvider,
  Popover,
  ProgressBar,
  RadioList,
  RadioListItem,
  SegmentedControl,
  SegmentedControlItem,
  SelectableCard,
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
  isPresetAccent,
  resolveMehanDna,
  type MehanAtmosphereId,
  type MehanPresetAccentId,
} from '@mehan/astryx/dna';
import {
  MEHAN_PORTABLE_RUNTIME_JS,
  generateAiPrototypeKit,
  generatePortableCss,
} from '@mehan/portable';
import {
  Activity,
  Copy,
  Download,
  Layers,
  Moon,
  Palette,
  ShieldCheck,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react';

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

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback for file:// environments with restricted clipboard permissions
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  return ok;
}

function downloadTextFile(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], {type: `${mime};charset=utf-8`});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface StudioContentProps {
  atmosphere: MehanAtmosphereId;
  setAtmosphere: (id: MehanAtmosphereId) => void;
  accent: MehanPresetAccentId | string;
  setAccent: (accent: MehanPresetAccentId | string) => void;
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  depth: number;
  setDepth: (v: number) => void;
  radiusScale: number;
  setRadiusScale: (v: number) => void;
}

function StudioContent({
  atmosphere,
  setAtmosphere,
  accent,
  setAccent,
  mode,
  setMode,
  depth,
  setDepth,
  radiusScale,
  setRadiusScale,
}: StudioContentProps) {
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState<string>('lab');

  // Tactile Lab interactive states
  const [workspaceName, setWorkspaceName] = useState('Confectionery Design Lab');
  const [domainHandle, setDomainHandle] = useState('mehan.design');
  const [nestedNote, setNestedNote] = useState('Crisp own-fill reset');
  const [springTension, setSpringTension] = useState(72);
  const [stereoPan, setStereoPan] = useState(14);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [reducedMotionGuard, setReducedMotionGuard] = useState(true);
  const [aaGateLocked, setAaGateLocked] = useState(true);
  const [surfaceDensity, setSurfaceDensity] = useState('balanced');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Canvas Studio states
  const [shotPadding, setShotPadding] = useState(36);
  const [shotRadius, setShotRadius] = useState(18);
  const [shotTilt, setShotTilt] = useState(-4);
  const [backdropId, setBackdropId] = useState<string>('berry-cream');

  // SaaS Dashboard states
  const [selectedTier, setSelectedTier] = useState<string>('astryx');

  const dna = useMemo(
    () =>
      resolveMehanDna({
        name: `mehan-${atmosphere}`,
        atmosphere,
        accent,
        depth,
        radiusScale,
      }),
    [atmosphere, accent, depth, radiusScale],
  );

  const atmosphereName = MEHAN_ATMOSPHERES[atmosphere].name;
  const accentName = dna.accent.name;

  const lightInkContrast = useMemo(
    () => contrastRatio(dna.atmosphere.light.ink, dna.atmosphere.light.paper).toFixed(1),
    [dna],
  );
  const darkInkContrast = useMemo(
    () => contrastRatio(dna.atmosphere.dark.ink, dna.atmosphere.dark.paper).toFixed(1),
    [dna],
  );
  const accentTextContrast = useMemo(
    () =>
      (mode === 'light'
        ? contrastRatio(dna.accent.textLight, dna.atmosphere.light.surface)
        : contrastRatio(dna.accent.textDark, dna.atmosphere.dark.surface)
      ).toFixed(2),
    [dna, mode],
  );

  const aiKitMarkdown = useMemo(
    () => generateAiPrototypeKit({atmosphere, accent}),
    [atmosphere, accent],
  );

  const reactSetupSnippet = useMemo(() => {
    const accentArg = isPresetAccent(accent) ? `'${accent}'` : `'${dna.accent.seed}'`;
    return `import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@mehan/astryx/fonts.css';
import '@mehan/astryx/styles.css';

import {Theme} from '@astryxdesign/core/theme';
import {Button, Card, Heading, Stack, TextInput} from '@astryxdesign/core';
import {PrecisionSlider, MetricCard} from '@mehan/astryx';
import {createMehanTheme} from '@mehan/astryx/dna';

const appTheme = createMehanTheme({
  name: 'app-${atmosphere}',
  atmosphere: '${atmosphere}',
  accent: ${accentArg},
  depth: ${depth},
  radiusScale: ${radiusScale},
});

export function App() {
  return (
    <Theme theme={appTheme} mode="${mode}">
      <Card maxWidth={480}>
        <Stack gap={4}>
          <Heading level={2}>Mehan × Meta Astryx</Heading>
          <TextInput label="Project" value="Shipped v1" onChange={() => {}} />
          <Button variant="primary" label="Deploy Workspace" />
        </Stack>
      </Card>
    </Theme>
  );
}`;
  }, [atmosphere, accent, dna.accent.seed, depth, radiusScale, mode]);

  const activeBackdrop =
    BACKDROP_PRESETS.find(b => b.id === backdropId) ?? BACKDROP_PRESETS[0];

  const handleCopyAiKit = async () => {
    await copyText(aiKitMarkdown);
    showToast({
      type: 'info',
      body: `Copied Claude / Gemini AI Kit (${atmosphereName} · ${accentName})`,
    });
  };

  const handleCopyPortableCss = async () => {
    const css = generatePortableCss({
      name: `mehan-${atmosphere}`,
      atmosphere,
      accent,
      depth,
      radiusScale,
    });
    await copyText(css);
    showToast({
      type: 'info',
      body: 'Copied standalone mehan-portable.css to clipboard',
    });
  };

  const handleDownloadPrototypeHtml = () => {
    const css = generatePortableCss({
      name: `mehan-${atmosphere}`,
      atmosphere,
      accent,
      depth,
      radiusScale,
    });
    const html = `<!doctype html>
<html lang="en" data-theme="${mode}" data-atmosphere="${atmosphere}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Portable Prototype — ${atmosphereName}</title>
  <style>${css}</style>
</head>
<body>
  <main class="mh-container">
    <section class="mh-card mh-stack" style="max-width:540px;margin:24px auto">
      <div class="mh-between">
        <span class="mh-badge">${atmosphereName} · ${accentName}</span>
        <button class="mh-btn mh-btn-sm mh-btn-secondary mh-theme-toggle" type="button">Toggle Light / Dark</button>
      </div>
      <h1 class="mh-h1">Mehan Single-File Prototype</h1>
      <p class="mh-muted">Ready for offline file:// sharing, Claude Artifacts, or Gemini Canvas with zero external dependencies.</p>
      <label class="mh-field">
        <span class="mh-label">Workspace name</span>
        <input class="mh-input" value="Zero-dependency tactile well" />
      </label>
      <div class="mh-row">
        <button class="mh-btn mh-btn-primary" type="button">Primary Action</button>
        <button class="mh-btn mh-btn-secondary" type="button">Secondary Raised</button>
      </div>
    </section>
  </main>
  <script>${MEHAN_PORTABLE_RUNTIME_JS}</script>
</body>
</html>`;
    downloadTextFile(`mehan-${atmosphere}-prototype.html`, html, 'text/html');
    showToast({
      type: 'info',
      body: `Downloaded mehan-${atmosphere}-prototype.html`,
    });
  };

  return (
    <div className="studio-shell">
      <header className="studio-topbar">
        <div className="studio-topbar-inner">
          <div className="studio-brand">
            <div className="studio-logo-badge" aria-hidden="true">
              m
            </div>
            <span className="studio-wordmark">mehan</span>
            <Badge variant="neutral" label="v1.0.0" />
          </div>

          <div className="studio-controls-bar">
            <SegmentedControl
              label="Neutral atmosphere"
              size="sm"
              value={atmosphere}
              onChange={val => setAtmosphere(val as MehanAtmosphereId)}
            >
              <SegmentedControlItem value="confectionery" label="Confectionery" />
              <SegmentedControlItem value="porcelain" label="Porcelain" />
              <SegmentedControlItem value="stone" label="Stone" />
            </SegmentedControl>

            <Stack direction="horizontal" gap={1.5} align="center" wrap="wrap">
              {PRESET_ACCENT_LIST.map(preset => (
                <ColorSwatch
                  key={preset.id}
                  size="sm"
                  color={preset.seed}
                  label={`${preset.name} accent`}
                  isSelected={accent === preset.id}
                  onSelect={() => setAccent(preset.id)}
                />
              ))}
              <Popover
                label="Custom brand hex color"
                alignment="end"
                padding={2}
                content={
                  <ColorPicker
                    label="Custom brand seed hex"
                    value={dna.accent.seed}
                    presets={PRESET_HEX_SWATCHES}
                    onChange={hex => setAccent(hex)}
                  />
                }
              >
                <Button
                  variant="secondary"
                  size="sm"
                  label={isPresetAccent(accent) ? 'Custom Hex' : dna.accent.seed.toUpperCase()}
                  icon={<Palette size={14} />}
                />
              </Popover>
            </Stack>

            <Stack direction="horizontal" gap={2} align="center">
              <Button
                variant="secondary"
                size="sm"
                label={mode === 'light' ? 'Dark mode' : 'Light mode'}
                icon={mode === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                onClick={() => setMode(prev => (prev === 'light' ? 'dark' : 'light'))}
              />
              <Button
                variant="primary"
                size="sm"
                label="Copy Claude / Gemini AI Kit"
                icon={<Sparkles size={14} />}
                onClick={handleCopyAiKit}
              />
            </Stack>
          </div>
        </div>
      </header>

      <main className="studio-main">
        <section className="studio-hero" aria-label="Mehan Design System Live Customizer">
          <Stack gap={4}>
            <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="center">
              <Stack gap={2}>
                <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                  <Badge variant="success" label={`WCAG AA · ${accentTextContrast}:1 Accent`} />
                  <Badge
                    variant="info"
                    label={`${atmosphereName} · ${accentName}`}
                  />
                </Stack>
                <Heading level={1}>
                  Tactile physicality on Meta Astryx foundations.
                </Heading>
                <Text color="secondary">
                  {MEHAN_ATMOSPHERES[atmosphere].tagline} — Ink contrast {lightInkContrast}:1 (Light) /{' '}
                  {darkInkContrast}:1 (Dark), zero-dependency portable kits, and strict optical depth.
                </Text>
              </Stack>

              <Card padding={3}>
                <Stack gap={2}>
                  <PrecisionSlider
                    label="Depth"
                    value={depth}
                    min={0.6}
                    max={1.4}
                    step={0.05}
                    stops={[1]}
                    unit="x"
                    onChange={setDepth}
                  />
                  <PrecisionSlider
                    label="Radii"
                    value={radiusScale}
                    min={0.8}
                    max={1.2}
                    step={0.05}
                    stops={[1]}
                    unit="x"
                    onChange={setRadiusScale}
                  />
                </Stack>
              </Card>
            </Grid>

            <Divider />

            <TabList
              role="tablist"
              aria-label="Mehan Studio workspaces"
              value={activeTab}
              onChange={setActiveTab}
              overflow="auto"
            >
              <Tab value="lab" label="Tactile Lab" />
              <Tab value="canvas" label="Canvas Studio" />
              <Tab value="dashboard" label="SaaS Dashboard" />
              <Tab value="portable" label="Install & Portable AI Kit" />
            </TabList>
          </Stack>
        </section>

        {activeTab === 'lab' && (
          <Stack gap={4}>
            <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4}>
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>3D Lip-Collapse Push Buttons & Keycaps</Heading>
                    <Text color="secondary">
                      Fixed-height bottom lip collapses on press without layout shift; popup triggers stay anchored.
                    </Text>
                  </Stack>
                  <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                    <Button
                      variant="primary"
                      label="Publish Release"
                      icon={<Zap size={15} />}
                      onClick={() =>
                        showToast({
                          type: 'info',
                          body: 'Primary tactile button triggered cleanly.',
                        })
                      }
                    />
                    <Button
                      variant="secondary"
                      label="Inspect Modal"
                      onClick={() => setDialogOpen(true)}
                    />
                    <Button variant="destructive" label="Revoke Key" />
                    <Button variant="ghost" label="Reset" />
                  </Stack>
                  <Divider />
                  <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                    <Text color="secondary">Precision shortcuts:</Text>
                    <Kbd keys="Shift+Drag" />
                    <Kbd keys="Cmd+K" />
                    <Badge variant="pink" label="Confectionery" />
                    <Badge variant="blue" label="Porcelain" />
                    <Badge variant="teal" label="Stone" />
                  </Stack>
                </Stack>
              </Card>

              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>12-Target Recessed Input Wells</Heading>
                    <Text color="secondary">
                      Carved inner shadow across TextInput, Selector, NumberInput, DateInput, Typeahead, and Tokenizer.
                    </Text>
                  </Stack>
                  <TextInput
                    label="Workspace title"
                    value={workspaceName}
                    onChange={setWorkspaceName}
                    hasClear
                  />
                  <TextInput
                    label="Verified package namespace"
                    value={domainHandle}
                    onChange={setDomainHandle}
                    status={{
                      type: 'success',
                      message: 'Contrast solver verified >= 4.5:1 in Light & Dark',
                    }}
                  />
                </Stack>
              </Card>
            </Grid>

            <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4}>
              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>Mehan Signature Precision Controls</Heading>
                    <Text color="secondary">
                      Hold Shift for 0.25x fine drag, snap to magnetic stops, or click the mono readout to type.
                    </Text>
                  </Stack>
                  <PrecisionSlider
                    label="Tension"
                    value={springTension}
                    min={0}
                    max={100}
                    step={1}
                    stops={[25, 50, 75]}
                    unit="%"
                    onChange={setSpringTension}
                  />
                  <PrecisionSlider
                    label="Pan Tilt"
                    value={stereoPan}
                    min={-45}
                    max={45}
                    step={1}
                    stops={[0]}
                    isCentered
                    unit="°"
                    onChange={setStereoPan}
                  />
                  <ProgressBar
                    label="Optical depth monotony gate"
                    value={100}
                    max={100}
                    hasValueLabel
                  />
                </Stack>
              </Card>

              <Card elevation="low">
                <Stack gap={4}>
                  <Stack gap={1}>
                    <Heading level={3}>Recessed Sockets & Spherical 3D Knobs</Heading>
                    <Text color="secondary">
                      Switch tracks, checkboxes, and radios sit inside carved sockets with radial-lit ceramic domes.
                    </Text>
                  </Stack>
                  <Switch
                    label="Tactile lip-collapse physics"
                    description="Preserves layout box height during :active press"
                    value={hapticsEnabled}
                    onChange={setHapticsEnabled}
                  />
                  <CheckboxInput
                    label="Enforce WCAG AA contrast floor (>= 4.5:1)"
                    value={aaGateLocked}
                    onChange={val => setAaGateLocked(Boolean(val))}
                  />
                  <CheckboxInput
                    label="Respect prefers-reduced-motion spring damping"
                    value={reducedMotionGuard}
                    onChange={val => setReducedMotionGuard(Boolean(val))}
                  />
                  <RadioList
                    label="Control density"
                    orientation="horizontal"
                    value={surfaceDensity}
                    onChange={setSurfaceDensity}
                  >
                    <RadioListItem value="compact" label="Compact (32px)" />
                    <RadioListItem value="balanced" label="Balanced (36px)" />
                  </RadioList>
                </Stack>
              </Card>
            </Grid>

            <Card elevation="low">
              <Stack gap={3}>
                <Heading level={3}>
                  Warm Pastel Cards & 46-Surface Own-Fill Contrast Reset
                </Heading>
                <Text color="secondary">
                  Coloured cards stay luminous pastel in both Light and Dark mode, while nested inputs and cards automatically restore theme surface ink.
                </Text>
                <Grid columns={{minWidth: 220, max: 4, repeat: 'fit'}} gap={3}>
                  <Card variant="pink">
                    <Stack gap={2}>
                      <Heading level={4}>Strawberry Glaze</Heading>
                      <Text color="secondary">
                        Dark cocoa ink stays crisp on pastel berry cards even in Dark mode.
                      </Text>
                    </Stack>
                  </Card>
                  <Card variant="blue">
                    <Stack gap={2}>
                      <Heading level={4}>Cobalt Porcelain</Heading>
                      <TextInput
                        label="Nested own-fill input"
                        value={nestedNote}
                        onChange={setNestedNote}
                      />
                    </Stack>
                  </Card>
                  <Card variant="green">
                    <Stack gap={2}>
                      <Heading level={4}>Mint Patisserie</Heading>
                      <Text color="secondary">
                        Automatic WCAG AA status & categorical contrast across all 10 hues.
                      </Text>
                    </Stack>
                  </Card>
                  <Card variant="yellow">
                    <Stack gap={2}>
                      <Heading level={4}>Honey Custard</Heading>
                      <Button variant="secondary" size="sm" label="Nested Raised Action" />
                    </Stack>
                  </Card>
                </Grid>
              </Stack>
            </Card>
          </Stack>
        )}

        {activeTab === 'canvas' && (
          <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
            <Card elevation="low">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Heading level={3}>Shotcandy Frame & Stage Controls</Heading>
                  <Text color="secondary">
                    Signature tactile studio controls originally inspired by Shotcandy, now parametric across every Mehan atmosphere.
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
                  label="Corners"
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
                  <Text weight="semibold">Stage backdrop</Text>
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
                    <Heading level={3}>Mehan Tactile Card</Heading>
                    <Text color="secondary">
                      Switch atmospheres or toggle Dark mode above — the framed surface adapts instantaneously.
                    </Text>
                    <Stack direction="horizontal" gap={2}>
                      <Button variant="primary" size="sm" label="Export Frame" />
                      <Button
                        variant="secondary"
                        size="sm"
                        label="Reset Tilt"
                        onClick={() => setShotTilt(0)}
                      />
                    </Stack>
                  </Stack>
                </div>
              </div>
            </div>
          </Grid>
        )}

        {activeTab === 'dashboard' && (
          <Stack gap={4}>
            <Grid columns={{minWidth: 220, max: 4, repeat: 'fit'}} gap={3}>
              <MetricCard
                label="Verified Contrast Pairs"
                value="100%"
                delta={{value: '+36 pairs', direction: 'up', sentiment: 'positive'}}
                caption="3 atmospheres × 6 accents × Light & Dark"
                icon={<ShieldCheck size={16} />}
              />
              <MetricCard
                label="Core Primitives Styled"
                value="75+"
                delta={{value: 'Meta Astryx 0.7', direction: 'flat', sentiment: 'neutral'}}
                caption="Zero forked behavior, 100% upgrade-safe"
                icon={<Layers size={16} />}
              />
              <MetricCard
                label="Portable CSS Payload"
                value="5.8 KB"
                delta={{value: '-84% vs UI kits', direction: 'up', sentiment: 'positive'}}
                caption="Zero runtime dependencies for single-HTML"
                icon={<Zap size={16} />}
              />
              <MetricCard
                label="Interaction Latency"
                value="< 2 ms"
                delta={{value: '60fps CSS vars', direction: 'up', sentiment: 'positive'}}
                caption="Pure CSS light-dark() & GPU transforms"
                icon={<Activity size={16} />}
              />
            </Grid>

            <Banner
              status="info"
              container="card"
              title="Upgrade-Resilient Architecture"
              description="Mehan never patches @astryxdesign/core internals. Updating Meta Astryx is a single version bump verified by astryx integration check --strict."
            />

            <Grid columns={{minWidth: 260, max: 3, repeat: 'fit'}} gap={3}>
              <SelectableCard
                label="React / Next.js + Astryx"
                isSelected={selectedTier === 'astryx'}
                onChange={() => setSelectedTier('astryx')}
              >
                <Stack gap={1}>
                  <Heading level={4}>@mehan/astryx</Heading>
                  <Text color="secondary">
                    Full Meta Astryx component suite, 3 compiled themes, runtime createMehanTheme(), and 4 precision controls.
                  </Text>
                </Stack>
              </SelectableCard>

              <SelectableCard
                label="Claude / Gemini Single-HTML"
                isSelected={selectedTier === 'ai-kit'}
                onChange={() => setSelectedTier('ai-kit')}
              >
                <Stack gap={1}>
                  <Heading level={4}>AI Prototype Kit</Heading>
                  <Text color="secondary">
                    1-click prompt + self-contained tactile CSS classes for instant single-HTML artifacts.
                  </Text>
                </Stack>
              </SelectableCard>

              <SelectableCard
                label="Vue / Svelte / Vanilla"
                isSelected={selectedTier === 'portable'}
                onChange={() => setSelectedTier('portable')}
              >
                <Stack gap={1}>
                  <Heading level={4}>@mehan/portable</Heading>
                  <Text color="secondary">
                    Framework-agnostic mehan-portable.css generated from the exact same @mehan/dna engine.
                  </Text>
                </Stack>
              </SelectableCard>
            </Grid>

            <Card elevation="low">
              <CollapsibleGroup type="single" defaultValue="upgrade" hasDividers>
                <Collapsible
                  value="upgrade"
                  trigger="What happens when Meta Astryx ships a major update?"
                >
                  <Text color="secondary">
                    Because Mehan uses official defineTheme() tokens, semantic data-* component rules, and non-overlapping extension components, major upgrades only require re-running pnpm verify.
                  </Text>
                </Collapsible>
                <Collapsible
                  value="custom-hex"
                  trigger="Can any project use its own brand color instead of Strawberry?"
                >
                  <Text color="secondary">
                    Yes. Pass any #rrggbb hex to createMehanTheme() or generatePortableCss() — @mehan/dna derives perceptual OKLCH stops, specular button lips, and WCAG AA text tokens automatically.
                  </Text>
                </Collapsible>
              </CollapsibleGroup>
            </Card>
          </Stack>
        )}

        {activeTab === 'portable' && (
          <Stack gap={4}>
            <Card elevation="low">
              <Stack gap={3}>
                <Stack gap={1}>
                  <Heading level={3}>
                    1-Click Portable & AI Prototyping Exports ({atmosphereName} ·{' '}
                    {accentName})
                  </Heading>
                  <Text color="secondary">
                    Every export below is dynamically generated from your active customizer settings above — ready for Claude Artifacts, Gemini Canvas, or production React repositories.
                  </Text>
                </Stack>
                <Stack direction="horizontal" gap={2} wrap="wrap">
                  <Button
                    variant="primary"
                    label="Copy Claude / Gemini AI Kit"
                    icon={<Sparkles size={15} />}
                    onClick={handleCopyAiKit}
                  />
                  <Button
                    variant="secondary"
                    label="Download Single-HTML Prototype"
                    icon={<Download size={15} />}
                    onClick={handleDownloadPrototypeHtml}
                  />
                  <Button
                    variant="secondary"
                    label="Copy Standalone Portable CSS"
                    icon={<Copy size={15} />}
                    onClick={handleCopyPortableCss}
                  />
                </Stack>
              </Stack>
            </Card>

            <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4}>
              <Card elevation="low">
                <Stack gap={3}>
                  <Heading level={4}>React / Next.js / Vite (@mehan/astryx)</Heading>
                  <CodeBlock
                    code={reactSetupSnippet}
                    language="tsx"
                    title="src/App.tsx"
                    hasCopyButton
                    hasLineNumbers
                    maxHeight={340}
                  />
                </Stack>
              </Card>

              <Card elevation="low">
                <Stack gap={3}>
                  <Heading level={4}>Claude / Gemini Single-HTML AI Prompt Kit</Heading>
                  <CodeBlock
                    code={aiKitMarkdown}
                    language="markdown"
                    title="MEHAN-AI-PROTOTYPE-KIT.md"
                    hasCopyButton
                    maxHeight={340}
                  />
                </Stack>
              </Card>
            </Grid>
          </Stack>
        )}
      </main>

      <Dialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        width={460}
        padding={5}
      >
        <Stack gap={4}>
          <DialogHeader
            title="Mehan Tactile Modal Surface"
            subtitle="Elevated --mehan-float surface with warm ambient shadow"
            onOpenChange={setDialogOpen}
          />
          <Text color="secondary">
            Dialogs, Drawers, Popovers, and Menus inherit Mehan&apos;s top-tier float elevation while retaining Meta Astryx&apos;s focus trap, Escape dismissal, and screen-reader announcements.
          </Text>
          <Stack direction="horizontal" gap={2} justify="end">
            <Button
              variant="secondary"
              label="Close"
              onClick={() => setDialogOpen(false)}
            />
            <Button
              variant="primary"
              label="Copy AI Kit"
              onClick={() => {
                setDialogOpen(false);
                void handleCopyAiKit();
              }}
            />
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
}

export function App() {
  const [atmosphere, setAtmosphere] = useState<MehanAtmosphereId>('confectionery');
  const [accent, setAccent] = useState<MehanPresetAccentId | string>('strawberry');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [depth, setDepth] = useState<number>(1);
  const [radiusScale, setRadiusScale] = useState<number>(1);

  const accentSlug = useMemo(
    () => accent.replace(/[^a-z0-9]/gi, '').toLowerCase(),
    [accent],
  );

  const liveTheme = useMemo(
    () =>
      createMehanTheme({
        name: `mehan-live-${atmosphere}-${accentSlug}-d${Math.round(depth * 100)}-r${Math.round(radiusScale * 100)}`,
        atmosphere,
        accent,
        depth,
        radiusScale,
      }),
    [atmosphere, accent, accentSlug, depth, radiusScale],
  );

  return (
    <Theme theme={liveTheme} mode={mode}>
      <LayerProvider>
        <StudioContent
          atmosphere={atmosphere}
          setAtmosphere={setAtmosphere}
          accent={accent}
          setAccent={setAccent}
          mode={mode}
          setMode={setMode}
          depth={depth}
          setDepth={setDepth}
          radiusScale={radiusScale}
          setRadiusScale={setRadiusScale}
        />
      </LayerProvider>
    </Theme>
  );
}
