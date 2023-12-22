import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';

import AvatarContainer from '@via-profit/ui-kit/src/Avatar/AvatarContainer';
import AvatarTextWrapper from '@via-profit/ui-kit/src/Avatar/AvatarTextWrapper';

const StyledContainer = styled(AvatarContainer)`
  background-color: red !important;
`;

const StyledTextWrapper = styled(AvatarTextWrapper)`
  color: #fff !important;
`;

const ExampleAvatarOverrides: React.FC = () => (
  <>
    <Avatar
      variant="circular"
      overrides={{
        Container: React.forwardRef(function Override(props, ref) {
          return <StyledContainer {...props} ref={ref} />;
        }),
        TextWrapper: React.forwardRef(function Override(props, ref) {
          return <StyledTextWrapper {...props} ref={ref} />;
        }),
      }}
    >
      Standard
    </Avatar>
  </>
);

export default ExampleAvatarOverrides;
