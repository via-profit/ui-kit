import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const src = [{ srcSet: 'https://i.pravatar.cc/150?img=12', type: 'image/jpeg' } as const];

const ExampleAvatarVariants: React.FC = () => (
  <Group>
    <Avatar variant="circular" src={src} alt="circular" />
    <Avatar variant="rounded" src={src} alt="rounded" />
    <Avatar variant="square" src={src} alt="square" />
    <Avatar variant="circular" color="primary">
      C
    </Avatar>
    <Avatar variant="rounded" color="primary">
      R
    </Avatar>
    <Avatar variant="square" color="primary">
      S
    </Avatar>
  </Group>
);

export default ExampleAvatarVariants;
