import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0.5em 1em;
  align-items: center;
`;

const colors = ['default', 'primary', 'secondary', 'lightpink', '#529d29'];

const ExampleBadgeColors: React.FC = () => (
  <Grid>
    {colors.map(color => (
      <React.Fragment key={color}>
        <Badge variant="standard" color={color}>
          {color}
        </Badge>
        <Badge variant="outlined" color={color}>
          {color}
        </Badge>
      </React.Fragment>
    ))}
  </Grid>
);

export default ExampleBadgeColors;
