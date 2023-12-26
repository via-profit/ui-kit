import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/color/README.md';
import ExampleColorBasic from '~/examples/color/ExampleColorBasic';
import TableOfContent from '~/components/TableOfContent';

const ThemingColor: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleColorBasic }}>{content}</RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default ThemingColor;
