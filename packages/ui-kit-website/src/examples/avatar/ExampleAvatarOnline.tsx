import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleAvatarOnline: React.FC = () => (
  <Group>
    <Avatar
      src={[{ srcSet: 'https://i.pravatar.cc/150?img=32', type: 'image/jpeg' }]}
      alt="Мария Иванова"
      isOnline
    />
    <Avatar variant="rounded" color="primary" isOnline>
      ИП
    </Avatar>
  </Group>
);

export default ExampleAvatarOnline;
