import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleEmptyStateBasic from '~/examples/empty-state/ExampleEmptyStateBasic';
import ExampleEmptyStateAction from '~/examples/empty-state/ExampleEmptyStateAction';
import ExampleEmptyStateIcon from '~/examples/empty-state/ExampleEmptyStateIcon';
import ExampleEmptyStateOverrides from '~/examples/empty-state/ExampleEmptyStateOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const EmptyStateOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleEmptyStateBasic,
      ExampleEmptyStateAction,
      ExampleEmptyStateIcon,
      ExampleEmptyStateOverrides,
    }}
  />
);

export default EmptyStateOverview;
