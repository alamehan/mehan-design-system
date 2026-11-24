/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'ImageWell',
  displayName: 'Image Well',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['image upload', 'dropzone', 'avatar upload', 'clipboard paste', 'thumbnail'],
  props: [
    {
      name: 'value',
      type: 'string | null',
      description: 'Current image URL or `data:` URI rendered over a transparency checkerboard.',
    },
    {
      name: 'onSelectFile',
      type: '(file: File, dataUrl: string) => void',
      description: 'Called when a valid image is picked, dropped, or pasted from the clipboard.',
    },
    {
      name: 'onClear',
      type: '() => void',
      description: 'Optional callback enabling the inline remove button when `value` is populated.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Primary call-to-action and accessible dropzone label.',
      default: "'Upload image'",
    },
    {
      name: 'hint',
      type: 'string',
      description: 'Supporting format and interaction guidance.',
      default: "'PNG, JPG, WebP, or SVG — drop, click, or paste'",
    },
    {
      name: 'accept',
      type: 'string',
      description: 'Accepted file MIME filter passed to the underlying file input.',
      default: "'image/*'",
    },
    {
      name: 'aspectRatio',
      type: "'square' | 'landscape' | 'wide'",
      description: 'Frame proportion preset.',
      default: "'landscape'",
    },
    {
      name: 'maxSizeBytes',
      type: 'number',
      description: 'Maximum file size in bytes before showing a blame-free recovery message.',
      default: '5242880',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables file selection, drop, paste, and clearing.',
      default: 'false',
    },
  ],
  usage: {
    description:
      'Tactile image dropzone and preview well supporting click-to-browse, drag-and-drop, direct clipboard `Ctrl+V` paste, checkerboard transparency preview, and blame-free size validation.',
    bestPractices: [
      {
        guidance: true,
        description: 'Set `maxSizeBytes` explicitly so oversized uploads fail fast with a clear size limit before network upload.',
      },
      {
        guidance: false,
        description: 'Clear user form fields when an uploaded image exceeds `maxSizeBytes`.',
      },
    ],
  },
};
