import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleColorBasic from '~/examples/color/ExampleColorBasic';
import ExampleColorContrast from '~/examples/color/ExampleColorContrast';
import ExampleColorGenerator from '~/examples/color/ExampleColorGenerator';

/**
 * The page of the component: the documentation with the live examples
 */
const ThemingColor: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleColorBasic,
      ExampleColorContrast,
      ExampleColorGenerator,
    }}
  />
);

export default ThemingColor;
