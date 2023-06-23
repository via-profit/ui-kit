import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '~/docs/tables/intruduction.md';
import ExampleTableBasic from '~/examples/tables/ExampleTableBasic';

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
