'use client';

import {useCallback, useSyncExternalStore} from 'react';
import type {HistorySnapshot, HistoryStore} from '@mehan/dna';

export type MehanThemeModePreference = 'system' | 'light' | 'dark';

/**
 * Canonical inline `<head>` script preventing dark-mode Flash of Unstyled
 * Content (FOUC) in Next.js App Router, Remix, Astro, or SSR HTML shells.
 */
export const MEHAN_THEME_INIT_SCRIPT = `(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export interface UseMehanThemeModeOptions {
  storageKey?: string;
  defaultMode?: MehanThemeModePreference;
}

export interface UseMehanThemeModeResult {
  mode: MehanThemeModePreference;
  resolvedMode: 'light' | 'dark';
  setMode: (next: MehanThemeModePreference) => void;
  cycleMode: () => void;
}

const modeListeners = new Set<() => void>();

function notifyModeListeners() {
  for (const fn of modeListeners) fn();
}

function readStoredMode(
  storageKey: string,
  fallback: MehanThemeModePreference,
): MehanThemeModePreference {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  } catch {
    // Ignore sandboxed storage restrictions
  }
  return fallback;
}

function resolveEffectiveMode(pref: MehanThemeModePreference): 'light' | 'dark' {
  if (pref === 'light' || pref === 'dark') return pref;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
}

function syncRootThemeAttributes(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.style.colorScheme = resolved;
}

/**
 * SSR-safe, cross-tab synchronized theme preference hook built on
 * `useSyncExternalStore` (zero hydration mismatch).
 */
export function useMehanThemeMode(
  options: UseMehanThemeModeOptions = {},
): UseMehanThemeModeResult {
  const storageKey = options.storageKey ?? 'mehan-mode';
  const defaultMode = options.defaultMode ?? 'system';

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      modeListeners.add(onStoreChange);
      if (typeof window === 'undefined') {
        return () => {
          modeListeners.delete(onStoreChange);
        };
      }
      const mql =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)')
          : null;
      const handleStorage = (e: StorageEvent) => {
        if (!e.key || e.key === storageKey) onStoreChange();
      };
      const handleMedia = () => {
        const cur = readStoredMode(storageKey, defaultMode);
        if (cur === 'system') {
          syncRootThemeAttributes(resolveEffectiveMode('system'));
          onStoreChange();
        }
      };
      window.addEventListener('storage', handleStorage);
      mql?.addEventListener?.('change', handleMedia);
      return () => {
        modeListeners.delete(onStoreChange);
        window.removeEventListener('storage', handleStorage);
        mql?.removeEventListener?.('change', handleMedia);
      };
    },
    [storageKey, defaultMode],
  );

  const snapshotString = useSyncExternalStore(
    subscribe,
    () => {
      const pref = readStoredMode(storageKey, defaultMode);
      return `${pref}:${resolveEffectiveMode(pref)}`;
    },
    () => `${defaultMode}:light`,
  );

  const [mode, resolvedMode] = snapshotString.split(':') as [
    MehanThemeModePreference,
    'light' | 'dark',
  ];

  const setMode = useCallback(
    (next: MehanThemeModePreference) => {
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Ignore sandboxed file:// storage limits
      }
      syncRootThemeAttributes(resolveEffectiveMode(next));
      notifyModeListeners();
    },
    [storageKey],
  );

  const cycleMode = useCallback(() => {
    const order: MehanThemeModePreference[] = ['light', 'dark', 'system'];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    setMode(next);
  }, [mode, setMode]);

  return {mode, resolvedMode, setMode, cycleMode};
}

/**
 * React 19 `useSyncExternalStore` binding for `createHistoryStore<T>`.
 */
export function useHistoryStore<T>(store: HistoryStore<T>): HistorySnapshot<T> {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot,
  );
}

/**
 * Focus-preserving clipboard helper: uses `navigator.clipboard.writeText` first
 * and falls back to synchronous `ClipboardEvent` (`copy`) interception without
 * creating or focusing a hidden `<textarea>` (safe inside modal focus traps).
 */
export async function copyTextSafe(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to synchronous ClipboardEvent interception
    }
  }
  if (typeof document === 'undefined') return false;
  let intercepted = false;
  const onCopy = (event: ClipboardEvent) => {
    if (!event.clipboardData) return;
    event.clipboardData.setData('text/plain', text);
    event.preventDefault();
    intercepted = true;
  };
  document.addEventListener('copy', onCopy, {capture: true});
  try {
    document.execCommand('copy');
  } catch {
    intercepted = false;
  } finally {
    document.removeEventListener('copy', onCopy, {capture: true});
  }
  return intercepted;
}

const NON_TYPING_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
]);

/**
 * Returns `true` only when `target` is a genuine text-entry element (treating
 * `<input type="range|checkbox|radio|color|button">` as non-typing so shortcuts
 * like `Mod+Z` still work after scrubbing sliders or clicking swatches).
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === 'TEXTAREA') return true;
  if (tag === 'INPUT') {
    const inputType = ((target as HTMLInputElement).type || 'text').toLowerCase();
    return !NON_TYPING_INPUT_TYPES.has(inputType);
  }
  return target.getAttribute('role') === 'textbox';
}

export function isApplePlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

/**
 * Formats a shortcut string like `'mod+shift+z'` into platform-appropriate keycap
 * labels (`['⌘', '⇧', 'Z']` on Apple, `['Ctrl', 'Shift', 'Z']` elsewhere).
 */
export function formatShortcutKeys(
  combo: string,
  apple: boolean = isApplePlatform(),
): string[] {
  return combo
    .trim()
    .split('+')
    .filter(Boolean)
    .map(part => {
      const lower = part.toLowerCase();
      if (lower === 'mod' || lower === 'cmd' || lower === 'meta') {
        return apple ? '⌘' : 'Ctrl';
      }
      if (lower === 'ctrl' || lower === 'control') return apple ? '⌃' : 'Ctrl';
      if (lower === 'shift') return apple ? '⇧' : 'Shift';
      if (lower === 'alt' || lower === 'option' || lower === 'opt') {
        return apple ? '⌥' : 'Alt';
      }
      if (lower === 'enter' || lower === 'return') return '↵';
      if (lower === 'esc' || lower === 'escape') return 'Esc';
      return part.length === 1 ? part.toUpperCase() : part;
    });
}
