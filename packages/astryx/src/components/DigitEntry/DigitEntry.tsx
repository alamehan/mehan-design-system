'use client';

import React, {useRef} from 'react';

export interface DigitEntryProps {
  /** Controlled code string (up to `length` characters) */
  value: string;
  /** Called whenever any character slot changes */
  onChange: (value: string) => void;
  /** Automatically invoked once all `length` slots are filled */
  onComplete?: (value: string) => void;
  /** Total number of character cells */
  length?: number;
  /** Accepted character set */
  mode?: 'numeric' | 'alphanumeric';
  /** Accessible group label */
  label?: string;
  /** Optional slot index (1-based) after which a visual dash separator renders (e.g. 3 -> 123-456) */
  hasSeparatorAfter?: number;
  /** Mark all cells with semantic error border and aria-invalid */
  isInvalid?: boolean;
  /** Disable all character cells */
  isDisabled?: boolean;
  /** Autocomplete hint on the first input cell */
  autoComplete?: string;
}

export function DigitEntry({
  value,
  onChange,
  onComplete,
  length = 6,
  mode = 'numeric',
  label = 'Verification code',
  hasSeparatorAfter,
  isInvalid = false,
  isDisabled = false,
  autoComplete = 'one-time-code',
}: DigitEntryProps) {
  const safeLen = Math.max(2, Math.min(12, Math.floor(length)));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const pattern = mode === 'numeric' ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;
  const cleanChars = (raw: string): string =>
    [...raw]
      .filter(ch => pattern.test(ch))
      .map(ch => (mode === 'alphanumeric' ? ch.toUpperCase() : ch))
      .join('');

  const chars = Array.from({length: safeLen}, (_, idx) => value[idx] ?? '');

  const commitChars = (nextArr: string[], focusIdx?: number) => {
    const joined = nextArr.join('').slice(0, safeLen);
    onChange(joined);
    if (
      focusIdx !== undefined &&
      focusIdx >= 0 &&
      focusIdx < safeLen
    ) {
      requestAnimationFrame(() => {
        inputRefs.current[focusIdx]?.focus();
        inputRefs.current[focusIdx]?.select();
      });
    }
    if (nextArr.every(c => c.length === 1) && joined.length === safeLen) {
      onComplete?.(joined);
    }
  };

  return (
    <div
      className="mehan-digit-entry"
      data-invalid={isInvalid ? 'true' : undefined}
      data-disabled={isDisabled ? 'true' : undefined}
      role="group"
      aria-label={label}>
      {chars.map((ch, idx) => (
        <React.Fragment key={idx}>
          <input
            ref={el => {
              inputRefs.current[idx] = el;
            }}
            type="text"
            inputMode={mode === 'numeric' ? 'numeric' : 'text'}
            autoComplete={idx === 0 ? autoComplete : 'off'}
            maxLength={safeLen}
            disabled={isDisabled}
            aria-label={`${label} digit ${idx + 1} of ${safeLen}`}
            aria-invalid={isInvalid || undefined}
            className="mehan-de-cell"
            value={ch}
            onFocus={e => e.currentTarget.select()}
            onChange={e => {
              const typed = cleanChars(e.target.value);
              if (!typed) {
                const next = [...chars];
                next[idx] = '';
                commitChars(next, idx);
                return;
              }
              // Multi-char autofill or rapid entry distributes across remaining cells
              if (typed.length > 1) {
                const next = [...chars];
                for (let k = 0; k < typed.length && idx + k < safeLen; k += 1) {
                  next[idx + k] = typed[k];
                }
                const nextFocus = Math.min(safeLen - 1, idx + typed.length);
                commitChars(next, nextFocus);
                return;
              }
              const next = [...chars];
              next[idx] = typed[0];
              commitChars(next, Math.min(safeLen - 1, idx + 1));
            }}
            onPaste={e => {
              e.preventDefault();
              const pasted = cleanChars(e.clipboardData.getData('text'));
              if (!pasted) return;
              const next = [...chars];
              const start = idx === 0 || chars.every(c => !c) ? 0 : idx;
              for (let k = 0; k < pasted.length && start + k < safeLen; k += 1) {
                next[start + k] = pasted[k];
              }
              const focusTarget = Math.min(safeLen - 1, start + pasted.length - 1);
              commitChars(next, focusTarget);
            }}
            onKeyDown={e => {
              if (e.key === 'Backspace') {
                e.preventDefault();
                const next = [...chars];
                if (next[idx]) {
                  next[idx] = '';
                  commitChars(next, idx);
                } else if (idx > 0) {
                  next[idx - 1] = '';
                  commitChars(next, idx - 1);
                }
              } else if (e.key === 'ArrowLeft' && idx > 0) {
                e.preventDefault();
                inputRefs.current[idx - 1]?.focus();
              } else if (e.key === 'ArrowRight' && idx < safeLen - 1) {
                e.preventDefault();
                inputRefs.current[idx + 1]?.focus();
              } else if (e.key === 'Home') {
                e.preventDefault();
                inputRefs.current[0]?.focus();
              } else if (e.key === 'End') {
                e.preventDefault();
                inputRefs.current[safeLen - 1]?.focus();
              }
            }}
          />
          {hasSeparatorAfter === idx + 1 && idx < safeLen - 1 && (
            <span className="mehan-de-sep" aria-hidden="true">
              –
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
