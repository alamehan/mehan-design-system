'use client';

import React, {useRef, useState} from 'react';
import {Bold, Code, Heading2, Italic, Link2, List} from 'lucide-react';

export interface MarkdownEditorProps {
  /** Controlled Markdown document source */
  value: string;
  /** Called whenever Markdown text is edited or formatted via toolbar */
  onChange: (value: string) => void;
  /** Accessible label for the Markdown textarea */
  label?: string;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Minimum visible rows in Write mode */
  minRows?: number;
  /** Disable editing */
  isDisabled?: boolean;
}

function renderInlineMd(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
      return <strong key={i}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
      return <em key={i}>{tok.slice(1, -1)}</em>;
    }
    if (tok.startsWith('`') && tok.endsWith('`') && tok.length > 2) {
      return <code key={i}>{tok.slice(1, -1)}</code>;
    }
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
    if (linkMatch) {
      const href = /^(https?:|mailto:|#|\/)/.test(linkMatch[2])
        ? linkMatch[2]
        : '#';
      return (
        <a key={i} href={href} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

function SafeMarkdownPreview({source}: {source: string}) {
  if (!source.trim()) {
    return <p className="mehan-mde-empty">Nothing to preview yet.</p>;
  }
  const lines = source.split('\n');
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];

  const flushList = (keyPrefix: number) => {
    if (listBuf.length === 0) return;
    blocks.push(
      <ul key={`ul-${keyPrefix}`}>
        {listBuf.map((item, idx) => (
          <li key={idx}>{renderInlineMd(item)}</li>
        ))}
      </ul>,
    );
    listBuf = [];
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (/^[-*]\s+/.test(line)) {
      listBuf.push(line.replace(/^[-*]\s+/, ''));
      return;
    }
    flushList(idx);
    if (!line.trim()) return;
    if (line.startsWith('### ')) {
      blocks.push(<h4 key={idx}>{renderInlineMd(line.slice(4))}</h4>);
    } else if (line.startsWith('## ')) {
      blocks.push(<h3 key={idx}>{renderInlineMd(line.slice(3))}</h3>);
    } else if (line.startsWith('# ')) {
      blocks.push(<h2 key={idx}>{renderInlineMd(line.slice(2))}</h2>);
    } else if (line.startsWith('> ')) {
      blocks.push(
        <blockquote key={idx}>{renderInlineMd(line.slice(2))}</blockquote>,
      );
    } else {
      blocks.push(<p key={idx}>{renderInlineMd(line)}</p>);
    }
  });
  flushList(lines.length);

  return <div className="mehan-mde-preview">{blocks}</div>;
}

export function MarkdownEditor({
  value,
  onChange,
  label = 'Markdown editor',
  placeholder = 'Write using Markdown…',
  minRows = 5,
  isDisabled = false,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const wrapSelection = (before: string, after = before, fallback = 'text') => {
    const el = areaRef.current;
    if (!el || isDisabled) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || fallback;
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + selected.length;
    });
  };

  const prefixLine = (prefix: string) => {
    const el = areaRef.current;
    if (!el || isDisabled) return;
    const start = el.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = start + prefix.length;
      el.selectionEnd = start + prefix.length;
    });
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div
      className="mehan-markdown-editor"
      data-disabled={isDisabled ? 'true' : undefined}>
      <div className="mehan-mde-bar">
        <div className="mehan-mde-tabs" role="tablist" aria-label={`${label} mode`}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'write'}
            className="mehan-mde-tab"
            data-active={tab === 'write' ? 'true' : undefined}
            onClick={() => setTab('write')}>
            Write
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'preview'}
            className="mehan-mde-tab"
            data-active={tab === 'preview' ? 'true' : undefined}
            onClick={() => setTab('preview')}>
            Preview
          </button>
        </div>

        {tab === 'write' && (
          <div
            className="mehan-mde-tools"
            role="toolbar"
            aria-label="Markdown formatting">
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Bold"
              onClick={() => wrapSelection('**', '**', 'bold')}>
              <Bold size={13} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Italic"
              onClick={() => wrapSelection('*', '*', 'italic')}>
              <Italic size={13} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Heading"
              onClick={() => prefixLine('## ')}>
              <Heading2 size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Inline code"
              onClick={() => wrapSelection('`', '`', 'code')}>
              <Code size={13} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Bullet list"
              onClick={() => prefixLine('- ')}>
              <List size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={isDisabled}
              className="mehan-mde-tool"
              aria-label="Insert link"
              onClick={() => wrapSelection('[', '](https://example.com)', 'link text')}>
              <Link2 size={14} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {tab === 'write' ? (
        <textarea
          ref={areaRef}
          aria-label={label}
          disabled={isDisabled}
          rows={minRows}
          placeholder={placeholder}
          className="mehan-mde-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <SafeMarkdownPreview source={value} />
      )}

      <div className="mehan-mde-footer">
        <span>Markdown supported</span>
        <span className="mehan-mde-counts">
          {wordCount} {wordCount === 1 ? 'word' : 'words'} · {value.length} chars
        </span>
      </div>
    </div>
  );
}
