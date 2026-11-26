import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
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
import {scrollPaneToTopIfBelow, type StudioLang} from '../studioState';
import {useCatalogCoreActionsContent} from './CatalogCoreActionsContent';
import {useCatalogCoreFormsViz} from './CatalogCoreFormsViz';
import {useCatalogCoreLayoutOverlays} from './CatalogCoreLayoutOverlays';
import {useCatalogMehanControls} from './CatalogMehanControls';
import {useCatalogMehanFormsFeedback} from './CatalogMehanFormsFeedback';
import {useCatalogMehanDataOverlays} from './CatalogMehanDataOverlays';
import {useCatalogWorkspacesAndHooks} from './CatalogWorkspacesAndHooks';
import {
  CATALOG_PILLARS,
  CATEGORY_DESC,
  CATEGORY_LABELS_ID,
  FORM_CONTROL_SUBGROUPS,
  OFFICIAL_ASTRYX_CATEGORIES,
  SpecimenCard,
  getSpecimenRank,
  renderFormattedCopy,
  type OfficialAstryxCategory,
} from './SpecimenCard';

interface ComponentsCatalogViewProps {
  lang: StudioLang;
  copy: StudioCopy;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function ComponentsCatalogView({
  lang,
  copy,
  searchInputRef,
}: ComponentsCatalogViewProps) {
  const isId = lang === 'id';
  // Start focused on 'Layout' (Pillar I · Structure & Wayfinding)
  const [selectedCategory, setSelectedCategory] = useState<
    OfficialAstryxCategory | 'all'
  >('Layout');
  const [pkgFilter, setPkgFilter] = useState<'all' | 'core' | 'mehan'>('all');
  const [query, setQuery] = useState('');
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);

  useLayoutEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    scrollPaneToTopIfBelow(layoutRef.current, 72);
  }, [selectedCategory, pkgFilter]);

  const groupA = useCatalogCoreActionsContent();
  const groupB = useCatalogCoreFormsViz();
  const groupC = useCatalogCoreLayoutOverlays();
  const mehanTier1 = useCatalogMehanControls();
  const mehanTier2 = useCatalogMehanFormsFeedback();
  const mehanTier3 = useCatalogMehanDataOverlays();
  const workspacesAndHooks = useCatalogWorkspacesAndHooks();

  const allSpecimens = useMemo(() => {
    const raw = [
      ...groupA,
      ...groupB,
      ...groupC,
      ...mehanTier1,
      ...mehanTier2,
      ...mehanTier3,
      ...workspacesAndHooks,
    ];
    return [...raw].sort((a, b) => {
      if (a.category !== b.category) {
        return (
          OFFICIAL_ASTRYX_CATEGORIES.indexOf(a.category) -
          OFFICIAL_ASTRYX_CATEGORIES.indexOf(b.category)
        );
      }
      return (
        getSpecimenRank(a.category, a.id) - getSpecimenRank(b.category, b.id)
      );
    });
  }, [
    groupA,
    groupB,
    groupC,
    mehanTier1,
    mehanTier2,
    mehanTier3,
    workspacesAndHooks,
  ]);

  const coreCount = useMemo(
    () => allSpecimens.filter(s => s.pkg === 'core').length,
    [allSpecimens],
  );
  const mehanCount = allSpecimens.length - coreCount;

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
            label={
              isId
                ? `${allSpecimens.length} spesimen aktif`
                : `${allSpecimens.length} live specimens`
            }
          />
        </HStack>
        <Text color="secondary">{copy.components.subtitle}</Text>
      </Stack>

      {/* Search & Package Filter Bar */}
      <HStack hAlign="between" vAlign="center" wrap="wrap" gap={3}>
        <div style={{flex: '1 1 300px', maxWidth: 520}}>
          <TextInput
            ref={searchInputRef}
            label={isId ? 'Cari komponen' : 'Search components'}
            isLabelHidden
            hasClear
            startIcon={<Search size={15} />}
            placeholder={copy.components.searchPlaceholder}
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className="mh-seg-scroll">
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
              label={`Core (${coreCount})`}
            />
            <SegmentedControlItem
              value="mehan"
              label={
                isId
                  ? `Ekstensi Mehan (${mehanCount})`
                  : `Mehan extensions (${mehanCount})`
              }
            />
          </SegmentedControl>
        </div>
      </HStack>

      {/* Sticky 4-Pillar, 12-Category Sidebar + Adaptive Specimen Grid */}
      <div ref={layoutRef} className="cat-layout">
        <nav
          className="cat-sidebar"
          aria-label="Official Astryx component categories"
        >
          {CATALOG_PILLARS.map(pillar => (
            <div key={pillar.id} className="cat-pillar-group">
              <div className="cat-pillar-label" aria-hidden="true">
                <span className="cat-pillar-num">{pillar.roman}</span>
                <span className="cat-pillar-text">
                  {isId ? pillar.idLabel : pillar.en}
                </span>
              </div>
              <div className="cat-pillar-items">
                {pillar.categories.map(cat => {
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
                        scrollPaneToTopIfBelow(layoutRef.current, 72);
                      }}
                    >
                      <span>{cat}</span>
                      <span className="cat-nav-count">
                        {countsByCategory[cat] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="cat-sidebar-divider" role="separator" />

          <button
            type="button"
            className={`cat-nav-btn ${!isGlobalSearchActive && selectedCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => {
              setSelectedCategory('all');
              if (query) setQuery('');
              scrollPaneToTopIfBelow(layoutRef.current, 72);
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
              const showFormSubgroups =
                cat === 'Form Controls' && !qLower && pkgFilter === 'all';

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
                            ? `${items.length} spesimen`
                            : items.length === 1
                              ? '1 specimen'
                              : `${items.length} specimens`
                        }
                      />
                    </HStack>
                    <Text type="supporting" color="secondary">
                      {renderFormattedCopy(isId ? desc.id : desc.en)}
                    </Text>
                  </Stack>

                  {showFormSubgroups ? (
                    <Stack gap={4}>
                      {FORM_CONTROL_SUBGROUPS.map(sub => {
                        const subIdSet = new Set(sub.specimenIds);
                        const subItems = items.filter(it => subIdSet.has(it.id));
                        if (subItems.length === 0) return null;
                        return (
                          <div key={sub.id} className="cat-subgroup-block">
                            <h4 className="cat-subgroup-title">
                              {isId ? sub.idLabel : sub.en}
                            </h4>
                            <div className="cat-grid">
                              {subItems.map(item => (
                                <SpecimenCard
                                  key={item.id}
                                  item={item}
                                  isId={isId}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </Stack>
                  ) : (
                    <div className="cat-grid">
                      {items.map(item => (
                        <SpecimenCard key={item.id} item={item} isId={isId} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </Stack>
      </div>
    </Stack>
  );
}
