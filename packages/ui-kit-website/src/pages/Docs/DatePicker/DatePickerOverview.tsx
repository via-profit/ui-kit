import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleDatePickerOverview from '~/examples/date-picker/ExampleDatePickerOverview';
import ExampleDatePickerHooks from '~/examples/date-picker/ExampleDatePickerHooks';
import content from '@via-profit/ui-kit/docs/date-picker/README.md';

const Buttons: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleDatePickerOverview,
          ExampleDatePickerHooks,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default Buttons;
