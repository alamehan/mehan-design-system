/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-runtime-hooks',
  title: 'Mehan Ergonomic Runtime Hooks and Client I/O Utilities',
  category: 'guide',
  keywords: [
    'useMehanShortcuts',
    'usePrimaryAction',
    'useAutoDraft',
    'useUnsavedGuard',
    'useMehanViewport',
    'useMehanThemeMode',
    'useHistoryStore',
    'validateFile',
    'downloadJson',
  ],
  description:
    'SSR-safe React hooks and pure client utilities turning Mehan UX Laws U1-U5 into zero-boilerplate application ergonomics on top of Meta Astryx.',
  sections: [
    {
      id: 'hook-matrix',
      title: 'Runtime Hook & Utility Matrix (Zero Overlap with @astryxdesign/core)',
      content: [
        {
          type: 'table',
          headers: ['Export (`@mehan/astryx`)', 'UX Law', 'Purpose'],
          rows: [
            [
              '`useMehanShortcuts` · `usePrimaryAction` · `useRegisteredShortcuts`',
              'Law U1 (Keyboard & Layers)',
              'IME-safe (`isComposing`), typing-aware shortcut bindings, `Mod+Enter` form/action submission inside inputs, and automatic registration into `<ShortcutSheet />`.',
            ],
            [
              '`useMehanViewport` · `MEHAN_MEDIA_QUERIES`',
              'Laws U2 & U5 (Viewport & Motion)',
              'Built on Astryx `useMediaQuery`: exposes `isMobile`, `isCompactHeight` (`200%` zoom), `isCoarsePointer`, `prefersReducedMotion`, `prefersHighContrast`, and `shouldReleasePaneScroll`.',
            ],
            [
              '`useAutoDraft` · `useUnsavedGuard`',
              'Law U3 (Form Resilience)',
              'Debounced, schema-versioned local draft persistence (`hasRestoredDraft`, `isDirty`, `lastSavedAt`, `clearDraft`) plus `beforeunload` dirty protection.',
            ],
            [
              '`useMehanThemeMode` · `MEHAN_THEME_INIT_SCRIPT`',
              'Dark-Mode Hygiene',
              'Cross-tab synchronized `light | dark | system` state (`useSyncExternalStore`) + inline `<head>` anti-FOUC script.',
            ],
            [
              '`createHistoryStore` · `useHistoryStore`',
              'Undo / Redo',
              'Coalesced undo/redo state container preventing slider-scrub history flooding.',
            ],
            [
              '`validateFile` · `readFileText` · `pickFiles` · `downloadBlob` · `downloadJson`',
              'Client File I/O',
              'Complete Import -> Validate (MIME + extension + byte cap) -> Read -> Export loop with automatic `ObjectURL` cleanup.',
            ],
          ],
        },
      ],
    },
    {
      id: 'usage-example',
      title: 'Minimal Workbench Example',
      content: [
        {
          type: 'code',
          lang: 'tsx',
          code: `import {useState} from 'react';
import {
  ShortcutSheet,
  WorkspaceLayout,
  useAutoDraft,
  useMehanShortcuts,
  usePrimaryAction,
  useUnsavedGuard,
} from '@mehan/astryx';

export function QueryWorkbench() {
  const [helpOpen, setHelpOpen] = useState(false);
  const draft = useAutoDraft({
    key: 'query-workbench-sql',
    initialValue: 'SELECT * FROM events LIMIT 25;',
    version: 1,
  });

  useUnsavedGuard(draft.isDirty);
  usePrimaryAction(() => runQuery(draft.value), {label: 'Execute SQL query'});
  useMehanShortcuts([
    {keys: '?', label: 'Open keyboard shortcuts', group: 'Help', onPress: () => setHelpOpen(true)},
  ]);

  return (
    <>
      <WorkspaceLayout label="SQL Workbench">
        {/* Main editor & results */}
      </WorkspaceLayout>
      <ShortcutSheet isOpen={helpOpen} onOpenChange={setHelpOpen} />
    </>
  );
}`,
        },
      ],
    },
  ],
};
