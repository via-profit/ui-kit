import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleModalDrawerOverview from '~/examples/modal-drawer/ExampleModalDrawerOverview';
import content from '@via-profit/ui-kit/docs/modal/README.md';

const ModalOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleModalDrawerOverview,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default ModalOverview;
