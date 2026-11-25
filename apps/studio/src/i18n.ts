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
      info: 'Info & Pembuat',
      shortcuts: 'Pintasan keyboard (?)',
      light: 'Mode terang',
      dark: 'Mode gelap',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle:
        'Antarmuka taktil & aksesibel — dirancang siap rilis di Web, AI, dan Figma.',
      heroDesc:
        'Berdiri di atas fondasi Meta Astryx dengan kedalaman permukaan yang presisi, ragam suasana visual instan, dan ekspor satu klik ke stack pilihanmu.',
      ctaCustomize: 'Ubah Tampilan',
      ctaCopyAiKit: 'Salin Kit AI',
      ctaExploreComponents: 'Jelajahi Komponen',
      installTitle: 'Mulai pakai dalam 1 menit di platform mana pun',
      installSub:
        'Setiap tombol salin & unduh di bawah otomatis menyertakan tema yang sedang aktif di layar ini:',
      sourceGithub: 'GitHub',
      sourceLocal: 'Clone lokal',
      sourceNpm: 'Publik npm (Segera)',
      cssPlain: 'CSS standar',
      cssTailwind: 'Tailwind v4',
      cardAiBadge: 'Prototipe cepat',
      cardAiTitle: '1. Chat AI (Claude / Gemini)',
      cardAiDesc:
        'Paling praktis untuk membuat prototipe aplikasi utuh lewat prompt — sudah berisi warna, komponen .mh-*, dan aturan tata letak.',
      cardAiBtn: 'Salin kit AI',
      cardAiDownload: 'Unduh starter HTML',
      cardReactBadge: 'Aplikasi produksi',
      cardReactTitle: '2. React, Next.js, atau Vite',
      cardReactDesc:
        'Tempelkan prompt setup ke AI coding agent (Claude Code / Cursor / Antigravity) atau jalankan perintah instalasi di bawah.',
      cardReactAgentBtn: 'Salin prompt setup',
      cardReactCmdBtn: 'Salin perintah CLI',
      cardHtmlBadge: 'Tanpa React',
      cardHtmlTitle: '3. HTML, Vue, Svelte & Figma',
      cardHtmlDesc:
        'Gunakan satu file mehan-portable.css ringan untuk web apa pun, atau unduh file token warna untuk Figma.',
      cardHtmlCssBtn: 'Salin Portable CSS',
      cardHtmlCdnBtn: 'Unduh starter HTML',
    },
    components: {
      title: 'Katalog komponen & utilitas interaktif',
      subtitle:
        'Seluruh komponen dasar Meta Astryx dan komponen ruang kerja tambahan Mehan dalam satu tempat — lengkap dengan pratinjau hidup dan kode siap salin.',
      searchPlaceholder:
        'Cari komponen atau utilitas (Button, Selector, WorkspaceLayout, DataChart, ColorPicker)...',
    },
    ux: {
      title: 'Panduan praktis UX & penulisan teks antarmuka',
      subtitle:
        'Panduan interaktif agar tata letak tidak sumpek, form nyaman diisi, serta teks tombol dan pesan error mudah dipahami semua orang.',
      doLabel: 'Anjuran Mehan (lakukan)',
      dontLabel: 'Hindari (anti-pola)',
    },
    templates: {
      title: 'Tata letak ruang kerja, etalase tema & contoh halaman',
      subtitle:
        'Lihat bagaimana satu kerangka fleksibel membentuk 5 jenis halaman aplikasi, lalu uji tema pilihanmu langsung di halaman toko, dashboard analitik, pengaturan, dan studio 3D.',
      tabTopologies: 'Workspace Topologies (5-in-1)',
      tabShowcase: 'Theme Showcase (resmi)',
      tabDashboard: 'SaaS Analytics Dashboard',
      tabSettings: 'Governance & Settings',
      tabCanvas: '3D Product Studio',
    },
    maintain: {
      title: 'Penyimpanan tema, pembaruan & ekspor token',
      subtitle:
        'Simpan tema kustommu secara permanen ke repositori, uji versi terbaru Meta Astryx dengan aman, atau unduh token warna untuk Figma.',
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
      info: 'About & Guide',
      shortcuts: 'Keyboard shortcuts (?)',
      light: 'Light mode',
      dark: 'Dark mode',
    },
    overview: {
      eyebrow: 'Mehan Design System v1.0',
      heroTitle:
        'Tactile, accessible UI — crafted to ship across Web, AI & Figma.',
      heroDesc:
        'Built on Meta Astryx with precision layered depth, instant visual moods, and one-click export to your stack.',
      ctaCustomize: 'Customize Theme',
      ctaCopyAiKit: 'Copy AI Kit',
      ctaExploreComponents: 'Explore Components',
      installTitle: 'Start in 60 seconds in any stack',
      installSub:
        'Every copy and download button below automatically embeds the theme currently active on your screen:',
      sourceGithub: 'GitHub',
      sourceLocal: 'Local clone',
      sourceNpm: 'Public npm (Soon)',
      cssPlain: 'Plain CSS',
      cssTailwind: 'Tailwind v4',
      cardAiBadge: 'Fastest ideation',
      cardAiTitle: '1. AI chat prototype (Claude / Gemini)',
      cardAiDesc:
        'Copy one self-contained prompt bundling your theme colors, .mh-* UI classes, and layout rules for instant single-HTML apps.',
      cardAiBtn: 'Copy AI kit',
      cardAiDownload: 'Download starter HTML',
      cardReactBadge: 'Production apps',
      cardReactTitle: '2. React, Next.js, or Vite',
      cardReactDesc:
        'Paste the setup prompt into your AI coding assistant or run the single-line install command below.',
      cardReactAgentBtn: 'Copy setup prompt',
      cardReactCmdBtn: 'Copy CLI command',
      cardHtmlBadge: 'Framework-agnostic',
      cardHtmlTitle: '3. HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Drop in one standalone mehan-portable.css stylesheet without React, or export design tokens for Figma.',
      cardHtmlCssBtn: 'Copy Portable CSS',
      cardHtmlCdnBtn: 'Download starter HTML',
    },
    components: {
      title: 'Interactive component & utility catalog',
      subtitle:
        'Every Meta Astryx core component and Mehan workspace addition in one place — complete with live interactive previews and copy-ready code.',
      searchPlaceholder:
        'Search components or utilities (Button, Selector, WorkspaceLayout, DataChart, ColorPicker)...',
    },
    ux: {
      title: 'Practical UX & interface writing guide',
      subtitle:
        'Interactive chapters keeping screens uncluttered, forms forgiving to fill out, and button or error copy clear to everyone.',
      doLabel: 'Mehan standard (do)',
      dontLabel: "Anti-pattern (don't)",
    },
    templates: {
      title: 'Workspace layouts, Theme Showcase & page templates',
      subtitle:
        'See how one flexible workspace frame adapts into 5 common app layouts, then test your active theme across a storefront, analytics dashboard, settings page, and 3D studio.',
      tabTopologies: 'Workspace Topologies (5-in-1)',
      tabShowcase: 'Theme Showcase (official)',
      tabDashboard: 'SaaS Analytics Dashboard',
      tabSettings: 'Governance & Settings',
      tabCanvas: '3D Product Studio',
    },
    maintain: {
      title: 'Save themes, safe updates & token export',
      subtitle:
        'Save your custom theme permanently to the repository, test new Meta Astryx releases safely, or export design tokens for Figma.',
    },
  },
} as const;

export type StudioCopy = (typeof STUDIO_COPY)[StudioLang];
