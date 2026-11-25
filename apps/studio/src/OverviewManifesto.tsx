import React from 'react';
import {Badge, Button, Card, Grid, HStack, Heading, Stack, Text} from '@astryxdesign/core';
import {
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
      viewBox="0 0 280 68"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 8 C 36 28, 62 36, 82 56 M72 55 L 83 57 L 82 45"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M84 6 C 88 26, 102 36, 112 58 M103 53 L 112.5 59 L 116 48"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M140 4 L 140 60 M133 51 L 140 61 L 147 51"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M196 6 C 192 26, 178 36, 168 58 M164 48 L 167.5 59 L 177 53"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M252 8 C 244 28, 218 36, 198 56 M198 45 L 197 57 L 208 55"
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
      viewBox="0 0 20 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 2 C 6 9, 14 17, 10 25 C 8 28, 10 30, 10 32"
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

  const funnelSteps = [
    {
      stat: '103',
      toneClass: 'mh-stat-blue',
      label: isId
        ? 'Primitif WAI-ARIA Teruji (Meta Astryx)'
        : 'Battle-Tested WAI-ARIA Primitives',
      callout: isId
        ? 'Focus trap, roving tabindex, RTL & zoom 200% sudah tuntas dari sananya'
        : 'Focus traps, roving tabindex, RTL & 200% zoom already solved by Meta',
    },
    {
      stat: '+ 35',
      toneClass: 'mh-stat-green',
      label: isId
        ? 'Ekstensi Universal & Topologi 5-in-1'
        : 'Universal Extensions & 5-in-1 Workspaces',
      callout: isId
        ? 'WorkspaceLayout, CanvasStage, DataChart, ColorPicker + 4 suite Runtime Hooks'
        : 'WorkspaceLayout, CanvasStage, DataChart, ColorPicker + 4 Runtime Hook suites',
    },
    {
      stat: '8 × 12',
      toneClass: 'mh-stat-amber',
      label: isId
        ? 'Atmosfer OKLCH & Preset Siap Pakai'
        : 'OKLCH Atmospheres & Signature Presets',
      callout: isId
        ? '10 font WOFF2 OFL bundel offline + Theme Editor 3-tingkat tanpa batas'
        : '10 self-hosted OFL WOFF2 fonts + unrestricted 3-tier live Theme Editor',
    },
    {
      stat: '12',
      toneClass: 'mh-stat-purple',
      label: isId
        ? 'Bab Standar UX, Microcopy & 80 Dokumen AI'
        : 'UX Playbook Chapters & 80 AI Agent Docs',
      callout: isId
        ? 'Beban kognitif, Hukum Fitts, state optimis & dwibahasa ID/EN presisi'
        : 'Cognitive load, Fitts’s Law, optimistic states & bilingual ID/EN clarity',
    },
    {
      stat: '= 1',
      toneClass: 'mh-stat-accent',
      label: isId
        ? 'Design System Taktil · Nol Fork'
        : 'Unified Tactile System · Zero Fork',
      callout: isId
        ? 'Siap kirim ke React/Next.js, Tailwind v4, Chat AI, HTML murni & Figma W3C'
        : 'Ships to React/Next.js, Tailwind v4, Claude/Gemini, Vanilla HTML & Figma W3C',
    },
  ];

  const iterationStages = [
    {
      step: '01',
      title: isId
        ? 'Bedah Forensik: Mesin Meta × Jiwa Shotcandy'
        : 'Forensic Spark: Meta’s Engine × Shotcandy’s Soul',
      desc: isId
        ? 'Mengagumi kehangatan taktil Shotcandy, namun menolak jebakan membuat primitif dari nol tanpa aksesibilitas. Memilih Meta Astryx sebagai tulang punggung resmi tanpa mem-fork 1 pun komponen inti.'
        : 'Admired Shotcandy’s tactile warmth while rejecting fragile from-scratch primitives — anchoring 100% on Meta Astryx’s accessible core with zero component forks.',
    },
    {
      step: '02',
      title: isId
        ? 'Fisika Optik OKLCH & Audit Bebas Bias'
        : 'OKLCH Optical Physics & Zero-Bias Audit',
      desc: isId
        ? 'Merombak matematika warna ke ruang perseptual OKLCH: mengunci urutan kedalaman 7-lapis di mode gelap (socket < well < paper < surface < raised < float) dan gradien 3-titik bebas garis patahan.'
        : 'Rebuilt color math in perceptual OKLCH — enforcing strict 7-layer dark-mode luminance depth, silky 3-stop primary gradients, and automated WCAG 2.2 AA contrast locks.',
    },
    {
      step: '03',
      title: isId
        ? 'Theme Editor 3-Tingkat Tanpa Kerangkeng'
        : 'Unrestricted 3-Tier Live Theme Studio',
      desc: isId
        ? 'Membuka seluruh keran kustomisasi setara bahkan melampaui Playground resmi: Seed Taktil -> Slot Komponen -> 8 Grup Token Mentah, 10 font WOFF2 offline, serta riwayat Undo/Redo.'
        : 'Expanded customization from basic knobs into a full 3-tier studio (Tactile Seeds -> Component Slots -> 8 Raw Token Groups), 10 offline WOFF2 fonts, and coalesced Undo/Redo.',
    },
    {
      step: '04',
      title: isId
        ? 'Distilasi Ruang Universal (Topologi 5-in-1)'
        : 'Universal Spatial Distillation (5-in-1)',
      desc: isId
        ? 'Menolak duplikasi puluhan layout seragam. Memeras arsitektur layar menjadi hierarki 3-tingkat (AppShell -> WorkspaceLayout 5-in-1 -> CanvasStage) dengan pelepas tinggi otomatis di zoom 200%.'
        : 'Refused bloated duplicate page layouts — distilling real app shells into AppShell -> WorkspaceLayout (5 topologies in 1) -> CanvasStage with 200%-zoom scroll release.',
    },
    {
      step: '05',
      title: isId
        ? 'Taksonomi 4 Pilar & 12 Bab UX Playbook'
        : '4-Pillar Taxonomy & 12-Chapter UX Playbook',
      desc: isId
        ? 'Menata ulang 142 spesimen hidup ke dalam 4 pilar arsitektur yang jernih serta merangkum standar beban kognitif, ergonomi, lokalisasi, dan microcopy menjadi 80 dokumen AI terverifikasi.'
        : 'Reorganized all 142 live specimens into 4 intuitive architectural pillars alongside 12 interactive UX & Microcopy chapters (80/80 CLI-verified AI agent docs).',
    },
    {
      step: '06',
      title: isId
        ? 'Sapuan Taktil Menyeluruh & Portabilitas Instan'
        : 'Full-Sweep Tactile Polish & Portability',
      desc: isId
        ? 'Memoles >30 sub-target Core hingga tak ada satu pun komponen terasa mentah, lalu menjembatani satu DNA ke React, Tailwind v4, Claude/Gemini Artifacts, HTML murni, dan Figma W3C.'
        : 'Polished 30+ subtle Core sub-targets so zero primitives felt raw, then bridged one DNA source to React, Tailwind v4, AI Artifacts, Vanilla HTML, and Figma W3C.',
    },
  ];

  return (
    <Stack gap={5}>
      {/* =====================================================================
          1. EDITORIAL MANIFESTO & VISUAL DISTILLATION ILLUSTRATION
         ===================================================================== */}
      <Card elevation="low">
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

          {/* Attachment-1 Inspired Tilted Before -> After Comparison Stage */}
          <div className="mh-compare-stage">
            <div className="mh-tilt-col">
              <div className="mh-mock-card mh-mock-card-raw">
                <div className="mh-mock-top">
                  <span className="mh-mock-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mh-mock-file">custom-ui-from-zero.tsx</span>
                </div>
                <div className="mh-mock-title-raw">
                  {isId ? 'Bikin sendiri dari nol' : 'Built from scratch'}
                </div>
                <div className="mh-mock-input-raw">
                  {isId ? 'Input datar tanpa kontras well' : 'Flat input · broken focus trap'}
                </div>
                <div className="mh-mock-pills-raw">
                  <span>✗ 0 WAI-ARIA</span>
                  <span>✗ 6+ {isId ? 'bln riset ulang' : 'mos wasted'}</span>
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
                    ? 'Sumur input cekung · fokus & ARIA terkunci'
                    : 'Recessed tactile well · WAI-ARIA locked'}
                </div>
                <div className="mh-mock-pills-mehan">
                  <span>✓ WCAG 2.2 AA</span>
                  <span>✓ 103 Core + 35 Ext</span>
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

          {/* Centerpiece Thesis Headline with Fraunces Italic Keyword */}
          <div className="mh-thesis-block">
            <h2 className="mh-thesis-heading">
              {isId ? (
                <>
                  Jangan rakit ulang roda yang sudah matang — pahat{' '}
                  <em className="mh-serif-accent">jiwa & ergonominya</em> di atasnya.
                </>
              ) : (
                <>
                  Stop rebuilding solved engineering from zero — sculpt the{' '}
                  <em className="mh-serif-accent">soul & ergonomics</em> on top.
                </>
              )}
            </h2>
            <p className="mh-thesis-copy">
              {isId
                ? 'Di luar sana banyak tim membuang berbulan-bulan menggambar ulang tombol, dropdown, dan modal dari nol (atau menjual UI kit kosmetik), namun gagal di navigasi keyboard, focus trap, zoom 200%, dan kontras mode gelap. Padahal fondasi terbuka sekelas Meta Astryx sudah menguji 103 primitif aksesibel di ribuan aplikasi nyata. Kalau yang belum sesuai hanyalah rasa visual yang kaku, langkah cerdas bukanlah membongkar mesinnya — melainkan membangun lapisan DNA taktil OKLCH, pola workspace universal, dan standar UX presisi tepat di atasnya.'
                : 'Too many teams spend months redrawing buttons, selects, and dialogs from scratch (or selling cosmetic UI kits) that look fine in static mockups yet break keyboard navigation, modal focus traps, 200% zoom, and dark-mode contrast. Open foundations like Meta Astryx already battle-tested 103 accessible primitives across thousands of apps. When all that’s missing is visual soul and spatial ergonomics, smart engineering keeps the proven engine 100% intact and builds a parametric OKLCH tactile layer cleanly on top.'}
            </p>
          </div>

          {/* Vertical Distillation Funnel Spine (Attachment 1 Style) */}
          <div className="mh-funnel-spine" role="list" aria-label="Mehan architectural distillation">
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
      </Card>

      {/* =====================================================================
          2. 12 SIGNATURE THEME PRESETS — LIVE 1-CLICK GALLERY
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={4}>
          <HStack hAlign="between" vAlign="end" wrap="wrap" gap={3}>
            <Stack gap={1}>
              <HStack gap={2} vAlign="center" wrap="wrap">
                <Badge
                  variant="pink"
                  label={isId ? '8 Atmosfer × 12 Preset Kurasi' : '8 Atmospheres × 12 Curated Presets'}
                />
                <Badge
                  variant="success"
                  label={
                    isId
                      ? 'Terinspirasi Astryx & Shotcandy · Dipoles 200%'
                      : 'Astryx & Shotcandy Inspired · Elevated 200%'
                  }
                />
              </HStack>
              <Heading level={2}>
                {isId
                  ? 'Pilih karakter tema secara instan (klik untuk mengubah seluruh Studio)'
                  : '12 signature theme directions — click any card to morph Studio live'}
              </Heading>
              <Text color="secondary">
                {isId
                  ? 'Setiap preset memadukan atmosfer 7-lapis Light/Dark, benih aksen OKLCH, pasangan tipografi, serta fisika bibir 3D yang sudah teruji kontras WCAG 2.2 AA.'
                  : 'Every preset pairs a 7-layer Light/Dark surface atmosphere, perceptual OKLCH accent, curated font trio, and 3D lip physics — all mathematically locked to WCAG 2.2 AA.'}
              </Text>
            </Stack>
            <Button
              variant="secondary"
              size="sm"
              label={isId ? 'Kustomisasi penuh di Theme Editor' : 'Customize in Theme Editor'}
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
              const pAtm = MEHAN_ATMOSPHERES[pSeed.atmosphere] ?? MEHAN_ATMOSPHERES.confectionery;
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

              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={isCurrent}
                  className={`mh-preset-card ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => onApplyPreset(preset)}
                >
                  <div className="mh-preset-swatches" aria-hidden="true">
                    <span
                      className="mh-preset-swatch-paper"
                      style={{
                        backgroundColor: pAtm.light.paper,
                        borderColor: pAtm.light.line,
                      }}
                    >
                      <i
                        className="mh-preset-swatch-cta"
                        style={{
                          backgroundImage: pDna.accent.buttonGradient,
                          boxShadow: `inset 0 -2px 0 ${pDna.accent.buttonLip}`,
                        }}
                      />
                    </span>
                    <span
                      className="mh-preset-swatch-dark"
                      style={{
                        backgroundColor: pAtm.dark.surface,
                        borderColor: pAtm.dark.line,
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
                      <span className="mh-preset-name">{preset.name}</span>
                      {preset.badge && (
                        <span className="mh-preset-tag">{preset.badge}</span>
                      )}
                    </div>
                    <p className="mh-preset-desc">
                      {isId ? preset.taglineId ?? preset.taglineEn : preset.taglineEn}
                    </p>
                    <div className="mh-preset-fonts">
                      <span>{pSeed.headingFont}</span>
                      <span>·</span>
                      <span>{pSeed.lipStyle} lip</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Stack>
      </Card>

      {/* =====================================================================
          3. AUTHENTIC 6-STAGE ITERATION CHRONICLE (FROM REAL BUILD LOGS)
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={4}>
          <Stack gap={1}>
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Badge
                variant="teal"
                label={isId ? 'Catatan Dapur Rekayasa' : 'Engineering & Craft Chronicle'}
              />
              <Badge
                variant="neutral"
                label={isId ? '6 Siklus Iterasi Ketat' : '6 Disciplined Iteration Loops'}
              />
            </HStack>
            <Heading level={2}>
              {isId
                ? 'Bagaimana Mehan ditempa: bukan sekali jadi, melainkan 6 putaran distilasi'
                : 'How Mehan was forged: 6 iterations of critique, de-biasing & distillation'}
            </Heading>
            <Text color="secondary">
              {isId
                ? 'Setiap komponen, rumus kontras, dan aturan tata ruang lahir dari pengujian visual langsung, penghapusan bias proyek lama, serta standar verifikasi otomatis 6 gerbang.'
                : 'Every surface role, layout primitive, and microcopy law was earned by auditing real failure modes, stripping project-specific bias, and locking behavior behind 6 automated gates.'}
            </Text>
          </Stack>

          <Grid columns={{minWidth: 280, max: 3, repeat: 'fit'}} gap={3}>
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
        </Stack>
      </Card>
    </Stack>
  );
}
