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
import {Check, ExternalLink, SlidersHorizontal} from 'lucide-react';
import type {NamedStudioPreset, StudioLang} from './studioState';
import type {FullThemeEditorState} from './theme-editor/themeEditorModel';

interface OverviewManifestoProps {
  lang: StudioLang;
  mode: 'light' | 'dark';
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
  mode,
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
      stat: '100+',
      toneClass: 'mh-stat-blue',
      label: isId
        ? 'Komponen Dasar Teruji dari Meta Astryx'
        : 'Proven Core Components from Meta Astryx',
      callout: isId
        ? 'Navigasi keyboard, pembaca layar & dukungan agen AI sudah beres sejak hari pertama'
        : 'Keyboard navigation, screen-reader support & AI-agent readiness solved on day one',
    },
    {
      stat: '+ 35',
      toneClass: 'mh-stat-green',
      label: isId
        ? 'Komponen Ruang Kerja & Kreatif Orisinal'
        : 'Original Workspace & Creative Building Blocks',
      callout: isId
        ? 'Kerangka halaman 5-in-1, grafik data, pemilih warna, editor kode & simpan draf otomatis'
        : '5-in-1 app layouts, data charts, color pickers, code editors & auto-saved drafts',
    },
    {
      stat: `${presetCount}`,
      toneClass: 'mh-stat-amber',
      label: isId
        ? `Tema Taktil Siap Pakai (${atmCount} Suasana Warna)`
        : `Ready-Made Tactile Themes (${atmCount} Atmospheres)`,
      callout: isId
        ? 'Tombol 3D empuk, huruf bawaan siap offline & kontras Terang/Gelap otomatis aman'
        : 'Warm 3D buttons, bundled offline fonts & automatic Light/Dark contrast safety',
    },
    {
      stat: '12',
      toneClass: 'mh-stat-purple',
      label: isId
        ? 'Bab Panduan Praktis UX & Penulisan Teks'
        : 'Practical UX & Interface Writing Guides',
      callout: isId
        ? 'Aturan tata letak anti-sumpek & bahasa manusiawi dalam Bahasa Indonesia maupun Inggris'
        : 'Calm layout habits and clear human microcopy in both Indonesian and English',
    },
    {
      stat: '= 1',
      toneClass: 'mh-stat-accent',
      label: isId
        ? 'Sistem Desain Utuh · Siap di Semua Platform'
        : 'One Complete System · Ready Everywhere',
      callout: isId
        ? 'Chat AI (Claude/Gemini) · React & Next.js · Tailwind v4 · HTML/Vue/Svelte · Figma'
        : 'AI Chat (Claude/Gemini) · React & Next.js · Tailwind v4 · HTML/Vue/Svelte · Figma',
    },
  ];

  const iterationStages = [
    {
      step: '01',
      title: isId
        ? 'Menentukan Strategi: Fondasi Meta × Karakter Hangat'
        : 'Choosing Smart Leverage: Meta’s Foundation × Tactile Warmth',
      desc: isId
        ? 'Berangkat dari kekaguman pada antarmuka produk kreatif yang hangat seperti Shotcandy, namun menolak membuang waktu berbulan-bulan menggambar ulang tombol dasar yang rapuh — sehingga memilih Meta Astryx sebagai fondasi utamanya.'
        : 'Sparked by the joy of warm creative tools like Shotcandy while refusing to waste months redrawing fragile basic inputs — choosing Meta Astryx as the rock-solid foundation.',
    },
    {
      step: '02',
      title: isId
        ? 'Meracik Mesin Warna & Kontras Sendiri (@mehan/dna)'
        : 'Engineering an Original Color & Material Engine (@mehan/dna)',
      desc: isId
        ? 'Bukan sekadar menyalin kode warna manual: membangun sistem perhitungan warna OKLCH 7-lapis dari nol agar warna merek apa pun otomatis menghasilkan tombol 3D dan mode gelap yang tajam serta nyaman dibaca.'
        : 'Zero hardcoded palette guesswork: built a 7-layer OKLCH color & contrast engine from scratch so any brand color automatically yields crisp 3D buttons and readable dark modes.',
    },
    {
      step: '03',
      title: isId
        ? 'Membangun Theme Editor Langsung di Layar'
        : 'Crafting a Live 3-Tier Theme Editor',
      desc: isId
        ? 'Menghadirkan panel kustomisasi langsung (suasana warna, pasangan huruf WOFF2 offline, sudut, hingga detail komponen) lengkap dengan fitur Undo/Redo agar eksplorasi gaya terasa menyenangkan.'
        : 'Built an instant docked Theme Editor (surfaces, bundled offline WOFF2 fonts, corners, and component slots) with full Undo/Redo so styling feels effortless.',
    },
    {
      step: '04',
      title: isId
        ? 'Merancang Ruang Kerja 5-in-1 dari Pengalaman Produk Nyata'
        : 'Designing 5-in-1 Workspaces from Real Product Experience',
      desc: isId
        ? 'Memeras pengalaman merancang berbagai dashboard SaaS dan aplikasi enterprise menjadi satu kerangka WorkspaceLayout fleksibel yang responsif di ponsel maupun perbesaran layar 200%.'
        : 'Distilled years of designing enterprise SaaS dashboards and studios into one flexible WorkspaceLayout that adapts cleanly to mobile screens and 200% browser zoom.',
    },
    {
      step: '05',
      title: isId
        ? 'Menyusun Katalog Rapi & 12 Bab Panduan UX Manusiawi'
        : 'Curating the Catalog & 12 Human-Centered UX Chapters',
      desc: isId
        ? 'Menata seluruh komponen agar mudah dicari serta menuangkan kebiasaan desain yang baik (tata letak tenang, validasi form ramah, dan bahasa jelas) menjadi panduan interaktif.'
        : 'Organized every component for quick scanning and turned practical Product Design habits (calm layouts, forgiving forms, clear writing) into interactive lessons.',
    },
    {
      step: '06',
      title: isId
        ? 'Menghaluskan Tiap Sudut & Membuka Jembatan Lintas Platform'
        : 'Polishing Every Detail & Bridging Every Stack',
      desc: isId
        ? 'Memoles puluhan detail kecil pada dropdown, akordeon, dan tabel agar serasi, lalu memastikan tema yang sama bisa dipakai langsung di Chat AI, React, HTML biasa, maupun Figma.'
        : 'Refined subtle dropdown, accordion, and inline code details, then bridged the exact same theme to AI Chat, React, plain HTML/CSS, and Figma tokens.',
    },
  ];

  const activePreset = builtInPresets.find(preset => {
    const pSeed = preset.state.seed;
    return (
      seed.atmosphere === pSeed.atmosphere &&
      seed.accent === pSeed.accent &&
      seed.headingFont === pSeed.headingFont &&
      seed.bodyFont === pSeed.bodyFont &&
      seed.sizeBase === pSeed.sizeBase &&
      seed.segmentedStyle === pSeed.segmentedStyle
    );
  });

  const activeFontSummary =
    seed.headingFont === seed.bodyFont
      ? `${seed.headingFont} · ${seed.codeFont}`
      : `${seed.headingFont} + ${seed.bodyFont}`;

  return (
    <Stack gap={5}>
      {/* =====================================================================
          BEAT 2: COMPACT 2x6 TACTILE THEME STRIP + 1-LINE ACTIVE SUMMARY BAR
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={3}>
          <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
            <Heading level={2}>
              {isId
                ? 'Pilih suasana tampilan dalam 1 klik'
                : 'Pick a visual personality in one click'}
            </Heading>
            <Badge
              variant="pink"
              label={
                isId
                  ? `${presetCount} Tema · ${atmCount} Suasana Warna`
                  : `${presetCount} Themes · ${atmCount} Atmospheres`
              }
            />
          </HStack>

          <div
            className="mh-preset-strip"
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
              const isCurrent = activePreset?.id === preset.id;
              const tileRadius = `${Math.max(8, Math.round(10 * pSeed.radiusScale))}px`;
              const chipRadius = `${Math.max(5, Math.round(6 * pSeed.radiusScale))}px`;
              const lipShadow =
                pDna.lipPx > 0
                  ? `inset 0 -${Math.min(2, pDna.lipPx)}px 0 ${pDna.accent.buttonLip}, 0 1px 2px rgba(0,0,0,0.14)`
                  : '0 1px 2px rgba(0,0,0,0.12)';
              const tileBg =
                mode === 'dark' ? pAtm.dark.surface : pAtm.light.paper;
              const tileInk =
                mode === 'dark' ? pAtm.dark.ink : pAtm.light.ink;
              const tileBorder = isCurrent
                ? mode === 'dark'
                  ? pDna.accent.accentDark
                  : pDna.accent.accentLight
                : mode === 'dark'
                  ? pAtm.dark.line
                  : pAtm.light.line;

              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={isCurrent}
                  className={`mh-preset-tile ${isCurrent ? 'is-active' : ''}`}
                  style={{
                    borderRadius: tileRadius,
                    backgroundColor: tileBg,
                    color: tileInk,
                    borderColor: tileBorder,
                  }}
                  onClick={() => onApplyPreset(preset)}
                >
                  <span
                    className="mh-preset-cap"
                    aria-hidden="true"
                    style={{
                      borderRadius: chipRadius,
                      backgroundColor: pDna.accent.accentLight,
                      backgroundImage: pDna.accent.buttonGradient,
                      boxShadow: lipShadow,
                    }}
                  />
                  <span
                    className="mh-preset-tile-name"
                    style={{
                      fontFamily: `"${pSeed.headingFont}", var(--font-family-heading), sans-serif`,
                    }}
                  >
                    {preset.name}
                  </span>
                  {isCurrent && (
                    <span className="mh-preset-tile-check" aria-hidden="true">
                      <Check size={12} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mh-preset-active-bar">
            <div className="mh-preset-active-copy">
              <strong className="mh-preset-active-title">
                {activePreset
                  ? activePreset.name
                  : isId
                    ? 'Tema Kustom'
                    : 'Custom Theme'}
              </strong>
              <span className="mh-preset-active-sep" aria-hidden="true">
                ·
              </span>
              <span className="mh-preset-active-desc">
                {activePreset
                  ? isId
                    ? activePreset.taglineId ?? activePreset.taglineEn
                    : activePreset.taglineEn
                  : isId
                    ? `${dna.atmosphere.name} berpadu aksen ${dna.accent.name}`
                    : `${dna.atmosphere.name} paired with ${dna.accent.name} accent`}
              </span>
              <span className="mh-preset-active-font">{activeFontSummary}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              label={isId ? 'Racik di Theme Editor' : 'Open Theme Editor'}
              icon={<SlidersHorizontal size={14} />}
              onClick={onOpenEditor}
            />
          </div>
        </Stack>
      </Card>

      {/* =====================================================================
          BEAT 3: GROUNDED VISUAL STORY ("SMART STRATEGY + DEDICATED CRAFT")
         ===================================================================== */}
      <Card elevation="low">
        <Stack gap={4}>
          <div className="mh-manifesto-wrap">
            <div className="mh-manifesto-eyebrow">
              <Badge
                variant="purple"
                label={
                  isId
                    ? 'Kenapa Mehan Dibuat · Kerja Cerdas & Dirancang Penuh Dedikasi'
                    : 'Why Mehan Exists · Smart Foundation, Original Design Craft'
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
                    <span className="mh-mock-file">
                      {isId ? 'bikin-dari-nol.tsx' : 'from-scratch-ui.tsx'}
                    </span>
                  </div>
                  <div className="mh-mock-title-raw">
                    {isId ? 'Bikin semuanya dari nol' : 'Rebuilt from scratch'}
                  </div>
                  <div className="mh-mock-input-raw">
                    {isId
                      ? 'Cantik di mockup, macet di keyboard & HP'
                      : 'Pretty in mockups, breaks on keyboard & mobile'}
                  </div>
                  <div className="mh-mock-pills-raw">
                    <span>
                      ✗ {isId ? 'Bulanan habis di hal dasar' : 'Months lost on basics'}
                    </span>
                    <span>
                      ✗ {isId ? 'Dropdown & modal rawan bug' : 'Fragile dropdowns'}
                    </span>
                  </div>
                  <div className="mh-mock-btn-raw">
                    {isId ? 'Tampilan kaku & lelah dirawat' : 'Flat look & heavy upkeep'}
                  </div>
                </div>
                <p className="mh-hand-caption">
                  {isId
                    ? 'Kerja keras sendirian — habis energi mengulang roda dari nol'
                    : 'Hard work alone — exhausting months reinventing basic plumbing'}
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
                      ? 'Kolom input cekung · Nyaman di semua layar'
                      : 'Soft recessed input · Smooth on every device'}
                  </div>
                  <div className="mh-mock-pills-mehan">
                    <span>✓ {isId ? 'Fondasi teruji Meta' : 'Meta-proven core'}</span>
                    <span>✓ {isId ? 'Terang/Gelap otomatis' : 'Auto Light & Dark'}</span>
                  </div>
                  <div className="mh-mock-btn-mehan">
                    {isId ? 'Tombol 3D hangat & siap rilis' : 'Warm 3D button · Ready to ship'}
                  </div>
                </div>
                <p className="mh-hand-caption is-accent">
                  {isId
                    ? 'Langkah cerdas — mesin kokoh di bawah, karya penuh hati di atas'
                    : 'Smart craft — proven engine underneath, built with heart on top'}
                </p>
              </div>
            </div>

            <HandDrawnConvergingArrows />

            <div className="mh-thesis-block">
              <h2 className="mh-thesis-heading">
                {isId ? (
                  <>
                    Untuk apa buang waktu berbulan-bulan membuat ulang tombol dasar — kalau seluruh energi bisa dicurahkan pada{' '}
                    <em className="mh-serif-accent">karakter & kenyamanan produknya</em>?
                  </>
                ) : (
                  <>
                    Why spend months rebuilding basic buttons & dropdowns — when you can pour 100% of your craft into{' '}
                    <em className="mh-serif-accent">how the product feels</em>?
                  </>
                )}
              </h2>
              <p className="mh-thesis-copy">
                {isId ? (
                  <>
                    Mehan berdiri di atas{' '}
                    <a
                      href="https://astryx.atmeta.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mh-inline-ext-link"
                    >
                      <strong>Meta Astryx</strong>
                      <ExternalLink size={12} />
                    </a>{' '}
                    — fondasi komponen <em>open-source</em> resmi Meta yang telah teruji 8 tahun di 13.000+ aplikasi internal. Terinspirasi dari antarmuka hangat ala <em>Shotcandy</em>, Mehan merancang sendiri mesin warna, ruang kerja, dan panduan UX di atasnya:
                  </>
                ) : (
                  <>
                    Mehan stands on{' '}
                    <a
                      href="https://astryx.atmeta.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mh-inline-ext-link"
                    >
                      <strong>Meta Astryx</strong>
                      <ExternalLink size={12} />
                    </a>{' '}
                    — Meta’s official open-source component foundation proven over 8 years across 13,000+ internal apps. Sparked by warm creative tools like <em>Shotcandy</em>, Mehan crafts the color engine, workspaces, and UX guides on top:
                  </>
                )}
              </p>
            </div>

            <div className="mh-funnel-spine" role="list" aria-label="Mehan architectural layers">
              {funnelSteps.map((item, idx) => (
                <React.Fragment key={`${item.stat}-${idx}`}>
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
                ? 'Lihat cerita dapur pembuatannya: 6 tahap riset, perancangan & penyempurnaan'
                : 'Read how it was built: 6 stages of research, design craft & engineering polish'
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
