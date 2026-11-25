#!/usr/bin/env node
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const pkgRoot = path.resolve(import.meta.dirname, '..');
const astryxDir = path.resolve(pkgRoot, '../astryx');
const distDir = path.join(pkgRoot, 'dist');

fs.rmSync(distDir, {recursive: true, force: true});
fs.mkdirSync(distDir, {recursive: true});

const pnpmCmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

execFileSync(
  pnpmCmd,
  ['exec', 'tsup', '--config', 'tsup.config.mjs'],
  {cwd: pkgRoot, stdio: 'inherit', shell: process.platform === 'win32'},
);

const {
  generatePortableCss,
  generateAiPrototypeKit,
  exportW3cDesignTokens,
  MEHAN_PORTABLE_RUNTIME_JS,
} = await import(new URL('../dist/index.js', import.meta.url).href);

const fullCss = generatePortableCss();
const aiKitMd = generateAiPrototypeKit({
  atmosphere: 'confectionery',
  accent: 'strawberry',
});
const w3cJson = `${JSON.stringify(
  exportW3cDesignTokens({
    name: 'mehan-confectionery',
    atmosphere: 'confectionery',
    accent: 'strawberry',
  }),
  null,
  2,
)}\n`;

fs.writeFileSync(path.join(distDir, 'mehan-portable.css'), fullCss, 'utf8');
fs.writeFileSync(
  path.join(distDir, 'mehan-portable.js'),
  MEHAN_PORTABLE_RUNTIME_JS,
  'utf8',
);
fs.writeFileSync(
  path.join(distDir, 'MEHAN-AI-PROTOTYPE-KIT.md'),
  aiKitMd,
  'utf8',
);
fs.writeFileSync(path.join(distDir, 'mehan-tokens.w3c.json'), w3cJson, 'utf8');

// Emit a zero-bundler Astryx + Mehan CDN single-HTML starter (`mehan-astryx-cdn.html`)
const astryxThemeCssPath = path.resolve(
  astryxDir,
  'dist/themes/mehan-confectionery.css',
);
const astryxStylesCssPath = path.resolve(astryxDir, 'dist/styles.css');
const inlinedThemeCss = fs.existsSync(astryxThemeCssPath)
  ? fs.readFileSync(astryxThemeCssPath, 'utf8')
  : '';
const inlinedStylesCss = fs.existsSync(astryxStylesCssPath)
  ? fs.readFileSync(astryxStylesCssPath, 'utf8')
  : '';

const cdnHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mehan × Meta Astryx — Single-HTML CDN Starter</title>
    <script>(function(){try{var m=localStorage.getItem('mehan-mode');var d=m==='dark'||((!m||m==='system')&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();</script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@astryxdesign/core@0.7.17/src/reset.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@astryxdesign/core@0.7.17/dist/astryx.css" />
    <style>
${inlinedThemeCss}
${inlinedStylesCss}
      [data-astryx-theme], body { background-color: var(--color-background-body); color: var(--color-text-primary); font-family: var(--font-family-body); margin: 0; }
    </style>
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@19.2.0",
          "react/jsx-runtime": "https://esm.sh/react@19.2.0/jsx-runtime",
          "react-dom": "https://esm.sh/react-dom@19.2.0",
          "react-dom/client": "https://esm.sh/react-dom@19.2.0/client",
          "htm": "https://esm.sh/htm@3.1.1",
          "@astryxdesign/core": "https://esm.sh/@astryxdesign/core@0.7.17?external=react,react-dom",
          "@astryxdesign/core/theme": "https://esm.sh/@astryxdesign/core@0.7.17/theme?external=react,react-dom"
        }
      }
    </script>
  </head>
  <body data-astryx-theme="mehan-confectionery">
    <div id="root"></div>
    <script type="module">
      import * as React from 'react';
      import {createRoot} from 'react-dom/client';
      import htm from 'htm';
      import {LayerProvider, Card, Stack, Heading, Text, Button, SegmentedControl, SegmentedControlItem, TextInput} from '@astryxdesign/core';
      import {Theme, defineTheme} from '@astryxdesign/core/theme';

      const h = htm.bind(React.createElement);
      const mehanCdnTheme = Object.assign(
        defineTheme({ name: 'mehan-confectionery' }),
        { __built: true }
      );

      function DemoApp() {
        const [mode, setMode] = React.useState('light');
        const [view, setView] = React.useState('studio');
        const [projectName, setProjectName] = React.useState('Confectionery Launchpad');
        return h\`
          <\${Theme} theme=\${mehanCdnTheme} mode=\${mode}>
            <\${LayerProvider}>
              <\${Stack} padding=\${6} gap=\${4} align="start">
                <\${Card} maxWidth=\${540} elevation="low">
                  <\${Stack} gap=\${4} align="start">
                    <\${Heading} level=\${1}>Mehan × Astryx CDN starter</\${Heading}>
                    <\${Text} color="secondary">Zero bundler, zero install — full Meta Astryx accessibility + Mehan tactile physics in a single HTML file.</\${Text}>
                    <\${SegmentedControl}
                      label="Workspace mode"
                      value=\${view}
                      onChange=\${setView}
                    >
                      <\${SegmentedControlItem} value="studio" label="Studio" />
                      <\${SegmentedControlItem} value="metrics" label="Metrics" />
                      <\${SegmentedControlItem} value="export" label="Export" />
                    </\${SegmentedControl}>
                    <\${TextInput} label="Project name" value=\${projectName} onChange=\${setProjectName} />
                    <\${Stack} direction="horizontal" gap=\${2}>
                      <\${Button} variant="primary" label="Save changes" />
                      <\${Button}
                        variant="secondary"
                        label=\${mode === 'light' ? 'Switch to dark' : 'Switch to light'}
                        onClick=\${() => setMode(mode === 'light' ? 'dark' : 'light')}
                      />
                    </\${Stack}>
                  </\${Stack}>
                </\${Card}>
              </\${Stack}>
            </\${LayerProvider}>
          </\${Theme}>
        \`;
      }

      createRoot(document.getElementById('root')).render(h\`<\${DemoApp} />\`);
    </script>
  </body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'mehan-astryx-cdn.html'), cdnHtml, 'utf8');

console.log(
  '✅ @mehan/portable built CSS, runtime JS, AI Kit, W3C tokens, and CDN HTML in dist/.',
);
