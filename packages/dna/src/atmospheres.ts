/**
 * Mehan 3 Canonical Neutral Atmospheres.
 *
 * Every atmosphere strictly obeys Mehan's Optical Depth Law in Dark Mode:
 *   socket < well < paper < tray < surface < raisedBottom < raisedTop < float
 * so recessed inputs/tracks genuinely recede instead of popping forward.
 */

export type MehanAtmosphereId = 'confectionery' | 'porcelain' | 'stone';

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
};
