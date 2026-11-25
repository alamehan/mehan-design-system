'use client';

import React, {useEffect, useId, useMemo, useRef, useState} from 'react';
import {formatCompactNumber, formatNumber} from '@mehan/dna';

export type DataChartKind = 'line' | 'area' | 'bar' | 'horizontal-bar';

export interface DataChartSeries {
  /** Unique identifier for this series. */
  id: string;
  /** Human-readable series name shown in the legend, tooltip, and screen-reader table. */
  label: string;
  /** Numeric values aligned 1:1 with `categories`. */
  values: ReadonlyArray<number>;
  /** Optional custom CSS color (`#hex` or `var(...)`); defaults to Mehan's OKLCH categorical palette. */
  color?: string;
}

export interface DataChartProps {
  /** X-axis (or category-axis) labels. */
  categories: ReadonlyArray<string>;
  /** 1 to 4 data series rendered in synchronized OKLCH categorical colors. */
  series: ReadonlyArray<DataChartSeries>;
  /** Chart geometry: `'line'`, `'area'`, vertical `'bar'`, or `'horizontal-bar'` for long category labels. @default 'area' */
  kind?: DataChartKind;
  /** Optional chart title rendered in the card header. */
  title?: string;
  /** Optional subtitle or time-window caption. */
  subtitle?: string;
  /** Optional unit suffix (`'%'`, `'ms'`, `'$'`) or custom value formatter. */
  valueFormatter?: (value: number) => string;
  /** SVG plot height in pixels (for `'line'` | `'area'` | `'bar'`). @default 210 */
  height?: number;
  /** Show interactive series legend pills when multiple series are present or forced `true`. */
  showLegend?: boolean;
  /** Accessible label when `title` is omitted. @default 'Data chart' */
  label?: string;
  className?: string;
}

const DEFAULT_SERIES_COLORS = [
  'var(--color-accent)',
  'var(--color-data-categorical-2, #2563eb)',
  'var(--color-data-categorical-3, #059669)',
  'var(--color-data-categorical-4, #d97706)',
] as const;

