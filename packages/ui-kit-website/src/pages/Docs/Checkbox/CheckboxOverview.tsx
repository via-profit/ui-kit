import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCheckboxBasic from '~/examples/checkbox/ExampleCheckboxBasic';
import ExampleCheckboxIndeterminate from '~/examples/checkbox/ExampleCheckboxIndeterminate';
import ExampleCheckboxColors from '~/examples/checkbox/ExampleCheckboxColors';
import ExampleCheckboxLabelPlacement from '~/examples/checkbox/ExampleCheckboxLabelPlacement';
import ExampleCheckboxValidation from '~/examples/checkbox/ExampleCheckboxValidation';
import ExampleCheckboxOverrides from '~/examples/checkbox/ExampleCheckboxOverrides';
import content from '@via-profit/ui-kit/docs/checkbox/README.md';

const CheckboxOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleCheckboxBasic,
          ExampleCheckboxIndeterminate,
          ExampleCheckboxColors,
          ExampleCheckboxLabelPlacement,
          ExampleCheckboxValidation,
          ExampleCheckboxOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default CheckboxOverview;
