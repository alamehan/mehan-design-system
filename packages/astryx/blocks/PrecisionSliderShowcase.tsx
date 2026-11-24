'use client';

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/Layout';
import {PrecisionSlider} from '@mehan/astryx';

export default function PrecisionSliderShowcase() {
  const [padding, setPadding] = useState(24);
  const [tilt, setTilt] = useState(0);
  return (
    <VStack gap={3} width={320} maxWidth="100%">
      <PrecisionSlider
        label="Padding"
        value={padding}
        min={0}
        max={96}
        stops={[16, 24, 48, 64]}
        unit="px"
        onChange={setPadding}
      />
      <PrecisionSlider
        label="Tilt"
        value={tilt}
        min={-45}
        max={45}
        stops={[-15, 0, 15]}
        isCentered
        unit="°"
        onChange={setTilt}
      />
    </VStack>
  );
}
