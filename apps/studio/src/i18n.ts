import type {StudioLang} from './studioState';

export const STUDIO_COPY = {
  id: {
    nav: {
      overview: 'Ringkasan',
      components: 'Komponen',
      uxCopy: 'UX & Bahasa',
      patterns: 'Pola Halaman',
      maintain: 'Perawatan',
      customize: 'Sesuaikan',
      light: 'Mode terang',
      dark: 'Mode gelap',
    },
    drawer: {
      title: 'Studio Desain & Tema',
      subtitle: 'Ubah suasana, warna brand, ketebalan 3D, kepadatan, dan animasi secara langsung.',
      wcagBadge: 'Kontras WCAG AA Terkunci',
      atmosphereLabel: 'Suasana netral (Atmosphere)',
      accentLabel: 'Warna aksen brand (OKLCH)',
      customHexBtn: 'Hex Kustom',
      depthLabel: 'Kedalaman 3D',
      radiusLabel: 'Sudut lengkung',
      densityLabel: 'Kepadatan kontrol (Desktop)',
      densityHint: 'Layar sentuh otomatis melebar ke 44px agar nyaman ditekan jari.',
      motionLabel: 'Karakter gerak (Motion)',
      presetsTitle: 'Preset proyek tersimpan',
      presetPlaceholder: 'Nama proyek (mis. Aplikasi Kasir)',
      savePreset: 'Simpan preset',
      exportJson: 'Ekspor JSON',
      importJson: 'Impor JSON',
      resetDefault: 'Kembalikan ke awal',
    },
    overview: {
      eyebrow: 'Pintu Tunggal Mehan Design System v1.0.0',
      heroTitle: 'Lembut disentuh, rapi secara UX, dan praktis dipasang di proyek apa pun.',
      heroDesc:
        'Mehan memadukan mesin aksesibilitas Meta Astryx (75+ komponen siap pakai) dengan fisika tombol 3D yang mulus, aturan UX universal, dan paket Portable tanpa setup terminal.',
      ctaCustomize: 'Sesuaikan tampilan',
      ctaCopyAiKit: 'Salin Kit Prototipe AI',
      ctaExploreComponents: 'Lihat komponen',
      mapTitle: 'Cara memahami hubungan Astryx & Mehan dalam 30 detik',
      mapSub:
        'Tidak ada kode inti yang dirombak paksa (zero fork). Setiap lapis punya tugas jelas agar mudah dirawat bertahun-tahun.',
      layer1Tag: 'Lapis 1 · Pondasi & Aksesibilitas',
      layer1Title: 'Meta Astryx (~0.7.17 Terkunci)',
      layer1Desc:
        'Menangani 75+ komponen interaktif, navigasi keyboard, focus trap dialog, ukuran sentuh otomatis, dan validator resmi astryx CLI.',
      layer2Tag: 'Lapis 2 · Jiwa Visual, Presisi & Standar UX',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Memberikan gradasi tombol 3D yang halus, sumur input tanpa garis patah, 4 kontrol presisi khas (PrecisionSlider, ColorSwatch, ColorPicker, MetricCard), serta 4 buku aturan UX & Microcopy.',
      layer3Tag: 'Lapis 3 · Jembatan Tanpa Setup',
      layer3Title: 'Mehan Portable + Token W3C Figma',
      layer3Desc:
        'Mengubah rumus warna yang sama menjadi file CSS/JS tunggal untuk Claude Artifacts, Gemini Canvas, HTML murni, Vue, Svelte, hingga Figma.',
      installTitle: 'Pasang di proyek baru atau proyek yang sudah jalan',
      installSub:
        'Pilih sumber paket dan gaya CSS proyekmu — perintah dan prompt AI otomatis menyesuaikan.',
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
        'Bisa dari repo kosong maupun repo yang sudah ada framework-nya. Cukup tempel Prompt Setup ke AI coding agent-mu — beres tanpa pusing terminal.',
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
      title: 'Galeri Komponen Taktil & Presisi',
      subtitle:
        'Seluruh komponen di bawah menggunakan mesin asli Meta Astryx + tema Mehan yang sedang aktif. Coba klik, ketik, atau geser.',
      filterAll: 'Semua',
      filterActions: 'Tombol & Aksi',
      filterInputs: 'Input & Form',
      filterPrecision: 'Pilihan & Presisi',
      filterSurfaces: 'Kartu & Tabel',
      filterFeedback: 'Status & Dialog',
    },
    ux: {
      title: 'Standar UX & Bahasa Universal',
      subtitle:
        'Desain bagus bukan cuma soal warna. Lima hukum universal ini menjaga setiap halaman tetap tenang, jelas, dan manusiawi — otomatis dibaca juga oleh AI coding agent lewat @mehan/astryx.',
      doLabel: 'Benar (Standar Mehan)',
      dontLabel: 'Hindari (Anti-Pola)',
    },
    patterns: {
      title: 'Pola Halaman Siap Pakai',
      subtitle:
        'Contoh nyata penerapan hierarki permukaan, pengungkapan bertahap (progressive disclosure), dan tabel data yang rapi.',
      tabDashboard: 'Dasbor Operasional',
      tabSettings: 'Pengaturan Rapi',
      tabCanvas: 'Studio Kanvas 3D',
    },
    maintain: {
      title: 'Pusat Perawatan Tanpa Terminal',
      subtitle:
        'Semua yang dibutuhkan untuk menyimpan tema baru, mengecek update Meta Astryx, mengganti nama paket npm, atau mengekspor token ke Figma ada di satu tempat ini.',
    },
  },
  en: {
    nav: {
      overview: 'Overview',
      components: 'Components',
      uxCopy: 'UX & Copy',
      patterns: 'Patterns',
      maintain: 'Maintain',
      customize: 'Customize',
      light: 'Light mode',
      dark: 'Dark mode',
    },
    drawer: {
      title: 'Design & Theme Studio',
      subtitle: 'Tune atmosphere, brand color, 3D depth, density, and motion live across every preview.',
      wcagBadge: 'WCAG AA Contrast Locked',
      atmosphereLabel: 'Neutral atmosphere',
      accentLabel: 'Brand accent (OKLCH)',
      customHexBtn: 'Custom Hex',
      depthLabel: '3D depth',
      radiusLabel: 'Corner radius',
      densityLabel: 'Control density (Desktop)',
      densityHint: 'Coarse touch screens automatically expand targets to 44px.',
      motionLabel: 'Motion character',
      presetsTitle: 'Saved project presets',
      presetPlaceholder: 'Project name (e.g. Billing Portal)',
      savePreset: 'Save preset',
      exportJson: 'Export JSON',
      importJson: 'Import JSON',
      resetDefault: 'Reset to default',
    },
    overview: {
      eyebrow: 'Single-Door Hub · Mehan Design System v1.0.0',
      heroTitle: 'Silky tactile surfaces, disciplined UX rules, effortless setup anywhere.',
      heroDesc:
        'Mehan pairs Meta Astryx’s accessible 75+ primitive engine with smooth 3D push-button physics, universal UX & microcopy standards, and zero-setup Portable kits.',
      ctaCustomize: 'Customize theme',
      ctaCopyAiKit: 'Copy AI Prototype Kit',
      ctaExploreComponents: 'Browse components',
      mapTitle: 'Understand how Astryx & Mehan fit together in 30 seconds',
      mapSub:
        'Zero forked core behavior. Three clean layers keep upgrades safe and maintenance simple.',
      layer1Tag: 'Layer 1 · Behavior & Accessibility Engine',
      layer1Title: 'Meta Astryx (~0.7.17 Locked)',
      layer1Desc:
        'Provides 75+ WAI-ARIA primitives, focus traps, keyboard navigation, touch ergonomics, and the official astryx CLI validator.',
      layer2Tag: 'Layer 2 · Visual Soul, Precision & UX Laws',
      layer2Title: 'Mehan DNA + @mehan/astryx',
      layer2Desc:
        'Adds perceptual OKLCH tactile button lips, borderless recessed input wells, 4 signature precision controls, and 4 official UX & Copywriting docs.',
      layer3Tag: 'Layer 3 · Zero-Build Bridge',
      layer3Title: 'Mehan Portable + W3C Figma Tokens',
      layer3Desc:
        'Compiles the exact same DNA math into standalone CSS/JS for Claude Artifacts, Gemini Canvas, Vanilla HTML, Vue, Svelte, and Figma.',
      installTitle: 'Install in an empty repo or an existing framework',
      installSub:
        'Pick your package source and CSS stack — commands and AI setup prompts adapt automatically.',
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
      title: 'Tactile & Precision Component Gallery',
      subtitle:
        'Every specimen below runs live on Meta Astryx + your active Mehan theme. Click, type, and drag to test.',
      filterAll: 'All',
      filterActions: 'Actions',
      filterInputs: 'Inputs & Forms',
      filterPrecision: 'Selection & Precision',
      filterSurfaces: 'Surfaces & Data',
      filterFeedback: 'Feedback & Overlays',
    },
    ux: {
      title: 'Universal UX & Microcopy Standards',
      subtitle:
        'Great UI is more than color tokens. These five universal rules keep screens calm, clear, and humane — and are automatically indexed for AI agents via @mehan/astryx.',
      doLabel: 'Do (Mehan Standard)',
      dontLabel: "Don't (Anti-Pattern)",
    },
    patterns: {
      title: 'Production Page Archetypes',
      subtitle:
        'Live compositions demonstrating surface hierarchy, progressive disclosure, and row-first data tables.',
      tabDashboard: 'Operations Dashboard',
      tabSettings: 'Clean Settings',
      tabCanvas: '3D Canvas Studio',
    },
    maintain: {
      title: 'Zero-Terminal Maintainer Cockpit',
      subtitle:
        'Everything you need to save theme defaults, verify Meta Astryx updates, rename your npm scope, or export Figma tokens — all from one screen.',
    },
  },
} as const;

export type StudioCopy = (typeof STUDIO_COPY)[StudioLang];
