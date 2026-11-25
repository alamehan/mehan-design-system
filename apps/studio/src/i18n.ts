import type {StudioLang} from './studioState';

export const STUDIO_COPY = {
  id: {
    nav: {
      overview: 'Ringkasan',
      components: 'Komponen',
      templates: 'Pola & Templat',
      uxCopy: 'UX & Bahasa',
      maintain: 'Perawatan',
      customize: 'Theme Editor',
      shortcuts: 'Pintasan keyboard (?)',
      light: 'Mode terang',
      dark: 'Mode gelap',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle: 'Permukaan taktil yang tenang, kustomisasi penuh di atas Meta Astryx.',
      heroDesc:
        'Memadukan 142 spesimen aktif lintas 4 pilar & 12 kategori resmi Meta Astryx (103 Core + 35 ekstensi Mehan + 4 suite Runtime Hooks) dengan fisika material OKLCH, 10 font bundel offline, Theme Editor 3-tingkat, serta 12 bab standar UX & microcopy.',
      ctaCustomize: 'Buka Theme Editor',
      ctaCopyAiKit: 'Salin kit AI',
      ctaExploreComponents: 'Jelajahi katalog komponen',
      mapTitle: 'Arsitektur 3 lapis di atas Meta Astryx',
      mapSub:
        'Perilaku WAI-ARIA & fondasi inti tetap 100% milik Meta Astryx, sementara jiwa visual taktil, layout workspace, ergonomi UX, dan portabilitas dikendalikan satu sumber DNA.',
      layer1Tag: 'Lapis 1 · Fondasi aksesibilitas',
      layer1Title: 'Meta Astryx (~0.7.17)',
      layer1Desc:
        'Menyediakan 103 primitif WAI-ARIA lintas 12 kategori resmi, sistem <Theme>, fokus modal, navigasi keyboard, ukuran sentuh otomatis, dan validator CLI.',
      layer2Tag: 'Lapis 2 · Ekstensi taktil & ergonomi',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Menambahkan 8 atmosfer taktil, 12 preset kurasi, bibir tombol 3D OKLCH, WorkspaceLayout & CanvasStage, 35 ekstensi universal, 4 suite runtime hooks, 10 font WOFF2, dan 80 dokumen AI.',
      layer3Tag: 'Lapis 3 · Portabilitas instan',
      layer3Title: 'Mehan Portable + Token W3C',
      layer3Desc:
        'Menghasilkan CSS/JS mandiri untuk Claude Artifacts, Gemini Canvas, HTML murni, Vue, Svelte, serta JSON token W3C simetris untuk Figma.',
      installTitle: 'Cara memakai Mehan dalam 60 detik (untuk siapa saja)',
      installSub:
        'Tidak perlu bingung mulai dari mana: buka Studio via web atau STUDIO.html, pilih preset di atas, lalu salin ke stack proyekmu dengan 1 klik.',
      sourceGithub: 'GitHub',
      sourceLocal: 'Clone lokal',
      sourceNpm: 'Publik npm (Segera)',
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
        'Tempel prompt setup ke AI coding agent atau jalankan perintah inisialisasi satu baris (--from theme.json).',
      cardReactAgentBtn: 'Salin prompt setup',
      cardReactCmdBtn: 'Salin perintah CLI',
      cardHtmlBadge: 'Tanpa bundler',
      cardHtmlTitle: '3. HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Gunakan satu file mehan-portable.css mandiri tanpa ketergantungan React.',
      cardHtmlCssBtn: 'Salin Portable CSS',
      cardHtmlCdnBtn: 'Unduh starter HTML',
    },
    components: {
      title: 'Katalog komponen & runtime interaktif',
      subtitle:
        'Dikelompokkan dalam 4 pilar arsitektur (Struktur -> Aksi & Input -> Data & Visualisasi -> Umpan Balik & Runtime), lengkap dengan sub-klaster Form Controls dan spesimen JSX siap salin.',
      searchPlaceholder: 'Cari komponen atau hook (WorkspaceLayout, DataChart, ColumnView, useAutoDraft)...',
    },
    ux: {
      title: 'Panduan standar UX & microcopy (4 Domain · 12 Bab)',
      subtitle:
        'Dua belas bab interaktif terstruktur dalam 4 pilar: Beban Kognitif & Ergonomi Ruang, Tipografi & Lokalisasi, Interaksi/Keyboard/Gerak, serta Form, State & Microcopy.',
      doLabel: 'Standar Mehan (lakukan)',
      dontLabel: 'Anti-pola (hindari)',
    },
    templates: {
      title: 'Arsitektur Workspace, Theme Showcase & templat produksi',
      subtitle:
        'Jelajahi bagaimana 1 WorkspaceLayout + CanvasStage membentuk 5 topologi aplikasi universal, lalu uji tema langsung pada dasbor analitik, halaman pengaturan, dan studio 3D.',
      tabTopologies: 'Topologi Workspace (5-in-1)',
      tabShowcase: 'Theme Showcase (resmi)',
      tabDashboard: 'Dasbor Analitik SaaS',
      tabSettings: 'Pengaturan & Tata Kelola',
      tabCanvas: 'Studio Produk 3D',
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
      templates: 'Patterns & Templates',
      uxCopy: 'UX & Copy',
      maintain: 'Maintain',
      customize: 'Theme Editor',
      shortcuts: 'Keyboard shortcuts (?)',
      light: 'Light mode',
      dark: 'Dark mode',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle: 'Calm tactile surfaces, unrestricted theming on Meta Astryx.',
      heroDesc:
        'Unifies 142 live specimens across 4 architectural pillars & all 12 official Meta Astryx categories (103 Core + 35 Mehan extensions + 4 Runtime Hook suites) with perceptual OKLCH materials, 10 offline WOFF2 fonts, a 3-tier Theme Editor, and a 12-chapter UX playbook.',
      ctaCustomize: 'Open Theme Editor',
      ctaCopyAiKit: 'Copy AI kit',
      ctaExploreComponents: 'Explore component catalog',
      mapTitle: 'Zero-fork three-layer architecture on Meta Astryx',
      mapSub:
        'Core WAI-ARIA behavior & theming stay 100% native to Meta Astryx while tactile materials, adaptive workspaces, UX laws, and portable outputs share one DNA source.',
      layer1Tag: 'Layer 1 · Foundation & ARIA',
      layer1Title: 'Meta Astryx (~0.7.17)',
      layer1Desc:
        'Delivers 103 WAI-ARIA primitives across 12 categories, <Theme>, focus traps, keyboard navigation, coarse-pointer adaptation, and strict CLI checks.',
      layer2Tag: 'Layer 2 · Tactile extensions & UX',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Adds 8 tactile atmospheres, 12 signature presets, OKLCH 3D button lips, WorkspaceLayout & CanvasStage, 35 universal extensions, 4 runtime hook suites, 10 WOFF2 fonts, and 80 agent docs.',
      layer3Tag: 'Layer 3 · Zero-setup bridge',
      layer3Title: 'Mehan Portable + W3C tokens',
      layer3Desc:
        'Emits standalone CSS/JS for Claude Artifacts, Gemini Canvas, Vanilla HTML, Vue, Svelte, plus symmetric W3C DTCG JSON tokens for Figma.',
      installTitle: 'How anyone uses Mehan in 60 seconds',
      installSub:
        'Zero guesswork: open the live web Studio or offline STUDIO.html, pick or tune a theme preset above, and copy straight into your stack.',
      sourceGithub: 'GitHub',
      sourceLocal: 'Local clone',
      sourceNpm: 'Public npm (Soon)',
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
        'Paste the agent setup prompt into your coding assistant or run the single-line CLI initializer (--from theme.json).',
      cardReactAgentBtn: 'Copy setup prompt',
      cardReactCmdBtn: 'Copy CLI command',
      cardHtmlBadge: 'Framework-agnostic',
      cardHtmlTitle: '3. HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Drop in one standalone mehan-portable.css stylesheet with zero React dependency.',
      cardHtmlCssBtn: 'Copy Portable CSS',
      cardHtmlCdnBtn: 'Download starter HTML',
    },
    components: {
      title: 'Interactive component & runtime catalog',
      subtitle:
        'Organized into 4 architectural pillars (Structure -> Actions & Inputs -> Data & Visualization -> Feedback & Runtime) with Form Controls sub-clusters and copy-ready JSX.',
      searchPlaceholder: 'Search components or hooks (WorkspaceLayout, DataChart, ColumnView, useAutoDraft)...',
    },
    ux: {
      title: 'UX architecture & microcopy playbook (4 Domains · 12 Chapters)',
      subtitle:
        'Twelve interactive chapters organized across 4 domains: Cognitive Load & Spatial Ergonomics, Typography & Localization, Actions/Keyboard/Motion, and Forms, States & Microcopy.',
      doLabel: 'Mehan standard (do)',
      dontLabel: "Anti-pattern (don't)",
    },
    templates: {
      title: 'Workspace Topologies, Theme Showcase & templates',
      subtitle:
        'Explore how 1 WorkspaceLayout + CanvasStage express 5 universal app topologies, then stress-test your live theme across SaaS analytics, progressive settings, and a 3D product studio.',
      tabTopologies: 'Workspace Topologies (5-in-1)',
      tabShowcase: 'Theme Showcase (official)',
      tabDashboard: 'SaaS Analytics Dashboard',
      tabSettings: 'Governance & Settings',
      tabCanvas: '3D Product Studio',
    },
    maintain: {
      title: 'System maintenance & token export',
      subtitle:
        'Commit active theme defaults, validate Meta Astryx upgrades, switch npm package scopes, or export W3C tokens for Figma.',
    },
  },
} as const;

export type StudioCopy = (typeof STUDIO_COPY)[StudioLang];
