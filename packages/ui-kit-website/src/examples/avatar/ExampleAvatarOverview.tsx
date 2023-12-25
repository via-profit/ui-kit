import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import IconBell from '~/components/Icons/IconBell';

const AvatarGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
  display: flex;
`;

const ExampleAvatarOverview: React.FC = () => (
  <AvatarGroup>
    <Avatar
      variant="circular"
      src={[{ srcSet: 'https://i.pravatar.cc/300', type: 'image/jpeg', isDefault: true }]}
      isOnline
    >
      S
    </Avatar>
    <Avatar
      variant="rounded"
      src={[
        {
          srcSet: 'https://i.pravatar.cc/300',
          type: 'image/jpeg',
          isDefault: true,
        },
        {
          srcSet: 'https://i.pravatar.cc/300',
          type: 'image/webp',
        },
      ]}
    >
      H
    </Avatar>
    <Avatar variant="square" src={[{ srcSet: 'https://i.pravatar.cc/300', type: 'image/jpeg' }]}>
      H
    </Avatar>

    <Avatar variant="square">Х</Avatar>
    <Avatar variant="rounded" color="primary" onClick={() => {}}>
      <IconBell scale={0.5} />
    </Avatar>
    <Avatar variant="circular" color="secondary">
      Z
    </Avatar>
  </AvatarGroup>
);

export default ExampleAvatarOverview;
