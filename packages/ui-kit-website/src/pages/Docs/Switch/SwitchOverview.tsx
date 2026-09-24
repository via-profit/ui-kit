import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleSwitchBasic from '~/examples/switch/ExampleSwitchBasic';
import ExampleSwitchLabel from '~/examples/switch/ExampleSwitchLabel';
import ExampleSwitchColors from '~/examples/switch/ExampleSwitchColors';
import ExampleSwitchOverrides from '~/examples/switch/ExampleSwitchOverrides';
import ExampleSwitchLabelPlacement from '~/examples/switch/ExampleSwitchLabelPlacement';
import ExampleSwitchControlled from '~/examples/switch/ExampleSwitchControlled';
import content from '@via-profit/ui-kit/docs/switch/README.md';

const SwitchOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleSwitchBasic,
          ExampleSwitchLabel,
          ExampleSwitchColors,
          ExampleSwitchOverrides,
          ExampleSwitchControlled,
          ExampleSwitchLabelPlacement,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default SwitchOverview;
