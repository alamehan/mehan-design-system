'use client';

import {useState} from 'react';
import {NotificationCenter, type NotificationEntry} from '@mehan/astryx';

export default function NotificationCenterShowcase() {
  const [items, setItems] = useState<NotificationEntry[]>([
    {
      id: 'n1',
      title: 'Theme tokens exported',
      body: 'mehan-tokens.w3c.json is ready for Figma.',
      timestamp: '2m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Contrast audit passed',
      body: 'All 30 palette pairs cleared WCAG AA.',
      timestamp: '1h ago',
      unread: false,
    },
  ]);

  return (
    <NotificationCenter
      items={items}
      onMarkRead={id =>
        setItems(prev => prev.map(i => (i.id === id ? {...i, unread: false} : i)))
      }
      onMarkAllRead={() =>
        setItems(prev => prev.map(i => ({...i, unread: false})))
      }
    />
  );
}
