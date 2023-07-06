import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/table/overview.md';
import ExampleTableBasic from '~/examples/table/ExampleTableBasic';

const Tables: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleTableBasic,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Tables;
