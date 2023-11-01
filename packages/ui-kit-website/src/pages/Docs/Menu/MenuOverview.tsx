import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';

import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/menu/README.md';
import ExampleMenuOverview from '~/examples/menu/ExampleMenuOverview';
import ExampleMenuAPI from '~/examples/menu/ExampleMenuAPI';

const MenuOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleMenuOverview,
        ExampleMenuAPI,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default MenuOverview;
