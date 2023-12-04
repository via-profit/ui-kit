import React from 'react';

import TextField from '@via-profit/ui-kit/src/TextField';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Surface from '@via-profit/ui-kit/src/Surface';

const ExampleHighlightedOverview: React.FC = () => {
  const [value, setValue] = React.useState('Starfish hot water');

  return (
    <Surface inline>
      <TextField
        fullWidth
        label="Type the «Chocolate Starfish and the Hot Dog Flavored Water»"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
      />
      <Highlighted
        text="Chocolate Starfish and the Hot Dog Flavored Water"
        highlight={value.split(' ')}
      />
    </Surface>
  );
};

export default ExampleHighlightedOverview;
