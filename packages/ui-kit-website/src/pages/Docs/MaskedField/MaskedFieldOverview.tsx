import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/masked-field/overview.md';
import ExampleMaskedFieldBasic from '~/examples/masked-field/ExampleMaskedFieldBasic';

const MaskedFieldOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleMaskedFieldBasic }}>{content}</RenderMarkdown>
  </Surface>
);

export default MaskedFieldOverview;
