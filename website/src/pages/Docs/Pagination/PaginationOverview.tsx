import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExamplePaginationBasic from '~/examples/pagination/ExamplePaginationBasic';
import ExamplePaginationRange from '~/examples/pagination/ExamplePaginationRange';
import ExamplePaginationNavigation from '~/examples/pagination/ExamplePaginationNavigation';
import ExamplePaginationAppearance from '~/examples/pagination/ExamplePaginationAppearance';
import ExamplePaginationTable from '~/examples/pagination/ExamplePaginationTable';
import ExamplePaginationLinks from '~/examples/pagination/ExamplePaginationLinks';
import ExamplePaginationCustom from '~/examples/pagination/ExamplePaginationCustom';

/**
 * The page of the component: the documentation with the live examples
 */
const PaginationOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExamplePaginationBasic,
      ExamplePaginationRange,
      ExamplePaginationNavigation,
      ExamplePaginationAppearance,
      ExamplePaginationTable,
      ExamplePaginationLinks,
      ExamplePaginationCustom,
    }}
  />
);

export default PaginationOverview;
