'use client';

import React from 'react';
import {ArrowDownRight, ArrowRight, ArrowUpRight} from 'lucide-react';

export interface MetricCardDelta {
  /** Formatted change value, e.g. '+18.4%' */
  value: string;
  /** Movement direction */
  direction: 'up' | 'down' | 'flat';
  /** Semantic sentiment (defaults: up=positive, down=negative, flat=neutral) */
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface MetricCardProps {
  /** Metric title shown above headline value */
  label: string;
  /** Pre-formatted headline numeral rendered in tabular Geist Mono / Display */
  value: React.ReactNode;
  /** Optional trend badge */
  delta?: MetricCardDelta;
  /** Supporting caption below value */
  caption?: string;
  /** Optional leading icon or badge */
  icon?: React.ReactNode;
}

export function MetricCard({
  label,
  value,
  delta,
  caption,
  icon,
}: MetricCardProps) {
  const resolvedSentiment =
    delta?.sentiment ??
    (delta?.direction === 'up'
      ? 'positive'
      : delta?.direction === 'down'
        ? 'negative'
        : 'neutral');

  return (
    <div className="mehan-metric-card">
      <div className="mehan-mc-header">
        <span className="mehan-mc-label">{label}</span>
        {icon && <span className="mehan-mc-icon">{icon}</span>}
      </div>

      <div className="mehan-mc-value-row">
        <span className="mehan-mc-value">{value}</span>
        {delta && (
          <span className="mehan-mc-delta" data-sentiment={resolvedSentiment}>
            {delta.direction === 'up' ? (
              <ArrowUpRight size={13} aria-hidden="true" />
            ) : delta.direction === 'down' ? (
              <ArrowDownRight size={13} aria-hidden="true" />
            ) : (
              <ArrowRight size={13} aria-hidden="true" />
            )}
            <span>{delta.value}</span>
          </span>
        )}
      </div>

      {caption && <p className="mehan-mc-caption">{caption}</p>}
    </div>
  );
}
