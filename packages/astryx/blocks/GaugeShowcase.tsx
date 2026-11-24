'use client';

import {Gauge} from '@mehan/astryx';

export default function GaugeShowcase() {
  return <Gauge label="Memory quota" value={68} unit="%" tone="accent" />;
}
