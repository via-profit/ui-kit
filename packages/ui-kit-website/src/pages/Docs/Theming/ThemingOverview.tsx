import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/README.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';

const ThemingOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleThemeProvider, ExampleMultiThemming }}>
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default ThemingOverview;
