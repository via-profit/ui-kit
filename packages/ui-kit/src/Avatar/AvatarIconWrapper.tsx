import React from 'react';
import styled from '@emotion/styled';

export type AvatarIconWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AvatarIconWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarIconWrapperProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <Wrapper {...nativeProps} ref={ref}>
      {children}
    </Wrapper>
  );
};

export default React.forwardRef(AvatarIconWrapper);
