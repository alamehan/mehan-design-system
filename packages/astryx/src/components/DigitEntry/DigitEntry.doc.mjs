/** @type {import('@astryxdesign/cli/authoring').ComponentDoc} */
export default {
  type: 'component',
  name: 'DigitEntry',
  displayName: 'Digit Entry (OTP)',
  import: '@mehan/astryx',
  category: 'Form Controls',
  keywords: ['otp', 'digit entry', 'pin code', 'verification code', '2fa', 'passcode'],
  props: [
    {
      name: 'value',
      type: 'string',
      description: 'Controlled verification string up to `length` characters.',
      required: true,
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      description: 'Called whenever cells are edited, cleared, or pasted.',
      required: true,
    },
    {
      name: 'onComplete',
      type: '(value: string) => void',
      description: 'Fired automatically when all `length` slots are populated.',
    },
    {
      name: 'length',
      type: 'number',
      description: 'Number of character slots (`2..12`).',
      default: '6',
    },
    {
      name: 'mode',
      type: "'numeric' | 'alphanumeric'",
      description: 'Accepted character class and mobile virtual keyboard hint.',
      default: "'numeric'",
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible group label and per-slot screen-reader prefix.',
      default: "'Verification code'",
    },
    {
      name: 'hasSeparatorAfter',
      type: 'number',
      description: '1-based slot index after which a visual dash renders (for example `3` for `123 – 456`).',
    },
    {
      name: 'isInvalid',
      type: 'boolean',
      description: 'Applies semantic error ring and `aria-invalid` across cells.',
      default: 'false',
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      description: 'Disables all character cells.',
      default: 'false',
    },
    {
      name: 'autoComplete',
      type: 'string',
      description: 'Autocomplete token set on the first cell for SMS or passkey autofill.',
      default: "'one-time-code'",
    },
  ],
  usage: {
    description:
      'Recessed-well verification code / OTP input supporting full clipboard paste distribution (automatically stripping spaces and hyphens), SMS `one-time-code` autofill, smart Backspace step-back, and arrow-key traversal. Also exported as `OtpInput`.',
    bestPractices: [
      {
        guidance: true,
        description: 'Allow pasting formatted codes like `"482-910"` into any cell; `DigitEntry` strips separators automatically.',
      },
      {
        guidance: false,
        description: 'Block clipboard paste on security or verification inputs.',
      },
    ],
  },
};
