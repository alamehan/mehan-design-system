import path from 'node:path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@mehan/astryx/dna': path.resolve(
        import.meta.dirname,
        'packages/astryx/src/dna.ts',
      ),
      '@mehan/astryx': path.resolve(
        import.meta.dirname,
        'packages/astryx/src/index.ts',
      ),
      '@mehan/dna': path.resolve(
        import.meta.dirname,
        'packages/dna/src/index.ts',
      ),
      '@mehan/portable': path.resolve(
        import.meta.dirname,
        'packages/portable/src/index.ts',
      ),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
