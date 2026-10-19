import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/badge/README.md';
import ExampleBadgeOverview from '~/examples/badge/ExampleBadgeOverview';
import ExampleBadgeVariants from '~/examples/badge/ExampleBadgeVariants';
import ExampleBadgeColors from '~/examples/badge/ExampleBadgeColors';
import ExampleBadgeIcons from '~/examples/badge/ExampleBadgeIcons';
import ExampleBadgeClickable from '~/examples/badge/ExampleBadgeClickable';
import ExampleBadgeOverrides from '~/examples/badge/ExampleBadgeOverrides';
import ExampleBadgeStatus from '~/examples/badge/ExampleBadgeStatus';

const BadgeOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleBadgeOverview,
          ExampleBadgeVariants,
          ExampleBadgeColors,
          ExampleBadgeIcons,
          ExampleBadgeClickable,
          ExampleBadgeOverrides,
          ExampleBadgeStatus,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default BadgeOverview;
