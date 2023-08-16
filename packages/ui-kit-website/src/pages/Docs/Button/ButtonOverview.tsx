import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleButtonBasic from '~/examples/button/ExampleButtonBasic';
import ExampleButtonVariants from '~/examples/button/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/button/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/button/ExampleButtonOverrides';
import ExampleButtonIcons from '~/examples/button/ExampleButtonIcons';
import content from '@via-profit/ui-kit/docs/button/README.md';

const ButtonOverview: React.FC = () => (
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

export default ButtonOverview;
