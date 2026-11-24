'use client';

import React, {useRef, useState} from 'react';

export interface PrecisionSliderProps {
  /** Visible control label */
  label: string;
  /** Current numeric value */
  value: number;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Step increment (default 1) */
  step?: number;
  /** Optional unit suffix (e.g. 'px', '%', '°') */
  unit?: string;
  /** Optional magnetic snap stops (Alt bypasses snap; Shift slows drag 0.25x) */
  stops?: readonly number[];
  /** Fill outward from 0 for bipolar ranges like -45..+45 */
  isCentered?: boolean;
  /** Disable interaction */
  isDisabled?: boolean;
  /** Change handler */
  onChange: (nextValue: number) => void;
}

function clampValue(v: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, v));
  const rounded = Math.round((clamped - min) / step) * step + min;
  const decimals = (String(step).split('.')[1] ?? '').length;
  return Number(Math.min(max, Math.max(min, rounded)).toFixed(decimals));
}

export function PrecisionSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  stops = [],
  isCentered = false,
  isDisabled = false,
  onChange,
}: PrecisionSliderProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [snappedBump, setSnappedBump] = useState(false);
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    active: boolean;
    anchorX: number;
    anchorValue: number;
    shiftHeld: boolean;
  }>({active: false, anchorX: 0, anchorValue: value, shiftHeld: false});

  const span = Math.max(1e-6, max - min);
  const pct = Math.min(100, Math.max(0, ((value - min) / span) * 100));
  const zeroPct = Math.min(100, Math.max(0, ((0 - min) / span) * 100));
  const fillLeft = isCentered ? Math.min(zeroPct, pct) : 0;
  const fillWidth = isCentered ? Math.abs(pct - zeroPct) : pct;

  const applySnap = (raw: number, altKey: boolean): number => {
    if (!altKey && stops.length > 0) {
      const snapRadius = span * 0.03;
      for (const stop of stops) {
        if (Math.abs(raw - stop) <= snapRadius) {
          if (value !== stop) {
            setSnappedBump(true);
            window.setTimeout(() => setSnappedBump(false), 120);
          }
          return clampValue(stop, min, max, step);
        }
      }
    }
    return clampValue(raw, min, max, step);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const clickRatio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const initialVal = applySnap(min + clickRatio * span, e.altKey);
    dragState.current = {
      active: true,
      anchorX: e.clientX,
      anchorValue: initialVal,
      shiftHeld: e.shiftKey,
    };
    onChange(initialVal);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || isDisabled) return;
    const rect = railRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    // Re-anchor smoothly if Shift precision modifier toggles mid-drag!
    if (e.shiftKey !== dragState.current.shiftHeld) {
      dragState.current.anchorX = e.clientX;
      dragState.current.anchorValue = value;
      dragState.current.shiftHeld = e.shiftKey;
    }

    const speed = e.shiftKey ? 0.25 : 1;
    const deltaVal = ((e.clientX - dragState.current.anchorX) / rect.width) * span * speed;
    const next = applySnap(dragState.current.anchorValue + deltaVal, e.altKey);
    onChange(next);
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  const commitDraft = () => {
    setEditing(false);
    const parsed = Number(draft.replace(/[^0-9.+-]/g, ''));
    if (Number.isFinite(parsed)) {
      onChange(clampValue(parsed, min, max, step));
    }
  };

  return (
    <div className="mehan-precision-slider" data-disabled={isDisabled ? 'true' : undefined}>
      <span className="mehan-ps-label">{label}</span>

      <div
        ref={railRef}
        className="mehan-ps-rail-hit"
        role="slider"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}${unit}`}
        aria-disabled={isDisabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={e => {
          if (isDisabled) return;
          const mult = e.shiftKey ? 10 : 1;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(clampValue(value + step * mult, min, max, step));
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(clampValue(value - step * mult, min, max, step));
          } else if (e.key === 'Home') {
            e.preventDefault();
            onChange(min);
          } else if (e.key === 'End') {
            e.preventDefault();
            onChange(max);
          }
        }}>
        <div className="mehan-ps-track">
          <div
            className="mehan-ps-fill"
            style={{left: `${fillLeft}%`, width: `${fillWidth}%`}}
          />
          {stops.map(s => {
            const stopPct = ((s - min) / span) * 100;
            return (
              <span
                key={s}
                className="mehan-ps-stop"
                style={{left: `${stopPct}%`}}
                aria-hidden="true"
              />
            );
          })}
        </div>
        <span
          className="mehan-ps-knob"
          data-bump={snappedBump ? 'true' : undefined}
          style={{left: `${pct}%`}}
          aria-hidden="true"
        />
      </div>

      {editing ? (
        <input
          type="text"
          inputMode="decimal"
          className="mehan-ps-value-input"
          aria-label={`${label} exact value`}
          value={draft}
          autoFocus
          onChange={e => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commitDraft();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setEditing(false);
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="mehan-ps-value-btn"
          disabled={isDisabled}
          aria-label={`Edit ${label} value (${value}${unit})`}
          onClick={() => {
            setDraft(String(value));
            setEditing(true);
          }}>
          {value}
          {unit}
        </button>
      )}
    </div>
  );
}
