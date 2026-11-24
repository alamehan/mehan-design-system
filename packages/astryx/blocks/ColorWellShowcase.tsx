'use client';

import {useState} from 'react';
import {ColorWell} from '@mehan/astryx';

export default function ColorWellShowcase() {
  const [color, setColor] = useState('#2563eb');
  const [alpha, setAlpha] = useState(0.85);
  return (
    <ColorWell
      label="Fill color"
      value={color}
      onChange={setColor}
      hasAlpha
      alpha={alpha}
      onAlphaChange={setAlpha}
    />
  );
}
