import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSelectBoxOverview from '~/examples/selectbox/ExampleSelectBoxOverview';
import content from '@via-profit/ui-kit/docs/selectbox/README.md';

const Buttons: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleSelectBoxOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Buttons;
