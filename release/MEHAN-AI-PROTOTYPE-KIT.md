# Mehan Design System — Real-Engine Single-HTML Prototype Kit (Porcelain · Blueberry)

Use the **Mehan × Meta Astryx Self-Contained Runtime** below to build a tactile, clear, accessible single-file HTML app powered by **100% real Mehan Design System & Meta Astryx React 19 components** (zero npm install, zero bundler, zero third-party CDN risk).

## 1. Single-File HTML Contract (Zero Build Step)
1. **Return ONE complete, runnable `.html` file** starting with `<!doctype html>` using the exact head + runtime tags in **Section 5**.
2. **Write clean React 19 + TypeScript/JSX inside `<script type="text/tsx">`:** `mehan-runtime.js` compiles TypeScript + JSX + `import` statements directly in the browser in `< 5ms`. You may use standard `import { ... } from 'react' | '@astryxdesign/core' | '@mehan/astryx' | 'lucide-react'` OR destructure `window.MehanUI`.
3. **Root Provider Rule:** Always mount `<Theme theme={appTheme} mode={mode}><LayerProvider><WorkspaceApp mode={mode} setMode={setMode} /></LayerProvider></Theme>`. Call `const showToast = useToast()` **inside** `<WorkspaceApp />` (below `<LayerProvider>`), never above it.

## 2. Executive Demo Mandate ("Zero Dead Controls")
Every prototype is presented live to product & executive stakeholders — **never render static placeholder controls**:
1. **Live Filtering & Reactive KPIs:** Wire `<TextInput>` search, `<SegmentedControl>`, `<Selector placement="below">`, or `<DateRangeInput>` to `useState` + `useMemo` so filtering immediately updates `<Table>` rows, `<MetricCard>` totals, and `<DataChart>` series. Render `<EmptyState>` with a working **Reset filters** `<Button>` when `0` rows match.
2. **Master-Detail Inspector (`Table` -> `Drawer` -> `Toast`):** Clicking a table row or action button opens an Astryx `<Drawer>` (or `WorkspaceLayout` `endPane`) showing `<DrawerHeader>`, workflow `<Stepper>`, editable fields, and a primary action (`Approve`, `Save changes`, `Assign`) that mutates state and triggers `showToast({ type: 'info', body: '...' })`.
3. **Safe Destructive Flows & Live Theme Toggle:** Wire destructive actions through `<AlertDialog>` (naming the exact record) or `<InlineConfirm>`, and keep a working Light / Dark toggle in the top header.
4. **Domain-Authentic Sample Data:** Populate `6–10` realistic business records with aligned numbers/currencies (`formatCurrency`, `formatNumber`, `hasTabularNumbers`). Never use *"Lorem ipsum"* or *"Item 1"*.

## 3. Verified Component Prop Reference (Do Not Invent Props!)

### A. App Shells, Workspaces & Layout (`@astryxdesign/core` + `@mehan/astryx`)
- **`WorkspaceLayout`** (`@mehan/astryx`): `<WorkspaceLayout scrollMode="page" toolbar={<HStack ... />} startPane={{ title: 'Filters', content: <Stack gap={3}>...</Stack>, defaultWidth: 264, mobileMode: 'collapsible' }} endPane={{ title: 'Details', isOpen: Boolean(selected), onOpenChange: open => !open && setSelected(null), content: <Stack gap={3}>...</Stack> }}>{mainContent}</WorkspaceLayout>`
- **`Stack` / `HStack` / `VStack`**: `gap={0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6}`, `vAlign="start" | "center" | "end"`, `hAlign="start" | "between" | "end"`, `wrap="wrap"`.
- **`Grid`**: `<Grid columns={{ minWidth: 220, max: 4, repeat: 'fit' }} gap={3}>...</Grid>`
- **`Card`**: `<Card elevation="low" padding={4}>...</Card>` (step inner boxes down to `<Section variant="muted" padding={3}>` or `<Collapsible>` — avoid white card-inside-card walls).
- **`Collapsible`**: `<Collapsible defaultIsOpen={false} trigger="Advanced options">...</Collapsible>`
- **`Heading` & `Text`**: `<Heading level={1 | 2 | 3 | 4}>Title</Heading>` · `<Text type="body" | "supporting" color="primary" | "secondary" weight="semibold" hasTabularNumbers>...</Text>`

