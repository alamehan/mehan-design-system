import fs from 'node:fs';
import http from 'node:http';
import type {AddressInfo} from 'node:net';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(os.tmpdir(), 'mehan-playwright-shots');

test.describe('STUDIO.html v1.0 — Offline WOFF2 Fonts, Adaptive Catalog, UX Playbook & Theme Editor', () => {
  test('passes Desktop 1366x900 Light/Dark across real font switching, bounded Layout, rich Table, UX Playbook & Theme Editor with 0 errors and 0 axe contrast violations', async ({
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

    // 1. Overview (ID, Light) + Verify real bundled WOFF2 fonts actually loaded!
    await expect(page.getByText('Mehan Design System', {exact: true})).toBeVisible();
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
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Switch to English
    await page.getByText('EN', {exact: true}).click();
    await page.waitForTimeout(120);

    // Open Info & Creator Modal -> About & Creator tab -> verify Raihan Allaam & 0 WCAG AA contrast violations!
    await page.getByRole('button', {name: 'About & Guide'}).click();
    await page.getByRole('tab', {name: 'About & Creator'}).click();
    await expect(
      page.getByText('M. Raihan Rafiiful Allaam (@alamehan)'),
    ).toBeVisible();
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Verify calm 900px Overview column, 4x3 tactile theme strip (12 themes, >=5 real WOFF2 fonts),
    // SceneForge 2.5D diorama, and zero horizontal scrollbar in Quickstart CodeBlock!
    const overviewAudit = await page.evaluate(() => {
      const col = document.querySelector<HTMLElement>('.mh-overview-column');
      const diorama = document.querySelector<SVGSVGElement>('.mh-sf-diorama');
      const faviconHref =
        document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.getAttribute('href') ?? '';
      const tiles = Array.from(document.querySelectorAll('.mh-preset-tile'));
      const fonts = new Set(
        tiles.map(el => {
          const nameEl = el.querySelector('.mh-preset-tile-name');
          return nameEl
            ? getComputedStyle(nameEl).fontFamily.split(',')[0].replace(/"/g, '').trim()
            : '';
        }),
      );
      const scrollables = Array.from(
        document.querySelectorAll<HTMLElement>('.mh-quickstart-body pre, .mh-quickstart-body code'),
      );
      const maxHorizOverflow = Math.max(
        0,
        ...scrollables.map(el => el.scrollWidth - el.clientWidth),
      );
      return {
        colWidth: col ? Math.round(col.getBoundingClientRect().width) : 0,
        hasDiorama: Boolean(diorama),
        hasHero3dStage: Boolean(document.querySelector('.mh-hero-shot-frame')),
        orphanSideChipCount: document.querySelectorAll('.mh-distill-side-pill').length,
        capstonePillCount: document.querySelectorAll('.mh-distill-stack-pills span').length,
        faviconHref,
        count: tiles.length,
        fontCount: fonts.size,
        maxHorizOverflow,
      };
    });
    expect(overviewAudit.colWidth).toBe(900);
    expect(overviewAudit.hasDiorama).toBe(true);
    expect(overviewAudit.hasHero3dStage).toBe(true);
    expect(overviewAudit.orphanSideChipCount).toBe(0);
    expect(overviewAudit.capstonePillCount).toBe(5);
    expect(overviewAudit.faviconHref).toContain('data:image/svg+xml');
    expect(overviewAudit.faviconHref).not.toContain('%23d42a5f');
    expect(overviewAudit.count).toBe(12);
    expect(overviewAudit.fontCount).toBeGreaterThanOrEqual(5);
    expect(overviewAudit.maxHorizOverflow).toBeLessThanOrEqual(1);

    // 2. Components Catalog: Action -> verify cross-component height & font-size parity across Core + Mehan!
    await page.getByRole('tab', {name: 'Components'}).click();
    await expect(page.getByText(/^\d+ live specimens$/)).toBeVisible();
    await page.locator('.cat-nav-btn', {hasText: 'Action'}).click();
    await page.waitForTimeout(150);

    const actionParity = await page.evaluate(() => {
      const measure = (sel: string) => {
        const el = document.querySelector<HTMLElement>(sel);
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
          h: Math.round(el.getBoundingClientRect().height),
          fs: parseFloat(cs.fontSize),
          r: parseFloat(cs.borderTopLeftRadius),
        };
      };
      return {
        coreBtnMd: measure('[data-component="button"] .cat-specimen-stage .astryx-button:not([data-size="sm"]):not([data-size="lg"])'),
        coreBtnSm: measure('[data-component="button"] .cat-specimen-stage .astryx-button[data-size="sm"]'),
        splitMain: measure('[data-component="split-button"] .cat-specimen-stage .mehan-split-main'),
        iconBtn: measure('[data-component="icon-button"] .cat-specimen-stage .astryx-button'),
        segControl: measure('[data-component="segmented-control"] .cat-specimen-stage .astryx-segmented-control'),
        copyBtn: measure('[data-component="copy-button"] .cat-specimen-stage .mehan-copy-btn'),
        inlineConfirm: measure('[data-component="inline-confirm"] .cat-specimen-stage .mehan-ic-trigger'),
      };
    });
    expect(actionParity.coreBtnMd?.h).toBe(36);
    expect(actionParity.splitMain?.h).toBe(36);
    expect(actionParity.iconBtn?.h).toBe(36);
    expect(actionParity.segControl?.h).toBe(36);
    expect(actionParity.copyBtn?.h).toBe(36);
    expect(actionParity.inlineConfirm?.h).toBe(36);
    expect(actionParity.coreBtnMd?.fs).toBe(14);
    expect(actionParity.splitMain?.fs).toBe(14);
    expect(actionParity.copyBtn?.fs).toBe(14);
    expect(actionParity.inlineConfirm?.fs).toBe(14);
    expect(actionParity.coreBtnSm?.h).toBe(32);
    expect(actionParity.coreBtnSm?.fs).toBe(12.5);
    expect(actionParity.coreBtnMd?.r).toBe(10);
    expect(actionParity.splitMain?.r).toBe(10);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-catalog-action-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
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
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Check Table & List category: rich full-width production Table
    await page.locator('.cat-nav-btn', {hasText: 'Table & List'}).click();
    await page.waitForTimeout(150);
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-catalog-table-light-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Open "All categories" (renders all specimens across all 12 official categories simultaneously!)
    // and verify bounded card heights + 0 WCAG AA contrast violations + smart scroll-reset when switching category!
    await page.locator('.cat-nav-btn', {hasText: 'All categories'}).click();
    await page.waitForTimeout(150);
    const catalogAudit = await page.locator('.cat-specimen-card').evaluateAll(els => ({
      count: els.length,
      maxHeight: Math.max(0, ...els.map(el => el.getBoundingClientRect().height)),
    }));
    expect(catalogAudit.count).toBeGreaterThanOrEqual(115);
    expect(catalogAudit.maxHeight).toBeLessThan(560);
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Verify smart scroll-reset in Components sidebar AND topbar tab switch!
    await page.evaluate(() => window.scrollTo(0, 1800));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
    await page.locator('.cat-nav-btn', {hasText: 'Overlay'}).click();
    const afterCategoryScroll = await page.evaluate(() => ({
      scrollY: window.scrollY,
      headingTop:
        document
          .querySelector('.cat-category-section h3')
          ?.getBoundingClientRect().top ?? 999,
    }));
    expect(afterCategoryScroll.scrollY).toBeLessThan(320);
    expect(afterCategoryScroll.headingTop).toBeGreaterThanOrEqual(50);
    expect(afterCategoryScroll.headingTop).toBeLessThanOrEqual(160);

    // 3. Official Theme Showcase + Docked Chunked Theme Editor + Live Font Switching Proof!
    await page.getByRole('tab', {name: 'Patterns & Templates'}).click();
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
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    // Reset back to default Bricolage Grotesque + Figtree, then switch Preset to Espresso Berry in Dark Mode!
    await editor.getByRole('button', {name: 'Reset all to default'}).click();
    await page.waitForTimeout(120);
    await editor.getByRole('combobox', {name: 'Theme preset'}).click();
    await page.getByRole('option', {name: /Espresso Berry/}).click();
    await page.getByRole('button', {name: 'Dark mode'}).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-showcase-espresso-dark-1366.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
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
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
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

    // Sweep remaining UX & Copy chapters + verify UX sidebar smart scroll-reset + Templates tabs!
    await page.locator('.ux-sidebar .cat-nav-btn', {hasText: 'All Chapters'}).click();
    await page.evaluate(() => window.scrollTo(0, 1600));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(900);
    await page
      .locator('.ux-sidebar .cat-nav-btn', {hasText: 'Truncation & Numerals'})
      .click();
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(320);

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
    await page.getByRole('tab', {name: 'Patterns & Templates'}).click();
    for (const tplLabel of [
      'Workspace Topologies (5-in-1)',
      'SaaS Analytics Dashboard',
      'Governance & Settings',
      '3D Product Studio',
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
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    await page.getByRole('button', {name: 'Dark mode'}).click();
    await page.waitForTimeout(120);
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.getByRole('tab', {name: 'UX & Copy'}).click();
    await page.waitForTimeout(120);
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    expect(errors).toEqual([]);
  });

  test('renders cleanly on Mobile 375x812 across ALL 5 tabs & Live Bottom-Sheet Theme Editor without card clipping, truncated switchers, or contrast violations', async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({width: 375, height: 812});
    await page.goto(studioFileUrl, {waitUntil: 'load'});
    await expect(page.getByText('Mehan Design System', {exact: true})).toBeVisible();

    // 1. Verify compact 2-row Mobile Topbar (<= 104px instead of 3-row 161px!)
    const topbarHeight = await page
      .locator('.studio-topbar')
      .evaluate(el => Math.round(el.getBoundingClientRect().height));
    expect(topbarHeight).toBeLessThanOrEqual(104);

    // 2. Tap mobile "Tema" / "Theme" button and verify 3-Detent Draggable Live Bottom-Sheet (default 66% -> drag up 92% -> drag down 38% -> swipe close)!
    await page
      .locator('.studio-actions-mobile')
      .getByRole('button', {name: /^(Tema|Theme)$/})
      .click();
    const editorSheet = page.getByRole('complementary', {
      name: /Editor Tema Langsung|Live Theme Editor/,
    });
    await expect(editorSheet).toBeVisible();
    await expect(editorSheet).toHaveAttribute('data-detent', 'default');
    const sheetRect = await editorSheet.evaluate(el => {
      const r = el.getBoundingClientRect();
      return {top: Math.round(r.top), bottom: Math.round(r.bottom), vh: window.innerHeight};
    });
    expect(sheetRect.top).toBeGreaterThanOrEqual(220);
    expect(sheetRect.top).toBeLessThan(340);
    expect(sheetRect.bottom).toBeLessThanOrEqual(sheetRect.vh + 2);

    // Drag grab handle UP -> snaps to expanded (~92dvh)!
    const grabZone = page.locator('.te-sheet-grab-zone');
    const grabBox1 = await grabZone.boundingBox();
    expect(grabBox1).not.toBeNull();
    await page.mouse.move(grabBox1!.x + grabBox1!.width / 2, grabBox1!.y + grabBox1!.height / 2);
    await page.mouse.down();
    await page.mouse.move(grabBox1!.x + grabBox1!.width / 2, 70, {steps: 6});
    await page.mouse.up();
    await expect(editorSheet).toHaveAttribute('data-detent', 'expanded');
    await page.waitForTimeout(260);
    const expandedTop = await editorSheet.evaluate(el => Math.round(el.getBoundingClientRect().top));
    expect(expandedTop).toBeLessThanOrEqual(95);

    // Drag grab handle DOWN -> snaps to compact (~38dvh, leaving live page interactive above)!
    const grabBox2 = await grabZone.boundingBox();
    await page.mouse.move(grabBox2!.x + grabBox2!.width / 2, grabBox2!.y + grabBox2!.height / 2);
    await page.mouse.down();
    await page.mouse.move(grabBox2!.x + grabBox2!.width / 2, 520, {steps: 6});
    await page.mouse.up();
    await expect(editorSheet).toHaveAttribute('data-detent', 'compact');
    await page.waitForTimeout(260);
    const compactTop = await editorSheet.evaluate(el => Math.round(el.getBoundingClientRect().top));
    expect(compactTop).toBeGreaterThanOrEqual(460);

    // Pull grab handle all the way down (< 22dvh) -> dismisses sheet cleanly!
    const grabBox3 = await grabZone.boundingBox();
    await page.mouse.move(grabBox3!.x + grabBox3!.width / 2, grabBox3!.y + grabBox3!.height / 2);
    await page.mouse.down();
    await page.mouse.move(grabBox3!.x + grabBox3!.width / 2, 740, {steps: 6});
    await page.mouse.up();
    await expect(editorSheet).toBeHidden();

    // Open top-right 3-dot overflow menu and verify it anchors directly below the trigger (never at the bottom of the screen on iOS/WebKit!)
    await page
      .locator('.studio-actions-mobile')
      .getByRole('button', {name: /Opsi Studio lainnya|More Studio options/})
      .click();
    const mobileMenu = page.locator('.studio-mobile-menu-popover[role="menu"]');
    await expect(mobileMenu).toBeVisible();
    const menuRect = await mobileMenu.evaluate(el => {
      const r = el.getBoundingClientRect();
      return {top: Math.round(r.top), right: Math.round(r.right)};
    });
    expect(menuRect.top).toBeGreaterThanOrEqual(36);
    expect(menuRect.top).toBeLessThanOrEqual(115);
    expect(menuRect.right).toBeGreaterThanOrEqual(310);

    await page.getByRole('menuitem', {name: /Switch to English/}).click();
    await page.waitForTimeout(120);

    // Helper that asserts ZERO clipped cards/headings, ZERO overflowing SegmentedControl boxes, and ZERO truncated radios
    const assertMobileTabClean = async (tabLabel: string) => {
      const metrics = await page.evaluate(() => {
        const vw = window.innerWidth;
        const docOverflow = document.documentElement.scrollWidth - vw;
        const clippedCards: string[] = [];
        const targets = document.querySelectorAll<HTMLElement>(
          '.studio-main > *, .cat-specimen-card, .astryx-card, h1, h2, h3',
        );
        for (const el of targets) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          let p = el.parentElement;
          let insideScroll = false;
          while (p && p !== document.body) {
            const ox = getComputedStyle(p).overflowX;
            if ((ox === 'auto' || ox === 'scroll') && p.scrollWidth > p.clientWidth + 1) {
              insideScroll = true;
              break;
            }
            p = p.parentElement;
          }
          if (!insideScroll && (r.right > vw + 1.5 || r.left < -1.5)) {
            clippedCards.push(
              `${el.tagName.toLowerCase()} (${Math.round(r.left)}..${Math.round(r.right)}): ${(el.textContent ?? '').trim().slice(0, 32)}`,
            );
          }
        }

        const truncatedRadios: string[] = [];
        const overflowingSegBoxes: string[] = [];
        for (const seg of document.querySelectorAll<HTMLElement>('[role="radiogroup"]')) {
          if (seg.classList.contains('mh-preset-strip')) continue;
          const sr = seg.getBoundingClientRect();
          const pr = seg.parentElement?.getBoundingClientRect();
          if (sr.width > 0 && pr && (sr.width > pr.width + 2 || sr.right > vw + 1.5)) {
            overflowingSegBoxes.push(
              `${seg.getAttribute('aria-label') ?? 'seg'} (${Math.round(sr.width)} > ${Math.round(pr.width)})`,
            );
          }
          for (const item of seg.querySelectorAll<HTMLElement>('[role="radio"]')) {
            const span = item.querySelector<HTMLElement>('span') ?? item;
            if (span.scrollWidth > span.clientWidth + 2) {
              truncatedRadios.push((item.textContent ?? '').trim());
            }
          }
        }
        return {docOverflow, clippedCards, truncatedRadios, overflowingSegBoxes};
      });

      expect(metrics.docOverflow, `${tabLabel}: docOverflow`).toBeLessThanOrEqual(1);
      expect(metrics.clippedCards, `${tabLabel}: clippedCards`).toEqual([]);
      expect(metrics.overflowingSegBoxes, `${tabLabel}: overflowingSegBoxes`).toEqual([]);
      expect(metrics.truncatedRadios, `${tabLabel}: truncatedRadios`).toEqual([]);
    };

    // 3. Audit all 5 main Studio tabs on 375x812 Mobile!
    await assertMobileTabClean('Overview');
    await page.screenshot({
      path: path.join(shotDir, 'studio-v3-mobile-en-light-375.png'),
      fullPage: false,
    });
    expect(
      (
        await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze()
      ).violations,
    ).toEqual([]);

    await page.locator('.studio-topbar').getByRole('tab', {name: 'Components'}).click();
    await page.waitForTimeout(120);
    await assertMobileTabClean('Components');

    await page
      .locator('.studio-topbar')
      .getByRole('tab', {name: 'Patterns & Templates'})
      .click();
    await page.waitForTimeout(120);
    await assertMobileTabClean('Patterns & Templates (Showcase)');
    await page.getByRole('radio', {name: 'Workspace Topologies (5-in-1)'}).click();
    await page.waitForTimeout(120);
    await assertMobileTabClean('Patterns & Templates (Workspace Topologies)');

    await page.locator('.studio-topbar').getByRole('tab', {name: 'UX & Copy'}).click();
    await page.waitForTimeout(120);
    await page.locator('.ux-sidebar .cat-nav-btn', {hasText: 'All Chapters'}).click();
    await page.waitForTimeout(150);
    await assertMobileTabClean('UX & Copy (All 12 Chapters)');

    await page.locator('.studio-topbar').getByRole('tab', {name: 'Maintain'}).click();
    await page.waitForTimeout(120);
    await assertMobileTabClean('Maintain');
  });

  test('executes single-HTML Real-Engine prototype (<script type="text/tsx"> + /cdn/mehan-runtime.{css,js}) across live filtering, Drawer approval, Dialog creation, Dark mode, Mobile & WCAG 2.2 AA', async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const distRoot = path.join(repoRoot, 'apps/studio/dist');
    const rawPrototypeHtml = fs.readFileSync(
      path.join(repoRoot, 'release/mehan-astryx-cdn.html'),
      'utf8',
    );

    const mimeTypes: Record<string, string> = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.woff2': 'font/woff2',
      '.svg': 'image/svg+xml',
    };

    let baseUrl = '';
    const server = http.createServer((req, res) => {
      const reqPath = (req.url ?? '/').split('?')[0];
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (reqPath === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
      }
      if (reqPath === '/prototype.html') {
        const localHtml = rawPrototypeHtml.replace(
          /https:\/\/[^"'\s]+\/cdn/g,
          `${baseUrl}/cdn`,
        );
        res.writeHead(200, {'Content-Type': mimeTypes['.html']});
        res.end(localHtml);
        return;
      }
      const safeRel = path.normalize(reqPath).replace(/^(\.\.[/\\])+/, '');
      const filePath = path.join(distRoot, safeRel);
      if (!filePath.startsWith(distRoot) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
      });
      res.end(fs.readFileSync(filePath));
    });

    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', () => resolve()));
    const {port} = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${port}`;

    try {
      await page.setViewportSize({width: 1366, height: 900});
      await page.goto(`${baseUrl}/prototype.html`, {waitUntil: 'networkidle'});

      await expect(page.getByRole('heading', {name: 'Portfolio Governance'})).toBeVisible();
      await expect(page.getByRole('heading', {name: 'Cumulative velocity index'})).toBeVisible();

      const fontsCheck = await page.evaluate(async () => {
        await document.fonts.ready;
        return {
          bricolage: document.fonts.check('600 18px "Bricolage Grotesque"'),
          figtree: document.fonts.check('400 14px "Figtree"'),
          chartSvgs: document.querySelectorAll('svg').length,
        };
      });
      expect(fontsCheck.bricolage).toBe(true);
      expect(fontsCheck.figtree).toBe(true);
      expect(fontsCheck.chartSvgs).toBeGreaterThan(2);

      await page.screenshot({
        path: path.join(shotDir, 'prototype-real-engine-light-1366.png'),
        fullPage: false,
      });
      expect(
        (
          await new AxeBuilder({page})
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([]);

      // Live status filter via real Astryx SegmentedControl
      await page.getByRole('radio', {name: 'In review'}).click();
      await expect(page.getByRole('table', {name: 'Strategic initiatives'}).locator('tbody tr')).toHaveCount(2);
      await page.getByRole('radio', {name: 'All'}).click();
      await expect(page.getByRole('table', {name: 'Strategic initiatives'}).locator('tbody tr')).toHaveCount(5);

      // Open real Astryx Drawer on first row & approve initiative -> updates metrics + fires Toast
      await page.getByRole('button', {name: 'Review'}).first().click();
      await expect(page.getByRole('button', {name: 'Approve initiative'})).toBeVisible();
      await page.screenshot({
        path: path.join(shotDir, 'prototype-real-engine-drawer-1366.png'),
        fullPage: false,
      });
      await page.getByRole('button', {name: 'Approve initiative'}).click();
      await expect(page.getByText(/Approved INIT-/).first()).toBeVisible();
      await page.getByRole('button', {name: 'Close', exact: true}).first().click();
      await expect(page.getByRole('button', {name: 'Approve initiative'})).toBeHidden();

      // Create a new initiative via real Astryx Dialog
      await page.getByRole('button', {name: 'New initiative'}).click();
      await page.getByRole('textbox', {name: 'Initiative title'}).fill('Regional Edge Cache Rollout');
      await page.getByRole('textbox', {name: 'Executive sponsor'}).fill('Nadia Kusuma');
      await page.getByRole('button', {name: 'Add initiative'}).click();
      await expect(page.getByText('Regional Edge Cache Rollout')).toBeVisible();

      // Switch to Dark mode & verify WCAG 2.2 AA contrast
      await page.getByRole('button', {name: 'Switch to dark mode'}).click();
      await page.waitForTimeout(150);
      await page.screenshot({
        path: path.join(shotDir, 'prototype-real-engine-dark-1366.png'),
        fullPage: false,
      });
      expect(
        (
          await new AxeBuilder({page})
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([]);

      // Verify clean Mobile 375x812 responsiveness
      await page.setViewportSize({width: 375, height: 812});
      await page.waitForTimeout(120);
      const mobileOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(mobileOverflow).toBeLessThanOrEqual(1);
      await page.screenshot({
        path: path.join(shotDir, 'prototype-real-engine-mobile-375.png'),
        fullPage: false,
      });

      expect(errors).toEqual([]);
    } finally {
      server.closeAllConnections?.();
      await new Promise<void>(resolve => server.close(() => resolve()));
    }
  });
});
