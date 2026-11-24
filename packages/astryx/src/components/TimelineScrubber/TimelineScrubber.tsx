'use client';

import React, {useRef} from 'react';
import {Pause, Play} from 'lucide-react';

export interface TimelineMarker {
  /** Unique marker identifier */
  id: string;
  /** Marker position in seconds */
  time: number;
  /** Accessible keyframe / chapter label */
  label: string;
}

export interface TimelineScrubberProps {
  /** Controlled playhead position in seconds */
  currentTime: number;
  /** Total media or animation duration in seconds */
  duration: number;
  /** Called with target seconds on drag, click, marker jump, or frame step */
  onSeek: (seconds: number) => void;
  /** Current playback state */
  isPlaying?: boolean;
  /** Optional play/pause button toggle handler */
  onTogglePlay?: () => void;
  /** Optional clickable keyframe or chapter markers along the ruler */
  markers?: readonly TimelineMarker[];
  /** Frame rate used for Shift+Arrow single-frame stepping */
  frameRate?: number;
  /** Accessible slider label */
  label?: string;
}

function formatTimecode(sec: number, fps: number): string {
  const safe = Math.max(0, sec);
  const mins = Math.floor(safe / 60);
  const wholeSecs = Math.floor(safe % 60);
  const frames = Math.floor((safe - Math.floor(safe)) * fps);
  return `${String(mins).padStart(2, '0')}:${String(wholeSecs).padStart(2, '0')}.${String(frames).padStart(2, '0')}`;
}

export function TimelineScrubber({
  currentTime,
  duration,
  onSeek,
  isPlaying = false,
  onTogglePlay,
  markers = [],
  frameRate = 30,
  label = 'Timeline playhead',
}: TimelineScrubberProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const safeDur = Math.max(0.1, duration);
  const clamped = Math.min(safeDur, Math.max(0, currentTime));
  const pct = (clamped / safeDur) * 100;

  const seekFromClientX = (clientX: number) => {
    const box = railRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - box.left) / box.width));
    onSeek(Number((ratio * safeDur).toFixed(3)));
  };

  return (
    <div className="mehan-timeline-scrubber" role="group" aria-label={label}>
      <div className="mehan-ts-top">
        {onTogglePlay && (
          <button
            type="button"
            className="mehan-ts-play-btn"
            aria-label={isPlaying ? 'Pause playback' : 'Play timeline'}
            onClick={onTogglePlay}>
            {isPlaying ? (
              <Pause size={13} aria-hidden="true" />
            ) : (
              <Play size={13} aria-hidden="true" />
            )}
          </button>
        )}
        <span className="mehan-ts-timecode" aria-live="off">
          {formatTimecode(clamped, frameRate)} / {formatTimecode(safeDur, frameRate)}
        </span>
      </div>

      <div className="mehan-ts-ruler">
        <div
          ref={railRef}
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={Number(safeDur.toFixed(2))}
          aria-valuenow={Number(clamped.toFixed(2))}
          aria-valuetext={`${clamped.toFixed(2)} seconds`}
          className="mehan-ts-rail-hit"
          onPointerDown={e => {
            e.currentTarget.setPointerCapture(e.pointerId);
            seekFromClientX(e.clientX);
          }}
          onPointerMove={e => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
            seekFromClientX(e.clientX);
          }}
          onKeyDown={e => {
            const step = e.shiftKey ? 1 / Math.max(1, frameRate) : 1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              e.preventDefault();
              onSeek(Number(Math.min(safeDur, clamped + step).toFixed(3)));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              e.preventDefault();
              onSeek(Number(Math.max(0, clamped - step).toFixed(3)));
            } else if (e.key === 'Home') {
              e.preventDefault();
              onSeek(0);
            } else if (e.key === 'End') {
              e.preventDefault();
              onSeek(safeDur);
            }
          }}>
          <div className="mehan-ts-track">
            <div className="mehan-ts-fill" style={{width: `${pct}%`}} />
          </div>

          <span
            className="mehan-ts-playhead"
            style={{left: `${pct}%`}}
            aria-hidden="true"
          />
        </div>

        {markers.map(marker => {
          const mPct = Math.min(100, Math.max(0, (marker.time / safeDur) * 100));
          return (
            <button
              key={marker.id}
              type="button"
              className="mehan-ts-marker"
              style={{left: `${mPct}%`}}
              title={`${marker.label} (${marker.time.toFixed(1)}s)`}
              aria-label={`Jump to ${marker.label} (${marker.time.toFixed(1)}s)`}
              onClick={() => onSeek(marker.time)}
            />
          );
        })}
      </div>
    </div>
  );
}
