/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'GradientPicker',
  displayName: 'Gradient Picker',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['gradient picker', 'color stops', 'linear gradient', 'radial gradient', 'oklab'],
  props: [
    {
      name: 'stops',
      type: 'readonly GradientStop[]',
      description: 'Array of `{id, color, position}` stops along the 0–100% gradient rail.',
      required: true,
    },
    {
      name: 'onStopsChange',
      type: '(stops: GradientStop[]) => void',
      description: 'Called when stops are dragged, recolored, inserted on the rail, or deleted.',
      required: true,
    },
    {
      name: 'angle',
      type: 'number',
      description: 'Linear gradient angle in degrees (`0..360`).',
      default: '135',
    },
    {
      name: 'onAngleChange',
      type: '(angle: number) => void',
      description: 'Optional callback enabling the integrated rotary `AngleDial` for linear gradients.',
    },
    {
      name: 'kind',
      type: "'linear' | 'radial'",
      description: 'Gradient geometry mode.',
      default: "'linear'",
    },
    {
      name: 'onKindChange',
      type: "(kind: 'linear' | 'radial') => void",
      description: 'Optional callback enabling the `Linear` / `Radial` geometry switcher.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible group label for the gradient editor.',
      default: "'Gradient editor'",
    },
  ],
  usage: {
    description:
      'Multi-stop CSS gradient studio with OKLab midpoint stop insertion on rail click, keyboard-steerable spherical stop handles, `ColorWell` stop recoloring, and integrated `AngleDial`.',
    bestPractices: [
      {
        guidance: true,
        description: 'Pair with `formatGradientCss(stops, kind, angle)` to serialize stops cleanly into CSS `background-image` strings.',
      },
      {
        guidance: false,
        description: 'Allow deleting below 2 stops; `GradientPicker` automatically guards the 2-stop minimum.',
      },
    ],
  },
};
