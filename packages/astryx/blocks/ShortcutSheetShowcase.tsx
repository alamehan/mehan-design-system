'use client';

import {useState} from 'react';
import {Button} from '@astryxdesign/core';
import {ShortcutSheet} from '@mehan/astryx';

export default function ShortcutSheetShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        label="Keyboard shortcuts (?)"
        onClick={() => setOpen(true)}
      />
      <ShortcutSheet
        isOpen={open}
        onOpenChange={setOpen}
        shortcuts={[
          {group: 'Workspace', keys: 'mod+\\', label: 'Toggle side panel'},
          {group: 'Actions', keys: 'mod+enter', label: 'Run primary action'},
          {group: 'History', keys: 'mod+z', label: 'Undo last change'},
        ]}
      />
    </div>
  );
}
