'use client';

import {InlineConfirm} from '@mehan/astryx';

export default function InlineConfirmShowcase() {
  return (
    <InlineConfirm
      triggerLabel="Remove webhook"
      confirmLabel="Remove"
      prompt="Remove endpoint?"
      onConfirm={() => {}}
    />
  );
}
