'use client';

import {useCallback, useEffect, useRef, useState} from 'react';

export interface DraftStorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface StoredDraftEnvelope<T> {
  v: number;
  savedAt: number;
  data: T;
}

export interface UseAutoDraftOptions<T> {
  /** Unique storage key for this form or workbench surface. */
  key: string;
  /** Default value when no valid draft exists. */
  initialValue: T;
  /** Schema version; mismatched stored versions are safely discarded. @default 1 */
  version?: number;
  /** Debounce window in milliseconds before persisting changes. @default 450 */
  debounceMs?: number;
  /** Disable persistence dynamically when needed. @default true */
  isEnabled?: boolean;
  /** Custom storage backend (defaults to `window.localStorage` when available). */
  storage?: DraftStorageLike;
  /** Optional runtime type guard validating restored JSON payloads. */
  validate?: (candidate: unknown) => candidate is T;
}

export interface UseAutoDraftResult<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  /** `true` when the initial state was hydrated from a previously saved draft. */
  hasRestoredDraft: boolean;
  /** `true` when `value` differs structurally from `initialValue`. */
  isDirty: boolean;
  /** Epoch timestamp (`ms`) of the latest persisted draft, or `null` if clean/cleared. */
  lastSavedAt: number | null;
  /** Removes the persisted draft from storage without changing the current in-memory value. */
  clearDraft: () => void;
  /** Resets in-memory state to `initialValue` and clears storage. */
  resetToInitial: () => void;
  /** Immediately flushes any pending debounced write to storage. */
  flushDraft: () => void;
}

function getDefaultStorage(): DraftStorageLike | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function safeSerialize(val: unknown): string {
  try {
    return JSON.stringify(val);
  } catch {
    return '';
  }
}

function readEnvelope<T>(
  storage: DraftStorageLike | null,
  key: string,
  version: number,
  validate?: (candidate: unknown) => candidate is T,
): StoredDraftEnvelope<T> | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredDraftEnvelope<T>>;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.v !== version ||
      parsed.data === undefined
    ) {
      return null;
    }
    if (validate && !validate(parsed.data)) return null;
    return {
      v: version,
      savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
      data: parsed.data,
    };
  } catch {
    return null;
  }
}

/**
 * Law U3 Resilient Auto-Draft Hook: debounces local draft persistence with
 * schema-version safety, sandboxed `file://` resilience, and flush-on-unmount.
 */
export function useAutoDraft<T>({
  key,
  initialValue,
  version = 1,
  debounceMs = 450,
  isEnabled = true,
  storage,
  validate,
}: UseAutoDraftOptions<T>): UseAutoDraftResult<T> {
  const resolvedStorage = storage ?? getDefaultStorage();
  const initialJsonRef = useRef<string>(safeSerialize(initialValue));
  const initialValueRef = useRef<T>(initialValue);
  initialValueRef.current = initialValue;

  const [boot] = useState(() => {
    if (!isEnabled) {
      return {value: initialValue, restored: false, savedAt: null as number | null};
    }
    const found = readEnvelope<T>(resolvedStorage, key, version, validate);
    if (found) {
      return {value: found.data, restored: true, savedAt: found.savedAt};
    }
    return {value: initialValue, restored: false, savedAt: null as number | null};
  });

  const [value, setValue] = useState<T>(boot.value);
  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(boot.restored);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(boot.savedAt);

  const valueRef = useRef<T>(value);
  valueRef.current = value;
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipFirstEffectRef = useRef(true);

  const isDirty = safeSerialize(value) !== initialJsonRef.current;

  const writeNow = useCallback(
    (snapshot: T) => {
      const store = storage ?? getDefaultStorage();
      if (!store || !isEnabled) return;
      const serializedSnapshot = safeSerialize(snapshot);
      try {
        if (serializedSnapshot === initialJsonRef.current) {
          store.removeItem(key);
          setLastSavedAt(null);
          return;
        }
        const now = Date.now();
        const envelope: StoredDraftEnvelope<T> = {
          v: version,
          savedAt: now,
          data: snapshot,
        };
        store.setItem(key, JSON.stringify(envelope));
        setLastSavedAt(now);
      } catch {
        // Ignore quota or sandboxed storage errors gracefully
      }
    },
    [isEnabled, key, storage, version],
  );

  const flushDraft = useCallback(() => {
    if (pendingTimerRef.current !== null) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
      writeNow(valueRef.current);
    }
  }, [writeNow]);

  useEffect(() => {
    if (skipFirstEffectRef.current) {
      skipFirstEffectRef.current = false;
      return;
    }
    if (!isEnabled) return;

    if (pendingTimerRef.current !== null) {
      clearTimeout(pendingTimerRef.current);
    }
    pendingTimerRef.current = setTimeout(() => {
      pendingTimerRef.current = null;
      writeNow(valueRef.current);
    }, debounceMs);

    return () => {
      if (pendingTimerRef.current !== null) {
        clearTimeout(pendingTimerRef.current);
        pendingTimerRef.current = null;
      }
    };
  }, [value, debounceMs, isEnabled, writeNow]);

  // Flush any pending debounced write on pagehide or unmount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPageHide = () => flushDraft();
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      flushDraft();
    };
  }, [flushDraft]);

  const clearDraft = useCallback(() => {
    if (pendingTimerRef.current !== null) {
      clearTimeout(pendingTimerRef.current);
      pendingTimerRef.current = null;
    }
    const store = storage ?? getDefaultStorage();
    try {
      store?.removeItem(key);
    } catch {
      // Ignore sandboxed storage restrictions
    }
    setHasRestoredDraft(false);
    setLastSavedAt(null);
  }, [key, storage]);

  const resetToInitial = useCallback(() => {
    clearDraft();
    setValue(initialValueRef.current);
  }, [clearDraft]);

  return {
    value,
    setValue,
    hasRestoredDraft,
    isDirty,
    lastSavedAt,
    clearDraft,
    resetToInitial,
    flushDraft,
  };
}

/**
 * Law U3 Unsaved-Changes Guard: attaches a browser `beforeunload` prompt
 * strictly while `isDirty` is `true`.
 */
export function useUnsavedGuard(isDirty: boolean): void {
  useEffect(() => {
    if (!isDirty || typeof window === 'undefined') return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [isDirty]);
}
