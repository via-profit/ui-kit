import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleDatePickerOverview from '~/examples/date-picker/ExampleDatePickerOverview';
import ExampleDatePickerReadOnly from '~/examples/date-picker/ExampleDatePickerReadOnly';
import ExampleDatePickerTemplate from '~/examples/date-picker/ExampleDatePickerTemplate';
import ExampleDatePickerHooks from '~/examples/date-picker/ExampleDatePickerHooks';

/**
 * The page of the component: the documentation with the live examples
 */
const DatePickerOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleDatePickerOverview,
      ExampleDatePickerReadOnly,
      ExampleDatePickerTemplate,
      ExampleDatePickerHooks,
    }}
  />
);

export default DatePickerOverview;
