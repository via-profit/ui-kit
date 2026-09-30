import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleDatePickerOverview from '~/examples/date-picker/ExampleDatePickerOverview';
import ExampleDatePickerReadOnly from '~/examples/date-picker/ExampleDatePickerReadOnly';
import ExampleDatePickerTemplate from '~/examples/date-picker/ExampleDatePickerTemplate';
import ExampleDatePickerHooks from '~/examples/date-picker/ExampleDatePickerHooks';
import content from '@via-profit/ui-kit/docs/date-picker/README.md';

const DatePickerOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleDatePickerOverview,
          ExampleDatePickerReadOnly,
          ExampleDatePickerTemplate,
          ExampleDatePickerHooks,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default DatePickerOverview;
