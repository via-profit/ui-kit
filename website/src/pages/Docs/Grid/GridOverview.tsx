import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleGridAuto from '~/examples/grid/ExampleGridAuto';
import ExampleGridColumns from '~/examples/grid/ExampleGridColumns';

/**
 * The page of the component: the documentation with the live examples
 */
const GridOverview: React.FC<DocPageProps> = props => (
  <DocPage {...props} overrides={{ ExampleGridAuto, ExampleGridColumns }} />
);

export default GridOverview;
