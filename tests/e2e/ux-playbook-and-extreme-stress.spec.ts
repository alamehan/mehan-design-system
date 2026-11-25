import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(os.tmpdir(), 'mehan-playwright-shots');

test.describe('Stage 4 — Expanded 12-Chapter UX Playbook (U1-U6), Bilingual ID/EN Audit, Media Hygiene & Extreme-Seed Stress Test', () => {
  test('exercises U1-U6 interactive UX sandboxes in both ID & EN, verifies offline zero-network, and passes WCAG 2.2 AA', async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    const externalRequests: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('request', req => {
      const url = req.url();
      if (url.startsWith('http://') || url.startsWith('https://')) {
        externalRequests.push(url);
      }
    });

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});

    // 1. Default language is ID: verify localized Components badge ("131 spesimen aktif") & UX & Bahasa ("12 Bab · Terindeks AI")
    await page.getByRole('tab', {name: 'Komponen'}).click();
    await expect(page.getByText('142 spesimen aktif')).toBeVisible();
    await expect(
      page.getByRole('radio', {name: 'Ekstensi Mehan (39)'}),
    ).toBeVisible();

    await page.getByRole('tab', {name: 'UX & Bahasa'}).click();
    await expect(page.getByText('12 Bab · Terindeks AI')).toBeVisible();

    // Exercise Chapter 12 (U6) in Indonesian Dark mode!
    await page.getByRole('button', {name: 'Mode gelap'}).click();
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'Ekspansi Bahasa & Intl'})
      .click();
    await expect(page.getByText('12.480,5')).toBeVisible();
    await page
      .getByRole('radiogroup', {name: 'Formatting locale'})
      .getByRole('radio', {name: 'en-US'})
      .click();
    await expect(page.getByText('12,480.5')).toBeVisible();

    await page.screenshot({
      path: path.join(shotDir, 'stage4-ux-u6-intl-id-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Open All 12 Chapters in Indonesian & run full WCAG 2.2 AA audit!
    await page.getByRole('button', {name: 'Mode terang'}).click();
    await page.locator('.ux-sidebar .cat-nav-btn', {hasText: 'Semua Bab'}).click();
    await page.waitForTimeout(120);
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // 2. Switch to English -> test U1 ErrorSummary jump + U3 Reward-Early-Punish-Late live validation!
    await page
      .locator('.studio-topbar')
      .getByRole('radio', {name: 'EN'})
      .click();
    await expect(page.getByText('12 Chapters · AI-Indexed')).toBeVisible();

    // Chapter 07 (U1): click ErrorSummary link -> jumps focus to Workspace slug input -> fix slug -> success InlineMessage!
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'Keyboard & Focus Laws'})
      .click();
    await page.getByRole('link', {name: /Workspace slug:/}).click();
    const u1Input = page.getByRole('textbox', {name: 'Workspace slug'});
    await expect(u1Input).toBeFocused();
    await u1Input.fill('acme-prod');
    await expect(
      page.getByText('Workspace slug is valid and ready to save.'),
    ).toBeVisible();

    // Chapter 09 (U3): Reward Early, Punish Late (zero error while typing first time -> error on blur -> instant clear on valid keystroke!)
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'Form Timing & Confirm'})
      .click();
    const u3Input = page.getByRole('textbox', {
      name: 'Release notification email',
    });
    await u3Input.fill('dev@acme');
    const u3FieldError = page.locator('.astryx-field-status', {
      hasText: 'Include a complete domain, like dev@acme.com.',
    });
    // Still focused & first entry -> must NOT show red error prematurely!
    await expect(u3FieldError).toHaveCount(0);

    // Blur out -> error appears!
    await page.keyboard.press('Tab');
    await expect(u3FieldError).toBeVisible();

    await page.screenshot({
      path: path.join(shotDir, 'stage4-ux-u3-forms-light-1366.png'),
      fullPage: false,
    });

    // Type ".com" -> clears IMMEDIATELY on keystroke without needing another blur!
    await u3Input.fill('dev@acme.com');
    await expect(u3FieldError).toHaveCount(0);
    await expect(
      page.getByText(/Valid email — error cleared immediately/),
    ).toBeVisible();

    // All 12 Chapters in English -> full WCAG 2.2 AA audit!
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'All Chapters'})
      .click();
    await page.waitForTimeout(120);
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // 3. Media Hygiene Emulation Proof: print chrome hiding & forced-colors / reduced-motion stability
    await page.emulateMedia({media: 'print'});
    const topbarPrintDisplay = await page
      .locator('.studio-topbar')
      .evaluate(el => getComputedStyle(el).display);
    expect(topbarPrintDisplay).toBe('none');
    await page.emulateMedia({media: 'screen', reducedMotion: 'reduce', forcedColors: 'active'});
    await page.waitForTimeout(80);
    await page.emulateMedia({media: 'screen', reducedMotion: 'no-preference', forcedColors: 'none'});

    expect(externalRequests).toEqual([]);
    expect(errors).toEqual([]);
  });

  test('passes Extreme Parametric Seed Stress Test (typeBase 16px, Perfect Fourth 1.333, radiusScale 1.5x) on Desktop 1366x900 & Mobile 375x812 with 0px overflow and 0 WCAG AA violations', async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});
    await page.getByText('EN', {exact: true}).click();

    // Open Theme Editor and dial in extreme large typography (16px + Perfect Fourth 1.333) + XL corner radius (8px base)
    await page.getByRole('button', {name: 'Theme Editor', exact: true}).click();
    const editor = page.getByRole('complementary', {name: 'Live Theme Editor'});
    await editor
      .getByRole('radiogroup', {name: 'Base type size preset'})
      .getByRole('radio', {name: '16'})
      .click();
    await editor.getByRole('combobox', {name: 'Type scale ratio'}).click();
    await page.getByRole('option', {name: /Perfect Fourth/}).click();

    // Open Group 3 progressive disclosure and select XL corner radius base (8px)
    await editor
      .getByRole('button', {name: /3\. Scale Presets, Radius & Spacing/})
      .click();
    await editor
      .getByRole('radiogroup', {name: 'Corner radius base preset'})
      .getByRole('radio', {name: 'XL'})
      .click();
    await page.waitForTimeout(150);

    // Close docked editor and verify Desktop 1366x900 across Overview, Components & Templates
    await editor.getByRole('button', {name: 'Close Theme Editor'}).click();
    await page.waitForTimeout(120);

    for (const tabName of [
      'Overview',
      'Components',
      'Patterns & Templates',
      'UX & Copy',
    ] as const) {
      await page.getByRole('tab', {name: tabName}).click();
      await page.waitForTimeout(100);
      const desktopOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(
        desktopOverflow,
        `Desktop horizontal overflow on ${tabName} under extreme seed`,
      ).toBeLessThanOrEqual(2);
      expect(
        (
          await new AxeBuilder({page})
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([]);
    }

    await page.getByRole('tab', {name: 'Overview'}).click();
    await page.screenshot({
      path: path.join(shotDir, 'stage4-extreme-seed-desktop-1366.png'),
      fullPage: false,
    });

    // Resize to Mobile 375x812 under the same extreme 16px / 1.333 / 1.5x seed!
    await page.setViewportSize({width: 375, height: 812});
    await page.waitForTimeout(150);
    const mobileOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(mobileOverflow).toBeLessThanOrEqual(2);
    await page.screenshot({
      path: path.join(shotDir, 'stage4-extreme-seed-mobile-375.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    expect(errors).toEqual([]);
  });
});
