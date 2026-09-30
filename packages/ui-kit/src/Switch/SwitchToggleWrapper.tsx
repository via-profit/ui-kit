import React from 'react';
import styled from '@emotion/styled';

export type SwitchToggleWrapperProps = React.InputHTMLAttributes<HTMLInputElement>;

const ToggleWrapper = styled.span`
  font-size: 0.86em;
  display: inline-flex;
  align-items: center;
  user-select: none;
  position: relative;
  height: 3rem;
  width: 4.5rem;
  padding: 1.1rem;
  overflow: hidden;
  box-sizing: border-box;
  /* Data attributes, not class names: emotion labels are absent in the published package */
  &:hover [data-switch-dot]:after {
    transform: translate(-50%, -50%) scale(1.7);
  }
`;

const StyledInput = styled.input`
  cursor: inherit;
  position: absolute;
  width: 100%;
  opacity: 0;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  z-index: 1;
  &:focus-visible ~ [data-switch-thumb] [data-switch-dot]:before {
    transform: translate(-50%, -50%) scale(1.7);
  }
`;

const SwitchToggleWrapper: React.ForwardRefRenderFunction<
  HTMLInputElement,
  SwitchToggleWrapperProps
> = (props, ref) => {
  const { children, disabled, ...nativeProps } = props;

  return (
    <ToggleWrapper>
      {/* The ref points to the input: it is the element that holds the value and the focus */}
      <StyledInput role="switch" {...nativeProps} disabled={disabled} type="checkbox" ref={ref} />
      {children}
    </ToggleWrapper>
  );
};

export default React.forwardRef(SwitchToggleWrapper);
