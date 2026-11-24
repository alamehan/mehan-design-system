'use client';

import React from 'react';
import {CopyButton} from '../CopyButton/CopyButton';

export interface MiddleTruncateProps {
  /** Full unbroken text string (file path, hash, API key, or UUID) */
  text: string;
  /** Number of trailing characters preserved after the ellipsis */
  endChars?: number;
  /** Render in tabular monospace code font */
  monospace?: boolean;
  /** Append a compact CopyButton that copies the full unbroken text */
  copyable?: boolean;
  /** Accessible label for the inline copy button */
  copyLabel?: string;
}

export function MiddleTruncate({
  text,
  endChars = 10,
  monospace = false,
  copyable = false,
  copyLabel = 'Copy full value',
}: MiddleTruncateProps) {
  const safeEnd = Math.max(2, Math.floor(endChars));
  const shouldSplit = text.length > safeEnd + 6;
  const head = shouldSplit ? text.slice(0, text.length - safeEnd) : text;
  const tail = shouldSplit ? text.slice(text.length - safeEnd) : '';

  return (
    <span
      className="mehan-mid-truncate-wrap"
      data-mono={monospace ? 'true' : undefined}>
      <span className="mehan-mid-truncate" title={text}>
        <span className="mehan-sr-only">{text}</span>
        <span className="mehan-mid-head" aria-hidden="true">
          {head}
        </span>
        {tail && (
          <span className="mehan-mid-tail" aria-hidden="true">
            {tail}
          </span>
        )}
      </span>
      {copyable && (
        <CopyButton
          value={text}
          variant="icon"
          size="sm"
          label={copyLabel}
        />
      )}
    </span>
  );
}
