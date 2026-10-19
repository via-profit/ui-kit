import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSkeletonBasic from '~/examples/skeleton/ExampleSkeletonBasic';
import ExampleSkeletonVariants from '~/examples/skeleton/ExampleSkeletonVariants';
import ExampleSkeletonList from '~/examples/skeleton/ExampleSkeletonList';
import content from '@via-profit/ui-kit/docs/skeleton/README.md';

const SkeletonOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{ ExampleSkeletonBasic, ExampleSkeletonVariants, ExampleSkeletonList }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SkeletonOverview;
