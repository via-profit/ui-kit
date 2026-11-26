import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTabsBasic from '~/examples/tabs/ExampleTabsBasic';
import ExampleTabsControlled from '~/examples/tabs/ExampleTabsControlled';
import ExampleTabsVertical from '~/examples/tabs/ExampleTabsVertical';
import ExampleTabsScroll from '~/examples/tabs/ExampleTabsScroll';
import ExampleTabsStyled from '~/examples/tabs/ExampleTabsStyled';
import ExampleTabsVariants from '~/examples/tabs/ExampleTabsVariants';

/**
 * The page of the component: the documentation with the live examples
 */
const TabsOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTabsBasic,
      ExampleTabsControlled,
      ExampleTabsVertical,
      ExampleTabsScroll,
      ExampleTabsStyled,
      ExampleTabsVariants,
    }}
  />
);

export default TabsOverview;
