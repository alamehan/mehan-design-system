'use client';

import React, {useId, useState} from 'react';

export interface RatingProps {
  /** Current rating value (`0..max`) */
  value: number;
  /** Called when an interactive rating changes */
  onChange?: (value: number) => void;
  /** Maximum star count */
  max?: number;
  /** Allow 0.5 half-star increments */
  allowHalf?: boolean;
  /** Clicking the active rating resets back to 0 */
  allowClear?: boolean;
  /** Render non-interactive display stars */
  isReadOnly?: boolean;
  /** Star icon scale */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label */
  label?: string;
  /** Show tabular numeric readout beside stars */
  hasValueReadout?: boolean;
}

const STAR_PATH =
  'M12 2.4l2.92 5.92 6.53.95-4.72 4.6 1.11 6.5L12 17.3l-5.84 3.07 1.11-6.5-4.72-4.6 6.53-.95L12 2.4z';

export function Rating({
  value,
  onChange,
  max = 5,
  allowHalf = false,
  allowClear = true,
  isReadOnly = false,
  size = 'md',
  label = 'Rating',
  hasValueReadout = false,
}: RatingProps) {
  const gradPrefix = useId();
  const [hoverVal, setHoverVal] = useState<number | null>(null);
  const safeMax = Math.max(1, Math.min(10, Math.floor(max)));
  const interactive = !isReadOnly && Boolean(onChange);
  const displayVal = hoverVal ?? Math.min(safeMax, Math.max(0, value));
  const step = allowHalf ? 0.5 : 1;

  const px = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  const commit = (next: number) => {
    if (!interactive || !onChange) return;
    const clamped = Math.min(
      safeMax,
      Math.max(0, Math.round(next / step) * step),
    );
    onChange(clamped);
  };

  const starsContent = Array.from({length: safeMax}, (_, idx) => {
    const starNum = idx + 1;
    const fillFraction = Math.min(1, Math.max(0, displayVal - idx));
    const gradId = `${gradPrefix}-s-${idx}`;

    return (
      <span
        key={idx}
        className="mehan-rating-star"
        data-interactive={interactive ? 'true' : undefined}
        onMouseMove={
          interactive
            ? e => {
                if (!allowHalf) {
                  setHoverVal(starNum);
                  return;
                }
                const rect = e.currentTarget.getBoundingClientRect();
                const isLeftHalf = e.clientX - rect.left < rect.width / 2;
                setHoverVal(isLeftHalf ? idx + 0.5 : starNum);
              }
            : undefined
        }
        onClick={
          interactive
            ? e => {
                let target = starNum;
                if (allowHalf) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const isLeftHalf = e.clientX - rect.left < rect.width / 2;
                  target = isLeftHalf ? idx + 0.5 : starNum;
                }
                if (allowClear && target === value) {
                  commit(0);
                } else {
                  commit(target);
                }
              }
            : undefined
        }>
        <svg
          width={px}
          height={px}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mehan-rating-svg">
          {fillFraction > 0 && fillFraction < 1 && (
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset={`${Math.round(fillFraction * 100)}%`}
                  stopColor="var(--mehan-rating-active, #eab308)"
                />
                <stop
                  offset={`${Math.round(fillFraction * 100)}%`}
                  stopColor="var(--mehan-socket, var(--color-border-emphasized))"
                />
              </linearGradient>
            </defs>
          )}
          <path
            d={STAR_PATH}
            fill={
              fillFraction >= 1
                ? 'var(--mehan-rating-active, #eab308)'
                : fillFraction <= 0
                  ? 'var(--mehan-socket, var(--color-border-emphasized))'
                  : `url(#${gradId})`
            }
            stroke={
              fillFraction > 0
                ? 'var(--mehan-rating-stroke, #ca8a04)'
                : 'var(--color-border-emphasized)'
            }
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  });

  if (!interactive) {
    return (
      <div
        className="mehan-rating"
        data-size={size}
        role="img"
        aria-label={`${label}: ${value} out of ${safeMax}`}>
        <div className="mehan-rating-row">{starsContent}</div>
        {hasValueReadout && (
          <span className="mehan-rating-readout" aria-hidden="true">
            {value.toFixed(allowHalf ? 1 : 0)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mehan-rating" data-size={size}>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={value}
        aria-valuetext={`${value} out of ${safeMax}`}
        className="mehan-rating-row"
        onMouseLeave={() => setHoverVal(null)}
        onKeyDown={e => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            e.preventDefault();
            commit(value + step);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            e.preventDefault();
            commit(value - step);
          } else if (e.key === 'Home') {
            e.preventDefault();
            commit(0);
          } else if (e.key === 'End') {
            e.preventDefault();
            commit(safeMax);
          }
        }}>
        {starsContent}
      </div>
      {hasValueReadout && (
        <span className="mehan-rating-readout" aria-hidden="true">
          {displayVal.toFixed(allowHalf ? 1 : 0)}
        </span>
      )}
    </div>
  );
}
