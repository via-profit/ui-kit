import React from 'react';

import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleOverview from '~/examples/text-fields/Overview';
import content from '~/docs/text-fields/introduction.md';

const TextFields: React.FC = () => (
  <RenderMarkdown
    overrides={{
      ExampleOverview,
    }}
  >
    {content}
  </RenderMarkdown>
);

export default TextFields;
