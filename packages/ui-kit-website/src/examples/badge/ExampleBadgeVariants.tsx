import React from 'react';
import styled from '@emotion/styled';
import Badge from '@via-profit/ui-kit/src/Badge';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleBadgeVariants: React.FC = () => (
  <Group>
    <Badge variant="standard">standard</Badge>
    <Badge variant="outlined">outlined</Badge>
  </Group>
);

export default ExampleBadgeVariants;
