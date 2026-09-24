import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/badge/README.md';
import ExampleBadgeOverview from '~/examples/badge/ExampleBadgeOverview';
import ExampleBadgeVariants from '~/examples/badge/ExampleBadgeVariants';
import ExampleBadgeColors from '~/examples/badge/ExampleBadgeColors';
import ExampleBadgeIcons from '~/examples/badge/ExampleBadgeIcons';
import ExampleBadgeOverrides from '~/examples/badge/ExampleBadgeOverrides';

const BadgeOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleBadgeOverview,
          ExampleBadgeVariants,
          ExampleBadgeColors,
          ExampleBadgeIcons,
          ExampleBadgeOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default BadgeOverview;
