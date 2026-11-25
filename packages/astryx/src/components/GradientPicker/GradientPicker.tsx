'use client';

import React, {useMemo, useRef, useState} from 'react';
import {Trash2} from 'lucide-react';
import {mixOklab} from '@mehan/dna';
import {AngleDial} from '../AngleDial/AngleDial';
import {ColorWell} from '../ColorWell/ColorWell';

export interface GradientStop {
  /** Unique stop identifier */
  id: string;
  /** 6-digit '#rrggbb' stop color */
  color: string;
  /** Stop position along gradient axis in range 0..100 */
  position: number;
}

export interface GradientPickerProps {
  /** Ordered or unordered gradient color stops (minimum 2 recommended) */
  stops: readonly GradientStop[];
  /** Invoked whenever stops are moved, recolored, added, or removed */
  onStopsChange: (stops: GradientStop[]) => void;
  /** Linear gradient angle in degrees (0..360) */
  angle?: number;
  /** Optional callback to edit linear gradient angle */
  onAngleChange?: (angle: number) => void;
  /** Gradient geometry mode */
  kind?: 'linear' | 'radial';
  /** Optional callback to switch between linear and radial geometry */
  onKindChange?: (kind: 'linear' | 'radial') => void;
  /** Accessible group label */
  label?: string;
}

export function formatGradientCss(
  stops: readonly GradientStop[],
  kind: 'linear' | 'radial' = 'linear',
  angle = 135,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const stopList = sorted
    .map(s => `${s.color} ${Math.round(Math.min(100, Math.max(0, s.position)))}%`)
    .join(', ');
  return kind === 'radial'
    ? `radial-gradient(circle at center, ${stopList})`
    : `linear-gradient(${Math.round(angle)}deg, ${stopList})`;
}

function interpolateAtPosition(
  stops: readonly GradientStop[],
  pos: number,
): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  if (sorted.length === 0) return '#d42a5f';
  if (pos <= sorted[0].position) return sorted[0].color;
  if (pos >= sorted[sorted.length - 1].position) {
    return sorted[sorted.length - 1].color;
  }
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const left = sorted[i];
    const right = sorted[i + 1];
    if (pos >= left.position && pos <= right.position) {
      const span = Math.max(1, right.position - left.position);
      return mixOklab(left.color, right.color, (pos - left.position) / span);
    }
  }
  return sorted[0].color;
}

