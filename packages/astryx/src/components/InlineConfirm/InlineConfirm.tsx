'use client';

import React, {useEffect, useRef, useState} from 'react';

export interface InlineConfirmProps {
  /** Initial sentence-case trigger button label (e.g. 'Remove member') */
  triggerLabel: string;
  /** Specific action verb shown on the armed confirmation button */
  confirmLabel?: string;
  /** Safe escape button label */
  cancelLabel?: string;
  /** Short inline verification prompt */
  prompt?: string;
  /** Invoked only after the armed confirmation button is clicked */
  onConfirm: () => void;
  /** Control height scale */
  size?: 'sm' | 'md';
  /** Disable arming the confirmation */
  isDisabled?: boolean;
}

export function InlineConfirm({
  triggerLabel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  prompt = 'Are you sure?',
  onConfirm,
  size = 'sm',
  isDisabled = false,
}: InlineConfirmProps) {
  const [armed, setArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!armed) return;
    requestAnimationFrame(() => cancelRef.current?.focus());
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setArmed(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setArmed(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [armed]);

  if (!armed) {
    return (
      <div ref={rootRef} className="mehan-inline-confirm" data-size={size}>
        <button
          ref={triggerRef}
          type="button"
          disabled={isDisabled}
          className="mehan-ic-trigger"
          onClick={() => {
            if (!isDisabled) setArmed(true);
          }}>
          {triggerLabel}
        </button>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={`${triggerLabel} confirmation`}
      className="mehan-inline-confirm is-armed"
      data-size={size}>
      <span className="mehan-ic-prompt">{prompt}</span>
      <button
        type="button"
        className="mehan-ic-confirm"
        onClick={() => {
          setArmed(false);
          onConfirm();
        }}>
        {confirmLabel}
      </button>
      <button
        ref={cancelRef}
        type="button"
        className="mehan-ic-cancel"
        onClick={() => {
          setArmed(false);
          requestAnimationFrame(() => triggerRef.current?.focus());
        }}>
        {cancelLabel}
      </button>
    </div>
  );
}
