import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/click-outside/README.md';
import ExampleClickOutsideOverview from '~/examples/click-outside/ExampleClickOutsideOverview';

const BadgeOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleClickOutsideOverview,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default BadgeOverview;
