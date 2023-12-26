import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/table/README.md';
import ExampleTableBasic from '~/examples/table/ExampleTableBasic';

const Tables: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleTableBasic,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default Tables;
