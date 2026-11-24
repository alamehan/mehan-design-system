'use client';

import {Timeline} from '@mehan/astryx';

export default function TimelineShowcase() {
  return (
    <Timeline
      items={[
        {
          id: 't1',
          title: 'Production rollout completed',
          timestamp: '14:22',
          actor: 'release-bot',
          status: 'success',
        },
        {
          id: 't2',
          title: 'Canary health check verified',
          timestamp: '14:05',
          actor: 'edge-us-east',
          status: 'accent',
        },
      ]}
    />
  );
}
