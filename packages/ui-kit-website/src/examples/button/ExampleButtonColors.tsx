import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: 0.5em 1em;
  align-items: center;
`;

const colors = ['default', 'primary', 'secondary', '#e0435f', 'lightpink'];
const variants = ['standard', 'outlined', 'plain'] as const;

const ExampleButtonColors: React.FC = () => (
  <Grid>
    {colors.map(color =>
      variants.map(variant => (
        <Button key={`${color}-${variant}`} variant={variant} color={color}>
          {color}
        </Button>
      )),
    )}
  </Grid>
);

export default ExampleButtonColors;
