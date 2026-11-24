'use client';

import {useState} from 'react';
import {GradientPicker, type GradientStop} from '@mehan/astryx';

export default function GradientPickerShowcase() {
  const [angle, setAngle] = useState(135);
  const [kind, setKind] = useState<'linear' | 'radial'>('linear');
  const [stops, setStops] = useState<GradientStop[]>([
    {id: 's1', color: '#ff7597', position: 0},
    {id: 's2', color: '#d42a5f', position: 52},
    {id: 's3', color: '#7a1236', position: 100},
  ]);

  return (
    <GradientPicker
      stops={stops}
      onStopsChange={setStops}
      angle={angle}
      onAngleChange={setAngle}
      kind={kind}
      onKindChange={setKind}
    />
  );
}
