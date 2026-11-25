import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(os.tmpdir(), 'mehan-playwright-shots');

test.describe('Stage 2C Interactive Proof — All 10 Tier 3 Data Viz, Editors & Surface Components', () => {
  test('interactively exercises CanvasZoomBar, Sparkline SR table, Gauge, ActivityRing, TimelineScrubber, CodeEditor Esc->Tab exit, MarkdownEditor Write/Preview, NotificationCenter, Tour & Timeline with 0 WCAG 2.2 AA violations', async ({
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
    await expect(page.getByText('142 live specimens')).toBeVisible();

    await page
      .getByRole('radiogroup', {name: 'Filter by package'})
      .getByRole('radio', {name: 'Mehan extensions (39)'})
      .click();

    // 1. CanvasZoomBar: Zoom in (100% -> 125%), preset menu -> 150%, Fit to screen -> 100%
    const czCard = page.locator('[data-component="canvas-zoom-bar"]');
    await czCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await czCard.getByRole('button', {name: 'Zoom in'}).click();
    await expect(czCard.locator('.mehan-czb-readout')).toHaveText('125%');
    await czCard.locator('.mehan-czb-readout').click();
    await czCard.getByRole('menuitem', {name: '150%'}).click();
    await expect(czCard.locator('.mehan-czb-readout')).toHaveText('150%');
    await czCard.getByRole('button', {name: 'Fit canvas to screen'}).click();
    await expect(czCard.locator('.mehan-czb-readout')).toHaveText('100%');

    // 2. Sparkline + Gauge + ActivityRing (Data Visualization): verify companion SR <table> & role="meter"
    const spCard = page.locator('[data-component="sparkline"]');
    await spCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await expect(
      spCard.getByRole('table', {name: '7-day request throughput'}),
    ).toBeAttached();
    const gaugeCard = page.locator('[data-component="gauge"]');
    await expect(
      gaugeCard.getByRole('meter', {name: 'Memory quota'}),
    ).toHaveAttribute('aria-valuenow', '68');
    const arCard = page.locator('[data-component="activity-ring"]');
    await expect(arCard.locator('.mehan-ar-legend-item')).toHaveCount(3);

    await page.screenshot({
      path: path.join(shotDir, 'stage2c-tier3-dataviz-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // 3. TimelineScrubber: click keyframe marker "Hero reveal (8.5s)" + Shift+ArrowRight frame step!
    const tsCard = page.locator('[data-component="timeline-scrubber"]');
    await tsCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await tsCard.getByRole('button', {name: /Jump to Hero reveal/}).click();
    const scrubber = tsCard.getByRole('slider', {name: 'Timeline playhead'});
    await expect(scrubber).toHaveAttribute('aria-valuenow', '8.5');
    await scrubber.focus();
    await page.keyboard.press('ArrowRight');
    await expect(scrubber).toHaveAttribute('aria-valuenow', '9.5');

    // 4. CodeEditor: prove Tab indents by default, AND Escape unlocks Tab to leave textarea (WCAG 2.1.2)!
    const ceCard = page.locator('[data-component="code-editor"]');
    await ceCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    const codeArea = ceCard.getByRole('textbox', {
      name: 'Theme config code editor',
    });
    await codeArea.focus();
    const lenBefore = (await codeArea.inputValue()).length;
    await page.keyboard.press('Tab');
    expect((await codeArea.inputValue()).length).toBe(lenBefore + 2);
    await expect(codeArea).toBeFocused();
    // Now press Escape -> Tab MUST exit the textarea instead of trapping focus!
    await page.keyboard.press('Escape');
    await page.keyboard.press('Tab');
    const stillInTextarea = await codeArea.evaluate(
      el => document.activeElement === el,
    );
    expect(stillInTextarea).toBe(false);

    // 5. MarkdownEditor: switch Write -> Preview -> verify rendered <h4> -> move cursor to end -> Bold -> verify <strong>!
    const mdeCard = page.locator('[data-component="markdown-editor"]');
    await mdeCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await mdeCard.getByRole('tab', {name: 'Preview'}).click();
    await expect(
      mdeCard.locator('.mehan-mde-preview h4', {hasText: 'Release notes'}),
    ).toBeVisible();
    await mdeCard.getByRole('tab', {name: 'Write'}).click();
    const mdArea = mdeCard.getByRole('textbox', {
      name: 'Release notes markdown editor',
    });
    await mdArea.focus();
    await page.keyboard.press('Control+End');
    await page.keyboard.press('Enter');
    await mdeCard.getByRole('button', {name: 'Bold'}).click();
    await mdeCard.getByRole('tab', {name: 'Preview'}).click();
    await expect(
      mdeCard.locator('.mehan-mde-preview h4', {hasText: 'Release notes'}),
    ).toBeVisible();
    await expect(
      mdeCard.locator('.mehan-mde-preview strong', {hasText: 'bold'}),
    ).toBeVisible();
    await mdeCard.getByRole('tab', {name: 'Write'}).click();

    // 6. NotificationCenter: badge shows 2 -> open -> Mark all read -> badge disappears -> Escape restores focus!
    const ncCard = page.locator('[data-component="notification-center"]');
    await ncCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    const ncTrigger = ncCard.locator('.mehan-nc-trigger');
    await expect(ncCard.locator('.mehan-nc-badge')).toHaveText('2');
    await ncTrigger.click();
    await ncCard.getByRole('button', {name: 'Mark all read'}).click();
    await expect(ncCard.locator('.mehan-nc-badge')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(ncTrigger).toBeFocused();

    // 7. Tour: Step 1 -> Next -> Step 2 -> Next -> Finish -> Restart button appears -> reopen!
    const tourCard = page.locator('[data-component="tour"]');
    await tourCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await expect(tourCard.getByText('Step 1 of 3')).toBeVisible();
    await expect(tourCard.getByRole('button', {name: 'Skip tour'}).nth(1)).toBeVisible();
    await tourCard.getByRole('button', {name: 'Next'}).click();
    await expect(tourCard.getByText('Step 2 of 3')).toBeVisible();
    await tourCard.getByRole('button', {name: 'Next'}).click();
    await expect(tourCard.getByText('Step 3 of 3')).toBeVisible();
    await tourCard.getByRole('button', {name: 'Finish'}).click();
    await tourCard.getByRole('button', {name: 'Restart 3-step tour'}).click();
    await expect(tourCard.getByText('Step 1 of 3')).toBeVisible();

    // 8. Timeline: semantic <ol> with 3 items
    const tlCard = page.locator('[data-component="timeline"]');
    await expect(tlCard.locator('ol.mehan-timeline > li')).toHaveCount(3);

    await page.getByRole('button', {name: 'Dark mode'}).click();
    await tourCard.evaluate(el => el.scrollIntoView({block: 'center'}));
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'stage2c-tier3-surfaces-dark-1366.png'),
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
