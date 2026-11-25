'use client';

import {DataChart} from '@mehan/astryx';

export default function DataChartShowcase() {
  return (
    <div style={{width: '100%', maxWidth: 540}}>
      <DataChart
        title="Throughput & Error Budget"
        subtitle="Last 6 intervals (req/s)"
        kind="area"
        categories={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']}
        series={[
          {id: 'edge', label: 'Edge Hits', values: [420, 510, 780, 940, 890, 980]},
          {id: 'origin', label: 'Origin Fetch', values: [120, 140, 195, 210, 180, 165]},
        ]}
      />
    </div>
  );
}
