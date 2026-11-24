import React, {useState} from 'react';
import {
  Avatar,
  AvatarGroup,
  AvatarGroupOverflow,
  Badge,
  Blockquote,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  ChatComposer,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  ChatSystemMessage,
  ChatToolCalls,
  Citation,
  ClickableCard,
  Code,
  CodeBlock,
  Collapsible,
  ContextMenu,
  DropdownMenu,
  EmptyState,
  HStack,
  Heading,
  IconButton,
  Kbd,
  Link,
  Markdown,
  MoreMenu,
  SegmentedControl,
  SegmentedControlItem,
  SelectableCard,
  Stack,
  Text,
  Thumbnail,
  Timer,
  Timestamp,
  ToggleButton,
  Token,
  Toolbar,
  VStack,
  useToast,
} from '@astryxdesign/core';
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Bookmark,
  Copy,
  Download,
  Inbox,
  Italic,
  Sparkles,
} from 'lucide-react';
import type {SpecimenDefinition} from './SpecimenCard';

const THUMB_SVG_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="#fce7f3"/><circle cx="48" cy="48" r="22" fill="#e0366b"/></svg>`,
  );

function ActionSpecimens(): SpecimenDefinition[] {
  const showToast = useToast();
  const [segVal, setSegVal] = useState('board');
  const [pinned, setPinned] = useState(true);
  const [boldOn, setBoldOn] = useState(true);
  const [italicOn, setItalicOn] = useState(false);

  return [
    {
      id: 'button',
      name: 'Button',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Primary, secondary, destructive, and ghost push-buttons with OKLCH 3D lip.',
      summaryId: 'Tombol Primary, Secondary, Destructive, dan Ghost dengan fisika bibir 3D OKLCH.',
      code: `<HStack gap={2} wrap="wrap">\n  <Button variant="primary" label="Save changes" />\n  <Button variant="secondary" label="Export" />\n  <Button variant="destructive" label="Delete" />\n  <Button variant="ghost" label="Cancel" />\n</HStack>`,
      render: () => (
        <HStack gap={2} wrap="wrap">
          <Button variant="primary" size="sm" label="Save changes" />
          <Button variant="secondary" size="sm" label="Export" />
          <Button variant="destructive" size="sm" label="Delete" />
          <Button variant="ghost" size="sm" label="Cancel" />
        </HStack>
      ),
    },
    {
      id: 'button-group',
      name: 'ButtonGroup',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Joined cluster of related actions sharing unified radius geometry.',
      summaryId: 'Kelompok tombol aksi berdampingan dengan sudut luar terpadu.',
      code: `<ButtonGroup>\n  <Button variant="secondary" label="Day" />\n  <Button variant="secondary" label="Week" />\n  <Button variant="secondary" label="Month" />\n</ButtonGroup>`,
      render: () => (
        <ButtonGroup label="Time period">
          <Button variant="secondary" size="sm" label="Day" />
          <Button variant="secondary" size="sm" label="Week" />
          <Button variant="secondary" size="sm" label="Month" />
        </ButtonGroup>
      ),
    },
    {
      id: 'dropdown-menu',
      name: 'DropdownMenu',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Keyboard-navigable action menu with sections, shortcuts, and submenus.',
      summaryId: 'Menu aksi aksesibel dengan grup bagian, pintasan keyboard, dan submenu.',
      code: `<DropdownMenu\n  button={{label: 'Actions', variant: 'secondary'}}\n  items={[\n    {label: 'Duplicate project'},\n    {label: 'Export tokens'},\n    {type: 'divider'},\n    {label: 'Archive', variant: 'danger'},\n  ]}\n/>`,
      render: () => (
        <DropdownMenu
          button={{label: 'Workspace actions', variant: 'secondary', size: 'sm'}}
          items={[
            {
              label: 'Duplicate workspace',
              onClick: () => showToast({body: 'Duplicated workspace', type: 'info'}),
            },
            {
              label: 'Download bundle',
              icon: <Download size={14} />,
              onClick: () => showToast({body: 'Bundle queued', type: 'info'}),
            },
            {type: 'divider'},
            {label: 'Archive workspace', variant: 'destructive'},
          ]}
        />
      ),
    },
    {
      id: 'icon-button',
      name: 'IconButton',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Compact square trigger requiring an explicit accessible label.',
      summaryId: 'Tombol ikon ringkas dengan label aksesibilitas wajib untuk pembaca layar.',
      code: `<HStack gap={2}>\n  <IconButton variant="primary" label="Generate" icon={<Sparkles size={15} />} />\n  <IconButton variant="secondary" label="Copy" icon={<Copy size={15} />} />\n  <IconButton variant="ghost" label="Download" icon={<Download size={15} />} />\n</HStack>`,
      render: () => (
        <HStack gap={2}>
          <IconButton
            variant="primary"
            size="sm"
            label="Generate"
            icon={<Sparkles size={15} />}
          />
          <IconButton
            variant="secondary"
            size="sm"
            label="Copy"
            icon={<Copy size={15} />}
          />
          <IconButton
            variant="ghost"
            size="sm"
            label="Download"
            icon={<Download size={15} />}
          />
        </HStack>
      ),
    },
    {
      id: 'link',
      name: 'Link',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Semantic anchor styled with WCAG AA accent text contrast.',
      summaryId: 'Tautan semantik dengan jaminan rasio kontras aksen WCAG AA.',
      code: `<Link href="#docs">Read architecture guide</Link>`,
      render: () => (
        <HStack gap={3} wrap="wrap">
          <Link href="#overview">Architecture overview</Link>
          <Link href="#tokens">W3C token spec</Link>
        </HStack>
      ),
    },
    {
      id: 'more-menu',
      name: 'MoreMenu',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Overflow three-dot trigger for row or card secondary commands.',
      summaryId: 'Tombol tiga titik untuk perintah sekunder pada baris tabel atau kartu.',
      code: `<MoreMenu label="Row actions" items={[{label: 'Edit'}, {label: 'Share'}]} />`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Text type="supporting" color="secondary">
            Row overflow menu:
          </Text>
          <MoreMenu
            label="Item actions"
            size="sm"
            items={[
              {label: 'Rename'},
              {label: 'Copy link'},
              {type: 'divider'},
              {label: 'Remove', variant: 'destructive'},
            ]}
          />
        </HStack>
      ),
    },
    {
      id: 'segmented-control',
      name: 'SegmentedControl',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Recessed well switcher supporting Raised Ceramic or Shotcandy Espresso pill.',
      summaryId: 'Pemilih mode cekung dengan gaya pil Raised Ceramic atau Espresso khas Shotcandy.',
      code: `<SegmentedControl label="View mode" value={view} onChange={setView}>\n  <SegmentedControlItem value="board" label="Board" />\n  <SegmentedControlItem value="table" label="Table" />\n  <SegmentedControlItem value="timeline" label="Timeline" />\n</SegmentedControl>`,
      render: () => (
        <SegmentedControl
          label="View mode"
          size="sm"
          value={segVal}
          onChange={setSegVal}
        >
          <SegmentedControlItem value="board" label="Board" />
          <SegmentedControlItem value="table" label="Table" />
          <SegmentedControlItem value="timeline" label="Timeline" />
        </SegmentedControl>
      ),
    },
    {
      id: 'toggle-button',
      name: 'ToggleButton',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Stateful two-state press button (`aria-pressed`) with inset active fill.',
      summaryId: 'Tombol tekan dua kondisi (`aria-pressed`) dengan warna aktif lembut.',
      code: `<ToggleButton isPressed={pinned} onChange={setPinned} label="Bookmark" icon={<Bookmark size={14} />} />`,
      render: () => (
        <HStack gap={2}>
          <ToggleButton
            size="sm"
            isPressed={pinned}
            onPressedChange={setPinned}
            label={pinned ? 'Bookmarked' : 'Bookmark'}
            icon={<Bookmark size={14} />}
          />
        </HStack>
      ),
    },
    {
      id: 'toolbar',
      name: 'Toolbar',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Roving-tabindex formatting or canvas action bar (`role="toolbar"`).',
      summaryId: 'Bilah alat dengan fokus panah keyboard otomatis (`role="toolbar"`).',
      code: `<Toolbar label="Text formatting" startContent={<ToggleButton ... />} />`,
      render: () => (
        <Toolbar
          label="Editor formatting"
          size="sm"
          startContent={
            <>
              <ToggleButton
                size="sm"
                isIconOnly
                isPressed={boldOn}
                onPressedChange={setBoldOn}
                label="Bold"
                icon={<Bold size={14} />}
              />
              <ToggleButton
                size="sm"
                isIconOnly
                isPressed={italicOn}
                onPressedChange={setItalicOn}
                label="Italic"
                icon={<Italic size={14} />}
              />
              <IconButton
                size="sm"
                variant="ghost"
                label="Align left"
                icon={<AlignLeft size={14} />}
              />
              <IconButton
                size="sm"
                variant="ghost"
                label="Align center"
                icon={<AlignCenter size={14} />}
              />
            </>
          }
        />
      ),
    },
    {
      id: 'context-menu',
      name: 'ContextMenu',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Right-click / long-press contextual menu surface.',
      summaryId: 'Menu konteks yang muncul saat klik kanan atau tekan lama.',
      code: `<ContextMenu items={[{label: 'Inspect'}, {label: 'Copy token'}]}>\n  <div>Right-click target</div>\n</ContextMenu>`,
      render: () => (
        <ContextMenu
          items={[
            {label: 'Copy CSS variable'},
            {label: 'Inspect contrast'},
            {type: 'divider'},
            {label: 'Reset override', variant: 'destructive'},
          ]}
        >
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px dashed var(--color-border-emphasized)',
              textAlign: 'center',
              fontSize: 12,
              cursor: 'context-menu',
            }}
          >
            Right-click (or Shift+F10) on this zone
          </div>
        </ContextMenu>
      ),
    },
  ];
}

function ChatAndContainerAndContentSpecimens(): SpecimenDefinition[] {
  const [chatDraft, setChatDraft] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [tags, setTags] = useState(['Design System', 'OKLCH']);

  return [
    // ==================== CATEGORY 2: CHAT ====================
    {
      id: 'chat',
      name: 'Chat & ChatComposer',
      category: 'Chat',
      pkg: 'core',
      summaryEn: 'Complete AI conversation primitives: message list, bubbles, system markers, and composer.',
      summaryId: 'Rangkaian komponen percakapan AI lengkap beserta kolom ketik ChatComposer.',
      code: `<ChatMessageList>\n  <ChatMessage sender="user"><ChatMessageBubble variant="filled">Generate palette</ChatMessageBubble></ChatMessage>\n</ChatMessageList>\n<ChatComposer value={draft} onChange={setDraft} onSubmit={send} />`,
      render: () => (
        <VStack gap={2}>
          <ChatMessageList>
            <ChatSystemMessage>Session started</ChatSystemMessage>
            <ChatMessage sender="user">
              <ChatMessageBubble variant="filled">
                Check button contrast
              </ChatMessageBubble>
            </ChatMessage>
            <ChatMessage sender="assistant">
              <Text type="supporting">
                Strawberry CTA passes at 5.24:1 on Confectionery paper.
              </Text>
            </ChatMessage>
          </ChatMessageList>
          <ChatComposer
            density="compact"
            value={chatDraft}
            onChange={setChatDraft}
            onSubmit={() => setChatDraft('')}
            placeholder="Reply to assistant…"
          />
        </VStack>
      ),
    },
    {
      id: 'chat-tool-calls',
      name: 'ChatToolCalls',
      category: 'Chat',
      pkg: 'core',
      summaryEn: 'Collapsible function/tool execution log for LLM agent workflows.',
      summaryId: 'Ringkasan pemanggilan fungsi/alat AI yang dapat dibuka-tutup.',
      code: `<ChatToolCalls calls={[{name: 'verifyContrast', target: 'mehan.css', status: 'complete', duration: '85ms'}]} />`,
      render: () => (
        <ChatToolCalls
          calls={[
            {
              name: 'compileTheme',
              target: 'mehan-confectionery.css',
              status: 'complete',
              duration: '120ms',
              additions: 238,
            },
            {
              name: 'auditContrast',
              target: 'WCAG 2.1 AA',
              status: 'complete',
              duration: '42ms',
            },
          ]}
        />
      ),
    },

    // ==================== CATEGORY 3: CONTAINER ====================
    {
      id: 'card',
      name: 'Card',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Elevated surface container with automatic nested flattening and pastel variants.',
      summaryId: 'Wadah permukaan terangkat dengan perataan kartu bersarang otomatis.',
      code: `<Card elevation="low">\n  <Heading level={4}>Card surface</Heading>\n  <Card variant="muted">Nested muted card</Card>\n</Card>`,
      render: () => (
        <Card padding={3}>
          <VStack gap={2}>
            <Text weight="semibold">Elevated Card</Text>
            <Card variant="pink" padding={2}>
              <Text type="supporting">Pastel category surface (`variant="pink"`)</Text>
            </Card>
          </VStack>
        </Card>
      ),
    },
    {
      id: 'carousel',
      name: 'Carousel',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Accessible snap-scrolling horizontal rail with keyboard and button paging.',
      summaryId: 'Rel geser horizontal aksesibel dengan tombol navigasi halaman.',
      code: `<Carousel aria-label="Highlights">\n  <Card width={160}>Slide 1</Card>\n  <Card width={160}>Slide 2</Card>\n</Carousel>`,
      render: () => (
        <Carousel aria-label="Atmosphere slides" gap={2}>
          {['Confectionery', 'Porcelain', 'Stone', 'Shotcandy'].map(name => (
            <Card key={name} width={140} padding={3}>
              <VStack gap={1}>
                <Badge variant="info" label="Preset" />
                <Text weight="semibold">{name}</Text>
              </VStack>
            </Card>
          ))}
        </Carousel>
      ),
    },
    {
      id: 'clickable-card',
      name: 'ClickableCard',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Whole-card interactive target preserving independent nested buttons.',
      summaryId: 'Kartu interaktif penuh yang tetap aman bagi tombol di dalamnya.',
      code: `<ClickableCard label="Open analytics" onClick={open}>\n  <Heading level={4}>Analytics</Heading>\n</ClickableCard>`,
      render: () => (
        <ClickableCard
          label="Trigger card action"
          padding={3}
          onClick={() => setClicks(c => c + 1)}
        >
          <HStack hAlign="between" vAlign="center">
            <Text weight="semibold">Interactive Card</Text>
            <Badge variant="neutral" label={`Clicked ${clicks}×`} />
          </HStack>
        </ClickableCard>
      ),
    },
    {
      id: 'collapsible',
      name: 'Collapsible',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Progressive disclosure container for tucking away advanced options.',
      summaryId: 'Laci lipat untuk menyembunyikan parameter lanjutan agar layar tetap tenang.',
      code: `<Collapsible trigger="Advanced options">\n  <Text>Hidden until needed.</Text>\n</Collapsible>`,
      render: () => (
        <Collapsible trigger="Advanced webhook headers">
          <Text type="supporting" color="secondary">
            HMAC-SHA256 signature verification is active on port 443.
          </Text>
        </Collapsible>
      ),
    },
    {
      id: 'selectable-card',
      name: 'SelectableCard',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Selection card with built-in accessible indicator and selected border state.',
      summaryId: 'Kartu pilihan paket/opsi dengan indikator centang aksesibel.',
      code: `<SelectableCard label="Pro plan" isSelected={selected} onChange={setSelected}>\n  <Text weight="bold">Pro Tier</Text>\n</SelectableCard>`,
      render: () => (
        <SelectableCard
          label="Enable Pro tactile bundle"
          isSelected={selectedPlan}
          onChange={setSelectedPlan}
          padding={3}
        >
          <VStack gap={0.5}>
            <Text weight="semibold">Studio Pro Bundle</Text>
            <Text type="supporting" color="secondary">
              Includes W3C Figma export & Portable CSS
            </Text>
          </VStack>
        </SelectableCard>
      ),
    },

    // ==================== CATEGORY 4: CONTENT ====================
    {
      id: 'avatar',
      name: 'Avatar',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'User or workspace identity badge with automatic initials fallback.',
      summaryId: 'Identitas pengguna atau tim dengan inisial otomatis saat tanpa foto.',
      code: `<HStack gap={2}>\n  <Avatar name="Raihan Mehan" size="md" />\n  <Avatar name="Budi Setiadi" size="md" shape="rounded" />\n</HStack>`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Avatar name="Raihan Mehan" size="md" />
          <Avatar name="Mila Kamalia" size="md" shape="rounded" />
          <Avatar name="Budi Setiadi" size="sm" />
        </HStack>
      ),
    },
    {
      id: 'avatar-group',
      name: 'AvatarGroup',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Overlapping facepile with uniform sizing and `+N` overflow count.',
      summaryId: 'Tumpukan avatar tim dengan ukuran seragam dan penghitung `+N`.',
      code: `<AvatarGroup size="md">\n  <Avatar name="Ayu" />\n  <Avatar name="Raka" />\n  <AvatarGroupOverflow count={4} />\n</AvatarGroup>`,
      render: () => (
        <AvatarGroup size="md">
          <Avatar name="Ayu Lestari" />
          <Avatar name="Raka Pratama" />
          <Avatar name="Nadia Putri" />
          <AvatarGroupOverflow count={5} />
        </AvatarGroup>
      ),
    },
    {
      id: 'blockquote',
      name: 'Blockquote',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Editorial quotation with inline-start accent rule and optional citation.',
      summaryId: 'Kutipan teks dengan garis tepi dan atribusi sumber opsional.',
      code: `<Blockquote cite="Dieter Rams">Less, but better.</Blockquote>`,
      render: () => (
        <Blockquote cite="Mehan Design Principle">
          Simple first, power on demand — never dump raw knobs upfront.
        </Blockquote>
      ),
    },
    {
      id: 'citation',
      name: 'Citation',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Inline reference pill for grounded AI responses and documentation.',
      summaryId: 'Pil rujukan sumber untuk jawaban AI maupun dokumentasi teknis.',
      code: `<Citation number={1} source={{title: 'WCAG 2.1 Contrast Spec', url: '#wcag'}} />`,
      render: () => (
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Citation
            number={1}
            source={{title: 'WCAG 2.1 SC 1.4.3', url: '#contrast'}}
          />
          <Citation
            number={2}
            variant="number"
            source={{title: 'OKLCH Color Space', url: '#oklch'}}
          />
        </HStack>
      ),
    },
    {
      id: 'code',
      name: 'Code',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Inline monospace token span using `--font-family-code`.',
      summaryId: 'Teks kode sebaris menggunakan font monospace tema.',
      code: `<Text>Import <Code>@mehan/astryx/styles.css</Code> once.</Text>`,
      render: () => (
        <Text type="supporting">
          Run <Code>pnpm verify</Code> to check <Code>@mehan/astryx</Code>.
        </Text>
      ),
    },
    {
      id: 'code-block',
      name: 'CodeBlock',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Syntax-highlighted code block with themed tokens and 1-click copy.',
      summaryId: 'Blok kode berwarna dengan tombol salin cepat dan nomor baris.',
      code: `<CodeBlock language="tsx" code="const theme = createMehanTheme({ atmosphere: 'confectionery' });" hasCopyButton />`,
      render: () => (
        <CodeBlock
          language="tsx"
          code={`const theme = createMehanTheme({\n  atmosphere: 'confectionery',\n  segmentedStyle: 'espresso',\n});`}
          hasCopyButton
        />
      ),
    },
    {
      id: 'empty-state',
      name: 'EmptyState',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Actionable zero-data placeholder explaining what belongs here and how to start.',
      summaryId: 'Tampilan data kosong yang ramah dengan tombol langkah pertama yang jelas.',
      code: `<EmptyState isCompact icon={<Inbox size={24} />} title="No presets" description="Save a theme preset to reuse it." />`,
      render: () => (
        <EmptyState
          isCompact
          icon={<Inbox size={22} />}
          title="No saved webhooks"
          description="Add an endpoint to receive real-time release events."
          actions={<Button variant="primary" size="sm" label="Add webhook" />}
        />
      ),
    },
    {
      id: 'heading',
      name: 'Heading',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Bricolage Grotesque display & section headings (`level={1..6}`).',
      summaryId: 'Judul hierarkis dengan pelacakan huruf rapat khas Bricolage Grotesque.',
      code: `<Heading level={3}>Tactile Confectionery</Heading>`,
      render: () => (
        <VStack gap={1}>
          <Heading level={3}>Display & Section Heading</Heading>
          <Heading level={5} color="accent">
            Accent Subtitle Level 5
          </Heading>
        </VStack>
      ),
    },
    {
      id: 'text',
      name: 'Text',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Body, label, and supporting typography with tabular figure support.',
      summaryId: 'Teks isi, label, dan pendukung dengan dukungan angka sejajar (`tabular-nums`).',
      code: `<Text color="secondary" hasTabularNumbers>Latency: 18.4 ms</Text>`,
      render: () => (
        <VStack gap={0.5}>
          <Text weight="semibold">Primary body copy (Figtree)</Text>
          <Text type="supporting" color="secondary" hasTabularNumbers>
            Supporting metadata · 1,284 tokens verified
          </Text>
        </VStack>
      ),
    },
    {
      id: 'icon',
      name: 'Icon',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Crisp 1.75px stroke Lucide icon set harmonized with Astryx semantic slots.',
      summaryId: 'Set ikon Lucide bergaris 1.75px yang selaras dengan registri ikon Astryx.',
      code: `<Sparkles size={18} />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Sparkles size={18} />
          <Bookmark size={18} />
          <Download size={18} />
          <Copy size={18} />
        </HStack>
      ),
    },
    {
      id: 'kbd',
      name: 'Kbd',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Physical keycap shortcut badge with raised key border.',
      summaryId: 'Indikator tombol pintasan papan ketik bergaya tuts fisik.',
      code: `<Kbd keys="mod+shift+p" />`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Kbd keys="mod+k" />
          <Kbd keys="mod+shift+p" />
        </HStack>
      ),
    },
    {
      id: 'markdown',
      name: 'Markdown',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Streaming-ready GFM Markdown renderer styled natively with Astryx tokens.',
      summaryId: 'Perender Markdown GFM siap streaming dengan tipografi & kode bertema.',
      code: `<Markdown>{"**Bold**, *italic*, and \`inline code\`."}</Markdown>`,
      render: () => (
        <Markdown density="compact" headingLevelStart={4}>
          {`**Mehan DNA** pairs *OKLCH ramps* with \`@astryxdesign/core\` primitives.`}
        </Markdown>
      ),
    },
    {
      id: 'thumbnail',
      name: 'Thumbnail',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Square attachment preview with skeleton shimmer and hover remove action.',
      summaryId: 'Pratinjau lampiran gambar persegi dengan tombol hapus aksesibel.',
      code: `<Thumbnail src={previewUrl} alt="Artwork" label="artwork.svg" onRemove={() => {}} />`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Thumbnail
            src={THUMB_SVG_URI}
            alt="Strawberry swatch artwork"
            label="strawberry-card.svg"
            onRemove={() => {}}
          />
          <Thumbnail isLoading label="uploading.png" />
        </HStack>
      ),
    },
    {
      id: 'timer',
      name: 'Timer',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Zero-rerender live elapsed `<time>` counter for builds and tasks.',
      summaryId: 'Penghitung waktu berjalan ringan tanpa membebani render React.',
      code: `<Timer format="clock" />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Badge variant="success" label="Live session" />
          <Timer format="clock" weight="semibold" color="primary" />
        </HStack>
      ),
    },
    {
      id: 'timestamp',
      name: 'Timestamp',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Semantic `<time>` formatter with multi-timezone hover tooltip.',
      summaryId: 'Format waktu otomatis lengkap dengan kartu zona waktu saat diarahkan kursor.',
      code: `<Timestamp value="2026-11-24T12:00:00Z" format="date_long" timezoneID="UTC" />`,
      render: () => (
        <Timestamp
          value="2026-11-24T12:00:00Z"
          format="date_time"
          timezoneID="UTC"
        />
      ),
    },
    {
      id: 'token',
      name: 'Token',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Removable entity chip/pill used inside filters and multi-value fields.',
      summaryId: 'Chip entitas yang dapat dihapus untuk filter dan tag.',
      code: `<Token label="OKLCH" onRemove={() => {}} />`,
      render: () => (
        <HStack gap={1.5} wrap="wrap">
          {tags.map(t => (
            <Token
              key={t}
              label={t}
              onRemove={() => setTags(prev => prev.filter(x => x !== t))}
            />
          ))}
          {tags.length === 0 && (
            <Button
              size="sm"
              variant="ghost"
              label="Restore tags"
              onClick={() => setTags(['Design System', 'OKLCH'])}
            />
          )}
        </HStack>
      ),
    },
  ];
}

export function useCatalogGroupA(): SpecimenDefinition[] {
  return [...ActionSpecimens(), ...ChatAndContainerAndContentSpecimens()];
}
