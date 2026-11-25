import React, {useMemo, useRef, useState} from 'react';
import {
  AspectRatio,
  Badge,
  Banner,
  Button,
  Card,
  Center,
  CheckboxInput,
  ChatComposer,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageList,
  ChatSystemMessage,
  ChatToolCalls,
  CodeBlock,
  Collapsible,
  Dialog,
  DialogHeader,
  Divider,
  Grid,
  HStack,
  Heading,
  Item,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Link,
  MoreMenu,
  NumberInput,
  RadioList,
  RadioListItem,
  ScrollableArea,
  Section,
  SegmentedControl,
  SegmentedControlItem,
  SelectableCard,
  Selector,
  Stack,
  StackItem,
  Switch,
  Table,
  Text,
  TextInput,
  TopNav,
  TopNavHeading,
  TopNavItem,
  VStack,
  VisuallyHidden,
  pixel,
  proportional,
  useTableColumnSettings,
  useTableColumnSettingsState,
  useToast,
} from '@astryxdesign/core';
import {
  CanvasStage,
  CanvasZoomBar,
  ColorSwatch,
  ColumnSettingsMenu,
  CopyButton,
  DataChart,
  MetricCard,
  PrecisionSlider,
  PropertyRow,
  TimelineScrubber,
  WorkspaceLayout,
  useAutoDraft,
} from '@mehan/astryx';
import {
  CreditCard,
  DollarSign,
  Download,
  Folder,
  LayoutGrid,
  List as ListIcon,
  Lock,
  MapPin,
  Mic,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  User,
  Wallet,
  X,
} from 'lucide-react';
import type {StudioCopy} from '../i18n';
import type {StudioLang} from '../studioState';

const BACKDROP_PRESETS = [
  {
    id: 'cobalt-sky',
    label: 'Porcelain Cobalt',
    swatch: '#2563eb',
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 52%, #1e3a8a 100%)',
  },
  {
    id: 'berry-cream',
    label: 'Strawberry Cream',
    swatch: '#e0366b',
    gradient: 'linear-gradient(135deg, #ff7597 0%, #d42a5f 52%, #7a1236 100%)',
  },
  {
    id: 'mint-jade',
    label: 'Mint Glaze',
    swatch: '#0d9468',
    gradient: 'linear-gradient(135deg, #6ee7b7 0%, #0d9468 55%, #064e3b 100%)',
  },
  {
    id: 'amber-honey',
    label: 'Tangerine Zest',
    swatch: '#ea580c',
    gradient: 'linear-gradient(135deg, #fdba74 0%, #ea580c 54%, #7c2d12 100%)',
  },
  {
    id: 'plum-velvet',
    label: 'Grape Velvet',
    swatch: '#7c3aed',
    gradient: 'linear-gradient(135deg, #c4b5fd 0%, #7c3aed 54%, #3b0764 100%)',
  },
] as const;

type ShowcaseBadgeVariant =
  | 'blue'
  | 'cyan'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow';

interface InventoryRow extends Record<string, unknown> {
  id: string;
  name: string;
  meta: string;
  available: number;
  location: string;
  category: string;
  tags: Array<{label: string; variant: ShowcaseBadgeVariant}>;
  artKind: 'watch' | 'headphones' | 'backpack' | 'wallet' | 'tumbler' | 'throw';
  selected: boolean;
}

const DEFAULT_INVENTORY: InventoryRow[] = [
  {
    id: 'a',
    name: 'Minimalist Watch',
    meta: 'Stainless steel, sapphire crystal',
    available: 42,
    location: 'Aisle 3',
    category: 'Wearables',
    tags: [{label: 'New', variant: 'blue'}],
    artKind: 'watch',
    selected: false,
  },
  {
    id: 'b',
    name: 'Wireless Headphones',
    meta: 'ANC, 30hr battery',
    available: 128,
    location: 'Aisle 1',
    category: 'Audio',
    tags: [{label: 'Popular', variant: 'green'}],
    artKind: 'headphones',
    selected: true,
  },
  {
    id: 'c',
    name: 'Canvas Backpack',
    meta: 'Water-resistant, 25L',
    available: 63,
    location: 'Aisle 2',
    category: 'Bags',
    tags: [{label: 'Limited', variant: 'yellow'}],
    artKind: 'backpack',
    selected: false,
  },
  {
    id: 'd',
    name: 'Leather Wallet',
    meta: 'Full-grain, RFID blocking',
    available: 15,
    location: 'Aisle 4',
    category: 'Wearables',
    tags: [{label: 'Leather', variant: 'yellow'}],
    artKind: 'wallet',
    selected: true,
  },
  {
    id: 'e',
    name: 'Travel Tumbler',
    meta: 'Vacuum insulated, 16oz',
    available: 87,
    location: 'Aisle 5',
    category: 'Drinkware',
    tags: [{label: 'Drinkware', variant: 'teal'}],
    artKind: 'tumbler',
    selected: false,
  },
  {
    id: 'f',
    name: 'Linen Throw',
    meta: 'Heavyweight, oat weave',
    available: 21,
    location: 'Aisle 6',
    category: 'Home',
    tags: [{label: 'Home', variant: 'orange'}],
    artKind: 'throw',
    selected: true,
  },
];

