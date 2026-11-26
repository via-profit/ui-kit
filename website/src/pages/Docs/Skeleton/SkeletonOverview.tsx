import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSkeletonBasic from '~/examples/skeleton/ExampleSkeletonBasic';
import ExampleSkeletonVariants from '~/examples/skeleton/ExampleSkeletonVariants';
import ExampleSkeletonList from '~/examples/skeleton/ExampleSkeletonList';

/**
 * The page of the component: the documentation with the live examples
 */
const SkeletonOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSkeletonBasic,
      ExampleSkeletonVariants,
      ExampleSkeletonList,
    }}
  />
);

export default SkeletonOverview;
