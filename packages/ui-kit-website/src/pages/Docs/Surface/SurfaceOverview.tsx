import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/surface/README.md';

const SurfaceOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{}}>{content}</RenderMarkdown>
  </Surface>
);

export default SurfaceOverview;