/** Self-contained crisp SVG product studio illustrations (100% offline file:// safe). */
function ProductIllustration({
  kind,
  compact = false,
}: {
  kind: InventoryRow['artKind'];
  compact?: boolean;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at 35% 28%, var(--color-background-surface) 0%, var(--mehan-well) 100%)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 120"
        width={compact ? 28 : '72%'}
        height={compact ? 28 : '72%'}
        fill="none"
      >
        {kind === 'watch' && (
          <>
            <rect
              x="48"
              y="14"
              width="24"
              height="92"
              rx="8"
              fill="var(--color-border-emphasized)"
            />
            <circle
              cx="60"
              cy="60"
              r="28"
              fill="var(--color-background-card)"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
            />
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="42"
              stroke="var(--color-accent)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="60"
              x2="74"
              y2="66"
              stroke="var(--color-text-primary)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
        {kind === 'headphones' && (
          <>
            <path
              d="M30 66V54C30 37.43 43.43 24 60 24C76.57 24 90 37.43 90 54V66"
              stroke="var(--color-text-primary)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect
              x="22"
              y="58"
              width="16"
              height="32"
              rx="8"
              fill="var(--color-accent)"
            />
            <rect
              x="82"
              y="58"
              width="16"
              height="32"
              rx="8"
              fill="var(--color-accent)"
            />
          </>
        )}
        {kind === 'backpack' && (
          <>
            <path
              d="M46 28C46 21 52 16 60 16C68 16 74 21 74 28"
              stroke="var(--color-text-primary)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <rect
              x="32"
              y="28"
              width="56"
              height="68"
              rx="18"
              fill="var(--color-background-card)"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
            />
            <rect
              x="42"
              y="58"
              width="36"
              height="26"
              rx="9"
              fill="var(--color-accent)"
            />
          </>
        )}
        {(kind === 'wallet' || kind === 'tumbler' || kind === 'throw') && (
          <>
            <rect
              x="28"
              y="32"
              width="64"
              height="56"
              rx="14"
              fill="var(--color-background-card)"
              stroke="var(--color-text-primary)"
              strokeWidth="4"
            />
            <circle cx="74" cy="60" r="7" fill="var(--color-accent)" />
          </>
        )}
      </svg>
    </div>
  );
}

/**
 * Official Meta Astryx Theme Showcase Benchmark (`theme-showcase/page.tsx`)
 * Exercises TopNav, Hero Display Typography, Storefront Product Cards, Checkout
 * Form + Nested SelectableCards, Studio AI Chat + Nested Order Card, Inventory
 * Filterable Table, Revenue Activity Feed, and Sign-in Modal Dialog.
 */
function OfficialThemeShowcase() {
  const showToast = useToast();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPass, setSignInPass] = useState('');

  // Storefront product card quantities
  const [qtyWatch, setQtyWatch] = useState<number | null>(1);
  const [qtyAudio, setQtyAudio] = useState<number | null>(1);
  const [qtyBag, setQtyBag] = useState<number | null>(1);
  const [addedKey, setAddedKey] = useState<string | null>(null);

  // Checkout state
  const [email, setEmail] = useState('');
  const [shipping, setShipping] = useState('economy');
  const [payment, setPayment] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState<string>('us');
  const [saveInfo, setSaveInfo] = useState(true);
  const [showPaymentPreview, setShowPaymentPreview] = useState(false);

  // Studio AI Chat state
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Array<{id: number; text: string}>>([]);

  // Inventory Table state
  const [invQuery, setInvQuery] = useState('');
  const [invCategory, setInvCategory] = useState<string | null>(null);
  const [invLocation, setInvLocation] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(['b', 'd', 'f']),
  );

  const products = [
    {
      key: 'watch' as const,
      name: 'Minimalist Watch',
      desc: 'Clean design meets everyday durability.',
      badge: 'New',
      variant: 'blue' as const,
      qty: qtyWatch,
      setQty: setQtyWatch,
    },
    {
      key: 'headphones' as const,
      name: 'Wireless Headphones',
      desc: 'Immersive sound, all-day comfort.',
      badge: 'Popular',
      variant: 'green' as const,
      qty: qtyAudio,
      setQty: setQtyAudio,
    },
    {
      key: 'backpack' as const,
      name: 'Canvas Backpack',
      desc: 'Water-resistant canvas with a quiet profile.',
      badge: 'Limited',
      variant: 'yellow' as const,
      qty: qtyBag,
      setQty: setQtyBag,
    },
  ];

  const filteredInventory = useMemo(
    () =>
      DEFAULT_INVENTORY.filter(
        row =>
          (!invQuery ||
            `${row.name} ${row.meta}`
              .toLowerCase()
              .includes(invQuery.toLowerCase())) &&
          (!invCategory || row.category === invCategory) &&
          (!invLocation || row.location === invLocation),
      ),
    [invQuery, invCategory, invLocation],
  );

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const submitChat = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, {id: Date.now(), text: trimmed}]);
    setDraft('');
  };

  return (
    <div className="showcase-frame" data-theme-preview="true">
      <TopNav
        label="Theme showcase navigation"
        heading={<TopNavHeading heading="Studio" />}
        centerContent={
          <>
            <TopNavItem label="Shop" href="#shop" isSelected />
            <TopNavItem label="New In" href="#new" />
            <TopNavItem label="Stories" href="#stories" />
            <TopNavItem label="Help" href="#help" />
          </>
        }
        endContent={
          <HStack gap={2} vAlign="center">
            <Button
              label="Search"
              variant="ghost"
              isIconOnly
              icon={<Search size={16} />}
              onClick={() => showToast({body: 'Search opened', type: 'info'})}
            />
            <Button
              label="Account"
              variant="ghost"
              isIconOnly
              icon={<User size={16} />}
              onClick={() => setSignInOpen(true)}
            />
            <Button
              label="Cart"
              variant="ghost"
              isIconOnly
              icon={<ShoppingBag size={16} />}
              onClick={() => showToast({body: 'Cart has 2 items', type: 'info'})}
            />
            <Button
              label="Sign in"
              variant="primary"
              size="sm"
              onClick={() => setSignInOpen(true)}
            />
          </HStack>
        }
      />

      <Section padding={5} variant="transparent">
        <VStack gap={8}>
          {/* Hero Storefront */}
          <Center>
            <VStack gap={6} width="100%" maxWidth={900}>
              <Center>
                <VStack gap={3} hAlign="center" maxWidth={560}>
                  <Heading level={2} type="display-2" color="accent" justify="center">
                    Little joys, everywhere you go
                  </Heading>
                  <Text type="body" color="secondary" justify="center">
                    Official Meta Astryx Theme Showcase — testing typography, nested
                    card contrast, recessed inputs, chat bubbles, and data tables in
                    one responsive benchmark.
                  </Text>
                </VStack>
              </Center>

              <Grid columns={{minWidth: 210, max: 3, repeat: 'fit'}} gap={4}>
                {products.map(p => (
                  <Card key={p.key} padding={0} height="100%">
                    <VStack gap={0} height="100%">
                      <AspectRatio ratio={1.25}>
                        <ProductIllustration kind={p.key} />
                      </AspectRatio>
                      <StackItem size="fill">
                        <VStack padding={4} gap={2} hAlign="center" height="100%">
                          <Badge label={p.badge} variant={p.variant} />
                          <Heading level={3} justify="center">
                            {p.name}
                          </Heading>
                          <StackItem size="fill">
                            <Text
                              type="supporting"
                              color="secondary"
                              justify="center"
                              display="block"
                            >
                              {p.desc}
                            </Text>
                          </StackItem>
                          <HStack
                            gap={2}
                            vAlign="center"
                            hAlign="center"
                            wrap="wrap"
                            width="100%"
                          >
                            <NumberInput
                              label={`${p.name} quantity`}
                              isLabelHidden
                              value={p.qty}
                              onChange={v => {
                                p.setQty(v);
                                setAddedKey(null);
                              }}
                              min={1}
                              max={99}
                              size="sm"
                              width={76}
                            />
                            <Button
                              label={addedKey === p.key ? 'Added to cart' : 'Add to cart'}
                              variant="secondary"
                              size="sm"
                              onClick={() => setAddedKey(p.key)}
                            />
                          </HStack>
                        </VStack>
                      </StackItem>
                    </VStack>
                  </Card>
                ))}
              </Grid>
            </VStack>
          </Center>

          {/* Row 2: Checkout Card + Studio AI Chat */}
          <Grid columns={{minWidth: 310, max: 2, repeat: 'fit'}} gap={4} align="stretch">
            <Card padding={4}>
              <VStack gap={4}>
                <Heading level={3}>Checkout</Heading>
                <VStack gap={3}>
                  <TextInput
                    label="Email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={setEmail}
                  />
                  <RadioList
                    label="Shipping method"
                    description="Delivery time depends on warehouse availability."
                    value={shipping}
                    onChange={setShipping}
                  >
                    <RadioListItem
                      value="economy"
                      label="Economy shipping"
                      description="5–7 business days"
                      endContent={<Text weight="bold">$12.00</Text>}
                    />
                    <RadioListItem
                      value="standard"
                      label="Standard shipping"
                      description="3–5 business days"
                      endContent={<Text weight="bold">$16.00</Text>}
                    />
                    <RadioListItem
                      value="express"
                      label="Express shipping"
                      description="1–2 business days"
                      endContent={<Text weight="bold">$24.00</Text>}
                    />
                  </RadioList>

                  <VStack gap={2}>
                    <Text type="supporting" weight="bold">
                      Payment method
                    </Text>
                    <Grid columns={{minWidth: 85, max: 3, repeat: 'fit'}} gap={2}>
                      <SelectableCard
                        label="Pay with card"
                        isSelected={payment === 'card'}
                        onChange={() => setPayment('card')}
                        padding={3}
                      >
                        <VStack gap={1} hAlign="center">
                          <CreditCard size={18} />
                          <Text type="supporting" weight="bold">
                            Card
                          </Text>
                        </VStack>
                      </SelectableCard>
                      <SelectableCard
                        label="Pay with Apple Pay"
                        isSelected={payment === 'apple'}
                        onChange={() => setPayment('apple')}
                        padding={3}
                      >
                        <VStack gap={1} hAlign="center">
                          <Smartphone size={18} />
                          <Text type="supporting" weight="bold">
                            Apple Pay
                          </Text>
                        </VStack>
                      </SelectableCard>
                      <SelectableCard
                        label="Pay with Google Pay"
                        isSelected={payment === 'google'}
                        onChange={() => setPayment('google')}
                        padding={3}
                      >
                        <VStack gap={1} hAlign="center">
                          <Wallet size={18} />
                          <Text type="supporting" weight="bold">
                            Wallet
                          </Text>
                        </VStack>
                      </SelectableCard>
                    </Grid>
                  </VStack>

                  <TextInput
                    label="Card number"
                    placeholder="1234 1234 1234 1234"
                    value={cardNumber}
                    onChange={setCardNumber}
                    startIcon={<CreditCard size={15} />}
                  />
                  <Grid columns={{minWidth: 100, max: 2, repeat: 'fit'}} gap={2}>
                    <TextInput
                      label="Expiry"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={setExpiry}
                    />
                    <TextInput
                      label="CVC"
                      placeholder="123"
                      value={cvc}
                      onChange={setCvc}
                    />
                  </Grid>
                  <Selector
                    label="Country"
                    placement="below"
                    value={country}
                    onChange={setCountry}
                    options={[
                      {value: 'us', label: 'United States'},
                      {value: 'id', label: 'Indonesia'},
                      {value: 'sg', label: 'Singapore'},
                      {value: 'jp', label: 'Japan'},
                      {value: 'gb', label: 'United Kingdom'},
                    ]}
                  />
                </VStack>

                <CheckboxInput
                  label="Save my details for 1-click checkout"
                  value={saveInfo}
                  onChange={setSaveInfo}
                />

                {showPaymentPreview && (
                  <Banner
                    status="info"
                    title="Payment preview only"
                    description="No payment is submitted in Theme Showcase mode."
                  />
                )}

                <Button
                  variant="primary"
                  label="Pay now"
                  icon={<Lock size={14} />}
                  onClick={() => setShowPaymentPreview(true)}
                />
              </VStack>
            </Card>

            {/* Studio AI Chat Card */}
            <Card padding={0} height="100%">
              <Layout
                height="fill"
                padding={4}
                header={
                  <LayoutHeader hasDivider>
                    <HStack hAlign="between" vAlign="center" gap={2}>
                      <Heading level={3}>Studio AI</Heading>
                      <HStack gap={1}>
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          label="Export conversation"
                          icon={<Download size={15} />}
                          onClick={() =>
                            showToast({body: 'Conversation exported', type: 'info'})
                          }
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          label="Close chat"
                          icon={<X size={15} />}
                          onClick={() => showToast({body: 'Demo chat panel', type: 'info'})}
                        />
                      </HStack>
                    </HStack>
                  </LayoutHeader>
                }
                footer={
                  <LayoutFooter>
                    <VStack gap={2}>
                      <HStack gap={1.5} wrap="wrap">
                        {[
                          'Reschedule delivery',
                          'Update shipping address',
                          'Start a return',
                        ].map(q => (
                          <Button
                            key={q}
                            variant="secondary"
                            size="sm"
                            label={q}
                            onClick={() => setDraft(q)}
                          />
                        ))}
                      </HStack>
                      <ChatComposer
                        value={draft}
                        onChange={setDraft}
                        onSubmit={submitChat}
                        placeholder="Ask Studio AI…"
                        footerActions={
                          <Button
                            variant="ghost"
                            size="sm"
                            isIconOnly
                            label="Attach file"
                            icon={<Plus size={15} />}
                          />
                        }
                        sendActions={
                          <Button
                            variant="ghost"
                            size="sm"
                            isIconOnly
                            label="Voice input"
                            icon={<Mic size={15} />}
                          />
                        }
                      />
                    </VStack>
                  </LayoutFooter>
                }
              >
                <LayoutContent
                  style={{maxHeight: 540}}
                  padding={0}
                  label="Studio AI conversation"
                >
                  <ChatMessageList>
                    <ChatSystemMessage>Today</ChatSystemMessage>
                    <ChatMessage sender="user">
                      <ChatMessageBubble variant="filled">
                        Where’s my order #1043?
                      </ChatMessageBubble>
                    </ChatMessage>
                    <ChatMessage sender="assistant">
                      <VStack gap={3}>
                        <ChatToolCalls
                          calls={[
                            {
                              name: 'lookupShipment',
                              target: 'order #1043',
                              status: 'complete',
                              duration: '140ms',
                            },
                          ]}
                        />
                        <Text>
                          Your order #1043 shipped this morning from Aisle 3 and is
                          on track to arrive tomorrow by 8:00 PM.
                        </Text>
                        <Card padding={3}>
                          <VStack gap={1}>
                            <Item
                              label="Items"
                              description="Minimalist Watch · Linen Throw"
                              endContent={<Text weight="bold">$248</Text>}
                            />
                            <Item
                              label="Estimated arrival"
                              description="Tomorrow by 8pm"
                              endContent={<Badge variant="green" label="On time" />}
                            />
                            <Item
                              label="Tracking"
                              description="UPS 1Z 999 AA1 0123"
                              endContent={<Link href="#track">Track</Link>}
                            />
                          </VStack>
                        </Card>
                      </VStack>
                    </ChatMessage>
                    {messages.map(m => (
                      <ChatMessage key={m.id} sender="user">
                        <ChatMessageBubble variant="filled">
                          {m.text}
                        </ChatMessageBubble>
                      </ChatMessage>
                    ))}
                  </ChatMessageList>
                </LayoutContent>
              </Layout>
            </Card>
          </Grid>

          {/* Row 3: Inventory Table + Revenue Activity */}
          <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
            <Card padding={4}>
              <VStack gap={3}>
                <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                  <Heading level={3}>Inventory</Heading>
                  <Button
                    variant="primary"
                    size="sm"
                    label="Add item"
                    icon={<Plus size={14} />}
                    onClick={() =>
                      showToast({body: 'New inventory item drawer', type: 'info'})
                    }
                  />
                </HStack>

                <HStack gap={2} wrap="wrap" vAlign="center">
                  <TextInput
                    label="Search inventory"
                    isLabelHidden
                    size="sm"
                    hasClear
                    placeholder="Filter items…"
                    startIcon={<Search size={14} />}
                    value={invQuery}
                    onChange={setInvQuery}
                    width={190}
                  />
                  <Selector
                    label="Category"
                    isLabelHidden
                    placeholder="Category"
                    size="sm"
                    placement="below"
                    hasClear
                    startIcon={<Folder size={14} />}
                    value={invCategory}
                    onChange={setInvCategory}
                    options={['Wearables', 'Audio', 'Bags', 'Drinkware', 'Home']}
                  />
                  <Selector
                    label="Location"
                    isLabelHidden
                    placeholder="Location"
                    size="sm"
                    placement="below"
                    hasClear
                    startIcon={<MapPin size={14} />}
                    value={invLocation}
                    onChange={setInvLocation}
                    options={[
                      'Aisle 1',
                      'Aisle 2',
                      'Aisle 3',
                      'Aisle 4',
                      'Aisle 5',
                      'Aisle 6',
                    ]}
                  />
                </HStack>

                <Banner
                  status="warning"
                  title="2 items are running low in stock (< 25 available)"
                />

                <Table<InventoryRow>
                  aria-label="Store inventory"
                  data={filteredInventory}
                  columns={[
                    {
                      key: 'select',
                      header: <VisuallyHidden>Select</VisuallyHidden>,
                      width: pixel(44),
                      renderCell: row => (
                        <CheckboxInput
                          label={`Select ${row.name}`}
                          isLabelHidden
                          value={selectedIds.has(row.id)}
                          onChange={checked => toggleRow(row.id, checked)}
                        />
                      ),
                    },
                    {
                      key: 'item',
                      header: 'Item',
                      width: proportional(2.2, {minWidth: 150}),
                      renderCell: row => (
                        <HStack gap={2} vAlign="center">
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              overflow: 'hidden',
                              flex: 'none',
                            }}
                          >
                            <ProductIllustration kind={row.artKind} compact />
                          </div>
                          <VStack gap={0}>
                            <Text weight="semibold">{row.name}</Text>
                            <Text type="supporting" color="secondary">
                              {row.meta}
                            </Text>
                          </VStack>
                        </HStack>
                      ),
                    },
                    {
                      key: 'available',
                      header: 'Stock',
                      width: pixel(74),
                      align: 'end',
                      renderCell: row => <Text hasTabularNumbers>{row.available}</Text>,
                    },
                    {
                      key: 'tags',
                      header: 'Tag',
                      width: pixel(98),
                      align: 'end',
                      renderCell: row => (
                        <HStack gap={1} hAlign="end">
                          {row.tags.map(t => (
                            <Badge key={t.label} label={t.label} variant={t.variant} />
                          ))}
                        </HStack>
                      ),
                    },
                    {
                      key: 'actions',
                      header: <VisuallyHidden>Actions</VisuallyHidden>,
                      width: pixel(48),
                      align: 'end',
                      renderCell: row => (
                        <MoreMenu
                          label={`Actions for ${row.name}`}
                          size="sm"
                          items={[
                            {label: 'Edit item'},
                            {label: 'Duplicate'},
                            {type: 'divider'},
                            {label: 'Delete', variant: 'destructive'},
                          ]}
                        />
                      ),
                    },
                  ]}
                  density="balanced"
                  dividers="rows"
                  hasHover
                />
              </VStack>
            </Card>

            {/* Revenue & Activity Card */}
            <Card padding={4}>
              <VStack gap={4}>
                <Heading level={3}>Revenue & activity</Heading>
                <Grid columns={{minWidth: 130, max: 2, repeat: 'fit'}} gap={3}>
                  <MetricCard
                    label="Monthly revenue"
                    value="$18,420"
                    delta={{value: '+12.4%', direction: 'up'}}
                    caption="30-day rolling store sales"
                  />
                  <MetricCard
                    label="Fulfillment SLA"
                    value="99.4%"
                    delta={{value: '+0.6%', direction: 'up'}}
                    caption="Same-day warehouse dispatch"
                  />
                </Grid>
                <Divider variant="subtle" />
                <HStack hAlign="between" vAlign="center">
                  <Heading level={4}>Recent orders</Heading>
                  <Link href="#orders">See all</Link>
                </HStack>
                <ScrollableArea label="Recent order activity" style={{maxHeight: 250}}>
                  <VStack gap={1}>
                    {[
                      {id: '1043', detail: 'Placed · 1:59 pm', amt: '+$248', refund: false},
                      {id: '1041', detail: 'Refunded · 12:40 pm', amt: '−$89', refund: true},
                      {id: '1040', detail: 'Placed · 10:30 am', amt: '+$156', refund: false},
                      {id: '1038', detail: 'Placed · 9:11 am', amt: '+$412', refund: false},
                    ].map(act => (
                      <Item
                        key={act.id}
                        startContent={
                          <Center width={30} height={30}>
                            {act.refund ? (
                              <DollarSign size={15} />
                            ) : (
                              <ShoppingBag size={15} />
                            )}
                          </Center>
                        }
                        label={`Order #${act.id}`}
                        description={act.detail}
                        endContent={
                          <Text
                            hasTabularNumbers
                            weight="bold"
                            color={act.refund ? 'secondary' : 'primary'}
                          >
                            {act.amt}
                          </Text>
                        }
                      />
                    ))}
                  </VStack>
                </ScrollableArea>
              </VStack>
            </Card>
          </Grid>
        </VStack>
      </Section>

      {/* Sign In Modal Dialog */}
      <Dialog
        isOpen={signInOpen}
        onOpenChange={setSignInOpen}
        purpose="form"
        width={400}
        aria-label="Sign in"
      >
        <Stack gap={4}>
          <DialogHeader title="Sign in" onOpenChange={setSignInOpen} />
          <TextInput
            label="Email"
            placeholder="you@studio.com"
            value={signInEmail}
            onChange={setSignInEmail}
          />
          <TextInput
            label="Password"
            type="password"
            value={signInPass}
            onChange={setSignInPass}
          />
          <HStack gap={2} hAlign="end">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={() => setSignInOpen(false)}
            />
            <Button
              variant="primary"
              label="Sign in"
              onClick={() => setSignInOpen(false)}
            />
          </HStack>
        </Stack>
      </Dialog>
    </div>
  );
}

