import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
`;

const ExampleAvatarSize: React.FC = () => (
  <Group>
    <Avatar color="primary" style={{ fontSize: '0.75em' }} isOnline>
      S
    </Avatar>
    <Avatar color="primary" isOnline>
      M
    </Avatar>
    <Avatar color="primary" style={{ fontSize: '1.5em' }} isOnline>
      L
    </Avatar>
    <Avatar color="primary" style={{ fontSize: '2em' }} isOnline>
      XL
    </Avatar>
  </Group>
);

export default ExampleAvatarSize;
