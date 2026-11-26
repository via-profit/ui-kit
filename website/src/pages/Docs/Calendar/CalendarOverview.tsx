import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleCalendarBasic from '~/examples/calendar/ExampleCalendarBasic';
import ExampleCalendarRange from '~/examples/calendar/ExampleCalendarRange';
import ExampleCalendarViews from '~/examples/calendar/ExampleCalendarViews';
import ExampleCalendarLimits from '~/examples/calendar/ExampleCalendarLimits';
import ExampleCalendarCustomControls from '~/examples/calendar/ExampleCalendarCustomControls';
import ExampleCalendarOverrides from '~/examples/calendar/ExampleCalendarOverrides';
import ExampleCalendarHooks from '~/examples/calendar/ExampleCalendarHooks';

/**
 * The page of the component: the documentation with the live examples
 */
const CalendarOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleCalendarBasic,
      ExampleCalendarRange,
      ExampleCalendarViews,
      ExampleCalendarLimits,
      ExampleCalendarCustomControls,
      ExampleCalendarOverrides,
      ExampleCalendarHooks,
    }}
  />
);

export default CalendarOverview;
