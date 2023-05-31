import React from 'react';

import RenderMarkdown from '~/components/RenderMarkdown';
import ButtonStandard from '~/examples/buttons/ButtonStandard';
import content from '~/docs/buttons/Intruduction.md';

const Buttons: React.FC = () => (
  <RenderMarkdown
    overrides={{
      ButtonStandard,
    }}
  >
    {content}
  </RenderMarkdown>
);

export default Buttons;
