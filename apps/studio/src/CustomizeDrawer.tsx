import React, {useRef, useState} from 'react';
import {
  Badge,
  Button,
  Divider,
  Drawer,
  DrawerHeader,
  Popover,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Text,
  TextInput,
  useToast,
} from '@astryxdesign/core';
import {ColorPicker, ColorSwatch, PrecisionSlider} from '@mehan/astryx';
import {
  MEHAN_ACCENT_PRESETS,
  isPresetAccent,
  type MehanAtmosphereId,
  type MehanDensity,
  type MehanMotion,
  type ResolvedMehanDna,
} from '@mehan/astryx/dna';
import {Download, Palette, RotateCcw, Save, Trash2, Upload} from 'lucide-react';
import type {StudioCopy} from './i18n';
import {
  DEFAULT_STUDIO_CONFIG,
  downloadTextFile,
  type NamedStudioPreset,
  type StudioConfig,
} from './studioState';

const PRESET_ACCENT_LIST = Object.values(MEHAN_ACCENT_PRESETS);
const PRESET_HEX_SWATCHES = PRESET_ACCENT_LIST.map(p => p.seed);

interface CustomizeDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  copy: StudioCopy;
  config: StudioConfig;
  setConfig: React.Dispatch<React.SetStateAction<StudioConfig>>;
  dna: ResolvedMehanDna;
  inkContrast: string;
  buttonContrast: string;
  accentTextContrast: string;
  presets: NamedStudioPreset[];
  setPresets: React.Dispatch<React.SetStateAction<NamedStudioPreset[]>>;
}

