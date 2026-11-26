import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleAvatarOverview from '~/examples/avatar/ExampleAvatarOverview';
import ExampleAvatarOnline from '~/examples/avatar/ExampleAvatarOnline';
import ExampleAvatarVariants from '~/examples/avatar/ExampleAvatarVariants';
import ExampleAvatarColors from '~/examples/avatar/ExampleAvatarColors';
import ExampleAvatarSize from '~/examples/avatar/ExampleAvatarSize';
import ExampleAvatarClickable from '~/examples/avatar/ExampleAvatarClickable';
import ExampleAvatarOverrides from '~/examples/avatar/ExampleAvatarOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const AvatarOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleAvatarOverview,
      ExampleAvatarOnline,
      ExampleAvatarVariants,
      ExampleAvatarColors,
      ExampleAvatarSize,
      ExampleAvatarClickable,
      ExampleAvatarOverrides,
    }}
  />
);

export default AvatarOverview;
