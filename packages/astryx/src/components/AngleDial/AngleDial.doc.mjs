/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'AngleDial',
  displayName: 'Angle Dial',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['angle dial', 'rotary knob', 'degrees', 'gradient angle', 'rotation'],
  props: [
    {
      name: 'value',
      type: 'number',
      description: 'Controlled angle in degrees (`0..360`), following CSS gradient convention (`0°` up, `90°` right).',
      required: true,
    },
    {
      name: 'onChange',
      type: '(degrees: number) => void',
      description: 'Called with normalized integer degrees (`0..359`) on drag, key step, or direct entry.',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Visible and accessible label for the rotary slider.',
      default: "'Angle'",
    },
    {
      name: 'snapAngles',
      type: 'readonly number[]',
      description: 'Cardinal angles that magnetically snap during pointer drag unless Shift is held.',
    },
    {
      name: 'snapThreshold',
      type: 'number',
      description: 'Capture window in degrees around each `snapAngles` stop.',
      default: '4',
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      description: 'Rotary bezel diameter scale.',
      default: "'md'",
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables pointer, keyboard, and direct readout editing.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Tactile 3D ceramic rotary knob with 45° magnetic detents, Shift fine-grain bypass, keyboard slider semantics (`Arrow`, `PageUp`/`PageDown`, `Home`/`End`), and click-to-type tabular degree readout.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair with `GradientPicker` or directional lighting/transform inspectors where spatial orientation matters.',
      },
      {
        guidance: false,
        description: 'Use a rotary dial for linear quantities like volume or percentage — use `PrecisionSlider` instead.',
      },
    ],
  },
};
