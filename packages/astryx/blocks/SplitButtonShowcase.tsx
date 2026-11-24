'use client';

import {SplitButton} from '@mehan/astryx';

export default function SplitButtonShowcase() {
  return (
    <SplitButton
      label="Export PDF"
      onAction={() => {}}
      items={[
        {id: 'md', label: 'Export Markdown (.md)', description: 'Clean portable text'},
        {id: 'json', label: 'Export W3C tokens (.json)', description: 'Figma compatible'},
      ]}
    />
  );
}
