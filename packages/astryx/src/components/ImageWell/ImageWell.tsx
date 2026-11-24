'use client';

import React, {useRef, useState} from 'react';
import {ImagePlus, Trash2, Upload} from 'lucide-react';
import {formatBytes} from '@mehan/dna';

export interface ImageWellProps {
  /** Preview image URL or data URI */
  value?: string | null;
  /** Called with the selected File and its base64 data URL */
  onSelectFile?: (file: File, dataUrl: string) => void;
  /** Called when the user clears the current image */
  onClear?: () => void;
  /** Accessible and visible label */
  label?: string;
  /** Supporting format / interaction hint */
  hint?: string;
  /** Accepted MIME types */
  accept?: string;
  /** Frame aspect ratio */
  aspectRatio?: 'square' | 'landscape' | 'wide';
  /** Maximum accepted file size in bytes */
  maxSizeBytes?: number;
  /** Disable uploading or clearing */
  isDisabled?: boolean;
}

export function ImageWell({
  value,
  onSelectFile,
  onClear,
  label = 'Upload image',
  hint = 'PNG, JPG, WebP, or SVG — drop, click, or paste',
  accept = 'image/*',
  aspectRatio = 'landscape',
  maxSizeBytes = 5_242_880,
  isDisabled = false,
}: ImageWellProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFile = (file: File | undefined | null) => {
    if (!file || isDisabled) return;
    if (file.size > maxSizeBytes) {
      setErrorMsg(
        `Choose an image smaller than ${formatBytes(maxSizeBytes)} (selected file is ${formatBytes(file.size)}).`,
      );
      return;
    }
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSelectFile?.(file, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mehan-image-well-wrap">
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        disabled={isDisabled}
        style={{display: 'none'}}
        onChange={e => {
          handleFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />

      {value ? (
        <div
          className="mehan-image-well has-image"
          data-aspect={aspectRatio}
          onDragOver={e => {
            if (isDisabled) return;
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            if (isDisabled) return;
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}>
          <img src={value} alt={label} className="mehan-iw-img" />
          {!isDisabled && (
            <div className="mehan-iw-actions">
              <button
                type="button"
                className="mehan-iw-btn"
                onClick={() => fileRef.current?.click()}>
                <Upload size={13} aria-hidden="true" />
                <span>Replace</span>
              </button>
              {onClear && (
                <button
                  type="button"
                  className="mehan-iw-btn is-danger"
                  aria-label={`Remove ${label}`}
                  onClick={() => {
                    setErrorMsg(null);
                    onClear();
                  }}>
                  <Trash2 size={13} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-label={label}
          aria-disabled={isDisabled || undefined}
          className="mehan-image-well"
          data-aspect={aspectRatio}
          data-dragover={dragOver ? 'true' : undefined}
          onClick={() => {
            if (!isDisabled) fileRef.current?.click();
          }}
          onKeyDown={e => {
            if (isDisabled) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileRef.current?.click();
            }
          }}
          onPaste={e => {
            if (isDisabled) return;
            const item = [...(e.clipboardData?.items ?? [])].find(i =>
              i.type.startsWith('image/'),
            );
            const file = item?.getAsFile();
            if (file) {
              e.preventDefault();
              handleFile(file);
            }
          }}
          onDragOver={e => {
            if (isDisabled) return;
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => {
            if (isDisabled) return;
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}>
          <span className="mehan-iw-icon" aria-hidden="true">
            <ImagePlus size={20} />
          </span>
          <span className="mehan-iw-title">{label}</span>
          <span className="mehan-iw-hint">{hint}</span>
        </div>
      )}

      {errorMsg && (
        <p className="mehan-iw-error" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
