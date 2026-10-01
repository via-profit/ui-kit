import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleStackBasic from '~/examples/stack/ExampleStackBasic';
import ExampleStackRow from '~/examples/stack/ExampleStackRow';
import ExampleStackSpacing from '~/examples/stack/ExampleStackSpacing';
import content from '@via-profit/ui-kit/docs/stack/README.md';

const StackOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleStackBasic, ExampleStackRow, ExampleStackSpacing }}>
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default StackOverview;
