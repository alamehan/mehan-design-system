'use client';

import {useState} from 'react';
import {Rating} from '@mehan/astryx';

export default function RatingShowcase() {
  const [score, setScore] = useState(4.5);
  return (
    <Rating
      label="Product craft"
      value={score}
      onChange={setScore}
      allowHalf
      hasValueReadout
    />
  );
}
