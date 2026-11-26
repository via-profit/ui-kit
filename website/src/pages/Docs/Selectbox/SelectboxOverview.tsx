import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSelectboxOverview from '~/examples/selectbox/ExampleSelectboxOverview';
import ExampleSelectboxMultiple from '~/examples/selectbox/ExampleSelectboxMultiple';
import ExampleSelectboxStates from '~/examples/selectbox/ExampleSelectboxStates';
import ExampleSelectboxOverrides from '~/examples/selectbox/ExampleSelectboxOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const SelectboxOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSelectboxOverview,
      ExampleSelectboxMultiple,
      ExampleSelectboxStates,
      ExampleSelectboxOverrides,
    }}
  />
);

export default SelectboxOverview;
