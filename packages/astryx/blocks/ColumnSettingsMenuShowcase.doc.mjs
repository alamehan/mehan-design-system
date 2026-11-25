/** @type {import('@astryxdesign/cli/authoring').TemplateDoc} */
export default {
  type: 'block',
  name: 'Data table with column visibility and order menu',
  displayName: 'Data table with column visibility and order menu',
  description:
    'Astryx Table paired with ColumnSettingsMenu and headless useTableColumnSettingsState.',
  exampleFor: 'ColumnSettingsMenu',
  isReady: true,
  isShowcase: true,
  aspectRatio: 16 / 9,
  componentsUsed: ['ColumnSettingsMenu', 'Table', 'HStack', 'Stack', 'Text'],
};
