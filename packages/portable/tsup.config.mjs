import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  noExternal: ['@mehan/dna'],
  dts: {
    resolve: ['@mehan/dna'],
  },
  clean: false,
});
