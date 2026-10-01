import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleGridAuto from '~/examples/grid/ExampleGridAuto';
import ExampleGridColumns from '~/examples/grid/ExampleGridColumns';
import content from '@via-profit/ui-kit/docs/grid/README.md';

const GridOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleGridAuto, ExampleGridColumns }}>{content}</RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default GridOverview;
