import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/dna.ts'],
  format: ['esm'],
  outDir: 'dist',
  noExternal: ['@mehan/dna'],
  external: ['react', 'react-dom', 'lucide-react', /^@astryxdesign\//],
  dts: {
    resolve: ['@mehan/dna'],
  },
  clean: false,
});
