'use client';

import {CopyButton} from '@mehan/astryx';

export default function CopyButtonShowcase() {
  return (
    <CopyButton
      value="pnpm add @mehan/astryx"
      label="Copy command"
      copiedLabel="Copied"
    />
  );
}
