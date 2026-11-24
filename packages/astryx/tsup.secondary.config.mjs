import {defineConfig} from 'tsup';

export default defineConfig({
  entry: [
    'blocks/ColorSwatchShowcase.tsx',
    'blocks/ColorPickerShowcase.tsx',
    'blocks/PrecisionSliderShowcase.tsx',
    'blocks/MetricCardShowcase.tsx',
  ],
  format: ['esm'],
  outDir: 'dist/blocks',
  external: [
    'react',
    'react-dom',
    'lucide-react',
    /^@astryxdesign\//,
    /^@mehan\/astryx/,
  ],
  dts: true,
  clean: false,
});
