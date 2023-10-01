import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/theming/color.md';
import ExampleColorBasic from '~/examples/color/ExampleColorBasic';

const ThemingColor: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleColorBasic }}>{content}</RenderMarkdown>
  </Surface>
);

export default ThemingColor;
