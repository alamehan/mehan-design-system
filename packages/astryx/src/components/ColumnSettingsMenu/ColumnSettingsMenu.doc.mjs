/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ColumnSettingsMenu',
  displayName: 'Column Settings Menu',
  import: '@mehan/astryx',
  category: 'Table & List',
  keywords: [
    'column settings',
    'table columns',
    'column visibility',
    'column order',
    'useTableColumnSettingsState',
  ],
  props: [
    {
      name: 'columns',
      type: 'ReadonlyArray<ColumnSettingsOption>',
      description:
        'Column definitions (`{ key, label, isAlwaysVisible?, group? }`) matching Astryx `Table` column keys.',
      required: true,
    },
    {
      name: 'state',
      type: 'UseTableColumnSettingsStateReturn',
      description:
        'Direct binding to Meta Astryx `useTableColumnSettingsState(...)` return object.',
    },
    {
      name: 'activeColumnKeys',
      type: 'ReadonlyArray<string>',
      description: 'Standalone controlled visible column keys when `state` is omitted.',
    },
    {
      name: 'onChangeActiveColumnKeys',
      type: '(keys: ReadonlyArray<string>) => void',
      description: 'Called when visibility or column order changes in standalone mode.',
    },
    {
      name: 'defaultColumnKeys',
      type: 'ReadonlyArray<string>',
      description: 'Default column key sequence restored by `Reset` in standalone mode.',
    },
    {
      name: 'triggerLabel',
      type: 'string',
      description: 'Visible label prefix on the trigger button.',
      default: "'Columns'",
    },
    {
      name: 'allowReorder',
      type: 'boolean',
      description: 'Render Up / Down ordering controls beside active columns.',
      default: 'true',
    },
    {
      name: 'size',
      type: "'sm' | 'md'",
      description: 'Size forwarded to the Astryx `Button` trigger.',
      default: "'sm'",
    },
    {
      name: 'className',
      type: 'string',
      description: 'Optional CSS class name appended to the popover body.',
    },
  ],
  usage: {
    description:
      'Ready-to-drop `Popover` companion for Meta Astryx `useTableColumnSettingsState` providing column visibility checkboxes, Up/Down ordering, Show All, and Reset while protecting `isAlwaysVisible` and the last visible column.',
    bestPractices: [
      {
        guidance: true,
        description:
          'Mark primary identifying columns (such as `Name` or `Service`) with `isAlwaysVisible: true` so rows always keep context.',
      },
      {
        guidance: false,
        description:
          'Allow users to hide every column in a table and leave an empty header shell.',
      },
    ],
  },
};
