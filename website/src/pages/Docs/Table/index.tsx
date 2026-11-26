import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTableBasic from '~/examples/table/ExampleTableBasic';
import ExampleTableRowHeaders from '~/examples/table/ExampleTableRowHeaders';
import ExampleTableScroll from '~/examples/table/ExampleTableScroll';
import ExampleTableStyled from '~/examples/table/ExampleTableStyled';

/**
 * The page of the component: the documentation with the live examples
 */
const Tables: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTableBasic,
      ExampleTableRowHeaders,
      ExampleTableScroll,
      ExampleTableStyled,
    }}
  />
);

export default Tables;
