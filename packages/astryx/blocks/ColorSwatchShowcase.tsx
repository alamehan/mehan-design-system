'use client';

import {useState} from 'react';
import {HStack} from '@astryxdesign/core/Layout';
import {ColorSwatch} from '@mehan/astryx';

const PALETTE = ['#d42a5f', '#2563eb', '#059669', '#d95b16', '#7c3aed', '#0d9488'];

export default function ColorSwatchShowcase() {
  const [selected, setSelected] = useState('#d42a5f');
  return (
    <HStack gap={2} align="center">
      {PALETTE.map(hex => (
        <ColorSwatch
          key={hex}
          color={hex}
          isSelected={selected === hex}
          onSelect={setSelected}
        />
      ))}
      <ColorSwatch color="#000000" isRainbow label="Custom color" />
    </HStack>
  );
}
