'use client';

import React, {useRef} from 'react';

export type AnchorPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'middle-start'
  | 'center'
  | 'middle-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export interface AnchorMatrixProps {
  /** Selected 9-point spatial alignment anchor */
  value: AnchorPosition;
  /** Called whenever a cell is selected via pointer or 2D arrow keys */
  onChange: (position: AnchorPosition) => void;
  /** Accessible radiogroup label */
  label?: string;
  /** Show human-readable anchor readout beside the 3×3 well */
  hasReadout?: boolean;
  /** Disable interaction */
  isDisabled?: boolean;
}

const ANCHOR_CELLS: ReadonlyArray<{id: AnchorPosition; name: string}> = [
  {id: 'top-start', name: 'Top start'},
  {id: 'top-center', name: 'Top center'},
  {id: 'top-end', name: 'Top end'},
  {id: 'middle-start', name: 'Middle start'},
  {id: 'center', name: 'Center'},
  {id: 'middle-end', name: 'Middle end'},
  {id: 'bottom-start', name: 'Bottom start'},
  {id: 'bottom-center', name: 'Bottom center'},
  {id: 'bottom-end', name: 'Bottom end'},
];

export function AnchorMatrix({
  value,
  onChange,
  label = 'Anchor position',
  hasReadout = true,
  isDisabled = false,
}: AnchorMatrixProps) {
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(
    0,
    ANCHOR_CELLS.findIndex(c => c.id === value),
  );

  const moveTo = (nextIdx: number) => {
    const clamped = Math.min(8, Math.max(0, nextIdx));
    onChange(ANCHOR_CELLS[clamped].id);
    cellRefs.current[clamped]?.focus();
  };

  return (
    <div
      className="mehan-anchor-matrix"
      data-disabled={isDisabled ? 'true' : undefined}>
      <div
        className="mehan-am-grid"
        role="radiogroup"
        aria-label={label}>
        {ANCHOR_CELLS.map((cell, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={cell.id}
              ref={el => {
                cellRefs.current[idx] = el;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={cell.name}
              title={cell.name}
              disabled={isDisabled}
              tabIndex={isSelected ? 0 : -1}
              className="mehan-am-cell"
              data-selected={isSelected ? 'true' : undefined}
              onClick={() => {
                if (!isDisabled) onChange(cell.id);
              }}
              onKeyDown={e => {
                if (isDisabled) return;
                const row = Math.floor(idx / 3);
                const col = idx % 3;
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  moveTo(row * 3 + ((col + 1) % 3));
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  moveTo(row * 3 + ((col + 2) % 3));
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  moveTo(((row + 1) % 3) * 3 + col);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  moveTo(((row + 2) % 3) * 3 + col);
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  moveTo(0);
                } else if (e.key === 'End') {
                  e.preventDefault();
                  moveTo(8);
                }
              }}>
              <span className="mehan-am-dot" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      {hasReadout && (
        <div className="mehan-am-meta">
          <span className="mehan-am-label">{label}</span>
          <span className="mehan-am-value">{ANCHOR_CELLS[activeIndex].name}</span>
        </div>
      )}
    </div>
  );
}
