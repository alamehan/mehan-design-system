/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'TimelineScrubber',
  displayName: 'Timeline Scrubber',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['timeline scrubber', 'playhead', 'keyframe', 'video scrubber', 'timecode'],
  props: [
    {
      name: 'currentTime',
      type: 'number',
      description: 'Current playhead position in seconds.',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      description: 'Total media or animation length in seconds.',
      required: true,
    },
    {
      name: 'onSeek',
      type: '(seconds: number) => void',
      description: 'Called when dragging the playhead, stepping frames, or clicking a marker.',
      required: true,
    },
    {
      name: 'isPlaying',
      type: 'boolean',
      description: 'Whether playback is currently active.',
      default: 'false',
    },
    {
      name: 'onTogglePlay',
      type: '() => void',
      description: 'Optional callback rendering the integrated Play/Pause transport button.',
    },
    {
      name: 'markers',
      type: 'readonly TimelineMarker[]',
      description: 'Optional `{id, time, label}` keyframe or chapter pins along the scrubber track.',
    },
    {
      name: 'frameRate',
      type: 'number',
      description: 'Frames per second used for tabular `MM:SS.ff` timecode and `Shift+Arrow` single-frame stepping.',
      default: '30',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label for the playhead slider.',
      default: "'Timeline playhead'",
    },
  ],
  usage: {
    description:
      'Studio media & animation playhead scrubber with tabular `MM:SS.ff` timecode, clickable keyframe markers, `Arrow` 1-second seek, and `Shift+Arrow` frame-accurate stepping.',
    bestPractices: [
      {
        guidance: true,
        description: 'Expose important beat or scene boundaries in `markers` for one-click seeking.',
      },
      {
        guidance: false,
        description: 'Render rapidly ticking timecodes without `tabular-nums`; `TimelineScrubber` locks digit widths automatically.',
      },
    ],
  },
};
