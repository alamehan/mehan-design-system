import React, {useMemo, useState} from 'react';
import {
  Badge,
  Banner,
  Button,
  Card,
  CodeBlock,
  Grid,
  Heading,
  Stack,
  Table,
  Text,
  TextInput,
  proportional,
  useToast,
} from '@astryxdesign/core';
import {
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

  const tokenRows = useMemo(() => {
    const L = dna.atmosphere.light;
    const D = dna.atmosphere.dark;
    const A = dna.accent;
    return [
      {
        id: 't1',
        token: '--color-background-body',
        role: isId ? 'Kanvas halaman (Paper)' : 'Page canvas (Paper)',
        light: L.paper,
        dark: D.paper,
        contrast: `${contrastRatio(L.ink, L.paper).toFixed(1)}:1 / ${contrastRatio(D.ink, D.paper).toFixed(1)}:1`,
      },
      {
        id: 't2',
        token: '--color-background-card',
        role: isId ? 'Permukaan kartu utama' : 'Elevated card surface',
        light: L.surface,
        dark: D.surface,
        contrast: `${contrastRatio(L.ink, L.surface).toFixed(1)}:1 / ${contrastRatio(D.ink, D.surface).toFixed(1)}:1`,
      },
      {
        id: 't3',
        token: '--mehan-well',
        role: isId ? 'Sumur input cekung' : 'Recessed input well',
        light: L.well,
        dark: D.well,
        contrast: `${contrastRatio(L.ink, L.well).toFixed(1)}:1 / ${contrastRatio(D.ink, D.well).toFixed(1)}:1`,
      },
      {
        id: 't4',
        token: '--color-accent',
        role: isId ? 'Tombol Primary & Aksen' : 'Primary CTA & Brand fill',
        light: A.accentLight,
        dark: A.accentDark,
        contrast: `${contrastRatio(A.onAccentLight, A.accentLight).toFixed(2)}:1`,
      },
      {
        id: 't5',
        token: '--mehan-primary-lip',
        role: isId ? 'Bibir 3D bawah tombol (Shade 800)' : 'Smooth 3D button lip (Shade 800)',
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
        ? 'File token W3C (Figma / Style Dictionary) berhasil diunduh.'
        : 'Downloaded W3C DTCG design-tokens.json.',
    });
  };

  return (
    <Stack gap={5}>
      <Stack gap={1.5}>
        <Heading level={2}>{copy.maintain.title}</Heading>
        <Text color="secondary">{copy.maintain.subtitle}</Text>
      </Stack>

      <Banner
        status="info"
        container="card"
        title={
          isId
            ? 'Cara kerja tanpa terminal: Racik di Theme Editor -> Salin Handoff -> Tempel ke AI Agent (atau klik 2x file pengecek)'
            : 'Zero-terminal workflow: Tune in Theme Editor -> Copy Handoff -> Paste to your AI Agent (or double-click the verifier script)'
        }
        description={
          isId
            ? 'Untuk membangun ulang & menjalankan 6 pengecekan otomatis tanpa mengetik perintah apa pun, cukup klik 2x rebuild-and-check-windows.cmd (Windows) atau rebuild-and-check-mac-linux.command (macOS/Linux) di folder D:\\mehan-design-system.'
            : 'To rebuild all packages and run all 6 quality gates without typing commands, double-click rebuild-and-check-windows.cmd (Windows) or rebuild-and-check-mac-linux.command (macOS/Linux).'
        }
      />

      <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
        <Card elevation="low">
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <FolderGit2 size={18} />
              <Heading level={3}>
                {isId
                  ? '1. Simpan Tema Aktif Menjadi Bawaan Repo'
                  : '1. Save Active Studio Theme to Repo'}
              </Heading>
            </Stack>
            <Text color="secondary">
              {isId
                ? 'Sudah cocok dengan racikan benih taktil, token lanjutan, dan override komponen di Theme Editor? Salin instruksi ini ke AI coding agent agar disimpan permanen ke source code, tarball release/, dan STUDIO.html.'
                : 'Happy with your tactile seed, raw tokens, and component overrides in the Theme Editor? Copy this handoff prompt so your AI coding agent commits it and rebuilds release/ + STUDIO.html.'}
            </Text>
            <CodeBlock
              code={themeCommitPrompt}
              language="markdown"
              maxHeight={180}
              hasCopyButton
            />
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="primary"
                label={isId ? 'Salin Handoff Simpan Tema' : 'Copy Theme Commit Prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    themeCommitPrompt,
                    isId ? 'Prompt simpan tema disalin.' : 'Copied theme commit prompt.',
                  )
                }
              />
            </Stack>
          </Stack>
        </Card>

        <Card elevation="low">
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <RefreshCw size={18} />
              <Heading level={3}>
                {isId
                  ? '2. Versi Astryx (~0.7.17 Terkunci) & Update Aman'
                  : '2. Locked Astryx (~0.7.17) & Safe Upgrades'}
              </Heading>
            </Stack>
            <Text color="secondary">
              {isId
                ? 'Proyek lama tidak akan pernah rusak mendadak saat Meta Astryx merilis perombakan besar, karena versi dikunci (~0.7.17) + tersimpan sebagai file lokal release/mehan-astryx-1.0.0.tgz. Saat ingin naik versi, uji dulu secara aman dengan prompt di bawah.'
                : 'Existing apps never break when Meta Astryx ships major rewrites because versions are locked (~0.7.17) and archived in release/mehan-astryx-1.0.0.tgz. Upgrade only after passing all 6 gates.'}
            </Text>
            <CodeBlock
              code={upgradePrompt}
              language="markdown"
              maxHeight={180}
              hasCopyButton
            />
            <Stack direction="horizontal" gap={2}>
              <Button
                variant="secondary"
                label={isId ? 'Salin Prompt Cek Update Astryx' : 'Copy Safe Upgrade Prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    upgradePrompt,
                    isId ? 'Prompt update aman disalin.' : 'Copied safe upgrade prompt.',
                  )
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Grid columns={{minWidth: 320, max: 2, repeat: 'fit'}} gap={4} align="start">
        <Card elevation="low">
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <PackageCheck size={18} />
              <Heading level={3}>
                {isId
                  ? '3. Pengganti Scope NPM (@mehan -> @alamehan)'
                  : '3. NPM Scope Switcher (@mehan -> @alamehan)'}
              </Heading>
            </Stack>
            <Text color="secondary">
              {isId
                ? 'Saat siap dipublikasikan ke npm pribadi/organisasi, ganti seluruh scope paket & import otomatis lewat satu perintah tanpa edit file satu per satu.'
                : 'Ready to publish to npm under your own organization scope? Rewrite every manifest and import cleanly in one step.'}
            </Text>
            <TextInput
              label={isId ? 'Scope npm tujuan' : 'Target npm scope'}
              value={targetScope}
              onChange={setTargetScope}
            />
            <Stack direction="horizontal" gap={2} wrap="wrap">
              <Button
                variant="secondary"
                label={isId ? 'Salin Prompt Ganti Scope' : 'Copy Scope Switch Prompt'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    scopePrompt,
                    isId ? 'Prompt ganti scope disalin.' : 'Copied scope switch prompt.',
                  )
                }
              />
            </Stack>
          </Stack>
        </Card>

        <Card elevation="low">
          <Stack gap={3}>
            <Stack direction="horizontal" gap={2} align="center">
              <FileJson size={18} />
              <Heading level={3}>
                {isId
                  ? '4. Ekspor Token Standar W3C (Figma / Style Dictionary)'
                  : '4. W3C Design Tokens (Figma / Style Dictionary)'}
              </Heading>
            </Stack>
            <Text color="secondary">
              {isId
                ? 'Unduh token warna, sudut lengkung, dan tipografi dari tema yang sedang aktif dalam format resmi W3C Design Tokens (DTCG) untuk diimpor ke Figma atau aplikasi mobile.'
                : 'Export your live atmosphere, OKLCH brand ramp, radii, and typography in standard W3C DTCG JSON format for Figma Tokens Studio or mobile pipelines.'}
            </Text>
            <Stack direction="horizontal" gap={2} wrap="wrap">
              <Button
                variant="primary"
                label={
                  isId
                    ? 'Unduh mehan-tokens.w3c.json'
                    : 'Download mehan-tokens.w3c.json'
                }
                icon={<Download size={14} />}
                onClick={handleDownloadW3c}
              />
              <Button
                variant="secondary"
                label={isId ? 'Salin JSON Token' : 'Copy Token JSON'}
                icon={<Copy size={14} />}
                onClick={() =>
                  void handleCopy(
                    JSON.stringify(w3cDocument, null, 2),
                    isId ? 'JSON token W3C disalin.' : 'Copied W3C token JSON.',
                  )
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="success"
              label={
                isId
                  ? 'Inspektur Token Aktif & Audit Kontras Langsung'
                  : 'Live Resolved Tokens & Contrast Inspector'
              }
            />
            <Heading level={3}>
              {dna.atmosphere.name} · {dna.accent.name} ({dna.accent.seed})
            </Heading>
          </Stack>
          <Table
            aria-label="Resolved Mehan design tokens"
            data={tokenRows}
            columns={[
              {
                key: 'token',
                header: 'CSS Token',
                width: proportional(1.3),
                renderCell: row => (
                  <span className="studio-mono-pill">{String(row.token)}</span>
                ),
              },
              {
                key: 'role',
                header: isId ? 'Peran permukaan' : 'Surface role',
                width: proportional(1.2),
              },
              {
                key: 'light',
                header: 'Light',
                width: proportional(0.9),
                renderCell: row => (
                  <span className="studio-color-chip">
                    <i style={{backgroundColor: String(row.light)}} />
                    <code>{String(row.light)}</code>
                  </span>
                ),
              },
              {
                key: 'dark',
                header: 'Dark',
                width: proportional(0.9),
                renderCell: row => (
                  <span className="studio-color-chip">
                    <i style={{backgroundColor: String(row.dark)}} />
                    <code>{String(row.dark)}</code>
                  </span>
                ),
              },
              {
                key: 'contrast',
                header: isId ? 'Rasio kontras' : 'Contrast / Delta',
                width: proportional(1),
                renderCell: row => (
                  <Badge variant="success" label={String(row.contrast)} />
                ),
              },
            ]}
            density="balanced"
            hasHover
          />
        </Stack>
      </Card>
    </Stack>
  );
}
