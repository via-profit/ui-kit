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

const ExampleAvatarVariants: React.FC = () => (
  <>
    <AvatarGroup>
      <Avatar variant="circular">C</Avatar>
      <Avatar variant="rounded">R</Avatar>
      <Avatar variant="square">S</Avatar>
    </AvatarGroup>
  </>
);

export default ExampleAvatarVariants;
