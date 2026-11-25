import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(repoRoot, 'test-results');

test.describe('Mehan Workspaces, DataChart, ColumnSettings, ColumnView, PropertyRow & ShortcutSheet E2E', () => {
  test('verifies global ? ShortcutSheet, / search shortcut, WorkspaceLayout + CanvasStage, PropertyRow reset, ColumnSettingsMenu, ColumnView 2D keys, DataChart, 5-in-1 Topologies & 200% zoom height release', async ({
    page,
  }) => {
    test.setTimeout(180_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({width: 1366, height: 900});
    await page.goto(studioFileUrl, {waitUntil: 'load'});

    // Switch to English
    await page
      .locator('.studio-topbar')
      .getByRole('radio', {name: 'EN'})
      .click();

    // 1. Global `?` ShortcutSheet + Escape dismiss
    await page.keyboard.press('?');
    await expect(page.getByText('Studio keyboard shortcuts')).toBeVisible();
    await expect(page.getByText('Focus component catalog search')).toBeVisible();
    await page.waitForTimeout(220);
    await page.screenshot({
      path: path.join(shotDir, 'final-shortcut-sheet-modal-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByText('Studio keyboard shortcuts')).toBeHidden();

    // 2. Global `/` shortcut jumps directly to Components & focuses catalog search!
    await page.keyboard.press('/');
    const searchBox = page.getByRole('textbox', {name: 'Search components'});
    await expect(searchBox).toBeFocused();
    // Clear focus out of search input
    await page.keyboard.press('Escape');
    await page.locator('h2').first().click();

    // 3. Layout category (default first pillar): WorkspaceLayout, CanvasStage, PropertyRow
    const wsCard = page.locator('[data-component="workspace-layout"]');
    await expect(wsCard).toBeVisible();
    await wsCard.getByRole('button', {name: 'Billing Sync'}).click();
    await expect(wsCard.getByText('Selected: Billing Sync')).toBeVisible();

    const prCard = page.locator('[data-component="property-row"]');
    await prCard.scrollIntoViewIfNeeded();
    await prCard.getByRole('radio', {name: 'Multiply'}).click();
    const resetBlendBtn = prCard.getByRole('button', {
      name: 'Reset Blend mode to default',
    });
    await expect(resetBlendBtn).toBeVisible();
    await resetBlendBtn.click();
    await expect(resetBlendBtn).toHaveCount(0);

    // 4. Table & List: ColumnSettingsMenu + ColumnView 2D keyboard navigation
    await page.locator('.cat-sidebar .cat-nav-btn', {hasText: 'Table & List'}).click();
    const csmCard = page.locator('[data-component="column-settings-menu"]');
    await csmCard.scrollIntoViewIfNeeded();
    await csmCard.getByRole('button', {name: 'Columns (4/4)'}).click();
    await page.getByRole('checkbox', {name: 'Region'}).click({force: true});
    await expect(csmCard.getByRole('button', {name: 'Columns (3/4)'})).toBeVisible();
    await page.keyboard.press('Escape');

    const cvCard = page.locator('[data-component="column-view"]');
    await cvCard.scrollIntoViewIfNeeded();
    const firstRootOption = cvCard.getByRole('option', {name: /packages/});
    await firstRootOption.focus();
    await page.keyboard.press('ArrowDown');
    await expect(cvCard.getByRole('option', {name: /docs/})).toHaveAttribute(
      'aria-selected',
      'true',
    );

    // 5. Data Visualization: DataChart geometry switch + companion SR table
    await page
      .locator('.cat-sidebar .cat-nav-btn', {hasText: 'Data Visualization'})
      .click();
    const dcCard = page.locator('[data-component="data-chart"]');
    await dcCard.scrollIntoViewIfNeeded();
    expect(await dcCard.locator('table.mehan-sr-only tbody tr').count()).toBe(6);
    await dcCard.getByRole('radio', {name: 'H-Bar'}).click();
    await expect(dcCard.locator('.mehan-dc-hbar-row')).toHaveCount(6);
    // Allow SegmentedControl's 175ms sliding ::before lens to finish settling before screenshot
    await page.waitForTimeout(260);
    await page.screenshot({
      path: path.join(shotDir, 'final-catalog-dataviz-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // 6. Patterns & Templates: 5-in-1 Workspace Topologies switcher + zero-clipping geometry lock
    await page.getByRole('tab', {name: 'Patterns & Templates'}).click();
    await page.getByRole('radio', {name: 'Workspace Topologies (5-in-1)'}).click();
    for (const modeLabel of [
      'Form + Result',
      '2-Pane Workbench',
      'Collection + Inspector',
      'Canvas Studio',
      '3-Pane Explorer',
    ]) {
      await page.getByRole('radio', {name: modeLabel}).click();
      await page.waitForTimeout(80);
      const clipIssues = await page.evaluate(mode => {
        const ws = document.querySelector<HTMLElement>('.mehan-workspace-layout');
        if (!ws) return [`${mode}: missing .mehan-workspace-layout`];
        const wsBox = ws.getBoundingClientRect();
        const problems: string[] = [];
        const targets = ws.querySelectorAll<HTMLElement>(
          '.mehan-ws-toolbar, .mehan-ws-pane-header, .mehan-ws-pane-body, .mehan-ws-main-wrap',
        );
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.left < wsBox.left - 1 || r.right > wsBox.right + 1) {
            problems.push(
              `${mode}: ${el.className} horizontally clipped (${Math.round(r.left)}..${Math.round(r.right)} vs ${Math.round(wsBox.left)}..${Math.round(wsBox.right)})`,
            );
          }
        }
        return problems;
      }, modeLabel);
      expect(clipIssues).toEqual([]);
    }
    await page.waitForTimeout(260);
    await page.screenshot({
      path: path.join(shotDir, 'final-workspace-topologies-5in1-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // 7. Law U2 200% Zoom Compact Height (1366x500 <= 559px) — verify .te-docked-panel releases sticky lock!
    await page.getByRole('button', {name: 'Theme Editor', exact: true}).click();
    await page.setViewportSize({width: 1366, height: 500});
    await page.waitForTimeout(100);
    const panelPosition = await page
      .locator('.te-docked-panel')
      .evaluate(el => getComputedStyle(el).position);
    expect(panelPosition).toBe('relative');

    expect(errors).toEqual([]);
  });
});
