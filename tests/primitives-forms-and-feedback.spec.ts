import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(repoRoot, 'test-results');

test.describe('Stage 2B Interactive Proof — All 6 Tier 2 Application & Form Feedback Components', () => {
  test('interactively exercises InlineConfirm, ErrorSummary focus-jump, InlineMessage, DigitEntry paste/backspace, Rating half-steps, and ImageWell clear/dropzone with 0 WCAG 2.2 AA violations', async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});

    await page.getByText('EN', {exact: true}).click();
    await page.getByRole('tab', {name: 'Components'}).click();
    await page
      .getByRole('radiogroup', {name: 'Filter by package'})
      .getByRole('radio', {name: /Mehan extensions/})
      .click();

    // 1. InlineConfirm: arm -> Cancel focused first -> Escape disarms & restores focus -> arm & Confirm!
    const icCard = page.locator('[data-component="inline-confirm"]');
    const icTrigger = icCard.getByRole('button', {name: 'Remove webhook'});
    await icTrigger.click();
    const cancelBtn = icCard.getByRole('button', {name: 'Cancel'});
    await expect(cancelBtn).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(icCard.getByRole('button', {name: 'Remove webhook'})).toBeFocused();
    await icCard.getByRole('button', {name: 'Remove webhook'}).click();
    await icCard.getByRole('button', {name: 'Remove', exact: true}).click();
    await expect(icCard.getByRole('button', {name: 'Remove webhook'})).toBeVisible();

    // 2. ErrorSummary: clicking the validation link jumps keyboard focus directly to #spec-work-email!
    const esCard = page.locator('[data-component="error-summary"]');
    await esCard.scrollIntoViewIfNeeded();
    await esCard.getByRole('link', {name: /Work email:/}).click();
    await expect(page.locator('#spec-work-email')).toBeFocused();

    // 3. InlineMessage: verify all 3 semantic lines render cleanly
    const imCard = page.locator('[data-component="inline-message"]');
    await expect(imCard.locator('.mehan-inline-message')).toHaveCount(3);

    // 4. DigitEntry (OTP): multi-char paste ("910-735") strips hyphen, fills all 6 cells, and Backspace clears!
    const deCard = page.locator('[data-component="digit-entry"]');
    await deCard.scrollIntoViewIfNeeded();
    const firstCell = deCard.getByRole('textbox', {
      name: 'Two-factor code digit 1 of 6',
    });
    await firstCell.focus();
    await firstCell.evaluate(el => {
      const dt = new DataTransfer();
      dt.setData('text/plain', '910-735');
      el.dispatchEvent(
        new ClipboardEvent('paste', {
          clipboardData: dt,
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    await expect(
      deCard.getByRole('textbox', {name: 'Two-factor code digit 6 of 6'}),
    ).toHaveValue('5');
    await page.keyboard.press('Backspace');
    await expect(
      deCard.getByRole('textbox', {name: 'Two-factor code digit 6 of 6'}),
    ).toHaveValue('');

    // 5. Rating: half-step ArrowLeft (4.5 -> 4.0) & End (4.0 -> 5.0) + read-only role="img"
    const rtCard = page.locator('[data-component="rating"]');
    const rtSlider = rtCard.getByRole('slider', {name: 'Craft score'});
    await expect(rtSlider).toHaveAttribute('aria-valuenow', '4.5');
    await rtSlider.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(rtSlider).toHaveAttribute('aria-valuenow', '4');
    await page.keyboard.press('End');
    await expect(rtSlider).toHaveAttribute('aria-valuenow', '5');
    await expect(
      rtCard.getByRole('img', {name: 'Aggregate score: 5 out of 5'}),
    ).toBeVisible();

    // 6. ImageWell: starts with SVG preview -> click Remove -> transforms into keyboard-focusable dropzone!
    const iwCard = page.locator('[data-component="image-well"]');
    await iwCard.scrollIntoViewIfNeeded();
    await expect(iwCard.locator('img[alt="Brand emblem"]')).toBeVisible();
    await iwCard.getByRole('button', {name: 'Remove Brand emblem'}).click();
    const dropzone = iwCard.getByRole('button', {name: 'Brand emblem'});
    await expect(dropzone).toBeVisible();

    await esCard.evaluate(el => el.scrollIntoView({block: 'start'}));
    await page.screenshot({
      path: path.join(shotDir, 'stage2b-tier2-feedback-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    await page.getByRole('button', {name: 'Dark mode'}).click();
    await deCard.evaluate(el => el.scrollIntoView({block: 'start'}));
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'stage2b-tier2-controls-dark-1366.png'),
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
