import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Typography from '@via-profit/ui-kit/src/Typography';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import BYFlag from '@via-profit/ui-kit/src/CountryFlags/BY';
import UZFlag from '@via-profit/ui-kit/src/CountryFlags/UZ';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionMultiple: React.FC = () => (
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
      <Typography>The Russian Federation</Typography>
    </Accordion>

    <Accordion
      header={
        <>
          <UZFlag /> Uzbekistan
        </>
      }
      defaultOpened
      actions={
        <Button type="button" variant="outlined" color="primary">
          Action button
        </Button>
      }
    >
      <Typography>The Uzbekistan</Typography>
    </Accordion>

    <Accordion
      header={
        <>
          <BYFlag /> Belarus
        </>
      }
    >
      <Typography>The Belarus</Typography>
    </Accordion>
  </>
);

export default ExampleAccordionMultiple;
