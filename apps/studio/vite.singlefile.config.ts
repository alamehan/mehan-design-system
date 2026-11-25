import path from 'node:path';
import fs from 'node:fs';
import {defineConfig, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import {viteSingleFile} from 'vite-plugin-singlefile';

function copyRootStudioHtml(): Plugin {
  return {
    name: 'copy-root-studio-html',
    closeBundle() {
      const distSingleDir = path.resolve(import.meta.dirname, 'dist-single');
      const built = path.join(distSingleDir, 'index.html');
      const rootDest = path.resolve(import.meta.dirname, '../../STUDIO.html');
      if (fs.existsSync(built)) {
        fs.copyFileSync(built, rootDest);
        fs.rmSync(distSingleDir, {recursive: true, force: true});
        console.log(`✅ Emitted root offline launcher: ${rootDest}`);
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), copyRootStudioHtml()],
  css: {
    transformer: 'postcss',
  },
  build: {
    target: 'es2022',
    cssMinify: 'esbuild',
    outDir: 'dist-single',
    assetsInlineLimit: 100_000_000,
    emptyOutDir: true,
  },
});
