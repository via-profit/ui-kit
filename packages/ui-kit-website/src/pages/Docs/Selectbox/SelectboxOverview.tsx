import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/selectbox/README.md';
import ExampleSelectboxOverview from '~/examples/selectbox/ExampleSelectboxOverview';
import ExampleSelectboxMultiple from '~/examples/selectbox/ExampleSelectboxMultiple';

const SelectboxOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleSelectboxOverview,
          ExampleSelectboxMultiple,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default SelectboxOverview;
