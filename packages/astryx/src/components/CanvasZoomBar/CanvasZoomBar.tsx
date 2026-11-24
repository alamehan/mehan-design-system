'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Maximize2, Minus, Plus} from 'lucide-react';

export interface CanvasZoomBarProps {
  /** Controlled zoom percentage (e.g. 100 for 100%) */
  zoom: number;
  /** Called with clamped zoom percentage */
  onZoomChange: (zoom: number) => void;
  /** Minimum zoom percentage */
  min?: number;
  /** Maximum zoom percentage */
  max?: number;
  /** Increment/decrement step percentage */
  step?: number;
  /** Optional callback rendering the Fit-to-Screen button */
  onFitToScreen?: () => void;
  /** Preset zoom stops shown when clicking the percentage pill */
  presets?: readonly number[];
  /** Direction in which the preset menu opens */
  menuPlacement?: 'top' | 'bottom';
  /** Accessible toolbar label */
  label?: string;
}

const DEFAULT_ZOOM_PRESETS = [50, 100, 150, 200] as const;

export function CanvasZoomBar({
  zoom,
  onZoomChange,
  min = 25,
  max = 400,
  step = 25,
  onFitToScreen,
  presets = DEFAULT_ZOOM_PRESETS,
  menuPlacement = 'bottom',
  label = 'Canvas zoom',
}: CanvasZoomBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const readoutRef = useRef<HTMLButtonElement | null>(null);

  const clamp = (val: number) => Math.min(max, Math.max(min, Math.round(val)));

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        setMenuOpen(false);
        requestAnimationFrame(() => readoutRef.current?.focus());
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div
      ref={rootRef}
      role="toolbar"
      aria-label={label}
      className="mehan-canvas-zoom-bar">
      <button
        type="button"
        className="mehan-czb-btn"
        disabled={zoom <= min}
        aria-label="Zoom out"
        onClick={() => onZoomChange(clamp(zoom - step))}>
        <Minus size={14} aria-hidden="true" />
      </button>

      <button
        ref={readoutRef}
        type="button"
        className="mehan-czb-readout"
        aria-label={`Zoom level ${Math.round(zoom)}% — choose preset`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onDoubleClick={() => {
          setMenuOpen(false);
          onZoomChange(clamp(100));
        }}
        onClick={() => setMenuOpen(prev => !prev)}>
        {Math.round(zoom)}%
      </button>

      <button
        type="button"
        className="mehan-czb-btn"
        disabled={zoom >= max}
        aria-label="Zoom in"
        onClick={() => onZoomChange(clamp(zoom + step))}>
        <Plus size={14} aria-hidden="true" />
      </button>

      {onFitToScreen && (
        <>
          <span className="mehan-czb-divider" aria-hidden="true" />
          <button
            type="button"
            className="mehan-czb-btn"
            aria-label="Fit canvas to screen"
            title="Fit to screen"
            onClick={onFitToScreen}>
            <Maximize2 size={13} aria-hidden="true" />
          </button>
        </>
      )}

      {menuOpen && (
        <div
          role="menu"
          aria-label="Zoom presets"
          className="mehan-czb-menu"
          data-placement={menuPlacement}>
          {presets.map(p => (
            <button
              key={p}
              type="button"
              role="menuitem"
              className="mehan-czb-preset"
              data-active={Math.round(zoom) === p ? 'true' : undefined}
              onClick={() => {
                onZoomChange(clamp(p));
                setMenuOpen(false);
                requestAnimationFrame(() => readoutRef.current?.focus());
              }}>
              <span>{p}%</span>
              {p === 100 && <span className="mehan-czb-tag">Reset</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
