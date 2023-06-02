import React from 'react';

import RenderMarkdown from '~/components/RenderMarkdown';
import content from '~/docs/buttons/Intruduction.md';
import ExampleButtonStandard from '~/examples/buttons/ButtonStandard';
import ExampleOverview from '~/examples/buttons/ExampleOverview';

const Buttons: React.FC = () => (
  <RenderMarkdown
    overrides={{
      ExampleButtonStandard,
      ExampleOverview,
    }}
  >
    {content}
  </RenderMarkdown>
);

export default Buttons;
