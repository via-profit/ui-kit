import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTextFieldOverview from '~/examples/text-fields/ExampleTextFieldOverview';
import ExampleTextFieldOverrides from '~/examples/text-fields/ExampleTextFieldOverrides';
import ExampleTextFieldIcons from '~/examples/text-fields/ExampleTextFieldIcons';
import content from '~/docs/text-fields/introduction.md';

const TextFields: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleTextFieldOverview,
        ExampleTextFieldOverrides,
        ExampleTextFieldIcons,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default TextFields;
