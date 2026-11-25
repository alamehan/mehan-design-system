'use client';

import React, {useMemo, useRef, useState} from 'react';
import {Badge, Button, EmptyState, Text} from '@astryxdesign/core';
import {ChevronLeft, ChevronRight, Folder, FileText} from 'lucide-react';
import {useMehanViewport} from '../../hooks/viewport';

export interface ColumnViewNode {
  id: string;
  label: string;
  meta?: string;
  badge?: string;
  icon?: React.ReactNode;
  children?: ReadonlyArray<ColumnViewNode>;
}

export interface ColumnViewProps {
  /** Hierarchical root nodes rendered in the first column. */
  items: ReadonlyArray<ColumnViewNode>;
  /** Controlled selected ID path from root to deepest active item (`['design', 'tokens', 'colors']`). */
  selectedPath?: ReadonlyArray<string>;
  /** Initial selected ID path in uncontrolled mode. */
  defaultSelectedPath?: ReadonlyArray<string>;
  /** Invoked whenever selection drills deeper or changes column selection. */
  onSelectedPathChange?: (
    path: string[],
    activeNode: ColumnViewNode | null,
  ) => void;
  /** Optional custom preview pane rendered to the right of leaf selections (or last selected node). */
  renderDetail?: (node: ColumnViewNode) => React.ReactNode;
  /** Heading shown in the preview pane when nothing is selected. @default 'Select an item to inspect' */
  emptyDetailTitle?: string;
  /** Accessible label for the Miller-columns explorer. @default 'Column browser' */
  label?: string;
  className?: string;
}

/**
 * Multi-Column Hierarchical Browser (`ColumnView` / Miller Columns): the horizontal
 * sibling of `TreeList` with full 2D arrow-key navigation (`↑`/`↓` within a column,
 * `→`/`Enter` to drill into children, `←` to step back) and automatic mobile step-drill
 * so narrow viewports never overflow horizontally.
 */
