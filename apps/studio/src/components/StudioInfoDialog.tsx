import React from 'react';
import {
  Badge,
  Collapsible,
  Dialog,
  DialogHeader,
  Divider,
  Grid,
  HStack,
  Heading,
  Layout,
  LayoutContent,
  Stack,
  Tab,
  TabList,
  Text,
} from '@astryxdesign/core';
import {ExternalLink, FolderGit2, Globe, Heart, ShieldCheck, Sparkles} from 'lucide-react';
import {MehanLogoMark} from './MehanLogoMark';
import type {StudioLang} from '../studioState';

export type StudioInfoTab = 'overview' | 'how' | 'privacy' | 'shortcuts' | 'about';

interface StudioInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tab: StudioInfoTab;
  onTabChange: (tab: StudioInfoTab) => void;
  lang: StudioLang;
}

export function StudioInfoDialog({
  isOpen,
  onOpenChange,
  tab,
  onTabChange,
  lang,
}: StudioInfoDialogProps) {
  const isId = lang === 'id';

  const shortcuts = isId
    ? [
        {keys: '?', desc: 'Membuka lembar daftar pintasan keyboard'},
        {keys: '/', desc: 'Langsung fokus ke kolom pencarian katalog komponen'},
        {keys: 'Ctrl / ⌘ + .', desc: 'Membuka atau menutup panel Theme Editor di kanan'},
        {keys: 'Ctrl / ⌘ + Z', desc: 'Membatalkan perubahan tema terakhir (Undo)'},
        {keys: 'Ctrl / ⌘ + Shift + Z', desc: 'Mengulangi perubahan tema (Redo)'},
        {keys: 'Esc', desc: 'Menutup jendela dialog, menu dropdown, atau popover aktif'},
      ]
    : [
        {keys: '?', desc: 'Open the keyboard shortcuts reference sheet'},
        {keys: '/', desc: 'Jump straight to the component catalog search box'},
        {keys: 'Ctrl / ⌘ + .', desc: 'Open or close the docked Theme Editor'},
        {keys: 'Ctrl / ⌘ + Z', desc: 'Undo your last theme adjustment'},
        {keys: 'Ctrl / ⌘ + Shift + Z', desc: 'Redo a reverted theme adjustment'},
        {keys: 'Esc', desc: 'Dismiss the active dialog, dropdown menu, or popover'},
      ];

  const iterationStages = [
    {
      step: '01',
      title: isId
        ? 'Strategi Cerdas: Fondasi Meta × Karakter Hangat'
        : 'Smart Leverage: Meta’s Foundation × Tactile Warmth',
      desc: isId
        ? 'Terinspirasi dari antarmuka produk kreatif yang hangat namun menolak membuang waktu berbulan-bulan membuat ulang tombol dasar yang rapuh — sehingga memilih Meta Astryx (teruji 8 tahun di 13.000+ aplikasi) sebagai fondasi utamanya.'
        : 'Sparked by warm creative tools while refusing to waste months redrawing fragile basic inputs — choosing Meta Astryx (proven over 8 years across 13,000+ apps) as the core foundation.',
    },
    {
      step: '02',
      title: isId
        ? 'Mesin Warna & Kontras Perseptual (@mehan/dna)'
        : 'Perceptual Color & Material Engine (@mehan/dna)',
      desc: isId
        ? 'Membangun perhitungan warna OKLCH 7-lapis dari nol agar warna merek apa pun otomatis menghasilkan tombol 3D dan mode gelap yang tajam serta lulus standar WCAG 2.2 AA.'
        : 'Built a 7-layer OKLCH color & contrast engine from scratch so any brand color automatically yields crisp tactile buttons and WCAG 2.2 AA readable dark modes.',
    },
    {
      step: '03',
      title: isId
        ? 'Theme Editor Langsung di Layar'
        : 'Live 3-Tier Docked Theme Editor',
      desc: isId
        ? 'Menghadirkan panel kustomisasi langsung (suasana warna, pasangan huruf WOFF2 offline, sudut, hingga override komponen) lengkap dengan Undo/Redo.'
        : 'Crafted an instant docked Theme Editor (surfaces, bundled offline WOFF2 fonts, corners, and component slots) with coalescing Undo/Redo.',
    },
    {
      step: '04',
      title: isId
        ? 'Ruang Kerja 5-in-1 dari Produk Nyata'
        : '5-in-1 Workspaces from Real Products',
      desc: isId
        ? 'Memadatkan pengalaman merancang berbagai dashboard SaaS dan studio kreatif menjadi kerangka WorkspaceLayout yang responsif di ponsel maupun zoom 200%.'
        : 'Distilled enterprise SaaS dashboard and studio patterns into one WorkspaceLayout that adapts cleanly to mobile screens and 200% browser zoom.',
    },
    {
      step: '05',
      title: isId
        ? 'Katalog Rapi & 12 Bab Panduan UX'
        : 'Unified Catalog & 12 Human UX Chapters',
      desc: isId
        ? 'Menyelaraskan proporsi 135+ komponen dan menuangkan kebiasaan desain yang tenang serta bahasa antarmuka EN/ID yang ramah menjadi panduan interaktif.'
        : 'Harmonized proportions across 135+ components and turned calm layout habits and clear bilingual microcopy into interactive Do/Don’t lessons.',
    },
    {
      step: '06',
      title: isId
        ? 'Jembatan Ekspor Lintas Platform'
        : '1-Click Cross-Stack Portability',
      desc: isId
        ? 'Memastikan tema yang sama persis dapat diekspor dalam 1 klik ke Chat AI (Claude/Gemini), React & Tailwind v4, HTML/CSS murni, maupun token W3C Figma.'
        : 'Bridged the exact same active theme in one click to AI Chat kits, React & Tailwind v4, standalone HTML/CSS, and W3C Figma tokens.',
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      width={720}
      maxHeight="85dvh"
      purpose="info"
    >
      <Layout
        header={
          <DialogHeader
            title={isId ? 'Tentang & Panduan Mehan Design System' : 'About & Guide · Mehan Design System'}
            onOpenChange={onOpenChange}
          />
        }
        content={
          <LayoutContent>
            {isOpen ? (
              <Stack gap={4}>
                <TabList
                  role="tablist"
                  aria-label={isId ? 'Informasi Mehan Design System' : 'About Mehan Design System'}
                  value={tab}
                  onChange={val => onTabChange(val as StudioInfoTab)}
                  overflow="auto"
                >
                  <Tab value="overview" label={isId ? 'Ringkasan' : 'Overview'} />
                  <Tab value="how" label={isId ? 'Filosofi & Arsitektur' : 'Philosophy & Craft'} />
                  <Tab value="privacy" label={isId ? 'Data & Privasi' : 'Data & Privacy'} />
                  <Tab value="shortcuts" label={isId ? 'Pintasan' : 'Shortcuts'} />
                  <Tab value="about" label={isId ? 'Tentang & Pembuat' : 'About & Creator'} />
                </TabList>

                {tab === 'overview' && (
                  <Stack gap={3}>
                    <Text weight="semibold">
                      {isId
                        ? 'Design system hangat, rapi, dan siap pakai untuk aplikasi web maupun alur kerja AI.'
                        : 'A warm, tactile design system crafted for modern web apps and AI workflows.'}
                    </Text>
                    <Text color="secondary">
                      {isId
                        ? 'Mehan Design System memadukan fondasi komponen open-source Meta Astryx yang sudah matang dengan karakter permukaan hangat, puluhan komponen ruang kerja tambahan, serta panduan praktis UX & penulisan teks — sehingga desainer, developer, maupun pembuat produk berbantuan AI bisa merilis antarmuka yang berkarakter tanpa harus merakit komponen dasar dari nol.'
                        : 'Mehan Design System pairs Meta Astryx’s proven open-source component foundation with warm tactile surfaces, extra workspace building blocks, and practical UX & copywriting guides — helping designers, developers, and AI builders ship distinctive interfaces without reinventing basic UI plumbing from scratch.'}
                    </Text>

                    <Divider variant="subtle" />

                    <Stack gap={1.5}>
                      <Heading level={4}>
                        {isId ? 'Cara memakainya dalam 3 langkah' : 'How to use it in 3 steps'}
                      </Heading>
                      <ol className="mh-info-steps">
                        <li>
                          {isId
                            ? 'Klik salah satu dari 12 tema siap pakai langsung di bagian Hero (atau buka Theme Editor di kanan atas untuk meracik warna, huruf, dan sudut sendiri).'
                            : 'Click any of the 12 ready-made moods right inside the Hero dock, or open Theme Editor in the top-right to customize colors, fonts, and corners live.'}
                        </li>
                        <li>
                          {isId
                            ? 'Jelajahi tab Komponen, Pola & Templat, serta UX & Bahasa untuk mencoba 135+ elemen UI langsung beserta panduan tata letaknya.'
                            : 'Browse Components, Patterns & Templates, and UX & Copy to test 135+ interactive components, page layouts, and clear interface writing rules.'}
                        </li>
                        <li>
                          {isId
                            ? 'Salin hasil 1-klik di kartu Quickstart bawah: prompt tunggal untuk Chat AI (Claude/Gemini), setup React/Next.js, file CSS mandiri, atau token Figma.'
                            : 'Copy your 1-click output from the Quickstart card: a single prompt for AI Chat (Claude/Gemini), React/Next.js setup, standalone CSS, or Figma tokens.'}
                        </li>
                      </ol>
                    </Stack>
                  </Stack>
                )}

                {tab === 'how' && (
                  <Stack gap={3}>
                    <Stack gap={1.5}>
                      <Heading level={4}>
                        {isId
                          ? 'Kenapa berdiri di atas Meta Astryx, bukan bikin dari nol?'
                          : 'Why stand on Meta Astryx instead of rebuilding from zero?'}
                      </Heading>
                      <Text color="secondary">
                        {isId ? (
                          <>
                            Membangun dropdown, modal, dan navigasi keyboard dari nol menghabiskan waktu berbulan-bulan dan rawan bug di layar HP. Mehan berdiri langsung di atas{' '}
                            <a
                              href="https://astryx.atmeta.com"
                              target="_blank"
                              rel="noreferrer"
                              className="mh-inline-ext-link"
                            >
                              <strong>Meta Astryx</strong>
                              <ExternalLink size={12} />
                            </a>{' '}
                            (teruji 8 tahun di 13.000+ aplikasi Meta) untuk keandalan fondasi, sehingga 100% energi desain tercurah pada karakter taktil dan kemudahan lintas stack dalam 3 lapisan:
                          </>
                        ) : (
                          <>
                            Reinventing focus traps, ARIA menus, and keyboard tables from scratch burns months on fragile plumbing. Mehan stands directly on{' '}
                            <a
                              href="https://astryx.atmeta.com"
                              target="_blank"
                              rel="noreferrer"
                              className="mh-inline-ext-link"
                            >
                              <strong>Meta Astryx</strong>
                              <ExternalLink size={12} />
                            </a>{' '}
                            (battle-tested over 8 years across 13,000+ Meta apps) so 100% of design craft goes into tactile warmth and cross-stack portability across 3 clean layers:
                          </>
                        )}
                      </Text>
                    </Stack>

                    <ol className="mh-info-steps">
                      <li>
                        <strong>
                          {isId
                            ? '1. Mesin Warna & Material (@mehan/dna): '
                            : '1. Color & Material Engine (@mehan/dna): '}
                        </strong>
                        {isId
                          ? 'Menghitung otomatis gradasi tombol 3D, kolom input cekung, dan kontras teks WCAG 2.2 AA di mode Terang maupun Gelap dari warna aksen apa pun.'
                          : 'Automatically computes tactile 3D button lips, soft recessed inputs, and WCAG 2.2 AA Light/Dark text contrast from any brand color.'}
                      </li>
                      <li>
                        <strong>
                          {isId
                            ? '2. Komponen & Ruang Kerja (@mehan/astryx): '
                            : '2. Components & Workspaces (@mehan/astryx): '}
                        </strong>
                        {isId
                          ? 'Menjaga 100+ komponen inti Meta Astryx tetap utuh, lalu menambahkan 35+ komponen ruang kerja (5-in-1 app shells, grafik, pemilih warna, editor kode, hingga auto-draft).'
                          : 'Keeps 100+ Meta Astryx core components intact while adding 35+ workspace blocks (5-in-1 app layouts, charts, color pickers, editors, and auto-saved drafts).'}
                      </li>
                      <li>
                        <strong>
                          {isId
                            ? '3. Jembatan Lintas Platform (@mehan/portable): '
                            : '3. Cross-Platform Portability (@mehan/portable): '}
                        </strong>
                        {isId
                          ? 'Menerjemahkan tema aktifmu ke proyek HTML murni / Vue / Svelte, paket prompt tunggal untuk Chat AI, serta file token standar W3C Figma.'
                          : 'Translates your active theme into standalone HTML/CSS (for Vue, Svelte, Astro), single-prompt AI kits, and standard W3C Figma token files.'}
                      </li>
                    </ol>

                    <Divider variant="subtle" />

                    <Stack gap={2}>
                      <Heading level={4}>
                        {isId
                          ? '6 tahap riset, perancangan & penyempurnaan'
                          : '6 stages of research, design craft & polish'}
                      </Heading>
                      <Grid columns={{minWidth: 240, max: 2, repeat: 'fit'}} gap={2}>
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
                  </Stack>
                )}

                {tab === 'privacy' && (
                  <Stack gap={3}>
                    <HStack gap={2} vAlign="center">
                      <ShieldCheck size={18} />
                      <Text weight="semibold">
                        {isId
                          ? '100% berjalan di perangkatmu — tanpa pelacak & tanpa ketergantungan internet.'
                          : '100% local in your browser — zero trackers & zero external network calls.'}
                      </Text>
                    </HStack>
                    <dl className="mh-info-dl">
                      <div className="mh-info-dl-row">
                        <dt>{isId ? 'Tempat berjalan' : 'Where it runs'}</dt>
                        <dd>
                          {isId
                            ? 'Seluruh Studio berjalan langsung di browser — baik saat dibuka lewat GitHub Pages maupun diklik dua kali secara offline lewat file STUDIO.html.'
                            : 'Everything runs directly inside your browser — whether opened on GitHub Pages or double-clicked offline via STUDIO.html.'}
                        </dd>
                      </div>
                      <div className="mh-info-dl-row">
                        <dt>{isId ? 'Penyimpanan tema' : 'Saved themes'}</dt>
                        <dd>
                          {isId
                            ? 'Preferensi bahasa, mode Terang/Gelap, dan racikan tema disimpan lokal di browser perangkatmu (localStorage) agar tidak hilang saat halaman dimuat ulang.'
                            : 'Your language, Light/Dark mode, and custom theme presets stay in your browser’s localStorage on this device.'}
                        </dd>
                      </div>
                      <div className="mh-info-dl-row">
                        <dt>{isId ? 'Data keluar' : 'External requests'}</dt>
                        <dd>
                          {isId
                            ? 'Nol. Seluruh 10+ keluarga huruf (WOFF2), ikon, dan gaya visual sudah dibundel mandiri tanpa memanggil server pihak ketiga.'
                            : 'None. All 10+ typeface families (WOFF2), icons, and stylesheets are bundled locally with zero third-party CDN or analytics requests.'}
                        </dd>
                      </div>
                    </dl>
                  </Stack>
                )}

                {tab === 'shortcuts' && (
                  <Stack gap={3}>
                    <dl className="mh-info-dl">
                      {shortcuts.map(item => (
                        <div key={item.keys} className="mh-info-dl-row">
                          <dt>
                            <code className="studio-inline-code">{item.keys}</code>
                          </dt>
                          <dd>{item.desc}</dd>
                        </div>
                      ))}
                    </dl>
                  </Stack>
                )}

                {tab === 'about' && (
                  <Stack gap={3}>
                    <div className="mh-about-hero">
                      <MehanLogoMark size={68} />
                      <div className="mh-about-hero-meta">
                        <HStack gap={2} vAlign="center" wrap="wrap">
                          <Heading level={3}>Mehan Design System</Heading>
                          <Badge variant="info" label="v1.0.0" />
                          <Badge variant="neutral" label="MIT License" />
                        </HStack>
                        <Text color="secondary">
                          {isId
                            ? 'Dirancang dengan cinta, ketelitian desain produk, dan disiplin rekayasa sistem.'
                            : 'Crafted with love, product design sensitivity, and systems engineering rigor.'}
                        </Text>
                      </div>
                    </div>

                    {/* Creator Card: Raihan Allaam (@alamehan) */}
                    <div className="mh-creator-card">
                      <Stack gap={2}>
                        <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                          <Stack gap={0.5}>
                            <HStack gap={1.5} vAlign="center">
                              <Heart size={14} style={{color: 'var(--color-text-accent)'}} />
                              <Text type="supporting" weight="semibold" color="secondary">
                                {isId ? 'Pembuat & Perancang Utama' : 'Created & Designed by'}
                              </Text>
                            </HStack>
                            <Heading level={4}>
                              M. Raihan Rafiiful Allaam (@alamehan)
                            </Heading>
                          </Stack>
                          <Badge
                            variant="pink"
                            label="Product Designer & Product Engineer"
                          />
                        </HStack>

                        <Text color="secondary">
                          {isId
                            ? 'Lahir dari pengalaman nyata merancang dan membangun berbagai platform SaaS enterprise, super-app, serta studio kerja berbasis AI dari hulu ke hilir. Mehan dibuat untuk menjembatani kepekaan seorang Product Designer (kehangatan warna, tipografi, tata letak yang tenang, dan bahasa yang ramah manusia) dengan ketangguhan rekayasa produksi yang siap dipakai lintas tim maupun agen AI.'
                            : 'Born from hands-on experience designing and engineering enterprise SaaS suites, super-apps, and AI workspaces end-to-end. Mehan bridges a Product Designer’s eye for warmth, typography, calm spatial hierarchy, and human copy with production-grade accessibility and cross-stack engineering.'}
                        </Text>

                        <HStack gap={3} wrap="wrap" vAlign="center">
                          <a
                            href="https://alamehan.github.io"
                            target="_blank"
                            rel="noreferrer"
                            className="mh-inline-ext-link"
                          >
                            <Globe size={14} />
                            <span>alamehan.github.io</span>
                            <ExternalLink size={12} />
                          </a>
                          <a
                            href="https://github.com/alamehan/mehan-design-system"
                            target="_blank"
                            rel="noreferrer"
                            className="mh-inline-ext-link"
                          >
                            <FolderGit2 size={14} />
                            <span>github.com/alamehan/mehan-design-system</span>
                            <ExternalLink size={12} />
                          </a>
                        </HStack>
                      </Stack>
                    </div>

                    <Collapsible
                      defaultIsOpen={false}
                      trigger={
                        isId
                          ? 'Fondasi Open-Source, Inspirasi & Lisensi Huruf'
                          : 'Open-Source Foundations, Inspiration & Font Licenses'
                      }
                    >
                      <Stack gap={2}>
                        <Text type="supporting" color="secondary">
                          <Sparkles
                            size={13}
                            style={{display: 'inline', verticalAlign: '-2px', marginRight: 5}}
                          />
                          {isId
                            ? 'Fondasi perilaku komponen & CLI dibangun di atas Meta Astryx (@astryxdesign/core & @astryxdesign/cli oleh Meta Platforms, MIT). Percikan awal eksplorasi permukaan hangat terinspirasi dari antarmuka produk kreatif seperti Shotcandy, lalu dikembangkan mandiri menjadi sistem warna OKLCH, 12 arah tema, 35+ komponen ruang kerja, dan panduan UX utuh.'
                            : 'Core behavioral primitives and CLI tooling stand on Meta Astryx (@astryxdesign/core & @astryxdesign/cli by Meta Platforms, MIT). Early tactile surface exploration was sparked by warm creative tools like Shotcandy and engineered from the ground up into Mehan’s own color math, 12 themes, 35+ workspace extensions, and bilingual UX playbook.'}
                        </Text>
                        <Text type="supporting" color="secondary">
                          {isId
                            ? 'Seluruh huruf bawaan (Bricolage Grotesque, Figtree, Plus Jakarta Sans, Albert Sans, Outfit, Poppins, Montserrat, Fraunces, Crimson Text, Geist Mono, JetBrains Mono) berlisensi SIL Open Font License 1.1, dan ikon antarmuka menggunakan Lucide (ISC).'
                            : 'Bundled typefaces (Bricolage Grotesque, Figtree, Plus Jakarta Sans, Albert Sans, Outfit, Poppins, Montserrat, Fraunces, Crimson Text, Geist Mono, JetBrains Mono) are licensed under SIL Open Font License 1.1; icons use Lucide (ISC).'}
                        </Text>
                      </Stack>
                    </Collapsible>
                  </Stack>
                )}
              </Stack>
            ) : null}
          </LayoutContent>
        }
      />
    </Dialog>
  );
}
