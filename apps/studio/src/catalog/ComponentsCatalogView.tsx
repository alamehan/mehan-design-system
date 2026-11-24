import React, {useMemo, useState} from 'react';
import {
  Badge,
  EmptyState,
  Heading,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Text,
  TextInput,
} from '@astryxdesign/core';
import {Search} from 'lucide-react';
import type {StudioCopy} from '../i18n';
import type {StudioLang} from '../studioState';
import {useCatalogGroupA} from './CatalogGroupA';
import {useCatalogGroupB} from './CatalogGroupB';
import {useCatalogGroupC} from './CatalogGroupC';
import {
  CATEGORY_LABELS_ID,
  OFFICIAL_ASTRYX_CATEGORIES,
  SpecimenCard,
  type OfficialAstryxCategory,
} from './SpecimenCard';

interface ComponentsCatalogViewProps {
  lang: StudioLang;
  copy: StudioCopy;
}

export function ComponentsCatalogView({lang, copy}: ComponentsCatalogViewProps) {
  const isId = lang === 'id';
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | OfficialAstryxCategory
  >('all');
  const [pkgFilter, setPkgFilter] = useState<'all' | 'core' | 'mehan'>('all');
  const [query, setQuery] = useState('');

  const groupA = useCatalogGroupA();
  const groupB = useCatalogGroupB();
  const groupC = useCatalogGroupC();

  const allSpecimens = useMemo(
    () => [...groupA, ...groupB, ...groupC],
    [groupA, groupB, groupC],
  );

  const countsByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of OFFICIAL_ASTRYX_CATEGORIES) {
      map[cat] = 0;
    }
    for (const item of allSpecimens) {
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [allSpecimens]);

  const qLower = query.trim().toLowerCase();

  const filteredSpecimens = useMemo(
    () =>
      allSpecimens.filter(item => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        if (pkgFilter !== 'all' && item.pkg !== pkgFilter) {
          return false;
        }
        if (qLower) {
          const hay = `${item.name} ${item.category} ${item.summaryEn} ${item.summaryId}`.toLowerCase();
          if (!hay.includes(qLower)) return false;
        }
        return true;
      }),
    [allSpecimens, selectedCategory, pkgFilter, qLower],
  );

  const visibleCategories = useMemo(
    () =>
      OFFICIAL_ASTRYX_CATEGORIES.filter(cat =>
        filteredSpecimens.some(item => item.category === cat),
      ),
    [filteredSpecimens],
  );

  return (
    <Stack gap={4}>
      <Stack
        direction="horizontal"
        justify="between"
        align="center"
        wrap="wrap"
        gap={3}
      >
        <Stack gap={1}>
          <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
            <Heading level={2}>{copy.components.title}</Heading>
            <Badge
              variant="info"
              label={`${allSpecimens.length} live specimens`}
            />
          </Stack>
          <Text color="secondary">{copy.components.subtitle}</Text>
        </Stack>
      </Stack>

      {/* Search & Package Filter Bar */}
      <Stack
        direction="horizontal"
        justify="between"
        align="center"
        wrap="wrap"
        gap={3}
      >
        <div style={{flex: '1 1 300px', maxWidth: 520}}>
          <TextInput
            label="Search components"
            isLabelHidden
            hasClear
            startIcon={<Search size={15} />}
            placeholder={copy.components.searchPlaceholder}
            value={query}
            onChange={setQuery}
          />
        </div>

        <SegmentedControl
          label="Filter by package"
          size="sm"
          value={pkgFilter}
          onChange={v => setPkgFilter(v as 'all' | 'core' | 'mehan')}
        >
          <SegmentedControlItem
            value="all"
            label={isId ? `Semua (${allSpecimens.length})` : `All (${allSpecimens.length})`}
          />
          <SegmentedControlItem
            value="core"
            label={`@astryxdesign/core (${allSpecimens.length - 4})`}
          />
          <SegmentedControlItem value="mehan" label="@mehan/astryx (4)" />
        </SegmentedControl>
      </Stack>

      {/* Sticky 12-Category Sidebar + Live Specimen Grid */}
      <div className="cat-layout">
        <nav
          className="cat-sidebar"
          aria-label="Official Astryx component categories"
        >
          <button
            type="button"
            className={`cat-nav-btn ${selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>{isId ? 'Semua Kategori' : 'All Categories'}</span>
            <span className="cat-nav-count">{allSpecimens.length}</span>
          </button>
          {OFFICIAL_ASTRYX_CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              className={`cat-nav-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="cat-nav-count">{countsByCategory[cat] ?? 0}</span>
            </button>
          ))}
        </nav>

        <Stack gap={6}>
          {visibleCategories.length === 0 ? (
            <EmptyState
              icon={<Search size={26} />}
              title={
                isId
                  ? 'Komponen tidak ditemukan'
                  : 'No matching components found'
              }
              description={
                isId
                  ? 'Coba kata kunci lain atau kembalikan filter kategori ke Semua.'
                  : 'Try another search term or reset the category filter to All.'
              }
            />
          ) : (
            visibleCategories.map(cat => {
              const items = filteredSpecimens.filter(s => s.category === cat);
              return (
                <section key={cat} className="cat-category-section">
                  <Stack
                    direction="horizontal"
                    justify="between"
                    align="center"
                    gap={2}
                  >
                    <Heading level={3}>
                      {isId ? CATEGORY_LABELS_ID[cat] : cat}
                    </Heading>
                    <Badge variant="neutral" label={`${items.length}`} />
                  </Stack>
                  <div className="cat-grid">
                    {items.map(item => (
                      <SpecimenCard key={item.id} item={item} isId={isId} />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </Stack>
      </div>
    </Stack>
  );
}
