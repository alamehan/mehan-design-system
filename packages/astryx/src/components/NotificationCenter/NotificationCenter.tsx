'use client';

import React, {useEffect, useId, useRef, useState} from 'react';
import {Bell, CheckCheck} from 'lucide-react';

export interface NotificationEntry {
  /** Unique notification identifier */
  id: string;
  /** Sentence-case notification headline */
  title: string;
  /** Optional supporting summary */
  body?: string;
  /** Formatted timestamp or relative time */
  timestamp: string;
  /** Whether item has not been read yet */
  unread?: boolean;
  /** Optional category tag */
  category?: string;
}

export interface NotificationCenterProps {
  /** Ordered inbox notifications */
  items: readonly NotificationEntry[];
  /** Invoked when an unread notification row is clicked */
  onMarkRead?: (id: string) => void;
  /** Invoked when 'Mark all read' is clicked */
  onMarkAllRead?: () => void;
  /** Optional callback to clear notifications */
  onClearAll?: () => void;
  /** Accessible trigger & dialog label */
  label?: string;
  /** Calm empty state message when inbox or unread filter is empty */
  emptyMessage?: string;
}

export function NotificationCenter({
  items,
  onMarkRead,
  onMarkAllRead,
  onClearAll,
  label = 'Notifications',
  emptyMessage = 'You are all caught up.',
}: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId();

  const unreadCount = items.filter(i => i.unread).length;
  const shown = filter === 'unread' ? items.filter(i => i.unread) : items;

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
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="mehan-notification-center">
      <button
        ref={triggerRef}
        type="button"
        className="mehan-nc-trigger"
        aria-label={
          unreadCount > 0 ? `${label} (${unreadCount} unread)` : label
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(prev => !prev)}>
        <Bell size={15} aria-hidden="true" />
        <span>{label}</span>
        {unreadCount > 0 && (
          <span className="mehan-nc-badge" aria-hidden="true">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label={label}
          className="mehan-nc-popover">
          <div className="mehan-nc-header">
            <div className="mehan-nc-tabs" role="tablist" aria-label="Filter notifications">
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'all'}
                className="mehan-nc-tab"
                data-active={filter === 'all' ? 'true' : undefined}
                onClick={() => setFilter('all')}>
                All ({items.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'unread'}
                className="mehan-nc-tab"
                data-active={filter === 'unread' ? 'true' : undefined}
                onClick={() => setFilter('unread')}>
                Unread ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && onMarkAllRead && (
              <button
                type="button"
                className="mehan-nc-mark-all"
                onClick={onMarkAllRead}>
                <CheckCheck size={13} aria-hidden="true" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="mehan-nc-list">
            {shown.length === 0 ? (
              <div className="mehan-nc-empty">{emptyMessage}</div>
            ) : (
              shown.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="mehan-nc-item"
                  data-unread={item.unread ? 'true' : undefined}
                  onClick={() => {
                    if (item.unread) onMarkRead?.(item.id);
                  }}>
                  <span
                    className="mehan-nc-dot"
                    data-unread={item.unread ? 'true' : undefined}
                    aria-hidden="true"
                  />
                  <span className="mehan-nc-content">
                    <span className="mehan-nc-row-top">
                      <span className="mehan-nc-title">{item.title}</span>
                      <span className="mehan-nc-time">{item.timestamp}</span>
                    </span>
                    {item.body && (
                      <span className="mehan-nc-body">{item.body}</span>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>

          {items.length > 0 && onClearAll && (
            <div className="mehan-nc-footer">
              <button
                type="button"
                className="mehan-nc-clear"
                onClick={onClearAll}>
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
