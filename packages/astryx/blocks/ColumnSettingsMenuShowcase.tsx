'use client';

import {useState} from 'react';
import {
  HStack,
  Stack,
  Table,
  Text,
  proportional,
  useTableColumnSettings,
  useTableColumnSettingsState,
} from '@astryxdesign/core';
import {ColumnSettingsMenu} from '@mehan/astryx';

interface SampleServiceRow extends Record<string, unknown> {
  id: string;
  service: string;
  region: string;
  p95: string;
}

const SAMPLE_ROWS: SampleServiceRow[] = [
  {id: '1', service: 'Auth API', region: 'ap-southeast-1', p95: '14 ms'},
  {id: '2', service: 'Billing Worker', region: 'eu-central-1', p95: '22 ms'},
];

const ALL_COLUMNS = [
  {key: 'service', header: 'Service', width: proportional(1.4)},
  {key: 'region', header: 'Region', width: proportional(1)},
  {key: 'p95', header: 'P95 Latency', width: proportional(1), align: 'end' as const},
];

export default function ColumnSettingsMenuShowcase() {
  const [activeKeys, setActiveKeys] = useState<ReadonlyArray<string>>([
    'service',
    'region',
    'p95',
  ]);
  const colState = useTableColumnSettingsState({
    columns: [
      {key: 'service', label: 'Service', isAlwaysVisible: true},
      {key: 'region', label: 'Region'},
      {key: 'p95', label: 'P95 Latency'},
    ],
    activeColumnKeys: activeKeys,
    onChangeActiveColumnKeys: setActiveKeys,
  });
  const colPlugin = useTableColumnSettings<SampleServiceRow>(
    colState.columnSettingsConfig,
  );

  return (
    <Stack gap={2} width={480} maxWidth="100%">
      <HStack hAlign="between" vAlign="center">
        <Text weight="semibold">Active Services</Text>
        <ColumnSettingsMenu columns={colState.columnSettingsConfig.columns} state={colState} />
      </HStack>
      <Table
        data={SAMPLE_ROWS}
        idKey="id"
        columns={ALL_COLUMNS}
        plugins={{columnSettings: colPlugin}}
        density="compact"
      />
    </Stack>
  );
}
