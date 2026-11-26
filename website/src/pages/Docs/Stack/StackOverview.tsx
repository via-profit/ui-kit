import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleStackBasic from '~/examples/stack/ExampleStackBasic';
import ExampleStackRow from '~/examples/stack/ExampleStackRow';
import ExampleStackSpacing from '~/examples/stack/ExampleStackSpacing';

/**
 * The page of the component: the documentation with the live examples
 */
const StackOverview: React.FC<DocPageProps> = props => (
  <DocPage {...props} overrides={{ ExampleStackBasic, ExampleStackRow, ExampleStackSpacing }} />
);

export default StackOverview;