export function ColumnView({
  items,
  selectedPath: controlledPath,
  defaultSelectedPath = [],
  onSelectedPathChange,
  renderDetail,
  emptyDetailTitle = 'Select an item to inspect',
  label = 'Column browser',
  className,
}: ColumnViewProps) {
  const {isMobile} = useMehanViewport();
  const [uncontrolledPath, setUncontrolledPath] = useState<string[]>([
    ...defaultSelectedPath,
  ]);
  const [mobileShowLeafDetail, setMobileShowLeafDetail] = useState<boolean>(false);

  const path = controlledPath ? [...controlledPath] : uncontrolledPath;
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const {columns, selectedNodes} = useMemo(() => {
    const cols: Array<ReadonlyArray<ColumnViewNode>> = [items];
    const nodes: ColumnViewNode[] = [];
    let currentList: ReadonlyArray<ColumnViewNode> = items;

    for (const id of path) {
      const match = currentList.find(n => n.id === id);
      if (!match) break;
      nodes.push(match);
      if (match.children && match.children.length > 0) {
        cols.push(match.children);
        currentList = match.children;
      } else {
        break;
      }
    }
    return {columns: cols, selectedNodes: nodes};
  }, [items, path]);

  const activeNode =
    selectedNodes.length > 0 ? selectedNodes[selectedNodes.length - 1] : null;

  const commitPath = (nextPath: string[]) => {
    if (controlledPath === undefined) {
      setUncontrolledPath(nextPath);
    }
    let list: ReadonlyArray<ColumnViewNode> = items;
    let deepest: ColumnViewNode | null = null;
    for (const id of nextPath) {
      const found = list.find(n => n.id === id);
      if (!found) break;
      deepest = found;
      list = found.children ?? [];
    }
    onSelectedPathChange?.(nextPath, deepest);
  };

  const focusNodeButton = (colIdx: number, nodeId: string) => {
    requestAnimationFrame(() => {
      itemRefs.current.get(`${colIdx}:${nodeId}`)?.focus();
    });
  };

  const selectAtDepth = (
    colIdx: number,
    node: ColumnViewNode,
    focusChild = false,
  ) => {
    const nextPath = [...path.slice(0, colIdx), node.id];
    commitPath(nextPath);
    if (isMobile && (!node.children || node.children.length === 0) && renderDetail) {
      setMobileShowLeafDetail(true);
    } else {
      setMobileShowLeafDetail(false);
    }
    if (focusChild && node.children && node.children.length > 0) {
      const firstChild = node.children[0];
      const childPath = [...nextPath, firstChild.id];
      commitPath(childPath);
      focusNodeButton(colIdx + 1, firstChild.id);
    }
  };

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    colIdx: number,
    rowIdx: number,
    colItems: ReadonlyArray<ColumnViewNode>,
    node: ColumnViewNode,
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = colItems[Math.min(colItems.length - 1, rowIdx + 1)];
      if (next) {
        selectAtDepth(colIdx, next);
        focusNodeButton(colIdx, next.id);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = colItems[Math.max(0, rowIdx - 1)];
      if (prev) {
        selectAtDepth(colIdx, prev);
        focusNodeButton(colIdx, prev.id);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      const first = colItems[0];
      if (first) {
        selectAtDepth(colIdx, first);
        focusNodeButton(colIdx, first.id);
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = colItems[colItems.length - 1];
      if (last) {
        selectAtDepth(colIdx, last);
        focusNodeButton(colIdx, last.id);
      }
    } else if (e.key === 'ArrowRight') {
      if (node.children && node.children.length > 0) {
        e.preventDefault();
        selectAtDepth(colIdx, node, true);
      }
    } else if (e.key === 'ArrowLeft') {
      if (colIdx > 0) {
        e.preventDefault();
        const parentId = path[colIdx - 1];
        const trimmed = path.slice(0, colIdx);
        commitPath(trimmed);
        if (parentId) focusNodeButton(colIdx - 1, parentId);
      }
    }
  };

  // Mobile single-column step-drill view (`<768px`)
  const mobileActiveColIdx = Math.max(0, columns.length - 1);
  const visibleColumnIndices = isMobile
    ? mobileShowLeafDetail && activeNode
      ? []
      : [mobileActiveColIdx]
    : columns.map((_, idx) => idx);

  const handleMobileStepBack = () => {
    if (mobileShowLeafDetail) {
      setMobileShowLeafDetail(false);
      return;
    }
    if (path.length > 0) {
      commitPath(path.slice(0, -1));
    }
  };

  return (
    <div
      className={['mehan-column-view', className].filter(Boolean).join(' ')}
      data-mobile={isMobile ? 'true' : undefined}
      role="region"
      aria-label={label}
    >
      {isMobile && (path.length > 0 || mobileShowLeafDetail) && (
        <div className="mehan-cv-mobile-bar">
          <Button
            variant="ghost"
            size="sm"
            label="Back"
            icon={<ChevronLeft size={14} />}
            onClick={handleMobileStepBack}
          />
          <Text type="supporting" color="secondary" maxLines={1}>
            {selectedNodes.map(n => n.label).join(' / ')}
          </Text>
        </div>
      )}

      <div className="mehan-cv-track">
        {visibleColumnIndices.map(colIdx => {
          const colItems = columns[colIdx] ?? [];
          const selectedIdInCol = path[colIdx];

          return (
            <ul
              key={colIdx}
              className="mehan-cv-col"
              role="listbox"
              aria-label={`Level ${colIdx + 1}`}
            >
              {colItems.map((node, rowIdx) => {
                const isSelected = selectedIdInCol === node.id;
                const hasChildren = Boolean(node.children && node.children.length > 0);
                const isTabStop =
                  isSelected || (!selectedIdInCol && rowIdx === 0);

                return (
                  <li key={node.id} className="mehan-cv-li" role="presentation">
                    <button
                      ref={el => {
                        const mapKey = `${colIdx}:${node.id}`;
                        if (el) itemRefs.current.set(mapKey, el);
                        else itemRefs.current.delete(mapKey);
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={isTabStop ? 0 : -1}
                      className="mehan-cv-item"
                      data-selected={isSelected ? 'true' : undefined}
                      onClick={() => selectAtDepth(colIdx, node)}
                      onKeyDown={e =>
                        handleItemKeyDown(e, colIdx, rowIdx, colItems, node)
                      }
                    >
                      <span className="mehan-cv-icon" aria-hidden="true">
                        {node.icon ??
                          (hasChildren ? (
                            <Folder size={14} />
                          ) : (
                            <FileText size={14} />
                          ))}
                      </span>
                      <span className="mehan-cv-label">{node.label}</span>
                      {node.badge && (
                        <Badge variant="neutral" label={node.badge} />
                      )}
                      {node.meta && !node.badge && (
                        <span className="mehan-cv-meta">{node.meta}</span>
                      )}
                      {hasChildren && (
                        <ChevronRight
                          size={14}
                          className="mehan-cv-chevron"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          );
        })}

        {renderDetail && (!isMobile || mobileShowLeafDetail) && (
          <div className="mehan-cv-detail">
            {activeNode ? (
              renderDetail(activeNode)
            ) : (
              <EmptyState isCompact title={emptyDetailTitle} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