### B. Buttons, Navigation & Menus (`label` Prop Required!)
- **`Button`**: `<Button variant="primary" | "secondary" | "ghost" | "destructive" size="sm" | "md" | "lg" label="Save changes" icon={<Check size={15} />} onClick={...} isDisabled={...} />` *(passes visible text via `label`, NOT children!)*
- **`IconButton`**: `<IconButton variant="ghost" | "secondary" size="sm" | "md" label="Toggle dark mode" icon={<Moon size={15} />} onClick={...} />`
- **`SplitButton`** (`@mehan/astryx`): `<SplitButton label="Publish" variant="primary" onPrimaryClick={...} items={[{ id: 'draft', label: 'Save as draft', onSelect: ... }]} />`
- **`CopyButton` & `InlineConfirm`** (`@mehan/astryx`): `<CopyButton value="INV-2026-084" label="Copy ID" size="sm" />` · `<InlineConfirm label="Remove" confirmLabel="Confirm remove" onConfirm={...} />`
- **`TabList` + `Tab`**: `<TabList role="tablist" aria-label="Views" value={tab} onChange={setTab} overflow="auto"><Tab value="overview" label="Overview" /><Tab value="approvals" label="Approvals" /></TabList>`
- **`SegmentedControl`**: Wrap 4+ items in `<div className="mehan-seg-wrap">`: `<SegmentedControl label="Window" size="sm" value={period} onChange={setPeriod}><SegmentedControlItem value="7d" label="7 days" /><SegmentedControlItem value="30d" label="30 days" /></SegmentedControl>`
- **`DropdownMenu`**: `<DropdownMenu button={{ label: 'Actions', variant: 'secondary', size: 'sm' }} items={[{ label: 'Export CSV', onClick: ... }, { type: 'divider' }, { label: 'Archive', onClick: ... }]} />`

### C. Form Controls (`onChange` Passes Value Directly!)
- **`TextInput` / `TextArea`**: `<TextInput label="Search requests" size="sm" | "md" placeholder="Search by owner or ID..." value={query} onChange={setQuery} />` · `<TextArea label="Review note" value={note} onChange={setNote} rows={3} />`
- **`NumberInput`**: `<NumberInput label="Headcount" value={count} onChange={val => setCount(val ?? 0)} min={0} step={1} />`
- **`Selector`**: Always pass `placement="below"`: `<Selector label="Department" size="sm" | "md" placement="below" value={dept} onChange={val => val && setDept(val)} options={[{ value: 'all', label: 'All departments' }, { value: 'eng', label: 'Engineering' }]} />`
- **`DateRangeInput`**: `<DateRangeInput label="Period" size="sm" value={range} onChange={setRange} />` where `range` is `{ start: '2026-11-01', end: '2026-11-30' } | null`.
- **`Switch` & `CheckboxInput`**: Uses `value` boolean (NOT `checked`!): `<Switch label="Auto-escalate SLA" value={enabled} onChange={checked => setEnabled(checked)} />` · `<CheckboxInput label="Include archived" value={inc} onChange={checked => setInc(checked)} />`

### D. KPIs, Charts, Tables & Workflow Status
- **`MetricCard`** (`@mehan/astryx`): `<MetricCard label="Net Revenue" value="Rp 1,48 M" delta={{ value: '+14.8%', direction: 'up' }} caption="vs. last 30 days" icon={<TrendingUp size={16} />} />`
- **`DataChart`** (`@mehan/astryx`): `<DataChart kind="area" | "bar" | "line" | "horizontal-bar" title="Monthly Throughput" subtitle="Completed vs. target" categories={['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']} series={[{ id: 'actual', label: 'Completed', values: [42, 51, 58, 63, 71, 84] }, { id: 'target', label: 'Target', values: [40, 48, 55, 60, 68, 75] }]} height={210} />`
- **`Sparkline` / `Gauge` / `ActivityRing`** (`@mehan/astryx`): `<Sparkline values={[12, 18, 15, 24, 29]} />` · `<Gauge value={86} label="SLA compliance" />`
- **`Table`**: Wrap in `<div className="mehan-table-scroll">`:
  ```tsx
  <div className="mehan-table-scroll">
    <Table
      aria-label="Approval requests"
      data={filteredRows}
      hasHover
      density="balanced"
      columns={[
        { key: 'title', header: 'Request', width: proportional(1.6, { minWidth: 180 }), renderCell: row => <Text weight="semibold">{row.title}</Text> },
        { key: 'status', header: 'Status', width: proportional(1, { minWidth: 120 }), renderCell: row => <Badge variant={row.statusVariant} label={row.statusLabel} /> },
        { key: 'amount', header: 'Budget', width: proportional(1, { minWidth: 120 }), renderCell: row => <Text hasTabularNumbers>{formatCurrency(row.amount, 'USD', 'en-US')}</Text> },
        { key: 'actions', header: '', width: pixel(108), renderCell: row => <Button size="sm" variant="secondary" label="Inspect" onClick={() => setSelectedId(row.id)} /> },
      ]}
    />
  </div>
  ```
