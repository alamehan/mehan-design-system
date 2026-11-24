import React from 'react';
import {Badge, IconButton, Stack, Text, useToast} from '@astryxdesign/core';
import {Copy} from 'lucide-react';
import {copyText} from '../studioState';

export type SpecimenPackage = 'core' | 'mehan';

export interface SpecimenDefinition {
  id: string;
  name: string;
  category: OfficialAstryxCategory;
  pkg: SpecimenPackage;
  summaryEn: string;
  summaryId: string;
  code: string;
  render: () => React.ReactNode;
}

export const OFFICIAL_ASTRYX_CATEGORIES = [
  'Action',
  'Chat',
  'Container',
  'Content',
  'Data Visualization',
  'Feedback & Status',
  'Form Controls',
  'Layout',
  'Navigation',
  'Overlay',
  'Table & List',
  'Utility',
] as const;

export type OfficialAstryxCategory = (typeof OFFICIAL_ASTRYX_CATEGORIES)[number];

export const CATEGORY_LABELS_ID: Record<OfficialAstryxCategory, string> = {
  Action: 'Action (Tombol & Aksi)',
  Chat: 'Chat (Percakapan AI)',
  Container: 'Container (Wadah & Kartu)',
  Content: 'Content (Teks & Media)',
  'Data Visualization': 'Data Visualization (Data & Metrik)',
  'Feedback & Status': 'Feedback & Status (Indikator)',
  'Form Controls': 'Form Controls (Input & Presisi)',
  Layout: 'Layout (Tata Letak)',
  Navigation: 'Navigation (Navigasi)',
  Overlay: 'Overlay (Dialog & Lapis)',
  'Table & List': 'Table & List (Tabel & Daftar)',
  Utility: 'Utility (Utilitas Tema)',
};

export function SpecimenCard({
  item,
  isId,
}: {
  item: SpecimenDefinition;
  isId: boolean;
}) {
  const showToast = useToast();

  const handleCopy = async () => {
    await copyText(item.code);
    showToast({
      type: 'info',
      body: isId
        ? `Kode JSX ${item.name} disalin.`
        : `Copied ${item.name} JSX snippet.`,
    });
  };

  return (
    <article className="cat-specimen-card" data-component={item.id}>
      <div className="cat-specimen-header">
        <Stack direction="horizontal" gap={1.5} align="center" wrap="wrap">
          <span className="cat-specimen-title">{item.name}</span>
          <Badge
            variant={item.pkg === 'mehan' ? 'pink' : 'neutral'}
            label={item.pkg === 'mehan' ? '@mehan/astryx' : '@astryxdesign/core'}
          />
        </Stack>
        <IconButton
          variant="ghost"
          size="sm"
          label={`Copy ${item.name} JSX`}
          icon={<Copy size={13} />}
          onClick={() => void handleCopy()}
        />
      </div>
      <Text type="supporting" color="secondary">
        {isId ? item.summaryId : item.summaryEn}
      </Text>
      <div className="cat-specimen-stage">{item.render()}</div>
    </article>
  );
}
