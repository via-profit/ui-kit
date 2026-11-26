import React from 'react';
import styled from '@emotion/styled';

export type SwitchWrapperProps = React.HTMLAttributes<HTMLSpanElement>;
const StyledWrapper = styled.span`
  font-size: 1em;
  padding-right: 1em;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SwitchWrapper: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchWrapperProps> = (
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

export default React.forwardRef(SwitchWrapper);
