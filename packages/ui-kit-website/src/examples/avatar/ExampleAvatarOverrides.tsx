import React from 'react';
import styled from '@emotion/styled';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import AvatarTextWrapper, {
  AvatarTextWrapperProps,
} from '@via-profit/ui-kit/src/Avatar/AvatarTextWrapper';

const StyledTextWrapper = styled(AvatarTextWrapper)`
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TextWrapper = React.forwardRef<HTMLSpanElement, AvatarTextWrapperProps>(
  function TextWrapper(props, ref) {
    return <StyledTextWrapper {...props} ref={ref} />;
  },
);

const ExampleAvatarOverrides: React.FC = () => (
  <Avatar color="primary" overrides={{ TextWrapper }}>
    ап
  </Avatar>
);

export default ExampleAvatarOverrides;