- **`Badge`**: `<Badge variant="neutral" | "info" | "success" | "warning" | "error" | "blue" | "teal" | "green" | "orange" | "pink" | "purple" label="Approved" />`
- **`Stepper` + `Step`**: `<Stepper activeStep={1} onStepClick={setStep}><Step step={0} label="Submitted" /><Step step={1} label="Finance review" /><Step step={2} label="Approved" /></Stepper>`
- **`ProgressBar`**: `<ProgressBar value={76} label="Q4 budget utilization" hasValueLabel variant="accent" | "success" | "warning" | "error" />`
- **`Avatar`**: `<Avatar name="Nadia Kusuma" size="sm" | "md" status={<AvatarStatusDot variant="success" label="Online" />} />`
- **`EmptyState`**: `<EmptyState title="No matching requests" description="Try clearing your search or status filter." actions={<Button variant="secondary" label="Reset filters" onClick={resetFilters} />} />`

### E. Drawers, BottomSheets, Dialogs, Banners & Toasts
- **`Drawer` + `DrawerHeader`**:
  ```tsx
  <Drawer isOpen={selected != null} onOpenChange={open => !open && setSelectedId(null)} label={selected ? `Inspect ${selected.title}` : 'Details'} width={440}>
    <Layout
      header={<DrawerHeader title={selected?.title ?? ''} subtitle={selected?.id} onOpenChange={open => !open && setSelectedId(null)} />}
      content={<LayoutContent><Stack gap={3}>{/* Inspector details */}</Stack></LayoutContent>}
      footer={<LayoutFooter><HStack hAlign="end" gap={2}><Button variant="secondary" label="Close" onClick={() => setSelectedId(null)} /><Button variant="primary" label="Approve request" onClick={handleApprove} /></HStack></LayoutFooter>}
    />
  </Drawer>
  ```
- **`BottomSheet`**: `<BottomSheet isOpen={sheetOpen} onOpenChange={setSheetOpen} label="Quick filters" height="72dvh" snapPoints={[0.42, 0.72]}>...</BottomSheet>`
- **`Dialog` + `DialogHeader`**: `<Dialog isOpen={open} onOpenChange={setOpen} width={520} purpose="form"><Layout header={<DialogHeader title="New request" onOpenChange={setOpen} />} content={<LayoutContent>...</LayoutContent>} /></Dialog>`
- **`AlertDialog`**: `<AlertDialog isOpen={confirmOpen} onOpenChange={setConfirmOpen} title='Cancel request "REQ-204"?' description="This removes the request from the approval queue." cancelLabel="Keep request" actionLabel="Cancel request" onAction={() => { setConfirmOpen(false); ... }} />`
- **`Banner`**: `<Banner status="info" | "success" | "warning" | "error" container="card" collapsible={false} title="Policy check passed" description="All items meet Q4 budget thresholds." />`
- **Raw HTML Fallback Buttons (Only inside custom SVGs/canvas):** Always include `type="button"` (e.g. `<button type="button">`).

## 4. Mehan Spatial, UX & Copywriting Standards
1. **One Primary CTA Per View:** Use one `variant="primary"` `<Button>` for the main screen or drawer goal; use `"secondary"` or `"ghost"` for supporting controls.
2. **Chunking & Cognitive Calm:** Cap KPI strips at `4` `<MetricCard>`s; use `<Table>` for `5+` items; keep visible toolbar controls `<= 5` and tuck secondary filters inside `<Collapsible>` or `<Drawer>`.
3. **Human Sentence Case & Forgiving Forms:** Write clear sentence-case labels without `ALL CAPS`, validate new inputs gently on blur/submit rather than first keystroke, and keep flex/grid children shrink-safe (`minWidth: 0`).

