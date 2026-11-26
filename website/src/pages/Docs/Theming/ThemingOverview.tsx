import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';
import ExampleThemePalette from '~/examples/theming/ExampleThemePalette';

/**
 * The page of the component: the documentation with the live examples
 */
const ThemingOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleThemeProvider,
      ExampleMultiThemming,
      ExampleThemePalette,
    }}
  />
);

export default ThemingOverview;
