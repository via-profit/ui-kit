import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/avatar/README.md';
import ExampleAvatarOverview from '~/examples/avatar/ExampleAvatarOverview';
import ExampleAvatarVariants from '~/examples/avatar/ExampleAvatarVariants';
import ExampleAvatarColors from '~/examples/avatar/ExampleAvatarColors';
import ExampleAvatarIcons from '~/examples/avatar/ExampleAvatarIcons';
import ExampleAvatarOverrides from '~/examples/avatar/ExampleAvatarOverrides';

const AvatarOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown
      overrides={{
        ExampleAvatarOverview,
        ExampleAvatarVariants,
        ExampleAvatarColors,
        ExampleAvatarIcons,
        ExampleAvatarOverrides,
      }}
    >
      {content}
    </RenderMarkdown>
  </Surface>
);

export default AvatarOverview;
