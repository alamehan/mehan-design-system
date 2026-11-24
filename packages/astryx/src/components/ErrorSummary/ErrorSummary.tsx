'use client';

import React, {useEffect, useRef} from 'react';
import {AlertCircle} from 'lucide-react';

export interface ErrorSummaryItem {
  /** Target form control DOM `id` focused when the link is activated */
  fieldId: string;
  /** Human-readable field label */
  fieldLabel: string;
  /** Blame-free recovery instruction */
  message: string;
}

export interface ErrorSummaryProps {
  /** List of field-level validation issues (renders nothing when empty) */
  errors: readonly ErrorSummaryItem[];
  /** Sentence-case summary heading */
  title?: string;
  /** Optional callback fired with `fieldId` when an error link is clicked */
  onSelectField?: (fieldId: string) => void;
  /** Focus the alert container automatically when errors appear on submit */
  autoFocusOnMount?: boolean;
}

export function ErrorSummary({
  errors,
  title = 'Fix the following issues before continuing',
  onSelectField,
  autoFocusOnMount = false,
}: ErrorSummaryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (autoFocusOnMount && errors.length > 0) {
      rootRef.current?.focus();
    }
  }, [autoFocusOnMount, errors.length]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={rootRef}
      role="alert"
      tabIndex={-1}
      className="mehan-error-summary">
      <div className="mehan-es-header">
        <AlertCircle size={16} aria-hidden="true" className="mehan-es-icon" />
        <span className="mehan-es-title">
          {title} ({errors.length})
        </span>
      </div>
      <ul className="mehan-es-list">
        {errors.map(item => (
          <li key={item.fieldId} className="mehan-es-item">
            <a
              href={`#${item.fieldId}`}
              className="mehan-es-link"
              onClick={e => {
                e.preventDefault();
                const el = document.getElementById(item.fieldId);
                if (el) {
                  const focusTarget = el.matches('input,textarea,select,button')
                    ? el
                    : el.querySelector<HTMLElement>(
                        'input,textarea,select,button,[tabindex="0"]',
                      ) ?? el;
                  focusTarget.scrollIntoView({block: 'nearest'});
                  focusTarget.focus();
                }
                onSelectField?.(item.fieldId);
              }}>
              <strong>{item.fieldLabel}:</strong> {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
