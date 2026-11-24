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
  Plus,
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
      span: 'wide',
      summaryEn: 'Primary, secondary, destructive, and ghost push-buttons with OKLCH 3D lip physics.',
      summaryId: 'Tombol Primary, Secondary, Destructive, dan Ghost dengan fisika bibir 3D OKLCH.',
      code: `<HStack gap={2} wrap="wrap">\n  <Button variant="primary" label="Save changes" />\n  <Button variant="secondary" label="Export CSV" />\n  <Button variant="destructive" label="Delete key" />\n  <Button variant="ghost" label="Cancel" />\n</HStack>`,
      render: () => (
        <HStack gap={2} wrap="wrap" vAlign="center">
          <Button
            variant="primary"
            size="sm"
            label="Save changes"
            icon={<Plus size={14} />}
          />
          <Button variant="secondary" size="sm" label="Export CSV" />
          <Button variant="destructive" size="sm" label="Delete key" />
          <Button variant="ghost" size="sm" label="Cancel" />
          <Button variant="secondary" size="sm" isDisabled label="Locked" />
        </HStack>
      ),
    },
    {
      id: 'segmented-control',
      name: 'SegmentedControl',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Recessed well switcher supporting Raised Ceramic or Shotcandy Espresso active pill.',
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
      id: 'button-group',
      name: 'ButtonGroup',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Joined cluster of related peer actions sharing unified outer corner geometry.',
      summaryId: 'Kelompok tombol aksi berdampingan dengan sudut luar yang menyatu rapi.',
      code: `<ButtonGroup label="Time period">\n  <Button variant="secondary" label="Day" />\n  <Button variant="secondary" label="Week" />\n  <Button variant="secondary" label="Month" />\n</ButtonGroup>`,
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
      summaryEn: 'Keyboard-navigable command menu with sections, icons, and destructive actions.',
      summaryId: 'Menu perintah aksesibel dengan pengelompokan aksi, ikon, dan opsi destruktif.',
      code: `<DropdownMenu\n  button={{label: 'Workspace actions', variant: 'secondary'}}\n  items={[{label: 'Duplicate workspace'}, {type: 'divider'}, {label: 'Archive', variant: 'destructive'}]}\n/>`,
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
      summaryEn: 'Square icon trigger enforcing an explicit accessible label for screen readers.',
      summaryId: 'Tombol ikon presisi dengan label aksesibilitas wajib bagi pembaca layar.',
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
      id: 'toggle-button',
      name: 'ToggleButton',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Stateful two-state press button (`aria-pressed`) with inset selected tint.',
      summaryId: 'Tombol tekan dua kondisi (`aria-pressed`) dengan indikator aktif lembut.',
      code: `<ToggleButton isPressed={pinned} onPressedChange={setPinned} label="Bookmark" icon={<Bookmark size={14} />} />`,
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
      id: 'link',
      name: 'Link',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Semantic anchor element styled with WCAG AA verified accent text contrast.',
      summaryId: 'Tautan semantik dengan jaminan rasio kontras teks aksen WCAG AA.',
      code: `<Link href="#docs">Read architecture guide</Link>`,
      render: () => (
        <HStack gap={4} wrap="wrap">
          <Link href="#overview">Architecture overview</Link>
          <Link href="#tokens">W3C token specification</Link>
        </HStack>
      ),
    },
    {
      id: 'more-menu',
      name: 'MoreMenu',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Compact three-dot overflow trigger for secondary row or card commands.',
      summaryId: 'Pemicu menu tiga titik ringkas untuk aksi sekunder pada baris tabel atau kartu.',
      code: `<MoreMenu label="Row actions" items={[{label: 'Rename'}, {label: 'Share'}]} />`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Text type="supporting" color="secondary">
            Row overflow actions
          </Text>
          <MoreMenu
            label="Item actions"
            size="sm"
            items={[
              {label: 'Rename item'},
              {label: 'Copy share link'},
              {type: 'divider'},
              {label: 'Remove item', variant: 'destructive'},
            ]}
          />
        </HStack>
      ),
    },
    {
      id: 'context-menu',
      name: 'ContextMenu',
      category: 'Action',
      pkg: 'core',
      summaryEn: 'Right-click and keyboard (`Shift+F10`) contextual command menu.',
      summaryId: 'Menu perintah kontekstual saat klik kanan atau pintasan `Shift+F10`.',
      code: `<ContextMenu items={[{label: 'Inspect'}, {label: 'Copy token'}]}><div>Right-click zone</div></ContextMenu>`,
      render: () => (
        <ContextMenu
          items={[
            {label: 'Copy CSS variable'},
            {label: 'Inspect contrast ratio'},
            {type: 'divider'},
            {label: 'Reset override', variant: 'destructive'},
          ]}
        >
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px dashed var(--color-border-emphasized)',
              backgroundColor: 'var(--mehan-tray)',
              textAlign: 'center',
              fontSize: 12,
              cursor: 'context-menu',
            }}
          >
            Right-click (or Shift + F10) inside this target
          </div>
        </ContextMenu>
      ),
    },
    {
      id: 'toolbar',
      name: 'Toolbar',
      category: 'Action',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Single-tab-stop formatting or canvas bar with arrow-key roving focus (`role="toolbar"`).',
      summaryId: 'Bilah alat satu titik fokus dengan perpindahan tombol panah otomatis (`role="toolbar"`).',
      code: `<Toolbar label="Editor formatting" startContent={<ToggleButton ... />} endContent={<Button ... />} />`,
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
          endContent={
            <Button variant="primary" size="sm" label="Publish draft" />
          }
        />
      ),
    },
  ];
}

