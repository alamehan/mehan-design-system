'use client';

import {useState} from 'react';
import {ImageWell} from '@mehan/astryx';

export default function ImageWellShowcase() {
  const [img, setImg] = useState<string | null>(null);
  return (
    <div style={{maxWidth: 280}}>
      <ImageWell
        label="Cover artwork"
        value={img}
        onSelectFile={(_file, url) => setImg(url)}
        onClear={() => setImg(null)}
      />
    </div>
  );
}
