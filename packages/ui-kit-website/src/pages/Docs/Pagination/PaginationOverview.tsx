import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExamplePaginationBasic from '~/examples/pagination/ExamplePaginationBasic';
import ExamplePaginationRange from '~/examples/pagination/ExamplePaginationRange';
import ExamplePaginationNavigation from '~/examples/pagination/ExamplePaginationNavigation';
import ExamplePaginationAppearance from '~/examples/pagination/ExamplePaginationAppearance';
import ExamplePaginationTable from '~/examples/pagination/ExamplePaginationTable';
import ExamplePaginationLinks from '~/examples/pagination/ExamplePaginationLinks';
import ExamplePaginationCustom from '~/examples/pagination/ExamplePaginationCustom';
import content from '@via-profit/ui-kit/docs/pagination/README.md';

const PaginationOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExamplePaginationBasic,
          ExamplePaginationRange,
          ExamplePaginationNavigation,
          ExamplePaginationAppearance,
          ExamplePaginationTable,
          ExamplePaginationLinks,
          ExamplePaginationCustom,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default PaginationOverview;