function ChatAndContainerAndContentSpecimens(): SpecimenDefinition[] {
  const [chatDraft, setChatDraft] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [tags, setTags] = useState(['Design System', 'OKLCH', 'WCAG AA']);

  return [
    // ==================== CATEGORY 2: CHAT ====================
    {
      id: 'chat',
      name: 'Chat & ChatComposer',
      category: 'Chat',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Conversational AI thread primitives with system markers, bubbles, and multi-action composer.',
      summaryId: 'Komponen utas percakapan AI lengkap dengan penanda sesi, balon pesan, dan ChatComposer.',
      code: `<ChatMessageList>\n  <ChatMessage sender="user"><ChatMessageBubble variant="filled">Audit button contrast</ChatMessageBubble></ChatMessage>\n</ChatMessageList>\n<ChatComposer value={draft} onChange={setDraft} onSubmit={send} />`,
      render: () => (
        <VStack gap={3}>
          <ChatMessageList>
            <ChatSystemMessage>Design Audit Session</ChatSystemMessage>
            <ChatMessage sender="user">
              <ChatMessageBubble variant="filled">
                Verify Confectionery Strawberry primary button contrast.
              </ChatMessageBubble>
            </ChatMessage>
            <ChatMessage sender="assistant">
              <Text>
                Primary CTA passes WCAG 2.1 AA at <strong>4.89:1</strong> in Light mode and{' '}
                <strong>9.8:1</strong> in Dark mode.
              </Text>
            </ChatMessage>
          </ChatMessageList>
          <ChatComposer
            density="compact"
            value={chatDraft}
            onChange={setChatDraft}
            onSubmit={() => setChatDraft('')}
            placeholder="Ask assistant to inspect another token…"
          />
        </VStack>
      ),
    },
    {
      id: 'chat-tool-calls',
      name: 'ChatToolCalls',
      category: 'Chat',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Progressive disclosure log for AI agent tool invocations and execution timings.',
      summaryId: 'Log lipat ringkas untuk menampilkan eksekusi fungsi dan durasi kerja agen AI.',
      code: `<ChatToolCalls calls={[{name: 'compileTheme', target: 'mehan.css', status: 'complete', duration: '120ms'}]} />`,
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
      summaryEn: 'Elevated container surface with automatic nested tray flattening and pastel variants.',
      summaryId: 'Wadah permukaan terangkat dengan perataan kartu bersarang otomatis.',
      code: `<Card elevation="low">\n  <Heading level={4}>Card surface</Heading>\n  <Card variant="pink">Nested pastel card</Card>\n</Card>`,
      render: () => (
        <Card padding={3}>
          <VStack gap={2}>
            <Text weight="semibold">Elevated surface card</Text>
            <Card variant="pink" padding={2}>
              <Text type="supporting">Nested pastel card (`variant="pink"`)</Text>
            </Card>
          </VStack>
        </Card>
      ),
    },
    {
      id: 'selectable-card',
      name: 'SelectableCard',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Single or multi-select option card with accessible indicator and accent selection ring.',
      summaryId: 'Kartu pilihan paket atau metode dengan indikator aksesibel dan cincin aksen.',
      code: `<SelectableCard label="Enable Pro bundle" isSelected={selected} onChange={setSelected}>...</SelectableCard>`,
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
              Includes W3C Figma tokens & Portable CSS
            </Text>
          </VStack>
        </SelectableCard>
      ),
    },
    {
      id: 'clickable-card',
      name: 'ClickableCard',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Whole-card interactive surface that keeps nested secondary buttons independent.',
      summaryId: 'Kartu klik penuh yang tetap menjaga kemandirian tombol di dalamnya.',
      code: `<ClickableCard label="Open release" onClick={open}>...</ClickableCard>`,
      render: () => (
        <ClickableCard
          label="Trigger card action"
          padding={3}
          onClick={() => setClicks(c => c + 1)}
        >
          <HStack hAlign="between" vAlign="center">
            <VStack gap={0.5}>
              <Text weight="semibold">Release v1.0.4</Text>
              <Text type="supporting" color="secondary">
                Click anywhere on this card
              </Text>
            </VStack>
            <Badge variant="neutral" label={`Activated ${clicks}×`} />
          </HStack>
        </ClickableCard>
      ),
    },
    {
      id: 'collapsible',
      name: 'Collapsible',
      category: 'Container',
      pkg: 'core',
      summaryEn: 'Inline accordion disclosure for tucking away low-frequency or technical fields.',
      summaryId: 'Laci lipat sebaris untuk menyembunyikan opsi teknis agar tampilan tetap tenang.',
      code: `<Collapsible trigger="Advanced webhook headers"><Text>Hidden until needed.</Text></Collapsible>`,
      render: () => (
        <Collapsible trigger="Advanced webhook headers">
          <Text type="supporting" color="secondary">
            HMAC-SHA256 signature verification is active on port 443 with 3 retries.
          </Text>
        </Collapsible>
      ),
    },
    {
      id: 'carousel',
      name: 'Carousel',
      category: 'Container',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Snap-scrolling horizontal rail with keyboard navigation and paging buttons.',
      summaryId: 'Rel geser horizontal presisi dengan navigasi papan ketik dan tombol geser.',
      code: `<Carousel aria-label="Highlights"><Card width={180}>Slide 1</Card></Carousel>`,
      render: () => (
        <Carousel aria-label="Atmosphere slides" gap={3}>
          {[
            {name: 'Confectionery', sub: 'Warm oat & espresso'},
            {name: 'Shotcandy 1:1', sub: 'Inverted pill craft'},
            {name: 'Porcelain', sub: 'Daylight ceramic SaaS'},
            {name: 'Stone', sub: 'Architectural slate'},
            {name: 'Portable CSS', sub: 'Zero-bundler HTML'},
          ].map(item => (
            <Card key={item.name} width={176} padding={3}>
              <VStack gap={1}>
                <Badge variant="info" label="Preset" />
                <Text weight="semibold">{item.name}</Text>
                <Text type="supporting" color="secondary">
                  {item.sub}
                </Text>
              </VStack>
            </Card>
          ))}
        </Carousel>
      ),
    },

    // ==================== CATEGORY 4: CONTENT ====================
    {
      id: 'heading',
      name: 'Heading',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Calibrated display and section headings (`level={1..6}`) with balanced semibold/bold weights.',
      summaryId: 'Judul halaman dan bagian (`level={1..6}`) dengan proporsi ketebalan seimbang.',
      code: `<Heading level={2}>Tactile Confectionery</Heading>`,
      render: () => (
        <VStack gap={1}>
          <Heading level={2}>Page & Section Heading</Heading>
          <Heading level={4} color="secondary">
            Card Subheading (Semibold 600)
          </Heading>
        </VStack>
      ),
    },
    {
      id: 'text',
      name: 'Text',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Body, label, and supporting copy with smart `maxLines` truncation and `tabular-nums`.',
      summaryId: 'Teks isi, label, dan keterangan dengan pemotongan cerdas `maxLines` & `tabular-nums`.',
      code: `<Text color="secondary" hasTabularNumbers>Latency: 18.4 ms</Text>`,
      render: () => (
        <VStack gap={1}>
          <Text weight="semibold">Readable body copy in active theme font</Text>
          <Text type="supporting" color="secondary" hasTabularNumbers>
            Supporting metadata · 1,284 tokens · 18.4 ms p95
          </Text>
        </VStack>
      ),
    },
    {
      id: 'avatar',
      name: 'Avatar',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'User or organization badge with deterministic color and initials fallback.',
      summaryId: 'Identitas pengguna atau organisasi dengan inisial otomatis saat tanpa foto.',
      code: `<HStack gap={2}><Avatar name="Raihan Mehan" size="md" /><Avatar name="Mila Kamalia" shape="rounded" /></HStack>`,
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
      summaryEn: 'Overlapping team facepile with crisp cutout rings and `+N` overflow badge.',
      summaryId: 'Tumpukan avatar tim dengan cincin pemisah bersih dan penghitung `+N`.',
      code: `<AvatarGroup size="md"><Avatar name="Ayu" /><AvatarGroupOverflow count={5} /></AvatarGroup>`,
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
      summaryEn: 'Editorial pull-quote with inline-start accent rule and source attribution.',
      summaryId: 'Kutipan editorial dengan garis tepi aksen dan atribusi sumber.',
      code: `<Blockquote cite="Mehan UX North Star">Simple first, power on demand.</Blockquote>`,
      render: () => (
        <Blockquote cite="Mehan UX Principle">
          Simple first, power on demand — keep initial views calmer than the capability behind them.
        </Blockquote>
      ),
    },
    {
      id: 'citation',
      name: 'Citation',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Inline source reference pill for grounded AI answers and technical specs.',
      summaryId: 'Pil rujukan sumber sebaris untuk jawaban AI maupun dokumentasi teknis.',
      code: `<Citation number={1} source={{title: 'WCAG 2.1 SC 1.4.3', url: '#contrast'}} />`,
      render: () => (
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Citation
            number={1}
            source={{title: 'WCAG 2.1 SC 1.4.3', url: '#contrast'}}
          />
          <Citation
            number={2}
            variant="number"
            source={{title: 'OKLCH Perceptual Space', url: '#oklch'}}
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
      summaryId: 'Penanda kode sebaris dengan font monospace aktif.',
      code: `<Text>Import <Code>@mehan/astryx/styles.css</Code> once.</Text>`,
      render: () => (
        <Text type="supporting">
          Run <Code>pnpm verify</Code> to validate <Code>@mehan/astryx</Code>.
        </Text>
      ),
    },
    {
      id: 'kbd',
      name: 'Kbd',
      category: 'Content',
      pkg: 'core',
      summaryEn: '3D moulded physical keycap badge for keyboard shortcut hints.',
      summaryId: 'Lencana pintasan papan ketik bergaya tuts fisik 3D.',
      code: `<Kbd keys="mod+k" />`,
      render: () => (
        <HStack gap={2} vAlign="center">
          <Kbd keys="mod+k" />
          <Kbd keys="mod+shift+p" />
        </HStack>
      ),
    },
    {
      id: 'icon',
      name: 'Icon',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Harmonized Lucide icon registry mapped across all Astryx component slots.',
      summaryId: 'Set ikon Lucide yang terhubung penuh ke seluruh slot ikon internal Astryx.',
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
      id: 'markdown',
      name: 'Markdown',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Streaming-safe GitHub Flavored Markdown renderer styled with theme tokens.',
      summaryId: 'Perender Markdown GFM siap streaming dengan tipografi tema.',
      code: `<Markdown>{"**Bold**, *italic*, and \`inline code\`."}</Markdown>`,
      render: () => (
        <Markdown density="compact" headingLevelStart={4}>
          {`**Mehan DNA** pairs *OKLCH tonal ramps* with \`@astryxdesign/core\` primitives.`}
        </Markdown>
      ),
    },
    {
      id: 'thumbnail',
      name: 'Thumbnail',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Attachment preview tile with loading shimmer and accessible remove button.',
      summaryId: 'Pratinjau lampiran persegi dengan kerangka muat dan tombol hapus aksesibel.',
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
      summaryEn: 'Zero-rerender live elapsed `<time>` counter with aligned tabular digits.',
      summaryId: 'Penghitung waktu berjalan ringan dengan angka sejajar (`tabular-nums`).',
      code: `<Timer format="clock" />`,
      render: () => (
        <HStack gap={3} vAlign="center">
          <Badge variant="success" label="Active build" />
          <Timer format="clock" weight="semibold" color="primary" />
        </HStack>
      ),
    },
    {
      id: 'timestamp',
      name: 'Timestamp',
      category: 'Content',
      pkg: 'core',
      summaryEn: 'Semantic `<time>` element revealing multi-timezone details on hover.',
      summaryId: 'Penanda waktu semantik lengkap dengan info zona waktu saat diarahkan kursor.',
      code: `<Timestamp value="2026-11-24T12:00:00Z" format="date_time" timezoneID="UTC" />`,
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
      summaryEn: 'Removable entity pill used inside active filter strips and multi-select fields.',
      summaryId: 'Chip entitas yang dapat dihapus untuk bilah filter aktif.',
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
              onClick={() => setTags(['Design System', 'OKLCH', 'WCAG AA'])}
            />
          )}
        </HStack>
      ),
    },
    {
      id: 'code-block',
      name: 'CodeBlock',
      category: 'Content',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Syntax-highlighted code block with line numbers, title bar, and 1-click copy.',
      summaryId: 'Blok kode berwarna dengan judul file, nomor baris, dan tombol salin cepat.',
      code: `<CodeBlock language="tsx" title="theme.ts" code="const theme = createMehanTheme({ atmosphere: 'confectionery' });" hasCopyButton />`,
      render: () => (
        <CodeBlock
          language="tsx"
          title="src/theme.ts"
          hasLineNumbers
          hasCopyButton
          code={`import {createMehanTheme} from '@mehan/astryx/dna';\n\nexport const appTheme = createMehanTheme({\n  name: 'app-confectionery',\n  atmosphere: 'confectionery',\n  segmentedStyle: 'espresso',\n});`}
        />
      ),
    },
    {
      id: 'empty-state',
      name: 'EmptyState',
      category: 'Content',
      pkg: 'core',
      span: 'wide',
      summaryEn: 'Teaching zero-data state with concise title, 1-line guidance, and 1 starter CTA.',
      summaryId: 'Tampilan data kosong yang mengarahkan langkah pertama secara jelas dan tenang.',
      code: `<EmptyState isCompact icon={<Inbox size={22} />} title="No webhooks yet" description="Add an endpoint to receive release events." actions={<Button variant="primary" size="sm" label="Add webhook" />} />`,
      render: () => (
        <EmptyState
          isCompact
          icon={<Inbox size={22} />}
          title="No webhooks configured"
          description="Connect an HTTPS endpoint to receive real-time deployment notifications."
          actions={<Button variant="primary" size="sm" label="Add webhook" />}
        />
      ),
    },
  ];
}

export function useCatalogGroupA(): SpecimenDefinition[] {
  return [...ActionSpecimens(), ...ChatAndContainerAndContentSpecimens()];
}
