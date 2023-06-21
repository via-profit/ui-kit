import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleOverview from '~/examples/text-fields/Overview';
import ExampleOverrides from '~/examples/text-fields/Overrides';
import content from '~/docs/text-fields/introduction.md';

const TextFields: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleOverview,
        ExampleOverrides,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default TextFields;
