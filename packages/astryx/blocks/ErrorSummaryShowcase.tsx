'use client';

import {ErrorSummary} from '@mehan/astryx';

export default function ErrorSummaryShowcase() {
  return (
    <ErrorSummary
      errors={[
        {
          fieldId: 'demo-work-email',
          fieldLabel: 'Work email',
          message: 'Enter a valid email address, like name@company.com.',
        },
        {
          fieldId: 'demo-webhook-url',
          fieldLabel: 'Webhook URL',
          message: 'Start the endpoint URL with https://.',
        },
      ]}
    />
  );
}
