'use client';

import {useState} from 'react';
import {Tour} from '@mehan/astryx';

export default function TourShowcase() {
  const [open, setOpen] = useState(true);
  return (
    <Tour
      isOpen={open}
      onOpenChange={setOpen}
      steps={[
        {
          id: 'st1',
          title: 'Pick an atmosphere',
          description: 'Start from Confectionery, Porcelain, or Stone in one click.',
        },
        {
          id: 'st2',
          title: 'Export anywhere',
          description: 'Download React TypeScript, Portable CSS, or W3C Figma tokens.',
        },
      ]}
    />
  );
}
