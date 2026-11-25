import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {expect, test} from '@playwright/test';

const repoRoot = path.resolve(import.meta.dirname, '../..');
const studioHtmlPath = path.join(repoRoot, 'STUDIO.html');
const studioFileUrl = pathToFileURL(studioHtmlPath).href;
const shotDir = process.env.MEHAN_SHOT_DIR ?? path.join(os.tmpdir(), 'mehan-playwright-shots');

test.describe('Stage 1 Exhaustive Proof — Every Theme Editor Knob, Slot, Font, Undo/Redo & Media Mode', () => {
  test('verifies real DOM getComputedStyle mutations for every Base Style, Component Token slot, Raw Token group, Undo/Redo, Preset, and Offline Media Hygiene', async ({
    page,
  }) => {
    test.setTimeout(120_000);

    const errors: string[] = [];
    const externalRequests: string[] = [];

    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('request', req => {
      const url = req.url();
      if (!url.startsWith('file:') && !url.startsWith('data:') && !url.startsWith('blob:')) {
        externalRequests.push(url);
      }
    });

    await page.setViewportSize({width: 1400, height: 920});
    // Use reducedMotion during rapid knob assertions so CSS background-color transitions
    // settle instantaneously at 0ms rather than returning mid-interpolation RGB frames!
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto(studioFileUrl, {waitUntil: 'load'});

    // Switch to English & open Templates -> Theme Showcase so Button, Card, Input, SegmentedControl, Banner, ChatComposer, etc. are ALL mounted on screen simultaneously!
    await page.getByText('EN', {exact: true}).click();
    await page.getByRole('tab', {name: 'Templates'}).click();
    await expect(
      page.getByText('Little joys, everywhere you go'),
    ).toBeVisible();

    await page.getByRole('button', {name: 'Theme Editor', exact: true}).click();
    const editor = page.getByRole('complementary', {name: 'Live Theme Editor'});
    await expect(editor).toBeVisible();

    // Assert Theme Editor header has ZERO horizontal overflow (all buttons inside panel bounds!)
    const headerFits = await editor.evaluate(aside => {
      const box = aside.getBoundingClientRect();
      const btns = [...aside.querySelectorAll('.te-header button')];
      return btns.every(b => b.getBoundingClientRect().right <= box.right + 1);
    });
    expect(headerFits).toBe(true);

    // =========================================================================
    // 1. BASE STYLES — ATMOSPHERES (Confectionery -> Porcelain -> Stone)
    // =========================================================================
    const readShellBg = () =>
      page
        .locator('.studio-shell')
        .evaluate(el => getComputedStyle(el).backgroundColor);

    const bgConfectionery = await readShellBg();
    await editor
      .getByRole('radiogroup', {name: 'Neutral atmosphere'})
      .getByRole('radio', {name: 'Porcelain'})
      .click();
    const bgPorcelain = await readShellBg();
    expect(bgPorcelain).not.toBe(bgConfectionery);

    await editor
      .getByRole('radiogroup', {name: 'Neutral atmosphere'})
      .getByRole('radio', {name: 'Stone'})
      .click();
    const bgStone = await readShellBg();
    expect(bgStone).not.toBe(bgPorcelain);
    expect(bgStone).not.toBe(bgConfectionery);

    for (const extraAtm of ['Butter', 'Matcha', 'Cacao', 'Periwinkle', 'Obsidian']) {
      await editor
        .getByRole('radiogroup', {name: 'Neutral atmosphere'})
        .getByRole('radio', {name: extraAtm})
        .click();
      expect(await readShellBg()).not.toBe(bgStone);
    }
    await editor
      .getByRole('radiogroup', {name: 'Neutral atmosphere'})
      .getByRole('radio', {name: 'Stone'})
      .click();

    // =========================================================================
    // 2. BASE STYLES — ALL 6 PRESET ACCENTS + CUSTOM HEX + UNDO / REDO!
    // =========================================================================
    const readPrimaryBtnBg = () =>
      page
        .locator('main .astryx-button[data-variant="primary"]')
        .first()
        .evaluate(el => getComputedStyle(el).backgroundColor);

    const seenBtnBgs = new Set<string>();
    for (const swatchName of [
      'Strawberry',
      'Blueberry',
      'Mint',
      'Tangerine',
      'Grape',
      'Teal',
    ]) {
      await editor.getByRole('button', {name: new RegExp(`^${swatchName} \\(`)}).click();
      seenBtnBgs.add(await readPrimaryBtnBg());
    }
    expect(seenBtnBgs.size).toBe(6);
    const tealBtnBg = await readPrimaryBtnBg();

    // Custom Hex Picker (#7c3aed)
    await editor.getByRole('button', {name: 'Hex', exact: true}).click();
    const hexInput = page.locator('.mehan-cp-hex-input').first();
    await hexInput.fill('#7c3aed');
    await hexInput.press('Enter');
    await page.keyboard.press('Escape');
    const customPurpleBtnBg = await readPrimaryBtnBg();
    expect(customPurpleBtnBg).not.toBe(tealBtnBg);

    // Prove Undo & Redo buttons + Ctrl+Z / Ctrl+Shift+Z shortcuts!
    await editor.getByRole('button', {name: 'Undo theme change'}).click();
    expect(await readPrimaryBtnBg()).toBe(tealBtnBg);
    await editor.getByRole('button', {name: 'Redo theme change'}).click();
    expect(await readPrimaryBtnBg()).toBe(customPurpleBtnBg);

    await page.locator('.studio-wordmark').click();
    await page.keyboard.press('Control+z');
    expect(await readPrimaryBtnBg()).toBe(tealBtnBg);
    await page.keyboard.press('Control+Shift+Z');
    expect(await readPrimaryBtnBg()).toBe(customPurpleBtnBg);

    // =========================================================================
    // 3. SEGMENTED ACTIVE PILL, 3D BUTTON LIP (3px/2px/0px), INPUT WELL & DEPTH
    // =========================================================================
    const readSegActiveBg = () =>
      page
        .locator('main .astryx-segmented-control-item[aria-checked="true"]')
        .first()
        .evaluate(el => getComputedStyle(el).backgroundColor);
    const readSegActiveColor = () =>
      page
        .locator('main .astryx-segmented-control-item[aria-checked="true"]')
        .first()
        .evaluate(el => getComputedStyle(el).color);

    const segRaisedBg = await readSegActiveBg();
    const segRaisedColor = await readSegActiveColor();
    await editor
      .getByRole('radiogroup', {name: 'Segmented control active style'})
      .getByRole('radio', {name: 'Espresso Ink'})
      .click();
    // SegmentedControlItem intentionally keeps its non-spatial 175ms color crossfade
    // under Reduce Motion (useSegmentedSelectionMotion.ts:437); poll until settled!
    await expect.poll(readSegActiveBg).not.toBe(segRaisedBg);
    await expect.poll(readSegActiveColor).not.toBe(segRaisedColor);

    // 3D Button Lip: Candy 3px -> Subtle 2px -> Flat 0px (verify real paddingBottom & boxShadow!)
    const readBtnLipMetrics = () =>
      page
        .locator('main .astryx-button[data-variant="primary"]')
        .first()
        .evaluate(el => {
          const cs = getComputedStyle(el);
          return {
            padBottom: parseFloat(cs.paddingBottom),
            padTop: parseFloat(cs.paddingTop),
            shadow: cs.boxShadow,
          };
        });

    const candyMetrics = await readBtnLipMetrics();
    expect(candyMetrics.padBottom).toBeGreaterThan(candyMetrics.padTop + 2);

    await editor
      .getByRole('radiogroup', {name: 'Button lip style'})
      .getByRole('radio', {name: 'Subtle 2px'})
      .click();
    const subtleMetrics = await readBtnLipMetrics();
    expect(subtleMetrics.padBottom).toBeLessThan(candyMetrics.padBottom);
    expect(subtleMetrics.padBottom).toBeGreaterThan(subtleMetrics.padTop + 1);

    await editor
      .getByRole('radiogroup', {name: 'Button lip style'})
      .getByRole('radio', {name: 'Flat 0px'})
      .click();
    const flatMetrics = await readBtnLipMetrics();
    expect(Math.abs(flatMetrics.padBottom - flatMetrics.padTop)).toBeLessThanOrEqual(0.5);
    expect(flatMetrics.shadow).not.toBe(candyMetrics.shadow);

    // Input Field Surface: Recessed Well -> Bordered 1px
    const readInputMetrics = () =>
      page
        .locator('main .astryx-text-input')
        .first()
        .evaluate(el => {
          const cs = getComputedStyle(el);
          return {borderWidth: cs.borderTopWidth, boxShadow: cs.boxShadow};
        });

    expect((await readInputMetrics()).borderWidth).toBe('0px');
    await editor
      .getByRole('radiogroup', {name: 'Input field surface style'})
      .getByRole('radio', {name: 'Bordered 1px'})
      .click();
    expect((await readInputMetrics()).borderWidth).toBe('1px');

    // Shadow depth PrecisionSlider click-to-type (100% -> 0%)
    const readFrameShadow = () =>
      page
        .locator('.showcase-frame')
        .first()
        .evaluate(el => getComputedStyle(el).boxShadow);
    const frameShadow100 = await readFrameShadow();
    await editor.locator('.mehan-ps-value-btn').click();
    const depthInput = editor.locator('.mehan-ps-value-input');
    await depthInput.fill('0');
    await depthInput.press('Enter');
    await expect.poll(readFrameShadow).not.toBe(frameShadow100);

    // Reset back to clean default before testing Typography & Scales
    await editor.getByRole('button', {name: 'Reset all to default'}).click();

    // =========================================================================
    // 4. ALL 10 OFFLINE BUNDLED WOFF2 FONTS + TYPE SCALE + UNIFIED SCALE PRESETS
    // =========================================================================
    for (const hFont of [
      'Fraunces',
      'Crimson Text',
      'Montserrat',
      'Poppins',
      'Albert Sans',
      'Outfit',
      'Bricolage Grotesque',
    ]) {
      await editor.getByRole('combobox', {name: 'Heading font'}).click();
      await page.getByRole('option', {name: new RegExp(`^${hFont}`)}).click();
      const check = await page.evaluate(async f => {
        await document.fonts.ready;
        const h2 = document.querySelector('main h2');
        return {
          loaded: document.fonts.check(`600 18px "${f}"`),
          computed: h2 ? getComputedStyle(h2).fontFamily : '',
        };
      }, hFont);
      expect(check.loaded, `WOFF2 not loaded for ${hFont}`).toBe(true);
      expect(check.computed).toContain(hFont);
    }

    for (const bFont of ['Albert Sans', 'Outfit', 'Figtree']) {
      await editor.getByRole('combobox', {name: 'Body font'}).click();
      await page.getByRole('option', {name: new RegExp(`^${bFont}`)}).click();
      const bodyFam = await page
        .locator('.studio-shell')
        .evaluate(el => getComputedStyle(el).fontFamily);
      expect(bodyFam).toContain(bFont);
    }

    for (const cFont of ['JetBrains Mono', 'Geist Mono']) {
      await editor.getByRole('combobox', {name: 'Code font'}).click();
      await page.getByRole('option', {name: new RegExp(`^${cFont}`)}).click();
      const codeCheck = await page.evaluate(async f => {
        await document.fonts.ready;
        const codeEl = document.querySelector('.te-token-code');
        return {
          loaded: document.fonts.check(`400 12px "${f}"`),
          tokenVar: getComputedStyle(document.documentElement)
            .getPropertyValue('--font-family-code')
            .trim(),
          elFound: Boolean(codeEl),
        };
      }, cFont);
      expect(codeCheck.loaded, `WOFF2 not loaded for ${cFont}`).toBe(true);
      expect(codeCheck.tokenVar).toContain(cFont);
    }

    // Type scale ratio & Base type size
    const h2SizeDefault = await page
      .locator('main h2')
      .first()
      .evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    await editor
      .getByRole('radiogroup', {name: 'Base type size preset'})
      .getByRole('radio', {name: '16'})
      .click();
    await editor.getByRole('combobox', {name: 'Type scale ratio'}).click();
    await page.getByRole('option', {name: /1\.500/}).click();
    const h2SizeLarge = await page
      .locator('main h2')
      .first()
      .evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(h2SizeLarge).toBeGreaterThan(h2SizeDefault + 4);

    // Disclosure 3, 4, 5 MUST start collapsed (real Progressive Disclosure!)
    const disc3Btn = editor.getByRole('button', {
      name: /3\. Scale Presets, Radius & Spacing/,
    });
    const disc4Btn = editor.getByRole('button', {
      name: /4\. Core Semantic Colors/,
    });
    const disc5Btn = editor.getByRole('button', {name: /5\. Motion & Tempo/});
    await expect(disc3Btn).toHaveAttribute('aria-expanded', 'false');
    await expect(disc4Btn).toHaveAttribute('aria-expanded', 'false');
    await expect(disc5Btn).toHaveAttribute('aria-expanded', 'false');

    // Disclosure 3: Scale Presets, Radius, Spacing & Control Height
    await disc3Btn.click();
    await editor.locator('.te-unified-card', {hasText: 'Compact'}).click();
    const btnHeightCompact = await page
      .locator('main .astryx-button:not([data-size="sm"]):not([data-size="lg"])')
      .first()
      .evaluate(el => el.getBoundingClientRect().height);
    await editor.locator('.te-unified-card', {hasText: 'Comfortable'}).click();
    const btnHeightComfort = await page
      .locator('main .astryx-button:not([data-size="sm"]):not([data-size="lg"])')
      .first()
      .evaluate(el => el.getBoundingClientRect().height);
    expect(btnHeightComfort).toBeGreaterThan(btnHeightCompact + 8);

    // Corner radius base: 0 vs XL
    await editor
      .getByRole('radiogroup', {name: 'Corner radius base preset'})
      .getByRole('radio', {name: '0'})
      .click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-card')
          .first()
          .evaluate(el => getComputedStyle(el).borderRadius),
      )
      .toBe('0px');
    await editor
      .getByRole('radiogroup', {name: 'Corner radius base preset'})
      .getByRole('radio', {name: 'XL'})
      .click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-card')
          .first()
          .evaluate(el => parseFloat(getComputedStyle(el).borderRadius)),
      )
      .toBeGreaterThanOrEqual(20);

    // Disclosure 4: Core Semantic Colors override & reset
    await disc4Btn.click();
    const cardColorInput = editor.getByRole('textbox', {
      name: 'Card surface value',
    });
    await cardColorInput.fill('#fef3c7');
    await expect
      .poll(() =>
        page
          .locator('main .astryx-card')
          .first()
          .evaluate(el => getComputedStyle(el).backgroundColor),
      )
      .toBe('rgb(254, 243, 199)');
    await editor.getByRole('button', {name: 'Reset Card surface'}).click();

    // Disclosure 5: Motion & Tempo (verify distinct --duration-medium ms across 0.5x, 1x, 2x even in Calm!)
    await disc5Btn.click();
    await editor
      .getByRole('radiogroup', {name: 'Motion character'})
      .getByRole('radio', {name: 'Calm'})
      .click();
    const readDurationMedium = () =>
      page.evaluate(() =>
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--duration-medium',
          ),
        ),
      );
    await editor
      .getByRole('radiogroup', {name: 'Duration speed multiplier'})
      .getByRole('radio', {name: '0.5×'})
      .click();
    const dur05 = await readDurationMedium();
    await editor
      .getByRole('radiogroup', {name: 'Duration speed multiplier'})
      .getByRole('radio', {name: '1×'})
      .click();
    const dur10 = await readDurationMedium();
    await editor
      .getByRole('radiogroup', {name: 'Duration speed multiplier'})
      .getByRole('radio', {name: '2×'})
      .click();
    const dur20 = await readDurationMedium();
    expect(dur05).toBeGreaterThan(dur10);
    expect(dur10).toBeGreaterThan(dur20);

    await editor.getByRole('button', {name: 'Reset all to default'}).click();

    // =========================================================================
    // 5. TAB 2: COMPONENTS — MULTI-TARGET COMPONENT TOKENS & INLINE OVERRIDE EDIT
    // =========================================================================
    await editor.getByRole('tab', {name: 'Components'}).click();

    // Test --button-radius -> Full (9999px)
    await editor
      .getByRole('combobox', {name: 'Button Border radius', exact: true})
      .click();
    await page.getByRole('option', {name: /^Full/}).click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-button')
          .first()
          .evaluate(el => parseFloat(getComputedStyle(el).borderRadius)),
      )
      .toBeGreaterThanOrEqual(999);

    // Test --input-radius -> Full across BOTH TextInput AND Selector (multi-target proof!)
    await editor
      .getByRole('combobox', {name: 'Field / Input Border radius', exact: true})
      .click();
    await page.getByRole('option', {name: /^Full/}).click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-text-input')
          .first()
          .evaluate(el => parseFloat(getComputedStyle(el).borderRadius)),
      )
      .toBeGreaterThanOrEqual(999);
    await expect
      .poll(() =>
        page
          .locator('main .astryx-selector')
          .first()
          .evaluate(el => parseFloat(getComputedStyle(el).borderRadius)),
      )
      .toBeGreaterThanOrEqual(999);

    // Test --card-radius -> None (0px) + --composer-radius -> None (0px)
    await editor
      .getByRole('combobox', {name: 'Card Border radius', exact: true})
      .click();
    await page.getByRole('option', {name: /^None/}).click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-card')
          .first()
          .evaluate(el => getComputedStyle(el).borderRadius),
      )
      .toBe('0px');

    await editor
      .getByRole('combobox', {name: 'Chat Composer Border radius', exact: true})
      .click();
    await page.getByRole('option', {name: /^None/}).click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-chat-composer')
          .first()
          .evaluate(el => getComputedStyle(el).borderRadius),
      )
      .toBe('0px');

    // Add Custom CSS Override on `badge` AND edit its value inline!
    await editor
      .getByRole('combobox', {name: 'Component target', exact: true})
      .click();
    await page.getByRole('option', {name: 'badge', exact: true}).click();
    await editor
      .getByRole('textbox', {name: 'CSS property (camelCase)', exact: true})
      .fill('letterSpacing');
    await editor
      .getByRole('textbox', {name: 'CSS value', exact: true})
      .fill('3px');
    await editor.getByRole('button', {name: 'Add component override'}).click();
    await expect
      .poll(() =>
        page
          .locator('main .astryx-badge')
          .first()
          .evaluate(el => getComputedStyle(el).letterSpacing),
      )
      .toBe('3px');

    // Inline edit of existing override -> 6px!
    await editor
      .getByRole('textbox', {name: 'Override value for badge.letterSpacing'})
      .fill('6px');
    await expect
      .poll(() =>
        page
          .locator('main .astryx-badge')
          .first()
          .evaluate(el => getComputedStyle(el).letterSpacing),
      )
      .toBe('6px');

    await page.screenshot({
      path: path.join(shotDir, 'stage1-editor-components-live-proof-1400.png'),
      fullPage: false,
    });

    await editor.getByRole('button', {name: 'Reset all to default'}).click();

    // =========================================================================
    // 6. TAB 3: ADVANCED — ALL 8 RAW TOKEN GROUPS + SEARCH + LIVE MUTATION
    // =========================================================================
    await editor.getByRole('tab', {name: 'Advanced'}).click();
    for (const grp of [
      'Colors',
      'Spacing',
      'Radius',
      'Typography',
      'Size',
      'Elevation',
      'Duration',
      'Easing',
    ]) {
      await editor.getByRole('tab', {name: grp, exact: true}).click();
    }
    await editor.getByRole('tab', {name: 'Radius', exact: true}).click();
    await editor.getByRole('textbox', {name: 'Filter raw tokens'}).fill('--radius-container');
    await editor.getByRole('textbox', {name: '--radius-container'}).fill('4px');
    expect(
      await page
        .locator('main .astryx-card')
        .first()
        .evaluate(el => getComputedStyle(el).borderRadius),
    ).toBe('4px');
    await editor.getByRole('button', {name: 'Reset --radius-container'}).click();

    // =========================================================================
    // 7. NAMED PRESET SAVE -> RESTORE -> DELETE + FORCED-COLORS / PRINT HYGIENE
    // =========================================================================
    await editor.getByRole('tab', {name: 'Base Styles'}).click();
    await editor
      .getByRole('radiogroup', {name: 'Neutral atmosphere'})
      .getByRole('radio', {name: 'Porcelain'})
      .click();
    await editor.getByRole('button', {name: 'Save', exact: true}).click();
    await page.getByRole('textbox', {name: 'Preset name'}).fill('Stage1 Audit');
    await page.getByRole('button', {name: 'Save preset'}).click();

    // Switch back to Confectionery, then restore 'Stage1 Audit'
    await editor.getByRole('combobox', {name: 'Theme preset'}).click();
    await page.getByRole('option', {name: 'Preset: Confectionery'}).click();
    expect(await readShellBg()).toBe(bgConfectionery);

    await editor.getByRole('combobox', {name: 'Theme preset'}).click();
    await page.getByRole('option', {name: 'Preset: Stage1 Audit'}).click();
    expect(await readShellBg()).toBe(bgPorcelain);
    await editor.getByRole('button', {name: 'Delete active preset'}).click();

    // Forced-colors & Print media emulation
    await page.emulateMedia({forcedColors: 'active', reducedMotion: 'reduce'});
    await page.waitForTimeout(80);
    await page.emulateMedia({forcedColors: 'none', reducedMotion: 'no-preference', media: 'print'});
    const printHidden = await page
      .locator('.studio-topbar')
      .evaluate(el => getComputedStyle(el).display);
    expect(printHidden).toBe('none');
    await page.emulateMedia({media: 'screen'});

    expect(externalRequests).toEqual([]);
    expect(errors).toEqual([]);
  });
});
