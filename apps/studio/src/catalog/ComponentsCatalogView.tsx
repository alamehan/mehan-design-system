import React, {useMemo, useState} from 'react';
import {
  Badge,
  Button,
  EmptyState,
  HStack,
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
  CATEGORY_DESC,
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
  // Focused by default: start on 'Action' (10 specimens) instead of dumping 107 cards at once!
  const [selectedCategory, setSelectedCategory] = useState<
    OfficialAstryxCategory | 'all'
  >('Action');
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
  const isGlobalSearchActive = Boolean(qLower) || pkgFilter === 'mehan';

  const filteredSpecimens = useMemo(
    () =>
      allSpecimens.filter(item => {
        if (
          !isGlobalSearchActive &&
          selectedCategory !== 'all' &&
          item.category !== selectedCategory
        ) {
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
    [allSpecimens, isGlobalSearchActive, selectedCategory, pkgFilter, qLower],
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
      <Stack gap={1}>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Heading level={2}>{copy.components.title}</Heading>
          <Badge
            variant="info"
            label={`${allSpecimens.length} live specimens`}
          />
        </HStack>
        <Text color="secondary">{copy.components.subtitle}</Text>
      </Stack>

      {/* Search & Package Filter Bar */}
      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={3}>
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
            label={`Core (${allSpecimens.length - 4})`}
          />
          <SegmentedControlItem value="mehan" label="Mehan extensions (4)" />
        </SegmentedControl>
      </HStack>

      {/* Sticky 12-Category Sidebar + Adaptive Specimen Grid */}
      <div className="cat-layout">
        <nav
          className="cat-sidebar"
          aria-label="Official Astryx component categories"
        >
          {OFFICIAL_ASTRYX_CATEGORIES.map(cat => {
            const isActive =
              !isGlobalSearchActive && selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`cat-nav-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (pkgFilter === 'mehan') setPkgFilter('all');
                  if (query) setQuery('');
                }}
              >
                <span>{cat}</span>
                <span className="cat-nav-count">{countsByCategory[cat] ?? 0}</span>
              </button>
            );
          })}

          <div className="cat-sidebar-divider" role="separator" />

          <button
            type="button"
            className={`cat-nav-btn ${!isGlobalSearchActive && selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              if (query) setQuery('');
            }}
          >
            <span>{isId ? 'Semua kategori' : 'All categories'}</span>
            <span className="cat-nav-count">{allSpecimens.length}</span>
          </button>
        </nav>

        <Stack gap={6}>
          {visibleCategories.length === 0 ? (
            <EmptyState
              icon={<Search size={24} />}
              title={
                isId
                  ? 'Komponen tidak ditemukan'
                  : 'No matching components'
              }
              description={
                isId
                  ? 'Gunakan kata kunci lain atau bersihkan filter pencarian.'
                  : 'Try another search term or clear the active filter.'
              }
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  label={isId ? 'Reset pencarian' : 'Clear search'}
                  onClick={() => {
                    setQuery('');
                    setPkgFilter('all');
                  }}
                />
              }
            />
          ) : (
            visibleCategories.map(cat => {
              const items = filteredSpecimens.filter(s => s.category === cat);
              const desc = CATEGORY_DESC[cat];
              return (
                <section key={cat} className="cat-category-section">
                  <Stack gap={0.5}>
                    <HStack hAlign="between" vAlign="center" gap={2}>
                      <Heading level={3}>
                        {isId ? CATEGORY_LABELS_ID[cat] : cat}
                      </Heading>
                      <Badge
                        variant="neutral"
                        label={
                          isId
                            ? `${items.length} komponen`
                            : `${items.length} specimens`
                        }
                      />
                    </HStack>
                    <Text type="supporting" color="secondary">
                      {isId ? desc.id : desc.en}
                    </Text>
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
