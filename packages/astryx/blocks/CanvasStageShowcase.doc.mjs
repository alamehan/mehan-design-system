/** @type {import('@astryxdesign/cli/authoring').TemplateDoc} */
export default {
  type: 'block',
  name: 'Interactive studio stage with HUD and transport',
  displayName: 'Interactive studio stage with HUD and transport',
  description:
    'Recessed dot-grid canvas stage pairing non-blocking corner zoom HUD controls with a bottom timeline scrubber.',
  exampleFor: 'CanvasStage',
  isReady: true,
  isShowcase: true,
  aspectRatio: 16 / 9,
  componentsUsed: ['CanvasStage', 'CanvasZoomBar', 'TimelineScrubber', 'Badge'],
};
