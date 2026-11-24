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
      eyebrow: 'Pintu Tunggal Mehan Design System v1.0.0',
      heroTitle: 'Lembut disentuh, lengkap dikustomisasi, dan siap dipasang di proyek apa pun.',
      heroDesc:
        'Mehan memadukan seluruh 12 kategori komponen aksesibel Meta Astryx (~95+ primitif) dengan fisika permukaan taktil OKLCH, Theme Editor 3-tingkat tanpa batas, aturan UX universal, dan paket Portable tanpa setup terminal.',
      ctaCustomize: 'Buka Theme Editor',
      ctaCopyAiKit: 'Salin Kit Prototipe AI',
      ctaExploreComponents: 'Jelajahi 95+ Komponen',
      mapTitle: 'Cara memahami hubungan Astryx & Mehan dalam 30 detik',
      mapSub:
        'Tanpa merombak perilaku inti (zero fork). Tiga lapis bersih menjaga pembaruan tetap aman dan mudah dirawat.',
      layer1Tag: 'Lapis 1 · Pondasi & Aksesibilitas',
      layer1Title: 'Meta Astryx (~0.7.17 Terkunci)',
      layer1Desc:
        'Menangani 90+ komponen WAI-ARIA lintas 12 kategori resmi, navigasi keyboard, focus trap dialog, ukuran sentuh otomatis, dan validator resmi astryx CLI.',
      layer2Tag: 'Lapis 2 · Jiwa Taktil, Theme Engine Terbuka & UX',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Menghadirkan bibir tombol 3D OKLCH, pil Espresso Shotcandy, sumur input cekung/berbingkai, 4 kontrol presisi khas, override token/komponen penuh, dan buku aturan UX.',
      layer3Tag: 'Lapis 3 · Jembatan Tanpa Setup',
      layer3Title: 'Mehan Portable + Token W3C Figma',
      layer3Desc:
        'Mengubah rumus warna & skala yang sama menjadi file CSS/JS tunggal untuk Claude Artifacts, Gemini Canvas, HTML murni, Vue, Svelte, hingga Figma.',
      installTitle: 'Pasang di proyek baru atau proyek yang sudah jalan',
      installSub:
        'Pilih sumber paket dan gaya CSS proyekmu — perintah instalasi, file tema TypeScript, dan prompt AI otomatis menyesuaikan.',
      sourceLocal: 'Lokal D:\\ (Siap hari ini)',
      sourceNpm: 'Publik npm',
      cssPlain: 'CSS Standar',
      cssTailwind: 'Tailwind CSS v4',
      cardAiBadge: 'Paling cepat untuk ide baru',
      cardAiTitle: '1. Prototipe Chat AI (Claude / Gemini)',
      cardAiDesc:
        'Bikin prototipe single-HTML di Claude Artifacts atau Gemini Canvas dengan tampilan taktil Mehan & aturan UX otomatis.',
      cardAiBtn: 'Salin Kit AI',
      cardAiDownload: 'Unduh HTML Awal',
      cardReactBadge: 'Aplikasi produksi penuh',
      cardReactTitle: '2. Proyek React, Next.js, atau Vite',
      cardReactDesc:
        'Bisa dari repo kosong maupun repo yang sudah ada framework-nya. Cukup tempel Prompt Setup ke AI coding agent-mu.',
      cardReactAgentBtn: 'Salin Prompt Setup untuk Agent',
      cardReactCmdBtn: 'Salin Perintah CLI',
      cardHtmlBadge: 'Lintas framework',
      cardHtmlTitle: '3. HTML Murni, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Tanpa React dan tanpa bundler. Satu file CSS ringan (~7 KB) + script interaktif opsional.',
      cardHtmlCssBtn: 'Salin Portable CSS',
      cardHtmlCdnBtn: 'Unduh Starter CDN',
    },
    components: {
      title: 'Katalog Lengkap 12 Kategori Resmi Meta Astryx + Mehan',
      subtitle:
        'Setiap komponen di bawah berjalan langsung di atas tema aktifmu. Cari komponen, saring kategori, coba interaksinya, atau salin potongan JSX dalam 1 klik.',
      searchPlaceholder: 'Cari komponen (Button, Chat, Table, Calendar, PrecisionSlider)...',
    },
    ux: {
      title: 'Standar UX & Bahasa Universal',
      subtitle:
        'Desain bagus bukan cuma soal warna. Lima hukum universal ini menjaga setiap halaman tetap tenang, jelas, dan manusiawi — otomatis dibaca juga oleh AI coding agent lewat @mehan/astryx.',
      doLabel: 'Benar (Standar Mehan)',
      dontLabel: 'Hindari (Anti-Pola)',
    },
    templates: {
      title: 'Templat & Tolok Ukur Resmi (Theme Showcase)',
      subtitle:
        'Uji tema secara menyeluruh pada halaman Theme Showcase resmi Meta Astryx, dasbor operasional, pengaturan bertahap, dan kanvas 3D Shotcandy.',
      tabShowcase: 'Theme Showcase (Resmi Astryx)',
      tabDashboard: 'Dasbor SaaS',
      tabSettings: 'Pengaturan Rapi',
      tabCanvas: 'Kanvas 3D Shotcandy',
    },
    maintain: {
      title: 'Pusat Perawatan Tanpa Terminal',
      subtitle:
        'Semua yang dibutuhkan untuk menyimpan tema baru ke repo, mengecek update Meta Astryx, mengganti scope npm, atau mengekspor token ke Figma ada di sini.',
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
      eyebrow: 'Single-Door Hub · Mehan Design System v1.0.0',
      heroTitle: 'Silky tactile surfaces, unrestricted Astryx theming, effortless setup anywhere.',
      heroDesc:
        'Mehan pairs all 12 official Meta Astryx component categories (~95+ live primitives) with perceptual OKLCH tactile physics, a docked 3-tier Theme Editor, universal UX laws, and zero-setup Portable kits.',
      ctaCustomize: 'Open Theme Editor',
      ctaCopyAiKit: 'Copy AI Prototype Kit',
      ctaExploreComponents: 'Browse 95+ Components',
      mapTitle: 'Understand how Astryx & Mehan fit together in 30 seconds',
      mapSub:
        'Zero forked core behavior. Three clean layers keep upgrades safe and maintenance simple.',
      layer1Tag: 'Layer 1 · Behavior & Accessibility Engine',
      layer1Title: 'Meta Astryx (~0.7.17 Locked)',
      layer1Desc:
        'Provides 90+ WAI-ARIA primitives across 12 official categories, focus traps, keyboard navigation, touch ergonomics, and the official astryx CLI validator.',
      layer2Tag: 'Layer 2 · Tactile Soul, Open Theme Engine & UX Laws',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Adds perceptual OKLCH button lips, Shotcandy Espresso pills, recessed/bordered wells, 4 precision controls, unrestricted token/component overrides, and 4 UX docs.',
      layer3Tag: 'Layer 3 · Zero-Build Bridge',
      layer3Title: 'Mehan Portable + W3C Figma Tokens',
      layer3Desc:
        'Compiles the exact same DNA math into standalone CSS/JS for Claude Artifacts, Gemini Canvas, Vanilla HTML, Vue, Svelte, and Figma.',
      installTitle: 'Install in an empty repo or an existing framework',
      installSub:
        'Pick your package source and CSS stack — CLI commands, TypeScript theme code, and AI setup prompts adapt automatically.',
      sourceLocal: 'Local D:\\ (Works today)',
      sourceNpm: 'Public npm',
      cssPlain: 'Plain CSS',
      cssTailwind: 'Tailwind CSS v4',
      cardAiBadge: 'Fastest for early ideas',
      cardAiTitle: '1. AI Chat Prototype (Claude / Gemini)',
      cardAiDesc:
        'Generate single-HTML prototypes in Claude Artifacts or Gemini Canvas with Mehan styling and UX rules baked in.',
      cardAiBtn: 'Copy AI Kit',
      cardAiDownload: 'Download Starter HTML',
      cardReactBadge: 'Full production apps',
      cardReactTitle: '2. React, Next.js, or Vite App',
      cardReactDesc:
        'Works on empty repos or existing apps. Paste the Agent Setup Prompt into your AI coding assistant for hands-free setup.',
      cardReactAgentBtn: 'Copy Agent Setup Prompt',
      cardReactCmdBtn: 'Copy CLI Command',
      cardHtmlBadge: 'Any web stack',
      cardHtmlTitle: '3. Vanilla HTML, Vue, Svelte, Astro',
      cardHtmlDesc:
        'Zero React, zero bundler required. Drop in one lightweight CSS file (~7 KB) plus optional vanilla JS.',
      cardHtmlCssBtn: 'Copy Portable CSS',
      cardHtmlCdnBtn: 'Download CDN Starter',
    },
    components: {
      title: 'Complete Component Catalog (12 Official Astryx Categories)',
      subtitle:
        'Every primitive below runs live on your active theme. Search, filter by official Astryx category or package, interact live, and copy JSX in one click.',
      searchPlaceholder: 'Search components (Button, Chat, Table, Calendar, PrecisionSlider)...',
    },
    ux: {
      title: 'Universal UX & Microcopy Standards',
      subtitle:
        'Great UI is more than color tokens. These five universal rules keep screens calm, clear, and humane — and are automatically indexed for AI agents via @mehan/astryx.',
      doLabel: 'Do (Mehan Standard)',
      dontLabel: "Don't (Anti-Pattern)",
    },
    templates: {
      title: 'Official Theme Showcase & Production Templates',
      subtitle:
        'Stress-test your live theme across the official Meta Astryx Theme Showcase benchmark, SaaS dashboards, progressive settings, and Shotcandy 3D studio.',
      tabShowcase: 'Theme Showcase (Official)',
      tabDashboard: 'SaaS Dashboard',
      tabSettings: 'Clean Settings',
      tabCanvas: 'Shotcandy 3D Studio',
    },
    maintain: {
      title: 'Zero-Terminal Maintainer Cockpit',
      subtitle:
        'Everything you need to save theme defaults, verify Meta Astryx updates, rename your npm scope, or export Figma tokens — all from one screen.',
    },
  },
} as const;

export type StudioCopy = (typeof STUDIO_COPY)[StudioLang];
