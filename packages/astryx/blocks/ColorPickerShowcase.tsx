'use client';

import {useState} from 'react';
import {ColorPicker} from '@mehan/astryx';

export default function ColorPickerShowcase() {
  const [color, setColor] = useState('#d42a5f');
  return <ColorPicker value={color} onChange={setColor} />;
}