export function DataChart({
  categories,
  series,
  kind = 'area',
  title,
  subtitle,
  valueFormatter,
  height = 210,
  showLegend,
  label = 'Data chart',
  className,
}: DataChartProps) {
  const uid = useId().replace(/:/g, '');
  const plotWrapRef = useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number>(600);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hiddenSeriesIds, setHiddenSeriesIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const el = plotWrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const sync = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      if (w >= 240) setMeasuredWidth(w);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [kind]);

  const visibleSeries = useMemo(() => {
    const filtered = series.filter(s => !hiddenSeriesIds[s.id]);
    return filtered.length > 0 ? filtered : series.slice(0, 1);
  }, [series, hiddenSeriesIds]);

  const fmt = useMemo(
    () =>
      valueFormatter ??
      ((v: number) =>
        Math.abs(v) >= 10_000 ? formatCompactNumber(v, 'en-US') : formatNumber(v, 'en-US')),
    [valueFormatter],
  );

  const count = categories.length;
  const {minVal, maxVal, ticks} = useMemo(() => {
    let rawMin = 0;
    let rawMax = 0;
    for (const s of visibleSeries) {
      for (let i = 0; i < count; i += 1) {
        const v = s.values[i] ?? 0;
        if (v < rawMin) rawMin = v;
        if (v > rawMax) rawMax = v;
      }
    }
    if (rawMax === rawMin) rawMax = rawMin + 10;
    const span = rawMax - rawMin;
    const niceMax = rawMax + span * 0.08;
    const niceMin = rawMin < 0 ? rawMin - span * 0.05 : 0;
    const step = (niceMax - niceMin) / 3;
    return {
      minVal: niceMin,
      maxVal: niceMax,
      ticks: [niceMin, niceMin + step, niceMin + step * 2, niceMax],
    };
  }, [visibleSeries, count]);

  const shouldShowLegend = showLegend ?? series.length > 1;
  const accessibleName = title ?? label;

  const toggleSeries = (id: string) => {
    setHiddenSeriesIds(prev => {
      const next = {...prev, [id]: !prev[id]};
      const remaining = series.filter(s => !next[s.id]);
      return remaining.length === 0 ? prev : next;
    });
  };

  const handlePlotKeyDown = (e: React.KeyboardEvent) => {
    if (count === 0) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev === null ? 0 : Math.min(count - 1, prev + 1)));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev === null ? count - 1 : Math.max(0, prev - 1)));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(count - 1);
    } else if (e.key === 'Escape' && activeIndex !== null) {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex(null);
    }
  };

  // 1:1 CSS-pixel SVG coordinate space so tick typography stays crisp at every card width
  const svgW = Math.max(300, measuredWidth);
  const svgH = Math.max(140, height);
  const padLeft = 52;
  const padRight = 16;
  const padTop = 14;
  const padBottom = 28;
  const plotW = svgW - padLeft - padRight;
  const plotH = svgH - padTop - padBottom;

  const xForIndex = (idx: number) => {
    if (kind === 'bar') {
      return padLeft + ((idx + 0.5) / Math.max(1, count)) * plotW;
    }
    return count <= 1 ? padLeft + plotW / 2 : padLeft + (idx / (count - 1)) * plotW;
  };

  const yForValue = (val: number) => {
    const ratio = (val - minVal) / Math.max(1e-6, maxVal - minVal);
    return padTop + plotH - ratio * plotH;
  };

  const zeroY = yForValue(Math.max(minVal, Math.min(0, maxVal)));
  const activeCategory = activeIndex !== null ? categories[activeIndex] : null;

  return (
    <figure
      className={['mehan-data-chart', className].filter(Boolean).join(' ')}
      aria-label={accessibleName}
    >
      {(title || subtitle || shouldShowLegend) && (
        <div className="mehan-dc-header">
          {(title || subtitle) && (
            <div className="mehan-dc-titles">
              {title && <h4 className="mehan-dc-title">{title}</h4>}
              {subtitle && <p className="mehan-dc-subtitle">{subtitle}</p>}
            </div>
          )}

          {shouldShowLegend && (
            <div className="mehan-dc-legend" role="group" aria-label="Chart series">
              {series.map((s, idx) => {
                const color =
                  s.color ?? DEFAULT_SERIES_COLORS[idx % DEFAULT_SERIES_COLORS.length];
                const isHidden = Boolean(hiddenSeriesIds[s.id]);
                const canToggle = series.length > 1;
                return canToggle ? (
                  <button
                    key={s.id}
                    type="button"
                    className="mehan-dc-legend-btn"
                    data-muted={isHidden ? 'true' : undefined}
                    aria-pressed={!isHidden}
                    onClick={() => toggleSeries(s.id)}
                  >
                    <span
                      className="mehan-dc-swatch"
                      style={{backgroundColor: color}}
                      aria-hidden="true"
                    />
                    <span>{s.label}</span>
                  </button>
                ) : (
                  <span key={s.id} className="mehan-dc-legend-static">
                    <span
                      className="mehan-dc-swatch"
                      style={{backgroundColor: color}}
                      aria-hidden="true"
                    />
                    <span>{s.label}</span>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Live scrub readout pill */}
      <div className="mehan-dc-readout-bar" aria-live="polite">
        {activeIndex !== null && activeCategory !== undefined ? (
          <>
            <span className="mehan-dc-readout-cat">{activeCategory}</span>
            <div className="mehan-dc-readout-vals">
              {visibleSeries.map(s => {
                const origIdx = series.findIndex(item => item.id === s.id);
                const color =
                  s.color ?? DEFAULT_SERIES_COLORS[origIdx % DEFAULT_SERIES_COLORS.length];
                const val = s.values[activeIndex] ?? 0;
                return (
                  <span key={s.id} className="mehan-dc-readout-item">
                    <span
                      className="mehan-dc-swatch"
                      style={{backgroundColor: color}}
                      aria-hidden="true"
                    />
                    <span className="mehan-dc-readout-name">{s.label}:</span>
                    <strong className="mehan-dc-readout-num">{fmt(val)}</strong>
                  </span>
                );
              })}
            </div>
          </>
        ) : (
          <span className="mehan-dc-readout-hint">
            Hover or use ← / → arrow keys to inspect values
          </span>
        )}
      </div>

      {kind === 'horizontal-bar' ? (
        <div
          className="mehan-dc-hbar-list"
          tabIndex={0}
          role="group"
          aria-label={`${accessibleName} interactive bars`}
          onKeyDown={handlePlotKeyDown}
          onBlur={() => setActiveIndex(null)}
        >
          {categories.map((cat, idx) => {
            const isRowActive = activeIndex === idx;
            return (
              <div
                key={`${cat}-${idx}`}
                className="mehan-dc-hbar-row"
                data-active={isRowActive ? 'true' : undefined}
                onPointerEnter={() => setActiveIndex(idx)}
                onPointerLeave={() => setActiveIndex(null)}
              >
                <span className="mehan-dc-hbar-label" title={cat}>
                  {cat}
                </span>
                <div className="mehan-dc-hbar-tracks">
                  {visibleSeries.map(s => {
                    const origIdx = series.findIndex(item => item.id === s.id);
                    const color =
                      s.color ??
                      DEFAULT_SERIES_COLORS[origIdx % DEFAULT_SERIES_COLORS.length];
                    const val = s.values[idx] ?? 0;
                    const pct = Math.max(
                      2,
                      Math.min(100, (Math.abs(val) / Math.max(1e-6, maxVal)) * 100),
                    );
                    return (
                      <div key={s.id} className="mehan-dc-hbar-line">
                        <div className="mehan-dc-hbar-well">
                          <div
                            className="mehan-dc-hbar-fill"
                            style={{width: `${pct}%`, backgroundColor: color}}
                          />
                        </div>
                        <span className="mehan-dc-hbar-val">{fmt(val)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          ref={plotWrapRef}
          className="mehan-dc-plot-wrap"
          tabIndex={0}
          role="group"
          aria-label={`${accessibleName} interactive plot`}
          onKeyDown={handlePlotKeyDown}
          onBlur={() => setActiveIndex(null)}
          onPointerLeave={() => setActiveIndex(null)}
          onPointerMove={e => {
            if (count === 0) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / Math.max(1, rect.width)) * svgW;
            const clamped = Math.max(padLeft, Math.min(padLeft + plotW, relX));
            const ratio = (clamped - padLeft) / Math.max(1, plotW);
            const idx =
              kind === 'bar'
                ? Math.min(count - 1, Math.floor(ratio * count))
                : Math.round(ratio * Math.max(0, count - 1));
            setActiveIndex(idx);
          }}
        >
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="mehan-dc-svg"
            aria-hidden="true"
          >
            <defs>
              {visibleSeries.map(s => {
                const origIdx = series.findIndex(item => item.id === s.id);
                const color =
                  s.color ?? DEFAULT_SERIES_COLORS[origIdx % DEFAULT_SERIES_COLORS.length];
                return (
                  <linearGradient
                    key={s.id}
                    id={`mehan-dc-grad-${uid}-${s.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                  </linearGradient>
                );
              })}
            </defs>

            {/* Horizontal Y-gridlines & formatted ticks */}
            {ticks.map((t, i) => {
              const y = yForValue(t);
              return (
                <g key={i}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={svgW - padRight}
                    y2={y}
                    className="mehan-dc-gridline"
                  />
                  <text
                    x={padLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="mehan-dc-tick"
                  >
                    {fmt(Math.round(t * 10) / 10)}
                  </text>
                </g>
              );
            })}

            {/* Series geometries */}
            {kind === 'bar'
              ? categories.map((_, catIdx) => {
                  const slotW = plotW / Math.max(1, count);
                  const groupW = Math.min(slotW * 0.72, visibleSeries.length * 22);
                  const singleBarW = Math.max(4, groupW / Math.max(1, visibleSeries.length) - 2);
                  const groupStart =
                    padLeft + catIdx * slotW + (slotW - groupW) / 2;

                  return visibleSeries.map((s, sIdx) => {
                    const origIdx = series.findIndex(item => item.id === s.id);
                    const color =
                      s.color ??
                      DEFAULT_SERIES_COLORS[origIdx % DEFAULT_SERIES_COLORS.length];
                    const val = s.values[catIdx] ?? 0;
                    const yVal = yForValue(val);
                    const top = Math.min(yVal, zeroY);
                    const barH = Math.max(2, Math.abs(zeroY - yVal));
                    const x =
                      groupStart + sIdx * (groupW / Math.max(1, visibleSeries.length));
                    return (
                      <rect
                        key={`${s.id}-${catIdx}`}
                        x={x}
                        y={top}
                        width={singleBarW}
                        height={barH}
                        rx={Math.min(4, singleBarW / 2)}
                        fill={color}
                        opacity={activeIndex === null || activeIndex === catIdx ? 1 : 0.45}
                      />
                    );
                  });
                })
              : visibleSeries.map(s => {
                  const origIdx = series.findIndex(item => item.id === s.id);
                  const color =
                    s.color ??
                    DEFAULT_SERIES_COLORS[origIdx % DEFAULT_SERIES_COLORS.length];
                  const pts = categories.map((_, idx) => ({
                    x: xForIndex(idx),
                    y: yForValue(s.values[idx] ?? 0),
                  }));
                  if (pts.length === 0) return null;
                  const linePath = pts
                    .map((p, idx) => `${idx === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
                    .join(' ');
                  const areaPath = `${linePath} L${pts[pts.length - 1].x.toFixed(1)},${zeroY.toFixed(1)} L${pts[0].x.toFixed(1)},${zeroY.toFixed(1)} Z`;

                  return (
                    <g key={s.id}>
                      {kind === 'area' && (
                        <path
                          d={areaPath}
                          fill={`url(#mehan-dc-grad-${uid}-${s.id})`}
                        />
                      )}
                      <path
                        d={linePath}
                        fill="none"
                        stroke={color}
                        strokeWidth={2.25}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {activeIndex !== null && pts[activeIndex] && (
                        <circle
                          cx={pts[activeIndex].x}
                          cy={pts[activeIndex].y}
                          r={4.5}
                          fill={color}
                          stroke="var(--color-background-card, #ffffff)"
                          strokeWidth={2}
                        />
                      )}
                    </g>
                  );
                })}

            {/* Active scrub crosshair */}
            {activeIndex !== null && count > 0 && (
              <line
                x1={xForIndex(activeIndex)}
                y1={padTop}
                x2={xForIndex(activeIndex)}
                y2={padTop + plotH}
                className="mehan-dc-crosshair"
              />
            )}

            {/* Sparse X-axis labels (never tilted 45°) */}
            {categories.map((cat, idx) => {
              const stride = Math.max(1, Math.ceil(count / 6));
              if (idx % stride !== 0 && idx !== count - 1) return null;
              return (
                <text
                  key={`${cat}-${idx}`}
                  x={xForIndex(idx)}
                  y={svgH - 7}
                  textAnchor={
                    idx === 0 && kind !== 'bar'
                      ? 'start'
                      : idx === count - 1 && kind !== 'bar'
                        ? 'end'
                        : 'middle'
                  }
                  className="mehan-dc-tick"
                >
                  {cat.length > 12 ? `${cat.slice(0, 11)}…` : cat}
                </text>
              );
            })}
          </svg>
        </div>
      )}

      {/* Companion WCAG 2.2 AA screen-reader data table */}
      <table className="mehan-sr-only">
        <caption>{accessibleName}</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            {visibleSeries.map(s => (
              <th key={s.id} scope="col">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, idx) => (
            <tr key={`${cat}-${idx}`}>
              <th scope="row">{cat}</th>
              {visibleSeries.map(s => (
                <td key={s.id}>{fmt(s.values[idx] ?? 0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
