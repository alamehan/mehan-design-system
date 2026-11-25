/**
 * Mehan 8 Canonical Neutral Atmospheres.
 *
 * Every atmosphere strictly obeys Mehan's Optical Depth Law in Dark Mode:
 *   socket < well < paper < tray < surface < raisedBottom < raisedTop < float
 * so recessed inputs/tracks genuinely recede instead of popping forward, while
 * clearing WCAG 2.2 AA (>= 4.5:1) across ink, ink2, and ink3 in Light & Dark.
 */

export const MEHAN_ATMOSPHERE_IDS = [
  'confectionery',
  'porcelain',
  'stone',
  'butter',
  'matcha',
  'cacao',
  'periwinkle',
  'obsidian',
] as const;

export type MehanAtmosphereId = (typeof MEHAN_ATMOSPHERE_IDS)[number];

export function isMehanAtmosphereId(value: unknown): value is MehanAtmosphereId {
  return (
    typeof value === 'string' &&
    (MEHAN_ATMOSPHERE_IDS as readonly string[]).includes(value)
  );
}

export interface AtmosphereModeScale {
  /** Deepest small-control groove (switch, checkbox, radio, slider track) */
  socket: string;
  /** Recessed input / segmented-control well */
  well: string;
  /** Hovered recessed well or subtle row highlight */
  wellHover: string;
  /** Page body canvas */
  paper: string;
  /** Subtle flat grouping tray */
  tray: string;
  /** Default card / panel surface */
  surface: string;
  /** Raised button / pill gradient top */
  raisedTop: string;
  /** Raised button / pill gradient bottom */
  raisedBottom: string;
  /** Floating popover / dialog / menu surface */
  float: string;
  /** Inverted toast / tooltip surface */
  inverted: string;
  /** Primary text on inverted surface */
  onInverted: string;
  /** Subtle structural divider & card perimeter */
  line: string;
  /** Emphasized / control border (>= 3:1 where needed) */
  lineStrong: string;
  /** Primary body & heading ink */
  ink: string;
  /** Secondary label & UI ink */
  ink2: string;
  /** Supporting / helper text ink (verified >= 4.5:1 on surface & well) */
  ink3: string;
  /** Disabled text / icon ink */
  inkDisabled: string;
  /** Comma-separated RGB triplet for natural tinted shadows ("74, 45, 20") */
  shadowRgb: string;
  /** Top specular highlight color */
  topHighlight: string;
}

export interface MehanAtmosphere {
  id: MehanAtmosphereId;
  name: string;
  tagline: string;
  light: AtmosphereModeScale;
  dark: AtmosphereModeScale;
}

