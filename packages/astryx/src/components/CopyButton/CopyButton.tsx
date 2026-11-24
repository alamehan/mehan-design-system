'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Check, Copy} from 'lucide-react';
import {copyTextSafe} from '../../runtime';

export interface CopyButtonProps {
  /** Exact text payload copied to the clipboard */
  value: string;
  /** Idle sentence-case button label */
  label?: string;
  /** Confirmation label announced and shown after copying */
  copiedLabel?: string;
  /** Visual presentation style */
  variant?: 'secondary' | 'ghost' | 'icon';
  /** Control height scale */
  size?: 'sm' | 'md';
  /** Milliseconds before resetting back to idle state */
  resetDelayMs?: number;
  /** Disable copying */
  isDisabled?: boolean;
  /** Optional callback fired after clipboard write attempt */
  onCopied?: (ok: boolean) => void;
}

export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  variant = 'secondary',
  size = 'sm',
  resetDelayMs = 1800,
  isDisabled = false,
  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    if (isDisabled) return;
    const ok = await copyTextSafe(value);
    if (ok) {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), resetDelayMs);
    }
    onCopied?.(ok);
  };

  const isIconOnly = variant === 'icon';
  const iconPx = size === 'sm' ? 13 : 15;

  return (
    <button
      type="button"
      className="mehan-copy-btn"
      data-variant={variant}
      data-size={size}
      data-copied={copied ? 'true' : undefined}
      disabled={isDisabled}
      aria-label={isIconOnly ? (copied ? copiedLabel : label) : undefined}
      title={isIconOnly ? (copied ? copiedLabel : label) : undefined}
      onClick={() => void handleCopy()}>
      <span className="mehan-copy-icon" aria-hidden="true">
        {copied ? <Check size={iconPx} /> : <Copy size={iconPx} />}
      </span>
      {!isIconOnly && (
        <span className="mehan-copy-label-stack">
          <span
            className="mehan-copy-sizer"
            aria-hidden="true">
            {label.length >= copiedLabel.length ? label : copiedLabel}
          </span>
          <span className="mehan-copy-visible-label">
            {copied ? copiedLabel : label}
          </span>
        </span>
      )}
      <span className="mehan-sr-only" role="status" aria-live="polite">
        {copied ? copiedLabel : ''}
      </span>
    </button>
  );
}
