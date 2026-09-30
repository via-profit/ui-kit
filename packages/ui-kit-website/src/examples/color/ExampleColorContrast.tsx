import React from 'react';
import styled from '@emotion/styled';
import Color from '@via-profit/ui-kit/src/Color';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Label = styled.span`
  padding: 0.6em 0.9em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  font-size: 0.9em;
`;

const colors = ['orange', 'gold', '#3498db', 'crimson', 'seagreen', 'navy', 'lavender'];

const ExampleColorContrast: React.FC = () => (
  <Row>
    {colors.map(name => {
      const background = Color.fromString(name);
      const text = background.getContrastColor();

      return (
        <Label
          key={name}
          style={{ backgroundColor: background.toString(), color: text.toString() }}
        >
          {name} · {background.getContrast(text).toFixed(1)}:1
        </Label>
      );
    })}
  </Row>
);

export default ExampleColorContrast;
