'use client';

import {useState} from 'react';
import {SegmentedControl, SegmentedControlItem, Stack, Switch} from '@astryxdesign/core';
import {PropertyRow} from '@mehan/astryx';

export default function PropertyRowShowcase() {
  const [blend, setBlend] = useState('normal');
  const [snapGrid, setSnapGrid] = useState(true);

  return (
    <Stack gap={2} width={310} maxWidth="100%">
      <PropertyRow
        label="Blend mode"
        hint="Controls how layer pixels composite over the backdrop."
        isModified={blend !== 'normal'}
        onReset={() => setBlend('normal')}
      >
        <SegmentedControl
          label="Blend mode"
          size="sm"
          value={blend}
          onChange={setBlend}
        >
          <SegmentedControlItem value="normal" label="Normal" />
          <SegmentedControlItem value="multiply" label="Multiply" />
        </SegmentedControl>
      </PropertyRow>

      <PropertyRow
        label="Snap to grid"
        isModified={!snapGrid}
        onReset={() => setSnapGrid(true)}
      >
        <Switch label="Enable grid snap" isLabelHidden value={snapGrid} onChange={setSnapGrid} />
      </PropertyRow>
    </Stack>
  );
}
