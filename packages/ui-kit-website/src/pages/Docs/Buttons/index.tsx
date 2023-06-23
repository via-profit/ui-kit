import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleButtonBasic from '~/examples/buttons/ExampleButtonBasic';
import ExampleButtonVariants from '~/examples/buttons/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/buttons/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/buttons/ExampleButtonOverrides';
import content from '~/docs/buttons/Intruduction.md';

const Buttons: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleButtonBasic,
        ExampleButtonVariants,
        ExampleButtonColors,
        ExampleButtonOverrides,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Buttons;
