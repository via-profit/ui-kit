import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCalendarOverivew from '~/examples/calendar/ExampleCalendarOverivew';
import ExampleCalendarOverrides from '~/examples/calendar/ExampleCalendarOverrides';
import ExampleCalendarCustomControls from '~/examples/calendar/ExampleCalendarCustomControls';
import ExampleCalendarHooks from '~/examples/calendar/ExampleCalendarHooks';
import ExampleCalendarViews from '~/examples/calendar/ExampleCalendarViews';
import content from '@via-profit/ui-kit/docs/calendar/README.md';

const Buttons: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleCalendarOverivew,
          ExampleCalendarOverrides,
          ExampleCalendarCustomControls,
          ExampleCalendarHooks,
          ExampleCalendarViews,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default Buttons;
