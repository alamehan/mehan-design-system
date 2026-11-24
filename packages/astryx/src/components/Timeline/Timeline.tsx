'use client';

import React from 'react';

export interface TimelineEntry {
  /** Unique event identifier */
  id: string;
  /** Sentence-case event title */
  title: string;
  /** Formatted timestamp or relative time string */
  timestamp: string;
  /** Optional supporting detail */
  description?: string;
  /** Optional actor or subsystem badge text */
  actor?: string;
  /** Semantic pin status color */
  status?: 'default' | 'accent' | 'success' | 'warning' | 'error';
}

export interface TimelineProps {
  /** Chronological audit or activity events */
  items: readonly TimelineEntry[];
  /** Accessible ordered-list label */
  label?: string;
  /** Vertical spacing rhythm */
  density?: 'compact' | 'comfortable';
}

export function Timeline({
  items,
  label = 'Activity timeline',
  density = 'comfortable',
}: TimelineProps) {
  return (
    <ol
      className="mehan-timeline"
      data-density={density}
      aria-label={label}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <li
            key={item.id}
            className="mehan-tl-item"
            data-status={item.status ?? 'default'}>
            <div className="mehan-tl-rail" aria-hidden="true">
              <span className="mehan-tl-pin" />
              {!isLast && <span className="mehan-tl-line" />}
            </div>
            <div className="mehan-tl-body">
              <div className="mehan-tl-head">
                <span className="mehan-tl-title">{item.title}</span>
                <span className="mehan-tl-time">{item.timestamp}</span>
              </div>
              {(item.actor || item.description) && (
                <div className="mehan-tl-sub">
                  {item.actor && (
                    <span className="mehan-tl-actor">{item.actor}</span>
                  )}
                  {item.description && (
                    <span className="mehan-tl-desc">{item.description}</span>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
