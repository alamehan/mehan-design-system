'use client';

import React, {useMemo, useState} from 'react';
import {
  Dialog,
  DialogHeader,
  EmptyState,
  Kbd,
  Layout,
  LayoutContent,
  Text,
  TextInput,
} from '@astryxdesign/core';
import {Search} from 'lucide-react';
import {useRegisteredShortcuts} from '../../hooks/shortcuts';

export interface ShortcutSheetEntry {
  /** Key combo string such as `'mod+k'`, `'mod+shift+z'`, `'mod+enter'`, or `'?'`. */
  keys: string;
  /** Human-readable action description. */
  label: string;
  /** Category heading in the shortcut reference sheet. @default 'General' */
  group?: string;
}

export interface ShortcutSheetProps {
  /** Whether the modal shortcut reference dialog is open. */
  isOpen: boolean;
  /** Called when the dialog requests open/close state changes (`Escape`, close button, or backdrop). */
  onOpenChange: (isOpen: boolean) => void;
  /** Explicit shortcut entries to display (merged with live `useMehanShortcuts` registrations when `includeRegistered` is `true`). */
  shortcuts?: ReadonlyArray<ShortcutSheetEntry>;
  /** Automatically include all currently mounted `useMehanShortcuts` & `usePrimaryAction` bindings. @default true */
  includeRegistered?: boolean;
  /** Dialog heading. @default 'Keyboard shortcuts' */
  title?: string;
  /** Optional subtitle displayed in `DialogHeader`. */
  subtitle?: string;
  /** Search field placeholder. @default 'Filter shortcuts…' */
  searchPlaceholder?: string;
  /** Renders inline without modal `<dialog>` focus trap (for documentation specimen previews only). @default false */
  isInline?: boolean;
}

/**
 * Self-Documenting Keyboard Shortcut Reference (`ShortcutSheet`), built directly
 * on Meta Astryx's `Dialog`, `DialogHeader`, `Layout`, `TextInput`, and `Kbd`.
 * Formats platform-aware symbols (`⌘` on Apple, `Ctrl` on Windows/Linux) and
 * reads live bindings registered via `useMehanShortcuts`.
 */
export function ShortcutSheet({
  isOpen,
  onOpenChange,
  shortcuts = [],
  includeRegistered = true,
  title = 'Keyboard shortcuts',
  subtitle,
  searchPlaceholder = 'Filter shortcuts…',
  isInline = false,
}: ShortcutSheetProps) {
  const [query, setQuery] = useState('');
  const liveRegistered = useRegisteredShortcuts();

  const mergedGroups = useMemo(() => {
    const combined: ShortcutSheetEntry[] = [...shortcuts];
    if (includeRegistered) {
      for (const item of liveRegistered) {
        combined.push({
          keys: item.keys,
          label: item.label,
          group: item.group,
        });
      }
    }

    const q = query.trim().toLowerCase();
    const seen = new Set<string>();
    const byGroup = new Map<string, ShortcutSheetEntry[]>();

    for (const entry of combined) {
      const groupName = entry.group ?? 'General';
      const dedupe = `${groupName}::${entry.keys.toLowerCase()}::${entry.label}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);

      if (q) {
        const hay = `${groupName} ${entry.label} ${entry.keys}`.toLowerCase();
        if (!hay.includes(q)) continue;
      }

      const bucket = byGroup.get(groupName) ?? [];
      bucket.push(entry);
      byGroup.set(groupName, bucket);
    }

    return Array.from(byGroup.entries());
  }, [shortcuts, includeRegistered, liveRegistered, query]);

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} isInline={isInline}>
      <Layout
        height="auto"
        header={
          <DialogHeader
            title={title}
            subtitle={subtitle}
            onOpenChange={isInline ? undefined : onOpenChange}
            hasDivider
          />
        }
        content={
          <LayoutContent>
            <div className="mehan-shortcut-sheet">
              <TextInput
                label="Filter keyboard shortcuts"
                isLabelHidden
                hasClear
                size="sm"
                startIcon={<Search size={14} />}
                placeholder={searchPlaceholder}
                value={query}
                onChange={setQuery}
              />

              {mergedGroups.length === 0 ? (
                <EmptyState
                  isCompact
                  title="No matching shortcuts"
                  description="Try a different action name or key."
                />
              ) : (
                <div className="mehan-ss-groups">
                  {mergedGroups.map(([groupName, entries]) => (
                    <section key={groupName} className="mehan-ss-group">
                      <h3 className="mehan-ss-group-title">{groupName}</h3>
                      <ul className="mehan-ss-list">
                        {entries.map(item => (
                          <li
                            key={`${item.keys}-${item.label}`}
                            className="mehan-ss-row"
                          >
                            <Text>{item.label}</Text>
                            <span className="mehan-ss-keys">
                              <Kbd keys={item.keys} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </LayoutContent>
        }
      />
    </Dialog>
  );
}
