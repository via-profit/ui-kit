import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSurfaceBasic from '~/examples/surface/ExampleSurfaceBasic';
import ExampleSurfaceCard from '~/examples/surface/ExampleSurfaceCard';
import ExampleSurfaceVariants from '~/examples/surface/ExampleSurfaceVariants';
import ExampleSurfaceOverrides from '~/examples/surface/ExampleSurfaceOverrides';
import content from '@via-profit/ui-kit/docs/surface/README.md';

const SurfaceOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleSurfaceBasic,
          ExampleSurfaceCard,
          ExampleSurfaceVariants,
          ExampleSurfaceOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SurfaceOverview;
