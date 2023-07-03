import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '~/docs/theming/intruduction.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';

const Theming: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleThemeProvider, ExampleMultiThemming }}>
      {content}
    </RenderMarkdown>
  </Surface>
);

export default Theming;
