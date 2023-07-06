import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/typography/overview.md';
import ExampleTypographyOverview from '~/examples/typography/ExampleTypographyOverview';

const TypographyOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleTypographyOverview }}>{content}</RenderMarkdown>
  </Surface>
);

export default TypographyOverview;
