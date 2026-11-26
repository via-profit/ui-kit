import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleMenuOverview from '~/examples/menu/ExampleMenuOverview';
import ExampleMenuActions from '~/examples/menu/ExampleMenuActions';
import ExampleMenuMultiple from '~/examples/menu/ExampleMenuMultiple';
import ExampleMenuAPI from '~/examples/menu/ExampleMenuAPI';

/**
 * The page of the component: the documentation with the live examples
 */
const MenuOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleMenuOverview,
      ExampleMenuActions,
      ExampleMenuMultiple,
      ExampleMenuAPI,
    }}
  />
);

export default MenuOverview;
