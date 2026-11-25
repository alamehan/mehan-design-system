import React from 'react';
import {
  Badge,
  Collapsible,
  Dialog,
  DialogHeader,
  Divider,
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
import type {StudioLang} from './studioState';

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

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      width={660}
      maxHeight="84dvh"
      purpose="info"
    >
      <Layout
        header={
          <DialogHeader
            title={isId ? 'Tentang Mehan Design System' : 'About Mehan Design System'}
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
                <Tab value="how" label={isId ? 'Cara Kerja' : 'How It Works'} />
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
                          ? 'Pilih salah satu dari 12 tema siap pakai di halaman Ringkasan, atau buka Theme Editor di kanan atas untuk meracik warna, huruf, dan sudut sendiri.'
                          : 'Pick one of the 12 ready-made themes on the Overview tab, or open Theme Editor in the top-right to customize colors, fonts, and corners live.'}
                      </li>
                      <li>
                        {isId
                          ? 'Jelajahi tab Komponen, Pola & Templat, serta UX & Bahasa untuk mencoba elemen UI langsung beserta panduan tata letaknya.'
                          : 'Browse Components, Patterns & Templates, and UX & Copy to test interactive components, page layouts, and clear interface writing rules.'}
                      </li>
                      <li>
                        {isId
                          ? 'Gulir ke bagian bawah Ringkasan lalu salin hasil 1-klik sesuai kebutuhanmu: prompt untuk Chat AI (Claude/Gemini), setup proyek React/Next.js, file CSS mandiri, atau token Figma.'
                          : 'Scroll to the Quickstart card on Overview and copy your 1-click output: an AI Chat prompt (Claude/Gemini), React/Next.js setup, standalone CSS, or Figma tokens.'}
                      </li>
                    </ol>
                  </Stack>
                </Stack>
              )}

              {tab === 'how' && (
                <Stack gap={3}>
                  <Text color="secondary">
                    {isId
                      ? 'Alih-alih menggambar ulang tombol dan dropdown dari nol yang rawan bug, Mehan dibagi menjadi 3 lapisan bersih yang saling terhubung:'
                      : 'Instead of redrawing fragile buttons and dropdowns from zero, Mehan is organized into three clean, connected layers:'}
                  </Text>
                  <ol className="mh-info-steps">
                    <li>
                      <strong>
                        {isId
                          ? '1. Mesin Warna & Material (@mehan/dna): '
                          : '1. Color & Material Engine (@mehan/dna): '}
                      </strong>
                      {isId
                        ? 'Menghitung otomatis gradasi tombol 3D, kolom input cekung, dan kontras teks yang aman dibaca di mode Terang maupun Gelap dari warna aksen apa pun.'
                        : 'Automatically computes tactile 3D button lips, soft recessed inputs, and readable Light/Dark text contrast from any brand color.'}
                    </li>
                    <li>
                      <strong>
                        {isId
                          ? '2. Komponen & Tata Letak Ruang Kerja (@mehan/astryx): '
                          : '2. Components & Workspaces (@mehan/astryx): '}
                      </strong>
                      {isId
                        ? 'Menjaga 100+ komponen inti Meta Astryx tetap utuh, lalu menambahkan 35+ komponen ruang kerja (dashboard, split-screen, kanvas, grafik, pemilih warna, editor kode, hingga simpan draf otomatis).'
                        : 'Keeps 100+ Meta Astryx core components intact while adding 35+ workspace tools (5-in-1 app layouts, charts, color pickers, editors, and auto-saved drafts).'}
                    </li>
                    <li>
                      <strong>
                        {isId
                          ? '3. Jembatan Lintas Platform (@mehan/portable): '
                          : '3. Cross-Platform Portability (@mehan/portable): '}
                      </strong>
                      {isId
                        ? 'Menerjemahkan tema aktifmu ke proyek non-React (HTML murni, Vue, Svelte, Astro), paket prompt tunggal untuk Chat AI, serta file token standar Figma.'
                        : 'Translates your active theme into standalone HTML/CSS (for Vue, Svelte, Astro), single-prompt AI kits, and standard Figma token files.'}
                    </li>
                  </ol>
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
                          ? 'Nol. Seluruh 10 keluarga huruf (WOFF2), ikon, dan gaya visual sudah dibundel mandiri tanpa memanggil server pihak ketiga.'
                          : 'None. All 10 typeface families (WOFF2), icons, and stylesheets are bundled locally with zero third-party CDN or analytics requests.'}
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
