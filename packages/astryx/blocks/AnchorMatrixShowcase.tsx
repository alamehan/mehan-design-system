'use client';

import {useState} from 'react';
import {AnchorMatrix, type AnchorPosition} from '@mehan/astryx';

export default function AnchorMatrixShowcase() {
  const [anchor, setAnchor] = useState<AnchorPosition>('bottom-end');
  return <AnchorMatrix label="Badge pin" value={anchor} onChange={setAnchor} />;
}
