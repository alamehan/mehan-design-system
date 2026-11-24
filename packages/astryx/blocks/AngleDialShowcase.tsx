'use client';

import {useState} from 'react';
import {AngleDial} from '@mehan/astryx';

export default function AngleDialShowcase() {
  const [angle, setAngle] = useState(135);
  return <AngleDial label="Key light" value={angle} onChange={setAngle} />;
}
