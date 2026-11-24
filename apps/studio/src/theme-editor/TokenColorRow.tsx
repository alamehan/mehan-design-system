import React, {useMemo, useState} from 'react';
import {IconButton, Popover, Stack, Text, TextInput} from '@astryxdesign/core';
import {ColorPicker} from '@mehan/astryx';
import {RotateCcw} from 'lucide-react';
import {
  colorWithAlphaToString,
  getTokenLabel,
  parseColorWithAlpha,
  parseLightDark,
} from './themeEditorModel';

interface TokenColorRowProps {
  tokenName: string;
  label?: string;
  effectiveValue: string;
  isOverridden: boolean;
  mode: 'light' | 'dark';
  swatches?: readonly string[];
  onChange: (newFullValue: string) => void;
  onReset: () => void;
}

export function TokenColorRow({
  tokenName,
  label,
  effectiveValue,
  isOverridden,
  mode,
  swatches,
  onChange,
  onReset,
}: TokenColorRowProps) {
  const [open, setOpen] = useState(false);

  const ld = useMemo(() => parseLightDark(effectiveValue), [effectiveValue]);
  const activeBranchValue = ld ? (mode === 'dark' ? ld.dark : ld.light) : effectiveValue;

  const parsed = useMemo(
    () => parseColorWithAlpha(activeBranchValue),
    [activeBranchValue],
  );

  const displayHex = parsed?.hex ?? '#888888';
  const alphaPct = Math.round((parsed?.alpha ?? 1) * 100);

  const commitBranchColor = (nextBranch: string) => {
    if (ld) {
      const nextFull =
        mode === 'dark'
          ? `light-dark(${ld.light}, ${nextBranch})`
          : `light-dark(${nextBranch}, ${ld.dark})`;
      onChange(nextFull);
    } else {
      onChange(nextBranch);
    }
  };

  const handleHexSelect = (nextHex: string) => {
    const clean = nextHex.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
      commitBranchColor(colorWithAlphaToString(clean, parsed?.alpha ?? 1));
    }
  };

  const handleRawInput = (nextText: string) => {
    commitBranchColor(nextText);
  };

  const handleAlphaInput = (nextPctStr: string) => {
    const num = Number.parseInt(nextPctStr, 10);
    if (!Number.isFinite(num)) return;
    const clamped = Math.min(100, Math.max(0, num)) / 100;
    commitBranchColor(colorWithAlphaToString(displayHex, clamped));
  };

  const readableLabel = label ?? getTokenLabel(tokenName);

  return (
    <div className="te-token-row">
      <div className="te-token-meta">
        <span className="te-token-label" title={tokenName}>
          {readableLabel}
          {isOverridden && <i className="te-override-dot" title="Overridden" />}
        </span>
        <code className="te-token-code">{tokenName}</code>
      </div>

      <div className="te-token-controls">
        <Popover
          isOpen={open}
          onOpenChange={setOpen}
          label={`Pick color for ${readableLabel}`}
          placement="below"
          alignment="end"
          content={
            <div style={{padding: 8, width: 256}}>
              <Stack gap={2}>
                <Text type="supporting" color="secondary">
                  {ld
                    ? `${readableLabel} (${mode === 'dark' ? 'Dark' : 'Light'} mode)`
                    : readableLabel}
                </Text>
                <ColorPicker
                  label={`${readableLabel} color`}
                  value={displayHex}
                  onChange={handleHexSelect}
                  presets={swatches}
                />
              </Stack>
            </div>
          }
        >
          <button
            type="button"
            className="te-color-swatch-btn"
            aria-label={`Edit ${readableLabel} color`}
            title={activeBranchValue}
          >
            <span
              className="te-color-swatch-fill"
              style={{backgroundColor: activeBranchValue}}
            />
          </button>
        </Popover>

        <div className="te-hex-input">
          <TextInput
            label={`${readableLabel} value`}
            isLabelHidden
            size="sm"
            value={activeBranchValue}
            onChange={handleRawInput}
          />
        </div>

        {parsed && (
          <div className="te-alpha-input">
            <TextInput
              label={`${readableLabel} opacity percent`}
              isLabelHidden
              size="sm"
              value={`${alphaPct}%`}
              onChange={handleAlphaInput}
            />
          </div>
        )}

        {isOverridden ? (
          <IconButton
            variant="ghost"
            size="sm"
            label={`Reset ${readableLabel}`}
            icon={<RotateCcw size={13} />}
            onClick={onReset}
          />
        ) : (
          <span className="te-reset-spacer" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
