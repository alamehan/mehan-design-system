/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-ergonomics-and-motion',
  title: 'Mehan Keyboard, Touch, Line-Budget, and Motion Laws',
  category: 'guide',
  keywords: [
    'keyboard shortcuts',
    'layered escape',
    'coarse pointer',
    'high contrast',
    'forced colors',
    'middle truncate',
    'scroll chaining',
    'reduced motion',
  ],
  description:
    'Universal interaction laws governing global shortcut guards, layered Escape precedence, coarse-pointer 44px adaptation, 9-tier line budgets, scroll-chaining split, and reduced-motion choreography.',
  sections: [
    {
      id: 'keyboard-shortcuts-and-focus',
      title: 'U1: Shortcut Grammar, Layered Escape, and Focus Placement',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Guard single-key shortcuts (`/`, `?`) with `!event.isComposing && event.keyCode !== 229 && !isTypingTarget(event.target)` so IME composition and form typing are never hijacked.',
            'Allow `Mod+Enter` to submit the active form even when focus is inside an input, and never override `Mod+F` unless rendering a virtualized canvas.',
            'Enforce layered `Escape` precedence: topmost menu/popover/dialog -> clear non-empty search -> close non-modal side `Drawer` -> dismiss `Tour` coachmark. Never discard dirty form edits on `Escape` without confirmation.',
            'Place initial focus on `Cancel` inside destructive `AlertDialog` and `InlineConfirm` controls, jump focus to `#fieldId` via `ErrorSummary` on multi-field submit failure, and set `scroll-padding-top` to clear sticky top bars (WCAG 2.4.11).',
          ],
        },
      ],
    },
    {
      id: 'touch-zoom-and-high-contrast',
      title: 'U2: Coarse Pointer, 200% Zoom, and Borderless High-Contrast',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Reserve compact `32px` controls for desktop fine pointers. Under `@media (pointer: coarse)`, expand interactive targets to `>= 44x44px` with `>= 8px` gap and enforce `font-size >= 16px` on editable fields to prevent iOS Safari auto-zoom.',
            'Eliminate hover-only actions on touch viewports (`<768px`) and cap sticky headers at two layers.',
            'Under `@media (prefers-contrast: more)` and `@media (forced-colors: active)`, borderless Mehan wells, sockets, cards, and swatches automatically acquire crisp `>= 3:1` borders (`CanvasText` / `Highlight`).',
            'Release fixed `100dvh` workbench height locks at `width <= 767px`, `height <= 559px` (`200%` browser zoom), and `@media print`.',
          ],
        },
      ],
    },
    {
      id: 'line-budgets-and-scroll-chaining',
      title: 'U4: 9-Tier Line Budget, MiddleTruncate, and Scroll Split',
      content: [
        {
          type: 'table',
          headers: ['UI Surface', 'Line Rule', 'Overflow Strategy'],
          rows: [
            ['Buttons, Tabs, Badges', '1 line', 'Never truncate; grow intrinsically or wrap toolbar'],
            ['Table headers (`<th>`)', '1 line `nowrap`', 'Concise noun header (`<= 2` words)'],
            ['Table cells (`<td>`)', 'Natural wrap', '`min-width >= 96px` (`>= 48px` compact), top-aligned'],
            ['Validation & Error copy', 'Natural wrap', 'Never truncate recovery instructions'],
            ['Entity names & titles', '1 line', 'End ellipsis + hover/focus tooltip'],
            ['Filenames, paths, SHAs, API keys', '1 line', '`MiddleTruncate` preserving extension or suffix'],
            ['Card supporting descriptions', '2 lines', '`maxLines={2}` to equalize row heights'],
            ['Code blocks & logs', 'Bounded block', 'Scrollable container + `CopyButton`'],
            ['Currency, quotas, dates', '1 line `tabular-nums`', 'Never truncate numeric magnitudes'],
          ],
        },
        {
          type: 'prose',
          text: 'Apply `overscroll-behavior: contain` strictly to floating overlays (`Dialog`, `Drawer`, `BottomSheet`, popup menus). Inline scrollable regions inside pages (`CodeBlock`, `CodeEditor`, horizontal `Table`) must use `overscroll-behavior-inline: contain; overscroll-behavior-block: auto` so vertical page scrolling never gets trapped.',
        },
      ],
    },
    {
      id: 'motion-choreography-and-reduced-motion',
      title: 'U5: 4-Tier Motion Physics and Reduced-Motion Nuance',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            '80ms tactile press absorbed into internal 3D button lip (`0px` outer layout shift); 140ms micro-hover gated by `@media (hover: hover)`; 220ms popovers/dialogs (exits ~25% faster than entrances); 320ms drawers/sheets.',
            'Reserve spring overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for small tactile controls (`Switch`, `CopyButton`), never full-screen modals.',
            'Under `@media (prefers-reduced-motion: reduce)`, collapse spatial slides and bounces while keeping indeterminate spinners gently discernible so async tasks never appear frozen.',
            'Persist informational toasts for `4-5s` and error or `Undo` toasts for `8s+`, pausing timers on hover and keyboard focus (max `3` visible).',
          ],
        },
      ],
    },
  ],
};
