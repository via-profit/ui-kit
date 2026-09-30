import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import IconBell from '~/components/Icons/IconBell';

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
      <IconBell scale={0.5} />
    </Avatar>
  </Group>
);

export default ExampleAvatarOverview;
