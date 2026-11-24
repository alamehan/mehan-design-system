import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const studioFileUrl = pathToFileURL(
  path.resolve(import.meta.dirname, '../STUDIO.html'),
).href;

const shotDir = process.env.MEHAN_SHOT_DIR ?? path.resolve(import.meta.dirname, '../test-results');

test.describe('STUDIO.html offline file:// visual & WCAG AA contrast gate', () => {
  test('renders cleanly over file:// in Light & Dark (Desktop 1366x900) with zero console errors and zero axe contrast violations', async ({
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

    // Light Confectionery Desktop screenshot + axe color-contrast gate
    await page.screenshot({
      path: path.join(shotDir, 'studio-confectionery-light-1366.png'),
      fullPage: false,
    });
    const lightAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(lightAxe.violations).toEqual([]);

    // Switch to Dark Mode
    await page.getByRole('button', {name: /Dark/i}).first().click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-confectionery-dark-1366.png'),
      fullPage: false,
    });
    const darkAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(darkAxe.violations).toEqual([]);

    // Switch Atmosphere to Porcelain + Canvas Editor tab
    await page.getByRole('radio', {name: /Porcelain/i}).click();
    await page.getByRole('tab', {name: /Canvas Studio/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-porcelain-canvas-dark-1366.png'),
      fullPage: false,
    });

    // Switch back to Light + Portable AI Kit tab
    await page.getByRole('button', {name: /Light/i}).first().click();
    await page.getByRole('tab', {name: /Install & Portable AI Kit/i}).click();
    await page.waitForTimeout(250);
    await page.screenshot({
      path: path.join(shotDir, 'studio-portable-kit-light-1366.png'),
      fullPage: false,
    });

    expect(errors).toEqual([]);
  });

  test('renders cleanly on Mobile 375x812 over file:// without horizontal overflow', async ({
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
      path: path.join(shotDir, 'studio-mobile-light-375.png'),
      fullPage: false,
    });

    const mobileAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(mobileAxe.violations).toEqual([]);
  });
});
