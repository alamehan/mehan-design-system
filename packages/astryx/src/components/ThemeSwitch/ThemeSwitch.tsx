'use client';

import React, {useRef} from 'react';
import {Monitor, Moon, Sun} from 'lucide-react';

export interface ThemeSwitchProps {
  /** Controlled theme mode preference */
  value: 'light' | 'dark' | 'system';
  /** Invoked whenever user selects a theme mode */
  onChange: (mode: 'light' | 'dark' | 'system') => void;
  /** Include the 3rd 'system' auto option */
  includeSystem?: boolean;
  /** Control height scale */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible group label */
  label?: string;
  /** Visible or accessible label for light mode */
  lightLabel?: string;
  /** Visible or accessible label for dark mode */
  darkLabel?: string;
  /** Visible or accessible label for system mode */
  systemLabel?: string;
  /** Render compact icon-only pills with accessible labels */
  isIconOnly?: boolean;
}

export function ThemeSwitch({
  value,
  onChange,
  includeSystem = true,
  size = 'md',
  label = 'Color theme',
  lightLabel = 'Light',
  darkLabel = 'Dark',
  systemLabel = 'Auto',
  isIconOnly = false,
}: ThemeSwitchProps) {
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const options: Array<{
    mode: 'light' | 'dark' | 'system';
    text: string;
    Icon: typeof Sun;
  }> = [
    {mode: 'light', text: lightLabel, Icon: Sun},
    {mode: 'dark', text: darkLabel, Icon: Moon},
    ...(includeSystem
      ? [{mode: 'system' as const, text: systemLabel, Icon: Monitor}]
      : []),
  ];

  const activeIdx = Math.max(
    0,
    options.findIndex(o => o.mode === value),
  );
  const iconPx = size === 'sm' ? 13 : 15;

  return (
    <div
      className="mehan-theme-switch"
      data-size={size}
      role="radiogroup"
      aria-label={label}>
      {options.map((opt, index) => {
        const isSelected = index === activeIdx;
        const IconComp = opt.Icon;
        return (
          <button
            key={opt.mode}
            ref={el => {
              btnRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={isIconOnly ? opt.text : undefined}
            title={isIconOnly ? opt.text : undefined}
            tabIndex={isSelected ? 0 : -1}
            className="mehan-ts-option"
            data-selected={isSelected ? 'true' : undefined}
            onClick={() => onChange(opt.mode)}
            onKeyDown={e => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const next = (index + 1) % options.length;
                onChange(options[next].mode);
                btnRefs.current[next]?.focus();
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prev = (index - 1 + options.length) % options.length;
                onChange(options[prev].mode);
                btnRefs.current[prev]?.focus();
              }
            }}>
            <IconComp size={iconPx} aria-hidden="true" />
            {!isIconOnly && <span>{opt.text}</span>}
          </button>
        );
      })}
    </div>
  );
}
