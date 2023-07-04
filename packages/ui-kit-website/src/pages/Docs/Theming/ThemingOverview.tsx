import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/overview.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';

const ThemingOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleThemeProvider, ExampleMultiThemming }}>
      {content}
    </RenderMarkdown>
  </Surface>
);

export default ThemingOverview;
