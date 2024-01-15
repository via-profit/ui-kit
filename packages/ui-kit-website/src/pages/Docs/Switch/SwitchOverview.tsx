import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSwitchBasic from '~/examples/switch/ExampleSwitchBasic';
import ExampleButtonVariants from '~/examples/switch/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/switch/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/switch/ExampleButtonOverrides';
import ExampleButtonIcons from '~/examples/switch/ExampleButtonIcons';
import content from '@via-profit/ui-kit/docs/switch/README.md';

const SwitchOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleSwitchBasic,
          ExampleButtonVariants,
          ExampleButtonColors,
          ExampleButtonOverrides,
          ExampleButtonIcons,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default SwitchOverview;
