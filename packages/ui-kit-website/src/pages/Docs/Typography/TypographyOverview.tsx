import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/typography/README.md';
import ExampleTypographyOverview from '~/examples/typography/ExampleTypographyOverview';

const TypographyOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleTypographyOverview }}>{content}</RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TypographyOverview;
