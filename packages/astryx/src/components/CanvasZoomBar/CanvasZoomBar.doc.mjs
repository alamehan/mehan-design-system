/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'CanvasZoomBar',
  displayName: 'Canvas Zoom Bar',
  import: '@mehan/astryx',
  category: 'Action',
  keywords: ['zoom bar', 'canvas hud', 'fit to screen', 'magnification', 'viewport zoom'],
  props: [
    {
      name: 'zoom',
      type: 'number',
      description: 'Current magnification percentage (`100` represents `1:1`).',
      required: true,
    },
    {
      name: 'onZoomChange',
      type: '(zoom: number) => void',
      description: 'Called when stepping `-` / `+` or choosing a preset percentage.',
      required: true,
    },
    {
      name: 'min',
      type: 'number',
      description: 'Minimum zoom percentage.',
      default: '25',
    },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum zoom percentage.',
      default: '400',
    },
    {
      name: 'step',
      type: 'number',
      description: 'Step increment for `-` and `+` buttons.',
      default: '25',
    },
    {
      name: 'onFitToScreen',
      type: '() => void',
      description: 'Optional callback enabling the trailing Fit-to-Screen icon button.',
    },
    {
      name: 'presets',
      type: 'readonly number[]',
      description: 'Preset zoom levels opened from the percentage readout pill.',
    },
    {
      name: 'menuPlacement',
      type: "'top' | 'bottom'",
      description: 'Direction in which the zoom preset menu opens (`"top"` for bottom-docked canvas HUDs).',
      default: "'bottom'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible `role="toolbar"` label.',
      default: "'Canvas zoom'",
    },
  ],
  usage: {
    description:
      'Floating tactile HUD zoom toolbar with `-` / `+` steppers, tabular percentage preset menu (`50%`, `100% Reset`, `150%`, `200%`), and optional Fit-to-Screen button for infinite canvases, diagramming tools, and image stages.',
    bestPractices: [
      {
        guidance: true,
        description: 'Always include `100` in `presets` so users have a single-click way back to `1:1` scale.',
      },
      {
        guidance: false,
        description: 'Trap wheel scrolling on normal document pages without an explicit canvas boundary.',
      },
    ],
  },
};
