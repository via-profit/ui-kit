import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/click-outside/README.md';
import ExampleClickOutsideOverview from '~/examples/click-outside/ExampleClickOutsideOverview';

const BadgeOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleClickOutsideOverview,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default BadgeOverview;
