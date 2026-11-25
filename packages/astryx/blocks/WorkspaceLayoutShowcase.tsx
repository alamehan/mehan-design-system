'use client';

import {useState} from 'react';
import {Badge, Button, HStack, Stack, Text} from '@astryxdesign/core';
import {WorkspaceLayout} from '@mehan/astryx';

export default function WorkspaceLayoutShowcase() {
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [selected, setSelected] = useState('Edge Gateway');

  return (
    <div style={{width: '100%', maxWidth: 760}}>
      <WorkspaceLayout
        desktopHeight={280}
        toolbar={
          <HStack hAlign="between" vAlign="center" gap={2}>
            <Text weight="semibold">Deployments</Text>
            <Button
              variant="secondary"
              size="sm"
              label={inspectorOpen ? 'Hide inspector' : 'Show inspector'}
              onClick={() => setInspectorOpen(prev => !prev)}
            />
          </HStack>
        }
        startPane={{
          title: 'Environments',
          defaultWidth: 180,
          content: (
            <Stack gap={1}>
              {['Edge Gateway', 'Auth Worker', 'Billing Sync'].map(item => (
                <Button
                  key={item}
                  variant={selected === item ? 'secondary' : 'ghost'}
                  size="sm"
                  label={item}
                  onClick={() => {
                    setSelected(item);
                    setInspectorOpen(true);
                  }}
                />
              ))}
            </Stack>
          ),
        }}
        endPane={{
          title: 'Inspector',
          isOpen: inspectorOpen,
          onOpenChange: setInspectorOpen,
          defaultWidth: 210,
          content: (
            <Stack gap={2}>
              <Badge variant="success" label="Healthy · 99.98%" />
              <Text type="supporting" color="secondary">
                Active service: {selected}
              </Text>
            </Stack>
          ),
        }}
      >
        <Stack gap={2}>
          <Text weight="semibold">{selected}</Text>
          <Text color="secondary">
            Resize or collapse side panes (`Mod+\`) on desktop; inspector morphs into an Astryx `Drawer` on mobile.
          </Text>
        </Stack>
      </WorkspaceLayout>
    </div>
  );
}