export function GradientPicker({
  stops,
  onStopsChange,
  angle = 135,
  onAngleChange,
  kind = 'linear',
  onKindChange,
  label = 'Gradient editor',
}: GradientPickerProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [selectedId, setSelectedId] = useState<string>(stops[0]?.id ?? '');
  const draggingIdRef = useRef<string | null>(null);

  const sortedStops = useMemo(
    () => [...stops].sort((a, b) => a.position - b.position),
    [stops],
  );

  const activeStop =
    stops.find(s => s.id === selectedId) ?? sortedStops[0] ?? null;

  const railCss = useMemo(
    () => formatGradientCss(sortedStops, 'linear', 90),
    [sortedStops],
  );
  const previewCss = useMemo(
    () => formatGradientCss(sortedStops, kind, angle),
    [sortedStops, kind, angle],
  );

  const posFromClientX = (clientX: number): number => {
    const box = barRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return 50;
    return Math.round(
      Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)),
    );
  };

  const updateStopPosition = (id: string, nextPos: number) => {
    const clamped = Math.round(Math.min(100, Math.max(0, nextPos)));
    onStopsChange(
      stops.map(s => (s.id === id ? {...s, position: clamped} : s)),
    );
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    const next = stops.filter(s => s.id !== id);
    onStopsChange(next);
    if (selectedId === id && next[0]) {
      setSelectedId(next[0].id);
    }
  };

  return (
    <div className="mehan-gradient-picker" role="group" aria-label={label}>
      <div
        className="mehan-gp-preview"
        style={{backgroundImage: previewCss}}
        aria-hidden="true"
      />

      {/* Interactive Multi-Stop Rail (click empty track to insert OKLab-interpolated stop) */}
      <div
        ref={barRef}
        className="mehan-gp-bar-hit"
        onClick={e => {
          if ((e.target as HTMLElement).closest('.mehan-gp-handle')) return;
          const pos = posFromClientX(e.clientX);
          const newStop: GradientStop = {
            id: `stop-${Date.now()}-${pos}`,
            color: interpolateAtPosition(stops, pos),
            position: pos,
          };
          onStopsChange([...stops, newStop]);
          setSelectedId(newStop.id);
        }}>
        <div
          className="mehan-gp-bar-track"
          style={{backgroundImage: railCss}}
        />
        {sortedStops.map((stop, idx) => {
          const isSelected = activeStop?.id === stop.id;
          return (
            <button
              key={stop.id}
              type="button"
              role="slider"
              aria-label={`Gradient stop ${idx + 1} (${stop.color.toUpperCase()})`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(stop.position)}
              aria-valuetext={`${Math.round(stop.position)}% ${stop.color.toUpperCase()}`}
              className="mehan-gp-handle"
              data-selected={isSelected ? 'true' : undefined}
              style={{
                left: `${stop.position}%`,
                backgroundColor: stop.color,
              }}
              onClick={e => {
                e.stopPropagation();
                setSelectedId(stop.id);
              }}
              onPointerDown={e => {
                e.stopPropagation();
                setSelectedId(stop.id);
                draggingIdRef.current = stop.id;
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={e => {
                if (
                  draggingIdRef.current !== stop.id ||
                  !e.currentTarget.hasPointerCapture(e.pointerId)
                ) {
                  return;
                }
                updateStopPosition(stop.id, posFromClientX(e.clientX));
              }}
              onPointerUp={() => {
                draggingIdRef.current = null;
              }}
              onKeyDown={e => {
                const step = e.shiftKey ? 1 : 2;
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  updateStopPosition(stop.id, stop.position + step);
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  updateStopPosition(stop.id, stop.position - step);
                } else if (
                  (e.key === 'Backspace' || e.key === 'Delete') &&
                  stops.length > 2
                ) {
                  e.preventDefault();
                  removeStop(stop.id);
                }
              }}
            />
          );
        })}
      </div>

      {/* Selected Stop & Geometry Inspector Row */}
      <div className="mehan-gp-controls">
        {activeStop && (
          <div className="mehan-gp-stop-editor">
            <ColorWell
              size="sm"
              label="Selected stop color"
              value={activeStop.color}
              onChange={hex =>
                onStopsChange(
                  stops.map(s =>
                    s.id === activeStop.id ? {...s, color: hex} : s,
                  ),
                )
              }
            />
            <label className="mehan-gp-pos-field">
              <span className="mehan-sr-only">Stop position percent</span>
              <input
                type="number"
                min={0}
                max={100}
                aria-label="Stop position percent"
                className="mehan-gp-pos-input"
                value={Math.round(activeStop.position)}
                onChange={e => {
                  const n = Number(e.target.value);
                  if (Number.isFinite(n)) updateStopPosition(activeStop.id, n);
                }}
              />
              <span className="mehan-gp-pos-unit">%</span>
            </label>
            <button
              type="button"
              className="mehan-gp-delete-btn"
              disabled={stops.length <= 2}
              aria-label="Remove selected gradient stop"
              title={
                stops.length <= 2
                  ? 'At least 2 stops required'
                  : 'Remove selected stop'
              }
              onClick={() => removeStop(activeStop.id)}>
              <Trash2 size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="mehan-gp-geometry">
          {onKindChange && (
            <div
              className="mehan-gp-kind-switch"
              role="radiogroup"
              aria-label="Gradient type">
              {(['linear', 'radial'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  role="radio"
                  aria-checked={kind === mode}
                  className="mehan-gp-kind-btn"
                  data-selected={kind === mode ? 'true' : undefined}
                  onClick={() => onKindChange(mode)}>
                  {mode === 'linear' ? 'Linear' : 'Radial'}
                </button>
              ))}
            </div>
          )}
          {kind === 'linear' && onAngleChange && (
            <AngleDial
              size="sm"
              label="Angle"
              value={angle}
              onChange={onAngleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
