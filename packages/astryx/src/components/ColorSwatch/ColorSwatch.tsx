'use client';

import React from 'react';

export interface ColorSwatchProps {
  /** Valid CSS color value (e.g. '#d42a5f') */
  color: string;
  /** Accessible label for screen readers (defaults to color value) */
  label?: string;
  /** Whether this swatch is currently selected */
  isSelected?: boolean;
  /** Render the rainbow conic custom-color trigger visual */
  isRainbow?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Shape variant */
  shape?: 'circle' | 'rounded';
  /** Disable interaction */
  isDisabled?: boolean;
  /** Click callback */
  onSelect?: (color: string) => void;
}

export function ColorSwatch({
  color,
  label,
  isSelected = false,
  isRainbow = false,
  size = 'md',
  shape = 'circle',
  isDisabled = false,
  onSelect,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      className="mehan-swatch"
      data-size={size}
      data-shape={shape}
      data-selected={isSelected ? 'true' : undefined}
      data-rainbow={isRainbow ? 'true' : undefined}
      aria-label={label ?? `Select color ${color}`}
      aria-pressed={onSelect ? isSelected : undefined}
      disabled={isDisabled}
      onClick={onSelect ? () => onSelect(color) : undefined}
      style={isRainbow ? undefined : {backgroundColor: color}}
    />
  );
}
