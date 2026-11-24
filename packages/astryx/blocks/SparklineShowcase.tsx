'use client';

import {Sparkline} from '@mehan/astryx';

export default function SparklineShowcase() {
  return (
    <Sparkline
      label="7-day request throughput"
      data={[42, 48, 45, 59, 64, 61, 78]}
      labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
    />
  );
}
