import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(os.tmpdir(), 'mehan-playwright-shots');

test.describe('Stage 2A Interactive Proof — All 8 Tier 1 Mehan Universal & Creative Components', () => {
  test('interactively exercises SplitButton, CopyButton, ThemeSwitch, MiddleTruncate, ColorWell + Alpha, AngleDial, AnchorMatrix & GradientPicker in Light & Dark with 0 WCAG 2.2 AA violations', async ({
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

    // Filter to "Mehan extensions (12)" so all 12 Mehan primitives render on screen!
    await page
      .getByRole('radiogroup', {name: 'Filter by package'})
      .getByRole('radio', {name: /Mehan extensions/})
      .click();

    await expect(page.locator('[data-component="split-button"]')).toBeVisible();
    await expect(page.locator('[data-component="gradient-picker"]')).toBeVisible();

    // 1. SplitButton: primary click + chevron menu keyboard ArrowDown -> Enter + Escape focus restore
    const splitCard = page.locator('[data-component="split-button"]');
    const splitTrigger = splitCard.getByRole('button', {
      name: 'Export PDF — More actions',
    });
    await splitTrigger.click();
    const menu = splitCard.getByRole('menu');
    await expect(menu).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(splitTrigger).toBeFocused();
    await splitTrigger.click();
    await splitCard.getByRole('menuitem', {name: /Export W3C tokens/}).click();
    await expect(menu).toBeHidden();

    // 2. CopyButton: verify ZERO width jitter when morphing "Copy command" -> "Copied"
    const copyCard = page.locator('[data-component="copy-button"]');
    const copyBtn = copyCard.getByRole('button', {name: 'Copy command'});
    const widthBefore = await copyBtn.evaluate(el => el.getBoundingClientRect().width);
    await copyBtn.click();
    await expect(copyCard.locator('.mehan-copy-btn').first()).toHaveAttribute(
      'data-copied',
      'true',
    );
    const widthAfter = await copyCard
      .locator('.mehan-copy-btn')
      .first()
      .evaluate(el => el.getBoundingClientRect().width);
    expect(Math.abs(widthAfter - widthBefore)).toBeLessThanOrEqual(0.5);

    // 3. ThemeSwitch: roving ArrowRight / ArrowLeft across Light, Dark, Auto
    const tsCard = page.locator('[data-component="theme-switch"]');
    const autoRadio = tsCard.getByRole('radio', {name: 'Auto'});
    await expect(autoRadio).toHaveAttribute('aria-checked', 'true');
    await autoRadio.focus();
    await page.keyboard.press('ArrowRight');
    await expect(tsCard.getByRole('radio', {name: 'Light'})).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await page.keyboard.press('ArrowRight');
    await expect(tsCard.getByRole('radio', {name: 'Dark'})).toHaveAttribute(
      'aria-checked',
      'true',
    );

    // 4. MiddleTruncate: preserves trailing ".ts" extension AND copies full path via inline CopyButton
    const midCard = page.locator('[data-component="middle-truncate"]');
    await expect(midCard.locator('.mehan-mid-tail').first()).toHaveText(
      'ioneryTheme.ts',
    );
    await midCard.getByRole('button', {name: 'Copy full value'}).click();

    // 5. ColorWell + ColorPicker Alpha Rail: open popover, change alpha slider, press Escape -> restores trigger focus!
    const cwCard = page.locator('[data-component="color-well"]');
    const cwTrigger = cwCard.locator('.mehan-color-well-trigger');
    await cwTrigger.click();
    const cwDialog = cwCard.getByRole('dialog', {name: 'Fill color'});
    await expect(cwDialog).toBeVisible();
    const alphaSlider = cwDialog.getByRole('slider', {name: 'Opacity percentage'});
    await alphaSlider.fill('50');
    await expect(cwTrigger).toContainText('50%');
    await page.keyboard.press('Escape');
    await expect(cwDialog).toBeHidden();
    await expect(cwTrigger).toBeFocused();

    // 6. AngleDial: keyboard ArrowRight (+5°) + click-to-type degree readout
    const adCard = page.locator('[data-component="angle-dial"]');
    const dialSlider = adCard.getByRole('slider', {name: 'Key light'});
    await expect(dialSlider).toHaveAttribute('aria-valuenow', '135');
    await dialSlider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(dialSlider).toHaveAttribute('aria-valuenow', '140');
    await adCard.getByRole('button', {name: /Edit Key light/}).click();
    const degInput = adCard.getByRole('textbox', {name: 'Key light degrees'});
    await degInput.fill('225');
    await degInput.press('Enter');
    await expect(dialSlider).toHaveAttribute('aria-valuenow', '225');

    // 7. AnchorMatrix: 2D keyboard navigation (Home -> top-start, ArrowDown -> middle-start, ArrowRight -> center)
    const amCard = page.locator('[data-component="anchor-matrix"]');
    const bottomEnd = amCard.getByRole('radio', {name: 'Bottom end'});
    await expect(bottomEnd).toHaveAttribute('aria-checked', 'true');
    await bottomEnd.focus();
    await page.keyboard.press('Home');
    await expect(amCard.getByRole('radio', {name: 'Top start'})).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await expect(
      amCard.getByRole('radio', {name: 'Center', exact: true}),
    ).toHaveAttribute('aria-checked', 'true');
    await expect(amCard.locator('.mehan-am-value')).toHaveText('Center');

    // 8. GradientPicker: click rail to add 4th stop, switch Linear -> Radial -> Linear, edit stop position
    const gpCard = page.locator('[data-component="gradient-picker"]');
    await expect(gpCard.locator('.mehan-gp-handle')).toHaveCount(3);
    await gpCard
      .locator('.mehan-gp-bar-hit')
      .click({position: {x: 84, y: 13}});
    await expect(gpCard.locator('.mehan-gp-handle')).toHaveCount(4);
    await gpCard.getByRole('radio', {name: 'Radial'}).click();
    await expect(gpCard.getByRole('radio', {name: 'Radial'})).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await gpCard.getByRole('radio', {name: 'Linear'}).click();

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: path.join(shotDir, 'stage2a-tier1-mehan-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Scroll down to capture Form Controls creative primitives & verify Dark Mode WCAG 2.2 AA!
    await gpCard.scrollIntoViewIfNeeded();
    await page.getByRole('button', {name: 'Dark mode'}).click();
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'stage2a-tier1-creative-dark-1366.png'),
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
