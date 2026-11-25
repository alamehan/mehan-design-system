'use client';

import React from 'react';

export type CanvasStageBackdrop = 'dots' | 'grid' | 'checkerboard' | 'plain';

export interface CanvasStageProps {
  /** Primary interactive viewport content (`<svg>`, `<canvas>`, WebGL, product preview, or diagram). */
  children: React.ReactNode;
  /** Subtle tactile stage backdrop pattern. @default 'dots' */
  backdrop?: CanvasStageBackdrop;
  /** Non-blocking HUD slot anchored to the top-start corner. */
  topStart?: React.ReactNode;
  /** Non-blocking HUD slot anchored to the top-end corner. */
  topEnd?: React.ReactNode;
  /** Non-blocking HUD slot anchored to the bottom-start corner. */
  bottomStart?: React.ReactNode;
  /** Non-blocking HUD slot anchored to the bottom-end corner (ideal for `<CanvasZoomBar />`). */
  bottomEnd?: React.ReactNode;
  /** Optional docked bottom transport bar (ideal for `<TimelineScrubber />`). */
  transport?: React.ReactNode;
  /** Hides corner HUD overlays and transport bar for distraction-free focus. @default false */
  isZen?: boolean;
  /** Minimum height of the interactive viewport (`px` number or CSS dimension). @default 320 */
  minHeight?: number | string;
  /** Accessible region label for screen readers. @default 'Interactive canvas stage' */
  label?: string;
  className?: string;
}

/**
 * Level-2 Interactive Viewport Stage (`CanvasStage`): provides a recessed tactile
 * canvas frame (`dots` | `grid` | `checkerboard` | `plain`) with non-blocking corner
 * HUD slots (`pointer-events: none` wrapper with `pointer-events: auto` controls)
 * and a docked bottom transport bar. Composes inside `<WorkspaceLayout />` or `<Card />`.
 */
export function CanvasStage({
  children,
  backdrop = 'dots',
  topStart,
  topEnd,
  bottomStart,
  bottomEnd,
  transport,
  isZen = false,
  minHeight = 320,
  label = 'Interactive canvas stage',
  className,
}: CanvasStageProps) {
  const minHeightCss = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  const hasHud = Boolean(!isZen && (topStart || topEnd || bottomStart || bottomEnd));

  return (
    <section
      className={['mehan-canvas-stage', className].filter(Boolean).join(' ')}
      data-backdrop={backdrop}
      data-zen={isZen ? 'true' : undefined}
      aria-label={label}
    >
      <div className="mehan-cs-viewport" style={{minHeight: minHeightCss}}>
        <div className="mehan-cs-content">{children}</div>

        {hasHud && (
          <div className="mehan-cs-hud-layer">
            {topStart && (
              <div className="mehan-cs-hud-slot" data-corner="top-start">
                {topStart}
              </div>
            )}
            {topEnd && (
              <div className="mehan-cs-hud-slot" data-corner="top-end">
                {topEnd}
              </div>
            )}
            {bottomStart && (
              <div className="mehan-cs-hud-slot" data-corner="bottom-start">
                {bottomStart}
              </div>
            )}
            {bottomEnd && (
              <div className="mehan-cs-hud-slot" data-corner="bottom-end">
                {bottomEnd}
              </div>
            )}
          </div>
        )}
      </div>

      {!isZen && transport && (
        <div className="mehan-cs-transport">{transport}</div>
      )}
    </section>
  );
}
