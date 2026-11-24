'use client';

import React, {useCallback, useRef, useState} from 'react';

export interface AngleDialProps {
  /** Controlled angle in degrees (0..360) */
  value: number;
  /** Invoked with normalized integer degrees (0..359) on change */
  onChange: (degrees: number) => void;
  /** Visible and accessible control label */
  label?: string;
  /** Magnetic snap angles in degrees (hold Shift while dragging for 1° precision) */
  snapAngles?: readonly number[];
  /** Snap capture distance in degrees */
  snapThreshold?: number;
  /** Dial diameter scale */
  size?: 'sm' | 'md';
  /** Disable interaction */
  isDisabled?: boolean;
}

const DEFAULT_SNAPS = [0, 45, 90, 135, 180, 225, 270, 315] as const;

function normalizeDeg(deg: number): number {
  const mod = Math.round(deg) % 360;
  return mod < 0 ? mod + 360 : mod;
}

export function AngleDial({
  value,
  onChange,
  label = 'Angle',
  snapAngles = DEFAULT_SNAPS,
  snapThreshold = 4,
  size = 'md',
  isDisabled = false,
}: AngleDialProps) {
  const dialRef = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const normalized = normalizeDeg(value);

  const applyAngle = useCallback(
    (rawDeg: number, bypassSnap: boolean) => {
      let deg = normalizeDeg(rawDeg);
      if (!bypassSnap && snapAngles.length > 0) {
        for (const stop of snapAngles) {
          const s = normalizeDeg(stop);
          const diff = Math.min(Math.abs(deg - s), 360 - Math.abs(deg - s));
          if (diff <= snapThreshold) {
            deg = s;
            break;
          }
        }
      }
      onChange(deg);
    },
    [onChange, snapAngles, snapThreshold],
  );

  const updateFromPointer = (clientX: number, clientY: number, shiftKey: boolean) => {
    const box = dialRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    // CSS gradient convention: 0deg points UP (12 o'clock), 90deg points RIGHT (3 o'clock)
    const rad = Math.atan2(clientY - cy, clientX - cx);
    const degFromUp = (rad * 180) / Math.PI + 90;
    applyAngle(degFromUp, shiftKey);
  };

  return (
    <div
      className="mehan-angle-dial"
      data-size={size}
      data-disabled={isDisabled ? 'true' : undefined}>
      <div
        ref={dialRef}
        role="slider"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={normalized}
        aria-valuetext={`${normalized}°`}
        aria-disabled={isDisabled || undefined}
        className="mehan-ad-socket"
        onDoubleClick={() => {
          if (!isDisabled) onChange(135);
        }}
        onPointerDown={e => {
          if (isDisabled) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromPointer(e.clientX, e.clientY, e.shiftKey);
        }}
        onPointerMove={e => {
          if (isDisabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
          updateFromPointer(e.clientX, e.clientY, e.shiftKey);
        }}
        onKeyDown={e => {
          if (isDisabled) return;
          const step = e.shiftKey ? 1 : 5;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            onChange(normalizeDeg(normalized + step));
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            onChange(normalizeDeg(normalized - step));
          } else if (e.key === 'PageUp') {
            e.preventDefault();
            onChange(normalizeDeg(normalized + 45));
          } else if (e.key === 'PageDown') {
            e.preventDefault();
            onChange(normalizeDeg(normalized - 45));
          } else if (e.key === 'Home') {
            e.preventDefault();
            onChange(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            onChange(359);
          }
        }}>
        <div
          className="mehan-ad-rotor"
          style={{transform: `rotate(${normalized}deg)`}}
          aria-hidden="true">
          <span className="mehan-ad-needle" />
        </div>
      </div>

      <div className="mehan-ad-meta">
        <span className="mehan-ad-label">{label}</span>
        {editing ? (
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            aria-label={`${label} degrees`}
            className="mehan-ad-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={() => {
              const parsed = Number.parseFloat(draft);
              if (Number.isFinite(parsed)) onChange(normalizeDeg(parsed));
              setEditing(false);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                const parsed = Number.parseFloat(draft);
                if (Number.isFinite(parsed)) onChange(normalizeDeg(parsed));
                setEditing(false);
              } else if (e.key === 'Escape') {
                setEditing(false);
              }
            }}
          />
        ) : (
          <button
            type="button"
            disabled={isDisabled}
            className="mehan-ad-readout"
            aria-label={`Edit ${label} (${normalized}°)`}
            onClick={() => {
              setDraft(String(normalized));
              setEditing(true);
            }}>
            {normalized}°
          </button>
        )}
      </div>
    </div>
  );
}
