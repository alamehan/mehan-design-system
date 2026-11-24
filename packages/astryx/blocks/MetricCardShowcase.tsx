'use client';

import {Grid} from '@astryxdesign/core/Grid';
import {MetricCard} from '@mehan/astryx';

export default function MetricCardShowcase() {
  return (
    <Grid columns={{minWidth: 210, max: 2}} gap={3} width={480} maxWidth="100%">
      <MetricCard
        label="Active Workspaces"
        value="12,840"
        delta={{value: '+18.4%', direction: 'up'}}
        caption="vs. previous 30 days"
      />
      <MetricCard
        label="P95 Frame Budget"
        value="2.8 ms"
        delta={{value: '-14%', direction: 'down', sentiment: 'positive'}}
        caption="Well below 16.6 ms target"
      />
    </Grid>
  );
}
