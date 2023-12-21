import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCalendarOverivew from '~/examples/calendar/ExampleCalendarOverivew';
import ExampleCalendarControlled from '~/examples/calendar/ExampleCalendarControlled';
import content from '@via-profit/ui-kit/docs/calendar/README.md';

const Buttons: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleCalendarOverivew,
        ExampleCalendarControlled,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Buttons;
