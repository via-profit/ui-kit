import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/Avatar';
import { BellIcon } from '~/components/Icons';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleAvatarOverview: React.FC = () => (
  <Group>
    <Avatar
      src={[{ srcSet: 'https://i.pravatar.cc/150?img=5', type: 'image/jpeg' }]}
      alt="Анна Смирнова"
    />
    <Avatar color="primary">АС</Avatar>
    <Avatar color="secondary">
      <BellIcon />
    </Avatar>
  </Group>
);

export default ExampleAvatarOverview;
