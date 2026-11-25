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
  LayoutFooter,
  LayoutHeader,
  Lightbox,
  Link,
  List,
  ListItem,
  MetadataList,
  MetadataListItem,
  MobileNav,
  MoreMenu,
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
  pixel,
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

interface CatalogServiceRow extends Record<string, unknown> {
  id: string;
  service: string;
  slug: string;
  region: string;
  status: 'Healthy' | 'Syncing' | 'Review';
  badgeVariant: 'success' | 'info' | 'warning';
  latency: string;
  uptime: string;
}

const CATALOG_TABLE_ROWS: CatalogServiceRow[] = [
  {
    id: 'srv-1',
    service: 'Design Token Compiler',
    slug: 'tokens-edge-api',
    region: 'Singapore (ap-southeast-1)',
    status: 'Healthy',
    badgeVariant: 'success',
    latency: '14.2 ms',
    uptime: '99.99%',
  },
  {
    id: 'srv-2',
    service: 'Checkout Session Gateway',
    slug: 'billing-core-v2',
    region: 'Frankfurt (eu-central-1)',
    status: 'Healthy',
    badgeVariant: 'success',
    latency: '19.8 ms',
    uptime: '99.98%',
  },
  {
    id: 'srv-3',
    service: 'Preview Artifact Bundler',
    slug: 'studio-singlefile',
    region: 'Tokyo (ap-northeast-1)',
    status: 'Syncing',
    badgeVariant: 'info',
    latency: '38.5 ms',
    uptime: '99.95%',
  },
  {
    id: 'srv-4',
    service: 'Webhook Retry Worker',
    slug: 'hooks-dispatcher',
    region: 'Oregon (us-west-2)',
    status: 'Review',
    badgeVariant: 'warning',
    latency: '104.0 ms',
    uptime: '99.72%',
  },
];

