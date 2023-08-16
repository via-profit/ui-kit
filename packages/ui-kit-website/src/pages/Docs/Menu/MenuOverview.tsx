import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';

import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/menu/README.md';
import ExampleMenuOverview from '~/examples/menu/ExampleMenuOverview';

const MenuOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleMenuOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default MenuOverview;
