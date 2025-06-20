import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCalendarOverivew from '~/examples/calendar/ExampleCalendarOverivew';
import ExampleCalendarOverrides from '~/examples/calendar/ExampleCalendarOverrides';
import ExampleCalendarCustomControls from '~/examples/calendar/ExampleCalendarCustomControls';
import ExampleCalendarHooks from '~/examples/calendar/ExampleCalendarHooks';
import content from '@via-profit/ui-kit/docs/calendar/README.md';

const Buttons: React.FC = () => (
  <>
    <Surface>
      <ExampleCalendarOverivew />
      {/*<RenderMarkdown*/}
      {/*  overrides={{*/}
      {/*    ExampleCalendarOverivew,*/}
      {/*    ExampleCalendarOverrides,*/}
      {/*    ExampleCalendarCustomControls,*/}
      {/*    ExampleCalendarHooks,*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {content}*/}
      {/*</RenderMarkdown>*/}
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default Buttons;
