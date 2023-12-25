import React from 'react';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import styled from '@emotion/styled';

const AvatarGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleAvatarOnline: React.FC = () => (
  <AvatarGroup>
    <Avatar
      variant="circular"
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
      isOnline
    />
  </AvatarGroup>
);

export default ExampleAvatarOnline;
