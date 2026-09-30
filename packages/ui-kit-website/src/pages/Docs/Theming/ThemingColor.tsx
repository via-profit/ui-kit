import React from 'react';

import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/color/README.md';
import ExampleColorBasic from '~/examples/color/ExampleColorBasic';
import ExampleColorContrast from '~/examples/color/ExampleColorContrast';
import ExampleColorGenerator from '~/examples/color/ExampleColorGenerator';
import TableOfContent from '~/components/TableOfContent';

const ThemingColor: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{ ExampleColorBasic, ExampleColorContrast, ExampleColorGenerator }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ThemingColor;
