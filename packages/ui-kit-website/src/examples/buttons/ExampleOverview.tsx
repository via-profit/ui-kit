import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import ButtonBase from '@via-profit/ui-kit/src/Button/ButtonBase';
import styled from '@emotion/styled';

import IconBell from '~/components/Icons/IconBell';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > button {
    margin: 01em;
  }
  & > button:first-of-type {
    margin-left: 0;
  }
  & > button:last-of-type {
    margin-right: 0;
  }
`;

const ExampleOverview: React.FC = () => (
  <Container>
    <ButtonBase startIcon={<IconBell />}>Base button with Start Icon</ButtonBase>
    <Button variant="standard">Standard</Button>
    <Button variant="standard" disabled>
      Standard disabled
    </Button>
    <Button variant="accent">Accent</Button>
    <Button variant="accent" disabled>
      Accent disabled
    </Button>
    <Button startIcon={<IconBell />}>With Start Icon</Button>
  </Container>
);

export default ExampleOverview;
