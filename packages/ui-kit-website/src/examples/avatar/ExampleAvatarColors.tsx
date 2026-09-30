import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleAvatarColors: React.FC = () => (
  <Group>
    <Avatar>D</Avatar>
    <Avatar color="primary">P</Avatar>
    <Avatar color="secondary">S</Avatar>
    <Avatar color="lightpink">LP</Avatar>
    <Avatar color="#529d29">G</Avatar>
    <Avatar color="rgb(40, 40, 90)">R</Avatar>
  </Group>
);

export default ExampleAvatarColors;
