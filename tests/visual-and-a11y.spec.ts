import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const studioFileUrl = pathToFileURL(
  path.resolve(import.meta.dirname, '../STUDIO.html'),
).href;

const shotDir =
  process.env.MEHAN_SHOT_DIR ?? path.resolve(import.meta.dirname, '../test-results');

test.describe('STUDIO.html 1-Door Hub offline file:// visual & WCAG AA contrast gate', () => {
  test('passes Desktop 1366x900 Light/Dark across all 5 tabs, ID/EN switcher, and Customize drawer with 0 errors and 0 axe contrast violations', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});
    await expect(page.getByText('mehan', {exact: true})).toBeVisible();

    // 1. Overview (Indonesian default, Confectionery Light)
    await page.screenshot({
      path: path.join(shotDir, 'studio-overview-id-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 2. Switch to English + Components Gallery (Light) -> inspect silky button lips & soft Delete item!
    await page.getByRole('radio', {name: 'EN', exact: true}).click();
    await page.getByRole('tab', {name: 'Components'}).click();
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(shotDir, 'studio-components-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 3. Switch to Dark Mode on Components Gallery
    await page.getByRole('button', {name: /Dark mode/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-components-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 4. Switch back to Light + UX & Copy Do vs. Don't Tab
    await page.getByRole('button', {name: /Light mode/i}).click();
    await page.getByRole('tab', {name: 'UX & Copy'}).click();
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(shotDir, 'studio-ux-copy-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 5. Patterns Tab (3D Canvas Studio in Dark Mode)
    await page.getByRole('tab', {name: 'Patterns'}).click();
    await page.getByRole('radio', {name: '3D Canvas Studio'}).click();
    await page.getByRole('button', {name: /Dark mode/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-patterns-canvas-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 6. Maintain Tab + Open 6-Knob Customize Drawer (Light Mode)
    await page.getByRole('button', {name: /Light mode/i}).click();
    await page.getByRole('tab', {name: 'Maintain'}).click();
    await page.waitForTimeout(200);
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    await page.getByRole('button', {name: 'Customize'}).click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(shotDir, 'studio-maintain-drawer-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    expect(errors).toEqual([]);
  });

  test('renders cleanly on Mobile 375x812 over file:// without horizontal overflow and 0 contrast violations', async ({
    page,
  }) => {
    await page.setViewportSize({width: 375, height: 812});
    await page.goto(studioFileUrl, {waitUntil: 'load'});
    await expect(page.getByText('mehan', {exact: true})).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    await page.screenshot({
      path: path.join(shotDir, 'studio-mobile-id-light-375.png'),
      fullPage: false,
    });

    const mobileAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(mobileAxe.violations).toEqual([]);
  });
});
