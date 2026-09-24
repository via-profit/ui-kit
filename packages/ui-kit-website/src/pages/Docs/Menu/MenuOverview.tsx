import React from 'react';
import DocsArticle from '~/components/DocsArticle';

import TableOfContent from '~/components/TableOfContent';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/menu/README.md';
import ExampleMenuOverview from '~/examples/menu/ExampleMenuOverview';
import ExampleMenuMultiple from '~/examples/menu/ExampleMenuMultiple';
import ExampleMenuAPI from '~/examples/menu/ExampleMenuAPI';
import ExampleMenuAnchorPos from '~/examples/menu/ExampleMenuAnchorPos';

const MenuOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleMenuOverview,
          ExampleMenuMultiple,
          ExampleMenuAPI,
          ExampleMenuAnchorPos,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default MenuOverview;
