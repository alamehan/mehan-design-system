'use client';

import {useState} from 'react';
import {Badge} from '@astryxdesign/core';
import {CanvasStage, CanvasZoomBar, TimelineScrubber} from '@mehan/astryx';

export default function CanvasStageShowcase() {
  const [zoom, setZoom] = useState(100);
  const [time, setTime] = useState(1.2);

  return (
    <div style={{width: '100%', maxWidth: 560}}>
      <CanvasStage
        backdrop="dots"
        minHeight={220}
        topStart={<Badge variant="neutral" label="Scene · 60 fps" />}
        bottomEnd={
          <CanvasZoomBar
            zoom={zoom}
            onZoomChange={setZoom}
            onFitToScreen={() => setZoom(100)}
            menuPlacement="top"
          />
        }
        transport={
          <TimelineScrubber
            currentTime={time}
            duration={4}
            onSeek={setTime}
          />
        }
      >
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            padding: '16px 24px',
            borderRadius: 14,
            background: 'var(--color-background-card)',
            boxShadow: 'var(--shadow-med)',
            fontWeight: 600,
          }}
        >
          Interactive Stage Preview ({zoom}%)
        </div>
      </CanvasStage>
    </div>
  );
}