export function CustomizeDrawer({
  isOpen,
  onOpenChange,
  copy,
  config,
  setConfig,
  dna,
  inkContrast,
  buttonContrast,
  accentTextContrast,
  presets,
  setPresets,
}: CustomizeDrawerProps) {
  const showToast = useToast();
  const [presetName, setPresetName] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSavePreset = () => {
    const trimmed = presetName.trim();
    if (!trimmed) return;
    const nextPreset: NamedStudioPreset = {
      id: `preset-${Date.now()}`,
      name: trimmed,
      config: {...config},
    };
    setPresets(prev => [...prev, nextPreset]);
    setPresetName('');
    showToast({type: 'info', body: `Saved preset "${trimmed}".`});
  };

  const handleExportJson = () => {
    const payload = JSON.stringify(
      {
        $schema: 'https://mehan.design/schemas/studio-theme-v1.json',
        version: '1.0.0',
        config,
      },
      null,
      2,
    );
    downloadTextFile(
      `mehan-theme-${config.atmosphere}.json`,
      `${payload}\n`,
      'application/json',
    );
    showToast({type: 'info', body: 'Exported theme configuration JSON.'});
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          config?: Partial<StudioConfig>;
        } & Partial<StudioConfig>;
        const src = parsed.config ?? parsed;
        setConfig(prev => ({
          atmosphere:
            src.atmosphere === 'porcelain' || src.atmosphere === 'stone'
              ? src.atmosphere
              : src.atmosphere === 'confectionery'
                ? 'confectionery'
                : prev.atmosphere,
          accent: typeof src.accent === 'string' && src.accent ? src.accent : prev.accent,
          depth: typeof src.depth === 'number' ? src.depth : prev.depth,
          radiusScale:
            typeof src.radiusScale === 'number' ? src.radiusScale : prev.radiusScale,
          density: src.density === 'compact' ? 'compact' : 'standard',
          motion:
            src.motion === 'calm' || src.motion === 'standard'
              ? src.motion
              : 'expressive',
        }));
        showToast({type: 'info', body: `Imported theme from ${file.name}.`});
      } catch {
        showToast({
          type: 'error',
          body: 'Select a valid Mehan theme JSON file.',
        });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      side="end"
      width={420}
      label={copy.drawer.title}
      padding={5}
    >
      <Stack gap={4}>
        <DrawerHeader
          title={copy.drawer.title}
          subtitle={copy.drawer.subtitle}
          onOpenChange={onOpenChange}
        />

        <div className="studio-telemetry-strip">
          <Badge variant="success" label={copy.drawer.wcagBadge} />
          <Badge variant="neutral" label={`Ink ${inkContrast}:1`} />
          <Badge variant="neutral" label={`CTA ${buttonContrast}:1`} />
          <Badge variant="neutral" label={`Accent ${accentTextContrast}:1`} />
        </div>

        <Divider />

        <Stack gap={1.5}>
          <Text weight="semibold">{copy.drawer.atmosphereLabel}</Text>
          <SegmentedControl
            label={copy.drawer.atmosphereLabel}
            size="sm"
            value={config.atmosphere}
            onChange={val =>
              setConfig(prev => ({
                ...prev,
                atmosphere: val as MehanAtmosphereId,
              }))
            }
          >
            <SegmentedControlItem value="confectionery" label="Confectionery" />
            <SegmentedControlItem value="porcelain" label="Porcelain" />
            <SegmentedControlItem value="stone" label="Stone" />
          </SegmentedControl>
        </Stack>

        <Stack gap={2}>
          <Text weight="semibold">{copy.drawer.accentLabel}</Text>
          <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
            {PRESET_ACCENT_LIST.map(preset => (
              <ColorSwatch
                key={preset.id}
                size="md"
                color={preset.seed}
                label={`${preset.name} accent`}
                isSelected={config.accent === preset.id}
                onSelect={() => setConfig(prev => ({...prev, accent: preset.id}))}
              />
            ))}
            <Popover
              label={copy.drawer.customHexBtn}
              alignment="end"
              padding={2}
              content={
                <ColorPicker
                  label="Custom brand hex"
                  value={dna.accent.seed}
                  presets={PRESET_HEX_SWATCHES}
                  onChange={hex => setConfig(prev => ({...prev, accent: hex}))}
                />
              }
            >
              <Button
                variant="secondary"
                size="sm"
                label={
                  isPresetAccent(config.accent)
                    ? copy.drawer.customHexBtn
                    : dna.accent.seed.toUpperCase()
                }
                icon={<Palette size={14} />}
              />
            </Popover>
          </Stack>
        </Stack>

        <Stack gap={3}>
          <PrecisionSlider
            label={copy.drawer.depthLabel}
            value={config.depth}
            min={0.5}
            max={1.5}
            step={0.05}
            stops={[1]}
            unit="x"
            onChange={depth => setConfig(prev => ({...prev, depth}))}
          />
          <PrecisionSlider
            label={copy.drawer.radiusLabel}
            value={config.radiusScale}
            min={0.75}
            max={1.25}
            step={0.05}
            stops={[1]}
            unit="x"
            onChange={radiusScale => setConfig(prev => ({...prev, radiusScale}))}
          />
        </Stack>

        <Stack gap={1.5}>
          <Text weight="semibold">{copy.drawer.densityLabel}</Text>
          <SegmentedControl
            label={copy.drawer.densityLabel}
            size="sm"
            value={config.density}
            onChange={val =>
              setConfig(prev => ({...prev, density: val as MehanDensity}))
            }
          >
            <SegmentedControlItem value="standard" label="Standard (36px)" />
            <SegmentedControlItem value="compact" label="Compact (32px)" />
          </SegmentedControl>
          <Text color="secondary">{copy.drawer.densityHint}</Text>
        </Stack>

        <Stack gap={1.5}>
          <Text weight="semibold">{copy.drawer.motionLabel}</Text>
          <SegmentedControl
            label={copy.drawer.motionLabel}
            size="sm"
            value={config.motion}
            onChange={val =>
              setConfig(prev => ({...prev, motion: val as MehanMotion}))
            }
          >
            <SegmentedControlItem value="expressive" label="Expressive" />
            <SegmentedControlItem value="standard" label="Standard" />
            <SegmentedControlItem value="calm" label="Calm" />
          </SegmentedControl>
        </Stack>

        <Divider />

        <Stack gap={2}>
          <Text weight="semibold">{copy.drawer.presetsTitle}</Text>
          <div className="studio-preset-chips">
            {presets.map(p => (
              <div key={p.id} className="studio-preset-chip">
                <Button
                  variant="secondary"
                  size="sm"
                  label={p.name}
                  onClick={() => setConfig({...p.config})}
                />
                {!p.id.startsWith('preset-') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    label="Remove"
                    icon={<Trash2 size={13} />}
                    onClick={() =>
                      setPresets(prev => prev.filter(item => item.id !== p.id))
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <Stack direction="horizontal" gap={2} align="end">
            <div style={{flex: 1, minWidth: 0}}>
              <TextInput
                label={copy.drawer.presetsTitle}
                isLabelHidden
                placeholder={copy.drawer.presetPlaceholder}
                value={presetName}
                onChange={setPresetName}
              />
            </div>
            <Button
              variant="secondary"
              size="md"
              label={copy.drawer.savePreset}
              icon={<Save size={14} />}
              onClick={handleSavePreset}
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="horizontal" gap={2} wrap="wrap">
          <Button
            variant="secondary"
            size="sm"
            label={copy.drawer.exportJson}
            icon={<Download size={14} />}
            onClick={handleExportJson}
          />
          <Button
            variant="secondary"
            size="sm"
            label={copy.drawer.importJson}
            icon={<Upload size={14} />}
            onClick={() => fileInputRef.current?.click()}
          />
          <Button
            variant="ghost"
            size="sm"
            label={copy.drawer.resetDefault}
            icon={<RotateCcw size={14} />}
            onClick={() => setConfig(DEFAULT_STUDIO_CONFIG)}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            style={{display: 'none'}}
            onChange={handleImportFile}
          />
        </Stack>
      </Stack>
    </Drawer>
  );
}
