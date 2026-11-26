import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleLoadingIndicatorStatic from '~/examples/loading-indicator/ExampleLoadingIndicatorStatic';
import ExampleLoadingIndicatorButton from '~/examples/loading-indicator/ExampleLoadingIndicatorButton';
import ExampleLoadingIndicatorOverlay from '~/examples/loading-indicator/ExampleLoadingIndicatorOverlay';

/**
 * The page of the component: the documentation with the live examples
 */
const LoadingIndicator: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleLoadingIndicatorStatic,
      ExampleLoadingIndicatorButton,
      ExampleLoadingIndicatorOverlay,
    }}
  />
);

export default LoadingIndicator;
