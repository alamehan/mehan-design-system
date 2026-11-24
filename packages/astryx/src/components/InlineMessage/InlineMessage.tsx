'use client';

import React from 'react';
import {AlertCircle, AlertTriangle, CheckCircle2, Info} from 'lucide-react';

export interface InlineMessageProps {
  /** Concise status, validation, or guidance sentence */
  message: string;
  /** Semantic tone controlling icon and WCAG-verified text color */
  status?: 'info' | 'success' | 'warning' | 'error';
  /** Optional DOM `id` referenced by an input's `aria-describedby` */
  fieldId?: string;
  /** Announce changes via ARIA live region (`alert` for error, `status` otherwise) */
  isLive?: boolean;
}

const STATUS_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

export function InlineMessage({
  message,
  status = 'info',
  fieldId,
  isLive = true,
}: InlineMessageProps) {
  const IconComp = STATUS_ICONS[status];
  const role = !isLive ? undefined : status === 'error' ? 'alert' : 'status';

  return (
    <div
      id={fieldId}
      role={role}
      className="mehan-inline-message"
      data-status={status}>
      <IconComp size={14} aria-hidden="true" className="mehan-im-icon" />
      <span className="mehan-im-text">{message}</span>
    </div>
  );
}
