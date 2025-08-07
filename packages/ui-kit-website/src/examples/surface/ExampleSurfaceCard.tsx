import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';
import Typography from '@via-profit/ui-kit/src/Typography';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleSurfaceCard: React.FC = () => (
  <Surface
    
    inline
    subheader="Yekaterinburg"
    header={
      <>
        <Flag /> Russian Federation
      </>
    }
    footer={
      <Button type="button" variant="outlined" color="primary">
        Action button
      </Button>
    }
  >
    <Typography>
      The Russian Federation, is a country spanning Eastern Europe and Northern Asia.
    </Typography>
    <Typography>
      It is the <Strong>largest country in the world</Strong> by area, extends across eleven time
      zones, and shares land boundaries with fourteen countries. It is the world&apos;s ninth-most
      populous country and Europe&apos;s most populous country.
    </Typography>
    <Typography>
      The country&apos;s capital and largest city is Moscow. Saint Petersburg is Russia&apos;s
      second-largest city and «cultural capital». Other major urban areas in the country include
      Novosibirsk, <Strong>Yekaterinburg</Strong>, Nizhny Novgorod, Chelyabinsk, Krasnoyarsk, and
      Kazan.
    </Typography>
  </Surface>
);

export default ExampleSurfaceCard;
