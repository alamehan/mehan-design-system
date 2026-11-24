'use client';

import {MiddleTruncate} from '@mehan/astryx';

export default function MiddleTruncateShowcase() {
  return (
    <div style={{maxWidth: 260}}>
      <MiddleTruncate
        text="packages/astryx/src/themes/mehanConfectioneryTheme.ts"
        endChars={14}
        monospace
        copyable
      />
    </div>
  );
}
