import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import styled from '@emotion/styled';

const ButtonGroup = styled.div`
  & button {
    margin: 0 0.4em 0.4em 0%;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;

const ExampleButtonVariants: React.FC = () => (
  <ButtonGroup>
    <Button type="button" variant="standard">
      Standard
    </Button>
    <Button type="button" variant="outlined">
      Outlined
    </Button>
    <Button type="button" variant="plain">
      plain
    </Button>
  </ButtonGroup>
);

export default ExampleButtonVariants;
