import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot, hydrateRoot, type Root} from 'react-dom/client';
import * as AstryxCore from '@astryxdesign/core';
import * as AstryxTheme from '@astryxdesign/core/theme';
import * as MehanAstryx from '@mehan/astryx';
import * as MehanDna from '@mehan/astryx/dna';
import {transform as sucraseTransform} from 'sucrase';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  Award,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Bot,
  Box,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  CalendarClock,
  Camera,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleHelp,
  CirclePlus,
  CircleUser,
  CircleX,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  CloudUpload,
  Code2,
  Coins,
  Columns3,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Crown,
  Database,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileCheck2,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Filter,
  Flag,
  Flame,
  Folder,
  FolderGit2,
  FolderKanban,
  FolderOpen,
  Gauge as GaugeIcon,
  Gift,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Globe,
  GripVertical,
  HardDrive,
  Hash,
  Headphones,
  Heart,
  History,
  Home,
  Image,
  Inbox,
  Info,
  Kanban,
  Key,
  Keyboard,
  Landmark,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  LifeBuoy,
  Lightbulb,
  LineChart,
  Link2,
  List,
  ListChecks,
  ListFilter,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Maximize2,
  Megaphone,
  Menu,
  MessageSquare,
  Mic,
  Minimize2,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  PackageCheck,
  Palette,
  PanelLeft,
  PanelRight,
  Paperclip,
  Pause,
  Pencil,
  Percent,
  Phone,
  PieChart,
  Pin,
  Play,
  Plus,
  Printer,
  QrCode,
  Receipt,
  Redo2,
  RefreshCw,
  Repeat,
  Rocket,
  RotateCcw,
  Save,
  Scale,
  Search,
  Send,
  Server,
  Settings,
  Settings2,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquarePen,
  Star,
  Store,
  Sun,
  SwatchBook,
  Table2,
  Tag,
  Target,
  Terminal,
  ThumbsUp,
  Ticket,
  Timer as TimerIcon,
  Trash2,
  TrendingDown,
  TrendingUp,
  Trophy,
  Truck,
  Undo2,
  Unlock,
  Upload,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  Video,
  Wallet,
  Wand2,
  Wifi,
  Workflow,
  Wrench,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

const CURATED_ICONS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  Activity,
  AlertCircle: CircleAlert,
  AlertOctagon,
  AlertTriangle,
  Archive,
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  Award,
  Banknote,
  BarChart: BarChart3,
  BarChart2: BarChart3,
  BarChart3,
  Bell,
  BookOpen,
  Bookmark,
  Bot,
  Box,
  Briefcase,
  Building: Building2,
  Building2,
  Calculator,
  Calendar,
  CalendarCheck,
  CalendarClock,
  Camera,
  Check,
  CheckCheck,
  CheckCircle: CheckCircle2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleHelp,
  CirclePlus,
  CircleUser,
  CircleX,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  CloudUpload,
  Code: Code2,
  Code2,
  Coins,
  Columns: Columns3,
  Columns3,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Crown,
  Database,
  DollarSign,
  Download,
  Edit: Pencil,
  Edit2: Pencil,
  Edit3: Pencil,
  ExternalLink,
  Eye,
  EyeOff,
  File: FileText,
  FileCheck: FileCheck2,
  FileCheck2,
  FileCode: FileCode2,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Filter,
  Flag,
  Flame,
  Folder,
  FolderGit2,
  FolderKanban,
  FolderOpen,
  GaugeIcon,
  Gift,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Globe,
  GripVertical,
  HardDrive,
  Hash,
  Headphones,
  Heart,
  HelpCircle: CircleHelp,
  History,
  Home,
  Image,
  Inbox,
  Info,
  Kanban,
  Key,
  Keyboard,
  Landmark,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  LifeBuoy,
  Lightbulb,
  LineChart,
  Link: Link2,
  Link2,
  List,
  ListChecks,
  ListFilter,
  Loader: Loader2,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Maximize2,
  Megaphone,
  Menu,
  MessageSquare,
  Mic,
  Minimize2,
  Monitor,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  PackageCheck,
  Palette,
  PanelLeft,
  PanelRight,
  Paperclip,
  Pause,
  Pencil,
  Percent,
  Phone,
  PieChart,
  Pin,
  Play,
  Plus,
  PlusCircle: CirclePlus,
  Printer,
  QrCode,
  Receipt,
  Redo2,
  RefreshCw,
  Repeat,
  Rocket,
  RotateCcw,
  Save,
  Scale,
  Search,
  Send,
  Server,
  Settings,
  Settings2,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  SquarePen,
  Star,
  Store,
  Sun,
  SwatchBook,
  Table: Table2,
  Table2,
  Tag,
  Target,
  Terminal,
  ThumbsUp,
  Ticket,
  TimerIcon,
  Trash: Trash2,
  Trash2,
  TrendingDown,
  TrendingUp,
  Trophy,
  Truck,
  Undo2,
  Unlock,
  Upload,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  Video,
  Wallet,
  Wand2,
  Wifi,
  Workflow,
  Wrench,
  X,
  XCircle: CircleX,
  Zap,
  ZoomIn,
  ZoomOut,
} as unknown as Record<string, React.ComponentType<Record<string, unknown>>>;

