'use client';

import React, {useMemo} from 'react';
import {
  Button,
  CheckboxInput,
  IconButton,
  Popover,
  Text,
  type ColumnSettingsOption,
  type UseTableColumnSettingsStateReturn,
} from '@astryxdesign/core';
import {ArrowDown, ArrowUp, RotateCcw, SlidersHorizontal} from 'lucide-react';

export interface ColumnSettingsMenuProps<TColumnKey extends string = string> {
  /** All configurable columns (same `ColumnSettingsOption` contract as `@astryxdesign/core`). */
  columns: ReadonlyArray<ColumnSettingsOption<TColumnKey>>;
  /** Optional direct binding to Astryx's headless `useTableColumnSettingsState(...)` return object. */
  state?: UseTableColumnSettingsStateReturn<TColumnKey>;
  /** Standalone controlled active column keys (used when `state` is omitted). */
  activeColumnKeys?: ReadonlyArray<TColumnKey>;
  /** Standalone change callback (used when `state` is omitted). */
  onChangeActiveColumnKeys?: (keys: ReadonlyArray<TColumnKey>) => void;
  /** Default column keys restored by `Reset` in standalone mode. */
  defaultColumnKeys?: ReadonlyArray<TColumnKey>;
  /** Trigger button label. @default 'Columns' */
  triggerLabel?: string;
  /** Allow reordering visible columns with Up / Down controls. @default true */
  allowReorder?: boolean;
  /** Button size forwarded to Astryx `Button`. @default 'sm' */
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Ready-to-drop UI companion for Meta Astryx's headless `useTableColumnSettingsState`
 * (`Table` plugin), built directly on Astryx `Popover`, `Button`, `IconButton`, and `CheckboxInput`.
 * Guards `isAlwaysVisible` columns AND prevents hiding the last remaining visible column.
 */
export function ColumnSettingsMenu<TColumnKey extends string = string>({
  columns,
  state,
  activeColumnKeys: propActiveKeys,
  onChangeActiveColumnKeys,
  defaultColumnKeys,
  triggerLabel = 'Columns',
  allowReorder = true,
  size = 'sm',
  className,
}: ColumnSettingsMenuProps<TColumnKey>) {
  const activeKeys = state?.activeColumnKeys ?? propActiveKeys ?? columns.map(c => c.key);

  const commitKeys = (nextKeys: ReadonlyArray<TColumnKey>) => {
    if (state) {
      state.setActiveColumnKeys([...nextKeys]);
    } else {
      onChangeActiveColumnKeys?.(nextKeys);
    }
  };

  // Order columns so currently active columns appear in their display order first, followed by hidden ones
  const orderedColumns = useMemo(() => {
    const byKey = new Map(columns.map(c => [c.key, c]));
    const result: ColumnSettingsOption<TColumnKey>[] = [];
    const seen = new Set<TColumnKey>();
    for (const k of activeKeys) {
      const col = byKey.get(k);
      if (col && !seen.has(k)) {
        result.push(col);
        seen.add(k);
      }
    }
    for (const col of columns) {
      if (!seen.has(col.key)) {
        result.push(col);
        seen.add(col.key);
      }
    }
    return result;
  }, [columns, activeKeys]);

  const activeSet = useMemo(() => new Set(activeKeys), [activeKeys]);

  const handleToggle = (col: ColumnSettingsOption<TColumnKey>) => {
    if (col.isAlwaysVisible) return;
    const isCurrentlyActive = activeSet.has(col.key);
    if (isCurrentlyActive && activeKeys.length <= 1) return;

    if (state) {
      state.toggleColumn(col.key);
      return;
    }

    if (isCurrentlyActive) {
      commitKeys(activeKeys.filter(k => k !== col.key));
    } else {
      commitKeys([...activeKeys, col.key]);
    }
  };

  const handleMove = (key: TColumnKey, delta: -1 | 1) => {
    const idx = activeKeys.indexOf(key);
    if (idx === -1) return;
    const targetIdx = idx + delta;
    if (targetIdx < 0 || targetIdx >= activeKeys.length) return;
    const next = [...activeKeys];
    const [picked] = next.splice(idx, 1);
    next.splice(targetIdx, 0, picked);
    commitKeys(next);
  };

  const handleShowAll = () => {
    if (state) {
      state.showAllColumns();
      return;
    }
    const preserved = [...activeKeys];
    for (const c of columns) {
      if (!activeSet.has(c.key)) preserved.push(c.key);
    }
    commitKeys(preserved);
  };

  const handleReset = () => {
    if (state) {
      state.resetToDefault();
      return;
    }
    commitKeys(defaultColumnKeys ?? columns.map(c => c.key));
  };

  return (
    <Popover
      placement="below"
      alignment="end"
      content={
        <div
          className={['mehan-col-settings', className].filter(Boolean).join(' ')}
          role="group"
          aria-label="Table column settings"
        >
          <div className="mehan-csm-header">
            <Text weight="semibold">
              {triggerLabel} ({activeKeys.length}/{columns.length})
            </Text>
          </div>

          <div className="mehan-csm-list">
            {orderedColumns.map(col => {
              const isChecked = activeSet.has(col.key);
              const isLastVisible = isChecked && activeKeys.length <= 1;
              const isLocked = Boolean(col.isAlwaysVisible) || isLastVisible;
              const activeIndex = activeKeys.indexOf(col.key);

              return (
                <div key={col.key} className="mehan-csm-row">
                  <div className="mehan-csm-check">
                    <CheckboxInput
                      size="sm"
                      label={col.label}
                      value={isChecked}
                      isDisabled={isLocked}
                      disabledMessage={
                        col.isAlwaysVisible
                          ? `${col.label} is required and stays visible.`
                          : isLastVisible
                            ? 'At least one column must stay visible.'
                            : undefined
                      }
                      onChange={() => handleToggle(col)}
                    />
                  </div>

                  {allowReorder && isChecked && activeKeys.length > 1 && (
                    <div className="mehan-csm-order">
                      <IconButton
                        variant="ghost"
                        size="sm"
                        label={`Move ${col.label} earlier`}
                        icon={<ArrowUp size={13} />}
                        isDisabled={activeIndex <= 0}
                        onClick={() => handleMove(col.key, -1)}
                      />
                      <IconButton
                        variant="ghost"
                        size="sm"
                        label={`Move ${col.label} later`}
                        icon={<ArrowDown size={13} />}
                        isDisabled={activeIndex === -1 || activeIndex >= activeKeys.length - 1}
                        onClick={() => handleMove(col.key, 1)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mehan-csm-footer">
            <Button
              variant="ghost"
              size="sm"
              label="Show all"
              isDisabled={activeKeys.length === columns.length}
              onClick={handleShowAll}
            />
            <Button
              variant="secondary"
              size="sm"
              label="Reset"
              icon={<RotateCcw size={13} />}
              onClick={handleReset}
            />
          </div>
        </div>
      }
    >
      <Button
        variant="secondary"
        size={size}
        label={`${triggerLabel} (${activeKeys.length}/${columns.length})`}
        icon={<SlidersHorizontal size={14} />}
      />
    </Popover>
  );
}
