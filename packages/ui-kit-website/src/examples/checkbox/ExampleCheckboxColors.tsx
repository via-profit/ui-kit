import React from 'react';
import styled from '@emotion/styled';
import Checkbox from '@via-profit/ui-kit/src/Checkbox';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5em;
`;

const colors = ['primary', 'secondary', '#308dfc', 'lightpink'];

const ExampleCheckboxColors: React.FC = () => (
  <Row>
    {colors.map(color => (
      <Checkbox key={color} defaultChecked color={color}>
        {color}
      </Checkbox>
    ))}
  </Row>
);

export default ExampleCheckboxColors;
