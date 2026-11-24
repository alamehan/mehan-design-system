'use client';

import {useState} from 'react';
import {TimelineScrubber} from '@mehan/astryx';

export default function TimelineScrubberShowcase() {
  const [time, setTime] = useState(4.2);
  const [playing, setPlaying] = useState(false);
  return (
    <TimelineScrubber
      currentTime={time}
      duration={12}
      onSeek={setTime}
      isPlaying={playing}
      onTogglePlay={() => setPlaying(prev => !prev)}
      markers={[
        {id: 'm1', time: 3, label: 'Intro beat'},
        {id: 'm2', time: 8.5, label: 'Hero reveal'},
      ]}
    />
  );
}
