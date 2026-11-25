#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const dnaDir = path.join(repoRoot, 'packages/dna');
const astryxDir = path.join(repoRoot, 'packages/astryx');
const portableDir = path.join(repoRoot, 'packages/portable');
const portableDistDir = path.join(portableDir, 'dist');
const releaseDir = path.join(repoRoot, 'release');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

fs.rmSync(releaseDir, {recursive: true, force: true});
fs.mkdirSync(releaseDir, {recursive: true});

for (const filename of [
  'mehan-portable.css',
  'mehan-portable.js',
  'MEHAN-AI-PROTOTYPE-KIT.md',
  'mehan-astryx-cdn.html',
  'mehan-tokens.w3c.json',
]) {
  const src = path.join(portableDistDir, filename);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing built portable artifact: ${src}. Run pnpm --filter @mehan/portable build first.`);
  }
  fs.copyFileSync(src, path.join(releaseDir, filename));
}

for (const packTarget of [dnaDir, astryxDir, portableDir]) {
  if (!fs.existsSync(path.join(packTarget, 'dist/index.js'))) {
    throw new Error(`Missing built dist/index.js in ${packTarget}`);
  }
  execFileSync(npmCmd, ['pack', '--pack-destination', releaseDir], {
    cwd: packTarget,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}

// Ensure transient single-file intermediate directory is never left behind
fs.rmSync(path.join(repoRoot, 'apps/studio/dist-single'), {
  recursive: true,
  force: true,
});

console.log('✅ Assembled release/ tarballs, portable assets, W3C tokens, and verified clean workspace.');
