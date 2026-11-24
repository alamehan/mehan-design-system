/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'Tour',
  displayName: 'Guided Tour',
  import: '@mehan/astryx',
  category: 'Overlay',
  keywords: ['tour', 'onboarding', 'coachmark', 'walkthrough', 'spotlight'],
  props: [
    {
      name: 'steps',
      type: 'readonly TourStepItem[]',
      description: 'Ordered `{id, title, description, targetSelector}` walkthrough steps.',
      required: true,
    },
    {
      name: 'isOpen',
      type: 'boolean',
      description: 'Controls visibility of the tour coachmark dialog.',
      required: true,
    },
    {
      name: 'onOpenChange',
      type: '(open: boolean) => void',
      description: 'Called when the user skips, closes with `Escape`, or finishes the tour.',
      required: true,
    },
    {
      name: 'currentStep',
      type: 'number',
      description: 'Optional controlled 0-based active step index.',
    },
    {
      name: 'onStepChange',
      type: '(stepIndex: number) => void',
      description: 'Called when stepping forward or backward.',
    },
    {
      name: 'onFinish',
      type: '() => void',
      description: 'Optional callback fired when clicking `"Finish"` on the final step.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible dialog title prefix.',
      default: "'Product tour'",
    },
  ],
  usage: {
    description:
      'Non-coercive guided walkthrough coachmark with step counter, `Escape` dismissal, explicit `"Skip tour"` on step 1, `Back` / `Next` / `Finish` controls, and optional `targetSelector` spotlight ring.',
    bestPractices: [
      {
        guidance: true,
        description: 'Keep guided tours to 3–5 concise steps and always expose `"Skip tour"` on the very first step.',
      },
      {
        guidance: false,
        description: 'Trap users in mandatory multi-step tours before they can interact with the application.',
      },
    ],
  },
};
