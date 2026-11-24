'use client';

import React, {useEffect, useId, useRef, useState} from 'react';
import {ColorPicker} from '../ColorPicker/ColorPicker';

export interface ColorWellProps {
  /** Controlled 6-digit '#rrggbb' hex color */
  value: string;
  /** Called with normalized lowercase '#rrggbb' hex on change */
  onChange: (hex: string) => void;
  /** Accessible label for the color well trigger */
  label?: string;
  /** Enable opacity alpha slider inside the popover */
  hasAlpha?: boolean;
  /** Controlled alpha opacity in range 0..1 */
  alpha?: number;
  /** Called whenever alpha opacity changes (0..1) */
  onAlphaChange?: (alpha: number) => void;
  /** Optional preset hex swatches inside the popover */
  presets?: readonly string[];
  /** Show tabular hex code beside the color chip */
  hasHexReadout?: boolean;
  /** Disable opening the color well */
  isDisabled?: boolean;
}

function chipRgba(hex: string, alpha: number): string {
  const clean = /^#?[0-9a-fA-F]{6}$/.test(hex.trim())
    ? hex.trim().replace(/^#/, '')
    : 'd42a5f';
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Number(alpha.toFixed(3))})`;
}

export function ColorWell({
  value,
  onChange,
  label = 'Choose color',
  hasAlpha = false,
  alpha = 1,
  onAlphaChange,
  presets,
  hasHexReadout = true,
  isDisabled = false,
}: ColorWellProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const clampedAlpha = Math.min(1, Math.max(0, alpha));
  const fillCss = hasAlpha ? chipRgba(value, clampedAlpha) : value;

  return (
    <div ref={rootRef} className="mehan-color-well">
      <button
        ref={triggerRef}
        type="button"
        className="mehan-color-well-trigger"
        disabled={isDisabled}
        aria-label={`${label}: ${value.toUpperCase()}${hasAlpha ? ` (${Math.round(clampedAlpha * 100)}%)` : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
        onClick={() => {
          if (!isDisabled) setOpen(prev => !prev);
        }}>
        <span className="mehan-cw-chip" aria-hidden="true">
          <span
            className="mehan-cw-chip-fill"
            style={{backgroundColor: fillCss}}
          />
        </span>
        {hasHexReadout && (
          <span className="mehan-cw-readout">
            {value.toUpperCase()}
            {hasAlpha ? ` · ${Math.round(clampedAlpha * 100)}%` : ''}
          </span>
        )}
      </button>

      {open && (
        <div
          id={popoverId}
          role="dialog"
          aria-label={label}
          className="mehan-color-well-popover">
          <ColorPicker
            label={label}
            value={value}
            onChange={onChange}
            hasAlpha={hasAlpha}
            alpha={clampedAlpha}
            onAlphaChange={onAlphaChange}
            presets={presets}
          />
        </div>
      )}
    </div>
  );
}
