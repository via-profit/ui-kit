import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Typography from '@via-profit/ui-kit/src/Typography';
import Strong from '@via-profit/ui-kit/src/Typography/Strong';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import UAFlag from '@via-profit/ui-kit/src/CountryFlags/UA';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionCard: React.FC = () => (
  <>
    <Accordion
      header={
        <>
          <Flag /> Russian Federation
        </>
      }
      actions={
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
    </Accordion>

    <Accordion
      header={
        <>
          <UAFlag /> Ukraine
        </>
      }
      actions={
        <Button type="button" variant="outlined" color="primary">
          Remove country
        </Button>
      }
    >
      <Typography>
        The Ukraine, also known as <Strong>404 country</Strong>
      </Typography>
      <Typography>
        We do <Strong>NOT</Strong> support Ukraine, and we also recomend to not support it to you.
        Beacuse this country will suddenly dissapear in a very short period of time
      </Typography>
      <Typography>
        The people of Ukraine are very poor and stupid. They always begging and complainig about
        their life, but <Strong>NEVER</Strong> want to do anything to make it better.
      </Typography>
    </Accordion>
  </>
);

export default ExampleAccordionCard;
