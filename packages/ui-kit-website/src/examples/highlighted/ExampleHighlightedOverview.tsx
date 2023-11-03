import React from 'react';

import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Surface from '@via-profit/ui-kit/src/Surface';

const ExampleHighlightedOverview: React.FC = () => (
  <Surface inline>
    <Highlighted
      text="Chocolate Starfish and the Hot Dog Flavored Water"
      highlight={['hot', 'starfish']}
    />
  </Surface>
);

export default ExampleHighlightedOverview;
