/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'CanvasStage',
  displayName: 'Canvas Stage',
  import: '@mehan/astryx',
  category: 'Layout',
  keywords: [
    'canvas stage',
    'viewport',
    'studio stage',
    'hud overlay',
    'checkerboard',
    'dot grid',
    'zen mode',
  ],
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      description:
        'Primary interactive viewport content (`<svg>`, `<canvas>`, WebGL, product preview, or diagram).',
      required: true,
    },
    {
      name: 'backdrop',
      type: "'dots' | 'grid' | 'checkerboard' | 'plain'",
      description: 'Tactile recessed backdrop pattern behind the stage content.',
      default: "'dots'",
    },
    {
      name: 'topStart',
      type: 'React.ReactNode',
      description: 'Non-blocking HUD slot anchored to the top-start corner.',
    },
    {
      name: 'topEnd',
      type: 'React.ReactNode',
      description: 'Non-blocking HUD slot anchored to the top-end corner.',
    },
    {
      name: 'bottomStart',
      type: 'React.ReactNode',
      description: 'Non-blocking HUD slot anchored to the bottom-start corner.',
    },
    {
      name: 'bottomEnd',
      type: 'React.ReactNode',
      description:
        'Non-blocking HUD slot anchored to the bottom-end corner (ideal for `CanvasZoomBar`).',
    },
    {
      name: 'transport',
      type: 'React.ReactNode',
      description:
        'Optional docked bottom transport rail (ideal for `TimelineScrubber`).',
    },
    {
      name: 'isZen',
      type: 'boolean',
      description:
        'Hides corner HUD slots and bottom transport rail for distraction-free focus.',
      default: 'false',
    },
    {
      name: 'minHeight',
      type: 'number | string',
      description: 'Minimum height of the interactive viewport in pixels or CSS units.',
      default: '320',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible region label for assistive technology.',
      default: "'Interactive canvas stage'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the root stage element.',
    },
  ],
  usage: {
    description:
      'Level-2 recessed spatial viewport (`dots`, `grid`, `checkerboard`, or `plain`) with non-blocking corner HUD slots and an optional docked bottom transport rail.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Place `<CanvasZoomBar />` in `bottomEnd` and `<TimelineScrubber />` in `transport` so HUD controls never block pointer panning on the canvas.',
      },
      {
        guidance: false,
        description:
          'Cover the entire stage with full-bleed opaque overlay wrappers that intercept pointer drag events.',
      },
    ],
  },
};
