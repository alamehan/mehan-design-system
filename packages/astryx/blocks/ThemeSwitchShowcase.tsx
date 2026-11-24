'use client';

import {useState} from 'react';
import {ThemeSwitch} from '@mehan/astryx';

export default function ThemeSwitchShowcase() {
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');
  return <ThemeSwitch value={mode} onChange={setMode} />;
}
