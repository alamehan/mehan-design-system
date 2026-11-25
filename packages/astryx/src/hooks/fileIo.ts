'use client';

export interface PickFilesOptions {
  /** Accepted MIME types or extensions (`'.json,.csv'` or `['.json', 'application/json']`). */
  accept?: string | ReadonlyArray<string>;
  /** Allow selecting multiple files at once. @default false */
  multiple?: boolean;
}

/**
 * Reads a `Blob` or `File` as UTF-8 text with fallback for older test DOM environments.
 */
export async function readFileText(blob: Blob): Promise<string> {
  if (typeof blob.text === 'function') {
    return blob.text();
  }
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file text.'));
    reader.readAsText(blob);
  });
}

/**
 * Opens the native file picker and resolves the chosen `File[]` (resolving `[]`
 * cleanly if the user cancels the dialog).
 */
export function pickFiles(options: PickFilesOptions = {}): Promise<File[]> {
  if (typeof document === 'undefined') return Promise.resolve([]);
  return new Promise<File[]>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = Boolean(options.multiple);
    if (options.accept) {
      input.accept = Array.isArray(options.accept)
        ? options.accept.join(',')
        : String(options.accept);
    }
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.opacity = '0';
    document.body.appendChild(input);

    let settled = false;
    const finish = (files: File[]) => {
      if (settled) return;
      settled = true;
      input.remove();
      resolve(files);
    };

    input.addEventListener('change', () => {
      finish(input.files ? Array.from(input.files) : []);
    });
    input.addEventListener('cancel', () => finish([]));

    input.click();
  });
}

/**
 * Triggers a memory-safe client download for any `Blob` and revokes the
 * temporary `ObjectURL` on the next macrotask.
 */
export function downloadBlob(filename: string, blob: Blob): void {
  if (typeof document === 'undefined' || typeof URL === 'undefined') return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Serializes `data` as formatted UTF-8 JSON and downloads it on the client.
 */
export function downloadJson(filename: string, data: unknown, indent = 2): void {
  const finalName = filename.endsWith('.json') ? filename : `${filename}.json`;
  const payload = `${JSON.stringify(data, null, indent)}\n`;
  downloadBlob(finalName, new Blob([payload], {type: 'application/json;charset=utf-8'}));
}
