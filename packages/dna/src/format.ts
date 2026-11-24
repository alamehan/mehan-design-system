/**
 * Locale-memoized `Intl` formatters for numbers, compact KPIs, currencies,
 * percentages, byte sizes, relative times, and timezone-safe ISO dates.
 * Zero external dependencies — caches `Intl.*` instances per locale + key.
 */

const numberFormatterCache = new Map<string, Intl.NumberFormat>();
const relativeFormatterCache = new Map<string, Intl.RelativeTimeFormat>();

function getNumberFormatter(
  locale: string,
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormat {
  const key = `${locale}::${options ? JSON.stringify(options) : ''}`;
  let fmt = numberFormatterCache.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale, options);
    numberFormatterCache.set(key, fmt);
  }
  return fmt;
}

function getRelativeFormatter(
  locale: string,
  style: Intl.RelativeTimeFormatStyle = 'short',
): Intl.RelativeTimeFormat {
  const key = `${locale}::${style}`;
  let fmt = relativeFormatterCache.get(key);
  if (!fmt) {
    fmt = new Intl.RelativeTimeFormat(locale, {numeric: 'auto', style});
    relativeFormatterCache.set(key, fmt);
  }
  return fmt;
}

export function formatNumber(
  value: number,
  locale = 'en-US',
  options?: Intl.NumberFormatOptions,
): string {
  if (!Number.isFinite(value)) return '—';
  return getNumberFormatter(locale, options).format(value);
}

export function formatCompactNumber(
  value: number,
  locale = 'en-US',
  maximumFractionDigits = 1,
): string {
  if (!Number.isFinite(value)) return '—';
  return getNumberFormatter(locale, {
    notation: 'compact',
    maximumFractionDigits,
  }).format(value);
}

export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US',
  options?: {compact?: boolean; maximumFractionDigits?: number},
): string {
  if (!Number.isFinite(value)) return '—';
  const fmt = getNumberFormatter(locale, {
    style: 'currency',
    currency,
    notation: options?.compact ? 'compact' : 'standard',
    maximumFractionDigits:
      options?.maximumFractionDigits ?? (options?.compact ? 1 : 2),
  });
  return fmt.format(value);
}

export function formatPercent(
  ratio01: number,
  locale = 'en-US',
  maximumFractionDigits = 1,
): string {
  if (!Number.isFinite(ratio01)) return '—';
  return getNumberFormatter(locale, {
    style: 'percent',
    maximumFractionDigits,
  }).format(ratio01);
}

export function formatBytes(bytes: number, locale = 'en-US'): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const idx = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const scaled = bytes / Math.pow(1024, idx);
  const digits = idx === 0 || scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2;
  return `${formatNumber(scaled, locale, {maximumFractionDigits: digits})} ${units[idx]}`;
}

export function formatRelativeTime(
  target: Date | number,
  locale = 'en-US',
  nowMs: number = Date.now(),
  style: Intl.RelativeTimeFormatStyle = 'short',
): string {
  const targetMs = target instanceof Date ? target.getTime() : target;
  if (!Number.isFinite(targetMs)) return '—';
  const diffSec = Math.round((targetMs - nowMs) / 1000);
  const absSec = Math.abs(diffSec);
  const rtf = getRelativeFormatter(locale, style);

  if (absSec < 60) return rtf.format(diffSec, 'second');
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  const diffHr = Math.round(diffMin / 60);
  if (Math.abs(diffHr) < 24) return rtf.format(diffHr, 'hour');
  const diffDay = Math.round(diffHr / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, 'day');
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month');
  return rtf.format(Math.round(diffDay / 365.25), 'year');
}

/**
 * Parses `YYYY-MM-DD` at local midnight rather than UTC midnight so dates
 * never roll back by 1 day in negative UTC-offset timezones.
 */
export function parseLocalIsoDate(isoDate: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) {
    return new Date(isoDate);
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 0, 0, 0, 0);
}
