/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'PrecisionSlider',
  displayName: 'Precision Slider',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['precision slider', 'scrub', 'inspector slider', 'numeric scrub', 'fine drag'],
  props: [
    {
      name: 'label',
      type: 'string',
      description: 'Visible label rendered in the left column and linked to the slider.',
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      description: 'Controlled numeric value.',
      required: true,
    },
    {
      name: 'min',
      type: 'number',
      description: 'Minimum numeric bound.',
      required: true,
    },
    {
      name: 'max',
      type: 'number',
      description: 'Maximum numeric bound.',
      required: true,
    },
    {
      name: 'step',
      type: 'number',
      description: 'Step increment.',
      default: '1',
    },
    {
      name: 'unit',
      type: 'string',
      description: 'Optional unit suffix displayed in the tabular readout (e.g. "px", "%", "°").',
      default: "''",
    },
    {
      name: 'stops',
      type: 'readonly number[]',
      description: 'Optional magnetic snap points along the track (hold Alt while dragging to bypass).',
    },
    {
      name: 'isCentered',
      type: 'boolean',
      description: 'Fills outward from 0 for bipolar ranges such as -45°..+45°.',
      default: 'false',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables dragging, keyboard stepping, and direct numeric entry.',
      default: 'false',
    },
    {
      name: 'onChange',
      type: '(nextValue: number) => void',
      description: 'Called when the user drags, steps with arrow keys, or commits a typed number.',
      required: true,
    },
  ],
  usage: {
    description:
      'Compact 3-column inspector slider with spherical 3D dome knob, Shift 0.25x fine-speed dragging, magnetic stop snapping, bipolar center origin, and click-to-type tabular Geist Mono value editing.',
    bestPractices: [
      {
        guidance: true,
        description: 'Supply canonical detents in `stops` (e.g. [0, 16, 32, 64]) for creative tools and inspectors.',
      },
      {
        guidance: false,
        description: 'Use PrecisionSlider for two-thumb min/max range filtering; use Core Slider for multi-thumb ranges.',
      },
    ],
  },
};
