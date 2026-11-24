import React, {useMemo, useState} from 'react';
import {
  AlertDialog,
  AppShell,
  AspectRatio,
  Badge,
  BottomSheet,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  Center,
  CodeBlock,
  CommandPalette,
  Dialog,
  DialogHeader,
  Divider,
  Drawer,
  FormLayout,
  Grid,
  HStack,
  Heading,
  HoverCard,
  Item,
  Layout,
  LayoutContent,
  LayoutHeader,
  Lightbox,
  Link,
  List,
  ListItem,
  MetadataList,
  MetadataListItem,
  MobileNav,
  NavHeadingMenu,
  NavHeadingMenuItem,
  Outline,
  OverflowList,
  Overlay,
  Pagination,
  Popover,
  ResizeHandle,
  ScrollableArea,
  Section,
  SideNav,
  SideNavHeading,
  SideNavItem,
  SideNavSection,
  Step,
  Stepper,
  Tab,
  TabList,
  Table,
  Text,
  TextInput,
  Tooltip,
  TopNav,
  TopNavHeading,
  TopNavItem,
  TreeList,
  VStack,
  VisuallyHidden,
  createStaticSource,
  proportional,
  useResizable,
  useToast,
} from '@astryxdesign/core';
import {MediaTheme, SyntaxTheme, defineSyntaxTheme} from '@astryxdesign/core/theme';
import type {SpecimenDefinition} from './SpecimenCard';

