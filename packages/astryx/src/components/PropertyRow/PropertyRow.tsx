'use client';

import React from 'react';
import {InfoTip} from '@astryxdesign/core';
import {RotateCcw} from 'lucide-react';

export interface PropertyRowProps {
  /** Concise property label displayed in the start column. */
  label: string;
  /** Compact control rendered in the flexible value column. */
  children: React.ReactNode;
  /** Optional `id` of the form control associated with the label. */
  htmlFor?: string;
  /** Optional short help note rendered via Meta Astryx's native `<InfoTip />`. */
  hint?: React.ReactNode;
  /** Highlights a modified-value dot and enables the 1-click reset button when `onReset` is provided. @default false */
  isModified?: boolean;
  /** Callback invoked to reset this property back to its default value. */
  onReset?: () => void;
  /** Accessible label for the reset action. */
  resetLabel?: string;
  /** Fixed or CSS width of the label column so stacked inspector rows align cleanly. @default 104 */
  labelWidth?: number | string;
  /** Vertical alignment between label and control (`'center'` for single-line controls, `'start'` for multi-line). @default 'center' */
  align?: 'center' | 'start';
  className?: string;
}

/**
 * Dense Horizontal Inspector Row (`PropertyRow`): engineered for `260px–340px`
 * studio, settings, and inspector panels where Astryx's page-level `FormLayout`
 * would collapse vertically. Integrates Astryx's native `InfoTip` and a 1-click
 * modified-value reset indicator.
 */
export function PropertyRow({
  label,
  children,
  htmlFor,
  hint,
  isModified = false,
  onReset,
  resetLabel,
  labelWidth = 104,
  align = 'center',
  className,
}: PropertyRowProps) {
  const widthCss = typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;

  return (
    <div
      className={['mehan-property-row', className].filter(Boolean).join(' ')}
      data-align={align}
      data-modified={isModified ? 'true' : undefined}
      style={{'--mehan-pr-label-w': widthCss} as React.CSSProperties}
    >
      <div className="mehan-pr-label-col">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="mehan-pr-label">
            {label}
          </label>
        ) : (
          <span className="mehan-pr-label">{label}</span>
        )}
        {hint && <InfoTip content={hint} label={`About ${label}`} size="xsm" />}
      </div>

      <div className="mehan-pr-control-col">{children}</div>

      <div className="mehan-pr-reset-col">
        {isModified && onReset ? (
          <button
            type="button"
            className="mehan-pr-reset-btn"
            aria-label={resetLabel ?? `Reset ${label} to default`}
            title={resetLabel ?? `Reset ${label}`}
            onClick={onReset}
          >
            <span className="mehan-pr-dirty-dot" aria-hidden="true" />
            <RotateCcw size={12} className="mehan-pr-reset-icon" aria-hidden="true" />
          </button>
        ) : isModified ? (
          <span
            className="mehan-pr-dirty-dot is-static"
            title={`${label} modified`}
            aria-label={`${label} modified`}
          />
        ) : null}
      </div>
    </div>
  );
}
