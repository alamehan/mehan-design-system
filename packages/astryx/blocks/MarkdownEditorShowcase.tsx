'use client';

import {useState} from 'react';
import {MarkdownEditor} from '@mehan/astryx';

export default function MarkdownEditorShowcase() {
  const [md, setMd] = useState('## Release summary\n- Zero external font requests\n- **WCAG 2.2 AA** verified');
  return <MarkdownEditor value={md} onChange={setMd} minRows={4} />;
}
