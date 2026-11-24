import React, {useState} from 'react';
import {
  Badge,
  Button,
  Card,
  Collapsible,
  Divider,
  EmptyState,
  Grid,
  Heading,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  Stack,
  Table,
  Text,
  TextInput,
  proportional,
} from '@astryxdesign/core';
import {CheckCircle2, Inbox, XCircle} from 'lucide-react';
import type {StudioCopy} from './i18n';
import type {StudioLang} from './studioState';

interface UxCopyViewProps {
  lang: StudioLang;
  copy: StudioCopy;
  onOpenConfirmDemo: () => void;
}

export function UxCopyView({lang, copy, onOpenConfirmDemo}: UxCopyViewProps) {
  const isId = lang === 'id';
  const [projName, setProjName] = useState('Acme Billing');
  const [region, setRegion] = useState('Singapore (ap-southeast-1)');
  const [webhookUrl, setWebhookUrl] = useState('https://api.acme.dev/hooks');
  const [badEmail, setBadEmail] = useState('raihan@acme');
  const [period, setPeriod] = useState('week');

  const semanticRows = isId
    ? [
        {
          id: '1',
          need: 'Memilih nilai di dalam form',
          right: 'Selector (Select)',
          wrong: 'DropdownMenu (Menu aksi)',
        },
        {
          id: '2',
          need: 'Menyaring tabel secara langsung',
          right: 'TextInput pencarian + tombol hapus',
          wrong: 'Typeahead popup daftar saran',
        },
        {
          id: '3',
          need: 'Ganti mode tampilan (2–5 opsi)',
          right: 'SegmentedControl',
          wrong: 'TabList (khusus ganti panel isi)',
        },
        {
          id: '4',
          need: '5+ baris data sejenis (transaksi/user)',
          right: 'Table padat & rapi',
          wrong: 'Tembok kartu berulang (card wall)',
        },
      ]
    : [
        {
          id: '1',
          need: 'Choose a value inside a form',
          right: 'Selector (Select)',
          wrong: 'DropdownMenu (Action menu)',
        },
        {
          id: '2',
          need: 'Filter a visible table live',
          right: 'Clearable search TextInput',
          wrong: 'Typeahead suggestion popup',
        },
        {
          id: '3',
          need: 'Switch immediate view mode (2–5 options)',
          right: 'SegmentedControl',
          wrong: 'TabList (reserved for panel swap)',
        },
        {
          id: '4',
          need: '5+ homogeneous records (orders/users)',
          right: 'Row-first Table',
          wrong: 'Noisy wall of repeated cards',
        },
      ];

  const copyRows = isId
    ? [
        {
          id: 'c1',
          rule: 'Huruf kalimat (Sentence case)',
          good: 'Simpan perubahan',
          avoid: 'SIMPAN PERUBAHAN / Simpan Perubahan',
        },
        {
          id: 'c2',
          rule: 'Kata Kerja + Objek spesifik',
          good: 'Buat proyek baru',
          avoid: 'Submit / OK / Proses',
        },
        {
          id: 'c3',
          rule: 'Dialog hapus menyebut nama objek',
          good: 'Hapus kunci API / Batal',
          avoid: 'Ya / Tidak',
        },
        {
          id: 'c4',
          rule: 'Pesan error ramah & solutif',
          good: 'Masukkan email kantor yang valid, mis. nama@perusahaan.com.',
          avoid: 'Input salah! Format tidak valid.',
        },
      ]
    : [
        {
          id: 'c1',
          rule: 'Sentence case everywhere',
          good: 'Save changes',
          avoid: 'SAVE CHANGES / Save Changes',
        },
        {
          id: 'c2',
          rule: 'Specific Verb + Noun CTA',
          good: 'Create workspace',
          avoid: 'Submit / OK / Process',
        },
        {
          id: 'c3',
          rule: 'Named destructive dialog actions',
          good: 'Delete API key / Cancel',
          avoid: 'Yes / No',
        },
        {
          id: 'c4',
          rule: 'Blame-free actionable error copy',
          good: 'Enter a valid work email, like name@company.com.',
          avoid: 'Invalid input! Wrong format.',
        },
      ];

  return (
    <Stack gap={5}>
      <Stack gap={1.5}>
        <Heading level={2}>{copy.ux.title}</Heading>
        <Text color="secondary">{copy.ux.subtitle}</Text>
      </Stack>

      {/* Rule 1: Action Hierarchy */}
      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="info"
              label={isId ? 'Aturan 1 · Hierarki Tombol' : 'Rule 1 · Action Hierarchy'}
            />
            <Heading level={3}>
              {isId
                ? 'Maksimal 1 tombol Primary per layar atau dialog'
                : 'Maximum one Primary CTA per view or dialog'}
            </Heading>
            <Text color="secondary">
              {isId
                ? 'Saat semua tombol berteriak dengan warna aksen penuh, mata pengguna bingung harus menekan yang mana.'
                : 'When every button shouts with solid accent fill, users hesitate instead of acting confidently.'}
            </Text>
          </Stack>

          <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3}>
            <div className="studio-ux-box studio-ux-do">
              <div className="studio-ux-tag studio-ux-tag-do">
                <CheckCircle2 size={15} />
                <span>{copy.ux.doLabel}</span>
              </div>
              <Text color="secondary">
                {isId
                  ? '1 Primary untuk tujuan utama, Secondary untuk pendukung, Ghost untuk batal.'
                  : 'One Primary CTA, raised Secondary for support, quiet Ghost for cancel.'}
              </Text>
              <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                <Button variant="ghost" label={isId ? 'Batal' : 'Cancel'} />
                <Button
                  variant="secondary"
                  label={isId ? 'Simpan draf' : 'Save draft'}
                />
                <Button
                  variant="primary"
                  label={isId ? 'Terbitkan rilis' : 'Publish release'}
                />
              </Stack>
            </div>

            <div className="studio-ux-box studio-ux-dont">
              <div className="studio-ux-tag studio-ux-tag-dont">
                <XCircle size={15} />
                <span>{copy.ux.dontLabel}</span>
              </div>
              <Text color="secondary">
                {isId
                  ? 'Tiga tombol Primary bersaing + label huruf kapital samar ("OK", "SUBMIT").'
                  : 'Three competing Primary buttons + vague shouting labels ("OK", "SUBMIT").'}
              </Text>
              <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
                <Button variant="primary" label="SUBMIT" />
                <Button variant="primary" label="EXPORT ALL" />
                <Button variant="primary" label="OK" />
              </Stack>
            </div>
          </Grid>
        </Stack>
      </Card>

      {/* Rule 2: Progressive Disclosure */}
      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="info"
              label={
                isId
                  ? 'Aturan 2 · Sederhana di Depan, Lengkap Saat Dibutuhkan'
                  : 'Rule 2 · Simple First, Power on Demand'
              }
            />
            <Heading level={3}>
              {isId
                ? 'Tampilkan <= 5 kontrol utama; simpan opsi ahli di laci lipat'
                : 'Keep <= 5 top-level controls; tuck expert flags inside Collapsible'}
            </Heading>
          </Stack>

          <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={3}>
            <div className="studio-ux-box studio-ux-do">
              <div className="studio-ux-tag studio-ux-tag-do">
                <CheckCircle2 size={15} />
                <span>{copy.ux.doLabel}</span>
              </div>
              <TextInput
                label={isId ? 'Nama proyek' : 'Project name'}
                value={projName}
                onChange={setProjName}
              />
              <Selector
                label={isId ? 'Wilayah server' : 'Server region'}
                options={[
                  'Singapore (ap-southeast-1)',
                  'Tokyo (ap-northeast-1)',
                  'Frankfurt (eu-central-1)',
                ]}
                value={region}
                onChange={setRegion}
              />
              <Collapsible
                trigger={isId ? 'Pengaturan lanjutan (Webhook)' : 'Advanced settings (Webhook)'}
              >
                <TextInput
                  label="Webhook URL"
                  value={webhookUrl}
                  onChange={setWebhookUrl}
                />
              </Collapsible>
            </div>

            <div className="studio-ux-box studio-ux-dont">
              <div className="studio-ux-tag studio-ux-tag-dont">
                <XCircle size={15} />
                <span>{copy.ux.dontLabel}</span>
              </div>
              <Text color="secondary">
                {isId
                  ? 'Menumpuk 8–12 parameter teknis mentah sekaligus di layar pertama membuat pengguna awam langsung mundur.'
                  : 'Dumping 8–12 raw technical flags onto the initial screen overwhelms first-time users immediately.'}
              </Text>
              <div className="studio-clutter-mock">
                <span>Shard ID</span>
                <span>Retry jitter (ms)</span>
                <span>TLS cipher</span>
                <span>Webhook HMAC</span>
                <span>Keep-alive TTL</span>
                <span>Pool max idle</span>
              </div>
            </div>
          </Grid>
        </Stack>
      </Card>

      {/* Rule 3: Semantic Control Boundaries & Row-First Data */}
      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="info"
              label={
                isId
                  ? 'Aturan 3 · Batas Semantik Kontrol & Disiplin Tabel'
                  : 'Rule 3 · Semantic Control Boundaries & Row-First Data'
              }
            />
            <Heading level={3}>
              {isId
                ? 'Pakai kontrol sesuai maknanya — jangan tukar fungsi menu, pemilih, dan tab'
                : 'Match every control to its exact behavioral job'}
            </Heading>
          </Stack>

          <Stack direction="horizontal" gap={3} align="center" wrap="wrap">
            <Text color="secondary">
              {isId ? 'Contoh SegmentedControl (ganti rentang langsung):' : 'Live SegmentedControl (instant view switch):'}
            </Text>
            <SegmentedControl
              label="Time range"
              size="sm"
              value={period}
              onChange={setPeriod}
            >
              <SegmentedControlItem value="day" label={isId ? 'Hari' : 'Day'} />
              <SegmentedControlItem value="week" label={isId ? 'Minggu' : 'Week'} />
              <SegmentedControlItem value="month" label={isId ? 'Bulan' : 'Month'} />
            </SegmentedControl>
          </Stack>

          <Table
            aria-label="Semantic control rules"
            data={semanticRows}
            columns={[
              {
                key: 'need',
                header: isId ? 'Kebutuhan interaksi' : 'Interaction need',
                width: proportional(1.3),
              },
              {
                key: 'right',
                header: isId ? 'Gunakan ini (Benar)' : 'Use this (Right)',
                width: proportional(1.2),
                renderCell: row => <Badge variant="success" label={String(row.right)} />,
              },
              {
                key: 'wrong',
                header: isId ? 'Jangan gunakan ini' : 'Never substitute',
                width: proportional(1.2),
                renderCell: row => <Badge variant="error" label={String(row.wrong)} />,
              },
            ]}
            density="balanced"
            hasHover
          />
        </Stack>
      </Card>

      {/* Rule 4: Recovery States */}
      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="info"
              label={
                isId
                  ? 'Aturan 4 · Empat Kondisi Pemulihan Manusiawi'
                  : 'Rule 4 · Four Humane Recovery States'
              }
            />
            <Heading level={3}>
              {isId
                ? 'Validasi tanpa menghapus ketikan, layar kosong yang mengarahkan, & konfirmasi hapus yang jelas'
                : 'Non-destructive validation, actionable empty views, & named destructive confirm'}
            </Heading>
          </Stack>

          <Grid columns={{minWidth: 300, max: 2, repeat: 'fit'}} gap={4} align="start">
            <Stack gap={3}>
              <TextInput
                label={isId ? 'Email kerja (contoh error solutif)' : 'Work email (blame-free inline error)'}
                value={badEmail}
                onChange={setBadEmail}
                status={{
                  type: 'error',
                  message: isId
                    ? 'Masukkan email kantor yang lengkap, misalnya nama@perusahaan.com.'
                    : 'Enter a complete work email, like name@company.com.',
                }}
              />
              <Divider />
              <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                <Button
                  variant="destructive"
                  label={isId ? 'Hapus kunci API...' : 'Delete API key...'}
                  onClick={onOpenConfirmDemo}
                />
                <Text color="secondary">
                  {isId
                    ? '<- Klik untuk menguji AlertDialog konfirmasi bernama'
                    : '<- Click to test named AlertDialog confirmation'}
                </Text>
              </Stack>
            </Stack>

            <div className="studio-tray-panel">
              <EmptyState
                isCompact
                icon={<Inbox size={26} />}
                title={isId ? 'Belum ada kunci API' : 'No API keys yet'}
                description={
                  isId
                    ? 'Buat kunci API untuk menghubungkan aplikasi produksi dengan aman.'
                    : 'Create an API key to authenticate your production service.'
                }
                actions={
                  <Button
                    variant="primary"
                    size="sm"
                    label={isId ? 'Buat kunci API' : 'Create API key'}
                  />
                }
              />
            </div>
          </Grid>
        </Stack>
      </Card>

      {/* Rule 5: Microcopy Table */}
      <Card elevation="low">
        <Stack gap={3}>
          <Stack gap={1}>
            <Badge
              variant="info"
              label={isId ? 'Aturan 5 · Standar Microcopy' : 'Rule 5 · Microcopy Standards'}
            />
            <Heading level={3}>
              {isId
                ? 'Ringkas, sopan, dan langsung menjelaskan hasil tombol'
                : 'Clear, polite, outcome-driven microcopy'}
            </Heading>
          </Stack>
          <Table
            aria-label="Microcopy rules"
            data={copyRows}
            columns={[
              {
                key: 'rule',
                header: isId ? 'Prinsip bahasa' : 'Copy principle',
                width: proportional(1.1),
              },
              {
                key: 'good',
                header: copy.ux.doLabel,
                width: proportional(1.4),
                renderCell: row => (
                  <Text weight="semibold">{String(row.good)}</Text>
                ),
              },
              {
                key: 'avoid',
                header: copy.ux.dontLabel,
                width: proportional(1.3),
                renderCell: row => (
                  <Text color="secondary">{String(row.avoid)}</Text>
                ),
              },
            ]}
            density="balanced"
          />
        </Stack>
      </Card>
    </Stack>
  );
}
