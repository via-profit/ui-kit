import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Typography from '@via-profit/ui-kit/src/Typography';
import Flag from '@via-profit/ui-kit/src/CountryFlags/RU';
import BYFlag from '@via-profit/ui-kit/src/CountryFlags/BY';
import UZFlag from '@via-profit/ui-kit/src/CountryFlags/UZ';
import Button from '@via-profit/ui-kit/src/Button';

const ExampleAccordionControlled: React.FC = () => {
  const [open, setOpen] = React.useState<string | null>(null);

  const items = ['one', 'two', 'three'];

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpen(items[Math.floor(Math.random() * items.length)]);
        }}
      >
        Open Random
      </Button>
      <Accordion
        header={
          <>
            <Flag /> Russian Federation
          </>
        }
        isOpen={open === 'one'}
        onOpen={() => setOpen(open !== 'one' ? 'one' : null)}
      >
        <Typography>The Russian Federation</Typography>
      </Accordion>

      <Accordion
        header={
          <>
            <UZFlag /> Uzbekistan
          </>
        }
        isOpen={open === 'two'}
        onOpen={() => setOpen(open !== 'two' ? 'two' : null)}
      >
        <Typography>The Uzbekistan</Typography>
      </Accordion>

      <Accordion
        header={
          <>
            <BYFlag /> Belarus
          </>
        }
        isOpen={open === 'three'}
        onOpen={() => setOpen(open !== 'three' ? 'three' : null)}
      >
        <Typography>The Belarus</Typography>
      </Accordion>
    </>
  );
};

export default ExampleAccordionControlled;
