'use client';

import React from 'react';

export interface GaugeProps {
  /** Current value within `[min, max]` */
  value: number;
  /** Minimum scale bound */
  min?: number;
  /** Maximum scale bound */
  max?: number;
  /** Accessible meter label and visible caption */
  label: string;
  /** Unit suffix appended to tabular readout */
  unit?: string;
  /** Semantic arc color */
  tone?: 'accent' | 'success' | 'warning' | 'error';
  /** Overall dial scale */
  size?: 'sm' | 'md' | 'lg';
}

const GAUGE_TONE: Record<NonNullable<GaugeProps['tone']>, string> = {
  accent: 'var(--color-accent)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
};

export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  unit = '%',
  tone = 'accent',
  size = 'md',
}: GaugeProps) {
  const safeMax = max > min ? max : min + 100;
  const clamped = Math.min(safeMax, Math.max(min, value));
  const ratio = (clamped - min) / (safeMax - min);

  const px = size === 'sm' ? 84 : size === 'lg' ? 132 : 108;
  const strokeW = size === 'sm' ? 8 : size === 'lg' ? 11 : 9.5;
  const radius = (px - strokeW * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const sweepFraction = 240 / 360;
  const arcLen = circumference * sweepFraction;
  const filledLen = arcLen * ratio;

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={safeMax}
      aria-valuenow={Math.round(clamped * 10) / 10}
      aria-valuetext={`${Math.round(clamped)}${unit}`}
      className="mehan-gauge"
      data-size={size}>
      <div className="mehan-gauge-stage" style={{width: px, height: px}}>
        <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} aria-hidden="true">
          <g transform={`rotate(150 ${px / 2} ${px / 2})`}>
            <circle
              cx={px / 2}
              cy={px / 2}
              r={radius}
              fill="none"
              stroke="var(--mehan-socket, var(--color-background-muted))"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeDasharray={`${arcLen} ${circumference}`}
            />
            {ratio > 0 && (
              <circle
                cx={px / 2}
                cy={px / 2}
                r={radius}
                fill="none"
                stroke={GAUGE_TONE[tone]}
                strokeWidth={strokeW}
                strokeLinecap="round"
                strokeDasharray={`${filledLen} ${circumference}`}
              />
            )}
          </g>
        </svg>
        <div className="mehan-gauge-center" aria-hidden="true">
          <span className="mehan-gauge-value">
            {Math.round(clamped)}
            <small>{unit}</small>
          </span>
        </div>
      </div>
      <span className="mehan-gauge-label">{label}</span>
    </div>
  );
}
