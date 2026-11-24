import type {StudioLang} from './studioState';

export const STUDIO_COPY = {
  id: {
    nav: {
      overview: 'Ringkasan',
      components: 'Komponen',
      templates: 'Templat',
      uxCopy: 'UX & Bahasa',
      maintain: 'Perawatan',
      customize: 'Theme Editor',
      light: 'Mode terang',
      dark: 'Mode gelap',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle: 'Permukaan taktil yang tenang, kustomisasi penuh di atas Meta Astryx.',
      heroDesc:
        'Memadukan 107 komponen aksesibel lintas 12 kategori resmi Meta Astryx dengan fisika material OKLCH, 10 font bundel offline, Theme Editor 3-tingkat, dan kitab standar UX & microcopy.',
      ctaCustomize: 'Buka Theme Editor',
      ctaCopyAiKit: 'Salin kit AI',
      ctaExploreComponents: 'Jelajahi 107 komponen',
      mapTitle: 'Arsitektur 3 lapis bebas fork',
      mapSub:
        'Perilaku WAI-ARIA tetap murni milik Meta Astryx, sementara jiwa visual, ergonomi UX, dan portabilitas dikelola satu sumber DNA.',
      layer1Tag: 'Lapis 1 · Mesin aksesibilitas',
      layer1Title: 'Meta Astryx (~0.7.17)',
      layer1Desc:
        'Menangani primitif WAI-ARIA lintas 12 kategori resmi, fokus modal, navigasi keyboard, ukuran sentuh otomatis, dan validator CLI.',
      layer2Tag: 'Lapis 2 · Jiwa taktil & UX',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Menyuntikkan bibir tombol 3D OKLCH, pil Espresso Shotcandy, sumur input cekung, 4 kontrol presisi, 10 font WOFF2, dan 8 dokumen AI Astryx.',
      layer3Tag: 'Lapis 3 · Portabilitas instan',
      layer3Title: 'Mehan Portable + Token W3C',
      layer3Desc:
        'Menghasilkan CSS/JS mandiri untuk Claude Artifacts, Gemini Canvas, HTML murni, Vue, Svelte, serta JSON token W3C untuk Figma.',
      installTitle: 'Pasang sesuai kebutuhan proyek',
      installSub:
        'Pilih jalur mulai paling ringkas di bawah. Kode konfigurasi lengkap tersedia saat dibutuhkan.',
      sourceLocal: 'Paket lokal D:\\',
      sourceNpm: 'Publik npm',
      cssPlain: 'CSS standar',
      cssTailwind: 'Tailwind v4',
      cardAiBadge: 'Prototipe instan',
      cardAiTitle: '1. Chat AI (Claude / Gemini)',
      cardAiDesc:
        'Salin 1 paket prompt berisi token, komponen .mh-*, dan aturan UX untuk prototipe single-HTML.',
      cardAiBtn: 'Salin kit AI',
      cardAiDownload: 'Unduh starter HTML',
      cardReactBadge: 'Aplikasi produksi',
      cardReactTitle: '2. React, Next.js, atau Vite',
      cardReactDesc:
        'Tempel prompt setup ke AI coding agent atau jalankan perintah inisialisasi satu baris.',
      cardReactAgentBtn: 'Salin prompt setup',
      cardReactCmdBtn: 'Salin perintah CLI',
      cardHtmlBadge: 'Tanpa bundler',
      cardHtmlTitle: '3. HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Gunakan satu file mehan-portable.css ringan (~7 KB) tanpa ketergantungan React.',
      cardHtmlCssBtn: 'Salin Portable CSS',
      cardHtmlCdnBtn: 'Unduh starter HTML',
    },
    components: {
      title: 'Katalog komponen interaktif',
      subtitle:
        'Pilih kategori di samping untuk fokus memindai spesimen secara proporsional, uji interaksinya langsung, atau buka kode JSX sesuai kebutuhan.',
      searchPlaceholder: 'Cari dari 107 komponen (Button, Table, AppShell, Calendar, PrecisionSlider)...',
    },
    ux: {
      title: 'Panduan standar UX & microcopy',
      subtitle:
        'Enam bab interaktif yang mengatur pengelompokan informasi (chunking), pengungkapan bertahap (progressive disclosure), pemotongan teks (truncation), kondisi pemulihan, dan tata bahasa produk.',
      doLabel: 'Standar Mehan (lakukan)',
      dontLabel: 'Anti-pola (hindari)',
    },
    templates: {
      title: 'Theme Showcase & templat produksi',
      subtitle:
        'Uji ketahanan tema, tipografi, dan kontras secara langsung pada halaman tolok ukur resmi Meta Astryx, dasbor SaaS, halaman pengaturan, dan studio 3D.',
      tabShowcase: 'Theme Showcase (resmi)',
      tabDashboard: 'Dasbor SaaS',
      tabSettings: 'Pengaturan bertahap',
      tabCanvas: 'Studio 3D Shotcandy',
    },
    maintain: {
      title: 'Perawatan & ekspor sistem',
      subtitle:
        'Simpan tema aktif ke repositori, periksa pembaruan Meta Astryx secara aman, ubah scope paket npm, atau unduh token W3C untuk Figma.',
    },
  },
  en: {
    nav: {
      overview: 'Overview',
      components: 'Components',
      templates: 'Templates',
      uxCopy: 'UX & Copy',
      maintain: 'Maintain',
      customize: 'Theme Editor',
      light: 'Light mode',
      dark: 'Dark mode',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle: 'Calm tactile surfaces, unrestricted theming on Meta Astryx.',
      heroDesc:
        'Pairs 107 accessible primitives across all 12 official Meta Astryx categories with perceptual OKLCH materials, 10 offline-bundled typefaces, a chunked 3-tier Theme Editor, and a complete UX & microcopy playbook.',
      ctaCustomize: 'Open Theme Editor',
      ctaCopyAiKit: 'Copy AI kit',
      ctaExploreComponents: 'Explore 107 components',
      mapTitle: 'Zero-fork three-layer architecture',
      mapSub:
        'Core WAI-ARIA behavior stays untouched in Meta Astryx while tactile materials, UX laws, and portable outputs share a single DNA source.',
      layer1Tag: 'Layer 1 · Behavior & accessibility',
      layer1Title: 'Meta Astryx (~0.7.17)',
      layer1Desc:
        'Delivers WAI-ARIA primitives across 12 categories, focus traps, keyboard navigation, coarse-pointer adaptation, and strict CLI checks.',
      layer2Tag: 'Layer 2 · Tactile soul & UX',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Adds OKLCH 3D button lips, Shotcandy Espresso pills, recessed wells, 4 precision controls, 10 bundled WOFF2 fonts, and 8 agent UX/component docs.',
      layer3Tag: 'Layer 3 · Zero-setup bridge',
      layer3Title: 'Mehan Portable + W3C tokens',
      layer3Desc:
        'Emits standalone CSS/JS for Claude Artifacts, Gemini Canvas, Vanilla HTML, Vue, Svelte, plus W3C DTCG JSON tokens for Figma.',
      installTitle: 'Start in any project stack',
      installSub:
        'Pick your workflow below. Full configuration snippets stay tucked until you need them.',
      sourceLocal: 'Local D:\\ package',
      sourceNpm: 'Public npm',
      cssPlain: 'Plain CSS',
      cssTailwind: 'Tailwind v4',
      cardAiBadge: 'Fastest ideation',
      cardAiTitle: '1. AI chat prototype (Claude / Gemini)',
      cardAiDesc:
        'Copy one self-contained prompt bundling tokens, .mh-* classes, and UX rules for single-HTML artifacts.',
      cardAiBtn: 'Copy AI kit',
      cardAiDownload: 'Download starter HTML',
      cardReactBadge: 'Production apps',
      cardReactTitle: '2. React, Next.js, or Vite',
      cardReactDesc:
        'Paste the agent setup prompt into your coding assistant or run the single-line CLI initializer.',
      cardReactAgentBtn: 'Copy setup prompt',
      cardReactCmdBtn: 'Copy CLI command',
      cardHtmlBadge: 'Framework-agnostic',
      cardHtmlTitle: '3. HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Drop in one lightweight mehan-portable.css (~7 KB) stylesheet with zero React dependency.',
      cardHtmlCssBtn: 'Copy Portable CSS',
      cardHtmlCdnBtn: 'Download starter HTML',
    },
    components: {
      title: 'Interactive component catalog',
      subtitle:
        'Browse one category at a time for calm scanning, test real keyboard and pointer interactions on clean stages, or inspect JSX on demand.',
      searchPlaceholder: 'Search all 107 components (Button, Table, AppShell, Calendar, PrecisionSlider)...',
    },
    ux: {
      title: 'UX architecture & microcopy playbook',
      subtitle:
        'Six interactive chapters governing information grouping & chunking, progressive disclosure, truncation & numerals, recovery states, and bilingual product copy.',
      doLabel: 'Mehan standard (do)',
      dontLabel: "Anti-pattern (don't)",
    },
    templates: {
      title: 'Official Theme Showcase & templates',
      subtitle:
        'Stress-test typography, nested card contrast, tables, and tactile controls across the official Meta Astryx Theme Showcase and production archetypes.',
      tabShowcase: 'Theme Showcase (official)',
      tabDashboard: 'SaaS dashboard',
      tabSettings: 'Progressive settings',
      tabCanvas: 'Shotcandy 3D studio',
    },
    maintain: {
      title: 'System maintenance & token export',
      subtitle:
        'Commit active theme defaults, validate Meta Astryx upgrades, switch npm package scopes, or export W3C tokens for Figma.',
    },
  },
} as const;

export type StudioCopy = (typeof STUDIO_COPY)[StudioLang];
