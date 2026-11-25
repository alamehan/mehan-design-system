'use client';

import {Stack, Text} from '@astryxdesign/core';
import {ColumnView, type ColumnViewNode} from '@mehan/astryx';

const TREE: ColumnViewNode[] = [
  {
    id: 'tokens',
    label: 'Design Tokens',
    badge: '3',
    children: [
      {id: 'colors', label: 'Colors.w3c.json', meta: '26 keys'},
      {id: 'radii', label: 'Radii.w3c.json', meta: '5 steps'},
      {id: 'fonts', label: 'Typography.w3c.json', meta: '10 families'},
    ],
  },
  {
    id: 'components',
    label: 'Components',
    badge: '2',
    children: [
      {id: 'workspace', label: 'WorkspaceLayout.tsx', meta: 'Level 1'},
      {id: 'stage', label: 'CanvasStage.tsx', meta: 'Level 2'},
    ],
  },
];

export default function ColumnViewShowcase() {
  return (
    <div style={{width: '100%', maxWidth: 580}}>
      <ColumnView
        items={TREE}
        defaultSelectedPath={['tokens', 'colors']}
        renderDetail={node => (
          <Stack gap={1}>
            <Text weight="semibold">{node.label}</Text>
            <Text type="supporting" color="secondary">
              {node.meta ?? 'Directory node'}
            </Text>
          </Stack>
        )}
      />
    </div>
  );
}
