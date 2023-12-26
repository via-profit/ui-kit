import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/typography/README.md';
import ExampleTypographyOverview from '~/examples/typography/ExampleTypographyOverview';

const TypographyOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleTypographyOverview }}>{content}</RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default TypographyOverview;
