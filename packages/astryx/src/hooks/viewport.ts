'use client';

import {useMediaQuery} from '@astryxdesign/core';

/**
 * Canonical CSS media queries aligned 1:1 with Mehan's UX Laws U2 & U5
 * (`packages/astryx/src/styles.css`).
 */
export const MEHAN_MEDIA_QUERIES = {
  mobile: '(max-width: 767px)',
  compactHeight: '(max-height: 559px)',
  coarsePointer: '(pointer: coarse)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: more), (forced-colors: active)',
} as const;

export interface MehanViewportState {
  /** Viewport width `<= 767px` (single-column / Drawer inspector breakpoint). */
  isMobile: boolean;
  /** Viewport height `<= 559px` (e.g. `200%` desktop zoom or landscape phone). */
  isCompactHeight: boolean;
  /** Primary pointer is touch/coarse (`44×44px` minimum target size law). */
  isCoarsePointer: boolean;
  /** User prefers reduced motion (`prefers-reduced-motion: reduce`). */
  prefersReducedMotion: boolean;
  /** User enabled OS High Contrast or Forced Colors mode. */
  prefersHighContrast: boolean;
  /**
   * Law U2 Scroll Release signal: `true` whenever fixed pane heights must release
   * to natural document scrolling (`isMobile || isCompactHeight`).
   */
  shouldReleasePaneScroll: boolean;
}

/**
 * Reactive viewport & accessibility media preset built directly on top of
 * `@astryxdesign/core`'s SSR-safe shared-listener `useMediaQuery`.
 */
export function useMehanViewport(): MehanViewportState {
  const isMobile = useMediaQuery(MEHAN_MEDIA_QUERIES.mobile, false);
  const isCompactHeight = useMediaQuery(MEHAN_MEDIA_QUERIES.compactHeight, false);
  const isCoarsePointer = useMediaQuery(MEHAN_MEDIA_QUERIES.coarsePointer, false);
  const prefersReducedMotion = useMediaQuery(MEHAN_MEDIA_QUERIES.reducedMotion, false);
  const prefersHighContrast = useMediaQuery(MEHAN_MEDIA_QUERIES.highContrast, false);

  return {
    isMobile,
    isCompactHeight,
    isCoarsePointer,
    prefersReducedMotion,
    prefersHighContrast,
    shouldReleasePaneScroll: isMobile || isCompactHeight,
  };
}
