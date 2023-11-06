import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/badge/README.md';
import ExampleBadgeOverview from '~/examples/badge/ExampleBadgeOverview';

const BadgeOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleBadgeOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default BadgeOverview;
