import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExamplePhoneFieldOverview from '~/examples/phone-field/ExamplePhoneFieldOverview';
import content from '@via-profit/ui-kit/docs/phone-field/README.md';

const PhoneFieldOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExamplePhoneFieldOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default PhoneFieldOverview;
