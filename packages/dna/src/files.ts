/**
 * Pure, zero-DOM file validation utilities with structured reason codes
 * for calm, localized form/upload feedback (UX Law 10 & 12).
 */

import {formatBytes} from './format';

export interface FileValidationRule {
  /** Maximum allowed file size in bytes. */
  maxBytes?: number;
  /**
   * Accepted MIME types (`'application/json'`, `'image/*'`) or file extensions
   * (`'.json'`, `'.svg'`, `'.md'`). Empty or omitted accepts any file type.
   */
  accept?: ReadonlyArray<string>;
  /** Allow 0-byte empty files when `true`. @default false */
  allowEmpty?: boolean;
}

export type FileValidationIssueCode =
  | 'empty-file'
  | 'too-large'
  | 'unsupported-type';

export type FileValidationResult =
  | {ok: true}
  | {
      ok: false;
      code: FileValidationIssueCode;
      message: string;
      maxBytes?: number;
      actualBytes?: number;
      accepted?: ReadonlyArray<string>;
    };

export interface FileMetadataLike {
  name: string;
  size: number;
  type?: string;
}

/**
 * Checks whether a file matches at least one entry in `accept`
 * (supports `.ext`, exact `type/subtype`, and wildcard `type/*`).
 */
export function matchesAcceptedType(
  file: Pick<FileMetadataLike, 'name' | 'type'>,
  accept: ReadonlyArray<string>,
): boolean {
  if (accept.length === 0) return true;
  const lowerName = (file.name || '').trim().toLowerCase();
  const lowerMime = (file.type || '').trim().toLowerCase();

  for (const rawRule of accept) {
    const rule = rawRule.trim().toLowerCase();
    if (!rule || rule === '*' || rule === '*/*') return true;
    if (rule.startsWith('.')) {
      if (lowerName.endsWith(rule)) return true;
      continue;
    }
    if (rule.endsWith('/*')) {
      const prefix = rule.slice(0, -1); // keeps trailing '/'
      if (lowerMime.startsWith(prefix)) return true;
      continue;
    }
    if (lowerMime === rule) return true;
  }
  return false;
}

/**
 * Validates file metadata against size and MIME/extension constraints without
 * touching browser DOM globals (runs identically in Node, Workers, and browsers).
 */
export function validateFile(
  file: FileMetadataLike,
  rules: FileValidationRule = {},
): FileValidationResult {
  if (!rules.allowEmpty && file.size <= 0) {
    return {
      ok: false,
      code: 'empty-file',
      actualBytes: file.size,
      message: `"${file.name}" is empty (0 B). Choose a file with content.`,
    };
  }

  if (rules.maxBytes !== undefined && file.size > rules.maxBytes) {
    return {
      ok: false,
      code: 'too-large',
      maxBytes: rules.maxBytes,
      actualBytes: file.size,
      message: `"${file.name}" is ${formatBytes(file.size)}, exceeding the ${formatBytes(rules.maxBytes)} limit.`,
    };
  }

  if (rules.accept && rules.accept.length > 0 && !matchesAcceptedType(file, rules.accept)) {
    return {
      ok: false,
      code: 'unsupported-type',
      accepted: rules.accept,
      message: `"${file.name}" is not a supported format. Accepted: ${rules.accept.join(', ')}.`,
    };
  }

  return {ok: true};
}
