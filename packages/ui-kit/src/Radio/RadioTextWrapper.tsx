import React from 'react';
import styled from '@emotion/styled';

export type RadioTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const TextWrapper = styled.span`
  font-size: 0.86em;
  display: flex;
  align-items: center;
  user-select: none;
`;

const RadioTextWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, RadioTextWrapperProps> = (
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

export default React.forwardRef(RadioTextWrapper);
