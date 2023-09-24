import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleModalDrawerOverview from '~/examples/modal/ExampleModalDrawerOverview';
import ExampleModalOverview from '~/examples/modal/ExampleModalOverview';
import ExampleConfirmBox from '~/examples/modal/ExampleConfirmBox';
import ExampleMeesageBox from '~/examples/modal/ExampleMeesageBox';
import content from '@via-profit/ui-kit/docs/modal/README.md';

const ModalOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleModalDrawerOverview,
        ExampleModalOverview,
        ExampleConfirmBox,
        ExampleMeesageBox,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default ModalOverview;
