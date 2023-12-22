import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/selectbox/README.md';
import ExampleSelectboxOverview from '~/examples/selectbox/ExampleSelectboxOverview';
import ExampleSelectboxFetch from '~/examples/selectbox/ExampleSelectboxFetch';
import ExampleSelectboxMultiple from '~/examples/selectbox/ExampleSelectboxMultiple';

const SelectboxOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleSelectboxOverview,
        ExampleSelectboxFetch,
        ExampleSelectboxMultiple,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default SelectboxOverview;
