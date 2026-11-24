'use client';

import {useState} from 'react';
import {CanvasZoomBar} from '@mehan/astryx';

export default function CanvasZoomBarShowcase() {
  const [zoom, setZoom] = useState(100);
  return (
    <CanvasZoomBar
      zoom={zoom}
      onZoomChange={setZoom}
      onFitToScreen={() => setZoom(100)}
    />
  );
}
