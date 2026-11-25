import React, {useState} from 'react';
import {HStack, Stack, useToast} from '@astryxdesign/core';
import {
  DigitEntry,
  ErrorSummary,
  ImageWell,
  InlineConfirm,
  InlineMessage,
  Rating,
} from '@mehan/astryx';
import type {SpecimenDefinition} from './SpecimenCard';

const DEMO_ART_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120"><rect width="240" height="120" rx="14" fill="#fce7f3"/><circle cx="84" cy="60" r="28" fill="#d42a5f"/><rect x="128" y="42" width="76" height="14" rx="7" fill="#9d174d"/><rect x="128" y="64" width="52" height="12" rx="6" fill="#f472b6"/></svg>`,
  );

export function useCatalogMehanFormsFeedback(): SpecimenDefinition[] {
  const showToast = useToast();
  const [otp, setOtp] = useState('482');
  const [score, setScore] = useState(4.5);
  const [artwork, setArtwork] = useState<string | null>(DEMO_ART_SVG);
  const [emailVal, setEmailVal] = useState('raihan@');

  return [
    {
      id: 'inline-confirm',
      name: 'InlineConfirm',
      category: 'Action',
      pkg: 'mehan',
      summaryEn:
        'Lightweight two-step inline confirmation for row-level removals, focusing Cancel first and disarming on Escape.',
      summaryId:
        'Konfirmasi sebaris dua langkah untuk penghapusan baris yang memfokuskan Batal lebih dulu dan batal otomatis dengan Escape.',
      code: `<InlineConfirm triggerLabel="Remove webhook" confirmLabel="Remove" prompt="Remove endpoint?" onConfirm={removeWebhook} />`,
      render: () => (
        <InlineConfirm
          triggerLabel="Remove webhook"
          confirmLabel="Remove"
          cancelLabel="Cancel"
          prompt="Remove endpoint?"
          onConfirm={() =>
            showToast({type: 'info', body: 'Webhook endpoint removed.'})
          }
        />
      ),
    },
    {
      id: 'error-summary',
      name: 'ErrorSummary',
      category: 'Feedback & Status',
      pkg: 'mehan',
      span: 'wide',
      summaryEn:
        'Top-of-form WCAG 3.3.1 validation summary with clickable focus-jumping links directly to invalid fields.',
      summaryId:
        'Ringkasan validasi formulir WCAG 3.3.1 di bagian atas dengan tautan lompat-fokus langsung ke kolom yang perlu diperbaiki.',
      code: `<ErrorSummary errors={[{fieldId: 'work-email', fieldLabel: 'Work email', message: 'Enter a valid email, like name@company.com.'}]} />`,
      render: () => (
        <Stack gap={2} style={{maxWidth: 460}}>
          <ErrorSummary
            errors={[
              {
                fieldId: 'spec-work-email',
                fieldLabel: 'Work email',
                message: 'Enter a valid email address, like name@company.com.',
              },
            ]}
          />
          <label
            htmlFor="spec-work-email"
            style={{display: 'flex', flexDirection: 'column', gap: 4}}>
            <span style={{fontSize: 12, fontWeight: 600}}>Work email</span>
            <input
              id="spec-work-email"
              type="email"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
              style={{
                height: 34,
                padding: '0 10px',
                borderRadius: 8,
                border: '1.5px solid var(--color-error)',
                background: 'var(--mehan-well)',
                color: 'var(--color-text-primary)',
                fontFamily: 'inherit',
                fontSize: 13,
              }}
            />
          </label>
        </Stack>
      ),
    },
    {
      id: 'inline-message',
      name: 'InlineMessage',
      category: 'Feedback & Status',
      pkg: 'mehan',
      summaryEn:
        'Compact field-level feedback line pairing a semantic icon with WCAG-verified status ink.',
      summaryId:
        'Baris umpan balik ringkas setingkat kolom yang memadukan ikon semantik dengan teks berkontras WCAG AA.',
      code: `<InlineMessage status="success" message="DNS records verified across all edge regions." />`,
      render: () => (
        <Stack gap={1.5}>
          <InlineMessage
            status="success"
            message="DNS records verified across all edge regions."
          />
          <InlineMessage
            status="warning"
            message="API token expires in 3 days — rotate before Friday."
          />
          <InlineMessage
            status="error"
            isLive={false}
            message="Use 8 or more characters with at least one number."
          />
        </Stack>
      ),
    },
    {
      id: 'digit-entry',
      name: 'DigitEntry',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Paste-ready 6-digit OTP / PIN verification cells with SMS one-time-code autofill and smart Backspace step-back.',
      summaryId:
        'Kolom verifikasi OTP / PIN 6 digit siap tempel (paste) otomatis dengan isi ulang SMS dan navigasi Backspace cerdas.',
      code: `<DigitEntry value={code} onChange={setCode} hasSeparatorAfter={3} onComplete={verifyCode} />`,
      render: () => (
        <DigitEntry
          label="Two-factor code"
          value={otp}
          onChange={setOtp}
          hasSeparatorAfter={3}
          onComplete={done =>
            showToast({type: 'info', body: `Verified code ${done}`})
          }
        />
      ),
    },
    {
      id: 'rating',
      name: 'Rating',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Interactive half-star and read-only star score control with live pointer preview and slider keyboard support.',
      summaryId:
        'Kontrol penilaian bintang interaktif (termasuk setengah bintang) dan mode baca-saja bernavigasi tombol panah.',
      code: `<Rating label="Craft score" value={score} onChange={setScore} allowHalf hasValueReadout />`,
      render: () => (
        <HStack gap={4} wrap="wrap" vAlign="center">
          <Rating
            label="Craft score"
            value={score}
            onChange={setScore}
            allowHalf
            hasValueReadout
          />
          <Rating
            label="Aggregate score"
            value={5}
            isReadOnly
            size="sm"
          />
        </HStack>
      ),
    },
    {
      id: 'image-well',
      name: 'ImageWell',
      category: 'Form Controls',
      pkg: 'mehan',
      summaryEn:
        'Recessed media dropzone supporting browse, drag-and-drop, and clipboard Ctrl+V paste with checkerboard preview.',
      summaryId:
        'Area unggah gambar cekung yang mendukung telusur file, seret-lepas, dan tempel Ctrl+V berlatar papan catur.',
      code: `<ImageWell label="Brand emblem" value={img} onSelectFile={(_, url) => setImg(url)} onClear={() => setImg(null)} />`,
      render: () => (
        <ImageWell
          label="Brand emblem"
          value={artwork}
          onSelectFile={(_file, url) => setArtwork(url)}
          onClear={() => setArtwork(null)}
        />
      ),
    },
  ];
}
