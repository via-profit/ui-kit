import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleEmptyStateBasic from '~/examples/empty-state/ExampleEmptyStateBasic';
import ExampleEmptyStateAction from '~/examples/empty-state/ExampleEmptyStateAction';
import ExampleEmptyStateIcon from '~/examples/empty-state/ExampleEmptyStateIcon';
import ExampleEmptyStateOverrides from '~/examples/empty-state/ExampleEmptyStateOverrides';
import content from '@via-profit/ui-kit/docs/empty-state/README.md';

const EmptyStateOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleEmptyStateBasic,
          ExampleEmptyStateAction,
          ExampleEmptyStateIcon,
          ExampleEmptyStateOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default EmptyStateOverview;
