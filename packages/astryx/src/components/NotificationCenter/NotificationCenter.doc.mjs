/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'NotificationCenter',
  displayName: 'Notification Center',
  import: '@mehan/astryx',
  category: 'Overlay',
  keywords: ['notifications', 'inbox popover', 'bell menu', 'unread badge', 'activity inbox'],
  props: [
    {
      name: 'items',
      type: 'readonly NotificationEntry[]',
      description: 'Ordered `{id, title, body, timestamp, unread, category}` inbox items.',
      required: true,
    },
    {
      name: 'onMarkRead',
      type: '(id: string) => void',
      description: 'Called when an unread notification item is clicked.',
    },
    {
      name: 'onMarkAllRead',
      type: '() => void',
      description: 'Optional callback enabling the `"Mark all read"` header button.',
    },
    {
      name: 'onClearAll',
      type: '() => void',
      description: 'Optional callback enabling the `"Clear all"` footer action.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Visible trigger text and accessible dialog label.',
      default: "'Notifications'",
    },
    {
      name: 'emptyMessage',
      type: 'string',
      description: 'Calm message shown when the active filter has zero items.',
      default: "'You are all caught up.'",
    },
  ],
  usage: {
    description:
      'Persistent inbox bell trigger with tabular unread badge opening a focus-restoring popover (`All` / `Unread` filter tabs, `Mark all read`, and calm empty state) so transient toasts never become the only record of events.',
    bestPractices: [
      {
        guidance: true,
        description: 'Hide the numeric badge completely when `unreadCount === 0` so calm topbars avoid false urgency.',
      },
      {
        guidance: false,
        description: 'Stack more than 2 floating toasts simultaneously; route background updates into `NotificationCenter`.',
      },
    ],
  },
};
