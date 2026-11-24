/**
 * Framework-free immutable Undo/Redo history store with time-windowed coalescing.
 * Dragging high-frequency controls (`PrecisionSlider`, `ColorPicker`) with a matching
 * `coalesce` key collapses intermediate frames into a single undo step.
 */

export interface HistoryUpdateOptions {
  /** Coalesce consecutive updates sharing this key within `coalesceMs` into 1 undo entry. */
  coalesce?: string;
  /** Live preview update that does not push onto the undo stack until committed. */
  transient?: boolean;
  /** Optional human-readable action label (e.g. 'Change brand accent'). */
  label?: string;
}

export interface HistoryEntry<T> {
  state: T;
  label?: string;
}

export interface HistorySnapshot<T> {
  present: T;
  canUndo: boolean;
  canRedo: boolean;
  undoLabel?: string;
  redoLabel?: string;
  pastCount: number;
  futureCount: number;
}

export interface HistoryStore<T> {
  getState: () => T;
  getSnapshot: () => HistorySnapshot<T>;
  set: (
    nextOrUpdater: T | ((prev: T) => T),
    options?: HistoryUpdateOptions,
  ) => void;
  undo: () => boolean;
  redo: () => boolean;
  clearHistory: (replacePresent?: T) => void;
  subscribe: (listener: () => void) => () => void;
}

export interface CreateHistoryStoreOptions {
  /** Maximum undo steps retained (default: 60). */
  limit?: number;
  /** Coalescing window in ms for matching `coalesce` keys (default: 600). */
  coalesceMs?: number;
}

export function createHistoryStore<T>(
  initialState: T,
  options: CreateHistoryStoreOptions = {},
): HistoryStore<T> {
  const limit = Math.max(1, options.limit ?? 60);
  const coalesceMs = Math.max(0, options.coalesceMs ?? 600);

  let past: HistoryEntry<T>[] = [];
  let present: T = initialState;
  let presentLabel: string | undefined;
  let future: HistoryEntry<T>[] = [];

  let lastCoalesceKey: string | null = null;
  let lastCoalesceAt = 0;

  const listeners = new Set<() => void>();

  let cachedSnapshot: HistorySnapshot<T> = {
    present,
    canUndo: false,
    canRedo: false,
    undoLabel: undefined,
    redoLabel: undefined,
    pastCount: 0,
    futureCount: 0,
  };

  function rebuildSnapshot() {
    cachedSnapshot = {
      present,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      undoLabel: presentLabel ?? past[past.length - 1]?.label,
      redoLabel: future[0]?.label,
      pastCount: past.length,
      futureCount: future.length,
    };
  }

  function notify() {
    rebuildSnapshot();
    for (const listener of listeners) {
      listener();
    }
  }

  return {
    getState: () => present,
    getSnapshot: () => cachedSnapshot,

    set(nextOrUpdater, opts = {}) {
      const next =
        typeof nextOrUpdater === 'function'
          ? (nextOrUpdater as (prev: T) => T)(present)
          : nextOrUpdater;

      if (Object.is(next, present)) return;

      if (opts.transient) {
        present = next;
        notify();
        return;
      }

      const now = Date.now();
      const shouldCoalesce =
        Boolean(opts.coalesce) &&
        opts.coalesce === lastCoalesceKey &&
        now - lastCoalesceAt <= coalesceMs &&
        past.length > 0;

      if (!shouldCoalesce) {
        past = [...past, {state: present, label: presentLabel}];
        if (past.length > limit) {
          past = past.slice(past.length - limit);
        }
      }

      present = next;
      presentLabel = opts.label;
      future = [];
      lastCoalesceKey = opts.coalesce ?? null;
      lastCoalesceAt = opts.coalesce ? now : 0;
      notify();
    },

    undo() {
      if (past.length === 0) return false;
      const prevEntry = past[past.length - 1];
      past = past.slice(0, -1);
      future = [{state: present, label: presentLabel}, ...future];
      present = prevEntry.state;
      presentLabel = prevEntry.label;
      lastCoalesceKey = null;
      lastCoalesceAt = 0;
      notify();
      return true;
    },

    redo() {
      if (future.length === 0) return false;
      const [nextEntry, ...restFuture] = future;
      past = [...past, {state: present, label: presentLabel}].slice(-limit);
      future = restFuture;
      present = nextEntry.state;
      presentLabel = nextEntry.label;
      lastCoalesceKey = null;
      lastCoalesceAt = 0;
      notify();
      return true;
    },

    clearHistory(replacePresent) {
      if (replacePresent !== undefined) {
        present = replacePresent;
      }
      past = [];
      future = [];
      presentLabel = undefined;
      lastCoalesceKey = null;
      lastCoalesceAt = 0;
      notify();
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
