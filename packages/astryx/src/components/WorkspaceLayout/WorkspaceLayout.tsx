'use client';

import React, {useState} from 'react';
import {
  Button,
  Drawer,
  DrawerHeader,
  IconButton,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutPanel,
  ResizeHandle,
  Section,
  Text,
  useResizable,
} from '@astryxdesign/core';
import {PanelLeftClose, PanelLeftOpen, PanelRightOpen, X} from 'lucide-react';
import {useMehanShortcuts} from '../../hooks/shortcuts';
import {useMehanViewport} from '../../hooks/viewport';

export interface WorkspaceStartPaneConfig {
  /** Heading for the start pane (also names the landmark & mobile drawer). */
  title?: string;
  /** Content rendered inside the start pane (navigation, filters, form inputs, or tree). */
  content: React.ReactNode;
  /** Default inline pixel width on desktop viewports. @default 272 */
  defaultWidth?: number;
  /** Minimum width when `isResizable` is enabled. @default 200 */
  minWidth?: number;
  /** Maximum width when `isResizable` is enabled. @default 440 */
  maxWidth?: number;
  /** Enables Astryx's native drag/keyboard `ResizeHandle` on the desktop edge. @default false */
  isResizable?: boolean;
  /** Allows collapsing the start pane (`Mod+\` + header toggle button). @default true */
  isCollapsible?: boolean;
  /** Controlled collapsed state. */
  isCollapsed?: boolean;
  /** Initial collapsed state in uncontrolled mode. @default false */
  defaultIsCollapsed?: boolean;
  /** Called whenever the collapsed state changes. */
  onCollapsedChange?: (isCollapsed: boolean) => void;
  /**
   * Responsive behavior below `768px`:
   * - `'stack'`: stacks naturally above main content (best for Form + Result).
   * - `'collapsible'`: compact collapsible bar above main content (best for Filters / Workbench).
   * - `'drawer'`: moves into an Astryx modal `Drawer` triggered from the header bar (best for 3-Pane Explorer).
   * @default 'collapsible'
   */
  mobileMode?: 'stack' | 'collapsible' | 'drawer';
  /** Accessible label for the collapse/expand toggle trigger. */
  toggleLabel?: string;
}

export interface WorkspaceEndPaneConfig {
  /** Heading for the contextual inspector or detail pane (required for `Drawer` accessibility). */
  title: string;
  /** Content rendered inside the inspector / detail pane. */
  content: React.ReactNode;
  /** Whether the contextual inspector / detail pane is open. */
  isOpen: boolean;
  /** Called when the user closes or opens the inspector (`X`, `Escape`, or mobile scrim). */
  onOpenChange: (isOpen: boolean) => void;
  /** Default inline pixel width on desktop viewports. @default 312 */
  defaultWidth?: number;
  /** Minimum width when `isResizable` is enabled. @default 240 */
  minWidth?: number;
  /** Maximum width when `isResizable` is enabled. @default 480 */
  maxWidth?: number;
  /** Enables Astryx's native `ResizeHandle` on the desktop start edge. @default false */
  isResizable?: boolean;
  /** Accessible label for the close button. @default 'Close inspector' */
  closeLabel?: string;
}

export interface WorkspaceLayoutProps {
  /** Main task content rendered inside Astryx `LayoutContent`. */
  children: React.ReactNode;
  /** Optional top toolbar / filter bar rendered inside Astryx `LayoutHeader`. */
  toolbar?: React.ReactNode;
  /** Optional start pane (left in LTR) for forms, filters, trees, or tool palettes. */
  startPane?: WorkspaceStartPaneConfig;
  /** Optional contextual end pane (right in LTR) that auto-morphs into an Astryx `Drawer` on `<768px`. */
  endPane?: WorkspaceEndPaneConfig;
  /** Optional status or action footer rendered inside Astryx `LayoutFooter`. */
  footer?: React.ReactNode;
  /**
   * Scroll containment strategy (Law U2):
   * - `'adaptive-pane'`: independent pane scrolling on desktop (`height="fill"`), automatically
   *   releasing to natural page scroll (`height="auto"`) on `<768px` width or `<=559px` height (`200%` zoom).
   * - `'page'`: always grows naturally with page scroll (`height="auto"`).
   * @default 'adaptive-pane'
   */
  scrollMode?: 'adaptive-pane' | 'page';
  /** Enables `Mod+\` start-pane toggle and `Escape` end-pane close shortcuts. @default true */
  enableShortcuts?: boolean;
  /** Optional bounded height (`px` or CSS string) on desktop when `scrollMode="adaptive-pane"`. */
  desktopHeight?: number | string;
  /** Accessible region label for the workspace container. @default 'Workspace' */
  label?: string;
  className?: string;
}

