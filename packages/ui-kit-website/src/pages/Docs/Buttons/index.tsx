import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleButtonBasic from '~/examples/buttons/ExampleButtonBasic';
import ExampleButtonVariants from '~/examples/buttons/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/buttons/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/buttons/ExampleButtonOverrides';
import ExampleButtonIcons from '~/examples/buttons/ExampleButtonIcons';
import content from '~/docs/buttons/intruduction.md';

const Buttons: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleButtonBasic,
        ExampleButtonVariants,
        ExampleButtonColors,
        ExampleButtonOverrides,
        ExampleButtonIcons,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Buttons;
