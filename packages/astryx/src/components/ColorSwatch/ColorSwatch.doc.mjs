/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColorSwatch',
  displayName: 'Color Swatch',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['swatch', 'color dot', 'palette chip', 'color button', 'theme picker'],
  props: [
    {
      name: 'color',
      type: 'string',
      description: 'Valid CSS color value painted on the swatch surface, such as "#d42a5f".',
      required: true,
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible label announced by screen readers; defaults to "Select color <color>".',
    },
    {
      name: 'isSelected',
      type: 'boolean',
      description: 'Renders the accent selection halo around the swatch.',
      default: 'false',
    },
    {
      name: 'isRainbow',
      type: 'boolean',
      description: 'Renders a rainbow conic gradient for custom-color triggers.',
      default: 'false',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      description: 'Controls swatch diameter (24px, 32px, or 40px).',
      default: "'md'",
    },
    {
      name: 'shape',
      type: "'circle' | 'rounded'",
      description: 'Circular boiled-sweet pill or rounded-square tile.',
      default: "'circle'",
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables pointer and keyboard activation.',
      default: 'false',
    },
    {
      name: 'onSelect',
      type: '(color: string) => void',
      description: 'Called with `color` when the user activates the swatch.',
    },
  ],
  usage: {
    description:
      'A 3D boiled-sweet color swatch button with a rotated specular highlight, inner dark-mode containment ring, and distinct neutral keyboard focus vs. accent selection rings.',
    bestPractices: [
      {
        guidance: true,
        description: 'Provide human-meaningful color names via `label` (e.g. "Strawberry") when known.',
      },
      {
        guidance: false,
        description: 'Use ColorSwatch as a non-interactive status dot; use Core StatusDot for passive status.',
      },
    ],
  },
};
