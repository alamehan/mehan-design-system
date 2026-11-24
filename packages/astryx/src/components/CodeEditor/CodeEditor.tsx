'use client';

import React, {useRef, useState} from 'react';
import {CopyButton} from '../CopyButton/CopyButton';

export interface CodeDiagnostic {
  /** 1-based line number */
  line: number;
  /** Blame-free diagnostic message */
  message: string;
  /** Diagnostic severity */
  severity?: 'warning' | 'error';
}

export interface CodeEditorProps {
  /** Controlled source code string */
  value: string;
  /** Invoked whenever source code is edited */
  onChange: (value: string) => void;
  /** Language badge shown in the workbench header */
  language?: string;
  /** Accessible label for the code textarea */
  label?: string;
  /** Minimum visible line rows */
  minRows?: number;
  /** Render read-only source buffer */
  isReadOnly?: boolean;
  /** Spaces inserted on Tab indentation */
  tabSize?: number;
  /** Optional 1-based line diagnostics highlighted in the gutter and footer */
  diagnostics?: readonly CodeDiagnostic[];
}

export function CodeEditor({
  value,
  onChange,
  language = 'tsx',
  label = 'Code editor',
  minRows = 6,
  isReadOnly = false,
  tabSize = 2,
  diagnostics = [],
}: CodeEditorProps) {
  // WCAG 2.1.2 No Keyboard Trap: pressing Escape arms Tab-exit so the next Tab leaves the editor!
  const [tabUnlocked, setTabUnlocked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const lines = value.split('\n');
  const lineCount = Math.max(minRows, lines.length);
  const diagByLine = new Map<number, CodeDiagnostic>();
  for (const d of diagnostics) {
    diagByLine.set(d.line, d);
  }

  return (
    <div className="mehan-code-editor">
      <div className="mehan-ce-header">
        <div className="mehan-ce-meta">
          <span className="mehan-ce-lang">{language}</span>
          {!isReadOnly && (
            <span className="mehan-ce-hint">
              {tabUnlocked
                ? 'Tab moves focus out · type to indent again'
                : 'Press Esc then Tab to move focus'}
            </span>
          )}
        </div>
        <CopyButton value={value} size="sm" label="Copy" copiedLabel="Copied" />
      </div>

      <div className="mehan-ce-body">
        <div
          ref={gutterRef}
          className="mehan-ce-gutter"
          aria-hidden="true">
          {Array.from({length: lineCount}, (_, idx) => {
            const lineNum = idx + 1;
            const diag = diagByLine.get(lineNum);
            return (
              <div
                key={lineNum}
                className="mehan-ce-line-num"
                data-severity={diag ? (diag.severity ?? 'error') : undefined}>
                {lineNum}
              </div>
            );
          })}
        </div>

        <textarea
          ref={textareaRef}
          aria-label={label}
          readOnly={isReadOnly}
          rows={minRows}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="mehan-ce-textarea"
          value={value}
          onScroll={e => {
            if (gutterRef.current) {
              gutterRef.current.scrollTop = e.currentTarget.scrollTop;
            }
          }}
          onBlur={() => setTabUnlocked(false)}
          onChange={e => {
            setTabUnlocked(false);
            onChange(e.target.value);
          }}
          onKeyDown={e => {
            if (isReadOnly) return;
            if (e.key === 'Escape' && !tabUnlocked) {
              e.preventDefault();
              e.stopPropagation();
              setTabUnlocked(true);
              return;
            }
            if (e.key === 'Tab') {
              if (tabUnlocked) {
                // Allow native Tab traversal out of the editor!
                setTabUnlocked(false);
                return;
              }
              e.preventDefault();
              const el = e.currentTarget;
              const start = el.selectionStart;
              const end = el.selectionEnd;
              const indent = ' '.repeat(Math.max(1, tabSize));
              if (e.shiftKey) {
                const before = value.slice(0, start);
                const lineStart = before.lastIndexOf('\n') + 1;
                if (value.slice(lineStart, lineStart + indent.length) === indent) {
                  const next =
                    value.slice(0, lineStart) + value.slice(lineStart + indent.length);
                  onChange(next);
                  requestAnimationFrame(() => {
                    el.selectionStart = Math.max(lineStart, start - indent.length);
                    el.selectionEnd = Math.max(lineStart, end - indent.length);
                  });
                }
              } else {
                const next = value.slice(0, start) + indent + value.slice(end);
                onChange(next);
                requestAnimationFrame(() => {
                  el.selectionStart = start + indent.length;
                  el.selectionEnd = start + indent.length;
                });
              }
            }
          }}
        />
      </div>

      {diagnostics.length > 0 && (
        <div className="mehan-ce-diagnostics" role="status">
          {diagnostics.map((d, i) => (
            <div
              key={`${d.line}-${i}`}
              className="mehan-ce-diag-row"
              data-severity={d.severity ?? 'error'}>
              <span className="mehan-ce-diag-line">Ln {d.line}</span>
              <span>{d.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
