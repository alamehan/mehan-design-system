'use client';

import React from 'react';

export interface ActivityRingItem {
  /** Stable ring identifier */
  id: string;
  /** Metric name shown in legend and SR table */
  label: string;
  /** Current achieved value */
  value: number;
  /** Target goal value (defaults to 100) */
  max?: number;
  /** Optional CSS color token or hex override */
  color?: string;
}

export interface ActivityRingProps {
  /** Up to 3 concentric goal rings ordered outer-to-inner */
  rings: readonly ActivityRingItem[];
  /** Accessible group caption */
  label: string;
  /** Outer SVG diameter in CSS px */
  size?: number;
  /** Render tabular legend beside the concentric rings */
  hasLegend?: boolean;
}

const DEFAULT_RING_COLORS = [
  'var(--color-accent)',
  'var(--color-data-categorical-teal, #0d9488)',
  'var(--color-data-categorical-purple, #7c3aed)',
] as const;

export function ActivityRing({
  rings,
  label,
  size = 96,
  hasLegend = true,
}: ActivityRingProps) {
  const visibleRings = rings.slice(0, 3);
  const strokeW = Math.max(6, Math.round(size * 0.095));
  const gap = 3;
  const center = size / 2;

  return (
    <div className="mehan-activity-ring" role="group" aria-label={label}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className="mehan-ar-svg">
        <g transform={`rotate(-90 ${center} ${center})`}>
          {visibleRings.map((ring, idx) => {
            const max = (ring.max ?? 100) > 0 ? (ring.max ?? 100) : 100;
            const ratio = Math.min(1, Math.max(0, ring.value / max));
            const r = center - strokeW / 2 - idx * (strokeW + gap) - 2;
            if (r <= 4) return null;
            const c = 2 * Math.PI * r;
            const stroke = ring.color ?? DEFAULT_RING_COLORS[idx % DEFAULT_RING_COLORS.length];
            return (
              <React.Fragment key={ring.id}>
                <circle
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="var(--mehan-socket, var(--color-background-muted))"
                  strokeWidth={strokeW}
                />
                {ratio > 0 && (
                  <circle
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeDasharray={`${c * ratio} ${c}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </g>
      </svg>

      {hasLegend && (
        <ul className="mehan-ar-legend">
          {visibleRings.map((ring, idx) => {
            const max = (ring.max ?? 100) > 0 ? (ring.max ?? 100) : 100;
            const pct = Math.round((ring.value / max) * 100);
            const dotColor =
              ring.color ?? DEFAULT_RING_COLORS[idx % DEFAULT_RING_COLORS.length];
            return (
              <li key={ring.id} className="mehan-ar-legend-item">
                <span
                  className="mehan-ar-dot"
                  style={{backgroundColor: dotColor}}
                  aria-hidden="true"
                />
                <span className="mehan-ar-legend-label">{ring.label}</span>
                <span className="mehan-ar-legend-pct">{pct}%</span>
              </li>
            );
          })}
        </ul>
      )}

      {!hasLegend && (
        <table className="mehan-sr-only">
          <caption>{label}</caption>
          <tbody>
            {visibleRings.map(ring => (
              <tr key={ring.id}>
                <td>{ring.label}</td>
                <td>
                  {ring.value} / {ring.max ?? 100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
