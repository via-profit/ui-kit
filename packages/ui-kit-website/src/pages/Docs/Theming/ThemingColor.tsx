import React from 'react';

import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/color/README.md';
import ExampleColorBasic from '~/examples/color/ExampleColorBasic';
import TableOfContent from '~/components/TableOfContent';

const ThemingColor: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleColorBasic }}>{content}</RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ThemingColor;
