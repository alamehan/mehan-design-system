'use client';

import {useState} from 'react';
import {DigitEntry} from '@mehan/astryx';

export default function DigitEntryShowcase() {
  const [code, setCode] = useState('482');
  return <DigitEntry value={code} onChange={setCode} hasSeparatorAfter={3} />;
}
