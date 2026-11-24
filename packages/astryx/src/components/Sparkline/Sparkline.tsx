'use client';

import React, {useId, useState} from 'react';

export interface SparklineProps {
  /** Numeric series plotted in order */
  data: readonly number[];
  /** Optional point labels paired with `data` in the screen-reader table and hover badge */
  labels?: readonly string[];
  /** Accessible chart caption required for screen-reader summary */
  label: string;
  /** Visual geometry mode */
  variant?: 'line' | 'area' | 'bar';
  /** Semantic color tone */
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  /** SVG viewport width in CSS px */
  width?: number;
  /** SVG viewport height in CSS px */
  height?: number;
  /** Render a highlighted dot on the final value in line/area modes */
  showEndDot?: boolean;
}

const TONE_COLOR: Record<NonNullable<SparklineProps['tone']>, string> = {
  accent: 'var(--color-accent)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  neutral: 'var(--color-text-secondary)',
};

export function Sparkline({
  data,
  labels,
  label,
  variant = 'area',
  tone = 'accent',
  width = 148,
  height = 40,
  showEndDot = true,
}: SparklineProps) {
  const gradId = useId();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const safeData = data.length > 0 ? data : [0];
  const minVal = Math.min(...safeData);
  const maxVal = Math.max(...safeData);
  const range = maxVal - minVal || 1;
  const padX = 5;
  const padY = 5;
  const innerW = Math.max(10, width - padX * 2);
  const innerH = Math.max(10, height - padY * 2);

  const coords = safeData.map((val, idx) => {
    const x =
      safeData.length === 1
        ? padX + innerW / 2
        : padX + (idx / (safeData.length - 1)) * innerW;
    const y = padY + innerH - ((val - minVal) / range) * innerH;
    return {x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), val};
  });

  const linePath = coords
    .map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt.x},${pt.y}`)
    .join(' ');
  const areaPath = `${linePath} L${coords[coords.length - 1].x},${padY + innerH} L${coords[0].x},${padY + innerH} Z`;
  const strokeColor = TONE_COLOR[tone];
  const activeIdx = hoverIdx ?? coords.length - 1;
  const activePt = coords[activeIdx];

  return (
    <div
      className="mehan-sparkline"
      onMouseLeave={() => setHoverIdx(null)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
        className="mehan-sparkline-svg"
        onMouseMove={e => {
          if (coords.length <= 1) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const rel = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
          setHoverIdx(Math.round(rel * (coords.length - 1)));
        }}>
        {variant === 'area' && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
        )}

        {variant === 'bar' ? (
          coords.map((pt, idx) => {
            const barGap = 2;
            const barW = Math.max(
              2,
              (innerW - barGap * (coords.length - 1)) / coords.length,
            );
            const bx = padX + idx * (barW + barGap);
            const barH = Math.max(3, ((pt.val - minVal) / range) * innerH);
            const by = padY + innerH - barH;
            return (
              <rect
                key={idx}
                x={bx}
                y={by}
                width={barW}
                height={barH}
                rx={2}
                fill={strokeColor}
                opacity={hoverIdx === null || hoverIdx === idx ? 0.92 : 0.42}
              />
            );
          })
        ) : (
          <>
            {variant === 'area' && <path d={areaPath} fill={`url(#${gradId})`} />}
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {(showEndDot || hoverIdx !== null) && activePt && (
              <circle
                cx={activePt.x}
                cy={activePt.y}
                r="3.2"
                fill={strokeColor}
                stroke="var(--color-background-card, #ffffff)"
                strokeWidth="1.5"
              />
            )}
          </>
        )}
      </svg>

      {hoverIdx !== null && activePt && (
        <span className="mehan-sparkline-readout" aria-hidden="true">
          {labels?.[hoverIdx] ? `${labels[hoverIdx]}: ` : ''}
          {activePt.val}
        </span>
      )}

      {/* Companion Accessible Data Table (WCAG 1.1.1 Non-text Content) */}
      <table className="mehan-sr-only">
        <caption>{label}</caption>
        <thead>
          <tr>
            <th scope="col">Point</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {safeData.map((val, idx) => (
            <tr key={idx}>
              <td>{labels?.[idx] ?? `Point ${idx + 1}`}</td>
              <td>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
