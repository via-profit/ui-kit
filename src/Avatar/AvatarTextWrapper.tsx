import React from 'react';
import styled from '@emotion/styled';

export type AvatarTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const TextWrapper = styled.span`
  font-size: 1.5em;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
  user-select: none;
  position: absolute;
  top: 50%;
`;

const AvatarTextWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarTextWrapperProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <TextWrapper {...nativeProps} ref={ref}>
      {children}
    </TextWrapper>
  );
};

export default React.forwardRef(AvatarTextWrapper);