export function useCatalogCoreLayoutOverlays(): SpecimenDefinition[] {
  const showToast = useToast();
  const resizable = useResizable({defaultSize: 180, minSize: 120, maxSize: 320});

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
      span: 'wide',
      flush: true,
      summaryEn: 'Application frame coordinating TopNav, SideNav, MobileNav, and main content viewport.',
      summaryId: 'Kerangka aplikasi terpadu yang menyatukan TopNav, SideNav, dan area kerja utama.',
      code: `<AppShell variant="section" topNav={<TopNav ... />} sideNav={<SideNav ... />}>{children}</AppShell>`,
      render: () => (
        <AppShell
          variant="section"
          mobileNav={false}
          contentPadding={3}
          style={{height: 216, minHeight: 0, width: '100%'}}
          topNav={
            <TopNav
              label="Specimen shell top navigation"
              heading={<TopNavHeading heading="Workspace" />}
              endContent={<Badge variant="success" label="v1.0" />}
            />
          }
          sideNav={
            <SideNav style={{width: 168, height: '100%'}}>
              <SideNavSection title="Menu">
                <SideNavItem label="Overview" isSelected href="#overview" />
                <SideNavItem label="Deployments" href="#deploys" />
              </SideNavSection>
            </SideNav>
          }
        >
          <VStack gap={1.5}>
            <Text weight="semibold">Main workspace viewport</Text>
            <Text type="supporting" color="secondary">
              Bounded inside a 216px specimen sandbox (`minHeight: 0`) while full-screen apps fill `100dvh`.
            </Text>
          </VStack>
        </AppShell>
      ),
    },
    {
      id: 'layout',
      name: 'Layout',
      category: 'Layout',
      pkg: 'core',
      span: 'wide',
      flush: true,
      summaryEn: 'Structured panel anatomy with sticky `LayoutHeader`, scrollable `LayoutContent`, and `LayoutFooter`.',
      summaryId: 'Tata letak panel dengan header tetap, isi gulir, dan footer tombol aksi.',
      code: `<Layout header={<LayoutHeader hasDivider>Title</LayoutHeader>} footer={<LayoutFooter hasDivider>...</LayoutFooter>}><LayoutContent>Body</LayoutContent></Layout>`,
      render: () => (
        <div style={{height: 184, width: '100%', backgroundColor: 'var(--color-background-card)'}}>
          <Layout
            height="fill"
            padding={3}
            header={
              <LayoutHeader hasDivider>
                <HStack hAlign="between" vAlign="center">
                  <Text weight="semibold">Inspector panel header</Text>
                  <Badge variant="neutral" label="Draft" />
                </HStack>
              </LayoutHeader>
            }
            footer={
              <LayoutFooter hasDivider>
                <HStack hAlign="end" gap={2}>
                  <Button variant="ghost" size="sm" label="Cancel" />
                  <Button variant="primary" size="sm" label="Apply changes" />
                </HStack>
              </LayoutFooter>
            }
          >
            <LayoutContent padding={3}>
              <Text type="supporting" color="secondary">
                Scrollable `LayoutContent` region sandwiched cleanly between sticky header and footer dividers.
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
      span: 'wide',
      flush: true,
      summaryEn: 'Pointer and keyboard-draggable split-pane separator (`role="separator"`).',
      summaryId: 'Pembatas panel geser interaktif yang mendukung mouse maupun tombol panah.',
      code: `const pane = useResizable({defaultSize: 180});\n<ResizeHandle resizable={pane} hasDivider />`,
      render: () => (
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            height: 96,
            width: '100%',
            backgroundColor: 'var(--color-background-card)',
          }}
        >
          <div
            style={{
              width: resizable.size,
              padding: 12,
              background: 'var(--mehan-tray)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Text type="supporting" weight="semibold">
              Sidebar pane
            </Text>
            <Text type="supporting" color="secondary" hasTabularNumbers>
              {Math.round(resizable.size)} px
            </Text>
          </div>
          <ResizeHandle resizable={resizable} hasDivider label="Resize demo pane" />
          <div
            style={{
              flex: 1,
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text type="supporting" color="secondary">
              Drag the vertical divider or focus & press Left/Right arrows
            </Text>
          </div>
        </div>
      ),
    },
    {
      id: 'aspect-ratio',
      name: 'AspectRatio',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Intrinsic aspect-ratio frame (`16/9`, `4/3`, `1`) preventing media layout shift.',
      summaryId: 'Bingkai rasio proporsional agar pratinjau media tidak melompat saat dimuat.',
      code: `<AspectRatio ratio={16 / 7}><div /></AspectRatio>`,
      render: () => (
        <AspectRatio ratio={16 / 6}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: 'var(--color-accent-muted)',
              border: '1px solid var(--color-border)',
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-text-accent)',
            }}
          >
            16 : 6 Locked Aspect Ratio
          </div>
        </AspectRatio>
      ),
    },
    {
      id: 'center',
      name: 'Center',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Two-axis alignment primitive centering child elements horizontally and vertically.',
      summaryId: 'Wadah perata sumbu tengah horizontal dan vertikal secara presisi.',
      code: `<Center height={76}><Badge label="Centered axis" /></Center>`,
      render: () => (
        <Center
          height={76}
          style={{
            borderRadius: 8,
            border: '1px dashed var(--color-border-emphasized)',
            backgroundColor: 'var(--mehan-tray)',
          }}
        >
          <Badge variant="info" label="Centered on both axes" />
        </Center>
      ),
    },
    {
      id: 'grid',
      name: 'Grid',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Responsive auto-fit CSS Grid (`columns={{minWidth, max, repeat}}`) without media queries.',
      summaryId: 'Grid responsif otomatis berbasis lebar kolom minimum tanpa media query manual.',
      code: `<Grid columns={{minWidth: 72, max: 3, repeat: 'fit'}} gap={2}>...</Grid>`,
      render: () => (
        <Grid columns={{minWidth: 72, max: 3, repeat: 'fit'}} gap={2}>
          {['Col 1', 'Col 2', 'Col 3'].map(c => (
            <div
              key={c}
              style={{
                padding: '10px 8px',
                borderRadius: 8,
                background: 'var(--mehan-tray)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {c}
            </div>
          ))}
        </Grid>
      ),
    },
    {
      id: 'stack',
      name: 'Stack (HStack / VStack)',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Token-stepped flexbox stack (`gap={0..10}`) with `HStack` and `VStack` shorthands.',
      summaryId: 'Penyusun baris (`HStack`) dan kolom (`VStack`) berbasis skala spasi token.',
      code: `<HStack gap={2} vAlign="center"><Badge label="Step 1" /><Badge label="Step 2" /></HStack>`,
      render: () => (
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Badge variant="blue" label="gap={2}" />
          <Badge variant="purple" label="Token rhythm" />
          <Badge variant="teal" label="Auto wrap" />
        </HStack>
      ),
    },
    {
      id: 'section',
      name: 'Section',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Semantic page band providing consistent padding and `section` / `muted` fills.',
      summaryId: 'Blok bagian halaman dengan bantalan konsisten dan latar semantik.',
      code: `<Section padding={3} variant="muted">Section content</Section>`,
      render: () => (
        <Section padding={3} variant="muted">
          <Text type="supporting" weight="semibold">
            Muted Section container (`padding={3}`)
          </Text>
        </Section>
      ),
    },
    {
      id: 'divider',
      name: 'Divider',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Hairline rule (`default` or `subtle`) separating distinct semantic groups.',
      summaryId: 'Garis pemisah tipis semantik antar kelompok informasi.',
      code: `<Divider variant="subtle" />`,
      render: () => (
        <VStack gap={2}>
          <Text type="supporting" weight="semibold">
            Workspace general settings
          </Text>
          <Divider />
          <Text type="supporting" color="secondary">
            Separated cleanly without adding extra nested cards
          </Text>
        </VStack>
      ),
    },
    {
      id: 'form-layout',
      name: 'FormLayout',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Coordinates vertical field rhythm, required/optional markers, and validation spacing.',
      summaryId: 'Pengatur ritme vertikal kolom form beserta penanda wajib atau opsional.',
      code: `<FormLayout><TextInput label="System name" isRequired ... /></FormLayout>`,
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
      id: 'scrollable-area',
      name: 'ScrollableArea',
      category: 'Layout',
      pkg: 'core',
      summaryEn: 'Keyboard-accessible scroll region with edge-fade cues and bounded height.',
      summaryId: 'Area gulir berbatas tinggi dengan efek pudar tepi dan dukungan papan ketik.',
      code: `<ScrollableArea label="Build log stream" style={{maxHeight: 96}}>...</ScrollableArea>`,
      render: () => (
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            backgroundColor: 'var(--mehan-tray)',
            border: '1px solid var(--color-border)',
          }}
        >
          <ScrollableArea label="Build log stream" style={{maxHeight: 92}}>
            <VStack gap={1.5}>
              <Text type="supporting">[01] @mehan/dna compiled in 72 ms</Text>
              <Text type="supporting">[02] 10 offline WOFF2 font families verified</Text>
              <Text type="supporting">[03] @mehan/astryx strict check: 0 warnings</Text>
              <Text type="supporting">[04] @mehan/portable CSS & AI Kit emitted</Text>
              <Text type="supporting">[05] STUDIO.html single-file bundle ready</Text>
            </VStack>
          </ScrollableArea>
        </div>
      ),
    },

    // ==================== CATEGORY 9: NAVIGATION ====================
    {
      id: 'top-nav',
      name: 'TopNav',
      category: 'Navigation',
      pkg: 'core',
      span: 'wide',
      flush: true,
      summaryEn: 'Horizontal application bar with brand heading, primary links, and trailing actions.',
      summaryId: 'Bilah navigasi atas aplikasi dengan identitas brand, tautan tengah, dan aksi kanan.',
      code: `<TopNav heading={<TopNavHeading heading="Mehan" />} centerContent={...} endContent={...} />`,
      render: () => (
        <TopNav
          label="Mini top navigation"
          heading={<TopNavHeading heading="Mehan" />}
          centerContent={
            <>
              <TopNavItem label="Overview" href="#overview" isSelected />
              <TopNavItem label="Components" href="#components" />
              <TopNavItem label="Tokens" href="#tokens" />
            </>
          }
          endContent={<Button variant="primary" size="sm" label="Deploy" />}
        />
      ),
    },
    {
      id: 'stepper',
      name: 'Stepper',
      category: 'Navigation',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Ordered multi-stage workflow tracker (`<ol>`) with completed, active, and upcoming states.',
      summaryId: 'Penunjuk tahapan alur kerja berurutan yang jelas dan dapat diklik.',
      code: `<Stepper activeStep={1}><Step step={0} label="Choose seed" /><Step step={1} label="Verify contrast" /><Step step={2} label="Export bundle" /></Stepper>`,
      render: () => (
        <Stepper
          activeStep={activeStep}
          onStepClick={setActiveStep}
          density="compact"
        >
          <Step step={0} label="Choose seed" />
          <Step step={1} label="Verify contrast" />
          <Step step={2} label="Export bundle" />
        </Stepper>
      ),
    },
    {
      id: 'tab-list',
      name: 'TabList',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'WAI-ARIA tab strip switching peer content panels on a single non-wrapping line.',
      summaryId: 'Bilah tab aksesibel untuk berpindah antar panel konten sejajar.',
      code: `<TabList value={tab} onChange={setTab}><Tab value="tokens" label="Tokens" /></TabList>`,
      render: () => (
        <TabList
          aria-label="Specimen demo tabs"
          value={tabVal}
          onChange={setTabVal}
        >
          <Tab value="tokens" label="Tokens" />
          <Tab value="rules" label="UX Rules" />
          <Tab value="export" label="Export" />
        </TabList>
      ),
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Hierarchical location trail (`<nav><ol>`) marking `aria-current="page"` on the leaf.',
      summaryId: 'Jejak lokasi hierarki halaman dengan penanda halaman aktif otomatis.',
      code: `<Breadcrumbs><BreadcrumbItem href="#root">Workspace</BreadcrumbItem><BreadcrumbItem isCurrent>Confectionery</BreadcrumbItem></Breadcrumbs>`,
      render: () => (
        <Breadcrumbs>
          <BreadcrumbItem href="#root">Workspace</BreadcrumbItem>
          <BreadcrumbItem href="#themes">Themes</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Confectionery</BreadcrumbItem>
        </Breadcrumbs>
      ),
    },
    {
      id: 'pagination',
      name: 'Pagination',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Collection page navigator supporting `pages`, `compact`, `count`, and `input` modes.',
      summaryId: 'Kontrol perpindahan halaman untuk tabel data atau daftar panjang.',
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
      flush: true,
      summaryEn: 'Vertical sidebar navigation supporting grouped sections, badges, and rail collapse.',
      summaryId: 'Navigasi vertikal samping dengan pengelompokan bagian dan indikator aktif.',
      code: `<SideNav><SideNavSection title="Design System"><SideNavItem label="Tokens" isSelected /></SideNavSection></SideNav>`,
      render: () => (
        <SideNav style={{width: '100%', height: 'auto'}}>
          <SideNavSection title="Design System">
            <SideNavItem label="Tokens & DNA" isSelected href="#dna" />
            <SideNavItem label="Component Catalog" href="#comp" />
          </SideNavSection>
        </SideNav>
      ),
    },
    {
      id: 'outline',
      name: 'Outline',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Document table-of-contents rail with animated active section indicator.',
      summaryId: 'Daftar isi bab halaman dengan garis penanda aktif yang meluncur mulus.',
      code: `<Outline items={[{id: 'tokens', label: '1. OKLCH Tokens', level: 1}]} activeId={id} />`,
      render: () => (
        <Outline
          density="compact"
          hasScrollOnClick={false}
          activeId={outlineId}
          onActiveIdChange={setOutlineId}
          items={[
            {id: 'tokens', label: '1. OKLCH Tokens', level: 1},
            {id: 'surfaces', label: '2. Tactile Surfaces', level: 2},
            {id: 'ux', label: '3. UX Playbook', level: 1},
          ]}
        />
      ),
    },
    {
      id: 'nav-menu',
      name: 'NavHeadingMenu',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Organization or workspace switcher dropdown attached to `SideNavHeading`.',
      summaryId: 'Menu pemindah organisasi atau ruang kerja pada judul navigasi.',
      code: `<SideNavHeading heading="Mehan Org" menu={<NavHeadingMenu><NavHeadingMenuItem label="Brand Studio" /></NavHeadingMenu>} />`,
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
      id: 'mobile-nav',
      name: 'MobileNav',
      category: 'Navigation',
      pkg: 'core',
      summaryEn: 'Top-layer `<dialog>` slide-out navigation drawer for phone & tablet viewports.',
      summaryId: 'Laci navigasi seluler berbasis `<dialog>` native dengan pengunci fokus.',
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

    // ==================== CATEGORY 10: OVERLAY ====================
    {
      id: 'dialog',
      name: 'Dialog',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Modal `<dialog>` for short focused tasks with focus trap and trigger restoration.',
      summaryId: 'Jendela modal fokus terpusat untuk tugas singkat yang membutuhkan keputusan.',
      code: `<Dialog isOpen={open} onOpenChange={setOpen} aria-label="Create alias"><DialogHeader title="Create alias" /></Dialog>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open modal Dialog"
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
                Keyboard focus stays trapped inside the modal and returns cleanly to the trigger button when closed.
              </Text>
              <HStack gap={2} hAlign="end">
                <Button
                  size="sm"
                  variant="ghost"
                  label="Cancel"
                  onClick={() => setDialogOpen(false)}
                />
                <Button
                  size="sm"
                  variant="primary"
                  label="Save alias"
                  onClick={() => setDialogOpen(false)}
                />
              </HStack>
            </VStack>
          </Dialog>
        </>
      ),
    },
    {
      id: 'alert-dialog',
      name: 'AlertDialog',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Irreversible destructive confirmation naming the exact consequence and action verb.',
      summaryId: 'Konfirmasi tindakan permanen yang wajib menyebut dampak dan kata kerja spesifik.',
      code: `<AlertDialog isOpen={open} onOpenChange={setOpen} title="Revoke token?" actionLabel="Revoke token" />`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="destructive"
            label="Revoke staging token"
            onClick={() => setAlertOpen(true)}
          />
          <AlertDialog
            isOpen={alertOpen}
            onOpenChange={setAlertOpen}
            title="Revoke staging token?"
            description="Connected CI runners using this token will immediately lose access."
            actionLabel="Revoke token"
            cancelLabel="Cancel"
            onAction={() => setAlertOpen(false)}
          />
        </>
      ),
    },
    {
      id: 'drawer',
      name: 'Drawer',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Slide-in side inspector preserving underlying table or master-list context.',
      summaryId: 'Panel inspektur samping untuk mengedit detail baris tanpa kehilangan konteks daftar.',
      code: `<Drawer isOpen={open} onOpenChange={setOpen} label="Details">...</Drawer>`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Open side Drawer"
            onClick={() => setDrawerOpen(true)}
          />
          <Drawer
            isOpen={drawerOpen}
            onOpenChange={setDrawerOpen}
            label="Token inspector drawer"
            width={340}
          >
            <VStack gap={3}>
              <Heading level={4}>Row detail inspector</Heading>
              <Text color="secondary">
                Use a Drawer when inspecting or editing an item while keeping the parent collection in view.
              </Text>
              <Button
                size="sm"
                variant="secondary"
                label="Close inspector"
                onClick={() => setDrawerOpen(false)}
              />
            </VStack>
          </Drawer>
        </>
      ),
    },
    {
      id: 'command-palette',
      name: 'CommandPalette',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Keyboard-first `Ctrl+K` action launcher searching commands via `SearchSource`.',
      summaryId: 'Peluncur perintah cepat bergaya `Ctrl+K` dengan pencarian instan.',
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
              showToast({body: `Executed command #${val}`, type: 'info'});
            }}
          />
        </>
      ),
    },
    {
      id: 'popover',
      name: 'Popover',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Collision-aware anchored surface for `More filters` or lightweight inline pickers.',
      summaryId: 'Panel mengambang terikat tombol untuk filter tambahan atau pengaturan ringkas.',
      code: `<Popover isOpen={open} onOpenChange={setOpen} label="Filter" content={...}><Button label="More filters" /></Popover>`,
      render: () => (
        <Popover
          isOpen={popOpen}
          onOpenChange={setPopOpen}
          label="Quick filter options"
          content={
            <div style={{padding: 12, width: 210}}>
              <Text type="supporting">
                Anchored popover with automatic viewport flip & Escape dismissal.
              </Text>
            </div>
          }
        >
          <Button size="sm" variant="secondary" label="Toggle Popover" />
        </Popover>
      ),
    },
    {
      id: 'bottom-sheet',
      name: 'BottomSheet',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Touch-ergonomic swipeable bottom sheet with grab handle and snap points.',
      summaryId: 'Lembar bawah ramah jari untuk perangkat seluler dengan pegangan geser.',
      code: `<BottomSheet isOpen={open} onOpenChange={setOpen} label="Export options">...</BottomSheet>`,
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
              <Heading level={4}>Share prototype</Heading>
              <Text color="secondary">
                Swipe down, tap backdrop, or press Escape to dismiss.
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
      id: 'hover-card',
      name: 'HoverCard',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Non-blocking preview card revealed on pointer hover or keyboard focus.',
      summaryId: 'Kartu pratinjau ringkas saat tautan diarahkan kursor atau difokuskan.',
      code: `<HoverCard label="Package info" content={...}><Link href="#">@mehan/astryx</Link></HoverCard>`,
      render: () => (
        <HoverCard
          label="Package details"
          content={
            <div style={{padding: 10, maxWidth: 220}}>
              <VStack gap={1}>
                <Text weight="semibold">@mehan/astryx v1.0.0</Text>
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
      id: 'tooltip',
      name: 'Tooltip',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Concise plain-text micro-hint for icon buttons and truncated labels.',
      summaryId: 'Keterangan teks singkat untuk memperjelas tombol ikon atau teks terpotong.',
      code: `<Tooltip content="Verified against WCAG 2.1 AA"><Button label="Hover me" /></Tooltip>`,
      render: () => (
        <Tooltip content="Verified against WCAG 2.1 AA (4.89:1)">
          <Button size="sm" variant="secondary" label="Hover for Tooltip" />
        </Tooltip>
      ),
    },
    {
      id: 'toast',
      name: 'Toast (useToast)',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Ephemeral non-blocking confirmation toast announced politely via `useToast()`.',
      summaryId: 'Notifikasi ringan sementara tanpa memblokir alur kerja pengguna.',
      code: `const showToast = useToast();\nshowToast({type: 'info', body: 'Changes saved'});`,
      render: () => (
        <Button
          size="sm"
          variant="secondary"
          label="Trigger Toast notification"
          onClick={() =>
            showToast({
              type: 'info',
              body: 'Saved workspace settings.',
            })
          }
        />
      ),
    },
    {
      id: 'lightbox',
      name: 'Lightbox',
      category: 'Overlay',
      pkg: 'core',
      summaryEn: 'Full-viewport media inspector supporting zoom and keyboard paging.',
      summaryId: 'Penampil gambar/media layar penuh dengan perbesaran interaktif.',
      code: `<Lightbox isOpen={open} onOpenChange={setOpen} media={{src, alt: 'Render'}} />`,
      render: () => (
        <>
          <Button
            size="sm"
            variant="secondary"
            label="Inspect in Lightbox"
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
      summaryEn: 'Contrast-safe gradient scrim for captions placed over photography or artwork.',
      summaryId: 'Lapisan gradasi pelindung kontras untuk teks di atas gambar atau video.',
      code: `<Overlay content={<Badge label="Live render" />}>...</Overlay>`,
      render: () => (
        <Overlay
          content={
            <div style={{padding: 10}}>
              <Badge variant="neutral" label="Contrast-protected media caption" />
            </div>
          }
        >
          <div
            style={{
              height: 68,
              borderRadius: 8,
              background:
                'linear-gradient(135deg, #ff7597 0%, #d42a5f 60%, #4c0519 100%)',
            }}
          />
        </Overlay>
      ),
    },

    // ==================== CATEGORY 11: TABLE & LIST ====================
    {
      id: 'table',
      name: 'Table',
      category: 'Table & List',
      pkg: 'core',
      span: 'full',
      flush: true,
      summaryEn: 'Row-first production data table with shaded header band, right-aligned `tabular-nums`, and row hover.',
      summaryId: 'Tabel data produksi dengan pita header tegas, angka `tabular-nums` rata kanan, dan sorotan baris.',
      code: `<Table data={services} columns={columns} density="balanced" dividers="rows" hasHover />`,
      render: () => (
        <Table<CatalogServiceRow>
          aria-label="Production services health"
          density="balanced"
          dividers="rows"
          hasHover
          data={CATALOG_TABLE_ROWS}
          columns={[
            {
              key: 'service',
              header: 'Service',
              width: proportional(1.8, {minWidth: 180}),
              renderCell: row => (
                <VStack gap={0}>
                  <Text weight="semibold">{row.service}</Text>
                  <Text type="supporting" color="secondary">
                    {row.slug}
                  </Text>
                </VStack>
              ),
            },
            {
              key: 'region',
              header: 'Region',
              width: proportional(1.4, {minWidth: 150}),
              renderCell: row => (
                <Text type="supporting" color="secondary">
                  {row.region}
                </Text>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              width: pixel(110),
              renderCell: row => (
                <Badge variant={row.badgeVariant} label={row.status} />
              ),
            },
            {
              key: 'latency',
              header: 'P95 latency',
              width: pixel(115),
              align: 'end',
              renderCell: row => (
                <Text hasTabularNumbers weight="semibold">
                  {row.latency}
                </Text>
              ),
            },
            {
              key: 'uptime',
              header: 'Uptime',
              width: pixel(96),
              align: 'end',
              renderCell: row => (
                <Text type="supporting" color="secondary" hasTabularNumbers>
                  {row.uptime}
                </Text>
              ),
            },
            {
              key: 'actions',
              header: <VisuallyHidden>Actions</VisuallyHidden>,
              width: pixel(48),
              align: 'end',
              renderCell: row => (
                <MoreMenu
                  label={`Actions for ${row.service}`}
                  size="sm"
                  items={[
                    {label: 'Inspect metrics'},
                    {label: 'Restart workers'},
                    {type: 'divider'},
                    {label: 'Drain traffic', variant: 'destructive'},
                  ]}
                />
              ),
            },
          ]}
        />
      ),
    },
    {
      id: 'list',
      name: 'List & ListItem',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Semantic `<ul>`/`<ol>` row collection replacing noisy stacked cards on narrow screens.',
      summaryId: 'Daftar baris semantik rapi sebagai pengganti tumpukan kartu berulang.',
      code: `<List hasDividers><ListItem label="mehan-astryx-1.0.0.tgz" description="Offline tarball" /></List>`,
      render: () => (
        <List density="compact" hasDividers>
          <ListItem
            label="mehan-astryx-1.0.0.tgz"
            description="Verified offline npm tarball"
            endContent={<Badge variant="neutral" label="81 files" />}
          />
          <ListItem
            label="mehan-portable.css"
            description="Zero-build standalone stylesheet"
            endContent={<Badge variant="teal" label="7 KB" />}
          />
        </List>
      ),
    },
    {
      id: 'item',
      name: 'Item',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Single row anatomy with `startContent`, `label`, `description`, and `endContent`.',
      summaryId: 'Anatomi baris tunggal dengan ikon kiri, judul, deskripsi, dan status kanan.',
      code: `<Item label="Edge Gateway" description="Singapore · 18.4 ms" endContent={<Badge variant="success" label="Active" />} />`,
      render: () => (
        <Item
          label="Edge Gateway"
          description="Singapore · 18.4 ms p95"
          endContent={<Badge variant="success" label="Active" />}
        />
      ),
    },
    {
      id: 'metadata-list',
      name: 'MetadataList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Semantic `<dl>`/`<dt>`/`<dd>` key-value inspector for read-only object summaries.',
      summaryId: 'Pasangan kunci-nilai semantik (`<dl>`) untuk ringkasan properti objek.',
      code: `<MetadataList><MetadataListItem label="Engine">Meta Astryx ~0.7.17</MetadataListItem></MetadataList>`,
      render: () => (
        <MetadataList>
          <MetadataListItem label="Engine">Meta Astryx ~0.7.17</MetadataListItem>
          <MetadataListItem label="Color space">Perceptual OKLCH</MetadataListItem>
        </MetadataList>
      ),
    },
    {
      id: 'tree-list',
      name: 'TreeList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Hierarchical WAI-ARIA treeview with connector guides and arrow-key expand/collapse.',
      summaryId: 'Pohon hierarki folder/token dengan garis penghubung dan navigasi panah.',
      code: `<TreeList aria-label="Workspace packages" items={treeItems} />`,
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
    {
      id: 'overflow-list',
      name: 'OverflowList',
      category: 'Table & List',
      pkg: 'core',
      summaryEn: 'Single-line tag strip collapsing excess items into a clean `+N more` counter.',
      summaryId: 'Deret chip satu baris yang melipat kelebihan item menjadi penghitung `+N`.',
      code: `<OverflowList maxVisibleItems={3} overflowRenderer={items => <Badge label={\`+\${items.length} more\`} />}>...</OverflowList>`,
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

    // ==================== CATEGORY 12: UTILITY ====================
    {
      id: 'syntax-theme',
      name: 'SyntaxTheme',
      category: 'Utility',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Scoped syntax-highlighting token boundary powered by `defineSyntaxTheme()`.',
      summaryId: 'Penyedia palet pewarnaan sintaks kode lokal berbasis `defineSyntaxTheme()`.',
      code: `<SyntaxTheme theme={customSyntax}><CodeBlock language="ts" code="export const ok = true;" /></SyntaxTheme>`,
      render: () => (
        <SyntaxTheme theme={CUSTOM_SYNTAX_DEMO}>
          <CodeBlock
            language="ts"
            code={`export const colorSpace = 'oklch';\nexport const minContrast = 4.5;`}
          />
        </SyntaxTheme>
      ),
    },
    {
      id: 'media-theme',
      name: 'MediaTheme',
      category: 'Utility',
      pkg: 'core',
      summaryEn: 'Scoped dark or light token boundary for controls overlaid on dark media.',
      summaryId: 'Pembungkus tema lokal untuk menjaga kontras kontrol di atas media gelap.',
      code: `<MediaTheme mode="dark"><Button variant="secondary" label="Inspect" /></MediaTheme>`,
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
      id: 'visually-hidden',
      name: 'VisuallyHidden',
      category: 'Utility',
      pkg: 'core',
      summaryEn: 'Hides visual text while preserving full announcement for assistive screen readers.',
      summaryId: 'Menyembunyikan teks secara visual namun tetap terbaca utuh oleh screen reader.',
      code: `<button><Sparkles size={14} /><VisuallyHidden>Generate theme</VisuallyHidden></button>`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Badge variant="info" label="a11y" />
          <Text type="supporting">
            Screen-reader text attached
            <VisuallyHidden> (Verified accessible announcement)</VisuallyHidden>
          </Text>
        </HStack>
      ),
    },
  ];
}
