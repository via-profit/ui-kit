import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/highlighted/README.md';
import ExampleHighlightedOverview from '~/examples/highlighted/ExampleHighlightedOverview';
import ExampleHighlightedOverrides from '~/examples/highlighted/ExampleHighlightedOverrides';

const CountryFlagsOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleHighlightedOverview, ExampleHighlightedOverrides }}>
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default CountryFlagsOverview;
