import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleBadgeOverview from '~/examples/badge/ExampleBadgeOverview';
import ExampleBadgeVariants from '~/examples/badge/ExampleBadgeVariants';
import ExampleBadgeColors from '~/examples/badge/ExampleBadgeColors';
import ExampleBadgeIcons from '~/examples/badge/ExampleBadgeIcons';
import ExampleBadgeClickable from '~/examples/badge/ExampleBadgeClickable';
import ExampleBadgeOverrides from '~/examples/badge/ExampleBadgeOverrides';
import ExampleBadgeStatus from '~/examples/badge/ExampleBadgeStatus';

/**
 * The page of the component: the documentation with the live examples
 */
const BadgeOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleBadgeOverview,
      ExampleBadgeVariants,
      ExampleBadgeColors,
      ExampleBadgeIcons,
      ExampleBadgeClickable,
      ExampleBadgeOverrides,
      ExampleBadgeStatus,
    }}
  />
);

export default BadgeOverview;
