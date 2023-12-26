import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';

import TableOfContent from '~/components/TableOfContent';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/menu/README.md';
import ExampleMenuOverview from '~/examples/menu/ExampleMenuOverview';
import ExampleMenuMultiple from '~/examples/menu/ExampleMenuMultiple';
import ExampleMenuAPI from '~/examples/menu/ExampleMenuAPI';
import ExampleMenuAnchorPos from '~/examples/menu/ExampleMenuAnchorPos';

const MenuOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleMenuOverview,
          ExampleMenuMultiple,
          ExampleMenuAPI,
          ExampleMenuAnchorPos,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default MenuOverview;
