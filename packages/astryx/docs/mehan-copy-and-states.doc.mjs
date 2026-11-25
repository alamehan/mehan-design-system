/** @type {import('@astryxdesign/cli/authoring').ReferenceDoc} */
export default {
  type: 'generic',
  name: 'mehan-copy-and-states',
  title: 'Mehan Product Microcopy and Recovery States',
  category: 'guide',
  keywords: [
    'mehan copy',
    'microcopy',
    'sentence case',
    'error messages',
    'empty state',
    'loading state',
    'destructive confirmation',
    'evergreen copy',
    'pure domain identity',
  ],
  description:
    'Sentence-case microcopy standards, 3-Bucket Evergreen Copywriting, verb-plus-noun button labels, diagnostic error formulas, and non-destructive recovery states.',
  sections: [
    {
      id: 'microcopy-contract',
      title: 'Microcopy Contract',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Use sentence case for headings, buttons, field labels, tabs, and menu items, preserving proper nouns and acronyms.',
            'Write verb-first specific button labels (1-4 words): `Save changes`, `Create workspace`, `Export CSV`, `Try again`. Do not use vague labels such as `Submit`, `OK`, `Yes`, `No`, or `Proceed`.',
            'Keep visible field labels on all inputs. Placeholders show example values (`For example: Q4 roadmap`) and never replace `label`.',
            'Write blame-free error messages using the formula "What happened -> How to fix it": `File exceeds 25 MB. Choose a file under 25 MB.`',
            'Confirm irreversible destructive actions in an `AlertDialog` that states the exact consequence and names the action (`Cancel` + `Delete project`).',
          ],
        },
      ],
    },
    {
      id: 'state-model',
      title: 'Loading, Invalid, Empty, and Error States',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Non-destructive validation: when an input or filter becomes invalid, report the issue inline on the field or via `Banner` while keeping the last valid output visible on screen.',
            'Certainty-matched loading: use `Button isLoading` for short in-place actions, `Skeleton` for known layout shapes, and `ProgressBar` with an explicit `Cancel` action (`isInterruptible`) for long tasks.',
            'Actionable empty states: pair `EmptyState` with a 2-6 word title, one sentence explaining what appears there, and one primary next action (`Create item` or `Clear filters`).',
            'Human-safe error states: explain what stopped, confirm that saved work remains intact, and provide a recovery button (`Try again`) without exposing raw stack traces.',
          ],
        },
        {
          type: 'prose',
          text: 'Combine these state rules with {@link generic:mehan-ux-complexity} and {@link generic:mehan-page-archetypes}.',
        },
      ],
    },
    {
      id: 'evergreen-copy-architecture',
      title: '3-Bucket Evergreen Copywriting and Pure Domain Identity',
      content: [
        {
          type: 'list',
          style: 'unordered',
          items: [
            'Pure domain taglines: product titles, subtitles, and card summaries describe concrete user inputs and domain outcomes — never leaking internal delivery plumbing ("via REST API", "zero API keys", "powered by localStorage", or model-provider mechanics).',
            'Bucket 1 — Dynamic `{count}` bindings: in UI components, read live counts directly from runtime arrays (`items.length`, `Object.keys(presets).length`) rather than hardcoding static numbers in translation dictionaries.',
            'Bucket 2 — Cross-file evergreen prose: cross-boundary documentation, hero leads, and SVG diagrams describe structural architecture and lasting capabilities rather than brittle inventory tallies that rot whenever a preset, route, or module is added; introduce open-ended examples with "including A, B, and C".',
            'Bucket 3 — Single-source ledgers: keep exact inventory counts exclusively inside machine-verified manifests or automated test suites.',
          ],
        },
      ],
    },
  ],
};
