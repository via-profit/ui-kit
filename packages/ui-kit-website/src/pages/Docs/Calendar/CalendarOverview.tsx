import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCalendarBasic from '~/examples/calendar/ExampleCalendarBasic';
import ExampleCalendarRange from '~/examples/calendar/ExampleCalendarRange';
import ExampleCalendarViews from '~/examples/calendar/ExampleCalendarViews';
import ExampleCalendarLimits from '~/examples/calendar/ExampleCalendarLimits';
import ExampleCalendarCustomControls from '~/examples/calendar/ExampleCalendarCustomControls';
import ExampleCalendarOverrides from '~/examples/calendar/ExampleCalendarOverrides';
import ExampleCalendarHooks from '~/examples/calendar/ExampleCalendarHooks';
import content from '@via-profit/ui-kit/docs/calendar/README.md';

const CalendarOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleCalendarBasic,
          ExampleCalendarRange,
          ExampleCalendarViews,
          ExampleCalendarLimits,
          ExampleCalendarCustomControls,
          ExampleCalendarOverrides,
          ExampleCalendarHooks,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default CalendarOverview;
