import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const studioFileUrl = pathToFileURL(
  path.resolve(import.meta.dirname, '../STUDIO.html'),
).href;

const shotDir =
  process.env.MEHAN_SHOT_DIR ?? path.resolve(import.meta.dirname, '../test-results');

test.describe('STUDIO.html v1.0.0 — 12-Category Catalog, Official Theme Showcase & Docked 3-Tier Theme Editor', () => {
  test('passes Desktop 1366x900 Light/Dark across Overview, 12-Category Catalog, Official Theme Showcase, and Docked 3-Tier Theme Editor with 0 errors and 0 axe contrast violations', async ({
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
      path: path.join(shotDir, 'studio-v2-overview-id-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 2. Switch to English + 12-Category Components Catalog (Light)
    await page.getByRole('radio', {name: 'EN', exact: true}).click();
    await page.getByRole('tab', {name: 'Components'}).click();
    await expect(
      page.getByRole('navigation', {
        name: 'Official Astryx component categories',
      }),
    ).toBeVisible();
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v2-catalog-12cat-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 3. Filter to "Form Controls" category + Dark Mode
    await page
      .getByRole('navigation', {name: 'Official Astryx component categories'})
      .getByRole('button', {name: /^Form Controls/})
      .click();
    await page.getByRole('button', {name: /Dark mode/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v2-catalog-form-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 4. Templates -> Official Theme Showcase + Docked 3-Tier Theme Editor (Light Split-Pane!)
    await page.getByRole('button', {name: /Light mode/i}).click();
    await page.getByRole('tab', {name: 'Templates'}).click();
    await page.getByRole('button', {name: 'Theme Editor', exact: true}).click();
    await expect(
      page.getByRole('complementary', {name: 'Live Theme Editor'}),
    ).toBeVisible();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v2-showcase-docked-editor-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 5. Activate Shotcandy 1:1 Preset (Espresso active pill + 13.5px) + Advanced Raw Tokens tab in Dark Mode
    await page
      .getByRole('complementary', {name: 'Live Theme Editor'})
      .getByRole('button', {name: 'Shotcandy 1:1'})
      .click();
    await page
      .getByRole('tablist', {name: 'Theme editor sections'})
      .getByRole('tab', {name: 'Advanced'})
      .click();
    await page.getByRole('button', {name: /Dark mode/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(
        shotDir,
        'studio-v2-showcase-advanced-espresso-dark-1366.png',
      ),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 6. Switch back to Light + UX & Copy + Theme Editor "Components" Tab
    await page.getByRole('button', {name: /Light mode/i}).click();
    await page.getByRole('tab', {name: 'UX & Copy'}).click();
    await page
      .getByRole('tablist', {name: 'Theme editor sections'})
      .getByRole('tab', {name: 'Components'})
      .click();
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v2-editor-components-tab-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 7. Maintain Tab contrast check
    await page.getByRole('tab', {name: 'Maintain'}).click();
    await page.waitForTimeout(150);
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
      path: path.join(shotDir, 'studio-v2-mobile-id-light-375.png'),
      fullPage: false,
    });

    const mobileAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(mobileAxe.violations).toEqual([]);
  });
});
