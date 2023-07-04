import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/color.md';

const ThemingColor: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{}}>{content}</RenderMarkdown>
  </Surface>
);

export default ThemingColor;
