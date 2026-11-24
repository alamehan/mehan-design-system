'use client';

import {ActivityRing} from '@mehan/astryx';

export default function ActivityRingShowcase() {
  return (
    <ActivityRing
      label="Release readiness"
      rings={[
        {id: 'r1', label: 'Contrast AA', value: 100},
        {id: 'r2', label: 'Test coverage', value: 94},
        {id: 'r3', label: 'Docs parity', value: 88},
      ]}
    />
  );
}
