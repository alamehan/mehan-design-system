'use client';

import React, {useEffect, useId, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';

export interface SplitButtonItem {
  /** Stable identifier passed to onSelectItem */
  id: string;
  /** Sentence-case menu action label */
  label: string;
  /** Optional supporting explanation beneath the item label */
  description?: string;
  /** Style item with semantic error ink for destructive secondary actions */
  isDestructive?: boolean;
  /** Disable selection while keeping item discoverable */
  isDisabled?: boolean;
}

export interface SplitButtonProps {
  /** Sentence-case primary action label */
  label: string;
  /** Invoked when the primary segment is activated */
  onAction: () => void;
  /** Secondary related actions revealed from the trailing chevron trigger */
  items: readonly SplitButtonItem[];
  /** Invoked with item.id when an overflow action is chosen */
  onSelectItem?: (id: string) => void;
  /** Surface emphasis matching Mehan 3D button hierarchy */
  variant?: 'primary' | 'secondary';
  /** Control height scale */
  size?: 'sm' | 'md' | 'lg';
  /** Disable both primary and menu segments */
  isDisabled?: boolean;
  /** Accessible suffix for the trailing menu trigger */
  menuLabel?: string;
}

export function SplitButton({
  label,
  onAction,
  items,
  onSelectItem,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  menuLabel = 'More actions',
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();

  const enabledIndices = items
    .map((item, index) => (item.isDisabled ? -1 : index))
    .filter(index => index >= 0);

  const openMenuAt = (targetIndex?: number) => {
    if (isDisabled || enabledIndices.length === 0) return;
    const initial =
      targetIndex !== undefined && !items[targetIndex]?.isDisabled
        ? targetIndex
        : enabledIndices[0] ?? 0;
    setActiveIndex(initial);
    setOpen(true);
    requestAnimationFrame(() => {
      itemRefs.current[initial]?.focus();
    });
  };

  const closeMenu = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeMenu(true);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const moveFocus = (delta: 1 | -1) => {
    if (enabledIndices.length === 0) return;
    const pos = enabledIndices.indexOf(activeIndex);
    const nextPos =
      pos === -1
        ? 0
        : (pos + delta + enabledIndices.length) % enabledIndices.length;
    const nextIdx = enabledIndices[nextPos];
    setActiveIndex(nextIdx);
    itemRefs.current[nextIdx]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="mehan-split-btn"
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? 'true' : undefined}
      role="group"
      aria-label={label}>
      <button
        type="button"
        className="mehan-split-main"
        disabled={isDisabled}
        onClick={() => {
          if (!isDisabled) onAction();
        }}>
        <span>{label}</span>
      </button>
      <button
        ref={triggerRef}
        type="button"
        className="mehan-split-trigger"
        disabled={isDisabled}
        aria-label={`${label} — ${menuLabel}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => {
          if (open) closeMenu(false);
          else openMenuAt();
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            openMenuAt(enabledIndices[0]);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            openMenuAt(enabledIndices[enabledIndices.length - 1]);
          }
        }}>
        <ChevronDown
          size={size === 'sm' ? 13 : 15}
          aria-hidden="true"
          className="mehan-split-chevron"
          data-open={open ? 'true' : undefined}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={`${label} options`}
          className="mehan-split-menu"
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              moveFocus(1);
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              moveFocus(-1);
            } else if (e.key === 'Home' && enabledIndices.length > 0) {
              e.preventDefault();
              const first = enabledIndices[0];
              setActiveIndex(first);
              itemRefs.current[first]?.focus();
            } else if (e.key === 'End' && enabledIndices.length > 0) {
              e.preventDefault();
              const last = enabledIndices[enabledIndices.length - 1];
              setActiveIndex(last);
              itemRefs.current[last]?.focus();
            }
          }}>
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              type="button"
              role="menuitem"
              tabIndex={index === activeIndex && !item.isDisabled ? 0 : -1}
              aria-disabled={item.isDisabled || undefined}
              className="mehan-split-item"
              data-destructive={item.isDestructive ? 'true' : undefined}
              onFocus={() => {
                if (!item.isDisabled) setActiveIndex(index);
              }}
              onClick={() => {
                if (item.isDisabled) return;
                onSelectItem?.(item.id);
                closeMenu(true);
              }}>
              <span className="mehan-split-item-label">{item.label}</span>
              {item.description && (
                <span className="mehan-split-item-desc">{item.description}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
