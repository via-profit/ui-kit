import React from 'react';
import styled from '@emotion/styled';

export type CheckboxWrapperProps = React.HTMLAttributes<HTMLSpanElement>;

const StyledWrapper = styled.span`
  font-size: 1em;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CheckboxWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, CheckboxWrapperProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledWrapper {...nativeProps} ref={ref}>
      {children}
    </StyledWrapper>
  );
};

export default React.forwardRef(CheckboxWrapper);
