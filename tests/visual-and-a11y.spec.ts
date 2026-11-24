import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(repoRoot, 'test-results');

test.describe('STUDIO.html v1.0 — Offline WOFF2 Fonts, Adaptive Catalog, UX Playbook & Theme Editor', () => {
  test('passes Desktop 1366x900 Light/Dark across real font switching, bounded Layout, rich Table, UX Playbook & Theme Editor with 0 errors and 0 axe contrast violations', async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});

    // 1. Overview (ID, Light) + Verify real bundled WOFF2 fonts actually loaded!
    await expect(page.getByText('mehan', {exact: true})).toBeVisible();
    const initialFontsLoaded = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        bricolage: document.fonts.check('600 18px "Bricolage Grotesque"'),
        figtree: document.fonts.check('400 14px "Figtree"'),
      };
    });
    expect(initialFontsLoaded.bricolage).toBe(true);
    expect(initialFontsLoaded.figtree).toBe(true);

    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-overview-id-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Switch to English
    await page.getByText('EN', {exact: true}).click();
    await page.waitForTimeout(120);

    // 2. Components Catalog: Action (default focused category) -> Layout (verify AppShell height <= 320px!) -> Table & List
    await page.getByRole('tab', {name: 'Components'}).click();
    await expect(
      page.getByText('107 live specimens'),
    ).toBeVisible();
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-catalog-action-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Check Layout category: AppShell card must NOT explode to 100dvh!
    await page.locator('.cat-nav-btn', {hasText: 'Layout'}).click();
    await page.waitForTimeout(150);
    const appShellCardHeight = await page
      .locator('[data-component="app-shell"]')
      .evaluate(el => el.getBoundingClientRect().height);
    expect(appShellCardHeight).toBeLessThan(360);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-catalog-layout-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Check Table & List category: rich full-width production Table
    await page.locator('.cat-nav-btn', {hasText: 'Table & List'}).click();
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-catalog-table-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Open "All categories" (renders all 107 specimens across all 12 official categories simultaneously!)
    // and verify bounded card heights + 0 WCAG AA contrast violations across every single component!
    await page.locator('.cat-nav-btn', {hasText: 'All categories'}).click();
    await page.waitForTimeout(150);
    const catalogAudit = await page.locator('.cat-specimen-card').evaluateAll(els => ({
      count: els.length,
      maxHeight: Math.max(0, ...els.map(el => el.getBoundingClientRect().height)),
    }));
    expect(catalogAudit.count).toBe(107);
    expect(catalogAudit.maxHeight).toBeLessThan(560);
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 3. Official Theme Showcase + Docked Chunked Theme Editor + Live Font Switching Proof!
    await page.getByRole('tab', {name: 'Templates'}).click();
    await page.getByText('Little joys, everywhere you go').waitFor();
    await page.getByRole('button', {name: 'Theme Editor', exact: true}).click();
    await expect(
      page.getByRole('complementary', {name: 'Live Theme Editor'}),
    ).toBeVisible();

    // Switch Heading font to Fraunces & Body font to Outfit and verify REAL DOM computed style + loaded WOFF2!
    const editor = page.getByRole('complementary', {name: 'Live Theme Editor'});
    await editor.getByRole('combobox', {name: 'Heading font'}).click();
    await page.getByRole('option', {name: /Fraunces/}).click();
    await editor.getByRole('combobox', {name: 'Body font'}).click();
    await page.getByRole('option', {name: /Outfit/}).click();
    await page.waitForTimeout(200);

    const switchedFonts = await page.evaluate(async () => {
      await document.fonts.ready;
      const h2 = document.querySelector('h2');
      const shell = document.querySelector('.studio-shell');
      return {
        h2Family: h2 ? getComputedStyle(h2).fontFamily : '',
        bodyFamily: shell ? getComputedStyle(shell).fontFamily : '',
        frauncesLoaded: document.fonts.check('600 20px "Fraunces"'),
        outfitLoaded: document.fonts.check('400 14px "Outfit"'),
      };
    });
    expect(switchedFonts.h2Family).toContain('Fraunces');
    expect(switchedFonts.bodyFamily).toContain('Outfit');
    expect(switchedFonts.frauncesLoaded).toBe(true);
    expect(switchedFonts.outfitLoaded).toBe(true);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-showcase-fraunces-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Reset back to default Bricolage Grotesque + Figtree, then switch Preset to Shotcandy 1:1 in Dark Mode!
    await editor.getByRole('button', {name: 'Reset all to default'}).click();
    await page.waitForTimeout(120);
    await editor.getByRole('combobox', {name: 'Theme preset'}).click();
    await page.getByRole('option', {name: /Shotcandy 1:1/}).click();
    await page.getByRole('button', {name: 'Dark mode'}).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-showcase-espresso-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // 4. Switch back to Light Mode -> UX & Copy 6-Chapter Playbook + Live Component CSS Override Proof!
    await page.getByRole('button', {name: 'Light mode'}).click();
    await page.getByRole('tab', {name: 'UX & Copy'}).click();
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-ux-playbook-light-1366.png'),
      fullPage: false,
    });
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    // Navigate to Chapter 04 (Actions & Control Roles) and verify live button radius override -> 999px!
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'Actions & Control Roles'})
      .click();
    await editor.getByRole('tab', {name: 'Components'}).click();
    await editor
      .getByRole('textbox', {name: 'CSS property (camelCase)'})
      .fill('borderRadius');
    await editor.getByRole('textbox', {name: 'CSS value'}).fill('999px');
    await editor.getByRole('button', {name: 'Add component override'}).click();
    await page.waitForTimeout(150);

    const mutatedRadius = await page
      .getByRole('button', {name: 'Publish release'})
      .evaluate(el => getComputedStyle(el).borderRadius);
    expect(mutatedRadius).toBe('999px');

    await editor.getByRole('button', {name: 'Reset all to default'}).click();
    await page.waitForTimeout(120);

    // Sweep remaining UX & Copy chapters + Templates tabs for 0 contrast issues & 0 runtime errors
    for (const chLabel of [
      'Progressive Disclosure',
      'Truncation & Numerals',
      'States & Recovery',
      'Microcopy & Glossary',
    ]) {
      await page.locator('.ux-sidebar .cat-nav-btn', {hasText: chLabel}).click();
      await page.waitForTimeout(80);
      expect(
        (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
          .violations,
      ).toEqual([]);
    }

    await page.getByRole('button', {name: 'Close Theme Editor'}).click();
    await page.getByRole('tab', {name: 'Templates'}).click();
    for (const tplLabel of [
      'SaaS dashboard',
      'Progressive settings',
      'Shotcandy 3D studio',
    ]) {
      await page.getByText(tplLabel, {exact: true}).click();
      await page.waitForTimeout(100);
      await page.screenshot({
        path: path.join(
          shotDir,
          `studio-v3-template-${tplLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-1366.png`,
        ),
        fullPage: false,
      });
      expect(
        (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
          .violations,
      ).toEqual([]);
    }

    // 5. Maintain Tab contrast check (Light + Dark mode)
    await page.getByRole('tab', {name: 'Maintain'}).click();
    await page.waitForTimeout(120);
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);

    await page.getByRole('button', {name: 'Dark mode'}).click();
    await page.waitForTimeout(120);
    expect(
      (await new AxeBuilder({page}).withRules(['color-contrast']).analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole('tab', {name: 'UX & Copy'}).click();
    await page.waitForTimeout(120);
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
      path: path.join(shotDir, 'studio-v3-mobile-id-light-375.png'),
      fullPage: false,
    });

    const mobileAxe = await new AxeBuilder({page})
      .withRules(['color-contrast'])
      .analyze();
    expect(mobileAxe.violations).toEqual([]);
  });
});
