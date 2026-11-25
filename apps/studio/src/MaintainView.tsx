import React, {useMemo, useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  Card,
  CodeBlock,
  Collapsible,
  Grid,
  HStack,
  Heading,
  Stack,
  Table,
  Text,
  TextInput,
  proportional,
  useToast,
} from '@astryxdesign/core';
import {
  auditMehanThemeContrast,
  contrastRatio,
  exportW3cDesignTokens,
  type ResolvedMehanDna,
} from '@mehan/astryx/dna';
import {Copy, Download, FileJson, FolderGit2, PackageCheck, RefreshCw} from 'lucide-react';
import type {StudioCopy} from './i18n';
import {
  buildAstryxUpgradePrompt,
  buildScopeSwitchPrompt,
  buildThemeCommitPrompt,
  copyText,
  downloadTextFile,
  type StudioLang,
} from './studioState';
import {
  exportCreateMehanThemeTs,
  type FullThemeEditorState,
} from './theme-editor/themeEditorModel';

interface MaintainViewProps {
  lang: StudioLang;
  copy: StudioCopy;
  themeState: FullThemeEditorState;
  dna: ResolvedMehanDna;
}

export function MaintainView({lang, copy, themeState, dna}: MaintainViewProps) {
  const isId = lang === 'id';
  const showToast = useToast();
  const [targetScope, setTargetScope] = useState('@alamehan');

  const exportedThemeTs = useMemo(
    () => exportCreateMehanThemeTs(themeState, 'customMehan'),
    [themeState],
  );

  const themeCommitPrompt = useMemo(
    () => buildThemeCommitPrompt(exportedThemeTs),
    [exportedThemeTs],
  );
  const upgradePrompt = useMemo(() => buildAstryxUpgradePrompt(), []);
  const scopePrompt = useMemo(
    () => buildScopeSwitchPrompt(targetScope),
    [targetScope],
  );

  const w3cDocument = useMemo(
    () =>
      exportW3cDesignTokens({
        name: `mehan-${themeState.seed.atmosphere}`,
        ...themeState.seed,
        radiusBase: themeState.seed.radiusBase ?? undefined,
      }),
    [themeState.seed],
  );

  const auditReport = useMemo(
    () =>
      auditMehanThemeContrast({
        name: `mehan-${themeState.seed.atmosphere}`,
        ...themeState.seed,
        radiusBase: themeState.seed.radiusBase ?? undefined,
      }),
    [themeState.seed],
  );

  const tokenRows = useMemo(() => {
    const L = dna.atmosphere.light;
    const D = dna.atmosphere.dark;
    const A = dna.accent;
    return [
      {
        id: 't1',
        token: '--color-background-body',
        role: isId ? 'Latar halaman utama' : 'Main page background',
        light: L.paper,
        dark: D.paper,
        contrast: `${contrastRatio(L.ink, L.paper).toFixed(1)}:1 / ${contrastRatio(D.ink, D.paper).toFixed(1)}:1`,
      },
      {
        id: 't2',
        token: '--color-background-card',
        role: isId ? 'Permukaan kartu' : 'Card surface',
        light: L.surface,
        dark: D.surface,
        contrast: `${contrastRatio(L.ink, L.surface).toFixed(1)}:1 / ${contrastRatio(D.ink, D.surface).toFixed(1)}:1`,
      },
      {
        id: 't3',
        token: '--mehan-well',
        role: isId ? 'Kolom input lembut' : 'Soft input field',
        light: L.well,
        dark: D.well,
        contrast: `${contrastRatio(L.ink, L.well).toFixed(1)}:1 / ${contrastRatio(D.ink, D.well).toFixed(1)}:1`,
      },
      {
        id: 't4',
        token: '--color-accent',
        role: isId ? 'Tombol utama & warna merek' : 'Primary button & brand color',
        light: A.accentLight,
        dark: A.accentDark,
        contrast: `${contrastRatio(A.onAccentLight, A.accentLight).toFixed(2)}:1`,
      },
      {
        id: 't5',
        token: '--mehan-primary-lip',
        role: isId ? 'Tepi bawah tombol 3D' : '3D button bottom edge',
        light: A.buttonLip,
        dark: A.buttonLip,
        contrast: `${dna.lipStyle} (${dna.lipPx}px)`,
      },
      {
        id: 't6',
        token: '--color-text-accent',
        role: isId ? 'Teks & tautan beraksen' : 'Accent text & links',
        light: A.textLight,
        dark: A.textDark,
        contrast: `${contrastRatio(A.textLight, L.surface).toFixed(2)}:1 / ${contrastRatio(A.textDark, D.surface).toFixed(2)}:1`,
      },
    ];
  }, [dna, isId]);

  const handleCopy = async (text: string, msg: string) => {
    await copyText(text);
    showToast({type: 'info', body: msg});
  };

  const handleDownloadW3c = () => {
    downloadTextFile(
      `mehan-${themeState.seed.atmosphere}-tokens.w3c.json`,
      `${JSON.stringify(w3cDocument, null, 2)}\n`,
      'application/json',
    );
    showToast({
      type: 'info',
      body: isId
        ? 'File token W3C berhasil diunduh.'
        : 'Downloaded W3C DTCG design-tokens.json.',
    });
  };

  return (
    <Stack gap={5}>
      <Stack gap={1}>
        <Heading level={2}>{copy.maintain.title}</Heading>
        <Text color="secondary">{copy.maintain.subtitle}</Text>
      </Stack>

      <Banner
        status="info"
        container="card"
        title={
          isId
            ? 'Alur praktis: Racik di Theme Editor -> Salin prompt -> Klik 2x skrip verifikasi'
            : 'Simple workflow: Tune in Theme Editor -> Copy prompt -> Double-click the check script'
        }
        description={
          isId
            ? 'Klik dua kali rebuild-and-check-windows.cmd (Windows) atau rebuild-and-check-mac-linux.command (macOS/Linux) untuk membangun ulang paket dan menjalankan seluruh pemeriksaan kualitas otomatis.'
            : 'Double-click rebuild-and-check-windows.cmd (Windows) or rebuild-and-check-mac-linux.command (macOS/Linux) to rebuild all packages and run every automated quality check.'
        }
      />

      <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
        <Card elevation="low">
          <Stack gap={3}>
            <HStack gap={2} vAlign="center">
              <FolderGit2 size={18} />
              <Heading level={3}>
                {isId
                  ? '1. Simpan tema aktif ke repo'
                  : '1. Commit active theme to repo'}
              </Heading>
            </HStack>
            <Text color="secondary">
              {isId
                ? 'Salin instruksi handoff ini ke AI coding agent agar tema aktif disimpan permanen ke source code, tarball release/, dan STUDIO.html.'
                : 'Copy this handoff prompt so your AI coding agent commits your active theme and rebuilds release/ + STUDIO.html.'}
            </Text>
            <HStack gap={2}>
              <Button
                variant="primary"
                size="sm"
                label={isId ? 'Salin prompt simpan tema' : 'Copy commit prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    themeCommitPrompt,
                    isId ? 'Prompt simpan tema disalin.' : 'Copied theme commit prompt.',
                  )
                }
              />
            </HStack>
            <Collapsible
              defaultIsOpen={false}
              trigger={isId ? 'Pratinjau isi prompt' : 'Preview handoff prompt'}
            >
              <CodeBlock
                code={themeCommitPrompt}
                language="markdown"
                maxHeight={180}
                hasCopyButton
              />
            </Collapsible>
          </Stack>
        </Card>

        <Card elevation="low">
          <Stack gap={3}>
            <HStack gap={2} vAlign="center">
              <RefreshCw size={18} />
              <Heading level={3}>
                {isId
                  ? '2. Verifikasi update Meta Astryx'
                  : '2. Safe Meta Astryx upgrades'}
              </Heading>
            </HStack>
            <Text color="secondary">
              {isId
                ? 'Versi saat ini terkunci aman (~0.7.17) beserta tarball lokal release/mehan-astryx-1.0.0.tgz. Gunakan prompt ini saat ingin menguji versi baru.'
                : 'Versions are pinned (~0.7.17) alongside local release/mehan-astryx-1.0.0.tgz. Use this prompt to test newer Astryx releases safely.'}
            </Text>
            <HStack gap={2}>
              <Button
                variant="secondary"
                size="sm"
                label={isId ? 'Salin prompt cek update' : 'Copy upgrade prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    upgradePrompt,
                    isId ? 'Prompt update disalin.' : 'Copied safe upgrade prompt.',
                  )
                }
              />
            </HStack>
            <Collapsible
              defaultIsOpen={false}
              trigger={isId ? 'Pratinjau prosedur update' : 'Preview upgrade steps'}
            >
              <CodeBlock
                code={upgradePrompt}
                language="markdown"
                maxHeight={180}
                hasCopyButton
              />
            </Collapsible>
          </Stack>
        </Card>

        <Card elevation="low">
          <Stack gap={3}>
            <HStack gap={2} vAlign="center">
              <PackageCheck size={18} />
              <Heading level={3}>
                {isId
                  ? '3. Pengganti scope paket npm'
                  : '3. NPM package scope switcher'}
              </Heading>
            </HStack>
            <Text color="secondary">
              {isId
                ? 'Ubah seluruh nama paket dan import dari @mehan/* ke scope organisasi tujuan dalam satu langkah.'
                : 'Rewrite every workspace manifest and import path from @mehan/* to your organization scope in one step.'}
            </Text>
            <HStack gap={2} vAlign="end" wrap="wrap">
              <div style={{flex: '1 1 180px'}}>
                <TextInput
                  label={isId ? 'Scope npm tujuan' : 'Target npm scope'}
                  size="sm"
                  value={targetScope}
                  onChange={setTargetScope}
                />
              </div>
              <Button
                variant="secondary"
                size="sm"
                label={isId ? 'Salin perintah scope' : 'Copy scope prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    scopePrompt,
                    isId ? 'Prompt ganti scope disalin.' : 'Copied scope switch prompt.',
                  )
                }
              />
            </HStack>
          </Stack>
        </Card>

        <Card elevation="low">
          <Stack gap={3}>
            <HStack gap={2} vAlign="center">
              <FileJson size={18} />
              <Heading level={3}>
                {isId
                  ? '4. Ekspor token standar W3C (Figma)'
                  : '4. W3C design tokens (Figma)'}
              </Heading>
            </HStack>
            <Text color="secondary">
              {isId
                ? 'Unduh token warna, sudut, spasi, dan font aktif dalam format resmi W3C DTCG untuk Tokens Studio Figma.'
                : 'Export active atmosphere, OKLCH brand ramp, radii, and fonts in standard W3C DTCG JSON format for Figma.'}
            </Text>
            <HStack gap={2} wrap="wrap">
              <Button
                variant="secondary"
                size="sm"
                label={isId ? 'Unduh .w3c.json' : 'Download .w3c.json'}
                icon={<Download size={14} />}
                onClick={handleDownloadW3c}
              />
              <Button
                variant="ghost"
                size="sm"
                label={isId ? 'Salin JSON' : 'Copy JSON'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    JSON.stringify(w3cDocument, null, 2),
                    isId ? 'JSON token W3C disalin.' : 'Copied W3C token JSON.',
                  )
                }
              />
            </HStack>
          </Stack>
        </Card>
      </Grid>

      {/* Live Resolved Tokens Table */}
      <Card padding={4} elevation="low">
        <Stack gap={3}>
          <HStack hAlign="between" vAlign="center" wrap="wrap" gap={2}>
            <Stack gap={0.5}>
              <Heading level={3}>
                {isId
                  ? 'Inspektur token & audit kontras aktif'
                  : 'Live resolved tokens & contrast audit'}
              </Heading>
              <Text type="supporting" color="secondary">
                {dna.atmosphere.name} · {dna.accent.name} ({dna.accent.seed}) ·{' '}
                {dna.typography.displayFamily} / {dna.typography.bodyFamily}
              </Text>
            </Stack>
            <Badge
              variant={auditReport.passesAll ? 'success' : 'warning'}
              label={
                auditReport.passesAll
                  ? isId
                    ? `WCAG 2.2 AA Terverifikasi (${auditReport.checks.length}/${auditReport.checks.length})`
                    : `WCAG 2.2 AA Verified (${auditReport.checks.length}/${auditReport.checks.length})`
                  : isId
                    ? `Periksa kontras (${auditReport.failures.length} isu)`
                    : `Check contrast (${auditReport.failures.length} issues)`
              }
            />
          </HStack>

          <Table
            aria-label={isId ? 'Token desain Mehan terkompilasi' : 'Resolved Mehan design tokens'}
            data={tokenRows}
            columns={[
              {
                key: 'token',
                header: isId ? 'Token CSS' : 'CSS token',
                width: proportional(1.3, {minWidth: 160}),
                renderCell: row => (
                  <span className="studio-mono-pill">{String(row.token)}</span>
                ),
              },
              {
                key: 'role',
                header: isId ? 'Peran permukaan' : 'Surface role',
                width: proportional(1.2, {minWidth: 140}),
              },
              {
                key: 'light',
                header: isId ? 'Terang' : 'Light',
                width: proportional(0.85, {minWidth: 105}),
                renderCell: row => (
                  <span className="studio-color-chip">
                    <i style={{backgroundColor: String(row.light)}} />
                    <code>{String(row.light)}</code>
                  </span>
                ),
              },
              {
                key: 'dark',
                header: isId ? 'Gelap' : 'Dark',
                width: proportional(0.85, {minWidth: 105}),
                renderCell: row => (
                  <span className="studio-color-chip">
                    <i style={{backgroundColor: String(row.dark)}} />
                    <code>{String(row.dark)}</code>
                  </span>
                ),
              },
              {
                key: 'contrast',
                header: isId ? 'Kontras / Spesifikasi' : 'Contrast / Spec',
                width: proportional(0.95, {minWidth: 120}),
                align: 'end',
                renderCell: row => (
                  <Text type="supporting" weight="semibold" hasTabularNumbers>
                    {String(row.contrast)}
                  </Text>
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
  );
}
