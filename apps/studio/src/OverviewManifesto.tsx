import React from 'react';
import {
  Badge,
  Button,
  Card,
  Collapsible,
  Grid,
  HStack,
  Heading,
  Stack,
  Text,
} from '@astryxdesign/core';
import {
  MEHAN_ATMOSPHERE_IDS,
  MEHAN_ATMOSPHERES,
  resolveMehanDna,
  type ResolvedMehanDna,
} from '@mehan/astryx/dna';
import {Check, SlidersHorizontal} from 'lucide-react';
import type {NamedStudioPreset, StudioLang} from './studioState';
import type {FullThemeEditorState} from './theme-editor/themeEditorModel';

interface OverviewManifestoProps {
  lang: StudioLang;
  dna: ResolvedMehanDna;
  themeState: FullThemeEditorState;
  builtInPresets: NamedStudioPreset[];
  onApplyPreset: (preset: NamedStudioPreset) => void;
  onOpenEditor: () => void;
}

function HandDrawnCurvedArrow() {
  return (
    <svg
      className="mh-sketch-arrow-horiz"
      viewBox="0 0 84 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 24 C 24 8, 52 8, 76 19"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M66 11 L 78 19.5 L 65 26"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandDrawnConvergingArrows() {
  return (
    <svg
      className="mh-sketch-converge"
      viewBox="0 0 280 62"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 6 C 36 24, 62 32, 82 50 M72 49 L 83 51 L 82 39"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 4 C 88 22, 102 32, 112 52 M103 47 L 112.5 53 L 116 42"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M140 2 L 140 54 M133 45 L 140 55 L 147 45"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M196 4 C 192 22, 178 32, 168 52 M164 42 L 167.5 53 L 177 47"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M252 6 C 244 24, 218 32, 198 50 M198 39 L 197 51 L 208 49"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandDrawnSquiggle() {
  return (
    <svg
      className="mh-sketch-squiggle"
      viewBox="0 0 20 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2 C 6 8, 14 15, 10 22 C 8 25, 10 27, 10 28"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SideCalloutArrow() {
  return (
    <svg
      className="mh-sketch-side-arrow"
      viewBox="0 0 38 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 20 C 12 19, 20 10, 33 6 M25 3 L 34 5.5 L 28 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OverviewManifesto({
  lang,
  dna,
  themeState,
  builtInPresets,
  onApplyPreset,
  onOpenEditor,
}: OverviewManifestoProps) {
  const isId = lang === 'id';
  const {seed} = themeState;
  const atmCount = MEHAN_ATMOSPHERE_IDS.length;
  const presetCount = builtInPresets.length;

  const funnelSteps = [
    {
      stat: 'Layer 1',
      toneClass: 'mh-stat-blue',
      label: isId
        ? 'Fondasi WAI-ARIA Meta Astryx'
        : 'Meta Astryx WAI-ARIA Foundation',
      callout: isId
        ? 'Focus trap, roving tabindex, RTL & zoom 200% utuh tanpa fork'
        : 'Focus traps, roving tabindex, RTL & 200% zoom untouched — zero forks',
    },
    {
      stat: `${atmCount} × ${presetCount}`,
      toneClass: 'mh-stat-amber',
      label: isId
        ? 'Atmosfer OKLCH & Preset Kurasi'
        : 'OKLCH Atmospheres & Signature Presets',
      callout: isId
        ? 'Bibir 3D taktil, sumur input cekung, font WOFF2 offline & Theme Editor live'
        : 'Sculpted 3D lips, recessed wells, offline WOFF2 fonts & live Theme Editor',
    },
    {
      stat: '5-in-1',
      toneClass: 'mh-stat-green',
      label: isId
        ? 'Topologi Workspace & Standar UX'
        : 'Universal Workspaces & UX Laws',
      callout: isId
        ? 'WorkspaceLayout, CanvasStage, Runtime Hooks & Playbook dwibahasa ID/EN'
        : 'WorkspaceLayout, CanvasStage, Runtime Hooks & bilingual ID/EN Playbook',
    },
    {
      stat: '= 1',
      toneClass: 'mh-stat-accent',
      label: isId
        ? 'Sistem Desain Universal · Siap Kirim'
        : 'Unified Tactile System · Ship Anywhere',
      callout: isId
        ? 'React & Next.js · Tailwind v4 · Claude/Gemini · HTML/Vue/Svelte · Figma W3C'
        : 'React & Next.js · Tailwind v4 · Claude/Gemini · HTML/Vue/Svelte · Figma W3C',
    },
  ];

  const iterationStages = [
    {
      step: '01',
      title: isId
        ? 'Bedah Forensik: Mesin Meta × Jiwa Shotcandy'
        : 'Forensic Spark: Meta’s Engine × Shotcandy’s Soul',
      desc: isId
        ? 'Mengagumi kehangatan taktil Shotcandy sambil menolak primitif rapuh buatan nol — menumpukan seluruh perilaku WAI-ARIA murni di atas Meta Astryx.'
        : 'Paired Shotcandy’s joyful physicality with Meta Astryx’s battle-tested WAI-ARIA core — zero forked primitives.',
    },
    {
      step: '02',
      title: isId
        ? 'Fisika Optik OKLCH & Audit Bebas Bias'
        : 'OKLCH Optical Physics & Zero-Bias Audit',
      desc: isId
        ? 'Mengunci urutan kedalaman 7-lapis mode gelap (socket < well < paper < surface < raised < float) dan audit kontras WCAG 2.2 AA otomatis.'
        : 'Enforced monotonic 7-layer dark-mode depth, silky 3-stop primary gradients, and automated WCAG 2.2 AA contrast locks.',
    },
    {
      step: '03',
      title: isId
        ? 'Theme Editor 3-Tingkat Terbuka'
        : 'Unrestricted 3-Tier Live Theme Studio',
      desc: isId
        ? 'Membuka kustomisasi Seed Taktil -> Slot Komponen -> Grup Token Mentah beserta bundel font WOFF2 offline dan riwayat Undo/Redo.'
        : 'Opened Base Seeds -> Component Slots -> Raw Token Groups with bundled offline WOFF2 fonts and coalesced Undo/Redo.',
    },
    {
      step: '04',
      title: isId
        ? 'Distilasi Ruang Universal (5-in-1)'
        : 'Universal Spatial Distillation (5-in-1)',
      desc: isId
        ? 'Memeras puluhan layout berulang menjadi AppShell -> WorkspaceLayout (5 topologi dalam 1 komponen) -> CanvasStage.'
        : 'Distilled repetitive layouts into AppShell -> WorkspaceLayout (5 topologies in 1) -> CanvasStage with 200%-zoom release.',
    },
    {
      step: '05',
      title: isId
        ? 'Taksonomi 4 Pilar & Evergreen UX Playbook'
        : '4-Pillar Taxonomy & Evergreen UX Playbook',
      desc: isId
        ? 'Menata katalog komponen ke 4 pilar arsitektur jernih serta membakukan standar kognitif, ergonomi, Evergreen Copy, dan tangga ekstensi.'
        : 'Organized the catalog into 4 architectural pillars alongside interactive UX, Evergreen Copy, and Extension Ladder laws.',
    },
    {
      step: '06',
      title: isId
        ? 'Sapuan Taktil Penuh & Portabilitas Instan'
        : 'Full-Sweep Tactile Polish & Portability',
      desc: isId
        ? 'Memoles seluruh sub-target Core agar nol komponen terasa mentah, lalu menjembatani satu DNA ke React, AI Chat, HTML murni, dan Figma.'
        : 'Polished Core sub-targets so zero primitives feel raw, bridging one DNA source to React, AI Artifacts, HTML, and Figma.',
    },
  ];

  return (
    <Stack gap={5}>
      {/* =====================================================================
          BEAT 2: LIVE SIGNATURE PRESETS GALLERY (WITH REAL PER-CARD FONTS & STYLES!)
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={3}>
          <HStack hAlign="between" vAlign="end" wrap="wrap" gap={3}>
            <Stack gap={1}>
              <HStack gap={2} vAlign="center" wrap="wrap">
                <Badge
                  variant="pink"
                  label={
                    isId
                      ? `${atmCount} Atmosfer × ${presetCount} Preset Kurasi`
                      : `${atmCount} Atmospheres × ${presetCount} Signature Presets`
                  }
                />
                <Badge
                  variant="success"
                  label={
                    isId
                      ? 'Font & Fisika Asli per Kartu · Klik Langsung Berubah'
                      : 'Live Per-Card Typography & Physics · Click to Morph'
                  }
                />
              </HStack>
              <Heading level={2}>
                {isId
                  ? 'Rasakan langsung bedanya — klik preset mana saja untuk mengubah seluruh Studio'
                  : 'Feel the range instantly — click any preset to transform the entire Studio'}
              </Heading>
            </Stack>
            <Button
              variant="secondary"
              size="sm"
              label={isId ? 'Racik sendiri di Theme Editor' : 'Customize in Theme Editor'}
              icon={<SlidersHorizontal size={14} />}
              onClick={onOpenEditor}
            />
          </HStack>

          <div
            className="mh-preset-gallery"
            role="radiogroup"
            aria-label={isId ? 'Galeri preset tema Mehan' : 'Mehan signature theme presets'}
          >
            {builtInPresets.map(preset => {
              const pSeed = preset.state.seed;
              const pAtm =
                MEHAN_ATMOSPHERES[pSeed.atmosphere] ?? MEHAN_ATMOSPHERES.confectionery;
              const pDna = resolveMehanDna({
                name: preset.id,
                ...pSeed,
                radiusBase: pSeed.radiusBase ?? undefined,
              });
              const isCurrent =
                seed.atmosphere === pSeed.atmosphere &&
                seed.accent === pSeed.accent &&
                seed.headingFont === pSeed.headingFont &&
                seed.bodyFont === pSeed.bodyFont &&
                seed.sizeBase === pSeed.sizeBase &&
                seed.segmentedStyle === pSeed.segmentedStyle;

              const cardRadius = `${Math.round(14 * pSeed.radiusScale)}px`;
              const pillRadius = `${Math.round(8 * pSeed.radiusScale)}px`;
              const lipShadow =
                pDna.lipPx > 0
                  ? `inset 0 -${pDna.lipPx}px 0 ${pDna.accent.buttonLip}, 0 1px 2px rgba(0,0,0,0.12)`
                  : '0 1px 2px rgba(0,0,0,0.10)';
              const segBg =
                pSeed.segmentedStyle === 'espresso'
                  ? pAtm.light.inverted
                  : pAtm.light.surface;
              const segInk =
                pSeed.segmentedStyle === 'espresso'
                  ? pAtm.light.onInverted
                  : pAtm.light.ink;

              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={isCurrent}
                  className={`mh-preset-card ${isCurrent ? 'is-active' : ''}`}
                  style={{borderRadius: cardRadius}}
                  onClick={() => onApplyPreset(preset)}
                >
                  <div className="mh-preset-swatches" aria-hidden="true">
                    <span
                      className="mh-preset-swatch-paper"
                      style={{
                        backgroundColor: pAtm.light.paper,
                        borderColor: pAtm.light.line,
                        borderRadius: pillRadius,
                      }}
                    >
                      <span
                        className="mh-preset-swatch-cta"
                        style={{
                          backgroundColor: pDna.accent.accentLight,
                          backgroundImage: pDna.accent.buttonGradient,
                          color: pDna.accent.onAccentLight,
                          boxShadow: lipShadow,
                          borderRadius: `${Math.max(4, Math.round(7 * pSeed.radiusScale))}px`,
                          fontFamily: `"${pSeed.bodyFont}", sans-serif`,
                        }}
                      >
                        Aa
                      </span>
                      <span
                        className="mh-preset-swatch-seg"
                        style={{
                          backgroundColor: segBg,
                          color: segInk,
                          borderRadius: `${Math.max(4, Math.round(6 * pSeed.radiusScale))}px`,
                          fontFamily: `"${pSeed.codeFont}", monospace`,
                        }}
                      >
                        {pSeed.sizeBase}px
                      </span>
                    </span>
                    <span
                      className="mh-preset-swatch-dark"
                      style={{
                        backgroundColor: pAtm.dark.surface,
                        borderColor: pAtm.dark.line,
                        borderRadius: pillRadius,
                      }}
                    >
                      <i style={{backgroundColor: pDna.accent.accentDark}} />
                    </span>
                    {isCurrent && (
                      <span className="mh-preset-active-pill">
                        <Check size={11} />
                        <span>{isId ? 'Aktif' : 'Active'}</span>
                      </span>
                    )}
                  </div>

                  <div className="mh-preset-meta">
                    <div className="mh-preset-title-row">
                      <span
                        className="mh-preset-name"
                        style={{
                          fontFamily: `"${pSeed.headingFont}", var(--font-family-heading), sans-serif`,
                        }}
                      >
                        {preset.name}
                      </span>
                      {preset.badge && (
                        <span className="mh-preset-tag">{preset.badge}</span>
                      )}
                    </div>
                    <p
                      className="mh-preset-desc"
                      style={{
                        fontFamily: `"${pSeed.bodyFont}", var(--font-family-body), sans-serif`,
                      }}
                    >
                      {isId ? preset.taglineId ?? preset.taglineEn : preset.taglineEn}
                    </p>
                    <div
                      className="mh-preset-fonts"
                      style={{
                        fontFamily: `"${pSeed.codeFont}", var(--font-family-code), monospace`,
                      }}
                    >
                      {pSeed.headingFont === pSeed.bodyFont ? (
                        <>
                          <span>{pSeed.headingFont}</span>
                          <span>·</span>
                          <span>{pSeed.codeFont}</span>
                        </>
                      ) : (
                        <>
                          <span>{pSeed.headingFont}</span>
                          <span>+</span>
                          <span>{pSeed.bodyFont}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Stack>
      </Card>

      {/* =====================================================================
          BEAT 3: UNIFIED VISUAL THESIS ("WORK SMART, NOT FROM SCRATCH")
                  + PROGRESSIVELY DISCLOSED 6-STAGE ENGINEERING STORY
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={4}>
          <div className="mh-manifesto-wrap">
            <div className="mh-manifesto-eyebrow">
              <Badge
                variant="purple"
                label={
                  isId
                    ? 'Mengapa Mehan Dibuat · Kerja Cerdas vs. Mulai dari Nol'
                    : 'Why Mehan Exists · Architectural Leverage vs. Reinventing Wheels'
                }
              />
            </div>

            <div className="mh-compare-stage">
              <div className="mh-tilt-col">
                <div className="mh-mock-card mh-mock-card-raw">
                  <div className="mh-mock-top">
                    <span className="mh-mock-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="mh-mock-file">from-scratch-ui.tsx</span>
                  </div>
                  <div className="mh-mock-title-raw">
                    {isId ? 'Bikin sendiri dari nol' : 'Rebuilt from scratch'}
                  </div>
                  <div className="mh-mock-input-raw">
                    {isId ? 'Input datar · tanpa focus trap' : 'Flat input · broken focus trap'}
                  </div>
                  <div className="mh-mock-pills-raw">
                    <span>✗ 0 WAI-ARIA</span>
                    <span>✗ {isId ? 'Bulanan terbuang' : 'Months wasted'}</span>
                  </div>
                  <div className="mh-mock-btn-raw">
                    {isId ? 'Tombol generik datar' : 'Generic flat button'}
                  </div>
                </div>
                <p className="mh-hand-caption">
                  {isId
                    ? 'Tanpa fondasi — kerja keras, rapuh di produksi'
                    : 'Without leverage — hard work, fragile in production'}
                </p>
              </div>

              <HandDrawnCurvedArrow />

              <div className="mh-tilt-col">
                <div className="mh-mock-card mh-mock-card-mehan">
                  <div className="mh-mock-top">
                    <span className="mh-mock-dots is-warm" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="mh-mock-badge-ok">Meta Astryx × Mehan</span>
                  </div>
                  <div className="mh-mock-title-mehan">
                    {dna.atmosphere.name} · {dna.accent.name}
                  </div>
                  <div className="mh-mock-input-mehan">
                    {isId
                      ? 'Sumur input cekung · WAI-ARIA terkunci'
                      : 'Recessed tactile well · WAI-ARIA locked'}
                  </div>
                  <div className="mh-mock-pills-mehan">
                    <span>✓ WCAG 2.2 AA</span>
                    <span>✓ Zero Fork</span>
                  </div>
                  <div className="mh-mock-btn-mehan">
                    {isId ? 'Bibir 3D taktil siap pakai' : 'Sculpted 3D tactile CTA'}
                  </div>
                </div>
                <p className="mh-hand-caption is-accent">
                  {isId
                    ? 'Dengan Mehan — mesin Meta + jiwa taktil berkarakter'
                    : 'With Mehan — Meta’s engine + unmistakable tactile soul'}
                </p>
              </div>
            </div>

            <HandDrawnConvergingArrows />

            <div className="mh-thesis-block">
              <h2 className="mh-thesis-heading">
                {isId ? (
                  <>
                    Jangan rakit ulang mesin yang sudah matang — pahat{' '}
                    <em className="mh-serif-accent">jiwa & ergonominya</em> di atasnya.
                  </>
                ) : (
                  <>
                    Stop rebuilding solved engineering — sculpt the{' '}
                    <em className="mh-serif-accent">soul & ergonomics</em> on top.
                  </>
                )}
              </h2>
              <p className="mh-thesis-copy">
                {isId
                  ? 'Menggambar ulang dropdown, modal, dan tabel dari nol hanya membuang waktu berbulan-bulan sambil meninggalkan celah aksesibilitas dan kontras. Mehan berdiri murni di atas fondasi perilaku Meta Astryx yang sudah teruji, lalu menyuntikkan DNA material OKLCH, topologi ruang kerja universal, dan standar UX di atasnya.'
                  : 'Redrawing selects, modals, and tables from zero wastes months while shipping broken focus traps and poor dark-mode contrast. Mehan keeps Meta Astryx’s battle-tested behavioral engine completely intact and layers perceptual OKLCH materials, universal workspaces, and UX laws cleanly above it.'}
              </p>
            </div>

            <div className="mh-funnel-spine" role="list" aria-label="Mehan architectural layers">
              {funnelSteps.map((item, idx) => (
                <React.Fragment key={item.stat}>
                  {idx > 0 && <HandDrawnSquiggle />}
                  <div className="mh-funnel-node" role="listitem">
                    <div className="mh-funnel-center">
                      <div className={`mh-funnel-number ${item.toneClass}`}>
                        {item.stat}
                      </div>
                      <div className="mh-funnel-label">{item.label}</div>
                    </div>
                    <div className="mh-funnel-callout">
                      <SideCalloutArrow />
                      <span>{item.callout}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <Collapsible
            defaultIsOpen={false}
            trigger={
              isId
                ? 'Baca kisah dapur rekayasa: 6 putaran iterasi & distilasi di balik Mehan'
                : 'Read the engineering story: 6 iterations of critique, de-biasing & distillation'
            }
          >
            <Grid columns={{minWidth: 260, max: 3, repeat: 'fit'}} gap={3}>
              {iterationStages.map(item => (
                <div key={item.step} className="mh-iter-card">
                  <div className="mh-iter-top">
                    <span className="mh-iter-num">{item.step}</span>
                    <h3 className="mh-iter-title">{item.title}</h3>
                  </div>
                  <p className="mh-iter-desc">{item.desc}</p>
                </div>
              ))}
            </Grid>
          </Collapsible>
        </Stack>
      </Card>
    </Stack>
  );
}
