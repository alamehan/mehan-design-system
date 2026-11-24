'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pipette} from 'lucide-react';
import {ColorSwatch} from '../ColorSwatch/ColorSwatch';

export interface ColorPickerProps {
  /** Controlled 6-digit '#rrggbb' hex value */
  value: string;
  /** Called whenever color changes */
  onChange: (hex: string) => void;
  /** Optional quick-pick palette swatches */
  presets?: readonly string[];
  /** Optional accessible group label */
  label?: string;
}

const DEFAULT_PRESETS = [
  '#d42a5f',
  '#2563eb',
  '#059669',
  '#d95b16',
  '#7c3aed',
  '#0d9488',
  '#eab308',
  '#261b16',
] as const;

function hexToHsv(hex: string): [number, number, number] {
  const clean = /^#?[0-9a-fA-F]{6}$/.test(hex.trim())
    ? hex.trim().replace(/^#/, '')
    : 'd42a5f';
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const s = max === 0 ? 0 : d / max;
  return [h, s, max];
}

function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const byte = (n: number) =>
    Math.min(255, Math.max(0, Math.round((n + m) * 255)))
      .toString(16)
      .padStart(2, '0');
  return `#${byte(r)}${byte(g)}${byte(b)}`;
}

export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  label = 'Color picker',
}: ColorPickerProps) {
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(value));
  const [hexDraft, setHexDraft] = useState(value.toUpperCase());
  const [canEyeDropper, setCanEyeDropper] = useState(false);
  const svRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCanEyeDropper(typeof window !== 'undefined' && 'EyeDropper' in window);
  }, []);

  useEffect(() => {
    const currentHex = hsvToHex(hsv[0], hsv[1], hsv[2]).toLowerCase();
    if (value.toLowerCase() !== currentHex && /^#[0-9a-fA-F]{6}$/.test(value)) {
      setHsv(hexToHsv(value));
    }
    setHexDraft(value.toUpperCase());
  }, [value]);

  const commitHsv = useCallback(
    (nextH: number, nextS: number, nextV: number) => {
      const clamped: [number, number, number] = [
        Math.min(360, Math.max(0, nextH)),
        Math.min(1, Math.max(0, nextS)),
        Math.min(1, Math.max(0, nextV)),
      ];
      setHsv(clamped);
      const nextHex = hsvToHex(clamped[0], clamped[1], clamped[2]);
      setHexDraft(nextHex.toUpperCase());
      onChange(nextHex);
    },
    [onChange],
  );

  const updateFromPointer = (clientX: number, clientY: number) => {
    const box = svRef.current?.getBoundingClientRect();
    if (!box || box.width === 0 || box.height === 0) return;
    const s = (clientX - box.left) / box.width;
    const v = 1 - (clientY - box.top) / box.height;
    commitHsv(hsv[0], s, v);
  };

  const handleSvPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  };

  const handleSvPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateFromPointer(e.clientX, e.clientY);
  };

  const handleEyeDropper = async () => {
    if (!canEyeDropper) return;
    try {
      const EyeDropperCtor = (
        window as unknown as {
          EyeDropper: new () => {open: () => Promise<{sRGBHex: string}>};
        }
      ).EyeDropper;
      const result = await new EyeDropperCtor().open();
      if (/^#[0-9a-fA-F]{6}$/.test(result.sRGBHex)) {
        const next = result.sRGBHex.toLowerCase();
        setHsv(hexToHsv(next));
        setHexDraft(next.toUpperCase());
        onChange(next);
      }
    } catch {
      // User cancelled native eyedropper
    }
  };

  const pureHueHex = hsvToHex(hsv[0], 1, 1);

  return (
    <div className="mehan-color-picker" role="group" aria-label={label}>
      <div
        ref={svRef}
        className="mehan-cp-sv"
        style={{backgroundColor: pureHueHex}}
        role="slider"
        tabIndex={0}
        aria-label="Saturation and brightness"
        aria-valuetext={`Saturation ${Math.round(hsv[1] * 100)}%, Brightness ${Math.round(hsv[2] * 100)}%`}
        onPointerDown={handleSvPointerDown}
        onPointerMove={handleSvPointerMove}
        onKeyDown={e => {
          const step = e.shiftKey ? 0.02 : 0.05;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            commitHsv(hsv[0], hsv[1] + step, hsv[2]);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            commitHsv(hsv[0], hsv[1] - step, hsv[2]);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            commitHsv(hsv[0], hsv[1], hsv[2] + step);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            commitHsv(hsv[0], hsv[1], hsv[2] - step);
          }
        }}>
        <span
          className="mehan-cp-cursor"
          style={{
            left: `${hsv[1] * 100}%`,
            top: `${(1 - hsv[2]) * 100}%`,
            backgroundColor: value,
          }}
        />
      </div>

      <label className="mehan-cp-hue-wrap">
        <span className="mehan-sr-only">Hue</span>
        <input
          type="range"
          min={0}
          max={360}
          step={1}
          value={Math.round(hsv[0])}
          aria-label="Hue"
          className="mehan-cp-hue"
          onChange={e => commitHsv(Number(e.target.value), hsv[1], hsv[2])}
        />
      </label>

      <div className="mehan-cp-hex-row">
        <span
          className="mehan-cp-preview"
          style={{backgroundColor: value}}
          aria-hidden="true"
        />
        <input
          type="text"
          className="mehan-cp-hex-input"
          aria-label="Hex color value"
          value={hexDraft}
          maxLength={7}
          spellCheck={false}
          onChange={e => {
            const raw = e.target.value;
            setHexDraft(raw);
            const normalized = raw.startsWith('#') ? raw : `#${raw}`;
            if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
              const lower = normalized.toLowerCase();
              setHsv(hexToHsv(lower));
              onChange(lower);
            }
          }}
          onBlur={() => setHexDraft(value.toUpperCase())}
        />
        {canEyeDropper && (
          <button
            type="button"
            className="mehan-cp-eyedropper"
            aria-label="Pick color from screen"
            onClick={handleEyeDropper}>
            <Pipette size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {presets.length > 0 && (
        <div className="mehan-cp-presets" role="group" aria-label="Preset swatches">
          {presets.map(swatch => (
            <ColorSwatch
              key={swatch}
              color={swatch}
              size="sm"
              isSelected={swatch.toLowerCase() === value.toLowerCase()}
              onSelect={next => {
                setHsv(hexToHsv(next));
                setHexDraft(next.toUpperCase());
                onChange(next.toLowerCase());
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
