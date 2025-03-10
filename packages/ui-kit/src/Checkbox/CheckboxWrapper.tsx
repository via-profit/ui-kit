import React from 'react';
import styled from '@emotion/styled';

export type CheckboxWrapperProps = React.HTMLAttributes<HTMLSpanElement>;
const StyledWrapper = styled.span`
  font-size: 1em;
  padding-right: 1em;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
