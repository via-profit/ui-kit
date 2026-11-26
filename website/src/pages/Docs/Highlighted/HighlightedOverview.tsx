import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleHighlightedOverview from '~/examples/highlighted/ExampleHighlightedOverview';
import ExampleHighlightedOverrides from '~/examples/highlighted/ExampleHighlightedOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const HighlightedOverview: React.FC<DocPageProps> = props => (
  <DocPage {...props} overrides={{ ExampleHighlightedOverview, ExampleHighlightedOverrides }} />
);

export default HighlightedOverview;
