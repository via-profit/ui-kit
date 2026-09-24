import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/selectbox/README.md';
import ExampleSelectboxOverview from '~/examples/selectbox/ExampleSelectboxOverview';
import ExampleSelectboxMultiple from '~/examples/selectbox/ExampleSelectboxMultiple';

const SelectboxOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleSelectboxOverview,
          ExampleSelectboxMultiple,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SelectboxOverview;
