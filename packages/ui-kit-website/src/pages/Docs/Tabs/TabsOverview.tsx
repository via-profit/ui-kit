import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTabsBasic from '~/examples/tabs/ExampleTabsBasic';
import ExampleTabsControlled from '~/examples/tabs/ExampleTabsControlled';
import ExampleTabsVertical from '~/examples/tabs/ExampleTabsVertical';
import ExampleTabsScroll from '~/examples/tabs/ExampleTabsScroll';
import ExampleTabsStyled from '~/examples/tabs/ExampleTabsStyled';
import ExampleTabsVariants from '~/examples/tabs/ExampleTabsVariants';
import content from '@via-profit/ui-kit/docs/tabs/README.md';

const TabsOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTabsBasic,
          ExampleTabsControlled,
          ExampleTabsVertical,
          ExampleTabsScroll,
          ExampleTabsStyled,
          ExampleTabsVariants,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TabsOverview;
