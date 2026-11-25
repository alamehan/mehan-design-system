/** @type {import('@astryxdesign/cli/authoring').TemplateDoc} */
export default {
  type: 'block',
  name: 'Multi-pane service workspace',
  displayName: 'Multi-pane service workspace',
  description:
    'Adaptive three-pane workspace built on Astryx Layout and Drawer with collapsible navigation and contextual inspector.',
  exampleFor: 'WorkspaceLayout',
  isReady: true,
  isShowcase: true,
  aspectRatio: 16 / 9,
  componentsUsed: ['WorkspaceLayout', 'Button', 'Badge', 'Stack', 'HStack', 'Text'],
};
