import React from 'react';
import styled from '@emotion/styled';
import Switch from '@via-profit/ui-kit/src/Switch';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em;
`;

const colors = ['primary', 'secondary', '#308dfc', 'lightpink'];

const ExampleSwitchColors: React.FC = () => (
  <Row>
    {colors.map(color => (
      <Switch key={color} defaultChecked color={color}>
        {color}
      </Switch>
    ))}
  </Row>
);

export default ExampleSwitchColors;
