import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleDatePickerOverview from '~/examples/date-picker/ExampleDatePickerOverview';
import ExampleDatePickerHooks from '~/examples/date-picker/ExampleDatePickerHooks';
import content from '@via-profit/ui-kit/docs/date-picker/README.md';

const Buttons: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleDatePickerOverview,
          ExampleDatePickerHooks,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default Buttons;