const LIGHTBOX_SVG_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="300" viewBox="0 0 480 300"><rect width="480" height="300" rx="24" fill="#2a1f1a"/><circle cx="240" cy="150" r="76" fill="#e0366b"/></svg>`,
  );

const CUSTOM_SYNTAX_DEMO = defineSyntaxTheme({
  name: 'catalog-warm-syntax',
  tokens: {
    keyword: ['#9d174d', '#f472b6'],
    string: ['#065f46', '#6ee7b7'],
    comment: ['#52525b', '#d4d4d8'],
    number: ['#9a3412', '#fdba74'],
    function: ['#1e40af', '#93c5fd'],
    type: ['#115e59', '#5eead4'],
    variable: ['#18181b', '#f4f4f5'],
    operator: ['#3f3f46', '#e4e4e7'],
    constant: ['#92400e', '#fcd34d'],
    tag: ['#9d174d', '#f9a8d4'],
    attribute: ['#5b21b6', '#ddd6fe'],
    property: ['#1e40af', '#7dd3fc'],
    punctuation: ['#52525b', '#d4d4d8'],
    background: ['#f4f4f5', '#18181b'],
  },
});

export function useCatalogGroupC(): SpecimenDefinition[] {
  const showToast = useToast();
  const resizable = useResizable({defaultSize: 130, minSize: 90, maxSize: 210});

  // Navigation states
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [outlineId, setOutlineId] = useState('tokens');
  const [page, setPage] = useState(2);
  const [activeStep, setActiveStep] = useState(1);
  const [tabVal, setTabVal] = useState('tokens');

  // Overlay states
  const [alertOpen, setAlertOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [popOpen, setPopOpen] = useState(false);

  // FormLayout demo state
  const [flName, setFlName] = useState('Mehan UI');

  const cmdSource = useMemo(
    () =>
      createStaticSource([
        {id: '1', label: 'Export createMehanTheme (.ts)'},
        {id: '2', label: 'Switch to Dark Mode'},
        {id: '3', label: 'Copy W3C Figma Tokens'},
      ]),
    [],
  );

  return [
    // ==================== CATEGORY 8: LAYOUT ====================
    {
      id: 'app-shell',
      name: 'AppShell',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Application frame coordinating TopNav, SideNav, MobileNav, and content scroll.',
      summaryId: 'Kerangka aplikasi utama yang menyatukan TopNav, SideNav, dan area konten.',
      code: `<AppShell topNav={<TopNav ... />} sideNav={<SideNav ... />}>{children}</AppShell>`,
      render: () => (
        <div style={{border: '1px solid var(--color-border)', borderRadius: 10, overflow: 'hidden'}}>
          <AppShell
            height="auto"
            variant="surface"
            contentPadding={3}
            topNav={
              <TopNav
                label="Mini shell nav"
                heading={<TopNavHeading heading="App" />}
              />
            }
          >
            <Text type="supporting" color="secondary">
              AppShell main content region
            </Text>
          </AppShell>
        </div>
      ),
    },
    {
      id: 'aspect-ratio',
      name: 'AspectRatio',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Intrinsic aspect-ratio frame (`16/9`, `4/3`, `1`) preventing layout shift.',
      summaryId: 'Bingkai rasio aspek konsisten agar gambar/media tidak melompat saat dimuat.',
      code: `<AspectRatio ratio={16 / 9}><div /></AspectRatio>`,
      render: () => (
        <AspectRatio ratio={16 / 6}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: 'var(--color-accent-muted)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            16 : 6 Locked Ratio
          </div>
        </AspectRatio>
      ),
    },
    {
      id: 'center',
      name: 'Center',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Horizontal and vertical centering primitive with optional size bounds.',
      summaryId: 'Wadah perata tengah vertikal & horizontal secara instan.',
      code: `<Center height={64}><Badge label="Centered" /></Center>`,
      render: () => (
        <Center
          height={56}
          style={{
            borderRadius: 8,
            border: '1px dashed var(--color-border-emphasized)',
          }}
        >
          <Badge variant="info" label="Centered axis" />
        </Center>
      ),
    },
    {
      id: 'divider',
      name: 'Divider',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Semantic rule (`default` or `subtle`) in horizontal or vertical orientation.',
      summaryId: 'Garis pemisah semantik halus antar bagian konten.',
      code: `<Divider variant="subtle" />`,
      render: () => (
        <VStack gap={2}>
          <Text type="supporting">Above divider</Text>
          <Divider />
          <Text type="supporting" color="secondary">
            Below divider
          </Text>
        </VStack>
      ),
    },
    {
      id: 'form-layout',
      name: 'FormLayout',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Coordinates field spacing, optional/required markers, and error placement.',
      summaryId: 'Pengatur ritme jarak antar kolom form dan penanda wajib/opsional.',
      code: `<FormLayout><TextInput label="Name" ... /></FormLayout>`,
      render: () => (
        <FormLayout>
          <TextInput
            label="System name"
            size="sm"
            isRequired
            value={flName}
            onChange={setFlName}
          />
        </FormLayout>
      ),
    },
    {
      id: 'grid',
      name: 'Grid',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Responsive auto-fit CSS Grid (`columns={{minWidth, max, repeat}}`).',
      summaryId: 'Grid responsif otomatis tanpa perlu media query manual.',
      code: `<Grid columns={{minWidth: 80, max: 3, repeat: 'fit'}} gap={2}>...</Grid>`,
      render: () => (
        <Grid columns={{minWidth: 70, max: 3, repeat: 'fit'}} gap={2}>
          {['Col 1', 'Col 2', 'Col 3'].map(c => (
            <div
              key={c}
              style={{
                padding: '8px',
                borderRadius: 6,
                background: 'var(--color-background-card)',
                textAlign: 'center',
                fontSize: 12,
              }}
            >
              {c}
            </div>
          ))}
        </Grid>
      ),
    },
    {
      id: 'layout',
      name: 'Layout',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Structured region layout with sticky `LayoutHeader`, `LayoutContent`, and `LayoutFooter`.',
      summaryId: 'Tata letak panel terstruktur dengan header, area isi, dan footer.',
      code: `<Layout header={<LayoutHeader hasDivider>Title</LayoutHeader>}><LayoutContent>Body</LayoutContent></Layout>`,
      render: () => (
        <div style={{border: '1px solid var(--color-border)', borderRadius: 8}}>
          <Layout
            padding={2}
            header={
              <LayoutHeader hasDivider>
                <Text type="supporting" weight="bold">
                  Panel Header
                </Text>
              </LayoutHeader>
            }
          >
            <LayoutContent padding={2}>
              <Text type="supporting" color="secondary">
                Structured LayoutContent body
              </Text>
            </LayoutContent>
          </Layout>
        </div>
      ),
    },
    {
      id: 'resizable',
      name: 'Resizable & ResizeHandle',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Pointer + keyboard draggable split-pane separator (`role="separator"`).',
      summaryId: 'Pembatas panel geser interaktif yang mendukung mouse dan tombol panah.',
      code: `const panel = useResizable({defaultSize: 160});\n<ResizeHandle resizable={panel} hasDivider />`,
      render: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: 56,
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: resizable.size,
              padding: 8,
              fontSize: 11.5,
              background: 'var(--color-background-card)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {Math.round(resizable.size)}px
          </div>
          <ResizeHandle resizable={resizable} hasDivider label="Resize demo pane" />
          <div
            style={{
              flex: 1,
              padding: 8,
              fontSize: 11.5,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            Drag handle
          </div>
        </div>
      ),
    },
    {
      id: 'scrollable-area',
      name: 'ScrollableArea',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Bounded scroll viewport with accessible region naming and overflow cues.',
      summaryId: 'Area gulir berbatas tinggi dengan dukungan aksesibilitas papan ketik.',
      code: `<ScrollableArea label="Logs" style={{maxHeight: 80}}>...</ScrollableArea>`,
      render: () => (
        <ScrollableArea label="Build log stream" style={{maxHeight: 68}}>
          <VStack gap={1}>
            <Text type="supporting">[01] @mehan/dna built in 240ms</Text>
            <Text type="supporting">[02] @mehan/astryx verified (0 warnings)</Text>
            <Text type="supporting">[03] @mehan/portable CSS emitted</Text>
            <Text type="supporting">[04] STUDIO.html bundled offline</Text>
          </VStack>
        </ScrollableArea>
      ),
    },
    {
      id: 'section',
      name: 'Section',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Page band with semantic padding and `section` / `muted` / `transparent` fill.',
      summaryId: 'Blok bagian halaman dengan bantalan konsisten dan varian latar.',
      code: `<Section padding={3} variant="muted">Section content</Section>`,
      render: () => (
        <Section padding={3} variant="muted">
          <Text type="supporting" weight="semibold">
            Muted Section container
          </Text>
        </Section>
      ),
    },
    {
      id: 'stack',
      name: 'Stack (HStack / VStack)',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Token-stepped flexbox stack (`gap={0..10}`) with `HStack` and `VStack` aliases.',
      summaryId: 'Penyusun baris (`HStack`) dan kolom (`VStack`) berbasis skala spasi token.',
      code: `<HStack gap={2} vAlign="center"><Badge label="A" /><Badge label="B" /></HStack>`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Badge variant="blue" label="Step 1" />
          <Badge variant="purple" label="Step 2" />
          <Badge variant="teal" label="Step 3" />
        </HStack>
      ),
    },

    // ==================== CATEGORY 9: NAVIGATION ====================
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Semantic `<nav><ol>` trail auto-marking `aria-current="page"` on the final item.',
      summaryId: 'Jejak navigasi hierarki halaman dengan penanda halaman aktif otomatis.',
      code: `<Breadcrumbs>\n  <BreadcrumbItem href="#home">Home</BreadcrumbItem>\n  <BreadcrumbItem isCurrent>Studio</BreadcrumbItem>\n</Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem href="#root">Workspace</BreadcrumbItem>
          <BreadcrumbItem href="#themes">Themes</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Confectionery</BreadcrumbItem>
        </Breadcrumbs>
      ),
    },
    {
      id: 'mobile-nav',
      name: 'MobileNav',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Top-layer `<dialog>` slide-out navigation drawer for compact viewports.',
      summaryId: 'Laci navigasi seluler dengan focus trap native `<dialog>`.',
      code: `<MobileNav isOpen={open} onOpenChange={setOpen} header="Menu">...</MobileNav>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open MobileNav drawer"
            onClick={() => setMobileNavOpen(true)}
          />
          <MobileNav
            isOpen={mobileNavOpen}
            onOpenChange={setMobileNavOpen}
            header="Mehan Navigation"
          >
            <SideNavSection title="Sections">
              <SideNavItem
                label="Overview"
                isSelected
                onClick={() => setMobileNavOpen(false)}
              />
              <SideNavItem
                label="Components"
                onClick={() => setMobileNavOpen(false)}
              />
            </SideNavSection>
          </MobileNav>
        </>
      ),
    },
    {
      id: 'nav-menu',
      name: 'NavHeadingMenu',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Workspace switcher menu attached to `SideNavHeading` or `TopNavHeading`.',
      summaryId: 'Menu pemindah ruang kerja pada judul navigasi atas atau samping.',
      code: `<SideNavHeading heading="Mehan" menu={<NavHeadingMenu><NavHeadingMenuItem label="Switch org" /></NavHeadingMenu>} />`,
      render: () => (
        <SideNavHeading
          heading="Mehan Org"
          menu={
            <NavHeadingMenu size="sm">
              <NavHeadingMenuItem label="Design System Team" />
              <NavHeadingMenuItem label="Brand Studio" />
            </NavHeadingMenu>
          }
        />
      ),
    },
    {
      id: 'outline',
      name: 'Outline',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Table-of-contents scroll-spy rail with animated active track.',
      summaryId: 'Daftar isi dokumen dengan indikator garis aktif yang meluncur mulus.',
      code: `<Outline items={[{id: 'intro', label: 'Intro', level: 1}]} activeId={id} />`,
      render: () => (
        <Outline
          density="compact"
          hasScrollOnClick={false}
          activeId={outlineId}
          onActiveIdChange={setOutlineId}
          items={[
            {id: 'tokens', label: '1. OKLCH Tokens', level: 1},
            {id: 'surfaces', label: '2. Tactile Surfaces', level: 2},
            {id: 'ux', label: '3. UX Rules', level: 1},
          ]}
        />
      ),
    },
    {
      id: 'pagination',
      name: 'Pagination',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Page navigation bar supporting `pages`, `compact`, `count`, and `input` variants.',
      summaryId: 'Kontrol perpindahan halaman tabel dengan dukungan berbagai gaya.',
      code: `<Pagination page={page} totalPages={8} onChange={setPage} size="sm" />`,
      render: () => (
        <Pagination
          size="sm"
          variant="compact"
          page={page}
          totalPages={8}
          onChange={setPage}
        />
      ),
    },
    {
      id: 'side-nav',
      name: 'SideNav',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Vertical sidebar navigation with sections, badges, collapse, and resize support.',
      summaryId: 'Navigasi bilah samping vertikal dengan grup bagian dan status aktif.',
      code: `<SideNav><SideNavSection label="Core"><SideNavItem label="Tokens" isSelected /></SideNavSection></SideNav>`,
      render: () => (
        <div style={{border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden'}}>
          <SideNav style={{width: '100%', height: 'auto'}}>
            <SideNavSection title="Design System">
              <SideNavItem label="Tokens & DNA" isSelected href="#dna" />
              <SideNavItem label="Components" href="#comp" />
            </SideNavSection>
          </SideNav>
        </div>
      ),
    },
    {
      id: 'stepper',
      name: 'Stepper',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Multi-step workflow sequence (`<ol>`) with completed, active, and upcoming states.',
      summaryId: 'Penunjuk tahapan alur kerja berurutan yang interaktif.',
      code: `<Stepper activeStep={1}><Step step={0} label="Tune" /><Step step={1} label="Verify" /></Stepper>`,
      render: () => (
        <Stepper
          activeStep={activeStep}
          onStepClick={setActiveStep}
          density="compact"
        >
          <Step step={0} label="Seed" />
          <Step step={1} label="Verify" />
          <Step step={2} label="Ship" />
        </Stepper>
      ),
    },
    {
      id: 'tab-list',
      name: 'TabList',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'WAI-ARIA tab strip switching content panels with sliding selection indicator.',
      summaryId: 'Bilah tab aksesibel untuk berpindah antar panel konten.',
      code: `<TabList value={tab} onChange={setTab}><Tab value="a" label="Tokens" /></TabList>`,
      render: () => (
        <TabList
          aria-label="Specimen demo tabs"
          value={tabVal}
          onChange={setTabVal}
        >
          <Tab value="tokens" label="Tokens" />
          <Tab value="rules" label="Rules" />
          <Tab value="export" label="Export" />
        </TabList>
      ),
    },
    {
      id: 'top-nav',
      name: 'TopNav',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Horizontal application header bar with brand heading, nav items, and trailing actions.',
      summaryId: 'Bilah navigasi atas aplikasi lengkap dengan menu tengah & tombol kanan.',
      code: `<TopNav heading={<TopNavHeading heading="Studio" />} />`,
      render: () => (
        <div style={{border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden'}}>
          <TopNav
            label="Mini top navigation"
            heading={<TopNavHeading heading="Mehan" />}
            centerContent={
              <>
                <TopNavItem label="Docs" href="#docs" isSelected />
                <TopNavItem label="Themes" href="#themes" />
              </>
            }
          />
        </div>
      ),
    },

    // ==================== CATEGORY 10: OVERLAY ====================
    {
      id: 'alert-dialog',
      name: 'AlertDialog',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Destructive/critical confirmation modal requiring explicit named verb action.',
      summaryId: 'Dialog konfirmasi tindakan penting dengan label kata kerja spesifik.',
      code: `<AlertDialog isOpen={open} onOpenChange={setOpen} title="Revoke token?" actionLabel="Revoke token" />`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="destructive"
            label="Revoke token…"
            onClick={() => setAlertOpen(true)}
          />
          <AlertDialog
            isOpen={alertOpen}
            onOpenChange={setAlertOpen}
            title="Revoke staging token?"
            description="Connected CI runners will need a new token."
            actionLabel="Revoke token"
            cancelLabel="Cancel"
            onAction={() => setAlertOpen(false)}
          />
        </>
      ),
    },
    {
      id: 'bottom-sheet',
      name: 'BottomSheet',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Touch-friendly swipeable bottom sheet with grab bar and snap stops.',
      summaryId: 'Lembar bawah ramah layar sentuh dengan pegangan geser.',
      code: `<BottomSheet isOpen={open} onOpenChange={setOpen} label="Share options">...</BottomSheet>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open BottomSheet"
            onClick={() => setSheetOpen(true)}
          />
          <BottomSheet
            isOpen={sheetOpen}
            onOpenChange={setSheetOpen}
            label="Export sheet"
          >
            <VStack gap={3}>
              <Heading level={4}>Quick Export</Heading>
              <Text color="secondary">
                Swipe down, click outside, or press Escape to dismiss.
              </Text>
              <Button
                variant="primary"
                size="sm"
                label="Done"
                onClick={() => setSheetOpen(false)}
              />
            </VStack>
          </BottomSheet>
        </>
      ),
    },
    {
      id: 'command-palette',
      name: 'CommandPalette',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Modal `Ctrl+K` quick-switcher powered by `SearchSource`.',
      summaryId: 'Palet perintah cepat bergaya `Ctrl+K` dengan pencarian seketika.',
      code: `<CommandPalette isOpen={open} onOpenChange={setOpen} searchSource={source} />`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open CommandPalette"
            onClick={() => setCmdOpen(true)}
          />
          <CommandPalette
            isOpen={cmdOpen}
            onOpenChange={setCmdOpen}
            searchSource={cmdSource}
            onValueChange={val => {
              setCmdOpen(false);
              showToast({body: `Selected command #${val}`, type: 'info'});
            }}
          />
        </>
      ),
    },
    {
      id: 'dialog',
      name: 'Dialog',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Top-layer modal `<dialog>` with focus restoration and `DialogHeader`.',
      summaryId: 'Jendela modal aksesibel dengan penguncian fokus otomatis.',
      code: `<Dialog isOpen={open} onOpenChange={setOpen} aria-label="Edit"><DialogHeader title="Edit" /></Dialog>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open Dialog"
            onClick={() => setDialogOpen(true)}
          />
          <Dialog
            isOpen={dialogOpen}
            onOpenChange={setDialogOpen}
            width={380}
            aria-label="Create token alias"
          >
            <VStack gap={3}>
              <DialogHeader
                title="Create token alias"
                onOpenChange={setDialogOpen}
              />
              <Text color="secondary">
                Modal focus is trapped cleanly and restored to the trigger on close.
              </Text>
              <HStack gap={2} hAlign="end">
                <Button
                  size="sm"
                  variant="primary"
                  label="Close"
                  onClick={() => setDialogOpen(false)}
                />
              </HStack>
            </VStack>
          </Dialog>
        </>
      ),
    },
    {
      id: 'drawer',
      name: 'Drawer',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Full-height slide-in side inspector (`hasScrim` modal or non-modal).',
      summaryId: 'Panel samping penuh untuk inspektur detail baris.',
      code: `<Drawer isOpen={open} onOpenChange={setOpen} label="Details">...</Drawer>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open Side Drawer"
            onClick={() => setDrawerOpen(true)}
          />
          <Drawer
            isOpen={drawerOpen}
            onOpenChange={setDrawerOpen}
            label="Token inspector drawer"
            width={340}
          >
            <VStack gap={3}>
              <Heading level={4}>Side Drawer Inspector</Heading>
              <Text color="secondary">
                Slides in from the inline-end edge over the active page.
              </Text>
              <Button
                size="sm"
                variant="secondary"
                label="Close drawer"
                onClick={() => setDrawerOpen(false)}
              />
            </VStack>
          </Drawer>
        </>
      ),
    },
    {
      id: 'hover-card',
      name: 'HoverCard',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Rich preview card revealed on hover or keyboard focus.',
      summaryId: 'Kartu pratinjau kaya informasi saat elemen diarahkan kursor.',
      code: `<HoverCard label="Author details" content={<Text>Maintainer</Text>}><Link href="#">@alamehan</Link></HoverCard>`,
      render: () => (
        <HoverCard
          label="Package details"
          content={
            <div style={{padding: 10, maxWidth: 220}}>
              <VStack gap={1}>
                <Text weight="bold">@mehan/astryx v1.0.0</Text>
                <Text type="supporting" color="secondary">
                  Zero-fork tactile layer on Meta Astryx ~0.7.17.
                </Text>
              </VStack>
            </div>
          }
        >
          <Link href="#hover-demo">Hover or focus @mehan/astryx</Link>
        </HoverCard>
      ),
    },
    {
      id: 'lightbox',
      name: 'Lightbox',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Full-screen media viewer with pinch/double-click zoom and gallery paging.',
      summaryId: 'Penampil media layar penuh dengan dukungan perbesaran (zoom).',
      code: `<Lightbox isOpen={open} onOpenChange={setOpen} media={{src, alt: 'Render'}} />`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Preview in Lightbox"
            onClick={() => setLightboxOpen(true)}
          />
          <Lightbox
            isOpen={lightboxOpen}
            onOpenChange={setLightboxOpen}
            hasZoom
            media={{
              src: LIGHTBOX_SVG_URI,
              alt: 'Confectionery sphere render',
              caption: 'Shotcandy × Mehan high-contrast specimen',
            }}
          />
        </>
      ),
    },
    {
      id: 'overlay',
      name: 'Overlay',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Scrim layer over media with automatic foreground contrast inversion.',
      summaryId: 'Lapisan gradasi gelap/terang di atas gambar agar teks tetap terbaca.',
      code: `<Overlay content={<Text>Caption</Text>}><AspectRatio ratio={16/9}>...</AspectRatio></Overlay>`,
      render: () => (
        <Overlay
          content={
            <div style={{padding: 8}}>
              <Badge variant="neutral" label="Overlay scrim caption" />
            </div>
          }
        >
          <div
            style={{
              height: 64,
              borderRadius: 8,
              background:
                'linear-gradient(135deg, #ff7597 0%, #d42a5f 60%, #4c0519 100%)',
            }}
          />
        </Overlay>
      ),
    },
    {
      id: 'popover',
      name: 'Popover',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Anchored floating interactive surface with collision-aware placement.',
      summaryId: 'Panel mengambang interaktif yang menempel cerdas pada tombol pemicu.',
      code: `<Popover isOpen={open} onOpenChange={setOpen} label="Filter" content={...}><Button label="Open" /></Popover>`,
      render: () => (
        <Popover
          isOpen={popOpen}
          onOpenChange={setPopOpen}
          label="Quick token info"
          content={
            <div style={{padding: 10, width: 200}}>
              <Text type="supporting">
                Anchored popover with automatic viewport flip.
              </Text>
            </div>
          }
        >
          <Button size="sm" variant="secondary" label="Toggle Popover" />
        </Popover>
      ),
    },
    {
      id: 'toast',
      name: 'Toast (useToast)',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Non-blocking ephemeral feedback banner announced via `useToast()`.',
      summaryId: 'Notifikasi ringan sementara melalui hook `useToast()`.',
      code: `const showToast = useToast();\nshowToast({type: 'info', body: 'Saved changes'});`,
      render: () => (
        <Button
          size="sm"
          variant="secondary"
          label="Trigger Toast"
          onClick={() =>
            showToast({
              type: 'info',
              body: 'Theme tokens verified with 0 contrast warnings.',
            })
          }
        />
      ),
    },
    {
      id: 'tooltip',
      name: 'Tooltip',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Concise non-interactive text hint shown on hover or keyboard focus.',
      summaryId: 'Keterangan singkat saat kursor diarahkan atau fokus keyboard.',
      code: `<Tooltip content="Shortcut: Ctrl + B"><Button label="Bold" /></Tooltip>`,
      render: () => (
        <Tooltip content="Verified against WCAG 2.1 AA">
          <Button size="sm" variant="ghost" label="Hover for Tooltip" />
        </Tooltip>
      ),
    },

    // ==================== CATEGORY 11: TABLE & LIST ====================
    {
      id: 'item',
      name: 'Item',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Structured row primitive with `startContent`, `label`, `description`, and `endContent`.',
      summaryId: 'Baris informasi rapi dengan slot awal, judul, deskripsi, dan aksi kanan.',
      code: `<Item label="Production" description="ap-southeast-1" endContent={<Badge variant="success" label="Live" />} />`,
      render: () => (
        <Item
          label="Edge Gateway"
          description="Singapore · 18 ms p50"
          endContent={<Badge variant="success" label="Active" />}
        />
      ),
    },
    {
      id: 'list',
      name: 'List & ListItem',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Semantic `<ul>`/`<ol>` collection with optional dividers and interactive rows.',
      summaryId: 'Daftar semantik terstruktur dengan pemisah baris opsional.',
      code: `<List hasDividers><ListItem label="Confectionery" /><ListItem label="Porcelain" /></List>`,
      render: () => (
        <List density="compact">
          <ListItem
            label="mehan-astryx-1.0.0.tgz"
            description="Offline npm tarball"
            endContent={<Badge variant="neutral" label="310 KB" />}
          />
          <ListItem
            label="mehan-portable.css"
            description="Zero-build stylesheet"
            endContent={<Badge variant="teal" label="7 KB" />}
          />
        </List>
      ),
    },
    {
      id: 'metadata-list',
      name: 'MetadataList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Semantic `<dl>`/`<dt>`/`<dd>` key-value inspector pairs.',
      summaryId: 'Pasangan kunci-nilai (`<dl>`) untuk ringkasan detail objek.',
      code: `<MetadataList><MetadataListItem label="Engine">Astryx 0.7.17</MetadataListItem></MetadataList>`,
      render: () => (
        <MetadataList>
          <MetadataListItem label="Engine">Meta Astryx ~0.7.17</MetadataListItem>
          <MetadataListItem label="Color space">Perceptual OKLCH</MetadataListItem>
        </MetadataList>
      ),
    },
    {
      id: 'overflow-list',
      name: 'OverflowList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Responsive horizontal tag strip collapsing excess items into `+N`.',
      summaryId: 'Deret horizontal pintar yang melipat sisa item ke menu `+N`.',
      code: `<OverflowList maxVisibleItems={3} overflowRenderer={items => <Badge label={\`+\${items.length}\`} />}>...</OverflowList>`,
      render: () => (
        <OverflowList
          gap={1.5}
          maxVisibleItems={3}
          overflowRenderer={overflow => (
            <Badge variant="neutral" label={`+${overflow.length} more`} />
          )}
        >
          <Badge variant="blue" label="React 19" />
          <Badge variant="pink" label="OKLCH" />
          <Badge variant="green" label="WCAG AA" />
          <Badge variant="purple" label="Tailwind v4" />
          <Badge variant="teal" label="Figma W3C" />
        </OverflowList>
      ),
    },
    {
      id: 'table',
      name: 'Table',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Row-first data grid with proportional/pixel columns, sorting, and hover states.',
      summaryId: 'Tabel data rapi dengan lebar kolom proporsional dan sorotan baris.',
      code: `<Table data={rows} columns={columns} density="compact" hasHover />`,
      render: () => (
        <Table
          aria-label="Atmosphere contrast matrix"
          density="compact"
          hasHover
          data={[
            {id: '1', name: 'Confectionery', ink: '15.8:1'},
            {id: '2', name: 'Porcelain', ink: '16.4:1'},
          ]}
          columns={[
            {key: 'name', header: 'Atmosphere', width: proportional(1.4)},
            {key: 'ink', header: 'Contrast', width: proportional(1)},
          ]}
        />
      ),
    },
    {
      id: 'tree-list',
      name: 'TreeList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Hierarchical WAI-ARIA treeview with connector line guides and arrow-key focus.',
      summaryId: 'Daftar pohon hierarkis (folder/token) dengan garis penghubung.',
      code: `<TreeList aria-label="Package tree" items={treeItems} />`,
      render: () => (
        <TreeList
          aria-label="Monorepo structure"
          density="compact"
          items={[
            {
              id: 'pkgs',
              label: 'packages/',
              isExpanded: true,
              children: [
                {id: 'dna', label: '@mehan/dna', isSelected: true},
                {id: 'astryx', label: '@mehan/astryx'},
                {id: 'portable', label: '@mehan/portable'},
              ],
            },
          ]}
        />
      ),
    },

    // ==================== CATEGORY 12: UTILITY ====================
    {
      id: 'media-theme',
      name: 'MediaTheme',
      category: 'Utility',
      pkg: 'core',
      summaryEn: 'Scoped dark/light token boundary for controls overlaid on photography or video.',
      summaryId: 'Pembungkus tema lokal untuk menjaga keterbacaan di atas foto/video gelap.',
      code: `<MediaTheme mode="dark"><Button variant="secondary" label="Play reel" /></MediaTheme>`,
      render: () => (
        <MediaTheme mode="dark">
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: '#1c1512',
              colorScheme: 'dark',
              color: '#fbf5ec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            <Text type="supporting">Forced dark media zone</Text>
            <Button size="sm" variant="secondary" label="Inspect" />
          </div>
        </MediaTheme>
      ),
    },
    {
      id: 'syntax-theme',
      name: 'SyntaxTheme',
      category: 'Utility',
      pkg: 'core',
      summaryEn: 'Scoped code-highlighting palette provider powered by `defineSyntaxTheme()`.',
      summaryId: 'Penyedia palet warna sintaks kode lokal.',
      code: `<SyntaxTheme theme={customSyntax}><CodeBlock language="ts" code="export const ok = true;" /></SyntaxTheme>`,
      render: () => (
        <SyntaxTheme theme={CUSTOM_SYNTAX_DEMO}>
          <CodeBlock language="ts" code={`export const tactile = 'oklch';`} />
        </SyntaxTheme>
      ),
    },
    {
      id: 'visually-hidden',
      name: 'VisuallyHidden',
      category: 'Utility',
      pkg: 'core',
      summaryEn: 'Clips content visually while keeping it 100% readable by screen readers.',
      summaryId: 'Menyembunyikan teks secara visual namun tetap dibaca penuh oleh screen reader.',
      code: `<button><Sparkles size={14} /><VisuallyHidden>Generate theme</VisuallyHidden></button>`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Badge variant="info" label="a11y" />
          <Text type="supporting">
            Contains screen-reader-only text:
            <VisuallyHidden> (Verified accessible announcement)</VisuallyHidden>
          </Text>
        </HStack>
      ),
    },
  ];
}
