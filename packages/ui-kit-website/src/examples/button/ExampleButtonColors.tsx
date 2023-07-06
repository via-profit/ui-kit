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

const ExampleButtonColors: React.FC = () => (
  <>
    <ButtonGroup>
      <Button type="button" variant="standard" color="default">
        Standard default
      </Button>
      <Button type="button" variant="standard" color="primary">
        Standard primary
      </Button>
      <Button type="button" variant="standard" color="secondary">
        Standard secondary
      </Button>
      <Button type="button" variant="standard" color="#308dfc">
        Standard #308dfc
      </Button>
      <Button type="button" variant="standard" color="lightpink">
        Standard lightpink
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="button" variant="outlined" color="default">
        Outlined default
      </Button>
      <Button type="button" variant="outlined" color="primary">
        Outlined primary
      </Button>
      <Button type="button" variant="outlined" color="secondary">
        Outlined secondary
      </Button>
      <Button type="button" variant="outlined" color="#308dfc">
        Outlined #308dfc
      </Button>
      <Button type="button" variant="outlined" color="lightpink">
        Outlined lightpink
      </Button>
    </ButtonGroup>
  </>
);

export default ExampleButtonColors;