interface TemplatesViewProps {
  lang: StudioLang;
  copy: StudioCopy;
}

export function TemplatesView({lang, copy}: TemplatesViewProps) {
  const isId = lang === 'id';
  const showToast = useToast();
  const [templateTab, setTemplateTab] = useState<string>('showcase');

  // Tier 1: 5-in-1 Workspace Topology Explorer states
  const [topologyMode, setTopologyMode] = useState<
    'form-result' | 'workbench' | 'explorer' | 'collection' | 'studio'
  >('explorer');
  const [topoInspectorOpen, setTopoInspectorOpen] = useState(true);
  const [topoSelectedItem, setTopoSelectedItem] = useState('Edge Gateway');
  const [topoZoom, setTopoZoom] = useState(100);
  const [topoTime, setTopoTime] = useState(2.4);
  const [topoEnvName, setTopoEnvName] = useState('prod-ap-southeast');
  const [topoTier, setTopoTier] = useState('multi-region');
  const [topoCanaryPct, setTopoCanaryPct] = useState(25);
  const [topoBlend, setTopoBlend] = useState('normal');

  // SaaS Dashboard states
  const [deployFilter, setDeployFilter] = useState<string>('all');
  const [deployQuery, setDeployQuery] = useState<string>('');
  const [dashActiveCols, setDashActiveCols] = useState<ReadonlyArray<string>>([
    'service',
    'env',
    'latency',
    'status',
  ]);
  const dashColState = useTableColumnSettingsState({
    columns: [
      {key: 'service', label: isId ? 'Layanan' : 'Service', isAlwaysVisible: true},
      {key: 'env', label: isId ? 'Lingkungan' : 'Environment'},
      {key: 'latency', label: isId ? 'Latensi P50' : 'P50 latency'},
      {key: 'status', label: 'Status'},
    ],
    activeColumnKeys: dashActiveCols,
    onChangeActiveColumnKeys: setDashActiveCols,
    defaultColumnKeys: ['service', 'env', 'latency', 'status'],
  });

  // Settings states (with useAutoDraft dogfooding)
  const orgDraft = useAutoDraft({
    key: 'mehan-template-org-name',
    initialValue: 'Mehan Labs',
    version: 1,
  });
  const [billingEmail, setBillingEmail] = useState('ops@mehan.design');
  const [webhookSecret, setWebhookSecret] = useState('whsec_94fa82c10e');
  const [ssoEnforced, setSsoEnforced] = useState(true);
  const [sessionTtl, setSessionTtl] = useState('24h');

  // Shotcandy 3D Canvas states
  const [shotPadding, setShotPadding] = useState(36);
  const [shotRadius, setShotRadius] = useState(18);
  const [shotTilt, setShotTilt] = useState(-4);
  const [shotZoom, setShotZoom] = useState(100);
  const [shotPlayhead, setShotPlayhead] = useState(1.2);
  const [backdropId, setBackdropId] = useState<string>('cobalt-sky');
  const activeBackdrop =
    BACKDROP_PRESETS.find(b => b.id === backdropId) ?? BACKDROP_PRESETS[0];

  const deploymentRows = useMemo(() => {
    const all = [
      {
        id: 'dep-1',
        service: 'Design Token API',
        env: 'Production',
        latency: '18 ms',
        status: isId ? 'Sehat' : 'Healthy',
        variant: 'success' as const,
      },
      {
        id: 'dep-2',
        service: 'Billing Checkout UI',
        env: 'Production',
        latency: '24 ms',
        status: isId ? 'Sehat' : 'Healthy',
        variant: 'success' as const,
      },
      {
        id: 'dep-3',
        service: 'Preview Sandbox',
        env: 'Staging',
        latency: '41 ms',
        status: isId ? 'Sinkronisasi' : 'Syncing',
        variant: 'info' as const,
      },
      {
        id: 'dep-4',
        service: 'Webhook Dispatcher',
        env: 'Production',
        latency: '112 ms',
        status: isId ? 'Tinjau' : 'Review',
        variant: 'warning' as const,
      },
    ];
    return all.filter(item => {
      if (deployFilter === 'prod' && item.env !== 'Production') return false;
      if (deployFilter === 'staging' && item.env !== 'Staging') return false;
      if (
        deployQuery.trim() &&
        !item.service.toLowerCase().includes(deployQuery.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [deployFilter, deployQuery, isId]);

  const dashColPlugin = useTableColumnSettings<(typeof deploymentRows)[number]>(
    dashColState.columnSettingsConfig,
  );

  const topologyJsxSnippet = useMemo(() => {
    if (topologyMode === 'form-result') {
      return `<WorkspaceLayout\n  startPane={{title: 'Parameters', mobileMode: 'stack', content: <FormFields />}}\n>\n  <LiveResultPreview />\n</WorkspaceLayout>`;
    }
    if (topologyMode === 'workbench') {
      return `<WorkspaceLayout\n  toolbar={<Toolbar ... />}\n  startPane={{title: 'Sources', isResizable: true, content: <TreeList />}}\n>\n  <MainEditor />\n</WorkspaceLayout>`;
    }
    if (topologyMode === 'collection') {
      return `<WorkspaceLayout\n  toolbar={<FilterToolbar />}\n  endPane={{title: 'Row Details', isOpen, onOpenChange: setIsOpen, content: <Inspector />}}\n>\n  <Table ... />\n</WorkspaceLayout>`;
    }
    if (topologyMode === 'studio') {
      return `<WorkspaceLayout\n  startPane={{title: 'Layers', content: <LayerList />}}\n  endPane={{title: 'Properties', isOpen: true, onOpenChange: setOpen, content: <PropertyRows />}}\n>\n  <CanvasStage backdrop="dots" bottomEnd={<CanvasZoomBar ... />} transport={<TimelineScrubber ... />}>\n    <Viewport />\n  </CanvasStage>\n</WorkspaceLayout>`;
    }
    return `<WorkspaceLayout\n  toolbar={<Toolbar ... />}\n  startPane={{title: 'Navigation', isCollapsible: true, content: <NavList />}}\n  endPane={{title: 'Inspector', isOpen, onOpenChange: setIsOpen, content: <Details />}}\n>\n  <MainView />\n</WorkspaceLayout>`;
  }, [topologyMode]);

  return (
    <Stack gap={4}>
      <Stack
        direction="horizontal"
        justify="between"
        align="center"
        wrap="wrap"
        gap={3}
      >
        <Stack gap={1}>
          <Heading level={2}>{copy.templates.title}</Heading>
          <Text color="secondary">{copy.templates.subtitle}</Text>
        </Stack>

        <SegmentedControl
          label="Template archetype"
          size="sm"
          value={templateTab}
          onChange={setTemplateTab}
        >
          <SegmentedControlItem
            value="showcase"
            label={copy.templates.tabShowcase}
          />
          <SegmentedControlItem
            value="topologies"
            label={copy.templates.tabTopologies}
          />
          <SegmentedControlItem
            value="dashboard"
            label={copy.templates.tabDashboard}
          />
          <SegmentedControlItem
            value="settings"
            label={copy.templates.tabSettings}
          />
          <SegmentedControlItem value="canvas" label={copy.templates.tabCanvas} />
        </SegmentedControl>
      </Stack>

      {templateTab === 'showcase' && <OfficialThemeShowcase />}

      {templateTab === 'topologies' && (
        <Stack gap={3}>
          <Card elevation="low" padding={4}>
            <Stack gap={3}>
              <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                <Stack gap={0.5}>
                  <Badge
                    variant="info"
                    label={
                      isId
                        ? '1 Primitif · 5 Topologi Universal'
                        : '1 Primitive · 5 Universal Topologies'
                    }
                  />
                  <Heading level={3}>
                    {isId
                      ? 'WorkspaceLayout + CanvasStage di atas Meta Astryx'
                      : 'WorkspaceLayout + CanvasStage on Meta Astryx'}
                  </Heading>
                </Stack>
                <CopyButton
                  value={topologyJsxSnippet}
                  label={isId ? 'Salin JSX topologi' : 'Copy topology JSX'}
                  copiedLabel={isId ? 'Tersalin' : 'Copied'}
                />
              </HStack>

              <SegmentedControl
                label="Workspace topology mode"
                size="sm"
                value={topologyMode}
                onChange={v =>
                  setTopologyMode(
                    v as
                      | 'form-result'
                      | 'workbench'
                      | 'explorer'
                      | 'collection'
                      | 'studio',
                  )
                }
              >
                <SegmentedControlItem value="explorer" label="3-Pane Explorer" />
                <SegmentedControlItem value="form-result" label="Form + Result" />
                <SegmentedControlItem value="workbench" label="2-Pane Workbench" />
                <SegmentedControlItem value="collection" label="Collection + Inspector" />
                <SegmentedControlItem value="studio" label="Canvas Studio" />
              </SegmentedControl>

              <WorkspaceLayout
                enableShortcuts={false}
                scrollMode="page"
                label="Interactive workspace topology preview"
                toolbar={
                  topologyMode === 'form-result' ? undefined : (
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <HStack gap={2} vAlign="center">
                        <Text weight="semibold">
                          {topologyMode === 'collection'
                            ? isId
                              ? 'Koleksi Layanan & Filter'
                              : 'Service Collection & Filters'
                            : topologyMode === 'studio'
                              ? isId
                                ? 'Kanvas Studio Interaktif'
                                : 'Interactive Studio Workbench'
                              : topologyMode === 'workbench'
                                ? isId
                                  ? 'Editor Sumber & Pratinjau'
                                  : 'Resizable Source Workbench'
                                : isId
                                  ? 'Penjelajah Layanan 3-Panel'
                                  : '3-Pane Service Explorer'}
                        </Text>
                        <Badge
                          variant="neutral"
                          label={
                            topologyMode === 'workbench'
                              ? isId
                                ? 'Tepi dapat digeser'
                                : 'Resizable split'
                              : topologyMode === 'collection'
                                ? '4 services'
                                : 'ap-southeast-1'
                          }
                        />
                      </HStack>
                      {(topologyMode === 'explorer' ||
                        topologyMode === 'collection' ||
                        topologyMode === 'studio') && (
                        <Button
                          variant="secondary"
                          size="sm"
                          label={
                            topoInspectorOpen
                              ? isId
                                ? 'Tutup Inspector'
                                : 'Hide Inspector'
                              : isId
                                ? 'Buka Inspector'
                                : 'Open Inspector'
                          }
                          onClick={() => setTopoInspectorOpen(prev => !prev)}
                        />
                      )}
                    </HStack>
                  )
                }
                startPane={
                  topologyMode === 'collection'
                    ? undefined
                    : {
                        title:
                          topologyMode === 'form-result'
                            ? isId
                              ? 'Parameter Input'
                              : 'Input Parameters'
                            : topologyMode === 'studio'
                              ? isId
                                ? 'Lapisan'
                                : 'Scene Layers'
                              : topologyMode === 'workbench'
                                ? isId
                                  ? 'Berkas Sumber'
                                  : 'Source Files'
                                : isId
                                  ? 'Layanan Aktif'
                                  : 'Services',
                        defaultWidth: topologyMode === 'form-result' ? 284 : 228,
                        isResizable: topologyMode === 'workbench',
                        mobileMode:
                          topologyMode === 'form-result' ? 'stack' : 'collapsible',
                        content:
                          topologyMode === 'form-result' ? (
                            <Stack gap={3}>
                              <TextInput
                                label={isId ? 'Target klaster' : 'Cluster target'}
                                size="sm"
                                value={topoEnvName}
                                onChange={setTopoEnvName}
                              />
                              <Stack gap={1}>
                                <Text type="supporting" weight="semibold" color="secondary">
                                  {isId ? 'Topologi replikasi' : 'Replication tier'}
                                </Text>
                                <SegmentedControl
                                  label="Replication tier"
                                  size="sm"
                                  value={topoTier}
                                  onChange={setTopoTier}
                                >
                                  <SegmentedControlItem value="single" label="Single AZ" />
                                  <SegmentedControlItem value="multi-region" label="Multi-Region" />
                                </SegmentedControl>
                              </Stack>
                              <PrecisionSlider
                                label={isId ? 'Canary' : 'Canary'}
                                value={topoCanaryPct}
                                min={5}
                                max={100}
                                step={5}
                                stops={[10, 25, 50, 100]}
                                unit="%"
                                onChange={setTopoCanaryPct}
                              />
                            </Stack>
                          ) : (
                            <div className="mehan-ws-nav-list">
                              {(topologyMode === 'workbench'
                                ? [
                                    {name: 'Edge Gateway', meta: 'gateway.ts'},
                                    {name: 'Token Compiler', meta: 'tokens.ts'},
                                    {name: 'Billing Worker', meta: 'worker.ts'},
                                  ]
                                : topologyMode === 'studio'
                                  ? [
                                      {name: 'Edge Gateway', meta: '3D Card'},
                                      {name: 'Token Compiler', meta: 'Key Light'},
                                      {name: 'Billing Worker', meta: 'Backdrop'},
                                    ]
                                  : [
                                      {name: 'Edge Gateway', meta: '14 ms'},
                                      {name: 'Token Compiler', meta: '19 ms'},
                                      {name: 'Billing Worker', meta: '24 ms'},
                                    ]
                              ).map(entry => (
                                <button
                                  key={entry.name}
                                  type="button"
                                  className="mehan-ws-nav-item"
                                  data-active={String(topoSelectedItem === entry.name)}
                                  onClick={() => {
                                    setTopoSelectedItem(entry.name);
                                    setTopoInspectorOpen(true);
                                  }}
                                >
                                  <span>{entry.name}</span>
                                  <span className="studio-mono-pill">{entry.meta}</span>
                                </button>
                              ))}
                            </div>
                          ),
                      }
                }
                endPane={
                  topologyMode === 'explorer' ||
                  topologyMode === 'collection' ||
                  topologyMode === 'studio'
                    ? {
                        title: isId ? 'Inspektur Detail' : 'Detail Inspector',
                        isOpen: topoInspectorOpen,
                        onOpenChange: setTopoInspectorOpen,
                        defaultWidth: 268,
                        content: (
                          <Stack gap={2}>
                            <HStack hAlign="between" vAlign="center" gap={2}>
                              <Badge variant="success" label={topoSelectedItem} />
                              <Badge variant="neutral" label="Healthy" />
                            </HStack>
                            <PropertyRow label={isId ? 'Wilayah' : 'Region'} labelWidth={84}>
                              <span className="studio-mono-pill">ap-southeast-1</span>
                            </PropertyRow>
                            <PropertyRow label="SLO" labelWidth={84}>
                              <Text type="supporting" weight="semibold" hasTabularNumbers>
                                99.99%
                              </Text>
                            </PropertyRow>
                            {topologyMode === 'studio' && (
                              <PropertyRow
                                label={isId ? 'Paduan' : 'Blend'}
                                labelWidth={84}
                                isModified={topoBlend !== 'normal'}
                                onReset={() => setTopoBlend('normal')}
                              >
                                <SegmentedControl
                                  label="Layer blend"
                                  size="sm"
                                  value={topoBlend}
                                  onChange={setTopoBlend}
                                >
                                  <SegmentedControlItem value="normal" label="Normal" />
                                  <SegmentedControlItem value="screen" label="Screen" />
                                </SegmentedControl>
                              </PropertyRow>
                            )}
                          </Stack>
                        ),
                      }
                    : undefined
                }
              >
                {topologyMode === 'studio' ? (
                  <CanvasStage
                    backdrop="dots"
                    minHeight={228}
                    bottomEnd={
                      <CanvasZoomBar
                        zoom={topoZoom}
                        onZoomChange={setTopoZoom}
                        onFitToScreen={() => setTopoZoom(100)}
                        menuPlacement="top"
                      />
                    }
                    transport={
                      <TimelineScrubber
                        currentTime={topoTime}
                        duration={8}
                        onSeek={setTopoTime}
                      />
                    }
                  >
                    <Card padding={3} elevation="low">
                      <VStack gap={1} hAlign="center">
                        <Badge variant="pink" label={topoBlend.toUpperCase()} />
                        <Text weight="semibold">
                          {topoSelectedItem} · {topoZoom}%
                        </Text>
                      </VStack>
                    </Card>
                  </CanvasStage>
                ) : topologyMode === 'form-result' ? (
                  <Stack gap={3}>
                    <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
                      <Heading level={4}>
                        {isId ? 'Pratinjau Rencana Rilis' : 'Computed Rollout Plan'}
                      </Heading>
                      <Badge
                        variant="info"
                        label={topoTier === 'multi-region' ? 'Active-Active HA' : 'Single-Zone'}
                      />
                    </HStack>
                    <Grid columns={{minWidth: 160, max: 2, repeat: 'fit'}} gap={3}>
                      <MetricCard
                        label={isId ? 'Alokasi Canary' : 'Canary traffic'}
                        value={`${topoCanaryPct}%`}
                        caption={`Cluster: ${topoEnvName || 'default'}`}
                      />
                      <MetricCard
                        label={isId ? 'Estimasi latensi p95' : 'Projected p95'}
                        value={topoTier === 'multi-region' ? '16.4 ms' : '28.0 ms'}
                        delta={{value: '-4.2 ms', direction: 'down'}}
                        caption={isId ? 'Simulasi langsung' : 'Live parameter estimate'}
                      />
                    </Grid>
                  </Stack>
                ) : topologyMode === 'workbench' ? (
                  <Stack gap={2}>
                    <HStack hAlign="between" vAlign="center" gap={2}>
                      <Text weight="semibold">{topoSelectedItem} · Source Preview</Text>
                      <Text type="supporting" color="secondary">
                        {isId
                          ? 'Geser pembatas vertikal untuk mengubah lebar panel kiri'
                          : 'Drag the vertical splitter to resize the file explorer'}
                      </Text>
                    </HStack>
                    <CodeBlock
                      language="ts"
                      title={`${topoSelectedItem.toLowerCase().replace(/\s+/g, '-')}.ts`}
                      hasCopyButton
                      code={`export const service = '${topoSelectedItem}';\nexport const region = 'ap-southeast-1';\nexport const targetSlo = 0.9999;`}
                    />
                  </Stack>
                ) : topologyMode === 'collection' ? (
                  <div className="studio-table-frame">
                    <Table
                      aria-label="Workspace topology collection"
                      density="compact"
                      dividers="rows"
                      hasHover
                      data={[
                        {id: '1', name: 'Edge Gateway', region: 'ap-southeast-1', p95: '14.2 ms'},
                        {id: '2', name: 'Token Compiler', region: 'eu-central-1', p95: '19.0 ms'},
                        {id: '3', name: 'Billing Worker', region: 'us-east-1', p95: '24.6 ms'},
                      ]}
                      columns={[
                        {
                          key: 'name',
                          header: isId ? 'Layanan' : 'Service',
                          width: proportional(1.5),
                          renderCell: r => <Text weight="semibold">{String(r.name)}</Text>,
                        },
                        {
                          key: 'region',
                          header: isId ? 'Wilayah' : 'Region',
                          width: proportional(1.2),
                        },
                        {
                          key: 'p95',
                          header: 'P95',
                          width: pixel(92),
                          align: 'end',
                          renderCell: r => <Text hasTabularNumbers>{String(r.p95)}</Text>,
                        },
                        {
                          key: 'inspect',
                          header: '',
                          width: pixel(92),
                          align: 'end',
                          renderCell: r => (
                            <Button
                              size="sm"
                              variant={topoSelectedItem === r.name ? 'secondary' : 'ghost'}
                              label={isId ? 'Inspeksi' : 'Inspect'}
                              onClick={() => {
                                setTopoSelectedItem(String(r.name));
                                setTopoInspectorOpen(true);
                              }}
                            />
                          ),
                        },
                      ]}
                    />
                  </div>
                ) : (
                  <Stack gap={3}>
                    <Stack gap={1}>
                      <Heading level={4}>{topoSelectedItem}</Heading>
                      <Text color="secondary">
                        {isId
                          ? 'Panel samping menggunakan LayoutPanel + ResizeHandle milik Meta Astryx di layar lebar, dan otomatis berubah menjadi Drawer modal di bawah 768px.'
                          : 'Side panels run on Meta Astryx LayoutPanel + ResizeHandle on desktop, and automatically morph into modal Drawers below 768px.'}
                      </Text>
                    </Stack>
                    <Grid columns={{minWidth: 145, max: 2, repeat: 'fit'}} gap={3}>
                      <MetricCard
                        label={isId ? 'Throughput aktif' : 'Live throughput'}
                        value="1,420 rps"
                        delta={{value: '+6.8%', direction: 'up'}}
                      />
                      <MetricCard
                        label={isId ? 'Anggaran galat' : 'Error budget'}
                        value="99.98%"
                        caption="30-day rolling window"
                      />
                    </Grid>
                  </Stack>
                )}
              </WorkspaceLayout>
            </Stack>
          </Card>
        </Stack>
      )}

      {templateTab === 'dashboard' && (
        <Stack gap={4}>
          <Grid columns={{minWidth: 210, max: 4, repeat: 'fit'}} gap={3}>
            <MetricCard
              label={isId ? 'Ruang kerja aktif' : 'Active workspaces'}
              value="2,840"
              delta={{value: '+14.2%', direction: 'up'}}
              caption={isId ? '30 hari terakhir' : 'Last 30 days'}
            />
            <MetricCard
              label={isId ? 'Latensi median' : 'Median latency'}
              value="21 ms"
              delta={{value: '-4 ms', direction: 'up', sentiment: 'positive'}}
              caption={isId ? 'Edge global p50' : 'Global edge p50'}
            />
            <MetricCard
              label={isId ? 'Rasio galat' : 'Error rate'}
              value="0.02%"
              delta={{value: '0.00%', direction: 'flat'}}
              caption={isId ? 'Dalam batas SLO' : 'Within SLO budget'}
            />
            <MetricCard
              label={isId ? 'Lulus WCAG 2.2 AA' : 'WCAG 2.2 AA pass'}
              value="100%"
              delta={{value: isId ? 'Terkunci' : 'Locked', direction: 'up'}}
              caption={isId ? 'Mode Terang & Gelap' : 'Light & Dark modes'}
            />
          </Grid>

          <DataChart
            title={isId ? 'Trafik Edge & Permintaan Origin' : 'Edge Traffic & Origin Requests'}
            subtitle={isId ? 'Permintaan per detik (6 jam terakhir)' : 'Requests per second (last 6 hours)'}
            kind="area"
            height={190}
            categories={['08:00', '10:00', '12:00', '14:00', '16:00', '18:00']}
            series={[
              {
                id: 'edge',
                label: isId ? 'Cache Edge' : 'Edge Cache',
                values: [540, 690, 880, 920, 1040, 990],
              },
              {
                id: 'origin',
                label: isId ? 'Origin Langsung' : 'Origin Fetch',
                values: [140, 165, 190, 175, 160, 148],
              },
            ]}
          />

          <Card elevation="low" padding={4}>
            <Stack gap={3}>
              <Stack
                direction="horizontal"
                justify="between"
                align="center"
                wrap="wrap"
                gap={2}
              >
                <Heading level={3}>
                  {isId ? 'Deployment layanan' : 'Service deployments'}
                </Heading>
                <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                  <SegmentedControl
                    label="Filter environment"
                    size="sm"
                    value={deployFilter}
                    onChange={setDeployFilter}
                  >
                    <SegmentedControlItem value="all" label={isId ? 'Semua' : 'All'} />
                    <SegmentedControlItem value="prod" label="Production" />
                    <SegmentedControlItem value="staging" label="Staging" />
                  </SegmentedControl>
                  <TextInput
                    label="Filter service"
                    isLabelHidden
                    size="sm"
                    hasClear
                    placeholder={isId ? 'Cari layanan…' : 'Filter service…'}
                    value={deployQuery}
                    onChange={setDeployQuery}
                  />
                  <ColumnSettingsMenu
                    triggerLabel={isId ? 'Kolom' : 'Columns'}
                    columns={dashColState.columnSettingsConfig.columns}
                    state={dashColState}
                  />
                </Stack>
              </Stack>

              <Table
                aria-label="Service deployments"
                data={deploymentRows}
                idKey="id"
                plugins={{columnSettings: dashColPlugin}}
                columns={[
                  {
                    key: 'service',
                    header: isId ? 'Layanan' : 'Service',
                    width: proportional(1.6),
                  },
                  {
                    key: 'env',
                    header: isId ? 'Lingkungan' : 'Environment',
                    width: proportional(1),
                  },
                  {
                    key: 'latency',
                    header: isId ? 'Latensi P50' : 'P50 latency',
                    width: proportional(0.9),
                    align: 'end',
                    renderCell: row => (
                      <Text hasTabularNumbers weight="semibold">
                        {String(row.latency)}
                      </Text>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    width: proportional(0.9),
                    renderCell: row => (
                      <Badge
                        variant={row.variant}
                        label={String(row.status)}
                      />
                    ),
                  },
                ]}
                density="balanced"
                dividers="rows"
                hasHover
              />
            </Stack>
          </Card>
        </Stack>
      )}

      {templateTab === 'settings' && (
        <Card elevation="low" padding={4} maxWidth={720}>
          <Stack gap={4}>
            <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
              <Stack gap={1}>
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <Badge
                    variant="info"
                    label={isId ? 'Pengungkapan bertahap' : 'Progressive disclosure'}
                  />
                  <Badge
                    variant={orgDraft.isDirty ? 'warning' : 'success'}
                    label={
                      orgDraft.isDirty
                        ? isId
                          ? 'Draf tersimpan otomatis'
                          : 'Draft auto-saved'
                        : isId
                          ? 'Tersinkronisasi'
                          : 'Synced'
                    }
                  />
                </HStack>
                <Heading level={3}>
                  {isId ? 'Pengaturan organisasi' : 'Organization settings'}
                </Heading>
                <Text color="secondary">
                  {isId
                    ? 'Menampilkan kontrol utama secara tenang; parameter keamanan & webhook disimpan rapi di bagian lanjutan.'
                    : 'Surfaces essential controls upfront while keeping security policies & webhook secrets tucked cleanly.'}
                </Text>
              </Stack>
            </HStack>

            <TextInput
              label={isId ? 'Nama organisasi' : 'Organization name'}
              value={orgDraft.value}
              onChange={orgDraft.setValue}
            />
            <TextInput
              label={isId ? 'Email tagihan' : 'Billing email'}
              value={billingEmail}
              onChange={setBillingEmail}
            />

            <Stack gap={2}>
              <PropertyRow
                label={isId ? 'Wajibkan SAML SSO' : 'Enforce SAML SSO'}
                labelWidth={160}
                hint={
                  isId
                    ? 'Mewajibkan seluruh anggota masuk melalui penyedia identitas perusahaan.'
                    : 'Requires all workspace members to authenticate via your identity provider.'
                }
                isModified={!ssoEnforced}
                onReset={() => setSsoEnforced(true)}
              >
                <Switch
                  label="Enforce SAML SSO"
                  isLabelHidden
                  value={ssoEnforced}
                  onChange={setSsoEnforced}
                />
              </PropertyRow>

              <PropertyRow
                label={isId ? 'Masa aktif sesi' : 'Session TTL'}
                labelWidth={160}
                isModified={sessionTtl !== '24h'}
                onReset={() => setSessionTtl('24h')}
              >
                <SegmentedControl
                  label="Session duration"
                  size="sm"
                  value={sessionTtl}
                  onChange={setSessionTtl}
                >
                  <SegmentedControlItem value="8h" label="8h" />
                  <SegmentedControlItem value="24h" label="24h" />
                  <SegmentedControlItem value="7d" label="7d" />
                </SegmentedControl>
              </PropertyRow>
            </Stack>

            <Collapsible
              defaultIsOpen={false}
              trigger={
                isId
                  ? 'Pengaturan developer & webhook (lanjutan)'
                  : 'Developer & webhook options (advanced)'
              }
            >
              <Stack gap={3}>
                <TextInput
                  label={isId ? 'Kunci tanda tangan webhook' : 'Webhook signing secret'}
                  value={webhookSecret}
                  onChange={setWebhookSecret}
                />
              </Stack>
            </Collapsible>

            <HStack gap={2} hAlign="end">
              <Button
                variant="ghost"
                label={isId ? 'Reset' : 'Reset'}
                onClick={() => orgDraft.resetToInitial()}
              />
              <Button
                variant="primary"
                label={isId ? 'Simpan perubahan' : 'Save changes'}
                onClick={() => {
                  orgDraft.clearDraft();
                  showToast({
                    type: 'info',
                    body: isId ? 'Pengaturan disimpan.' : 'Settings saved.',
                  });
                }}
              />
            </HStack>
          </Stack>
        </Card>
      )}

      {templateTab === 'canvas' && (
        <WorkspaceLayout
          enableShortcuts={false}
          label="3D product studio workspace"
          startPane={{
            title: isId ? 'Inspektur Kanvas 3D' : '3D Canvas Inspector',
            defaultWidth: 320,
            mobileMode: 'stack',
            content: (
              <Stack gap={3}>
                <Stack gap={1}>
                  <Badge variant="info" label="Mehan × Meta Astryx" />
                  <Text type="supporting" color="secondary">
                    {isId
                      ? 'Geser slider presisi atau klik 2x angka untuk kembali ke nilai bawaan.'
                      : 'Drag precision sliders or double-click readouts to reset to default.'}
                  </Text>
                </Stack>

                <Stack direction="horizontal" gap={1.5} wrap="wrap">
                  {BACKDROP_PRESETS.map(b => (
                    <ColorSwatch
                      key={b.id}
                      color={b.swatch}
                      label={b.label}
                      isSelected={backdropId === b.id}
                      onSelect={() => setBackdropId(b.id)}
                    />
                  ))}
                </Stack>

                <PrecisionSlider
                  label={isId ? 'Padding latar' : 'Backdrop padding'}
                  value={shotPadding}
                  min={16}
                  max={72}
                  stops={[24, 36, 48]}
                  unit="px"
                  onChange={setShotPadding}
                />
                <PrecisionSlider
                  label={isId ? 'Radius sudut' : 'Corner radius'}
                  value={shotRadius}
                  min={0}
                  max={32}
                  stops={[12, 18, 24]}
                  unit="px"
                  onChange={setShotRadius}
                />
                <PrecisionSlider
                  label={isId ? 'Kemiringan 3D' : 'Perspective tilt'}
                  value={shotTilt}
                  min={-16}
                  max={16}
                  stops={[-8, 0, 8]}
                  isCentered
                  unit="°"
                  onChange={setShotTilt}
                />
              </Stack>
            ),
          }}
        >
          <CanvasStage
            backdrop="dots"
            minHeight={340}
            topStart={
              <Badge
                variant="neutral"
                label={isId ? 'Pratinjau 60fps' : '60fps Live Stage'}
              />
            }
            bottomEnd={
              <CanvasZoomBar
                zoom={shotZoom}
                onZoomChange={setShotZoom}
                onFitToScreen={() => setShotZoom(100)}
                menuPlacement="top"
              />
            }
            transport={
              <TimelineScrubber
                currentTime={shotPlayhead}
                duration={5}
                onSeek={setShotPlayhead}
                markers={[
                  {id: 'k1', time: 1.2, label: 'Key light'},
                  {id: 'k2', time: 3.6, label: 'Tilt reveal'},
                ]}
              />
            }
          >
            <div
              className="studio-shot-frame"
              style={{
                padding: shotPadding,
                borderRadius: shotRadius + 10,
                backgroundImage: activeBackdrop.gradient,
                transform: `scale(${shotZoom / 100}) perspective(900px) rotateY(${shotTilt}deg) rotateX(${Math.abs(shotTilt) * 0.35}deg)`,
                boxShadow: 'var(--shadow-high)',
              }}
            >
              <div
                className="studio-shot-window"
                style={{borderRadius: shotRadius}}
              >
                <div className="studio-window-dots" aria-hidden="true">
                  <span style={{background: '#f43f5e'}} />
                  <span style={{background: '#f59e0b'}} />
                  <span style={{background: '#10b981'}} />
                </div>
                <Stack gap={2}>
                  <Badge variant="info" label="Mehan × Meta Astryx" />
                  <Heading level={4}>
                    {isId ? 'Render permukaan taktil' : 'Tactile surface render'}
                  </Heading>
                  <Text type="supporting" color="secondary">
                    {isId
                      ? 'Permukaan berlapis presisi, kolom input cekung, dan bibir tombol 3D taktil pada 60fps.'
                      : 'Precision layered surfaces, recessed input wells, and tactile 3D button lips rendered at 60fps.'}
                  </Text>
                  <Button
                    variant="primary"
                    size="sm"
                    label={isId ? 'Ekspor PNG 4K' : 'Export 4K PNG'}
                    icon={<Sparkles size={14} />}
                  />
                </Stack>
              </div>
            </div>
          </CanvasStage>
        </WorkspaceLayout>
      )}
    </Stack>
  );
}
