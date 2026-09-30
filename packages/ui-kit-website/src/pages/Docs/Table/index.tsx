import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/table/README.md';
import ExampleTableBasic from '~/examples/table/ExampleTableBasic';
import ExampleTableRowHeaders from '~/examples/table/ExampleTableRowHeaders';
import ExampleTableScroll from '~/examples/table/ExampleTableScroll';
import ExampleTableStyled from '~/examples/table/ExampleTableStyled';

const Tables: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTableBasic,
          ExampleTableRowHeaders,
          ExampleTableScroll,
          ExampleTableStyled,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default Tables;
