import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleClickOutsideOverview from '~/examples/click-outside/ExampleClickOutsideOverview';

/**
 * The page of the component: the documentation with the live examples
 */
const BadgeOverview: React.FC<DocPageProps> = props => (
  <DocPage {...props} overrides={{ ExampleClickOutsideOverview }} />
);

export default BadgeOverview;
