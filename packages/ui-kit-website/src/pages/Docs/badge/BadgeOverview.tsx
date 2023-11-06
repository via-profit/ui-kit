import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/badge/README.md';
import ExampleBadgeOverview from '~/examples/badge/ExampleBadgeOverview';
import ExampleBadgeVariants from '~/examples/badge/ExampleBadgeVariants';
import ExampleBadgeColors from '~/examples/badge/ExampleBadgeColors';
import ExampleBadgeIcons from '~/examples/badge/ExampleBadgeIcons';

const BadgeOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleBadgeOverview,
        ExampleBadgeVariants,
        ExampleBadgeColors,
        ExampleBadgeIcons,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default BadgeOverview;
