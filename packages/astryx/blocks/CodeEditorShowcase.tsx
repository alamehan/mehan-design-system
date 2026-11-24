'use client';

import {useState} from 'react';
import {CodeEditor} from '@mehan/astryx';

export default function CodeEditorShowcase() {
  const [code, setCode] = useState(
    `const theme = createMehanTheme({\n  name: 'studio',\n  atmosphere: 'confectionery',\n});`,
  );
  return <CodeEditor language="ts" value={code} onChange={setCode} minRows={4} />;
}
