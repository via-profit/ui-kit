import React from 'react';
import styled from '@emotion/styled';

export type CheckboxTextWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

// type StyleProps = {};

const TextWrapper = styled.span`
  font-size: 0.86em;
  display: flex;
  align-items: center;
  user-select: none;
`;

const CheckboxTextWrapper: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  CheckboxTextWrapperProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <TextWrapper {...nativeProps} ref={ref}>
      {children}
    </TextWrapper>
  );
};

export default React.forwardRef(CheckboxTextWrapper);
