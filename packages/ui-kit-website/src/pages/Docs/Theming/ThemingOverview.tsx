import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/README.md';
import ExampleThemeProvider from '~/examples/theming/ExampleThemeProvider';
import ExampleMultiThemming from '~/examples/theming/ExampleMultiThemming';

const ThemingOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleThemeProvider, ExampleMultiThemming }}>
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ThemingOverview;
