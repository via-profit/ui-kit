import React from 'react';
import styled from '@emotion/styled';

export type ButtonTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const TextWrapper = styled.span`
  font-size: 0.86em;
  display: flex;
  align-items: center;
  user-select: none;
`;

const ButtonTextWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, ButtonTextWrapperProps> = (
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

export default React.forwardRef(ButtonTextWrapper);
