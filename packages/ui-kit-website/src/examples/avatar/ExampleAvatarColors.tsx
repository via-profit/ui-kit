import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

const AvatarGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleAvatarColors: React.FC = () => (
  <>
    <AvatarGroup>
      <Avatar variant="circular" color="primary">
        P
      </Avatar>
      <Avatar variant="rounded" color="secondary">
        Se
      </Avatar>
    </AvatarGroup>
    <AvatarGroup>
      <Avatar variant="square" color="lightpink">
        Pi
      </Avatar>
      <Avatar variant="rounded" color="#529d29">
        Cu
      </Avatar>
    </AvatarGroup>
  </>
);

export default ExampleAvatarColors;