## 5. Starter Single-File HTML Template (Copy & Build Inside `<script type="text/tsx">`)
```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mehan Prototype — Porcelain</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%2228%22%20height%3D%2226%22%20rx%3D%228%22%20fill%3D%22%231445b2%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2228%22%20height%3D%2225%22%20rx%3D%228%22%20fill%3D%22%232563eb%22%2F%3E%3Cpath%20d%3D%22M9%2020V9h3.2l3.8%206.2L19.8%209H23v11h-3v-6.1l-3.2%205.1h-1.6L12%2013.9V20H9z%22%20fill%3D%22%23ffffff%22%2F%3E%3C%2Fsvg%3E" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem('mehan-mode');
        var mode = saved === 'dark' || saved === 'light' ? saved : 'light';
        document.documentElement.dataset.theme = mode;
        document.documentElement.style.colorScheme = mode;
      } catch (e) {}
    })();
  </script>
  <link rel="stylesheet" href="https://alamehan.github.io/mehan-design-system/cdn/mehan-runtime.css" />
</head>
<body data-astryx-theme="mehan-porcelain">
  <div id="root"></div>
  <script src="https://alamehan.github.io/mehan-design-system/cdn/mehan-runtime.js"></script>
  <script type="text/tsx">
    import React, { useMemo, useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import {
      Avatar,
      Badge,
      Banner,
      Button,
      Card,
      Drawer,
      DrawerHeader,
      EmptyState,
      Grid,
      HStack,
      Heading,
      IconButton,
      LayerProvider,
      Layout,
      LayoutContent,
      LayoutFooter,
      ProgressBar,
      SegmentedControl,
      SegmentedControlItem,
      Selector,
      Stack,
      Step,
      Stepper,
      Table,
      Text,
      TextInput,
      pixel,
      proportional,
      useToast,
    } from '@astryxdesign/core';
    import { Theme } from '@astryxdesign/core/theme';
    import {
      DataChart,
      MetricCard,
      WorkspaceLayout,
      createMehanTheme,
      formatCurrency,
    } from '@mehan/astryx';
    import { Check, Moon, Plus, Search, Sun, TrendingUp } from 'lucide-react';

    const appTheme = createMehanTheme({
      "name": "mehan-porcelain",
      "atmosphere": "porcelain",
      "accent": "blueberry"
    });

    function PrototypeWorkspace({
      mode,
      onToggleMode,
    }: {
      mode: 'light' | 'dark';
      onToggleMode: () => void;
    }) {
      const showToast = useToast();
      // Build the interactive application state, KPI row, charts, table & drawer here
      return (
        <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 30,
              padding: '10px 20px',
              background: 'var(--color-background-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
              <HStack gap={2} vAlign="center">
                <Heading level={3}>Workspace Prototype</Heading>
                <Badge variant="info" label="Porcelain · Blueberry" />
              </HStack>
              <HStack gap={2} vAlign="center">
                <IconButton
                  variant="secondary"
                  size="sm"
                  label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  icon={mode === 'light' ? <Moon size={15} /> : <Sun size={15} />}
                  onClick={onToggleMode}
                />
                <Button
                  variant="primary"
                  size="sm"
                  label="New request"
                  icon={<Plus size={15} />}
                  onClick={() => showToast({ type: 'info', body: 'Ready to create a new record.' })}
                />
              </HStack>
            </HStack>
          </header>

          <main style={{ maxWidth: 1240, width: '100%', margin: '0 auto', padding: '24px 20px', flex: 1 }}>
            {/* Replace with full interactive prototype */}
          </main>
        </div>
      );
    }

    function App() {
      const [mode, setMode] = useState<'light' | 'dark'>(
        () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'),
      );
      const toggleMode = () => {
        const next = mode === 'light' ? 'dark' : 'light';
        setMode(next);
        document.documentElement.dataset.theme = next;
        document.documentElement.style.colorScheme = next;
        try { localStorage.setItem('mehan-mode', next); } catch (e) {}
      };
      return (
        <Theme theme={appTheme} mode={mode}>
          <LayerProvider>
            <PrototypeWorkspace mode={mode} onToggleMode={toggleMode} />
          </LayerProvider>
        </Theme>
      );
    }

    createRoot(document.getElementById('root')!).render(<App />);
  </script>
</body>
</html>
```
