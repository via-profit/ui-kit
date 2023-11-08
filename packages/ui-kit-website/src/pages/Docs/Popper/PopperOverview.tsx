import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/popper/README.md';
import ExamplePopperOverview from '~/examples/popper/ExamplePopperOverview';
import ExamplePopperAnchorPos from '~/examples/popper/ExamplePopperAnchorPos';
import ExamplePopperOutsideClick from '~/examples/popper/ExamplePopperOutsideClick';
import ExamplePopperModal from '~/examples/popper/ExamplePopperModal';

const PopperOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExamplePopperOverview,
        ExamplePopperAnchorPos,
        ExamplePopperOutsideClick,
        ExamplePopperModal,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default PopperOverview;
