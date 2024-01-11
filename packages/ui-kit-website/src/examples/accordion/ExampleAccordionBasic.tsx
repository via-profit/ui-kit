import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionBasic: React.FC = () => (
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
    Some content
  </Accordion>
);

export default ExampleAccordionBasic;
