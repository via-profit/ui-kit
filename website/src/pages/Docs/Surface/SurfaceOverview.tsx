import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleSurfaceBasic from '~/examples/surface/ExampleSurfaceBasic';
import ExampleSurfaceCard from '~/examples/surface/ExampleSurfaceCard';
import ExampleSurfaceVariants from '~/examples/surface/ExampleSurfaceVariants';
import ExampleSurfaceOverrides from '~/examples/surface/ExampleSurfaceOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const SurfaceOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleSurfaceBasic,
      ExampleSurfaceCard,
      ExampleSurfaceVariants,
      ExampleSurfaceOverrides,
    }}
  />
);

export default SurfaceOverview;
