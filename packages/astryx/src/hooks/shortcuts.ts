'use client';

import {useEffect, useId, useRef, useSyncExternalStore} from 'react';
import {isApplePlatform, isTypingTarget} from '../runtime';

export interface MehanShortcutBinding {
  /**
   * Key combination such as `'mod+k'`, `'mod+\\'`, `'mod+enter'`, `'?'`, `'/'`, or `'escape'`.
   * `'mod'` resolves to `⌘` on Apple platforms and `Ctrl` elsewhere.
   */
  keys: string;
  /** Human-readable action description surfaced automatically in `<ShortcutSheet />`. */
  label: string;
  /** Logical category heading inside `<ShortcutSheet />`. @default 'General' */
  group?: string;
  /** Invoked when the shortcut fires. `event.preventDefault()` is called automatically. */
  onPress: (event: KeyboardEvent) => void;
  /** Allow firing while focus is inside a text input / textarea / contenteditable. @default false */
  allowInInputs?: boolean;
  /** Temporarily disables the shortcut and hides it from active registration. @default false */
  isDisabled?: boolean;
}

export interface RegisteredShortcutItem {
  id: string;
  keys: string;
  label: string;
  group: string;
}

const activeRegistry = new Map<string, RegisteredShortcutItem[]>();
const registryListeners = new Set<() => void>();
let cachedSnapshot: ReadonlyArray<RegisteredShortcutItem> = [];

function rebuildSnapshot() {
  const seen = new Set<string>();
  const merged: RegisteredShortcutItem[] = [];
  for (const list of activeRegistry.values()) {
    for (const item of list) {
      const dedupeKey = `${item.group}::${item.keys.toLowerCase()}::${item.label}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      merged.push(item);
    }
  }
  cachedSnapshot = merged;
  for (const listener of registryListeners) listener();
}

function subscribeRegistry(listener: () => void) {
  registryListeners.add(listener);
  return () => {
    registryListeners.delete(listener);
  };
}

export function getRegisteredShortcuts(): ReadonlyArray<RegisteredShortcutItem> {
  return cachedSnapshot;
}

const SERVER_EMPTY: ReadonlyArray<RegisteredShortcutItem> = [];

/**
 * Subscribes to all currently mounted `useMehanShortcuts` & `usePrimaryAction`
 * bindings on the page so `<ShortcutSheet />` stays self-documenting without prop-drilling.
 */
export function useRegisteredShortcuts(): ReadonlyArray<RegisteredShortcutItem> {
  return useSyncExternalStore(
    subscribeRegistry,
    getRegisteredShortcuts,
    () => SERVER_EMPTY,
  );
}

const KEY_ALIASES: Record<string, string> = {
  esc: 'escape',
  return: 'enter',
  space: ' ',
  spacebar: ' ',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  plus: '+',
};

function normalizeKeyToken(token: string): string {
  const lower = token.toLowerCase();
  return KEY_ALIASES[lower] ?? lower;
}

export function matchesShortcutEvent(combo: string, event: KeyboardEvent): boolean {
  const parts = combo
    .trim()
    .split('+')
    .map(p => p.trim())
    .filter(Boolean);
  if (parts.length === 0) return false;

  const rawTargetKey = parts[parts.length - 1];
  const targetKey = normalizeKeyToken(rawTargetKey);
  const modifiers = new Set(parts.slice(0, -1).map(m => m.toLowerCase()));

  const apple = isApplePlatform();
  const wantMod = modifiers.has('mod');
  const wantMeta = modifiers.has('meta') || modifiers.has('cmd') || (wantMod && apple);
  const wantCtrl =
    modifiers.has('ctrl') || modifiers.has('control') || (wantMod && !apple);
  const wantAlt = modifiers.has('alt') || modifiers.has('opt') || modifiers.has('option');
  const wantShift = modifiers.has('shift');

  if (event.metaKey !== wantMeta) return false;
  if (event.ctrlKey !== wantCtrl) return false;
  if (event.altKey !== wantAlt) return false;

  const eventKey = normalizeKeyToken(event.key || '');
  if (eventKey !== targetKey) return false;

  // Shifted punctuation like '?' (Shift+/ on US layouts) should match `keys: '?'` naturally
  const isShiftedSymbol =
    rawTargetKey.length === 1 &&
    rawTargetKey.toLowerCase() === rawTargetKey.toUpperCase() &&
    event.shiftKey &&
    !wantShift;

  if (wantShift && !event.shiftKey) return false;
  if (!wantShift && event.shiftKey && !isShiftedSymbol && modifiers.size > 0) {
    return false;
  }

  return true;
}

const OPEN_MODAL_LAYER_SELECTOR =
  'dialog[open], [role="dialog"][aria-modal="true"], [role="alertdialog"]';

/**
 * Law U1 Keyboard Engine: registers shortcuts with automatic IME composition
 * protection (`isComposing`), typing-target protection for plain keys (`?`, `/`),
 * Escape-layer respect (`defaultPrevented` & open modal check), and live registration
 * into `<ShortcutSheet />`.
 */
export function useMehanShortcuts(
  shortcuts: ReadonlyArray<MehanShortcutBinding>,
): void {
  const instanceId = useId();
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  const registrySignature = shortcuts
    .filter(s => !s.isDisabled && s.label)
    .map(s => `${s.group ?? 'General'}|${s.keys}|${s.label}`)
    .join(';;');

  useEffect(() => {
    const activeItems: RegisteredShortcutItem[] = shortcutsRef.current
      .filter(s => !s.isDisabled && s.label)
      .map((s, index) => ({
        id: `${instanceId}-${index}`,
        keys: s.keys,
        label: s.label,
        group: s.group ?? 'General',
      }));

    if (activeItems.length > 0) {
      activeRegistry.set(instanceId, activeItems);
    } else {
      activeRegistry.delete(instanceId);
    }
    rebuildSnapshot();

    return () => {
      activeRegistry.delete(instanceId);
      rebuildSnapshot();
    };
  }, [instanceId, registrySignature]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.isComposing || event.keyCode === 229) return;

      const inInput = isTypingTarget(event.target);

      for (const binding of shortcutsRef.current) {
        if (binding.isDisabled) continue;
        if (inInput && !binding.allowInInputs) continue;
        if (!matchesShortcutEvent(binding.keys, event)) continue;

        // If a modal dialog is open and target is outside it, let the top modal own Escape
        if (
          normalizeKeyToken(binding.keys) === 'escape' &&
          typeof document !== 'undefined' &&
          document.querySelector(OPEN_MODAL_LAYER_SELECTOR)
        ) {
          continue;
        }

        event.preventDefault();
        binding.onPress(event);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export interface UsePrimaryActionOptions {
  label?: string;
  group?: string;
  isDisabled?: boolean;
}

/**
 * Law U1 Primary Action Shortcut (`Mod+Enter`): fires reliably even while focus
 * is inside `<input>` or `<textarea>` (e.g. submitting a form, running a query,
 * or applying edits) while respecting IME composition and open modal dialogs.
 */
export function usePrimaryAction(
  onSubmit: (event: KeyboardEvent) => void,
  options: UsePrimaryActionOptions = {},
): void {
  useMehanShortcuts([
    {
      keys: 'mod+enter',
      label: options.label ?? 'Run or submit primary action',
      group: options.group ?? 'Actions',
      allowInInputs: true,
      isDisabled: options.isDisabled,
      onPress: onSubmit,
    },
  ]);
}