const warnedIcons = new Set<string>();

/**
 * Resilient icon proxy: returns the exact Lucide component when curated,
 * and falls back gracefully to `CircleDot` if an AI model requests an unlisted
 * icon name so a live stakeholder prototype never crashes with `undefined`.
 */
const IconsProxy = new Proxy(CURATED_ICONS, {
  get(target, prop: string | symbol) {
    if (typeof prop !== 'string') {
      return Reflect.get(target, prop);
    }
    if (prop === '__esModule') return true;
    if (prop === 'default') return IconsProxy;
    if (prop in target) {
      return target[prop];
    }
    if (/^[A-Z]/.test(prop)) {
      if (!warnedIcons.has(prop)) {
        warnedIcons.add(prop);
        console.warn(
          `[MehanRuntime] Unbundled Lucide icon "${prop}" fell back to CircleDot.`,
        );
      }
      return CircleDot as unknown as React.ComponentType<Record<string, unknown>>;
    }
    return undefined;
  },
});

class PrototypeErrorBoundary extends React.Component<
  {children: React.ReactNode},
  {error: Error | null}
> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {error: null};
  }

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  override componentDidCatch(error: Error) {
    console.error('[MehanRuntime] Prototype render error:', error);
  }

  override render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          style={{
            margin: '32px auto',
            maxWidth: 640,
            padding: '20px 24px',
            borderRadius: 16,
            border: '1px solid #ef4444',
            background: '#fef2f2',
            color: '#7f1d1d',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <strong style={{display: 'block', marginBottom: 8, fontSize: 16}}>
            Prototype runtime error
          </strong>
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: 13,
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

let userMountedRoot = false;

function createManagedRoot(container: Element | DocumentFragment): Root {
  userMountedRoot = true;
  const rawRoot = createRoot(container);
  return {
    render(children: React.ReactNode) {
      rawRoot.render(<PrototypeErrorBoundary>{children}</PrototypeErrorBoundary>);
    },
    unmount() {
      rawRoot.unmount();
    },
  };
}

function asEsModule<T extends Record<string, unknown>>(obj: T): T {
  const copy = {...obj};
  Object.defineProperty(copy, '__esModule', {value: true, enumerable: false});
  return copy;
}

const ReactModule = asEsModule({
  ...React,
  default: React,
});

const ReactDOMClientModule = asEsModule({
  ...ReactDOM,
  createRoot: createManagedRoot,
  hydrateRoot,
  default: {
    ...ReactDOM,
    createRoot: createManagedRoot,
    hydrateRoot,
  },
});

const AstryxThemeModule = asEsModule({
  ...AstryxTheme,
  default: AstryxTheme,
});

const AstryxCoreModule = asEsModule({
  ...AstryxCore,
  ...AstryxTheme,
  default: AstryxCore,
});

const MehanDnaModule = asEsModule({
  ...MehanDna,
  default: MehanDna,
});

const MehanAstryxModule = asEsModule({
  ...MehanDna,
  ...MehanAstryx,
  default: MehanAstryx,
});

export const MehanUI = {
  React,
  createRoot: createManagedRoot,
  ...AstryxCore,
  ...AstryxTheme,
  ...MehanDna,
  ...MehanAstryx,
  Icons: IconsProxy,
  LucideIcons: IconsProxy,
};

function runtimeRequire(specifier: string): unknown {
  if (specifier === 'react' || specifier === 'react/jsx-runtime') {
    return ReactModule;
  }
  if (specifier === 'react-dom' || specifier === 'react-dom/client') {
    return ReactDOMClientModule;
  }
  if (specifier === '@astryxdesign/core') {
    return AstryxCoreModule;
  }
  if (specifier === '@astryxdesign/core/theme') {
    return AstryxThemeModule;
  }
  if (specifier === 'lucide-react') {
    return IconsProxy;
  }
  if (
    specifier === '@mehan/astryx' ||
    specifier === '@mehan/astryx/dna' ||
    specifier === '@mehan/dna' ||
    /^@[a-z0-9-]+\/(astryx|astryx\/dna|dna)$/i.test(specifier)
  ) {
    return specifier.endsWith('/dna') ? MehanDnaModule : MehanAstryxModule;
  }
  throw new Error(
    `[MehanRuntime] Unsupported import "${specifier}". Use 'react', 'react-dom/client', '@astryxdesign/core', '@astryxdesign/core/theme', '@mehan/astryx', or 'lucide-react'.`,
  );
}

export function runInlinePrototypeScripts(): void {
  if (typeof document === 'undefined') return;
  const scripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>(
      'script[type="text/tsx"], script[type="text/jsx"], script[type="text/babel"]',
    ),
  );
  for (const script of scripts) {
    if (script.dataset.mehanExecuted === 'true') continue;
    script.dataset.mehanExecuted = 'true';
    const source = script.textContent ?? '';
    if (!source.trim()) continue;

    try {
      const compiled = sucraseTransform(source, {
        transforms: ['typescript', 'jsx', 'imports'],
        jsxRuntime: 'classic',
        jsxPragma: 'React.createElement',
        jsxFragmentPragma: 'React.Fragment',
        production: true,
      }).code;

      const moduleObj: {exports: Record<string, unknown>} = {exports: {}};
      userMountedRoot = false;

      const fn = new Function('require', 'exports', 'module', compiled);
      fn(runtimeRequire, moduleObj.exports, moduleObj);

      const exportedApp =
        moduleObj.exports.default ??
        (typeof moduleObj.exports.App === 'function' ? moduleObj.exports.App : null);

      if (!userMountedRoot && typeof exportedApp === 'function') {
        const rootEl = document.getElementById('root');
        if (rootEl) {
          const AppComp = exportedApp as React.ComponentType;
          createManagedRoot(rootEl).render(<AppComp />);
        }
      }
    } catch (err) {
      console.error('[MehanRuntime] Script execution error:', err);
      const rootEl = document.getElementById('root');
      if (rootEl) {
        const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
        createRoot(rootEl).render(
          <div
            role="alert"
            style={{
              margin: '32px auto',
              maxWidth: 640,
              padding: '20px 24px',
              borderRadius: 16,
              border: '1px solid #ef4444',
              background: '#fef2f2',
              color: '#7f1d1d',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <strong style={{display: 'block', marginBottom: 8, fontSize: 16}}>
              Prototype script error
            </strong>
            <pre style={{margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 13}}>
              {msg}
            </pre>
          </div>,
        );
      }
    }
  }
}

declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOMClientModule;
    MehanUI: typeof MehanUI;
    AstryxUI: typeof MehanUI;
    Icons: typeof IconsProxy;
    runMehanPrototypeScripts: typeof runInlinePrototypeScripts;
  }
}

if (typeof window !== 'undefined') {
  window.React = React;
  window.ReactDOM = ReactDOMClientModule;
  window.MehanUI = MehanUI;
  window.AstryxUI = MehanUI;
  window.Icons = IconsProxy;
  window.runMehanPrototypeScripts = runInlinePrototypeScripts;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runInlinePrototypeScripts();
    });
  } else {
    queueMicrotask(() => {
      runInlinePrototypeScripts();
    });
  }
}
