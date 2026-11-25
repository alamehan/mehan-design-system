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
      heroTitle: 'Mesin aksesibilitas Meta Astryx. Jiwa taktil & ergonomi ruang Mehan.',
      heroDesc:
        'Memadukan primitif WAI-ARIA kelas produksi milik Meta dengan fisika permukaan OKLCH 7-lapis, topologi workspace universal, font WOFF2 offline, serta standar UX & microcopy — tanpa satu pun fork komponen inti.',
      ctaCustomize: 'Buka Theme Editor',
      ctaCopyAiKit: 'Salin kit AI',
      ctaExploreComponents: 'Jelajahi katalog komponen',
      installTitle: 'Mulai dalam 60 detik di stack mana pun',
      installSub:
        '1) Buka Studio via link web atau STUDIO.html -> 2) Pilih preset di atas -> 3) Salin jalur instalasi sesuai target proyekmu:',
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
      title: 'Panduan standar UX & microcopy',
      subtitle:
        'Standar interaktif terstruktur lintas 4 domain: Beban Kognitif & Ergonomi Ruang, Tipografi & Lokalisasi, Interaksi/Keyboard/Gerak, serta Form, State & Evergreen Microcopy.',
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
      heroTitle: 'Meta Astryx’s accessibility engine. Mehan’s tactile soul & ergonomics.',
      heroDesc:
        'Pairs Meta’s battle-tested WAI-ARIA primitives with 7-layer OKLCH tactile physics, universal workspace topologies, self-hosted WOFF2 fonts, and executable UX & microcopy laws — with zero component forks.',
      ctaCustomize: 'Open Theme Editor',
      ctaCopyAiKit: 'Copy AI kit',
      ctaExploreComponents: 'Explore component catalog',
      installTitle: 'Start in 60 seconds in any stack',
      installSub:
        '1) Open Studio on the web or via STUDIO.html -> 2) Pick or tune a preset above -> 3) Copy your stack output below:',
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
      title: 'UX architecture & microcopy playbook',
      subtitle:
        'Interactive human-factors standards across 4 domains: Cognitive Load & Spatial Ergonomics, Typography & Localization, Actions/Keyboard/Motion, and Forms, States & Evergreen Microcopy.',
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