/**
 * Level-1 Adaptive Multi-Pane Workbench (`WorkspaceLayout`), built directly on
 * Meta Astryx's `Layout`, `LayoutPanel`, `ResizeHandle`, and `Drawer`.
 * Unifies Form+Result, 2-Pane Workbench, 3-Pane Explorer, Collection+Inspector,
 * and Studio shells into a single controllable Astryx extension.
 */
export function WorkspaceLayout({
  children,
  toolbar,
  startPane,
  endPane,
  footer,
  scrollMode = 'adaptive-pane',
  enableShortcuts = true,
  desktopHeight,
  label = 'Workspace',
  className,
}: WorkspaceLayoutProps) {
  const {isMobile, shouldReleasePaneScroll} = useMehanViewport();

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState<boolean>(
    startPane?.defaultIsCollapsed ?? false,
  );
  const [mobileStartDrawerOpen, setMobileStartDrawerOpen] = useState<boolean>(false);
  const [mobileStartExpanded, setMobileStartExpanded] = useState<boolean>(false);

  const isStartCollapsible = startPane?.isCollapsible ?? true;
  const isStartCollapsed =
    startPane?.isCollapsed !== undefined
      ? startPane.isCollapsed
      : uncontrolledCollapsed;

  const setStartCollapsed = (next: boolean) => {
    if (startPane?.isCollapsed === undefined) {
      setUncontrolledCollapsed(next);
    }
    startPane?.onCollapsedChange?.(next);
  };

  const startResizable = useResizable({
    defaultSize: startPane?.defaultWidth ?? 272,
    minSize: startPane?.minWidth ?? 200,
    maxSize: startPane?.maxWidth ?? 440,
  });

  const endResizable = useResizable({
    defaultSize: endPane?.defaultWidth ?? 312,
    minSize: endPane?.minWidth ?? 240,
    maxSize: endPane?.maxWidth ?? 480,
  });

  useMehanShortcuts([
    {
      keys: 'mod+\\',
      label: startPane?.toggleLabel ?? `Toggle ${startPane?.title ?? 'side'} panel`,
      group: 'Workspace',
      isDisabled: !enableShortcuts || !startPane || !isStartCollapsible || isMobile,
      onPress: () => setStartCollapsed(!isStartCollapsed),
    },
    {
      keys: 'escape',
      label: endPane?.closeLabel ?? `Close ${endPane?.title ?? 'inspector'}`,
      group: 'Workspace',
      isDisabled: !enableShortcuts || !endPane || !endPane.isOpen || isMobile,
      onPress: () => endPane?.onOpenChange(false),
    },
  ]);

  const effectiveLayoutHeight =
    scrollMode === 'page' || shouldReleasePaneScroll ? 'auto' : 'fill';

  const startMobileMode = startPane?.mobileMode ?? 'collapsible';
  const showStartToggleInBar =
    Boolean(startPane) &&
    ((isMobile && startMobileMode !== 'stack') ||
      (!isMobile && isStartCollapsible && (Boolean(toolbar) || isStartCollapsed)));

  const hasHeaderBar = Boolean(
    toolbar || showStartToggleInBar || (isMobile && endPane && !endPane.isOpen),
  );

  const handleToggleTrigger = () => {
    if (!startPane) return;
    if (isMobile) {
      if (startMobileMode === 'drawer') {
        setMobileStartDrawerOpen(true);
      } else {
        setMobileStartExpanded(prev => !prev);
      }
      return;
    }
    setStartCollapsed(!isStartCollapsed);
  };

  const toggleButtonLabel =
    startPane?.toggleLabel ??
    (isMobile
      ? startPane?.title ?? 'Panel'
      : isStartCollapsed
        ? `Show ${startPane?.title ?? 'side panel'}`
        : `Hide ${startPane?.title ?? 'side panel'}`);

  const desktopHeightStyle =
    !shouldReleasePaneScroll && scrollMode === 'adaptive-pane' && desktopHeight !== undefined
      ? {
          height:
            typeof desktopHeight === 'number' ? `${desktopHeight}px` : desktopHeight,
        }
      : undefined;

  const desktopStartSlot =
    !isMobile && startPane && !isStartCollapsed ? (
      <>
        <LayoutPanel
          hasDivider={!startPane.isResizable}
          width={startPane.isResizable ? undefined : (startPane.defaultWidth ?? 272)}
          resizable={startPane.isResizable ? startResizable : undefined}
          label={startPane.title ?? 'Workspace side panel'}
          padding={0}
        >
          <div className="mehan-ws-pane-inner">
            {startPane.title && (
              <div className="mehan-ws-pane-header">
                <Text weight="semibold">{startPane.title}</Text>
                {isStartCollapsible && !toolbar && (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    label={`Hide ${startPane.title}`}
                    icon={<PanelLeftClose size={15} />}
                    onClick={() => setStartCollapsed(true)}
                  />
                )}
              </div>
            )}
            <div className="mehan-ws-pane-body">{startPane.content}</div>
          </div>
        </LayoutPanel>
        {startPane.isResizable && <ResizeHandle resizable={startResizable} hasDivider />}
      </>
    ) : undefined;

  const desktopEndSlot =
    !isMobile && endPane && endPane.isOpen ? (
      <>
        {endPane.isResizable && <ResizeHandle resizable={endResizable} hasDivider />}
        <LayoutPanel
          hasDivider={!endPane.isResizable}
          width={endPane.isResizable ? undefined : (endPane.defaultWidth ?? 312)}
          resizable={endPane.isResizable ? endResizable : undefined}
          label={endPane.title}
          padding={0}
        >
          <div className="mehan-ws-pane-inner">
            <div className="mehan-ws-pane-header">
              <Text weight="semibold">{endPane.title}</Text>
              <IconButton
                variant="ghost"
                size="sm"
                label={endPane.closeLabel ?? `Close ${endPane.title}`}
                icon={<X size={15} />}
                onClick={() => endPane.onOpenChange(false)}
              />
            </div>
            <div className="mehan-ws-pane-body">{endPane.content}</div>
          </div>
        </LayoutPanel>
      </>
    ) : undefined;

  return (
    <section
      className={['mehan-workspace-layout', className].filter(Boolean).join(' ')}
      data-scroll-mode={effectiveLayoutHeight}
      style={desktopHeightStyle}
      aria-label={label}
    >
      <Layout
        height={effectiveLayoutHeight}
        padding={0}
        header={
          hasHeaderBar ? (
            <LayoutHeader hasDivider>
              <div className="mehan-ws-toolbar" style={{padding: '10px 14px'}}>
                {showStartToggleInBar && (
                  <IconButton
                    variant="secondary"
                    size="sm"
                    label={toggleButtonLabel}
                    icon={
                      !isMobile && !isStartCollapsed ? (
                        <PanelLeftClose size={15} />
                      ) : (
                        <PanelLeftOpen size={15} />
                      )
                    }
                    onClick={handleToggleTrigger}
                  />
                )}
                {toolbar && <div className="mehan-ws-toolbar-main">{toolbar}</div>}
                {isMobile && endPane && !endPane.isOpen && (
                  <Button
                    variant="secondary"
                    size="sm"
                    label={endPane.title}
                    icon={<PanelRightOpen size={14} />}
                    onClick={() => endPane.onOpenChange(true)}
                  />
                )}
              </div>
            </LayoutHeader>
          ) : undefined
        }
        start={desktopStartSlot}
        content={
          <LayoutContent>
            <div className="mehan-ws-main-wrap" style={{padding: 16}}>
              {isMobile &&
                startPane &&
                (startMobileMode === 'stack' ||
                  (startMobileMode === 'collapsible' && mobileStartExpanded)) && (
                  <div className="mehan-ws-mobile-start">
                    {startPane.title && (
                      <div className="mehan-ws-pane-header">
                        <Text weight="semibold">{startPane.title}</Text>
                        {startMobileMode === 'collapsible' && (
                          <IconButton
                            variant="ghost"
                            size="sm"
                            label={`Close ${startPane.title}`}
                            icon={<X size={15} />}
                            onClick={() => setMobileStartExpanded(false)}
                          />
                        )}
                      </div>
                    )}
                    <div className="mehan-ws-pane-body">{startPane.content}</div>
                  </div>
                )}
              <div className="mehan-ws-main-content">{children}</div>
            </div>
          </LayoutContent>
        }
        end={desktopEndSlot}
        footer={
          footer ? <LayoutFooter hasDivider>{footer}</LayoutFooter> : undefined
        }
      />

      {/* Mobile Start Drawer when mobileMode="drawer" */}
      {isMobile && startPane && startMobileMode === 'drawer' && (
        <Drawer
          isOpen={mobileStartDrawerOpen}
          onOpenChange={setMobileStartDrawerOpen}
          label={startPane.title ?? 'Workspace panel'}
        >
          <DrawerHeader
            title={startPane.title ?? 'Panel'}
            onOpenChange={setMobileStartDrawerOpen}
            hasDivider
          />
          <Section padding={3}>{startPane.content}</Section>
        </Drawer>
      )}

      {/* Automatic Mobile Drawer Morph for Contextual End Inspector */}
      {isMobile && endPane && (
        <Drawer
          isOpen={endPane.isOpen}
          onOpenChange={endPane.onOpenChange}
          label={endPane.title}
        >
          <DrawerHeader
            title={endPane.title}
            onOpenChange={endPane.onOpenChange}
            hasDivider
          />
          <Section padding={3}>{endPane.content}</Section>
        </Drawer>
      )}
    </section>
  );
}
