import React from 'react';
import Surface from '@via-profit/ui-kit/src/Surface';
import Typography from '@via-profit/ui-kit/src/Typography';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';

const ExampleSurfaceCard: React.FC = () => (
  <Surface
    subheader="Yekaterinburg"
    header={
      <>
        <Flag /> Russian Federation
      </>
    }
  >
    <Typography>
      Nostrud sunt qui esse aute cupidatat ullamco.
      <br /> Pariatur et commodo aute commodo cupidatat amet aliqua non cillum commodo ad eu nulla
      aliqua.
      <br />
      Consequat duis ipsum duis sit ea.
    </Typography>
  </Surface>
);

export default ExampleSurfaceCard;
