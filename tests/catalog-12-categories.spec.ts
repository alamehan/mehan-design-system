import path from 'node:path';
import {pathToFileURL} from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import {expect, type Page, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(repoRoot, 'test-results');

const OFFICIAL_CATEGORIES = [
  'Layout',
  'Navigation',
  'Container',
  'Action',
  'Form Controls',
  'Content',
  'Table & List',
  'Data Visualization',
  'Feedback & Status',
  'Overlay',
  'Chat',
  'Utility',
] as const;

async function assertMehanDomFit(page: Page, contextLabel: string) {
  const issues = await page.evaluate(ctx => {
    const problems: string[] = [];
    const docOverflow = document.documentElement.scrollWidth - window.innerWidth;
    if (docOverflow > 2) {
      problems.push(`${ctx}: document horizontal overflow +${docOverflow}px`);
    }

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.cat-specimen-card'),
    );
    for (const card of cards) {
      const id = card.getAttribute('data-component') ?? 'unknown';
      const rect = card.getBoundingClientRect();
      if (rect.height > 560) {
        problems.push(`${ctx} [${id}]: excessive card height ${Math.round(rect.height)}px`);
      }
      if (card.scrollWidth > card.clientWidth + 2) {
        problems.push(
          `${ctx} [${id}]: horizontal card overflow (${card.scrollWidth} > ${card.clientWidth})`,
        );
      }
    }

    // Check visible data table cells (excluding screen-reader-only companion tables)
    const cells = Array.from(document.querySelectorAll<HTMLElement>('th, td'));
    for (const cell of cells) {
      if (cell.closest('.mehan-sr-only')) continue;
      const cs = getComputedStyle(cell);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rect = cell.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const hasCheckboxOnly =
        Boolean(cell.querySelector('input[type="checkbox"]')) &&
        (cell.textContent ?? '').trim().length === 0;
      const minW = hasCheckboxOnly ? 28 : 44;
      if (rect.width < minW) {
        problems.push(
          `${ctx}: squished table cell "${(cell.textContent ?? '').trim().slice(0, 20)}" width=${Math.round(rect.width)}px`,
        );
      }
    }

    // Check single-line chrome controls (buttons & tabs) never silently clip text without intentional ellipsis
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.cat-specimen-stage button, .cat-specimen-stage [role="tab"]',
      ),
    );
    for (const ctrl of controls) {
      if (ctrl.closest('.mehan-sr-only')) continue;
      const cs = getComputedStyle(ctrl);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const rect = ctrl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (
        ctrl.scrollWidth > ctrl.clientWidth + 4 &&
        cs.textOverflow !== 'ellipsis' &&
        cs.overflowX === 'hidden'
      ) {
        problems.push(
          `${ctx}: clipped control "${(ctrl.textContent ?? ctrl.getAttribute('aria-label') ?? '').trim().slice(0, 28)}" (${ctrl.scrollWidth} > ${ctrl.clientWidth})`,
        );
      }
    }

    return problems;
  }, contextLabel);

  expect(issues).toEqual([]);
}

test.describe('Stage 3 — Exhaustive 12-Category Catalog Audit (Light & Dark, DOM Fit, WCAG 2.2 AA & Keyboard Focus Rings)', () => {
  test('audits all 12 official categories one-by-one in Light & Dark modes + verifies keyboard Tab focus-ring visibility', async ({
    page,
  }) => {
    test.setTimeout(240_000);
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

    // 1. Audit all 12 categories in Light mode AND Dark mode (24 category passes!)
    let totalCountLight = 0;
    for (const mode of ['light', 'dark'] as const) {
      if (mode === 'dark') {
        await page.getByRole('button', {name: 'Dark mode'}).click();
        await page.waitForTimeout(120);
      }

      for (const cat of OFFICIAL_CATEGORIES) {
        await page
          .locator('.cat-sidebar .cat-nav-btn')
          .filter({hasText: new RegExp(`^${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\d+$`)})
          .click();
        await page.waitForTimeout(80);

        const count = await page.locator('.cat-specimen-card').count();
        expect(count, `Category ${cat} (${mode}) must have specimens`).toBeGreaterThan(0);
        if (mode === 'light') totalCountLight += count;

        await assertMehanDomFit(page, `${cat} (${mode})`);

        const axe = await new AxeBuilder({page})
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        expect(axe.violations, `WCAG 2.2 AA violations in ${cat} (${mode})`).toEqual([]);

        if (mode === 'light' && (cat === 'Navigation' || cat === 'Overlay')) {
          await page.screenshot({
            path: path.join(
              shotDir,
              `stage3-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-light-1366.png`,
            ),
            fullPage: false,
          });
        }
        if (mode === 'dark' && (cat === 'Chat' || cat === 'Form Controls')) {
          await page.screenshot({
            path: path.join(
              shotDir,
              `stage3-cat-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-dark-1366.png`,
            ),
            fullPage: false,
          });
        }
      }
    }

    expect(totalCountLight).toBe(142);

    // Switch back to Light mode for Keyboard Tab Focus-Ring Reachability Sweep
    await page.getByRole('button', {name: 'Light mode'}).click();
    await page.waitForTimeout(100);

    // 2. Keyboard Tab Focus-Ring Audit across Action & Form Controls (ringless === 0)
    for (const cat of ['Action', 'Form Controls'] as const) {
      await page
        .locator('.cat-sidebar .cat-nav-btn')
        .filter({hasText: new RegExp(`^${cat}\\d+$`)})
        .click();
      await page.waitForTimeout(80);

      const firstCard = page.locator('.cat-specimen-card').first();
      await firstCard.locator('button, input, [tabindex="0"]').first().focus();
      // Press Tab first so Chromium activates keyboard :focus-visible modality
      await page.keyboard.press('Tab');

      const ringless: string[] = [];
      for (let step = 0; step < 18; step += 1) {
        const check = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body || el === document.documentElement) {
            return {ok: true, desc: 'body'};
          }
          // Walk up to 4 levels to catch composite input wrappers using :focus-within
          let cur: HTMLElement | null = el;
          for (let depth = 0; depth < 4 && cur; depth += 1) {
            const cs = getComputedStyle(cur);
            const hasOutline =
              cs.outlineStyle !== 'none' &&
              parseFloat(cs.outlineWidth || '0') >= 1 &&
              cs.outlineColor !== 'rgba(0, 0, 0, 0)' &&
              cs.outlineColor !== 'transparent';
            const hasShadow = cs.boxShadow && cs.boxShadow !== 'none';
            if (hasOutline || hasShadow) {
              return {ok: true, desc: el.tagName};
            }
            cur = cur.parentElement;
          }
          return {
            ok: false,
            desc: `${el.tagName.toLowerCase()}[${el.getAttribute('aria-label') ?? (el.textContent ?? '').trim().slice(0, 24)}]`,
          };
        });
        if (!check.ok) ringless.push(`${cat}: ${check.desc}`);
        await page.keyboard.press('Tab');
      }
      expect(ringless).toEqual([]);
    }

    expect(errors).toEqual([]);
  });
});
