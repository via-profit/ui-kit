import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleDatePickerOverview from '~/examples/date-picker/ExampleDatePickerOverview';
import content from '@via-profit/ui-kit/docs/date-picker/README.md';

const Buttons: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleDatePickerOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Buttons;
