import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonBase from '@via-profit/ui-kit/src/Button/ButtonBase';
import Surface from '@via-profit/ui-kit/src/Surface';
import styled from '@emotion/styled';

import IconBell from '~/components/Icons/IconBell';

const ButtonsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > button {
    margin: 0 1em 1em 0;
  }
  & > button:first-of-type {
    margin-left: 0;
  }
  & > button:last-of-type {
    margin-right: 0;
  }
`;

const ExampleOverview: React.FC = () => (
  <>
    <Surface header="Standard buttons" subheader="Lorem ipsum">
      <ButtonsGroup>
        <Button startIcon={<IconBell />}>Standard with Icon</Button>
        <Button>Standard</Button>
        <Button disabled>Standard disabled</Button>
        <Button color="primary">Standard primary</Button>
        <Button color="secondary">Standard primary</Button>
        <Button color="lime">Standard lime</Button>
        <Button color="blue">Standard blue</Button>
      </ButtonsGroup>
    </Surface>

    <Surface header="Outlined buttons" subheader="Lorem ipsum">
      <ButtonsGroup>
        <Button variant="outlined" startIcon={<IconBell />}>
          Outlined with Icon
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="outlined" disabled>
          Outlined disabled
        </Button>
        <Button variant="outlined" color="primary">
          Outlined primary
        </Button>
        <Button variant="outlined" color="secondary">
          Outlined primary
        </Button>
        <Button variant="outlined" color="lime">
          Outlined lime
        </Button>
        <Button variant="outlined" color="blue">
          Outlined blue
        </Button>
      </ButtonsGroup>
    </Surface>

    <Surface header="Base button">
      <ButtonsGroup>
        <ButtonBase startIcon={<IconBell />}>Base button with Start Icon</ButtonBase>
      </ButtonsGroup>
    </Surface>
  </>
);

export default ExampleOverview;