export const MEHAN_ATMOSPHERES: Record<MehanAtmosphereId, MehanAtmosphere> = {
  confectionery: {
    id: 'confectionery',
    name: 'Confectionery',
    tagline: 'Warm cream paper & roasted cocoa — tactile indie craft inspired by Shotcandy.',
    light: {
      socket: '#e4d5c1',
      well: '#f2e8d9',
      wellHover: '#eadecd',
      paper: '#fbf5ec',
      tray: '#f6eee2',
      surface: '#fffcf7',
      raisedTop: '#ffffff',
      raisedBottom: '#faf3e8',
      float: '#fffdf9',
      inverted: '#261b16',
      onInverted: '#fbf5ec',
      line: '#e5d7c4',
      lineStrong: '#8c7766',
      ink: '#261b16',
      ink2: '#5c4a3e',
      ink3: '#6f5b4d',
      inkDisabled: '#a38f7e',
      shadowRgb: '74, 45, 20',
      topHighlight: 'rgba(255, 255, 255, 0.92)',
    },
    dark: {
      // Strictly monotonic luminance: socket < well < paper < tray < surface < raised < float
      socket: '#0f0b09',
      well: '#150f0c',
      wellHover: '#1e1612',
      paper: '#1a1310',
      tray: '#1f1713',
      surface: '#251c18',
      raisedTop: '#332721',
      raisedBottom: '#2b201b',
      float: '#2f241e',
      inverted: '#fbf0e6',
      onInverted: '#1a1310',
      line: '#3d3029',
      lineStrong: '#856e61',
      ink: '#fbf0e6',
      ink2: '#d8c5b6',
      ink3: '#b8a291',
      inkDisabled: '#756255',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 242, 228, 0.08)',
    },
  },
  porcelain: {
    id: 'porcelain',
    name: 'Porcelain',
    tagline: 'Crisp architectural white & deep midnight slate — precision SaaS and developer tools.',
    light: {
      socket: '#dbe3ee',
      well: '#edf2f7',
      wellHover: '#e2e8f0',
      paper: '#f5f8fc',
      tray: '#f8fafc',
      surface: '#ffffff',
      raisedTop: '#ffffff',
      raisedBottom: '#f8fafc',
      float: '#ffffff',
      inverted: '#0f172a',
      onInverted: '#f8fafc',
      line: '#e2e8f0',
      lineStrong: '#64748b',
      ink: '#0f172a',
      ink2: '#334155',
      ink3: '#475569',
      inkDisabled: '#94a3b8',
      shadowRgb: '15, 23, 42',
      topHighlight: 'rgba(255, 255, 255, 0.95)',
    },
    dark: {
      socket: '#060a12',
      well: '#0a101d',
      wellHover: '#121b2e',
      paper: '#0e1525',
      tray: '#121b2f',
      surface: '#162138',
      raisedTop: '#223150',
      raisedBottom: '#1b2842',
      float: '#1e2c48',
      inverted: '#f8fafc',
      onInverted: '#0e1525',
      line: '#283856',
      lineStrong: '#687da3',
      ink: '#f8fafc',
      ink2: '#cbd5e1',
      ink3: '#a3b4cc',
      inkDisabled: '#5c6f8e',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 255, 255, 0.08)',
    },
  },
  stone: {
    id: 'stone',
    name: 'Stone',
    tagline: 'Quiet warm alabaster & architectural charcoal — editorial, AI workspaces, and docs.',
    light: {
      socket: '#dfdcd4',
      well: '#eeebe4',
      wellHover: '#e5e1d8',
      paper: '#f6f5f0',
      tray: '#faf9f5',
      surface: '#ffffff',
      raisedTop: '#ffffff',
      raisedBottom: '#f8f7f3',
      float: '#ffffff',
      inverted: '#1c1a17',
      onInverted: '#f7f5f0',
      line: '#e4e0d8',
      lineStrong: '#787268',
      ink: '#1c1a17',
      ink2: '#44403b',
      ink3: '#59544d',
      inkDisabled: '#9c968c',
      shadowRgb: '34, 29, 22',
      topHighlight: 'rgba(255, 255, 255, 0.94)',
    },
    dark: {
      socket: '#0c0b0a',
      well: '#11100e',
      wellHover: '#191815',
      paper: '#151412',
      tray: '#1a1916',
      surface: '#201e1b',
      raisedTop: '#2c2925',
      raisedBottom: '#25231f',
      float: '#292723',
      inverted: '#f7f5f0',
      onInverted: '#151412',
      line: '#35322d',
      lineStrong: '#7a746b',
      ink: '#f7f5f0',
      ink2: '#d1ccc3',
      ink3: '#ada79d',
      inkDisabled: '#6b665e',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 250, 240, 0.08)',
    },
  },
  butter: {
    id: 'butter',
    name: 'Butter',
    tagline: 'Sunlit cultured buttercream & toasted brioche — warm optimistic product craft.',
    light: {
      socket: '#e6dbc0',
      well: '#f3ebd3',
      wellHover: '#ebe0c2',
      paper: '#fcf8ea',
      tray: '#f7f1dd',
      surface: '#fffef9',
      raisedTop: '#ffffff',
      raisedBottom: '#fbf5e3',
      float: '#fffffc',
      inverted: '#241d11',
      onInverted: '#fcf8ea',
      line: '#e6dcc3',
      lineStrong: '#857654',
      ink: '#241d11',
      ink2: '#54472f',
      ink3: '#63543a',
      inkDisabled: '#9e8f72',
      shadowRgb: '68, 50, 14',
      topHighlight: 'rgba(255, 255, 255, 0.94)',
    },
    dark: {
      socket: '#0d0a06',
      well: '#130f09',
      wellHover: '#1c170f',
      paper: '#18130c',
      tray: '#1e1810',
      surface: '#251e14',
      raisedTop: '#342b1d',
      raisedBottom: '#2b2318',
      float: '#30271b',
      inverted: '#fcf5e1',
      onInverted: '#18130c',
      line: '#3e3324',
      lineStrong: '#877558',
      ink: '#fcf5e1',
      ink2: '#d8ccb0',
      ink3: '#b7a889',
      inkDisabled: '#73664c',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 248, 225, 0.08)',
    },
  },
  matcha: {
    id: 'matcha',
    name: 'Matcha',
    tagline: 'Ceremonial sage washi & deep Kyoto cedar moss — restorative organic focus.',
    light: {
      socket: '#d3e0d1',
      well: '#e5efe3',
      wellHover: '#dce9da',
      paper: '#f3f8f2',
      tray: '#edf4ec',
      surface: '#fcfefd',
      raisedTop: '#ffffff',
      raisedBottom: '#f5faf4',
      float: '#ffffff',
      inverted: '#132017',
      onInverted: '#f3f8f2',
      line: '#d8e5d6',
      lineStrong: '#637a63',
      ink: '#132017',
      ink2: '#354a3b',
      ink3: '#485f4e',
      inkDisabled: '#889e8c',
      shadowRgb: '20, 48, 28',
      topHighlight: 'rgba(255, 255, 255, 0.94)',
    },
    dark: {
      socket: '#070c09',
      well: '#0c130e',
      wellHover: '#131e17',
      paper: '#101813',
      tray: '#141f18',
      surface: '#19261e',
      raisedTop: '#26382d',
      raisedBottom: '#1f2f25',
      float: '#233429',
      inverted: '#eff7f0',
      onInverted: '#101813',
      line: '#2c3f33',
      lineStrong: '#698773',
      ink: '#eff7f0',
      ink2: '#c2d6c7',
      ink3: '#9db6a4',
      inkDisabled: '#5c7563',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(235, 255, 240, 0.08)',
    },
  },
  cacao: {
    id: 'cacao',
    name: 'Cacao',
    tagline: 'Velvety oat-latte parchment & roasted single-origin cacao — artisanal editorial luxury.',
    light: {
      socket: '#dfd2c5',
      well: '#eee3d8',
      wellHover: '#e5d8cb',
      paper: '#f8f2ec',
      tray: '#f3ebe3',
      surface: '#fffdfa',
      raisedTop: '#ffffff',
      raisedBottom: '#f9f2eb',
      float: '#fffefb',
      inverted: '#241813',
      onInverted: '#f8f2ec',
      line: '#e3d6ca',
      lineStrong: '#877162',
      ink: '#241813',
      ink2: '#574238',
      ink3: '#695246',
      inkDisabled: '#a18b7e',
      shadowRgb: '64, 34, 20',
      topHighlight: 'rgba(255, 255, 255, 0.92)',
    },
    dark: {
      socket: '#0d0907',
      well: '#130d0b',
      wellHover: '#1c1410',
      paper: '#18110e',
      tray: '#1e1512',
      surface: '#241a16',
      raisedTop: '#332520',
      raisedBottom: '#2b1f1a',
      float: '#2f221d',
      inverted: '#f9efe8',
      onInverted: '#18110e',
      line: '#3d2d27',
      lineStrong: '#876d62',
      ink: '#f9efe8',
      ink2: '#d6c2b6',
      ink3: '#b59e90',
      inkDisabled: '#735e53',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 240, 230, 0.08)',
    },
  },
  periwinkle: {
    id: 'periwinkle',
    name: 'Periwinkle',
    tagline: 'Iridescent lavender-ice & cosmic indigo velvet — playful futuristic studio.',
    light: {
      socket: '#d7daf2',
      well: '#e8eafb',
      wellHover: '#dfe2f7',
      paper: '#f4f5fe',
      tray: '#eef0fc',
      surface: '#fdfdff',
      raisedTop: '#ffffff',
      raisedBottom: '#f6f7fe',
      float: '#ffffff',
      inverted: '#16152b',
      onInverted: '#f4f5fe',
      line: '#dcdef3',
      lineStrong: '#6b6e94',
      ink: '#16152b',
      ink2: '#3b3a5c',
      ink3: '#4e4d73',
      inkDisabled: '#8f90b5',
      shadowRgb: '30, 27, 75',
      topHighlight: 'rgba(255, 255, 255, 0.95)',
    },
    dark: {
      socket: '#070712',
      well: '#0c0c1c',
      wellHover: '#14152b',
      paper: '#101124',
      tray: '#15162d',
      surface: '#1a1c37',
      raisedTop: '#272a4f',
      raisedBottom: '#202343',
      float: '#242749',
      inverted: '#f4f5ff',
      onInverted: '#101124',
      line: '#2f325c',
      lineStrong: '#7276ab',
      ink: '#f4f5ff',
      ink2: '#cacdf0',
      ink3: '#a5a9d6',
      inkDisabled: '#626694',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(240, 242, 255, 0.09)',
    },
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian',
    tagline: 'Anodized titanium mist & carbon-graphite noir — high-density engineering precision.',
    light: {
      socket: '#d8dde6',
      well: '#eaedf3',
      wellHover: '#e1e5ed',
      paper: '#f4f6f9',
      tray: '#eef1f6',
      surface: '#ffffff',
      raisedTop: '#ffffff',
      raisedBottom: '#f7f8fb',
      float: '#ffffff',
      inverted: '#0f1218',
      onInverted: '#f4f6f9',
      line: '#dfe3ec',
      lineStrong: '#687082',
      ink: '#0f1218',
      ink2: '#343a46',
      ink3: '#4c5464',
      inkDisabled: '#9098a8',
      shadowRgb: '15, 18, 24',
      topHighlight: 'rgba(255, 255, 255, 0.96)',
    },
    dark: {
      socket: '#050608',
      well: '#090b0f',
      wellHover: '#11141b',
      paper: '#0d1015',
      tray: '#12151c',
      surface: '#171b24',
      raisedTop: '#232936',
      raisedBottom: '#1c212c',
      float: '#202632',
      inverted: '#f5f7fa',
      onInverted: '#0d1015',
      line: '#29303e',
      lineStrong: '#6b758a',
      ink: '#f5f7fa',
      ink2: '#c9d0dc',
      ink3: '#a2acbd',
      inkDisabled: '#5f687a',
      shadowRgb: '0, 0, 0',
      topHighlight: 'rgba(255, 255, 255, 0.08)',
    },
  },
};
